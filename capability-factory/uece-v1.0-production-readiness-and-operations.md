# UECE v1.0 Production Readiness & Operations

A v1.0 product release is not equivalent to a production deployment. Use this checklist as a release gate.

## Product and data
- [ ] Approved universal catalog, taxonomy and overlay releases with named stewards.
- [ ] Tenant-scoped identity keys and data classification.
- [ ] Versioned schemas, migration plan, compatibility tests and deprecation policy.
- [ ] Graph integrity, provenance, temporal validity and evidence resolution.
- [ ] Retention, legal hold, deletion and export policies.
- [ ] Backup/restore and disaster-recovery exercises.

## Security and privacy
- [ ] Threat model and abuse cases signed off.
- [ ] OIDC federation and short-lived workload credentials.
- [ ] Least-privilege roles and attribute-based access policy.
- [ ] Cross-tenant authorization and IDOR tests.
- [ ] Encryption, key rotation, secrets management and audit.
- [ ] PII minimization and data residency assessment.
- [ ] Dependency, container, SAST, DAST and software bill-of-materials scans.
- [ ] Third-party workflow actions pinned to immutable SHAs before production.

## Quality and resilience
- [ ] Unit, contract, integration, end-to-end and property-based tests.
- [ ] Performance and concurrency tests at expected tenant scale.
- [ ] Idempotency, retries, backpressure and dead-letter handling.
- [ ] Multi-zone failure, regional recovery and restore tests.
- [ ] Accessibility and browser/mobile compatibility.
- [ ] SLOs, alert thresholds, runbooks and on-call ownership.

## Governance
- [ ] Approval separation between author, reviewer and publisher.
- [ ] Control evidence validated for authenticity, scope and freshness.
- [ ] Exception expiry, compensating controls and periodic review.
- [ ] Immutable release manifests and rollback/supersession process.
- [ ] AI recommendation transparency, evaluation and human override.

## Operations
- [ ] Dashboards for latency, error rate, saturation, queue age and data freshness.
- [ ] Cost attribution by tenant, service and workload.
- [ ] Incident severity, escalation, communication and postmortem policy.
- [ ] Release rollback and data migration rehearsals.
- [ ] Support model, service ownership and customer documentation.

## Acceptance
Production deployment requires all mandatory items to be evidenced, approved by accountable owners and linked to a release record. A checkbox without evidence is not completion.
