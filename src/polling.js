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
					this.updateState(await response.json())
					this.updateStatus('ok')
				} catch (err) {
					this.log('error', `HTTP GET Request failed (${String(err)})`)
					this.updateStatus('connection_failure', String(err))
					return
				}
			}, this.config.pollingInterval)
		}
	},

	// TODO: Optimise Variable sets by making use of the fact that Companion 3.0
	//  allows setting multiple variables at once.
	updateState(data) {
		// dsk
		data?.dsk?.forEach((item) => {
			let dskId = item.index + 1
			for (const [key, value] of Object.entries(item)) {
				this.updateVariable(`dsk_${dskId}_${key}`, value)
			}
		})

		// superSource
		let superSourceInfo = data?.superSource
		if (typeof superSourceInfo !== 'undefined') {
			for (const [key, value] of Object.entries(superSourceInfo)) {
				if (key !== 'ssrc') {
					this.updateVariable(`superSource_${key}`, value)
				} else {
					value?.forEach((superSourceItem) => {
						let superSourceId = superSourceItem.index + 1
						for (const [insideKey, insideValue] of Object.entries(superSourceItem)) {
							if (insideKey === 'art') {
								for (const [artKey, artValue] of Object.entries(insideValue)) {
									this.updateVariable(`superSource_ssrc_${superSourceId}_${insideKey}_${artKey}`, artValue)
								}
							}
							if (insideKey === 'currentPreset') {
								this.updateVariable(`superSource_ssrc_${superSourceId}_${insideKey}`, insideValue)
							}
							if (insideKey === 'boxes') {
								insideValue?.forEach((boxItem) => {
									let boxId = boxItem.boxId + 1
									for (const [artKey, artValue] of Object.entries(boxItem)) {
										this.updateVariable(`superSource_ssrc_${superSourceId}_box_${boxId}_${artKey}`, artValue)
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
		for (const [key, value] of Object.entries(outputInfo)) {
			this.updateVariable(`output_${key}`, value)
		}

		// fairlight
		let fairlightInfo = data?.fairlight
		if (typeof fairlightInfo !== 'undefined') {
			for (const [key, value] of Object.entries(fairlightInfo)) {
				if (key.match(/^(vfaEnabled|canVfa)$/)) {
					this.updateVariable(`fairlightAudio_${key}`, value)
				}
				if (key.match(/^(solo|master)$/)) {
					for (const [secondKey, secondValue] of Object.entries(value)) {
						if (secondKey.match(/^(limiter|compressor)$/)) {
							for (const [thirdKey, thirdValue] of Object.entries(secondValue)) {
								this.updateVariable(`fairlightAudio_${key}_${secondKey}_${thirdKey}`, thirdValue)
							}
						} else if (secondKey === 'equalizerBands') {
							secondValue?.forEach((bandItem) => {
								let bandId = bandItem.band + 1
								for (const [bandKey, bandValue] of Object.entries(bandItem)) {
									this.updateVariable(`fairlightAudio_${key}_equalizerBand_${bandId}_${bandKey}`, bandValue)
								}
							})
						} else {
							this.updateVariable(`fairlightAudio_${key}_${secondKey}`, secondValue)
						}
					}
				}
				if (key === 'sources') {
					let srcId = 1
					value?.forEach((sourceItem) => {
						for (const [secondKey, secondValue] of Object.entries(sourceItem)) {
							if (secondKey.match(/^(limiter|compressor|expander)$/)) {
								for (const [thirdKey, thirdValue] of Object.entries(secondValue)) {
									this.updateVariable(`fairlightAudio_source_${srcId}_${secondKey}_${thirdKey}`, thirdValue)
								}
							} else if (secondKey === 'equalizerBands') {
								secondValue?.forEach((bandItem) => {
									let bandId = bandItem.band + 1
									for (const [bandKey, bandValue] of Object.entries(bandItem)) {
										this.updateVariable(`fairlightAudio_source_${srcId}_equalizerBand_${bandId}_${bandKey}`, bandValue)
									}
								})
							} else {
								this.updateVariable(`fairlightAudio_source_${srcId}_${secondKey}`, secondValue)
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
					this.updateVariable(`legacyAudio_source_${srcId}_${key}`, value)
				}
				srcId++
			})
		}

		// sources
		let sourceId = 1
		data?.sources?.forEach((item) => {
			const object = item
			for (const [key, value] of Object.entries(object)) {
				this.updateVariable(`source_${sourceId}_${key}`, value)
			}
			sourceId++
		})

		// colorGenerators
		data?.colorGenerators?.forEach((item) => {
			let cgId = item.index + 1
			for (const [key, value] of Object.entries(item)) {
				this.updateVariable(`colorGenerator_${cgId}_${key}`, value)
			}
		})

		// mediaPool
		let mediaPoolInfo = data?.mediaPool
		for (const [key, value] of Object.entries(mediaPoolInfo)) {
			if (key.match(/^(clipCapacity|stillCapacity)$/)) {
				this.updateVariable(`mediaPool_${key}`, value)
			}
			if (key === 'stills') {
				value?.forEach((item) => {
					let stillId = item.index + 1
					this.updateVariable(`mediaPool_still_${stillId}_filename`, item.filename)
				})
			}
			if (key === 'mp') {
				value?.forEach((item) => {
					let mpId = item.index + 1
					for (const [secondKey, secondValue] of Object.entries(item)) {
						if (secondKey !== 'index') {
							this.updateVariable(`mediaPool_mp_${mpId}_${secondKey}`, secondValue)
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
				this.updateVariable(`aux_${auxId}_${key}`, value)
			}
		})

		// multiview
		data?.multiview?.forEach((item) => {
			let multiviewId = item.index + 1
			for (const [key, value] of Object.entries(item)) {
				this.updateVariable(`multiview_${multiviewId}_${key}`, value)
			}
		})

		// me
		data?.me?.forEach((item) => {
			let meId = item.index + 1
			for (const [key, value] of Object.entries(item)) {
				if (key.match(/^(index|inTransition|ftbInTransition|backgroundState|ftb)$/)) {
					this.updateVariable(`me_${meId}_${key}`, value)
				}
				if (key.match(/^(preview|program)$/)) {
					this.updateVariable(`me_${meId}_${key}`, value)
					if (meId === this.store.variables['selectedMixEffectBus']) {
						this.updateVariable(`me_selected_${key}`, value)
						this.updateVariable(`me_selected_${key}`, value)
					}
				}
				if (key.match(/^(transitionDve|transitionDip|transitionMix|transitionSting|transitionWipe|transition)$/)) {
					for (const [insideKey, insideValue] of Object.entries(value)) {
						this.updateVariable(`me_${meId}_${key}_${insideKey}`, insideValue)
					}
				}
				if (key === 'usk') {
					value?.forEach((uskItem) => {
						let uskId = uskItem.index + 1
						for (const [uskKey, uskValue] of Object.entries(uskItem)) {
							if (uskKey.match(/^(chromaAdvanced|dve|pattern|luma)$/)) {
								for (const [insideKey, insideValue] of Object.entries(uskValue)) {
									this.updateVariable(`me_${meId}_usk_${uskId}_${uskKey}_${insideKey}`, insideValue)
								}
							} else {
								this.updateVariable(`me_${meId}_usk_${uskId}_${uskKey}`, uskValue)
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
					this.updateVariable(`macros_${key}`, value)
				} else {
					value?.forEach((macroItem) => {
						let macroId = macroItem.index + 1
						for (const [insideKey, insideValue] of Object.entries(macroItem)) {
							if (insideKey.match(/^(name)$/)) {
								this.updateVariable(`macros_${macroId}_${insideKey}`, insideValue)
							}
						}
					})
				}
			}
		}
	},
}
