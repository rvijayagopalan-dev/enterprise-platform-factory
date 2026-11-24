# EPF Enterprise Meta-Model

**Status:** Starter; canonical model to be designed.

## Purpose
Provide the common vocabulary and structural model used by the factory, agents, engines, workflows and governance services.

## Domain decomposition
1. Interaction: Conversation, Conversation Session, Build Request, Intent.
2. Intelligence: Requirement, Clarification, Specification, Decision Record.
3. Architecture: Blueprint, Architecture Model, Architecture Component, Technology Stack.
4. Agents: Agent, Agent Profile, Agent Identity, Agent Session.
5. Execution: Factory Workflow, Engineering Task, Execution Plan, Execution Run.
6. Engines: Engine, Engine Template, Module, Artifact.
7. Infrastructure: Environment, Infrastructure Resource, Infrastructure Plan, Deployment.
8. Governance: Policy, Control, Approval, Evidence.
9. Operations: Budget, Cost Record, SLO, Incident.
10. Ecosystem: Integration, Connector, Capability, Audit Event.

## Common entity envelope
Evaluate each entity for: immutable ID; entity type; schema version; name and description; tenant/project/environment scope; owner; lifecycle state; creation/update timestamps; labels and classification; typed relationships; policy references; source and provenance references.

Required and optional fields must be defined per entity. Never store credentials or secrets in entity payloads.

## Modeling rules
- Stable IDs; mutable names are display attributes.
- Reference immutable versions of specifications, blueprints, policies and artifacts from executions.
- Separate desired state from observed state.
- Separate human, agent and workload identities.
- Record provenance for generated and externally sourced content.
- Enforce tenant boundaries in APIs and persistence.
- Define schema compatibility and migration rules.
- Keep telemetry distinct from durable business/control-plane entities.

## Required deliverables
Canonical ERD; entity definitions; JSON Schemas; identifier/versioning strategy; relationship and integrity rules; lifecycle models; classification and retention rules; migration strategy; representative validation examples.

## Open decisions
ID format; tenant/project/workspace hierarchy; entity versus graph-node boundaries; entity version versus schema version semantics; archival/deletion policy; relational versus graph persistence.

## Acceptance
Every first-class entity has a definition, owner, schema, lifecycle, relationships, scope, access policy and event behavior. Representative end-to-end workflows validate the model.
