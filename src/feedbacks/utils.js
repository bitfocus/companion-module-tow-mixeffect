const { combineRgb } = require('@companion-module/base')

const generateFeedback = ({ name, callback, options, style = {} }) => ({
	type: 'boolean',
	name,
	defaultStyle: {
		color: combineRgb(255, 255, 255),
		bgcolor: combineRgb(255, 0, 0),
		...style,
	},
	options,
	callback,
})

module.exports = {
	generateFeedback,
}
