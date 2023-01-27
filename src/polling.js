const fetch = require('node-fetch')

module.exports = {
	getUrl() {
		return `http://${this.config.ip}:${this.config.httpServerPort}/feedback`
	},

	getRequestOptions() {
		return {
			method: 'GET',
			timeout: 10000,
		}
	},

	initPolling() {
		if (this.data.interval) {
			clearInterval(this.data.interval)
		}
		if (!this.config.feedbackPolling) {
			return
		}
		if (this.config.ip && this.config.httpServerPort && this.config.pollingInterval) {
			this.data.interval = setInterval(async () => {
				try {
					const response = await fetch(this.getUrl(), this.getRequestOptions())
					if (!response.ok) {
						this.log('error', `HTTP GET Request failed (${response.status})`)
						this.updateStatus('connection_failure', response.status)
						return
					}
					this.updateVariables(await response.json())
					this.updateStatus('ok')
				} catch (err) {
					this.log('error', `HTTP GET Request failed (${String(err)})`)
					this.updateStatus('connection_failure', String(err))
					return
				}
			}, this.config.pollingInterval)
		}
	},
}
