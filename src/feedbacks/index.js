const { SELECTED_ID } = require('../actions/utils')
const internal = require('./internalFeedbacks')

const aux = require('./auxFeedbacks')
const colorGenerator = require('./colorGeneratorFeedbacks')
const dsk = require('./dskFeedbacks')
const fairlight = require('./fairlightFeedbacks')
// const macro = require('./macroFeedbacks')
// const mediaPool = require('./mediaPoolFeedbacks')
const me = require('./meFeedbacks')
// const multiViewer = require('./multiViewerFeedbacks')
const output = require('./outputFeedbacks')
// const source = require('./sourceFeedbacks')
const superSource = require('./superSourceFeedbacks')
const transition = require('./transitionFeedbacks')
const upstreamKeyer = require('./upstreamKeyerFeedbacks')

module.exports = {
	initFeedbacks() {
		const definitions = {
			...internal.getFeedbacks({ context: this }),
			...aux.getFeedbacks({ context: this }),
			...colorGenerator.getFeedbacks({ context: this }),
			...dsk.getFeedbacks({ context: this }),
			...fairlight.getFeedbacks({ context: this }),
			// ...macro.getFeedbacks({ context: this }),
			// ...mediaPool.getFeedbacks({ context: this }),
			...me.getFeedbacks({ context: this }),
			// ...multiViewer.getFeedbacks({ context: this }),
			...output.getFeedbacks({ context: this }),
			// ...source.getFeedbacks({ context: this }),
			...superSource.getFeedbacks({ context: this }),
			...transition.getFeedbacks({ context: this }),
			...upstreamKeyer.getFeedbacks({ context: this }),
		}

		const selectionVariables = {
			auxBus: 'aux_bus',
			colorGenerator: 'color_generator',
			dsk: 'dsk',
			mixEffectBus: 'mix_effect_bus',
			usk: 'usk',
			superSource: 'supersource',
			box: 'box',
		}
		this.feedbackIds = new Set(Object.keys(definitions))
		this.selectionFeedbackIds = new Map()
		for (const [feedbackId, definition] of Object.entries(definitions)) {
			for (const option of definition.options) {
				const variableId = selectionVariables[option.id]
				if (!variableId || !option.choices?.some(({ id }) => id === SELECTED_ID)) continue
				if (!this.selectionFeedbackIds.has(variableId)) this.selectionFeedbackIds.set(variableId, new Set())
				this.selectionFeedbackIds.get(variableId).add(feedbackId)
			}
		}
		this.setFeedbackDefinitions(definitions)
	},
}
