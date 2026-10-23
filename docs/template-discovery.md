# FYNXT Template Discovery Worksheet

This is a working audit instrument for the Product Design team to inventory existing
FYNXT screens, spot recurring product experience patterns, and decide — deliberately,
one candidate at a time — whether a pattern deserves to become a FYNXT Experience
Template.

**This document does not decide any final templates.** It produces *candidates*. A
candidate only becomes a real template through the process in
[`templates/registry/README.md`](../templates/registry/README.md) — a `FYNXT-TPL-`
ID is assigned, per [`docs/template-naming-convention.md`](template-naming-convention.md),
and a `template.md` is authored against
[`docs/template-specification.md`](template-specification.md), **only after** a
candidate here reaches `Final Status: Approved` (see [Final Status](#final-status) below).

This worksheet is also how Claude satisfies the `SEARCH` and `UNDERSTAND` steps of the
[Required Agent Workflow](../CLAUDE.md#required-agent-workflow) when auditing an
existing area of the product — Claude may propose candidate rows, but per
[`CLAUDE.md`](../CLAUDE.md) Section 16, only a Product Designer moves a candidate to
`Approved`.

---

## How to use this document

1. **Inventory first, judge later.** Walk existing FYNXT screens module by module.
   For each screen that *looks like* it might share a pattern with another screen, add
   or update a candidate row — even if you're not yet sure it's reusable. Capturing too
   many candidates and discarding some later is cheap; missing a real pattern because it
   didn't look "template-worthy" on first glance is expensive.
2. **Group as you go.** When a new screen looks like an existing candidate, add it to
   that candidate's `Existing Screens` / `Existing Modules` list rather than creating a
   new candidate — the whole point of this exercise is finding the recurrence, not
   cataloguing individual screens.
3. **Fill what you can, mark what you can't.** Every field below has a defined meaning.
   If a field is genuinely unknown at this stage, write `Unknown — verify with <role>`
   rather than leaving it blank or guessing. A guessed business rule or invented
   permission behavior is worse than an honest gap (per
   [`CLAUDE.md`](../CLAUDE.md) Section 13).
4. **Record from one example; don't *promote* from one example.** A single sighting is
   still worth writing down as a `Candidate Pattern` (see
   [Deciding Whether Something Deserves to Become a Template](#deciding-whether-something-deserves-to-become-a-template))
   — recurrence is evidence for maturity and promotion, not a gate for discovery. What
   one example should never do is skip straight to `STANDARD`.
5. **Only an Approved row triggers real registration.** Setting `Final Status:
   Approved` is the signal to leave this document and follow
   [`templates/registry/README.md`](../templates/registry/README.md)'s registration
   steps. Nothing in this worksheet writes to the registry automatically.

---

## Deciding Whether Something Deserves to Become a Template

Use this checklist before setting a `Recommendation` on any candidate. It exists so a
promotion decision is a considered judgment, not a hunch — and so a screen that merely
*looks* similar to another isn't mistaken for a genuine reusable pattern.

1. **Recurrence.** Recurrence is evidence for *maturity and promotion*, not a gate for
   *discovery*. A pattern is worth recording the first time it's seen — don't wait for
   three sightings before writing it down, or a real pattern gets lost simply because
   only one screen has been audited so far. Instead, tier what you've found honestly:

   | Occurrences found | Tier |
   |---|---|
   | 1 | `Candidate Pattern` — worth recording; not yet evidence of a stable, reusable shape. |
   | 2 | `Strong Candidate` — real recurrence; still worth a second look before treating configuration differences as settled. |
   | 3+ | `Reusable Pattern Candidate` — recurrence itself is no longer the open question; maturity/validation is. |

   Regardless of tier, **no pattern may become `STANDARD` without validation and
   Product Designer approval** (per
   [`docs/template-specification.md`](template-specification.md#template-statuses)) —
   a high tier speeds up promotion, it doesn't substitute for it.
2. **Structural consistency.** Do the occurrences share the same underlying layout and
   composition (`Common Structure`), even if visual styling differs? If the structures
   are only superficially similar, this is not one pattern.
3. **Behavioural consistency.** Do the occurrences share the same functional behaviour
   (`Common Behaviour`) — not just the same look? A shared layout with different
   underlying behaviour is a coincidence, not a template candidate.
4. **Business-rule stability.** Are the differences between occurrences things a
   *configuration parameter* could express, or are they fundamentally different
   business rules wearing the same UI? If it's the latter, this may not be one template
   — it may be several templates, or the business logic doesn't belong inside a
   template's configuration surface at all (per [`CLAUDE.md`](../CLAUDE.md) Section 13,
   a template must never encode a business rule as if it were universal when it
   actually varies by product).
5. **Configuration boundedness.** Can the real differences between occurrences
   (`Configuration Differences`) be expressed as a bounded, nameable set of
   configuration parameters? If the differences feel open-ended or ad hoc, the pattern
   isn't stable enough yet — keep collecting instances rather than templating early.
6. **Data-shape compatibility.** Could a single data schema reasonably describe the data
   each occurrence needs? Wildly incompatible data shapes are a sign these are different
   capabilities, not one template with different configuration.
7. **Forward likelihood.** Is this pattern likely to recur again — is it worth the
   investment of a template's full specification, versioning, and governance overhead?
   A pattern that appeared three times by coincidence and is unlikely to recur again may
   not be worth templating even if it technically qualifies.
8. **Distinctness from existing work.** Per the
   [Template-First Principle](../CLAUDE.md#6-template-first-principle) and
   [Duplicate Prevention](template-naming-convention.md#duplicate-prevention), check the
   [template registry](../templates/registry/template-registry.json) and this
   worksheet's other candidates first. If this is a variant of something already
   proposed or registered, it should extend that candidate/template, not become a new
   one.
9. **A ready owner.** Is there a Product Designer able to own this candidate through
   `EXPERIMENTAL` validation (per
   [`docs/template-specification.md`](template-specification.md#template-statuses))? A
   candidate with no owner is not ready to be approved, regardless of how well it scores
   on 1–8.

A low tier on (1) is never itself a reason to withhold a `Recommendation` — record the
tier honestly and set `Recommendation` from the other checklist items. If a candidate
fails (2), (3), or (6) regardless of tier, it's very unlikely to be ready — recommend
`Not Reusable (One-off)`. If it only fails (5) or (7), flag it as its current tier and
revisit after more of the product is audited.

---

## Field Reference

| Column | Meaning |
|---|---|
| **Candidate ID** | A temporary tracking ID for this worksheet only, format `CAND-001`, `CAND-002`, ... Sequential, scoped to this document. **This is never a `FYNXT-TPL-` ID** — real IDs are permanent and never reused (per [`docs/template-naming-convention.md`](template-naming-convention.md)), so they are only assigned once a candidate is actually `Approved`, not while it's still speculative. Candidate IDs, by contrast, can be freely abandoned, merged, or renumbered — they carry no permanence guarantee. |
| **Candidate Name** | A working, descriptive name for the suspected pattern (e.g. "Record List with Bulk Actions"). Not final — it may change once/if the candidate becomes a real template. |
| **Category** | Best-guess category code from [`docs/template-naming-convention.md`](template-naming-convention.md#approved-categories) (`DASH`, `LIST`, `DETAIL`, `FORM`, `REPORT`, `CONFIG`, `WORKFLOW`, `FINANCIAL`, `ACTIVITY`, `STATE`). Use `Uncategorized — possible new category` if none fit, and flag it in `Open Questions`; a new category code is a governance decision, not something this worksheet can decide on its own. |
| **Existing Screens** | The concrete, named screens where this pattern currently appears (screen name and, where useful, a short description of context). |
| **Existing Modules** | Which FYNXT product modules those screens belong to. |
| **Common Structure** | The shared UX/information architecture across the listed occurrences — layout regions, composition, hierarchy — independent of visual styling. |
| **Common Behaviour** | The shared functional behaviour across occurrences (e.g. sorting, filtering, default states, how it reacts to data changes). |
| **Common Components** | Design-system or ad hoc components shared across the occurrences today. |
| **Common States** | The states consistently present across occurrences (loading, empty, error, success, etc.) — and note any state one occurrence handles that another silently doesn't. |
| **Common Business Rules** | Business rules that appear identical across occurrences, sourced from actual PRDs/FRDs/business-rules documentation or confirmed with a PM — never inferred from the UI. Mark unverified rules explicitly as `Unknown — verify with <role>`. |
| **Configuration Differences** | What actually varies between occurrences today — the raw material for the future template's configuration parameters (Field 18 of the Template Record). |
| **Reusability Potential** | A qualitative call — `High` / `Medium` / `Low` — with a one-line justification referencing the checklist above (e.g. "High — 4 occurrences, identical structure and behaviour, differences are all configuration-shaped"). |
| **Current Implementation** | Where each occurrence is currently implemented today (product/app name, and a plain description if there's no single canonical codebase reference yet). |
| **Figma Reference** | Link(s) to any Figma frames representing the occurrences, if they exist. Optional — and, per [`CLAUDE.md`](../CLAUDE.md) Section 10, never authoritative; absence of a Figma reference never blocks a candidate. |
| **Code Reference** | Pointer(s) (repo, path, or file) to the actual source code powering each occurrence today, where known. |
| **Open Questions** | Anything unresolved that blocks a confident `Recommendation` — missing FRD coverage, an unverified business rule, unclear ownership, a suspected but unconfirmed data-shape mismatch, etc. |
| **Recommendation** | One of: `Candidate Pattern` (1 occurrence), `Strong Candidate` (2 occurrences), `Reusable Pattern Candidate` (3+ occurrences), `Not Reusable (One-off)`, `Duplicate of Existing Pattern`, `Merge with <Candidate ID>`. The first three are recurrence *tiers*, not approvals — set per the [Recurrence tiering](#deciding-whether-something-deserves-to-become-a-template) table, after running the full decision checklist. Recording something as a `Candidate Pattern` on a single sighting is expected and correct, not a placeholder for a "better" answer later. |
| **Final Status** | The worksheet's own review status for this candidate — see [Final Status](#final-status) below. **Distinct from a Template Record's lifecycle status** (`DRAFT`/`EXPERIMENTAL`/etc. in [`docs/template-specification.md`](template-specification.md#template-statuses)), which doesn't begin until a real template is registered. |

### Final Status

| Value | Meaning |
|---|---|
| `Not Reviewed` | Candidate captured; decision checklist not yet run. |
| `Under Review` | Actively being evaluated; `Open Questions` are being worked. |
| `Approved` | Product Designer has run the checklist, resolved (or explicitly accepted) the open questions, and confirmed this should become a real template. **This is the only status that triggers registration** — proceed to [`templates/registry/README.md`](../templates/registry/README.md) to assign a real `FYNXT-TPL-` ID and author a `DRAFT` `template.md`. |
| `Rejected` | Evaluated and deliberately not pursued (e.g. failed the recurrence or business-rule-stability checks). Keep the row — a rejected candidate with reasoning attached prevents someone re-litigating the same idea from scratch later. |
| `Deferred` | Plausible, but not a current priority, or waiting on more instances/roadmap confirmation. Revisit in a future audit pass. |

---

## Summary Index

A quick-scan view. Keep this in sync with the detailed worksheet entries below.

| Candidate ID | Candidate Name | Category | Occurrences (confirmed scope) | Recommendation (tier) | Final Status |
|---|---|---|---|---|---|
| `CAND-001` | Record List with Filters & Row Actions | `LIST` | 2 for outer shell (Leads table, Deals Kanban); 1 for table-as-renderer | Strong Candidate (shell) / Candidate Pattern (table rendering) — see [addendum](#second-occurrence-evidence-deals-in-scope-sales-module) | Under Review |
| `CAND-002` | Record Detail — Header, Stage Tracker, Tabs & Related List | `DETAIL` | 1 (Lead detail) | Candidate Pattern | Under Review |
| `CAND-003` | Multi-Section Conditional Create/Edit Form | `FORM` | 1 (Add Lead; 2 internal config variants, not 2 screens) | Candidate Pattern | Under Review |
| `CAND-004` | Multi-Step Bulk Import Wizard | `WORKFLOW` | 1 (Leads import) | Candidate Pattern | Under Review |
| `CAND-005` | Pipeline / Stage Configuration Builder | `CONFIG` | 1 (Deals pipeline config) | Candidate Pattern | Under Review |
| `CAND-006` | Sales/Deal Analytics Dashboard | `DASH` | 1 (Deals chart screen, not closely inspected) | Candidate Pattern | Under Review |

None of these have been run past a Product Designer yet — every row is `Under Review`,
not `Approved`, and none may become `STANDARD` on tier alone. **Scope note:** per an
explicit Product Designer decision, the Sales Module Figma file (Leads + Deals) is the
confirmed scope for this system's "CRM → Client Management" area — see
[Scope Resolution Addendum](#scope-resolution-addendum-continued-audit) below. Every
candidate here is therefore `Candidate Pattern` tier (1 confirmed occurrence within that
scope) — this is expected under the tiering rule, not a shortfall. See
[Audit Log: CRM — Client Management](#audit-log-crm--client-management-sales-module-figma-source)
for how these were found and what they're evidenced by.

---

## Detailed Worksheet

One entry per candidate, using every field from the [Field Reference](#field-reference)
above. Copy the blank template for each new candidate.

### Illustrative Example (not a real audit finding)

> The entry below is a fully worked **illustrative example only**, using a
> hypothetical, generic scenario. It exists to show how the worksheet should be filled
> in — it is not a claim about any real FYNXT screen, module, or business rule, and it
> must not be treated as a registered candidate.

**Candidate ID:** `CAND-000` (example only — real candidates start at `CAND-001`)

**Candidate Name:** Hypothetical "Record List with Bulk Actions"

**Category:** `LIST`

**Existing Screens:** *(illustrative)* "Widget List" screen, "Gadget List" screen,
"Component List" screen

**Existing Modules:** *(illustrative)* Module A, Module B, Module C

**Common Structure:** All three render a paginated table of records with a persistent
toolbar above it (search + filter controls) and a selection checkbox column.

**Common Behaviour:** All three support column sorting, keyword search, and a bulk
"archive" action once one or more rows are selected.

**Common Components:** Table, Checkbox, Toolbar, Pagination, Badge (for status column).

**Common States:** `loading`, `empty`, `error`, `success` present in all three;
`partial-error` (e.g. bulk action partially failing) only handled in one — flagged as an
open question.

**Common Business Rules:** *(illustrative — would require real FRD verification)*
"Only records in a non-final status may be archived" appears consistent across all
three — `Unknown — verify with Module C's PM, whose FRD doesn't explicitly state this.`

**Configuration Differences:** Column definitions differ per screen; Module C's list
lacks bulk actions entirely (permission-gated); page size defaults differ (20 vs. 25).

**Reusability Potential:** `High` — 3 occurrences, matching structure and behaviour,
differences all look configuration-shaped.

**Current Implementation:** *(illustrative)* Each module currently has its own
hand-built list screen; no shared component today.

**Figma Reference:** *(illustrative)* Not available for Module C's screen.

**Code Reference:** *(illustrative)* Paths would be listed here once identified in the
real product codebase.

**Open Questions:** Is the archive business rule actually identical across modules, or
does Module C have an undocumented exception? Should `partial-error` handling be
required for all instances going forward?

**Recommendation:** `Promote to Template Candidate` (pending resolution of the business
rule question above)

**Final Status:** `Under Review` *(illustrative — not a real decision)*

---

### Candidate: `CAND-001`

**Candidate Name:** Record List with Filters & Row Actions

**Category:** `LIST`

**Existing Screens:** "Leads" list screen (breadcrumb-less top-level table view, all
leads / my leads / recent activity tabs). **Update (2026-09-21):** the two Deals-page
list-shaped frames flagged as unopened in the original pass have now been inspected —
see [Second-Occurrence Evidence: Deals](#second-occurrence-evidence-deals-in-scope-sales-module)
below. They are **not** the same rendering as the Leads list (a Kanban/pipeline board,
not a table) — this is new, load-bearing evidence, not a second confirmation of the
same screen shape.

**Existing Modules:** Sales Module → Leads (primary evidence); Sales Module → Deals
(secondary, partial evidence — see the addendum linked above; the Deals occurrence
shares the outer chrome but not the core collection rendering).

**Common Structure:** Page header with view tabs, a metrics/insight strip above the
table, a persistent filter bar (chip-style active filters + search) above a data table
with a leading checkbox-select column and a trailing per-row overflow-action column,
and pagination below. **This description is Leads-specific.** The Deals occurrence
shares the header/tabs/filter-bar shell but replaces the table with a Kanban board —
see the addendum for the precise comparison; do not read "Common Structure" as proven
common to both until that's resolved.

**Common Behaviour:** Row selection, column sort (implied by column headers, not
directly exercised), keyword search, filter chips that open dedicated
filter/column-management surfaces (see `CAND` patterns below), per-row action menu, and
bulk/global actions once something is selected or on demand (Archive, Export Data).
**Not confirmed common with Deals:** row selection and bulk actions were not found
anywhere in either Deals frame — see the addendum.

**Common Components:** Data table, status/type tag badges, metric card, filter chip bar,
search input, pagination control, avatar/assignee chip, overflow action menu. The Deal
Card component itself was independently confirmed reused, unchanged in shape, between
`CAND-002`'s related-list and the Deals Kanban board — see the addendum.

**Common States:** `success` (populated table, 7 rows) observed directly for Leads.
`loading` and `error` remain **not observed** anywhere. **`empty` is now confirmed** —
but only via the Deals occurrence ("No deals yet — Drag deals here or add new"), not
for Leads itself. This is new evidence for the pattern family generally; it does not
retroactively confirm an empty state exists for the Leads screen specifically.

**Common Business Rules:** None confirmed from the visuals alone. The status taxonomy
visible (`New Lead`, `Contact Attempted`, `Contacted`, `Qualified`, `Unqualified`) and
the "Hot / Warm / Cold" temperature tag appear to be a fixed vocabulary, but whether
that list is exhaustive, who can add to it, and what drives the temperature tag
(business rule vs. manual selection) is `Unknown — verify with Sales Module PM/FRD`.

**Configuration Differences:** The two Deals-page list-shaped frames have now been
opened (see addendum). They do **not** cleanly confirm a second occurrence of "this
pattern" as originally described — they confirm a second occurrence of the *outer
shell* (header, view tabs, filter bar, row/card action menu, "Import + Add" affordance)
combined with a *different* collection renderer (Kanban, not table) and a materially
different, smaller action vocabulary. This is genuine new evidence, but it complicates
rather than simply resolves the "is this reusable" question — see the addendum's
Reusability Test answers.

**Reusability Potential:** `High` in spirit for the outer shell, `Confirmed-with-caveats`
for the shell specifically, `Not confirmed` for table-as-the-collection-renderer being
part of that reusable shell. The underlying Figma layer/component names
(`DataTableWithFilters`, `AdvancedFiltersModal`, `ManageColumnsModal`, `Action`,
`Global Actions`) still suggest shared, generic components. Per the
[recurrence-tiering rule](#deciding-whether-something-deserves-to-become-a-template),
the shell-level pattern now has 2 occurrences (`Strong Candidate` tier), but this
should **not** be read as "the List template as originally drafted has 2 occurrences" —
see the addendum before treating the tier bump as settling anything about scope.

**Current Implementation:** Design-only (Figma). No source code reviewed — this audit
did not have access to the FYNXT frontend codebase, only the design file.

**Figma Reference:** Figma file "Sales Module"
(`https://www.figma.com/design/WvrYlnOxnKgkRbT7nQgsPV/Sales-Module`), page "Leads",
frame labeled "FYNXT Cloud UI Design (CRM)" (1440×1024) — the frame originally linked
by the Product Designer for this audit.

**Code Reference:** None available in this audit.

**Open Questions:** See [Section D](#d-questions-requiring-product-designer-clarification)
below — in particular Q3 (loading/error states still missing) and Q5
(the Insights strip shows "32% Conversion Rate" twice — possible duplicate/bug, or two
different metrics that happen to render identically?). The scope question this entry
originally raised (Q1/Q2) is resolved — see
[Scope Resolution Addendum](#scope-resolution-addendum-continued-audit). **New
questions from the Deals evidence** are logged in the addendum linked above, including
whether List should be renderer-agnostic (table + Kanban as interchangeable
configurations) or whether Table and Kanban should be two separate templates sharing
smaller patterns — this audit does not resolve that question.

**Recommendation:** `Strong Candidate` for the outer-shell pattern only (2 occurrences:
Leads table, Deals Kanban) — **not** a blanket upgrade of the original List-as-table
description, which remains `Candidate Pattern` (1 occurrence). See the addendum for why
these need to be tracked separately rather than collapsed into one number.

**Final Status:** `Under Review`

---

### Candidate: `CAND-002`

**Candidate Name:** Record Detail — Header, Stage Tracker, Tabs & Related List

**Category:** `DETAIL`

**Existing Screens:** Lead detail screen for "Ankur Dei" (accessed conceptually via the
Leads list's row action "View Details," though the audit reached it directly as a
Figma frame rather than by simulating that click)

**Existing Modules:** Sales Module → Leads

**Common Structure:** Back-navigation + record name header, a status pill with its own
change control top-right, a horizontal multi-stage progress tracker (e.g. "New lead →
Interested to contact → Contacted → ...") with a date-oriented field anchored to its
right end, a row of tabs (`Deals`, `Activities`, `Documents`), and — within the active
tab — a filtered, totaled list of related records (deal cards) with a primary action to
add a new related record.

**Common Behaviour:** Tab switching; a related-records list scoped to the parent record
with its own total/summary (total deal value, count-by-stage legend) and its own
"add new" action — effectively `CAND-001`'s list pattern nested inside a detail view.

**Common Components:** Status pill, horizontal stage tracker, tab bar, deal card
(amount, stage/temperature tags, probability %, assignee avatar, date), "+ Add" button.

**Common States:** Only the populated `success` state was seen (3 deals). `Activities`
and `Documents` tab contents were **not opened** in this audit. Empty-state (a lead
with zero deals) was not observed.

**Common Business Rules:** None confirmed. The stage tracker's stage list
("New lead," "Interested to contact," "Contacted," ...) looks similar in spirit to the
Leads list's status column but is `Unknown — verify` whether it's literally the same
underlying field rendered two ways (see Open Questions / possible inconsistency under
Section 9 below) or a genuinely separate "lead lifecycle stage" distinct from "lead
status."

**Configuration Differences:** Not assessable — this is the only Detail-view instance
found within the confirmed scope. A Deal detail view (if one exists on the Deals page)
was not located; Contact/Account detail views are out of scope per the
[Scope Resolution Addendum](#scope-resolution-addendum-continued-audit).

**Reusability Potential:** `Medium`. The structure (header + stage tracker + tabs +
related list) is a common, well-understood CRM pattern in general, and this audit found
**one** concrete FYNXT instance of it within the confirmed scope — recorded as a
`Candidate Pattern` per the recurrence-tiering rule, not held back pending more evidence.

**Current Implementation:** Design-only (Figma); no code reviewed.

**Figma Reference:** Same Figma file/page as `CAND-001`; the "Ankur Dei" record detail
frame reached via the originally-shared link's node.

**Code Reference:** None available in this audit.

**Open Questions:** Whether a Deal detail view exists on the (unopened) Deals page and
shares this structure; whether the stage tracker and the list-view status tag are
the same field (see Section D, Q6). Contact/Account detail views are no longer an open
question for this system — see the [Scope Resolution Addendum](#scope-resolution-addendum-continued-audit).

**Recommendation:** `Candidate Pattern` — 1 confirmed occurrence within the confirmed
scope.

**Final Status:** `Under Review`

---

### Candidate: `CAND-003`

**Candidate Name:** Multi-Section Conditional Create/Edit Form

**Category:** `FORM`

**Existing Screens:** "Add lead" modal, observed in two configurations depending on a
"Lead Type" selector

**Existing Modules:** Sales Module → Leads

**Common Structure:** A modal (title bar with minimize/expand/close, a "Clear fields"
action) containing labeled field-group sections — "Lead details," "Contact details,"
plus either "Source details" (Individual) or "Company details" + "Source details"
(Corporate) — and a document drag-and-drop uploader, with primary/secondary actions at
the bottom.

**Common Behaviour:** **The set of visible sections and fields changes based on the
"Lead Type" selector** (`Individual` vs. `Corporate`) — a live, conditional form driven
by one field's value. Contact details support adding more than one phone/email entry
via a repeatable "+" control, each with its own type tag (e.g. "Work").

**Common Components:** Modal shell, section/fieldset grouping, labeled text/select
inputs, country-code-aware phone input, repeatable field-group control, document
uploader.

**Common States:** Only the two "filled with a type selected" configurations were seen.
The default/empty state before a Lead Type is chosen, validation-error states, and a
submitting/loading state were **not observed**.

**Common Business Rules:** None confirmed — which fields are actually required, and
what validation applies to each, is `Unknown — verify with Sales Module PM/FRD`. The
Individual/Corporate field-set split is a real, observed behavior (not inferred), but
*why* those specific fields differ (e.g. why "Expected Close Date" appears for Corporate
but wasn't visibly required for Individual) is not documented in what was reviewed.

**Configuration Differences:** The Lead Type conditional branching is itself the
configuration surface — this is a strong, concrete signal for a future template's
"conditional field groups by a driving field" configuration parameter. Whether "Edit
Lead" (available from `CAND-001`'s row action menu) reuses this exact form was **not
confirmed** — it was not opened in this audit.

**Reusability Potential:** `Medium`. Same reasoning as `CAND-001`/`CAND-002`: one screen
observed within the confirmed scope, but with internal evidence (two config-driven
variants of itself) that suggests the underlying pattern is meant to generalize.

**Current Implementation:** Design-only (Figma); no code reviewed.

**Figma Reference:** Same Figma file/page; "Add lead" frames (Individual and Corporate
variants) found near the main Leads list frame.

**Code Reference:** None available in this audit.

**Open Questions:** Does "Edit Lead" reuse this same form? Are there more Lead Types
beyond Individual/Corporate? What validates each field?

**Recommendation:** `Candidate Pattern` — 1 confirmed occurrence within the confirmed
scope.

**Final Status:** `Under Review`

---

### Candidate: `CAND-004`

**Candidate Name:** Multi-Step Bulk Import Wizard

**Category:** `WORKFLOW`

**Existing Screens:** Leads bulk-import flow — a step indicator moving through Upload →
Match Column → Import, with a "Fix & preview data" screen for the middle/late step

**Existing Modules:** Sales Module → Leads

**Common Structure:** A step-tracker header ("Back to Import Selection" escape hatch),
an error-summary banner ("N errors found" + a "Show error rows" toggle), and an editable
preview table mirroring the target record's real fields, with per-cell/per-row error
indicators (e.g. a "Duplicate" badge on a contact-number cell).

**Common Behaviour:** Users can review and fix flagged rows inline before committing an
import; errors appear to be filterable via the "Show error rows" toggle.

**Common Components:** Step tracker, error-summary banner with toggle, editable data
table with inline validation badges.

**Common States:** Only the "errors found, mid-review" state was seen. The initial
upload/file-selection step, a zero-error state, and a post-import success/confirmation
state were **not observed**.

**Common Business Rules:** What specifically makes a row a "Duplicate" (matching email?
phone? name?) is `Unknown — verify with Sales Module PM/FRD` — the design shows the
*result* (a badge) but not the underlying matching rule.

**Configuration Differences:** Not assessable from a single instance. The target
field-set mirrors the Lead record shape (a good sign this wizard is data-driven off a
schema rather than hand-built per object), but this wasn't confirmed against a second
importable object (e.g. bulk-importing Contacts or Deals) in this audit.

**Reusability Potential:** `Medium` — bulk import is typically a cross-object need in a
CRM, which would make this a strong long-term candidate, but this audit found only the
Leads instance within the confirmed scope.

**Current Implementation:** Design-only (Figma); no code reviewed.

**Figma Reference:** Same Figma file/page; import-flow frames near the main Leads list
frame.

**Code Reference:** None available in this audit.

**Open Questions:** Is import available for any other object today? What defines a
duplicate/error row? What happens after a successful import (confirmation screen,
redirect, notification)?

**Recommendation:** `Candidate Pattern` — 1 confirmed occurrence within the confirmed
scope.

**Final Status:** `Under Review`

---

### Candidate: `CAND-005`

**Candidate Name:** Pipeline / Stage Configuration Builder

**Category:** `CONFIG`

**Existing Screens:** A pipeline-configuration screen found on the Deals page, for a
pipeline named "Sign-up_Individual," with three stage columns

**Existing Modules:** Sales Module → Deals

**Common Structure:** A named pipeline selector, side-by-side stage columns (each with
Stage Name, Probability %, and Inactivity Window fields, plus a per-column "Delete
Stage"), and an "Add Stage" affordance to the right of the last column, with
Cancel/"Save & Apply" actions.

**Common Behaviour:** Admin-style configuration of a sales pipeline's stages and their
attributes — not a record-management screen in the `CAND-001`/`CAND-002` sense, but a
settings/configuration surface.

**Common Components:** Named-entity selector, repeatable stage-column group, per-item
delete, "add new item" affordance.

**Common States:** Only a "populated, 3 stages" state was seen.

**Common Business Rules:** None confirmed — whether "Probability %" values must sum to
anything, whether stage order is meaningful/reorderable, and who is permitted to edit a
pipeline are all `Unknown — verify with Sales Module PM/FRD`.

**Configuration Differences:** Not assessable — one instance only, and it's unclear
whether this builder is generic (reusable for any staged/pipeline concept in the
product) or specific to the Deals pipeline alone.

**Reusability Potential:** `Low–Medium`. This looks more like a single, product-specific
admin screen than a generalizable template, but that's a guess pending confirmation —
see Open Questions.

**Current Implementation:** Design-only (Figma); no code reviewed. Note: the frame is
internally labeled "CRM Guna(Copy)" — "Guna" reads like a placeholder/personal working
name rather than a real client name, but this should be confirmed rather than assumed.

**Figma Reference:** Same Figma file, page "Deals," frame "CRM Guna(Copy)."

**Code Reference:** None available in this audit.

**Open Questions:** Is this pipeline-builder pattern used anywhere else within the
Sales Module (e.g. a lead-stage equivalent)? Is "Guna" placeholder/test data, confirming
no real client data is embedded in the design file? Are stage probability values
constrained?

**Recommendation:** `Candidate Pattern` — 1 confirmed occurrence; leaning toward
`Not Reusable (One-off)` on the checklist's other criteria (items 4/6/7) rather than on
recurrence alone, pending confirmation there's no second staged/pipeline concept
elsewhere in the confirmed scope.

**Final Status:** `Under Review`

---

### Candidate: `CAND-006`

**Candidate Name:** Sales/Deal Analytics Dashboard

**Category:** `DASH`

**Existing Screens:** A chart-based screen on the Deals page combining one bar chart and
two donut charts

**Existing Modules:** Sales Module → Deals

**Common Structure:** Not deeply inspected — chart types and general placement were
observed, but axis labels, legends, and any surrounding filter controls were not read
in this pass.

**Common Behaviour:** Unknown — not inspected closely enough to describe interaction
behavior (e.g. whether charts are clickable/filterable).

**Common Components:** Bar chart, donut/pie chart.

**Common States:** Not assessed.

**Common Business Rules:** Not applicable / not assessed.

**Configuration Differences:** Not assessable — single instance, not closely inspected.

**Reusability Potential:** `Low` — not enough was reviewed to say anything beyond "a
dashboard screen exists." Flagged mainly so it isn't lost, not as a strong candidate.

**Current Implementation:** Design-only (Figma); no code reviewed.

**Figma Reference:** Same Figma file, page "Deals," frame labeled "FYNXT Cloud UI
Design (CRM)" containing the chart cluster.

**Code Reference:** None available in this audit.

**Open Questions:** What do the charts actually show? Is this dashboard specific to
Deals, or a reusable analytics-panel pattern also used elsewhere (e.g. a Leads
dashboard)?

**Recommendation:** `Candidate Pattern` — 1 confirmed occurrence, not closely inspected;
this candidate needs a proper look before any stronger claim than "worth a second pass"
is fair.

**Final Status:** `Under Review`

---

### Candidate: `CAND-007`

**Candidate Name:**

**Category:**

**Existing Screens:**

**Existing Modules:**

**Common Structure:**

**Common Behaviour:**

**Common Components:**

**Common States:**

**Common Business Rules:**

**Configuration Differences:**

**Reusability Potential:**

**Current Implementation:**

**Figma Reference:**

**Code Reference:**

**Open Questions:**

**Recommendation:**

**Final Status:** `Not Reviewed`

---

*(Copy the `CAND-007` block above for each additional candidate — `CAND-008`,
`CAND-009`, and so on. Add rows to the Summary Index as candidates are added. The next
unused ID is `CAND-007`.)*

---

## Audit Log: CRM — Client Management (Sales Module Figma source)

**Requested scope:** Module `CRM`, Area `Client Management`.
**Actual source reviewed:** the Figma file "Sales Module"
(`https://www.figma.com/design/WvrYlnOxnKgkRbT7nQgsPV/Sales-Module`), specifically its
"Leads" and "Deals" pages, viewed as an unauthenticated (anonymous, view-only) Figma
guest — no edit access, no layer selection, no access to the underlying frontend
codebase, PRDs, or FRDs.

**Coverage note (read this before trusting the findings below as complete):** This was
a visual walkthrough of a large, densely populated Figma file using pan/zoom only — not
a systematic node-by-node export. The following were **not reviewed** and may contain
directly relevant "Client Management" content this audit missed entirely:

- The `Activities` and `Documents` tabs on the Lead detail screen (only `Deals` was
  open).
- A second, similarly-structured "Leads module" frame on the same page (its "Lead
  Creation" section specifically was not reached).
- Two "FYNXT Cloud UI Design (CRM)" list-shaped frames on the Deals page.
- Several small frames labeled generically "Container" and one "SlideOver" frame on the
  Deals page.
- The file's "CP Login" and "Country Flags" pages (skimmed as page names only; not
  opened — they don't sound Client-Management-related, but that's an assumption, not a
  finding).
- No screen explicitly named "Contact" or "Account" was found within this file — only a
  "Convert to Contact" action referencing that concept. **This is now resolved, not
  open:** per an explicit Product Designer decision, the Sales Module file is the
  confirmed scope for this system's "CRM → Client Management" area regardless — see the
  [Scope Resolution Addendum](#scope-resolution-addendum-continued-audit) below.

Per this document's own rules, nothing below states a business rule, permission model,
or validation behavior that wasn't directly visible — anything not confirmable from the
visuals is marked `Unknown — verify with <role>` rather than guessed.

### 1–9: Repeated structures, patterns, components, states, permissions, behaviours

| # | Dimension | Findings |
|---|---|---|
| 1 | Existing screens | Leads list; Lead detail ("Ankur Dei"); Add Lead (Individual variant); Add Lead (Corporate variant); Bulk-import "Fix & preview data" step; Deals pipeline-stage configuration ("Sign-up_Individual"); Deals analytics/chart screen. (Not exhaustive — see coverage note above.) |
| 2 | Existing workflows | Add Lead (single-step modal); Bulk Import (multi-step: Upload → Match Column → Fix & Preview → Import); a "Convert to Contact" action exists on the row-action menu, but the resulting screen/flow is out of the confirmed scope (see the [Scope Resolution Addendum](#scope-resolution-addendum-continued-audit)) and was not pursued. |
| 3 | Repeated layouts | Page-header-plus-filterable-table (Leads list); modal-with-labeled-sections (Add Lead); the same table/filter-bar/action-menu layout is implied on the Deals page too, but its list frames weren't opened to confirm. |
| 4 | Repeated interaction patterns | Overflow row-action menu; filter chip → dedicated filter surface (Quick Filters popover, Advanced Filters modal); "+"-style repeatable field groups (Add Lead's contact fields); step-tracker navigation (Import wizard and, in a different visual treatment, the Lead detail's stage tracker). |
| 5 | Repeated components | Status/temperature tag badges; metric/insight cards; avatar/assignee chips; document drag-and-drop uploader; country-code phone input. |
| 6 | Repeated states | Only "populated/success" states were actually observed across every screen reviewed. **No loading, empty, or error state was found for any screen** — this is either a genuine gap in the design file or simply not present in the frames this audit reached; either way it's a real finding, not an invented one. |
| 7 | Repeated permissions | None directly observed. The row-action menu's "Delete" and the global "Export Data" action imply *some* permission model exists, but no permission-gated visual state (e.g. a disabled/hidden action) was seen. `Unknown — verify with Sales Module PM/FRD`. |
| 8 | Repeated behaviours | Conditional form fields driven by a type selector (Add Lead's Individual/Corporate split); totals/summaries surfaced alongside a related list (Lead detail's deal total and stage-count legend). |
| 9 | Repeated product structures | A "record list → record detail → related sub-list" structure appears twice in spirit (Leads → Lead detail → Deals sub-list), but only once in confirmed evidence. |

### 10–12: Potential reusable templates, components, UX patterns

See [Section A](#a-candidate-templates), [Section C](#c-candidate-components), and
[Section B](#b-candidate-patterns) below.

### 13: Screens that are genuinely unique

Within the reviewed scope, the **Pipeline / Stage Configuration Builder** (`CAND-005`)
is the closest thing to a genuinely unique, one-off screen — it's a settings/admin
surface rather than a record-management pattern, and nothing else reviewed resembles
it. This is tentative: it's "unique in what was reviewed," not confirmed unique across
the whole product.

### 14: Existing inconsistencies

- **The Leads list's Insights strip shows "32% Conversion Rate" twice** (two adjacent
  metric cards with the same label and value). This reads as either a duplicate/copy
  error in the design or two distinct metrics that coincidentally share a label — it
  should be confirmed with the designer rather than assumed to be either. See
  [Question D5](#d-questions-requiring-product-designer-clarification).
- **Two different visual treatments for what may be the same underlying "stage"
  concept:** the Lead detail screen's horizontal status tracker (New lead → Interested
  to contact → Contacted → ...) and the Deals pipeline-stage configuration's
  side-by-side stage columns. If these represent the same idea (a record's position in
  a staged lifecycle), rendering it two different ways is a consistency gap worth
  resolving before either becomes a template. See
  [Question D6](#d-questions-requiring-product-designer-clarification).
- **Two top-level "Leads module" frames exist side by side on the same page**, of
  visibly different scale/completeness. Whether this is "current version + an old
  draft left in place," "two alternative proposals," or "desktop + another breakpoint"
  was not determinable from viewing alone. Left unresolved, this is a discoverability
  risk for anyone auditing this file later. See
  [Question D7](#d-questions-requiring-product-designer-clarification).

### 15: Existing design debt

- No loading, empty, or error state was found for any screen reviewed (see dimension 6
  above) — if these genuinely don't exist yet in the design file, that's design debt
  relative to this system's own QA expectations
  ([`CLAUDE.md`](../CLAUDE.md) Section 17 requires all states before an implementation
  is considered complete).
- Several components clearly built for reuse (`AdvancedFiltersModal`,
  `ManageColumnsModal`, `DataTableWithFilters`, generic `Container` frames) exist only
  as Figma layer names today, with no equivalent entry anywhere in this repository's
  [`experience-library/`](../experience-library/) or
  [`templates/registry/`](../templates/registry/) — meaning FYNXT already has de facto
  reusable patterns that this system doesn't yet know about. Formalizing these (once a
  Product Designer approves them) is exactly the gap this whole system exists to close.
- The duplicate "Leads module" frames (see dimension 14) suggest the design file itself
  could benefit from the same "one canonical version, old ones archived" discipline this
  system's [versioning](template-specification.md#versioning) and
  [history](../history/) conventions apply to templates.

---

## A. Candidate Templates

1. **`CAND-001` — Record List with Filters & Row Actions** (`LIST`). Why it appears
   reusable: the underlying components are generically named
   (`DataTableWithFilters`, `AdvancedFiltersModal`, `ManageColumnsModal`), signaling
   they were built for reuse even though only one screen was confirmed using them.
   Screens: Leads list. What varies: not yet known (single confirmed instance).
   What should become configurable (once a second instance confirms this):
   column set, available filters, row-action list, bulk actions. What should stay
   fixed: the overall layout skeleton (header → insights → filter bar → table →
   pagination). Missing: a second confirmed occurrence; loading/empty/error states.
2. **`CAND-002` — Record Detail (Header, Stage Tracker, Tabs, Related List)**
   (`DETAIL`). Why it appears reusable: a very common CRM shape in general, and this
   instance already nests `CAND-001`'s list pattern inside itself. Screens: Lead detail
   ("Ankur Dei"). What varies: unknown (single instance). What should become
   configurable: which tabs appear, which related-record type populates the list, the
   stage-tracker's stage list. What should stay fixed: header → stage tracker → tabs →
   related list ordering. Missing: a Deal/Contact/Account detail view to compare
   against; Activities/Documents tab content.
3. **`CAND-003` — Multi-Section Conditional Create/Edit Form** (`FORM`). Why it appears
   reusable: it already varies its own field set based on a type selector — direct
   evidence of a configuration-shaped pattern, from one screen. Screens: Add Lead
   (Individual, Corporate). What varies: field-groups shown per Lead Type. What should
   become configurable: the field-group-per-type mapping. What should stay fixed: modal
   shell, section-grouping visual style, document uploader. Missing: confirmation that
   "Edit Lead" reuses this; validation rules.
4. **`CAND-004` — Multi-Step Bulk Import Wizard** (`WORKFLOW`). Why it appears
   reusable: bulk import is typically a cross-object CRM need, and this instance's
   preview table already mirrors the target record's real field shape (schema-driven,
   not hand-built). Screens: Leads import. What varies: unknown (single instance). What
   should become configurable: the target field schema, the duplicate-detection rule
   (once defined). What should stay fixed: the step sequence and error-review UX.
   Missing: a second importable object to compare against; the actual duplicate-match
   rule.
5. **`CAND-005` — Pipeline / Stage Configuration Builder** (`CONFIG`). Why it appears
   reusable: structurally generic (named entity + repeatable stage columns + add/delete),
   but only one instance was found and it may be genuinely Deals-specific. Screens:
   Deals pipeline config ("Sign-up_Individual"). What varies: unknown. What should
   become configurable: number/fields of stages, if genuinely reused elsewhere. What
   should stay fixed: unknown pending a second instance. Missing: any second
   staged/pipeline concept elsewhere in the product to compare against.
6. **`CAND-006` — Sales/Deal Analytics Dashboard** (`DASH`). Why it appears reusable:
   unclear — flagged for completeness, not because reuse evidence is strong. Screens:
   Deals chart screen. What varies / should be configurable / should stay fixed: not
   assessed — this candidate needs a dedicated follow-up look before those questions
   can be answered honestly.

## B. Candidate Patterns

1. **Advanced Filter Builder** — grouped AND/OR condition rows (`Select a column` /
   `Choose a condition` / `Enter value`), nested groups, `+Add Row` / `+Group`,
   `Save to view`. Seen in both an empty and a populated state on the Leads list.
2. **Quick Filters popover** — search + expandable checkbox groups (Popular, Type,
   Sales Person, Label, Custom, Created On) with a `Save to view` action.
3. **Manage Columns modal** — searchable checklist of available table columns.
4. **Row-level overflow action menu** — `View Details`, `Edit Lead`, `Send Email`,
   `Call`, `Convert to Contact`, `Delete`. The `Convert to Contact` entry is the only
   evidence in this audit that a "Contact" concept exists at all (see Question D1).
5. **Global bulk-selection actions** — `Archives`, `Export Data`, surfaced separately
   from the per-row menu.
6. **Call Provider selector popover** — a picklist of call-integration providers (Cube,
   Square Talk, Ozicom, Commmpeak, Coperato, Voiso).
7. **Horizontal stage/status tracker** — used on the Lead detail screen; visually
   distinct from the Deals pipeline-stage columns even though both may represent a
   "stage" concept (see Question D6 and dimension 14's inconsistency note).

## C. Candidate Components

1. **Status/Type tag badge** — covers lead status (`New Lead`, `Contacted`,
   `Qualified`, `Unqualified`, `Contact Attempted`), temperature (`Hot`/`Warm`/`Cold`),
   and deal stage (`Negotiation`, `New deal`, `Won`) with what looks like the same
   underlying pill component and a color convention.
2. **Metric / insight card** — a number-plus-label tile, repeated across the Leads
   insights strip.
3. **Deal card** — amount, stage/temperature tags, probability %, assignee avatar,
   close date; repeated inside the Lead detail's deal list.
4. **Assignee avatar chip** — initials-in-circle, used for both single assignees and
   stacked "who's involved" clusters.
5. **Country-code-aware phone input** — country selector + number + a type tag
   (`Work`, etc.).
6. **Document drag-and-drop uploader** — seen identically in both Add Lead variants.
7. **Repeatable field-group control** — the "+" affordance for adding another
   phone/email in Add Lead's Contact details section.

## D. Questions Requiring Product Designer Clarification

1. ~~**Scope mismatch:** this audit was scoped to `CRM` → `Client Management`, but the
   material found is squarely the pre-conversion Sales pipeline (Leads and Deals).~~
   **RESOLVED:** the Product Designer confirmed the Sales Module file is the scope for
   this system's "CRM → Client Management" area — see the
   [Scope Resolution Addendum](#scope-resolution-addendum-continued-audit).
2. ~~Do Contact and/or Account detail/list screens exist, and if so, where?~~
   **RESOLVED as out of scope** — see the
   [Scope Resolution Addendum](#scope-resolution-addendum-continued-audit). Not pursued
   further.
3. What do the missing loading, empty, and error states look like for the Leads list,
   Lead detail, and Add Lead form — do they exist elsewhere in the file, or do they
   genuinely not exist yet?
4. What is the actual permission model behind `Delete`, `Export Data`, and `Convert to
   Contact` — are any of these role-gated, and how should that be represented in a
   future template's `Permissions` field?
5. Is the duplicated "32% Conversion Rate" metric card on the Leads Insights strip a
   design error, or two distinct metrics that happen to render identically today?
6. Are the Lead detail's stage tracker and the Deals pipeline-stage configuration
   describing the same underlying concept? If so, should they converge on one visual
   treatment before either becomes a template?
7. What is the relationship between the two top-level "Leads module" frames found on
   the Leads page (current vs. superseded draft? Two proposals? Different breakpoints?),
   and should the non-canonical one be archived out of the working file?
8. Is "Guna" (as in the "CRM Guna(Copy)" frame on the Deals page) confirmed
   placeholder/test data, not a real client name? (Asking rather than assuming, per
   this system's data-handling caution.)
9. Does "Edit Lead" (from the row action menu) reuse the same form as "Add Lead," and
   does a bulk-import capability exist for any object besides Leads?

---

## Scope Resolution Addendum (continued audit)

This section continues the audit above after an explicit scope question was raised:
did Leads/Deals represent the *complete* CRM Client Management area, or only part of
it? The Product Designer directed that this be resolved without further exploration
beyond the Sales Module Figma file already reviewed, and confirmed that file already
contains the relevant patterns. Recorded here for the record, per this system's
principle of capturing designer decisions rather than re-litigating them later.

### A. Confirmed CRM Scope

**For this system's purposes, "CRM → Client Management" = the Sales Module Figma file**
(`https://www.figma.com/design/WvrYlnOxnKgkRbT7nQgsPV/Sales-Module`), covering its
Leads and Deals pages, exactly as already audited above. This was confirmed directly
by the Product Designer, not established by finding Contact/Account/Company screens
elsewhere. Contact, Account, and Company — if they exist as separate screens outside
this file — are **out of scope for this system unless and until the Product Designer
brings them in explicitly**. This closes [Question D1/D2](#d-questions-requiring-product-designer-clarification)
from the prior pass.

### B. Screens Found

The same six screens identified in the original pass, within the now-confirmed scope
(see [Section 1](#1-9-repeated-structures-patterns-components-states-permissions-behaviours)
and the [Detailed Worksheet](#detailed-worksheet) above for full detail on each):

1. Leads list (`CAND-001`)
2. Lead detail — "Ankur Dei" (`CAND-002`)
3. Add Lead — Individual variant (`CAND-003`)
4. Add Lead — Corporate variant (`CAND-003`)
5. Leads bulk-import "Fix & preview data" step (`CAND-004`)
6. Deals pipeline-stage configuration — "Sign-up_Individual" (`CAND-005`)
7. Deals analytics/chart screen (`CAND-006`)

No additional screens beyond these were located within the confirmed scope.

### C. Existing Implementations Found

**None.** This audit has design-only access (Figma). No FYNXT frontend codebase, no
PRDs/FRDs, and no other implementation source were made available or reviewed. Every
"Current Implementation" field in the Detailed Worksheet above correctly reads
"Design-only (Figma); no code reviewed" — this remains accurate and unchanged.

### D. Repeated Patterns

Unchanged from the original pass — see [Section B: Candidate Patterns](#b-candidate-patterns)
(Advanced Filter Builder, Quick Filters popover, Manage Columns modal, row-level
overflow action menu, global bulk-selection actions, Call Provider selector, horizontal
stage/status tracker) and [Section C: Candidate Components](#c-candidate-components)
(status/type tag badge, metric card, deal card, avatar chip, country-code phone input,
document uploader, repeatable field-group control). Each was confirmed on exactly one
screen within the confirmed scope — per the
[recurrence-tiering rule](#deciding-whether-something-deserves-to-become-a-template),
each is correctly recorded as a `Candidate Pattern`, not withheld for lack of a second
sighting.

### E. Potential Template Candidates

`CAND-001` through `CAND-006`, all re-tiered as `Candidate Pattern` (1 confirmed
occurrence each within the confirmed scope) — see the [Summary Index](#summary-index)
and [Detailed Worksheet](#detailed-worksheet) above for the full evidence behind each.
No candidate has been promoted past `Under Review`; recording them at this tier is the
correct outcome of this pass, not a shortfall pending more evidence, since the scope
that would have produced more evidence (Contacts/Accounts/Company) is now explicitly
excluded.

### F. Missing Information

Everything already logged as `Unknown — verify with Sales Module PM/FRD` throughout the
Detailed Worksheet remains missing and is unaffected by the scope resolution:
loading/empty/error states for every screen; the actual permission model behind
`Delete`/`Export Data`/`Convert to Contact`; what defines a "Duplicate" row in bulk
import; whether stage `Probability %` values are constrained; whether `Edit Lead`
reuses the `Add Lead` form. None of these require exploring beyond the Sales Module
file to answer — they're all things a Product Designer or the Sales Module PM/FRD
would need to confirm regardless.

### G. Remaining Questions

Only the questions in [Section D](#d-questions-requiring-product-designer-clarification)
that are genuinely internal to the Sales Module file remain open (Q3–Q9): the missing
loading/empty/error states, the permission model, the duplicated "32% Conversion Rate"
metric, whether the Lead-detail stage tracker and the Deals pipeline-stage config
represent the same concept, the two duplicate "Leads module" frames, whether "Guna" is
confirmed placeholder data, and whether `Edit Lead` reuses the `Add Lead` form. Q1 and
Q2 (the scope question) are resolved per Section A above and are not reopened here.

---

## Second-Occurrence Evidence: Deals (In-Scope, Sales Module)

**Date:** 2026-09-21. **Trigger:** the architecture challenge on
`docs/golden-template-list-specification.md` flagged that `CAND-001`'s "reusable"
claim rested on exactly one occurrence, and that the two Deals-page list-shaped frames
noted (but not opened) in the original audit were the cheapest available way to test
it — without reopening anything outside the already-approved Sales Module scope. This
section records what was found. **The golden specification itself was not modified.**

**Source:** same Figma file as the rest of this audit
(`https://www.figma.com/design/WvrYlnOxnKgkRbT7nQgsPV/Sales-Module`), page "Deals",
the two frames both labeled `FYNXT Cloud UI Design (CRM)` — one showing an empty
pipeline, one showing a populated one.

### What the two frames actually are

Both frames are the **same screen in two states** (empty and populated), not two
different screens — and that screen is a **Kanban / pipeline board**, not a table.
Header: "Deals" title, a pipeline selector (`Test01_pipeline`), view tabs
(`All deals / My deals / Recent Activity`, identical structure to Leads' tabs), a
collapsible "Insights" link (not an inline metric strip), a filter bar (chips for
`Contact` / `Owner` / `Deal Stage` + `Clear All` + search — same interaction pattern as
Leads' filter bar, different fields), and `Import` + `+ New Deal` buttons (mirroring
Leads' `Import` + `+ New Lead`). A view-switcher icon pair (list icon / board icon) is
present in the header, implying an alternate table rendering may exist — **no such
table-rendering frame was found among the two frames inspected; its existence is
implied, not confirmed.**

Below the header, stage columns (`Qualification`, `Contact Made`, `Proposal`,
`Negotiation`, ...) each show a count badge, an overflow (`⋮`) menu (**"Edit / Delete"**
— stage-level actions, tying directly to `CAND-005`'s pipeline-stage concept), a
`Deal Value $` total, and a `Win Probability %` bar. Cards within each column show
title, amount, a stage tag (inline-editable via a chevron — a Deals/Kanban-specific
interaction not present in Leads), a temperature tag + probability, an assignee, a
date, and a per-card `⋮` menu with **"Edit Deal / Duplicate Deal / Delete Deal"** — no
`View` entry. Each column ends with a `+ Add Deal` footer button. The empty-state frame
shows, per column: a `+` icon, **"No deals yet"**, **"Drag deals here or add new."**

The Deal Card fields (amount, stage tag, temperature tag, probability, assignee,
date) are **identical in shape** to the deal cards already documented in `CAND-002`'s
related-list — independently confirming that component is reused across at least two
screens, unlike almost everything else in this audit.

### Comparison Table

| Capability | Leads | Deals | Classification |
|---|---|---|---|
| Search | Present, search input in filter bar | Present, same position/pattern | **CONFIRMED** shared pattern |
| Pagination | Present (numbered, `1–7 of 7`) | **Not found** in either frame — columns show no page control, vertical scroll implied | **NOT CONFIRMED** for Deals |
| Insights | Present as an inline metric-card strip (5 cards) | Present, but as a collapsible "Insights" link/section, not inline cards | **DIFFERENT** — concept recurs, presentation doesn't |
| View Tabs | `All leads / My leads / Recent Activity` | `All deals / My deals / Recent Activity` — same structure | **CONFIRMED** shared pattern, labels are content |
| Quick Filters | Present (`Person` / `Lead Status` / `Last Activity Date` chips) | Present (`Contact` / `Owner` / `Deal Stage` chips) — same chip + "Clear All" pattern | **CONFIRMED** shared pattern, fields are content |
| Advanced Filters | Present, confirmed (`AdvancedFiltersModal`) | A filter icon is present; the modal itself was **not opened/verified** for Deals | **NOT CONFIRMED** for Deals |
| Manage Columns | Present, confirmed | **Not applicable / not visible** — a Kanban board has no table columns to manage; an unexplored settings icon exists near "Insights" | **NOT CONFIRMED**, possibly N/A for this rendering |
| Table / Data Grid rendering | Table (rows/columns) | **Kanban board** — not a table. A view-switcher implies a table view may exist elsewhere, unconfirmed | **DIFFERENT** — disproves "table is the only rendering model" |
| Selection (row/card checkbox) | Present, leading checkbox column | **Not found** on any card in either frame | **NOT CONFIRMED** for Deals — disproves "mandatory checkbox selection" |
| Bulk Actions | Present (`Archive`, `Export Data`) | **Not found** — no bulk action bar anywhere | **NOT CONFIRMED** for Deals — disproves "mandatory bulk actions" |
| Row Actions (vocabulary) | `View Details / Edit Lead / Send Email / Call / Convert to Contact / Delete` (6) | `Edit Deal / Duplicate Deal / Delete Deal` (3, no `View`) | **DIFFERENT** — confirms action vocabulary is entity-specific content, not shared |
| Row Action Menu (mechanism) | Overflow `⋮` per table row | Overflow `⋮` per **card**, plus a **second, new** overflow `⋮` per **column header** (stage-level Edit/Delete) not present in Leads at all | **CONFIRMED** the "`⋮` opens a menu" mechanism recurs; Deals applies it at an extra structural level Leads doesn't have |
| Sorting | Implied by column headers, never exercised | **Not visible / not applicable** to Kanban grouping | **UNKNOWN** |
| Saved Views | Implied only (a "Save to view" action in Leads' Quick Filters popover) | **Not found** in either Deals frame | **NOT CONFIRMED** for Deals |
| States | `success` only confirmed | **Both `success` and a genuine `empty` state confirmed** (first empty state found anywhere in this audit) | **NEW EVIDENCE** — `empty` exists for the pattern family, still not for Leads specifically |

### Reusability Test

**What genuinely remains common between Leads and Deals?** The page-header shell
(title + `Import`/`+ New X` actions), the view-tab structure, the filter-chip +
search + "Clear All" narrowing pattern, an `⋮`-menu mechanism for row/card-level
actions, and — independently — the Deal Card component itself (confirmed reused
between `CAND-002` and this board, not just structurally similar).

**What changes through configuration?** Which filters appear, view-tab labels, the
action vocabulary (6 items vs. 3, entirely different names), the entity name and
column/field labels. These were already modeled as configuration in the golden
specification and this evidence supports keeping them that way.

**What appears to belong to separate patterns?** The Row/Card Action Menu (now
confirmed to recur at *three* structural levels across the two entities: table row,
card, and — new — column header); the Insights/summary display (two different
presentations observed, not one configurable one — open question, not resolved here);
the Deal Card (confirmed shared component, independent of List entirely — it's reused
by a Detail template's related-list and by this Kanban board, not by "List" in either
case); and the stage-column-with-metrics unit, which ties directly to `CAND-005` and
looks more like a companion piece of a distinct "Pipeline Board" capability than
something List should absorb.

**What evidence suggests List should be broader than a table?** Deals' actual,
observed collection rendering is a Kanban board, not a table — direct evidence table
isn't universal. The view-switcher icon pair in Deals' own header suggests FYNXT's own
design intent already treats "how you render a collection" as a separate,
user-facing choice from "how you narrow/act on it" — which is exactly the direction
the architecture challenge recommended.

**What evidence suggests List should remain table-oriented?** No table-rendering frame
for Deals was actually found — only implied by an unclicked icon. The one fully
evidenced, real table occurrence is still Leads alone. If Kanban is Deals' *canonical*
view (not merely an alternate view of the same List template), that argues for keeping
Table-oriented List and a Kanban/Board capability as two **separate** templates that
share smaller patterns (filters, tabs, action menu), rather than one broadened List
template trying to cover both renderings itself.

**This is a genuine, unresolved tension — not settled here.** Both readings are
defensible from the evidence gathered; choosing between them is an architectural
decision for the Product Designer, not something this audit resolves on its own.

---

## What Happens Next

This worksheet is an audit tool, not a decision record. Nothing here is final until:

1. A candidate reaches `Final Status: Approved`.
2. A real `FYNXT-TPL-[CATEGORY]-[NUMBER]` ID is assigned per
   [`docs/template-naming-convention.md`](template-naming-convention.md).
3. A `DRAFT` `template.md` is authored against every field in
   [`docs/template-specification.md`](template-specification.md#the-template-record),
   and a matching entry is added to
   [`templates/registry/template-registry.json`](../templates/registry/template-registry.json),
   per [`templates/registry/README.md`](../templates/registry/README.md).

No templates, registry entries, or code are created by this document. This document's
only output is a set of well-evidenced candidates for the Product Design team to act
on.
