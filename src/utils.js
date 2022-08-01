const arrayOf = (count, start = 0, step = 1) => {
	const array = []
	for (let index = start; count > 0; count--, index += step) {
		array.push(index)
	}
	return array
}

const generateChoices = ({ label, base, count }) => arrayOf(count, base).map((n) => ({ id: n, label: `${label} ${n}` }))

module.exports = {
	arrayOf,
	generateChoices,
}
