module.exports = {
	initConstants() {
		Object.defineProperty(this, 'DEFAULT_IP', {
			value: '192.168.1.100',
			enumerable: true,
		})
		Object.defineProperty(this, 'DEFAULT_PORT', {
			value: '49990',
			enumerable: true,
		})
		Object.defineProperty(this, 'STANDARD', {
			value: 'standard',
			enumerable: true,
		})
		Object.defineProperty(this, 'ADVANCED', {
			value: 'advanced',
			enumerable: true,
		})
		Object.defineProperty(this, 'CLASSIC', {
			value: 'classicAudio',
			enumerable: true,
		})
		Object.defineProperty(this, 'FAIRLIGHT', {
			value: 'fairlightAudio',
			enumerable: true,
		})
	},
}
