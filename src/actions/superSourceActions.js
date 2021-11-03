const { generateChoices, growChoices, shrinkChoices, option } = require('./utils')
const { availability } = require('../switchers/types')

const superSourceActions = ({ context }) => {
	const actions = {}

	actions.superSourceSelect = {
		label: 'SuperSource: Select',
		options: [option.superSource(context, false)],
		callback: ({ options }) => {
			context.updateVariable('supersource', options.superSource)
		},
	}

	if (context.switcher.superSources > 0) {
		actions.superSourceAnimationSpeed = {
			label: 'SuperSource: Animation Speed',
			options: [
				{
					type: 'dropdown',
					label: 'Speed',
					id: 'speed',
					choices: [
						{ id: 0, label: 'Instant' },
						{ id: 1, label: 'Extra Fast' },
						{ id: 2, label: 'Fast' },
						{ id: 3, label: 'Normal' },
						{ id: 4, label: 'Slow' },
						{ id: 5, label: 'Extra Slow' },
					],
					default: 2,
					minChoicesForSearch: 0,
				},
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/speed', [{ type: 'i', value: options.speed }])
			},
		}

		actions.superSourceAnimationSpeedCycle = {
			label: 'SuperSource: Cycle Animation Speed',
			callback: () => {
				context.oscSend('/mixeffect/ssrc/cycle-speed')
			},
		}

		actions.superSourceAnimationStyle = {
			label: 'SuperSource: Animation Style',
			options: [
				{
					type: 'dropdown',
					label: 'Style',
					id: 'style',
					choices: [
						{ id: 0, label: 'Cosine' },
						{ id: 1, label: 'Cubed' },
						{ id: 2, label: 'Inverse Cubed' },
						{ id: 3, label: 'Inverse Squared' },
						{ id: 4, label: 'Linear' },
						{ id: 5, label: 'Sine' },
						{ id: 6, label: 'Smooth Step' },
						{ id: 7, label: 'Smoother Step' },
						{ id: 8, label: 'Squared' },
					],
					default: 5,
					minChoicesForSearch: 0,
				},
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/style', [{ type: 'i', value: options.style }])
			},
		}

		actions.superSourceAnimationStyleCycle = {
			label: 'SuperSource: Cycle Animation Style',
			callback: () => {
				context.oscSend('/mixeffect/ssrc/cycle-style')
			},
		}

		actions.superSourceArt = {
			label: 'SuperSource: Art',
			options: [
				{
					type: 'dropdown',
					label: 'Fill Source',
					id: 'fill',
					default: 0,
					minChoicesForSearch: 0,
					choices: context.switcher.videoSources
						.filter((item) => item.availability.source & availability.source.superSourceArt)
						.map(({ id, label }) => ({ id, label })),
				},
				{
					type: 'dropdown',
					label: 'Key Source',
					id: 'key',
					default: 0,
					minChoicesForSearch: 0,
					choices: context.switcher.videoSources
						.filter((item) => item.availability.source & availability.source.superSourceArt)
						.map(({ id, label }) => ({ id, label })),
				},
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					default: 0,
					minChoicesForSearch: 0,
					choices: [
						{ id: 0, label: 'Keep Existing' },
						{ id: 1, label: 'Background' },
						{ id: 2, label: 'Foreground' },
						{ id: 3, label: 'Toggle' },
					],
				},
				option.superSource(context),
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/art', [
					{ type: 'i', value: options.fill },
					{ type: 'i', value: options.key },
					{ type: 'i', value: options.mode },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		if (context.switcher.superSourceArtBorder) {
			actions.superSourceArtBorder = {
				label: 'SuperSource: Art Border',
				options: [
					option.yesNo({ label: 'Enable Border', id: 'enable' }),
					option.list({
						label: 'Style',
						id: 'style',
						list: ['No Bevel', 'Bevel In Out', 'Bevel In', 'Bevel Out'],
						base: 1,
					}),
					option.value({ label: 'Outer Width', id: 'outerWidth', min: 0, max: 16 }),
					option.value({ label: 'Innter Width', id: 'innerWidth', min: 0, max: 16 }),
					option.value({ label: 'Outer Softness', id: 'outerSoftness', step: 1 }),
					option.value({ label: 'Inner Softness', id: 'innerSoftness', step: 1 }),
					option.value({ label: 'Bevel Softness', id: 'bevelSoftness', step: 1 }),
					option.value({ label: 'Bevel Position', id: 'bevelPosition', step: 1 }),
					option.hue(),
					option.saturation(),
					option.luminance(),
					option.value({ label: 'Light Source Direction', id: 'lightSourceDirection', min: 0, max: 359.9, step: 0.1 }),
					option.value({ label: 'Light Source Altitude', id: 'lightSourceAltitude', step: 1 }),
					option.superSource(context),
				],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border', [
						{ type: 'i', value: Number(options.enable) },
						{ type: 'i', value: options.style },
						{ type: 'f', value: parseFloat(options.outerWidth) },
						{ type: 'f', value: parseFloat(options.innerWidth) },
						{ type: 'i', value: options.outerSoftness },
						{ type: 'i', value: options.innerSoftness },
						{ type: 'i', value: options.bevelSoftness },
						{ type: 'i', value: options.bevelPosition },
						{ type: 'f', value: parseFloat(options.hue) },
						{ type: 'f', value: parseFloat(options.saturation) },
						{ type: 'f', value: parseFloat(options.luminance) },
						{ type: 'f', value: parseFloat(options.lightSourceDirection) },
						{ type: 'i', value: options.lightSourceAltitude },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderEnable = {
				label: 'SuperSource: Art Border Enable',
				options: [option.mode(), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/enable', [
						{ type: 'i', value: options.mode },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderBevelStyleSet = {
				label: 'SuperSource: Art Border Bevel Style Set',
				options: [
					option.list({
						label: 'Style',
						id: 'style',
						list: ['No Bevel', 'Bevel In Out', 'Bevel In', 'Bevel Out'],
						base: 1,
					}),
					option.superSource(context),
				],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 0 },
						{ type: 'i', value: options.style },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderOuterWidthSet = {
				label: 'SuperSource: Art Border Outer Width Set',
				options: [
					option.value({ label: 'Outer Width', id: 'outerWidth', min: 0, max: 16 }),
					option.superSource(context),
				],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 1 },
						{ type: 'i', value: options.outerWidth },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderInnerWidthSet = {
				label: 'SuperSource: Art Border Inner Width Set',
				options: [
					option.value({ label: 'Inner Width', id: 'innerWidth', min: 0, max: 16 }),
					option.superSource(context),
				],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 2 },
						{ type: 'i', value: options.innerWidth },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderOuterSoftnessSet = {
				label: 'SuperSource: Art Border Outer Softness Set',
				options: [option.value({ label: 'Outer Softness', id: 'outerSoftness', step: 1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 3 },
						{ type: 'i', value: options.outerSoftness },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderInnerSoftnessSet = {
				label: 'SuperSource: Art Border Inner Softness Set',
				options: [option.value({ label: 'Inner Softness', id: 'innerSoftness', step: 1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 4 },
						{ type: 'i', value: options.innerSoftness },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderBevelSoftnessSet = {
				label: 'SuperSource: Art Border Bevel Softness Set',
				options: [option.value({ label: 'Bevel Softness', id: 'bevelSoftness', step: 1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 5 },
						{ type: 'i', value: options.bevelSoftness },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderBevelPositionSet = {
				label: 'SuperSource: Art Border Bevel Position Set',
				options: [option.value({ label: 'Bevel Position', id: 'bevelPosition', step: 1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 6 },
						{ type: 'i', value: options.bevelPosition },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderHueSet = {
				label: 'SuperSource: Art Border Hue Set',
				options: [option.hue, option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 7 },
						{ type: 'i', value: options.hue },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderSaturationSet = {
				label: 'SuperSource: Art Border Saturation Set',
				options: [option.saturation(), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 8 },
						{ type: 'i', value: options.saturation },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderLuminanceSet = {
				label: 'SuperSource: Art Border Luminance Set',
				options: [option.luminance(), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 9 },
						{ type: 'i', value: options.luminance },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderLightSourceDirectionSet = {
				label: 'SuperSource: Art Border Light Source Direction Set',
				options: [
					option.value({ label: 'Light Source Direction', id: 'lightSourceDirection', min: 0, max: 360, step: 0.1 }),
					option.superSource(context),
				],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 10 },
						{ type: 'i', value: options.lightSourceDirection },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderLightSourceAltitudeSet = {
				label: 'SuperSource: Art Border Light Source Altitude Set',
				options: [
					option.value({ label: 'Light Source Altitude', id: 'lightSourceAltitude', step: 1 }),
					option.superSource(context),
				],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/set', [
						{ type: 'i', value: 11 },
						{ type: 'i', value: options.lightSourceAltitude },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderOuterWidthAdjust = {
				label: 'SuperSource: Art Border Outer Width Adjust',
				options: [option.value({ min: -16, max: 16 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 1 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderInnerWidthAdjust = {
				label: 'SuperSource: Art Border Inner Width Adjust',
				options: [option.value({ min: -16, max: 16 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 2 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderOuterSoftnessAdjust = {
				label: 'SuperSource: Art Border Outer Softness Adjust',
				options: [option.value({ min: -100, step: 1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 3 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderInnerSoftnessAdjust = {
				label: 'SuperSource: Art Border Inner Softness Adjust',
				options: [option.value({ min: -100, step: 1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 4 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderBevelSoftnessAdjust = {
				label: 'SuperSource: Art Border Bevel Softness Adjust',
				options: [option.value({ min: -100, step: 1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 5 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderBevelPositionAdjust = {
				label: 'SuperSource: Art Border Bevel Position Adjust',
				options: [option.value({ min: -100, step: 1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 6 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderHueAdjust = {
				label: 'SuperSource: Art Border Hue Adjust',
				options: [option.value({ min: -180, max: 180, step: 0.1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 7 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderSaturationAdjust = {
				label: 'SuperSource: Art Border Saturation Adjust',
				options: [option.value({ min: -100, max: 100, step: 0.1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 8 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderLuminanceAdjust = {
				label: 'SuperSource: Art Border Luminance Adjust',
				options: [option.value({ min: -100, max: 100, step: 0.1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 9 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderLightSourceDirectionAdjust = {
				label: 'SuperSource: Art Border Light Source Direction Adjust',
				options: [option.value({ min: -180, max: 180, step: 0.1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 10 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}

			actions.superSourceArtBorderLightSourceAltitudeAdjust = {
				label: 'SuperSource: Art Border Light Source Altitude Adjust',
				options: [option.value({ min: -100, max: 100, step: 1 }), option.superSource(context)],
				callback: ({ options }) => {
					context.oscSend('/mixeffect/ssrc/art/border/parameter/adjust', [
						{ type: 'i', value: 11 },
						{ type: 'i', value: options.value },
						{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
					])
				},
			}
		}

		actions.superSourceArtKey = {
			label: 'SuperSource: Art Key',
			options: [
				option.mode(),
				option.clip(),
				option.gain(),
				option.mode({ label: 'Invert Key', id: 'invertKey' }),
				option.superSource(context),
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/art/key', [
					{ type: 'i', value: options.mode },
					{ type: 'f', value: parseFloat(options.clip) },
					{ type: 'f', value: parseFloat(options.gain) },
					{ type: 'i', value: Number(options.invertKey) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceArtKeyClipGain = {
			label: 'SuperSource: Art Key Clip Gain',
			options: [option.clip(), option.gain(), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/art/key/clip-gain', [
					{ type: 'f', value: parseFloat(options.clip) },
					{ type: 'f', value: parseFloat(options.gain) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceArtKeyClipSet = {
			label: 'SuperSource: Art Key Clip Set',
			options: [option.clip(), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/art/key/clip/set', [
					{ type: 'f', value: parseFloat(options.clip) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceArtKeyClipAdjust = {
			label: 'SuperSource: Art Key Clip Adjust',
			options: [option.value({ min: -100, max: 100, step: 0.1 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/art/key/clip/adjust', [
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceArtKeyGainSet = {
			label: 'SuperSource: Art Key Gain Set',
			options: [option.gain(), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/art/key/gain/set', [
					{ type: 'f', value: parseFloat(options.gain) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceArtKeyGainAdjust = {
			label: 'SuperSource: Art Key Gain Adjust',
			options: [option.value({ min: -100, max: 100, step: 0.1 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/art/key/gain/adjust', [
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceArtKeyInvert = {
			label: 'SuperSource: Art Key Invert',
			options: [option.mode(), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/art/key/invert', [
					{ type: 'i', value: options.mode },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceArtKeyPreMultiplied = {
			label: 'SuperSource: Art Key Pre-Multiplied',
			options: [option.mode(), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/art/key/pre-multiplied', [
					{ type: 'i', value: options.mode },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceArtPlaceIn = {
			label: 'SuperSource: Art Place In',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					choices: [
						{ id: 1, label: 'Background' },
						{ id: 2, label: 'Foreground' },
						{ id: 3, label: 'Toggle' },
					],
					default: 1,
				},
				option.superSource(context),
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/art/place-in', [
					{ type: 'i', value: options.mode },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceAuto = {
			label: 'SuperSource: Auto',
			options: [option.superSource(context), option.mixEffectBus(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/auto', [
					{ type: 'i', value: options.superSource },
					{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
				])
			},
		}

		actions.superSourceBoxSelect = {
			label: 'SuperSource: Box Select',
			options: [option.box(context, false)],
			callback: ({ options }) => {
				context.updateVariable('box', options.box)
			},
		}

		actions.superSourceBoxCropTopSet = {
			label: 'SuperSource: Box Crop Top Set',
			options: [option.box(), option.value({ max: 18 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/crop/set', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'top' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxCropTopAdjust = {
			label: 'SuperSource: Box Crop Top Adjust',
			options: [option.box(), option.value({ min: -18, max: 18 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/crop/adjust', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'top' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxCropBottomSet = {
			label: 'SuperSource: Box Crop Bottom Set',
			options: [option.box(), option.value({ max: 18 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/crop/set', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'bottom' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxCropBottomAdjust = {
			label: 'SuperSource: Box Crop Bottom Adjust',
			options: [option.box(), option.value({ min: -18, max: 18 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/crop/adjust', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'bottom' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxCropLeftSet = {
			label: 'SuperSource: Box Crop Left Set',
			options: [option.box(), option.value({ max: 32 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/crop/set', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'left' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxCropLeftAdjust = {
			label: 'SuperSource: Box Crop Left Adjust',
			options: [option.box(), option.value({ min: -32, max: 32 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/crop/adjust', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'left' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxCropRightet = {
			label: 'SuperSource: Box Crop Right Set',
			options: [option.box(), option.value({ max: 32 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/crop/set', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'right' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxCropRightAdjust = {
			label: 'SuperSource: Box Crop Right Adjust',
			options: [option.box(), option.value({ min: -32, max: 32 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/crop/adjust', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'right' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxPositionXSet = {
			label: 'SuperSource: Box Position X Set',
			options: [option.box(), option.value({ min: -48, max: 48 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/position/set', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'x' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxPositionXAdjust = {
			label: 'SuperSource: Box Position X Adjust',
			options: [option.box(), option.value({ min: -48, max: 48 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/position/adjust', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'x' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxPositionYSet = {
			label: 'SuperSource: Box Position Y Set',
			options: [option.box(), option.value({ min: -27, max: 27 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/position/set', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'y' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxPositionYAdjust = {
			label: 'SuperSource: Box Position Y Adjust',
			options: [option.box(), option.value({ min: -27, max: 27 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/position/adjust', [
					{ type: 'i', value: options.box },
					{ type: 's', value: 'y' },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxSizeSet = {
			label: 'SuperSource: Box Size Set',
			options: [option.box(), option.value({ min: 0.07, max: 1 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/size/set', [
					{ type: 'i', value: options.box },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxSizeAdjust = {
			label: 'SuperSource: Box Size Adjust',
			options: [option.box(), option.value({ min: -1, max: 1 }), option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/size/adjust', [
					{ type: 'i', value: options.box },
					{ type: 'f', value: parseFloat(options.value) },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxSource = {
			label: 'SuperSource: Box Source',
			options: [
				{
					type: 'dropdown',
					label: 'Box',
					id: 'box',
					choices: generateChoices({ label: 'Box ', count: 4, selected: false }),
					default: 1,
				},
				{
					type: 'dropdown',
					label: 'Video Source',
					id: 'videoSource',
					default: 0,
					minChoicesForSearch: 0,
					choices: context.switcher.videoSources
						.filter((item) => item.availability.source & availability.source.superSourceBox)
						.map(({ id, label }) => ({ id, label })),
				},
				option.superSource(context),
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/source', [
					{ type: 'i', value: options.box },
					{ type: 'i', value: options.videoSource },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceBoxEnable = {
			label: 'SuperSource: Box Enable',
			options: [
				{
					type: 'dropdown',
					label: 'Box',
					id: 'box',
					choices: generateChoices({ label: 'Box ', count: 4, selected: false }),
					default: 1,
				},
				option.mode(),
				option.superSource(context),
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/enable', [
					{ type: 'i', value: options.box },
					{ type: 'i', value: options.mode },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceCascade = {
			label: 'SuperSource: Cascade',
			options: [
				{
					type: 'dropdown',
					label: 'Mode',
					id: 'mode',
					choices: [
						{ id: 'on', label: 'On' },
						{ id: 'off', label: 'Off' },
						{ id: 'toggle', label: 'Toggle' },
					],
					default: 'on',
					minChoicesForSearch: 0,
				},
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/cascade', [{ type: 's', value: options.mode }])
			},
		}

		actions.superSourceCascadePresets = {
			label: 'SuperSource: CascadePresets',
			options: [
				{
					type: 'textinput',
					label: 'Super Source 1',
					id: 'superSource1',
				},
				{
					type: 'textinput',
					label: 'Super Source 2',
					id: 'superSource2',
				},
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/cascade/presets', [
					{ type: 's', value: options.superSource1 },
					{ type: 's', value: options.superSource2 },
				])
			},
		}

		actions.superSourceCut = {
			label: 'SuperSource: Cut',
			options: [option.superSource(context), option.mixEffectBus(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/cut', [
					{ type: 'i', value: options.superSource },
					{ type: 'i', value: context.selectedOrValue('mix_effect_bus', options.mixEffectBus) },
				])
			},
		}

		actions.superSourceGrowHighlightedBox = {
			label: 'SuperSource: Grow Highlighted Box',
			options: [
				{
					type: 'dropdown',
					label: 'Grow To',
					id: 'growTo',
					choices: growChoices,
					default: '0.000',
					minChoicesForSearch: 0,
				},
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/grow-to', [{ type: 'f', value: parseFloat(options.growTo) }])
			},
		}

		actions.superSourceGrowHighlightedBoxBy = {
			label: 'SuperSource: Grow Highlighted Box By',
			options: [
				{
					type: 'number',
					label: 'Grow By (0 to 0.5)',
					id: 'growBy',
					min: 0,
					max: 0.5,
					step: 0.025,
					default: 0,
				},
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/grow-by', [{ type: 'f', value: parseFloat(options.growBy) }])
			},
		}

		actions.superSourceHighlight = {
			label: 'SuperSource: Highlight',
			options: [
				{
					type: 'dropdown',
					label: 'Box',
					id: 'box',
					choices: [{ id: 0, label: 'Reset' }, ...generateChoices({ label: 'Box ', count: 4, selected: false })],
					default: 1,
				},
				option.superSource(context),
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/highlight', [
					{ type: 'i', value: options.box },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourcePreset = {
			label: 'SuperSource: Preset',
			options: [
				{
					type: 'textinput',
					label: 'Preset Name',
					id: 'presetName',
				},
				option.superSource(context),
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/preset', [
					{ type: 's', value: options.presetName },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourcePresetPrevious = {
			label: 'SuperSource: Previous Preset',
			options: [option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/previous', [
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourcePresetNext = {
			label: 'SuperSource: Next Preset',
			options: [option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/next', [
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceShrinkOtherBoxes = {
			label: 'SuperSource: Shrink Other Boxes',
			options: [
				{
					type: 'dropdown',
					label: 'Shrink To',
					id: 'shrinkTo',
					choices: shrinkChoices,
					default: '0.000',
					minChoicesForSearch: 0,
				},
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/shrink-to', [{ type: 'f', value: parseFloat(options.shrinkTo) }])
			},
		}

		actions.superSourceShrinkOtherBoxesBy = {
			label: 'SuperSource: Shrink Other Boxes By',
			options: [
				{
					type: 'number',
					label: 'Shrink By (0 to 0.5)',
					id: 'shrinkBy',
					min: 0,
					max: 0.5,
					step: 0.025,
					default: 0,
				},
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/shrink-by', [{ type: 'f', value: parseFloat(options.shrinkBy) }])
			},
		}

		actions.superSourceSwap = {
			label: 'SuperSource: Swap',
			options: [option.superSource(context)],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/swap', [
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}

		actions.superSourceSwapBoxes = {
			label: 'SuperSource: Swap Boxes',
			options: [
				{
					type: 'dropdown',
					label: 'First Box',
					id: 'box1',
					choices: generateChoices({ label: 'Box ', count: 4, selected: false }),
					default: 1,
				},
				{
					type: 'dropdown',
					label: 'Second Box',
					id: 'box2',
					choices: generateChoices({ label: 'Box ', count: 4, selected: false }),
					default: 2,
				},
				option.superSource(context),
			],
			callback: ({ options }) => {
				context.oscSend('/mixeffect/ssrc/box/source', [
					{ type: 'i', value: options.box1 },
					{ type: 'i', value: options.box2 },
					{ type: 'i', value: context.selectedOrValue('supersource', options.superSource) },
				])
			},
		}
	}

	return actions
}

module.exports = {
	superSourceActions,
}
