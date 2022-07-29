const { model } = require('./types')
const generator = require('./generators')

const switcher = {
	id: model.atemMiniExtreme,
	label: 'ATEM Mini Extreme',
	mixEffectBuses: 1,
	auxBuses: 2,
	inputs: 8,
	multiViewers: 1,
	advancedMultiViewer: true,
	upstreamKeyers: 4,
	downstreamKeyers: 2,
	superSources: 1,
	macros: 100,
	mediaPlayers: 2,
	mediaStills: 20,
	mediaClips: 0,
	streaming: true,
	recording: true,
	recordISO: false,
	stinger: false,
	advancedChromaKeyer: true,
	fairlightAudio: true,
}

switcher.videoSources = [
	...generator.blackSources({ me: switcher.mixEffectBuses }),
	...generator.videoSources(switcher.inputs, { me: switcher.mixEffectBuses }),
	...generator.colorBarsSources({ me: switcher.mixEffectBuses }),
	...generator.colorSources(2, { me: switcher.mixEffectBuses }),
	...generator.mediaPlayerSources(switcher.mediaPlayers, { me: switcher.mixEffectBuses }),
	...generator.superSourceSources(switcher.superSources, { me: switcher.mixEffectBuses }),
	...generator.cleanFeedSources(switcher.mixEffectBuses),
	...generator.auxiliarySources(switcher.auxBuses),
	...generator.multiViewerSources(switcher.multiViewers),
	...generator.programSources(switcher.mixEffectBuses),
	...generator.previewSources(switcher.mixEffectBuses),
	...generator.inputDirectSources(2),
]

switcher.audioSources = [...generator.hdmiSources(switcher.inputs), ...generator.micSources(2)]

module.exports = {
	atemMiniExtreme: switcher,
}
