# UECE Enterprise Investment & Scenario Intelligence v0.6.0

**Status:** Reference model and deterministic decision-support prototype.

## Scope
Translate capability gaps and realization choices into comparable portfolio scenarios. Each scenario pins tenant, enterprise, currency, planning period, decisions, constraints and provenance. Decisions include build, improve, buy, partner, automate, orchestrate and retire.

## Analysis
The engine calculates scenario cost, expected value, net expected value, average risk, budget variance, risk eligibility and missing mandatory capability decisions. Portfolio selection includes mandatory capability decisions first, then ranks optional candidates using value/cost, confidence and risk. It is a deterministic heuristic, not a global optimizer or investment recommendation.

## Guardrails
- Never aggregate different currencies or periods without an explicit conversion and normalization model.
- Expected value and confidence are planning assumptions, not realized benefits.
- Mandatory decisions that exceed budget must fail selection rather than be silently dropped.
- Risk limits are hard constraints in the reference optimizer.
- Dependencies are declared but not automatically scheduled in this release.
- Human finance, risk and business approval is required before funding.

## API
- analyzeInvestmentScenario(scenario, options)
- optimizeInvestmentPortfolio(scenario, options)

## Demo data
investment-scenario-seed-v0.6.0.json is entirely synthetic.
