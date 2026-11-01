const feedback = require('../../test/fixtures/feedback.json')

function largeFeedback(switcher) {
	const data = structuredClone(feedback)
	delete data.legacyAudio
	const copies = (item, count, indexKey) =>
		Array.from({ length: count }, (_, index) => ({
			...structuredClone(item),
			...(indexKey ? { [indexKey]: index } : {}),
		}))
	data.sources = copies(data.sources[0], switcher.videoSources.length)
	data.fairlight.sources = copies(data.fairlight.sources[0], switcher.audioSources.length)
	data.dsk = copies(data.dsk[0], switcher.downstreamKeyers, 'index')
	data.me[0].usk = copies(data.me[0].usk[0], switcher.upstreamKeyers, 'index')
	data.me = copies(data.me[0], switcher.mixEffectBuses, 'index')
	data.superSource.ssrc[0].boxes = copies(data.superSource.ssrc[0].boxes[0], 4, 'boxId')
	data.superSource.ssrc = copies(data.superSource.ssrc[0], switcher.superSources, 'index')
	data.aux = copies(data.aux[0], switcher.auxBuses, 'index')
	data.multiview = copies(data.multiview[0], switcher.multiViewers, 'index')
	data.mediaPool.stills = copies(data.mediaPool.stills[0], switcher.mediaStills, 'index')
	data.mediaPool.mp = copies(data.mediaPool.mp[0], switcher.mediaPlayers, 'index')
	data.macros.macros = copies(data.macros.macros[0], switcher.macros, 'index')
	return data
}

module.exports = { largeFeedback }
