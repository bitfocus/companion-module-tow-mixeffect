const instance_skel = require('../../../instance_skel')

const configs = require('./configs')
const actions = require('./actions')
const constants = require('./constants')
const presets = require('./presets')
const variables = require('./variables')
const feedbacks = require('./feedbacks')
const upgrades = require('./upgrades')

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
		})

		this.config = config

		this.store = {
			variables: {},
		}
	}

	static GetUpgradeScripts() {
		return [upgrades.v1_1_0]
	}

	static DEVELOPER_forceStartupUpgradeScript = 0

	init() {
		this.switcher = switchers.find(({ id }) => this.config.model === id)
		if (!this.switcher) {
			return this.status(this.STATUS_ERROR, 'Unknown Switcher')
		}

		this.initConstants()
		this.initActions()
		this.initPresets()
		this.initFeedbacks()
		this.initVariables()

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

		this.status(this.STATUS_OK)
	}

	destroy() {}
}

module.exports = MixEffectInstance
