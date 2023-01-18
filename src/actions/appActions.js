const { option } = require('./utils')

const appSwitcherSectionChoices = [
	{ id: 'audio', label: 'AUDIO' },
	{ id: 'auxiliary', label: 'Auxiliary', presetName: 'AUX' },
	{ id: 'camera-control', label: 'Camera Control', presetName: 'CAMERA' },
	{ id: 'color-generators', label: 'Color Generators', presetName: 'COLORS' },
	{ id: 'downstream-keyers', label: 'Downstream Keyers', presetName: 'DSK' },
	{ id: 'hyperdecks', label: 'Hyperdecks', presetName: 'HYPERDECK' },
	{ id: 'macros', label: 'Macros', presetName: 'MACROS' },
	{ id: 'media', label: 'Media', presetName: 'MEDIA' },
	{ id: 'output', label: 'Output', presetName: 'OUTPUT' },
	{ id: 'settings', label: 'Settings', presetName: 'SETTINGS' },
	{ id: 'supersource', label: 'SuperSource', presetName: 'SSRC' },
	{ id: 'switcher', label: 'Switcher', presetName: 'SWITCHER' },
	{ id: 'transitions', label: 'Transitions', presetName: 'TRANSITION' },
	{ id: 'upstream-keyers', label: 'Upstream Keyers', presetName: 'USK' },
	{ id: 'view-all', label: 'View All Presets', presetName: 'PRESETS' },
]

const appActions = ({ context }) => {
	const actions = {}

	actions.appConnectToSwitcher = {
		name: 'App: Connect to Switcher',
		options: [
			{
				type: 'textinput',
				label: 'Switcher Name in MixEffect',
				id: 'switcherName',
				default: 'ATEM',
			},
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/connect', [{ type: 's', value: options.switcherName }])
		},
	}

	actions.appRunShortCut = {
		name: 'App: Run Shortcut',
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
		callback: ({ options }) => {
			context.oscSend('/shortcut', [
				{ type: 's', value: options.shortcutName },
				{ type: 's', value: options.shortcutInput },
			])
		},
	}

	actions.appRunShortcutAndReturn = {
		name: 'App: Run Shortcut and Return',
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
		callback: ({ options }) => {
			context.oscSend('/shortcut/return', [
				{ type: 's', value: options.shortcutName },
				{ type: 's', value: options.shortcutInput },
			])
		},
	}

	actions.appSwitcherSection = {
		name: 'App: Switcher Section',
		options: [
			{
				type: 'dropdown',
				label: 'Section Tag',
				id: 'section',
				choices: appSwitcherSectionChoices,
				default: 'switcher',
				minChoicesForSearch: 0,
			},
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/section', [{ type: 's', value: options.section }])
		},
	}

	actions.appSwitcherPage = {
		name: 'App: Switcher Page',
		options: [
			{
				type: 'textinput',
				label: 'Page Name',
				id: 'page',
				default: 'Default',
			},
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/page', [{ type: 's', value: options.page }])
		},
	}

	actions.appSwitcherPagePrevious = {
		name: 'App: Switcher Page: Previous',
		options: [],
		callback: () => {
			context.oscSend('/mixeffect/page', [{ type: 's', value: 'previous' }])
		},
	}

	actions.appSwitcherPageNext = {
		name: 'App: Switcher Page: Next',
		options: [],
		callback: () => {
			context.oscSend('/mixeffect/page', [{ type: 's', value: 'next' }])
		},
	}

	actions.appRemoteWebView = {
		name: 'App: Remote WebView',
		options: [],
		callback: () => context.oscSend('/mixeffect/remote-webview'),
	}

	actions.appVideoFollowsAudio = {
		name: 'App: Video Follows Audio',
		options: [option.mode()],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/vfa', [{ type: 's', value: options.mode }])
		},
	}

	actions.appViewOnlyMode = {
		name: 'App: View Only Mode',
		options: [],
		callback: () => context.oscSend('/mixeffect/vom'),
	}

	return actions
}

module.exports = {
	appActions,
	appSwitcherSectionChoices,
}
