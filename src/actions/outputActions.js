const outputActions = ({ context }) => {
	const actions = {}

	const bitrates = [
		{
			label: 'Streaming Low 3 to 4.5 Mb/s',
			id: 1,
			bitrate1: 3000000,
			bitrate2: 4500000,
		},
		{
			label: 'Streaming Medium 4.5 to 7 Mb/s',
			id: 2,
			bitrate1: 4500000,
			bitrate2: 7000000,
		},
		{
			label: 'Streaming High 6 to 9 Mb/s',
			id: 3,
			bitrate1: 6000000,
			bitrate2: 9000000,
		},
		{
			label: 'Custom Bitrates',
			id: 0,
		},
	]

	actions.recordingSetFileName = {
		name: 'Output: Recording Set Filename',
		options: [
			{
				type: 'textinput',
				label: 'Filename',
				id: 'filename',
				default: 'Untitled',
			},
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/recording/filename', [{ type: 's', value: options.filename }])
		},
	}

	actions.recordingStartStop = {
		name: 'Output: Recording Start or Stop',
		options: [
			{
				type: 'dropdown',
				label: 'Mode',
				id: 'mode',
				choices: [
					{ id: 0, label: 'Stop' },
					{ id: 1, label: 'Start' },
					{ id: 2, label: 'Toggle' },
				],
				default: 0,
			},
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/recording/start-stop', [{ type: 'i', value: options.mode }])
		},
	}

	actions.recordingSwitchDisk = {
		name: 'Output: Recording Switch Disk',
		options: [],
		callback: () => context.oscSend('/mixeffect/recording/switch-disk'),
	}

	actions.streamingSetService = {
		name: 'Output: Streaming Set Service',
		options: [
			{
				type: 'textinput',
				label: 'Service Name',
				id: 'name',
				default: 'Default Service',
			},
			{
				type: 'textinput',
				label: 'Streaming Server URL',
				id: 'url',
				default: 'rtmp://default/live',
			},
			{
				type: 'textinput',
				label: 'Streaming Key',
				id: 'key',
				default: 'default-key',
			},
			{
				type: 'dropdown',
				label: 'Quality / BitRate',
				id: 'bitrate',
				choices: bitrates.map(({ id, label }) => ({ id, label })),
				default: 3,
			},
			{
				type: 'number',
				label: 'Custom Bitrate 1',
				id: 'bitrate1',
				default: 0,
				min: 0,
			},
			{
				type: 'number',
				label: 'Custom Bitrate 2',
				id: 'bitrate2',
				default: 0,
				min: 0,
			},
		],
		callback: ({ options }) => {
			let bitrate1 = options.bitrate1
			let bitrate2 = options.bitrate2

			if (options.bitrate > 0) {
				// eslint-disable-next-line no-extra-semi
				;({ bitrate1, bitrate2 } = bitrates.find(({ id }) => id === options.bitrate))
			}

			context.oscSend('/mixeffect/streaming/service', [
				{ type: 's', value: options.name },
				{ type: 's', value: options.url },
				{ type: 's', value: options.key },
				{ type: 'i', value: bitrate1 },
				{ type: 'i', value: bitrate2 },
			])
		},
	}

	actions.streamingStartStop = {
		name: 'Output: Streaming Start or Stop',
		options: [
			{
				type: 'dropdown',
				label: 'Mode',
				id: 'mode',
				choices: [
					{ id: 0, label: 'Stop' },
					{ id: 1, label: 'Start' },
					{ id: 2, label: 'Toggle' },
				],
				default: 0,
			},
		],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/streaming/start-stop', [{ type: 'i', value: options.mode }])
		},
	}

	return actions
}

module.exports = {
	outputActions,
}
