const { model, audioSource } = require('./types')
const generator = require('./generators')

const switcher = {
	id: model.atem1meConstellation4k,
	label: 'ATEM 1 M/E Constellation 4K',
	mixEffectBuses: 1,
	auxBuses: 6,
	inputs: 10,
	multiViewers: 1,
	advancedMultiViewer: true,
	upstreamKeyers: 4,
	downstreamKeyers: 1,
	superSources: 0,
	superSourceArtBorder: false,
	macros: 100,
	mediaPlayers: 2,
	mediaStills: 20,
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
	...generator.cleanFeedSources(switcher.mixEffectBuses),
	...generator.auxiliarySources(switcher.auxBuses),
	...generator.programSources(switcher.mixEffectBuses),
	...generator.previewSources(switcher.mixEffectBuses),
]

switcher.audioSources = [
	...generator.sdiSources(switcher.inputs),
	...generator.micSources(1, audioSource.ts),
	...generator.trsSources(2),
	...generator.mediaPlayerAudioSources(switcher.mediaPlayers),
]

module.exports = {
	atem1meConstellation4k: switcher,
}
