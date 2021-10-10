const { model } = require('./switchers/types')

const renameAction = (actions = [], oldAction, newAction) => {
	if (oldAction === newAction) {
		return false
	}

	const found = actions.find((action) => action.id === oldAction)
	if (found.length === 1) {
		action.id = newAction
	}
	return true
}

const renameOption = (action, oldOption, newOption) => {
	if (oldOption === newOption) {
		return false
	}
	if (Object.keys(action.options).includes(oldOption)) {
		Object.assign(action.options, { [newOption]: action.options[oldOption] })
		delete action.options[oldOption]
	}
	return true
}

module.exports = {
	v1_1_0(context, config, actions, feedbacks) {
		let upgraded = false

		// config.model = model.atemMiniExtremeIso
		actions.forEach((action) => {
			upgraded = upgraded || renameOption(action, 'boxId', 'box')
			upgraded = upgraded || renameOption(action, 'macroIndex', 'macro')
			upgraded = upgraded || renameOption(action, 'mediaPlayerIndex', 'mediaPlayer')
			upgraded = upgraded || renameOption(action, 'meid', 'mixEffectBus')
			upgraded = upgraded || renameOption(action, 'stillIndex', 'still')
			upgraded = upgraded || renameOption(action, 'superSourceId', 'superSource')
		})

		return upgraded
	},
}
