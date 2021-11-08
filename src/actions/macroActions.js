const { option } = require('./utils')

const macroActions = ({ context }) => {
	const actions = {}

	actions.macroRun = {
		label: 'Macro: Run',
		options: [
			{
				type: 'number',
				label: 'Macro Index',
				id: 'macro',
				min: 1,
				max: context.switcher.macros,
				default: 1,
			},
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/macro', [{ type: 'i', value: options.macro }])
		},
	}

	actions.macroContinue = {
		label: 'Macro: Continue',
		callback: () => context.oscSend('/mixeffect/macro/continue'),
	}

	actions.macroLoop = {
		label: 'Macro: Loop',
		options: [option.mode()],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/macro/loop', [{ type: 'i', value: options.mode }])
		},
	}

	actions.macroStop = {
		label: 'Macro: Stop',
		callback: () => context.oscSend('/mixeffect/macro/stop'),
	}

	return actions
}

module.exports = {
	macroActions,
}
