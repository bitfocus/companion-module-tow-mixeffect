# companion-module-tow-mixeffect

![Build](https://img.shields.io/github/workflow/status/bitfocus/companion-module-tow-mixeffect/Release)
![Version](https://img.shields.io/github/package-json/v/bitfocus/companion-module-tow-mixeffect)
[![Compatibility](https://img.shields.io/badge/compatibility-MixEffect%20Pro%201.8.0-blue)](https://mixeffect.app)

[MixEffect](https://mixeffect.app/) is a professional tool for controlling Blackmagic ATEM switchers from your iPhone, iPad, or Apple Silicon Mac.

This module will allow you to control an instance of [MixEffect](https://mixeffect.app/) or [MixEffect Pro](https://mixeffectpro.app) using Companion 3.3 or later.

## System Requirements

The native MixEffect module for Companion requires Companion 3.3 or later, matching its module API 1.8 dependency.

**It will not work with prior versions of Companion 2.4.x.**

This module is optimized for use with MixEffect 1.8.0 and higher.

The ATEM Mini Extreme ISO G2 and ATEM 4 M/E Constellation 4K Plus profiles require MixEffect 2.4.0 or later. The Constellation IP models are not yet supported by MixEffect and are not included in this module.

Please see [the documentation](https://docs.mixeffect.app/automate/osc/companion/native-module) and [LICENSE](LICENSE) for more information.

## Development and releases

Use Node 18 and Yarn Classic for this API 1.x module. Run `yarn install --frozen-lockfile`, `yarn test`, and `yarn package` before testing the package in Companion. Automated tests check registration for every model, OSC routing boundaries, and model changes without sending commands to hardware.

For distribution, update the package version, push a matching Git tag, and submit that tag through the [Bitfocus Developer Portal](https://developer.bitfocus.io/). Follow the [current release guide](https://companion.free/for-developers/module-development/module-lifecycle/releasing-your-module/). Using the portal does not require migrating this module to API 2.x.
