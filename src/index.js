const osc = require('osc')
const { Mutex } = require('async-mutex')

const instance_skel = require('../../../instance_skel')

const configs = require('./configs')
const actions = require('./actions')
const constants = require('./constants')
const presets = require('./presets')
const variables = require('./variables')
const feedbacks = require('./feedbacks')
const upgrades = require('./upgrades')

const switchers = require('./switchers')
const state = require('./state')

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
			...state,
		})

		this.config = config
		this.osc = null
		this.oscInterval = null
		this.oscLastMessage = null
		this.switcher = null

		this.initConstants()

		this.store = {
			variables: {},
		}

		this.updatingState = new Mutex()

		this.state = {
			dsk: [],
			superSource: {},
			output: {},
			fairlight: {},
			sources: [],
			colorGenerators: [],
			mediaPool: {},
			aux: [],
			multiview: [],
			me: [],
			macros: {},
		}
	}

	static GetUpgradeScripts() {
		return [upgrades.v1_1_0, upgrades.v1_2_0]
	}

	static DEVELOPER_forceStartupUpgradeScript = 0

	init() {
		if (!this.config.ip) {
			this.status(this.STATUS_UNKNOWN, 'Please Configure')
			return
		}

		this.initState()
		this.startOsc()
	}

	updateConfig(config) {
		this.config = config
		this.initState()
		this.startOsc()
	}

	initState() {
		this.store = {
			variables: {},
		}

		this.state = {
			dsk: [],
			superSource: {},
			output: {},
			fairlight: {},
			sources: [],
			colorGenerators: [],
			mediaPool: {},
			aux: [],
			multiview: [],
			me: [],
			macros: {},
		}
	}

	startOsc() {
		this.status(this.STATUS_UNKNOWN, 'Waiting for MixEffect')

		if (this.osc) {
			this.stopOsc()
		}

		this.osc = new osc.UDPPort({
			localAddress: '0.0.0.0',
			localPort: this.config.feedbackPort,
			metadata: true,
			broadcast: true,
		})

		this.osc.on('ready', () => {
			this.debug('osc server ready', this.config.interval)
			this.oscInterval = setInterval(() => {
				if (this.currentStatus === this.STATUS_OK) {
					const timeSinceLast = new Date().getTime() - this.oscLastMessage
					if (timeSinceLast > this.config.interval * 10) {
						this.status(this.STATUS_UNKNOWN, 'Waiting for MixEffect')
					}
				}
				try {
					this.osc.send({ address: '/mixeffect/send-companion-feedback', args: [] }, this.config.ip, this.config.port)
				} catch (error) {
					this.log('warn', `Error sending request to MixEffect: ${error}`)
				}
			}, this.config.interval)
		})

		this.osc.on('message', async (message, timeTag, info) => {
			this.oscLastMessage = new Date().getTime()

			await this.updatingState.runExclusive(() => {
				if (info.address !== this.config.ip) {
					this.log('info', `Received an OSC message from ${info.address}. This is not the configured IP for MixEffect.`)
					return
				}

				if (message.address !== '/mixeffect-companion/update') {
					this.log('info', `Received unknown message from ${info.address}. Message received: ${message.address}`)
					return
				}

				if (message.args.length !== 2) {
					this.log('info', `Received an update message with too many args. Expected 1, received ${message.args.length}`)
					return
				}

				const { type, value } = message.args[0]
				if (type !== 's') {
					this.log('info', 'Received a message with an value of an invalid type.')
					return
				}

				try {
					const newState = JSON.parse(value)

					const missing = Object.keys(this.state).filter((name) => !(name in newState))
					if (missing.length) {
						this.log('debug', `Received state with missing keys: ${missing.join(',')}`)
						return
					}

					if (!this.switcher) {
						this.switcher = switchers.find(({ id }) => newState.model === id)

						if (!this.switcher) {
							this.stopOsc()
							this.log('error', `MixEffect Pro reporting an unknown switcher with model ${newState.model}`)
							this.status(this.STATUS_ERROR)
							return
						}

						this.log('debug', `Connected to an ${this.switcher.label} via MixEffect Pro on ${this.config.ip}`)

						this.initAssets(newState)
					}

					this.parseState(newState)
					this.status(this.STATUS_OK)
				} catch (error) {
					this.log('error', `Unable to parse JSON payload from ${info.address}.`)
					console.log(error.stack)
				}
			})
		})

		this.osc.on('error', (error) => {
			this.log('error', `OSC Error: ${error}`)
			this.debug({ source: 'osc', error })
		})

		this.osc.on('close', () => {
			this.debug('close')
		})

		this.osc.open()
	}

	stopOsc() {
		if (this.oscInterval !== null) {
			clearInterval(this.oscInterval)
			this.oscInterval = null
		}
		if (this.osc !== null) {
			this.osc.close()
			this.osc = null
		}

		this.switcher = null

		this.updatingState.cancel()
	}

	initAssets(newState) {
		this.state = newState

		this.initActions()
		this.initPresets()
		this.initFeedbacks()
		this.initVariables()

		this.initState()
	}

	getVideoSourceName(sourceId) {
		const source = this.switcher.videoSources.find(({ id }) => id === sourceId)
		return source ? source.label : 'Unknown'
	}

	destroy() {
		this.stopOsc()
	}
}

module.exports = MixEffectInstance
