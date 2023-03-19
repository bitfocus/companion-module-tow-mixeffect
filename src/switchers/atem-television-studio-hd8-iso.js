const { model } = require('./types')
const { atemTelevisionStudioHd8 } = require('./atem-television-studio-hd8')

const switcher = {
	...atemTelevisionStudioHd8,
	id: model.atemTelevisionStudioHd8Iso,
	label: 'ATEM Television Studio HD8 ISO',
	recordISO: true,
}

module.exports = {
	atemTelevisionStudioHd8Iso: switcher,
}
