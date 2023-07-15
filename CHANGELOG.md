## [2.0.3](https://github.com/bitfocus/companion-module-tow-mixeffect/compare/v2.0.2...v2.0.3) (2023-07-15)


### Bug Fixes

* upgrade scripts ([a0084dc](https://github.com/bitfocus/companion-module-tow-mixeffect/commit/a0084dc97a6eb0705717f11cc1d4fac984592c46))

## [2.0.2]() (2023-06-14)

* Fix bug where selected SuperSource Box feedback would not work.

## [2.0.1]() (2023-04-10)

* Compatibility with Companion 3.0.

## [2.0.0]() (2023-03-20)

* Compatibility with Companion 3.0.
* Support for ATEM Television Studio HD8 and HD8 ISO switchers.
* HTTP feedback server support
* Removed OSC feedback support
* Variables

## [1.2.0](https://github.com/bitfocus/companion-module-tow-mixeffect/compare/v1.1.9...v1.2.0) (2023-03-20)

* Selected ME preview and program variable + feedback ([989a61a](https://github.com/bitfocus/companion-module-tow-mixeffect/commit/989a61a0b3505158da7ffdce355d92582ee079e2))

## [1.1.6](https://github.com/bitfocus/companion-module-tow-mixeffect/compare/v1.1.5...v1.1.6) (2022-02-13)

### Reverts

* Revert "bulk replace system.emit calls" ([370dbfe](https://github.com/bitfocus/companion-module-tow-mixeffect/commit/370dbfe15ed98cee197b8df833ce2faa7f52f4c1))

## [1.1.3](https://github.com/bitfocus/companion-module-tow-mixeffect/compare/v1.1.2...v1.1.3) (2021-12-09)


### Bug Fixes

* **switchers:** various fixes to switch configs ([2eebc09](https://github.com/bitfocus/companion-module-tow-mixeffect/commit/2eebc094f418c8fbaf26f1ed7f6de5517e3dbc89)), closes [#4](https://github.com/bitfocus/companion-module-tow-mixeffect/issues/4) [#5](https://github.com/bitfocus/companion-module-tow-mixeffect/issues/5)

## [1.1.1](https://github.com/bitfocus/companion-module-tow-mixeffect/compare/v1.1.0...v1.1.1) (2021-11-11)


### Bug Fixes

* **variables:** correct default value keys for mp, me, box and ssrc ([01956e3](https://github.com/bitfocus/companion-module-tow-mixeffect/commit/01956e39fa144c09e9e53b4fb64c7e9a9a92ca99))

# [1.1.0](https://github.com/estilles/companion-module-tow-mixeffect/compare/v1.0.2...v1.1.0) (2021-11-08)


### Bug Fixes

* 'Transition: Wipe Symmetry Set' action missing ([aa1a387](https://github.com/estilles/companion-module-tow-mixeffect/commit/aa1a3872c90d9043f692f0ef2f6817dd83ccba8d))
* add color generators to key/fill sources in transition actions ([192b003](https://github.com/estilles/companion-module-tow-mixeffect/commit/192b0032c3ed5d23c58164c01cfedb26a254a95b))
* **config:** detect missing configuration ([eb0a75d](https://github.com/estilles/companion-module-tow-mixeffect/commit/eb0a75d9ff40b6735054a0b9526d9aba69b08179))
* correct 'Toggle' misspelled in mode dropdowns ([739eb04](https://github.com/estilles/companion-module-tow-mixeffect/commit/739eb0415654b943dacedb99d4463ac492a49353))
* **macro-actions:** corrected mode option in 'Macro: Loop' action ([cc9b058](https://github.com/estilles/companion-module-tow-mixeffect/commit/cc9b05860901f7fccc4a281b60dd8a2b87da44a2))
* **multiviewer:** correct filename ([e942a64](https://github.com/estilles/companion-module-tow-mixeffect/commit/e942a64d508f67ddafa305ccbf3a5694464c88cc))
* **multiviewer:** correct typo ([b7319f1](https://github.com/estilles/companion-module-tow-mixeffect/commit/b7319f167aceeddcffd3648228babfcf5e98553b))
* **multiviewer:** remove old file ([198f9a8](https://github.com/estilles/companion-module-tow-mixeffect/commit/198f9a87963ddcab9ae504434cdc1cbbbe72685f))
* **multiview:** fix typo on advanced layout 4 ([6094847](https://github.com/estilles/companion-module-tow-mixeffect/commit/60948475ff5418bbd852690b056f9615fb72e85a))
* pattern option now displays dropdown ([01bb853](https://github.com/estilles/companion-module-tow-mixeffect/commit/01bb853a63c02738b1c8751cf0396c83232277cd))
* **presets:** fix 'App: Switcher Section' presets ([3f69e2e](https://github.com/estilles/companion-module-tow-mixeffect/commit/3f69e2e2f4982c29c3530455a62e968d9ba047e0))
* **presets:** update category names ([711945b](https://github.com/estilles/companion-module-tow-mixeffect/commit/711945b44cc457caa52c69255443a20d824be17b))
* **presets:** update MixEffect App presets to match action changes ([7018097](https://github.com/estilles/companion-module-tow-mixeffect/commit/70180979013fe85437b0ab7ceb56edf5ec839a54))
* **presets:** update SuperSource: Highlight presets ([9dd5d13](https://github.com/estilles/companion-module-tow-mixeffect/commit/9dd5d13f6b5b5533a3d60e2402490fa15d93e35c))
* **preset:** update labels on VFA presets ([34be5f1](https://github.com/estilles/companion-module-tow-mixeffect/commit/34be5f1064c084558f44f2fd01533d11d1a057f3))
* **preset:** update Transitions presets ([a7891fd](https://github.com/estilles/companion-module-tow-mixeffect/commit/a7891fd1b28f4a31cb3cd557741e2e940519dbc5))
* remove color generators from key source lists ([5cc43dd](https://github.com/estilles/companion-module-tow-mixeffect/commit/5cc43ddb1f157e5798da54ebfebd3b3d764ab103))
* remove mode from 'DSK: Mask action', not longer used ([86925b7](https://github.com/estilles/companion-module-tow-mixeffect/commit/86925b7427cb5e3f049f41e83cb4874a4f57b7a8))
* **supersource:** add missing 'Selected Box' option to all 'Box' dropdowns ([553c84e](https://github.com/estilles/companion-module-tow-mixeffect/commit/553c84e76983e165c92b74c33688b819c031b46a))
* **supersource:** add missing 'SuperSource: Select' action ([0d879d1](https://github.com/estilles/companion-module-tow-mixeffect/commit/0d879d11ef637fe86be27c61f9d7d3d3c751a3d6))
* **supersource:** fix 'SuperSource: Swap Boxes' action OSC path ([f105346](https://github.com/estilles/companion-module-tow-mixeffect/commit/f105346ee312e0f201735a96157ba1ebf0f890f6))
* **switchers:** change number of aux buses for Constellation 8K to 24 ([7b78f1a](https://github.com/estilles/companion-module-tow-mixeffect/commit/7b78f1a9912b70789618e53237a6301a86344656))
* **transition:** add 'Selected Key' to Key option dropdown ([5a42175](https://github.com/estilles/companion-module-tow-mixeffect/commit/5a421754e865708e3a3a92afaf836c829226b730))
* **transition:** enable 'Transition: Next' to use the selected USK ([f805483](https://github.com/estilles/companion-module-tow-mixeffect/commit/f805483700558b977519b6f5f56fb85ecae00d8b))
* **usk:** add missing 'USK: Selecte' action ([98c056b](https://github.com/estilles/companion-module-tow-mixeffect/commit/98c056bca57a70651fb543bb336dd65438bf046b))
* **usk:** add missing pattern in 'USK: Pattern Style' action ([4b490e6](https://github.com/estilles/companion-module-tow-mixeffect/commit/4b490e65ce5a6703e4bf8612c8bc8fbfda4a94c9))
* **usk:** correct missing 'USK: Chroma Advanced Red Set' action ([ec4e86b](https://github.com/estilles/companion-module-tow-mixeffect/commit/ec4e86bf124da4f1c233b8cb486b991e550e3abf))
* **usk:** fix missing 'USK: Pattern Size Set' action ([77bf76b](https://github.com/estilles/companion-module-tow-mixeffect/commit/77bf76b32e8e1773ef41ab1e42ba6824daa1be14))


### Features

* **actions:** show 'Selected ...' option when only one option is available ([12c9404](https://github.com/estilles/companion-module-tow-mixeffect/commit/12c9404a9a36b892644ee4ff50b00f1931d67434))
* add actions/feedbacks/variables/presets for MixEffect 1.2.x ([c20799b](https://github.com/estilles/companion-module-tow-mixeffect/commit/c20799b85d1a307620177e5645421234f9f4afa0))
* add select color generator variable/action/feedback ([db8f056](https://github.com/estilles/companion-module-tow-mixeffect/commit/db8f0565a13dd21a823dcb34f963cf7d484b8919))
* add selected aux variable/action/feedback ([6226a41](https://github.com/estilles/companion-module-tow-mixeffect/commit/6226a41859b8393c7c59141923788c19fda01d98))
* **multiviewer:** add select multi viewer variable/action/feedback ([3b3eca5](https://github.com/estilles/companion-module-tow-mixeffect/commit/3b3eca5a9f2582a96990d8fbe5ec5e7991d8de23))
* **presets:** add multi viewer presets ([b51debf](https://github.com/estilles/companion-module-tow-mixeffect/commit/b51debf474febdb91e3c7dc55decef238bd0900c))
* **supersource:** add 'SuperSource: Box Select' action ([117fbe7](https://github.com/estilles/companion-module-tow-mixeffect/commit/117fbe79deac4652aedbe840fce3f766673a1188))

# [1.1.0-beta.11](https://github.com/estilles/companion-module-tow-mixeffect/compare/v1.1.0-beta.10...v1.1.0-beta.11) (2021-11-07)


### Bug Fixes

* **multiviewer:** correct typo ([b7319f1](https://github.com/estilles/companion-module-tow-mixeffect/commit/b7319f167aceeddcffd3648228babfcf5e98553b))
* **presets:** fix 'App: Switcher Section' presets ([3f69e2e](https://github.com/estilles/companion-module-tow-mixeffect/commit/3f69e2e2f4982c29c3530455a62e968d9ba047e0))
* **presets:** update category names ([711945b](https://github.com/estilles/companion-module-tow-mixeffect/commit/711945b44cc457caa52c69255443a20d824be17b))
* **presets:** update MixEffect App presets to match action changes ([7018097](https://github.com/estilles/companion-module-tow-mixeffect/commit/70180979013fe85437b0ab7ceb56edf5ec839a54))
* **presets:** update SuperSource: Highlight presets ([9dd5d13](https://github.com/estilles/companion-module-tow-mixeffect/commit/9dd5d13f6b5b5533a3d60e2402490fa15d93e35c))
* **preset:** update labels on VFA presets ([34be5f1](https://github.com/estilles/companion-module-tow-mixeffect/commit/34be5f1064c084558f44f2fd01533d11d1a057f3))
* **preset:** update Transitions presets ([a7891fd](https://github.com/estilles/companion-module-tow-mixeffect/commit/a7891fd1b28f4a31cb3cd557741e2e940519dbc5))


### Features

* **presets:** add multi viewer presets ([b51debf](https://github.com/estilles/companion-module-tow-mixeffect/commit/b51debf474febdb91e3c7dc55decef238bd0900c))

# [1.1.0-beta.10](https://github.com/estilles/companion-module-tow-mixeffect/compare/v1.1.0-beta.9...v1.1.0-beta.10) (2021-11-07)


### Bug Fixes

* **multiviewer:** remove old file ([198f9a8](https://github.com/estilles/companion-module-tow-mixeffect/commit/198f9a87963ddcab9ae504434cdc1cbbbe72685f))

# [1.1.0-beta.9](https://github.com/estilles/companion-module-tow-mixeffect/compare/v1.1.0-beta.8...v1.1.0-beta.9) (2021-11-06)


### Bug Fixes

* **config:** detect missing configuration ([eb0a75d](https://github.com/estilles/companion-module-tow-mixeffect/commit/eb0a75d9ff40b6735054a0b9526d9aba69b08179))
* **multiviewer:** correct filename ([e942a64](https://github.com/estilles/companion-module-tow-mixeffect/commit/e942a64d508f67ddafa305ccbf3a5694464c88cc))

# [1.1.0-beta.8](https://github.com/estilles/companion-module-tow-mixeffect/compare/v1.1.0-beta.7...v1.1.0-beta.8) (2021-11-06)


### Bug Fixes

* **multiview:** fix typo on advanced layout 4 ([6094847](https://github.com/estilles/companion-module-tow-mixeffect/commit/60948475ff5418bbd852690b056f9615fb72e85a))
* **supersource:** fix 'SuperSource: Swap Boxes' action OSC path ([f105346](https://github.com/estilles/companion-module-tow-mixeffect/commit/f105346ee312e0f201735a96157ba1ebf0f890f6))
* **switchers:** change number of aux buses for Constellation 8K to 24 ([7b78f1a](https://github.com/estilles/companion-module-tow-mixeffect/commit/7b78f1a9912b70789618e53237a6301a86344656))
* **transition:** enable 'Transition: Next' to use the selected USK ([f805483](https://github.com/estilles/companion-module-tow-mixeffect/commit/f805483700558b977519b6f5f56fb85ecae00d8b))


### Features

* **multiviewer:** add select multi viewer variable/action/feedback ([3b3eca5](https://github.com/estilles/companion-module-tow-mixeffect/commit/3b3eca5a9f2582a96990d8fbe5ec5e7991d8de23))

# [1.1.0-beta.7](https://github.com/estilles/companion-module-tow-mixeffect/compare/v1.1.0-beta.6...v1.1.0-beta.7) (2021-11-04)


### Bug Fixes

* **supersource:** add missing 'Selected Box' option to all 'Box' dropdowns ([553c84e](https://github.com/estilles/companion-module-tow-mixeffect/commit/553c84e76983e165c92b74c33688b819c031b46a))
* **supersource:** add missing 'SuperSource: Select' action ([0d879d1](https://github.com/estilles/companion-module-tow-mixeffect/commit/0d879d11ef637fe86be27c61f9d7d3d3c751a3d6))
* **usk:** add missing pattern in 'USK: Pattern Style' action ([4b490e6](https://github.com/estilles/companion-module-tow-mixeffect/commit/4b490e65ce5a6703e4bf8612c8bc8fbfda4a94c9))
* **usk:** correct missing 'USK: Chroma Advanced Red Set' action ([ec4e86b](https://github.com/estilles/companion-module-tow-mixeffect/commit/ec4e86bf124da4f1c233b8cb486b991e550e3abf))
* **usk:** fix missing 'USK: Pattern Size Set' action ([77bf76b](https://github.com/estilles/companion-module-tow-mixeffect/commit/77bf76b32e8e1773ef41ab1e42ba6824daa1be14))


### Features

* **supersource:** add 'SuperSource: Box Select' action ([117fbe7](https://github.com/estilles/companion-module-tow-mixeffect/commit/117fbe79deac4652aedbe840fce3f766673a1188))

# [1.1.0-beta.6](https://github.com/estilles/companion-module-tow-mixeffect/compare/v1.1.0-beta.5...v1.1.0-beta.6) (2021-11-03)


### Bug Fixes

* remove color generators from key source lists ([5cc43dd](https://github.com/estilles/companion-module-tow-mixeffect/commit/5cc43ddb1f157e5798da54ebfebd3b3d764ab103))
* **transition:** add 'Selected Key' to Key option dropdown ([5a42175](https://github.com/estilles/companion-module-tow-mixeffect/commit/5a421754e865708e3a3a92afaf836c829226b730))
* **usk:** add missing 'USK: Selecte' action ([98c056b](https://github.com/estilles/companion-module-tow-mixeffect/commit/98c056bca57a70651fb543bb336dd65438bf046b))
