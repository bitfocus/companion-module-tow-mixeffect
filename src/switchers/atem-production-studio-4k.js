const { model } = require('./types')
const generator = require('./generators')

const switcher = {
	id: model.atemProductionStudio4k,
	label: 'ATEM Production Studio 4K',
	mixEffectBuses: 1,
	auxBuses: 1,
	inputs: 8,
	multiViewers: 1,
	advancedMultiViewer: false,
	upstreamKeyers: 1,
	downstreamKeyers: 2,
	superSources: 0,
	macros: 100,
	mediaPlayers: 2,
	mediaStills: 20,
	mediaClips: 0,
	streaming: false,
	recording: false,
	recordISO: false,
	stinger: false,
	advancedChromaKeyer: false,
	fairlightAudio: false,
	colorGenerators: 2,
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
	...generator.hdmiSources(4),
	...generator.sdiSources(4, 5),
	...generator.xlrSources(1),
	...generator.rcaSources(1),
]

module.exports = {
	atemProductionStudio4k: switcher,
}
