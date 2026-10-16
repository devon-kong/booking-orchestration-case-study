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

**VISUAL_EVIDENCE_PENDING · checked 2026-10-16.** Textual historical run summaries and explanatory diagrams remain the available evidence. No real CLI or business-result screenshot is included; no picture was reconstructed or presented as a captured run.

A bounded, metadata-only search covered the source project's documentation and diagram image directories and documentation image references. Documentation contained no raster captures; all 327 raster files in the diagram tree were design/preview exports by their locations and names. The conventional assets and screenshots directories were absent. No provenance-qualified product capture was identified, so none was opened, copied or published. This is a search result within those areas, not a claim that no capture exists elsewhere. Private runtime bundles, session stores, raw protocol responses and sensitive logs were excluded.

| Missing material | Evidence and privacy requirements | Completion criterion |
| --- | --- | --- |
| Actual CLI task creation / acceptance or Campaign status capture | Retained historical image tied to a date, historical install label and report; remove account, passenger, route, train, task, order and session identifiers and private paths | Legible actual interaction, with an English caption naming the stage and redactions; acceptance must not imply booking success |
| Direct result capture | Retained image corresponding to H-DIRECT (2026-09-28), showing the awaiting-payment handoff | Provenance matches the report; no payment or fulfillment inference |
| HouBu result capture | Retained image corresponding to H-HOUBU (2026-09-27), showing the awaiting-prepayment handoff | Provenance matches the report; no ticket-allocation or fulfillment inference |

The final acceptance pass rechecked the catalogue snapshot’s documentation and diagram Git trees: zero documentation raster images, 327 design/preview raster exports, and no capture-named candidate. The local historical documentation directories also contained no raster images. This was a bounded metadata check, not inspection of private runtime evidence. No additional product capture qualified.

To close this gap, supply the retained captures plus their date/install/report association. Select at most 2–3 images, irreversibly redact and flatten them, remove metadata, inspect the final exported pixels, and only then place them in `assets/screenshots/` and re-record public checks. No empty screenshot directory or simulated terminal panel is added. This revision authorizes no new live capture workflow.

## Portfolio R1.1 · 2026-10-16

This edition adds the P05 official holiday totals with explicit metric scopes, restores the session-preparation step in the user journey and gives Direct and HouBu separate manual payment / prepayment endpoints. The other four technical views, implementation excerpts and historical run claims are retained. The earlier combined CS-09 identity remains registered; new CS-39/CS-40 identify the distinct handoffs.

The bilingual homepages retain the sequence: outcomes, platform challenge, product, journey, architecture, engineering choices, validation and contribution. The remaining presentation gap is explicitly `VISUAL_EVIDENCE_PENDING`. Publication checks and checker regressions validate the public edition; they do not execute the private product. Review is a solo self-review, not a fresh independent review. The written product contract (S01) was re-read for session and human-payment semantics and still matched its catalogued hash; this is not a refreshed source snapshot. All five exports were regenerated and inspected; the other four SVG/PNG pairs remained byte-identical. A local preview using GitHub-rendered Markdown and approximate GitHub styling was checked at 1440px and 390px widths in both languages, with no page-level horizontal overflow. Diagram detail on a narrow screen can be opened separately for zooming.

## R1.1 final acceptance pass · 2026-10-16

The starting GitHub main was `2b67c0383b184ab9da4896bb31ff17e177dae3f6`, already newer than the requested R1 reference `8365b20`. Existing R1.1 journey corrections and holiday figures were verified and retained. This pass simplifies homepage terminology, records direct official-page checks and confirms the visual-evidence gap; it does not rerun or upgrade historical product acceptance.

| Gate | Result | Basis |
| --- | --- | --- |
| G1 · Real-platform outcomes | PASS | Original dated Direct/HouBu summaries and their limitations retained |
| G2 · Platform background | PASS | All five cited official pages opened; P05 publication date, statistical dates, units and scope matched the body |
| G3 · Homepage clarity | PASS | Matching bilingual narrative; task, renewal and final-submission terms explained in ordinary language |
| G4 · User journey | PASS | Separate payment/prepayment endpoints; all ten expected edges retained, including failure and UNKNOWN; no path switch |
| G5 · Authentic visuals | PENDING | No provenance-qualified product capture; required historical materials listed above |
| G6 · Diagrams and cases | PASS | Five Mermaid sources, registered identities, SVG/PNG exports and case boundaries inspected; four technical views unchanged |
| G7 · Public verification | PASS | Public check passed; 17 pure-function cases, 95 relative links, five external references and five diagram pairs; checker regressions 4/4 passed |
| G8 · Scope and disclosure | PASS | Public-only changes; no new product screenshots, private logs, protocol data or product-source edits |
| G9 · GitHub metadata | PASS | Existing Description and all five relevant Topics confirmed; no repository settings changed |

`bash scripts/render-diagrams.sh` completed using Mermaid CLI 11.17.0. All regenerated SVGs matched the existing exports. The local rasterizer produced minor pixel differences, so the existing published PNGs were retained rather than committing unrelated render churn. All five published PNGs were opened and inspected; they contain no ancillary metadata chunks. The diagram labels and edges match their source views.

The existing GitHub-rendered English and Chinese pages were inspected at desktop (1440px) and mobile (390px) widths. Both loaded the overview images without page-level horizontal overflow. GitHub keeps the wider English engineering table horizontally scrollable on mobile; detailed diagrams can be opened separately for zooming. The revised wording was also checked on the published main after push; both languages retained these layout results.

A separate AI-agent context reviewed this public edition, independently reran the public checks and four checker regressions, and found no unresolved issues after restoring the explicit local-account-occupancy wording. Its review did not access private reports or independently verify the external pages; the publishing agent performed those page checks. This supplements, rather than changes, the earlier self-review statement.

**Presentation verdict: ACCEPTED_WITH_VISUAL_PENDING.** G5 is the only presentation gate left open. This verdict concerns the case-study presentation, not full product or production acceptance.

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
