# EPF Test Strategy

**Status:** Starter; detailed test plans and automation deferred.

## Test layers
- Unit: domain logic, state transitions, validators and policy adapters.
- Schema/contract: JSON Schema, OpenAPI and event compatibility.
- Component: service behavior with controlled dependencies.
- Integration: identity, GitHub, cloud, Terraform, eventing and telemetry.
- End-to-end: request → specification → blueprint → workflow → PR → plan → approval → non-production deployment.
- Security: auth bypass, IDOR, tenant escape, prompt injection, tool abuse, secret leakage, runner breakout and supply chain.
- AI/agent evaluation: task success, groundedness, schema adherence, tool selection, refusal behavior and regression.
- Performance: concurrency, queue lag, latency, workflow throughput and runner capacity.
- Resilience: dependency outage, retries, duplicate events, worker loss, cancellation, replay, restore and regional failure.
- UX/accessibility: keyboard, responsive behavior, status clarity and approval comprehension.

## Critical negative tests
- Unconfirmed blueprint cannot create an executable workflow.
- Unauthorized agent cannot invoke connectors or access another tenant.
- Expired task envelope cannot execute.
- Modified infrastructure plan invalidates approval.
- Production apply is denied without required approval.
- Secrets do not appear in model context, logs, events or artifacts.
- Replayed events/requests do not duplicate external mutations.
- Untrusted repository instructions cannot change platform policy or permissions.
- Runner cannot access control-plane credentials or unrelated workspaces.

## Release evidence
Source revision, build identity, test results, scan results, artifact digest, approval records and deployment evidence.

## Deliverables
Test pyramid, requirements-to-test matrix, test data strategy, AI evaluation suite, security test plan, performance model, chaos/resilience plan and release gates.
