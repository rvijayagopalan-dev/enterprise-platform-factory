# UECE Strategy Traceability & Dependency Impact — v0.5.0

**Status:** Proposed reference implementation  
**Depends on:** UECE v0.4.0 graph contract

## Strategy-to-outcome traceability
Accepted objective-to-capability edges (predicate enables) establish strategic alignment. Accepted capability-to-metric edges (predicate measures) connect capability realization to measurable outcomes. Proposed edges remain candidates and are excluded from authoritative reporting. The output reports objectives with capability links, capability links and measured capability links; it does not infer causality or claim metric improvement.

## Dependency semantics
For a directed edge A dependsOn B, a change to B may affect A. Impact analysis traverses reverse dependency direction from the changed node and returns transitive dependents. Dependency edges are separate from hierarchy edges; cycles are reported for review and are not silently removed.

## Safety and governance
- Only accepted edges contribute by default.
- Affected nodes indicate potential impact, not confirmed outage or business impact.
- Cycles indicate modeling conditions requiring architecture review; they are not necessarily invalid in all domains.
- Production impact analysis must incorporate temporal validity, environment, criticality, blast radius, runtime topology, change windows and ownership.
- The prototype is in-memory and has no tenant authorization or graph query persistence.

## APIs
- analyzeStrategicTraceability(graph, { objectiveIds })
- analyzeDependencyImpact(graph, changedNodeId, { acceptedOnly })

## Acceptance criteria
1. Proposed strategy links do not count.
2. Accepted objective links resolve to capability IDs.
3. Accepted capability metric links appear in the strategy trace.
4. Dependency traversal follows reverse dependency direction.
5. Transitive dependents are returned once.
6. Cycles are surfaced for review.
7. Unknown changed node and invalid graph are rejected.

## Next releases
v0.6 investment portfolio and scenario analysis; v0.7 factory/agent realization, controls and evidence; v1.0 governed graph service.
