# UECE Enterprise Capability Knowledge Graph & Realization Intelligence

**Release:** 0.4.0  
**Status:** Reference specification / proposed

## Purpose
Connect enterprise capability intent to the operating and technology landscape. Answer: Given strategy and target outcomes, which capabilities must be built, improved, bought, partnered, automated, orchestrated, or retired—and what evidence supports that decision?

## Graph model
Capabilities remain the stable business abstraction. They connect through typed, directed, provenance-bearing relationships to:
- Process: work performed to deliver outcomes (realizedByProcess).
- Role: accountability and decision rights (ownedByRole).
- Application: logical/physical software systems (supportedByApplication).
- Data: information assets and products (usesData).
- Technology: runtime, infrastructure and platforms (runsOnTechnology).
- Product: customer or internal offerings (enablesProduct).
- Risk and control: exposures and mitigating controls (exposedToRisk, mitigatedByControl).
- Factory and agent: repeatable engineering capabilities and digital workers (deliveredByFactory, orchestratedByAgent).
- Objective, metric and investment: strategic intent, measures and funding (enables, measures).

A relationship is a first-class record with endpoints, predicate, lifecycle, provenance, confidence, evidence and optional validity dates. Predicate semantics define direction. Similar names never establish identity.

## Realization modes
build, improve, buy, partner, automate, orchestrate, retire and not_decided. Status is separate: proposed, planned, in_progress, operational, blocked, retired.

## Coverage and traceability
The engine reports per-capability relationship coverage across requested dimensions, direct links, accepted links, evidence-bearing links, unresolved endpoints and missing realization dimensions. Proposed edges remain visible but do not count as authoritative coverage. No links means a visibility gap, not proof that a capability does not exist.

Baseline dimensions: process, role, application, data, technology, risk/control, product/outcome and factory/agent. Coverage is a traceability indicator, not a quality score.

## Governance invariants
1. Only accepted relationships contribute to authoritative traceability; proposed and in-review edges remain candidates.
2. Every edge has provenance. Evidence references must resolve in the production evidence service.
3. Missing evidence is not inferred from names, AI output or graph proximity.
4. Endpoint IDs are scoped and typed; dangling or type-invalid endpoints fail validation.
5. Capability identity is independent of process, organization, application, data, technology and factory identity.
6. Many-to-many capability-to-factory and capability-to-agent relationships are allowed.
7. Risk exposure and control mitigation are separate; a control link does not prove effectiveness.
8. Realization mode, status, budget and approvals are separate from graph edges.
9. Investment totals are reported only for compatible currencies and periods; no implicit FX conversion.
10. Publication requires enterprise authorization, policy checks and human approval.

## Decision intelligence
A realization decision should consider strategic contribution, criticality, current maturity, target gap, architecture coverage, risk exposure, reuse, dependency readiness, sourcing constraints, cost, time-to-value and accountable owner. v0.4 provides traceability and deterministic coverage/gap registers; it does not autonomously select funding decisions.

## Logical APIs
- POST /knowledge-graphs/validate
- GET /enterprises/{id}/capabilities/{capabilityId}/trace
- POST /realization/coverage-analysis
- GET /realization/gap-register
- POST /realization-decisions (approval workflow required)

## Roadmap
- v0.4: typed graph contracts, endpoint validation, traceability, coverage and realization dashboard.
- v0.5: strategy/objective/metric traceability, dependency and impact analysis, graph query API.
- v0.6: investment portfolio, scenario planning, cost/value/risk prioritization.
- v0.7: factory and agent realization catalog, control/evidence integration, operating-model views.
- v1.0: governed multi-tenant graph service, authorization, audit, immutable releases, APIs and production observability.

## Seed disclaimer
enterprise-architecture-graph-seed-v0.4.0.json is synthetic demonstration data. Every relationship is proposed and every confidence score is illustrative. It is not an actual enterprise inventory or assurance evidence.
