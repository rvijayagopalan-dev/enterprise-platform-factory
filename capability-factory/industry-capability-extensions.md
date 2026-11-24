# Industry Capability Extensions

**Status:** Discussion draft  
**Version:** 0.1.0

## 1. Purpose

Industry Capability Extensions describe capabilities required by an industry that are not adequately expressed by universal enterprise capabilities alone.

The extension model should preserve common semantics while allowing industry-specific operating models, terminology, regulation, information concepts, value streams and specialist activities.

## 2. Initial industry scope

The following industries are examples from the initial discussion, not a closed industry taxonomy:

| Industry | Illustrative capability areas |
|---|---|
| Banking | Deposits; lending; payments; credit; treasury; banking operations |
| Healthcare | Patient access; care delivery; clinical operations; clinical research; revenue cycle |
| Retail | Merchandising; store operations; e-commerce; fulfillment; loyalty |
| Manufacturing | Product engineering; production planning; manufacturing execution; quality; plant maintenance |
| Energy | Generation; grid operations; energy trading; asset management; renewable operations |
| Transportation | Network planning; fleet operations; passenger services; freight and logistics |
| Insurance | Product and policy administration; underwriting; claims; actuarial; distribution |
| Government | Policy development; public service delivery; citizen engagement; benefits administration; public finance |

These are illustrative capability areas and require industry validation and deeper decomposition.

## 3. Extension principles

1. Reuse universal capabilities when the underlying meaning is common.
2. Extend a universal capability when industry context adds attributes, constraints or specialized outcomes without changing its core meaning.
3. Create an industry capability when the ability is genuinely industry-specific.
4. Keep industry terminology as aliases when it refers to an existing common capability.
5. Model regulatory obligations and controls as linked constraints or governance objects; do not assume every regulation is itself a business capability.
6. Preserve traceability from industry extensions to the universal definitions they reuse or specialize.
7. Permit industry capability hierarchies to have different depths.

## 4. Example: banking extension

Illustrative structure:

```text
Universal capabilities
├── U02 Customer and Relationship Management
├── U08 Finance and Accounting
├── U10 Risk and Compliance Management
├── U12 Technology and Digital Management
└── U13 Data and Information Management

Banking industry extensions
├── Deposit Management
├── Lending Management
├── Payments Management
├── Credit Management
├── Treasury and Liquidity Management
└── Banking Operations
```

A banking enterprise may then add specialized extensions such as retail banking, investment banking, private banking or syndicated lending. See [Specialized Capability Extensions](specialized-capability-extensions.md).

## 5. Example: healthcare extension

Illustrative industry capabilities:
- Patient access and registration.
- Care delivery coordination.
- Clinical operations.
- Clinical research operations.
- Revenue cycle operations.
- Healthcare quality and safety management.

These should map to universal customer, operations, finance, people, risk, data and technology capabilities where semantics align.

## 6. Example: manufacturing and energy

Manufacturing may extend universal operations and supply-chain capabilities with production planning, manufacturing execution, plant maintenance and product quality.

Energy may extend operations, asset management, risk, finance and technology capabilities with generation operations, grid operations, energy trading and renewable asset operations.

Specialized models such as semiconductor fabrication or offshore wind operations belong in the specialized extension layer.

## 7. Industry extension record (proposed)

An industry capability definition should reference:
- Stable capability ID and version.
- Industry and, where applicable, sector/subsector.
- Parent capability and extension type (reuse, specialization, addition or replacement proposal).
- Industry-specific definition and outcomes.
- Relevant universal capability references.
- Industry processes, information and regulatory constraints.
- Related value streams.
- Applicable factory blueprints, if known.
- Provenance, ownership and review state.

## 8. Open design topics

- Which industry classification should be used?
- How should multi-industry conglomerates compose several industry models?
- How should cross-industry capabilities such as payments, logistics or research be represented?
- When is an industry variation an extension versus a separate capability?
- How are regional regulatory variants modeled without fragmenting the global capability definition?
