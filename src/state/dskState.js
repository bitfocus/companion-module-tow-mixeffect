const { getVariableName } = require('./utils')

const stateDefinition = {
	keySource: {
		label: 'Key Source',
		defaultValue: 0,
		feedback: 'dskKeySource',
		getVariableName: getVariableName.bind(null, 'dsk'),
		getValue: ({ value, context }) => context.getVideoSourceName(value),
	},
	isAutoTransitioning: { feedback: 'dskIsAutoTransitioning' },
	invertKey: { feedback: 'dskInvertKey' },
	inTransition: { feedback: 'dskInTransition' },
	tie: { feedback: 'dskTie' },
	isTowardsOnAir: {},
	fillSource: {
		label: 'Full Source',
		defaultValue: 0,
		feedback: 'dskFillSource',
		getVariableName: getVariableName.bind(null, 'dsk'),
		getValue: ({ value, context }) => context.getVideoSourceName(value),
	},
	onAir: { feedback: 'dskOnAir' },
	masked: { feedback: 'dskMasked' },
	rate: { getVariableName: getVariableName.bind(null, 'dsk'), label: 'Rate', defaultValue: 30, feedback: 'dskRate' },
	preMultiplied: { feedback: 'dskPreMultiplied' },
}

const getVariables = ({ downstreamKeyers }) => {
	let variables = []

	for (let index = 0; index < downstreamKeyers; index++) {
		variables = [
			...variables,
			...Object.keys(stateDefinition)
				.map((name) => ({ name, ...stateDefinition[name] }))
				.filter((key) => typeof key.getVariableName === 'function')
				.map(({ name, getVariableName, label, defaultValue }) => ({
					name: getVariableName(index + 1, name),
					label: `DSK ${index + 1} ${label}`,
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