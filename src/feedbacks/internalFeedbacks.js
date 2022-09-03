const { generateChoices } = require('../utils')

const getFeedbacks = ({ context }) => {
	const generateInternalFeedback = ({ label, id, storeId, choices, base, count }) => ({
		type: 'boolean',
		label: `Selected: ${label}`,
		style: {
			color: context.rgb(255, 255, 255),
			bgcolor: context.rgb(255, 0, 0),
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
			return options[id] === context.store.variables[storeId]
		},
	})

	return {
		selected_media_player: generateInternalFeedback({
			label: 'Media Player',
			id: 'mediaPlayer',
			storeId: 'selectedMediaPlayer',
			base: 1,
			count: context.switcher.mediaPlayers,
		}),

		selected_mix_effect_bus: generateInternalFeedback({
			label: 'Mix Effect Bus',
			id: 'mixEffectBus',
			storeId: 'selectedMixEffectBus',
			base: 1,
			count: 4,
		}),

		selected_box: generateInternalFeedback({
			label: 'Box',
			id: 'box',
			storeId: 'selectedBox',
			base: 1,
			count: 4,
		}),

		selected_supersource: generateInternalFeedback({
			label: 'SuperSource',
			id: 'supersource',
			storeId: 'selectedSuperSource',
			base: 1,
			count: 2,
		}),

		selected_usk: generateInternalFeedback({
			label: 'USK',
			id: 'usk',
			storeId: 'selectedUSK',
			base: 1,
			count: 4,
		}),

		selected_dsk: generateInternalFeedback({
			label: 'DSK',
			id: 'dsk',
			storeId: 'selectedDSK',
			base: 1,
			count: 4,
		}),

		selected_color_generator: generateInternalFeedback({
			label: 'Color Generator',
			id: 'colorGenerator',
			storeId: 'selectedColorGenerator',
			base: 1,
			count: 2,
		}),

		selected_aux_bus: generateInternalFeedback({
			label: 'AUX Bus',
			id: 'auxBus',
			storeId: 'selectedAuxBus',
			base: 1,
			count: context.switcher.auxBuses,
		}),

		selected_multiviewer: generateInternalFeedback({
			label: 'MultiViewer',
			id: 'multiViewer',
			storeId: 'selectedMultiViewer',
			base: 1,
			count: context.switcher.multiViewers,
		}),
	}
}

module.exports = {
	getFeedbacks,
}
