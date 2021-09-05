module.exports = {
	initActions() {
		const inputChoices = [...Array(40).keys()].map(n => ({ id: n + 1, label: `Input ${n + 1}` }))

		const growChoices = [...Array(21).keys()].map( n => {
			const factor = n * 0.025;
			if (n === 0) {
				return { id: '0.000', label: 'Don\'t Change' }
			}
			return { id: factor.toPrecision(4), label: `${(factor + 1).toPrecision(4)}x` }
		})

		const shrinkChoices = [...Array(21).keys()].map( n => {
			const factor = n * 0.025;
			if (n === 0) {
				return { id: '0.000', label: 'Don\'t Change' }
			}
			return { id: factor.toPrecision(4), label: `${(1 - factor).toPrecision(4)}x` }
		})

		const actions = {
			// Connectivity Actions
			connect: {
				label: 'Connect to Switcher',
				options: [
					{
						type: 'textinput',
						label: 'Switcher Name in MixEffect',
						id: 'switcherName',
						default: 'ATEM',
					},
				],
			},
			// Transition Actions
			auto: {
				label: 'Auto',
				options: [
					{
						type: 'number',
						label: 'Mix Effects Bus',
						id: 'meId',
						min: 1,
						max: 4,
						default: 1,
					},
				],
			},
			cut: {
				label: 'Cut',
				options: [
					{
						type: 'number',
						label: 'Mix Effects Bus',
						id: 'meId',
						min: 1,
						max: 4,
						default: 1,
					},
				],
			},
			// Media Player Actions
			mediaPlayerClip: {
				label: 'Media Player: Clip',
				options: [
					{
						type: 'number',
						label: 'Clip Index',
						id: 'clipIndex',
						min: 1,
						default: 1,
					},
					{
						type: 'number',
						label: 'Media Player Index',
						id: 'mediaPlayerIndex',
						min: 1,
						default: 1,
					},
				],
			},
			mediaPlayerClipCycle: {
				label: 'Media Player: Clip Cycle',
				options: [
					{
						type: 'number',
						label: 'Media Player Index',
						id: 'mediaPlayerIndex',
						min: 1,
						default: 1,
					},
				],
			},
			mediaPlayerClipCycleReverse: {
				label: 'Media Player: Clip Reverse',
				options: [
					{
						type: 'number',
						label: 'Media Player Index',
						id: 'mediaPlayerIndex',
						min: 1,
						default: 1,
						required: true,
					},
				],
			},
			mediaPlayerStill: {
				label: 'Media Player: Still',
				options: [
					{
						type: 'number',
						label: 'Still Index',
						id: 'stillIndex',
						min: 1,
						default: 1,
					},
					{
						type: 'number',
						label: 'Media Player Index',
						id: 'mediaPlayerIndex',
						min: 1,
						default: 1,
					},
				],
			},
			mediaPlayerStillCycle: {
				label: 'Media Player: Still Cycle',
				options: [
					{
						type: 'number',
						label: 'Media Player Index',
						id: 'mediaPlayerIndex',
						min: 1,
						default: 1,
					},
				],
			},
			mediaPlayerStillCycleReverse: {
				label: 'Media Player: Still Reverse',
				options: [
					{
						type: 'number',
						label: 'Media Player Index',
						id: 'mediaPlayerIndex',
						min: 1,
						default: 1,
						required: true,
					},
				],
			},
			// Macro Actions
			macroRun: {
				label: 'Macro: Run',
				options: [
					{
						type: 'number',
						label: 'Macro Index',
						id: 'macroIndex',
						min: 1,
						default: 1,
					},
				],
			},
			// Shortcut Actions
			shortcutRun: {
				label: 'Shortcut: Run',
				options: [
					{
						type: 'textinput',
						label: 'Shortcut Name',
						id: 'shortcutName',
					},
					{
						type: 'textinput',
						label: 'Input',
						id: 'shortcutInput',
					},
				],
			},
			shortcutRunReturn: {
				label: 'Shortcut: Run and Return',
				options: [
					{
						type: 'textinput',
						label: 'Shortcut Name',
						id: 'shortcutName',
					},
					{
						type: 'textinput',
						label: 'Input',
						id: 'shortcutInput',
					},
				],
			},
			// Switcher Actions
			switcherSection: {
				label: 'Switcher: Section',
				options: [
					{
						type: 'dropdown',
						label: 'Section Tag',
						id: 'section',
						choices: [
							{ id: 'audio', label: 'Audio' },
							{ id: 'auxiliary', label: 'Auxiliary' },
							{ id: 'camera-control', label: 'Camera Control' },
							{ id: 'color-generators', label: 'Color Generators' },
							{ id: 'downstream-keyers', label: 'Downstream Keyers' },
							{ id: 'hyperdecks', label: 'Hyperdecks' },
							{ id: 'macros', label: 'Macros' },
							{ id: 'media', label: 'Media' },
							{ id: 'output', label: 'Output' },
							{ id: 'settings', label: 'Settings' },
							{ id: 'supersource', label: 'SuperSource' },
							{ id: 'switcher', label: 'Switcher' },
							{ id: 'transitions', label: 'Transitions' },
							{ id: 'upstream-keyers', label: 'Upstream Keyers' },
							{ id: 'view-all', label: 'View All Presets' },
						],
						default: 'switcher',
						minChoicesForSearch: 0,
					},
				],
			},
			switcherPage: {
				label: 'Switcher: Page',
				options: [
					{
						type: 'textinput',
						label: 'Page Name',
						id: 'page',
						default: 'Default',
					},
				],
			},
			switcherPagePrevious: {
				label: 'Switcher: Page Previous',
			},
			switcherPageNext: {
				label: 'Switcher: Page Next',
			},
			// SuperSource Actions
			superSourcePreset: {
				label: 'SuperSource: Preset',
				options: [
					{
						type: 'textinput',
						label: 'Preset Name',
						id: 'presetName',
					},
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
				],
			},
			superSourcePresetPrevious: {
				label: 'SuperSource: Previous Preset',
				options: [
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
				],
			},
			superSourcePresetNext: {
				label: 'SuperSource: Next Preset',
				options: [
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
				],
			},
			superSourceHighlight: {
				label: 'SuperSource: Highlight',
				options: [
					{
						type: 'number',
						label: 'Box ID (0 to reset)',
						id: 'boxId',
						min: 0,
						max: 4,
						default: 1,
					},
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
				],
			},
			superSourceBoxCrop: {
				label: 'SuperSource: Box Crop',
				options: [
					{
						type: 'number',
						label: 'Box ID',
						id: 'boxId',
						min: 1,
						max: 4,
						default: 1,
					},
					{
						type: 'dropdown',
						label: 'Type',
						id: 'type',
						choices: [
							{ id: 'top', label: 'Top' },
							{ id: 'bottom', label: 'Bottom' },
							{ id: 'left', label: 'Left' },
							{ id: 'right', label: 'Right' },
						],
						default: 'top',
						minChoicesForSearch: 0,
					},
					{
						type: 'textinput',
						label: 'Crop (+X, -Y, or Z)',
						id: 'crop',
						default: '0',
					},
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
				],
			},
			superSourceBoxPosition: {
				label: 'SuperSource: Box Position',
				options: [
					{
						type: 'number',
						label: 'Box ID',
						id: 'boxId',
						min: 1,
						max: 4,
						default: 1,
					},
					{
						type: 'dropdown',
						label: 'Type',
						id: 'type',
						choices: [
							{ id: 'x', label: 'X' },
							{ id: 'y', label: 'Y' },
						],
						default: 'x',
					},
					{
						type: 'textinput',
						label: 'Position (+X, -Y, or Z)',
						id: 'position',
						default: '0',
					},
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
				],
			},
			superSourceBoxSize: {
				label: 'SuperSource: Box Size',
				options: [
					{
						type: 'number',
						label: 'Box ID',
						id: 'boxId',
						min: 1,
						max: 4,
						default: 1,
					},
					{
						type: 'textinput',
						label: 'Size (+X, -Y, or Z)',
						id: 'size',
						default: '1',
					},
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
				],
			},
			superSourceBoxSource: {
				label: 'SuperSource: Box Source',
				options: [
					{
						type: 'number',
						label: 'Box ID',
						id: 'boxId',
						min: 1,
						max: 4,
						default: 1,
					},
					{
						type: 'dropdown',
						label: 'Video Source',
						id: 'videoSource',
						choices: [
							{ id: 0, label: 'Black' },
							...inputChoices,
							{ id: 1000, label: 'Color Bars' },
							{ id: 2001, label: 'Color 1' },
							{ id: 2002, label: 'Color 2' },
							{ id: 3010, label: 'Media Player 1' },
							{ id: 3011, label: 'Media Player 1 Key' },
							{ id: 3020, label: 'Media Player 2' },
							{ id: 3021, label: 'Media Player 2 Key' },
							{ id: 3030, label: 'Media Player 3' },
							{ id: 3031, label: 'Media Player 3 Key' },
							{ id: 3040, label: 'Media Player 4' },
							{ id: 3041, label: 'Media Player 4 Key' },
							{ id: 6000, label: 'SuperSource 1' },
							{ id: 6001, label: 'SuperSource 2' },
						],
						default: 0,
						minChoicesForSearch: 0,
					},
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
				],
			},
			superSourceAnimationSpeed: {
				label: 'SuperSource: Animation Speed',
				options: [
					{
						type: 'dropdown',
						label: 'Speed',
						id: 'speed',
						choices: [
							{ id: 0, label: 'Instant' },
							{ id: 1, label: 'Extra Fast' },
							{ id: 2, label: 'Fast' },
							{ id: 3, label: 'Normal' },
							{ id: 4, label: 'Slow' },
							{ id: 5, label: 'Extra Slow' },
						],
						default: 2,
						minChoicesForSearch: 0,
					},
				],
			},
			superSourceAnimationSpeedCycle: {
				label: 'SuperSource: Cycle Animation Speed',
			},
			superSourceAnimationStyle: {
				label: 'SuperSource: Animation Style',
				options: [
					{
						type: 'dropdown',
						label: 'Style',
						id: 'style',
						choices: [
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
						default: 5,
						minChoicesForSearch: 0,
					},
				],
			},
			superSourceAnimationStyleCycle: {
				label: 'SuperSource: Cycle Animation Style',
			},
			superSourceGrowHighlightedBox: {
				label: 'SuperSource: Grow Highlighted Box',
				options: [
					{
						type: 'dropdown',
						label: 'Grow To',
						id: 'growTo',
						choices: growChoices,
						default: '0.000',
						minChoicesForSearch: 0,
					},
				],
			},
			superSourceGrowHighlightedBoxBy: {
				label: 'SuperSource: Grow Highlighted Box By',
				options: [
					{
						type: 'number',
						label: 'Grow By (0 to 0.5)',
						id: 'growBy',
						min: 0,
						max: 0.5,
						step: 0.025,
						default: 0,
					},
				],
			},
			superSourceShrinkOtherBoxes: {
				label: 'SuperSource: Shrink Other Boxes',
				options: [
					{
						type: 'dropdown',
						label: 'Shrink To',
						id: 'shrinkTo',
						choices: shrinkChoices,
						default: '0.000',
						minChoicesForSearch: 0,
					},
				],
			},
			superSourceShrinkOtherBoxesBy: {
				label: 'SuperSource: Shrink Other Boxes By',
				options: [
					{
						type: 'number',
						label: 'Shrink By (0 to 0.5)',
						id: 'shrinkBy',
						min: 0,
						max: 0.5,
						step: 0.025,
						default: 0,
					},
				],
			},
			superSourceSwap: {
				label: 'SuperSource: Swap',
				options: [
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
				],
			},
			superSourceSwapBoxes: {
				label: 'SuperSource: Swap Boxes',
				options: [
					{
						type: 'number',
						label: 'First ID',
						id: 'boxId1',
						min: 1,
						max: 4,
						default: 1,
					},
					{
						type: 'number',
						label: 'Second ID',
						id: 'boxId1',
						min: 1,
						max: 4,
						default: 2,
					},
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
				],
			},
			superSourceAuto: {
				label: 'SuperSource: Auto',
				options: [
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
					{
						type: 'number',
						label: 'Mix Effects Bus',
						id: 'meId',
						min: 1,
						max: 4,
						default: 1,
					},
				],
			},
			superSourceCut: {
				label: 'SuperSource: Cut',
				options: [
					{
						type: 'number',
						label: 'SuperSource ID',
						id: 'superSourceId',
						min: 1,
						default: 1,
					},
					{
						type: 'number',
						label: 'Mix Effects Bus',
						id: 'meId',
						min: 1,
						max: 4,
						default: 1,
					},
				],
			},
			superSourceCascade: {
				label: 'SuperSource: Cascade',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'mode',
						choices: [
							{ id: 'on', label: 'On' },
							{ id: 'off', label: 'Off' },
							{ id: 'toggle', label: 'Toggle' },
						],
						default: 'on',
						minChoicesForSearch: 0,
					},
				],
			},
			superSourceCascadePresets: {
				label: 'SuperSource: CascadePresets',
				options: [
					{
						type: 'textinput',
						label: 'Super Source 1',
						id: 'superSource1',
					},
					{
						type: 'textinput',
						label: 'Super Source 2',
						id: 'superSource2',
					},
				],
			},
			videoFollowAudio: {
				label: 'Video Follows Audio',
				options: [
					{
						type: 'dropdown',
						label: 'Mode',
						id: 'mode',
						choices: [
							{ id: 'on', label: 'On' },
							{ id: 'off', label: 'Off' },
							{ id: 'toggle', label: 'Toggle' },
						],
						default: 'on',
						minChoicesForSearch: 0,
					},
				],
			},
			viewOnlyMode: {
				label: 'View Only Mode',
			},
			remoteWebview: {
				label: 'Remote Webview',
			},

		}

		this.setActions(actions)
	},

	action({ action, options }) {
		let path = ''
		const args = []

		switch (action) {
			// Connectivity Actions
			case 'connect':
				path = '/mixeffect/connect'
				args.push({ type: 's', value: options.switcherName })
				break
			// Transition Actions
			case 'auto':
				path = '/mixeffect/auto'
				args.push({ type: 'i', value: options.meId })
				break
			case 'cut':
				path = '/mixeffect/cut'
				args.push({ type: 'i', value: options.meId })
				break
			// Media Player Actions
			case 'mediaPlayerClip':
				path = '/mixeffect/mp/clip'
				args.push({ type: 'i', value: parseInt(options.ClipIndex) })
				args.push({ type: 'i', value: parseInt(options.mediaPlayerIndex) })
				break
			case 'mediaPlayerClipCycle':
				path = '/mixeffect/mp/clip/cycle'
				args.push({ type: 'i', value: parseInt(options.mediaPlayerIndex) })
				break
			case 'mediaPlayerClipCycleReverse':
				path = '/mixeffect/mp/clip/cycle-reverse'
				args.push({ type: 'i', value: parseInt(options.mediaPlayerIndex) })
				break
			case 'mediaPlayerStill':
				path = '/mixeffect/mp/still'
				args.push({ type: 'i', value: parseInt(options.stillIndex) })
				args.push({ type: 'i', value: parseInt(options.mediaPlayerIndex) })
				break
			case 'mediaPlayerStillCycle':
				path = '/mixeffect/mp/still/cycle'
				args.push({ type: 'i', value: parseInt(options.mediaPlayerIndex) })
				break
			case 'mediaPlayerStillCycleReverse':
				path = '/mixeffect/mp/still/cycle-reverse'
				args.push({ type: 'i', value: parseInt(options.mediaPlayerIndex) })
				break
			// Macro Actions
			case 'macroRun':
				path = '/mixeffect/macro'
				args.push({ type: 'i', value: parseInt(options.macroIndex) })
				break
			// Shortcut Actions
			case 'shortcutRun':
				path = '/shortcut'
				args.push({ type: 's', value: options.shortcutName })
				args.push({ type: 's', value: options.shortcutInput })
				break
			case 'shortcutRunReturn':
				path = '/shortcut/return'
				args.push({ type: 's', value: options.shortcutName })
				args.push({ type: 's', value: options.shortcutInput })
				break
			// Switcher Actions
			case 'switcherSection':
				path = '/mixeffect/section'
				args.push({ type: 's', value: options.section })
				break
			case 'switcherPage':
				path = '/mixeffect/page'
				args.push({ type: 's', value: options.page })
				break
			case 'switcherPagePrevious':
				path = '/mixeffect/page'
				args.push({ type: 's', value: 'previous' })
				break
			case 'switcherPageNext':
				path = '/mixeffect/page'
				args.push({ type: 's', value: 'next' })
				break
			// SuperSource Actions
			case 'superSourcePreset':
				path = '/mixeffect/ssrc/preset'
				args.push({ type: 's', value: options.presetName })
				args.push({ type: 's', value: options.superSourceId })
				break
			case 'superSourcePresetPrevious':
				path = '/mixeffect/ssrc/previous'
				args.push({ type: 's', value: options.superSourceId })
				break
			case 'superSourcePresetNext':
				path = '/mixeffect/ssrc/next'
				args.push({ type: 's', value: options.superSourceId })
				break
			case 'superSourceHighlight':
				path = '/mixeffect/ssrc/highlight'
				args.push({ type: 's', value: options.boxId })
				args.push({ type: 's', value: options.superSourceId })
				break
			case 'superSourceBoxCrop':
				path = '/mixeffect/ssrc/box/crop'
				args.push({ type: 'i', value: options.boxId })
				args.push({ type: 's', value: options.type })
				args.push({ type: 's', value: options.crop })
				args.push({ type: 'i', value: options.superSourceId })
				break
			case 'superSourceBoxPosition':
				path = '/mixeffect/ssrc/box/position'
				args.push({ type: 'i', value: options.boxId })
				args.push({ type: 's', value: options.type })
				args.push({ type: 's', value: options.position })
				args.push({ type: 'i', value: options.superSourceId })
				break
			case 'superSourceBoxSize':
				path = '/mixeffect/ssrc/box/size'
				args.push({ type: 'i', value: options.boxId })
				args.push({ type: 's', value: options.size })
				args.push({ type: 'i', value: options.superSourceId })
				break
			case 'superSourceBoxSource':
				path = '/mixeffect/ssrc/box/source'
				args.push({ type: 'i', value: options.boxId })
				args.push({ type: 'i', value: options.videoSource })
				args.push({ type: 'i', value: options.superSourceId })
				break
			case 'superSourceAnimationSpeed':
				path = '/mixeffect/ssrc/speed'
				args.push({ type: 'i', value: options.speed })
				break
			case 'superSourceAnimationSpeedCycle':
				path = '/mixeffect/ssrc/cycle-speed'
				break
			case 'superSourceAnimationStyle':
				path = '/mixeffect/ssrc/style'
				args.push({ type: 'i', value: options.style })
				break
			case 'superSourceAnimationStyleCycle':
				path = '/mixeffect/ssrc/cycle-style'
				break
			case 'superSourceGrowHighlightedBox':
				path = '/mixeffect/ssrc/grow-to'
				console.log(options)
				args.push({ type: 'f', value: parseFloat(options.growTo) })
				break
			case 'superSourceGrowHighlightedBoxBy':
				path = '/mixeffect/ssrc/grow-by'
				args.push({ type: 'f', value: options.growBy })
				break
			case 'superSourceShrinkOtherBoxes':
				path = '/mixeffect/ssrc/shrink-to'
				args.push({ type: 'f', value: parseFloat(options.shrinkTo) })
				break
			case 'superSourceShrinkOtherBoxesBy':
				path = '/mixeffect/ssrc/shrink-by'
				args.push({ type: 'f', value: options.shrinkBy })
				break
			case 'superSourceSwap':
				path = '/mixeffect/ssrc/swap'
				args.push({ type: 'i', value: options.superSourceId })
				break
			case 'superSourceSwapBoxes':
				path = '/mixeffect/ssrc/swap-boxes'
				args.push({ type: 'i', value: options.boxId1 })
				args.push({ type: 'i', value: options.boxId2 })
				args.push({ type: 'i', value: options.superSourceId })
				break
			case 'superSourceAuto':
				path = '/mixeffect/ssrc/auto'
				args.push({ type: 'i', value: options.superSourceId })
				args.push({ type: 'i', value: options.meId })
				break
			case 'superSourceCut':
				path = '/mixeffect/ssrc/cut'
				args.push({ type: 'i', value: options.superSourceId })
				args.push({ type: 'i', value: options.meId })
				break
			case 'superSourceCascade':
				path = '/mixeffect/ssrc/cascade'
				args.push({ type: 's', value: options.mode })
				break
			case 'superSourceCascadePresets':
				path = '/mixeffect/ssrc/cascade/presets'
				args.push({ type: 's', value: options.superSource1 })
				args.push({ type: 's', value: options.superSource2 })
				break
			// Other Actions
			case 'videoFollowAudio':
				path = '/mixeffect/vfa'
				args.push({ type: 's', value: options.mode })
				break
			case 'viewOnlyMode':
				path = '/mixeffect/vom'
				break
			case 'remoteWebview':
				path = '/mixeffect/remote-webview'
				break
			// Unknown Actions
			default:
				return
		}

		console.log('osc_send', this.config.ip, this.config.port, path, args)
		this.system.emit('osc_send', this.config.ip, this.config.port, path, args)
	},
}
