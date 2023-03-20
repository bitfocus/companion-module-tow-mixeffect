const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [
	{ id: 'dsk_keySource', variableId: 'keySource', name: 'DSK: Key Source', optionType: 'keySource' },
	{ id: 'dsk_invertKey', variableId: 'invertKey', name: 'DSK: Invert Key Status', optionType: 'onOff' },
	{ id: 'dsk_inTransition', variableId: 'inTransition', name: 'DSK: In Transition', optionType: 'onOff' },
	{ id: 'dsk_tie', variableId: 'tie', name: 'DSK: Tie', optionType: 'onOff' },
	{ id: 'dsk_fillSource', variableId: 'fillSource', name: 'DSK: Fill Source', optionType: 'fillSource' },
	{ id: 'dsk_onAir', variableId: 'onAir', name: 'DSK: On Air', optionType: 'onOff' },
	{ id: 'dsk_masked', variableId: 'masked', name: 'DSK: Masked', optionType: 'onOff' },
	{ id: 'dsk_rate', variableId: 'rate', name: 'DSK: Rate', optionType: 'rate' },
	{ id: 'dsk_preMultiplied', variableId: 'preMultiplied', name: 'DSK: Key Pre Multiplied', optionType: 'onOff' },
	{
		id: 'dsk_isAutoTransitioning',
		variableId: 'isAutoTransitioning',
		name: 'DSK: Auto Transitioning',
		optionType: 'onOff',
	},
]

const getFeedbackNames = () => feedbacksDefinitions.map(({ id }) => id)

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id, variableId, optionType }) => {
		let feedbackOption

		switch (optionType) {
			case 'keySource': {
				feedbackOption = option.videoSources({
					label: 'Key Source',
					id: 'keySource',
					context,
					sources: context.switcher.videoSources,
					predicate: (source) => source.availability.source & availability.source.keySource,
				})
				break
			}
			case 'fillSource': {
				feedbackOption = option.videoSources({
					label: 'Fill Source',
					id: 'fillSource',
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
			case 'rate': {
				feedbackOption = option.rate()
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
				options: [feedbackOption, option.dsk(context)],
				callback: ({ options }) => {
					const dskId = context.selectedOrValue('dsk', options.dsk)
					const optionValue = optionType === 'onOff' ? Boolean(options[optionType]) : options[optionType]
					const currentValue = context.getVariableValue(`dsk_${dskId}_${variableId}`)
					context.log('debug', JSON.stringify({ [id]: optionValue, state: currentValue }))
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
