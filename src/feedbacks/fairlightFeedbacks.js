const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')

const feedbacksDefinitions = [
	{ id: 'fairlightAudio_vfaEnabled', variableId: 'fairlightAudio_vfaEnabled', name: 'Video Follows Audio: Status' },
]

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, variableId }) => {
		feedbacks = {
			...feedbacks,
			[variableId]: generateFeedback({
				name,
				options: [option.onOff({ variableId, label: 'Status' })],
				callback: ({ options }) => Boolean(options[variableId]) === context.getVariableValue(variableId),
			}),
		}
	})
	return feedbacks
}

module.exports = {
	getFeedbacks,
}
