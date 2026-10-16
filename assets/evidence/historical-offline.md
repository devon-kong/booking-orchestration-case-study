# H-A3 · Historical offline acceptance

**Classification:** historical report summary, inspected on 2026-10-15. The original tests were not rerun while preparing this edition.

| Field | Recorded value |
| --- | --- |
| Historical acceptance date | 2026-09-20 |
| Accepted scope | Route A / A3 offline preflight, accepted for separately authorized G1 preparation |
| Result | 21 required gates passed; the report records 1,494 / 1,494 tests with zero failures, cancellations, skips or todos |
| Candidate identity | `sha256:31835b770d4a4445240cb57747f089ca6abb8c6122711a6759adef26268b9f59` |
| Build identity | `sha256:e986a75cc0aa5c6bfb161408061ec9b6906476f5bf1d24a2ceb719032d597391` |
| Package archive SHA-256 | `a2ac93fb353f7c0413fdb30b142fd4fc85291460bb3a2220d05f792207fd4076` |
| Method | Reported independent AI-agent acceptance, fresh installation, isolated execution checks and corrected bounded sampling |
| Public source identities | S20 and S21 in the [source catalogue](source-catalog.json) |

## What the record supports

The historical report records fixed-version offline acceptance, including installed execution/recovery checks and source/install parity. The accepted sampling correction is retained in the source summary. These are more informative than a test total alone: the result was scoped to particular software bytes and gates.

The acceptance document also preserves earlier failed runs and findings. This excerpt does not reclassify them as successes, add their counts together, or use later documentation to make an old candidate identity equal a Git commit.

## What it does not support

- The original acceptance explicitly recorded G1/G2/G3 as not authorized and online verification as false at that date.
- This is not acceptance of the later 2026-09-27/28 installed versions, the current source snapshot, or every arrow in the public diagrams.
- Separate AI-agent review is not an external human audit or certification.
- The full private runtime bundle is not included. Public readers can inspect this curated summary and the catalogue; the hashes identify inputs but cannot independently prove all assertions.
- No claim is made about long-term service reliability, all fault interleavings, SQLite migration or a measured performance SLA.

The historical controlled-use examples are [separate records](controlled-use.md), not an upgrade of this offline verdict.
