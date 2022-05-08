const { model, audioSource } = require('./types')
const generator = require('./generators')

const switcher = {
	id: model.atem1meProductionStudio4k,
	label: 'ATEM 1 M/E Production Studio 4K',
	mixEffectBuses: 1,
	auxBuses: 3,
	inputs: 10,
	multiViewers: 1,
	advancedMultiViewer: false,
	upstreamKeyers: 4,
	downstreamKeyers: 2,
	superSources: 0,
	macros: 100,
	mediaPlayers: 2,
	mediaStills: 32,
	mediaClips: 2,
	streaming: false,
	recording: false,
	recordISO: false,
	stinger: true,
	advancedChromaKeyer: false,
	fairlightAudio: false,
}

switcher.videoSources = [
	...generator.blackSources(),
	...generator.videoSources(switcher.inputs),
	...generator.colorBarsSources(),
	...generator.colorSources(2),
	...generator.mediaPlayerSources(switcher.mediaPlayers),
	...generator.upstreamKeyMaskSources(switcher.upstreamKeyers),
	...generator.downstreamKeyMaskSources(switcher.downstreamKeyers),
	...generator.cleanFeedSources(switcher.mixEffectBuses),
	...generator.auxiliarySources(switcher.auxBuses),
	...generator.programSources(switcher.mixEffectBuses),
	...generator.previewSources(switcher.mixEffectBuses),
]

switcher.audioSources = [
	...generator.sdiSources(switcher.inputs),
	...generator.micSources(1),
	...generator.xlrSources(1),
	...generator.rcaSources(1),
	...generator.mediaPlayerAudioSources(switcher.mediaPlayers),
]

module.exports = {
	atem1meProductionStudio4k: switcher,
}
