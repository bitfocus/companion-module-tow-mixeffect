const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')

const feedbacksDefinitions = [
	{ id: 'colorHue', stateId: 'hue', name: 'Color Generator: Hue', optionType: 'hue' },
	{ id: 'colorSaturation', stateId: 'saturation', name: 'Color Generator: Saturation', optionType: 'saturation' },
	{ id: 'colorLuminance', stateId: 'luminance', name: 'Color Generator: Luminance', optionType: 'luminance' },
]

const getFeedbackNames = () => feedbacksDefinitions.map(({ id }) => id)

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id, stateId, optionType }) => {
		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				name,
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
