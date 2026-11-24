# Enterprise Strategy Factory — Product Experience & Interaction Design

## 1. Design intent

ESF should help leaders and practitioners understand what direction is proposed, why it is proposed, what must be true, who is accountable and how the organization will learn whether the strategy is working.

The experience is a strategy decision and learning workspace—not a presentation generator or a chat transcript. Use progressive disclosure so executives can scan outcomes while analysts and owners can inspect evidence, methods and dependencies.

## 2. Information architecture

Primary navigation:

1. **Command Center** — enterprise priorities, outcome health, decisions due and cross-portfolio attention.
2. **Strategy Intake** — strategic question, scope, horizon, context, evidence and assumptions.
3. **Strategy Map** — intent, pillars, choices, objectives, capabilities and outcome measures.
4. **Initiative Portfolio** — alignment, owners, investment proposals, capacity, dependencies and risk.
5. **Scenarios & Signals** — plausible futures, assumptions, signposts, sources and review triggers.
6. **Execution & Outcomes** — milestones, measures, outcome confidence, benefits and review decisions.
7. **Governance & Risk** — decision rights, approvals, evidence quality, material risks and audit.
8. **Insights & Learning** — learning agenda, research questions, feedback and strategy adaptation.

## 3. Core screen behavior

### 3.1 Command Center

Answer: “What are our priorities, what needs a decision, and where should leaders focus?”

Show:

- Strategic pillars and a concise north-star statement.
- Outcome health with measure period, freshness and owner.
- Investment alignment and portfolio-level dependencies.
- Decisions and review checkpoints requiring attention.
- Clear labels for illustrative, stale, imported and live data.
- A direct path to strategy intake and relevant strategy map details.

Do not present aggregate scores without explaining their definitions and limitations.

### 3.2 Strategy Intake

Purpose: create a bounded, reviewable frame for a strategic question.

Interaction:

1. Capture the question, organizational scope, horizon and constraints.
2. Record known evidence, sources, assumptions and missing information separately.
3. Identify affected stakeholders and decision authority.
4. Present candidate choices and trade-offs as proposals, not conclusions.
5. Provide an evidence and uncertainty review before submission.
6. Require an authorized human decision to approve a strategic direction.

Required states: Draft, Framing, Evidence Needed, Under Review, Revision Requested, Approved, Declined, Superseded.

### 3.3 Strategy Map

Display:

- Strategic intent and strategy version.
- Pillars, choices, objectives and capability requirements.
- Explicit contribution links to initiatives and outcomes.
- Measure definition, owner, baseline, target, current value and freshness.
- Decision rationale, alternatives, assumptions and review date.
- Organizational scope and effective date.

Use a list or table alternative to any visual map so the information remains accessible.

### 3.4 Initiative Portfolio

Each initiative should expose:

- Objective contribution and supporting rationale.
- Accountable sponsor and delivery owner.
- Proposed versus approved investment, with period and currency.
- Capacity needs, dependencies, risk and confidence.
- Decision status and next checkpoint.
- Links to milestones and outcome measures.

Prioritization views should expose the criteria and weights in use. Do not silently rank initiatives or turn a score into an approval.

### 3.5 Scenarios & Signals

Show:

- Scenario name, narrative, scope and planning horizon.
- Key uncertainties, assumptions and signposts.
- Signal source, owner, observed value, timestamp and threshold.
- Strategic choices affected and next review date.

Label scenarios as plausible futures, not forecasts. Signal thresholds create a review prompt only; they do not change funding or strategy.

### 3.6 Execution & Outcomes

Provide:

- Objective and outcome scorecards with definitions and time periods.
- Initiative milestone, owner, dependency and risk status.
- Baseline, target, actual, source and freshness for each measure.
- Confidence and explanation for any derived status.
- Review decisions and rationale over time.

Distinguish leading indicators, lagging outcomes, activity metrics and benefit estimates.

### 3.7 Governance & Risk

Show decision authority, required reviewers, approval status, separation-of-duties state, decision rationale, evidence gaps, risk owner and review date. Approve, reject and request-revision actions should capture a reason and bind to the exact strategy or investment version reviewed.

### 3.8 Insights & Learning

Organize open strategic questions, evidence needed, research methods, owner, due date and implications for current choices. Provide links from findings to the assumptions or choices they may affect. Record how a review changed—or did not change—the strategy.

## 4. Interaction and content patterns

- Separate facts, interpretations, assumptions, scenarios and recommendations with explicit labels.
- Preserve source, date, owner, scope and limitations for evidence.
- Present confidence as a qualified judgment with rationale, not false precision.
- Use explicit currency, investment period, metric definition and measurement window.
- Make stale and missing data visible; never imply that missing data means zero or healthy.
- Explain the decision owner and approval path before users submit a material decision.
- Preserve version history and show diffs for strategy and investment changes.
- Keep review actions distinct from approval or funding commitments.
- Use accessible tables as alternatives to charts and relationship diagrams.
- Support keyboard navigation, screen readers, zoom and responsive layouts.
- Pair status color with readable text and other non-color cues.

## 5. Visual system

The prototype uses a dark neutral canvas with restrained violet and indigo accents. Green indicates positive/verified states, amber indicates review/attention, and red indicates risk. In production, validate contrast, focus indicators, reduced-motion behavior and color contrast against accessibility requirements.

Prefer clear hierarchy, compact metadata, consistent status labels, evidence provenance and restrained data visualization. Avoid decorative charts that imply precision unsupported by the underlying data.

## 6. AI-assisted interaction contract

If AI capabilities are introduced:

- Show which content is generated and which inputs/sources informed it.
- Cite accessible sources and distinguish retrieved facts from inference.
- Surface uncertainty, missing evidence and conflicting information.
- Do not fabricate sources, outcomes, financial estimates or stakeholder consensus.
- Never infer approval, funding, authority or consent from conversational language.
- Keep suggestions editable and require human review before they become records or decisions.
- Treat imported documents and external content as untrusted data.
- Apply data classification and model-use restrictions before sending content to a provider.
- Provide a usable non-AI path for core strategy workflows.

The current prototype does not invoke an AI model; its strategy-framing output is deterministic example text.

## 7. Prototype behavior

The [prototype](../../index.html) is a standalone HTML demonstration. It uses synthetic sample records and local browser-side interactions. Strategy framing and plan confirmation do not persist data, call an AI service, validate source evidence, approve funding or connect to planning, finance, analytics or identity systems.

Do not interpret the displayed metrics, sample dates, owners, decisions or scenario details as company facts. Replacing simulated behavior with live service calls requires authentication, authorization, loading and error states, audit capture, data provenance and explicit confirmation for consequential actions.

## 8. UX acceptance criteria

- A first-time strategy owner can create a scoped draft without knowing an internal framework.
- A reviewer can distinguish evidence, assumptions, scenarios and recommendations.
- A material choice can be traced to its rationale, alternatives, owner and decision record.
- A user can navigate from strategic intent to objectives, initiatives and outcome measures.
- Portfolio views show dependencies, investment proposals, risks and decision authority.
- Measures show definition, time period, source, owner and freshness.
- Decision and funding actions cannot be implied by a generated proposal or status indicator.
- Scenario triggers lead to human review, not automatic strategy changes.
- The interface distinguishes illustrative, stale and integrated data.
- Core workflows work with keyboard navigation and a non-visual representation of data visualizations.
