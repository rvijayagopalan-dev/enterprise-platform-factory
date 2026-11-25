# EPF Capability Ontology

**Version:** 1.0.0  
**Status:** Draft — implementation baseline for review  
**Canonical namespace:** `epf.capability`  
**Companion schema:** [capability.schema.json](capability.schema.json)  
**Compatibility:** EPF Core Entity envelope; this ontology defines capability-domain extensions and does not redefine tenant, principal, provenance, audit or lifecycle primitives.

## 1. Purpose and semantic boundary

The EPF Capability Ontology defines what an enterprise must be able to do, independent of its organization chart, process design, application portfolio, technology choices or sourcing model. It provides stable semantics for capability discovery, decomposition, industry specialization, enterprise composition, assessment and traceability to the Enterprise Platform Factory ecosystem.

A **capability** is an enduring, outcome-oriented ability of an enterprise, business unit or ecosystem participant to achieve a business result by combining people, process, information, technology, assets and governance.

A capability is not:
- A process, workflow, task or procedure.
- An organizational unit, job role or reporting line.
- An application, platform, technology product or data object.
- A product or service offering.
- A factory. A factory is a repeatable governed production and evolution mechanism that may realize one or more capabilities.

## 2. Ontology principles

1. **Outcome orientation:** define the ability and intended result, not the sequence of work.
2. **Stable identity:** capability IDs survive name changes where meaning remains stable.
3. **Separation of concerns:** capability, process, organization, information, application, technology and factory are distinct concepts connected by typed relationships.
4. **Layered reuse:** universal definitions are reused; industry and specialized context is expressed as governed extension, not copied text.
5. **Contextual applicability:** absence of a mapping means unassessed, never automatically universal.
6. **Composable hierarchy:** L1/L2/L3 are decomposition depth, not rigid business architecture layers.
7. **Evidence and provenance:** source, rationale, confidence and review status accompany definitions and contextual decisions.
8. **Many-to-many realization:** capability-to-factory mapping is many-to-many and does not imply one factory per capability.
9. **Governed evolution:** semantic changes are versioned, reviewed and traceable.
10. **Provider neutrality:** vendor and product choices belong in technology mappings, not canonical capability definitions.

## 3. Ontology layers and decomposition levels

The model has three semantic layers and an extensible decomposition depth.

| Semantic layer | Purpose | Typical context | Example |
|---|---|---|---|
| Universal | Reusable enterprise abilities independent of one industry | Cross-industry | Finance and Accounting |
| Industry | Abilities shaped by an industry's value chain, regulation or operating model | Banking, healthcare, retail, manufacturing, government | Deposit and Account Services |
| Specialized | Abilities shaped by sub-industry, business model, product, operating context or specialist discipline | Retail banking, e-commerce, offshore wind | Digital Deposit Origination |

| Decomposition level | Meaning | Example |
|---|---|---|
| L1 | Major capability domain | Finance and Accounting |
| L2 | Coherent branch within an L1 | Treasury |
| L3 | Reusable or context-specific capability component | Cash Position Management |
| L4+ | Further decomposition only when it improves ownership, composition, assessment or realization | Intraday Cash Forecasting |

**Important:** semantic layer and decomposition level are independent dimensions. A specialized capability may be L1, L2 or L3. Do not force every industry model into exactly three levels.

## 4. Core ontology entities

### 4.1 CapabilityDefinition

Canonical definition of an enterprise ability. It carries identity, name, definition, decomposition level, semantic layer, scope, outcomes, lifecycle and provenance.

### 4.2 CapabilityContext

The context in which a capability is considered: enterprise, industry, sub-industry, business model, product/service, geography, jurisdiction, operating model and organizational scope.

### 4.3 CapabilityApplicability

A contextual assertion that a capability is applicable, conditional, not applicable or not yet assessed. It records scope, rationale, evidence, confidence, decision owner and validity period.

Allowed states:
- `unassessed`
- `applicable`
- `conditional`
- `not_applicable`
- `externally_provided`
- `planned`

### 4.4 CapabilityExtension

A governed contextual modification that references a base capability. Extension semantics:
- `reuse`: reference the base definition without semantic change.
- `specialization`: narrow or refine the base meaning for a context.
- `addition`: introduce a new capability under a valid parent/context.
- `replacement_proposal`: propose replacement while preserving lineage; requires review.
- `alias`: map alternate terminology to a canonical capability.

Extensions MUST NOT silently mutate the base definition.

### 4.5 CapabilityRelationship

A typed, directed relationship between capabilities or between a capability and another EPF entity. Hierarchical parent-child is only one relationship type.

Canonical capability relationship types:
- `parentOf` / `childOf`: decomposition hierarchy.
- `specializes`: contextual definition narrows a base capability.
- `extends`: capability adds scope while retaining base lineage.
- `dependsOn`: capability requires another capability.
- `enables`: capability enables another capability.
- `supports`: capability contributes to another capability.
- `overlapsWith`: semantic overlap requiring analysis; not a hierarchy.
- `complements`: capabilities jointly contribute to an outcome.
- `supersedes`: new definition succeeds an older definition.
- `mapsTo`: typed cross-domain mapping, with mapping metadata.

### 4.6 CapabilityRealization

A mapping from capability to a realization mechanism such as a factory, process, application, platform, external provider, organizational unit or human service. Realization is not assumed to be exclusive.

Factory relationship types:
- `realizes`
- `partiallyRealizes`
- `enables`
- `governs`
- `consumes`

### 4.7 CapabilityAssessment

A time-bound, evidence-backed assessment of capability maturity, performance, coverage, risk, automation, data readiness or AI opportunity. These dimensions MUST remain separately measurable; do not collapse them into one unqualified maturity number.

### 4.8 CapabilitySource

A provenance reference to a framework, standard, source document, SME interview, enterprise decision or observed evidence. External reference-model crosswalks are mappings with source/version and rationale, not claims of equivalence by name alone.

## 5. Capability definition contract

The capability schema extends the EPF common entity envelope. The domain-specific payload should include:

| Attribute | Requirement | Description |
|---|---|---|
| capabilityKey | Required | Stable catalog key, e.g. U08, BK-DEP-01 |
| canonicalName | Required | Controlled display name |
| definition | Required | Outcome-oriented description |
| semanticLayer | Required | universal, industry, specialized, enterprise |
| decompositionLevel | Required | L1, L2, L3 or L4+ |
| parentCapabilityId | Conditional | Parent for hierarchical decomposition |
| domainKey | Recommended | Root domain or taxonomy namespace |
| context | Required | Explicit scope and applicability context |
| scopeIn / scopeOut | Recommended | Inclusion and exclusion boundaries |
| outcomes | Recommended | Business outcomes enabled |
| activities | Optional | Representative activity themes, not process steps |
| aliases | Optional | Synonyms and industry terminology |
| relationships | Optional | Typed references |
| owner / steward | Required by accepted state | Accountable business owner and catalog steward |
| lifecycleState | Required by EPF envelope | draft, proposed, in_review, accepted, deprecated, retired |
| version | Required by EPF envelope | Monotonic record revision; schemaVersion is semantic schema version |
| source / evidence | Required before accepted | Provenance and validation basis |

## 6. Identity and versioning

- `id` is the immutable EPF entity identifier.
- `capabilityKey` is the stable human-governed catalog identifier.
- Keys use a namespace prefix: `Uxx` for universal; industry prefixes such as `BK-`, `HC-`, `RT-`, `MF-`, `GV-`; specialized definitions add contextual identifiers without reusing another capability's key.
- A key MUST NOT be reassigned to a different semantic concept.
- `schemaVersion` identifies the schema contract. `definitionVersion` identifies the semantic definition version.
- Typographical or display-name corrections may retain identity. Material changes to scope or meaning require a reviewed new definition version and, where necessary, a successor capability with `supersedes`.
- Deprecated definitions remain addressable for historical traceability.

## 7. Context and applicability

Context can include:
- Enterprise and business-unit scope.
- Primary and secondary industries.
- Sub-industry.
- Business model (e.g. B2B, B2C, marketplace, subscription, asset operator, public service).
- Product and service portfolio.
- Geography and regulatory jurisdiction.
- Operating model and sourcing mode.
- Lifecycle stage and strategic scope.

Applicability MUST be explicit. A catalog item without a contextual decision is `unassessed`. A conditional capability records the condition. An externally provided capability remains in the enterprise scope where relevant, with realization and accountability recorded.

## 8. Relationships and integrity

- Each hierarchical child has at most one canonical parent in a given taxonomy view; cross-cutting relationships use non-hierarchical relationship types.
- Hierarchy and specialization lineage MUST be acyclic.
- `dependsOn` may be many-to-many; cycles are flagged for review rather than silently interpreted as hierarchy.
- Relationship endpoints must resolve to known entities and carry tenant/scope rules from EPF Core.
- Cross-domain mappings record mapping type, confidence, rationale and source.
- Overlap is an explicit analytical relationship, not a reason to merge automatically.

## 9. Capability composition

Composition is a deterministic, version-pinned assembly of:
1. Universal baseline.
2. Selected industry catalog(s).
3. Sub-industry and business-model extensions.
4. Product/service and jurisdictional context.
5. Enterprise-local additions, exclusions and decisions.

The composition result records:
- Exact source catalog and definition versions.
- Inclusion and exclusion decisions.
- Applicability state and evidence.
- Extension lineage and relationship resolution.
- Duplicate/overlap candidates and unresolved conflicts.
- Scope, reviewer and approval.
- Reproducible manifest and composed-model version.

No default rule may infer that a missing industry mapping means applicable. Human approval is required for material semantic conflicts and publication.

## 10. Capability-to-architecture and factory traceability

Capabilities may map to:
- Value streams and business outcomes.
- Business processes and controls.
- Organization roles and accountable owners.
- Information concepts, data products and data domains.
- Applications, APIs, platforms and technology.
- AI/agent opportunities and controls.
- Factories and factory instances.

Mappings are typed and many-to-many. A capability can be realized by people, processes, platforms, suppliers or factories. A factory may realize multiple capabilities. A factory portfolio is derived from capability needs plus reuse, economics, risk, operating model and strategic choices—not by creating one factory per capability.

## 11. Assessment model

Keep assessment dimensions independent:
- Maturity: capability management sophistication, with a defined scale and evidence.
- Performance: outcome measures, targets and actuals.
- Coverage: organizational, geographic, product and process scope.
- Risk/control: exposure, control effectiveness and assurance.
- Automation: automation level and reliability.
- Data readiness: quality, accessibility, lineage and stewardship.
- AI opportunity: suitability, value hypothesis, feasibility and guardrails.

Every assessment includes assessor, scope, as-of date, method, evidence, confidence and review status.

## 12. Governance lifecycle

Suggested definition lifecycle:
`draft → proposed → in_review → accepted → deprecated → retired`

A rejected proposal remains traceable. Applicability decisions and assessments have their own status and validity periods. Approval pins exact definition and schema versions.

Governance roles:
- Business owner: accountable for meaning and business relevance.
- Capability steward: maintains taxonomy quality and relationships.
- Industry SME: validates industry-specific semantics.
- Enterprise architect: validates cross-domain consistency and EA traceability.
- Model custodian: manages identifiers, schema compatibility and releases.

## 13. Initial catalog seed

The initial universal catalog remains the 15-domain working proposal U01–U15 in [the Capability Factory catalog](../../capability-factory/universal-capability-catalog.md). It is illustrative and not certified as complete. Industry and specialized examples remain hypotheses until validated with industry SMEs and source evidence.

## 14. Versioning policy

This is ontology version **1.0.0-draft**. Breaking semantic or structural changes increment the major version; backward-compatible additions increment the minor version; editorial corrections increment the patch version. Individual definitions are versioned independently from the ontology release.

## 15. Open design decisions

- Whether capability identity should be URI-based or key-plus-namespace.
- Which external reference models should be crosswalked and under what license.
- The approved maturity scale and evidence rubric.
- How to represent capabilities spanning multiple value chains without duplicating definitions.
- Whether ontology graph serialization (RDF/OWL) is required in addition to JSON Schema and typed JSON relationships.
- Catalog release approval authority and deprecation policy.

These decisions are deliberately not presented as settled standards.
