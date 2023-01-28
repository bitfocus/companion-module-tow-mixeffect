const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')

const feedbacksDefinitions = [
	{ id: 'colorGenerator_hue', stateId: 'hue', name: 'Color Generator: Hue', optionType: 'hue' },
	{
		id: 'colorGenerator_saturation',
		stateId: 'saturation',
		name: 'Color Generator: Saturation',
		optionType: 'saturation',
	},
	{
		id: 'colorGenerator_luminance',
		stateId: 'luminance',
		name: 'Color Generator: Luminance',
		optionType: 'luminance',
	},
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
					const colorGeneratorId = context.selectedOrValue('color_generator', options.colorGenerator)
					const currentValue = context.getVariableValue(`colorGenerator_${colorGeneratorId}_${stateId}`)
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
