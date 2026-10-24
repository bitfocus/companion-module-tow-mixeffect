const { model } = require('./types')
const { atemMiniExtremeIso } = require('./atem-mini-extreme-iso')

const switcher = {
	...atemMiniExtremeIso,
	id: model.atemSdiExtremeIso,
	label: 'ATEM SDI Extreme ISO',
	auxBuses: 5,
}

module.exports = {
	atemSdiExtremeIso: switcher,
}
