const { getVariableName } = require('./utils')

const stateDefinition = {
	source: {
		label: 'AUX',
		defaultValue: 0,
		feedback: 'auxSource',
		getVariableName: getVariableName.bind(null, 'aux'),
		getValue: ({ value, context }) => context.getVideoSourceName(value),
	},
}

const getVariables = ({ auxBuses }) => {
	let variables = []

	for (let index = 0; index < auxBuses; index++) {
		variables = [
			...variables,
			...Object.keys(stateDefinition)
				.map((name) => ({ name, ...stateDefinition[name] }))
				.filter((key) => typeof key.getVariableName === 'function')
				.map(({ name, getVariableName, label, defaultValue }) => ({
					name: getVariableName(index + 1, name),
					label: `${label} ${index + 1}`,
					defaultValue,
				})),
		]
	}

	return variables
}

const getVariableUpdates = ({ currentState = [], newState = [], context }) => {
	const updates = []

	newState.forEach((newItem, index) => {
		const currentItem = currentState[index]

		Object.keys(newItem).forEach((key) => {
			if (!(key in stateDefinition)) {
				return
			}

			if (currentItem && currentItem[key] === newItem[key]) {
				return
			}

			if (typeof stateDefinition[key].getVariableName === 'function') {
				const getValue = stateDefinition[key].getValue
				updates.push({
					name: stateDefinition[key].getVariableName(index + 1, key),
					value: getValue ? getValue({ value: newItem[key], context }) : newItem[key],
				})
			}
		})
	})

	return updates
}

const getFeedbackUpdates = ({ currentState = [], newState = [] }) => {
	const updates = []

	newState.forEach((newItem, index) => {
		const currentItem = currentState[index]

		Object.keys(newItem).forEach((key) => {
			if (!(key in stateDefinition)) {
				return
			}

			if (currentItem && currentItem[key] === newItem[key]) {
				return
			}
			if (typeof stateDefinition[key].feedback === 'string') {
				updates.push(stateDefinition[key].feedback)
			}
		})
	})

	return updates
}

module.exports = {
	getVariables,
	getVariableUpdates,
	getFeedbackUpdates,
}
