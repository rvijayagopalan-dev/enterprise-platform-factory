# UECE Industry Capability Overlay Factory v0.2.0

## Scope

Six proposed industry overlays extend the universal capability catalog:
- Banking and Capital Markets
- Insurance
- Healthcare Providers
- Retail and E-commerce
- Manufacturing
- Energy and Utilities

Each overlay contains five representative L2 specialization candidates. These are design seeds, not approved industry standards.

## Overlay semantics

- Universal capability IDs remain stable and unchanged.
- Industry-specialized capabilities use overlay-local IDs.
- Each specialization points to a universal L1 parent and a base universal capability.
- Applicability defaults to `unassessed`; no industry-wide applicability is inferred.
- Overlay and capability lifecycle must both be accepted before default resolution includes records.
- Evidence references are empty until a steward supplies traceable evidence.
- Specialization, extension and addition are distinct mapping types; the v0.2 seed uses specialization examples.

## Classification crosswalk strategy

The crosswalk registry identifies NAICS, ISIC and NACE as external systems and points to their official entry points. It deliberately contains no fabricated code mappings. Each mapping must include the official release, source code and label, target classification, relationship semantics, evidence reference, review status and effective date. A label similarity is not an equivalence decision.

## Engine

`validateIndustryOverlay` checks IDs, universal parent/base references, level semantics and applicability values. `resolveIndustryOverlay` supports review-mode inspection; by default it returns only accepted overlays and accepted capability records.

## Next governance steps

1. Assign industry domain stewards.
2. Review capability boundaries and duplicate/overlap candidates.
3. Attach authoritative source evidence and official classification release identifiers.
4. Approve crosswalks and overlay records independently.
5. Publish immutable overlay releases and include them in composition manifests.
