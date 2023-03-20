const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')

const feedbacksDefinitions = [
	{ id: 'colorGenerator_hue', variableId: 'hue', name: 'Color Generator: Hue', optionType: 'hue' },
	{
		id: 'colorGenerator_saturation',
		variableId: 'saturation',
		name: 'Color Generator: Saturation',
		optionType: 'saturation',
	},
	{
		id: 'colorGenerator_luminance',
		variableId: 'luminance',
		name: 'Color Generator: Luminance',
		optionType: 'luminance',
	},
]

const getFeedbackNames = () => feedbacksDefinitions.map(({ id }) => id)

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id, variableId, optionType }) => {
		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				name,
				options: [option[optionType](), option.colorGenerators()],
				callback: ({ options }) => {
					const colorGeneratorId = context.selectedOrValue('color_generator', options.colorGenerator)
					const currentValue = context.getVariableValue(`colorGenerator_${colorGeneratorId}_${variableId}`)
					return options[optionType] === currentValue
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
