# UECE Capability Intelligence Engine v0.1.0

A dependency-free reference implementation for validating the proposed universal capability catalog, validating industry classification taxonomy, constructing a typed capability graph, resolving accepted industry crosswalks, and producing deterministic enterprise capability composition candidates.

## Runtime

- Node.js 18+ (ES modules); no third-party dependencies.
- Browser-compatible module; the demo uses illustrative embedded data and is not connected to a backend.
- Run tests from the repository root: `node --test product/engines/tests/uece-engine.test.mjs`.

## Modules

- `uece-intelligence-engine.mjs`: validation, graph construction, crosswalk resolution, composition and stable fingerprinting.
- `tests/uece-engine.test.mjs`: automated invariant and regression tests.
- `demo/uece-intelligence-engine-v0.1.0.html`: interactive local demonstration.

## API outline

```js
import { validateCatalog, validateTaxonomy, buildCapabilityGraph,
  resolveIndustryCrosswalk, composeEnterprise } from "./uece-intelligence-engine.mjs";

const catalogResult = validateCatalog(catalog);
const taxonomyResult = validateTaxonomy(taxonomy);
const graph = buildCapabilityGraph(catalog, relationships);
const crosswalk = resolveIndustryCrosswalk(taxonomy, catalog, ["IND-BANK"]);
const composition = composeEnterprise({
  tenantId: "tenant-demo",
  enterpriseId: "enterprise-demo",
  catalogVersion: catalog.catalogVersion,
  classificationIds: ["IND-BANK"]
}, { catalog, taxonomy, policy: { version: "0.1.0" } });
```

## Important behavior

1. Catalog and taxonomy lifecycle states are not conflated with applicability.
2. Proposed classifications and mappings are not applied as authoritative composition inputs.
3. Missing applicability remains `unassessed`.
4. The engine requires an explicit catalog version pin.
5. Similar names do not trigger deduplication; identity is canonical ID only in this prototype.
6. A replacement proposal creates a review task; it never silently replaces the base capability.
7. The fingerprint is FNV-1a 32-bit for prototype repeatability only, not security or tamper evidence.
8. Composition output is a candidate manifest only. No publication or approval endpoint is implemented.

## Production hardening backlog

- Replace prototype fingerprint with canonical JSON + SHA-256 and signed manifest.
- Add JSON Schema validation, authorization, tenant isolation, immutable version store and audit log.
- Add full overlay model for business model, product/service, jurisdiction, operating model and sourcing mode.
- Add relationship store, semantic equivalence approval workflow and graph cycle policies.
- Add API service, idempotency keys, concurrency controls, observability and policy-as-code.


## UECE v0.4.0 — Enterprise realization intelligence

The engine now exposes:
- `validateArchitectureGraph(graph)`: validates node IDs/types, relationship IDs, typed endpoints, predicates, lifecycle, provenance and confidence.
- `traceCapability(graph, capabilityId, options)`: returns inbound/outbound links; optionally restricts to accepted relationships.
- `analyzeRealizationPortfolio({capabilities, graph, realizations, requiredDimensions})`: computes accepted-link traceability, evidence coverage, missing dimensions and realization decision gaps.

Coverage dimensions are process, role, application, data, technology, risk/control, product/outcome and factory/agent. Only accepted edges contribute. Evidence coverage additionally requires non-empty evidence references. This prototype checks evidence-reference presence, not evidence validity or control effectiveness.

Run the test suites from the repository root with:

```bash
node --test product/engines/tests/*.test.mjs
```

The v0.4 graph seed is synthetic and all edges are proposed. Tests assert that candidate links do not count as authoritative coverage. The engine remains dependency-free and is not a production authorization, graph persistence, evidence validation or approval service.
