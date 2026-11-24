# EPF Discussion-to-Repository Traceability

**Status:** Initial baseline; update as design evolves.

## Purpose
Track whether major product and architecture discussions have a repository artifact. This is a curated traceability matrix, not a verbatim transcript of every chat message.

| Topic | Repository destination | Status |
|---|---|---|
| Product vision and goals | docs/product-specification.md | Captured |
| Six-plane architecture | docs/architecture/target-architecture.md | Captured |
| Conversational build and blueprint confirmation | docs/design/product-experience-design.md; demo/product-experience.html | Captured |
| 40 first-class citizens | docs/metamodel/entity-catalog.md | Starter |
| Entity relationships and ERD | docs/metamodel/relationship-model.md | Starter |
| Lifecycle and state machines | docs/metamodel/lifecycle-model.md | Starter |
| Engineering engine portfolio | docs/engines/engine-design-catalog.md | Starter |
| Agent runtime, identity, MCP/A2A | docs/architecture/agentic-ai-architecture.md | Starter |
| Isolated execution and privileged actions | docs/architecture/execution-architecture.md | Starter |
| GitHub automation | docs/integrations/integration-architecture.md | To detail |
| GCP/WIF/GKE/Cloud Run | docs/architecture/deployment-architecture.md | To detail |
| Security and identity | docs/architecture/security-and-identity.md | Baseline; expand |
| Governance, FinOps and observability | docs/platform-services/platform-services-design.md | Starter |
| API and event contracts | docs/implementation/api-design.md; event-contracts.md | Starter |
| Data and test architecture | docs/implementation/data-architecture.md; test-strategy.md | Starter |
| Product experience demo | demo/product-experience.html | Captured |

## Status definitions
Captured: usable baseline exists. Starter: scope/questions recorded, detailed design remains. To detail: acknowledged but requires a dedicated design. Accepted: accountable owner approved. Implemented: working code/config exists. Verified: evidence meets acceptance criteria.

## Traceability rules
For every material requirement, link source discussion/stakeholder need, product requirement, architecture decision, API/schema/event contract, implementation epic/story/code path, test case and verification evidence.

## Limitation
The repository captures synthesized outcomes and design baselines, not a complete verbatim archive of all chat discussions. Important decisions, alternatives and constraints should be explicitly added before implementation.
