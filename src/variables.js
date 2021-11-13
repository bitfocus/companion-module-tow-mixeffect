module.exports = {
	staticVariableDefinitions: [
		{
			label: 'Selected Media Player',
			name: 'media_player',
			storeId: 'selectedMediaPlayer',
			feedback: 'selected_media_player',
			defaultValue: 1,
		},
		{
			label: 'Selected Mix Effect Bus',
			name: 'mix_effect_bus',
			storeId: 'selectedMixEffectBus',
			feedback: 'selected_mix_effect_bus',
			defaultValue: 1,
		},
		{
			label: 'Selected Box',
			name: 'box',
			storeId: 'selectedBox',
			feedback: 'selected_box',
			defaultValue: 1,
		},
		{
			label: 'Selected SuperSource',
			name: 'supersource',
			storeId: 'selectedSuperSource',
			feedback: 'selected_supersource',
			defaultValue: 1,
		},
		{
			label: 'Selected USK',
			name: 'usk',
			storeId: 'selectedUSK',
			feedback: 'selected_usk',
			defaultValue: 1,
		},
		{
			label: 'Selected DSK',
			name: 'dsk',
			storeId: 'selectedDSK',
			feedback: 'selected_dsk',
			defaultValue: 1,
		},
		{
			label: 'Selected Color Generator',
			name: 'color_generator',
			storeId: 'selectedColorGenerator',
			feedback: 'selected_color_generator',
			defaultValue: 1,
		},
		{
			label: 'Selected AUX Bus',
			name: 'aux_bus',
			storeId: 'selectedAuxBus',
			feedback: 'selected_aux_bus',
			defaultValue: 1,
		},
		{
			label: 'Selected MultiViewer',
			name: 'multiviewer',
			storeId: 'selectedMultiViewer',
			feedback: 'selected_multiviewer',
			defaultValue: 1,
		},
	],

	initVariables() {
		this.variableDefinitions = [...this.staticVariableDefinitions, ...this.getStateVariables()]

		// Configure variables
		this.setVariableDefinitions(this.variableDefinitions)

		// Set initial values
		this.variableDefinitions.forEach(({ name, defaultValue }) => {
			this.updateVariable(name, defaultValue)
		})
	},

	updateVariable(name, value) {
		const { storeId, feedback } = this.variableDefinitions.find((item) => item.name === name)

		this.setVariable(name, value)
		if (storeId) {
			this.store.variables[storeId] = value
		}
		if (feedback) {
			this.checkFeedbacks(feedback)
		}
	},

	updateVariables(updates = []) {
		updates.forEach(({ name, value }) => this.updateVariable(name, value))
	},
}
