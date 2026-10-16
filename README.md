# Booking Orchestration

### A reliability-focused engineering case study

A personal engineering project exploring reliable booking workflows: coordinating long-running tasks, session health, controlled submission, and recovery from uncertain outcomes. This repository presents selected architecture, engineering decisions and sanitized evidence from a 12306 booking project. The platform-specific implementation remains private.

**The outcome:** a documented local CLI architecture, implementation-backed reliability mechanisms, historical offline acceptance, and two bounded examples of actual use reaching manual payment or prepayment handoff. Each result below has an explicit version and scope.

## The problem

A booking workflow may wait for hours, observe changing inventory, lose a response after a side effect, or stop while a request is already in flight. Multiple tasks share an account, but a query hit does not grant permission to submit. Users need to know what happened, what remains uncertain, and what they can safely do next.

These challenges also appear in appointment systems, order processing, inventory reservation and business automation.

## The user journey

![From preparation to a verified result](diagrams/rendered/01-user-journey.svg)

The user selects a precise target and **Direct or HouBu**. The system accepts the task, waits or observes, checks execution eligibility, and evaluates official evidence. Direct ends at awaiting payment; HouBu ends at awaiting prepayment. Payment stays manual. An uncertain result is preserved for reconciliation rather than blindly resubmitted.

## My role

I defined the product boundaries and user flows, designed the architecture and recovery model, directed AI-assisted development, challenged results with failure scenarios, and owned acceptance decisions. This is a personal project rather than a client commission. [Contribution and public scope →](docs/authorship-and-scope.md)

## Three engineering highlights

- **Recover the original intention after lost responses.** Stable request identity handles duplicate task acceptance; a durable per-Attempt FINAL barrier addresses external submission. Unknown outcomes do not receive a new submission allowance. [Decision and trade-offs →](docs/engineering-decisions.md#1-prevent-duplicate-submission-without-inventing-certainty)
- **Share observations while isolating execution.** One Core merges inventory work and coordinates tasks. Private Candidate, account activity and authorization remain subject to admission checks. [Decision and trade-offs →](docs/engineering-decisions.md#2-share-inventory-facts-while-keeping-execution-private)
- **Make scheduling and control understandable.** Deadline-aware wake planning feeds the existing scheduler; stop, reconcile and continue represent different user intentions. Two short source excerpts show the implementation approach. [Decision and code excerpts →](docs/engineering-decisions.md#3-schedule-around-deadlines-and-explain-control-precisely)

## How the system is organized

![One Core, an independent Renewer, and shared local mechanisms](diagrams/rendered/02-system-architecture.svg)

JavaScript ES Modules · Node.js CLI · built-in Node test runner · local durable business facts · explicit Session/activity ownership.

One Booking Core coordinates multiple Campaigns. An independent Renewer maintains session health. Shared mechanisms constrain inventory dispatch, session writes and durable facts across entries. The image is a design view, not an assertion that every branch has been validated online. [Architecture and real code map →](docs/architecture.md)

## Evidence and boundaries

| Evidence | What was established | Boundary |
| --- | --- | --- |
| [Historical offline acceptance](assets/evidence/historical-offline.md) | A fixed 2026-09-20 build: 21 gates and 1,494 tests recorded as passed | Historical offline scope; not the current source or online acceptance |
| [Controlled Direct use](assets/evidence/controlled-use.md#h-direct--awaiting-payment) | One 2026-09-28 awaiting-payment result with one FINAL dispatch | No automatic payment; no all-target or long-term guarantee |
| [Controlled HouBu use](assets/evidence/controlled-use.md#h-houbu--awaiting-prepayment) | One 2026-09-27 awaiting-prepayment result, attributed to the original Attempt | Prepayment handoff is not ticket fulfillment; historical reporting limitations remain |
| [Checks of this edition](assets/evidence/local-checks.json) | Published excerpt checks, synthetic function cases, links and export inventories | Documentation checks, not a rerun of private business tests |

The historical products differ from the source snapshot used to prepare this case study. Their successes, earlier failures and limitations remain separate. Full private runtime bundles are not included. [Validation methods and uncovered areas →](docs/validation.md)

## Explore further

- [Five diagrams: editable sources, SVG and portfolio PNG exports](diagrams/README.md)
- [Architecture, state ownership and implementation areas](docs/architecture.md)
- [Three engineering decisions and two verbatim source excerpts](docs/engineering-decisions.md)
- [Validation matrix and reproducible public checks](docs/validation.md)
- [Authorship, AI-assisted development and retained private scope](docs/authorship-and-scope.md)
- [Inspected source identities](assets/evidence/source-catalog.json)

To check the public material locally: `node scripts/check.mjs`. To regenerate diagram exports with an existing Mermaid CLI: `bash scripts/render-diagrams.sh`.

Copyright © 2026 Devon. All rights reserved. This case study does not distribute an installable booking client.
