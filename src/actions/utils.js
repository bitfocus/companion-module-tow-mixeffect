const { arrayOf } = require('../utils')

const inputChoices = arrayOf(40).map((n) => ({ id: n + 1, label: `Input ${n + 1}` }))

const growChoices = arrayOf(21).map((n) => {
	const factor = n * 0.025
	if (n === 0) {
		return { id: '0.000', label: "Don't Change" }
	}
	return { id: factor.toPrecision(4), label: `${(factor + 1).toPrecision(4)}x` }
})

const shrinkChoices = arrayOf(21).map((n) => {
	const factor = n * 0.025
	if (n === 0) {
		return { id: '0.000', label: "Don't Change" }
	}
	return { id: factor.toPrecision(4), label: `${(1 - factor).toPrecision(4)}x` }
})

const generateChoices = ({ label, count = 1, base = 1, selected = true, numberAll = false }) => {
	const choices = arrayOf(count, base).map((id) => ({
		id,
		label: numberAll ? `${label} ${id}` : `${label} ${count > 1 ? id : ''}`.trim(),
	}))

	if (selected && count > 1) {
		choices.push({ id: 0, label: `Selected ${label}` })
	}

	return choices
}

const value = (
	{ label = 'Value', id = 'value', min = 0, max = 100, step = 0.01, defaultValue = 0, range = true } = {
		label: 'Value',
		id: 'value',
		min: 0,
		max: 100,
		step: 0.01,
		defaultValue: 0,
		range: true,
	}
) => ({
	type: 'number',
	label,
	id,
	min,
	max,
	step,
	default: defaultValue,
	range,
})

const list = ({ label = 'Item', id = 'item', list = [], base = 0 }) => ({
	type: 'dropdown',
	label,
	id,
	choices: list.map((label, index) => ({ id: base + index, label })),
	default: base,
	minChoicesForSearch: 0,
})

const percent = ({ label, id, step = 0.1 }) => value({ label, id, step })
const angle = ({ label, id, step = 0.1, max = 359.9 }) => value({ label, id, step, max })

const option = {
	value,
	list,

	percent,
	angle,

	yesNo: ({ label, id }) => list({ label, id, list: ['No', 'Yes'] }),
	onOff: ({ label, id }) => list({ label, id, list: ['Off', 'On'] }),

	mode: ({ label = 'Mode', id = 'mode' } = { label: 'Mode', id: 'mode' }) => {
		return list({ label, id, list: ['Off', 'On', 'Toogle'] })
	},

	color: ({ label, id }) => value({ label, id, step: 0.1 }),

	size: (
		{ label = 'Size', id = 'size', max, step = 0.1, range } = {
			label: 'Size',
			id: 'size',
			step: 0.1,
		}
	) => {
		return value({ label, id, max, step, range })
	},

	position: ({ label, id, defaultValue = 0 }) =>
		value({
			label,
			id,
			max: 1,
			step: 0.0001,
			defaultValue,
		}),

	softness: () => value({ label: 'Softness', id: 'softness', step: 0.1 }),

	coordinate: () => ({
		type: 'dropdown',
		label: 'Coordinate',
		id: 'coordinate',
		choices: [
			{ id: 'x', label: 'X' },
			{ id: 'y', label: 'Y' },
		],
		default: 'x',
	}),

	rate: () =>
		value({
			label: 'Rate (1-250 frames)',
			id: 'rate',
			min: 1,
			max: 250,
			default: 30,
		}),

	box: ({ selected = false } = { selected: false }) => ({
		type: 'dropdown',
		label: 'Box',
		id: 'box',
		choices: generateChoices({ label: 'Box ', count: 4, selected }),
		default: 1,
	}),

	clip: () => percent({ label: 'Clip (0-100%)', id: 'clip' }),
	gain: () => percent({ label: 'Gain (0-100%)', id: 'gain' }),

	hue: () => angle({ label: 'Hue (0-359.9°)', id: 'hue' }),
	saturation: () => percent({ label: 'Saturation (0-100%)', id: 'saturation' }),
	luminance: () => percent({ label: 'Luminance (0-100%)', id: 'luminance' }),

	brightness: () => percent({ label: 'Brightness (0-100%)', id: 'brightness' }),
	contrast: () => percent({ label: 'Contrast (0-100%)', id: 'contrast' }),

	rotation: () => angle({ label: 'Rotation (0-359.9°)', id: 'rotation' }),

	symmetry: () => value({ label: 'Symmetry', id: 'symmetry', step: 0.1 }),

	pattern: () =>
		value({
			label: 'Pattern',
			id: 'pattern',
			list: [
				'Left To Right Bar',
				'Top To BottomBar',
				'Horizontal Barn Door',
				'Vertical Barn Door',
				'Corners In Four Box',
				'Rectangle Iris',
				'Diamond Iris',
				'Circle Iris',
				'Top Left Box',
				'Top Right Box',
				'Bottom Right Box',
				'Bottom Left Box',
				'Top Center Box',
				'Right Center Box',
				'Bottom Center Box',
				'Bottom Center Box',
				'Top Left Diagonal',
				'Top Right Diagonal',
			],
		}),

	audioSourceType: () =>
		list({
			label: 'Source Type',
			id: 'audioSourceType',
			list: ['Stereo', 'Left Channel', 'Right Channel'],
		}),

	audioSources: (sources, predicate = () => true) => {
		const choices = sources.filter(predicate).map(({ id, label }) => ({ id, label }))
		return {
			type: 'dropdown',
			label: 'Audio Source',
			id: 'audioSource',
			choices,
			default: choices[0].id,
			minChoicesForSearch: 0,
		}
	},

	videoSources: ({ label = 'Video Source', id = 'videoSource', sources, predicate = () => true }) => {
		const choices = sources.filter(predicate).map(({ id, label }) => ({ id, label }))
		return {
			type: 'dropdown',
			label,
			id,
			choices,
			default: 0,
			minChoicesForSearch: 0,
		}
	},

	colorGenerators: () => ({
		type: 'dropdown',
		label: 'Color Generator',
		id: 'colorGenerator',
		default: 1,
		choices: generateChoices({ label: 'Color Generator', count: 2, selected: false }),
	}),

	dsk: (context, selected = true) => ({
		type: 'dropdown',
		label: 'Downstream Keyer',
		id: 'dsk',
		default: 1,
		choices: generateChoices({ label: 'DSK', count: context.switcher.downstreamKeyers, selected }),
	}),

	usk: (context) => ({
		type: 'dropdown',
		label: 'Upstream Keyer',
		id: 'usk',
		default: 1,
		choices: generateChoices({ label: 'Key', count: context.switcher.upstreamKeyers }),
	}),

	mixEffectBus: (context, numberAll = true) => ({
		type: 'dropdown',
		label: 'Mix Effect Bus',
		id: 'mixEffectBus',
		choices: generateChoices({ label: 'M/E', count: context.switcher.mixEffectBuses, numberAll }),
		default: 1,
	}),

	mediaPlayer: (context, selected = true) => ({
		type: 'dropdown',
		label: 'Media Player',
		id: 'mediaPlayer',
		choices: generateChoices({ label: 'Media Player', count: context.switcher.mediaPlayers, selected }),
		default: 1,
	}),

	superSource: (context, selected = true) => ({
		type: 'dropdown',
		label: 'SuperSource',
		id: 'superSource',
		choices: generateChoices({ label: 'SuperSource', count: context.switcher.superSources, selected, numberAll: true }),
		default: 1,
	}),
}

module.exports = {
	inputChoices,
	growChoices,
	shrinkChoices,
	generateChoices,
	option,
}
