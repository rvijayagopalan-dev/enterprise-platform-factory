# Agent and Tool Contracts

## 1. Objective

Define stable interfaces between the factory orchestrator, specialized agents and external tools. These contracts allow the platform to change LLM providers or execution technologies without rewriting business workflows.

## 2. Common task envelope

Every task should carry:
- `task_id`: globally unique task identifier.
- `parent_task_id`: optional parent task.
- `project_id`: registered project identifier.
- `requested_by`: authenticated human or upstream service identity.
- `agent_id`: executing agent identity.
- `capability`: requested capability name and version.
- `environment`: dev, test, staging or prod.
- `input_artifact_refs`: immutable references to input artifacts.
- `constraints`: allowed repositories, tools, regions, budgets and policies.
- `approval_requirements`: required approval checkpoints.
- `trace_id`: end-to-end correlation identifier.
- `deadline` and `retry_policy`: execution bounds.

## 3. Task lifecycle

`DRAFT → VALIDATED → PLANNED → AWAITING_APPROVAL → RUNNING → SUCCEEDED | FAILED | CANCELLED`

A task may enter `BLOCKED` when a dependency, permission or external approval is missing. State transitions must be persisted and validated by the orchestrator.

## 4. Agent contract

Each agent capability must declare:
- Name, semantic version and owner.
- Purpose and supported task types.
- Input and output schemas.
- Required tools and permissions.
- Data classification and retention requirements.
- Timeout, retry and resource limits.
- Evaluation suite and minimum acceptance thresholds.
- Human approval requirements.
- Supported execution environments.

Agents return structured results, not only conversational text. Results include status, artifact references, validation evidence, warnings, errors and next actions.

## 5. Tool contract

Every tool definition must include:
- Tool name and version.
- Read/write/destructive classification.
- Input schema and output schema.
- Authentication method and required scopes.
- Resource allowlist and environment restrictions.
- Rate limits and timeout.
- Idempotency behavior.
- Audit event requirements.

Tools must reject requests outside the caller's granted scope. The model's instructions are not an authorization mechanism.

## 6. Artifact contract

Artifacts are immutable or versioned and include:
- Artifact ID and type.
- Project and task IDs.
- Version or content digest.
- Storage URI.
- Producer agent and tool versions.
- Creation timestamp.
- Data classification.
- Validation status and provenance.

Examples: specification, ADR, source patch, test report, container image, Terraform plan, deployment manifest and release report.

## 7. Approval contract

An approval request records:
- Exact action and target environment.
- Requester and responsible approver.
- Plan or artifact digest being approved.
- Risk classification and policy results.
- Approval or rejection decision, timestamp and comment.

Approval must bind to the exact plan/artifact digest. If the plan changes, approval becomes invalid and must be requested again.

## 8. Error handling

Use typed errors such as:
- `VALIDATION_FAILED`
- `POLICY_DENIED`
- `AUTHORIZATION_DENIED`
- `DEPENDENCY_UNAVAILABLE`
- `RATE_LIMITED`
- `APPROVAL_REQUIRED`
- `EXECUTION_TIMEOUT`
- `ARTIFACT_INTEGRITY_FAILED`

Retries must be bounded and limited to retryable errors. Destructive operations must be idempotent or protected by explicit deduplication and reconciliation.

## 9. Minimum audit events

Record task created, plan generated, agent invoked, tool invoked, policy evaluated, approval requested, approval granted/denied, artifact produced, repository changed, infrastructure applied, deployment completed and task closed.

Do not place secrets, access tokens or sensitive payloads in audit logs.
