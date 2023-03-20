const { SELECTED_ID } = require('./utils')
const { appActions } = require('./appActions')
const { auxiliaryActions } = require('./auxiliaryActions')
const { colorGeneratorActions } = require('./colorGeneratorActions')
const { downstreamKeyerActions } = require('./downstreamKeyerActions')
const { fairlightActions } = require('./fairlightActions')
const { mediaPlayerActions } = require('./mediaPlayerActions')
const { macroActions } = require('./macroActions')
const { mixEffectBusActions } = require('./mixEffectBusActions')
const { multiViewerActions } = require('./multiViewerActions')
const { outputActions } = require('./outputActions')
const { superSourceActions } = require('./superSourceActions')
const { switcherActions } = require('./switcherActions')
const { transitionActions } = require('./transitionActions')
const { upstreamKeyerActions } = require('./upstreamKeyerActions')

module.exports = {
	initActions() {
		this.setActionDefinitions({
			...appActions({ context: this }),
			...auxiliaryActions({ context: this }),
			...colorGeneratorActions({ context: this }),
			...downstreamKeyerActions({ context: this }),
			...fairlightActions({ context: this }),
			...mediaPlayerActions({ context: this }),
			...macroActions({ context: this }),
			...mixEffectBusActions({ context: this }),
			...multiViewerActions({ context: this }),
			...outputActions({ context: this }),
			...superSourceActions({ context: this }),
			...switcherActions({ context: this }),
			...transitionActions({ context: this }),
			...upstreamKeyerActions({ context: this }),
		})
	},

	oscSendPath(path, args = []) {
		console.log('osc_send', this.config.ip, this.config.port, path, args)
		this.oscSend(this.config.ip, this.config.port, path, args)
	},

	selectedOrValue(variableName, value) {
		let selectedValue = value

		if (selectedValue === SELECTED_ID) {
			selectedValue = this.getVariableValue(variableName)
		}

		return selectedValue
	},
}
