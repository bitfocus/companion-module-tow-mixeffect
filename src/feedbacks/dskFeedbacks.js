const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [
	{ id: 'dskKeySource', stateId: 'keySource', name: 'DSK: Key Source', optionType: 'keySource' },
	{ id: 'dskInvertKey', stateId: 'invertKey', name: 'DSK: Invert Key Status', optionType: 'onOff' },
	{ id: 'dskInTransition', stateId: 'inTransition', name: 'DSK: In Transition', optionType: 'onOff' },
	{ id: 'dskTie', stateId: 'tie', name: 'DSK: Tie', optionType: 'onOff' },
	{ id: 'dskFillSource', stateId: 'fillSource', name: 'DSK: Fill Source', optionType: 'fillSource' },
	{ id: 'dskOnAir', stateId: 'onAir', name: 'DSK: On Air', optionType: 'onOff' },
	{ id: 'dskMasked', stateId: 'masked', name: 'DSK: Masked', optionType: 'onOff' },
	{ id: 'dskRate', stateId: 'rate', name: 'DSK: Rate', optionType: 'rate' },
	{ id: 'dskPreMultiplied', stateId: 'preMultiplied', name: 'DSK: Key Pre Multiplied', optionType: 'onOff' },
	{
		id: 'dskIsAutoTransitioning',
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
