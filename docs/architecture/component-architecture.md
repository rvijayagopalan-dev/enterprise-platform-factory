# EPF Component Architecture

**Status:** Starter; service boundaries and interfaces to be refined.

## Candidate bounded contexts

| Context | Candidate components | Responsibility |
|---|---|---|
| Experience | Portal BFF, Conversation API, Client Adapter | User and AI client interaction |
| Identity | Identity Broker, Tenant Context, Authorization | Authentication and access |
| Specification | Interpreter, Requirement Service, Specification Registry | Intent and requirements |
| Architecture | Knowledge Catalog, Blueprint Engine, Architecture Registry | Patterns and architecture |
| Orchestration | Workflow API, Orchestrator, Scheduler, Task Queue | Durable workflow execution |
| Agent Platform | Agent Registry, Agent Session, Evaluation | Agent lifecycle and capability |
| Engine Platform | Engine Registry, Engine Runtime, Template Registry | Engineering capabilities |
| Execution | Runner Controller, Workspace Manager, Connector Runtime | Isolated task execution |
| Delivery | Repository Adapter, CI Adapter, Artifact Registry | Source and build delivery |
| Infrastructure | IaC Planner, Policy Check, Apply Controller | Plan and controlled apply |
| Trust | Policy, Approval, Secrets and Audit services | Enterprise controls |
| Operations | Telemetry, FinOps, SLO/Incident, Evidence | Runtime and economic intelligence |

These are logical boundaries, not a requirement for one microservice per row. Start with a modular architecture and split services when scaling, security or ownership justifies it.

## Component specification template
Document capability, owner, responsibilities/non-responsibilities, APIs, commands, events, data ownership, identity, authorization, dependencies, trust boundaries, SLO, failure modes, audit, deployment unit and contract tests.

## Design principles
- Avoid shared database writes across bounded contexts.
- Prefer explicit APIs/events over direct table access.
- Separate orchestration state from execution logs and artifacts.
- Use asynchronous operations for long-running work.
- Make external mutations idempotent or guarded by idempotency keys.
- Keep connector secrets outside prompts and runner images.

## Open decisions and deliverables
Decide modular monolith versus service decomposition, workflow engine, event broker, outbox pattern, service identity, tenant deployment model and data ownership. Produce C4 diagrams, interface catalog, deployment units, dependency map and failure analysis.
