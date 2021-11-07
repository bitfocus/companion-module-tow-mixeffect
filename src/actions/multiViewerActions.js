const { generateChoices, option } = require('./utils')
const { availability } = require('../switchers/types')

const multiViewerActions = ({ context }) => {
	const actions = {}

	actions.multiViewerSelect = {
		label: 'MultiViewer: Select',
		options: [option.multiViewers(context, false)],
		callback: ({ options }) => {
			context.updateVariable('multiviewer', options.multiViewer)
		},
	}

	if (!context.switcher.advancedMultiViewer) {
		actions.multiViewerLayoutSet = {
			label: 'MultiViewer: Layout Set',
			options: [
				{
					type: 'dropdown',
					label: 'Layout',
					id: 'layout',
					choices: [
						{ id: 4, label: 'Program Bottom' },
						{ id: 6, label: 'Program Right' },
						{ id: 11, label: 'Program Left' },
						{ id: 13, label: 'Program Top' },
					],
					default: 4,
				},
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/multiview/layout', [{ type: 'i', value: options.layout }])
			},
		}
	}

	if (context.switcher.advancedMultiViewer) {
		actions.multiViewerAdvancedLayoutSet = {
			label: 'MultiViewer: Advanced Layout Set',
			options: [
				{
					type: 'dropdown',
					label: 'Layout',
					id: 'layout',
					choices: [
						{ id: 1, label: 'Default' },
						{ id: 2, label: 'Top Left Small' },
						{ id: 3, label: 'Top Right Small' },
						{ id: 4, label: 'Program Bottom' },
						{ id: 5, label: 'Bottom Left Small' },
						{ id: 6, label: 'Program Right' },
						{ id: 7, label: 'Top Right Small Bottom Left Small' },
						{ id: 8, label: 'Bottom Right Program' },
						{ id: 9, label: 'Bottom Right Small' },
						{ id: 10, label: 'Top Left Small Bottom Right Small' },
						{ id: 11, label: 'Program Left' },
						{ id: 12, label: 'Bottom Left Program' },
						{ id: 13, label: 'Program Top' },
						{ id: 14, label: 'Top Right Program' },
						{ id: 15, label: 'Top Left Program' },
						{ id: 16, label: 'All Small' },
					],
					default: 1,
				},
				option.multiViewers(context, true),
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/multiview/layout-advanced', [
					{ type: 'i', value: options.layout },
					{ type: 'i', value: context.selectedOrValue('multiviewer', options.multiViewer) },
				])
			},
		}

		actions.multiViewerWindowSet = {
			label: 'MultiViewer: Window Set',
			options: [
				{
					type: 'dropdown',
					label: 'Window',
					id: 'window',
					choices: generateChoices({
						label: 'Window',
						count: 16,
						selected: false,
					}),
					default: 1,
				},
				{
					type: 'dropdown',
					label: 'Video Source',
					id: 'videoSource',
					default: 0,
					minChoicesForSearch: 0,
					choices: context.switcher.videoSources
						.filter((item) => item.availability.source & availability.source.multiViewer)
						.map(({ id, label }) => ({ id, label })),
				},
				option.multiViewers(context, true),
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/multiview/window', [
					{ type: 'i', value: options.window },
					{ type: 'i', value: options.videoSource },
					{ type: 'i', value: context.selectedOrValue('multiviewer', options.multiViewer) },
				])
			},
		}
	}

	return actions
}

module.exports = {
	multiViewerActions,
}
