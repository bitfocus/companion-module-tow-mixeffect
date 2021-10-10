const { model, videoSource } = require('./types')
const { atemMini } = require('./atem-mini')
const { multiViewerSources } = require('./generators')

const switcher = {
	...atemMini,
	id: model.atemMiniProIso,
	label: 'ATEM Mini Pro ISO',
	recordISO: true,
}

module.exports = {
	atemMiniProIso: switcher,
}
