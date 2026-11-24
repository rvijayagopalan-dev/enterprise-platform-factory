# EPF Domain Event Contracts

**Status:** Starter; schemas and delivery guarantees deferred.

## Candidate event catalog
Request/specification: BuildRequestCreated, BuildRequestSubmitted, IntentInterpreted, ClarificationRequested, ClarificationResolved, SpecificationPublished.
Architecture: BlueprintProposed, BlueprintRevised, BlueprintConfirmed, ArchitectureDecisionRecorded.
Execution: WorkflowCreated, WorkflowStarted, TaskScheduled, TaskAuthorized, TaskStarted, TaskCompleted, TaskFailed, TaskCancelled, ExecutionRunCreated.
Governance/delivery: PolicyEvaluated, ApprovalRequested, ApprovalGranted, ApprovalRejected, PullRequestCreated, ChecksCompleted, InfrastructurePlanCreated, InfrastructureApplyApproved, InfrastructureApplied, DeploymentStarted, DeploymentSucceeded, DeploymentFailed.
Operations: EvidencePublished, CostAnomalyDetected, SLOBreached, IncidentOpened, IncidentResolved, DriftDetected, AuditEventRecorded.

## Common envelope
Candidate fields: event ID/type/schema version, occurrence time, producer, tenant/project, aggregate type/ID/version, correlation and causation IDs, trace context, actor reference, payload and data classification. Never include secrets or unnecessary sensitive content.

## Delivery requirements
Assume at-least-once unless proven otherwise; consumers are idempotent; use outbox/inbox where needed; define per-aggregate ordering; support schema compatibility; use bounded retries and dead-letter handling; support replay; distinguish domain events from telemetry and security audit.

## Deliverables
Event catalog, JSON Schemas, producer/consumer matrix, ordering guarantees, retry/DLQ policy, replay strategy, schema registry and contract tests.
