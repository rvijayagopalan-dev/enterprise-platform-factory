# Open Questions and Decisions

**Status:** Discussion backlog  
**Version:** 0.1.0

This document records unresolved questions for the Capability Factory workstream. No item below should be treated as an accepted architecture decision unless its status is explicitly changed and rationale recorded.

## 1. Capability taxonomy

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-001 | Are the proposed 15 universal L1 domains complete and appropriately bounded? | Establishes the common capability foundation | Open |
| Q-002 | Should Governance be a standalone universal L1 or remain cross-cutting / within Risk and Compliance? | Prevents ambiguity in ownership and mapping | Open |
| Q-003 | Should Enterprise Support Services remain one L1 or be decomposed? | Affects capability granularity and factory alignment | Open |
| Q-004 | Should Research be grouped with Innovation or modeled separately? | Research may span science, product and enterprise innovation | Open |
| Q-005 | What formal rules govern L1/L2/L3 decomposition? | Ensures consistency and reuse | Open |
| Q-006 | Which capability relationship types are required? | Enables dependency, composition and traceability | Open |

## 2. Industry and specialization

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-007 | Which industry classification should anchor the catalog? | Supports consistent industry extensions | Open |
| Q-008 | How should multi-industry enterprises compose capability models? | Avoids duplicate or conflicting definitions | Open |
| Q-009 | When is a variation an extension versus a new capability? | Controls taxonomy fragmentation | Open |
| Q-010 | How should jurisdictional and regulatory variants be represented? | Supports global and local operating models | Open |
| Q-011 | What criteria promote a specialized capability into an industry or universal catalog? | Governs reuse and catalog evolution | Open |

## 3. Composition engine

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-012 | Is composition recommendation-led, rule-driven, human-curated or hybrid? | Defines engine behavior and governance | Open |
| Q-013 | What is the canonical enterprise context input? | Determines capability applicability | Open |
| Q-014 | How are conflicts, duplicates and semantic overlaps resolved? | Protects model integrity | Open |
| Q-015 | How are catalog versions pinned and enterprise models migrated? | Preserves reproducibility and traceability | Open |
| Q-016 | Who approves the published enterprise-specific capability model? | Establishes accountability | Open |

## 4. Factory ecosystem

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-017 | What criteria justify a distinct factory instead of a workflow or shared service? | Prevents factory proliferation | Open |
| Q-018 | Are universal functional and horizontal shared factories separate classification dimensions? | Clarifies taxonomy and ownership | Open |
| Q-019 | What is the canonical relationship between a capability and a factory? | Avoids a false one-to-one mapping | Open |
| Q-020 | What distinguishes factory blueprint, configuration, instance and execution run? | Enables lifecycle and runtime modeling | Open |
| Q-021 | Which factory contracts are mandatory for inter-factory collaboration? | Enables composition and interoperability | Open |
| Q-022 | How are factory outcomes, economics and maturity measured? | Enables portfolio governance | Open |

## 5. Enterprise Meta Factory and EPF

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-023 | Is the Enterprise Meta Factory a higher-order factory that creates and evolves factories, with orchestration as one capability? | Establishes the meta-level operating model | Proposed direction |
| Q-024 | Which Meta Factory capabilities belong in EPF versus the business/meta layer? | Avoids platform and domain responsibility duplication | Open |
| Q-025 | Which EPF engines and shared services should be reused by all factories? | Aligns with existing EPF architecture | Open |
| Q-026 | How are non-digital and physical operations represented when factories extend beyond software delivery? | Keeps the model enterprise-wide | Open |

## 6. Proposed design principles to confirm

1. Capability and factory taxonomies are separate but linked models.
2. The enterprise capability model is composed from universal, industry, specialized and enterprise-local definitions.
3. A capability does not automatically imply a dedicated factory.
4. A factory may realize multiple capabilities, and capabilities may require multiple factories.
5. Maintain a governed catalog of reusable factory blueprints.
6. Use capability composition to identify candidate factory needs.
7. Use a Factory Composition Engine to assemble and configure factory blueprints.
8. Allow enterprise-specific extensions with explicit provenance and governance.
9. EPF provides shared execution and trust infrastructure; it is not the entire factory ecosystem.
10. The Enterprise Meta Factory creates, configures, governs and evolves the factory ecosystem.

## 7. Decision record template

For each accepted decision, record:

- **Decision ID:**
- **Title:**
- **Status:** Proposed / Accepted / Rejected / Superseded
- **Context:**
- **Options considered:**
- **Decision:**
- **Rationale:**
- **Consequences:**
- **Impacted documents and models:**
- **Owner and review date:**
