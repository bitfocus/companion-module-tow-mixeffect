const instance_skel = require('../../../instance_skel')

const configs = require('./configs')
const actions = require('./actions')
const constants = require('./constants')
const presets = require('./presets')
const variables = require('./variables')
const feedbacks = require('./feedbacks')
const upgrades = require('./upgrades')
const polling = require('./polling')

const switchers = require('./switchers')

class MixEffectInstance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)

		Object.assign(this, {
			...configs,
			...actions,
			...constants,
			...presets,
			...variables,
			...feedbacks,
			...polling,
		})

		this.config = config

		this.data = {
			interval: null,
		}

		this.initConstants()

		this.store = {
			variables: {},
		}
	}

	static GetUpgradeScripts() {
		return [upgrades.v1_1_0]
	}

	static DEVELOPER_forceStartupUpgradeScript = 0

	init() {
		if (!this.config.ip) {
			this.status(this.STATUS_UNKNOWN, 'Please Configure')
			return
		}

		this.switcher = switchers.find(({ id }) => this.config.model === id)
		if (!this.switcher) {
			return this.status(this.STATUS_ERROR, 'Unknown Switcher')
		}

		this.initActions()
		this.initPresets()
		this.initFeedbacks()
		this.initVariables(this.switcher)
		this.initPolling()

		this.status(this.STATUS_OK)
	}

	updateConfig(config) {
		this.config = config

		this.switcher = switchers.find(({ id }) => this.config.model === id)

		if (!this.switcher) {
			return this.status(this.STATUS_ERROR, 'Unknown Switcher')
		}

		this.initActions()
		this.initPresets()
		this.initFeedbacks()
		this.initPolling()

		this.status(this.STATUS_OK)
	}

	destroy() {
		if (this.data.interval) {
			clearInterval(this.data.interval)
		}
	}
}

module.exports = MixEffectInstance
