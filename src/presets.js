const thumbnails = require('./thumbnails')

module.exports = {
	initPresets() {
		const presets = []

		const generateWithNoOptions = ({ category, label, size, action }) => ({
			category: category,
			label: label,
			bank: {
				style: 'text',
				text: label,
				size: size,
				color: this.rgb(255, 255, 255),
				bgcolor: this.rgb(0, 0, 0),
			},
			actions: [
				{
					action: action,
				},
			],
		})

		const switcherSection = {
			category: 'Switcher Section',
			list: [
				{ id: 'audio', label: 'Audio', size: 14 },
				{ id: 'auxiliary', label: 'AUX', size: 14 },
				{ id: 'camera-control', label: 'Camera Control', size: 14 },
				{ id: 'color-generators', label: 'Color Gen', size: 14 },
				{ id: 'downstream-keyers', label: 'DSK', size: 14 },
				{ id: 'hyperdecks', label: 'Hyperdeck', size: 14 },
				{ id: 'macros', label: 'Macros', size: 14 },
				{ id: 'media', label: 'Media', size: 14 },
				{ id: 'output', label: 'Output', size: 14 },
				{ id: 'settings', label: 'Settings', size: 14 },
				{ id: 'supersource', label: 'Super Source', size: 14 },
				{ id: 'switcher', label: 'Switcher', size: 14 },
				{ id: 'transitions', label: 'Transition', size: 14 },
				{ id: 'upstream-keyers', label: 'USK', size: 14 },
				{ id: 'view-all', label: 'View All Presets', size: 14 },
			],
			generate: (item) => ({
				category: switcherSection.category,
				label: item.label,
				bank: {
					style: 'text',
					text: item.label,
					size: item.size,
					color: this.rgb(255, 255, 255),
					bgcolor: this.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'switcherSection',
						options: {
							section: item.id,
						},
					},
				],
			}),
		}

		const superSourcePreset = {
			category: 'SuperSource Preset',
			list: [
				{ label: 'Four Grid' },
				{ label: 'Four Grid Alternate' },
				{ label: 'Four Grid Full' },
				{ label: 'Four Horizontal Crop' },
				{ label: 'Four Horizontal Full' },
				{ label: 'Four Left' },
				{ label: 'Four Left Full' },
				{ label: 'iPad Mini Left' },
				{ label: 'iPad Mini PIP' },
				{ label: 'iPad Mini Right' },
				{ label: 'iPad Pro 12.9 Left' },
				{ label: 'iPad Pro 12.9 PIP' },
				{ label: 'iPad Pro 12.9 Right' },
				{ label: 'iPhone Pro Max PIP' },
				{ label: 'PIP Under' },
				{ label: 'Standard - 1' },
				{ label: 'Standard - 2' },
				{ label: 'Standard - 3' },
				{ label: 'Standard - 4' },
				{ label: 'Three Horizontal Crop' },
				{ label: 'Three Horizontal Fill' },
				{ label: 'Three Left' },
				{ label: 'Three Left Crop' },
				{ label: 'Three Top' },
				{ label: 'Two Bottom' },
				{ label: 'Two Diagonal' },
				{ label: 'Two Horizontal' },
				{ label: 'Two Horizontal Crop' },
				{ label: 'Two Horizontal Fill' },
				{ label: 'Two Left' },
				{ label: 'Two Right' },
				{ label: 'Two Top' },
				{ label: 'Two Vertical' },
				{ label: 'Two Vertical Fill' },
				{ label: 'USK - Five Grid Corp' },
				{ label: 'USK - Five Left' },
				{ label: 'USK - PIP Over' },
				{ label: 'USK - PIP Over Two' },
				{ label: 'USK - Six Grid' },
				{ label: 'USK - Six Grid Crop' },
				{ label: 'USK - Six Left' },
			],
			generate: (item) => ({
				category: superSourcePreset.category,
				label: item.label,
				bank: {
					style: 'text',
					text: item.label,
					alignment: 'center:bottom',
					size: 7,
					color: this.rgb(255, 255, 255),
					bgcolor: this.rgb(0, 0, 0),
					png64: thumbnails[item.label],
					pngalignment: 'center:bottom',
				},
				actions: [
					{
						action: 'superSourcePreset',
						options: {
							presetName: item.label,
							superSourceId: 1,
						},
					},
				],
			}),
		}

		const superSourcePresetAdditional = {
			category: 'SuperSource Preset',
			list: [
				{ action: 'superSourcePresetPrevious', label: 'Previous Preset' },
				{ action: 'superSourcePresetNext', label: 'Next  Preset' },
			],
			generate: (item) => ({
				category: superSourcePresetAdditional.category,
				label: item.label,
				bank: {
					style: 'text',
					text: item.label,
					size: 14,
					color: this.rgb(255, 255, 255),
					bgcolor: this.rgb(0, 0, 0),
				},
				actions: [
					{
						action: item.action,
						options: {
							superSourceId: 1,
						},
					},
				],
			}),
		}

		const superSourceAnimationSpeed = {
			category: 'SuperSource Animation Speed',
			list: [
				{ id: 0, label: 'Instant' },
				{ id: 1, label: 'Extra Fast' },
				{ id: 2, label: 'Fast' },
				{ id: 3, label: 'Normal' },
				{ id: 4, label: 'Slow' },
				{ id: 5, label: 'Extra Slow' },
			],
			generate: (item) => ({
				category: superSourceAnimationSpeed.category,
				label: item.label,
				bank: {
					style: 'text',
					text: item.label,
					size: '18',
					color: this.rgb(255, 255, 255),
					bgcolor: this.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'superSourceAnimationSpeed',
						options: {
							speed: item.id,
						},
					},
				],
			}),
		}

		const superSourceAnimationStyle = {
			category: 'SuperSource Animation Style',
			list: [
				{ id: 0, label: 'Cosine' },
				{ id: 1, label: 'Cubed' },
				{ id: 2, label: 'Inverse Cubed' },
				{ id: 3, label: 'Inverse Squared' },
				{ id: 4, label: 'Linear' },
				{ id: 5, label: 'Sine' },
				{ id: 6, label: 'Smooth Step' },
				{ id: 7, label: 'Smoother Step' },
				{ id: 8, label: 'Squared' },
			],
			generate: (item) => ({
				category: superSourceAnimationStyle.category,
				label: item.label,
				bank: {
					style: 'text',
					text: item.label,
					size: 14,
					color: this.rgb(255, 255, 255),
					bgcolor: this.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'superSourceAnimationStyle',
						options: {
							style: item.id,
						},
					},
				],
			}),
		}

		const superSourceHighlight = {
			category: 'SuperSource Highlight',
			list: [
				{ id: 1, label: 'Highlight Box 1' },
				{ id: 2, label: 'Highlight Box 2' },
				{ id: 3, label: 'Highlight Box 3' },
				{ id: 4, label: 'Highlight Box 4' },
			],
			generate: (item) => ({
				category: superSourceHighlight.category,
				label: item.label,
				bank: {
					style: 'text',
					text: item.label,
					size: 14,
					color: this.rgb(255, 255, 255),
					bgcolor: this.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'superSourceHighlight',
						options: {
							boxId: item.id,
							superSourceId: 1,
						},
					},
				],
			}),
		}

		const videoFollowAudio = {
			category: 'Video Follows Audio',
			list: [
				{ id: 'on', label: 'VFA\\nOn' },
				{ id: 'off', label: 'VFA\\nOff' },
				{ id: 'toggle', label: 'VFA\\nToggle' },
			],
			generate: (item) => ({
				category: videoFollowAudio.category,
				label: item.label,
				bank: {
					style: 'text',
					text: item.label,
					size: 18,
					color: this.rgb(255, 255, 255),
					bgcolor: this.rgb(0, 0, 0),
				},
				actions: [
					{
						action: 'videoFollowAudio',
						options: {
							mode: item.id,
						},
					},
				],
			}),
		}

		// Switcher Section
		switcherSection.list.forEach(item => presets.push(switcherSection.generate(item)))

		// SuperSource Presets
		superSourcePreset.list.forEach(item => presets.push(superSourcePreset.generate(item)))
		superSourcePresetAdditional.list.forEach(item => presets.push(superSourcePresetAdditional.generate(item)))

		// SuperSource Animation Speed
		superSourceAnimationSpeed.list.forEach(item => presets.push(superSourceAnimationSpeed.generate(item)))
		presets.push(generateWithNoOptions({
			category: superSourceAnimationSpeed.category,
			label: 'Cycle Speed',
			size: 18,
			action: 'superSourceAnimationSpeedCycle',
		}))

		// SuperSource Animation Style
		superSourceAnimationStyle.list.forEach(item => presets.push(superSourceAnimationStyle.generate(item)))
		presets.push(generateWithNoOptions({
			category: superSourceAnimationStyle.category,
			label: 'Cycle Style',
			size: 14,
			action: 'superSourceAnimationStyleCycle',
		}))

		// SuperSource Highlight
		superSourceHighlight.list.forEach(item => presets.push(superSourceHighlight.generate(item)))

		// Video Follows Audio
		videoFollowAudio.list.forEach(item => presets.push(videoFollowAudio.generate(item)))

		// Other Actions
		presets.push(generateWithNoOptions({
			category: 'Other Actions',
			label: 'View Only Mode',
			size: 14,
			action: 'viewOnlyMode',
		}))

		this.setPresetDefinitions(presets)
	},
}
