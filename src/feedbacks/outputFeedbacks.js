const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')

const feedbacksDefinitions = [
	{ id: 'recording', label: 'Output: Recording Status' },
	{ id: 'streaming', label: 'Output: Streaming Status' },
]

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ label, id }) => {
		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				context,
				label,
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
