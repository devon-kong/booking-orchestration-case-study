# Five views of one system

Start with the user journey, then the architecture. The remaining views explain particular engineering decisions. All five are **public design projections**, based on the written HTTP contract inspected on 2026-10-15 (journey presentation revised on 2026-10-16); none is a full runtime state machine or an online acceptance result.

| View | Question and diagram type | Source basis | Main trade-off |
| --- | --- | --- | --- |
| [01 · User journey](rendered/01-user-journey.svg) · [Mermaid](source/01-user-journey.mmd) · [PNG](rendered/01-user-journey.png) | What happens from preparation to a result? Flowchart | S01, S03 and module boundaries | Fold private protocol steps while keeping explicit path selection, uncertain results and separate manual payment / prepayment handoffs |
| [02 · System architecture](rendered/02-system-architecture.svg) · [Mermaid](source/02-system-architecture.mmd) · [PNG](rendered/02-system-architecture.png) | What are the components and owners? Block diagram | S01, S02, S05 | A small local Core with an independent Renewer; shared primitives are not services |
| [03 · Scheduling and admission](rendered/03-scheduling-and-admission.svg) · [Mermaid](source/03-scheduling-and-admission.mmd) · [PNG](rendered/03-scheduling-and-admission.png) | What may be shared, and what still needs admission? Flowchart | S01, S04, S06, S11, S12 | Sharing inventory reduces repeated work without sharing permission or private Candidate |
| [04 · Attempt and uncertainty](rendered/04-attempt-and-uncertainty.svg) · [Mermaid](source/04-attempt-and-uncertainty.mmd) · [PNG](rendered/04-attempt-and-uncertainty.png) | What does evidence justify after a possible side effect? Flowchart | S01, S04, S07, S13, S15 | Preserve unresolved facts while evaluating local occupancy independently |
| [05 · Control and recovery](rendered/05-control-and-recovery.svg) · [Mermaid](source/05-control-and-recovery.mmd) · [PNG](rendered/05-control-and-recovery.png) | Which user intention is being expressed? Flowchart | S01, S04, S08, S15 | Distinct inspection, stop, reconciliation and continuation semantics |

Source IDs resolve in the [catalogue](../assets/evidence/source-catalog.json). For implementation and historical verification status, use [validation](../docs/validation.md), not the presence of a rendered arrow.

## Reading the abstractions

- **01:** The pictured flow starts with session preparation and human login if needed. “Receive task acceptance” is not booking success. The selected Direct or HouBu path uses the same admission and evidence requirements, but leads to different manual payment handoffs. Direct ends at “Awaiting Manual Payment”; HouBu ends at “Awaiting Manual Prepayment”, which does not establish ticket allocation. Each successful outlet matches the previously selected path; neither authorizes a switch. The failure outlet does not grant a retry.
- **02:** Arrows show selected dependencies, not a complete call graph or write-permission matrix. Core-to-platform is non-inventory protocol/authority access; inventory uses the gate. The Renewer has its own bounded request rules. SessionStore and activity are grouped to keep the overview small; their lifecycles differ.
- **03:** The two gate outlets describe anonymous and authenticated request types, not parallel dispatch. The observation return illustrates shared facts and subsequent scheduling. A new Hold still requires checks at the final controlled commit. Waiting for the gate cannot hold account activity. Fair observation continues under an existing Hold.
- **04:** “Complete supporting evidence” includes target, attribution, lifecycle and stage-specific predicates. It can establish an order or a proven failure. A TTL or complete strict-empty local-release decision cannot convert the original UNKNOWN into remote failure. The final outlet is an independent normal-control decision, not permission for resume to create another Attempt.
- **05:** These are distinct command intentions, not steps of one transaction. Plain status is local-only; explicit refresh/verification branches are described separately in the architecture. Resume does not start Core. The failure branch requires proven fencing and rereading facts; restart does not auto-activate historical tasks.

## Corrections to the older private views

The older Core views are useful design sources, but their accompanying notes explicitly describe later amendments. This edition reconciles them against S01:

1. A Hold does not suspend fair anonymous observation by other eligible Campaigns.
2. Normal query starts have a 3-second interval, with the dated one-time priority-recheck exception and mandatory physical serialization.
3. Resume uses historical terminal evidence or bounded verification without starting Core.
4. Versioned TTL and complete strict-empty rules release **local occupancy**; remote outcomes and original FINAL consumption remain separate.
5. Plain status is read-only; explicit verification and refresh are separate behaviors.

## Identity and rendering

The [registry](node-registry.yaml) retains upstream BC identities where their component meaning is preserved. CS identities name this repository's explanatory aggregations; they do not allocate or change private-product contract IDs. Labels may evolve, while identities and definitions remain stable. Presentation labels hide IDs for readability. R1.1 reuses CS-01 for session preparation and adds CS-39/CS-40 for the distinct handoffs; CS-09 remains registered as the earlier combined abstraction and is no longer used in the journey.

The block view answers composition; the flowcharts answer decisions. These are not responsibility swimlanes. There are exactly five selected views; no additional supporting diagram is implied.

To regenerate with an existing Mermaid CLI installation:

```sh
bash scripts/render-diagrams.sh
node scripts/check.mjs --record
node scripts/check.mjs
```

The first edition was rendered with Mermaid CLI 11.17.0 and Mermaid 11.17.2. The rendering script installs nothing and makes no booking requests. SVG is the vector preview; PNG is available for portfolio uploads. Review both the diagram meaning and the actual exports after edits.
