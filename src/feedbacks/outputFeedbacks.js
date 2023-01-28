const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')

const feedbacksDefinitions = [
	{ id: 'output_recording', name: 'Output: Recording Status' },
	{ id: 'output_streaming', name: 'Output: Streaming Status' },
]

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id }) => {
		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				name,
				options: [option.onOff({ id, label: 'Status' })],
				callback: ({ options }) => Boolean(options[id]) === context.getVariableValue(id),
			}),
		}
	})
	return feedbacks
}

module.exports = {
	getFeedbacks,
}
