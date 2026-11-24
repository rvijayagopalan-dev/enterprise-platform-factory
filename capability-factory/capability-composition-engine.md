# Capability Composition Engine

**Status:** Discussion draft  
**Version:** 0.1.0

## 1. Purpose

The Capability Composition Engine assembles an enterprise-specific capability model from governed universal definitions, industry extensions and specialized extensions.

It is the mechanism that turns a reusable capability meta-model and catalogs into a contextual model for a particular enterprise, subsidiary, business unit or transformation scope.

## 2. Conceptual inputs

- Enterprise context: purpose, scope, business model, geography, operating footprint and organizational boundaries.
- Universal capability catalog and version.
- Selected industry model(s) and versions.
- Specialized capability extensions and versions.
- Enterprise-specific requirements and exclusions.
- Existing capability assessments and maturity information, where available.
- Provenance and governance constraints.

## 3. Conceptual processing stages

1. **Context interpretation** — establish the enterprise, scope, business model, jurisdictions and industry footprint.
2. **Candidate selection** — identify relevant universal, industry and specialized capabilities.
3. **Reuse and extension resolution** — link to common definitions and apply approved variations.
4. **Dependency analysis** — identify prerequisite, enabling, supporting and interacting capabilities.
5. **Conflict and overlap detection** — find duplicate, incompatible or semantically ambiguous definitions.
6. **Scope configuration** — mark capabilities as applicable, not applicable, planned, outsourced or externally provided.
7. **Relationship mapping** — connect capabilities to value streams, business processes, applications/data and technology/AI.
8. **Validation** — check hierarchy, parentage, extension rules, completeness and governance.
9. **Publication** — issue a versioned enterprise-specific capability model with provenance.
10. **Feedback and evolution** — incorporate assessment results, business changes and approved model updates.

## 4. Conceptual outputs

- Enterprise-specific capability hierarchy.
- Capability-to-source traceability (universal, industry, specialized or enterprise-local).
- Applicability and scope decisions.
- Capability relationships and dependencies.
- Capability-to-value-stream mappings.
- Capability-to-process mappings.
- Capability-to-application/data mappings.
- Capability-to-technology/AI mappings.
- Identified gaps, overlaps, conflicts and unresolved decisions.
- Versioned model and audit/provenance record.

## 5. Validation rules (proposed)

- Every composed capability has a stable identity and source provenance.
- Every extension has a valid parent or an explicit root-level justification.
- A specialization does not silently redefine its parent.
- Duplicate definitions are flagged for reuse or reconciliation.
- Relationships do not create invalid hierarchy cycles.
- Applicability decisions include scope and rationale.
- Enterprise-local capabilities are distinguishable from catalog capabilities.
- Every published model references exact catalog and extension versions.
- Mappings to processes, applications, data and technology remain typed and traceable.

## 6. Relationship to the factory ecosystem

The Capability Composition Engine should not simply generate one factory for each capability.

Instead, a later Factory Composition Engine can evaluate the composed capability model alongside:
- Required production lifecycle.
- Reuse potential across business units.
- Domain specialization and knowledge requirements.
- Automation and agent suitability.
- Risk, control and assurance requirements.
- Existing platforms, suppliers and operating capabilities.
- Expected value, cost and operational ownership.

The output is a proposed factory portfolio and collaboration model, subject to enterprise architecture and business governance.

## 7. Human governance

The engine may recommend capability selection and mappings, but material semantic changes, scope decisions, ownership assignments and acceptance of the enterprise model require accountable review.

## 8. Future design artifacts

- Input/output schema.
- Capability resolution algorithm and rule catalog.
- Extension and inheritance semantics.
- Conflict-resolution strategy.
- Versioning and migration model.
- API and event contracts.
- User experience for capability modeling and review.
- Evaluation datasets and model quality measures.
