const { model } = require('./types')
const { atemMiniPro } = require('./atem-mini-pro')

const switcher = {
	...atemMiniPro,
	id: model.atemMiniProIso,
	label: 'ATEM Mini Pro ISO',
	recordISO: true,
}

module.exports = {
	atemMiniProIso: switcher,
}
