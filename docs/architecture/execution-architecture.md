# EPF Engineering Execution Architecture

**Status:** Starter; runner and privileged-operation design deferred.

## Purpose
Define the controlled execution system for code generation, tests, repository operations, infrastructure plans and deployments without unrestricted enterprise access for agents.

## Execution lifecycle
1. Orchestrator validates workflow state and creates a bounded task.
2. Policy evaluates principal, action, resource, environment and risk.
3. Runner controller allocates an isolated ephemeral workspace.
4. Workload identity obtains short-lived credentials for the approved scope.
5. Engine invokes typed connectors from an allowlisted tool set.
6. Outputs are validated, scanned and staged as artifacts/evidence.
7. Result returns to orchestrator; runner is destroyed or sanitized.
8. Privileged apply/deploy uses a separate approval-gated path.

## Isolation requirements
Ephemeral workspaces; no ambient administrator credentials; restricted egress; CPU/memory/disk/time/concurrency/spend limits; pinned base images and dependencies where feasible; task-scoped secrets; workspace cleanup; artifact allowlisting; separation of untrusted code from control services; stronger isolation for higher-risk tasks.

## Connector requirements
Each connector declares version, purpose, input/output schemas, identity scopes, risk class, rate limits, idempotency, approval requirements and audit fields. Validate arguments server-side.

## Privileged operation classes
Read; propose; mutate non-production; protected mutation such as merge, production apply, production deploy, IAM/policy change or destructive action. Map each class to permissions, policy, approval and rollback requirements.

## Git and infrastructure
Use repository-scoped GitHub App permissions and protected branches. Infrastructure plan and apply are distinct. Approval binds to immutable plan digest, workspace, environment and policy result. Changed plans invalidate prior approval.

## Failure and deliverables
Define retryable errors, idempotency, cancellation, partial mutation detection, cleanup, compensation and rollback. Produce runner threat model, isolation tiers, credential flows, egress policy, artifact handling, plan/apply sequence and penetration-test criteria.
