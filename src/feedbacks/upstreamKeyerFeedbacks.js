const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [
	{
		id: 'usk_fillSource',
		stateId: 'fillSource',
		name: 'USK: Fill Source',
		optionType: 'fillSource',
	},
	{
		id: 'usk_keySource',
		stateId: 'keySource',
		name: 'USK: Key Source',
		optionType: 'keySource',
	},
	{
		id: 'usk_masked',
		stateId: 'masked',
		name: 'USK: Masked',
		optionType: 'onOff',
	},
	{
		id: 'usk_flyingKey',
		stateId: 'flyEnabled',
		name: 'USK: Flying Key',
		optionType: 'onOff',
	},
	{
		id: 'usk_pattern_pattern',
		stateId: 'pattern_pattern',
		name: 'USK: Pattern: Pattern',
		optionType: 'pattern',
	},
	{
		id: 'usk_pattern_invert',
		stateId: 'pattern_invertPattern',
		name: 'USK: Pattern: Invert',
		optionType: 'onOff',
	},
	{
		id: 'usk_dve_mask',
		stateId: 'dve_masked',
		name: 'USK: DVE: Mask',
		optionType: 'onOff',
	},
	{
		id: 'usk_dve_shadow',
		stateId: 'dve_shadow',
		name: 'USK: DVE: Shadow',
		optionType: 'onOff',
	},
	{
		id: 'usk_dve_border',
		stateId: 'dve_borderEnabled',
		name: 'USK: DVE: Border',
		optionType: 'onOff',
	},
	{
		id: 'usk_onAir',
		stateId: 'onAir',
		name: 'USK: On Air',
		optionType: 'onOff',
	},
]

const getFeedbackNames = () => feedbacksDefinitions.map(({ id }) => id)

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id, stateId, optionType }) => {
		let feedbackOption

		switch (optionType) {
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
			case 'fillSource': {
				feedbackOption = option.videoSources({
					label: 'Fill Source',
					id: optionType,
					context,
					sources: context.switcher.videoSources,
					predicate: (source) => source.availability.source & availability.source.auxiliary,
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
			default: {
				context.log('warn', `Invalid option type ${optionType} creating feedback ${name}`)
				return
			}
		}

		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				name,
				options: [feedbackOption, option.mixEffectBus(context), option.usk(context)],
				callback: ({ options }) => {
					const meId = context.selectedOrValue('mix_effect_bus', options.mixEffectBus)
					const uskId = context.selectedOrValue('usk', options.usk)
					const optionValue = optionType === 'onOff' ? Boolean(options[optionType]) : options[optionType]
					const currentValue = context.getVariableValue(`me_${meId}_usk_${uskId}_${stateId}`)
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
