const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [
	// transitionMix
	{
		id: 'transition_mix_rate',
		variableId: 'transitionMix_rate',
		name: 'Transition: Mix: Rate',
		optionType: 'rate',
	},
	// transitionDip
	{
		id: 'transition_dip_rate',
		variableId: 'transitionDip_rate',
		name: 'Transition: Dip: Rate',
		optionType: 'rate',
	},
	{
		id: 'transition_dip_source',
		variableId: 'transitionDip_dipSource',
		name: 'Transition: Dip: Source',
		optionType: 'videoSource',
	},
	// transitionWipe
	{
		id: 'transition_wipe_rate',
		variableId: 'transitionWipe_rate',
		name: 'Transition: Wipe: Rate',
		optionType: 'rate',
	},
	{
		id: 'transition_wipe_pattern',
		variableId: 'transitionWipe_pattern',
		name: 'Transition: Wipe: Pattern',
		optionType: 'pattern',
	},
	{
		id: 'transition_wipe_reverse',
		variableId: 'transitionWipe_reverse',
		name: 'Transition: Wipe: Reverse',
		optionType: 'onOff',
	},
	{
		id: 'transition_wipe_flipFlop',
		variableId: 'transitionWipe_flipFlop',
		name: 'Transition: Wipe: Flip Flop',
		optionType: 'onOff',
	},
	{
		id: 'transition_wipe_fillSource',
		variableId: 'transitionWipe_fillSource',
		name: 'Transition: Wipe: Fill Source',
		optionType: 'fillSource',
	},
	// transitionDve
	{
		id: 'transition_dve_style',
		variableId: 'transitionDve_style',
		name: 'Transition: DVE: Style',
		optionType: 'style',
	},
	{
		id: 'transition_dve_rate',
		variableId: 'transitionDve_rate',
		name: 'Transition: DVE: Rate',
		optionType: 'rate',
	},
	{
		id: 'transition_dve_reverse',
		variableId: 'transitionDve_reverse',
		name: 'Transition: DVE: Reverse',
		optionType: 'onOff',
	},
	{
		id: 'transition_dve_flipFlop',
		variableId: 'transitionDve_flipFlop',
		name: 'Transition: DVE: Flip Flop',
		optionType: 'onOff',
	},
	{
		id: 'transition_dve_preMultiplied',
		variableId: 'transitionDve_preMultiplied',
		name: 'Transition: DVE: Pre-Multiplied',
		optionType: 'onOff',
	},
	{
		id: 'transition_dve_invertKey',
		variableId: 'transitionDve_invertKey',
		name: 'Transition: DVE: Invert Key',
		optionType: 'onOff',
	},
	{
		id: 'transition_dve_enableKey',
		variableId: 'transitionDve_enableKey',
		name: 'Transition: DVE: Enable Key',
		optionType: 'onOff',
	},
	{
		id: 'transition_dve_fillSource',
		variableId: 'transitionDve_fillSource',
		name: 'Transition: DVE: Fill Source',
		optionType: 'fillSource',
	},
	{
		id: 'transition_dve_keySource',
		variableId: 'transitionDve_keySource',
		name: 'Transition: DVE: Key Source',
		optionType: 'keySource',
	},
	// transitionSting
	{
		id: 'transition_sting_source',
		variableId: 'transitionSting_source',
		name: 'Transition: Sting: Source',
		optionType: 'videoSource',
	},
	{
		id: 'transition_sting_mixRate',
		variableId: 'transitionSting_mixRate',
		name: 'Transition: Sting: Mix Rate',
		optionType: 'rate',
	},
	{
		id: 'transition_sting_preMultiplied',
		variableId: 'transitionSting_preMultiplied',
		name: 'Transition: Sting: Pre-Multiplied',
		optionType: 'onOff',
	},
	{
		id: 'transition_sting_invertKey',
		variableId: 'transitionSting_invertKey',
		name: 'Transition: Sting: Invert Key',
		optionType: 'onOff',
	},
]

const getFeedbackNames = () => feedbacksDefinitions.map(({ id }) => id)

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id, variableId, optionType }) => {
		let feedbackOption

		switch (optionType) {
			case 'videoSource': {
				feedbackOption = option.videoSources({
					label: 'Key Source',
					id: optionType,
					context,
					sources: context.switcher.videoSources,
					predicate: (source) => source.availability.source & source.availability.me,
				})
				break
			}
			case 'fillSource': {
				feedbackOption = option.videoSources({
					label: 'Fill Source',
					id: optionType,
					context,
					sources: context.switcher.videoSources,
					predicate: (source) => source.availability.source & availability.source.keySource,
				})
				break
			}
			case 'keySource': {
				feedbackOption = option.videoSources({
					label: 'Key Source',
					id: optionType,
					context,
					sources: context.switcher.videoSources,
					predicate: (source) => source.availability.source & availability.source.keySource,
				})
				break
			}
			case 'onOff': {
				feedbackOption = option.onOff({ id: optionType, label: 'Status' })
				break
			}
			case 'pattern': {
				feedbackOption = option.pattern()
				break
			}
			case 'rate': {
				feedbackOption = option.rate()
				break
			}
			case 'style': {
				feedbackOption = option.style()
				break
			}
			default: {
				context.log('warn', `Invalid option type ${optionType} creating feedback ${name}`)
				return
			}
		}

		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				name,
				options: [feedbackOption, option.mixEffectBus(context)],
				callback: ({ options }) => {
					const meId = context.selectedOrValue('mix_effect_bus', options.mixEffectBus)
					const optionValue = optionType === 'onOff' ? Boolean(options[optionType]) : options[optionType]
					const currentValue = context.getVariableValue(`me_${meId}_${variableId}`)
					return optionValue === currentValue
				},
			}),
		}
	})

	return feedbacks
}

module.exports = {
	getFeedbacks,
	getFeedbackNames,
}
