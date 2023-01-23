const switcherActions = ({ context }) => {
	const actions = {}

	actions.switcherStartupStateClear = {
		name: 'Switcher: Startup State Clear',
		options: [],
		callback: () => context.oscSendPath('/mixeffect/startup/clear'),
	}

	actions.switcherStartupStateSave = {
		name: 'Switcher: Startup State Save',
		options: [],
		callback: () => context.oscSendPath('/mixeffect/startup/save'),
	}

	return actions
}

module.exports = {
	switcherActions,
}
