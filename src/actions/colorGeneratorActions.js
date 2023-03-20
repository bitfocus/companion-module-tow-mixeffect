const { option } = require('./utils')

const colorGeneratorActions = ({ context }) => {
	const actions = {}

	actions.selectColorGenerator = {
		name: 'Color Generator: Select Color Generator',
		options: [option.colorGenerators(false)],
		callback: ({ options }) => {
			context.updateVariable('color_generator', options.colorGenerator)
		},
	}

	actions.setColorGenerator = {
		name: 'Color Generator: Set',
		options: [option.hue(), option.saturation(), option.luminance(), option.colorGenerators()],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/color-generator', [
				{ type: 'f', value: parseFloat(options.hue) },
				{ type: 'f', value: parseFloat(options.saturation) },
				{ type: 'f', value: parseFloat(options.luminance) },
				{ type: 'i', value: context.selectedOrValue('color_generator', options.colorGenerator) },
			])
		},
	}

	actions.colorGeneratorHueSet = {
		name: 'Color Generator: Hue Set',
		options: [option.value({ min: 0, max: 359.9, step: 0.1 }), option.colorGenerators()],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/color-generator/parameter/set', [
				{ type: 'i', value: 0 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('color_generator', options.colorGenerator) },
			])
		},
	}

	actions.colorGeneratorSaturationSet = {
		name: 'Color Generator: Saturation Set',
		options: [option.value({ min: 0, max: 100, step: 0.1 }), option.colorGenerators()],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/color-generator/parameter/set', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('color_generator', options.colorGenerator) },
			])
		},
	}

	actions.colorGeneratorLuminanceSet = {
		name: 'Color Generator: Luminance Set',
		options: [option.value({ min: 0, max: 100, step: 0.1 }), option.colorGenerators()],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/color-generator/parameter/set', [
				{ type: 'i', value: 2 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('color_generator', options.colorGenerator) },
			])
		},
	}

	actions.colorGeneratorHueAdjust = {
		name: 'Color Generator: Hue Adjust',
		options: [option.value({ min: -359.9, max: 359.9, step: 0.1 }), option.colorGenerators()],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/color-generator/parameter/adjust', [
				{ type: 'i', value: 0 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('color_generator', options.colorGenerator) },
			])
		},
	}

	actions.colorGeneratorSaturationAdjust = {
		name: 'Color Generator: Saturation Adjust',
		options: [option.value({ min: -100, max: 100, step: 0.1 }), option.colorGenerators()],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/color-generator/parameter/adjust', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('color_generator', options.colorGenerator) },
			])
		},
	}

	actions.colorGeneratorLuminanceAdjust = {
		name: 'Color Generator: Luminance Adjust',
		options: [option.value({ min: -100, max: 100 }), option.colorGenerators()],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/color-generator/parameter/adjust', [
				{ type: 'i', value: 2 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('color_generator', options.colorGenerator) },
			])
		},
	}

	return actions
}

module.exports = {
	colorGeneratorActions,
}
