const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')

const feedbacksDefinitions = [
	{ id: 'colorHue', stateId: 'hue', label: 'Color Generator: Hue', optionType: 'hue' },
	{ id: 'colorSaturation', stateId: 'saturation', label: 'Color Generator: Saturation', optionType: 'saturation' },
	{ id: 'colorLuminance', stateId: 'luminance', label: 'Color Generator: Luminance', optionType: 'luminance' },
]

const getFeedbackNames = () => feedbacksDefinitions.map(({ id }) => id)

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ label, id, stateId, optionType }) => {
		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				context,
				label,
				options: [option[optionType](), option.colorGenerators()],
				callback: ({ options }) => {
					const colorGeneratorId = context.selectedOrValue('color_generator', options.colorGenerator) - 1
					return options[optionType] === context.state.colorGenerators[colorGeneratorId][stateId]
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
