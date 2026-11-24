# Enterprise Platform Factory — Reference Architecture

## 1. Purpose

Define a reusable, AI-driven engineering platform that converts natural-language requirements into reviewed, tested and deployable software and infrastructure. The factory supports multiple AI assistants while keeping identity, policy enforcement, execution and cloud permissions in a controlled platform layer.

## 2. Architecture principles

1. **Human accountability:** AI proposes and coordinates work; accountable humans approve consequential decisions and production changes.
2. **Least privilege:** Human, agent, CI runner and cloud workload identities are distinct and scoped.
3. **Specification before implementation:** Work begins with explicit requirements, acceptance criteria and non-functional requirements.
4. **Everything versioned:** Application code, infrastructure, policies, workflows and architecture decisions are maintained as version-controlled artifacts.
5. **Plan before apply:** Infrastructure changes are validated and reviewed before execution.
6. **Reusable by default:** Templates, golden paths and versioned modules are preferred over bespoke implementations.
7. **Observable execution:** Each task has traceable inputs, tool calls, approvals, outputs and deployment evidence.
8. **Provider and model neutrality:** The orchestration contract should not depend on one LLM vendor.

## 3. Logical architecture

### 3.1 AI interaction layer

Entry points include ChatGPT/Codex, Claude Code, Gemini and organization-built agents. Each client authenticates and requests a bounded task through approved interfaces. The platform must not assume that a model connection automatically grants repository or cloud write permissions.

### 3.2 Agent gateway and identity

Responsibilities:
- Authenticate users and agents.
- Authorize access to tools, projects and environments.
- Enforce request limits and policy checks.
- Route requests to approved MCP servers and platform APIs.
- Propagate trace and correlation identifiers.

Candidate integrations: Tyk or Apigee for API gateway capabilities; Okta for workforce identity and SSO; OAuth 2.0/OIDC for delegated and workload identity. Select one coherent gateway pattern for each traffic path rather than deploying overlapping gateways without a defined boundary.

### 3.3 Platform Factory orchestration

The orchestrator:
- Parses a request into a typed task specification.
- Builds a dependency graph and execution plan.
- Selects approved agent capabilities.
- Maintains task state, checkpoints, retries and cancellation.
- Requests human approvals at policy-defined gates.
- Records provenance and emits events.
- Returns an execution report with artifacts and validation evidence.

### 3.4 Specialized agents

| Agent | Inputs | Outputs | Key controls |
|---|---|---|---|
| Specification | User intent, product context | Requirements, stories, acceptance criteria, NFRs | Ambiguity checks, owner approval |
| Architecture | Approved specification, standards | Designs, ADRs, diagrams, technology decisions | Standards conformance, architecture review |
| Coding | Approved design, repository context | Source code, configuration, container assets | Secure coding, scoped workspace |
| Test | Specification, code, test strategy | Unit/integration/security results | Coverage thresholds, test provenance |
| Repository | Project metadata, change set | Branches, commits, PRs, labels | Repository allowlist, branch protection |
| Infrastructure | Architecture, environment contract | Terraform modules, plan, policy results | Plan review, state isolation, least privilege |
| Deployment | Approved artifact and release plan | Deployment, rollout and rollback evidence | Environment approvals, release policy |
| Observability | Service and SLO definitions | Dashboards, alerts, diagnostics | Access controls, data minimization |

Agents should communicate through versioned task and artifact contracts. Avoid direct, unbounded agent-to-agent tool access.

### 3.5 Execution and delivery plane

- GitHub stores source, documentation, issues, pull requests and workflow definitions.
- GitHub Actions runs deterministic CI/CD jobs.
- Terraform defines cloud infrastructure.
- Docker and OCI-compatible registries package application artifacts.
- Helm and Kubernetes manage container workloads where appropriate.
- GKE and Cloud Run are candidate runtime targets based on workload requirements.

### 3.6 Cloud platform

Initial target: GCP. Candidate services include GKE, Cloud Run, Artifact Registry, Cloud Storage, Cloud SQL, IAM, Cloud Monitoring and Cloud Logging. Resource selection must be driven by workload requirements, availability, data residency, cost and operational ownership.

## 4. End-to-end workflow

1. Request intake and requester authentication.
2. Requirement clarification and specification generation.
3. Architecture and security review where required.
4. Task graph creation and approved agent selection.
5. Code and infrastructure generation in an isolated workspace.
6. Automated tests, static analysis, dependency and policy checks.
7. Repository branch and pull request creation.
8. Human review and merge according to repository policy.
9. Terraform plan and policy evaluation.
10. Approval of environment-specific infrastructure changes.
11. Apply and application deployment through CI/CD.
12. Health checks, smoke tests and SLO validation.
13. Evidence capture, operational handover and feedback.

## 5. Trust boundaries

- **TB1 — User to AI interface:** Authenticate requester; validate request scope and data handling.
- **TB2 — AI interface to agent gateway:** Authenticate client and authorize each capability.
- **TB3 — Agent runtime to tools:** Use allowlisted tools, constrained arguments and per-task credentials.
- **TB4 — CI runner to cloud:** Use GitHub OIDC and GCP Workload Identity Federation with repository/ref/environment restrictions.
- **TB5 — Deployment to runtime:** Use workload identity, network controls, artifact provenance and runtime policy.
- **TB6 — Production operations:** Require approved operators and auditable break-glass procedures.

## 6. Deployment topology

A recommended initial topology separates:
- Developer / agent workspace.
- GitHub-hosted source and CI control plane.
- GCP non-production project(s).
- GCP production project(s), isolated from development.
- Centralized logging, audit and security monitoring.

Use separate Terraform state and service identities per environment. Production credentials must not be available to interactive coding agents.

## 7. Non-functional requirements

| Area | Initial requirement |
|---|---|
| Security | Least privilege, secret isolation, dependency and artifact scanning |
| Reliability | Durable task state, bounded retries, idempotent operations |
| Scalability | Independently scale orchestration, agent workers and execution runners |
| Performance | Track task latency by phase; establish baselines before setting SLOs |
| Observability | Correlated logs, metrics, traces and task-level audit events |
| Recoverability | Checkpoint tasks; support safe retry and rollback |
| Portability | Provider-neutral agent contracts; environment-specific adapters |
| Cost | Per-task and per-environment cost attribution and budget controls |
| Governance | Approval policies, policy-as-code and immutable evidence retention |

## 8. Key architecture decisions to record

Create Architecture Decision Records (ADRs) for:
1. Orchestration framework and durable workflow engine.
2. MCP server hosting and tool authorization model.
3. Gateway boundaries: Tyk, Apigee or a deliberate combination.
4. Agent identity and Okta integration.
5. GitHub App permissions and repository onboarding.
6. GCP WIF trust configuration and service-account boundaries.
7. Terraform state backend, locking and promotion strategy.
8. GKE versus Cloud Run workload placement.
9. Artifact registry, signing and provenance.
10. Observability and audit data retention.

## 9. Initial acceptance criteria

The first vertical slice is accepted when a user can request a simple FastAPI service and the factory can:
- Produce an approved specification and implementation plan.
- Generate source code and automated tests.
- Create a branch and pull request in an allowlisted repository.
- Run CI checks and publish test evidence.
- Generate a Terraform plan for a non-production environment.
- Require an explicit approval before applying infrastructure.
- Deploy to a non-production GCP target using short-lived federated credentials.
- Run health checks and provide a traceable execution report.

## 10. Out of scope for the first release

- Unrestricted production changes initiated directly by an LLM.
- Autonomous creation of organization-wide IAM permissions.
- Unbounded self-modifying agents.
- Multi-cloud provisioning in the first vertical slice.
- Automatic merge or production deployment without configured policy and human approval.
