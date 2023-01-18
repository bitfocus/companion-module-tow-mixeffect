const { option } = require('./utils')

const fairlightActions = ({ context }) => {
	const actions = {}

	actions.fairlightAudioFrameDelay = {
		name: 'Fairlight: Audio Frame Delay',
		options: [
			option.audioSources(context.switcher.audioSources, (source) => source.frameDelay),
			option.audioSourceType(),
			option.value({ label: 'Frame Delay', id: 'frameDelay', min: 0, max: 8, step: 1 }),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/fairlight/frame-delay', [
				{ type: 'i', value: options.audioSource },
				{ type: 'i', value: options.audioSourceType },
				{ type: 'i', value: options.frameDelay },
			])
		},
	}

	actions.fairlightInputMixOptionSet = {
		name: 'Fairlight: Input Mix Option Set',
		options: [
			option.audioSources(context.switcher.audioSources),
			option.audioSourceType(),
			{
				type: 'dropdown',
				label: 'Mix Option',
				id: 'mixOption',
				choices: [
					{ id: 0, label: 'Toggle' },
					{ id: 1, label: 'On' },
					{ id: 2, label: 'Off' },
					{ id: 3, label: 'AFV' },
				],
				default: 0,
			},
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/fairlight/mix-option', [
				{ type: 'i', value: options.audioSource },
				{ type: 'i', value: options.audioSourceType },
				{ type: 'i', value: options.mixOption },
			])
		},
	}

	actions.fairlightFaderGainSet = {
		name: 'Fairlight: Fader Gain Set',
		options: [
			option.audioSources(context.switcher.audioSources),
			option.audioSourceType(),
			option.value({ min: -100, max: 10, defaultValue: 0 }),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/fairlight/fader-gain/set', [
				{ type: 'i', value: options.audioSource },
				{ type: 'i', value: options.audioSourceType },
				{ type: 'f', value: parseFloat(options.value) },
			])
		},
	}

	actions.fairlightInputGainSet = {
		name: 'Fairlight: Input Gain Set',
		options: [
			option.audioSources(context.switcher.audioSources),
			option.audioSourceType(),
			option.value({ min: -100, max: 6, defaultValue: 0 }),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/fairlight/input-gain/set', [
				{ type: 'i', value: options.audioSource },
				{ type: 'i', value: options.audioSourceType },
				{ type: 'f', value: parseFloat(options.value) },
			])
		},
	}

	actions.fairlightMasterGainSet = {
		name: 'Fairlight: Master Gain Set',
		options: [option.value({ min: -100, max: 10, defaultValue: 0 })],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/fairlight/master-gain/set', [{ type: 'f', value: parseFloat(options.value) }])
		},
	}

	actions.fairlightFaderGainAdjust = {
		name: 'Fairlight: Fader Gain Adjust',
		options: [
			option.audioSources(context.switcher.audioSources),
			option.audioSourceType(),
			option.value({ min: -100, max: 10, defaultValue: 0 }),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/fairlight/fader-gain/adjust', [
				{ type: 'i', value: options.audioSource },
				{ type: 'i', value: options.audioSourceType },
				{ type: 'f', value: parseFloat(options.value) },
			])
		},
	}

	actions.fairlightInputGainAdjust = {
		name: 'Fairlight: Input Gain Adjust',
		options: [
			option.audioSources(context.switcher.audioSources),
			option.audioSourceType(),
			option.value({ min: -100, max: 6, defaultValue: 0 }),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/fairlight/input-gain/adjust', [
				{ type: 'i', value: options.audioSource },
				{ type: 'i', value: options.audioSourceType },
				{ type: 'f', value: parseFloat(options.value) },
			])
		},
	}

	actions.fairlightMasterGainAdjust = {
		name: 'Fairlight: Master Gain Adjust',
		options: [option.value({ min: -100, max: 10, defaultValue: 0 })],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/fairlight/master-gain/adjust', [{ type: 'f', value: parseFloat(options.value) }])
		},
	}

	actions.fairlightResetPeaks = {
		name: 'Fairlight: Reset Peaks',
		options: [],
		callback: () => context.oscSend('/mixeffect/fairlight/reset-peaks'),
	}

	actions.fairlightResetSourcePeaks = {
		name: 'Fairlight: Reset Source Peaks',
		options: [
			option.audioSources(context.switcher.audioSources),
			option.audioSourceType(),
			option.yesNo({ label: 'Reset Output Peaks', id: 'output' }),
			option.yesNo({ label: 'Reset Dynamics Input Peaks', id: 'dynamicInput' }),
			option.yesNo({ label: 'Reset Dynamics Output Peaks', id: 'dynamicOutput' }),
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/fairlight/reset-source-peaks', [
				{ type: 'i', value: options.audioSource },
				{ type: 'i', value: options.audioSourceType },
				{ type: 'i', value: options.output },
				{ type: 'i', value: options.dynamicInput },
				{ type: 'i', value: options.dynamicOutput },
			])
		},
	}

	return actions
}

module.exports = {
	fairlightActions,
}
