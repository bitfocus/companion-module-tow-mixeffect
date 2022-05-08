const { model, audioSource } = require('./types')
const generator = require('./generators')

const switcher = {
	id: model.atem4meConstellationHd,
	label: 'ATEM 4 M/E Constellation HD',
	mixEffectBuses: 4,
	auxBuses: 24,
	inputs: 40,
	multiViewers: 4,
	advancedMultiViewer: true,
	upstreamKeyers: 16,
	downstreamKeyers: 4,
	superSources: 2,
	superSourceArtBorder: false,
	macros: 100,
	mediaPlayers: 4,
	mediaStills: 60,
	mediaClips: 4,
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
	...generator.madiSources(32),
	...generator.mediaPlayerAudioSources(switcher.mediaPlayers),
]

module.exports = {
	atem4meConstellationHd: switcher,
}
