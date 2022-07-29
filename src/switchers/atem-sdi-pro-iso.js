const { model } = require('./types')
const { atemMiniProIso } = require('./atem-mini-pro-iso')

const switcher = {
	...atemMiniProIso,
	id: model.atemSdiProIso,
	label: 'ATEM SDI Pro ISO',
	auxBuses: 2,
}

module.exports = {
	atemSdiProIso: switcher,
}
