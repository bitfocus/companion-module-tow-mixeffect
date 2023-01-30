const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [
	// transitionMix
	{
		id: 'transition_mix_rate',
		stateId: 'transitionMix_rate',
		name: 'Transition: Mix: Rate',
		optionType: 'rate',
	},
	// transitionDip
	{
		id: 'transition_dip_rate',
		stateId: 'transitionDip_rate',
		name: 'Transition: Dip: Rate',
		optionType: 'rate',
	},
	{
		id: 'transition_dip_source',
		stateId: 'transitionDip_dipSource',
		name: 'Transition: Dip: Source',
		optionType: 'videoSource',
	},
	// transitionWipe
	{
		id: 'transition_wipe_rate',
		stateId: 'transitionWipe_rate',
		name: 'Transition: Wipe: Rate',
		optionType: 'rate',
	},
	{
		id: 'transition_wipe_pattern',
		stateId: 'transitionWipe_pattern',
		name: 'Transition: Wipe: Pattern',
		optionType: 'pattern',
	},
	{
		id: 'transition_wipe_reverse',
		stateId: 'transitionWipe_reverse',
		name: 'Transition: Wipe: Reverse',
		optionType: 'onOff',
	},
	{
		id: 'transition_wipe_flipFlop',
		stateId: 'transitionWipe_flipFlop',
		name: 'Transition: Wipe: Flip Flop',
		optionType: 'onOff',
	},
	{
		id: 'transition_wipe_fillSource',
		stateId: 'transitionWipe_fillSource',
		name: 'Transition: Wipe: Fill Source',
		optionType: 'fillSource',
	},
	// transitionDve
	{
		id: 'transition_dve_style',
		stateId: 'transitionDve_style',
		name: 'Transition: DVE: Style',
		optionType: 'style',
	},
	{
		id: 'transition_dve_rate',
		stateId: 'transitionDve_rate',
		name: 'Transition: DVE: Rate',
		optionType: 'rate',
	},
	{
		id: 'transition_dve_reverse',
		stateId: 'transitionDve_reverse',
		name: 'Transition: DVE: Reverse',
		optionType: 'onOff',
	},
	{
		id: 'transition_dve_flipFlop',
		stateId: 'transitionDve_flipFlop',
		name: 'Transition: DVE: Flip Flop',
		optionType: 'onOff',
	},
	{
		id: 'transition_dve_preMultiplied',
		stateId: 'transitionDve_preMultiplied',
		name: 'Transition: DVE: Pre-Multiplied',
		optionType: 'onOff',
	},
	{
		id: 'transition_dve_invertKey',
		stateId: 'transitionDve_invertKey',
		name: 'Transition: DVE: Invert Key',
		optionType: 'onOff',
	},
	{
		id: 'transition_dve_enableKey',
		stateId: 'transitionDve_enableKey',
		name: 'Transition: DVE: Enable Key',
		optionType: 'onOff',
	},
	{
		id: 'transition_dve_fillSource',
		stateId: 'transitionDve_fillSource',
		name: 'Transition: DVE: Fill Source',
		optionType: 'fillSource',
	},
	{
		id: 'transition_dve_keySource',
		stateId: 'transitionDve_keySource',
		name: 'Transition: DVE: Key Source',
		optionType: 'keySource',
	},
	// transitionSting
	{
		id: 'transition_sting_source',
		stateId: 'transitionSting_source',
		name: 'Transition: Sting: Source',
		optionType: 'videoSource',
	},
	{
		id: 'transition_sting_mixRate',
		stateId: 'transitionSting_mixRate',
		name: 'Transition: Sting: Mix Rate',
		optionType: 'rate',
	},
	{
		id: 'transition_sting_preMultiplied',
		stateId: 'transitionSting_preMultiplied',
		name: 'Transition: Sting: Pre-Multiplied',
		optionType: 'onOff',
	},
	{
		id: 'transition_sting_invertKey',
		stateId: 'transitionSting_invertKey',
		name: 'Transition: Sting: Invert Key',
		optionType: 'onOff',
	},
]

const getFeedbackNames = () => feedbacksDefinitions.map(({ id }) => id)

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id, stateId, optionType }) => {
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
					const currentValue = context.getVariableValue(`me_${meId}_${stateId}`)
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
