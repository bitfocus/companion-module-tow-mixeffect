const instance_skel = require('../../../instance_skel')

const configs = require('./configs')
const actions = require('./actions')
const constants = require('./constants')
const presets = require('./presets')
// TODO
// const feedbacks = require('./feedbacks');
// const variables = require('./variables');

class MixEffectInstance extends instance_skel {
	constructor(system, id, config) {
		super(system, id, config)

		Object.assign(this, {
			...configs,
			...actions,
			...constants,
			...presets,
			// TODO
			// ...feedbacks,
			// ...variables,
		})

		this.config = config

		this.initConstants()
		this.initActions()
		this.initPresets()
	}

	init() {
		this.updateConfig()
	}

	updateConfig(config) {
		if (config) {
			this.config = config
		}

		this.status(this.STATUS_OK)
	}

	destroy() {}
}

module.exports = MixEffectInstance
