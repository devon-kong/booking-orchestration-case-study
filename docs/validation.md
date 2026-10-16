# Validation: what each kind of evidence establishes

This case study separates **design**, **implementation**, **historical validation**, **controlled actual use**, and **checks of this public edition**. They answer different questions. A diagram is not a passing test; an installation switch is not a business result; a historical success is not proof of current readiness.

## Real-platform results first

The documented historical Direct and HouBu workflows completed selected real-platform validation: an order awaiting manual payment and an attributed waitlist request awaiting manual prepayment. These business results are distinct from the earlier offline acceptance and this repository's present checks. They do not establish payment, ticket fulfillment or all-scenario production readiness.

## Evidence matrix

| Evidence | Version and method | Result supported | Not established |
| --- | --- | --- | --- |
| Written architecture and five public views | Contract and source snapshot inspected on 2026-10-15; S01–S08 | Documented boundaries, ownership and selected recovery decisions | Complete implementation or online branch coverage |
| Code map and two function excerpts | S09–S15, identified by file hashes; verbatim excerpts from S10 | Actual implementation areas and a small protocol-independent implementation sample | Whole-system behavior, crash safety or measured booking latency |
| [H-DIRECT · Controlled Direct use](../assets/evidence/controlled-use.md#h-direct--awaiting-payment) | 2026-09-28; historical install pairing; S22–S23 | One attributed awaiting-payment result and automatic task deactivation | Payment, all targets, continuous health or final full-suite acceptance |
| [H-HOUBU · Controlled HouBu use](../assets/evidence/controlled-use.md#h-houbu--awaiting-prepayment) | 2026-09-27; historical install pairing; S24–S26 | One attributed awaiting-prepayment result, one FINAL dispatch, bounded subsequent reads | Ticket fulfillment, a genuine lost-response experiment, every passenger/option combination |
| [H-A3 · Historical offline acceptance](../assets/evidence/historical-offline.md) | 2026-09-20; fixed build/package; S20–S21 | Recorded 21 passing gates and 1,494 passing tests for that historical offline scope | Later products, current source, or online acceptance |
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

The checker reads this repository, extracts the two marked JavaScript functions, verifies their content identities and exercises synthetic inputs in an isolated VM context. It also checks public relative links, required evidence, export presence and common disclosure patterns. It prints JSON without rewriting evidence. A successful default run also requires the recorded input-file inventory and every SHA-256 to match the current edition. Changed, added or removed public files produce a stale-record failure; review the changes and record the new edition before presenting its checks as current.

Official background citations must match exact HTTPS URLs in the public context catalogue and approved official hosts. The checker validates that reference policy offline; it does not test remote availability. The five selected views and the two homepage overview images remain required, while additional views and images are allowed and their exports checked.

For a maintainer preparing a new recorded edition:

```sh
node scripts/check.mjs --record
```

This additionally writes a new local check record only after all content checks pass. Run the default check again to verify the recorded edition. It is a documentation-verification utility, not a public booking API. It does not load the private package, call the network or access an external state root. The excerpt hashes bind the published excerpts to the inspected originals; the default public check can verify the published hashes, while the source-to-excerpt comparison was done locally when preparing this edition.

Regression checks for stale records, official links and diagram expansion run only against temporary public-repository copies:

```sh
node --test scripts/check.test.mjs
```

Regenerating the selected diagram exports requires an already installed Mermaid CLI:

```sh
bash scripts/render-diagrams.sh
```

The render script installs nothing. Rendered SVG/PNG pairs and their Mermaid inputs are checked as part of this edition. The local check record reports byte hashes, rather than treating file presence as proof of semantic correctness.

## Portfolio R1 · 2026-10-16

This presentation revision moves real-platform outcomes ahead of the earlier offline result, supplies [official platform context](platform-context.md), distinguishes Direct/HouBu handoffs in the journey, and adds a [traceable reliability walkthrough](engineering-decisions.md#reliability-walkthrough-unknown-does-not-mean-retry). S15 and S19 were re-read and matched their recorded hashes; no claim of a refreshed whole private-source snapshot is made. The original historical run summaries, failures and health anomalies remain intact.

The current check record binds the public file bytes and diagram exports. Its checks cover content consistency and the two published pure functions. The separate checker regression suite exercises temporary file changes and reference policy; its results are reported at delivery, not included in the pure-function count. Rendering and visual inspection assess the diagrams; no private business tests or live booking requests were run.

## Visual evidence follow-up

**Current status: textual run summaries and explanatory diagrams only. No real CLI screenshot or result screenshot is included.** The online claims rest on the dated curated summaries, not on pictures of a new run.

| Material to add | Evidence and privacy requirements | Completion criterion |
| --- | --- | --- |
| One actual CLI workflow capture | Use a retained historical capture if available; tie it to the run date and install label. Remove account, passenger, route, train, task, order and session identifiers, private paths and raw payloads | A legible image shows actual product interaction, with an honest caption identifying the stage and redactions |
| One Direct/HouBu result comparison | Use authentic retained result captures for the two separately dated runs; label each as historical and preserve manual payment / prepayment boundaries | The viewer can distinguish the two outcomes without reading internal field names |

Availability of suitable retained captures has not been established. If none exist, any new capture needs a separately authorized live workflow; this documentation revision does not initiate one. A reconstructed text panel must be labelled as a reconstruction, never as a product screenshot. Review the final pixels for privacy before adding an image, then re-record public checks. These images are the remaining presentation improvement for an Upwork upload.

Suggested repository Topics for a future authorized metadata update: `system-design`, `workflow-orchestration`, `nodejs`, `reliability-engineering`, `fault-tolerance`. No GitHub settings or publication were changed in this revision.

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
