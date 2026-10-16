# Authorship and public scope

## What Devon owns

This is a **personal engineering project**, developed around an actual 12306 booking workflow. It is not presented as a client commission, an official platform integration, or a product endorsed by the booking platform.

Devon's contribution is the product and engineering direction: defining user goals and non-automatic actions; designing flows and responsibility boundaries; evaluating architecture and trade-offs; directing AI-assisted implementation; challenging results with counterexamples; and deciding whether behavior and evidence meet the intended acceptance criteria.

Implementation, documentation and technical review used AI tools. This case study does not claim that Devon manually wrote every line. Historical references to independent review mean review by a separate AI-agent context within that engineering workflow, not certification by an external human audit organization.

## What is public

- Selected English explanations of the user journey, architecture and control boundaries.
- Five derived diagrams with editable Mermaid sources and rendered exports.
- Three engineering cases describing decisions, costs and evidence.
- Two verbatim, protocol-independent function excerpts from the private wake-planning module.
- Selective English summaries of historical validation and controlled actual use.
- Content hashes and a source catalogue to identify the inspected inputs.

The diagrams are explanatory projections. They condense the private design and reconcile dated amendments; they are not executable specifications or evidence that every branch works online. Historical source descriptions and installed product versions are kept separate.

## What remains private

The platform-specific implementation, complete request construction, login materials, session data, passenger details, order identifiers, raw HTTP responses, packet captures, internal agent conversations, live state directories and complete runtime evidence bundles remain private.

Public evidence is a **curated summary**, not an independent reproduction of the private system. Original reports were read locally. Only selected non-personal assertions and material limitations were rewritten here; the original reports and their sensitive context were not copied. Private runtime locators are omitted from the public catalogue. Public readers can inspect the summaries, while the hashes alone cannot prove their claims.

No simulated screenshot is presented as a real run. This edition uses diagrams and textual evidence, without product screenshots or a demo video. The [visual evidence follow-up](validation.md#visual-evidence-follow-up) defines what an authentic, redacted capture must establish.

## Attribution and sources

The architecture and functions are derived from the owner's private 12306 HTTP/CLI project, identified by relative source paths where appropriate in the [source catalogue](../assets/evidence/source-catalog.json). A supplied ChatGPT consultation helped select the presentation structure; it is not treated as proof of implementation or current platform behavior.

Mermaid is the rendering tool. Node.js provides the runtime for the small local documentation checks. No third-party booking implementation is redistributed. A name appearing in a historical source does not imply that all implementation is original or that a third party has endorsed this case study.

## Rights

Copyright © 2026 Devon. All rights reserved in the original material published in this repository. No MIT or other permissive license is granted by this first edition. Third-party names remain the property of their owners.

This case study describes transferable engineering patterns. It does not offer a public booking client, an automation service, or a guarantee of ticket availability, fulfillment, timing or long-term production reliability.
