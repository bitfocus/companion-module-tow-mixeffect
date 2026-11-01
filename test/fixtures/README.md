# Feedback regression data

`feedback.json` is synthetic JSON using the existing MixEffect polling structure. It covers each parser branch, including Fairlight processing/equalizer bands, legacy audio, SuperSource boxes, transitions, keyers, media, macros, and routing. It is not a capture from physical hardware.

`fairlight-values.json` and `legacy-values.json` were captured by running the **v2.1.1** parser against that JSON for the 4 M/E Constellation 4K Plus and Production Studio 4K profiles respectively, retaining only declared variables. The tests require the optimized parser to produce the same values without modifying the input.

A separate test expands the same JSON to the 4K Plus model's source/output/keyer capacities. It checks batching and unchanged/single-field updates without relying on machine-dependent timing assertions.
