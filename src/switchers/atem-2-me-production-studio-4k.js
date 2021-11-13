const { model } = require('./types')
const generator = require('./generators')

const switcher = {
	id: model.atem2meProductionStudio4k,
	label: 'ATEM 2 M/E Production Studio 4K',
	mixEffectBuses: 2,
	auxBuses: 6,
	inputs: 20,
	multiViewers: 2,
	advancedMultiViewer: false,
	upstreamKeyers: 4,
	downstreamKeyers: 2,
	superSources: 1,
	superSourceArtBorder: true,
	macros: 100,
	mediaPlayers: 2,
	mediaStills: 32,
	mediaClips: 2,
	streaming: false,
	recording: false,
	recordISO: false,
	stinger: false,
	advancedChromaKeyer: false,
	fairlightAudio: false,
	colorGenerators: 2,
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
	...generator.xlrSources(1),
	...generator.rcaSources(1),
	...generator.mediaPlayerAudioSources(switcher.mediaPlayers),
]

module.exports = {
	atem2meProductionStudio4k: switcher,
}
