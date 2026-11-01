# Comparing variable and feedback performance

Run the same JSON through v2.1.1 and the current candidate. The benchmark makes no HTTP requests and sends no commands to MixEffect or a switcher. It extracts the old `src` tree into an ignored temporary folder and runs each version in a separate Node process using the installed **real Companion base 1.14 library**. A receiver counts actual IPC messages and serialized bytes. Simulated placed button feedbacks use the real base feedback manager and module callbacks.

Use the project's Node 22 / Yarn 4 environment. The repository must include the v2.1.1 tag (`git fetch origin tag v2.1.1` if needed):

```sh
yarn benchmark --iterations 7 --warmup 2 --output /tmp/mixeffect-performance.json
```

By default this uses a synthetic 4 M/E Constellation 4K Plus response with approximately 200 KB of JSON and ten simulated buttons per feedback type. It tests initialization, the first poll, an identical poll, and one changed AUX source. Each measured poll includes JSON decoding. Both versions must finish every case with identical declared variable values; the comparison fails otherwise.

The report includes median/p95 synchronous processing time, worker CPU time (including asynchronous feedback checks and IPC queue drain), actual variable IPC messages, feedback-check requests, executed feedback callbacks, total IPC messages, and serialized bytes. It records the baseline/candidate commits, whether the candidate has uncommitted changes, the input hash, and individual samples. IPC bytes exclude transport framing and benchmark control messages. CPU time excludes idle waiting; processing time excludes the fixed 40 ms feedback-settling wait. Sample-based p95 values from short runs are approximate.

## Use your switcher's actual JSON

Save a response from MixEffect's existing HTTP feedback endpoint. For example, replace `MIXEFFECT_IP` and the port with your settings:

```sh
curl --fail --max-time 10 'http://MIXEFFECT_IP:8080/feedback' --output /tmp/mixeffect-feedback.json
yarn benchmark --model MODEL_ID --input /tmp/mixeffect-feedback.json --iterations 7 --warmup 2 --output /tmp/mixeffect-performance.json
```

Choose the same model as your Companion connection; model IDs are in `src/switchers/types.js`. The original JSON is used for both versions. The single-change case modifies an in-memory copy of the last AUX's source; it never modifies MixEffect. That case is omitted when no numeric AUX source is present. `--buttons N` adjusts the number of simulated buttons per feedback type (zero tests variables without placed feedbacks). JSON may contain your source/macro names; keep captures outside Git. Reports contain hashes and measurements, not the captured JSON.

## What this establishes, and the remaining live check

This measures variable initialization and `updateState` processing with the real base-library/IPC workload. It excludes the HTTP polling loop and status notifications, connection scheduling, Companion's rendering/database, and other modules. Simulated feedback placements are not your exact button layout. Replay one real response as well as the large synthetic fixture for a comparison relevant to your hardware.

For a live comparison, use the same Companion installation, module configuration, model, 500 ms polling interval, and button layout. Keep one MixEffect connection enabled at a time. Run 2.1.1 and the candidate separately for about a minute each, first with the switcher idle and then with equivalent program/preview and AUX changes. Compare module-process CPU (and optionally Companion total CPU), and verify button feedbacks stay correct and responsive. Change a locally selected bus/keyer while switcher state is idle to check selection-dependent feedbacks. Repeat in reverse version order if CPU differences are small. If using a smaller physical switcher, expect a smaller absolute gain than the large synthetic test.

After the same-interval comparison, optionally try the candidate at 100 ms (the new minimum). The default remains 500 ms. Measure this separately: faster polling increases MixEffect/network work even when Companion receives no changed variable values. The replay benchmark does not establish the server's response speed or sustainable live polling rate.

Use call counts and value-equivalence tests as repeatable regression checks. Treat timing numbers as measurements for that machine/workload, rather than fixed pass/fail thresholds or a promise about Companion's overall CPU usage.
