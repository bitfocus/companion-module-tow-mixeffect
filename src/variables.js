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

		for (let i = 0; i < switcher.multiViewers; i++) {
			let multiviewerId = i + 1
			this.variableDefinitions.push({
				name: `multiview_${multiviewerId}_layout`,
				label: `Layout for Multiview ${multiviewerId}`,
			})
		}

		for (let i = 0; i < switcher.auxBuses; i++) {
			let auxId = i + 1
			this.variableDefinitions.push({
				name: `aux_${auxId}_source`,
				label: `Source for Aux ${auxId}`,
			})
		}

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
			const object = item
			for(const [key, value] of Object.entries(object)) {
				this.updateVariable(`dsk_${dskId}_${key}`, value)
			}
		})
		
		// superSource

		// output
		var object = data?.output
		for(const [key, value] of Object.entries(object)) {
			this.updateVariable(`output_${key}`, value)
		}

		// fairlight

		// sources

		// colorGenerators

		// mediaPool

		// aux
		data?.aux?.forEach(item => {
			let auxId = item.index + 1
			const object = item
			for(const [key, value] of Object.entries(object)) {
				this.updateVariable(`aux_${auxId}_${key}`, value)
			}
		})
		
		// multiview
		data?.multiview?.forEach(item => {
			let multiviewId = item.index + 1
			const object = item
			for(const [key, value] of Object.entries(object)) {
				this.updateVariable(`multiview_${multiviewId}_${key}`, value)
			}
		})

		// me

		// macros
		var object = data?.macros
		for(const [key, value] of Object.entries(object)) {
			if(key !== 'macros') {
				this.updateVariable(`macros_${key}`, value)
			}
		}

	},
}
