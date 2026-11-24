# EPF Shared Platform Services — Design Starter

**Status:** Starter; service-level designs deferred.

## Service catalog

| Service | Responsibility | Design topics |
|---|---|---|
| Identity Broker | Human, client, agent and workload identity | Federation, token exchange, mapping |
| Authorization | Subject/action/resource/context decisions | RBAC, ABAC, tenant scope |
| Policy Service | Versioned policy evaluation | Decision API, lifecycle, enforcement |
| Secrets Broker | Task-scoped secret delivery | References, short-lived access, rotation |
| Knowledge Service | Search approved enterprise content | Sources, indexing, access filtering |
| Memory Service | Govern session/workflow/agent memory | Scope, retention, retrieval, deletion |
| Event Service | Publish/consume domain events | Schema, delivery, replay |
| Audit Service | Attributable tamper-evident records | Append-only, integrity, retention |
| Approval Service | Human authorization | Delegation, separation of duties, expiry |
| Evidence Service | Store/retrieve proof | Provenance, checksums, control mapping |
| Observability | Correlated telemetry | OpenTelemetry, retention, tenant isolation |
| FinOps | Cost allocation and analysis | Budgets, estimates, actuals, unit economics |
| Evaluation | Agent/engine quality measurement | Datasets, scoring, regression gates |

## Shared service contract
Define owner, API/event contract, data ownership, authentication, authorization, tenant behavior, SLO, error taxonomy, rate limits, audit events and retention.

## Cross-cutting requirements
Propagate tenant and correlation context; never return secrets to model context or ordinary logs; include policy version and reason codes; audit actor/action/resource/outcome/time; enforce source-level knowledge authorization; purpose-limit memory; link costs to workload and project; avoid sensitive telemetry payloads.

## Open decisions
Service decomposition, token format, policy engine, event platform, evidence storage, knowledge indexing, memory architecture and retention requirements.
