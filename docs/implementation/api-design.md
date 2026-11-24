# EPF API Design Starter

**Status:** Starter; OpenAPI contracts deferred.

## Candidate resource groups
Tenants/projects/memberships; conversations/sessions/build requests; intents/requirements/specifications/decisions; blueprints/architecture models/components/stacks; workflows/tasks/plans/runs; agents/profiles/engines/templates/modules/capabilities/connectors; repositories/pull requests/artifacts/infrastructure plans/deployments; policies/controls/approvals/evidence; budgets/cost records/SLOs/incidents/audit events.

## API conventions to decide
REST naming; API versioning/deprecation; pagination/filtering/sorting; idempotency keys; correlation/trace headers; error envelope and retry hints; long-running operation status; optimistic concurrency/ETags; webhook security; OpenAPI generation and contract tests.

## Security
Authenticate caller, derive tenant context from trusted claims, authorize the operation against the resource and validate inputs. Never trust a tenant ID supplied only in the body. Sensitive operations require policy evaluation and approval references.

## Deliverables
API context/resource model, OpenAPI specification, authentication/authorization matrix, request/response schemas, error taxonomy, quotas, contract tests and versioning policy.

## Open decisions
REST versus selected internal gRPC interfaces, gateway, token audience, async operation pattern and tenant-scoped resource identifiers.
