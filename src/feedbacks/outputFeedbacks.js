const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')

const feedbacksDefinitions = [
	{ id: 'recording', name: 'Output: Recording Status' },
	{ id: 'streaming', name: 'Output: Streaming Status' },
]

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id }) => {
		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				name,
				options: [option.onOff({ id, label: 'Status' })],
				callback: ({ options }) => Boolean(options[id]) === context.state.output[id],
			}),
		}
	})
	return feedbacks
}

module.exports = {
	getFeedbacks,
}
