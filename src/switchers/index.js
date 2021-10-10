const { atemProductionStudio4k } = require('./atem-production-studio-4k')

const { atem1meProductionStudio4k } = require('./atem-1-me-production-studio-4k')
const { atem2meProductionStudio4k } = require('./atem-2-me-production-studio-4k')

const { atemTelevisionStudioHD } = require('./atem-television-studio-hd')
const { atemTelevisionStudioProHD } = require('./atem-television-studio-pro-hd')
const { atemTelevisionStudioPro4k } = require('./atem-television-studio-pro-4k')

const { atemConstallation8k } = require('./atem-constallation-8k')

const { atemMini } = require('./atem-mini')
const { atemMiniPro } = require('./atem-mini-pro')
const { atemMiniProIso } = require('./atem-mini-pro-iso')
const { atemMiniExtreme } = require('./atem-mini-extreme')
const { atemMiniExtremeIso } = require('./atem-mini-extreme-iso')

module.exports = [
	atemProductionStudio4k,

	atem1meProductionStudio4k,
	atem2meProductionStudio4k,

	atemTelevisionStudioHD,
	atemTelevisionStudioProHD,
	atemTelevisionStudioPro4k,

	atemConstallation8k,

	atemMini,
	atemMiniPro,
	atemMiniProIso,
	atemMiniExtreme,
	atemMiniExtremeIso,
]
