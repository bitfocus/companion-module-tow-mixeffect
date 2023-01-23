const { option } = require('./utils')
const { availability } = require('../switchers/types')

const upstreamKeyerActions = ({ context }) => {
	const actions = {}

	actions.uskSelect = {
		name: 'USK: Select',
		options: [option.usk(context, false)],
		callback: ({ options }) => {
			context.updateVariable('usk', options.usk)
		},
	}

	actions.uskChroma = {
		name: 'USK: Chroma',
		options: [
			option.hue(),
			option.gain(),
			option.value({ label: 'ySuppress', id: 'ysuppress', step: 0.1 }),
			option.value({ label: 'Lift', id: 'lift', step: 0.1 }),
			option.onOff({ label: 'Narrow', id: 'narrow' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma', [
				{ type: 'f', value: parseFloat(options.hue) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'f', value: parseFloat(options.ysuppress) },
				{ type: 'f', value: parseFloat(options.lift) },
				{ type: 'i', value: options.narrow },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvanced = {
		name: 'USK: Chroma Advanced',
		options: [
			option.value({
				label: 'Foreground Level',
				id: 'foreground',
				step: 0.1,
			}),
			option.value({
				label: 'Background Level',
				id: 'background',
				step: 0.1,
			}),
			option.value({
				label: 'Key Edge',
				id: 'keyEdge',
				step: 0.1,
			}),
			option.value({
				label: 'Spill Suppression',
				id: 'spillSuppression',
				step: 0.1,
			}),
			option.value({
				label: 'Flare Suppression',
				id: 'flareSuppression',
				step: 0.1,
			}),
			option.brightness(),
			option.contrast(),
			option.saturation(),
			option.color({ label: 'Red', id: 'red' }),
			option.color({ label: 'Green', id: 'green' }),
			option.color({ label: 'Blue', id: 'blue' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced', [
				{ type: 'f', value: parseFloat(options.foreground) },
				{ type: 'f', value: parseFloat(options.background) },
				{ type: 'f', value: parseFloat(options.keyEdge) },
				{ type: 'f', value: parseFloat(options.spillSuppression) },
				{ type: 'f', value: parseFloat(options.flareSuppression) },
				{ type: 'f', value: parseFloat(options.brightness) },
				{ type: 'f', value: parseFloat(options.contrast) },
				{ type: 'f', value: parseFloat(options.saturation) },
				{ type: 'f', value: parseFloat(options.red) },
				{ type: 'f', value: parseFloat(options.green) },
				{ type: 'f', value: parseFloat(options.blue) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromeAdvancedSample = {
		name: 'USK: Chroma Advanced Sample',
		options: [
			{
				type: 'number',
				label: 'Sample Y (0-255)',
				id: 'sampleY',
				min: 0,
				max: 255,
				default: 0,
				range: true,
			},
			{
				type: 'number',
				label: 'Sample Cb (0-255)',
				id: 'sampleCb',
				min: 0,
				max: 255,
				default: 0,
				range: true,
			},
			{
				type: 'number',
				label: 'Sample Cr (0-255)',
				id: 'sampleCr',
				min: 0,
				max: 255,
				default: 0,
				range: true,
			},
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/sample', [
				{ type: 'i', value: options.sampleY },
				{ type: 'i', value: options.sampleCb },
				{ type: 'i', value: options.sampleCr },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedForegroundLevelSet = {
		name: 'USK: Chroma Advanced Foreground Level Set',
		options: [
			option.value({
				label: 'Foreground Level',
				id: 'foreground',
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 0 },
				{ type: 'f', value: parseFloat(options.foreground) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedForegroundLevelAdjust = {
		name: 'USK: Chroma Advanced Foreground Level Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 0 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBackgroundLevelSet = {
		name: 'USK: Chroma Advanced Background Level Set',
		options: [
			option.value({
				label: 'Background Level',
				id: 'background',
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.background) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBackgroundLevelAdjust = {
		name: 'USK: Chroma Advanced Background Level Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedKeyEdgeSet = {
		name: 'USK: Chroma Advanced Key Edge Set',
		options: [
			option.value({
				label: 'Key Edge',
				id: 'keyEdge',
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 2 },
				{ type: 'f', value: parseFloat(options.keyEdge) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedKeyEdgeAdjust = {
		name: 'USK: Chroma Advanced Key Edge Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 2 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedSpillSuppressionSet = {
		name: 'USK: Chroma Advanced Spill Suppression Set',
		options: [
			option.value({
				label: 'Spill Suppression',
				id: 'spillSuppression',
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 3 },
				{ type: 'f', value: parseFloat(options.spillSuppression) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedSpillSuppressionAdjust = {
		name: 'USK: Chroma Advanced Spill Suppression Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 3 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedFlareSuppressionSet = {
		name: 'USK: Chroma Advanced Flare Suppression Set',
		options: [
			option.value({
				label: 'Flare Suppression',
				id: 'flareSuppression',
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 4 },
				{ type: 'f', value: parseFloat(options.flareSuppression) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedFlareSuppressionAdjust = {
		name: 'USK: Chroma Advanced Flare Suppression Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 4 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBrightnessSet = {
		name: 'USK: Chroma Advanced Brightness Set',
		options: [
			option.value({
				label: 'Brightness',
				id: 'brightness',
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 5 },
				{ type: 'f', value: parseFloat(options.brightness) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBrightnessAdjust = {
		name: 'USK: Chroma Advanced Brightness Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 5 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedContrastSet = {
		name: 'USK: Chroma Advanced Contrast Set',
		options: [
			option.value({
				label: 'Contrast',
				id: 'contrast',
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 6 },
				{ type: 'f', value: parseFloat(options.contrast) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedContrastAdjust = {
		name: 'USK: Chroma Advanced Contrast Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 6 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedSaturationSet = {
		name: 'USK: Chroma Advanced Saturation Set',
		options: [
			option.value({
				label: 'Saturation',
				id: 'saturation',
				max: 200,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 7 },
				{ type: 'f', value: parseFloat(options.saturation) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedSaturationAdjust = {
		name: 'USK: Chroma Advanced Saturation Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 7 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedRedSet = {
		name: 'USK: Chroma Advanced Red Set',
		options: [
			option.value({
				label: 'Red',
				id: 'red',
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 8 },
				{ type: 'f', value: parseFloat(options.red) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedRedAdjust = {
		name: 'USK: Chroma Advanced Red Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 8 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedGreenSet = {
		name: 'USK: Chroma Advanced Green Set',
		options: [
			option.value({
				label: 'Green',
				id: 'green',
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 9 },
				{ type: 'f', value: parseFloat(options.green) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedGreenAdjust = {
		name: 'USK: Chroma Advanced Green Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 9 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBlueSet = {
		name: 'USK: Chroma Advanced Blue Set',
		options: [
			option.value({
				label: 'Blue',
				id: 'blue',
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 10 },
				{ type: 'f', value: parseFloat(options.blue) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBlueAdjust = {
		name: 'USK: Chroma Advanced Blue Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 10 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveBorder = {
		name: 'USK: DVE Border',
		options: [
			option.mode(),
			option.list({
				label: 'Bevel Style',
				id: 'style',
				list: ['No Bevel', 'Bevel In Out', 'Bevel In', 'Bevel Out'],
			}),
			option.value({
				label: 'Border Outer Width',
				id: 'outerWidth',
				max: 16,
			}),
			option.value({
				label: 'Inner Outer Width',
				id: 'innerWidth',
				max: 16,
			}),
			option.value({
				label: 'Border Outer Softness (0-100%)',
				id: 'outerSoftness',
				step: 1,
			}),
			option.value({
				label: 'Border Inner Softness (0-100%)',
				id: 'innerSoftness',
				step: 1,
			}),
			option.value({
				label: 'Border Bevel Softness (0-100%)',
				id: 'innerSoftness',
				step: 1,
			}),
			option.value({
				label: 'Border Bevel Position',
				id: 'bevelPosition',
				step: 1,
			}),
			option.value({
				label: 'Border Opacity',
				id: 'opacity',
				step: 1,
			}),
			option.hue(),
			option.saturation(),
			option.luminance(),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: options.style },
				{ type: 'i', value: options.outerWidth },
				{ type: 'i', value: options.innerWidth },
				{ type: 'i', value: options.outerSoftness },
				{ type: 'i', value: options.innerSoftness },
				{ type: 'i', value: options.bevelPosition },
				{ type: 'i', value: options.opacity },
				{ type: 'f', value: parseFloat(options.hue) },
				{ type: 'f', value: parseFloat(options.saturation) },
				{ type: 'f', value: parseFloat(options.luminance) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveBorderEnable = {
		name: 'USK: DVE Border Enable',
		options: [option.mode(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderBevelStyleSet = {
		name: 'USK: DVE Border Bevel Style Set',
		options: [
			option.list({
				label: 'Bevel Style',
				id: 'style',
				list: ['No Bevel', 'Bevel In Out', 'Bevel In', 'Bevel Out'],
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 0 },
				{ type: 'i', value: options.style },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOuterWidthSet = {
		name: 'USK: DVE Border Outer Width Set',
		options: [
			option.value({
				label: 'Border Outer Width',
				id: 'outerWidth',
				max: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.outerWidth) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOuterWidthAdjust = {
		name: 'USK: DVE Border Outer Width Adjust',
		options: [
			option.value({
				min: -16,
				max: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderInnerWidthSet = {
		name: 'USK: DVE Border Inner Width Set',
		options: [
			option.value({
				label: 'Border Inner Width',
				id: 'innerWidth',
				max: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 2 },
				{ type: 'f', value: parseFloat(options.innerWidth) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderInnerWidthAdjust = {
		name: 'USK: DVE Border Inner Width Adjust',
		options: [
			option.value({
				min: -16,
				max: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 2 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOuterSoftnessSet = {
		name: 'USK: DVE Border Outer Softness Set',
		options: [
			option.value({
				label: 'Border Outer Softness (0-100%)',
				id: 'outerSoftness',
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 3 },
				{ type: 'f', value: options.outerSoftness },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOuterSoftnessAdjust = {
		name: 'USK: DVE Border Outer Softness Adjust',
		options: [
			option.value({
				min: -100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 3 },
				{ type: 'f', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderInnerSoftnessSet = {
		name: 'USK: DVE Border Inner Softness Set',
		options: [
			option.value({
				label: 'Border Inner Softness (0-100%)',
				id: 'innerSoftness',
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 4 },
				{ type: 'i', value: options.innerSoftness },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderInnerSoftnessAdjust = {
		name: 'USK: DVE Border Inner Softness Adjust',
		options: [
			option.value({
				min: -100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 4 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderBevelSoftnessSet = {
		name: 'USK: DVE Border Bevel Softness Set',
		options: [
			option.value({
				label: 'Border Bevel Softness',
				id: 'bevelSoftness',
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 5 },
				{ type: 'i', value: options.bevelSoftness },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderBevelSoftnessAdjust = {
		name: 'USK: DVE Border Bevel Softness Adjust',
		options: [
			option.value({
				min: -100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 5 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderBevelPositionSet = {
		name: 'USK: DVE Border Bevel Position Set',
		options: [
			option.value({
				label: 'Border Bevel Position',
				id: 'bevelPosition',
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 6 },
				{ type: 'i', value: options.bevelPosition },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderBevelPositionAdjust = {
		name: 'USK: DVE Border Bevel Position Adjust',
		options: [
			option.value({
				min: -100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 6 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOpacitySet = {
		name: 'USK: DVE Border Opacity Set',
		options: [
			option.value({
				label: 'Border Opacity (0-100%)',
				id: 'opacity',
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 7 },
				{ type: 'i', value: options.opacity },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOpacityAdjust = {
		name: 'USK: DVE Border Opacity Adjust',
		options: [
			option.value({
				min: -100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 7 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderHueSet = {
		name: 'USK: DVE Border Hue Set',
		options: [option.hue, option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 8 },
				{ type: 'f', value: parseFloat(options.hue) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderHueAdjust = {
		name: 'USK: DVE Border Hue Adjust',
		options: [
			option.value({
				min: -180,
				max: 180,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 8 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderSaturationSet = {
		name: 'USK: DVE Border Saturation Set',
		options: [option.saturation(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 9 },
				{ type: 'f', value: parseFloat(options.saturation) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderSaturationAdjust = {
		name: 'USK: DVE Border Saturation Adjust',
		options: [
			option.value({
				min: -100,
				max: 100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 9 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderLuminanceSet = {
		name: 'USK: DVE Border Luminance Set',
		options: [option.luminance(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 10 },
				{ type: 'f', value: parseFloat(options.luminance) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderLuminanceAdjust = {
		name: 'USK: DVE Border Luminance Adjust',
		options: [
			option.value({
				min: -100,
				max: 100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 10 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveMask = {
		name: 'USK: DVE Mask',
		options: [
			option.value({
				label: 'Top',
				id: 'top',
				max: 38,
			}),
			option.value({
				label: 'Bottom',
				id: 'bottom',
				max: 38,
			}),
			option.value({
				label: 'Left',
				id: 'left',
				max: 52,
			}),
			option.value({
				label: 'Right',
				id: 'right',
				max: 52,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/mask', [
				{ type: 'f', value: parseFloat(options.top) },
				{ type: 'f', value: parseFloat(options.bottom) },
				{ type: 'f', value: parseFloat(options.left) },
				{ type: 'f', value: parseFloat(options.right) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskTopSet = {
		name: 'USK: DVE Mask Top Set',
		options: [
			option.value({
				label: 'Top',
				id: 'top',
				max: 38,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/mask/set', [
				{ type: 's', value: 'top' },
				{ type: 'f', value: parseFloat(options.top) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskTopAdjust = {
		name: 'USK: DVE Mask Top Adjust',
		options: [
			option.value({
				min: -38,
				max: 38,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/mask/adjust', [
				{ type: 's', value: 'top' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskBottomSet = {
		name: 'USK: DVE Mask Bottom Set',
		options: [
			option.value({
				label: 'Bottom',
				id: 'bottom',
				max: 38,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/mask/set', [
				{ type: 's', value: 'bottom' },
				{ type: 'f', value: parseFloat(options.bottom) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskBottomAdjust = {
		name: 'USK: DVE Mask Bottom Adjust',
		options: [
			option.value({
				min: -38,
				max: 38,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/mask/adjust', [
				{ type: 's', value: 'bottom' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskLeftSet = {
		name: 'USK: DVE Mask Left Set',
		options: [
			option.value({
				label: 'Left',
				id: 'left',
				max: 52,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/mask/set', [
				{ type: 's', value: 'left' },
				{ type: 'f', value: parseFloat(options.left) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskLeftAdjust = {
		name: 'USK: DVE Mask Left Adjust',
		options: [
			option.value({
				min: -52,
				max: 52,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/mask/adjust', [
				{ type: 's', value: 'left' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskRightSet = {
		name: 'USK: DVE Mask Right Set',
		options: [
			option.value({
				label: 'Right',
				id: 'right',
				max: 52,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/mask/set', [
				{ type: 's', value: 'right' },
				{ type: 'f', value: parseFloat(options.right) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskRightAdjust = {
		name: 'USK: DVE Mask Right Adjust',
		options: [
			option.value({
				min: -52,
				max: 52,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/mask/adjust', [
				{ type: 's', value: 'right' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveMaskEnable = {
		name: 'USK: DVE Mask Enable',
		options: [option.mode(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/mask/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDvePosition = {
		name: 'USK: DVE Position',
		options: [
			option.value({
				label: 'Position X',
				id: 'x',
				min: -1000,
				max: 1000,
			}),
			option.value({
				label: 'Position Y',
				id: 'y',
				min: -1000,
				max: 1000,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/position', [
				{ type: 'f', value: parseFloat(options.x) },
				{ type: 'f', value: parseFloat(options.y) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEPositionSet = {
		name: 'USK: DVE Position Set',
		options: [
			option.coordinate(),
			option.value({
				label: 'Position',
				id: 'position',
				min: -1000,
				max: 1000,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/position/set', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.position) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEPositionAdjust = {
		name: 'USK: DVE Position Adjust',
		options: [
			option.coordinate(),
			option.value({
				min: -1000,
				max: 1000,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/position/adjust', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveRotation = {
		name: 'USK: DVE Rotation Set',
		options: [option.rotation(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/rotation', [
				{ type: 'f', value: parseFloat(options.rotation) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveRotationAdjust = {
		name: 'USK: DVE Rotation Adjust',
		options: [
			option.value({
				min: -180,
				max: 180,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/rotation/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveShadow = {
		name: 'USK: DVE Shadow',
		options: [
			option.value({
				label: 'Angle (0-359°)',
				id: 'direction',
				max: 359,
				step: 1,
			}),
			option.value({
				label: 'Altitude',
				id: 'altitude',
				max: 100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/shadow', [
				{ type: 'i', value: options.direction },
				{ type: 'i', value: options.altitude },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveShadowEnable = {
		name: 'USK: DVE Shadow Enable',
		options: [option.mode(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/shadow/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEShadowParameterAngleSet = {
		name: 'USK: DVE Shadow Parameter Angle Set',
		options: [
			option.value({
				label: 'Angle (0-359°)',
				id: 'angle',
				max: 359,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/shadow/parameter/set', [
				{ type: 'i', value: 0 },
				{ type: 'i', value: options.angle },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEShadowParameterAngleAdjust = {
		name: 'USK: DVE Shadow Parameter Angle Adjust',
		options: [
			option.value({
				min: -180,
				max: 180,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/shadow/parameter/adjust', [
				{ type: 'i', value: 0 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEShadowParameterAltitudeSet = {
		name: 'USK: DVE Shadow Parameter Altitude Set',
		options: [
			option.value({
				label: 'Altitude',
				id: 'altitude',
				max: 100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/shadow/parameter/set', [
				{ type: 'i', value: 1 },
				{ type: 'i', value: options.altitude },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEShadowParameterAltitudeAdjust = {
		name: 'USK: DVE Shadow Parameter Altitude Adjust',
		options: [
			option.value({
				min: -100,
				max: 100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/shadow/parameter/adjust', [
				{ type: 'i', value: 1 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveSize = {
		name: 'USK: DVE Size',
		options: [
			option.value({
				label: 'Size X',
				id: 'sizeX',
				max: 99.99,
			}),
			option.value({
				label: 'Size Y',
				id: 'sizeY',
				max: 99.99,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/size', [
				{ type: 'f', value: parseFloat(options.sizeX) },
				{ type: 'f', value: parseFloat(options.sizeY) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveSizeSet = {
		name: 'USK: DVE Size Set',
		options: [
			option.coordinate(),
			option.value({
				max: 99.99,
			}),
			option.onOff({ label: 'Constrain Size', id: 'constrain' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/size/set', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: options.constrain },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveSizeAdjust = {
		name: 'USK: DVE Size Adjust',
		options: [
			option.coordinate(),
			option.value({
				min: -99.99,
				max: 99.99,
			}),
			option.onOff({ label: 'Constrain Size', id: 'constrain' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/size/adjust', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: options.constrain },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveSizePositionRotation = {
		name: 'USK: DVE Size Position Rotation',
		options: [
			option.size({ label: 'Size X', id: 'sizeX', max: 99.99, step: 0.01 }),
			option.size({ label: 'Size Y', id: 'sizeY', max: 99.99, step: 0.01 }),
			option.value({
				label: 'Position X',
				id: 'x',
				min: -1000,
				max: 1000,
			}),
			option.value({
				label: 'Position Y',
				id: 'y',
				min: -1000,
				max: 1000,
			}),
			option.rotation(),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/dve/size-position-rotation', [
				{ type: 'f', value: parseFloat(options.sizeX) },
				{ type: 'f', value: parseFloat(options.sizeY) },
				{ type: 'f', value: parseFloat(options.x) },
				{ type: 'f', value: parseFloat(options.y) },
				{ type: 'f', value: parseFloat(options.rotation) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskFlyingKeyEnable = {
		name: 'USK: Flying Key Enable',
		options: [option.mode({ label: 'Flying Key Enabled' }), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/flying-key/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskFlyingKeyKeyframe = {
		name: 'USK: Flying Key Keyframe',
		options: [
			{
				type: 'dropdown',
				label: 'Keyframe',
				id: 'keyframe',
				choices: [
					{ id: 0, label: 'Keyframe A' },
					{ id: 1, label: 'Keyframe B' },
				],
				default: 0,
			},
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/flying-key/keyframe', [
				{ type: 'i', value: options.keyframe },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskFlyingKeyRate = {
		name: 'USK: Flying Key Rate',
		options: [option.rate(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/flying-key/rate', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskFlyingKeyRun = {
		name: 'USK: Flying Key Run',
		options: [
			{
				type: 'dropdown',
				label: 'Run To',
				id: 'runTo',
				choices: [
					{ id: 0, label: 'A' },
					{ id: 1, label: 'B' },
					{ id: 2, label: 'Full' },
					{ id: 3, label: 'Center of Key' },
					{ id: 4, label: 'Top Left' },
					{ id: 5, label: 'Top Middle' },
					{ id: 6, label: 'Top Right' },
					{ id: 7, label: 'Middle Left' },
					{ id: 8, label: 'Middle Center' },
					{ id: 9, label: 'Middle Right' },
					{ id: 10, label: 'Bottom Left' },
					{ id: 11, label: 'Bottom Middle' },
					{ id: 12, label: 'Bottom Right' },
				],
				default: 0,
			},
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/flying-key/run', [
				{ type: 'i', value: options.runTo },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskInputs = {
		name: 'USK: Inputs',
		options: [
			option.videoSources({
				label: 'Fill Source',
				id: 'fillSource',
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.auxiliary,
			}),
			option.videoSources({
				label: 'Key Source',
				id: 'keySource',
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.keySource,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/inputs', [
				{ type: 'i', value: options.fillSource },
				{ type: 'i', value: options.keySource },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKey = {
		name: 'USK: Luma Key',
		options: [
			option.mode({ label: 'Pre Multiplied' }),
			option.clip(),
			option.gain(),
			option.mode({ label: 'Invert Key', id: 'invertKey' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/luma/key', [
				{ type: 'i', value: options.mode },
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: options.invertKey },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyClipGain = {
		name: 'USK: Luma Key Clip Gain',
		options: [option.clip(), option.gain(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/luma/key/clip-gain', [
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyClipSet = {
		name: 'USK: Luma Key Clip Set',
		options: [option.clip(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/luma/key/clip/set', [
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyClipAdjust = {
		name: 'USK: Luma Key Clip Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/luma/key/clip/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyGainSet = {
		name: 'USK: Luma Key Gain Set',
		options: [option.gain(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/luma/key/gain/set', [
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyGainAdjust = {
		name: 'USK: Luma Key Gain Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/luma/key/gain/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyInvert = {
		name: 'USK: Luma Key Invert',
		options: [option.mode({ label: 'Invert Key', id: 'invertKey' }), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/luma/key/invert', [
				{ type: 'i', value: options.invertKey },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyPreMultiplied = {
		name: 'USK: Luma Key Pre Multiplied',
		options: [
			option.mode({ label: 'Pre Multiplied', id: 'preMultiplied' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/luma/key/pre-multiplied', [
				{ type: 'i', value: options.preMultiplied },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMask = {
		name: 'USK: Mask',
		options: [
			option.value({
				label: 'Top',
				id: 'top',
				min: -9,
				max: 9,
				defaultValue: 9,
			}),
			option.value({
				label: 'Bottom',
				id: 'bottom',
				min: -9,
				max: 9,
				defaultValue: -9,
			}),
			option.value({
				label: 'Left',
				id: 'left',
				min: -16,
				max: 16,
				defaultValue: -16,
			}),
			option.value({
				label: 'Right',
				id: 'right',
				min: -16,
				max: 16,
				defaultValue: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/mask', [
				{ type: 'f', value: parseFloat(options.top) },
				{ type: 'f', value: parseFloat(options.bottom) },
				{ type: 'f', value: parseFloat(options.left) },
				{ type: 'f', value: parseFloat(options.right) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskEnable = {
		name: 'USK: Mask Enable',
		options: [option.mode({ label: 'Enable Mask' }), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/mask/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskTopSet = {
		name: 'USK: Mask Top Set',
		options: [
			option.value({
				label: 'Top',
				id: 'top',
				min: -9,
				max: 9,
				defaultValue: 9,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/mask/set', [
				{ type: 's', value: 'top' },
				{ type: 'f', value: parseFloat(options.top) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskTopAdjust = {
		name: 'USK: Mask Top Adjust',
		options: [
			option.value({
				min: -9,
				max: 9,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/mask/adjust', [
				{ type: 's', value: 'top' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskBottomSet = {
		name: 'USK: Mask Bottom Set',
		options: [
			option.value({
				label: 'Bottom',
				id: 'bottom',
				min: -9,
				max: 9,
				defaultValue: -9,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/mask/set', [
				{ type: 's', value: 'bottom' },
				{ type: 'f', value: parseFloat(options.bottom) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskBottomAdjust = {
		name: 'USK: Mask Bottom Adjust',
		options: [
			option.value({
				min: -9,
				max: 9,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/mask/adjust', [
				{ type: 's', value: 'bottom' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskLeftSet = {
		name: 'USK: Mask Left Set',
		options: [
			option.value({
				label: 'Left',
				id: 'left',
				min: -16,
				max: 16,
				defaultValue: -16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/mask/set', [
				{ type: 's', value: 'left' },
				{ type: 'f', value: parseFloat(options.left) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskLeftAdjust = {
		name: 'USK: Mask Left Adjust',
		options: [
			option.value({
				min: -16,
				max: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/mask/adjust', [
				{ type: 's', value: 'left' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskRightSet = {
		name: 'USK: Mask Right Set',
		options: [
			option.value({
				label: 'Right',
				id: 'right',
				min: -16,
				max: 16,
				defaultValue: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/mask/set', [
				{ type: 's', value: 'right' },
				{ type: 'f', value: parseFloat(options.right) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskRightAdjust = {
		name: 'USK: Mask Right Adjust',
		options: [
			option.value({
				min: -16,
				max: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/mask/adjust', [
				{ type: 's', value: 'right' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskOnAir = {
		name: 'USK: On Air',
		options: [option.mode(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/on-air', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPattern = {
		name: 'USK: Pattern',
		options: [
			option.pattern(),
			option.size(),
			option.symmetry(),
			option.softness(),
			option.position({ label: 'Position X', id: 'x' }),
			option.position({ label: 'Position Y', id: 'y' }),
			option.mode({ label: 'Invert Pattern', id: 'invertPattern' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern', [
				{ type: 'i', value: options.pattern },
				{ type: 'f', value: parseFloat(options.size) },
				{ type: 'f', value: parseFloat(options.symmetry) },
				{ type: 'f', value: parseFloat(options.softness) },
				{ type: 'f', value: parseFloat(options.x) },
				{ type: 'f', value: parseFloat(options.y) },
				{ type: 'i', value: options.invertPattern },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternCycle = {
		name: 'USK: Pattern Cycle',
		options: [option.yesNo({ label: 'Reverse', id: 'reverse' }), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/cycle', [
				{ type: 'i', value: options.reverse },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternInvert = {
		name: 'USK: Pattern Invert',
		options: [option.mode({ label: 'Invert Pattern' }), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/invert', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternPosition = {
		name: 'USK: Pattern Position',
		options: [
			option.position({ label: 'Position X', id: 'x' }),
			option.position({ label: 'Position Y', id: 'y' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/position', [
				{ type: 'f', value: parseFloat(options.x) },
				{ type: 'f', value: parseFloat(options.y) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternPositionSet = {
		name: 'USK: Pattern Position Set',
		options: [
			option.coordinate(),
			option.value({
				max: 1,
				step: 0.0001,
				defaultValue: 0.5,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/position/set', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternPositionAdjust = {
		name: 'USK: Pattern Position Adjust',
		options: [
			option.coordinate(),
			option.value({
				min: -1,
				max: 1,
				step: 0.0001,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/position/adjust', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSize = {
		name: 'USK: Pattern Size Set',
		options: [option.size(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/size', [
				{ type: 'f', value: parseFloat(options.size) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSizeAdjust = {
		name: 'USK: Pattern Size Adjust',
		options: [
			option.value({
				min: -100,
				max: 100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/size/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSizeSymmetrySoftnessPosition = {
		name: 'USK: Pattern Size Symmetry Softness Position',
		options: [
			option.size(),
			option.symmetry(),
			option.softness(),
			option.position({ label: 'Position X', id: 'x' }),
			option.position({ label: 'Position Y', id: 'y' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/size-symmetry-softness-position', [
				{ type: 'f', value: parseFloat(options.size) },
				{ type: 'f', value: parseFloat(options.symmetry) },
				{ type: 'f', value: parseFloat(options.softness) },
				{ type: 'f', value: parseFloat(options.x) },
				{ type: 'f', value: parseFloat(options.y) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSoftness = {
		name: 'USK: Pattern Softness Set',
		options: [option.softness(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/softness', [
				{ type: 'f', value: parseFloat(options.softness) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSoftnessAdjust = {
		name: 'USK: Pattern Softness Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/softness/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternStyle = {
		name: 'USK: Pattern Style',
		options: [option.pattern(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/style', [
				{ type: 'i', value: options.pattern },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSymmetry = {
		name: 'USK: Pattern Symmetry Set',
		options: [option.symmetry(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/symmetry', [
				{ type: 'f', value: parseFloat(options.symmetry) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSymmetryAdjust = {
		name: 'USK: Pattern Symmetry Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/pattern/symmetry/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskStyle = {
		name: 'USK: Style',
		options: [
			{
				type: 'dropdown',
				label: 'Style',
				id: 'style',
				choices: [
					{ id: 0, label: 'Luma' },
					{ id: 1, label: 'Chroma' },
					{ id: 2, label: 'Pattern' },
					{ id: 3, label: 'DVE' },
				],
				default: 0,
			},
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/usk/style', [
				{ type: 'i', value: options.style },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	return actions
}

module.exports = {
	upstreamKeyerActions,
}
