const { model } = require('./types')
const generator = require('./generators')
const { atemTelevisionStudioProHD } = require('./atem-television-studio-pro-hd')

const switcher = {
	...atemTelevisionStudioProHD,
	id: model.atemTelevisionStudioPro4k,
	label: 'ATEM Television Studio Pro 4K',
	mediaClips: 2,
	stinger: true,
	advancedChromaKeyer: true,
	fairlightAudio: true,
}

switcher.audioSources = [
	...generator.sdiSources(switcher.inputs),
	...generator.xlrSources(1),
	...generator.micSources(1),
	...generator.mediaPlayerAudioSources(switcher.mediaPlayers),
]

module.exports = {
	atemTelevisionStudioPro4k: switcher,
}
