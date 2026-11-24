# EPF Data Architecture

**Status:** Starter; logical and physical data design deferred.

## Data domains

| Domain | Example data | Candidate persistence |
|---|---|---|
| Tenant and identity | Tenants, projects, memberships, grants | Relational |
| Product requests | Conversations, requests, clarifications | Relational/document |
| Specification and architecture | Requirements, specs, blueprints, decisions | Relational + versioned objects |
| Orchestration | Workflows, tasks, runs, approvals | Relational/workflow state |
| Catalog | Agents, engines, modules, connectors | Relational/catalog |
| Artifacts | Source bundles, plans, reports, test outputs | Object storage + metadata |
| Audit and evidence | Audit events, attestations, control evidence | Append-only/tamper-evident |
| Events | Domain event stream | Durable event platform |
| Knowledge | Standards, patterns, documents | Search; optional vector/graph |
| Telemetry | Logs, metrics, traces | Observability backend |
| FinOps | Estimates, usage and billing | Analytical/time-series |

## Governance requirements
Identify system of record and owner for every domain. Classify data and apply tenant-aware access. Minimize sensitive content in prompts/events/telemetry. Define retention, archival, legal hold and deletion. Encrypt data. Record provenance and checksums. Separate mutable operational state from immutable history. Define backup, restore and residency.

## Knowledge graph considerations
Use graph storage where traversal and impact analysis justify it. Do not introduce a graph database solely because the product has a meta-model; relational keys and indexed relationship tables may be sufficient initially.

## Deliverables
Logical/physical models, ownership matrix, classification and retention schedule, data flows, backup/restore, migration and access tests.
