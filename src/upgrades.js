const renameOption = (result, action, oldOption, newOption) => {
	if (oldOption === newOption) {
		return
	}
	if (Object.keys(action.options).includes(oldOption)) {
		Object.assign(action.options, { [newOption]: action.options[oldOption] })
		delete action.options[oldOption]
	}
	if (!result.updatedActions.includes(action)) {
		result.updatedActions.push(action)
	}
}

module.exports = {
	v1_1_0(context, props) {
		/* props
		{
			config: Object | null,
			actions: [],
			feedbacks: [],
		}
		*/
		let actions = props.actions
		let result = {
			updatedConfig: null, // the config does not need updating
			updatedActions: [],
			updatedFeedbacks: [],
		}

		const actionsToRename = [
			{ old: 'setMultiviewLayout', new: 'multiViewerLayoutSet' },
			{ old: 'setMultiviewLayoutAdvanced', new: 'multiViewerAdvancedLayoutSet' },
			{ old: 'setMultiviewWindow', new: 'multiViewerWindowSet' },
		]

		// config.model = model.atemMiniExtremeIso
		actions.forEach((action) => {
			renameOption(result, action, 'boxId', 'box')
			renameOption(result, action, 'macroIndex', 'macro')
			renameOption(result, action, 'mediaPlayerIndex', 'mediaPlayer')
			renameOption(result, action, 'meid', 'mixEffectBus')
			renameOption(result, action, 'multiviewer', 'multiViewer')
			renameOption(result, action, 'stillIndex', 'still')
			renameOption(result, action, 'superSourceId', 'superSource')

			actionsToRename.forEach((names) => {
				if (action.actionId === names.old) {
					action.actionId = names.new
					if (!result.updatedActions.includes(action)) {
						result.updatedActions.push(action)
					}
				}
			})
		})

		return result
	},
}
