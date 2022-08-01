module.exports = {
	getUrl() {
		return `http://${this.config.ip}:8080/feedback`
	},

	initPolling() {
		if (this.data.interval) {
			clearInterval(this.data.interval)
		}
		if (this.config.ip) {
			this.data.interval = setInterval(() => {
				this.system.emit('rest_get', this.getUrl(), (err, result) => {
					if (err !== null) {
						this.log('error', `HTTP GET Request failed (${result.error.code})`)
						this.status(this.STATUS_ERROR, result.error.code)
						return
					}
					if (
						result.response.statusCode === 200 &&
						result.response.headers['content-type'] === 'application/json' &&
						result.response.headers['content-length'] > 0
					) {
						this.updateVariables(result.data)
						this.status(this.STATUS_OK)
					}
				})
			}, 500)
		}
	},
}
