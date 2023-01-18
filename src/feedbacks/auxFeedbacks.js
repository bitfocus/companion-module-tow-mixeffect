const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [{ id: 'auxSource', stateId: 'source', name: 'Aux: source' }]

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
					const auxBus = context.selectedOrValue('aux_bus', options.auxBus) - 1
					context.debug({ option: options.videoSource, state: context.state.aux[auxBus][stateId] })
					return options.videoSource === context.state.aux[auxBus][stateId]
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
