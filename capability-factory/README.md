# Capability Factory — Discussion Workspace

**Status:** Discussion draft  
**Version:** 0.2.0  
**Purpose:** Capture the capability-driven enterprise factory model for subsequent architecture discussion and design.

## Why this workspace exists

The Capability Factory workstream explores how an enterprise capability model can become the foundation for discovering, composing and evolving an enterprise's factory ecosystem.

The central distinction is:

- **Capability model:** what the enterprise must be able to do.
- **Factory model:** how capabilities are repeatedly designed, produced, delivered, operated and improved.
- **Enterprise Platform Factory (EPF):** shared execution, orchestration and governance infrastructure used by factories.
- **Enterprise Meta Factory:** the higher-order capability that creates, configures, governs and evolves the factory ecosystem, using EPF as its execution foundation.

This folder is a design and discussion baseline. It does not establish approved organizational structures, product boundaries, implementation commitments or a final factory inventory.

## Documents

| Document | Purpose |
|---|---|
| [Capability Model Gap Register](capability-model-gap-register.md) | Evidence-based assessment of the current Explorer, prioritized gaps, acceptance criteria and remediation sequence |
| [Capability Meta-Model](capability-meta-model.md) | Three-layer capability structure and modeling principles |
| [Universal Capability Catalog](universal-capability-catalog.md) | Proposed 15 universal L1 capability domains and example L2 branches |
| [Industry Capability Extensions](industry-capability-extensions.md) | Industry-specific extensions and inheritance/variation principles |
| [Specialized Capability Extensions](specialized-capability-extensions.md) | Sub-industry and business-model capability extensions |
| [Capability Composition Engine](capability-composition-engine.md) | How enterprise-specific capability models are assembled |
| [Enterprise Factory Ecosystem](enterprise-factory-ecosystem.md) | Initial universal, industry and specialized factory taxonomy |
| [Factory Meta-Model](factory-meta-model.md) | Common structure and lifecycle for factory definitions |
| [Open Questions and Decisions](open-questions-and-decisions.md) | Items to resolve before accepting the model |

## Conceptual flow

`Universal Capability Meta-Model`  
→ `Universal + Industry + Specialized Extensions`  
→ `Capability Composition Engine`  
→ `Enterprise-Specific Capability Model`  
→ `Value Streams + Business Processes + Applications/Data + Technology/AI`

The factory ecosystem is derived from and aligned to this model. It is not assumed to be a one-to-one mirror of the capability hierarchy.

## Relationship to the existing EPF design

EPF remains the shared platform for governed execution: agents, workflows, tools, identity, policy, approvals, engineering engines, delivery, observability, audit and FinOps. The capability/factory model is a domain-level design layer that can use EPF services; it should not duplicate EPF's existing execution and trust concerns.

See the repository's [EPF design and development index](../docs/DESIGN-DEVELOPMENT-INDEX.md) and [enterprise meta-model](../docs/metamodel/enterprise-meta-model.md).

## Working principles

1. Separate capability taxonomy from factory taxonomy.
2. Reuse universal capabilities and factory blueprints wherever possible.
3. Permit industry and specialized extensions without forking the universal model.
4. Compose an enterprise-specific model from reusable definitions and explicit variations.
5. Do not assume every capability requires a distinct factory.
6. Do not assume every factory is a separate team, application or deployment.
7. Keep model ownership, provenance, versioning, traceability and governance explicit.
8. Treat all taxonomies and examples in this workspace as proposals until reviewed.
9. Distinguish source observations from proposed model improvements; do not label draft catalogues as certified or authoritative.
10. Treat applicability as explicit and evidence-backed; missing mappings are unassessed, not automatically applicable.

## Suggested discussion and design sequence

1. Review the [Capability Model Gap Register](capability-model-gap-register.md) and agree remediation priorities.
2. Confirm capability boundaries and the proposed 15 universal L1 domains.
3. Define L2/L3 decomposition rules and reusable capability patterns.
4. Define extension, applicability and inheritance rules for industry and specialized models.
5. Specify the composition engine's inputs, outputs, resolution rules and validation criteria.
6. Agree the factory classification and common factory contract.
7. Define how the Enterprise Meta Factory and EPF interact.
8. Record accepted decisions and translate them into detailed design artifacts.

## Maturity states

Starter → Draft → Reviewed → Accepted → Implemented → Verified.

Record material decisions as ADRs with context, options, decision, consequences, owner and affected artifacts. Maintain traceability as the design evolves.
