# Capability Model Gap Register

**Version:** 1.0.0  
**Status:** Draft — evidence-based assessment of the Universal Enterprise Capability Explorer  
**Assessment basis:** Uploaded `universal-enterprise-capability-explorer(1).html` and the Capability Factory design documents in this repository  
**Owner:** Capability Factory workstream  
**Author:** @rvijayagopalan  
**Last updated:** 2026-11-24

## 1. Purpose

This register records the gaps between the current Universal Enterprise Capability Explorer and the intended governed capability-intelligence model. It provides traceable findings, recommendations, priorities and acceptance criteria before the explorer or its data model is changed.

The register distinguishes:

- **Source observation:** behavior or structure directly present in the inspected HTML and embedded dataset.
- **Architecture assessment:** a gap inferred from the source behavior relative to the Capability Factory design objectives.
- **Proposed change:** a recommendation, not an already implemented feature or accepted enterprise standard.

The current explorer is a useful catalogue and interaction prototype. It is not yet a governed capability system of record.

## 2. Baseline inspected

The HTML prototype provides:

- 62 industry categories.
- 15 proposed universal L1 domains.
- Industry capability hierarchies with L1, L2 and L3 entries.
- Capability exploration, search and industry filtering.
- A three-industry comparison view.
- Enterprise composition from universal, primary-industry, secondary-industry and free-text specialization entries.
- Local maturity assessment fields for owner, applications, maturity, AI opportunity, KPI and notes.
- JSON, CSV and assessment exports.

The embedded model marks industry definitions as proposed working models requiring SME validation. The comparison applicability matrix contains explicit mappings for seven named industries; the implementation defaults to all universal L1 IDs for industries without an explicit matrix entry. The composition function selects all universal L1 entries, all primary-industry L1 entries, only the first four L1 entries for each secondary industry, and at most one free-text specialized entry. Assessment records are browser-local.

These observations are specific to the inspected prototype and should be rechecked against any later version.

## 3. Prioritized gap register

Priority definitions:

- **P0 — Foundational:** resolve before treating composed models as dependable or using them as an authoritative architecture input.
- **P1 — Important:** required for governed enterprise-scale use and meaningful capability intelligence.
- **P2 — Strategic extension:** enables broader benchmarking, automation and factory ecosystem integration.

| ID | Priority | Gap | Evidence / current limitation | Proposed change | Acceptance criteria |
|---|---|---|---|---|---|
| CG-001 | P0 | Generic L2/L3 decomposition | Many industry L1 branches reuse a common four-part pattern: strategy/planning; work allocation and execution; regulatory/safety/compliance assurance; performance/improvement. L3 descriptions repeat generic policy, execution, evidence and KPI language. | Define domain-specific decomposition rules and replace generic templates with actual industry operating capabilities. Keep management/control concerns as separate cross-cutting capabilities or dimensions where appropriate. | Sampled industries have SME-reviewable L2/L3 definitions that describe distinct abilities, not repeated process phases. Each definition has scope, outcome and boundary. |
| CG-002 | P0 | Specialized layer is not a structured catalogue | The UI offers a specialization text field and layer checkbox, but composition emits one free-text row rather than a structured hierarchy. | Implement specialized extension entities for sub-industry, business model, product/service type, jurisdiction and operating context. | A specialization can contain multiple linked capabilities, stable IDs, parent/extension relationships, provenance and version. |
| CG-003 | P0 | Composition is concatenation, not semantic resolution | Secondary industries contribute only the first four L1 entries; duplicate detection, semantic overlap, inheritance and dependency resolution are absent. | Build a deterministic composition/resolution engine with candidate selection, inheritance, deduplication, conflict handling and review. | Composition is complete for selected scopes, deterministic for pinned catalogue versions, reports duplicates/conflicts and preserves lineage. No arbitrary first-four truncation. |
| CG-004 | P0 | Commonality/applicability is overstated | Explicit universal applicability mappings exist for seven industries. The comparison helper defaults missing industry mappings to all 15 universal domains. | Model applicability as an explicit state with evidence: universal, contextualized, conditional, not applicable, or unassessed. | Missing mappings render as unassessed, never silently applicable. Every asserted mapping records rationale, source, reviewer and confidence. |
| CG-005 | P0 | Capability semantics are under-specified | The tree primarily carries ID, name, level and nested children; definitions, scope, outcomes, exclusions and boundaries are not consistently modeled in the industry data. | Establish a canonical capability definition contract and validation rules. | Every publishable capability has stable ID, canonical name, definition, level, parent, layer, scope/context, outcomes, lifecycle, version and provenance. |
| CG-006 | P0 | Hierarchy is treated as the main relationship model | Nested JSON represents parent-child hierarchy, but not rich typed links between capabilities. | Add typed capability relationships: specializes, extends, realizes, depends-on, enables, overlaps, collaborates-with, supersedes and equivalent-to. | Relationship types have directionality, cardinality rules, lifecycle and provenance; graph validation detects cycles where prohibited. |
| CG-007 | P1 | Capability-to-enterprise-architecture traceability is incomplete | Assessment form has free-text owner, applications and KPI fields; there are no formal references to value streams, processes, organization, products, data, application services, technology, controls or outcomes. | Introduce typed references to enterprise architecture objects and maintain many-to-many mappings. | A capability can be traced to value streams, processes, organization/roles, products/services, information/data, applications/technology, risks/controls and outcomes using stable references. |
| CG-008 | P1 | Capability ownership and stewardship are weakly governed | Owner is free text in a local assessment record; no accountable role, steward, approval state or ownership history exists. | Define business owner, steward, accountable executive, review group and decision rights as governed principal references. | Published capability definitions have accountable ownership and review responsibility; changes are auditable. |
| CG-009 | P1 | Maturity assessment is too narrow | A single 1–5 score is captured alongside notes and other free-text fields. No assessment dimensions, evidence, confidence, target state or assessment period are modeled. | Add multidimensional assessment: strategy alignment, process, people, information/data, technology, governance, performance, automation/AI and resilience as applicable. | Assessments capture scale definition, dimension, current/target state, evidence, assessor, confidence, date and review status. Blank remains distinct from zero/low. |
| CG-010 | P1 | No capability criticality or value model | The prototype captures a KPI as text but not strategic importance, customer impact, financial contribution, operational criticality or regulatory criticality. | Add value, criticality and investment attributes with explicit scoring guidance. | Capability portfolio can be prioritized by strategic value, operational/regulatory criticality, customer impact, cost and investment need with evidence. |
| CG-011 | P1 | Industry taxonomy is flat and weakly classified | The 62 entries are presented as peer categories despite differences in abstraction such as broad industries, sectors, institutional domains and specialist contexts. | Introduce a governed industry classification and typed relationships among sector, industry, subsector, institutional domain and specialist operating context. | Every industry entry has classification type, parent/related categories, source and version; cross-industry and multi-industry cases are supported. |
| CG-012 | P1 | Business-model variation is not composable | Business-model context is a free-text field; the model cannot select reusable business-model overlays. | Define reusable business-model patterns such as B2B, B2C, B2B2C, marketplace, subscription, platform, asset owner/operator and public-service models where relevant. | Enterprise composition can select multiple business-model overlays and resolve their capability additions/constraints. |
| CG-013 | P1 | Geography and regulatory jurisdiction are not first-class context | Jurisdiction is mentioned conceptually but not captured by the composer or applicability engine. | Add geography/jurisdiction overlays linked to obligations, regulators, controls and localized capability variants. | A multinational enterprise can compose a global baseline with regional and country overlays without duplicating the global definition. |
| CG-014 | P1 | Capability lifecycle and version governance are incomplete | Draft labels exist, but no formal approval workflow, immutable version, supersession or migration mechanism is implemented. | Define lifecycle states, versioning, approval, deprecation and migration mappings. | Enterprise models pin catalogue versions; changes produce reviewable diffs and migration impact; deprecated IDs remain traceable. |
| CG-015 | P1 | Provenance and validation evidence are insufficient | The UI warns that models need SME validation, but individual definitions do not consistently expose sources, reviewers, validation dates or confidence. | Add source provenance, evidence references, reviewer, validation date, confidence and rationale at capability and relationship level. | Every accepted definition and non-trivial mapping has traceable provenance and review history. |
| CG-016 | P1 | Performance and benchmark model is missing | KPI is a free-text field; no metric definition, unit, baseline, target, actual, period or benchmark source exists. | Define metric references and performance observations separately from capability definitions. | Capabilities can link to governed metrics with units, baseline, target, actual, period, source and benchmark provenance. |
| CG-017 | P1 | Cross-cutting capabilities are not distinguished from industry-specific ones | Risk, quality, safety, resilience, security, sustainability and regulatory concerns may be embedded in generic industry L2 branches or scattered across universal domains. | Model cross-cutting capabilities and control overlays explicitly, with reusable mappings to industries and specializations. | Cross-cutting capabilities are reusable without forcing them into every industry hierarchy; industry-specific realization remains expressible. |
| CG-018 | P1 | Capability-to-factory relationship is absent from the explorer | Factory mapping exists in separate discussion documents but is not represented in capability composition or assessment. | Add a many-to-many capability-to-factory mapping with realization role, coverage, dependency and confidence. | A capability can be realized by multiple factories and a factory can realize multiple capabilities; mappings distinguish candidate from approved. |
| CG-019 | P1 | Enterprise-specific local extensions lack governance | Composition accepts a free-text specialization without stable identity, ownership, lineage or promotion path. | Support enterprise-local capability definitions and controlled promotion into shared catalogues. | Local definitions have stable IDs, scope, owner, provenance and lifecycle; promotion/deprecation is governed. |
| CG-020 | P2 | External reference-model crosswalks are absent | No explicit mapping to external capability frameworks, industry reference models or standards is implemented. | Add crosswalk entities with source framework/version, mapping type, confidence and rationale. | A capability can map to multiple external references without conflating their definitions or claiming certification. |
| CG-021 | P2 | No model quality/evaluation framework | The prototype has no automated validation for duplicates, naming quality, hierarchy consistency, coverage, generic-template repetition or orphan references. | Add catalogue linting and evaluation datasets with measurable quality gates. | CI or validation tooling checks schema, ID uniqueness, hierarchy, references, duplicate candidates, generic text patterns and required metadata. |
| CG-022 | P2 | No AI-assisted discovery and governance workflow | Search is text filtering; no assisted classification, candidate mapping, gap detection or reviewer workflow exists. | Add AI-assisted suggestions with evidence, confidence, human review and audit trail. | AI output is explicitly a proposal; no model change is published without authorized human approval. |
| CG-023 | P2 | Capability model is not connected to factory portfolio planning | Factory ecosystem is described separately; no prioritization from capability gaps to factory investment or blueprint selection is available. | Add capability-to-factory coverage, maturity gap, investment, dependency and portfolio prioritization views. | Decision-makers can identify capability gaps, candidate factory responses, shared factory reuse and investment trade-offs. |
| CG-024 | P2 | Data export is not a governed interchange contract | JSON and CSV exports are UI-specific snapshots; no schema version, canonical API contract or import validation is defined. | Define versioned JSON schema and interchange format for capability definitions, relationships, compositions and assessments. | Export/import round trips preserve IDs, versions, relationships, provenance and assessment references; invalid imports report actionable errors. |

## 4. Universal L1 coverage review candidates

The current 15 universal L1 domains should be reviewed before expanding the top-level taxonomy. The following are candidate coverage gaps or boundary questions, not approved new L1 domains:

| Candidate area | Current apparent coverage | Review question |
|---|---|---|
| Business architecture and enterprise architecture | Distributed across strategy, technology and transformation | Should architecture management be explicit at L2 or as a cross-cutting capability? |
| Enterprise knowledge and intellectual capital | Split across data and support services | Is knowledge management sufficiently represented beyond data management? |
| Ecosystem and partner management | Distributed across customer, sales and procurement | Does partner/ecosystem orchestration need explicit capability coverage? |
| Sustainability and ESG | Not explicit in the 15-domain summary | Should sustainability be a universal capability or cross-cutting overlay? |
| Enterprise resilience and continuity | Partly implied in operations and risk | Is resilience a distinct reusable capability with explicit ownership and measures? |
| Physical asset lifecycle management | Present in some industry extensions | Should a common asset-management capability be modeled universally and specialized by industry? |
| Research and scientific development | Partly grouped with innovation | Does research require a distinct universal or cross-domain capability? |
| Regulatory intelligence and affairs | Split across risk and legal | Are regulatory change intelligence and regulatory engagement clearly covered? |
| Corporate and physical security | Partly implied by risk and technology | Should physical, personnel, information and cyber security be separated or related? |
| Master data and information governance | Partly covered by data management | Are master/reference data and information lifecycle capabilities sufficiently explicit? |

The review must check completeness, overlap, semantic stability and usefulness for composition. Do not add L1 domains merely to mirror organizational departments or factory names.

## 5. Proposed capability definition contract

A publishable capability definition should include, at minimum:

| Field | Requirement |
|---|---|
| id | Stable, never-reused identifier |
| canonicalName | Governed name |
| definition | Outcome-oriented statement of the ability |
| level | L1, L2, L3 or governed deeper level |
| layer | Universal, industry, specialized or enterprise-local |
| parentId | Parent reference when hierarchical |
| context | Industry, sub-industry, business model, product/service, geography and operating context as applicable |
| scope | Included and excluded boundaries |
| outcomes | Outcomes enabled or materially supported |
| aliases | Alternate terminology and industry synonyms |
| relationships | Typed references to other capabilities |
| ownership | Business owner and steward references |
| lifecycleState | Proposed, draft, in-review, accepted, deprecated or superseded |
| version | Immutable semantic version or governed revision |
| provenance | Source, author, rationale, evidence, reviewer and validation date |

A capability definition describes an enduring ability. Activities and process steps may be associated as examples or linked process references, but must not be used as a substitute for capability semantics.

## 6. Applicability and extension semantics

Applicability should use explicit states:

- **Universal:** the underlying ability is relevant across enterprise contexts, though realization may differ.
- **Contextualized:** applicable, with industry/context-specific definition or constraints.
- **Conditional:** applicable only when a stated business, regulatory or operating condition is true.
- **Not applicable:** reviewed and explicitly excluded for the selected enterprise context.
- **Unassessed:** no validated decision exists.

Extension relationships should distinguish:

- **Reuse:** same capability semantics; reference the canonical definition.
- **Specialization:** preserves parent meaning while adding context-specific outcomes, scope or constraints.
- **Addition:** introduces a new capability with explicit dependencies or related parent context.
- **Replacement proposal:** proposes a semantic successor or alternative and requires governed approval and migration.
- **Alias:** alternate term for the same semantic capability; does not create a new capability.

## 7. Composition engine requirements

The composition engine should accept a version-pinned enterprise context:

- Enterprise and business-unit scope.
- Primary and secondary industry classifications.
- Sub-industry and specialist contexts.
- Business models and product/service families.
- Operating geographies and jurisdictions.
- Selected universal capability baseline.
- Enterprise-local additions and exclusions.
- Existing architecture and factory references, where available.

It should produce:

1. A composed capability model with stable references and resolved hierarchy.
2. Applicability decisions and their evidence.
3. Inheritance and specialization lineage.
4. Duplicate and semantic-overlap candidates.
5. Dependency and coverage analysis.
6. Unresolved conflicts and human review tasks.
7. A versioned composition manifest that can be reproduced.

The engine may recommend mappings, but approval of the enterprise model remains a governed human decision.

## 8. Capability-to-factory mapping requirements

Capability-to-factory mapping is many-to-many and must not imply one factory per capability.

A mapping should record:

- Capability reference and version.
- Factory blueprint or instance reference and version.
- Relationship: realizes, partially realizes, enables, governs or consumes.
- Coverage scope and exclusions.
- Dependencies on other factories or shared services.
- Delivery mode: people-led, process-led, platform-enabled, automated or AI-agent-enabled.
- Mapping status: candidate, reviewed, approved, deprecated.
- Evidence, rationale, owner and confidence.

A capability may be fulfilled by existing people, processes, external providers or platforms without a dedicated factory. Factory creation should be justified by repeatability, scale, reuse, control, economics and measurable outcomes.

## 9. Recommended delivery sequence

| Sequence | Work package | Register items | Exit condition |
|---|---|---|---|
| 1 | Canonical semantics and definition schema | CG-005, CG-006, CG-015 | Definition contract and relationship vocabulary reviewed |
| 2 | Industry hierarchy quality remediation | CG-001, CG-011, CG-017 | Pilot industry models have meaningful SME-reviewable decomposition |
| 3 | Specialization and context model | CG-002, CG-012, CG-013, CG-019 | Structured overlays and inheritance rules demonstrated |
| 4 | Composition and applicability engine | CG-003, CG-004, CG-024 | Deterministic, version-pinned composition with explicit unassessed states |
| 5 | Enterprise architecture and intelligence mapping | CG-007, CG-008, CG-009, CG-010, CG-016 | Traceability, assessment evidence and value measures represented |
| 6 | Factory ecosystem linkage | CG-018, CG-023 | Many-to-many mapping and candidate factory coverage analysis |
| 7 | Governance, evaluation and AI assistance | CG-014, CG-020, CG-021, CG-022 | Lifecycle, quality gates, crosswalks and human-reviewed AI workflow |

## 10. Suggested pilot validation set

Use a deliberately diverse pilot to test the model's ability to express different operating environments:

1. Banking — regulated, information-intensive, transaction and risk-heavy.
2. Healthcare — clinical, safety-critical, service and research-intensive.
3. Manufacturing — physical assets, production, quality and supply chain.
4. Renewable Energy — asset-intensive, project lifecycle, grid and environmental context.
5. Government — public policy, citizen services, public finance and jurisdictional obligations.
6. Retail / E-commerce — omnichannel, marketplace, customer and fulfillment business models.

The pilot should validate the universal model, industry-specific decompositions, specialization overlays and cross-industry relationships before expanding or certifying the full catalogue.

## 11. Governance and status

This register is a proposed design backlog. Priority does not mean implementation has started or that a design decision is accepted.

For each gap, track:
- Status: Open / In Analysis / Proposed / Accepted / Implemented / Verified / Deferred.
- Decision or issue reference.
- Owner and reviewer.
- Target version.
- Evidence and test results.
- Affected catalogue definitions, schemas, APIs and user experiences.

No industry model should be described as certified, standard-compliant or authoritative solely because it appears in the explorer. SME validation and source provenance are required.

## 12. Related documents

- [Capability Factory workspace](README.md)
- [Universal Capability Meta-Model](capability-meta-model.md)
- [Universal Capability Catalog](universal-capability-catalog.md)
- [Industry Capability Extensions](industry-capability-extensions.md)
- [Specialized Capability Extensions](specialized-capability-extensions.md)
- [Capability Composition Engine](capability-composition-engine.md)
- [Enterprise Factory Ecosystem](enterprise-factory-ecosystem.md)
- [Factory Meta-Model](factory-meta-model.md)
- [Open Questions and Decisions](open-questions-and-decisions.md)
- [EPF enterprise meta-model](../docs/metamodel/enterprise-meta-model.md)
