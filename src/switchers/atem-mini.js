const { model } = require('./types')
const generator = require('./generators')

const switcher = {
	id: model.atemMini,
	label: 'ATEM Mini',
	mixEffectBuses: 1,
	auxBuses: 1,
	inputs: 4,
	multiViewers: 0,
	advancedMultiViewer: false,
	upstreamKeyers: 1,
	downstreamKeyers: 1,
	superSources: 0,
	macros: 100,
	mediaPlayers: 1,
	mediaStills: 20,
	mediaClips: 0,
	streaming: false,
	recording: false,
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
	...generator.auxiliarySources(switcher.auxBuses),
	...generator.programSources(switcher.mixEffectBuses),
	...generator.previewSources(switcher.mixEffectBuses),
	...generator.inputDirectSources(1),
]

switcher.audioSources = [...generator.hdmiSources(switcher.inputs), ...generator.micSources(2)]

module.exports = {
	atemMini: switcher,
}
