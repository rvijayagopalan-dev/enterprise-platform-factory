# EPF Product Components

**Product area:** Enterprise Platform Factory (EPF)  
**Capability ontology release:** 1.0.0-draft  
**Demo release:** 1.0.0

## Capability ontology

- [Capability Ontology](components/capability-ontology.md) — semantic model, layers, decomposition, identity, relationships, applicability, composition, traceability and governance.
- [Capability JSON Schema](components/capability.schema.json) — JSON Schema Draft 2020-12 domain contract extending the EPF Core Entity envelope.

## Versioned HTML demonstrations

| Demo | Purpose |
|---|---|
| [L1 — Universal Capability Domains v1.0.0](demo/capability-l1-universal-v1.0.0.html) | Explore the proposed universal enterprise capability domains. |
| [L2 — Capability Branch Explorer v1.0.0](demo/capability-l2-branch-v1.0.0.html) | Explore outcome-oriented branches under Finance and Accounting. |
| [L3 — Capability Component Explorer v1.0.0](demo/capability-l3-component-v1.0.0.html) | Explore reusable components and a specialized retail-banking example. |

## Versioning rules

- Ontology release and demo release are versioned independently from individual capability definition versions.
- Use semantic versioning: major for breaking semantic/schema changes, minor for backward-compatible additions, patch for corrections.
- Keep version in the filename for immutable demo snapshots; do not overwrite a released demo to represent a new major/minor release.
- The demos use illustrative seed records and are not authoritative or approved industry capability models.
- Applicability is explicitly unassessed unless evidence-backed context is supplied.

## Modeling boundary

The ontology is a domain model. It reuses the EPF Core Entity envelope for identity, tenant scope, principal, lifecycle, provenance and audit. Capability definitions are distinct from processes, organization structures, applications, technology and factories. Capability-to-factory realization is many-to-many.
