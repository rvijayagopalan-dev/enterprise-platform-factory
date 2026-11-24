# Enterprise Platform Factory — Product Experience & Interaction Design

## 1. Design intent

The product experience should make a complex engineering factory understandable to business requesters, developers, architects, platform engineers and risk stakeholders. It should expose the right depth progressively: a requester sees outcomes and approvals; an engineer can inspect specifications, architecture, code and execution; platform/security operators can inspect policies, identities, evidence and telemetry.

The interface is a control surface for governed work—not a chat transcript wrapped around automation.

## 2. Information architecture

Primary navigation:
1. **Command Center** — portfolio health, active workflows, approvals, platform status and recent activity.
2. **Build Requests** — request intake, clarification, specification, collaboration and status.
3. **Blueprint Catalog** — certified patterns, architecture diagrams, compatibility, cost bands and versions.
4. **Factory Workflows** — task graph, agent/engine assignments, dependencies, retries and execution history.
5. **Engineering Workspace** — source changes, artifacts, tests, pull requests and documentation.
6. **Infrastructure & Environments** — plans, drift, resources, deployments and environment promotion.
7. **Governance** — policies, controls, exceptions, approvals and evidence.
8. **Security & Identity** — human/agent/workload identities, access, secrets posture and findings.
9. **FinOps** — estimates, budgets, allocation, forecasts, anomalies and optimization.
10. **Observability & SRE** — service health, traces, SLOs, incidents and AgentOps.
11. **Catalog & Administration** — engines, agents, connectors, modules, tenants, roles and lifecycle.

## 3. Core screen designs

### 3.1 Command Center
Purpose: answer “What is happening, what needs my attention, and is the platform healthy?”

Key elements:
- Portfolio KPIs: active builds, lead time, deployment success, policy pass rate, spend and SLO health.
- Approval inbox with risk and deadline.
- Workflow activity feed and failed-task alerts.
- Tenant/project filters and environment selector.
- Quick action: Start a build request.
- Clear labels for live, stale, synthetic or unavailable telemetry.

### 3.2 Conversational Build
Purpose: translate business intent into a complete, reviewable request.

Interaction:
1. User describes outcome in natural language or structured form.
2. System extracts business outcome, users, capabilities, data, integrations and constraints.
3. System asks one focused clarification at a time; user may save a draft.
4. User reviews generated requirements, assumptions and acceptance criteria.
5. User selects target cloud, environment, data classification, availability and budget.
6. Interpreter proposes one or more certified blueprints with trade-offs.
7. User inspects architecture, security, cost, compliance and operational implications.
8. User confirms blueprint; only then can the factory create an execution workflow.

Required UX states: Draft, Needs clarification, Interpreted, Blueprint proposed, Awaiting confirmation, Confirmed, Planning, In progress, Waiting for approval, Completed, Failed, Cancelled.

### 3.3 Blueprint detail and comparison
Display:
- Blueprint name, owner, version, lifecycle and certification state.
- Supported workload types and constraints.
- Component architecture and technology stack.
- Security controls and data classification support.
- Deployment topology and environment compatibility.
- Cost range and assumptions.
- SLO profile and operational requirements.
- Module dependencies and deprecation notices.
- Diff between blueprint versions.

### 3.4 Workflow execution view
Use a dependency graph with swimlanes for agents/engines. Each task should expose:
- Status, owner/agent, engine and version.
- Input specification and artifact references.
- Start/end times, duration and retry count.
- Tool calls and permission scope.
- Logs, trace, output artifacts and evidence.
- Policy decisions and approval dependencies.
- Cancel/retry actions only where safe and authorized.

### 3.5 Approval center
Show requester, approver, environment, action, risk, cost delta, plan summary, policy results, evidence, expiry and separation-of-duties status. Approvers need explicit Approve, Reject and Request changes actions with reason capture. Never use a generic “Continue” action for irreversible operations.

### 3.6 Trust and Operations center
Provide separate but linked views:
- Governance: controls, policy bundles, exceptions, compliance mappings and evidence freshness.
- Security: principals, access grants, findings, supply-chain provenance and runtime posture.
- FinOps: estimate vs actual, budget variance, cost per unit and optimization recommendations.
- Observability: service map, traces, metrics, SLO burn, incidents and AgentOps quality.

## 4. Interaction patterns

- Progressive disclosure: summary first, technical detail on demand.
- Explicit state labels: distinguish proposed, simulated, approved, executing and completed.
- Confirmation for consequential changes; no hidden implicit consent.
- Preserve user edits and assumptions across generated revisions.
- Show source/provenance for generated requirements and decisions.
- Explain why an action is blocked and what is needed to unblock it.
- Make policy outcomes actionable: permit, deny, approval required, exception required.
- Use consistent correlation IDs across request, workflow, task, PR, plan and deployment.
- Support keyboard navigation, responsive layout and accessible status cues.
- Never rely on color alone to communicate severity or state.

## 5. Visual system

Recommended visual language:
- Dark navy or neutral enterprise canvas; restrained cyan/blue accent for active controls.
- Green for verified/healthy, amber for attention/approval, red for blocked/critical.
- Neutral cards and thin borders; avoid excessive gradients and ornamental charts.
- Consistent typography hierarchy and compact metadata labels.
- Status chips always paired with readable text.
- Architecture and workflow diagrams use consistent shapes for actors, services, stores, boundaries and external systems.

## 6. Reusable UI components

- Global tenant/project/environment selector.
- Request composer and clarification card.
- Specification/acceptance-criteria editor.
- Blueprint card, architecture viewer and comparison panel.
- Workflow graph and task detail drawer.
- Agent/engine capability card.
- Artifact viewer and diff panel.
- Policy decision card and evidence viewer.
- Approval action panel.
- Terraform plan summary and resource-change table.
- Cost estimate and budget variance widget.
- SLO health and incident timeline.
- Audit event timeline and provenance panel.
- Connector health and permission inspector.

## 7. Conversational interaction contract

The assistant should:
- Ask for missing information that materially changes the architecture or risk.
- Distinguish facts, assumptions and recommendations.
- Present blueprint trade-offs and estimated cost ranges with assumptions.
- Avoid claiming an integration is connected unless verified by the platform.
- Explain that generated code and plans require validation.
- Never claim a deployment or external mutation succeeded before receiving execution confirmation.
- Ask for explicit approval at configured risk gates.
- Provide a durable request/workflow ID and a traceable summary.

## 8. Prototype/demo behavior

The current HTML demo is an interaction prototype. It uses synthetic metrics, static example records and client-side simulated actions. The “Interpret request” action uses deterministic browser-side demo logic, not a live LLM. “Confirm blueprint” creates only an in-page simulated workflow. It does not call GitHub, Terraform, a cloud provider, identity provider, policy engine or monitoring backend.

When connecting live services, replace simulated handlers with authenticated API calls and preserve loading, success, failure, retry and audit states. The UI must not optimistically report external actions as successful.

## 9. UX acceptance criteria

- A first-time requester can submit a draft build request without understanding internal engines.
- The requester can see and edit extracted requirements before blueprint confirmation.
- The blueprint page exposes security, cost, runtime and operational implications.
- The workflow view makes blockers, approvals and failed tasks discoverable.
- Approvers can understand exactly what action and scope they are approving.
- Operators can trace a deployed workload back to the originating request and policy decisions.
- Simulated and live data are visibly distinguishable.
- Every state-changing action has a clear result and error path.
