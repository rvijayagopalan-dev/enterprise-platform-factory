# EPF Deployment Architecture

**Status:** Starter; GCP-first deployment design to be validated.

## Objectives
Define secure deployment topologies for control plane, isolated execution plane and generated application runtimes, with environment separation, tenant isolation and recoverability.

## Environment model
Development, Test, Staging and Production. Define separate projects/accounts, networks, identities, secrets, policy bundles and budgets based on data classification and risk. Promote immutable artifacts rather than rebuilding untracked source in each environment.

## GCP-first topology

### Control plane
Candidate services: HTTPS load balancer/API gateway, enterprise identity integration, Cloud Run or GKE services, managed relational database, Pub/Sub, Cloud Storage, Secret Manager, Cloud KMS and centralized telemetry.

### Execution plane
Candidate services: ephemeral Kubernetes Jobs or dedicated workers, separate service accounts, Workload Identity, restricted egress, Artifact Registry, temporary workspace storage and controlled connector endpoints.

### Application runtime
Candidate targets: GKE, Cloud Run and managed data services selected by blueprint. Use environment-specific identities, private connectivity, ingress/egress controls, encryption and cost/ownership labels.

## Network design topics
Shared VPC and project boundaries; Private Service Connect; private API access; controlled NAT/proxy/firewall egress; DNS and certificates; runner-to-GitHub/cloud paths; VPC Service Controls where applicable; tenant/workload segmentation.

## Isolation tiers
Do not assume a Kubernetes namespace alone is sufficient for untrusted generated code. Define stronger VM, microVM, dedicated node pool, project or VPC isolation according to threat tier.

## Availability and DR
Define per-component SLO, RTO and RPO. Design multi-zone services, database backups/replication, event replay, artifact durability, audit retention, runner statelessness and regional recovery. Test restore and failover.

## Deliverables and open decisions
Produce project hierarchy, C4 deployment/network diagrams, isolation matrix, firewall/route/DNS matrix, workload identity map, HA/DR design, capacity/cost model and Terraform bootstrap design. Decide control-plane runtime, runner isolation, regions, event/database topology and abstraction boundaries.
