const { generateChoices, option } = require('./utils')
const { availability } = require('../switchers/types')

const transitionActions = ({ context }) => {
	const actions = {}

	const dveEffectStyles = [
		{ id: 0, label: 'Swoosh Top Left' },
		{ id: 1, label: 'Swoosh Top' },
		{ id: 2, label: 'Swoosh Top Right' },
		{ id: 3, label: 'Swoosh Left' },
		{ id: 4, label: 'Swoosh Right' },
		{ id: 5, label: 'Swoosh Bottom Left' },
		{ id: 6, label: 'Swoosh Bottom' },
		{ id: 7, label: 'Swoosh Bottom Right' },
		{ id: 8, label: 'Spin CCW Top Right' },
		{ id: 9, label: 'Spin CW Top Left' },
		{ id: 10, label: 'Spin CCW Bottom Right' },
		{ id: 11, label: 'Spin CW Bottom Left' },
		{ id: 12, label: 'Spin CW Top Right' },
		{ id: 13, label: 'Spin CCW Top Left' },
		{ id: 14, label: 'Spin CW Bottom Right' },
		{ id: 15, label: 'Spin CCW Bottom Left' },
		{ id: 16, label: 'Squeeze Top Left' },
		{ id: 17, label: 'Squeeze Top' },
		{ id: 18, label: 'Squeeze Top Right' },
		{ id: 19, label: 'Squeeze Left' },
		{ id: 20, label: 'Squeeze Right' },
		{ id: 21, label: 'Squeeze Bottom Left' },
		{ id: 22, label: 'Squeeze Bottom' },
		{ id: 23, label: 'Squeeze Bottom Right' },
		{ id: 24, label: 'Push Top Left' },
		{ id: 25, label: 'Push Top' },
		{ id: 26, label: 'Push Top Right' },
		{ id: 27, label: 'Push Left' },
		{ id: 28, label: 'Push Right' },
		{ id: 29, label: 'Push Bottom Left' },
		{ id: 30, label: 'Push Bottom' },
		{ id: 31, label: 'Push Bottom Right' },
		{ id: 32, label: 'Graphic CW Spin' },
		{ id: 33, label: 'Graphic CCW Spin' },
		{ id: 34, label: 'Graphic Logo Wipe' },
	]

	actions.transitionAuto = {
		label: 'Transition: Auto',
		options: [option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/auto', [
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionCut = {
		label: 'Transition: Cut',
		options: [option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/cut', [
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDip = {
		label: 'Transition: Dip',
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
			context.oscSend('/mixeffect/transition/dip', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: options.videoSource },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDipSource = {
		label: 'Transition: Dip Source',
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
			context.oscSend('/mixeffect/transition/dip/source', [
				{ type: 'i', value: options.videoSource },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transtionDve = {
		label: 'Transition: DVE',
		options: [
			option.rate(),
			{
				type: 'dropdown',
				label: 'Style',
				id: 'style',
				choices: dveEffectStyles,
				default: 0,
				minChoicesForSearch: 0,
			},
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
			context.oscSend('/mixeffect/transition/dve', [
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
		label: 'Transition: DVE Flip Flop',
		options: [option.mode({ label: 'Flip Flop', id: 'flipflop' }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/flip-flop', [
				{ type: 'i', value: options.flipflop },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveInputs = {
		label: 'Transition: DVE Inputs',
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
			context.oscSend('/mixeffect/transition/dve/inputs', [
				{ type: 'i', value: options.fillSource },
				{ type: 'i', value: options.keySource },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveKey = {
		label: 'Transition: DVE Key',
		options: [
			option.mode({ label: 'Pre Multiplied', id: 'preMultiplied' }),
			option.clip(),
			option.gain(),
			option.mode({ label: 'Invert Key', id: 'invertKey' }),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/key', [
				{ type: 'i', value: options.preMultiplied },
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: options.invertKey },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveClipGain = {
		label: 'Transition: DVE Key Clip Gain',
		options: [option.clip(), option.gain(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/key/clip-gain', [
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDevKeyClipSet = {
		label: 'Transition: DVE Key Clip Set',
		options: [option.clip(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/key/clip/set', [
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDevKeyClipAdjust = {
		label: 'Transition: DVE Key Clip Adjust',
		options: [option.value({ min: -100, max: 100, step: 0.1, defaultValue: 0 }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/key/clip/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDevKeyGainSet = {
		label: 'Transition: DVE Key Gain Set',
		options: [option.gain(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/key/gain/set', [
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDevKeyGainAdjust = {
		label: 'Transition: DVE Key Gain Adjust',
		options: [option.value({ min: -100, max: 100, step: 0.1, defaultValue: 0 }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/key/gain/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveKeyEnable = {
		label: 'Transition: DVE Key Enable',
		options: [option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/key/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveKeyInvert = {
		label: 'Transition: DVE Key Invert',
		options: [option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/key/invert', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveKeyPreMultiplied = {
		label: 'Transition: DVE Key Pre Multiplied',
		options: [option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/key/pre-multiplied', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveReverse = {
		label: 'Transition: DVE Reverse',
		options: [option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/reverse', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionDveStyle = {
		label: 'Transition: DVE Style',
		options: [
			{
				type: 'dropdown',
				label: 'Style',
				id: 'style',
				choices: dveEffectStyles,
				default: 0,
				minChoicesForSearch: 0,
			},
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/dve/style', [
				{ type: 'i', value: options.style },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionMix = {
		label: 'Transition: Mix',
		options: [option.rate(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/mix', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionNext = {
		label: 'Transition: Next',
		options: [
			{
				type: 'dropdown',
				label: 'Key',
				id: 'key',
				choices: [
					{ id: 0, label: 'Background' },
					...generateChoices({
						label: 'Key',
						count: context.switcher.upstreamKeyers,
						numberAll: true,
						selected: false,
					}),
				],
				default: 1,
			},
			option.mode(),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/next', [
				{ type: 'i', value: options.key },
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionPreview = {
		label: 'Transition: Preview',
		options: [option.mode(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/preview', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionRate = {
		label: 'Transition: Rate',
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
			context.oscSend('/mixeffect/transition/rate', [
				{ type: 'i', value: options.style },
				{ type: 'i', value: options.rate },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionStyle = {
		label: 'Transition: Style',
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
			context.oscSend('/mixeffect/transition/style', [
				{ type: 'i', value: options.style },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipe = {
		label: 'Transition: Wipe',
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
			context.oscSend('/mixeffect/transition/wipe', [
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
		label: 'Transition: Wipe Border',
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
			context.oscSend('/mixeffect/transition/wipe/border', [
				{ type: 'f', value: parseFloat(options.width) },
				{ type: 'f', value: parseFloat(options.softness) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeBorderSoftnessSet = {
		label: 'Transition: Wipe Border Softness Set',
		options: [option.softness(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/wipe/border/parameter/set', [
				{ type: 'i', value: 0 },
				{ type: 'f', value: parseFloat(options.softness) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeBorderSoftnessAdjust = {
		label: 'Transition: Wipe Border Softness Adjust',
		options: [option.value({ min: -100, max: 100, step: 0.1, defaultValue: 0 }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/wipe/border/parameter/adjust', [
				{ type: 'i', value: 0 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeBorderWidthSet = {
		label: 'Transition: Wipe Border Width Set',
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
			context.oscSend('/mixeffect/transition/wipe/border/parameter/set', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.width) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeBorderWidthAdjust = {
		label: 'Transition: Wipe Border Width Adjust',
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
			context.oscSend('/mixeffect/transition/wipe/border/parameter/adjust', [
				{ type: 'i', value: 1 },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeFlipFlop = {
		label: 'Transition: Wipe Flip Flop',
		options: [option.mode({ label: 'Flip Flop', id: 'flipflop' }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/wipe/flip-flop', [
				{ type: 'i', value: options.flipflop },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipePattern = {
		label: 'Transition: Wipe Pattern',
		options: [option.pattern(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/wipe/pattern', [
				{ type: 'i', value: options.pattern },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipePatternCycle = {
		label: 'Transition: Wipe Pattern Cycle',
		options: [option.yesNo({ label: 'Reverse', id: 'reverse' }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/wipe/pattern/cycle', [
				{ type: 'i', value: options.reverse },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipePosition = {
		label: 'Transition: Wipe Position',
		options: [
			option.position({ label: 'Position X', id: 'x', defaultValue: 0.5 }),
			option.position({ label: 'Position Y', id: 'y', defaultValue: 0.5 }),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/wipe/position', [
				{ type: 'f', value: parseFloat(options.x) },
				{ type: 'f', value: parseFloat(options.y) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipePositionSet = {
		label: 'Transition: Wipe Position Set',
		options: [
			option.coordinate(),
			option.position({ label: 'Position', id: 'position', defaultValue: 0.5 }),
			option.mixEffectBus(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/wipe/position/set', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.position) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipePositionAdjust = {
		label: 'Transition: Wipe Position Adjust',
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
			context.oscSend('/mixeffect/transition/wipe/position/adjust', [
				{ type: 's', value: options.coordinate },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeReverse = {
		label: 'Transition: Wipe Reverse',
		options: [option.mode({ label: 'Reverse', id: 'reverse' }), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/wipe/reverse', [
				{ type: 'i', value: options.reverse },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeSource = {
		label: 'Transition: Wipe Source',
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
			context.oscSend('/mixeffect/transition/wipe/source', [
				{ type: 'i', value: options.fillSource },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeSymmetrySet = {
		label: 'Transition: Wipe Symmetry Set',
		options: [option.symmetry(), option.mixEffectBus(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/transition/wipe/symmetry', [
				{ type: 'f', value: parseFloat(options.symmetry) },
				{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
			])
		},
	}

	actions.transitionWipeSymmetryAdjust = {
		label: 'Transition: Wipe Symmetry Adjust',
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
			context.oscSend('/mixeffect/transition/wipe/symmetry/adjust', [
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
