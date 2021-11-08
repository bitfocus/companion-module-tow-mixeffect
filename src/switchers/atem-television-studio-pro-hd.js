const { model } = require('./types')
const { atemTelevisionStudioHD } = require('./atem-television-studio-hd')

const switcher = {
	...atemTelevisionStudioHD,
	id: model.atemTelevisionStudioProHD,
	label: 'ATEM Television Studio Pro HD',
}

module.exports = {
	atemTelevisionStudioProHD: switcher,
}
