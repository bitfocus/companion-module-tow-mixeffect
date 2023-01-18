const switcherActions = ({ context }) => {
	const actions = {}

	actions.switcherStartupStateClear = {
		name: 'Switcher: Startup State Clear',
		options: [],
		callback: () => context.oscSend('/mixeffect/startup/clear'),
	}

	actions.switcherStartupStateSave = {
		name: 'Switcher: Startup State Save',
		options: [],
		callback: () => context.oscSend('/mixeffect/startup/save'),
	}

	return actions
}

module.exports = {
	switcherActions,
}
