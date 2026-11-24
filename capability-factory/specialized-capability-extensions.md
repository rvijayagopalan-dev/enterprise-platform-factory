# Specialized Capability Extensions

**Status:** Discussion draft  
**Version:** 0.1.0

## 1. Purpose

Specialized Capability Extensions represent capabilities required by a sub-industry, business model, specialist operating context or distinctive production environment.

They provide additional specificity without forcing the universal or industry capability models to contain every niche variation.

## 2. Illustrative examples

| Industry context | Specialized capability model examples |
|---|---|
| Banking | Retail banking; investment banking; private banking; syndicated lending; card issuing |
| Healthcare | Clinical research; precision medicine operations; hospital specialty services |
| Retail | E-commerce; marketplace operations; subscription commerce; omnichannel fulfillment |
| Manufacturing | Semiconductor fabrication; automotive assembly; aerospace manufacturing |
| Energy | Offshore wind operations; solar asset operations; battery storage operations; LNG operations |
| Transportation | Airline operations; rail network operations; port operations; last-mile delivery |
| Insurance | Life insurance; commercial underwriting; reinsurance; specialty claims |
| Government | Tax administration; border operations; public benefits programs; defense acquisition |

Examples are illustrative and do not imply a complete taxonomy.

## 3. Specialization dimensions

A specialized capability may be driven by one or more dimensions:
- Sub-industry or subsector.
- Business model (for example, marketplace, subscription, asset owner/operator).
- Product or service type.
- Regulatory or jurisdictional context.
- Operating environment (for example, offshore, clinical, highly automated).
- Specialized knowledge, equipment or decision requirements.

The model should record the dimension that justifies the specialization.

## 4. Relationship to parent capabilities

A specialized capability should identify whether it:
- Reuses a parent capability unchanged.
- Specializes a parent capability with additional outcomes or constraints.
- Adds a new capability that depends on one or more parent capabilities.
- Proposes a semantic replacement, which requires explicit governance and migration.

Avoid copying an entire parent hierarchy merely to introduce a small specialized variation.

## 5. Example: offshore wind operations

Illustrative capability composition:

```text
Universal
├── Operations Management
├── Supply Chain and Procurement
├── Risk and Compliance Management
├── Finance and Accounting
└── Data and Information Management

Energy industry
├── Renewable Generation Operations
└── Asset Management

Specialized: Offshore Wind Operations
├── Offshore asset operations
├── Marine coordination
├── Turbine inspection and maintenance
├── Weather-window planning
└── Offshore logistics coordination
```

This is a conceptual decomposition, not an approved offshore wind reference model.

## 6. Example: e-commerce

An e-commerce model may reuse universal customer, marketing, sales, product, operations, finance, supply chain, data and technology capabilities, while adding specialized capabilities for digital storefront operations, catalog and offer management, checkout, digital payments orchestration, marketplace seller operations and fulfillment orchestration.

The final mapping must distinguish business capabilities from applications, processes and technology components.

## 7. Governance requirements

Specialized extensions should include:
- Named business context and specialization rationale.
- Parent and dependency references.
- Clear semantic boundary and non-duplication assessment.
- Applicable jurisdiction, regulation or operating constraints.
- Version, owner, provenance and lifecycle state.
- Mappings to value streams, processes, data and factory blueprints where available.

## 8. Open questions

- Should specialized capability extensions be maintained centrally, by industry stewards or federated?
- What threshold justifies a reusable catalog entry instead of an enterprise-local extension?
- How should capabilities vary by geography, regulation and business model simultaneously?
- How should specialized capabilities be promoted into industry or universal layers when reuse grows?
