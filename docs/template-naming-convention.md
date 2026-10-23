# FYNXT Template Naming Convention

This document defines the naming convention for every FYNXT Experience Template: the
`id` format used throughout [`templates/registry/template-registry.json`](../templates/registry/template-registry.json),
[`experience-library/templates/`](../experience-library/templates/), and
[`docs/template-specification.md`](template-specification.md) (Field 1).

The convention exists to make identity **stable and unambiguous** — an ID must keep
meaning the same thing for the life of the system, independent of who names it, what
product it first appeared in, or how its visual implementation changes over time.

---

## ID Format

```
FYNXT-TPL-[CATEGORY]-[NUMBER]
```

- **`FYNXT-TPL`** — fixed prefix. Identifies the identifier as a FYNXT Experience
  Template ID (as opposed to a design-system component ID, a PRD ID, or any other
  identifier scheme in this repository).
- **`[CATEGORY]`** — a short, fixed, uppercase mnemonic for the experience pattern (see
  [Approved Categories](#approved-categories)). Chosen once at registration and never
  changed.
- **`[NUMBER]`** — a zero-padded, three-digit sequence number, unique within its
  category (see [Number Allocation](#number-allocation)).

Example: `FYNXT-TPL-LIST-002`.

### What the ID identifies

The ID identifies the template's **product capability and purpose** — not its visual
design, its component internals, or its current framework. This is the core stability
guarantee of this convention:

> **The ID must remain stable even if the template's visual implementation changes
> completely.** A redesign, a framework migration, or a full internal rewrite of
> `FYNXT-TPL-LIST-002` is a new *version* of `FYNXT-TPL-LIST-002` (see
> [Version Naming](#version-naming)) — never a new ID. A new ID is warranted only when
> the underlying product capability itself is no longer the same thing (see
> [Deprecated Templates](#deprecated-templates)).

The ID is permanent, machine-facing, and case-sensitive as written
(`FYNXT-TPL-LIST-002`, not `fynxt-tpl-list-002`). It is what every cross-reference in
this repository (registry entries, configured experiences, developer handoff docs,
changelogs) should use to refer to a template — never the human-readable name, which is
allowed to evolve.

---

## Approved Categories

The following ten `[CATEGORY]` codes are approved for the initial system. Each maps to
a full taxonomy category (used in the human-readable `category` field of the Template
Record and registry entry — see
[`docs/template-specification.md`](template-specification.md) Field 3). This table is
the authoritative source for that mapping; the illustrative category list in the
specification document is non-exhaustive by design, and this table is what resolves it
for these ten codes.

| Code | Full Category | Used for |
|---|---|---|
| `DASH` | Dashboards & Analytics | Aggregated, at-a-glance views combining multiple metrics or data sources |
| `LIST` | Data Display — Collections | Sortable, filterable, paginated lists or tables of records |
| `DETAIL` | Data Display — Single Record | Viewing (and optionally editing) one record in depth |
| `FORM` | Forms & Input | Structured data entry, validation, and multi-step input |
| `REPORT` | Reporting & Export | Generated, often exportable or printable summaries of data over a period or scope |
| `CONFIG` | Settings & Configuration | User, account, or system configuration and preference management |
| `WORKFLOW` | Workflow & Approval | Multi-step, stateful processes involving transitions, approvals, or handoffs |
| `FINANCIAL` | Financial Calculations & Instruments | Domain-specific financial computation or display (rates, conversions, fees, amortization) |
| `ACTIVITY` | Activity & Audit | Chronological records of events, actions, or changes |
| `STATE` | System & Interaction States | Cross-cutting state patterns (empty, error, loading, permission-denied) reusable across other templates |

A new category code may be added only through the same governance process that governs
the category taxonomy itself (per [`governance/`](../governance/) and
[`docs/template-specification.md`](template-specification.md) Field 3) — it is never
invented ad hoc by whoever is registering the next template. Proposing a new code
requires showing that none of the existing ten reasonably fit.

---

## Human-Readable Name

Every template also has a human-readable **name** (Field 2 of the Template Record),
used in documentation, catalogs, and conversation — e.g. "Transaction List" for
`FYNXT-TPL-LIST-002`.

- Written in Title Case, descriptive, and specific enough to distinguish it from
  sibling templates in the same category (e.g. "Transaction List" vs. "Client Account
  List," not two templates both called "List View").
- Describes the **product capability**, not the visual style or the first product it
  shipped in (avoid "Payments List" if the template is really a general list pattern
  that Payments happened to need first — use `supportedModules` for that instead).
- May be revised over time (to improve clarity, or as understanding of the pattern
  matures) without any effect on the ID. The ID is the permanent key; the name is a
  label.
- Is not required to be globally unique the way the ID is, but two templates with
  near-identical names are a signal to check for accidental duplication (see
  [Duplicate Prevention](#duplicate-prevention)) before proceeding.

---

## Number Allocation

- Numbers are **zero-padded to three digits** (`001`, `002`, ... `010`, ... `100`).
- Numbers are assigned **sequentially within each category code**, starting at `001`.
- Numbers are assigned by, and only by, adding the entry to
  [`templates/registry/template-registry.json`](../templates/registry/template-registry.json)
  — the registry is the single allocator. Before assigning the next number, check the
  registry for the highest number already used in that category (including `DRAFT`,
  placeholder, and `DEPRECATED` entries) and take the next one.
- **A number is never reused**, even if the registration is abandoned before a real
  `template.md` is authored, and even after a template is deprecated and archived. This
  guarantees that any historical reference to `FYNXT-TPL-WORKFLOW-003` — in a changelog,
  a ticket, or an old developer-handoff doc — always means the same thing, forever.
- Numbers are **not** pre-allocated in blocks. One number is claimed at a time, at the
  point a template is actually being registered (see [Reserved IDs](#reserved-ids) for
  the brief window between claiming and fully authoring).

---

## Version Naming

Numbering and versioning are independent concerns:

- The **ID** (`FYNXT-TPL-[CATEGORY]-[NUMBER]`) identifies *which* template this is, and
  never changes for the life of the template.
- The **version** (Field 26 of the Template Record) identifies *which iteration* of
  that template this is, and changes constantly over the template's life.

Version naming follows [`docs/template-specification.md`](template-specification.md#versioning)
in full: Semantic Versioning (`MAJOR.MINOR.PATCH`), with `DRAFT`/`EXPERIMENTAL`
templates versioning as `0.x.y` and a template reaching `1.0.0` at `VALIDATED`. A
template's version resets for nothing — a visual redesign, a framework migration, or a
configuration change is expressed as a version bump on the existing ID, never as a
fresh `0.0.0` or a new ID.

---

## Deprecated Templates

When a template is deprecated (per the promotion rules in
[`docs/template-specification.md`](template-specification.md#template-statuses)):

- Its **ID is retired permanently** — it is never reassigned to a different template,
  even one in the same category.
- Its registry entry is **kept**, with `"status": "DEPRECATED"`, not deleted (see
  [`templates/registry/README.md`](../templates/registry/README.md)) — this preserves
  the historical record of what existed and why it was replaced.
- Its human-readable name may gain a note (e.g. "Transaction List (Deprecated —
  superseded by `FYNXT-TPL-LIST-005`)") so anyone reading it understands its status and
  replacement at a glance, but the ID itself is never edited.
- Once archived, the registry's `location` field is updated to point at
  [`history/archive/`](../history/archive/) instead of
  [`experience-library/templates/`](../experience-library/templates/).
- If a replacement template exists, the deprecated entry should reference the
  replacement's ID, and vice versa, so the migration path is discoverable from either
  direction.

## Reserved IDs

There is a brief window between deciding to build a new template and finishing its
`template.md`. To prevent two people (or a person and Claude) from claiming the same
number:

1. The moment a new template is committed to, add its entry to the registry
   immediately with `"status": "DRAFT"` — this is what claims the ID. An ID is
   considered reserved from the moment its entry exists in the registry, regardless of
   how complete the entry is.
2. A reservation should be converted into a real, meaningfully-complete `DRAFT`
   `template.md` promptly. A registry entry that sits as a bare reservation with no
   corresponding `template.md` for an extended period should be flagged and either
   completed or released.
3. Releasing a reservation **does not** free the number for reuse (see
   [Number Allocation](#number-allocation)) — it simply marks the entry `DEPRECATED` (or
   removes the attempt and records why in the template's would-be Change History) with
   the number permanently retired.
4. Claude must never claim a reservation on its own authority as if it were an approved
   template — per [`CLAUDE.md`](../CLAUDE.md), creating a `DRAFT` is allowed, but it
   remains a proposal until a human (Product Designer, for `EXPERIMENTAL` and beyond)
   approves it forward.

## Duplicate Prevention

Duplication is prevented at two levels:

**ID-level (mechanical):** Because [`templates/registry/template-registry.json`](../templates/registry/template-registry.json)
is the single allocator (per [Number Allocation](#number-allocation)), the next number
for a category is always "highest existing + 1." If two registrations are attempted
concurrently (e.g. two branches both adding `FYNXT-TPL-FORM-004`), the conflict surfaces
as an ordinary merge conflict on the registry file — whichever registration lands first
keeps the number, and the other is renumbered to the next available one before merging.
An ID is never assigned "into a gap" to try to reuse a skipped or retired number.

**Semantic-level (judgment):** A unique ID does not by itself prevent two templates from
covering the same product capability. Before registering a new ID, the
[Template-First Principle](../CLAUDE.md#6-template-first-principle) applies: search the
registry, the category's existing templates, and [`ux/patterns/`](../ux/patterns/) for
something that already covers the need. If something close exists, configure or extend
it rather than registering a new ID next to it. A new ID is registered only once a
genuine gap is confirmed and stated explicitly.

---

## Example Template IDs and Names

The following 20 are realistic **examples only**, to demonstrate the convention across
all ten categories. **No templates, template directories, or `template.md` files are
created by this document.**

`FYNXT-TPL-LIST-001`, `FYNXT-TPL-DETAIL-001`, and `FYNXT-TPL-FORM-001` are already
claimed as placeholder entries in
[`templates/registry/template-registry.json`](../templates/registry/template-registry.json)
(see that file). Per [Duplicate Prevention](#duplicate-prevention), the examples below
continue numbering from the next available number in those three categories rather than
colliding with those reservations — demonstrating the allocation rule in practice, not
just in description.

| ID | Name |
|---|---|
| `FYNXT-TPL-DASH-001` | Portfolio Overview Dashboard |
| `FYNXT-TPL-DASH-002` | Risk Exposure Dashboard |
| `FYNXT-TPL-LIST-002` | Transaction List |
| `FYNXT-TPL-LIST-003` | Client Account List |
| `FYNXT-TPL-DETAIL-002` | Client Profile Detail |
| `FYNXT-TPL-DETAIL-003` | Loan Account Detail |
| `FYNXT-TPL-FORM-002` | KYC Onboarding Form |
| `FYNXT-TPL-FORM-003` | Fund Transfer Request Form |
| `FYNXT-TPL-REPORT-001` | Monthly Account Statement Report |
| `FYNXT-TPL-REPORT-002` | Regulatory Compliance Report |
| `FYNXT-TPL-CONFIG-001` | Notification Preferences Configuration |
| `FYNXT-TPL-CONFIG-002` | Role & Permission Configuration |
| `FYNXT-TPL-WORKFLOW-001` | Loan Approval Workflow |
| `FYNXT-TPL-WORKFLOW-002` | Multi-Step Client Onboarding Workflow |
| `FYNXT-TPL-FINANCIAL-001` | Currency Conversion Calculator |
| `FYNXT-TPL-FINANCIAL-002` | Interest & Fee Breakdown |
| `FYNXT-TPL-ACTIVITY-001` | Account Activity Timeline |
| `FYNXT-TPL-ACTIVITY-002` | Audit Trail Log |
| `FYNXT-TPL-STATE-001` | Empty / Error / Loading State Pattern Set |
| `FYNXT-TPL-STATE-002` | Permission-Denied State Pattern |

---

## Summary

- ID format: `FYNXT-TPL-[CATEGORY]-[NUMBER]`, permanent once assigned.
- The ID names a **capability**, never a visual design — implementation and appearance
  can change completely without a new ID.
- The registry is the single source of number allocation; numbers are sequential,
  zero-padded, and never reused.
- Version (semver) tracks iteration of a template; the ID never changes because of a
  version bump.
- Deprecated templates keep their ID and their registry entry forever; only their
  status, location, and documentation change.
- Duplication is prevented mechanically (the registry as sole allocator) and
  semantically (search before registering, per the Template-First Principle).
