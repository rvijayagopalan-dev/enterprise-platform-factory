# Open Questions and Decisions

**Status:** Discussion backlog  
**Version:** 0.2.0

This document records unresolved questions for the Capability Factory workstream. No item below should be treated as an accepted architecture decision unless its status is explicitly changed and rationale recorded. The evidence-based remediation backlog is maintained in the [Capability Model Gap Register](capability-model-gap-register.md).

## 1. Capability taxonomy

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-001 | Are the proposed 15 universal L1 domains complete and appropriately bounded? | Establishes the common capability foundation | Open |
| Q-002 | Should Governance be a standalone universal L1 or remain cross-cutting / within Risk and Compliance? | Prevents ambiguity in ownership and mapping | Open |
| Q-003 | Should Enterprise Support Services remain one L1 or be decomposed? | Affects capability granularity and factory alignment | Open |
| Q-004 | Should Research be grouped with Innovation or modeled separately? | Research may span science, product and enterprise innovation | Open |
| Q-005 | What formal rules govern L1/L2/L3 decomposition? | Ensures consistency and reuse | Open |
| Q-006 | Which capability relationship types are required? | Enables dependency, composition and traceability | Open |
| Q-027 | What is the canonical capability definition contract, including scope, exclusions, outcomes, aliases and provenance? | Makes capability semantics testable and reusable | Open |
| Q-028 | Which relationship types and cardinality rules are required beyond parent-child hierarchy? | Enables capability graph traversal and validation | Open |
| Q-029 | Which candidate universal domains are missing or ambiguously placed (architecture, knowledge, ecosystem, sustainability, resilience, assets, research, regulatory affairs, security and master data)? | Avoids premature L1 expansion while ensuring coverage | Open |

## 2. Industry and specialization

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-007 | Which industry classification should anchor the catalog? | Supports consistent industry extensions | Open |
| Q-008 | How should multi-industry enterprises compose capability models? | Avoids duplicate or conflicting definitions | Open |
| Q-009 | When is a variation an extension versus a new capability? | Controls taxonomy fragmentation | Open |
| Q-010 | How should jurisdictional and regulatory variants be represented? | Supports global and local operating models | Open |
| Q-011 | What criteria promote a specialized capability into an industry or universal catalog? | Governs reuse and catalog evolution | Open |
| Q-030 | What explicit applicability states are supported, and what evidence is required to assert each state? | Prevents default applicability from being mistaken for validated commonality | Open |
| Q-031 | How should sub-industry, business-model, product/service, jurisdiction and operating-context overlays compose? | Supports multi-dimensional specialization without copying entire hierarchies | Open |
| Q-032 | How should cross-cutting capabilities and controls relate to industry-specific decompositions? | Prevents risk, quality, safety, resilience and sustainability from being inconsistently embedded | Open |

## 3. Composition engine

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-012 | Is composition recommendation-led, rule-driven, human-curated or hybrid? | Defines engine behavior and governance | Open |
| Q-013 | What is the canonical enterprise context input? | Determines capability applicability | Open |
| Q-014 | How are conflicts, duplicates and semantic overlaps resolved? | Protects model integrity | Open |
| Q-015 | How are catalog versions pinned and enterprise models migrated? | Preserves reproducibility and traceability | Open |
| Q-016 | Who approves the published enterprise-specific capability model? | Establishes accountability | Open |
| Q-033 | What deterministic resolution rules govern inheritance, specialization, exclusions, conflicts and duplicate candidates? | Makes enterprise composition reproducible and auditable | Open |
| Q-034 | What versioned interchange schema and import validation contract govern capability catalogues, compositions and assessments? | Enables safe portability and integration | Open |

## 4. Enterprise architecture and capability intelligence

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-035 | Which enterprise architecture relationships are mandatory for a publishable enterprise capability model? | Connects capabilities to value streams, processes, organization, products, data, applications and technology | Open |
| Q-036 | Which maturity dimensions, evidence rules and confidence measures are required? | Prevents a single maturity score from masking capability weaknesses | Open |
| Q-037 | How should strategic value, customer impact, operational criticality, regulatory criticality and investment be measured? | Supports capability prioritization and portfolio decisions | Open |
| Q-038 | What provenance, SME validation and catalogue quality gates are required before a capability or mapping is accepted? | Establishes trust and defensible reuse | Open |

## 5. Factory ecosystem

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-017 | What criteria justify a distinct factory instead of a workflow or shared service? | Prevents factory proliferation | Open |
| Q-018 | Are universal functional and horizontal shared factories separate classification dimensions? | Clarifies taxonomy and ownership | Open |
| Q-019 | What is the canonical relationship between a capability and a factory? | Avoids a false one-to-one mapping | Open |
| Q-020 | What distinguishes factory blueprint, configuration, instance and execution run? | Enables lifecycle and runtime modeling | Open |
| Q-021 | Which factory contracts are mandatory for inter-factory collaboration? | Enables composition and interoperability | Open |
| Q-022 | How are factory outcomes, economics and maturity measured? | Enables portfolio governance | Open |
| Q-039 | What mapping semantics distinguish a factory that realizes, partially realizes, enables, governs or consumes a capability? | Makes capability-to-factory coverage measurable and many-to-many | Open |
| Q-040 | How should capability gaps be translated into candidate factory blueprints and investment options? | Connects capability intelligence to factory portfolio planning | Open |

## 6. Enterprise Meta Factory and EPF

| ID | Question | Why it matters | Status |
|---|---|---|---|
| Q-023 | Is the Enterprise Meta Factory a higher-order factory that creates and evolves factories, with orchestration as one capability? | Establishes the meta-level operating model | Proposed direction |
| Q-024 | Which Meta Factory capabilities belong in EPF versus the business/meta layer? | Avoids platform and domain responsibility duplication | Open |
| Q-025 | Which EPF engines and shared services should be reused by all factories? | Aligns with existing EPF architecture | Open |
| Q-026 | How are non-digital and physical operations represented when factories extend beyond software delivery? | Keeps the model enterprise-wide | Open |

## 7. Proposed design principles to confirm

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
11. Applicability must be explicit and evidence-backed; an absent mapping is unassessed.
12. Capability definitions must express enduring abilities and outcomes, not generic process phases.
13. Capability composition must preserve version, provenance, inheritance and conflict decisions.
14. Capability-to-factory relationships are many-to-many and do not imply dedicated factories.

## 8. Decision record template

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
