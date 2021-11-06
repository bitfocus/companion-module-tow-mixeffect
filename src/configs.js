const switchers = require('./switchers')
const { model } = require('./switchers/types')

module.exports = {
	config_fields() {
		return [
			{
				type: 'text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: 'This module allows you to control a MixEffect instance.',
			},
			{
				type: 'textinput',
				id: 'ip',
				label: 'Target IP',
				width: 6,
				regex: this.REGEX_IP,
				default: this.DEFAULT_IP,
				required: true,
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target Port',
				width: 6,
				regex: this.REGEX_PORT,
				default: this.DEFAULT_PORT,
				required: true,
			},
			{
				type: 'text',
				id: 'notice',
				width: 12,
				label: '',
				value: `<span style="color: #ff0000">
							<h5>&#60;&#60;&#60; IMPORTANT NOTICE &#62;&#62;&#62;</h5>
							Choosing the model of ATEM switcher below will update the actions and feedbacks
							available in this module to match the features supported by the select switcher.
						</span>`,
			},
			{
				type: 'dropdown',
				label: 'Model',
				id: 'model',
				default: model.atemMiniExtremeIso,
				choices: switchers.map(({ id, label }) => ({ id, label })),
			},
		]
	},
}
