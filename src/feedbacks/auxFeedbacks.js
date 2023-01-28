const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [{ id: 'aux_source', stateId: 'source', name: 'Aux: source' }]

const getFeedbackNames = () => feedbacksDefinitions.map(({ id }) => id)

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id, stateId }) => {
		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				name,
				options: [
					option.videoSources({
						context,
						sources: context.switcher.videoSources,
						predicate: (source) => source.availability.source & availability.source.auxiliary,
					}),
					option.auxBuses(context),
				],
				callback: ({ options }) => {
					const auxBus = context.selectedOrValue('aux_bus', options.auxBus)
					const currentValue = context.getVariableValue(`aux_${auxBus}_${stateId}`)
					context.log('debug', JSON.stringify({ option: options.videoSource, state: currentValue }))
					return options.videoSource === currentValue
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
