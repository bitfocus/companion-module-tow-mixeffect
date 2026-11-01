const assert = require('node:assert/strict')
const test = require('node:test')
const Module = require('node:module')
const base = require('@companion-module/base')
const switchers = require('../src/switchers')
const { model } = require('../src/switchers/types')
const { SELECTED_ID } = require('../src/actions/utils')
const feedback = require('./fixtures/feedback.json')
const { largeFeedback } = require('../scripts/lib/feedback-fixture')

// Capture registration and OSC output without connecting to Companion or hardware.
class TestBase {
	constructor() {
		this.values = {}
		this.messages = []
		this.valueUpdates = []
		this.feedbackChecks = []
		this.statuses = []
	}
	setActionDefinitions(actions) {
		this.actions = actions
	}
	setFeedbackDefinitions(feedbacks) {
		this.feedbacks = feedbacks
	}
	setPresetDefinitions(presets) {
		this.presets = presets
	}
	setVariableDefinitions(definitions) {
		this.definitions = [...definitions]
		const ids = new Set(definitions.map(({ variableId }) => variableId))
		for (const id of Object.keys(this.values)) if (!ids.has(id)) delete this.values[id]
		for (const id of ids) if (!(id in this.values)) this.values[id] = ''
	}
	setVariableValues(values) {
		this.valueUpdates.push({ ...values })
		for (const [id, value] of Object.entries(values)) this.values[id] = value ?? ''
	}
	getVariableValue(id) {
		return this.values[id]
	}
	checkFeedbacks(...ids) {
		this.feedbackChecks.push(ids)
		this.onFeedbackCheck?.(ids)
	}
	updateStatus(...status) {
		this.statuses.push(status)
	}
	log() {}
}

let Instance
const originalLoad = Module._load
try {
	Module._load = function (request, ...args) {
		if (request === '@companion-module/base') {
			return { ...base, InstanceBase: TestBase, runEntrypoint: (factory) => (Instance = factory) }
		}
		return originalLoad.call(this, request, ...args)
	}
	require('../src')
} finally {
	Module._load = originalLoad
}

const configFor = (id) => ({
	ip: '127.0.0.1',
	port: 49990,
	httpServerPort: 8080,
	pollingInterval: 500,
	feedbackPolling: false,
	model: id,
})

async function createInstance(id) {
	const instance = new Instance()
	await instance.init(configFor(id))
	instance.oscSendPath = (path, args = []) => instance.messages.push({ path, args })
	return instance
}

test('every supported model registers actions, feedbacks, presets, and variables', async () => {
	assert.equal(switchers.length, 27)
	assert.equal(new Set(switchers.map((switcher) => switcher.id)).size, switchers.length)
	for (const switcher of switchers) {
		const instance = await createInstance(switcher.id)
		assert.ok(Object.keys(instance.actions).length > 0, switcher.label)
		assert.ok(Object.keys(instance.feedbacks).length > 0, switcher.label)
		assert.ok(Object.keys(instance.presets).length > 0, switcher.label)
		assert.ok(instance.definitions.length > 0, switcher.label)
		assert.equal(instance.data.interval, null)
	}
})

test('existing output corrections expose the webcam output', async () => {
	for (const [id, count] of [
		[model.atemMiniPro, 2],
		[model.atemMiniProIso, 2],
		[model.atemSdiProIso, 3],
		[model.atemSdiExtremeIso, 5],
	]) {
		const instance = await createInstance(id)
		const choices = instance.actions.selectAuxBus.options[0].choices
		assert.deepEqual(
			choices.map((choice) => choice.id),
			Array.from({ length: count }, (_, index) => index + 1),
		)
		instance.actions.setAuxSource.callback({ options: { videoSource: 1, auxBus: count } })
		assert.deepEqual(instance.messages.pop(), {
			path: '/mixeffect/aux/source',
			args: [
				{ type: 'i', value: 1 },
				{ type: 'i', value: count },
			],
		})
	}
})

test('G2 exposes Thunderbolt video, XLR/MADI audio, and all five outputs', async () => {
	const instance = await createInstance(model.atemMiniExtremeIsoG2)
	const sources = instance.actions.setProgramInput.options.find((option) => option.id === 'videoSource').choices
	assert.ok(sources.some(({ id }) => id === 3210))
	assert.ok(sources.some(({ id }) => id === 3211))
	assert.ok(!sources.some(({ id }) => id === 9), 'Thunderbolt is not HDMI input 9')
	assert.equal(instance.actions.selectAuxBus.options[0].choices.length, 5)
	const audioIds = new Set(instance.switcher.audioSources.map(({ id }) => id))
	for (const id of [1001, 1002, 1501, 1516, 2001, 2002, 2051]) assert.ok(audioIds.has(id), `Audio input ${id}`)
	assert.ok(!audioIds.has(1301), 'G2 uses XLR inputs instead of the old mini-jack inputs')
	instance.actions.setProgramInput.callback({ options: { videoSource: 3210, mixEffectBus: 1 } })
	assert.deepEqual(instance.messages.pop(), {
		path: '/mixeffect/program',
		args: [
			{ type: 'i', value: 3210 },
			{ type: 'i', value: 1 },
		],
	})
})

test('4K Plus can route input 80 to output 48 and has four upstream keyers per M/E', async () => {
	const instance = await createInstance(model.atem4meConstellation4kPlus)
	const sources = instance.actions.setAuxSource.options.find((option) => option.id === 'videoSource').choices
	assert.ok(sources.some(({ id }) => id === 80))
	assert.ok(!sources.some(({ id }) => id === 81))
	assert.equal(instance.actions.selectAuxBus.options[0].choices.length, 48)
	assert.equal(instance.switcher.upstreamKeyers, 4)
	assert.equal(instance.switcher.mixEffectBuses, 4)
	assert.ok(instance.definitions.some(({ variableId }) => variableId === 'me_4_usk_4_onAir'))
	assert.ok(!instance.definitions.some(({ variableId }) => variableId === 'me_4_usk_5_onAir'))
	instance.actions.setAuxSource.callback({ options: { videoSource: 80, auxBus: 48 } })
	assert.deepEqual(instance.messages.pop(), {
		path: '/mixeffect/aux/source',
		args: [
			{ type: 'i', value: 80 },
			{ type: 'i', value: 48 },
		],
	})
})

test('changing models rebuilds variables without accumulating old definitions', async () => {
	const instance = await createInstance(model.atemMiniPro)
	const initialCount = instance.definitions.length
	assert.ok(!instance.definitions.some(({ variableId }) => variableId.startsWith('aux_48_')))
	await instance.configUpdated(configFor(model.atem4meConstellation4kPlus))
	assert.ok(instance.definitions.some(({ variableId }) => variableId.startsWith('aux_48_')))
	await instance.configUpdated(configFor(model.atemMiniPro))
	assert.equal(instance.definitions.length, initialCount)
	assert.ok(!instance.definitions.some(({ variableId }) => variableId.startsWith('aux_48_')))
})

test('instances own independent variable definitions and retain selections on address changes', async () => {
	const first = await createInstance(model.atemMiniPro)
	const initialCount = first.variableDefinitions.length
	const second = await createInstance(model.atem4meConstellation4kPlus)
	assert.notEqual(first.variableDefinitions, second.variableDefinitions)
	assert.equal(first.variableDefinitions.length, initialCount)
	first.updateVariable('aux_bus', 2)
	await first.configUpdated({ ...configFor(model.atemMiniPro), ip: '127.0.0.2' })
	assert.equal(first.getVariableValue('aux_bus'), 2)
})

function resetUpdates(instance) {
	instance.valueUpdates = []
	instance.feedbackChecks = []
	instance.statuses = []
}

function assertUniqueFeedbackCheck(instance) {
	assert.equal(instance.feedbackChecks.length, 1)
	const [ids] = instance.feedbackChecks
	assert.equal(ids.length, new Set(ids).size)
	assert.ok(
		ids.every((id) => instance.feedbacks[id]),
		'only registered feedback types are checked',
	)
}

test('all models initialize defaults in one value batch and one deduplicated feedback check', async () => {
	for (const switcher of switchers) {
		const instance = await createInstance(switcher.id)
		assert.equal(instance.valueUpdates.length, 1, switcher.label)
		assert.equal(Object.keys(instance.valueUpdates[0]).length, instance.definitions.length)
		assertUniqueFeedbackCheck(instance)
		assert.equal(instance.getVariableValue('aux_bus'), 1)
		assert.equal(instance.store.variables.selectedAuxBus, 1)
	}
	const large = await createInstance(model.atem4meConstellation4kPlus)
	assert.equal(large.definitions.length, 14615)
})

for (const [name, id] of [
	['fairlight', model.atem4meConstellation4kPlus],
	['legacy', model.atemProductionStudio4k],
]) {
	test(`${name} JSON preserves the 2.1.1 variable mapping and suppresses identical polls`, async () => {
		const instance = await createInstance(id)
		const data = structuredClone(feedback)
		const original = structuredClone(data)
		resetUpdates(instance)
		instance.updateState(data)
		// Baselines captured from the 2.1.1 parser for declared variables only.
		assert.deepEqual(instance.valueUpdates, [require(`./fixtures/${name}-values.json`)])
		assertUniqueFeedbackCheck(instance)
		assert.deepEqual(data, original, 'the feedback JSON is not mutated')
		resetUpdates(instance)
		instance.updateState(structuredClone(data))
		assert.deepEqual(instance.valueUpdates, [])
		assert.deepEqual(instance.feedbackChecks, [])
	})
}

test('changed values, false, zero, empty strings and clears are sent together before checking feedbacks', async () => {
	const instance = await createInstance(model.atem4meConstellation4kPlus)
	const data = structuredClone(feedback)
	instance.updateState(data)
	resetUpdates(instance)
	data.output.streaming = false
	data.aux[0].source = 0
	data.sources[0].longName = ''
	data.sources[0].shortName = null
	data.fairlight.sources[0].gain = 0
	instance.onFeedbackCheck = () => {
		assert.equal(instance.getVariableValue('output_streaming'), false)
		assert.equal(instance.getVariableValue('aux_1_source'), 0)
		assert.equal(instance.getVariableValue('source_1_longName'), '')
	}
	instance.updateState(data)
	assert.deepEqual(instance.valueUpdates, [
		{
			output_streaming: false,
			aux_1_source: 0,
			source_1_longName: '',
			source_1_shortName: '',
			fairlightAudio_source_1_gain: 0,
		},
	])
	assert.deepEqual(new Set(instance.feedbackChecks[0]), new Set(['output_streaming', 'aux_source']))
	assertUniqueFeedbackCheck(instance)
	resetUpdates(instance)
	instance.updateVariables({ source_1_shortName: undefined, nonexistent_field: 123 })
	instance.updateState({ output: { futureProperty: 123 } })
	instance.updateState({})
	assert.deepEqual(instance.valueUpdates, [])
	assert.deepEqual(instance.feedbackChecks, [])
})

test('selected-resource feedbacks refresh immediately without waiting for JSON to change', async () => {
	const cases = [
		[
			'aux_bus',
			'selected_aux_bus',
			'aux_source',
			{ auxBus: SELECTED_ID, videoSource: 1 },
			{ aux_1_source: 1, aux_2_source: 2 },
		],
		[
			'mix_effect_bus',
			'selected_mix_effect_bus',
			'me_program',
			{ mixEffectBus: SELECTED_ID, videoSource: 1 },
			{ me_1_program: 1, me_2_program: 2 },
		],
		[
			'usk',
			'selected_usk',
			'usk_onAir',
			{ mixEffectBus: 1, usk: SELECTED_ID, onOff: 1 },
			{ me_1_usk_1_onAir: true, me_1_usk_2_onAir: false },
		],
		['dsk', 'selected_dsk', 'dsk_onAir', { dsk: SELECTED_ID, onOff: 1 }, { dsk_1_onAir: true, dsk_2_onAir: false }],
		[
			'color_generator',
			'selected_color_generator',
			'colorGenerator_hue',
			{ colorGenerator: SELECTED_ID, hue: 120 },
			{ colorGenerator_1_hue: 120, colorGenerator_2_hue: 240 },
		],
		[
			'supersource',
			'selected_supersource',
			'superSource_art_border',
			{ superSource: SELECTED_ID, onOff: 1 },
			{ superSource_ssrc_1_art_borderEnabled: true, superSource_ssrc_2_art_borderEnabled: false },
		],
		[
			'box',
			'selected_box',
			'superSource_box_enable',
			{ superSource: 1, box: SELECTED_ID, onOff: 1 },
			{ superSource_ssrc_1_box_1_enabled: true, superSource_ssrc_1_box_2_enabled: false },
		],
	]
	for (const [selection, internalId, feedbackId, options, values] of cases) {
		const instance = await createInstance(model.atem4meConstellation4kPlus)
		instance.updateVariables(values)
		const evaluate = () => instance.feedbacks[feedbackId].callback({ options })
		assert.equal(evaluate(), true, selection)
		resetUpdates(instance)
		instance.onFeedbackCheck = (ids) => {
			assert.ok(ids.includes(internalId))
			assert.ok(ids.includes(feedbackId))
			assert.equal(evaluate(), false)
		}
		instance.updateVariable(selection, 2)
		assertUniqueFeedbackCheck(instance)
		assert.deepEqual(instance.valueUpdates, [{ [selection]: 2 }])
		resetUpdates(instance)
		instance.updateVariable(selection, 2)
		assert.deepEqual(instance.valueUpdates, [])
		assert.deepEqual(instance.feedbackChecks, [])
	}
})

test('model changes reset defaults once and discard removed variables and their cached values', async () => {
	const instance = await createInstance(model.atem4meConstellation4kPlus)
	instance.updateVariables({ aux_bus: 48, aux_48_source: 80, me_4_program: 80 })
	resetUpdates(instance)
	await instance.configUpdated(configFor(model.atemMiniPro))
	assert.equal(instance.valueUpdates.length, 1)
	assertUniqueFeedbackCheck(instance)
	assert.equal(instance.getVariableValue('aux_bus'), 1)
	assert.equal(instance.getVariableValue('aux_48_source'), undefined)
	assert.equal(instance.store.variables.selectedAuxBus, 1)
	resetUpdates(instance)
	instance.updateVariable('aux_48_source', 80)
	assert.deepEqual(instance.valueUpdates, [])
})

function deferred() {
	let resolve, reject
	const promise = new Promise((yes, no) => {
		resolve = yes
		reject = no
	})
	return { promise, resolve, reject }
}

test('slow requests do not overlap, and failures release the next poll', async (t) => {
	const instance = await createInstance(model.atemMiniPro)
	const pending = deferred()
	const fetch = t.mock.method(globalThis, 'fetch', () => pending.promise)
	const first = instance.pollState()
	await instance.pollState()
	assert.equal(fetch.mock.callCount(), 1)
	pending.reject(new Error('offline'))
	await first
	assert.equal(instance.data.pollRequest, null)
	assert.equal(instance.statuses.at(-1)[0], 'connection_failure')
	fetch.mock.mockImplementation(async () => ({ ok: true, json: async () => feedback }))
	await instance.pollState()
	assert.equal(fetch.mock.callCount(), 2)
	assert.equal(instance.getVariableValue('me_1_program'), 1)
	assert.equal(instance.statuses.at(-1)[0], 'ok')
})

test('reconfiguration aborts the old request and ignores its body without disturbing the new request', async (t) => {
	const instance = await createInstance(model.atem4meConstellation4kPlus)
	const body = deferred()
	const bodyStarted = deferred()
	const nextResponse = deferred()
	let oldSignal
	const fetch = t.mock.method(globalThis, 'fetch', async (url, options) => {
		oldSignal = options.signal
		return {
			ok: true,
			json: () => {
				bodyStarted.resolve()
				return body.promise
			},
		}
	})
	const oldPoll = instance.pollState()
	await bodyStarted.promise
	await instance.configUpdated({ ...configFor(model.atemMiniPro), ip: '127.0.0.2' })
	assert.equal(oldSignal.aborted, true)
	fetch.mock.mockImplementation((url) => {
		assert.equal(url, 'http://127.0.0.2:8080/feedback')
		return nextResponse.promise
	})
	resetUpdates(instance)
	const newPoll = instance.pollState()
	const newRequest = instance.data.pollRequest
	body.resolve(feedback)
	await oldPoll
	assert.equal(instance.data.pollRequest, newRequest)
	assert.deepEqual(instance.valueUpdates, [])
	assert.deepEqual(instance.statuses, [])
	nextResponse.resolve({ ok: true, json: async () => feedback })
	await newPoll
	assert.equal(instance.valueUpdates.length, 1)
	assert.equal(instance.getVariableValue('me_1_program'), 1)
})

test('the HTTP deadline is an abort signal, reports failure, and releases the request slot', async (t) => {
	const instance = await createInstance(model.atemMiniPro)
	const timeout = new AbortController()
	t.mock.method(AbortSignal, 'timeout', (milliseconds) => {
		assert.equal(milliseconds, 10000)
		return timeout.signal
	})
	t.mock.method(
		globalThis,
		'fetch',
		(url, { signal }) =>
			new Promise((resolve, reject) => {
				signal.addEventListener('abort', () => reject(signal.reason), { once: true })
			}),
	)
	const pending = instance.pollState()
	timeout.abort(new DOMException('Deadline exceeded', 'TimeoutError'))
	await pending
	assert.equal(instance.data.pollRequest, null)
	assert.equal(instance.statuses.at(-1)[0], 'connection_failure')
})

test('100 ms polling does not overlap and disabling or destroying cancels in-flight responses', async (t) => {
	const timers = new Set()
	t.mock.method(globalThis, 'setInterval', (callback, milliseconds) => {
		assert.equal(milliseconds, 100)
		const timer = { callback }
		timers.add(timer)
		return timer
	})
	t.mock.method(globalThis, 'clearInterval', (timer) => timers.delete(timer))
	for (const stop of ['disable', 'destroy']) {
		const instance = await createInstance(model.atemMiniPro)
		await instance.configUpdated({ ...configFor(model.atemMiniPro), pollingInterval: 100, feedbackPolling: true })
		assert.equal(timers.size, 1)
		const pending = deferred()
		let signal
		const fetch = t.mock.method(globalThis, 'fetch', (url, options) => {
			signal = options.signal
			return pending.promise
		})
		const poll = instance.data.interval.callback()
		await instance.data.interval.callback()
		await instance.data.interval.callback()
		assert.equal(fetch.mock.callCount(), 1, 'later timer ticks skip the pending request')
		if (stop === 'disable') await instance.configUpdated(configFor(model.atemMiniPro))
		else await instance.destroy()
		assert.equal(timers.size, 0)
		assert.equal(signal.aborted, true)
		resetUpdates(instance)
		pending.resolve({ ok: true, json: async () => feedback })
		await poll
		assert.deepEqual(instance.valueUpdates, [])
		assert.deepEqual(instance.feedbackChecks, [])
		assert.deepEqual(instance.statuses, [])
	}
})

test('large 4K Plus snapshots remain one batch, identical snapshots send nothing, and a single change stays targeted', async () => {
	const instance = await createInstance(model.atem4meConstellation4kPlus)
	const data = largeFeedback(instance.switcher)
	resetUpdates(instance)
	instance.updateState(data)
	assert.equal(instance.valueUpdates.length, 1)
	assert.ok(Object.keys(instance.valueUpdates[0]).length > 10000)
	assertUniqueFeedbackCheck(instance)
	resetUpdates(instance)
	for (let i = 0; i < 10; i++) instance.updateState(structuredClone(data))
	assert.deepEqual(instance.valueUpdates, [])
	assert.deepEqual(instance.feedbackChecks, [])
	data.aux[47].source = 80
	instance.updateState(data)
	assert.deepEqual(instance.valueUpdates, [{ aux_48_source: 80 }])
	assert.deepEqual(instance.feedbackChecks, [['aux_source']])
})
