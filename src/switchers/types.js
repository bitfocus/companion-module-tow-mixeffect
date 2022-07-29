module.exports = {
	// ATEM Switcher Models
	model: {
		unknown: 0,

		// Not supported
		// atemTelevisionStudio: 1,
		// atem1meProductionStudio: 2,
		// atem2meProductionStudio: 3,

		atemProductionStudio4k: 4,
		atem1meProductionStudio4k: 5,
		atem2meProductionStudio4k: 6,
		atem4meBroadcastStudio4k: 7,

		atemTelevisionStudioHD: 8,
		atemTelevisionStudioProHD: 9,
		atemTelevisionStudioPro4k: 10,

		atemConstellation: 11,
		atemConstellation8k: 12,

		atemMini: 13,
		atemMiniPro: 14,
		atemMiniProIso: 15,
		atemMiniExtreme: 16,
		atemMiniExtremeIso: 17,

		atem1meConstellationHd: 18,
		atem2meConstellationHd: 19,
		atem4meConstellationHd: 20,
		
		atemSdi: 21,
		atemSdiProIso: 22,
		atemSdiExtremeIso: 23,
	},

	// Video Source Types
	videoSource: {
		external: 0,
		black: 1,
		colorBars: 2,
		colorGenerator: 3,
		mediaPlayerFill: 4,
		mediaPlayerKey: 5,
		superSource: 6,
		externalDirect: 7,
		meOutput: 128,
		auxiliary: 129,
		mask: 130,
		multiViewer: 131,
	},

	videoSourceId: {
		black: 0,
		input: 1,
		colorBars: 1000,
		colorGenerator: 2001,
		mediaPlayerFill: 3010,
		mediaPlayerKey: 3011,
		keyMask: 4010,
		downstreamKeyMask: 5010,
		superSource: 6000,
		cleanFeed: 7001,
		auxiliary: 8001,
		multiViewer: 9001,
		program: 10010,
		preview: 10011,
		inputDirect: 11001,
	},

	// Audio Source Types
	audioSource: {
		sdi: 1,
		hdmi: 2,
		component: 4,
		composite: 8,
		svideo: 16,
		xlr: 32,
		aesebu: 64,
		rca: 128,
		internal: 256,
		ts: 512,
		madi: 1024,
		trs: 2048,
	},

	audioSourceId: {
		input: 1,
		xlr: 1001,
		aesebu: 1101,
		rca: 1201,
		mic: 1301,
		mp: 2001,
		trs: 1400,
		madi: 1500,
	},

	// Source Availability
	availability: {
		source: {
			none: 0,
			auxiliary: 1,
			keySource: 2,
			multiViewer: 4,
			superSourceArt: 8,
			superSourceBox: 16,
			all: 31,
		},
		me: {
			none: 0,
			me1: 1,
			me2: 2,
			me3: 4,
			me4: 8,
			all: 15,
		},
	},
}
