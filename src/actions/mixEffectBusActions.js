const { generateChoices, option } = require('./utils')
const { availability } = require('../switchers/types')

const mixEffectBusActions = ({ context }) => {
	const actions = {}

	actions.selectMixEffectBus = {
		name: 'M/E: Select Mix Effect Bus',
		options: [
			{
				type: 'dropdown',
				label: 'Mix Effect Bus',
				id: 'mixEffectBus',
				choices: generateChoices({
					label: 'M/E',
					count: context.switcher.mixEffectBuses,
					selected: false,
					numberAll: true,
				}),
				default: 1,
			},
		],
		callback: ({ options }) => {
			context.updateVariable('mix_effect_bus', options.mixEffectBus)
		},
	}

	actions.fadeToBlackAuto = {
		name: 'M/E: Fade to Black Auto',
		options: [option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/ftb', [
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.fadeToBlackRate = {
		name: 'M/E: Fade to Black Rate',
		options: [option.rate(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/ftb/rate', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.setPreviewInput = {
		name: 'M/E: Set Preview Input',
		options: [
			option.videoSources({
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.auxiliary,
			}),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/preview', [
				{ type: 'i', value: options.videoSource },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.setProgramInput = {
		name: 'M/E: Set Program Input',
		options: [
			option.videoSources({
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.auxiliary,
			}),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/program', [
				{ type: 'i', value: options.videoSource },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	return actions
}

module.exports = {
	mixEffectBusActions,
}
