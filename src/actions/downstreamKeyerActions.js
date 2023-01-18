const { option } = require('./utils')
const { availability } = require('../switchers/types')

const downstreamKeyerActions = ({ context }) => {
	const actions = {}

	actions.dskSelect = {
		name: 'DSK: Select',
		options: [option.dsk(context, false)],
		callback: ({ options }) => {
			context.updateVariable('dsk', options.dsk)
		},
	}

	actions.dskAuto = {
		name: 'DSK: Auto',
		options: [option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/auto', [{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) }])
		},
	}

	actions.dskInputs = {
		name: 'DSK: Inputs',
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
			option.dsk(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/inputs', [
				{ type: 'i', value: options.fillSource },
				{ type: 'i', value: options.keySource },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKey = {
		name: 'DSK: Key',
		options: [
			option.mode({ label: 'Pre Multiplied', id: 'preMultiplied' }),
			option.clip(),
			option.gain(),
			option.mode({ label: 'Invert Key', id: 'invertKey' }),
			option.dsk(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key', [
				{ type: 'i', value: options.preMultiplied },
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: options.invertKey },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyClipGain = {
		name: 'DSK: Key Clip Gain',
		options: [option.clip(), option.gain(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/clip-gain', [
				{ type: 'f', value: parseFloat(options.clip) },
				{ type: 'f', value: parseFloat(options.gain) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyClipSet = {
		name: 'DSK: Key Clip Set',
		options: [option.value({ step: 0.1 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/clip/set', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyGainSet = {
		name: 'DSK: Key Gain Set',
		options: [option.value({ step: 0.1 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/gain/set', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyClipAdjust = {
		name: 'DSK: Key Clip Adjust',
		options: [option.value({ min: -100, step: 0.1 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/clip/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyGainAdjust = {
		name: 'DSK: Key Gain Adjust',
		options: [option.value({ min: -100, step: 0.1 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/gain/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyInvert = {
		name: 'DSK: Key Invert',
		options: [option.mode(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/invert', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyPreMultiplied = {
		name: 'DSK: Key Pre Multiplied',
		options: [option.mode(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/pre-multiplied', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMask = {
		name: 'DSK: Mask',
		options: [
			option.value({ label: 'Top', id: 'top', min: -9, max: 9, defaultValue: 9 }),
			option.value({ label: 'Bottom', id: 'bottom', min: -9, max: 9, defaultValue: -9 }),
			option.value({ label: 'Left', id: 'left', min: -16, max: 16, defaultValue: -16 }),
			option.value({ label: 'Right', id: 'right', min: -16, max: 16, defaultValue: 16 }),
			option.dsk(context),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask', [
				{ type: 'f', value: parseFloat(options.top) },
				{ type: 'f', value: parseFloat(options.bottom) },
				{ type: 'f', value: parseFloat(options.left) },
				{ type: 'f', value: parseFloat(options.right) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMaskEnable = {
		name: 'DSK: Mask Enable',
		options: [option.mode(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMaskTopSet = {
		name: 'DSK: Mask Top Set',
		options: [option.value({ min: -9, max: 9, defaultValue: 9 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask/set', [
				{ type: 's', value: 'top' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMaskBottomSet = {
		name: 'DSK: Mask Bottom Set',
		options: [option.value({ min: -9, max: 9, defaultValue: -9 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask/set', [
				{ type: 's', value: 'bottom' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMaskLeftSet = {
		name: 'DSK: Mask Left Set',
		options: [option.value({ min: -16, max: 16, defaultValue: -16 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask/set', [
				{ type: 's', value: 'left' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMaskRightSet = {
		name: 'DSK: Mask Right Set',
		options: [option.value({ min: -16, max: 16, defaultValue: 16 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask/set', [
				{ type: 's', value: 'right' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMaskTopAdjust = {
		name: 'DSK: Mask Top Adjust',
		options: [option.value({ min: -9, max: 9, defaultValue: 0 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask/adjust', [
				{ type: 's', value: 'top' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMaskBottomAdjust = {
		name: 'DSK: Mask Bottom Adjust',
		options: [option.value({ min: -9, max: 9, defaultValue: 0 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask/adjust', [
				{ type: 's', value: 'bottom' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMaskLeftAdjust = {
		name: 'DSK: Mask Left Adjust',
		options: [option.value({ min: -16, max: 16, defaultValue: 0 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask/adjust', [
				{ type: 's', value: 'left' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMaskRightAdjust = {
		name: 'DSK: Mask Right Adjust',
		options: [option.value({ min: -16, max: 16, defaultValue: 0 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask/adjust', [
				{ type: 's', value: 'right' },
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskOnAir = {
		name: 'DSK: On Air',
		options: [option.mode(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/on-air', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskRate = {
		name: 'DSK: Rate',
		options: [option.rate(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/rate', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskTie = {
		name: 'DSK: Tie',
		options: [option.mode(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/tie', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	return actions
}

module.exports = {
	downstreamKeyerActions,
}
