module.exports = {
	variableDefinitions: [],

	initVariables(switcher) {
		this.variableDefinitions.push({
			label: 'Selected Media Player',
			name: 'media_player',
			storeId: 'selectedMediaPlayer',
			feedback: 'selected_media_player',
			defaultValue: 1,
		})

		this.variableDefinitions.push({
			label: 'Selected Mix Effect Bus',
			name: 'mix_effect_bus',
			storeId: 'selectedMixEffectBus',
			feedback: 'selected_mix_effect_bus',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			label: 'Selected Box',
			name: 'box',
			storeId: 'selectedBox',
			feedback: 'selected_box',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			label: 'Selected SuperSource',
			name: 'supersource',
			storeId: 'selectedSuperSource',
			feedback: 'selected_supersource',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			label: 'Selected USK',
			name: 'usk',
			storeId: 'selectedUSK',
			feedback: 'selected_usk',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			label: 'Selected DSK',
			name: 'dsk',
			storeId: 'selectedDSK',
			feedback: 'selected_dsk',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			label: 'Selected Color Generator',
			name: 'color_generator',
			storeId: 'selectedColorGenerator',
			feedback: 'selected_color_generator',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			label: 'Selected AUX Bus',
			name: 'aux_bus',
			storeId: 'selectedAuxBus',
			feedback: 'selected_aux_bus',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			label: 'Selected MultiViewer',
			name: 'multiviewer',
			storeId: 'selectedMultiViewer',
			feedback: 'selected_multiviewer',
			defaultValue: 1,
		})

		// dsk
		for (let i = 0; i < switcher.downstreamKeyers; i++) {
			let dskId = i + 1
			this.variableDefinitions.push({
				name: `dsk_${dskId}_keySource`,
				label: `Key source for DSK ${dskId}`,
			})
			this.variableDefinitions.push({
				name: `dsk_${dskId}_isAutoTransitioning`,
				label: `isAutoTransitioning for DSK ${dskId}`,
			})
			this.variableDefinitions.push({
				name: `dsk_${dskId}_invertKey`,
				label: `Invert key for DSK ${dskId}`,
			})
			this.variableDefinitions.push({
				name: `dsk_${dskId}_inTransition`,
				label: `inTransition for DSK ${dskId}`,
			})
			this.variableDefinitions.push({
				name: `dsk_${dskId}_tie`,
				label: `Tie for DSK ${dskId}`,
			})
			this.variableDefinitions.push({
				name: `dsk_${dskId}_isTowardsOnAir`,
				label: `isTowardsOnAir for DSK ${dskId}`,
			})
			this.variableDefinitions.push({
				name: `dsk_${dskId}_fillSource`,
				label: `Fill source for DSK ${dskId}`,
			})
			this.variableDefinitions.push({
				name: `dsk_${dskId}_onAir`,
				label: `On air for DSK ${dskId}`,
			})
			this.variableDefinitions.push({
				name: `dsk_${dskId}_masked`,
				label: `Masked for DSK ${dskId}`,
			})
			this.variableDefinitions.push({
				name: `dsk_${dskId}_preMultiplied`,
				label: `PreMultiplied for DSK ${dskId}`,
			})
		}

		// superSource
		if (switcher.superSources > 0) {
			this.variableDefinitions.push({
				name: 'superSource_cascade',
				label: 'SuperSource: Cascade',
			})

			this.variableDefinitions.push({
				name: 'superSource_animationSpeed',
				label: 'SuperSource: Animation Speed',
			})

			this.variableDefinitions.push({
				name: 'superSource_interpolationStyle',
				label: 'SuperSource: Interpolation Style',
			})
			for (let i = 0; i < switcher.superSources; i++) {
				let ssId = i + 1
				// art
				this.variableDefinitions.push({
					name: `superSource_ssrc_${ssId}_art_borderEnabled`,
					label: `SuperSource: SSRC ${ssId} Art: Border Enabled`,
				})
				this.variableDefinitions.push({
					name: `superSource_ssrc_${ssId}_art_placeIn`,
					label: `SuperSource: SSRC ${ssId} Art: Place In`,
				})
				this.variableDefinitions.push({
					name: `superSource_ssrc_${ssId}_art_invertKey`,
					label: `SuperSource: SSRC ${ssId} Art: Invert Key`,
				})
				this.variableDefinitions.push({
					name: `superSource_ssrc_${ssId}_art_preMultiplied`,
					label: `SuperSource: SSRC ${ssId} Art: Pre-Multiplied`,
				})
				this.variableDefinitions.push({
					name: `superSource_ssrc_${ssId}_art_borderBevel`,
					label: `SuperSource: SSRC ${ssId} Art: Border Bevel`,
				})

				// currentPreset
				this.variableDefinitions.push({
					name: `superSource_ssrc_${ssId}_currentPreset`,
					label: `SuperSource: SSRC ${ssId} Current Preset`,
				})

				// boxes
				for (let j = 0; j < 4; j++) {
					let boxId = j + 1
					this.variableDefinitions.push({
						name: `superSource_ssrc_${ssId}_box_${boxId}_highlighted`,
						label: `SuperSource: SSRC ${ssId} Box ${boxId}: Highlighted`,
					})
					this.variableDefinitions.push({
						name: `superSource_ssrc_${ssId}_box_${boxId}_enabled`,
						label: `SuperSource: SSRC ${ssId} Box ${boxId}: Enabled`,
					})
					this.variableDefinitions.push({
						name: `superSource_ssrc_${ssId}_box_${boxId}_cropped`,
						label: `SuperSource: SSRC ${ssId} Box ${boxId}: Cropped`,
					})
					this.variableDefinitions.push({
						name: `superSource_ssrc_${ssId}_box_${boxId}_source`,
						label: `SuperSource: SSRC ${ssId} Box ${boxId}: Source`,
					})
				}
			}
		}

		// output
		this.variableDefinitions.push({
			name: 'output_isoRecordAllInputs',
			label: 'Output: ISO record all inputs',
		})

		this.variableDefinitions.push({
			name: 'output_streaming',
			label: 'Output: Streaming',
		})

		this.variableDefinitions.push({
			name: 'output_recording',
			label: 'Output: Recording',
		})

		this.variableDefinitions.push({
			name: 'output_recordInAllCameras',
			label: 'Output: Record In All Cameras',
		})

		this.variableDefinitions.push({
			name: 'output_useLowLatency',
			label: 'Output: Use Low Latency',
		})

		// fairlight
		if (switcher.fairlightAudio === true) {
			let audioSourceLength = switcher.audioSources.length
			// sources array begin
			for (let i = 0; i < audioSourceLength; i++) {
				let srcId = i + 1
				// expander
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_expander_attack`,
					label: `Fairlight Audio: Source ${srcId} Expander Attack`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_expander_hold`,
					label: `Fairlight Audio: Source ${srcId} Expander Hold`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_expander_release`,
					label: `Fairlight Audio: Source ${srcId} Expander Release`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_expander_range`,
					label: `Fairlight Audio: Source ${srcId} Expander Range`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_expander_gateEnabled`,
					label: `Fairlight Audio: Source ${srcId} Expander Gate Enabled`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_expander_expanderEnabled`,
					label: `Fairlight Audio: Source ${srcId} Expander Enabled`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_expander_ratio`,
					label: `Fairlight Audio: Source ${srcId} Expander Ratio`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_expander_threshold`,
					label: `Fairlight Audio: Source ${srcId} Expander Threshold`,
				})

				// compressor
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_compressor_hold`,
					label: `Fairlight Audio: Source ${srcId} Compressor Hold`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_compressor_release`,
					label: `Fairlight Audio: Source ${srcId} Compressor Release`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_compressor_attack`,
					label: `Fairlight Audio: Source ${srcId} Compressor Attack`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_compressor_compressorEnabled`,
					label: `Fairlight Audio: Source ${srcId} Compressor Enabled`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_compressor_ratio`,
					label: `Fairlight Audio: Source ${srcId} Compressor Ratio`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_compressor_threshold`,
					label: `Fairlight Audio: Source ${srcId} Compressor Threshold`,
				})

				// equalizerGain
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_equalizerGain`,
					label: `Fairlight Audio: Source ${srcId} Equalizer Gain`,
				})

				// limiter
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_limiter_release`,
					label: `Fairlight Audio: Source ${srcId} Limiter Release`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_limiter_attack`,
					label: `Fairlight Audio: Source ${srcId} Limiter Attack`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_limiter_limiterEnabled`,
					label: `Fairlight Audio: Source ${srcId} Limiter Enabled`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_limiter_hold`,
					label: `Fairlight Audio: Source ${srcId} Limiter Hold`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_limiter_threshold`,
					label: `Fairlight Audio: Source ${srcId} Limiter Threshold`,
				})

				// gain
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_gain`,
					label: `Fairlight Audio: Source ${srcId} Gain`,
				})

				// mixOption
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_mixOption`,
					label: `Fairlight Audio: Source ${srcId} Mix Option`,
				})

				// equalizerEnabled
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_equalizerEnabled`,
					label: `Fairlight Audio: Source ${srcId} Equalizer Enabled`,
				})

				// isMixedIn
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_isMixedIn`,
					label: `Fairlight Audio: Source ${srcId} isMixedIn`,
				})

				// sourceId
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_sourceId`,
					label: `Fairlight Audio: Source ${srcId} Source Id`,
				})

				// audioSource
				this.variableDefinitions.push({
					name: `fairlightAudio_source_${srcId}_audioSource`,
					label: `Fairlight Audio: Source ${srcId} Audio Source`,
				})

				// equalizerBands array begin
				for (let j = 0; j < 6; j++) {
					let eqBandId = j + 1
					this.variableDefinitions.push({
						name: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_bandEnabled`,
						label: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} enabled`,
					})
					this.variableDefinitions.push({
						name: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_frequency`,
						label: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} Frequency`,
					})
					this.variableDefinitions.push({
						name: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_frequencyRange`,
						label: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} Frequency Range`,
					})
					this.variableDefinitions.push({
						name: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_qFactor`,
						label: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} qFactor`,
					})
					this.variableDefinitions.push({
						name: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_band`,
						label: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} Band`,
					})
					this.variableDefinitions.push({
						name: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_gain`,
						label: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} Gain`,
					})
					this.variableDefinitions.push({
						name: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_shape`,
						label: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} Shape`,
					})
				}
				// equalizerBands array end
			}
			// sources array end

			// vfaEnabled
			this.variableDefinitions.push({
				name: 'fairlightAudio_vfaEnabled',
				label: 'Fairlight Audio: VFA Enabled',
			})

			// solo begin
			this.variableDefinitions.push({
				name: 'fairlightAudio_solo_enabled',
				label: 'Fairlight Audio: Solo Enabled',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_solo_audioSource',
				label: 'Fairlight Audio: Solo Audio Source',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_solo_sourceId',
				label: 'Fairlight Audio: Solo Source Id',
			})
			// solo end

			// master begin
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_equalizerGain',
				label: 'Fairlight Audio: Master Equalizer Gain',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_limiter_release',
				label: 'Fairlight Audio: Master Limiter Release',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_limiter_attack',
				label: 'Fairlight Audio: Master Limiter Attack',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_limiter_limiterEnabled',
				label: 'Fairlight Audio: Master Limiter Enabled',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_limiter_hold',
				label: 'Fairlight Audio: Master Limiter Hold',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_limiter_threshold',
				label: 'Fairlight Audio: Master Limiter Threshold',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_gain',
				label: 'Fairlight Audio: Master Gain',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_equalizerEnabled',
				label: 'Fairlight Audio: Master Equalizer Enabled',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_followFadeToBlack',
				label: 'Fairlight Audio: Follow Fade To Black',
			})

			//TODO: are there only 6 bands for all models?
			for (let i = 0; i < 6; i++) {
				let eqId = i + 1
				this.variableDefinitions.push({
					name: `fairlightAudio_master_equalizerBand_${eqId}_bandEnabled`,
					label: `Fairlight Audio: Master EQ Band ${eqId} Enabled`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_master_equalizerBand_${eqId}_frequency`,
					label: `Fairlight Audio: Master EQ Band ${eqId} Frequency`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_master_equalizerBand_${eqId}_frequencyRange`,
					label: `Fairlight Audio: Master EQ Band ${eqId} Frequency Range`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_master_equalizerBand_${eqId}_qFactor`,
					label: `Fairlight Audio: Master EQ Band ${eqId} qFactor`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_master_equalizerBand_${eqId}_band`,
					label: `Fairlight Audio: Master EQ Band ${eqId} band`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_master_equalizerBand_${eqId}_gain`,
					label: `Fairlight Audio: Master EQ Band ${eqId} Gain`,
				})
				this.variableDefinitions.push({
					name: `fairlightAudio_master_equalizerBand_${eqId}_shape`,
					label: `Fairlight Audio: Master EQ Band ${eqId} Shape`,
				})
			}

			this.variableDefinitions.push({
				name: 'fairlightAudio_master_compressor_hold',
				label: 'Fairlight Audio: Master Compressor Hold',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_compressor_release',
				label: 'Fairlight Audio: Master Compressor Release',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_compressor_attack',
				label: 'Fairlight Audio: Master Compressor Attack',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_compressor_compressorEnabled',
				label: 'Fairlight Audio: Master Compressor Enabled',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_compressor_ratio',
				label: 'Fairlight Audio: Master Compressor Ratio',
			})
			this.variableDefinitions.push({
				name: 'fairlightAudio_master_compressor_threshold',
				label: 'Fairlight Audio: Master Compressor Threshold',
			})
			// master end

			// canVfa
			this.variableDefinitions.push({
				name: 'fairlightAudio_canVfa',
				label: 'Fairlight Audio: Can VFA?',
			})
		}

		// classic audio
		if (switcher.fairlightAudio === false) {
			let audioSourceLength = switcher.audioSources.length
			for (let i = 0; i < audioSourceLength; i++) {
				let srcId = i + 1
				this.variableDefinitions.push({
					name: `legacyAudio_source_${srcId}_mixOption`,
					label: `Legacy Audio Source ${srcId}: Mix Option`,
				})
				this.variableDefinitions.push({
					name: `legacyAudio_source_${srcId}_audioSource`,
					label: `Legacy Audio Source ${srcId}: Audio Source`,
				})
				this.variableDefinitions.push({
					name: `legacyAudio_source_${srcId}_isMixedIn`,
					label: `Legacy Audio Source ${srcId}: Is Mixed In?`,
				})
			}
		}

		// sources
		let sourcesLength = switcher.videoSources.length
		for (let i = 0; i < sourcesLength; i++) {
			let srcId = i + 1
			this.variableDefinitions.push({
				name: `source_${srcId}_outputSource`,
				label: `Source ${srcId} Output Source`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_keySource`,
				label: `Source ${srcId} Key Source`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_longName`,
				label: `Source ${srcId} Long Name`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_inputSource`,
				label: `Source ${srcId} Input Source`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_shortName`,
				label: `Source ${srcId} Short Name`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_mediaSourceFillOnly`,
				label: `Source ${srcId} Media Source Fill Only`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_me2AndFillSources`,
				label: `Source ${srcId} ME2 And Fill Sources`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_auxSource`,
				label: `Source ${srcId} Aux Source`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_superSourceBoxSource`,
				label: `Source ${srcId} Super Source Box Source`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_me1AndFillSources`,
				label: `Source ${srcId} ME1 And Fill Sources`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_me4AndFillSources`,
				label: `Source ${srcId} ME4 And Fill Sources`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_superSourceArtSource`,
				label: `Source ${srcId} Super Source Art Source`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_mediaSource`,
				label: `Source ${srcId} Media Source`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_inputSourceForHyperDeck`,
				label: `Source ${srcId} Input Source For HyperDeck`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_multiviewSource`,
				label: `Source ${srcId} Multiview Source`,
			})
			this.variableDefinitions.push({
				name: `source_${srcId}_me3AndFillSources`,
				label: `Source ${srcId} ME3 And Fill Sources`,
			})
		}

		// color generators
		let colorGeneratorCount = 0
		switcher?.videoSources?.forEach((item) => {
			if (item.type === 3) {
				colorGeneratorCount++
			}
		})
		for (let i = 0; i < colorGeneratorCount; i++) {
			let cgId = i + 1
			this.variableDefinitions.push({
				name: `colorGenerator_${cgId}_hue`,
				label: `Hue for Color Generator ${cgId}`,
			})
			this.variableDefinitions.push({
				name: `colorGenerator_${cgId}_saturation`,
				label: `Saturation for Color Generator ${cgId}`,
			})
			this.variableDefinitions.push({
				name: `colorGenerator_${cgId}_luminance`,
				label: `Luminance for Color Generator ${cgId}`,
			})
		}

		// mediaPool
		this.variableDefinitions.push({
			name: 'mediaPool_clipCapacity',
			label: 'Media Pool: Clip Capacity',
		})
		this.variableDefinitions.push({
			name: 'mediaPool_stillCapacity',
			label: 'Media Pool: Still Capacity',
		})
		for (let i = 0; i < switcher.mediaStills; i++) {
			let stillId = i + 1
			this.variableDefinitions.push({
				name: `mediaPool_still_${stillId}_filename`,
				label: `Media Pool: Still ${stillId} Filename`,
			})
		}
		for (let i = 0; i < switcher.mediaPlayers; i++) {
			let mpId = i + 1
			this.variableDefinitions.push({
				name: `mediaPool_mp_${mpId}_stillIndex`,
				label: `Media Pool: Media Player ${mpId} Still Index`,
			})
			this.variableDefinitions.push({
				name: `mediaPool_mp_${mpId}_clipIndex`,
				label: `Media Pool: Media Player ${mpId} Clip Index`,
			})
			this.variableDefinitions.push({
				name: `mediaPool_mp_${mpId}_type`,
				label: `Media Pool: Media Player ${mpId} Type`,
			})
			// this.variableDefinitions.push({
			// 	name: `mediaPool_mp_${mpId}_index`,
			// 	label: `Media Pool: Media Player ${mpId} Index`,
			// })
		}
		// mediaPool.clips
		for (let i = 0; i < switcher.mediaClips; i++) {
			let mcId = i + 1
			console.log(mcId)
			//TODO: not sure what to do here. Need JSON file to process.
		}
		// mediaPool.audioClips
		for (let i = 0; i < switcher.mediaClips; i++) {
			let mcId = i + 1
			console.log(mcId)
			//TODO: not sure what to do here. Need JSON file to process.
		}

		// aux
		for (let i = 0; i < switcher.auxBuses; i++) {
			let auxId = i + 1
			this.variableDefinitions.push({
				name: `aux_${auxId}_source`,
				label: `Source for Aux ${auxId}`,
			})
		}

		// multiview
		for (let i = 0; i < switcher.multiViewers; i++) {
			let multiviewerId = i + 1
			this.variableDefinitions.push({
				name: `multiview_${multiviewerId}_layout`,
				label: `Layout for Multiview ${multiviewerId}`,
			})
		}

		// me
		for (let i = 0; i < switcher.mixEffectBuses; i++) {
			let meId = i + 1
			// transitionDve
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDve_logoRate`,
				label: `Transition DVE Logo Rate for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDve_style`,
				label: `Transition DVE Style for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDve_fillSource`,
				label: `Transition DVE Fill Source for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDve_reverse`,
				label: `Transition DVE Reverse for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDve_rate`,
				label: `Transition DVE Rate for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDve_flipFlop`,
				label: `Transition DVE Flip Flop for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDve_keySource`,
				label: `Transition DVE Key Source for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDve_preMultiplied`,
				label: `Transition DVE Pre-Multiplied for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDve_enableKey`,
				label: `Transition DVE Enable Key for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDve_invertKey`,
				label: `Transition DVE Invert Key for ME ${meId}`,
			})

			// preview
			this.variableDefinitions.push({
				name: `me_${meId}_preview`,
				label: `Preview for ME ${meId}`,
			})

			// transitionDip
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDip_dipSource`,
				label: `Transition Dip Dip Source for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionDip_rate`,
				label: `Transition Dip Rate for ME ${meId}`,
			})

			// transitionMix
			this.variableDefinitions.push({
				name: `me_${meId}_transitionMix_rate`,
				label: `Transition Mix Rate for ME ${meId}`,
			})

			// inTransition
			this.variableDefinitions.push({
				name: `me_${meId}_inTransition`,
				label: `inTransition for ME ${meId}`,
			})

			// transitionSting
			this.variableDefinitions.push({
				name: `me_${meId}_transitionSting_source`,
				label: `Transition Sting Source for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionSting_triggerPoint`,
				label: `Transition Sting Trigger Point for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionSting_clipDuration`,
				label: `Transition Sting Clip Duration for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionSting_mixRate`,
				label: `Transition Sting Mix Rate for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionSting_preMultiplied`,
				label: `Transition Sting Pre-Multiplied for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionSting_preRoll`,
				label: `Transition Sting Pre-Roll for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionSting_invertKey`,
				label: `Transition Sting Invert Key for ME ${meId}`,
			})

			// ftbInTransition
			this.variableDefinitions.push({
				name: `me_${meId}_ftbInTransition`,
				label: `ftbInTransition for ME ${meId}`,
			})

			// backgroundState
			this.variableDefinitions.push({
				name: `me_${meId}_backgroundState`,
				label: `Background State for ME ${meId}`,
			})

			// transitionWipe
			this.variableDefinitions.push({
				name: `me_${meId}_transitionWipe_pattern`,
				label: `Transition Wipe Pattern for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionWipe_flipFlop`,
				label: `Transition Wipe Flip Flop for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionWipe_fillSource`,
				label: `Transition Wipe Fill Source for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionWipe_reverse`,
				label: `Transition Wipe Reverse for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transitionWipe_rate`,
				label: `Transition Wipe Rate for ME ${meId}`,
			})

			// usk
			for (let j = 0; j < switcher.upstreamKeyers; j++) {
				let uskId = j + 1
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_keyState`,
					label: `Key State for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_left`,
					label: `Left for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_right`,
					label: `Right for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_keySource`,
					label: `Key Source for USK ${uskId} on ME ${meId}`,
				})

				// chromaAdvanced
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_sampleCb`,
					label: `Chroma Advanced Sample CB for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_blue`,
					label: `Chroma Advanced Blue for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_red`,
					label: `Chroma Advanced Red for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_flareSuppression`,
					label: `Chroma Advanced Flare Suppression for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_sampleY`,
					label: `Chroma Advanced Sample Y for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_green`,
					label: `Chroma Advanced Green for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_foreground`,
					label: `Chroma Advanced Foreground for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_background`,
					label: `Chroma Advanced Background for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_spillSuppression`,
					label: `Chroma Advanced Spill Supression for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_saturation`,
					label: `Chroma Advanced Saturation for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_sampleCr`,
					label: `Chroma Advanced Sample CR for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_contrast`,
					label: `Chroma Advanced Contrast for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_brightness`,
					label: `Chroma Advanced Brightness for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_chromaAdvanced_keyEdge`,
					label: `Chroma Advanced Key Edge for USK ${uskId} on ME ${meId}`,
				})

				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_flyEnabled`,
					label: `Fly Enabled for USK ${uskId} on ME ${meId}`,
				})

				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_fillSource`,
					label: `Fill Source for USK ${uskId} on ME ${meId}`,
				})

				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_type`,
					label: `Type for USK ${uskId} on ME ${meId}`,
				})

				// dve begin
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderHue`,
					label: `DVE Border Hue for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_masked`,
					label: `DVE Masked for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderInnerSoftness`,
					label: `DVE Border Inner Softness for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderInnerWidth`,
					label: `DVE Border Inner Width for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_lightSourceAltitude`,
					label: `DVE Light Source Altitude for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderOuterWidth`,
					label: `DVE Border Outer Width for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_top`,
					label: `DVE Top for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_right`,
					label: `DVE Right for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderBevelSoftness`,
					label: `DVE Border Bevel Softness for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderBevelPosition`,
					label: `DVE Border Bevel Position for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderEnabled`,
					label: `DVE Border Enabled for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_shadow`,
					label: `DVE Shadow for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderSaturation`,
					label: `DVE Border Saturation for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_posX`,
					label: `DVE posX for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_sizeY`,
					label: `DVE sizeY for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderOpacity`,
					label: `DVE Border Opacity for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderLuma`,
					label: `DVE Border Luma for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_left`,
					label: `DVE Left for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_bottom`,
					label: `DVE Bottom for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderOuterSoftness`,
					label: `DVE Border Outer Softness for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_sizeX`,
					label: `DVE sizeX for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_borderStyle`,
					label: `DVE Border Style for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_lightSourceDirection`,
					label: `DVE Light Source Direction for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_dve_posY`,
					label: `DVE posY for USK ${uskId} on ME ${meId}`,
				})
				// dve end

				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_canFlyKey`,
					label: `Can Fly Key for USK ${uskId} on ME ${meId}`,
				})

				// pattern begin
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_pattern_symmetry`,
					label: `Pattern Symmetry for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_pattern_pattern`,
					label: `Pattern Pattern for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_pattern_size`,
					label: `Pattern Size for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_pattern_posX`,
					label: `Pattern posX for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_pattern_softness`,
					label: `Pattern Softness for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_pattern_invertPattern`,
					label: `Pattern Invert Pattern for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_pattern_posY`,
					label: `Pattern posY for USK ${uskId} on ME ${meId}`,
				})
				// pattern end

				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_bottom`,
					label: `Bottom for USK ${uskId} on ME ${meId}`,
				})

				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_masked`,
					label: `Masked for USK ${uskId} on ME ${meId}`,
				})

				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_onAir`,
					label: `On Air for USK ${uskId} on ME ${meId}`,
				})

				// luma begin
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_luma_invertKey`,
					label: `Luma Invert Key for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_luma_preMultiplied`,
					label: `Luma Pre-Multiplied for USK ${uskId} on ME ${meId}`,
				})
				// luma end

				this.variableDefinitions.push({
					name: `me_${meId}_usk_${uskId}_top`,
					label: `Top for USK ${uskId} on ME ${meId}`,
				})
			}

			// ftb
			this.variableDefinitions.push({
				name: `me_${meId}_ftb`,
				label: `FTB for ME ${meId}`,
			})

			// program
			this.variableDefinitions.push({
				name: `me_${meId}_program`,
				label: `Program for ME ${meId}`,
			})

			// transition begin
			this.variableDefinitions.push({
				name: `me_${meId}_transition_style`,
				label: `Transition Style for ME ${meId}`,
			})
			this.variableDefinitions.push({
				name: `me_${meId}_transition_rate`,
				label: `Transition Rate for ME ${meId}`,
			})
			// transition end
		}

		// macros begin
		this.variableDefinitions.push({
			name: 'macros_isLooping',
			label: 'Macros: Looping?',
		})

		this.variableDefinitions.push({
			name: 'macros_isRunning',
			label: 'Macros: Running?',
		})

		this.variableDefinitions.push({
			name: 'macros_isWaiting',
			label: 'Macros: Waiting?',
		})

		this.variableDefinitions.push({
			name: 'macros_isRecording',
			label: 'Macros: Recording?',
		})

		for (let i = 0; i < switcher.macros; i++) {
			let macroId = i + 1
			this.variableDefinitions.push({
				name: `macros_${macroId}_name`,
				label: `Name for Macro ${macroId}`,
			})
		}
		// macros end

		// Configure variables
		this.setVariableDefinitions(this.variableDefinitions)

		// Set initial values
		this.variableDefinitions.forEach(({ name, defaultValue }) => {
			this.updateVariable(name, defaultValue)
		})
	},

	updateVariable(name, value) {
		const { storeId, feedback } = this.variableDefinitions.find((item) => item.name === name) || {}

		this.setVariable(name, value)

		if (storeId) {
			this.store.variables[storeId] = value
		}
		if (feedback) {
			this.checkFeedbacks(feedback)
		}
	},

	updateVariables(data) {
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
				if (key.match(/^(preview|index|inTransition|ftbInTransition|backgroundState|ftb|program)$/)) {
					this.updateVariable(`me_${meId}_${key}`, value)
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
