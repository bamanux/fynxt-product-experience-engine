# DCF-0002 · Score Builder · developer spec

**Audience: developers.** Self-contained: no Figma needed.

| Document | What it covers |
|---|---|
| [Dev sign-off — Score Builder (DCF-0002)](https://claude.ai/code/artifact/05253aac-0836-4d3a-b35a-6bf1887f1cf9) | Six annotated screens (numbered pointers: element, component, placement, logic), calculations, validation and states, data contract, blocking items, sign-off table |
| [PRD — Score Builder (DCF-0002)](https://claude.ai/code/artifact/2b0cde75-f5a8-4de9-9fa7-ebed196a4907) | Scope, user flow, functional requirements FR-1–FR-20, business rules, permissions, open questions |
| [Score Builder — Override outcomes explained](https://claude.ai/code/artifact/e156a764-cc2a-412c-aa1f-142dd5223653) | Meaning of the six override outcomes |
| [Design case](../../../design-cases/DCF-0002-scoring-builder/case-file.md) | Source of every requirement (R, BR, D, Q) |

The three documents are private claude.ai docs; the owner shares them with the team.

## Annotated screens (copies in this folder)

Exported from Figma section `363:22029` ("DCF-0002 · Dev sign-off · annotated screens"), 2026-10-20.

| File | Screen | Pointers |
|---|---|---|
| [A1.png](screens/A1.png) | Score model list | 1–12 |
| [A2.png](screens/A2.png) | Builder shell + Details | 1–11 |
| [A3.png](screens/A3.png) | Attribute editor | 1–12 |
| [A4.png](screens/A4.png) | Override rule (category condition + Raise, rev 6 in review) | 1–12 |
| [A5.png](screens/A5.png) | Outcome bands | 1–8 |
| [A6.png](screens/A6.png) | Result › Overrides | 1–9 |

Code: Design Code Station, branch `fdi/DCF-0002-scoring-builder`, template `CAND-DCF-0002-score-builder`, data contract in `types.ts`.
