const { option } = require('./utils')

const mediaPlayerActions = ({ context }) => {
	const actions = {}

	actions.selectMediaPlayer = {
		label: 'Media Player: Select Media Player',
		options: [option.mediaPlayer(context, false)],
		callback: ({ options }) => {
			context.updateVariable('media_player', options.mediaPlayer)
		},
	}

	actions.mediaPlayerClip = {
		label: 'Media Player: Clip',
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
			context.oscSend('/mixeffect/mp/clip', [
				{ type: 'i', value: parseInt(options.clipIndex) },
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	actions.mediaPlayerClipCycle = {
		label: 'Media Player: Clip Cycle',
		options: [option.mediaPlayer(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/mp/clip/cycle', [
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	actions.mediaPlayerClipCycleReverse = {
		label: 'Media Player: Clip Reverse',
		options: [option.mediaPlayer(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/mp/clip/cycle-reverse', [
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	actions.mediaPlayerStill = {
		label: 'Media Player: Still',
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
			context.oscSend('/mixeffect/mp/still', [
				{ type: 'i', value: parseInt(options.still) },
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	actions.mediaPlayerStillCycle = {
		label: 'Media Player: Still Cycle',
		options: [option.mediaPlayer(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/mp/still/cycle', [
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	actions.mediaPlayerStillCycleReverse = {
		label: 'Media Player: Still Reverse',
		options: [option.mediaPlayer(context)],
		callback: ({ options }) => {
			context.oscSend('/mixeffect/mp/still/cycle-reverse', [
				{ type: 'i', value: context.selectedOrValue('media_player', options.mediaPlayer) },
			])
		},
	}

	return actions
}

module.exports = {
	mediaPlayerActions,
}
