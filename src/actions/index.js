const { SELECTED_ID } = require('./utils')
const { appActions } = require('./appActions')
const { auxiliaryActions } = require('./auxiliaryActions')
const { colorGeneratorActions } = require('./colorGeneratorActions')
const { downstreamKeyerActions } = require('./downstreamKeyerActions')
const { fairlightActions } = require('./fairlightActions')
const { mediaPlayerActions } = require('./mediaPlayerActions')
const { macroActions } = require('./macroActions')
const { mixEffectBusActions } = require('./mixEffectBusActions')
const { multiviewActions } = require('./multiviewActions')
const { outputActions } = require('./outputActions')
const { superSourceActions } = require('./superSourceActions')
const { switcherActions } = require('./switcherActions')
const { transitionActions } = require('./transitionActions')
const { upstreamKeyerActions } = require('./upstreamKeyerActions')

module.exports = {
	initActions() {
		this.setActions({
			...appActions({ context: this }),
			...auxiliaryActions({ context: this }),
			...colorGeneratorActions({ context: this }),
			...downstreamKeyerActions({ context: this }),
			...fairlightActions({ context: this }),
			...mediaPlayerActions({ context: this }),
			...macroActions({ context: this }),
			...mixEffectBusActions({ context: this }),
			...multiviewActions({ context: this }),
			...outputActions({ context: this }),
			...superSourceActions({ context: this }),
			...switcherActions({ context: this }),
			...transitionActions({ context: this }),
			...upstreamKeyerActions({ context: this }),
		})
	},

	oscSend(path, args = []) {
		console.log('osc_send', this.config.ip, this.config.port, path, args)
		this.system.emit('osc_send', this.config.ip, this.config.port, path, args)
	},

	selectedOrValue(variableName, value) {
		let selectedValue = value

		if (selectedValue === SELECTED_ID) {
			this.getVariable(variableName, (variableValue) => (selectedValue = variableValue))
		}

		return selectedValue
	},
}
