module.exports = {
	getUrl() {
		return `http://${this.config.ip}:${this.config.httpServerPort}/feedback`
	},

	getRequestOptions(signal) {
		return {
			method: 'GET',
			signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]),
		}
	},

	stopPolling() {
		if (this.data.interval) clearInterval(this.data.interval)
		this.data.interval = null
		const request = this.data.pollRequest
		this.data.pollRequest = null
		request?.abort()
	},

	initPolling() {
		this.stopPolling()
		if (!this.config.feedbackPolling) return
		if (this.config.ip && this.config.httpServerPort && this.config.pollingInterval) {
			this.data.interval = setInterval(() => this.pollState(), this.config.pollingInterval)
		}
	},

	async pollState() {
		// Slow responses must not overlap or build up a queue of obsolete polls.
		if (this.data.pollRequest) return
		const request = new AbortController()
		this.data.pollRequest = request
		try {
			const response = await fetch(this.getUrl(), this.getRequestOptions(request.signal))
			if (this.data.pollRequest !== request) return
			if (!response.ok) {
				this.log('error', `HTTP GET Request failed (${response.status})`)
				this.updateStatus('connection_failure', response.status)
				return
			}
			const state = await response.json()
			// Reconfiguration/destruction can also happen while the body is loading.
			if (this.data.pollRequest !== request) return
			this.updateState(state)
			this.updateStatus('ok')
		} catch (err) {
			if (this.data.pollRequest !== request) return
			this.log('error', `HTTP GET Request failed (${String(err)})`)
			this.updateStatus('connection_failure', String(err))
		} finally {
			if (this.data.pollRequest === request) this.data.pollRequest = null
		}
	},

	updateState(data) {
		const values = {}
		const update = (variableId, value) => {
			values[variableId] = value
		}

		// dsk
		data?.dsk?.forEach((item) => {
			let dskId = item.index + 1
			for (const [key, value] of Object.entries(item)) {
				update(`dsk_${dskId}_${key}`, value)
			}
		})

		// superSource
		let superSourceInfo = data?.superSource
		if (typeof superSourceInfo !== 'undefined') {
			for (const [key, value] of Object.entries(superSourceInfo)) {
				if (key !== 'ssrc') {
					update(`superSource_${key}`, value)
				} else {
					value?.forEach((superSourceItem) => {
						let superSourceId = superSourceItem.index + 1
						for (const [insideKey, insideValue] of Object.entries(superSourceItem)) {
							if (insideKey === 'art') {
								for (const [artKey, artValue] of Object.entries(insideValue)) {
									update(`superSource_ssrc_${superSourceId}_${insideKey}_${artKey}`, artValue)
								}
							}
							if (insideKey === 'currentPreset') {
								update(`superSource_ssrc_${superSourceId}_${insideKey}`, insideValue)
							}
							if (insideKey === 'boxes') {
								insideValue?.forEach((boxItem) => {
									let boxId = boxItem.boxId + 1
									for (const [artKey, artValue] of Object.entries(boxItem)) {
										update(`superSource_ssrc_${superSourceId}_box_${boxId}_${artKey}`, artValue)
									}
								})
							}
						}
					})
				}
			}
		}

		// output
		let outputInfo = data?.output
		for (const [key, value] of Object.entries(outputInfo ?? {})) {
			update(`output_${key}`, value)
		}

		// fairlight
		let fairlightInfo = data?.fairlight
		if (typeof fairlightInfo !== 'undefined') {
			for (const [key, value] of Object.entries(fairlightInfo)) {
				if (key.match(/^(vfaEnabled|canVfa)$/)) {
					update(`fairlightAudio_${key}`, value)
				}
				if (key.match(/^(solo|master)$/)) {
					for (const [secondKey, secondValue] of Object.entries(value)) {
						if (secondKey.match(/^(limiter|compressor)$/)) {
							for (const [thirdKey, thirdValue] of Object.entries(secondValue)) {
								update(`fairlightAudio_${key}_${secondKey}_${thirdKey}`, thirdValue)
							}
						} else if (secondKey === 'equalizerBands') {
							secondValue?.forEach((bandItem) => {
								let bandId = bandItem.band + 1
								for (const [bandKey, bandValue] of Object.entries(bandItem)) {
									update(`fairlightAudio_${key}_equalizerBand_${bandId}_${bandKey}`, bandValue)
								}
							})
						} else {
							update(`fairlightAudio_${key}_${secondKey}`, secondValue)
						}
					}
				}
				if (key === 'sources') {
					let srcId = 1
					value?.forEach((sourceItem) => {
						for (const [secondKey, secondValue] of Object.entries(sourceItem)) {
							if (secondKey.match(/^(limiter|compressor|expander)$/)) {
								for (const [thirdKey, thirdValue] of Object.entries(secondValue)) {
									update(`fairlightAudio_source_${srcId}_${secondKey}_${thirdKey}`, thirdValue)
								}
							} else if (secondKey === 'equalizerBands') {
								secondValue?.forEach((bandItem) => {
									let bandId = bandItem.band + 1
									for (const [bandKey, bandValue] of Object.entries(bandItem)) {
										update(`fairlightAudio_source_${srcId}_equalizerBand_${bandId}_${bandKey}`, bandValue)
									}
								})
							} else {
								update(`fairlightAudio_source_${srcId}_${secondKey}`, secondValue)
							}
						}
						srcId++
					})
				}
			}
		}

		// legacyAudio
		let legacyAudioInfo = data?.legacyAudio
		if (typeof legacyAudioInfo !== 'undefined') {
			let srcId = 1
			data?.sources?.forEach((legacyAudioItem) => {
				for (const [key, value] of Object.entries(legacyAudioItem)) {
					update(`legacyAudio_source_${srcId}_${key}`, value)
				}
				srcId++
			})
		}

		// sources
		let sourceId = 1
		data?.sources?.forEach((item) => {
			const object = item
			for (const [key, value] of Object.entries(object)) {
				update(`source_${sourceId}_${key}`, value)
			}
			sourceId++
		})

		// colorGenerators
		data?.colorGenerators?.forEach((item) => {
			let cgId = item.index + 1
			for (const [key, value] of Object.entries(item)) {
				update(`colorGenerator_${cgId}_${key}`, value)
			}
		})

		// mediaPool
		let mediaPoolInfo = data?.mediaPool
		for (const [key, value] of Object.entries(mediaPoolInfo ?? {})) {
			if (key.match(/^(clipCapacity|stillCapacity)$/)) {
				update(`mediaPool_${key}`, value)
			}
			if (key === 'stills') {
				value?.forEach((item) => {
					let stillId = item.index + 1
					update(`mediaPool_still_${stillId}_filename`, item.filename)
				})
			}
			if (key === 'mp') {
				value?.forEach((item) => {
					let mpId = item.index + 1
					for (const [secondKey, secondValue] of Object.entries(item)) {
						if (secondKey !== 'index') {
							update(`mediaPool_mp_${mpId}_${secondKey}`, secondValue)
						}
					}
				})
			}
			if (key === 'audioClips') {
				//TODO: audioClips
			}
			if (key === 'clips') {
				//TODO: clips
			}
		}

		// aux
		data?.aux?.forEach((item) => {
			let auxId = item.index + 1
			for (const [key, value] of Object.entries(item)) {
				update(`aux_${auxId}_${key}`, value)
			}
		})

		// multiview
		data?.multiview?.forEach((item) => {
			let multiviewId = item.index + 1
			for (const [key, value] of Object.entries(item)) {
				update(`multiview_${multiviewId}_${key}`, value)
			}
		})

		// me
		data?.me?.forEach((item) => {
			let meId = item.index + 1
			for (const [key, value] of Object.entries(item)) {
				if (key.match(/^(index|inTransition|ftbInTransition|backgroundState|ftb|preview|program)$/)) {
					update(`me_${meId}_${key}`, value)
				}
				if (key.match(/^(transitionDve|transitionDip|transitionMix|transitionSting|transitionWipe|transition)$/)) {
					for (const [insideKey, insideValue] of Object.entries(value)) {
						update(`me_${meId}_${key}_${insideKey}`, insideValue)
					}
				}
				if (key === 'usk') {
					value?.forEach((uskItem) => {
						let uskId = uskItem.index + 1
						for (const [uskKey, uskValue] of Object.entries(uskItem)) {
							if (uskKey.match(/^(chromaAdvanced|dve|pattern|luma)$/)) {
								for (const [insideKey, insideValue] of Object.entries(uskValue)) {
									update(`me_${meId}_usk_${uskId}_${uskKey}_${insideKey}`, insideValue)
								}
							} else {
								update(`me_${meId}_usk_${uskId}_${uskKey}`, uskValue)
							}
						}
					})
				}
			}
		})

		// macros
		let macroInfo = data?.macros
		if (typeof macroInfo !== 'undefined') {
			for (const [key, value] of Object.entries(macroInfo)) {
				if (key !== 'macros') {
					update(`macros_${key}`, value)
				} else {
					value?.forEach((macroItem) => {
						let macroId = macroItem.index + 1
						for (const [insideKey, insideValue] of Object.entries(macroItem)) {
							if (insideKey.match(/^(name)$/)) {
								update(`macros_${macroId}_${insideKey}`, insideValue)
							}
						}
					})
				}
			}
		}

		this.updateVariables(values)
	},
}
