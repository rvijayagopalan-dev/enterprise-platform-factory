# EPF Engineering Engine Design Catalog

**Status:** Starter catalog; detailed engine designs deferred.

## Common engine model
An Engine is a registered, versioned and policy-governed capability performing a bounded engineering function. It may combine deterministic software, AI agents, templates and tools. Execution is dispatched by the factory within an approved boundary.

## Standard engine specification
For each engine define purpose/outcomes, owner/version/lifecycle, task types, capability declaration, input/output schemas, internal components, agent/model use, connectors and permissions, security controls, failure/retry/idempotency, telemetry/audit/cost, tests, APIs/events and deployment model.

## Engine portfolio

| Engine | Responsibility | Key outputs |
|---|---|---|
| Interpreter | Intent and requirement analysis | Intent, clarifications, requirements |
| Blueprint | Pattern selection and architecture | Blueprint, architecture model |
| Orchestrator | Workflow/task coordination | Workflow, plan, task events |
| UI | Frontend generation and validation | UI source, design artifacts, tests |
| API | Service and API engineering | OpenAPI, service source, contract tests |
| Data | Data models and pipelines | Schemas, pipelines, quality rules |
| Integration | Connectors and event integration | Adapters, mappings, event definitions |
| Test | Test planning and execution | Test suites, results, coverage |
| Infrastructure | IaC, plan and controlled apply | Modules, plans, resource changes |
| Security | Threat analysis and validation | Findings, controls, evidence |
| Observability | Telemetry and SLO instrumentation | Dashboards, alerts, SLO definitions |
| FinOps | Cost modeling and optimization | Estimates, allocation, recommendations |
| Documentation | Technical docs and diagrams | ADRs, runbooks, API/design docs |

## Registry metadata
Engine ID, name, version, owner, status, task types, capabilities, schema references, required connectors, risk class, environments, resource profile, evaluation results and provenance.

## Open decisions
Engine deployment unit, agent embedding versus separate scheduling, compatibility policy, certification thresholds, module ownership and isolation tier by task risk.
