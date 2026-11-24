# EPF Design & Development Documentation Index

**Status:** Starter structure; detailed design and implementation are deferred.

This index organizes the next design phase. These documents establish scope, questions and expected outputs; they are not approved detailed designs.

## Existing baseline
- Product specification: ../product-specification.md
- Reference architecture: architecture/reference-architecture.md
- Target architecture: architecture/target-architecture.md
- Agent and tool contracts: architecture/agent-and-tool-contracts.md
- Security and identity: architecture/security-and-identity.md
- Product experience: design/product-experience-design.md
- Implementation backlog: implementation-backlog.md

## Design workstreams

| Area | Starter document | Expected outcome |
|---|---|---|
| Meta-model | metamodel/enterprise-meta-model.md | Canonical entity and schema model |
| Entity definitions | metamodel/entity-catalog.md | Definitions for 40 first-class entities |
| Relationships | metamodel/relationship-model.md | ERD and cardinalities |
| Lifecycle | metamodel/lifecycle-model.md | State machines and transition rules |
| Components | architecture/component-architecture.md | Service boundaries and interfaces |
| Deployment | architecture/deployment-architecture.md | Environment, network and runtime topology |
| Agentic AI | architecture/agentic-ai-architecture.md | Agent runtime, identity, MCP/A2A and evaluation |
| Execution | architecture/execution-architecture.md | Isolated runners and privileged actions |
| Engines | engines/engine-design-catalog.md | Standard engine specification and portfolio |
| Shared services | platform-services/platform-services-design.md | Identity, policy, knowledge, event, audit, FinOps |
| Integrations | integrations/integration-architecture.md | GitHub, cloud, gateways and protocols |
| APIs | implementation/api-design.md | Resource APIs and conventions |
| Events | implementation/event-contracts.md | Domain event catalog and schemas |
| Data | implementation/data-architecture.md | Persistence, ownership and retention |
| Testing | implementation/test-strategy.md | Functional, security, AI and resilience testing |
| Traceability | traceability/discussion-to-repository.md | Discussion to design and implementation mapping |

## Recommended sequence
1. Confirm product boundaries, capabilities and terminology.
2. Complete entities, relationships, schemas and lifecycle.
3. Define components, trust boundaries and platform services.
4. Specify agent, engine, connector, API and event contracts.
5. Design execution isolation, identity federation and cloud deployment.
6. Define security, governance, FinOps and operations.
7. Convert accepted designs into epics, stories and test cases.

## Maturity states
Starter → Draft → Reviewed → Accepted → Implemented → Verified.

Record material decisions as ADRs with context, options, decision, consequences, owner and affected artifacts. Maintain traceability as the design evolves.
