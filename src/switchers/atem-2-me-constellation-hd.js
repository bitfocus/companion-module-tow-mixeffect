const { model, audioSource } = require('./types')
const generator = require('./generators')

const switcher = {
	id: model.atem2meConstellationHd,
	label: 'ATEM 2 M/E Constellation HD',
	mixEffectBuses: 2,
	auxBuses: 12,
	inputs: 20,
	multiViewers: 2,
	advancedMultiViewer: true,
	upstreamKeyers: 8,
	downstreamKeyers: 2,
	superSources: 1,
	superSourceArtBorder: false,
	macros: 100,
	mediaPlayers: 2,
	mediaStills: 60,
	mediaClips: 2,
	streaming: false,
	recording: false,
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
	...generator.programSources(switcher.mixEffectBuses),
	...generator.previewSources(switcher.mixEffectBuses),
]

switcher.audioSources = [
	...generator.sdiSources(switcher.inputs),
	...generator.trsSources(2),
	...generator.mediaPlayerAudioSources(switcher.mediaPlayers),
]

module.exports = {
	atem2meConstellationHd: switcher,
}
