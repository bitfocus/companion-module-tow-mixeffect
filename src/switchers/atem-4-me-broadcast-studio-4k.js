const { model, audioSource } = require('./types')
const generator = require('./generators')

const switcher = {
	id: model.atem4meBroadcastStudio4k,
	label: 'ATEM 4 M/E Broadcast Studio 4K',
	mixEffectBuses: 4,
	auxBuses: 6,
	inputs: 20,
	multiViewers: 2,
	advancedMultiViewer: false,
	upstreamKeyers: 4,
	downstreamKeyers: 2,
	superSources: 1,
	superSourceArtBorder: true,
	macros: 100,
	mediaPlayers: 4,
	mediaStills: 64,
	mediaClips: 2,
	streaming: false,
	recording: false,
	recordISO: false,
	stinger: true,
	advancedChromaKeyer: false,
	fairlightAudio: false,
}

switcher.videoSources = [
	...generator.blackSources({ me: switcher.mixEffectBuses }),
	...generator.videoSources(switcher.inputs, { me: switcher.mixEffectBuses }),
	...generator.colorBarsSources({ me: switcher.mixEffectBuses }),
	...generator.colorSources(2, { me: switcher.mixEffectBuses }),
	...generator.mediaPlayerSources(switcher.mediaPlayers, { me: switcher.mixEffectBuses }),
	...generator.upstreamKeyMaskSources(switcher.upstreamKeyers),
	...generator.downstreamKeyMaskSources(switcher.downstreamKeyers),
	...generator.superSourceSources(switcher.superSources, { me: switcher.mixEffectBuses }),
	...generator.cleanFeedSources(switcher.mixEffectBuses),
	...generator.auxiliarySources(switcher.auxBuses),
	...generator.programSources(switcher.mixEffectBuses),
	...generator.previewSources(switcher.mixEffectBuses),
]

switcher.audioSources = [
	...generator.sdiSources(switcher.inputs),
	...generator.micSources(1, audioSource.ts),
	...generator.xlrSources(2),
	...generator.rcaSources(2),
	...generator.mediaPlayerAudioSources(switcher.mediaPlayers),
]

module.exports = {
	atem4meBroadcastStudio4k: switcher,
}
