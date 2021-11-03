const { option } = require('./utils')
const { availability } = require('../switchers/types')

const upstreamKeyerActions = ({ context }) => {
	const actions = {}

	actions.uskSelect = {
		label: 'USK: Select',
		options: [option.usk(context, false)],
		callback: ({ options }) => {
			context.updateVariable('usk', options.usk)
		},
	}

	actions.uskChroma = {
		label: 'USK: Chroma',
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
			context.oscSend('/mixeffect/usk/chroma', [
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
		label: 'USK: Chroma Advanced',
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
			context.oscSend('/mixeffect/usk/chroma-advanced', [
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
		label: 'USK: Chroma Advanced Sample',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/sample', [
				{ type: 'i', value: options.sampleY },
				{ type: 'i', value: options.sampleCb },
				{ type: 'i', value: options.sampleCr },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedForegroundLevelSet = {
		label: 'USK: Chroma Advanced Foreground Level Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 0 },
				{ type: 'f', value: parseFloat(options.foreground) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedForegroundLevelAdjust = {
		label: 'USK: Chroma Advanced Foreground Level Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 0 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBackgroundLevelSet = {
		label: 'USK: Chroma Advanced Background Level Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.background) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBackgroundLevelAdjust = {
		label: 'USK: Chroma Advanced Background Level Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedKeyEdgeSet = {
		label: 'USK: Chroma Advanced Key Edge Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 2 },
				{ type: 'f', value: parseFloat(options.keyEdge) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedKeyEdgeAdjust = {
		label: 'USK: Chroma Advanced Key Edge Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 2 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedSpillSuppressionSet = {
		label: 'USK: Chroma Advanced Spill Suppression Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 3 },
				{ type: 'f', value: parseFloat(options.spillSuppression) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedSpillSuppressionAdjust = {
		label: 'USK: Chroma Advanced Spill Suppression Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 3 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedFlareSuppressionSet = {
		label: 'USK: Chroma Advanced Flare Suppression Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 4 },
				{ type: 'f', value: parseFloat(options.flareSuppression) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedFlareSuppressionAdjust = {
		label: 'USK: Chroma Advanced Flare Suppression Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 4 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBrightnessSet = {
		label: 'USK: Chroma Advanced Brightness Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 5 },
				{ type: 'f', value: parseFloat(options.brightness) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBrightnessAdjust = {
		label: 'USK: Chroma Advanced Brightness Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 5 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedContrastSet = {
		label: 'USK: Chroma Advanced Contrast Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 6 },
				{ type: 'f', value: parseFloat(options.contrast) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedContrastAdjust = {
		label: 'USK: Chroma Advanced Contrast Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 6 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedSaturationSet = {
		label: 'USK: Chroma Advanced Saturation Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 7 },
				{ type: 'f', value: parseFloat(options.saturation) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedSaturationAdjust = {
		label: 'USK: Chroma Advanced Saturation Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 7 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedRedSet = {
		label: 'USK: Chroma Advanced Red Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 8 },
				{ type: 'f', value: parseFloat(options.red) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedRedSet = {
		label: 'USK: Chroma Advanced Red Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 8 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedGreenSet = {
		label: 'USK: Chroma Advanced Green Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 9 },
				{ type: 'f', value: parseFloat(options.green) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedGreenAdjust = {
		label: 'USK: Chroma Advanced Green Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 9 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBlueSet = {
		label: 'USK: Chroma Advanced Blue Set',
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
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/set', [
				{ type: 'i', value: 10 },
				{ type: 'f', value: parseFloat(options.blue) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskChromaAdvancedBlueAdjust = {
		label: 'USK: Chroma Advanced Blue Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/chroma-advanced/parameter/adjust', [
				{ type: 'i', value: 10 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveBorder = {
		label: 'USK: DVE Border',
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
			context.oscSend('/mixeffect/usk/dve/border', [
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
		label: 'USK: DVE Border Enable',
		options: [option.mode(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderBevelStyleSet = {
		label: 'USK: DVE Border Bevel Style Set',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 0 },
				{ type: 'i', value: options.style },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOuterWidthSet = {
		label: 'USK: DVE Border Outer Width Set',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.outerWidth) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOuterWidthAdjust = {
		label: 'USK: DVE Border Outer Width Adjust',
		options: [
			option.value({
				min: -16,
				max: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderInnerWidthSet = {
		label: 'USK: DVE Border Inner Width Set',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 2 },
				{ type: 'f', value: parseFloat(options.innerWidth) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderInnerWidthAdjust = {
		label: 'USK: DVE Border Inner Width Adjust',
		options: [
			option.value({
				min: -16,
				max: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 2 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOuterSoftnessSet = {
		label: 'USK: DVE Border Outer Softness Set',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 3 },
				{ type: 'f', value: options.outerSoftness },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOuterSoftnessAdjust = {
		label: 'USK: DVE Border Outer Softness Adjust',
		options: [
			option.value({
				min: -100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 3 },
				{ type: 'f', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderInnerSoftnessSet = {
		label: 'USK: DVE Border Inner Softness Set',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 4 },
				{ type: 'i', value: options.innerSoftness },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderInnerSoftnessAdjust = {
		label: 'USK: DVE Border Inner Softness Adjust',
		options: [
			option.value({
				min: -100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 4 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderBevelSoftnessSet = {
		label: 'USK: DVE Border Bevel Softness Set',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 5 },
				{ type: 'i', value: options.bevelSoftness },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderBevelSoftnessAdjust = {
		label: 'USK: DVE Border Bevel Softness Adjust',
		options: [
			option.value({
				min: -100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 5 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderBevelPositionSet = {
		label: 'USK: DVE Border Bevel Position Set',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 6 },
				{ type: 'i', value: options.bevelPosition },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderBevelPositionAdjust = {
		label: 'USK: DVE Border Bevel Position Adjust',
		options: [
			option.value({
				min: -100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 6 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOpacitySet = {
		label: 'USK: DVE Border Opacity Set',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 7 },
				{ type: 'i', value: options.opacity },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderOpacityAdjust = {
		label: 'USK: DVE Border Opacity Adjust',
		options: [
			option.value({
				min: -100,
				step: 1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 7 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderHueSet = {
		label: 'USK: DVE Border Hue Set',
		options: [option.hue, option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 8 },
				{ type: 'f', value: parseFloat(options.hue) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderHueAdjust = {
		label: 'USK: DVE Border Hue Adjust',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 8 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderSaturationSet = {
		label: 'USK: DVE Border Saturation Set',
		options: [option.saturation(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 9 },
				{ type: 'f', value: parseFloat(options.saturation) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderSaturationAdjust = {
		label: 'USK: DVE Border Saturation Adjust',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 9 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderLuminanceSet = {
		label: 'USK: DVE Border Luminance Set',
		options: [option.luminance(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/border/parameter/set', [
				{ type: 'i', value: 10 },
				{ type: 'f', value: parseFloat(options.luminance) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEBorderLuminanceAdjust = {
		label: 'USK: DVE Border Luminance Adjust',
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
			context.oscSend('/mixeffect/usk/dve/border/parameter/adjust', [
				{ type: 'i', value: 10 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveMask = {
		label: 'USK: DVE Mask',
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
			context.oscSend('/mixeffect/usk/dve/mask', [
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
		label: 'USK: DVE Mask Top Set',
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
			context.oscSend('/mixeffect/usk/dve/mask/set', [
				{ type: 's', value: 'top' },
				{ type: 'f', value: parseFloat(options.top) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskTopAdjust = {
		label: 'USK: DVE Mask Top Adjust',
		options: [
			option.value({
				min: -38,
				max: 38,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/mask/adjust', [
				{ type: 's', value: 'top' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskBottomSet = {
		label: 'USK: DVE Mask Bottom Set',
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
			context.oscSend('/mixeffect/usk/dve/mask/set', [
				{ type: 's', value: 'bottom' },
				{ type: 'f', value: parseFloat(options.bottom) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskBottomAdjust = {
		label: 'USK: DVE Mask Bottom Adjust',
		options: [
			option.value({
				min: -38,
				max: 38,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/mask/adjust', [
				{ type: 's', value: 'bottom' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskLeftSet = {
		label: 'USK: DVE Mask Left Set',
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
			context.oscSend('/mixeffect/usk/dve/mask/set', [
				{ type: 's', value: 'left' },
				{ type: 'f', value: parseFloat(options.left) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskLeftAdjust = {
		label: 'USK: DVE Mask Left Adjust',
		options: [
			option.value({
				min: -52,
				max: 52,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/mask/adjust', [
				{ type: 's', value: 'left' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskRightSet = {
		label: 'USK: DVE Mask Right Set',
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
			context.oscSend('/mixeffect/usk/dve/mask/set', [
				{ type: 's', value: 'right' },
				{ type: 'f', value: parseFloat(options.right) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEMaskRightAdjust = {
		label: 'USK: DVE Mask Right Adjust',
		options: [
			option.value({
				min: -52,
				max: 52,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/mask/adjust', [
				{ type: 's', value: 'right' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveMaskEnable = {
		label: 'USK: DVE Mask Enable',
		options: [option.mode(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/mask/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDvePosition = {
		label: 'USK: DVE Position',
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
			context.oscSend('/mixeffect/usk/dve/position', [
				{ type: 'f', value: parseFloat(options.x) },
				{ type: 'f', value: parseFloat(options.y) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEPositionSet = {
		label: 'USK: DVE Position Set',
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
			context.oscSend('/mixeffect/usk/dve/position/set', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.position) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEPositionAdjust = {
		label: 'USK: DVE Position Adjust',
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
			context.oscSend('/mixeffect/usk/dve/position/adjust', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveRotation = {
		label: 'USK: DVE Rotation Set',
		options: [option.rotation(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/rotation', [
				{ type: 'f', value: parseFloat(options.rotation) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveRotationAdjust = {
		label: 'USK: DVE Rotation Adjust',
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
			context.oscSend('/mixeffect/usk/dve/rotation/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveShadow = {
		label: 'USK: DVE Shadow',
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
			context.oscSend('/mixeffect/usk/dve/shadow', [
				{ type: 'i', value: options.direction },
				{ type: 'i', value: options.altitude },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveShadowEnable = {
		label: 'USK: DVE Shadow Enable',
		options: [option.mode(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/dve/shadow/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEShadowParameterAngleSet = {
		label: 'USK: DVE Shadow Parameter Angle Set',
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
			context.oscSend('/mixeffect/usk/dve/shadow/parameter/set', [
				{ type: 'i', value: 0 },
				{ type: 'i', value: options.angle },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEShadowParameterAngleAdjust = {
		label: 'USK: DVE Shadow Parameter Angle Adjust',
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
			context.oscSend('/mixeffect/usk/dve/shadow/parameter/adjust', [
				{ type: 'i', value: 0 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEShadowParameterAltitudeSet = {
		label: 'USK: DVE Shadow Parameter Altitude Set',
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
			context.oscSend('/mixeffect/usk/dve/shadow/parameter/set', [
				{ type: 'i', value: 1 },
				{ type: 'i', value: options.altitude },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDVEShadowParameterAltitudeAdjust = {
		label: 'USK: DVE Shadow Parameter Altitude Adjust',
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
			context.oscSend('/mixeffect/usk/dve/shadow/parameter/adjust', [
				{ type: 'i', value: 1 },
				{ type: 'i', value: options.value },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveSize = {
		label: 'USK: DVE Size',
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
			context.oscSend('/mixeffect/usk/dve/size', [
				{ type: 'f', value: parseFloat(options.sizeX) },
				{ type: 'f', value: parseFloat(options.sizeY) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveSizeSet = {
		label: 'USK: DVE Size Set',
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
			context.oscSend('/mixeffect/usk/dve/size/set', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: options.constrain },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveSizeAdjust = {
		label: 'USK: DVE Size Adjust',
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
			context.oscSend('/mixeffect/usk/dve/size/adjust', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: options.constrain },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskDveSizePositionRotation = {
		label: 'USK: DVE Size Position Rotation',
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
			context.oscSend('/mixeffect/usk/dve/size-position-rotation', [
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
		label: 'USK: Flying Key Enable',
		options: [option.mode({ label: 'Flying Key Enabled' }), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/flying-key/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskFlyingKeyKeyframe = {
		label: 'USK: Flying Key Keyframe',
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
			context.oscSend('/mixeffect/usk/flying-key/keyframe', [
				{ type: 'i', value: options.keyframe },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskFlyingKeyRate = {
		label: 'USK: Flying Key Rate',
		options: [option.rate(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/flying-key/rate', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskFlyingKeyRun = {
		label: 'USK: Flying Key Run',
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
			context.oscSend('/mixeffect/usk/flying-key/run', [
				{ type: 'i', value: options.runTo },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskInputs = {
		label: 'USK: Inputs',
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
			context.oscSend('/mixeffect/usk/inputs', [
				{ type: 'i', value: options.fillSource },
				{ type: 'i', value: options.keySource },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKey = {
		label: 'USK: Luma Key',
		options: [
			option.mode({ label: 'Pre Multiplied' }),
			option.clip(),
			option.gain(),
			option.mode({ label: 'Invert Key', id: 'invertKey' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/luma/key', [
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
		label: 'USK: Luma Key Clip Gain',
		options: [option.clip(), option.gain(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/luma/key/clip-gain', [
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyClipSet = {
		label: 'USK: Luma Key Clip Set',
		options: [option.clip(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/luma/key/clip/set', [
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyClipAdjust = {
		label: 'USK: Luma Key Clip Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/luma/key/clip/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyGainSet = {
		label: 'USK: Luma Key Gain Set',
		options: [option.gain(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/luma/key/gain/set', [
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyGainAdjust = {
		label: 'USK: Luma Key Gain Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/luma/key/gain/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyInvert = {
		label: 'USK: Luma Key Invert',
		options: [option.mode({ label: 'Invert Key', id: 'invertKey' }), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/luma/key/invert', [
				{ type: 'i', value: options.invertKey },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskLumaKeyPreMultiplied = {
		label: 'USK: Luma Key Pre Multiplied',
		options: [
			option.mode({ label: 'Pre Multiplied', id: 'preMultiplied' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/luma/key/pre-multiplied', [
				{ type: 'i', value: options.preMultiplied },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMask = {
		label: 'USK: Mask',
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
			context.oscSend('/mixeffect/usk/mask', [
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
		label: 'USK: Mask Enable',
		options: [option.mode({ label: 'Enable Mask' }), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/mask/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskTopSet = {
		label: 'USK: Mask Top Set',
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
			context.oscSend('/mixeffect/usk/mask/set', [
				{ type: 's', value: 'top' },
				{ type: 'f', value: parseFloat(options.top) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskTopAdjust = {
		label: 'USK: Mask Top Adjust',
		options: [
			option.value({
				min: -9,
				max: 9,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/mask/adjust', [
				{ type: 's', value: 'top' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskBottomSet = {
		label: 'USK: Mask Bottom Set',
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
			context.oscSend('/mixeffect/usk/mask/set', [
				{ type: 's', value: 'bottom' },
				{ type: 'f', value: parseFloat(options.bottom) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskBottomAdjust = {
		label: 'USK: Mask Bottom Adjust',
		options: [
			option.value({
				min: -9,
				max: 9,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/mask/adjust', [
				{ type: 's', value: 'bottom' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskLeftSet = {
		label: 'USK: Mask Left Set',
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
			context.oscSend('/mixeffect/usk/mask/set', [
				{ type: 's', value: 'left' },
				{ type: 'f', value: parseFloat(options.left) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskLeftAdjust = {
		label: 'USK: Mask Left Adjust',
		options: [
			option.value({
				min: -16,
				max: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/mask/adjust', [
				{ type: 's', value: 'left' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskRightSet = {
		label: 'USK: Mask Right Set',
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
			context.oscSend('/mixeffect/usk/mask/set', [
				{ type: 's', value: 'right' },
				{ type: 'f', value: parseFloat(options.right) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskMaskRightAdjust = {
		label: 'USK: Mask Right Adjust',
		options: [
			option.value({
				min: -16,
				max: 16,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/mask/adjust', [
				{ type: 's', value: 'right' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskOnAir = {
		label: 'USK: On Air',
		options: [option.mode(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/on-air', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPattern = {
		label: 'USK: Pattern',
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
			context.oscSend('/mixeffect/usk/pattern', [
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
		label: 'USK: Pattern Cycle',
		options: [option.yesNo({ label: 'Reverse', id: 'reverse' }), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/pattern/cycle', [
				{ type: 'i', value: options.reverse },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternInvert = {
		label: 'USK: Pattern Invert',
		options: [option.mode({ label: 'Invert Pattern' }), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/pattern/invert', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternPosition = {
		label: 'USK: Pattern Position',
		options: [
			option.position({ label: 'Position X', id: 'x' }),
			option.position({ label: 'Position Y', id: 'y' }),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/pattern/position', [
				{ type: 'f', value: parseFloat(options.x) },
				{ type: 'f', value: parseFloat(options.y) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternPositionSet = {
		label: 'USK: Pattern Position Set',
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
			context.oscSend('/mixeffect/usk/pattern/position/set', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternPositionAdjust = {
		label: 'USK: Pattern Position Adjust',
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
			context.oscSend('/mixeffect/usk/pattern/position/adjust', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSize = {
		label: 'USK: Pattern Size Set',
		options: [option.size(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/pattern/size', [
				{ type: 'f', value: parseFloat(options.size) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSize = {
		label: 'USK: Pattern Size Adjust',
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
			context.oscSend('/mixeffect/usk/pattern/size/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSizeSymmetrySoftnessPosition = {
		label: 'USK: Pattern Size Symmetry Softness Position',
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
			context.oscSend('/mixeffect/usk/pattern/size-symmetry-softness-position', [
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
		label: 'USK: Pattern Softness Set',
		options: [option.softness(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/pattern/softness', [
				{ type: 'f', value: parseFloat(options.softness) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSoftnessAdjust = {
		label: 'USK: Pattern Softness Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/pattern/softness/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternStyle = {
		label: 'USK: Pattern Style',
		options: [option.pattern(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/pattern/style', [
				{ type: 'i', value: options.pattern },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSymmetry = {
		label: 'USK: Pattern Symmetry Set',
		options: [option.symmetry(), option.usk(context), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/pattern/symmetry', [
				{ type: 'f', value: parseFloat(options.symmetry) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskPatternSymmetryAdjust = {
		label: 'USK: Pattern Symmetry Adjust',
		options: [
			option.value({
				min: -100,
				step: 0.1,
			}),
			option.usk(context),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/usk/pattern/symmetry/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.uskStyle = {
		label: 'USK: Style',
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
			context.oscSend('/mixeffect/usk/style', [
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
