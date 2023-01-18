const thumbnails = require('./thumbnails')

const { appSwitcherSectionChoices } = require('./actions/appActions')
const { multiViewerAdvancedLayoutSetChoices } = require('./actions/multiViewerActions')

const images = require('./images')

const { combineRgb } = require('@companion-module/base')

module.exports = {
	initPresets() {
		const presets = {}

		const generatePreset = ({ category, name, size = 14, actionId, style = {}, options = {} }) => ({
			category,
			name,
			type: 'button',
			options: [],
			style: {
				text: name,
				size,
				color: combineRgb(255, 255, 255),
				bgcolor: combineRgb(0, 0, 0),
				...style,
			},
			feedbacks: [],
			steps: [
				{
					down: [actionId, options],
					up: [],
				},
			],
		})

		// Each preset name must be unique as that is the key for the presets object
		const addPresetObject = ({ category, size = 14, actionId, style = {}, list = [] }) =>
			list.forEach(
				(item) =>
					(presets[item.name] = generatePreset({
						category,
						size,
						actionId,
						...item,
						style: {
							...style,
							...item.style,
						},
					}))
			)

		// MixEffect App
		addPresetObject({
			category: 'Switcher Sections',
			actionId: 'appSwitcherSection',
			list: appSwitcherSectionChoices.map(({ id, presetName }) => ({
				name: presetName,
				options: { section: id },
				style: {
					size: '7',
					alignment: 'center:bottom',
					png64: images.appSwitcherSection[id],
				},
			})),
		})

		// MultiViewers
		addPresetObject({
			category: 'MultiViewers',
			actionId: 'multiViewerAdvancedLayoutSet',
			// Here we use label as the options datatype still requires `label` and not `name`
			// See https://github.com/bitfocus/companion-module-base/blob/c423e3d722d2adb1c4d2e5f8e5b1eb432188ac91/src/module-api/input.ts
			list: multiViewerAdvancedLayoutSetChoices.map(({ id, label }) => ({
				options: { layout: id, multiViewer: 1 },
				style: {
					png64: images.multiViewerAdvancedLayoutSet[label],
				},
			})),
		})

		// Transitions
		const transitionList = [
			{ name: 'Auto', actionId: 'auto', options: { mixEffectBus: 1 } },
			{ name: 'Cut', actionId: 'cut', options: { mixEffectBus: 1 } },
		]
		addPresetObject({
			category: 'Transitions',
			size: 18,
			list: transitionList,
		})

		// SuperSource
		const superSourceList1 = [
			{ name: 'Four Grid' },
			{ name: 'Four Grid Alternate' },
			{ name: 'Four Grid Full' },
			{ name: 'Four Horizontal Crop' },
			{ name: 'Four Horizontal Fill' },
			{ name: 'Four Left' },
			{ name: 'Four Left Full' },
			{ name: 'iPad Mini Left' },
			{ name: 'iPad Mini PIP' },
			{ name: 'iPad Mini Right' },
			{ name: 'iPad Pro 12.9 Left' },
			{ name: 'iPad Pro 12.9 PIP' },
			{ name: 'iPad Pro 12.9 Right' },
			{ name: 'iPhone Pro Max PIP' },
			{ name: 'PIP Under' },
			{ name: 'Standard - 1' },
			{ name: 'Standard - 2' },
			{ name: 'Standard - 3' },
			{ name: 'Standard - 4' },
			{ name: 'Three Horizontal Crop' },
			{ name: 'Three Horizontal Fill' },
			{ name: 'Three Left' },
			{ name: 'Three Left Crop' },
			{ name: 'Three Top' },
			{ name: 'Two Bottom' },
			{ name: 'Two Diagonal' },
			{ name: 'Two Horizontal' },
			{ name: 'Two Horizontal Crop' },
			{ name: 'Two Horizontal Fill' },
			{ name: 'Two Left' },
			{ name: 'Two Right' },
			{ name: 'Two Top' },
			{ name: 'Two Vertical' },
			{ name: 'Two Vertical Fill' },
			{ name: 'USK - Five Grid Corp' },
			{ name: 'USK - Five Left' },
			{ name: 'USK - PIP Over' },
			{ name: 'USK - PIP Over Two' },
			{ name: 'USK - Six Grid' },
			{ name: 'USK - Six Grid Crop' },
			{ name: 'USK - Six Left' },
		].map(({ name }) => ({
			name,
			style: { png64: thumbnails[name] },
			options: { presetName: name, superSource: 1 },
		}))
		addPresetObject({
			category: 'SuperSource: Presets',
			size: 7,
			style: {
				alignment: 'center:bottom',
				pngalignment: 'center:bottom',
			},
			actionId: 'superSourcePreset',
			list: superSourceList1,
		})

		const superSourceList2 = [
			{ name: 'Previous Preset', actionId: 'superSourcePresetPrevious', options: { superSource: 1 } },
			{ name: 'Next  Preset', actionId: 'superSourcePresetNext', options: { superSource: 1 } },
		]
		addPresetObject({
			category: 'SuperSource: Presets',
			size: 14,
			list: superSourceList2,
		})

		// SuperSource Animation Speed
		const superSourceAnimationSpeedList = [
			{ name: 'Instant', actionId: 'superSourceAnimationSpeed', options: { speed: 0 } },
			{ name: 'Extra Fast', actionId: 'superSourceAnimationSpeed', options: { speed: 1 } },
			{ name: 'Fast', actionId: 'superSourceAnimationSpeed', options: { speed: 2 } },
			{ name: 'Normal', actionId: 'superSourceAnimationSpeed', options: { speed: 3 } },
			{ name: 'Slow', actionId: 'superSourceAnimationSpeed', options: { speed: 4 } },
			{ name: 'Extra Slow', actionId: 'superSourceAnimationSpeed', options: { speed: 5 } },
			{ name: 'Cycle Speed', actionId: 'superSourceAnimationSpeedCycle' },
		]
		addPresetObject({
			category: 'SuperSource: Animation Speed',
			size: 18,
			list: superSourceAnimationSpeedList,
		})

		// SuperSource Animation Style
		const superSourceAnimationStyleList = [
			{ name: 'Cosine', actionId: 'superSourceAnimationStyle', options: { style: 0 } },
			{ name: 'Cubed', actionId: 'superSourceAnimationStyle', options: { style: 1 } },
			{ name: 'Inverse Cubed', actionId: 'superSourceAnimationStyle', options: { style: 2 } },
			{ name: 'Inverse Squared', actionId: 'superSourceAnimationStyle', options: { style: 3 } },
			{ name: 'Linear', actionId: 'superSourceAnimationStyle', options: { style: 4 } },
			{ name: 'Sine', actionId: 'superSourceAnimationStyle', options: { style: 5 } },
			{ name: 'Smooth Step', actionId: 'superSourceAnimationStyle', options: { style: 6 } },
			{ name: 'Smoother Step', actionId: 'superSourceAnimationStyle', options: { style: 7 } },
			{ name: 'Squared', actionId: 'superSourceAnimationStyle', options: { style: 8 } },
			{ name: 'Cycle Style', actionId: 'superSourceAnimationStyleCycle' },
		]
		addPresetObject({
			category: 'SuperSource: Animation Style',
			size: 18,
			list: superSourceAnimationStyleList,
		})

		// SuperSource Highlight
		const superSourceHighlightList = [
			{ name: 'Highlight Box 1', options: { box: 1, supersource: 1 } },
			{ name: 'Highlight Box 2', options: { box: 2, supersource: 1 } },
			{ name: 'Highlight Box 3', options: { box: 3, supersource: 1 } },
			{ name: 'Highlight Box 4', options: { box: 4, supersource: 1 } },
			{ name: 'Highlight Reset', options: { box: 0, supersource: 1 } },
		]

		addPresetObject({
			category: 'SuperSource: Highlight',
			actionId: 'superSourceHighlight',
			options: { superSource: 1 },
			list: superSourceHighlightList,
		})

		// MixEffect App Actions
		const appActions = [
			{
				name: 'VFA ON',
				actionId: 'appVideoFollowsAudio',
				options: { mode: 1 },
				style: { png64: images.appActions.appVideoFollowsAudio },
			},
			{
				name: 'VFA OFF',
				actionId: 'appVideoFollowsAudio',
				options: { mode: 0 },
				style: { png64: images.appActions.appVideoFollowsAudio },
			},
			{
				name: 'VFA TOGGLE',
				actionId: 'appVideoFollowsAudio',
				options: { mode: 2 },
				style: { png64: images.appActions.appVideoFollowsAudio },
			},
			{ name: 'REMOTE WEBVIEW', actionId: 'appRemoteWebView', style: { png64: images.appActions.appRemoteWebView } },
			{ name: 'VIEW ONLY', actionId: 'appViewOnlyMode', style: { png64: images.appActions.appViewOnlyMode } },
		]
		addPresetObject({
			category: 'MixEffect App Actions',
			list: appActions,
			size: 7,
			style: {
				alignment: 'center:bottom',
			},
		})

		this.setPresetDefinitions(presets)
	},
}
