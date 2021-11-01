const { arrayOf } = require('./utils')

module.exports = {
	initFeedbacks() {
		const feedbacks = {}

		const generateChoices = ({ label, base, count }) =>
			arrayOf(count, base).map((n) => ({ id: n, label: `${label} ${n}` }))

		const generateInternalFeedback = ({ label, id, storeId, choices, base, count }) => ({
			type: 'boolean',
			label: `Set color based on selected ${label}`,
			style: {
				color: this.rgb(255, 255, 255),
				bgcolor: this.rgb(255, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					label,
					id,
					choices: choices ? choices : generateChoices({ label, base, count }),
					default: base,
				},
			],
			callback: ({ options }) => {
				return options[id] === this.store.variables[storeId]
			},
		})

		feedbacks.selected_media_player = generateInternalFeedback({
			label: 'Media Player',
			id: 'mediaPlayer',
			storeId: 'selectedMediaPlayer',
			base: 1,
			count: 4,
		})

		feedbacks.selected_mix_effect_bus = generateInternalFeedback({
			label: 'Mix Effect Bus',
			id: 'mixEffectBus',
			storeId: 'selectedMixEffectBus',
			base: 1,
			count: 4,
		})

		feedbacks.selected_box = generateInternalFeedback({
			label: 'Box',
			id: 'box',
			storeId: 'selectedBox',
			base: 1,
			count: 4,
		})

		feedbacks.selected_supersource = generateInternalFeedback({
			label: 'SuperSource',
			id: 'supersource',
			storeId: 'selectedSuperSource',
			base: 1,
			count: 2,
		})

		feedbacks.selected_usk = generateInternalFeedback({
			label: 'USK',
			id: 'usk',
			storeId: 'selectedUSK',
			base: 1,
			count: 4,
		})

		feedbacks.selected_dsk = generateInternalFeedback({
			label: 'DSK',
			id: 'dsk',
			storeId: 'selectedDSK',
			base: 1,
			count: 4,
		})


		feedbacks.selected_color_generator = generateInternalFeedback({
			label: 'Color Generator',
			id: 'colorGenerator',
			storeId: 'selectedColorGenerator',
			base: 1,
			count: 2,
		})

		this.setFeedbackDefinitions(feedbacks)
	},
}
