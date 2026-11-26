# UECE Governance & Assurance v0.8.0

**Status:** Reference control/evidence contract.

## Governance records
Records bind a control to a subject (capability, graph edge, realization, factory, agent, investment or release) and carry status, evidence references, owner, risk rating, review timestamps, approval and provenance.

## Assurance gate
A release readiness check evaluates required controls, missing controls, ineffective/partially effective/not-assessed controls, evidence-backed effectiveness and approved exceptions. Approved exceptions remain visible and require expiry and periodic review.

## Important distinction
Presence of an evidence reference is not evidence validation. An effective control assertion is not independently verified by this prototype. Production assurance requires evidence dereferencing, integrity, access policy, control testing, reviewer independence, freshness and audit trail.

## API
- evaluateGovernanceAssurance({records, requiredControlIds, subjectId})
- createGovernedPlatformRelease(options)

## Release states
draft → in_review → approved → published; superseded and revoked are terminal governance actions. The reference engine creates a candidate release only. It never publishes or approves.
