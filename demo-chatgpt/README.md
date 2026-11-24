# Enterprise Platform Factory — ChatGPT Demo

This folder contains a standalone HTML implementation of the interactive dashboard recreated for rendering inside ChatGPT.

## Run locally

From the repository root:

```bash
python -m http.server 8000
```

Open [http://localhost:8000/demo-chatgpt/](http://localhost:8000/demo-chatgpt/).

## Features

- Overview of the shared AI engineering control plane
- Conversational request intake with browser speech-recognition enhancement where supported
- Clarification of workload intent, runtime, environment, data sensitivity and availability
- Blueprint recommendation and explicit requester confirmation
- Simulated Factory Orchestrator and Infrastructure Engine workflow
- FinOps, governance, security and monitoring dashboards

## Important

This is a standalone interactive prototype. Metrics and execution steps are illustrative. It does not connect to live AI providers, GitHub Actions, Terraform, identity providers or cloud accounts. Production provisioning would require authenticated integrations, isolated runners, policy enforcement and human approval controls.
