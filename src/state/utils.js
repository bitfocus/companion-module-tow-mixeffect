const getVariableName = (prefix, index, key) => `${prefix}${Number.isInteger(index) ? `_${index}` : ''}_${key}`

const onOff = (value) => (value ? 'ON' : 'OFF')

const updateState = ({ currentState, newState }) => {
	if (Array.isArray(newState)) {
		newState.forEach((element, index) => (currentState[index] = element))
	} else {
		Object.keys(newState).forEach((name) => (currentState[name] = newState[name]))
	}
}

module.exports = {
	getVariableName,
	onOff,
	updateState,
}
