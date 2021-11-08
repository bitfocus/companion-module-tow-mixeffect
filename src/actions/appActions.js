const { option } = require('./utils')

const appSwitcherSectionChoices = [
	{ id: 'audio', label: 'AUDIO' },
	{ id: 'auxiliary', label: 'Auxiliary', presetLabel: 'AUX' },
	{ id: 'camera-control', label: 'Camera Control', presetLabel: 'CAMERA' },
	{ id: 'color-generators', label: 'Color Generators', presetLabel: 'COLORS' },
	{ id: 'downstream-keyers', label: 'Downstream Keyers', presetLabel: 'DSK' },
	{ id: 'hyperdecks', label: 'Hyperdecks', presetLabel: 'HYPERDECK' },
	{ id: 'macros', label: 'Macros', presetLabel: 'MACROS' },
	{ id: 'media', label: 'Media', presetLabel: 'MEDIA' },
	{ id: 'output', label: 'Output', presetLabel: 'OUTPUT' },
	{ id: 'settings', label: 'Settings', presetLabel: 'SETTINGS' },
	{ id: 'supersource', label: 'SuperSource', presetLabel: 'SSRC' },
	{ id: 'switcher', label: 'Switcher', presetLabel: 'SWITCHER' },
	{ id: 'transitions', label: 'Transitions', presetLabel: 'TRANSITION' },
	{ id: 'upstream-keyers', label: 'Upstream Keyers', presetLabel: 'USK' },
	{ id: 'view-all', label: 'View All Presets', presetLabel: 'PRESETS' },
]

const appActions = ({ context }) => {
	const actions = {}

	actions.appConnectToSwitcher = {
		label: 'App: Connect to Switcher',
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
		label: 'App: Run Shortcut',
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
		label: 'App: Run Shortcut and Return',
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
		label: 'App: Switcher Section',
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
		label: 'App: Switcher Page',
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
		label: 'App: Switcher Page: Previous',
		callback: () => {
			context.oscSend('/mixeffect/page', [{ type: 's', value: 'previous' }])
		},
	}

	actions.appSwitcherPageNext = {
		label: 'App: Switcher Page: Next',
		callback: () => {
			context.oscSend('/mixeffect/page', [{ type: 's', value: 'next' }])
		},
	}

	actions.appRemoteWebView = {
		label: 'App: Remote WebView',
		callback: () => context.oscSend('/mixeffect/remote-webview'),
	}

	actions.appVideoFollowsAudio = {
		label: 'App: Video Follows Audio',
		options: [option.mode()],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/vfa', [{ type: 's', value: options.mode }])
		},
	}

	actions.appViewOnlyMode = {
		label: 'App: View Only Mode',
		callback: () => context.oscSend('/mixeffect/vom'),
	}

	return actions
}

module.exports = {
	appActions,
	appSwitcherSectionChoices,
}
