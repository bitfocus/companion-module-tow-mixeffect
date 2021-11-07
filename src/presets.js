const thumbnails = require('./thumbnails')

const { appSwitcherSectionChoices } = require('./actions/appActions')
const { multiViewerAdvancedLayoutSetChoices } = require('./actions/multiViewerActions')

const images = require('./images')

module.exports = {
	initPresets() {
		const presets = []

		const generatePreset = ({ category, label, size = 14, action, bank = {}, options = {} }) => ({
			category,
			label,
			bank: {
				style: 'text',
				text: label,
				size,
				color: this.rgb(255, 255, 255),
				bgcolor: this.rgb(0, 0, 0),
				...bank,
			},
			actions: [
				{
					action,
					options,
				},
			],
		})

		const addPresetList = ({ category, size = 14, action, bank = {}, list = [] }) =>
			list.forEach((item) =>
				presets.push(
					generatePreset({
						category,
						size,
						action,
						...item,
						bank: {
							...bank,
							...item.bank,
						},
					})
				)
			)

		// MixEffect App
		addPresetList({
			category: 'Switcher',
			action: 'appSwitcherSection',
			list: appSwitcherSectionChoices.map(({ id, presetLabel }) => ({
				label: presetLabel,
				options: { section: id },
				bank: {
					size: '7',
					alignment: 'center:bottom',
					png64: images.appSwitcherSection[id],
				},
			})),
		})

		// MultiViewers
		addPresetList({
			category: 'MultiViewers',
			action: 'multiViewerAdvancedLayoutSet',
			list: multiViewerAdvancedLayoutSetChoices.map(({ id, label }) => ({
				options: { layout: id, multiViewer: 1 },
				bank: {
					png64: images.multiViewerAdvancedLayoutSet[label],
				},
			})),
		})

		// Transitions
		const transitionList = [
			{ label: 'Auto', action: 'auto' },
			{ label: 'Cut', action: 'cut' },
		]
		addPresetList({
			category: 'Transitions',
			size: 18,
			list: transitionList,
		})

		// SuperSource
		const superSourceList1 = [
			{ label: 'Four Grid' },
			{ label: 'Four Grid Alternate' },
			{ label: 'Four Grid Full' },
			{ label: 'Four Horizontal Crop' },
			{ label: 'Four Horizontal Fill' },
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
		].map(({ label }) => ({
			label,
			bank: { png64: thumbnails[label] },
			options: { presetName: label, superSource: 1 },
		}))
		addPresetList({
			category: 'SuperSource Preset',
			size: 7,
			bank: {
				alignment: 'center:bottom',
				pngalignment: 'center:bottom',
			},
			action: 'superSourcePreset',
			list: superSourceList1,
		})

		const superSourceList2 = [
			{ label: 'Previous Preset', action: 'superSourcePresetPrevious', options: { superSource: 1 } },
			{ label: 'Next  Preset', action: 'superSourcePresetNext', options: { superSource: 1 } },
		]
		addPresetList({
			category: 'SuperSource Preset',
			size: 14,
			list: superSourceList2,
		})

		// SuperSource Animation Speed
		const superSourceAnimationSpeedList = [
			{ label: 'Instant', action: 'superSourceAnimationSpeed', options: { speed: 0 } },
			{ label: 'Extra Fast', action: 'superSourceAnimationSpeed', options: { speed: 1 } },
			{ label: 'Fast', action: 'superSourceAnimationSpeed', options: { speed: 2 } },
			{ label: 'Normal', action: 'superSourceAnimationSpeed', options: { speed: 3 } },
			{ label: 'Slow', action: 'superSourceAnimationSpeed', options: { speed: 4 } },
			{ label: 'Extra Slow', action: 'superSourceAnimationSpeed', options: { speed: 5 } },
			{ label: 'Cycle Speed', action: 'superSourceAnimationSpeedCycle' },
		]
		addPresetList({
			category: 'SuperSource Animation Speed',
			size: 18,
			list: superSourceAnimationSpeedList,
		})

		// SuperSource Animation Style
		const superSourceAnimationStyleList = [
			{ label: 'Cosine', action: 'superSourceAnimationStyle', options: { style: 0 } },
			{ label: 'Cubed', action: 'superSourceAnimationStyle', options: { style: 1 } },
			{ label: 'Inverse Cubed', action: 'superSourceAnimationStyle', options: { style: 2 } },
			{ label: 'Inverse Squared', action: 'superSourceAnimationStyle', options: { style: 3 } },
			{ label: 'Linear', action: 'superSourceAnimationStyle', options: { style: 4 } },
			{ label: 'Sine', action: 'superSourceAnimationStyle', options: { style: 5 } },
			{ label: 'Smooth Step', action: 'superSourceAnimationStyle', options: { style: 6 } },
			{ label: 'Smoother Step', action: 'superSourceAnimationStyle', options: { style: 7 } },
			{ label: 'Squared', action: 'superSourceAnimationStyle', options: { style: 8 } },
			{ label: 'Cycle Style', action: 'superSourceAnimationStyleCycle' },
		]
		addPresetList({
			category: 'SuperSource Animation Style',
			size: 18,
			list: superSourceAnimationStyleList,
		})

		// SuperSource Highlight
		const superSourceHighlightList = [
			{ label: 'Highlight Box 1', options: { box: 1 } },
			{ label: 'Highlight Box 2', options: { box: 2 } },
			{ label: 'Highlight Box 3', options: { box: 3 } },
			{ label: 'Highlight Box 4', options: { box: 4 } },
			{ label: 'Highlight Reset', options: { box: 0 } },
		]

		addPresetList({
			category: 'SuperSource Highlight',
			action: 'superSourceHighlight',
			options: { superSource: 1 },
			list: superSourceHighlightList,
		})

		// Video Follows Audio
		const videoFollowsAudioList = [
			{ label: 'VFA\\nOn', options: { mode: 'on' } },
			{ label: 'VFA\\nOff', options: { mode: 'off' } },
			{ label: 'VFA\\nToggle', options: { mode: 'toggle' } },
		]
		addPresetList({
			category: 'Video Follows Audio',
			action: 'videoFollowAudio',
			size: 18,
			list: videoFollowsAudioList,
		})

		// Other Actions
		const otherList = [
			{ label: 'Remote Webview', action: 'remoteWebview' },
			{ label: 'View Only Mode', action: 'viewOnlyMode' },
		]
		addPresetList({
			category: 'Other Actions',
			list: otherList,
		})

		this.setPresetDefinitions(presets)
	},
}
