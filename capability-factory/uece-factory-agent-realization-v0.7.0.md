# UECE Factory & Agent Realization v0.7.0

**Status:** Reference model / proposed.

Capabilities may be realized by factories, agents, human teams, external services or platform products. A realization is a governed association, not proof that a service is deployed or effective.

## Contracts
Each realization identifies the capability, provider type and ID, lifecycle, execution mode, human oversight, escalation path, controls, input/output contracts, service levels and provenance.

## Human-AI operating modes
- human_led
- human_in_loop
- human_on_loop
- autonomous_bounded

Bounded autonomy requires an explicit human oversight/escalation path. Production agent/factory entries should reference controls and measurable service levels.

## Coverage
Report capability coverage by approved, pilot and production provider registrations. Only production registrations count as production coverage. Provider inventory and identity must be resolved by the production service.

## APIs
- validateFactoryAgentRealizations(records, options)
- analyzeFactoryAgentCoverage(options)

## Non-goals
No agent execution, credentials, tool invocation, policy decision or runtime provisioning is performed by this prototype.
