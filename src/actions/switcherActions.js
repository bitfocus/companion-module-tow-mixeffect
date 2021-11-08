const switcherActions = ({ context }) => {
	const actions = {}

	actions.switcherStartupStateClear = {
		label: 'Switcher: Startup State Clear',
		callback: () => context.oscSend('/mixeffect/startup/clear'),
	}

	actions.switcherStartupStateSave = {
		label: 'Switcher: Startup State Save',
		callback: () => context.oscSend('/mixeffect/startup/save'),
	}

	return actions
}

module.exports = {
	switcherActions,
}
