# Architecture: a small Core with explicit ownership

This is a public explanation of a personal 12306 booking project. The architecture is local and command-driven: **one Booking Core coordinates multiple Campaigns; an independent Renewer maintains session health.** The shared storage, query gate and activity mechanisms are library boundaries, not additional services.

This page describes the selected written contract inspected on 2026-10-15. It does not claim that every design path has been validated online. The [source catalogue](../assets/evidence/source-catalog.json) binds the inspected materials; [validation](validation.md) binds historical results to their own versions.

## System shape

![System architecture](../diagrams/rendered/02-system-architecture.svg)

The Core combines task management, query scheduling, account admission, and protocol orchestration. The separate Renewer uses the same session and activity rules. A Core-to-platform edge represents non-inventory protocol or authoritative order reads; **inventory dispatch always uses the shared query gate**. The Renewer's requests have their own bounded renewal contract.

The CLI can read local committed facts without a live Core. A standalone public query uses the same inventory gate without starting Core. Setup, plain status, stop and resume are not reasons to launch a booking task. New run and eligible continue may start the unique Core as needed.

## Three different kinds of state

| Concept | Purpose | What it does not mean |
| --- | --- | --- |
| Campaign | A durable user intention: fixed target, explicit path, authorization and progress | A separate worker process, or a single network call |
| Attempt | One fixed-input attempt within a Campaign, including stage facts and consumed FINAL allowance | A fresh allowance after timeout or restart |
| AccountHold | Attributable, durable local business occupancy caused by an Attempt or known order | A physical lock, proof that a remote order exists, or proof it has expired |

A Campaign can contain multiple **serial** Attempts when normal control and all eligibility rules permit them. This is different from replaying an unresolved Attempt. Releasing a physical lease, releasing local occupancy, proving a remote outcome, and authorizing another Attempt are separate decisions.

## State ownership and write boundaries

| State | Logical writing boundary | Important reader constraint |
| --- | --- | --- |
| Request identity, accepted input, authorization binding, ACK | Consistent durable acceptance boundary | Retry the same identity and same input to recover the receipt; changed input is rejected |
| Campaign control and stop intent | Guarded business-fact commits | ACK confirms acceptance, not an order or even successful activation |
| Attempt, stage evidence, FINAL consumption | Guarded Attempt/fact commits; FINAL barrier before dispatch | A lost response does not refund FINAL |
| AccountHold and local-release evidence | Controlled account-Hold interfaces and revalidation | Release reasons do not rewrite the original Attempt, UNKNOWN or official lifecycle |
| Query subscriptions and pending work | Rebuildable Core-local scheduler | Safe inventory facts can be shared; private Candidate and permission cannot |
| Actual inventory dispatch | Shared durable query gate across entries | Core restart and extra Campaigns do not create extra dispatch allowances |
| Canonical Session and revision | Authorized setup/Attempt/Renewer writers through shared SessionStore rules | The Renewer is the only renewal actor, **not** the only Session writer |
| Status and notification projections | Derived from committed facts | Output or notification failure cannot reverse a proven business result |

The table names responsibilities, not a proposed class hierarchy or a new storage schema. The private implementation contains filesystem-based durable records and guarded publication. SQLite migration is outside this case study's verified scope.

## Actual code organization

The inspected package is JavaScript **ES Modules** with a Node.js CLI entry and Node's built-in test runner. It is not TypeScript, a microservice deployment, or a general workflow framework.

| Private package area | Responsibility represented in this case study |
| --- | --- |
| `bin/` | Public CLI entry |
| `lib/control/` | Parsing, acceptance, authorization, owner control, journal, stop and status |
| `lib/core/` | Scheduling, admission, execution orchestration, timing and reconciliation |
| `lib/query/` | Public inventory rounds, shared observations and query context |
| `lib/session/` and `lib/renewer/` | Human-assisted session preparation and independent session maintenance |
| `lib/account/` and `lib/attempt/` | Local business occupancy, Attempt identity and stage facts |
| `lib/protocol/` | Private Direct/HouBu integration and authoritative-result interpretation |
| `lib/foundation/` | Shared session, activity, dispatch, settlement and safe-output mechanisms |
| `tests/` | Contract, failure-interleaving, integration and isolated execution tests |

Directory names are genuine implementation areas, but one diagram block need not correspond to one directory or process. This repository intentionally includes no installable booking package.

## Shared observation, private execution

![Scheduling and admission](../diagrams/rendered/03-scheduling-and-admission.svg)

Same-key subscriptions merge pending inventory work. Different due keys receive fair service. An anonymous result can supply several tasks with safe Observation facts. An eligible opportunity still needs a private authenticated recheck and current target, authorization, stop, owner, health, activity and Hold checks before an Attempt proceeds.

The gate serializes real inventory requests and normally spaces their actual start times by at least 3 seconds. This is a **project rule**, not a claim about an official universal limit. The 2026-09-29 written amendment permits one narrowly qualified first priority authenticated recheck to bypass the usual start interval after the previous request has physically finished. Its durable credit is consumed only by an actual dispatch; restart or another Campaign cannot regenerate it. All other admission and serialization rules remain. This amended design is not presented here as independently verified online.

Waiting for a gate slot must not hold temporary account activity. An existing Hold does not stop other eligible Campaigns from fair anonymous observation; a real opportunity triggers the applicable bounded account-order check. Observing inventory does not permit a new business side effect.

## Control and uncertainty

Plain `status` is a local, read-only projection. Explicit `status --verify-login` and `status --refresh` have separately authorized, bounded semantics; their possible network access and controlled local Hold changes must not be attributed to plain status.

`stop` records intent against future unadmitted steps. `run --resume` checks the original identity, using trusted historical terminal evidence when available or permitted bounded reconciliation otherwise; it does not start Core or activate the Campaign. `run --continue` requests renewed observation only after all eligibility checks. It cannot erase UNKNOWN, restore consumed FINAL or repeat a completed goal.

The [engineering cases](engineering-decisions.md) explain why these distinctions matter to users. The [diagram index](../diagrams/README.md) records which older diagram semantics were deliberately corrected.

Sources: S01–S15 in the [catalogue](../assets/evidence/source-catalog.json). Historical validation is separately identified below in the [evidence matrix](validation.md).
