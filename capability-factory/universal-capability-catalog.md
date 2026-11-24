# Universal Capability Catalog

**Status:** Discussion draft  
**Version:** 0.1.0  
**Scope:** Proposed universal L1 capability domains and illustrative L2 branches.

## 1. Purpose

This catalog captures the initial proposal for 15 common enterprise L1 capability domains. It is a starting taxonomy for review, not a complete industry-neutral capability reference model.

## 2. Proposed universal L1 domains

| ID | Universal L1 capability | Illustrative L2 branches |
|---|---|---|
| U01 | Strategy and Corporate Management | Strategic planning; corporate performance management; enterprise policy and direction |
| U02 | Customer and Relationship Management | Customer experience; relationship management; customer insight; service relationship |
| U03 | Marketing and Brand Management | Market research; brand management; campaign management; market engagement |
| U04 | Sales and Commercial Management | Sales planning; pricing; opportunity management; contract and commercial management |
| U05 | Product and Service Management | Product strategy; product development; service portfolio; product lifecycle |
| U06 | Operations Management | Operational planning; execution management; service operations; quality management |
| U07 | Supply Chain and Procurement | Sourcing; supplier management; procurement; logistics and supply planning |
| U08 | Finance and Accounting | Financial planning; accounting; treasury; financial control and reporting |
| U09 | Human Capital Management | Workforce planning; talent acquisition; talent management; learning and development |
| U10 | Risk and Compliance Management | Risk assessment; control management; compliance monitoring; enterprise assurance |
| U11 | Legal and Corporate Affairs | Legal advisory; contract legal review; corporate affairs; regulatory engagement |
| U12 | Technology and Digital Management | IT operations; digital engineering; technology portfolio; cybersecurity management |
| U13 | Data and Information Management | Data governance; information management; data quality; analytics enablement |
| U14 | Enterprise Support Services | Facilities; administration; workplace services; shared services |
| U15 | Innovation and Transformation | Innovation management; research enablement; change management; transformation |

## 3. Relationship to the initial high-level capability examples

The broader initial examples included Strategy, Customer, Marketing, Sales, Finance, HR, Governance, Risk, Legal, Procurement, Technology and Data. The 15-domain proposal expands these into more explicit domains, including Product and Service, Operations, Supply Chain and Procurement, Enterprise Support Services, and Innovation and Transformation.

Governance appears in the proposed U10 Risk and Compliance domain and may also be a cross-cutting management concern. Its exact placement and whether it warrants a separate universal L1 remain open for review.

## 4. L2 and L3 decomposition guidance

L2 branches should represent meaningful, outcome-oriented areas of capability. L3 should identify reusable capability components where additional granularity supports composition, ownership, benchmarking or factory design.

Do not turn every activity or workflow step into a capability. Process steps belong in process models and value-stream designs.

Example decomposition (illustrative only):

```text
U08 Finance and Accounting
├── Financial Planning
│   ├── Strategic Financial Planning
│   └── Budget Management
├── Accounting
│   ├── General Ledger
│   └── Accounts Payable
└── Treasury
    ├── Cash Management
    └── Liquidity Management
```

## 5. Catalog governance

Proposed controls:
- A stable ID must not be reused for a different capability.
- Name changes should preserve identity where the underlying meaning is unchanged.
- Material semantic changes should create a reviewed version or successor definition.
- Deprecated capabilities should retain mappings for traceability.
- Industry extensions should reference universal capabilities rather than copy them without rationale.
- Synonyms and alternate industry terminology should be recorded as aliases.

## 6. Review checklist

- Are the 15 L1 domains mutually understandable and sufficiently complete?
- Are any L1 domains too broad or overlapping?
- Should Governance be a standalone universal L1?
- Should Enterprise Support Services remain one domain or be decomposed?
- Are HR and Human Capital Management intended to be synonymous in this model?
- Are Research and Innovation appropriately grouped?
- What L2/L3 depth is useful for composition and factory mapping?
