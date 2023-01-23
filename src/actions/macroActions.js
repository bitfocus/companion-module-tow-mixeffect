const { option } = require('./utils')

const macroActions = ({ context }) => {
	const actions = {}

	actions.macroRun = {
		name: 'Macro: Run',
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
			context.oscSendPath('/mixeffect/macro', [{ type: 'i', value: options.macro }])
		},
	}

	actions.macroContinue = {
		name: 'Macro: Continue',
		options: [],
		callback: () => context.oscSendPath('/mixeffect/macro/continue'),
	}

	actions.macroLoop = {
		name: 'Macro: Loop',
		options: [option.mode()],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/macro/loop', [{ type: 'i', value: options.mode }])
		},
	}

	actions.macroStop = {
		name: 'Macro: Stop',
		options: [],
		callback: () => context.oscSendPath('/mixeffect/macro/stop'),
	}

	return actions
}

module.exports = {
	macroActions,
}
