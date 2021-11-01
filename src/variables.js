module.exports = {
	variableDefinitions: [
		{
			label: 'Selected Media Player',
			name: 'media_player',
			storeId: 'selectedMediaPlayer',
			feedback: 'selected_media_player',
		},
		{
			label: 'Selected Mix Effect Bus',
			name: 'mix_effect_bus',
			storeId: 'selectedMixEffectBus',
			feedback: 'selected_mix_effect_bus',
		},
		{
			label: 'Selected Box',
			name: 'box',
			storeId: 'selectedBox',
			feedback: 'selected_box',
		},
		{
			label: 'Selected SuperSource',
			name: 'supersource',
			storeId: 'selectedSuperSource',
			feedback: 'selected_supersource',
		},
		{
			label: 'Selected USK',
			name: 'usk',
			storeId: 'selectedUSK',
			feedback: 'selected_usk',
		},
		{
			label: 'Selected DSK',
			name: 'dsk',
			storeId: 'selectedDSK',
			feedback: 'selected_dsk',
		},
		{
			label: 'Selected Color Generator',
			name: 'color_generator',
			storeId: 'selectedColorGenerator',
			feedback: 'selected_color_generator',
		},
	],

	initVariables() {
		// Configure variables
		this.setVariableDefinitions(this.variableDefinitions)

		// Set initial values
		this.variableDefinitions.forEach(({ name, storeId }) => {
			this.updateVariable(name, this.store.variables[storeId])
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
}
