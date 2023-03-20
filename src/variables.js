module.exports = {
	variableDefinitions: [],

	initVariables(switcher) {
		this.variableDefinitions.push({
			name: 'Selected Media Player',
			variableId: 'media_player',
			storeId: 'selectedMediaPlayer',
			feedbackId: 'selected_media_player',
			defaultValue: 1,
		})

		this.variableDefinitions.push({
			name: 'Selected Mix Effect Bus',
			variableId: 'mix_effect_bus',
			storeId: 'selectedMixEffectBus',
			feedbackId: 'selected_mix_effect_bus',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			name: 'Selected Box',
			variableId: 'box',
			storeId: 'selectedBox',
			feedbackId: 'selected_box',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			name: 'Selected SuperSource',
			variableId: 'supersource',
			storeId: 'selectedSuperSource',
			feedbackId: 'selected_supersource',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			name: 'Selected USK',
			variableId: 'usk',
			storeId: 'selectedUSK',
			feedbackId: 'selected_usk',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			name: 'Selected DSK',
			variableId: 'dsk',
			storeId: 'selectedDSK',
			feedbackId: 'selected_dsk',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			name: 'Selected Color Generator',
			variableId: 'color_generator',
			storeId: 'selectedColorGenerator',
			feedbackId: 'selected_color_generator',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			name: 'Selected AUX Bus',
			variableId: 'aux_bus',
			storeId: 'selectedAuxBus',
			feedbackId: 'selected_aux_bus',
			defaultValue: 1,
		})
		this.variableDefinitions.push({
			name: 'Selected MultiViewer',
			variableId: 'multiviewer',
			storeId: 'selectedMultiViewer',
			feedbackId: 'selected_multiviewer',
			defaultValue: 1,
		})

		// dsk
		for (let i = 0; i < switcher.downstreamKeyers; i++) {
			let dskId = i + 1
			this.variableDefinitions.push({
				variableId: `dsk_${dskId}_keySource`,
				name: `Key source for DSK ${dskId}`,
				feedbackId: `dsk_keySource`,
			})
			this.variableDefinitions.push({
				variableId: `dsk_${dskId}_isAutoTransitioning`,
				name: `isAutoTransitioning for DSK ${dskId}`,
				feedbackId: `dsk_isAutoTransitioning`,
			})
			this.variableDefinitions.push({
				variableId: `dsk_${dskId}_invertKey`,
				name: `Invert key for DSK ${dskId}`,
				feedbackId: `dsk_invertKey`,
			})
			this.variableDefinitions.push({
				variableId: `dsk_${dskId}_inTransition`,
				name: `inTransition for DSK ${dskId}`,
				feedbackId: `dsk_inTransition`,
			})
			this.variableDefinitions.push({
				variableId: `dsk_${dskId}_tie`,
				name: `Tie for DSK ${dskId}`,
				feedbackId: `dsk_tie`,
			})
			this.variableDefinitions.push({
				variableId: `dsk_${dskId}_isTowardsOnAir`,
				name: `isTowardsOnAir for DSK ${dskId}`,
			})
			this.variableDefinitions.push({
				variableId: `dsk_${dskId}_fillSource`,
				name: `Fill source for DSK ${dskId}`,
				feedbackId: `dsk_fillSource`,
			})
			this.variableDefinitions.push({
				variableId: `dsk_${dskId}_onAir`,
				name: `On air for DSK ${dskId}`,
				feedbackId: `dsk_onAir`,
			})
			this.variableDefinitions.push({
				variableId: `dsk_${dskId}_masked`,
				name: `Masked for DSK ${dskId}`,
				feedbackId: `dsk_masked`,
			})
			this.variableDefinitions.push({
				variableId: `dsk_${dskId}_preMultiplied`,
				name: `PreMultiplied for DSK ${dskId}`,
				feedbackId: `dsk_preMultiplied`,
			})
		}

		// superSource
		if (switcher.superSources > 0) {
			this.variableDefinitions.push({
				variableId: 'superSource_cascade',
				name: 'SuperSource: Cascade',
			})

			this.variableDefinitions.push({
				variableId: 'superSource_animationSpeed',
				name: 'SuperSource: Animation Speed',
			})

			this.variableDefinitions.push({
				variableId: 'superSource_interpolationStyle',
				name: 'SuperSource: Interpolation Style',
			})
			for (let i = 0; i < switcher.superSources; i++) {
				let ssId = i + 1
				// art
				this.variableDefinitions.push({
					variableId: `superSource_ssrc_${ssId}_art_borderEnabled`,
					name: `SuperSource: SSRC ${ssId} Art: Border Enabled`,
					feedbackId: 'superSource_art_border,',
				})
				this.variableDefinitions.push({
					variableId: `superSource_ssrc_${ssId}_art_placeIn`,
					name: `SuperSource: SSRC ${ssId} Art: Place In`,
				})
				this.variableDefinitions.push({
					variableId: `superSource_ssrc_${ssId}_art_invertKey`,
					name: `SuperSource: SSRC ${ssId} Art: Invert Key`,
					feedbackId: 'superSource_art_invertKey',
				})
				this.variableDefinitions.push({
					variableId: `superSource_ssrc_${ssId}_art_preMultiplied`,
					name: `SuperSource: SSRC ${ssId} Art: Pre-Multiplied`,
					feedbackId: 'superSource_art_preMultiplied',
				})
				this.variableDefinitions.push({
					variableId: `superSource_ssrc_${ssId}_art_borderBevel`,
					name: `SuperSource: SSRC ${ssId} Art: Border Bevel`,
				})

				// currentPreset
				this.variableDefinitions.push({
					variableId: `superSource_ssrc_${ssId}_currentPreset`,
					name: `SuperSource: SSRC ${ssId} Current Preset`,
					feedbackId: 'superSource_currentPreset',
				})

				// boxes
				for (let j = 0; j < 4; j++) {
					let boxId = j + 1
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_highlighted`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Highlighted`,
						feedbackId: 'superSource_box_highlight',
					})
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_enabled`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Enabled`,
						feedbackId: 'superSource_box_enable',
					})
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_cropped`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Cropped`,
						feedbackId: 'superSource_box_crop',
					})
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_source`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Source`,
						feedbackId: 'superSource_box_source',
					})
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_posX`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Position X`,
						feedbackId: 'superSource_box_posX',
					})
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_posY`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Position Y`,
						feedbackId: 'superSource_box_posY',
					})
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_size`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Size`,
						feedbackId: 'superSource_box_size',
					})
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_top`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Top`,
						feedbackId: 'superSource_box_top',
					})
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_bottom`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Bottom`,
						feedbackId: 'superSource_box_bottom',
					})
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_left`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Left`,
						feedbackId: 'superSource_box_left',
					})
					this.variableDefinitions.push({
						variableId: `superSource_ssrc_${ssId}_box_${boxId}_right`,
						name: `SuperSource: SSRC ${ssId} Box ${boxId}: Right`,
						feedbackId: 'superSource_box_right',
					})
				}
			}
		}

		// output
		this.variableDefinitions.push({
			variableId: 'output_isoRecordAllInputs',
			name: 'Output: ISO record all inputs',
		})

		this.variableDefinitions.push({
			variableId: 'output_streaming',
			name: 'Output: Streaming',
			feedbackId: 'output_streaming',
		})

		this.variableDefinitions.push({
			variableId: 'output_recording',
			name: 'Output: Recording',
			feedbackId: 'output_recording',
		})

		this.variableDefinitions.push({
			variableId: 'output_recordInAllCameras',
			name: 'Output: Record In All Cameras',
		})

		this.variableDefinitions.push({
			variableId: 'output_useLowLatency',
			name: 'Output: Use Low Latency',
		})

		// fairlight
		if (switcher.fairlightAudio === true) {
			let audioSourceLength = switcher.audioSources.length
			// sources array begin
			for (let i = 0; i < audioSourceLength; i++) {
				let srcId = i + 1
				// expander
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_expander_attack`,
					name: `Fairlight Audio: Source ${srcId} Expander Attack`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_expander_hold`,
					name: `Fairlight Audio: Source ${srcId} Expander Hold`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_expander_release`,
					name: `Fairlight Audio: Source ${srcId} Expander Release`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_expander_range`,
					name: `Fairlight Audio: Source ${srcId} Expander Range`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_expander_gateEnabled`,
					name: `Fairlight Audio: Source ${srcId} Expander Gate Enabled`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_expander_expanderEnabled`,
					name: `Fairlight Audio: Source ${srcId} Expander Enabled`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_expander_ratio`,
					name: `Fairlight Audio: Source ${srcId} Expander Ratio`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_expander_threshold`,
					name: `Fairlight Audio: Source ${srcId} Expander Threshold`,
				})

				// compressor
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_compressor_hold`,
					name: `Fairlight Audio: Source ${srcId} Compressor Hold`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_compressor_release`,
					name: `Fairlight Audio: Source ${srcId} Compressor Release`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_compressor_attack`,
					name: `Fairlight Audio: Source ${srcId} Compressor Attack`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_compressor_compressorEnabled`,
					name: `Fairlight Audio: Source ${srcId} Compressor Enabled`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_compressor_ratio`,
					name: `Fairlight Audio: Source ${srcId} Compressor Ratio`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_compressor_threshold`,
					name: `Fairlight Audio: Source ${srcId} Compressor Threshold`,
				})

				// equalizerGain
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_equalizerGain`,
					name: `Fairlight Audio: Source ${srcId} Equalizer Gain`,
				})

				// limiter
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_limiter_release`,
					name: `Fairlight Audio: Source ${srcId} Limiter Release`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_limiter_attack`,
					name: `Fairlight Audio: Source ${srcId} Limiter Attack`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_limiter_limiterEnabled`,
					name: `Fairlight Audio: Source ${srcId} Limiter Enabled`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_limiter_hold`,
					name: `Fairlight Audio: Source ${srcId} Limiter Hold`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_limiter_threshold`,
					name: `Fairlight Audio: Source ${srcId} Limiter Threshold`,
				})

				// gain
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_gain`,
					name: `Fairlight Audio: Source ${srcId} Gain`,
				})

				// mixOption
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_mixOption`,
					name: `Fairlight Audio: Source ${srcId} Mix Option`,
				})

				// equalizerEnabled
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_equalizerEnabled`,
					name: `Fairlight Audio: Source ${srcId} Equalizer Enabled`,
				})

				// isMixedIn
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_isMixedIn`,
					name: `Fairlight Audio: Source ${srcId} isMixedIn`,
				})

				// sourceId
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_sourceId`,
					name: `Fairlight Audio: Source ${srcId} Source Id`,
				})

				// audioSource
				this.variableDefinitions.push({
					variableId: `fairlightAudio_source_${srcId}_audioSource`,
					name: `Fairlight Audio: Source ${srcId} Audio Source`,
				})

				// equalizerBands array begin
				for (let j = 0; j < 6; j++) {
					let eqBandId = j + 1
					this.variableDefinitions.push({
						variableId: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_bandEnabled`,
						name: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} enabled`,
					})
					this.variableDefinitions.push({
						variableId: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_frequency`,
						name: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} Frequency`,
					})
					this.variableDefinitions.push({
						variableId: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_frequencyRange`,
						name: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} Frequency Range`,
					})
					this.variableDefinitions.push({
						variableId: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_qFactor`,
						name: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} qFactor`,
					})
					this.variableDefinitions.push({
						variableId: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_band`,
						name: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} Band`,
					})
					this.variableDefinitions.push({
						variableId: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_gain`,
						name: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} Gain`,
					})
					this.variableDefinitions.push({
						variableId: `fairlightAudio_source_${srcId}_equalizerBand_${eqBandId}_shape`,
						name: `Fairlight Audio: Source ${srcId} Equalizer Band ${eqBandId} Shape`,
					})
				}
				// equalizerBands array end
			}
			// sources array end

			// vfaEnabled
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_vfaEnabled',
				name: 'Fairlight Audio: VFA Enabled',
				feedbackId: 'fairlightAudio_vfaEnabled',
			})

			// solo begin
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_solo_enabled',
				name: 'Fairlight Audio: Solo Enabled',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_solo_audioSource',
				name: 'Fairlight Audio: Solo Audio Source',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_solo_sourceId',
				name: 'Fairlight Audio: Solo Source Id',
			})
			// solo end

			// master begin
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_equalizerGain',
				name: 'Fairlight Audio: Master Equalizer Gain',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_limiter_release',
				name: 'Fairlight Audio: Master Limiter Release',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_limiter_attack',
				name: 'Fairlight Audio: Master Limiter Attack',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_limiter_limiterEnabled',
				name: 'Fairlight Audio: Master Limiter Enabled',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_limiter_hold',
				name: 'Fairlight Audio: Master Limiter Hold',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_limiter_threshold',
				name: 'Fairlight Audio: Master Limiter Threshold',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_gain',
				name: 'Fairlight Audio: Master Gain',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_equalizerEnabled',
				name: 'Fairlight Audio: Master Equalizer Enabled',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_followFadeToBlack',
				name: 'Fairlight Audio: Follow Fade To Black',
			})

			//TODO: are there only 6 bands for all models?
			for (let i = 0; i < 6; i++) {
				let eqId = i + 1
				this.variableDefinitions.push({
					variableId: `fairlightAudio_master_equalizerBand_${eqId}_bandEnabled`,
					name: `Fairlight Audio: Master EQ Band ${eqId} Enabled`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_master_equalizerBand_${eqId}_frequency`,
					name: `Fairlight Audio: Master EQ Band ${eqId} Frequency`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_master_equalizerBand_${eqId}_frequencyRange`,
					name: `Fairlight Audio: Master EQ Band ${eqId} Frequency Range`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_master_equalizerBand_${eqId}_qFactor`,
					name: `Fairlight Audio: Master EQ Band ${eqId} qFactor`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_master_equalizerBand_${eqId}_band`,
					name: `Fairlight Audio: Master EQ Band ${eqId} band`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_master_equalizerBand_${eqId}_gain`,
					name: `Fairlight Audio: Master EQ Band ${eqId} Gain`,
				})
				this.variableDefinitions.push({
					variableId: `fairlightAudio_master_equalizerBand_${eqId}_shape`,
					name: `Fairlight Audio: Master EQ Band ${eqId} Shape`,
				})
			}

			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_compressor_hold',
				name: 'Fairlight Audio: Master Compressor Hold',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_compressor_release',
				name: 'Fairlight Audio: Master Compressor Release',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_compressor_attack',
				name: 'Fairlight Audio: Master Compressor Attack',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_compressor_compressorEnabled',
				name: 'Fairlight Audio: Master Compressor Enabled',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_compressor_ratio',
				name: 'Fairlight Audio: Master Compressor Ratio',
			})
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_master_compressor_threshold',
				name: 'Fairlight Audio: Master Compressor Threshold',
			})
			// master end

			// canVfa
			this.variableDefinitions.push({
				variableId: 'fairlightAudio_canVfa',
				name: 'Fairlight Audio: Can VFA?',
			})
		}

		// classic audio
		if (switcher.fairlightAudio === false) {
			let audioSourceLength = switcher.audioSources.length
			for (let i = 0; i < audioSourceLength; i++) {
				let srcId = i + 1
				this.variableDefinitions.push({
					variableId: `legacyAudio_source_${srcId}_mixOption`,
					name: `Legacy Audio Source ${srcId}: Mix Option`,
				})
				this.variableDefinitions.push({
					variableId: `legacyAudio_source_${srcId}_audioSource`,
					name: `Legacy Audio Source ${srcId}: Audio Source`,
				})
				this.variableDefinitions.push({
					variableId: `legacyAudio_source_${srcId}_isMixedIn`,
					name: `Legacy Audio Source ${srcId}: Is Mixed In?`,
				})
			}
		}

		// sources
		let sourcesLength = switcher.videoSources.length
		for (let i = 0; i < sourcesLength; i++) {
			let srcId = i + 1
			this.variableDefinitions.push({
				variableId: `source_${srcId}_outputSource`,
				name: `Source ${srcId} Output Source`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_keySource`,
				name: `Source ${srcId} Key Source`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_longName`,
				name: `Source ${srcId} Long Name`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_inputSource`,
				name: `Source ${srcId} Input Source`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_shortName`,
				name: `Source ${srcId} Short Name`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_mediaSourceFillOnly`,
				name: `Source ${srcId} Media Source Fill Only`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_me2AndFillSources`,
				name: `Source ${srcId} ME2 And Fill Sources`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_auxSource`,
				name: `Source ${srcId} Aux Source`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_superSourceBoxSource`,
				name: `Source ${srcId} Super Source Box Source`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_me1AndFillSources`,
				name: `Source ${srcId} ME1 And Fill Sources`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_me4AndFillSources`,
				name: `Source ${srcId} ME4 And Fill Sources`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_superSourceArtSource`,
				name: `Source ${srcId} Super Source Art Source`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_mediaSource`,
				name: `Source ${srcId} Media Source`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_inputSourceForHyperDeck`,
				name: `Source ${srcId} Input Source For HyperDeck`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_multiviewSource`,
				name: `Source ${srcId} Multiview Source`,
			})
			this.variableDefinitions.push({
				variableId: `source_${srcId}_me3AndFillSources`,
				name: `Source ${srcId} ME3 And Fill Sources`,
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
				variableId: `colorGenerator_${cgId}_hue`,
				name: `Hue for Color Generator ${cgId}`,
				feedbackId: `colorGenerator_hue`,
			})
			this.variableDefinitions.push({
				variableId: `colorGenerator_${cgId}_saturation`,
				name: `Saturation for Color Generator ${cgId}`,
				feedbackId: `colorGenerator_saturation`,
			})
			this.variableDefinitions.push({
				variableId: `colorGenerator_${cgId}_luminance`,
				name: `Luminance for Color Generator ${cgId}`,
				feedbackId: `colorGenerator_luminance`,
			})
		}

		// mediaPool
		this.variableDefinitions.push({
			variableId: 'mediaPool_clipCapacity',
			name: 'Media Pool: Clip Capacity',
		})
		this.variableDefinitions.push({
			variableId: 'mediaPool_stillCapacity',
			name: 'Media Pool: Still Capacity',
		})
		for (let i = 0; i < switcher.mediaStills; i++) {
			let stillId = i + 1
			this.variableDefinitions.push({
				variableId: `mediaPool_still_${stillId}_filename`,
				name: `Media Pool: Still ${stillId} Filename`,
			})
		}
		for (let i = 0; i < switcher.mediaPlayers; i++) {
			let mpId = i + 1
			this.variableDefinitions.push({
				variableId: `mediaPool_mp_${mpId}_stillIndex`,
				name: `Media Pool: Media Player ${mpId} Still Index`,
			})
			this.variableDefinitions.push({
				variableId: `mediaPool_mp_${mpId}_clipIndex`,
				name: `Media Pool: Media Player ${mpId} Clip Index`,
			})
			this.variableDefinitions.push({
				variableId: `mediaPool_mp_${mpId}_type`,
				name: `Media Pool: Media Player ${mpId} Type`,
			})
			// this.variableDefinitions.push({
			// 	variableId: `mediaPool_mp_${mpId}_index`,
			// 	name: `Media Pool: Media Player ${mpId} Index`,
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
				variableId: `aux_${auxId}_source`,
				name: `Source for Aux ${auxId}`,
				feedbackId: `aux_source`,
			})
		}

		// multiview
		for (let i = 0; i < switcher.multiViewers; i++) {
			let multiviewerId = i + 1
			this.variableDefinitions.push({
				variableId: `multiview_${multiviewerId}_layout`,
				name: `Layout for Multiview ${multiviewerId}`,
			})
		}

		// me
		for (let i = 0; i < switcher.mixEffectBuses; i++) {
			let meId = i + 1
			// transitionDve
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDve_logoRate`,
				name: `Transition DVE Logo Rate for ME ${meId}`,
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDve_style`,
				name: `Transition DVE Style for ME ${meId}`,
				feedbackId: 'transition_dve_style',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDve_fillSource`,
				name: `Transition DVE Fill Source for ME ${meId}`,
				feedbackId: 'transition_dve_fillSource',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDve_reverse`,
				name: `Transition DVE Reverse for ME ${meId}`,
				feedbackId: 'transition_dve_reverse',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDve_rate`,
				name: `Transition DVE Rate for ME ${meId}`,
				feedbackId: 'transition_dve_rate',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDve_flipFlop`,
				name: `Transition DVE Flip Flop for ME ${meId}`,
				feedbackId: 'transition_dve_flipFlop',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDve_keySource`,
				name: `Transition DVE Key Source for ME ${meId}`,
				feedbackId: 'transition_dve_keySource',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDve_preMultiplied`,
				name: `Transition DVE Pre-Multiplied for ME ${meId}`,
				feedbackId: 'transition_dve_preMultiplied',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDve_enableKey`,
				name: `Transition DVE Enable Key for ME ${meId}`,
				feedbackId: 'transition_dve_enableKey',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDve_invertKey`,
				name: `Transition DVE Invert Key for ME ${meId}`,
				feedbackId: 'transition_dve_invertKey',
			})

			// preview
			this.variableDefinitions.push({
				variableId: `me_${meId}_preview`,
				name: `Preview for ME ${meId}`,
				feedbackId: `me_preview`,
			})

			// transitionDip
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDip_dipSource`,
				name: `Transition Dip Dip Source for ME ${meId}`,
				feedbackId: 'transition_dip_source',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionDip_rate`,
				name: `Transition Dip Rate for ME ${meId}`,
				feedbackId: 'transition_dip_rate',
			})

			// transitionMix
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionMix_rate`,
				name: `Transition Mix Rate for ME ${meId}`,
				feedbackId: 'transition_mix_rate',
			})

			// inTransition
			this.variableDefinitions.push({
				variableId: `me_${meId}_inTransition`,
				name: `inTransition for ME ${meId}`,
			})

			// transitionSting
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionSting_source`,
				name: `Transition Sting Source for ME ${meId}`,
				feedbackId: 'transition_sting_source',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionSting_triggerPoint`,
				name: `Transition Sting Trigger Point for ME ${meId}`,
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionSting_clipDuration`,
				name: `Transition Sting Clip Duration for ME ${meId}`,
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionSting_mixRate`,
				name: `Transition Sting Mix Rate for ME ${meId}`,
				feedbackId: 'transition_sting_mixRate',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionSting_preMultiplied`,
				name: `Transition Sting Pre-Multiplied for ME ${meId}`,
				feedbackId: 'transition_sting_preMultiplied',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionSting_preRoll`,
				name: `Transition Sting Pre-Roll for ME ${meId}`,
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionSting_invertKey`,
				name: `Transition Sting Invert Key for ME ${meId}`,
				feedbackId: 'transition_sting_invertKey',
			})

			// ftbInTransition
			this.variableDefinitions.push({
				variableId: `me_${meId}_ftbInTransition`,
				name: `ftbInTransition for ME ${meId}`,
			})

			// backgroundState
			this.variableDefinitions.push({
				variableId: `me_${meId}_backgroundState`,
				name: `Background State for ME ${meId}`,
			})

			// transitionWipe
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionWipe_pattern`,
				name: `Transition Wipe Pattern for ME ${meId}`,
				feedbackId: 'transition_wipe_pattern',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionWipe_flipFlop`,
				name: `Transition Wipe Flip Flop for ME ${meId}`,
				feedbackId: 'transition_wipe_flipFlop',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionWipe_fillSource`,
				name: `Transition Wipe Fill Source for ME ${meId}`,
				feedbackId: 'transition_wipe_fillSource',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionWipe_reverse`,
				name: `Transition Wipe Reverse for ME ${meId}`,
				feedbackId: 'transition_wipe_reverse',
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transitionWipe_rate`,
				name: `Transition Wipe Rate for ME ${meId}`,
				feedbackId: 'transition_wipe_rate',
			})

			// usk
			for (let j = 0; j < switcher.upstreamKeyers; j++) {
				let uskId = j + 1
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_keyState`,
					name: `Key State for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_left`,
					name: `Left for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_right`,
					name: `Right for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_keySource`,
					name: `Key Source for USK ${uskId} on ME ${meId}`,
					feedbackId: `usk_keySource`,
				})

				// chromaAdvanced
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_sampleCb`,
					name: `Chroma Advanced Sample CB for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_blue`,
					name: `Chroma Advanced Blue for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_red`,
					name: `Chroma Advanced Red for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_flareSuppression`,
					name: `Chroma Advanced Flare Suppression for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_sampleY`,
					name: `Chroma Advanced Sample Y for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_green`,
					name: `Chroma Advanced Green for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_foreground`,
					name: `Chroma Advanced Foreground for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_background`,
					name: `Chroma Advanced Background for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_spillSuppression`,
					name: `Chroma Advanced Spill Supression for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_saturation`,
					name: `Chroma Advanced Saturation for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_sampleCr`,
					name: `Chroma Advanced Sample CR for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_contrast`,
					name: `Chroma Advanced Contrast for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_brightness`,
					name: `Chroma Advanced Brightness for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_chromaAdvanced_keyEdge`,
					name: `Chroma Advanced Key Edge for USK ${uskId} on ME ${meId}`,
				})

				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_flyEnabled`,
					name: `Fly Enabled for USK ${uskId} on ME ${meId}`,
					feedbackId: 'usk_flyingKey',
				})

				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_fillSource`,
					name: `Fill Source for USK ${uskId} on ME ${meId}`,
					feedbackId: 'usk_fillSource',
				})

				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_type`,
					name: `Type for USK ${uskId} on ME ${meId}`,
				})

				// dve begin
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderHue`,
					name: `DVE Border Hue for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_masked`,
					name: `DVE Masked for USK ${uskId} on ME ${meId}`,
					feedbackId: 'usk_dve_mask',
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderInnerSoftness`,
					name: `DVE Border Inner Softness for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderInnerWidth`,
					name: `DVE Border Inner Width for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_lightSourceAltitude`,
					name: `DVE Light Source Altitude for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderOuterWidth`,
					name: `DVE Border Outer Width for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_top`,
					name: `DVE Top for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_right`,
					name: `DVE Right for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderBevelSoftness`,
					name: `DVE Border Bevel Softness for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderBevelPosition`,
					name: `DVE Border Bevel Position for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderEnabled`,
					name: `DVE Border Enabled for USK ${uskId} on ME ${meId}`,
					feedbackId: 'usk_dve_border',
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_shadow`,
					name: `DVE Shadow for USK ${uskId} on ME ${meId}`,
					feedbackId: 'usk_dve_shadow',
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderSaturation`,
					name: `DVE Border Saturation for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_posX`,
					name: `DVE posX for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_sizeY`,
					name: `DVE sizeY for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderOpacity`,
					name: `DVE Border Opacity for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderLuma`,
					name: `DVE Border Luma for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_left`,
					name: `DVE Left for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_bottom`,
					name: `DVE Bottom for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderOuterSoftness`,
					name: `DVE Border Outer Softness for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_sizeX`,
					name: `DVE sizeX for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_borderStyle`,
					name: `DVE Border Style for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_lightSourceDirection`,
					name: `DVE Light Source Direction for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_dve_posY`,
					name: `DVE posY for USK ${uskId} on ME ${meId}`,
				})
				// dve end

				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_canFlyKey`,
					name: `Can Fly Key for USK ${uskId} on ME ${meId}`,
				})

				// pattern begin
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_pattern_symmetry`,
					name: `Pattern Symmetry for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_pattern_pattern`,
					name: `Pattern Pattern for USK ${uskId} on ME ${meId}`,
					feedbackId: 'usk_pattern_pattern',
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_pattern_size`,
					name: `Pattern Size for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_pattern_posX`,
					name: `Pattern posX for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_pattern_softness`,
					name: `Pattern Softness for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_pattern_invertPattern`,
					name: `Pattern Invert Pattern for USK ${uskId} on ME ${meId}`,
					feedbackId: 'usk_pattern_invert',
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_pattern_posY`,
					name: `Pattern posY for USK ${uskId} on ME ${meId}`,
				})
				// pattern end

				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_bottom`,
					name: `Bottom for USK ${uskId} on ME ${meId}`,
				})

				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_masked`,
					name: `Masked for USK ${uskId} on ME ${meId}`,
					feedbackId: 'usk_masked',
				})

				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_onAir`,
					name: `On Air for USK ${uskId} on ME ${meId}`,
					feedbackId: 'usk_onAir',
				})

				// luma begin
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_luma_invertKey`,
					name: `Luma Invert Key for USK ${uskId} on ME ${meId}`,
				})
				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_luma_preMultiplied`,
					name: `Luma Pre-Multiplied for USK ${uskId} on ME ${meId}`,
				})
				// luma end

				this.variableDefinitions.push({
					variableId: `me_${meId}_usk_${uskId}_top`,
					name: `Top for USK ${uskId} on ME ${meId}`,
				})
			}

			// ftb
			this.variableDefinitions.push({
				variableId: `me_${meId}_ftb`,
				name: `FTB for ME ${meId}`,
			})

			// program
			this.variableDefinitions.push({
				variableId: `me_${meId}_program`,
				name: `Program for ME ${meId}`,
				feedbackId: `me_program`,
			})

			// transition begin
			this.variableDefinitions.push({
				variableId: `me_${meId}_transition_style`,
				name: `Transition Style for ME ${meId}`,
			})
			this.variableDefinitions.push({
				variableId: `me_${meId}_transition_rate`,
				name: `Transition Rate for ME ${meId}`,
			})
			// transition end
		}

		// macros begin
		this.variableDefinitions.push({
			variableId: 'macros_isLooping',
			name: 'Macros: Looping?',
		})

		this.variableDefinitions.push({
			variableId: 'macros_isRunning',
			name: 'Macros: Running?',
		})

		this.variableDefinitions.push({
			variableId: 'macros_isWaiting',
			name: 'Macros: Waiting?',
		})

		this.variableDefinitions.push({
			variableId: 'macros_isRecording',
			name: 'Macros: Recording?',
		})

		for (let i = 0; i < switcher.macros; i++) {
			let macroId = i + 1
			this.variableDefinitions.push({
				variableId: `macros_${macroId}_name`,
				name: `Name for Macro ${macroId}`,
			})
		}
		// macros end

		// Configure variables
		this.setVariableDefinitions(this.variableDefinitions)

		// Set initial values
		// TODO: Optimise by setting all at once
		this.variableDefinitions.forEach(({ variableId, defaultValue }) => {
			this.updateVariable(variableId, defaultValue)
		})
	},

	updateVariable(variableId, value) {
		const { storeId, feedbackId } = this.variableDefinitions.find((item) => item.variableId === variableId) || {}

		this.setVariableValues({ [variableId]: value })

		if (storeId) {
			this.store.variables[storeId] = value
		}
		if (feedbackId) {
			this.checkFeedbacks(feedbackId)
		}
	},
}
