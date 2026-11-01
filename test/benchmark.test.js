const assert = require('node:assert/strict')
const test = require('node:test')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { execFileSync } = require('node:child_process')

test('the comparison harness receives real IPC messages and identical variable values for both versions', () => {
	const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'mixeffect-benchmark-test-'))
	try {
		const output = path.join(directory, 'results.json')
		execFileSync(
			process.execPath,
			[
				path.join(__dirname, '../scripts/benchmark-feedback.js'),
				'--iterations',
				'1',
				'--warmup',
				'0',
				'--buttons',
				'2',
				'--output',
				output,
			],
			{ encoding: 'utf8', timeout: 120000 },
		)
		const report = JSON.parse(fs.readFileSync(output, 'utf8'))
		assert.equal(report.variableValuesMatch, true)
		const old = report.versions['v2.1.1'].summary
		const candidate = report.versions.candidate.summary
		assert.equal(old.Initialize.variableMessages.median, 14615)
		assert.equal(candidate.Initialize.variableMessages.median, 1)
		assert.ok(old['Identical poll'].variableMessages.median > 10000)
		assert.ok(old['Identical poll'].feedbackCallbacks.median > 0)
		assert.equal(candidate['Identical poll'].ipcMessages.median, 0)
		assert.equal(candidate['Identical poll'].feedbackCallbacks.median, 0)
		assert.equal(candidate['One AUX change'].variableMessages.median, 1)
		assert.equal(candidate['One AUX change'].feedbackCallbacks.median, 2)
	} finally {
		fs.rmSync(directory, { recursive: true, force: true })
	}
})
