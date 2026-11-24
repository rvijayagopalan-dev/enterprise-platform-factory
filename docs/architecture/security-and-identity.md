# Security and Identity Architecture

## 1. Security objective

Enable AI-assisted engineering without granting AI models unrestricted access to source repositories, cloud projects, production workloads or secrets.

## 2. Identity separation

Maintain separate identities for:
1. Human requester and approver.
2. AI client or agent workload.
3. Tool/MCP server.
4. GitHub Actions workflow.
5. GCP deployment service account.
6. Application runtime workload.

Never treat a model name, prompt or agent-supplied string as proof of identity.

## 3. GitHub controls

- Prefer a GitHub App with narrowly scoped repository permissions for automated repository operations.
- Install the app only on approved repositories.
- Protect the default branch and require pull requests.
- Require status checks and appropriate code-owner review.
- Restrict workflow permissions; grant `id-token: write` only to jobs that need federation.
- Pin third-party actions to reviewed immutable commit SHAs in production workflows.
- Protect GitHub environments and require reviewers for production deployments.
- Scan dependencies, secrets, source code and build artifacts.
- Do not expose repository or organization administration credentials to coding agents.

## 4. GCP workload identity

Use GitHub Actions OIDC with Google Cloud Workload Identity Federation (WIF) for CI/CD authentication.

Controls:
- Restrict the WIF provider's attribute conditions to the expected GitHub organization, repository, branch and/or protected environment.
- Map and validate claims from the GitHub OIDC token.
- Grant the federated principal only the ability to impersonate the intended deployment service account.
- Use separate service accounts for plan, non-production apply and production apply where practical.
- Grant resource-specific IAM roles rather than broad project Owner or Editor roles.
- Separate projects and state for production and non-production.
- Avoid downloadable service-account keys.

## 5. Secrets and sensitive data

- Store application secrets in Secret Manager or an approved vault.
- Retrieve secrets only at runtime using workload identity.
- Never put secrets in prompts, source code, Terraform variables committed to Git, logs or artifacts.
- Redact tokens and sensitive values from tool outputs.
- Apply data classification and retention rules to prompts, code context, logs and generated artifacts.

## 6. Policy gates

Before tool execution, evaluate:
- Is the requester authorized for this project and environment?
- Is the repository on the allowlist?
- Is the operation read-only, write or destructive?
- Is the target environment permitted?
- Are required approvals present?
- Does the action comply with budget, region, network and data policies?
- Is the artifact/plan digest the one approved?

Deny by default when policy evaluation is unavailable or ambiguous for high-impact operations.

## 7. Production change policy

Production apply, IAM changes, network perimeter changes, data deletion and secret rotation require explicit approval by authorized humans. Approval must be tied to the exact reviewed plan and expire when that plan changes.

## 8. Audit and response

Capture:
- Authenticated actor and agent identity.
- Tool and operation name.
- Target resource and environment.
- Policy decision and approval references.
- Artifact digest and commit SHA.
- Start/end time and outcome.
- Cloud audit-log correlation identifiers.

Define incident procedures for compromised agents, leaked credentials, malicious repository changes, unexpected infrastructure drift and unauthorized deployment.

## 9. Initial threat scenarios

| Threat | Mitigation |
|---|---|
| Prompt injection in repository content | Treat retrieved content as untrusted data; tool allowlists and policy checks |
| Overprivileged agent | Short-lived credentials, least privilege and per-task scopes |
| Malicious pull request | Protected branches, code review, CI scans and signed provenance |
| Credential exfiltration | Secret isolation, output redaction and restricted network egress |
| Terraform destructive change | Plan review, policy checks and explicit approval |
| Compromised CI action | Pin action SHAs, review dependencies and restrict token permissions |
| Cross-environment access | Separate projects, service accounts and state backends |
| Untraceable autonomous operation | Durable task IDs, audit events and artifact provenance |

## 10. Security acceptance criteria

The first release must demonstrate:
- No long-lived GCP service-account key in GitHub.
- Repository-scoped write access.
- No direct production credentials available to interactive agents.
- Explicit approval for non-production apply in the initial pilot and mandatory approval for production.
- Logged and attributable tool invocations.
- Secret scanning and dependency scanning in CI.
- A tested credential revocation and agent disablement procedure.
