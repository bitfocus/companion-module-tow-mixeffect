const { option } = require('./utils')
const { availability } = require('../switchers/types')

const transitionActions = ({ context }) => {
	const actions = {}

	actions.transitionAuto = {
		name: 'Transition: Auto',
		options: [option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/auto', [
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionCut = {
		name: 'Transition: Cut',
		options: [option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/cut', [
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDip = {
		name: 'Transition: Dip',
		options: [
			option.rate(),
			{
				type: 'dropdown',
				label: 'Video Source',
				id: 'videoSource',
				default: 0,
				minChoicesForSearch: 0,
				choices: context.switcher.videoSources
					.filter((item) => item.availability.source)
					.filter((item) => item.availability.me)
					.map(({ id, label }) => ({ id, label })),
			},
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dip', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: options.videoSource },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDipSource = {
		name: 'Transition: Dip Source',
		options: [
			{
				type: 'dropdown',
				label: 'Video Source',
				id: 'videoSource',
				default: 0,
				minChoicesForSearch: 0,
				choices: context.switcher.videoSources
					.filter((item) => item.availability.source)
					.filter((item) => item.availability.me)
					.map(({ id, label }) => ({ id, label })),
			},
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dip/source', [
				{ type: 'i', value: options.videoSource },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transtionDve = {
		name: 'Transition: DVE',
		options: [
			option.rate(),
			option.style(),
			option.videoSources({
				label: 'Fill Source',
				id: 'fillSource',
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.keySource,
			}),
			option.videoSources({
				label: 'Key Source',
				id: 'keySource',
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.keySource,
			}),
			option.mode({ label: 'Enable Key', id: 'enableKey' }),
			option.mode({ label: 'Pre Multiplied', id: 'preMultiplied' }),
			option.clip(),
			option.gain(),
			option.mode({ label: 'Invert Key', id: 'invertKey' }),
			option.mode({ label: 'Reverse', id: 'reverse' }),
			option.mode({ label: 'Flip Flop', id: 'flipflop' }),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: options.style },
				{ type: 'i', value: options.fillSource },
				{ type: 'i', value: options.keySource },
				{ type: 'i', value: options.enableKey },
				{ type: 'i', value: options.preMultiplied },
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: options.invertKey },
				{ type: 'i', value: options.reverse },
				{ type: 'i', value: options.flipflop },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveFlipFlip = {
		name: 'Transition: DVE Flip Flop',
		options: [option.mode({ label: 'Flip Flop', id: 'flipflop' }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/flip-flop', [
				{ type: 'i', value: options.flipflop },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveInputs = {
		name: 'Transition: DVE Inputs',
		options: [
			option.videoSources({
				label: 'Fill Source',
				id: 'fillSource',
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.keySource,
			}),
			option.videoSources({
				label: 'Key Source',
				id: 'keySource',
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.keySource,
			}),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/inputs', [
				{ type: 'i', value: options.fillSource },
				{ type: 'i', value: options.keySource },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveKey = {
		name: 'Transition: DVE Key',
		options: [
			option.mode({ label: 'Pre Multiplied', id: 'preMultiplied' }),
			option.clip(),
			option.gain(),
			option.mode({ label: 'Invert Key', id: 'invertKey' }),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/key', [
				{ type: 'i', value: options.preMultiplied },
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: options.invertKey },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveClipGain = {
		name: 'Transition: DVE Key Clip Gain',
		options: [option.clip(), option.gain(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/key/clip-gain', [
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDevKeyClipSet = {
		name: 'Transition: DVE Key Clip Set',
		options: [option.clip(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/key/clip/set', [
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDevKeyClipAdjust = {
		name: 'Transition: DVE Key Clip Adjust',
		options: [option.value({ min: -100, max: 100, step: 0.1, defaultValue: 0 }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/key/clip/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDevKeyGainSet = {
		name: 'Transition: DVE Key Gain Set',
		options: [option.gain(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/key/gain/set', [
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDevKeyGainAdjust = {
		name: 'Transition: DVE Key Gain Adjust',
		options: [option.value({ min: -100, max: 100, step: 0.1, defaultValue: 0 }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/key/gain/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveKeyEnable = {
		name: 'Transition: DVE Key Enable',
		options: [option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/key/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveKeyInvert = {
		name: 'Transition: DVE Key Invert',
		options: [option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/key/invert', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveKeyPreMultiplied = {
		name: 'Transition: DVE Key Pre Multiplied',
		options: [option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/key/pre-multiplied', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveReverse = {
		name: 'Transition: DVE Reverse',
		options: [option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/reverse', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveStyle = {
		name: 'Transition: DVE Style',
		options: [option.style(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/dve/style', [
				{ type: 'i', value: options.style },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionMix = {
		name: 'Transition: Mix',
		options: [option.rate(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/mix', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionNext = {
		name: 'Transition: Next',
		options: [option.usk(context, true, true), option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/next', [
				{ type: 'i', value: context.selectedOrValue('usk', options.usk) },
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionPreview = {
		name: 'Transition: Preview',
		options: [option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/preview', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionRate = {
		name: 'Transition: Rate',
		options: [
			{
				type: 'dropdown',
				label: 'Style',
				id: 'style',
				choices: [
					{ id: 0, label: 'Mix' },
					{ id: 1, label: 'Dip' },
					{ id: 2, label: 'Wipe' },
					{ id: 3, label: 'DVE' },
					{ id: 4, label: 'Sting' },
				],
				default: 0,
			},
			option.rate(),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/rate', [
				{ type: 'i', value: options.style },
				{ type: 'i', value: options.rate },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionStyle = {
		name: 'Transition: Style',
		options: [
			{
				type: 'dropdown',
				label: 'Style',
				id: 'style',
				choices: [
					{ id: 0, label: 'Mix' },
					{ id: 1, label: 'Dip' },
					{ id: 2, label: 'Wipe' },
					{ id: 3, label: 'DVE' },
					{ id: 4, label: 'Sting' },
				],
				default: 0,
			},
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/style', [
				{ type: 'i', value: options.style },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipe = {
		name: 'Transition: Wipe',
		options: [
			option.rate(),
			option.pattern(),
			{
				type: 'number',
				label: 'Width',
				id: 'width',
				min: 0,
				max: 100,
				step: 0.1,
				default: 0,
				range: true,
			},
			option.videoSources({
				label: 'Fill Source',
				id: 'fillSource',
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.keySource,
			}),
			option.symmetry(),
			option.softness(),
			option.position({ label: 'Position X', id: 'x' }),
			option.position({ label: 'Position Y', id: 'y' }),
			option.mode({ label: 'Reverse', id: 'reverse' }),
			option.mode({ label: 'Flip Flop', id: 'flipflop' }),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: options.pattern },
				{ type: 'f', value: parseFloat(options.width) },
				{ type: 'i', value: options.fillSource },
				{ type: 'f', value: parseFloat(options.symmetry) },
				{ type: 'f', value: parseFloat(options.softness) },
				{ type: 'f', value: parseFloat(options.x) },
				{ type: 'f', value: parseFloat(options.y) },
				{ type: 'i', value: options.reverse },
				{ type: 'i', value: options.flipflop },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeBorder = {
		name: 'Transition: Wipe Border',
		options: [
			{
				type: 'number',
				label: 'Width',
				id: 'width',
				min: 0,
				max: 100,
				step: 0.1,
				default: 0,
				range: true,
			},
			option.softness(),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/border', [
				{ type: 'f', value: parseFloat(options.width) },
				{ type: 'f', value: parseFloat(options.softness) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeBorderSoftnessSet = {
		name: 'Transition: Wipe Border Softness Set',
		options: [option.softness(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/border/parameter/set', [
				{ type: 'i', value: 0 },
				{ type: 'f', value: parseFloat(options.softness) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeBorderSoftnessAdjust = {
		name: 'Transition: Wipe Border Softness Adjust',
		options: [option.value({ min: -100, max: 100, step: 0.1, defaultValue: 0 }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/border/parameter/adjust', [
				{ type: 'i', value: 0 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeBorderWidthSet = {
		name: 'Transition: Wipe Border Width Set',
		options: [
			option.value({
				label: 'Width',
				id: 'width',
				min: 0,
				max: 100,
				step: 0.1,
				defaultValue: 0,
			}),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/border/parameter/set', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.width) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeBorderWidthAdjust = {
		name: 'Transition: Wipe Border Width Adjust',
		options: [
			option.value({
				min: -100,
				max: 100,
				step: 0.1,
				defaultValue: 0,
			}),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/border/parameter/adjust', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeFlipFlop = {
		name: 'Transition: Wipe Flip Flop',
		options: [option.mode({ label: 'Flip Flop', id: 'flipflop' }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/flip-flop', [
				{ type: 'i', value: options.flipflop },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipePattern = {
		name: 'Transition: Wipe Pattern',
		options: [option.pattern(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/pattern', [
				{ type: 'i', value: options.pattern },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipePatternCycle = {
		name: 'Transition: Wipe Pattern Cycle',
		options: [option.yesNo({ label: 'Reverse', id: 'reverse' }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/pattern/cycle', [
				{ type: 'i', value: options.reverse },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipePosition = {
		name: 'Transition: Wipe Position',
		options: [
			option.position({ label: 'Position X', id: 'x', defaultValue: 0.5 }),
			option.position({ label: 'Position Y', id: 'y', defaultValue: 0.5 }),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/position', [
				{ type: 'f', value: parseFloat(options.x) },
				{ type: 'f', value: parseFloat(options.y) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipePositionSet = {
		name: 'Transition: Wipe Position Set',
		options: [
			option.coordinate(),
			option.position({ label: 'Position', id: 'position', defaultValue: 0.5 }),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/position/set', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.position) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipePositionAdjust = {
		name: 'Transition: Wipe Position Adjust',
		options: [
			option.coordinate(),
			option.value({
				min: -1,
				max: 1,
				step: 0.0001,
				defaultValue: 0,
			}),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/position/adjust', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeReverse = {
		name: 'Transition: Wipe Reverse',
		options: [option.mode({ label: 'Reverse', id: 'reverse' }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/reverse', [
				{ type: 'i', value: options.reverse },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeSource = {
		name: 'Transition: Wipe Source',
		options: [
			option.videoSources({
				label: 'Fill Source',
				id: 'fillSource',
				sources: context.switcher.videoSources,
				predicate: (source) => source.availability.source & availability.source.keySource,
			}),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/source', [
				{ type: 'i', value: options.fillSource },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeSymmetrySet = {
		name: 'Transition: Wipe Symmetry Set',
		options: [option.symmetry(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/symmetry', [
				{ type: 'f', value: parseFloat(options.symmetry) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeSymmetryAdjust = {
		name: 'Transition: Wipe Symmetry Adjust',
		options: [
			option.value({
				min: -100,
				max: 100,
				step: 0.1,
				defaultValue: 0,
			}),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/transition/wipe/symmetry/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	return actions
}

module.exports = {
	transitionActions,
}
