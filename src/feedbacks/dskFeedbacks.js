const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [
	{ id: 'dsk_keySource', stateId: 'keySource', name: 'DSK: Key Source', optionType: 'keySource' },
	{ id: 'dsk_invertKey', stateId: 'invertKey', name: 'DSK: Invert Key Status', optionType: 'onOff' },
	{ id: 'dsk_inTransition', stateId: 'inTransition', name: 'DSK: In Transition', optionType: 'onOff' },
	{ id: 'dsk_tie', stateId: 'tie', name: 'DSK: Tie', optionType: 'onOff' },
	{ id: 'dsk_fillSource', stateId: 'fillSource', name: 'DSK: Fill Source', optionType: 'fillSource' },
	{ id: 'dsk_onAir', stateId: 'onAir', name: 'DSK: On Air', optionType: 'onOff' },
	{ id: 'dsk_masked', stateId: 'masked', name: 'DSK: Masked', optionType: 'onOff' },
	{ id: 'dsk_rate', stateId: 'rate', name: 'DSK: Rate', optionType: 'rate' },
	{ id: 'dsk_preMultiplied', stateId: 'preMultiplied', name: 'DSK: Key Pre Multiplied', optionType: 'onOff' },
	{
		id: 'dsk_isAutoTransitioning',
		stateId: 'isAutoTransitioning',
		name: 'DSK: Auto Transitioning',
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
					const currentValue = context.getVariableValue(`dsk_${dskId}_${stateId}`)
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
