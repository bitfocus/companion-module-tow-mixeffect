const { InstanceBase, runEntrypoint } = require('@companion-module/base')

const configs = require('./configs')
const actions = require('./actions')
const constants = require('./constants')
const presets = require('./presets')
const variables = require('./variables')
const feedbacks = require('./feedbacks')
const upgrades = require('./upgrades')
const polling = require('./polling')

const switchers = require('./switchers')

class MixEffectInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		Object.assign(this, {
			...configs,
			...actions,
			...constants,
			...presets,
			...variables,
			...feedbacks,
			...polling,
		})
	}

	static GetUpgradeScripts() {
		return [upgrades.v1_1_0]
	}

	static DEVELOPER_forceStartupUpgradeScript = 0

	async init(config) {
		this.config = config

		this.data = {
			interval: null,
		}

		this.initConstants()

		this.store = {
			variables: {},
		}

		if (!this.config.ip) {
			this.updateStatus('disconnected', 'Please Configure')
			return
		}

		this.switcher = switchers.find(({ id }) => this.config.model === id)
		if (!this.switcher) {
			return this.updateStatus('bad_config', 'Unknown Switcher')
		}

		this.initActions()
		this.initPresets()
		this.initFeedbacks()
		this.initVariables(this.switcher)
		this.initPolling()

		this.updateStatus('ok')
	}

	async configUpdated(config) {
		this.config = config

		this.switcher = switchers.find(({ id }) => this.config.model === id)

		if (!this.switcher) {
			return this.updateStatus('bad_config', 'Unknown Switcher')
		}

		this.initActions()
		this.initPresets()
		this.initFeedbacks()
		this.initPolling()

		this.updateStatus('ok')
	}

	async destroy() {
		if (this.data.interval) {
			clearInterval(this.data.interval)
		}
	}
}

runEntrypoint(MixEffectInstance, MixEffectInstance.GetUpgradeScripts())
