const { generateChoices, option } = require('./utils')
const { availability } = require('../switchers/types')

const auxiliaryActions = ({ context }) => {
	const actions = {}

	actions.setAuxSource = {
		label: 'AUX: Set Aux/Output Source',
		options: [
			option.videoSources({
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.auxiliary,
			}),
			{
				type: 'dropdown',
				label: 'Aux',
				id: 'aux',
				default: 1,
				choices: generateChoices({ label: 'AUX', count: context.switcher.auxBuses, selected: false }),
			},
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/aux/source', [
				{ type: 'i', value: options.videoSource },
				{ type: 'i', value: options.aux },
			])
		},
	}

	return actions
}

module.exports = {
	auxiliaryActions,
}
