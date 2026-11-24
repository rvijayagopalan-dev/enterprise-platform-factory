# EPF First-Class Entity Catalog

**Status:** Starter catalog; detailed schemas deferred. The 40 names below are a working vocabulary and may change through reviewed design decisions.

## Interaction
| Entity | Initial responsibility |
|---|---|
| Conversation | User/agent interaction thread |
| Conversation Session | Bounded interaction context |
| Build Request | Durable request to create or change a product |
| Intent | Interpreted desired outcome |

## Intelligence
| Entity | Initial responsibility |
|---|---|
| Requirement | Functional or non-functional need |
| Clarification | Question and resolved answer |
| Specification | Versioned description of desired system |
| Decision Record | Rationale and approved choice |

## Architecture
| Entity | Initial responsibility |
|---|---|
| Blueprint | Reusable certified solution pattern |
| Architecture Model | Structural and behavioral design |
| Architecture Component | Logical or deployable building block |
| Technology Stack | Approved technology selections |

## Agents
| Entity | Initial responsibility |
|---|---|
| Agent | Executable AI worker type |
| Agent Profile | Instructions, model and runtime configuration |
| Agent Identity | Principal used for authentication and authorization |
| Agent Session | Runtime instance and context boundary |

## Execution
| Entity | Initial responsibility |
|---|---|
| Factory Workflow | Durable orchestration instance |
| Engineering Task | Bounded unit of work |
| Execution Plan | Ordered work and action plan |
| Execution Run | Actual attempt to execute a task or plan |

## Engines
| Entity | Initial responsibility |
|---|---|
| Engine | Versioned engineering capability |
| Engine Template | Reusable generation/execution template |
| Module | Reusable code, infrastructure or design unit |
| Artifact | Immutable output or input reference |

## Infrastructure
| Entity | Initial responsibility |
|---|---|
| Environment | Deployment and policy boundary |
| Infrastructure Resource | Managed cloud/platform resource |
| Infrastructure Plan | Proposed infrastructure mutation |
| Deployment | Release of an immutable artifact to an environment |

## Governance
| Entity | Initial responsibility |
|---|---|
| Policy | Versioned machine-evaluable rule |
| Control | Governance requirement and evidence mapping |
| Approval | Authorized decision on a proposed action |
| Evidence | Proof supporting a control or decision |

## Operations
| Entity | Initial responsibility |
|---|---|
| Budget | Spend guardrail for a scope and period |
| Cost Record | Estimated or actual cost observation |
| SLO | Reliability objective and measurement window |
| Incident | Operational disruption or risk event |

## Ecosystem
| Entity | Initial responsibility |
|---|---|
| Integration | Configured external system relationship |
| Connector | Typed adapter and capability interface |
| Capability | Discoverable unit of platform functionality |
| Audit Event | Durable record of actor, action and outcome |

## Entity definition checklist
For each entity define purpose, owner, authoritative system, identifier, attributes and constraints, relationships, scope, lifecycle, authorization, classification, events, APIs, retention, example payload and validation tests.
