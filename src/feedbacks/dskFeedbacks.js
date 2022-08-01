const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [
	{ id: 'dskKeySource', stateId: 'keySource', label: 'DSK: Key Source', optionType: 'keySource' },
	{ id: 'dskInvertKey', stateId: 'invertKey', label: 'DSK: Invert Key Status', optionType: 'onOff' },
	{ id: 'dskInTransition', stateId: 'inTransition', label: 'DSK: In Transition', optionType: 'onOff' },
	{ id: 'dskTie', stateId: 'tie', label: 'DSK: Tie', optionType: 'onOff' },
	{ id: 'dskFillSource', stateId: 'fillSource', label: 'DSK: Fill Source', optionType: 'fillSource' },
	{ id: 'dskOnAir', stateId: 'onAir', label: 'DSK: On Air', optionType: 'onOff' },
	{ id: 'dskMasked', stateId: 'masked', label: 'DSK: Masked', optionType: 'onOff' },
	{ id: 'dskRate', stateId: 'rate', label: 'DSK: Rate', optionType: 'rate' },
	{ id: 'dskPreMultiplied', stateId: 'preMultiplied', label: 'DSK: Key Pre Multiplied', optionType: 'onOff' },
	{
		id: 'dskIsAutoTransitioning',
		stateId: 'isAutoTransitioning',
		label: 'DSK: Auto Transitioning',
		optionType: 'onOff',
	},
]

const getFeedbackNames = () => feedbacksDefinitions.map(({ id }) => id)

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ label, id, stateId, optionType }) => {
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
				context.log('warn', `Invalid option type ${optionType} creating feedback ${label}`)
				return
			}
		}

		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				context,
				label,
				options: [feedbackOption, option.dsk(context)],
				callback: ({ options }) => {
					const dskId = context.selectedOrValue('dsk', options.dsk) - 1
					const optionValue = optionType === 'onOff' ? Boolean(options[optionType]) : options[optionType]
					context.debug({ [id]: optionValue, state: context.state.dsk[dskId][stateId] })
					return optionValue === context.state.dsk[dskId][stateId]
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
