# Universal Capability Meta-Model

**Status:** Discussion draft  
**Version:** 0.1.0

## 1. Purpose

The Universal Capability Meta-Model provides a common structure for describing what an enterprise needs to be capable of doing, independently of its industry, organization chart, application portfolio or technology choices.

It is intended to support:
- Consistent capability naming and decomposition.
- Reuse of common enterprise capabilities.
- Industry-specific and specialized extensions.
- Enterprise-specific capability composition.
- Traceability from capabilities to value streams, processes, applications, data, technology and AI.
- Derivation and rationalization of the enterprise factory ecosystem.

## 2. Three capability layers

### Layer 1 — Universal capabilities

Common capabilities found across many enterprise types. The initial proposal contains 15 universal L1 domains, documented in [Universal Capability Catalog](universal-capability-catalog.md).

Examples include Strategy and Corporate Management, Customer and Relationship Management, Finance and Accounting, Risk and Compliance Management, Technology and Digital Management, and Data and Information Management.

### Layer 2 — Industry capability extensions

Capabilities that express how an industry operates. Examples include banking, healthcare, retail, manufacturing, energy, transportation, insurance and government.

Industry extensions should reuse universal definitions where applicable and introduce industry-specific L1/L2/L3 capabilities where the operating model requires them.

### Layer 3 — Specialized capability extensions

Capabilities specific to a sub-industry, business model, operating context or specialist discipline. Examples include retail banking, investment banking, clinical research, e-commerce, semiconductor fabrication and offshore wind operations.

Specialized extensions may be modeled at L1, L2 or L3 depth as appropriate. The layer label describes specialization, not a requirement that every specialization have exactly three levels.

## 3. Capability hierarchy

A capability is decomposed through levels:

- **L1:** major capability domain.
- **L2:** capability branch within an L1.
- **L3:** reusable or context-specific capability component.
- **Further levels:** permitted where the enterprise needs additional decomposition, subject to modeling governance.

The initial universal catalog defines 15 L1 domains and example L2 branches. The examples are not a complete or approved capability map.

## 4. Composition model

The proposed model has these logical elements:

1. Universal Capability Meta-Model — common structure, semantics and extension rules.
2. Universal Business Capabilities — reusable capability definitions.
3. Industry Capability Extensions — industry additions and variations.
4. Specialized Capability Extensions — sub-industry and business-model additions.
5. Capability Composition Engine — selects, relates and validates capability definitions.
6. Enterprise-Specific Capability Model — composed enterprise view.

The enterprise-specific model can then be related to:
- Value streams.
- Business processes.
- Applications and data.
- Technology and AI.

These are related architectural views, not additional capability layers.

## 5. Capability definition contract (proposed)

Each capability definition should eventually include:

| Attribute | Description |
|---|---|
| Capability ID | Stable identifier within the governed catalog |
| Name | Canonical capability name |
| Definition | Outcome-oriented description of what the enterprise can do |
| Level | L1, L2, L3 or deeper |
| Parent capability | Parent reference, where applicable |
| Layer | Universal, industry or specialized |
| Domain / industry | Applicable domain and industry context |
| Outcomes | Business outcomes enabled |
| Activities | Representative activities; not a process specification |
| Information | Key information concepts used or produced |
| Related capabilities | Dependencies, collaborations and overlaps |
| Value streams | Value streams enabled or supported |
| Processes | Process mappings, when known |
| Applications and data | Supporting or enabling application/data references |
| Technology and AI | Enabling technology and AI references |
| Ownership | Business owner and steward roles |
| Lifecycle | Proposed, draft, reviewed, accepted, deprecated |
| Provenance | Source, rationale, author and review history |
| Version | Version of the capability definition |

The contract is a discussion proposal, not yet a machine-enforced schema.

## 6. Modeling principles

- Model capabilities as relatively stable abilities, not tasks, processes, departments or products.
- Use outcome-oriented definitions.
- Avoid embedding a specific vendor or application in a capability definition.
- Distinguish a capability from the process that realizes it and the organization that owns it.
- Reuse a common capability where semantics are genuinely shared; use explicit extensions where they differ.
- Record overlaps and dependencies rather than silently duplicating capabilities.
- Allow capability maps to reflect an enterprise's scope without requiring every enterprise to instantiate every catalog item.

## 7. Important boundary: capability versus factory

A capability describes an ability. A factory describes a repeatable production and evolution system that may realize one or more capabilities.

There is no assumed one-to-one mapping:
- One factory may support multiple capabilities.
- One capability may be realized by multiple collaborating factories.
- Some capabilities may be fulfilled through people, external services or existing platforms without a dedicated factory.
- A factory may be shared across universal, industry and specialized capability contexts.

## 8. Status and next steps

Open design topics include capability identity and versioning, extension semantics, specialization rules, capability relationship types, composition validation, mapping governance and the boundary between capability catalog and operating model.

See [Open Questions and Decisions](open-questions-and-decisions.md).
