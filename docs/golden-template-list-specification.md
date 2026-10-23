# Golden Template Design Specification — Table List

**Working reference:** `CAND-001` (discovery-worksheet ID, [`docs/template-discovery.md`](template-discovery.md))
**Proposed template name:** Table List (renamed from "List" — see [What Makes This a Template?](#what-makes-this-a-template) for why the qualifier matters)
**Proposed category:** `LIST` — Data Display, Collections
**Rendering model:** **table-oriented collections only** — see [Rendering Model Boundary](#rendering-model-boundary). This is the single most important change in this revision.
**Status of this document:** `DRAFT` specification, **pre-registration**, **revision 2**.
This is not yet a real Template Record. Per
[`docs/template-naming-convention.md`](template-naming-convention.md), `CAND-001` is a
temporary tracking ID and is **never** a `FYNXT-TPL-` ID. No real ID has been assigned,
no entry has been added to
[`templates/registry/template-registry.json`](../templates/registry/template-registry.json),
and no `experience-library/templates/` directory has been created. Those actions happen
only after this specification is approved — see [What Happens After Approval](#what-happens-after-approval).

**Revision note:** revision 1 of this document (superseded) defined the template
broadly enough that it effectively described the Leads screen rather than a genuinely
reusable capability, and contained an internal contradiction (the checkbox column was
called both `FIXED` and `CONFIGURABLE`). This revision incorporates the architecture
challenge findings and the Deals Kanban-board evidence gathered afterward (both in
[`docs/template-discovery.md`](template-discovery.md)) and corrects both issues. Nothing
outside this document was changed to produce this revision — no code, Figma file,
component, or registry entry has been created or modified.

**Naming note:** if approved, the real ID would be **`FYNXT-TPL-LIST-002`**, not
`FYNXT-TPL-LIST-001` — that number is already claimed by a placeholder entry in the
registry (`"List / Collection View"`, `placeholder: true`), and per
[Number Allocation](template-naming-convention.md#number-allocation) a claimed number is
never reused, even by a more fully-specified later candidate.

---

## Sources Consulted

Per the task's required reading pass, in order, current as of this revision:

1. [`CLAUDE.md`](../CLAUDE.md) — operating rules for this repository.
2. [`docs/template-specification.md`](template-specification.md) — the 30-field
   Template Record definition, status lifecycle, and versioning rules this document is
   building toward.
3. [`docs/template-naming-convention.md`](template-naming-convention.md) — ID format and
   numbering (see naming note above).
4. [`docs/template-discovery.md`](template-discovery.md) — the `CAND-001` entry (as
   updated), the Field Reference, dimensions 1–15 of the Audit Log, the Scope
   Resolution Addendum, and — new in this revision —
   [Second-Occurrence Evidence: Deals](template-discovery.md#second-occurrence-evidence-deals-in-scope-sales-module),
   which is the primary new input to this revision.
5. **Product context:** [`product-knowledge/prds/`](../product-knowledge/prds/),
   [`product-knowledge/frds/`](../product-knowledge/frds/),
   [`product-knowledge/business-rules/`](../product-knowledge/business-rules/),
   [`product-knowledge/personas/`](../product-knowledge/personas/) — **still contain
   only their scaffolding `README.md`.** Unchanged since revision 1; still a material
   gap, still surfaced throughout per [`CLAUDE.md`](../CLAUDE.md) Section 13.
6. **Existing implementation(s):** none. Design-only (Figma) evidence, now covering two
   entities: Leads (table) and Deals (Kanban board — see
   [Rendering Model Boundary](#rendering-model-boundary)). No FYNXT frontend codebase
   was available to either audit pass.
7. **Relevant FYNXT components:** [`design-system/components/`](../design-system/components/)
   still contains only its scaffolding `README.md` — no formal component library
   exists. Component evidence remains informal Figma layer names only.
8. **Design-system definitions:** [`design-system/tokens/`](../design-system/tokens/)
   and [`design-system/guidelines/`](../design-system/guidelines/) still contain only
   scaffolding.
9. **UX decisions:** [`ux/decisions/`](../ux/decisions/) and
   [`ux/patterns/`](../ux/patterns/) still contain only scaffolding.

**What this means for the rest of this document:** unchanged from revision 1 — per
[`CLAUDE.md`](../CLAUDE.md)'s Source of Truth Hierarchy (Section 3), the only source
available is priority level 6, the Figma visual representation, which is never
authoritative. Every field below says `Unknown` where the audit didn't establish
something, rather than inferring it from convention.

---

## What Makes This a Template?

**Revised definition.** Revision 1 defined this template as covering "a bounded
collection of business records — regardless of what kind of record it is." The Deals
evidence disproves the "regardless of what kind" framing at the *rendering* level: Deals'
actual collection experience is a Kanban/pipeline board, not a table, and a template
built to the revision-1 definition would have had to either silently assume Deals uses
a table (wrong) or quietly expand to cover Kanban too (an undiscussed, unapproved scope
expansion). Neither is acceptable per
[`CLAUDE.md`](../CLAUDE.md) Section 5. This revision narrows the definition instead.

> **The reusable product experience capability this template captures is: letting a
> user browse, narrow by keyword, scan, and optionally select and act on a bounded
> collection of business records that are presented as a table — rows of scannable
> records under configurable columns — regardless of what kind of record it is.**

The qualifier **"presented as a table"** is now load-bearing, not incidental. What makes
this a *template* rather than a description of the Leads screen is still that the
mechanics are independent of what the records represent (nothing depends on the record
being a "Lead" — see `CAND-003` for where Lead-specific form logic actually lives). But
it is **not** independent of *how the collection is rendered*. FYNXT has at least two
different rendering models for "a collection of records" (table, evidenced by Leads;
Kanban/pipeline board, evidenced by Deals) and this template claims only one of them.

**Do not read this template as "any collection of records."** That phrase describes a
product *need*, not a template *boundary*. This template is the table-oriented answer
to that need. A Kanban/pipeline-oriented answer may or may not become a separate
template — see [Rendering Model Boundary](#rendering-model-boundary) — but it is not
something this document decides, and it is not something a configuration flag on this
template should switch between, per the explicit direction not to auto-expand List's
scope to cover Kanban.

---

## Rendering Model Boundary

**This section is new in this revision**, added directly in response to the Deals
evidence in
[`docs/template-discovery.md`](template-discovery.md#second-occurrence-evidence-deals-in-scope-sales-module).

The audit found two different collection-rendering models within the same, single
approved scope (the Sales Module Figma file):

| Entity | Rendering model | Evidence |
|---|---|---|
| Leads | **Table** — rows under columns, checkbox selection, trailing overflow-action column | `CAND-001`, original audit |
| Deals | **Kanban / pipeline board** — cards grouped into stage columns, no checkbox selection found, per-card and per-column overflow menus | `docs/template-discovery.md`, Second-Occurrence Evidence: Deals |

The Deals evidence demonstrates, directly (not by inference), that within FYNXT:

- **Table is not the universal collection rendering.** Deals' actual rendering is a
  Kanban board.
- **Selection is not universal.** No checkbox or equivalent selection control was found
  on any Deals card in either frame inspected.
- **Bulk actions are not universal.** No bulk-action bar was found anywhere in the
  Deals frames.
- **Insights are not universal in the same presentation.** Deals shows a collapsible
  "Insights" link, not the inline metric-card strip Leads uses — the concept recurs,
  the presentation doesn't.
- **Pagination is not universal.** No page control was found in either Deals frame.
- **Action presentation varies by collection type.** Leads uses a 6-item overflow menu
  per table row (`View Details / Edit Lead / Send Email / Call / Convert to Contact /
  Delete`); Deals uses a 3-item overflow menu per card (`Edit Deal / Duplicate Deal /
  Delete Deal`, no `View`) **plus** a second, separate overflow menu per stage column
  (`Edit / Delete`, stage-level) that has no equivalent in Leads at all.

**Therefore, `FYNXT-TPL-LIST-002` is intentionally scoped to the table-oriented
rendering model.** It does not attempt to also describe Kanban rendering, and it should
not be configured, extended, or silently interpreted to cover it.

**This document does not decide whether Kanban becomes a separate template.** A view
switcher (list/board icons) was observed in the Deals frame's header, implying an
alternate table-oriented view of Deals may exist — but no such frame was found in
either of the two Deals frames inspected, so that cannot be treated as confirmed either.
Per the explicit instruction governing this revision:

> **Kanban/pipeline rendering is outside the current scope of `FYNXT-TPL-LIST-002` and
> requires independent template discovery before being incorporated into the
> Experience Library.**

---

## Classification Framework

Unchanged in definition from revision 1 — five categories, applied consistently below.
This revision adds one clarification: several elements previously described as if they
were part of *this* template's own fixed behavior are, in this revision, recognized as
**separate reusable patterns** this template *composes* rather than owns. A pattern's
own internal FIXED/CONFIGURABLE split is that pattern's concern, not this document's —
see [Pattern Boundary Architecture](#pattern-boundary-architecture).

| Category | Definition |
|---|---|
| **FIXED TEMPLATE BEHAVIOUR** | Never varies across any configured instance of *this* template. Changing it produces a different template, or a breaking version of this one. |
| **CONFIGURABLE BEHAVIOUR** | Exposed as a named parameter in the Configuration Schema (Section 11) — including *whether a composed pattern is enabled at all*. |
| **PRODUCT-SPECIFIC CONTENT** | The actual data, labels, copy, and values flowing through configured slots for a given deployment. |
| **BUSINESS-RULE DEPENDENCIES** | Behavior the template depends on that must come from an FRD, a business-rules entry, or explicit human confirmation — never invented. |
| **DEVELOPER INTEGRATION REQUIREMENTS** | What a developer must supply — API adapters, data fetching, permission-check wiring, analytics wiring. |
| *(Out of category)* **Separate Reusable Pattern** | Not classified within this template's own record at all. This template references it by name and by whether it's enabled; the pattern's internal behavior belongs to that pattern's own future specification. |

---

## Pattern Boundary Architecture

**This section is new in this revision.** Conceptual architecture only — nothing below
creates a file, a registry entry, or a pattern candidate. It exists to make explicit
that this template does not own every behavior a designer might associate with "a list
screen."

```text
FYNXT Product Experience
│
├── Templates
│   ├── Table List              ← this document (FYNXT-TPL-LIST-002, proposed)
│   ├── Record Detail           ← CAND-002
│   ├── Create/Edit Form        ← CAND-003
│   ├── Dashboard               ← CAND-006
│   └── Future Kanban/Board     ← the Deals finding; explicitly NOT decided by this document
│
└── Reusable Patterns
    ├── Search
    ├── Quick Filters
    ├── Advanced Filters
    ├── Manage Columns
    ├── Row Actions               (now confirmed to recur at 3 structural levels: table row, card, column header)
    ├── Bulk Actions
    ├── Pagination
    ├── Metrics                   (two different presentations observed — strip vs. collapsible — not yet unified)
    └── Saved Views                (implied only; not yet specified at all)
```

None of the items under "Reusable Patterns" are registered, specified, or created by
this document. The Table List template **composes** them, by name, through
configuration (Section 11) — it does not define their internal interaction, visual
design, or states. That happens in each pattern's own future specification, once
proposed and approved independently, per
[`CLAUDE.md`](../CLAUDE.md) Section 16.

---

## Architectural Principle

**This section is new in this revision.** Proposed as a durable principle for this
system — **not adopted here**, since only this document is in scope for this revision;
adopting it into [`CLAUDE.md`](../CLAUDE.md) itself would be a separate, explicit
change requiring its own approval:

> A template owns the reusable product experience structure and guarantees; patterns
> own reusable interaction mechanisms; configuration composes approved capabilities;
> product context supplies entity meaning; business rules supply policy; developers
> supply integration.

Every section from here on is written to be consistent with this principle, whether or
not it is formally adopted elsewhere.

---

## 1. Template Purpose

To give FYNXT products building a **table-oriented** collection screen a proven,
consistent way to present records for browsing, narrowing, and (optionally) acting on
— so that a new "table of X" screen does not require re-solving column management,
filtering composition, and (where applicable) selection/bulk-action mechanics from
scratch. This purpose is explicitly narrower than "any list screen" — Kanban-rendered
collections are out of scope (see [Rendering Model Boundary](#rendering-model-boundary)).

**Source:** generalized from `CAND-001`'s `Common Structure`/`Common Behaviour`, now
qualified by the Deals evidence. No PRD/FRD exists yet to anchor this to an approved
business objective — see Section 29.

## 2. User Problem

Unchanged in substance from revision 1: a user responsible for a set of records too
large to scan unfiltered needs to narrow it, scan a summary of each record, and
(where the product needs it) act on one or many without opening each individually.

**BUSINESS-RULE DEPENDENCY:** *why* a given user needs this, and what "relevant right
now" means for a specific entity, is not documented anywhere in this repository.

## 3. Applicable Personas

`Unknown` — unchanged from revision 1. No persona entry exists in
[`product-knowledge/personas/`](../product-knowledge/personas/). **Required before
promotion past `DRAFT`.**

## 4. Applicable Modules

**Confirmed (table-oriented):** Sales Module → Leads.
**Investigated but not confirmed as table-oriented:** Sales Module → Deals — its
collection experience was inspected and found to be Kanban-rendered, not table-rendered
(see [Rendering Model Boundary](#rendering-model-boundary)). Deals is therefore **not**
a confirmed supported module for *this* template, even though it is now a
well-evidenced FYNXT module overall. Whether a table-oriented view of Deals exists
elsewhere (implied by a view-switcher icon, not confirmed) is an open question — see
Section 29.
**Out of scope:** any module outside the Sales Module Figma file, per the
[Scope Resolution Addendum](template-discovery.md#scope-resolution-addendum-continued-audit).

## 5. Use Cases

- The product needs a **table-oriented** presentation of a bounded collection of
  same-type records.
- Users need to narrow the set by keyword search at minimum, and optionally by
  additional filter patterns (Section 11).
- The set of visible columns is expected to vary per user or per view.
- Optionally: users need row-level and/or bulk actions without opening each record.

## 6. Non-Use Cases

- **A Kanban/pipeline-grouped view of a collection** — this is explicitly outside this
  template's current scope. See [Rendering Model Boundary](#rendering-model-boundary).
  Do not configure this template to emulate stage columns.
- **Viewing a single record in depth** — that's `CAND-002` (Record Detail); this
  template's optional `View`-type row action is an entry point to it, not a
  replacement.
- **Capturing or editing a record's full field set** — that's `CAND-003`. Whether
  `Edit`-type row actions hand off to that template is unconfirmed (Section 29).
- **A small, fixed set of items with no need for search/filter/pagination.**
- **A multi-step process** — that's `CAND-004`.

## 7. Information Architecture

*(Distinguishes invariant structural zones from optional composable zones — see the
[Region Structure](#8-ui-structure--region-structure) below for the full model.)*

The template's zones, top to bottom when present, are: an invariant header and
narrowing/collection core, with several zones that are individually **optional** and
**omittable** but — when present — appear in the canonical order below. Configuration
may turn optional zones on or off; it may not reorder them, and it may not introduce a
zone not listed here.

## 8. UI Structure / Region Structure

**Revised in this section — this replaces revision 1's immutable region hierarchy,
which incorrectly marked the Leads screen's exact zone set (including a mandatory
Insights strip and a mandatory checkbox column) as FIXED.**

```text
Table List Experience
├── Header                        [INVARIANT ZONE]
├── Optional View Navigation      [OPTIONAL ZONE]   (e.g. view tabs)
├── Optional Insights             [OPTIONAL ZONE]   (presentation deferred to the Metrics pattern)
├── Narrowing / Search            [INVARIANT ZONE]  (search itself fixed; Quick/Advanced Filters, Manage Columns are optional composed patterns within this zone)
├── Collection / Table            [INVARIANT ZONE]  (selection and row-action presentation are configurable within it)
└── Pagination (when applicable)  [OPTIONAL ZONE]   (deferred to the Pagination pattern)
```

**Invariant structural zones (FIXED TEMPLATE BEHAVIOUR):**
- A **Header** zone exists (entity name is **PRODUCT-SPECIFIC CONTENT**).
- A **Narrowing/Search** zone exists, and keyword search within it is always present.
- A **Collection/Table** zone exists and renders records as rows under columns.

**Optional composable zones (CONFIGURABLE — presence only, not reordering):**
- **View Navigation** (e.g. tabs) — off by default; when on, its position is fixed
  directly under the Header.
- **Insights** — off by default; when on, its position is fixed directly under View
  Navigation (or Header, if View Navigation is off). Its internal presentation (inline
  cards vs. a collapsible summary — both observed, on Leads and Deals respectively) is
  a Metrics-pattern concern, not decided here.
- **Pagination** — on by default for a table zone, since a table is the primary case
  where paging is expected; may be turned off for a bounded, small collection. Its
  internal mechanics are a Pagination-pattern concern.

**What configuration may never do:** rearrange zones relative to each other, introduce
a zone not in the diagram above, or move Pagination above the Collection/Table zone.
This is the corrected reading of revision 1's "region hierarchy is FIXED" claim — the
*set of possible zones and their relative order* is fixed; the *presence* of the
optional ones is not.

**Within the Collection/Table zone specifically:**
- Selection (a leading checkbox column) is **CONFIGURABLE, default off** — see
  [Section 9](#9-interaction-model) for the resolved contradiction from revision 1.
- Row-action presentation (an overflow menu vs. inline icons) is deferred to the Row
  Actions pattern; this template only configures *which actions*, from an approved
  registry, not *how* they're presented.
- Column set and order are **CONFIGURABLE** (required — at least one column).

## 9. Interaction Model

**Revised — several items previously marked FIXED here are now explicitly modeled as
either configurable or as belonging to a separate pattern this template composes.**

- **Selection is optional configuration, default off.** *(Corrects revision 1's
  contradiction — see [Section 3 of the discovery-worksheet update](#what-changed).)*
  - If `selection.enabled = true`: a checkbox column renders, and
    **selection-gates-bulk-action-visibility is a FIXED relationship** — this part is
    genuinely invariant logic, not a design choice per instance.
  - If `selection.enabled = false`: no selection UI renders, and no bulk-action UI
    renders, regardless of whether `bulkActions` is configured. A `bulkActions` list
    configured without `selection.enabled = true` is a configuration error, not a
    valid instance.
- **Quick Filters, Advanced Filters, and Manage Columns are separate reusable
  patterns** (see [Pattern Boundary Architecture](#pattern-boundary-architecture)),
  each independently enabled/disabled. This template does not own their internal
  interaction (the AND/OR condition builder, the searchable checklist, etc.) — it only
  configures whether each is available and, where applicable, which columns each may
  operate on.
- **Row Actions is a separate reusable pattern**, now confirmed (via the Deals
  evidence) to recur at more than one structural level — a table row (Leads), a card
  (Deals), and a column/stage header (Deals, no Leads equivalent). This template
  configures *which actions* populate its own row-level instance of that pattern, from
  an approved registry — it does not define how the pattern presents itself.
- **Bulk Actions is a separate reusable pattern**, composed only when selection is
  enabled.
- **Pagination is separate reusable infrastructure/pattern**, composed by default
  within the Collection/Table zone (Section 8), configurable off.
- **Column sort** remains `Unknown` in its exact interaction — deferred to whatever the
  Table/Data Grid pattern (Section 10) eventually specifies; this template only
  configures which columns declare themselves sortable.

**Source for all of the above:** `CAND-001` `Common Behaviour` and
[Section B: Candidate Patterns](template-discovery.md#b-candidate-patterns) in
`docs/template-discovery.md`, qualified throughout by the Deals evidence.

## 10. Component Dependencies

*(Still no formal design-system component catalog exists. This revision adds an
explicit "Owning pattern" column so it's clear this template does not claim to define
these components' behavior.)*

| Component (Figma layer name) | Role | Owning pattern | Status in this repository |
|---|---|---|---|
| `DataTableWithFilters` | The Collection/Table zone's core rendering | Table/Data Grid pattern | Name only |
| `AdvancedFiltersModal` | Compound filter builder | Advanced Filters pattern | Name only |
| `ManageColumnsModal` | Column visibility manager | Manage Columns pattern | Name only |
| Status/type tag badge | Renders a record's status/tag | Product content, rendered via a generic tag component | Name only |
| Metric/insight card | Renders one summary metric | Metrics pattern | Name only |
| Avatar/owner chip | Renders an associated-person indicator | Shared UI primitive, not List-owned | Name only |
| Pagination control | Page navigation | Pagination pattern | Name only |
| Search input | Keyword search | Part of this template's invariant Narrowing zone | Name only |
| Overflow action menu | Row/card/column-level `⋮` actions | Row Actions pattern | Name only |

**DEVELOPER INTEGRATION REQUIREMENT:** none of these components have a formal spec or
implementation in this repository. Building this template requires either building
these from scratch (coordinating with the Design System owner so shared ones land in
`design-system/components/`, per [`CLAUDE.md`](../CLAUDE.md) Section 9) or confirming
equivalents in the live FYNXT codebase (unverified — no codebase access in either
audit).

## 11. Configuration Schema

**`PROPOSED / PRE-EXPERIMENTAL` — not a final schema.** This is a conceptual
composition contract, not a JSON Schema or TypeScript definition, per the explicit
instruction governing this revision not to over-specify an unvalidated architecture.
It replaces revision 1's flatter schema with an explicit enable/disable shape so that
"every List has every capability" is no longer assumed anywhere.

```text
entity                    — PRODUCT-SPECIFIC CONTENT (binds this instance to an entity; required)

columns[]                 — CONFIGURATION (required, at least one)

search                    — always present (invariant); `searchableColumns` configurable

sorting                   — CONFIGURATION: enabled?, defaultSort?  (interaction detail deferred to the Table/Data Grid pattern)

pagination                — CONFIGURATION: enabled? (default true), pageSize
                             (mechanics deferred to the Pagination pattern)

selection                 — CONFIGURATION: enabled? (default FALSE)
                             — see Section 9 for the fixed selection→bulk-action relationship
                             when enabled

bulkActions[]              — CONFIGURATION: approved-registry action keys;
                             valid ONLY when selection.enabled = true

rowActions[]                — CONFIGURATION: approved-registry action keys (required, at least one);
                             presentation deferred to the Row Actions pattern

viewTabs                  — CONFIGURATION: enabled? (default false), tabs[]
                             (this is the "Optional View Navigation" zone)

insights                  — CONFIGURATION: enabled? (default false), metrics[]
                             (presentation deferred to the Metrics pattern)

quickFilters               — CONFIGURATION: enabled? (default false), groups[]
                             (deferred to the Quick Filters pattern)

advancedFilters            — CONFIGURATION: enabled? (default false), queryableColumns[]
                             (deferred to the Advanced Filters pattern)

manageColumns               — CONFIGURATION: enabled? (default false), manageableColumns[]
                             (deferred to the Manage Columns pattern)

savedViews                 — CONFIGURATION: enabled? (default false)
                             (deferred to a not-yet-specified Saved Views pattern — see Section 29)
```

**Every `enabled` flag above defaults to conservative/off except `pagination` and
`search`**, which default on because they are the closest things to genuinely
near-universal for a table-oriented collection. This is a deliberate change from
revision 1, which implicitly assumed most capabilities were present unless told
otherwise. **This schema is not validated by comparison against a second
table-rendered instance** (the only second instance found, Deals, doesn't render as a
table at all) — it remains a first draft pending that evidence.

## 12. Data Schema

**Revised to remove Leads-specific vocabulary, per explicit instruction.** The template
must not attempt to understand any entity's business data — this stays deliberately
minimal:

```text
ListRecord {
  id: string
  [columnKey: string]: unknown   // one entry per configured `columns[].key`
  tag?: { label: string; tone?: string }   // fully generic — no hardcoded tone vocabulary
  owner?: { name: string }                  // fully generic "who this record is associated with"
}

ListPage {
  records: ListRecord[]
  totalCount: number
  page: number
  pageSize: number
}
```

**Removed from revision 1, and why:**
- The `tone: "hot" | "warm" | "cold" | string` union is gone — those are Leads-specific
  business values, not a template-generic enum. `tone` is now a plain optional
  `string`; what values are valid, and what they mean, is a **BUSINESS-RULE
  DEPENDENCY**, supplied per configured instance, never assumed by the template.
  Leads-specific literals gone: `hot`, `warm`, `cold`.
- No field is named `salesPerson` or similar — the generic `owner` field already
  covered this correctly in revision 1 and is unchanged.
- No Lead status vocabulary (`New Lead`, `Contacted`, `Qualified`, etc.) appears
  anywhere in this contract — it was never in the generic schema, only in the
  Leads-specific illustrative example (Section 27), which remains clearly marked
  illustrative.

**BUSINESS-RULE DEPENDENCY:** the meaning and exhaustive list of any `tag`/`tone` value
used by a given configured instance comes from an FRD or
[`product-knowledge/business-rules/`](../product-knowledge/business-rules/) entry —
never from this template.

## 13. API Requirements

`Unknown` — unchanged from revision 1, still not assessable from a design-only source.
The template defines an extension point (a data-adapter contract matching Section 12's
shape); it does not define the actual endpoint, request/response format, or
error-response convention. **DEVELOPER INTEGRATION REQUIREMENT**, as before.

## 14. State Model

**Revised to separate responsibility explicitly, per instruction, and to correctly
scope the new Deals empty-state evidence.**

Per [`docs/template-specification.md`](template-specification.md) Field 14, a complete
template record documents `loading`, `empty`, `error`, `partial-error`, `success`,
`disabled`, and `read-only`. Responsibility split:

| Responsibility | What it covers |
|---|---|
| **Template responsibility** | The template's implementation must be *capable* of rendering all 7 baseline states — i.e. expose a slot/hook for each — regardless of whether a given configured instance exercises every one. |
| **Product configuration** | Which states are realistically reachable for a given instance, and the entity-specific copy/content shown within each (e.g. empty-state message text). |
| **Developer responsibility** | Wiring the actual data/loading/error integration and runtime behavior to the template's state slots. |

**Confirmed by audit, updated:**

| State | Confirmed? |
|---|---|
| `success` (populated) | **Yes** — Leads (table, 7 rows) and Deals (Kanban, several cards) |
| `empty` | **Yes, evidence exists** — but only observed on the Deals **Kanban board** ("No deals yet — Drag deals here or add new", per column). **This does not confirm what a table-oriented empty state looks like.** Treat this as proof an empty-state pattern exists somewhere in the collection-experience family, not as this template's own empty-state visual treatment — that remains `Unknown` for a table rendering specifically. |
| `loading` | **No** — not found in either entity's frames. |
| `error` | **No** — not found. |
| `partial-error` | **No** — not found. |
| `disabled` | **No** — not found. |
| `read-only` | **No** — not found. |

This template **cannot reach `VALIDATED`** with only `success` confirmed for its own
(table) rendering and only indirect, cross-rendering evidence for `empty` (per the QA
checklist in [`CLAUDE.md`](../CLAUDE.md) Section 17).

## 15. Permission Model

`Unknown` — unchanged in substance, restated against the explicit boundary from the
instructions governing this revision. The template defines a **permission-check
extension point** (Section 25) with a fixed *shape* (it is always called before
rendering a gated action or state). The template must never itself decide:

- who can delete,
- who can export,
- what a status value means,
- which actions a given role may perform, or
- how a business entity behaves.

All of the above are **BUSINESS-RULE DEPENDENCIES**, supplied externally (an FRD, a
business-rules entry, or explicit human confirmation) — none currently exist in this
repository.

## 16. Responsive Behaviour

`Unknown` — unchanged from revision 1. No breakpoint evidence exists for either entity;
[`design-system/tokens/`](../design-system/tokens/) remains empty.

## 17. Accessibility Requirements

*(FIXED TEMPLATE BEHAVIOUR — unchanged, and correctly so; this is the one item from
revision 1's "fixed" list that survived the architecture challenge without
qualification.)*

WCAG 2.1 AA baseline, per [`docs/template-specification.md`](template-specification.md)
Field 16. Beyond the baseline commitment itself, keyboard navigation, ARIA roles, and
focus management remain entirely `Unknown` — not assessable from static Figma frames.

## 18. Error Handling

`Unknown` — see Section 14. No error messaging, retry pattern, or failure-mode content
was found for either entity.

## 19. Validation

Not part of this template's own surface. Where validation would apply (e.g. inside the
Advanced Filters pattern's condition builder), it is that pattern's concern, not this
template's — deferred, not `Unknown` by omission.

## 20. Loading Behaviour

`Unknown` — no loading state found for either entity. See Section 14.

## 21. Empty Behaviour

**Partially evidenced, with an important caveat — see Section 14.** An empty state is
now confirmed to exist in the collection-experience family (via Deals' Kanban board),
but its exact visual treatment (a `+` icon and "Drag X here or add new" copy, inside a
Kanban column) is specific to that rendering and must not be assumed to be this
template's own table-oriented empty-state design. This template's own empty-state
treatment remains `Unknown` and must be defined, not copied from the Deals evidence
uncritically.

## 22. Read-Only Behaviour

`Unknown` — unchanged. No read-only rendering found for either entity, and no
permission model exists to indicate when it would apply.

## 23. Analytics/Event Requirements (if applicable)

`Unknown` / not assessable from a design-only source — unchanged from revision 1.

## 24. Frontend Architecture

Unchanged from revision 1 — cannot be specified concretely; no technology baseline
exists anywhere in this repository yet. **DEVELOPER INTEGRATION REQUIREMENT**: the
first implementation, coordinated with the Design System owner, establishes the
baseline subsequent templates should follow.

## 25. Developer Integration Model

What a developer must supply (**DEVELOPER INTEGRATION REQUIREMENTS**), restated against
the explicit extension-point boundary from this revision's governing instructions. The
template defines extension points for:

- a **data adapter** (Section 12's shape),
- **permission checks** (Section 15's hook, called before any gated action/state
  renders),
- **business rules** (Section 12's `tag`/`tone` meaning, Section 15's actual rules),
  and
- an **approved action registry** (Section 11's `rowActions`/`bulkActions` keys are
  drawn from this, never invented).

The template must not itself decide any of the "must not decide" list in Section 15.
Beyond the extension points, a developer must also implement: the missing states
(Section 14), responsive behavior (Section 16), accessibility behavior (Section 17),
and analytics/event wiring (Section 23) — none of which this specification can define
from available sources.

## 26. Figma Representation

**Primary reference (this template's own rendering):** Figma file "Sales Module"
(`https://www.figma.com/design/WvrYlnOxnKgkRbT7nQgsPV/Sales-Module`), page "Leads",
frame `FYNXT Cloud UI Design (CRM)` (1440×1024).

**Secondary reference (boundary-testing evidence, not this template's own
representation):** the same file, page "Deals", the two `FYNXT Cloud UI Design (CRM)`
Kanban-board frames — cited only to establish the
[Rendering Model Boundary](#rendering-model-boundary), not as an example of this
template.

Per [`CLAUDE.md`](../CLAUDE.md) Section 10, neither reference is authoritative, and
this template is not blocked from progressing because of anything either does or
doesn't contain.

## 27. Example Configurations

**`PROPOSED / PRE-EXPERIMENTAL`**, same caveat as Section 11. No real configured
instance exists yet. The following illustrates Section 11's revised schema against the
one real table-rendered instance this template is drawn from:

```jsonc
// ILLUSTRATIVE ONLY — not a built or approved configuration
{
  "entity": "Lead",
  "columns": [
    { "key": "name", "label": "Name" },
    { "key": "contactNumber", "label": "Contact Number" },
    { "key": "email", "label": "Email" },
    { "key": "type", "label": "Type" },
    { "key": "status", "label": "Status" },
    { "key": "executedOn", "label": "Executed On", "sortable": true }
  ],
  "search": true,
  "pagination": { "enabled": true },
  "selection": { "enabled": true },
  "bulkActions": ["archive", "exportData"],
  "rowActions": ["viewDetails", "editLead", "sendEmail", "call", "convertToContact", "delete"],
  "viewTabs": { "enabled": true, "tabs": ["allLeads", "myLeads", "recentActivity"] },
  "insights": { "enabled": true, "metrics": ["totalLeads", "newThisMonth", "qualified", "conversionRate"] },
  "quickFilters": { "enabled": true, "groups": ["source", "status", "type", "owner", "label", "createdOn"] },
  "advancedFilters": { "enabled": true },
  "manageColumns": { "enabled": true }
}
```

**No Deals (or any other) example is given.** A configuration for a Kanban-rendered
collection would not be a valid instance of this template — see
[Rendering Model Boundary](#rendering-model-boundary).

## 28. Known Limitations

- Only `success` is confirmed for this template's own (table) rendering; `empty` is
  confirmed only indirectly, via a different rendering (Section 14).
- No API contract, permission model, responsive behavior, or accessibility behavior
  exists.
- The Configuration Schema (Section 11) has never been validated against a second
  table-rendered instance — Deals, the only other entity inspected, does not render as
  a table.
- The source Leads frame has a known, unresolved inconsistency: the Insights strip
  shows "32% Conversion Rate" twice (`docs/template-discovery.md` dimension 14).
- Sort interaction remains implied, not confirmed, for either entity.
- Whether `Edit`/`Add` row actions hand off to `CAND-003`'s form is unconfirmed.
- The Metrics pattern has two different observed presentations (inline strip vs.
  collapsible link) that have not been reconciled into one pattern spec.
- Row Actions, as a pattern, now needs to account for three structural host contexts
  (table row, card, column header) rather than one.

## 29. Open Questions

Carried forward from revision 1 where still open, plus new questions from the Deals
evidence:

**Carried forward:**
1. What do the missing `loading`/`error` states look like, or do they not exist yet?
2. What is the actual permission model behind `Delete`, `Export Data`, and other
   actions?
3. Is the duplicated "32% Conversion Rate" metric a design error or two real metrics?
4. Does `Edit Lead` reuse `CAND-003`'s form?
5. What is the status/tag vocabulary's exhaustive list, and who owns defining it?
6. No persona is confirmed (Section 3).
7. No PRD/FRD exists to anchor Section 1's purpose statement.

**New, from the Deals evidence and the architecture challenge:**
8. Does a true Deals **table** view exist elsewhere (implied by the view-switcher icon,
   not confirmed)? This is the single most valuable next data point for validating
   this template's Configuration Schema.
9. Should Kanban eventually become `FYNXT-TPL-BOARD-001`, another category, or
   something else entirely? Not decided here.
10. What is the correct generic contract for a Table/Data Grid pattern, independent of
    this template?
11. Which of the patterns in
    [Pattern Boundary Architecture](#pattern-boundary-architecture) should become
    independently registered Experience Library assets, and in what order?
12. Does Saved Views deserve its own template/pattern specification? It's currently
    only implied by a single "Save to view" button label.
13. What is the approved action registry this template's `rowActions`/`bulkActions`
    must draw from? None exists yet.
14. What are FYNXT's actual frontend technology conventions, once a real implementation
    environment is connected? (Section 24.)

None of these are resolved by this revision — they are recorded, not guessed at.

## 30. Future Extension Points

Speculative, non-binding — none of these are commitments, and none expand this
template's current scope:

- A Kanban/Board template, sharing the Row Actions, Metrics, and filter patterns with
  this one — explicitly not decided here (see
  [Rendering Model Boundary](#rendering-model-boundary)).
- A Saved Views pattern, spanning View Navigation, Quick Filters, and Manage Columns.
- Column reordering/resizing beyond visibility toggling.

---

## Classification Summary

**Revised to remove the checkbox contradiction and to route several rows to "Separate
Reusable Pattern" instead of FIXED.**

| Element | Category |
|---|---|
| A Header, Narrowing/Search, and Collection/Table zone exist, in that relative order | FIXED TEMPLATE BEHAVIOUR |
| Keyword search itself | FIXED TEMPLATE BEHAVIOUR |
| Selection→bulk-action-gating, *when selection is enabled* | FIXED TEMPLATE BEHAVIOUR (conditional) |
| Accessibility baseline (WCAG 2.1 AA) | FIXED TEMPLATE BEHAVIOUR |
| The 7-baseline-state contract must be supportable | FIXED TEMPLATE BEHAVIOUR |
| Extension-point contracts (data adapter, permission check) | FIXED TEMPLATE BEHAVIOUR |
| Selection presence, bulk-action list, row-action list, columns, sorting, pagination presence, page size, view-tabs presence, insights presence, which optional patterns are enabled | CONFIGURABLE BEHAVIOUR |
| Column labels, tab labels, metric values/labels, entity name | PRODUCT-SPECIFIC CONTENT |
| Tag/tone vocabulary and meaning, permission logic, validation rules inside Advanced Filters | BUSINESS-RULE DEPENDENCIES |
| API adapter, missing-states implementation, responsive/accessibility implementation, analytics wiring, frontend architecture baseline | DEVELOPER INTEGRATION REQUIREMENTS |
| Quick Filters, Advanced Filters, Manage Columns, Row Actions, Bulk Actions, Pagination, Metrics, Saved Views (internal behavior of each) | **SEPARATE REUSABLE PATTERN** — not classified here at all |

---

## What Should Claude Never Change When Configuring This Template?

- The table-oriented rendering boundary (this template is not Kanban, and must not be
  configured to imitate it).
- The set and relative order of structural zones (Section 8) — no reordering, no new
  zones.
- The template's core accessibility commitment (WCAG 2.1 AA).
- The 7-baseline-state contract.
- Extension-point contracts (data adapter shape, permission-check shape).
- The template's `ID`, `STATUS`, or `VERSION` — Claude never self-promotes (per
  [`CLAUDE.md`](../CLAUDE.md) Section 5 and
  [`docs/template-specification.md`](template-specification.md) Template Statuses).

## What Can Claude Safely Configure?

Only from approved configuration options and approved business/product sources:

- `columns`, `sorting`, `pagination`, `selection`, `rowActions`, `bulkActions`,
  `viewTabs`, `insights`, and which optional patterns (`quickFilters`,
  `advancedFilters`, `manageColumns`, `savedViews`) are enabled (Section 11).
- Mapping a new entity's fields onto the generic `ListRecord` shape (Section 12).

**Claude must NOT invent:**
- new actions beyond an approved registry,
- permissions or permission logic,
- business rules (including tag/tone vocabulary or its meaning),
- entity semantics,
- new interaction patterns, or
- new reusable patterns — proposing one follows
  [`CLAUDE.md`](../CLAUDE.md) Section 16, it is never done silently inside a
  configuration.

## What Requires Product Designer Approval?

- Promotion of this specification past `DRAFT`.
- Any change to the structural zone set/order, the accessibility commitment, or the
  table-oriented rendering boundary.
- The decision (not made here) about whether Kanban becomes a separate template.
- Resolving the duplicated "32% Conversion Rate" inconsistency.
- Confirming applicable personas and the non-use-case boundaries with `CAND-002`/`CAND-003`.
- Approving the Configuration Schema (Section 11) as a real contract.
- Approving the action registry Claude configures `rowActions`/`bulkActions` from.
- Deciding which patterns in [Pattern Boundary Architecture](#pattern-boundary-architecture)
  get proposed as independent Experience Library candidates, and in what order.

## What Requires Developer Approval?

- The frontend architecture baseline (Section 24).
- The API contract and data adapter (Sections 12–13) once a real backend exists.
- Feasibility of the Configuration Schema (e.g. fully dynamic `columns`).
- Frontend dependency versions before any product consumes this template.
- Implementation of the missing states, responsive behavior, and accessibility
  behavior.

---

## Self-Check

Verification pass performed before finalizing this revision:

| Check | Result |
|---|---|
| Is List still accidentally defined as "any collection experience"? | **No** — explicitly narrowed to table-oriented in [What Makes This a Template?](#what-makes-this-a-template) |
| Is table clearly the current rendering boundary? | **Yes** — [Rendering Model Boundary](#rendering-model-boundary) |
| Are selection and bulk actions optional? | **Yes** — Sections 9, 11 |
| Are insights optional? | **Yes** — Sections 8, 11 |
| Are view tabs optional? | **Yes** — Sections 8, 11 |
| Are filters composable? | **Yes** — Quick/Advanced Filters are separate, independently-enabled patterns |
| Are Row Actions a separate pattern? | **Yes** — Section 9, Pattern Boundary Architecture |
| Are Advanced Filters a separate pattern? | **Yes** — same |
| Is Manage Columns a separate pattern? | **Yes** — same |
| Is Pagination treated as reusable infrastructure/pattern? | **Yes** — Sections 8, 9 |
| Is Kanban explicitly outside current List scope? | **Yes** — Rendering Model Boundary, stated verbatim |
| Are Leads-specific assumptions removed from the generic contract? | **Yes** — Section 12 (`hot`/`warm`/`cold` removed) |
| Is `FYNXT-TPL-LIST-002` still DRAFT / pre-registration? | **Yes** — header block |
| Has no registry entry been created? | **Confirmed** — not touched this revision |
| Has no code been created? | **Confirmed** |
| Has no Figma implementation been created? | **Confirmed** |

---

## What Happens After Approval

This document is **not** a Template Record. If approved, the next steps (not performed
by this document) are, per [`templates/registry/README.md`](../templates/registry/README.md)
and [`docs/template-naming-convention.md`](template-naming-convention.md):

1. Assign the real ID `FYNXT-TPL-LIST-002`.
2. Author `experience-library/templates/FYNXT-TPL-LIST-002/template.md` against the
   30-field Template Record in [`docs/template-specification.md`](template-specification.md),
   using this document as its primary source.
3. Add a matching entry to
   [`templates/registry/template-registry.json`](../templates/registry/template-registry.json)
   with `"status": "DRAFT"`.
4. Update `CAND-001`'s entry in [`docs/template-discovery.md`](template-discovery.md) to
   reference the real ID and record the promotion in its Change History.
5. Decide — separately, with evidence — whether to open a new discovery-worksheet
   candidate for a Kanban/Board template, and whether/when to propose any of the
   patterns in [Pattern Boundary Architecture](#pattern-boundary-architecture) as
   independent Experience Library assets.

None of this has been done. No code, Figma file, component, or registry entry has been
created or modified by this revision.
