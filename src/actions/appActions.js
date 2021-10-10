const { option } = require('./utils')

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
}
