# Validation: what each kind of evidence establishes

This case study separates **design**, **implementation**, **historical validation**, **controlled actual use**, and **checks of this public edition**. They answer different questions. A diagram is not a passing test; an installation switch is not a business result; a historical success is not proof of current readiness.

## Evidence matrix

| Evidence | Version and method | Result supported | Not established |
| --- | --- | --- | --- |
| Written architecture and five public views | Contract and source snapshot inspected on 2026-10-15; S01–S08 | Documented boundaries, ownership and selected recovery decisions | Complete implementation or online branch coverage |
| Code map and two function excerpts | S09–S15, identified by file hashes; verbatim excerpts from S10 | Actual implementation areas and a small protocol-independent implementation sample | Whole-system behavior, crash safety or measured booking latency |
| [H-A3 · Historical offline acceptance](../assets/evidence/historical-offline.md) | 2026-09-20; fixed build/package; S20–S21 | Recorded 21 passing gates and 1,494 passing tests for that historical offline scope | Later products, current source, or online acceptance |
| [H-DIRECT · Controlled Direct use](../assets/evidence/controlled-use.md#h-direct--awaiting-payment) | 2026-09-28; historical install pairing; S22–S23 | One attributed awaiting-payment result and automatic task deactivation | Payment, all targets, continuous health or final full-suite acceptance |
| [H-HOUBU · Controlled HouBu use](../assets/evidence/controlled-use.md#h-houbu--awaiting-prepayment) | 2026-09-27; historical install pairing; S24–S26 | One attributed awaiting-prepayment result, one FINAL dispatch, bounded subsequent reads | Ticket fulfillment, a genuine lost-response experiment, every passenger/option combination |
| [Public-edition checks](../assets/evidence/local-checks.json) | Current documentation checker and two pure functions with synthetic inputs | File/link consistency, excerpt identities, selected function behavior and render inventories | Private integration tests or new official-platform requests |

The source catalogue's snapshot commit identifies what was **inspected for writing**. Historical candidate, build and archive identities identify different objects. A package version string alone is not sufficient to claim byte identity across these stages.

## Scenarios worth examining

The inspected private tree contains targeted test definitions for lost ACK delivery, durable fact projection, shared scheduling, bounded timing, and resume/continue restrictions. Their source IDs are S16–S19. Reading a test definition does not prove that it passed, and this edition does not rerun the private suite.

The three engineering cases therefore link implementation sources separately from historical acceptance summaries. No claim is made that the 2026-09-20 test total covers every later contract amendment. Test counts from different runs are not added together.

## Reproduce the public checks

Requirements: Node.js with built-in test/VM/filesystem support. No npm install, booking credentials or private-project access is needed.

```sh
node scripts/check.mjs
```

The checker reads this repository, extracts the two marked JavaScript functions, verifies their content identities and exercises synthetic inputs in an isolated VM context. It also checks public relative links, required evidence, export presence and common disclosure patterns. It prints JSON without rewriting evidence.

For a maintainer preparing a new recorded edition:

```sh
node scripts/check.mjs --record
```

This additionally writes the local check record. It is a documentation-verification utility, not a public booking API. It does not load the private package, call the network or access an external state root. The excerpt hashes bind the published excerpts to the inspected originals; the default public check can verify the published hashes, while the source-to-excerpt comparison was done locally when preparing this edition.

Regenerating all ten diagram exports requires an already installed Mermaid CLI:

```sh
bash scripts/render-diagrams.sh
```

The render script installs nothing. Rendered SVG/PNG pairs and their Mermaid inputs are checked as part of this edition. The local check record reports byte hashes, rather than treating file presence as proof of semantic correctness.

## First-edition verification boundaries

- Original source files were read only. Private business tests, live commands, formatters and builds were not run for this case study.
- Both published functions were compared with their original source text. Their local tests cover deadline selection/invalid inputs and clock-transition classification; they do not test the Core caller's latching, persistence, fencing or recovery behavior.
- All five diagrams were syntax-rendered, checked for registered identities and dangling/conditional edges, and visually inspected as actual exports. These checks assess the public views, not product execution.
- The edition was self-reviewed by its authoring agent. It does not carry a fresh independent-review verdict.
- The disclosure checker is a bounded pattern scan, supplemented by manual inspection of the selected text and SVG. It is not a guarantee that every conceivable sensitive pattern can be detected automatically.
- The private runtime bundles, original passenger/order evidence and complete test logs are not redistributed. Public verification cannot reproduce their claims from hashes alone.

## Preserved limitations

The historical installation reports explicitly do not claim final whole-suite reruns after targeted corrections. Historical health-readiness anomalies and the HouBu summary-classification correction remain in the [controlled-use summary](../assets/evidence/controlled-use.md).

No new official requests, payments, cancellations, installations or source-state changes were made to prepare this edition. No performance SLA, universal exactly-once guarantee, full MVP acceptance, SQLite migration completion or long-term continuous readiness is claimed.
