# EPF Relationship Model

**Status:** Starter; cardinalities and canonical ERD to be finalized.

## Candidate relationships

| Source | Relationship | Target | Candidate cardinality |
|---|---|---|---|
| Conversation | contains | Conversation Session | 1:N |
| Conversation Session | initiates | Build Request | 1:N |
| Build Request | interpreted as | Intent | 1:1 or 1:N |
| Intent | decomposes into | Requirement | 1:N |
| Build Request | produces | Specification | 1:N versions |
| Specification | proposes | Blueprint | N:M |
| Blueprint | realizes | Architecture Model | 1:N versions |
| Architecture Model | contains | Architecture Component | 1:N |
| Architecture Model | selects | Technology Stack | N:M |
| Build Request | governed by | Factory Workflow | 1:N |
| Factory Workflow | contains | Engineering Task | 1:N |
| Engineering Task | assigned to | Agent / Engine | N:1 or N:M |
| Engineering Task | has attempts | Execution Run | 1:N |
| Execution Plan | sequences | Engineering Task | N:M |
| Engine | provides | Capability | N:M |
| Engine Template | composes | Module | N:M |
| Execution Run | produces | Artifact | 1:N |
| Infrastructure Plan | proposes changes to | Infrastructure Resource | N:M |
| Deployment | deploys | Artifact | N:1 |
| Deployment | targets | Environment | N:1 |
| Policy | governs | Resource/action/scope | N:M |
| Control | evidenced by | Evidence | 1:N |
| Approval | authorizes | Plan/action | N:1 |
| Cost Record | attributes to | Workflow/resource/project | N:M |
| SLO | measures | Service/deployment | N:M |
| Incident | affects | Service/deployment/SLO | N:M |
| Integration | uses | Connector | N:1 |
| Connector | exposes | Capability | N:M |
| Audit Event | references | Actor/resource/workflow | N:M |

## Relationship metadata
Where needed, record relationship type, source/target IDs and versions, cardinality, ownership, effective dates, provenance, policy scope, dependency metadata and lifecycle propagation.

## Integrity rules
- Prevent cross-tenant references unless explicitly authorized.
- Workflows reference immutable specification and blueprint versions.
- Runs reference task and workflow.
- Deployments reference immutable artifact and target environment.
- Approval binds to the exact action/plan digest and environment.
- Evidence identifies producer, subject, time and integrity checksum.
- Deletion follows retention and archival rules.

## Deliverables and open questions
Create domain and consolidated ERDs, cardinality decisions, integrity constraints and validation tests. Decide aggregate ownership, dependency entity design, cross-tenant catalog sharing, external resource mapping and relationship event semantics.
