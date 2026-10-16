# China Railway 12306 — Booking Orchestration

[English](README.md) | [简体中文](README.zh-CN.md)

**Reliable business automation · Node.js CLI · Task orchestration · Fault recovery**

A Node.js CLI that coordinates scheduled ticket-booking tasks on China Railway 12306, China's official railway ticketing platform. I designed the product flows, architecture and recovery model, directed implementation, and owned acceptance.

**Selected Direct and HouBu workflows completed real-platform validation**, reaching the following handoffs in the documented historical builds:

| Workflow | Observed online result | Evidence |
| --- | --- | --- |
| **Direct booking** | Order created → **awaiting manual payment** | [2026-09-28 run](assets/evidence/controlled-use.md#h-direct--awaiting-payment) |
| **HouBu · official waitlist** | Waitlist request confirmed → **awaiting manual prepayment** | [2026-09-27 run](assets/evidence/controlled-use.md#h-houbu--awaiting-prepayment) |

These were actual platform runs. Payment, ticket fulfillment and continuous production reliability are outside the demonstrated scope. This repository shares selected architecture, implementation examples and sanitized evidence; the booking implementation remains private.

## Why this is hard

During **Chinese New Year (Spring Festival)** and **National Day**, demand concentrates on popular dates and routes. A railway research institute’s **2026-10-15 official report** records **302 million passenger journeys** across the national railway from September 23 to October 8, and **29.737 million tickets sold on September 23**. These are railway travel and sales totals, not concurrent users or this project’s throughput. [Official source and definitions →](docs/platform-context.md#p05--2026-holiday-scale)

The engineering challenge extends beyond detecting a seat:

- **Time and changing inventory:** wait for sale, observe availability and recheck before acting.
- **Shared account, separate intentions:** coordinate tasks and session health without confusing inventory with permission to submit.
- **Uncertain side effects:** a timeout can hide an existing order; retries must preserve identity and prevent duplicate submission.

The same problems arise in appointment systems, order processing and inventory reservation.

## What I built

A local CLI system that accepts a fixed target, coordinates long-running tasks, maintains session health, guards each execution step and reports the next safe action. **Direct and HouBu are explicit user choices**, with no automatic switch between them. Payment remains manual.

## How it works

![From session preparation to Direct or HouBu payment handoff](diagrams/rendered/01-user-journey.svg)

Acceptance confirms a task, not a booking. Both paths require current eligibility, controlled submission and attributed official evidence. An unresolved outcome stays **UNKNOWN** and cannot trigger blind resubmission. [Control and recovery →](docs/architecture.md#control-and-uncertainty)

## System architecture

![One Booking Core, an independent Renewer and shared durable mechanisms](diagrams/rendered/02-system-architecture.svg)

**JavaScript ES Modules · Node.js · durable local state · built-in Node test runner**

One Booking Core schedules multiple Campaigns; an independent Renewer maintains session health. A shared query gate coordinates inventory requests, while durable facts preserve task identity, submission allowance and local occupancy across interruptions. [Responsibilities and actual code map →](docs/architecture.md)

## Three engineering decisions

| Challenge | Design choice and user value | Detail |
| --- | --- | --- |
| Lost responses and duplicate actions | Stable request identity plus a durable FINAL barrier recover existing work without blindly submitting again | [Failure scenario and traceability](docs/engineering-decisions.md#reliability-walkthrough-unknown-does-not-mean-retry) |
| Overlapping tasks | Share safe inventory observations; keep private execution and authorization separate | [Scheduling and admission](docs/engineering-decisions.md#2-share-inventory-facts-while-keeping-execution-private) |
| Deadlines and recovery controls | Wake for nearby deadlines through one scheduler; distinguish inspect, stop, reconcile and continue | [Trade-offs and source excerpts](docs/engineering-decisions.md#3-schedule-around-deadlines-and-explain-control-precisely) |

## Validation and my contribution

The online handoffs above are the main business results. Earlier [offline acceptance](assets/evidence/historical-offline.md) recorded **21 gates and 1,494 passing tests** for a separate fixed 2026-09-20 build. [Public-edition checks](assets/evidence/local-checks.json) verify this repository and two small pure functions; they do not rerun private integration tests. [Versions, failures and uncovered areas →](docs/validation.md)

I owned requirements, architecture, failure scenarios and acceptance, using AI-assisted implementation and technical review. [Authorship and retained private scope →](docs/authorship-and-scope.md)

**Explore:** [Five editable diagrams](diagrams/README.md) · [Engineering decisions](docs/engineering-decisions.md) · [Product screenshots: pending](docs/validation.md#visual-evidence-follow-up)

<details>
<summary>Reproduce the public checks</summary>

Run `node scripts/check.mjs` with Node.js. No credentials or private-project access are required. Diagram regeneration and check-record maintenance are described in [validation](docs/validation.md#reproduce-the-public-checks).

</details>

Independent personal project; not affiliated with or endorsed by China Railway. Copyright © 2026 Devon. All rights reserved.
