# Historical controlled use

These are **selective summaries of private historical reports**, inspected on 2026-10-15. They are not fresh runs, raw authority responses, screenshots, or independent reproductions. Account, passenger, route, train, Campaign and order identifiers are omitted. The original 2026-09-27/28 installed products differ from both the earlier A3 build and the later inspected source snapshot.

## H-DIRECT · Awaiting payment

| Field | Selected historical evidence |
| --- | --- |
| Run date | 2026-09-28 |
| Input and scenario | One explicitly authorized Direct Campaign with one fixed target and one selected passenger |
| Historical install label | `control-refresh-20260928-v2` |
| Installation source commit | `88235868e878631eb0a69bbadf1d4a71d537f566` |
| Package archive SHA-256 | `751c5f1e8f70bc0e25ff52d61f49609f0b281f287bc08909bc156ba462d9d5f4` |
| Validation method | Historical installed public-CLI execution, subsequent public status and separately recorded installation pairing |
| Observed business result | `DIRECT_ORDER_CREATED / AWAITING_PAYMENT`; FINAL taken and dispatched once; one associated order reference, without a source conflict |
| Control result | The task deactivated on observed durable order evidence; Core released; local Hold remained |
| Human boundary | The agent did not pay or cancel; payment was left to the user |
| Source identities | S22: controlled-run report; S23: installation pairing report in the [catalogue](source-catalog.json) |

**Material limitations:** temporary `RENEWER_REVISION_DRIFT` appeared during the run. A subsequent complete renewal restored the reported health eligibility; this is not continuous-health proof. The installation report records an initial full-suite failure and a targeted correction, and explicitly does **not** claim a final full-suite rerun. This example establishes one target-specific handoff to payment, not payment completion, all-target compatibility or long-term reliability.

The installation pairing is documentary: this edition read the two historical records and matched their installation label. It did not rehash the old installed binary or reproduce the transaction.

## H-HOUBU · Awaiting prepayment

| Field | Selected historical evidence |
| --- | --- |
| Run date | 2026-09-27 |
| Input and scenario | One explicitly authorized HouBu Campaign; one passenger; fixed six-hour cutoff, no standing-seat acceptance, no added train |
| Historical install label | `five-stage-20260927-v1` |
| Accepted installation candidate | `sha256:f4db26e82a459f117dfac78bb3a45d5969c66af05d4f5cf1237edd702e62b01e` |
| Package archive SHA-256 | `9dc29fda1da5a70a0a96a9799a002b4144838d12ce7b57410a458667e77efbdf` |
| Validation method | Historical installed public-CLI execution; selective stage/authority evidence and installation pairing |
| Observed business result | `HOUBU_QUEUED` with confirmed `AWAITING_PREPAYMENT`, complete target/option checks and attribution to the original Attempt |
| Submission and reconciliation | One FINAL barrier, one actual confirmation dispatch; six subsequent bounded reads before full association was established |
| Control result | Explicit stop confirmed; activity absent; local Hold retained |
| Human boundary | No agent payment, prepayment or cancellation |
| Source identities | S24: corrected run report; S25: selective run result; S26: installation pairing report in the [catalogue](source-catalog.json) |

**Material correction:** the historical report initially described the FINAL result summary's UNKNOWN as an unknown original response. Its later read-only causal correction states that the original confirmation was recorded as DISPATCHED, while a later result-summary assignment overwrote the displayed classification with UNKNOWN. The later authoritative awaiting-prepayment result was separately supported. This case must not be retold as a proven lost-response recovery experiment.

**Other limitations:** initial process liveness did not establish current session readiness. The report identified health/session revision mismatch as a supported refusal condition, but the complete contemporaneous qualification vector was not frozen, so it did not establish a unique root cause. The installation record preserves two failures in an earlier full run and records affected-file closure rather than claiming a final whole-suite pass. One passenger and one option combination do not establish coverage of every permitted cutoff or passenger combination.

A waitlist request awaiting prepayment is **not** a fulfilled booking or ticket allocation. These reports do not prove payment, subsequent fulfillment, all recovery branches or current readiness.
