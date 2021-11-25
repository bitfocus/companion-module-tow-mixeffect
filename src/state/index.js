const { updateState } = require('./utils')

const all = {
	aux: require('./auxState'),
	dsk: require('./dskState'),
	colorGenerators: require('./colorGeneratorsState'),
	// fairlight: require('./fairlightState'),
	// mediaPool: require('./mediaPoolState'),
	// me: require('./meState'),
	// macros: require('./macrosState'),
	// multiview: require('./multiViewerState'),
	output: require('./outputState'),
	// sources: require('./sourcesState'),
	// superSource: require('./superSourceState'),
}

module.exports = {
	getStateVariables() {
		const variables = Object.keys(all)
			.map((name) => all[name])
			.flatMap((item) => item.getVariables(this.switcher))
		return variables
	},

	parseState(newState) {
		const variableUpdates = Object.keys(all)
			.map((name) => ({ name, item: all[name] }))
			.flatMap(({ name, item }) =>
				item.getVariableUpdates({
					currentState: this.state[name],
					newState: newState[name],
					context: this,
				})
			)

		const feedbackUpdates = Object.keys(all)
			.map((name) => ({ name, item: all[name] }))
			.flatMap(({ name, item }) =>
				item.getFeedbackUpdates({ currentState: this.state[name], newState: newState[name] })
			)

		Object.keys(all).forEach((name) => updateState({ currentState: this.state[name], newState: newState[name] }))

		if (variableUpdates.length) {
			this.debug({ variables: variableUpdates })
		}

		if (feedbackUpdates.length) {
			this.debug({ feedbacks: feedbackUpdates })
		}

		if (variableUpdates.length) {
			this.updateVariables(variableUpdates)
		}

		if (feedbackUpdates.length) {
			this.checkFeedbacks(...feedbackUpdates)
		}
	},
}
