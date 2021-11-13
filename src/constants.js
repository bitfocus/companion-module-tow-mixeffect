module.exports = {
	initConstants() {
		this.defineConst('DEFAULT_IP', '192.168.1.100')
		this.defineConst('DEFAULT_PORT', 49990)
		this.defineConst('DEFAULT_PORT', 49990)
		this.defineConst('DEFAULT_FEEDBACK_PORT', 49991)
		this.defineConst('DEFAULT_FEEDBACK_INTERVAL', 200)

		this.defineConst('MIN_PORT', 1024)
		this.defineConst('MAX_PORT', 65535)

		this.defineConst('MIN_INTERVAL', 200)
		this.defineConst('MAX_INTERVAL', 5000)

		this.defineConst('STANDARD', 'standard')
		this.defineConst('ADVANCED', 'advanced')

		this.defineConst('CLASSIC', 'classicAudio')
		this.defineConst('FAIRLIGHT', 'fairlightAudio')
	},
}
