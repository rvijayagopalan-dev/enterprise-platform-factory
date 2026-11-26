# UECE Enterprise Intelligence Workbench v0.9.0

**Status:** Integrated read-model prototype.

## Unified views
The workbench combines capability maturity, enterprise architecture traceability, realization gaps, factory/agent production coverage, governance assurance and optional investment scenario analysis.

## Decision flow
1. Select an immutable catalog and graph release.
2. Review capability applicability and maturity evidence.
3. Inspect process/role/application/data/technology/product/risk/control/factory/agent traceability.
4. Examine dependencies and strategic outcomes.
5. Compare investment scenarios.
6. Review human/agent/factory delivery modes and controls.
7. Resolve governance blockers and route approvals.
8. Create a new immutable release after approval.

## API
buildEnterpriseIntelligenceWorkbench(options)

## Limits
The current implementation is a deterministic in-memory read model. It does not provide multi-user collaboration, graph persistence, tenant authorization, evidence verification, live agent execution or deployment orchestration.
