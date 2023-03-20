const { option } = require('./utils')

const mediaPlayerActions = ({ context }) => {
	const actions = {}

	actions.selectMediaPlayer = {
		name: 'Media Player: Select Media Player',
		options: [option.mediaPlayer(context, false)],
		callback: ({ options }) => {
			context.updateVariable('media_player', options.mediaPlayer)
		},
	}

	actions.mediaPlayerClip = {
		name: 'Media Player: Clip',
		options: [
			{
				type: 'number',
				label: 'Clip Index',
				id: 'clipIndex',
				min: 1,
				default: 1,
			},
			option.mediaPlayer(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/mp/clip', [
				{ type: 'i', value: parseInt(options.clipIndex) },
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	actions.mediaPlayerClipCycle = {
		name: 'Media Player: Clip Cycle',
		options: [option.mediaPlayer(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/mp/clip/cycle', [
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	actions.mediaPlayerClipCycleReverse = {
		name: 'Media Player: Clip Reverse',
		options: [option.mediaPlayer(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/mp/clip/cycle-reverse', [
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	actions.mediaPlayerStill = {
		name: 'Media Player: Still',
		options: [
			{
				type: 'number',
				label: 'Still Index',
				id: 'still',
				min: 1,
				default: 1,
			},
			option.mediaPlayer(context),
		],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/mp/still', [
				{ type: 'i', value: parseInt(options.still) },
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	actions.mediaPlayerStillCycle = {
		name: 'Media Player: Still Cycle',
		options: [option.mediaPlayer(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/mp/still/cycle', [
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	actions.mediaPlayerStillCycleReverse = {
		name: 'Media Player: Still Reverse',
		options: [option.mediaPlayer(context)],
		callback: ({ options }) => {
			context.oscSendPath('/mixeffect/mp/still/cycle-reverse', [
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	return actions
}

module.exports = {
	mediaPlayerActions,
}
