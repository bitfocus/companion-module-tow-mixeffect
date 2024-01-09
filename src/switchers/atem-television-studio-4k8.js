const { model, audioSource } = require('./types')
const generator = require('./generators')

const switcher = {
	id: model.atemTelevisionStudio4k8,
	label: 'ATEM Television Studio 4K8',
	mixEffectBuses: 1,
	auxBuses: 10,
	inputs: 8,
	multiViewers: 1,
	advancedMultiViewer: true,
	upstreamKeyers: 4,
	downstreamKeyers: 2,
	superSources: 1,
	superSourceArtBorder: false,
	macros: 100,
	mediaPlayers: 2,
	mediaStills: 20,
	mediaClips: 2,
	streaming: true,
	recording: true,
	recordISO: false,
	stinger: true,
	advancedChromaKeyer: true,
	fairlightAudio: true,
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
	...generator.multiViewerSources(switcher.multiViewers),
	...generator.programSources(switcher.mixEffectBuses),
	...generator.previewSources(switcher.mixEffectBuses),
]

switcher.audioSources = [
	...generator.sdiSources(switcher.inputs),
	...generator.micSources(1, audioSource.ts),
	...generator.trsSources(2),
	...generator.madiSources(32),
	...generator.rcaSources(1),
	...generator.mediaPlayerAudioSources(switcher.mediaPlayers),
]

module.exports = {
	atemTelevisionStudio4k8: switcher,
}
