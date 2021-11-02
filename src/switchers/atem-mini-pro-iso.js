const { model } = require('./types')
const { atemMini } = require('./atem-mini')

const switcher = {
	...atemMini,
	id: model.atemMiniProIso,
	label: 'ATEM Mini Pro ISO',
	recordISO: true,
}

module.exports = {
	atemMiniProIso: switcher,
}
