const { model, audioSource, audioSourceId } = require('./types')
const { atem4meConstellation4k } = require('./atem-4-me-constellation-4k')
const generator = require('./generators')

// Capabilities follow Bitfocus's bmd-atem 4 M/E Constellation 4K Plus profile.
const switcher = {
	...atem4meConstellation4k,
	id: model.atem4meConstellation4kPlus,
	label: 'ATEM 4 M/E Constellation 4K Plus',
	inputs: 80,
	auxBuses: 48,
	// Actions and variables address upstream keyers within each M/E.
	upstreamKeyers: 4,
	// Bitfocus's captured device state reports 96; the public spec sheet lists 64.
	mediaStills: 96,
}

switcher.videoSources = [
	...generator.blackSources({ me: switcher.mixEffectBuses }),
	...generator.videoSources(switcher.inputs, { me: switcher.mixEffectBuses }),
	...generator.colorBarsSources({ me: switcher.mixEffectBuses }),
	...generator.colorSources(2, { me: switcher.mixEffectBuses }),
	...generator.mediaPlayerSources(switcher.mediaPlayers, { me: switcher.mixEffectBuses }),
	...generator.upstreamKeyMaskSources(switcher.mixEffectBuses * switcher.upstreamKeyers),
	...generator.downstreamKeyMaskSources(switcher.downstreamKeyers),
	...generator.superSourceSources(switcher.superSources, { me: switcher.mixEffectBuses }),
	...generator.cleanFeedSources(switcher.downstreamKeyers),
	...generator.auxiliarySources(switcher.auxBuses),
	...generator.programSources(switcher.mixEffectBuses),
	...generator.previewSources(switcher.mixEffectBuses),
	...generator.multiViewerSources(switcher.multiViewers),
]

switcher.audioSources = [
	...generator.sdiSources(switcher.inputs),
	...generator.micSources(1, audioSource.ts),
	...generator.trsSources(1, audioSourceId.trs + 1),
	...generator.madiSources(64, audioSourceId.madi + 1),
	...generator.mediaPlayerAudioSources(switcher.mediaPlayers),
]

module.exports = {
	atem4meConstellation4kPlus: switcher,
}
