# UECE Capability Maturity and Assessment Model v0.3.0

## Purpose and boundaries

This model assesses the demonstrated management maturity of an enterprise capability, not the quality of an individual employee, application, process or technology product. An assessment is scoped to a tenant, enterprise, capability definition version and declared context. Industry benchmarks require comparable cohorts and must not be inferred from illustrative seed data.

## Five maturity levels plus an explicit unassessed state

| Level | Name | Observable characteristics |
|---:|---|---|
| 0 | Not assessed | No sufficient evidence to assign a maturity level. This is not a maturity score. |
| 1 | Initial / Ad hoc | Outcomes depend on individuals; execution is inconsistent; ownership and controls are informal. |
| 2 | Repeatable | Basic ownership, repeatable practices and local measures exist; variation and dependencies remain. |
| 3 | Defined | Standardized, documented and governed practices; roles, interfaces and controls are explicit. |
| 4 | Managed / Measured | Outcome and operational measures are monitored; controls are tested; decisions use performance evidence. |
| 5 | Optimizing | Continuous improvement is systematic; learning loops, experimentation and adaptive optimization are demonstrated. |

Level 0 is a non-score state. A capability with no evidence remains unassessed; it must not be assigned 0 and averaged into a maturity score.

## Assessment dimensions

1. Strategy and outcomes — business outcomes, strategic alignment and value ownership.
2. Governance and accountability — decision rights, owners, policies and controls.
3. Process and operating model — repeatability, standardization, handoffs and service boundaries.
4. People and organization — skills, roles, capacity and knowledge continuity.
5. Data and measurement — data quality, KPIs, lineage, reporting and evidence.
6. Technology and automation — enabling platforms, integration, resilience and automation.
7. Risk, security and compliance — risk treatment, assurance, privacy and regulatory controls.
8. Continuous improvement — feedback, root-cause learning, experimentation and optimization.

Each dimension is scored 1–5 only when evidence supports a level. Keep missing dimension scores null/absent; do not impute.

## Scoring and aggregation

- Assessors record dimension scores, rationale and evidence references.
- Capability maturity is the arithmetic mean of valid dimension scores, rounded to one decimal, only when at least 5 of 8 dimensions have evidence and the assessment is validated.
- The aggregate is a summary indicator; always display dimension scores and evidence coverage alongside it.
- If fewer than 5 dimensions are assessed, aggregate maturity is null and status is insufficient_evidence.
- Target maturity is set by enterprise strategy, risk and service criticality; it is not universally 5.
- Gap = target level minus current aggregate, floored at zero. If current aggregate is unavailable, gap is unassessed.
- Confidence is reported separately from maturity and is not multiplied into the score.

## Evidence quality

Evidence should be traceable, current, attributable and relevant to the capability and declared context. An assessor should distinguish policy existence from operating effectiveness. A document alone does not prove consistent execution. Evidence can include approved policies, process records, service metrics, audit findings, system records, interviews and direct observations.

Evidence quality dimensions: relevance, recency, reliability, coverage and independent validation. Store source references and access controls; avoid copying sensitive source data into the assessment record.

## Coverage and gap analysis

Coverage measures how many in-scope capabilities have validated assessments. It is not maturity. Report separately:
- catalog coverage: assessed capabilities / applicable in-scope capabilities;
- evidence coverage: assessed dimensions / 8;
- maturity distribution: counts by level, excluding unassessed;
- target gap: current vs target, only where a validated score exists;
- unassessed backlog: capabilities requiring discovery or evidence.

Applicability states remain independent. Not-applicable and externally-provided capabilities are reported separately and excluded from the internal maturity denominator only when approved with rationale.

## Governance lifecycle

not_started → in_progress → submitted → validated → approved. Rejected and superseded are explicit terminal/revision states. A self-assessment can be submitted but cannot become approved without designated validation. Revisions create a new assessment version; approved records are immutable.

## Industry comparison

Do not publish rankings from the seed overlays. Benchmarking requires a defined peer cohort, comparable capability definitions, context normalization, consistent assessment protocol, sample-size disclosure, confidence intervals or dispersion, and privacy protection. Show cohort counts and methodology; suppress small cohorts.

## Decision outputs

- Heatmap: capability × maturity dimensions.
- Gap register: target, current, gap, owner, evidence and remediation action.
- Investment prioritization: strategic value, risk exposure, dependency and effort — separately scored and explained.
- Executive view: maturity distribution, assessment coverage, top gaps, critical unassessed capabilities and trend over approved assessment snapshots.

## Non-goals

This model does not automatically infer maturity from tool inventory, documentation volume, AI model output or vendor adoption. AI may suggest evidence mappings and candidate scores; a human assessor validates and approves them.
