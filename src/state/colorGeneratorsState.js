const { getVariableName } = require('./utils')

const stateDefinition = {
	hue: {
		label: 'Hue',
		defaultValue: 0,
		feedback: 'colorHue',
		getVariableName,
	},
	saturation: {
		label: 'Saturation',
		defaultValue: 0,
		feedback: 'colorSaturation',
		getVariableName,
	},
	luminance: {
		label: 'Luminance',
		defaultValue: 0,
		feedback: 'colorLuminance',
		getVariableName,
	},
}

const getVariables = ({ colorGenerators }) => {
	let variables = []
	for (let colorIndex = 0; colorIndex < colorGenerators; colorIndex++) {
		variables = [
			...variables,
			...Object.keys(stateDefinition)
				.map((name) => ({ name, ...stateDefinition[name] }))
				.filter((key) => typeof key.getVariableName === 'function')
				.map(({ name, getVariableName, label, defaultValue }) => ({
					name: getVariableName('color', colorIndex + 1, name),
					label,
					defaultValue,
				})),
		]
	}
	return variables
}

const getVariableUpdates = ({ currentState = [], newState = [] }) => {
	const updates = []

	newState.forEach((newColor, index) => {
		const currentColor = currentState[index]

		Object.keys(newColor).forEach((key) => {
			if (!(key in stateDefinition)) {
				return
			}

			if (currentColor && currentColor[key] === newColor[key]) {
				return
			}

			if (typeof stateDefinition[key].getVariableName === 'function') {
				updates.push({
					name: stateDefinition[key].getVariableName('color', index + 1, key),
					value: newColor[key],
				})
			}
		})
	})
	return updates
}

const getFeedbackUpdates = ({ currentState = [], newState = [] }) => {
	const updates = []

	newState.forEach((newColor, index) => {
		const currentColor = currentState[index]

		Object.keys(newColor).forEach((key) => {
			if (!(key in stateDefinition)) {
				return
			}

			if (currentColor && currentColor[key] === newColor[key]) {
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
