---
id: DCF-XXXX
title: <Feature / page set title>
module: <e.g. CRM / Sales>
status: DRAFT
revision: 1
owner: <Product Designer name>
requestedBy: <name>
created: YYYY-MM-DD
updated: YYYY-MM-DD
figma:
  fileKey: null
  pageNodeId: null
  approvedVersionId: null
station:
  branch: null
  pr: null
---

# DCF-XXXX — <Title>

> Design Case File. Produced by FDI (FYNXT Design Inspector) per
> [`agent/fdi/README.md`](../../agent/fdi/README.md). Reviewers: edit only **§11 Review
> Feedback** and the frontmatter `status`, then record the change in **§13 Status History**.

## 1. Summary

<2–4 sentences: what is being designed, for whom, and why.>

## 2. Inputs

| # | Input | Type | Location | Authority |
|---|---|---|---|---|
| I1 | <PRD name> | PRD | `inputs/...` or link | Binding |
| I2 | <wireframe> | Wireframe | `inputs/...` | Visual intent only |
| I3 | <comment from X> | Comment | quoted below | Non-authoritative |

## 3. Requirement Understanding

### 3.1 Users and goals
<Personas (link `product-knowledge/personas/`) and what each needs to accomplish.>

### 3.2 Functional requirements
| Req | Statement | Source |
|---|---|---|
| R1 | <requirement> | I1 §x |

### 3.3 Business rules relied on
| Rule | Statement | Source |
|---|---|---|
| BR1 | <rule> | `product-knowledge/business-rules/...` / FRD §x |

<Any rule the design needs that no source states is listed in §10, not here.>

### 3.4 Permissions
<Role → what they can see/do. Each line must cite a source. Uncited = open question.>

## 4. Library Search

| Searched | Query / scope | Result |
|---|---|---|
| Template registry | <categories, capabilities> | <IDs found, incl. placeholders> |
| Station `packages/templates` | | |
| Station `packages/ui` | | |
| FDS-101 (Figma) | | |
| `ux/decisions/`, `ux/patterns/` | | |
| `history/`, `agent/context/` | | |

## 5. Page Plan

| Page | Class | Template (id@version) | Rationale | Menu location |
|---|---|---|---|---|
| P1 <name> | REUSE / EXTEND / NEW-TEMPLATE / ONE-OFF | FYNXT-TPL-…@x.y.z | <why this class> | <Module › Section › Page> |

### 5.x P1 — <Page name>

- **Template configuration:** <columns / sections / fields / actions, as config>
- **Regions:** <header, toolbar, content, …>
- **Interactions:** <per UX decision IDs where applicable>
- **States:** default · loading · empty · error · <others> — content for each
- **Responsive:** <behaviour at each design-system breakpoint>
- **Accessibility:** <landmarks, focus order, keyboard, announcements>
- **Data needed:** <fields and source; API contract or "unknown → §10">

## 6. Component Plan

| Component | Class | Library ref | Change | Version impact | Used by |
|---|---|---|---|---|---|
| Button | EXISTING | `@fynxt/ui/Button@x` | — | none | P1 |
| <X> | VARIANT | `@fynxt/ui/X` | <new prop/variant> | MINOR | P1 |
| <Y> | NEW-COMPONENT | — | see §6.x | new 0.1.0 | P1 |

### 6.x NEW-COMPONENT — <Y>
- **Gap:** <why no existing component or variant covers it>
- **Props / variants / states:**
- **Tokens consumed:**
- **Accessibility:**
- **Figma:** <to be created in FDS-101 / work file> · **Code Connect:** required

## 7. Template Changes (EXTEND / NEW-TEMPLATE only)

<Proposed config surface change, breaking or not, version bump, consumers affected
(from `/fdi-impact`).>

## 8. Tokens

<Tokens used; any value with no token is marked OBSERVED and raised in §10.>

## 9. Conflicts

| # | Source A says | Source B says | Resolved by hierarchy? | Status |
|---|---|---|---|---|

## 10. Open Questions / Missing Information

| # | Question | Blocks | Owner | Answer |
|---|---|---|---|---|

## 11. Review Feedback

<!-- Reviewers: add one row per point. FDI fills "Resolution" on /fdi-revise. -->

| # | Rev | Reviewer | Section | Feedback | Resolution (FDI) | Closed? |
|---|---|---|---|---|---|---|

## 12. Design & Build Record

- **Figma:** <file URL> · page node <id> · approved version <id>
- **Station:** branch <name> · PR <url> · merged commit <sha>
- **QA (CLAUDE.md §17):**

| Check | Result | Verified by |
|---|---|---|
| PRD / FRD | | |
| Template rules | | |
| Design system (tokens, components) | | |
| UX decisions | | |
| States | | |
| Permissions | | |
| Accessibility | | |
| Responsive | | |

## 13. Status History

| Date | From → To | Who | Note |
|---|---|---|---|
| YYYY-MM-DD | — → DRAFT | FDI | Created from I1–In |

## 14. Revision Log

| Rev | Date | Summary of changes | Feedback items addressed |
|---|---|---|---|
| 1 | YYYY-MM-DD | Initial | — |
