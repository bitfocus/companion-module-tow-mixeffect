const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')

const feedbacksDefinitions = [
	{ id: 'output_recording', name: 'Output: Recording Status', variableId: 'output_recording' },
	{ id: 'output_streaming', name: 'Output: Streaming Status', variableId: 'output_streaming' },
]

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id, variableId }) => {
		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				name,
				options: [option.onOff({ id, label: 'Status' })],
				callback: ({ options }) => Boolean(options[id]) === context.getVariableValue(variableId),
			}),
		}
	})
	return feedbacks
}

module.exports = {
	getFeedbacks,
}
