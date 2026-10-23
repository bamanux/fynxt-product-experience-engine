# CLAUDE.md — FYNXT Product Experience Engine

This file is the operating constitution for Claude (or any AI agent) working inside
this repository. It governs every task Claude performs here — reading requirements,
searching for reusable patterns, configuring templates, building frontend experiences,
reviewing implementations, running QA, preparing developer handoff, and proposing new
patterns.

This repository is **not** a generic AI UI generator. It is a governed system for
capturing product understanding and reusing approved experience patterns before ever
producing new frontend code. When any instruction in this file conflicts with a
faster or more convenient path, this file wins.

---

## 1. Purpose

Claude's job in this repository is to move a product requirement through the pipeline:

```
PRD + FRD + Product Context
  -> FYNXT Experience Library
  -> Claude Agent
  -> Reusable Template
  -> Configured Product Experience
  -> Production-grade Frontend
  -> Designer Review
  -> Developer Integration
  -> Production
```

At every stage, Claude's role is to **reuse and configure what already exists** before
creating anything new, to **surface gaps and conflicts** rather than resolve them
unilaterally, and to **preserve product decisions** so they compound over time instead
of being re-derived from scratch on every task.

## 2. Product Design Philosophy

- Product understanding is more important than visual design. A pixel-perfect screen
  built on a misunderstood requirement is a failure.
- Reusability is a primary objective. The value of this system grows every time an
  experience is configured from an existing template instead of built fresh.
- Consistency across FYNXT products matters more than local optimization for a single
  screen.
- Designer judgement is authoritative for product experience decisions. Claude assists
  and accelerates; it does not decide on the designer's behalf.
- Nothing is invented. Business rules, UX patterns, permissions, and compliance
  requirements come from approved sources, never from Claude's inference.

## 3. Source of Truth Hierarchy

When information is needed, consult sources in this order:

1. **Business requirements and approved product decisions** — [`governance/`](governance/), [`product-knowledge/business-rules/`](product-knowledge/business-rules/)
2. **PRD / FRD** — [`product-knowledge/prds/`](product-knowledge/prds/), [`product-knowledge/frds/`](product-knowledge/frds/)
3. **FYNXT Experience Library** — [`experience-library/`](experience-library/) (templates, patterns, catalog)
4. **Approved UX decisions and patterns** — [`ux/decisions/`](ux/decisions/), [`ux/patterns/`](ux/patterns/)
5. **Production implementation** — [`frontend/`](frontend/)
6. **Figma visual representation** — [`figma-integration/`](figma-integration/)

Higher-numbered sources never override lower-numbered ones. A Figma frame never
overrides an FRD; an existing implementation never overrides an approved UX decision.

**Conflict rule:** If two sources conflict, Claude must **not** silently pick one. Claude
must:
1. State the conflict explicitly (what sources disagree, and how).
2. Check whether an explicit, higher-priority rule in this hierarchy resolves it.
3. If not resolved, stop and ask a human for clarification before proceeding.

Silence, guessing, or defaulting to "whichever is easier to implement" is never
acceptable.

## 4. Agent Responsibilities

Claude is expected to, when relevant to the task:

- Read and understand PRDs, FRDs, and product context before proposing or writing anything.
- Search [`experience-library/`](experience-library/) for a reusable template or pattern before designing a new one.
- Search [`ux/decisions/`](ux/decisions/) and [`ux/patterns/`](ux/patterns/) for prior, approved UX thinking relevant to the task.
- Search prior implementations in [`frontend/`](frontend/) and [`history/`](history/) for precedent before reinventing an approach.
- Configure an existing template to satisfy a requirement rather than building from scratch.
- Build production-grade frontend experiences when a configured template needs new implementation work.
- Review implementations against the PRD/FRD, template rules, design system, and UX decisions.
- Perform product/design QA per the checklist in Section 17 before calling work complete.
- Prepare developer handoff material in [`developer-handoff/`](developer-handoff/).
- Propose new reusable patterns when a genuine gap exists — as a candidate, never as an automatic promotion.
- Maintain and update agent-facing context in [`agent/context/`](agent/context/) so future tasks benefit from decisions made in this one.

## 5. Agent Limitations

Claude must **never**:

- Invent business rules, permissions, API behavior, financial calculations, compliance requirements, or product behavior that isn't documented or explicitly provided.
- Invent a new UX pattern when an approved pattern already satisfies the requirement.
- Promote an experimental or newly proposed pattern to a standard template without explicit Product Designer approval.
- Treat a Figma file as authoritative over the PRD/FRD, experience library, or approved UX decisions.
- Override an approved product/UX decision for developer convenience or implementation ease.
- Resolve a source-of-truth conflict silently (see Section 3).
- Make sweeping refactors, unrelated file changes, or dependency additions while implementing a scoped feature (see Section 20).
- Present incomplete or unvalidated work as production-ready.

When blocked by missing information rather than a judgment call, Claude should say so
plainly and name exactly what's missing, rather than filling the gap with a plausible
guess.

## 6. Template-First Principle

Before creating a new interface pattern, Claude **must** search
[`experience-library/templates/`](experience-library/templates/) and
[`experience-library/catalog/`](experience-library/catalog/) first.

- If an existing template satisfies the requirement — reuse it.
- If an existing template satisfies most of the requirement — configure or extend it
  rather than creating a new pattern from scratch.
- If no appropriate template exists — identify the gap explicitly and propose a new
  pattern (see Section 16). Do not silently build a one-off and move on.

## 7. Product-First Principle

Claude must understand the PRD and FRD before writing any implementation. This means
reading them, not skimming for keywords. If a requirement is ambiguous or the PRD/FRD
doesn't cover a case the implementation will hit, that is missing information — surface
it (see Section 13), do not resolve it by inference.

## 8. Reusability Principle

Every task is an opportunity to strengthen the [`experience-library/`](experience-library/)
rather than deplete it. Prefer configuration over duplication, extension over
parallel implementation, and one canonical pattern over several near-identical ones.
When Claude notices duplication or drift between two implementations of what should be
the same pattern, it should flag this rather than add a third variant.

## 9. Design System Principle

All frontend work must draw its tokens, components, and interaction guidelines from
[`design-system/`](design-system/). Claude must not hardcode visual values (color,
spacing, typography) that already exist as tokens, and must not introduce a
component that duplicates one already defined in
[`design-system/components/`](design-system/components/).

## 10. Figma's Role

Figma is a **supporting visual tool**, not the source of truth. Figma is used for:

- Visual exploration
- Visual review
- Communication with stakeholders
- Optional designer refinement

Claude may read Figma (via [`figma-integration/`](figma-integration/)) for visual intent,
but must resolve any disagreement between a Figma frame and the PRD/FRD, experience
library, or approved UX decisions in favor of the higher source, per Section 3 — and
surface the disagreement rather than quietly following Figma.

## 11. Designer Authority

The Product Designer owns product experience decisions. Claude:

- Treats designer-approved UX decisions ([`ux/decisions/`](ux/decisions/)) as binding, not as suggestions.
- Routes any new or changed UX pattern through designer review before it's treated as approved.
- Never lets an implementation detail (framework limitation, component constraint, timeline pressure) quietly override an approved product behavior — if a technical constraint conflicts with an approved decision, that conflict is surfaced to the designer, not resolved by Claude in code.

## 12. Developer Responsibility

Developers must be able to consume production-ready templates and configured
experiences directly from [`experience-library/templates/`](experience-library/templates/)
and [`frontend/`](frontend/) without needing Figma. This means:

- Handoff material in [`developer-handoff/`](developer-handoff/) must be self-sufficient — specs and integration guides, not "see the Figma file."
- Developers are responsible for correct integration into the target product but not for reinterpreting product/UX intent — that intent must already be unambiguous by the time it reaches them.

## 13. Business-Rule Handling

Business rules come only from [`product-knowledge/business-rules/`](product-knowledge/business-rules/),
the PRD/FRD, or explicit instruction from a human in the conversation. Claude must:

- Never infer a business rule from UI conventions, similar products, or "common sense."
- Never derive a financial calculation, permission model, or compliance behavior on its own.
- Explicitly name any business rule the task depends on that it could not find, and stop to ask rather than assume.

## 14. UX Decision Handling

Before proposing an interaction or flow, Claude must check
[`ux/decisions/`](ux/decisions/) and [`ux/patterns/`](ux/patterns/) for existing,
applicable decisions. An approved UX decision is binding for that context; it is not
reopened for debate during implementation. If no decision exists for the exact
situation, Claude may propose one, but must mark it as a proposal awaiting designer
approval, not treat it as settled.

## 15. Previous-Context Handling

Before making a design or implementation decision, Claude should check for relevant
prior work in [`agent/context/`](agent/context/), [`experience-library/`](experience-library/),
[`ux/decisions/`](ux/decisions/), and [`history/`](history/) — so past FYNXT product
decisions and patterns are reused rather than re-derived or contradicted. When Claude
makes a new decision that future tasks should be able to find, it should record a
condensed version in [`agent/context/`](agent/context/) (see the Required Agent
Workflow's LEARN step, below).

## 16. New-Pattern Handling

Claude must never automatically promote a new pattern into a standard FYNXT template.
When Claude identifies a genuine gap (Section 6) and builds something new to fill it:

1. Build it in a way that is clearly scoped to the task at hand.
2. Mark it explicitly as a **candidate pattern** — do not place it in
   [`experience-library/templates/`](experience-library/templates/) as if it were
   already standard.
3. Record it (e.g. under [`experience-library/patterns/`](experience-library/patterns/)
   or as a proposal referenced from there) with the reasoning and the gap it fills.
4. Request Product Designer approval before it is treated as reusable/standard.
5. Only after approval does it graduate, per [`governance/versioning-policy/`](governance/versioning-policy/).

## 17. QA Expectations

No implementation is complete until it has been checked against all of the following:

- PRD
- FRD
- Template rules (does it follow the template's intended configuration surface?)
- Design system (tokens, components, guidelines)
- UX decisions
- Required states (loading, empty, error, success, edge cases)
- Permissions
- Accessibility
- Responsive behavior

This maps to [`qa/design-qa/`](qa/design-qa/) (designer-run checklist) and
[`qa/automated-checks/`](qa/automated-checks/) (automated, once built). Claude should
run through this list itself before presenting work as done, and should say plainly
which items it could verify and which require human/designer confirmation (e.g. visual
accessibility contrast, real-device responsive behavior).

## 18. Versioning Expectations

Every template, pattern, and design-system artifact Claude touches follows the rules in
[`governance/versioning-policy/`](governance/versioning-policy/), recorded in
[`versioning/registry/`](versioning/registry/) and
[`versioning/changelogs/`](versioning/changelogs/). Claude must not silently modify a
published template in place in a way that breaks existing consumers — a breaking change
is a new version, not an overwrite. Deprecated artifacts move to
[`history/archive/`](history/archive/) rather than being deleted.

## 19. Security Expectations

- Never hardcode secrets, API keys, tokens, or credentials in any file.
- Never invent or weaken a permission/authorization check — permission logic comes from
  the FRD or business rules (Section 13), never from assumption.
- Treat all user input as untrusted; apply standard OWASP-aware practices (input
  validation at boundaries, output encoding, no injection-prone string building for
  queries/commands/HTML).
- Do not introduce a dependency with known vulnerabilities or from an unverified source.
- Flag anything that looks like a pre-existing security issue rather than silently
  working around it.

## 20. Coding Expectations

Generated frontend code must be:

- **Production-grade** — not a prototype or placeholder.
- **Maintainable** — clear structure, consistent with existing patterns in
  [`frontend/`](frontend/) and [`experience-library/templates/`](experience-library/templates/).
- **Typed** — use the project's existing type system fully; no silent `any`/untyped escape hatches.
- **Accessible** — semantic markup, keyboard navigation, ARIA where needed.
- **Responsive** — works across the breakpoints the design system defines.
- **Consistent** with the project's existing technology choices — do not introduce a
  new framework, state management library, or styling approach when an established one
  already covers the need.

Additionally:

- Do not introduce unnecessary dependencies.
- Do not modify unrelated files.
- Do not perform broad refactors while implementing a feature — a scoped change stays scoped.
- Prefer configuring or extending an existing template/component over writing a parallel implementation.

## Context Rule

Claude should search for relevant existing context before making decisions, but should
**not** blindly load the entire repository into every task. Use the smallest relevant
context necessary:

- Start from the specific PRD/FRD or task at hand.
- Pull in only the [`experience-library/`](experience-library/) entries,
  [`ux/decisions/`](ux/decisions/), [`design-system/`](design-system/) references, and
  [`agent/context/`](agent/context/) notes that are actually relevant to that task.
- Expand the search only when the task's own references point elsewhere or when a
  conflict (Section 3) requires checking a broader source.

---

## Required Agent Workflow

Every non-trivial task in this repository follows this sequence. Steps are not skipped;
a step with nothing to do is stated as such rather than silently omitted.

```
UNDERSTAND -> SEARCH -> SELECT -> CONFIGURE -> BUILD -> VALIDATE -> REVIEW -> HANDOFF -> LEARN
```

1. **UNDERSTAND** — Read the PRD/FRD and product context. Identify missing information and business rules that must come from a human rather than be inferred.
2. **SEARCH** — Search [`experience-library/`](experience-library/), [`ux/decisions/`](ux/decisions/), [`ux/patterns/`](ux/patterns/), and prior implementations for anything reusable, per the Template-First Principle.
3. **SELECT** — Choose the template/pattern that best fits, or explicitly conclude none exists and propose a candidate (Section 16).
4. **CONFIGURE** — Configure the selected template to the specific product/feature requirement before writing new implementation.
5. **BUILD** — Implement only what configuration cannot achieve, following Section 20's coding expectations.
6. **VALIDATE** — Run the QA checklist in Section 17 against the result.
7. **REVIEW** — Present the work for Product Designer review; do not treat designer review as optional or bypassable.
8. **HANDOFF** — Prepare developer handoff material in [`developer-handoff/`](developer-handoff/) that is self-sufficient without Figma.
9. **LEARN** — Record any new, reusable decision or pattern in the appropriate location ([`agent/context/`](agent/context/), [`ux/decisions/`](ux/decisions/), or as a candidate pattern in [`experience-library/patterns/`](experience-library/patterns/)) so future tasks benefit from it.
