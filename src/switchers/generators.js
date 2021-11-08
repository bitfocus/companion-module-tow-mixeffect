const { arrayOf } = require('../utils')
const { videoSource, videoSourceId, audioSource, audioSourceId, availability } = require('./types')

const meAvailability = (mixEffectBuses = 1) => {
	switch (mixEffectBuses) {
		case 1:
			return availability.me.me1
		case 2:
			return availability.me.me1 | availability.me.me2
		case 3:
			return availability.me.me1 | availability.me.me2 | availability.me.me3
		case 4:
			return availability.me.all
		default:
			return availability.me.none
	}
}

const blackSources = (options = { me: 1 }) => [
	{
		id: videoSourceId.black,
		label: 'Black',
		short: 'BLK',
		type: videoSource.black,
		availability: {
			source: availability.source.all,
			me: meAvailability(options.me),
		},
	},
]

const colorBarsSources = (options = { me: 1 }) => [
	{
		id: videoSourceId.colorBars,
		label: 'Color Bars',
		short: 'BARS',
		type: videoSource.colorBars,
		availability: {
			source: availability.source.all,
			me: meAvailability(options.me),
		},
	},
]

const videoSources = (count, options = { me: 1 }) =>
	arrayOf(count, 1).map((id) => ({
		id,
		label: `Input ${id}`,
		short: `IN${id}`,
		type: videoSource.external,
		availability: {
			source: availability.source.all,
			me: meAvailability(options.me),
		},
	}))

const colorSources = (count, options = { me: 1 }) =>
	arrayOf(count, 0).map((id) => ({
		id: videoSourceId.colorGenerator + id,
		label: `Color ${id + 1}`,
		short: `COL${id + 1}`,
		type: videoSource.colorGenerator,
		availability: {
			source:
				availability.source.auxiliary |
				availability.source.multiViewer |
				availability.source.superSourceArt |
				availability.source.superSourceBox,
			me: meAvailability(options.me),
		},
	}))

const mediaPlayerSources = (count, options = { me: 1 }) =>
	arrayOf(count, 0).flatMap((id) => [
		{
			id: videoSourceId.mediaPlayerFill + id * 10,
			index: id + 1,
			label: `Media Player ${id + 1}`,
			short: `MP${id + 1}`,
			type: videoSource.mediaPlayerFill,
			availability: {
				source: availability.source.all,
				me: meAvailability(options.me),
			},
		},
		{
			id: videoSourceId.mediaPlayerKey + id * 10,
			index: id + 1,
			label: `Media Player ${id + 1} Key`,
			short: `MP${id + 1}K`,
			type: videoSource.mediaPlayerKey,
			availability: {
				source: availability.source.all,
				me: meAvailability(options.me),
			},
		},
	])

const upstreamKeyMaskSources = (count) =>
	arrayOf(count, 0).map((id) => ({
		id: videoSourceId.keyMask + id * 10,
		index: id + 1,
		label: `Key ${id + 1} Mask`,
		short: `USK${id + 1}`,
		type: videoSource.mask,
		availability: {
			source: availability.source.auxiliary | availability.source.multiViewer,
			me: availability.me.none,
		},
	}))

const downstreamKeyMaskSources = (count) =>
	arrayOf(count, 0).map((id) => ({
		id: videoSourceId.downstreamKeyMask + id * 10,
		index: id + 1,
		label: `DSK ${id + 1} Mask`,
		short: `DSK${id + 1}`,
		type: videoSource.mask,
		availability: {
			source: availability.source.auxiliary | availability.source.multiViewer,
			me: availability.me.none,
		},
	}))

const superSourceSources = (count, options = { me: 1 }) =>
	arrayOf(count, 0).map((id) => ({
		id: videoSourceId.superSource + id,
		index: id + 1,
		label: `SuperSource ${count === 1 ? '' : id + 1}`.trim(),
		short: `SSRC${count === 1 ? '' : id + 1}`,
		type: videoSource.superSource,
		availability: {
			source:
				availability.source.auxiliary |
				availability.source.keySource |
				availability.source.multiViewer |
				availability.source.superSourceBox,
			me: meAvailability(options.me),
		},
	}))

const cleanFeedSources = (count) =>
	arrayOf(count, 0).map((id) => ({
		id: videoSourceId.cleanFeed + id,
		label: `Clean Feed ${count === 1 ? '' : id + 1}`.trim(),
		short: `CFD${count === 1 ? '' : id + 1}`,
		type: videoSource.meOutput,
		availability: {
			source: availability.source.auxiliary | availability.source.multiViewer,
			me: availability.me.none,
		},
	}))

const auxiliarySources = (count) =>
	arrayOf(count, 0).map((id) => ({
		id: videoSourceId.auxiliary + id,
		index: id + 1,
		label: `Auxiliary ${count === 1 ? '' : id + 1}`.trim(),
		short: `AUX${count === 1 ? '' : id + 1}`,
		type: videoSource.auxiliary,
		availability: {
			source: availability.source.multiViewer,
			me: availability.me.none,
		},
	}))

const programSources = (count) =>
	arrayOf(count, 0).map((id) => ({
		id: videoSourceId.program + id * 10,
		label: `Program ${count === 1 ? '' : id + 1}`.trim(),
		short: `PGM${count === 1 ? '' : id + 1}`,
		type: videoSource.meOutput,
		availability: {
			source:
				id === 0
					? availability.source.multiViewer | availability.source.auxiliary
					: availability.source.multiViewer | availability.source.auxiliary | availability.source.superSourceBox,
			me: meAvailability(id),
		},
	}))

const previewSources = (count) =>
	arrayOf(count, 0).map((id) => ({
		id: videoSourceId.preview + id * 10,
		label: `Preview ${count === 1 ? '' : id + 1}`.trim(),
		short: `PVW${count === 1 ? '' : id + 1}`,
		type: videoSource.meOutput,
		availability: {
			source:
				id === 0
					? availability.source.multiViewer | availability.source.auxiliary
					: availability.source.multiViewer | availability.source.auxiliary | availability.source.superSourceBox,
			me: meAvailability(id),
		},
	}))

const inputDirectSources = (count) =>
	arrayOf(count).map((id) => ({
		id: videoSourceId.inputDirect + id,
		label: `Input ${id + 1} Direct`,
		short: `DIR${id + 1}`,
		type: videoSource.externalDirect,
		availability: {
			source: availability.source.auxiliary,
			me: availability.me.none,
		},
	}))

const multiViewerSources = (count) =>
	arrayOf(count).map((id) => ({
		id: videoSourceId.multiViewer + id,
		label: `MultiViewer ${count === 1 ? '' : id + 1}`.trim(),
		short: `MVW${count === 1 ? '' : id + 1}`,
		type: videoSource.multiViewer,
		availability: {
			source: availability.source.auxiliary,
			me: availability.me.none,
		},
	}))

const sdiSources = (count, start = 1) =>
	arrayOf(count, start).map((id) => ({
		id,
		label: `SDI ${id}`,
		short: `SDI${id}`,
		type: audioSource.sdi,
		frameDelay: false,
	}))

const hdmiSources = (count, start = 1) =>
	arrayOf(count, start).map((id) => ({
		id,
		label: `HDMI ${id}`,
		short: `HDMI${id}`,
		type: audioSource.hdmi,
		frameDelay: false,
	}))

const xlrSources = (count) =>
	arrayOf(count).map((id) => ({
		id: audioSourceId.xlr + id,
		label: `XLR ${count === 1 ? '' : id + 1}`.trim(),
		short: `XLR${count === 1 ? '' : id + 1}`,
		type: audioSource.xlr,
		frameDelay: false,
	}))

const aesebuSources = (count) =>
	arrayOf(count).map((id) => ({
		id: audioSourceId.aesebu + id,
		label: `AES/EBU ${count === 1 ? '' : id + 1}`.trim(),
		short: `AESUBU${count === 1 ? '' : id + 1}`,
		type: audioSource.aesebu,
		frameDelay: false,
	}))

const rcaSources = (count) =>
	arrayOf(count).map((id) => ({
		id: audioSourceId.rca + id,
		label: `RCA ${count === 1 ? '' : id + 1}`.trim(),
		short: `RCA${count === 1 ? '' : id + 1}`,
		type: audioSource.rca,
		frameDelay: false,
	}))

const micSources = (count, type = audioSource.ts) =>
	arrayOf(count).map((id) => ({
		id: audioSourceId.mic + id,
		label: `MIC ${count === 1 ? '' : id + 1}`.trim(),
		short: `MIC${count === 1 ? '' : id + 1}`,
		type,
		frameDelay: true,
	}))

const mediaPlayerAudioSources = (count) =>
	arrayOf(count).map((id) => ({
		id: audioSourceId.mp + id,
		label: `Media Player ${count === 1 ? '' : id + 1}`.trim(),
		short: `MP${count === 1 ? '' : id + 1}`,
		type: audioSource.internal,
		frameDelay: false,
	}))

const trsSources = (count) =>
	arrayOf(count).map((id) => ({
		id: audioSourceId.trs + id,
		label: `TRS ${count === 1 ? '' : id + 1}`.trim(),
		short: `TRS${count === 1 ? '' : id + 1}`,
		type: audioSource.trs,
		frameDelay: false,
	}))

const madiSources = (count) =>
	arrayOf(count).map((id) => ({
		id: audioSourceId.madi + id,
		label: `MADI ${count === 1 ? '' : id + 1}`.trim(),
		short: `MADI${count === 1 ? '' : id + 1}`,
		type: audioSource.madi,
		frameDelay: false,
	}))

module.exports = {
	meAvailability,
	// Video Sources
	blackSources,
	videoSources,
	colorBarsSources,
	colorSources,
	mediaPlayerSources,
	upstreamKeyMaskSources,
	downstreamKeyMaskSources,
	superSourceSources,
	cleanFeedSources,
	auxiliarySources,
	programSources,
	previewSources,
	inputDirectSources,
	multiViewerSources,

	// Audio Sources
	sdiSources,
	hdmiSources,
	xlrSources,
	aesebuSources,
	rcaSources,
	micSources,
	mediaPlayerAudioSources,
	trsSources,
	madiSources,
}
