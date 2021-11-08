const { model } = require('./types')
const { atemMiniExtreme } = require('./atem-mini-extreme')

const switcher = {
	...atemMiniExtreme,
	id: model.atemMiniExtremeIso,
	label: 'ATEM Mini Extreme ISO',
	recordISO: true,
	// superSourceArtBorder: true,
}

module.exports = {
	atemMiniExtremeIso: switcher,
}
