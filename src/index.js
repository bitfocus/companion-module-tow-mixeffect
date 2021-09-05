const instance_skel = require('../../../instance_skel')

const configs = require('./configs')
const actions = require('./actions')
const constants = require('./constants')
const presets = require('./presets')
const variables = require('./variables');
const feedbacks = require('./feedbacks');

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

		this.config = config;

		this.store = {
			variables: {
				selectedMediaPlayer: 1,
			}
		}

		this.initConstants()
		this.initActions()
		this.initPresets()
	}

	init() {
		this.initFeedbacks()
		this.initVariableDefinitions()
		this.status(this.STATUS_OK)
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
