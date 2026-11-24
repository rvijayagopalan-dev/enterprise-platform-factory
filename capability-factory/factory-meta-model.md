# Factory Meta-Model

**Status:** Discussion draft  
**Version:** 0.1.0

## 1. Purpose

The Factory Meta-Model defines a common structure for describing, composing, operating and evolving factories across universal, industry, specialized and enterprise-specific contexts.

It complements the Universal Capability Meta-Model:
- Capability Meta-Model: what the enterprise must be able to do.
- Factory Meta-Model: how repeatable production and evolution systems are structured and governed.

## 2. Proposed factory definition

A factory is a governed system that repeatedly transforms inputs—such as demand, requirements, knowledge, data, materials or designs—into outputs and measurable outcomes through defined workflows, resources, controls and feedback loops.

A factory can be:
- A logical capability grouping.
- A reusable blueprint.
- A configured product or platform.
- An operating model spanning teams and systems.
- An autonomous or AI-enabled execution system.

These forms may coexist; the factory definition must state which form is being described.

## 3. Factory definition contract (proposed)

| Attribute | Description |
|---|---|
| Factory ID | Stable unique identifier |
| Name and purpose | Canonical name and intended outcome |
| Factory type | Universal, horizontal, industry, specialized or enterprise-specific |
| Blueprint/version | Reusable design reference and version |
| Capability coverage | Capability references and realization relationship |
| Value streams | Value streams served |
| Inputs | Demand, requirements, data, knowledge, materials or upstream outputs |
| Outputs and outcomes | Deliverables and measurable business outcomes |
| Production lifecycle | Stages, workflows and state transitions |
| Roles and ownership | Business owner, product owner, operators and stewards |
| Processes and policies | Operating procedures, controls and policy references |
| Knowledge and data | Knowledge assets, data products and information contracts |
| Agents and automation | Agent roles, tools, automation and autonomy boundaries |
| Applications and platforms | Systems and platform dependencies |
| Interfaces | APIs, events, human hand-offs and inter-factory contracts |
| Runtime and infrastructure | Execution environment and deployment constraints |
| Security and identity | Principals, access boundaries and trust requirements |
| Governance and approvals | Decision rights, controls and approval gates |
| Quality and assurance | Acceptance, test, evaluation and evidence requirements |
| Observability and reliability | Telemetry, SLOs, incident and continuity requirements |
| Economics | Cost model, funding, budgets and value measures |
| Lifecycle state | Proposed, designed, configured, active, suspended, retired |
| Provenance | Source, rationale, author and review history |

## 4. Factory lifecycle

Common lifecycle proposed for discussion:

1. Discover — identify demand, outcomes and context.
2. Understand — interpret requirements, constraints and existing assets.
3. Design — define operating model, architecture, workflows and controls.
4. Build — configure or develop processes, assets, agents and integrations.
5. Validate — test functionality, quality, security, compliance and outcomes.
6. Deploy and Operate — activate the factory and manage production execution.
7. Learn and Evolve — measure performance, capture knowledge and improve the blueprint.

Domain-specific factories may add stages or use different names, while preserving traceability to the common lifecycle.

## 5. Factory relationships

A factory may:
- Realize one or more capabilities.
- Depend on shared horizontal factories.
- Consume outputs from upstream factories.
- Produce outputs for downstream factories.
- Share knowledge, data, agents, tools and infrastructure.
- Be instantiated from a blueprint with enterprise-specific configuration.
- Be composed with other factories into a value-stream solution.

The model should distinguish blueprint, configured factory, running instance and execution run.

## 6. Factory types

Proposed classification:
- **Universal functional factory:** supports common business capabilities.
- **Horizontal shared factory:** provides cross-enterprise production or control capabilities.
- **Industry factory:** supports an industry-specific operating capability.
- **Specialized factory:** supports a sub-industry or business-model-specific capability.
- **Enterprise-specific factory:** configured or extended for a particular enterprise.
- **Meta Factory:** creates, configures, governs and evolves other factories.

These classifications may need orthogonal dimensions rather than a single exclusive type field.

## 7. Relationship to EPF

EPF is a shared execution and governance platform, not a synonym for every factory. It may provide:
- Factory blueprint and configuration tooling.
- Agent, workflow and task orchestration.
- Identity, access and policy enforcement.
- Engineering engines and execution isolation.
- Integration and connector services.
- Approval, audit and evidence services.
- Delivery, runtime and environment services.
- Observability, reliability and FinOps.

A business factory may use EPF while also relying on domain-specific systems, people, data and physical operations outside EPF.

## 8. Design questions

- Which factory attributes are mandatory versus type-specific?
- Are factories products, operating units, logical systems or a polymorphic model of all four?
- What is the canonical distinction between factory blueprint, factory configuration, factory instance and factory run?
- How are inter-factory contracts versioned?
- How is factory autonomy constrained by policy and human decision rights?
- How are factories assessed for value, maturity, resilience and quality?
