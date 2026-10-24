const { model, videoSource, videoSourceId, audioSource, audioSourceId, availability } = require('./types')
const { atemMiniExtremeIso } = require('./atem-mini-extreme-iso')
const generator = require('./generators')

// Capabilities and source IDs follow Bitfocus's bmd-atem Mini Extreme ISO G2 profile.
const switcher = {
	...atemMiniExtremeIso,
	id: model.atemMiniExtremeIsoG2,
	label: 'ATEM Mini Extreme ISO G2',
	// Three HDMI outputs, webcam output, and Thunderbolt output.
	auxBuses: 5,
	mediaClips: 2,
}

switcher.videoSources = [
	...generator.blackSources(),
	...generator.videoSources(8),
	...generator.colorBarsSources(),
	...generator.colorSources(2),
	...generator.mediaPlayerSources(switcher.mediaPlayers),
	...[
		{ id: videoSourceId.thunderbolt, label: 'Thunderbolt', short: 'TB', type: videoSource.mediaPlayerFill },
		{ id: videoSourceId.thunderboltKey, label: 'Thunderbolt Key', short: 'TBK', type: videoSource.mediaPlayerKey },
	].map((source) => ({
		...source,
		availability: { source: availability.source.all, me: availability.me.me1 },
	})),
	...generator.superSourceSources(switcher.superSources),
	...generator.cleanFeedSources(2),
	...generator.auxiliarySources(3),
	...[
		{ id: 8200, label: 'Webcam', short: 'USB' },
		{ id: 8300, label: 'Thunderbolt Output', short: 'TBO' },
	].map((source) => ({
		...source,
		type: videoSource.auxiliary,
		availability: { source: availability.source.multiViewer, me: availability.me.none },
	})),
	...generator.programSources(switcher.mixEffectBuses),
	...generator.previewSources(switcher.mixEffectBuses),
	...generator.multiViewerSources(switcher.multiViewers),
]

switcher.audioSources = [
	...generator.hdmiSources(8),
	...generator.xlrSources(2).map((source) => ({ ...source, frameDelay: true })),
	...generator.madiSources(16, audioSourceId.madi + 1),
	...generator.mediaPlayerAudioSources(switcher.mediaPlayers),
	{
		id: audioSourceId.thunderbolt,
		label: 'Thunderbolt',
		short: 'TB',
		type: audioSource.internal,
		frameDelay: false,
	},
]

module.exports = {
	atemMiniExtremeIsoG2: switcher,
}
