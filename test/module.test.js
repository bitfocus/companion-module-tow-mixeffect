const assert = require('node:assert/strict')
const test = require('node:test')
const Module = require('node:module')
const base = require('@companion-module/base')
const switchers = require('../src/switchers')
const { model } = require('../src/switchers/types')

// Capture registration and OSC output without connecting to Companion or hardware.
class TestBase {
	constructor() {
		this.values = {}
		this.messages = []
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
	}
	setVariableValues(values) {
		Object.assign(this.values, values)
	}
	getVariableValue(id) {
		return this.values[id]
	}
	checkFeedbacks() {}
	updateStatus() {}
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
			Array.from({ length: count }, (_, index) => index + 1)
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
