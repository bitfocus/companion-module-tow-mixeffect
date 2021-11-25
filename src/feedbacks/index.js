const internal = require('./internalFeedbacks')

const aux = require('./auxFeedbacks')
const colorGenerator = require('./colorGeneratorFeedbacks')
const dsk = require('./dskFeedbacks')
// const fairlight = require('./fairlightFeedbacks')
// const macro = require('./macroFeedbacks')
// const mediaPool = require('./mediaPoolFeedbacks')
// const me = require('./meFeedbacks')
// const multiViewer = require('./multiViewerFeedbacks')
const output = require('./outputFeedbacks')
// const source = require('./sourceFeedbacks')
// const superSource = require('./superSourceFeedbacks')

module.exports = {
	initFeedbacks() {
		this.setFeedbackDefinitions({
			...internal.getFeedbacks({ context: this }),
			...aux.getFeedbacks({ context: this }),
			...colorGenerator.getFeedbacks({ context: this }),
			...dsk.getFeedbacks({ context: this }),
			// ...fairlight.getFeedbacks({ context: this }),
			// ...macro.getFeedbacks({ context: this }),
			// ...mediaPool.getFeedbacks({ context: this }),
			// ...me.getFeedbacks({ context: this }),
			// ...multiViewer.getFeedbacks({ context: this }),
			...output.getFeedbacks({ context: this }),
			// ...source.getFeedbacks({ context: this }),
			// ...superSource.getFeedbacks({ context: this }),
		})
	},
}
