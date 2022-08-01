const generateFeedback = ({ context, label, callback, options, style = {} }) => ({
	type: 'boolean',
	label,
	style: {
		color: context.rgb(255, 255, 255),
		bgcolor: context.rgb(255, 0, 0),
		...style,
	},
	options,
	callback,
})

module.exports = {
	generateFeedback,
}
