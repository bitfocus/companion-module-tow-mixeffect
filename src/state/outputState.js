const { onOff } = require('./utils')

const stateDefinition = {
	streaming: {
		label: 'Streaming Status',
		defaultValue: 'OFF',
		variable: 'streaming_status',
		getValue: ({ value }) => onOff(value),
		feedback: 'streaming',
	},
	recording: {
		label: 'Recording Status',
		defaultValue: 'OFF',
		variable: 'recording_status',
		getValue: ({ value }) => onOff(value),
		feedback: 'recording',
	},
}

const getVariables = (switcher) =>
	Object.keys(stateDefinition)
		.filter((name) => switcher[name])
		.map((name) => ({
			name: stateDefinition[name].variable,
			label: stateDefinition[name].label,
			defaultValue: stateDefinition[name].defaultValue,
		}))

const getVariableUpdates = ({ currentState, newState }) => {
	return Object.keys(stateDefinition)
		.filter((name) => name in newState)
		.filter((name) => currentState[name] !== newState[name])
		.map((name) => ({
			name: stateDefinition[name].variable,
			value: stateDefinition[name].getValue({ value: newState[name] }),
		}))
}

const getFeedbackUpdates = ({ currentState, newState }) => {
	return Object.keys(stateDefinition)
		.filter((name) => name in newState)
		.filter((name) => 'feedback' in stateDefinition[name])
		.filter((name) => currentState[name] !== newState[name])
		.map((name) => stateDefinition[name].feedback)
}

module.exports = {
	getVariables,
	getVariableUpdates,
	getFeedbackUpdates,
}
