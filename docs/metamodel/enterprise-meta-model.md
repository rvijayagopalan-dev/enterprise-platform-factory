# EPF Enterprise Meta-Model

**Version:** 0.1.0  
**Status:** Draft — canonical baseline for detailed design  
**Scope:** Provider-neutral logical model; GCP is the initial deployment target.

## 1. Purpose and modeling boundary

The EPF meta-model is the shared contract for requests, specifications, architecture, agents, workflows, engineering tasks, artifacts, infrastructure, approvals, evidence and operations. It is a logical model, not a mandate to store every entity in one database.

The model distinguishes:
- **Business/control-plane records:** durable entities with ownership, lifecycle and audit requirements.
- **Execution records:** runs, tasks, plans and results, retained according to operational policy.
- **Artifacts:** versioned files, packages, plans, reports and evidence, normally stored in object or artifact storage and referenced by URI plus digest.
- **Telemetry:** high-volume logs, metrics and traces; query through observability systems rather than treating each sample as a business entity.
- **Knowledge graph projections:** derived graph views of entities and relationships; the authoritative record remains with its owning service.

## 2. Domain map

| Domain | Principal entities | Owning capability |
|---|---|---|
| Interaction | Tenant, Project, Workspace, Conversation, BuildRequest | Experience |
| Specification | Intent, Requirement, Clarification, Specification, DecisionRecord | Interpreter |
| Architecture | Blueprint, ArchitectureModel, ArchitectureComponent, TechnologyStack | Blueprint |
| Agent ecosystem | Agent, AgentProfile, AgentIdentity, AgentSession, Connector, Integration | Agent platform |
| Factory execution | FactoryWorkflow, EngineeringTask, ExecutionPlan, ExecutionRun | Orchestrator |
| Engineering engines | Engine, EngineTemplate, Module, Artifact | Engine platform |
| Delivery/runtime | Environment, InfrastructureResource, InfrastructurePlan, Deployment | Delivery |
| Trust/governance | Policy, Control, Approval, Evidence, AuditEvent | Trust platform |
| Operations | Budget, CostRecord, SLO, Incident, Capability | Operations |

The detailed catalog in `entity-catalog.md` remains the inventory of all 40 first-class concepts. This baseline formalizes the shared envelope and core aggregates; domain-specific attributes are added through versioned schemas owned by the relevant capability.

## 3. Shared entity envelope

Every persisted first-class entity MUST carry:

| Field | Type | Rule |
|---|---|---|
| id | string | Immutable, globally unique within EPF; UUID/ULID-compatible opaque identifier |
| entityType | string | Stable PascalCase type name |
| schemaVersion | string | Semantic version of the payload schema |
| name | string | Human-readable label where applicable |
| description | string | Optional explanatory text |
| tenantId | string | Mandatory tenant isolation boundary |
| projectId | string | Required for project-scoped records; otherwise nullable by type contract |
| workspaceId | string | Optional workspace scope |
| owner | object | Owning principal type and ID |
| lifecycleState | string | State from entity-specific state machine |
| labels | object | Non-authoritative key/value metadata |
| classification | string | public, internal, confidential, restricted |
| createdAt / updatedAt | date-time | UTC RFC 3339 timestamps |
| createdBy / updatedBy | object | Principal type and stable ID |
| version | integer | Monotonic entity revision for optimistic concurrency |
| source | object | Provenance: system, actor, reference and optional digest |
| relationships | array | Typed references; no embedded uncontrolled object graphs |

Secrets, access tokens, private keys and credentials MUST NOT appear in entity payloads, labels, artifacts or audit metadata. Store secret references only.

## 4. Aggregate boundaries and ownership

1. **Tenant** is the top-level security and billing boundary.
2. **Project** groups a product/application initiative and its resources.
3. **Workspace** is an optional collaboration/design boundary inside a project.
4. **BuildRequest** is the intake aggregate; it owns clarification and request status, but not canonical Requirement or Specification content.
5. **Specification** is immutable by version after approval; revisions create a new version linked by `supersedes`.
6. **Blueprint** references a specific specification version and technology choices; confirmed blueprint revisions are immutable.
7. **FactoryWorkflow** coordinates tasks but does not own task execution details.
8. **EngineeringTask** is the independently schedulable unit with one responsible agent/engine, inputs, outputs and policy context.
9. **ExecutionRun** records one attempt; retries create new runs with explicit lineage.
10. **Artifact** is immutable by digest; new content creates a new artifact record.
11. **InfrastructurePlan** captures a reviewed plan digest and target scope; apply must consume the exact approved plan.
12. **Approval** is an immutable decision record, never a mutable boolean on the request.
13. **Evidence** references immutable source artifacts/events and records verification context.
14. **Policy** and **Control** are versioned; every consequential execution records the exact policy/control versions evaluated.

## 5. Core entity definitions

| Entity | Required domain attributes beyond envelope | Key invariant |
|---|---|---|
| Tenant | tenantKey, status, isolationProfile | tenantKey unique |
| Project | projectKey, purpose, lifecycleState | unique within tenant |
| Workspace | workspaceKey, membersRef | belongs to one project |
| Conversation | channel, externalThreadRef | scoped; transcript retention applies |
| BuildRequest | requester, rawRequestRef, requestedOutcome, priority | original intent and intake state retained |
| Requirement | requirementKey, statement, rationale, priority, acceptanceCriteria | stable key; criteria testable |
| Clarification | question, answer, askedAt, answeredAt | provenance retained |
| Specification | specificationKey, version, contentRef, digest, status | approved version immutable |
| DecisionRecord | decisionKey, context, options, decision, consequences | append-only; supersession linked |
| Blueprint | blueprintKey, version, specificationRef, componentsRef, technologyChoices, digest | confirmed version immutable |
| ArchitectureModel | viewpoint, notation, modelRef, digest | references blueprint/version |
| ArchitectureComponent | componentKey, componentType, responsibility, interfaces | belongs to model or blueprint |
| TechnologyStack | entries[], constraints | versioned technology entries |
| Agent | agentKey, provider, modelOrRuntime, status | no credentials; capabilities declared |
| AgentProfile | systemContractRef, capabilities[], constraints[] | versioned |
| AgentIdentity | principalRef, issuer, audience, trustPolicyRef | distinct from human/workload identity |
| AgentSession | agentRef, workflowRef, startedAt, endedAt | short-lived, scoped |
| FactoryWorkflow | workflowType, status, correlationId, startedAt, completedAt | task coordination audited |
| EngineeringTask | taskType, assigneeRef, inputRefs[], outputRefs[], dependencyRefs[], status | idempotency key and explicit scope |
| ExecutionPlan | planType, targetRef, stepsRef, digest | immutable after approval |
| ExecutionRun | runNumber, status, startedAt, endedAt, runnerRef, resultRef | every retry is a new run |
| Engine | engineKey, engineType, contractVersion, supportedOperations[] | registered and constrained |
| EngineTemplate | templateKey, version, inputsSchemaRef, outputsSchemaRef | immutable version |
| Module | moduleKey, version, sourceRef, digest | provenance-aware release |
| Artifact | artifactType, uri, digest, mediaType, sizeBytes | immutable by digest |
| Environment | environmentKey, environmentType, region, accountRef, policySetRef | isolated target scope |
| InfrastructureResource | provider, resourceType, resourceKey, desiredStateRef, observedStateRef | desired/observed separated |
| InfrastructurePlan | provider, targetEnvironmentRef, planRef, planDigest, policyResultsRef | apply consumes approved digest |
| Deployment | releaseRef, environmentRef, status, deployedAt, rollbackRef | release and target recorded |
| Policy | policyKey, version, policyType, policyRef, digest | immutable version |
| Control | controlKey, objective, implementationRef, evidenceRequirements[] | maps to policy/evidence |
| Approval | subjectRef, action, decision, approverRef, decidedAt, rationale | append-only; exact version/digest |
| Evidence | evidenceType, subjectRef, sourceRef, digest, collectedAt, verifierRef | immutable and verifiable |
| Budget | scopeRef, currency, amount, period, thresholds | explicit currency, scope and period |
| CostRecord | provider, resourceRef, amount, currency, usagePeriod, allocation | source and allocation retained |
| SLO | serviceRef, indicator, target, window, measurementSource | versioned objective |
| Incident | severity, status, detectedAt, resolvedAt, affectedRefs[] | lifecycle and post-incident evidence |
| Integration | integrationKey, integrationType, endpointRef, status | endpoint/secret references only |
| Connector | connectorKey, protocol, capabilities[], permissionProfileRef | least privilege |
| Capability | capabilityKey, domain, description, ownerRef, maturity | stable taxonomy key |
| AuditEvent | eventType, actorRef, subjectRef, action, outcome, occurredAt, correlationId | append-only, tamper-evident |

## 6. Relationship semantics

Relationships are typed references with `type`, `from`, `to`, `createdAt`, `createdBy`, optional temporal validity and optional attributes.

Canonical types:
- `contains`: Tenant contains Project; Project contains Workspace.
- `requests`: BuildRequest requests an outcome.
- `refines`: Requirement refines Intent; Clarification refines Requirement.
- `specifiedBy`: Blueprint is specified by a Specification version.
- `realizes`: ArchitectureComponent realizes a Capability or Requirement.
- `orchestrates`: FactoryWorkflow orchestrates EngineeringTask.
- `dependsOn`: Task depends on Task; dependency graph is acyclic.
- `assignedTo`: Task assigned to Agent or Engine.
- `produces`: Task/Run produces Artifact.
- `executesIn`: Run executes in Environment.
- `targets`: InfrastructurePlan targets Environment.
- `deploys`: Deployment deploys Artifact/Release to Environment.
- `governedBy`: subject governed by Policy/Control versions.
- `requiresApproval`: action requires Approval.
- `authorizedBy`: action authorized by Approval.
- `supportedBy`: claim/control backed by Evidence.
- `supersedes`: new immutable version supersedes old version.
- `correlatesWith`: records share a correlation context.

Integrity rules: endpoints must exist; tenant scopes must match unless an explicitly authorized cross-tenant integration is modeled; task dependency cycles are rejected; references to approved specifications, blueprints, policies and plans pin immutable versions/digests.

## 7. Lifecycle and state ownership

- BuildRequest: `received → clarifying → specified → awaiting_confirmation → accepted → in_progress → completed`; terminal alternatives: `rejected`, `cancelled`, `failed`.
- Specification: `draft → in_review → approved → superseded`; rejected versions remain retained as history.
- Blueprint: `draft → validated → awaiting_confirmation → confirmed → superseded`.
- FactoryWorkflow: `created → queued → running → waiting_for_approval → succeeded`; alternatives: `failed`, `cancelled`, `compensating`.
- EngineeringTask: `created → ready → assigned → running → succeeded`; alternatives: `blocked`, `failed`, `cancelled`, `retrying`.
- ExecutionRun: `created → starting → running → succeeded`; alternatives: `failed`, `timed_out`, `cancelled`.
- InfrastructurePlan: `generated → policy_checked → awaiting_approval → approved → applied`; alternatives: `rejected`, `expired`, `apply_failed`.
- Approval: `pending → approved` or `pending → rejected`; decisions are immutable.
- Deployment: `queued → deploying → validating → healthy`; alternatives: `failed`, `rolled_back`.

A state transition MUST be authorized by the owning service, validated against the transition table, and emitted as an auditable domain event. A timeout is not an approval. Reopening a terminal workflow creates a new workflow linked to the original.

## 8. Identity, authorization and tenancy

Principal types are `human`, `agent`, `workload`, `service` and `external`. Each action records initiating principal and effective execution principal separately. Authorization evaluates tenant, project, environment, action, resource, policy version and approval context. Agent identity is not interchangeable with a human approver or cloud workload identity.

## 9. Versioning and compatibility

- Entity IDs are immutable; entity `version` is a monotonically increasing record revision.
- `schemaVersion` versions payload contract independently of record revision.
- Approved specification, blueprint, policy, module, template and plan versions are immutable.
- Breaking schema changes require a major version and migration plan; additive optional fields are normally minor; clarifications are patch changes.
- APIs/events declare schema version; consumers reject unknown major versions and tolerate additive optional fields.
- Artifacts are pinned by cryptographic digest, not mutable filenames or tags.

## 10. Persistence guidance

Use transactional relational storage for authoritative aggregate state, constraints and approvals; object/artifact storage for immutable content; event infrastructure for domain events; search/vector indexes for retrieval projections; and graph storage or projections where multi-hop queries justify it. Do not make a graph database the default transactional source of truth without a workload and consistency decision.

## 11. Acceptance criteria

- Every catalog entity has an owner, scope, required attributes, lifecycle and access policy.
- Cross-aggregate links are typed and tenant-validated.
- Approved inputs and execution plans are pinned to immutable versions/digests.
- Workflow/task/run retries and approvals are independently auditable.
- Secret material is excluded from persisted payloads.
- JSON Schema validation and relationship/lifecycle invariants run in CI.
- A vertical slice traces request → requirement → specification → blueprint → workflow → task/run → artifact → plan → approval → deployment → evidence.

## 12. Open decisions requiring ADRs

1. UUIDv7 versus ULID identifier generation.
2. Whether Workspace is MVP or deferred.
3. Relational database selection and graph projection strategy.
4. Event broker and outbox/inbox implementation.
5. Artifact registry and object-store conventions.
6. Retention, deletion, legal hold and tenant export policy.
7. Classification taxonomy and regional residency controls.
8. Approval delegation, expiry and emergency/break-glass process.

## Related artifacts

- [Entity catalog](entity-catalog.md)
- [Relationship model](relationship-model.md)
- [Lifecycle model](lifecycle-model.md)
- [Canonical ERD](canonical-erd.md)
- [Core JSON Schema](epf-core.schema.json)
- [Design & development index](../DESIGN-DEVELOPMENT-INDEX.md)
