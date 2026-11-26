# Universal Enterprise Capability Explorer — Deep Dive

**Workstream:** Capability Factory  
**Product foundation:** Enterprise Platform Factory (EPF)  
**Meta-factory relationship:** Enterprise Meta Factory (EMF)  
**Version:** 2.0.0-draft  
**Status:** Proposed architecture and modeling guidance  
**Author:** @rvijayagopalan

## 1. Executive position

The Universal Enterprise Capability Explorer (UECE) is the governed discovery, composition, analysis and navigation experience for an enterprise capability knowledge model. It is not merely a static taxonomy, a list of departments, or a catalogue of processes.

UECE should answer five classes of questions:

1. **What must an enterprise be able to do?** Discover stable universal capability definitions.
2. **What changes by industry and business model?** Navigate industry, sub-industry, product, jurisdiction and specialist overlays.
3. **What is relevant to this enterprise?** Compose a contextual enterprise capability baseline with explicit applicability decisions.
4. **How well can the enterprise perform?** Assess maturity, health, risk, value, resilience, digital and AI enablement as separate dimensions.
5. **How is each capability realized and changed?** Trace capabilities to value streams, processes, people, data, applications, technology, controls, services and factories.

The Explorer is a product surface over a governed ontology and graph. The ontology and catalog are authoritative; the visual explorer is a view.

## 2. Place in the factory ecosystem

| Element | Responsibility | Relationship |
|---|---|---|
| UECE | Discover, classify, compose, assess and trace enterprise capabilities | Capability knowledge product |
| Capability Factory | Curate, validate, extend and govern capability models | Maintains the UECE model and catalog |
| EPF | Shared platform for identity, policy, knowledge, schema, events, audit, execution and integrations | Hosts capability services and APIs |
| EMF | Meta-factory that composes enterprise blueprints and specialized factories | Consumes UECE as a foundational design-time capability model |
| Human-AI Enterprise (HAE) | Human/AI target operating model and capability realization context | Can be modeled and assessed using UECE |
| EAIP | Shared enterprise autonomous intelligence capabilities and runtime | Enables AI-assisted modeling, analysis and governed actions |
| Specialized factories | Repeatable production systems for industry, business and technology outcomes | Realize selected capabilities through many-to-many mappings |

**Boundary:** UECE describes enterprise abilities. It does not itself execute business processes or manufacture solutions. EPF supplies platform services; EMF composes factories and blueprints; EAIP supplies governed intelligence/runtime services.

## 3. Core modeling dimensions — never collapse them

Each capability record must distinguish these independent dimensions:

### 3.1 Semantic classification
- **Universal:** reusable cross-industry ability.
- **Industry:** ability whose scope is materially shaped by an industry's value chain, regulation or operating model.
- **Specialized:** narrower capability shaped by sub-industry, product, service, business model, technology discipline or specialist context.
- **Enterprise-specific:** a capability unique to a particular enterprise or operating model; it may extend or compose existing definitions.

### 3.2 Decomposition depth
- **L1:** enterprise capability domain.
- **L2:** coherent capability branch.
- **L3:** actionable capability component.
- **L4+:** optional finer decomposition where ownership, measurement, architecture or realization requires it.

Semantic classification is orthogonal to depth. A specialized capability can be L1, L2, L3 or L4+. Not every capability requires the same depth.

### 3.3 Context
Industry, sub-industry, business model, product/service, geography, jurisdiction, enterprise scope, operating model, sourcing mode and lifecycle stage are context attributes or overlay entities—not hierarchy levels by default.

### 3.4 Applicability
Use explicit states: `unassessed`, `applicable`, `conditional`, `not_applicable`, `externally_provided`, `planned`. Missing evidence means unassessed. It must never be interpreted as universal or applicable.

### 3.5 Realization
A capability may be realized by one or more combinations of people, processes, organizational units, applications, data, technology, vendors, services and factories. These are typed relationships, not children in the capability taxonomy.

## 4. Proposed universal L1 reference domains

The following 15 domains are a proposed organizing baseline, not a claim that every organization has identical scope or requires all domains. Names and boundaries require review by business architecture and industry SMEs.

| Key | Universal L1 domain | Outcome focus | Boundary notes |
|---|---|---|---|
| U01 | Strategy and Corporate Management | Direction, strategic choices, enterprise performance | Includes corporate planning and governance; excludes execution capabilities owned by domains |
| U02 | Customer and Relationship Management | Customer/stakeholder understanding, relationship and experience | Distinguish customer relationship from marketing and sales execution |
| U03 | Marketing and Brand Management | Market insight, positioning, brand and demand creation | Demand generation is distinct from sales conversion |
| U04 | Sales and Commercial Management | Commercial opportunity, offer, negotiation and revenue commitments | Product lifecycle remains in U05 |
| U05 | Product and Service Management | Product/service portfolio, design, lifecycle and value | Delivery/operations are realized in U06 or industry domains |
| U06 | Operations Management | Reliable execution and continuous operational performance | Avoid generic process-phase branches; industry operations may extend this domain |
| U07 | Supply Chain and Procurement | External sourcing, supplier and supply network coordination | Separate procurement from inventory/logistics where the value chain needs it |
| U08 | Finance and Accounting | Financial stewardship, planning, control and reporting | Financial risk is linked to U10; treasury is a branch subject to scope |
| U09 | Human Capital Management | Workforce capacity, capability, experience and relations | Organizational design and workforce strategy may also link to U01 |
| U10 | Risk and Compliance Management | Risk exposure, control effectiveness and compliance | Legal advice belongs in U11; control ownership may be distributed |
| U11 | Legal and Corporate Affairs | Legal integrity, contracts, regulatory affairs and corporate interests | Compliance operations may be realized in U10 and industry domains |
| U12 | Technology and Digital Management | Secure, reliable and valuable technology/digital services | Data management is separately represented in U13 |
| U13 | Data and Information Management | Trusted, governed, available and useful information | Analytics/decision capabilities may be separate or linked according to scope |
| U14 | Enterprise Support Services | Effective workplace, facilities and shared administrative services | Do not use as a catch-all for unclassified capabilities |
| U15 | Innovation and Transformation | Adaptation, innovation and realized change | Transformation governance links to U01; delivery may be factory-based |

### 4.1 L1 quality test
A candidate L1 domain should:
- Represent an enduring enterprise ability, not a temporary initiative.
- Have a distinct outcome and accountable ownership community.
- Be sufficiently broad to contain coherent L2 branches.
- Avoid duplicating another L1's semantic scope.
- Be understandable across industries, with explicit context where meanings diverge.
- Support architecture, investment, assessment and operating-model decisions.

## 5. Universal branching patterns and commonality

Commonality across industries should be modeled as **reusable capability semantics and relationship patterns**, not by forcing identical child lists under every L1.

### 5.1 Reusable cross-domain patterns
These patterns can appear across many domains, but are not automatically capabilities under every domain:

1. **Direction and planning:** strategy, policy, planning, target setting and portfolio prioritization.
2. **Demand and intake:** need identification, request capture, qualification, prioritization and commitment.
3. **Design and engineering:** requirements, design, architecture, configuration, validation and change.
4. **Resource orchestration:** capacity, workforce, assets, suppliers, inventory, funding and scheduling.
5. **Execution and service delivery:** controlled execution, service fulfillment, case handling and exception management.
6. **Monitoring and assurance:** measurement, controls, evidence, auditability, risk and compliance.
7. **Performance and optimization:** KPI management, root-cause analysis, continuous improvement and benefits realization.
8. **Knowledge and information:** records, content, data quality, knowledge capture, retrieval and retention.
9. **Relationship and experience:** stakeholder engagement, communications, feedback and experience management.
10. **Lifecycle management:** onboarding, operation, maintenance, renewal, retirement and disposal.

These are candidate patterns and lenses. They should be promoted to capability definitions only when an enduring ability with distinct outcomes and ownership can be demonstrated.

### 5.2 Shared versus identical
- **Shared capability:** same semantic ability across contexts; reuse one canonical definition and attach multiple applicability assertions.
- **Contextualized capability:** same underlying ability with material context-specific constraints or outcomes; use a specialization or extension.
- **Similar wording, different meaning:** do not merge; retain separate capabilities and document the semantic distinction.
- **Common enabling pattern:** model as a reusable pattern or cross-cutting relationship if it does not represent an independently governed capability.

### 5.3 Anti-pattern: generic phase decomposition
Do not create the same L2/L3 branch sequence—strategy, planning, execution, compliance, performance—under every industry capability. This creates superficial symmetry and hides actual value-chain abilities. Instead, decompose each domain using domain-specific outcomes, capability boundaries and SME evidence. Cross-cutting assurance and performance capabilities should be linked through relationships when appropriate.

## 6. Industry and specialization model

An industry catalog should be a governed classification graph, not a flat dropdown. Separate:
- Sector / broad economic domain.
- Industry.
- Sub-industry.
- Institutional or public-service domain.
- Specialist operating context.
- Business model.
- Product/service archetype.
- Geography and regulatory jurisdiction.

Industry examples to support in the taxonomy include banking and capital markets, insurance, healthcare providers, healthcare payers, pharmaceuticals and biotechnology, retail and e-commerce, consumer goods, manufacturing, automotive, aerospace and aviation, energy and utilities, telecommunications, media and entertainment, transportation and logistics, construction and real estate, education, government and public administration, defense and security, agriculture, professional services, hospitality and travel, and nonprofit organizations. This is an illustrative coverage list, not a final exhaustive classification.

### 6.1 Overlay rules
1. Industry models extend universal definitions; they do not copy the universal catalog.
2. Sub-industry specializations inherit only through explicit lineage.
3. Business-model overlays are independent of industry (e.g. marketplace, subscription, B2B, B2C, platform, asset owner/operator, public service).
4. Jurisdiction overlays express legal/regulatory obligations and localization.
5. Enterprise-specific variants remain traceable to their base definition.
6. A capability may be applicable to multiple industries without being universal.
7. A capability may be shared across selected industries; represent this as multi-context applicability, not a false universal label.

## 7. Capability graph and relationships

Hierarchy is only one graph edge. The model must support:
- `parentOf` / `childOf`
- `specializes` / `extends`
- `dependsOn` / `enables` / `supports`
- `overlapsWith` / `complements`
- `supersedes` / `mapsTo`
- `realizedBy` / `partiallyRealizedBy`
- `ownedBy` / `stewardedBy`
- `measuredBy` / `governedBy`
- `consumes` / `produces` (for information/data relationships where the endpoint semantics support it)

Every relationship should carry source and target IDs/types, predicate, direction, rationale, confidence (where inferred), provenance, lifecycle, effective dates and review status. Validate prohibited hierarchy cycles and dangling references.

## 8. Enterprise composition engine

The composition engine creates a scoped enterprise model from pinned catalog versions and selected contexts.

### Inputs
- Enterprise profile and scope.
- Primary and secondary industries/sub-industries.
- Business-model overlays.
- Products/services and operating model.
- Geography/jurisdictions.
- Universal catalog version and selected industry/overlay versions.
- Enterprise-specific extensions and decisions.

### Resolution stages
1. **Normalize context:** resolve industry hierarchy, business model, product and jurisdiction identifiers.
2. **Load universal baseline:** include candidate universal capabilities, but do not mark them applicable by default.
3. **Resolve applicability:** apply explicit evidence-backed applicability assertions.
4. **Apply industry overlays:** add specialization and contextual constraints with lineage.
5. **Apply business-model and product overlays:** resolve additions, conditions and exclusions.
6. **Apply jurisdiction overlays:** link obligations, controls and localization.
7. **Apply enterprise extensions:** include approved enterprise-specific definitions.
8. **Resolve relationships:** calculate dependencies, overlaps, enablers and conflicts.
9. **Deduplicate semantically:** preserve one canonical identity where semantics are identical; retain distinct records where meaning differs.
10. **Human review:** surface uncertain mappings, inferred candidates and conflicts for approval.
11. **Publish snapshot:** store composition manifest, source versions, decisions, provenance and hash.

### Required outputs
- Enterprise capability baseline and context.
- Applicability matrix with explicit unknowns.
- Inheritance/lineage graph.
- Duplicate and conflict report.
- Dependency graph.
- Review queue.
- Version-pinned composition manifest.
- Exportable JSON/CSV and graph/API representations.

The composition must be deterministic for the same pinned inputs and decisions. No arbitrary truncation or silent defaulting.

## 9. Explorer experience — target modules

1. **Enterprise Overview:** profile, scope, industry mix, business models, jurisdictions and model health.
2. **Universal Capability Map:** L1–L4 tree with definitions, outcomes and boundaries.
3. **Industry Explorer:** industry/sub-industry classification and overlays.
4. **Commonality Explorer:** shared, contextualized and distinct capability comparisons across industries.
5. **Enterprise Composer:** select contexts and review the resolved baseline.
6. **Capability Inspector:** definition, scope in/out, outcomes, owner, evidence, relationships and version.
7. **Relationship Graph:** dependency, enablement, overlap, realization and governance links.
8. **Assessment & Heatmaps:** maturity, health, strategic value, criticality, risk, readiness and investment.
9. **Architecture Traceability:** value streams, processes, people, products, data, applications, technology, risks and controls.
10. **Factory Realization Map:** many-to-many capability-to-factory mapping, coverage, gaps and shared services.
11. **Governance Workbench:** proposals, review, approval, change impact, deprecation and audit.
12. **AI Modeling Assistant:** suggest definitions, detect duplicates, propose mappings and explain evidence; never auto-approve canonical changes.

## 10. Capability assessment model

Keep assessment dimensions independent and evidence-backed:
- Strategic alignment and contribution.
- Business performance and outcome achievement.
- Maturity and process effectiveness.
- People, skills and organizational readiness.
- Data and information readiness.
- Application and technology enablement.
- Security, risk, compliance and control effectiveness.
- Resilience and continuity.
- Automation and AI opportunity/readiness.
- Customer/stakeholder impact.
- Cost-to-serve and economic value.

Each assessment records scope, scale, current/target state, evidence, assessor, confidence, date, validity, review status and methodology version. Do not compute an aggregate score unless weights, purpose and limitations are explicit.

## 11. Governance and lifecycle

### Lifecycle
`draft → proposed → in_review → accepted → deprecated → retired`

Transitions require role-based authorization, evidence and audit. Rejected proposals remain traceable. Accepted catalog snapshots are immutable; new releases create versioned changes.

### Roles
- Capability owner: accountable for semantic meaning and business outcomes.
- Catalog steward: maintains metadata, relationships and quality.
- Industry SME: validates contextual definitions and applicability.
- Enterprise architect: validates boundaries, traceability and architecture relevance.
- Governance board: approves canonical taxonomy and breaking semantic changes.
- AI model/agent: proposes, analyzes and explains; cannot self-approve.

### Quality gates
- Outcome-oriented definition and scope boundaries.
- Distinctness from sibling and neighboring capabilities.
- Stable key and valid parent/relationship references.
- Context and applicability evidence.
- Source provenance and review history.
- No unsupported universal classification.
- No duplicate or generic phase-based decomposition.
- Traceability to architecture or realization where required.

## 12. AI-assisted intelligence

AI services can:
- Propose capability candidates from strategy, policies, operating procedures and industry sources.
- Compare definitions and detect near-duplicates.
- Recommend mappings across industry frameworks.
- Identify missing branches and inconsistent decomposition.
- Explain commonality and differences across industries.
- Generate draft definitions, scope boundaries and outcome measures.
- Analyze change impact across capabilities, processes, applications, controls and factories.

Guardrails:
- Source attribution and evidence snippets are mandatory.
- Confidence is not approval.
- Inferred mappings are visibly distinguished from validated mappings.
- Human reviewers approve canonical definitions and applicability.
- Tenant data and restricted enterprise models remain access-controlled.
- Model versions, prompts, decisions and changes are auditable.

## 13. API and event surface — proposed

Candidate resources:
- `/capabilities`, `/capabilities/{id}`, `/capabilities/{id}/relationships`
- `/industries`, `/contexts`, `/applicability`
- `/compositions`, `/compositions/{id}/manifest`
- `/assessments`, `/realizations`, `/crosswalks`
- `/catalog/releases`, `/governance/proposals`

Candidate events:
- `CapabilityDefinitionProposed`
- `CapabilityDefinitionAccepted`
- `CapabilityDefinitionDeprecated`
- `CapabilityRelationshipChanged`
- `CapabilityApplicabilityAssessed`
- `EnterpriseCompositionRequested`
- `EnterpriseCompositionPublished`
- `CapabilityAssessmentCompleted`
- `FactoryRealizationMapped`

These are design candidates; API and event contracts require separate security, tenancy, idempotency and schema review.

## 14. Non-functional requirements

- Multi-tenant isolation and fine-grained authorization.
- Version-pinned reproducible composition.
- Auditable provenance and immutable accepted releases.
- Search and graph traversal at enterprise scale.
- Accessibility and responsive exploration.
- Export and API interoperability.
- Localization and synonym management.
- Explainable AI recommendations and human approval.
- High availability for catalog reads; controlled writes and approvals.
- Data retention, classification and privacy controls.
- Observability for composition, search, inference and governance workflows.

## 15. Delivery roadmap

| Phase | Scope | Exit criteria |
|---|---|---|
| 0 — Model integrity | Reconcile current 15 L1 domains, source taxonomy and gap register | Approved semantic definitions and stable keys |
| 1 — Universal foundation | L1/L2/L3 definitions, schema, graph relationships, source provenance | Validated universal catalog and hierarchy tests |
| 2 — Industry architecture | Industry classification, overlay model, commonality rules | Multi-industry mappings with explicit applicability |
| 3 — Composition engine | Deterministic composition, deduplication, conflict and lineage | Reproducible composition manifest and review queue |
| 4 — Enterprise traceability | Value streams, processes, org, data, apps, tech, risks and controls | Queryable capability-to-architecture graph |
| 5 — Assessment & portfolio | Multidimensional assessments, heatmaps, investment | Evidence-backed portfolio views |
| 6 — Factory realization | Many-to-many factory mapping and coverage analytics | Capability-to-factory traceability and gap analysis |
| 7 — AI intelligence | Assisted curation, semantic search, impact analysis | Human-governed AI workflows with evaluation and audit |

## 16. Acceptance criteria for UECE v2

- Universal, industry, specialized and enterprise-specific semantics remain distinct.
- Decomposition depth is independent of semantic classification.
- Universal L1 definitions are outcome-oriented and have scope boundaries.
- Industry categories are typed and related, not a flat peer list.
- Commonality is evidence-based; similar wording is not treated as equivalence.
- Unassessed applicability is never silently promoted to applicable.
- Composition is deterministic, complete for selected contexts and version-pinned.
- Capability relationships extend beyond parent-child hierarchy.
- Enterprise architecture and factory realization mappings are many-to-many.
- Assessments are multidimensional and evidence-backed.
- Canonical changes require governed human approval.
- The Explorer is a view over the ontology/catalog APIs, not a second source of truth.

## 17. References and design inputs

- EPF Capability Ontology v1.0.0-draft: `product/components/capability-ontology.md`.
- EPF Capability Model Gap Register v1.0.0: `capability-factory/capability-model-gap-register.md`.
- ISO/IEC 19540-2:2022 UAF strategic taxonomy and capability structure views.
- IF4IT, *Designing, Building, and Maintaining Comprehensive and Usable Enterprise Capability Models*.
- C4I ontology research: modular, extensible capability ontology architecture.
- UK Department for Education business architecture guidance: capability categorization and decomposition principles.

External references are methodological inputs, not assertions that UECE conforms to or reproduces any one framework.
