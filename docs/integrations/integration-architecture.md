# EPF Integration Architecture

**Status:** Starter; connector-specific designs deferred.

## Principles
External systems are accessed through registered typed connectors. Each connector has an owner, version, capability declaration and trust classification. The platform enforces authentication and authorization. Validate inputs, treat outputs as untrusted, audit mutations and use idempotency where possible. Secrets remain in a secrets broker.

## Integration domains
- AI providers: ChatGPT/Codex, Claude, Gemini and custom model/agent runtimes; normalize invocation, streaming, structured output, usage and errors.
- Agent interoperability: MCP for tool/resource exposure; A2A where independent agent collaboration is required.
- Source and CI/CD: GitHub App, repository permissions, branch protection, pull requests, checks, Actions and artifact provenance.
- Cloud and infrastructure: GCP, AWS, Azure, Terraform/OpenTofu, Helm and GitOps; define account mapping, federation and plan/apply boundary.
- Identity and gateways: Enterprise IdP, OIDC/OAuth, Okta, Tyk and Apigee; define client/agent identity, quotas and policy.
- Security and operations: scanning, SBOM/signing, SIEM, OpenTelemetry, ITSM, CMDB, FinOps and GRC.

## Connector contract
Define connector ID/version/owner/lifecycle, capabilities, endpoint configuration, authentication method and scopes, typed operation schemas, data classification, egress requirements, risk class, approval policy, rate limits, timeouts, retries, idempotency, audit and health checks.

## Priority integration sequence
1. GitHub App and GitHub Actions.
2. GCP Workload Identity Federation and cloud APIs.
3. Terraform/OpenTofu execution.
4. Enterprise OIDC identity and gateway.
5. MCP tool servers.
6. OpenTelemetry pipeline.
7. Security scanning and artifact provenance.
8. Additional clouds and A2A interoperability.

## Required design pack
Context and sequence diagrams, identity/token flow, permission matrix, network flow, error handling, threat model, runbook and contract tests.
