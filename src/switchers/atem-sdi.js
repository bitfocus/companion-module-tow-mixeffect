const { model } = require('./types')
const { atemMini } = require('./atem-mini')

const switcher = {
	...atemMini,
	id: model.atemSdi,
	label: 'ATEM SDI',
	auxBuses: 2,
}

module.exports = {
	atemSdi: switcher,
}
