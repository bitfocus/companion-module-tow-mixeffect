const { generateFeedback } = require('./utils')
const { option } = require('../actions/utils')
const { availability } = require('../switchers/types')

const feedbacksDefinitions = [
	{
		id: 'superSource_art_preMultiplied',
		name: 'SuperSource: Art: Pre-Multiplied',
		stateId: 'art_preMultiplied',
		optionType: 'onOff',
		stateType: '',
	},
	{
		id: 'superSource_art_invertKey',
		name: 'SuperSource: Art: Invert Key',
		stateId: 'art_invertKey',
		optionType: 'onOff',
		stateType: '',
	},
	{
		id: 'superSource_art_border',
		name: 'SuperSource: Art: Border',
		stateId: 'art_borderEnabled',
		optionType: 'onOff',
		stateType: '',
	},
	{
		id: 'superSource_currentPreset',
		name: 'SuperSource: Current Preset',
		stateId: 'currentPreset',
		optionType: 'superSource',
		stateType: '',
	},
	{
		id: 'superSource_box_source',
		name: 'SuperSource: Box: Source',
		stateId: 'source',
		optionType: 'videoSource',
		stateType: 'box',
	},
	{
		id: 'superSource_box_highlight',
		name: 'SuperSource: Box: Highlight',
		stateId: 'highlighted',
		optionType: 'onOff',
		stateType: 'box',
	},
	{
		id: 'superSource_box_crop',
		name: 'SuperSource: Box: Crop',
		stateId: 'cropped',
		optionType: 'onOff',
		stateType: 'box',
	},
	{
		id: 'superSource_box_enable',
		name: 'SuperSource: Box: Enable',
		stateId: 'enabled',
		optionType: 'onOff',
		stateType: 'box',
	},
]

const getFeedbacks = ({ context }) => {
	let feedbacks = {}

	feedbacksDefinitions.forEach(({ name, id, stateId, optionType, stateType }) => {
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

					let state = stateId
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
