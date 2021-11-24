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
	v1_1_0(context, config, actions) {
		let upgraded = false

		const actionsToRename = [
			{ old: 'setMultiviewLayout', new: 'multiViewerLayoutSet' },
			{ old: 'setMultiviewLayoutAdvanced', new: 'multiViewerAdvancedLayoutSet' },
			{ old: 'setMultiviewWindow', new: 'multiViewerWindowSet' },
		]

		// config.model = model.atemMiniExtremeIso
		actions.forEach((action) => {
			upgraded = upgraded || renameOption(action, 'boxId', 'box')
			upgraded = upgraded || renameOption(action, 'macroIndex', 'macro')
			upgraded = upgraded || renameOption(action, 'mediaPlayerIndex', 'mediaPlayer')
			upgraded = upgraded || renameOption(action, 'meid', 'mixEffectBus')
			upgraded = upgraded || renameOption(action, 'multiviewer', 'multiViewer')
			upgraded = upgraded || renameOption(action, 'stillIndex', 'still')
			upgraded = upgraded || renameOption(action, 'superSourceId', 'superSource')

			actionsToRename.forEach((names) => {
				if (action.action === names.old) {
					action.action = names.new
					upgraded = true
				}
			})
		})

		return upgraded
	},

	v1_2_0(context, config) {
		let upgraded = false

		if (typeof config.port === 'string') {
			config.port = parseInt(config.port)
			upgraded = true
		}

		if (config.feedbackPort === undefined) {
			config.feedbackPort = this.DEFAULT_FEEDBACK_PORT
			upgraded = true
		}

		if (config.feedbackInterval === undefined) {
			config.feedbackInterval = this.DEFAULT_FEEDBACK_INTERVAL
			upgraded = true
		}

		return upgraded
	},
}
