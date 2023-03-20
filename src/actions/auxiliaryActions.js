const { option } = require('./utils')
const { availability } = require('../switchers/types')

const auxiliaryActions = ({ context }) => {
	const actions = {}

	actions.selectAuxBus = {
		name: 'AUX: Select AUX Bus',
		options: [option.auxBuses(context, false)],
		callback: ({ options }) => {
			context.updateVariable('aux_bus', options.auxBus)
		},
	}

	actions.setAuxSource = {
		name: 'AUX: Set Aux/Output Source',
		options: [
			option.videoSources({
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.auxiliary,
			}),
			option.auxBuses(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/aux/source', [
				{ type: 'i', value: options.videoSource },
				{ type: 'i', value: context.selectedOrValue('aux_bus', options.auxBus) },
			])
		},
	}

	return actions
}

module.exports = {
	auxiliaryActions,
}
