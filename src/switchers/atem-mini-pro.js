const { model } = require('./types')
const { atemMini } = require('./atem-mini')
const { multiViewerSources } = require('./generators')

const switcher = {
	...atemMini,
	id: model.atemMiniPro,
	label: 'ATEM Mini Pro',
	multiViewers: 1,
	streaming: true,
	recording: true,
}

switcher.videoSources = [...switcher.videoSources, ...multiViewerSources(switcher.multiViewers)]

module.exports = {
	atemMiniPro: switcher,
}
