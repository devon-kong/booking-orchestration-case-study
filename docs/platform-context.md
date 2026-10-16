# Why the 12306 setting matters

Background sources checked on **2026-10-16**. These describe the railway platform and travel demand; they do not validate this project. Reference identities and claim scopes are retained in the [public context catalogue](../assets/evidence/public-context.json), separately from the private implementation catalogue.

## The platform and the travel peaks

**P01 · Official platform.** China Railway 12306 is China's official online railway ticketing platform. Its [English website](https://www.12306.cn/en/index.html) offers journey queries and ticketing information.

**P02 · Chinese New Year.** Spring Festival travel brings concentrated demand as people travel for family reunions. The [Shanghai government notice of 2026-01-19](https://english.shanghai.gov.cn/en-LatestNews/20260119/50214166c9ec4d9492a780526c3a0268.html) describes that year's travel season and official ticket-sale channels.

**P03 · National Day.** The [Beijing government report of 2025-09-16](https://www.beijing.gov.cn/fuwu/bmfw/sy/jrts/202509/t20250916_4202777.html), quoting China Railway passenger operations, describes concentrated holiday demand and tighter availability on particular dates and routes. It recommends off-peak travel and the official waitlist. This is a dated example, not a claim about a measured 2026 peak.

**P04 · Booking is more than an inventory query.** The [official internet-ticketing FAQ](https://kyfw.12306.cn/otn/gonggao/onlineBooking.html) describes registered identity, inventory and booking services, waitlisting, and the need to pay within the displayed time after a seat is reserved.

## P05 · 2026 holiday scale

The China Academy of Railway Sciences Corporation’s [official report published on 2026-10-15](https://www.rails.cn/html/news/12/2026/20261015_69462.html) records:

| Metric | Observed value | Statistical period and scope |
| --- | --- | --- |
| Passenger journeys carried | **302 million** | National railway, September 23–October 8, 2026; the 16-day Mid-Autumn / National Day transport period |
| Tickets sold in one day | **29.737 million** | September 23, 2026; railway ticket sales, described in the report’s all-channel sales context |

The rendered official page was rechecked on 2026-10-16: its visible publication date, measurement dates and Chinese metric wording match the table. Short source excerpts and the all-channel context are retained in P05 of the public context catalogue.

These are reported actual totals, not the earlier holiday forecast. Passenger journeys count trips rather than unique people; ticket sales count tickets rather than simultaneous requests or active users. The publication date differs from both measurement periods. Neither total measures this project’s workload, performance or success rate. The source does not supply a concurrent-user figure for either metric.

## What that means for this case study

The engineering problem is to coordinate a user's fixed target, changing availability, session readiness and possible remote side effects over time. A query hit is an opportunity to recheck eligibility; it is not an order. A waitlist request awaiting prepayment is not a ticket allocation.

This is our engineering interpretation of the setting. The project's [documented contract and implementation](architecture.md) establish its own rules; the [validation matrix](validation.md) establishes what was observed. No railway passenger total is used as a concurrency benchmark for this program. No claim is made that this project increases inventory, changes queue priority, bypasses purchase limits or platform risk controls, or guarantees a holiday ticket.
