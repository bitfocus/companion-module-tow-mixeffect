const { option } = require('./utils')
const { availability } = require('../switchers/types')

const downstreamKeyerActions = ({ context }) => {
	const actions = {}

	actions.dskSelect = {
		label: 'DSK: Select',
		options: [option.dsk(context, false)],
		callback: ({ options }) => {
			context.updateVariable('dsk', options.dsk)
		},
	}

	actions.dskAuto = {
		label: 'DSK: Auto',
		options: [option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/auto', [{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) }])
		},
	}

	actions.dskInputs = {
		label: 'DSK: Inputs',
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
		label: 'DSK: Key',
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
		label: 'DSK: Key Clip Gain',
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
		label: 'DSK: Key Clip Set',
		options: [option.value({ step: 0.1 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/clip/set', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyGainSet = {
		label: 'DSK: Key Gain Set',
		options: [option.value({ step: 0.1 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/gain/set', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyClipAdjust = {
		label: 'DSK: Key Clip Adjust',
		options: [option.value({ min: -100, step: 0.1 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/clip/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyGainAdjust = {
		label: 'DSK: Key Gain Adjust',
		options: [option.value({ min: -100, step: 0.1 }), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/gain/adjust', [
				{ type: 'f', value: parseFloat(options.value) },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyInvert = {
		label: 'DSK: Key Invert',
		options: [option.mode(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/invert', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskKeyPreMultiplied = {
		label: 'DSK: Key Pre Multiplied',
		options: [option.mode(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/key/pre-multiplied', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMask = {
		label: 'DSK: Mask',
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
		label: 'DSK: Mask Enable',
		options: [option.mode(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/mask/enable', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskMaskTopSet = {
		label: 'DSK: Mask Top Set',
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
		label: 'DSK: Mask Bottom Set',
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
		label: 'DSK: Mask Left Set',
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
		label: 'DSK: Mask Right Set',
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
		label: 'DSK: Mask Top Adjust',
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
		label: 'DSK: Mask Bottom Adjust',
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
		label: 'DSK: Mask Left Adjust',
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
		label: 'DSK: Mask Right Adjust',
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
		label: 'DSK: On Air',
		options: [option.mode(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/on-air', [
				{ type: 'i', value: options.mode },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskRate = {
		label: 'DSK: Rate',
		options: [option.rate(), option.dsk(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/dsk/rate', [
				{ type: 'i', value: options.rate },
				{ type: 'i', value: context.selectedOrValue('dsk', options.dsk) },
			])
		},
	}

	actions.dskTie = {
		label: 'DSK: Tie',
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
