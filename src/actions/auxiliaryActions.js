const { option } = require('./utils')
const { availability } = require('../switchers/types')
const { getFeedbackNames } = require('../feedbacks/auxFeedbacks')

const auxiliaryActions = ({ context }) => {
	const actions = {}

	actions.selectAuxBus = {
		label: 'AUX: Select AUX Bus',
		options: [option.auxBuses(context, false)],
		callback: ({ options }) => {
			context.updateVariable('aux_bus', options.auxBus)
			context.checkFeedbacks(...getFeedbackNames())
		},
	}

	actions.setAuxSource = {
		label: 'AUX: Set Aux/Output Source',
		options: [
			option.videoSources({
				context,
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.auxiliary,
			}),
			option.auxBuses(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/aux/source', [
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
