# EPF Entity and Workflow Lifecycle Model

**Status:** Starter; detailed state machines to be designed.

## Catalog lifecycle
Candidate lifecycle for reusable blueprints, engines, templates, modules, connectors and policies:
Draft → Registered → Validating → Approved → Active → Deprecated → Retired.
Rejected, Suspended and Archived may be required for specific entity types.

## Build request lifecycle
Draft → Submitted → Interpreting → Needs Clarification → Specified → Blueprint Proposed → Awaiting Confirmation → Confirmed → Planned → In Progress → Completed.
Exception states: Rejected, Cancelled, Failed and Expired. Approved specifications should be versioned, not silently overwritten.

## Workflow lifecycle
Created → Policy Checking → Ready → Running → Waiting for Input / Waiting for Approval → Succeeded / Failed / Cancelled.
Partial completion, compensation and recovery states must be designed explicitly.

## Task and run lifecycle
Task: Pending → Eligible → Authorized → Dispatched → Running → Succeeded / Failed / Cancelled / Expired.
Each retry creates a new immutable execution-run record. Capture runner identity, time, usage, tools, artifacts, evidence and errors.

## Approval lifecycle
Requested → Pending → Approved / Rejected / Changes Requested / Expired / Cancelled.
Approval binds to an immutable action or plan digest, target environment, requester, approver, policy context and expiry. A changed plan requires new approval.

## Deployment lifecycle
Planned → Approved → Deploying → Verifying → Active, with Failed, Rolled Back and Decommissioned outcomes. Promotion should retain artifact digest and provenance.

## State-machine design requirements
Define states, entry/exit criteria, allowed transitions, transition authority, policy guards, events, timeouts, retries, idempotency, compensation, audit evidence and concurrency behavior.

## Cross-entity invariants
- No production apply without valid approval for the exact plan.
- No execution from an unconfirmed material blueprint.
- Terminal runs are immutable.
- Deprecated versions remain resolvable for historical reproducibility.
- Policy/schema versions used by an execution are recorded.
- Cancellation does not imply external changes were reversed.
