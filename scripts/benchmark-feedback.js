// Compare the old and current parser using the real base API over process IPC.
// The receiver counts messages; it does not run Companion's UI or database.
const fs = require('node:fs')
const path = require('node:path')
const { execFileSync, fork } = require('node:child_process')
const { createHash } = require('node:crypto')
const { performance } = require('node:perf_hooks')
const { setTimeout: delay } = require('node:timers/promises')
const root = path.resolve(__dirname, '..')

async function worker() {
	const config = await new Promise((resolve) => process.once('message', resolve))
	const { InstanceBase } = require('@companion-module/base')
	const variables = require(path.join(config.source, 'src/variables'))
	const polling = require(path.join(config.source, 'src/polling'))
	const feedbacks = require(path.join(config.source, 'src/feedbacks'))
	const { selectedOrValue } = require(path.join(config.source, 'src/actions'))
	const switcher = require('../src/switchers').find(({ id }) => id === config.model)
	let sequence = 0
	const pending = new Map()
	process.on('message', (message) => {
		if (message.name !== '__benchmarkAck') return
		pending.get(message.sequence)?.(message.stats)
		pending.delete(message.sequence)
	})
	const barrier = (kind, details = {}) =>
		new Promise((resolve) => {
			const id = ++sequence
			pending.set(id, resolve)
			process.send({ benchmark: kind, sequence: id, ...details })
		})
	const results = []
	for (let iteration = -config.warmup; iteration < config.iterations; iteration++) {
		const listeners = new Set(process.listeners('message'))
		const instance = new InstanceBase({ id: 'feedback-benchmark', upgradeScripts: [], _isInstanceBaseProps: true })
		Object.assign(instance, variables, polling, feedbacks, {
			selectedOrValue,
			switcher,
			variableDefinitions: [],
			store: { variables: {} },
		})
		const metrics = { feedbackChecks: 0, feedbackCallbacks: 0 }
		let definitions
		const setDefinitions = instance.setFeedbackDefinitions.bind(instance)
		instance.setFeedbackDefinitions = (value) => {
			definitions = value
			for (const definition of Object.values(value)) {
				const callback = definition.callback
				definition.callback = (...args) => {
					metrics.feedbackCallbacks++
					return callback(...args)
				}
			}
			setDefinitions(value)
		}
		const check = instance.checkFeedbacks.bind(instance)
		instance.checkFeedbacks = (...ids) => {
			metrics.feedbackChecks++
			check(...ids)
		}
		instance.initFeedbacks()
		async function measure(stage, operation) {
			await barrier('begin')
			metrics.feedbackChecks = 0
			metrics.feedbackCallbacks = 0
			const cpuStart = process.cpuUsage()
			const start = performance.now()
			operation()
			const moduleMs = performance.now() - start
			// Base 1.14 debounces feedback output for 5 ms (maxWait 25 ms).
			// Allow async checks/output to settle; idle waiting is excluded from CPU time.
			await delay(40)
			const stats = await barrier('end')
			const cpu = process.cpuUsage(cpuStart)
			const workerCpuMs = (cpu.user + cpu.system) / 1000
			const stateHash = createHash('sha256')
				.update(
					JSON.stringify(
						instance.variableDefinitions.map(({ variableId }) => [variableId, instance.getVariableValue(variableId)]),
					),
				)
				.digest('hex')
			if (iteration >= 0) results.push({ stage, moduleMs, workerCpuMs, ...metrics, ...stats, stateHash })
		}
		await measure('Initialize', () => instance.initVariables(switcher))
		// Simulate placed button feedbacks through the real base feedback manager.
		const placed = {}
		for (const [feedbackId, definition] of Object.entries(definitions)) {
			for (let i = 0; i < config.buttonsPerType; i++) {
				const id = `${feedbackId}-${i}`
				placed[id] = {
					id,
					feedbackId,
					controlId: `bank:${id}`,
					options: Object.fromEntries(definition.options.filter((o) => 'default' in o).map((o) => [o.id, o.default])),
				}
			}
		}
		await instance._handleUpdateFeedbacks({ feedbacks: placed })
		await delay(40)
		await measure('First poll', () => instance.updateState(JSON.parse(config.json)))
		await measure('Identical poll', () => instance.updateState(JSON.parse(config.json)))
		const changed = JSON.parse(config.json)
		if (changed.aux?.length && typeof changed.aux.at(-1).source === 'number') {
			changed.aux.at(-1).source = changed.aux.at(-1).source === 0 ? 1 : 0
			const json = JSON.stringify(changed)
			await measure('One AUX change', () => instance.updateState(JSON.parse(json)))
		}
		for (const listener of process.listeners('message'))
			if (!listeners.has(listener)) process.removeListener('message', listener)
	}
	process.send({ benchmark: 'results', results }, () => process.disconnect())
}

function runWorker(config) {
	return new Promise((resolve, reject) => {
		const child = fork(__filename, ['--worker'], { cwd: root, stdio: ['ignore', 'ignore', 'pipe', 'ipc'] })
		let active = null
		let result
		let errors = ''
		const timeout = setTimeout(() => {
			child.kill()
			reject(new Error('Benchmark worker exceeded five minutes'))
		}, 300000)
		child.stderr.on('data', (chunk) => {
			errors += chunk
		})
		child.on('error', reject)
		child.on('message', (message) => {
			if (message.benchmark === 'results') result = message.results
			else if (message.benchmark === 'begin' || message.benchmark === 'end') {
				const stats = active
				active = message.benchmark === 'begin' ? { variableMessages: 0, ipcMessages: 0, ipcBytes: 0 } : null
				child.send({ direction: 'call', name: '__benchmarkAck', sequence: message.sequence, stats })
			} else if (active) {
				active.ipcMessages++
				active.ipcBytes += Buffer.byteLength(JSON.stringify(message))
				if (message.name === 'setVariableValues') active.variableMessages++
			}
		})
		child.on('exit', (code) => {
			clearTimeout(timeout)
			if (code !== 0 || !result || errors) reject(new Error(`Benchmark worker failed (${code}): ${errors}`))
			else resolve(result)
		})
		child.send(config)
	})
}

function percentile(values, fraction) {
	const sorted = [...values].sort((a, b) => a - b)
	return sorted[Math.ceil(sorted.length * fraction) - 1]
}

async function main() {
	const options = { model: '31', iterations: '5', warmup: '1', buttons: '10' }
	for (let i = 2; i < process.argv.length; i += 2) {
		const key = process.argv[i].replace(/^--/, '')
		if (
			!['model', 'iterations', 'warmup', 'buttons', 'input', 'output'].includes(key) ||
			process.argv[i + 1] === undefined
		)
			throw new Error(
				'Usage: yarn benchmark [--model ID] [--iterations N] [--warmup N] [--buttons N] [--input saved-feedback.json] [--output results.json]',
			)
		options[key] = process.argv[i + 1]
	}
	const switchers = require('../src/switchers')
	const switcher = switchers.find(({ id }) => id === Number(options.model))
	if (!switcher)
		throw new Error(
			`Unknown model. Available models:\n${switchers.map(({ id, label }) => `${id}: ${label}`).join('\n')}`,
		)
	for (const key of ['iterations', 'warmup', 'buttons']) {
		if (
			!Number.isInteger(Number(options[key])) ||
			Number(options[key]) < (key === 'iterations' ? 1 : 0) ||
			Number(options[key]) > 100
		)
			throw new Error(`${key} must be an integer between ${key === 'iterations' ? 1 : 0} and 100`)
	}
	const json = options.input
		? fs.readFileSync(path.resolve(options.input), 'utf8')
		: JSON.stringify(require('./lib/feedback-fixture').largeFeedback(switcher))
	JSON.parse(json)
	fs.mkdirSync(path.join(root, '.yarn'), { recursive: true })
	const baseline = fs.mkdtempSync(path.join(root, '.yarn', 'feedback-benchmark-'))
	try {
		const archive = execFileSync('git', ['archive', '--format=tar', 'v2.1.1', 'src'], { cwd: root })
		execFileSync('tar', ['-xf', '-', '-C', baseline], { input: archive })
		const report = {
			node: process.version,
			base: require('@companion-module/base/package.json').version,
			baselineCommit: execFileSync('git', ['rev-parse', 'v2.1.1'], { cwd: root, encoding: 'utf8' }).trim(),
			candidateDirty: execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' }).trim().length > 0,
			inputSha256: createHash('sha256').update(json).digest('hex'),
			candidateCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
			model: switcher.label,
			input: options.input ? 'saved JSON' : 'synthetic JSON',
			jsonBytes: Buffer.byteLength(json),
			iterations: Number(options.iterations),
			warmup: Number(options.warmup),
			buttonsPerType: Number(options.buttons),
			limits:
				'Real base 1.14 and process IPC; simulated receiver/button layout. Measures variable initialization/updateState, excluding HTTP polling/status, Companion rendering/database, and request scheduling. Feedbacks settle for 40 ms; moduleMs excludes that wait, workerCpuMs includes async checks but excludes idle wait time.',
			versions: {},
		}
		for (const [version, source] of [
			['v2.1.1', baseline],
			['candidate', root],
		]) {
			process.stdout.write(`Benchmarking ${version}...\n`)
			const samples = await runWorker({
				source,
				json,
				model: switcher.id,
				iterations: report.iterations,
				warmup: report.warmup,
				buttonsPerType: report.buttonsPerType,
			})
			const summary = {}
			for (const stage of new Set(samples.map((sample) => sample.stage))) {
				const stageSamples = samples.filter((sample) => sample.stage === stage)
				summary[stage] = Object.fromEntries(
					[
						'moduleMs',
						'workerCpuMs',
						'variableMessages',
						'feedbackChecks',
						'feedbackCallbacks',
						'ipcMessages',
						'ipcBytes',
					].map((metric) => [
						metric,
						{
							median: percentile(
								stageSamples.map((s) => s[metric]),
								0.5,
							),
							p95: percentile(
								stageSamples.map((s) => s[metric]),
								0.95,
							),
						},
					]),
				)
			}
			report.versions[version] = { summary, samples }
		}
		for (const sample of report.versions.candidate.samples) {
			const old = report.versions['v2.1.1'].samples.find((s) => s.stage === sample.stage)
			if (old.stateHash !== sample.stateHash) throw new Error(`Variable values differ after ${sample.stage}`)
		}
		report.variableValuesMatch = true
		if (options.output) fs.writeFileSync(path.resolve(options.output), JSON.stringify(report, null, 2) + '\n')
		console.log(
			`${report.model}; ${report.jsonBytes} bytes; ${report.buttonsPerType} simulated buttons per feedback type`,
		)
		console.table(
			Object.entries(report.versions).flatMap(([version, result]) =>
				Object.entries(result.summary).map(([stage, metrics]) => ({
					version,
					stage,
					'median ms': metrics.moduleMs.median.toFixed(2),
					'p95 ms': metrics.moduleMs.p95.toFixed(2),
					'CPU ms': metrics.workerCpuMs.median.toFixed(2),
					'value IPCs': metrics.variableMessages.median,
					'feedback checks': metrics.feedbackChecks.median,
					'feedback callbacks': metrics.feedbackCallbacks.median,
					'all IPCs': metrics.ipcMessages.median,
					'IPC KiB': (metrics.ipcBytes.median / 1024).toFixed(1),
				})),
			),
		)
		console.log('Declared variable values match. ' + report.limits)
	} finally {
		fs.rmSync(baseline, { recursive: true, force: true })
	}
}

if (process.argv[2] === '--worker')
	worker().catch((error) => {
		console.error(error)
		process.exitCode = 1
		process.disconnect()
	})
else
	main().catch((error) => {
		console.error(error.message)
		process.exitCode = 1
	})
