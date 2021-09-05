module.exports = {
	initFeedbacks() {
		const feedbacks = {}

		feedbacks.selected_media_player = {
			type: 'boolean',
			label: 'Set color based on selected Media Player',
			style: {
				color: this.rgb(255, 255, 255),
				bgcolor: this.rgb(255, 0, 0),
			},
			options: [
				{
					type: 'dropdown',
					label: 'Media Player',
					id: 'mediaPlayerIndex',
					choices: [
						{ id: 1, label: 'Media Player 1' },
						{ id: 2, label: 'Media Player 2' },
						{ id: 3, label: 'Media Player 3' },
						{ id: 4, label: 'Media Player 4' },
					],
					default: 1,
				},
			],
			callback: ({ options }) => options.mediaPlayerIndex === this.store.variables.selectedMediaPlayer,
		}

		this.setFeedbackDefinitions(feedbacks)
	},
}
