const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [
	{
		id: 'superSource_art_preMultiplied',
		name: 'SuperSource: Art: Pre-Multiplied',
		variableId: 'art_preMultiplied',
		optionType: 'onOff',
		stateType: '',
	},
	{
		id: 'superSource_art_invertKey',
		name: 'SuperSource: Art: Invert Key',
		variableId: 'art_invertKey',
		optionType: 'onOff',
		stateType: '',
	},
	{
		id: 'superSource_art_border',
		name: 'SuperSource: Art: Border',
		variableId: 'art_borderEnabled',
		optionType: 'onOff',
		stateType: '',
	},
	{
		id: 'superSource_currentPreset',
		name: 'SuperSource: Current Preset',
		variableId: 'currentPreset',
		optionType: 'superSource',
		stateType: '',
	},
	{
		id: 'superSource_box_source',
		name: 'SuperSource: Box: Source',
		variableId: 'source',
		optionType: 'videoSource',
		stateType: 'box',
	},
	{
		id: 'superSource_box_highlight',
		name: 'SuperSource: Box: Highlight',
		variableId: 'highlighted',
		optionType: 'onOff',
		stateType: 'box',
	},
	{
		id: 'superSource_box_crop',
		name: 'SuperSource: Box: Crop',
		variableId: 'cropped',
		optionType: 'onOff',
		stateType: 'box',
	},
	{
		id: 'superSource_box_enable',
		name: 'SuperSource: Box: Enable',
		variableId: 'enabled',
		optionType: 'onOff',
		stateType: 'box',
	},
]

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id, variableId, optionType, stateType }) => {
		let stateOption
		switch (stateType) {
			case 'box':
				stateOption = option.box()
				break
			default: {
				stateOption = option.empty('noState')
				break
			}
		}

		let feedbackOption = []

		switch (optionType) {
			case 'videoSource': {
				feedbackOption = option.videoSources({
					label: 'Video Source',
					id: optionType,
					context,
					sources: context.switcher.videoSources,
					predicate: (source) => source.availability.source & availability.source.superSourceBox,
				})
				break
			}
			case 'onOff': {
				feedbackOption = option.onOff({ id: optionType, label: 'Status' })
				break
			}
			case 'superSource': {
				feedbackOption = option.empty('noOption')
				break
			}
			default: {
				context.log('warn', `Invalid option type ${optionType} creating feedback ${name}`)
				return
			}
		}

		feedbacks = {
			...feedbacks,
			[id]: generateFeedback({
				name,
				options: [
					stateOption,
					feedbackOption,
					optionType === 'superSource' ? option.superSource(context, false) : option.superSource(context),
				],
				callback: ({ options }) => {
					const ssId = context.selectedOrValue('supersource', options.superSource)

					const optionValue = optionType === 'onOff' ? Boolean(options[optionType]) : options[optionType]

					let state = variableId
					if (stateType === 'box') {
						state = `box_${options.box}_` + state
					}

					const currentValue = context.getVariableValue(`superSource_ssrc_${ssId}_${state}`)
					context.log('info', `superSource_ssrc_${ssId}_${state}`)

					return optionValue === currentValue
				},
			}),
		}
	})
	return feedbacks
}

module.exports = {
	getFeedbacks,
}
