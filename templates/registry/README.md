# FYNXT Template Registry

This is the machine-readable discovery index for every FYNXT Experience Template. It
exists so both Claude and humans can answer "does something like this already exist?"
in one lookup, without reading every template record in
[`experience-library/templates/`](../../experience-library/templates/) in full.

`template-registry.json` is the registry itself. This document defines what each field
means, how a template gets registered, and how the registry is kept in sync with the
templates it describes.

**Per [`CLAUDE.md`](../../CLAUDE.md) (Template-First Principle), Claude must search this
registry before proposing or creating any new interface pattern.** If an entry already
covers the requirement, it must be reused or configured — not duplicated.

## Current contents

`template-registry.json` currently contains **three placeholder entries only**:
`FYNXT-TPL-LIST-001`, `FYNXT-TPL-DETAIL-001`, and `FYNXT-TPL-FORM-001`. These exist
**solely to demonstrate the required schema**. Each is marked `"status": "DRAFT"` and
`"placeholder": true`, and its `location.exists` field is `false`. No corresponding
template directory, `template.md`, or implementation has been created anywhere in this
repository. Do not treat a placeholder entry as evidence that a reusable template
exists — treat it exactly as what it is: an example of the shape a real entry will
take.

## Field reference

Every entry contains, at minimum, the fields below. Each maps to a field in the
approved [Template Record](../../docs/template-specification.md#the-template-record);
where the mapping isn't 1:1, the relationship is noted.

| Registry field | Type | Maps to Template Record | Notes |
|---|---|---|---|
| `id` | string | Field 1 — Template ID | See [ID format](#id-format) below. |
| `name` | string | Field 2 — Template Name | |
| `category` | string | Field 3 — Category | Must be a value from the governed category list in this registry's usage over time (see [Category taxonomy](#category-taxonomy)). |
| `description` | string | Field 4 — Description | Plain language, 2–4 sentences. |
| `status` | string (enum) | Field 27 — Status | One of the six values in `validStatuses`. No other value is valid — see [Status values](#status-values). |
| `version` | string (semver) | Field 26 — Version | `0.0.0` for an entry with no authored template yet. |
| `supportedModules` | array of strings | Field 8 — Supported Modules | Empty until the template has been used in/approved for at least one module. |
| `supportedPersonas` | array of strings | Field 9 — Supported Personas | Links to [`product-knowledge/personas/`](../../product-knowledge/personas/); optional in the Template Record, but the key must be present here even if empty. |
| `capabilities` | array of strings | Summarizes Fields 11–13 (Components, Behaviour, Interactions) | A short, scannable list of what the template can do — the full detail lives in the Template Record, not here. |
| `supportedStates` | array of strings | Field 14 — States | The full set of states the template supports. |
| `configurationParameters` | array of `{name, type, required, default, description}` | Field 18 — Configuration Parameters | The public configuration contract — this is what a breaking-change check (see the specification's [Breaking vs. Non-Breaking Changes](../../docs/template-specification.md#breaking-vs-non-breaking-changes)) is run against. |
| `dependencies` | object `{designSystem: [], frontend: []}` | Fields 22–23 — Frontend / Design System Dependencies | |
| `location` | object `{path, exists, note}` | File Layout | `exists: false` is mandatory for any template that hasn't actually been authored yet. Never set `exists: true` unless `template.md` is really at that path. |
| `documentation` | string (path) or `null` | Points at the template's `template.md` / `docs/` | `null` until the template has real documentation. |
| `examples` | array of strings (paths) | Field 25 — Examples | Empty until real configured usages exist. |
| `lastUpdated` | string (ISO date) | Derived from Field 29 — Change History | Updated every time the entry changes, even a status-only change. |

Two additional fields are used in this registry beyond the user's minimum list, to keep
the registry honest:

- `placeholder` (boolean) — `true` for an entry that exists only to illustrate the
  schema, per this task's instructions. A real, authored template never sets this to
  `true`.
- `owner` (string or `null`) — mirrors Field 28 — Owner. Present so the registry alone
  can answer "who do I ask about this," without opening the full Template Record.

### ID format

`FYNXT-TPL-<CATEGORY-CODE>-<SEQUENCE>`, e.g. `FYNXT-TPL-LIST-001`. The full convention
— approved category codes, number allocation, versioning, deprecation, reserved IDs,
and duplicate prevention — is defined in
[`docs/template-naming-convention.md`](../../docs/template-naming-convention.md); this
section is a short summary only.

- `CATEGORY-CODE` is a short mnemonic for the experience pattern (e.g. `LIST`, `DETAIL`,
  `FORM`, `TABLE`, `DASHBOARD`, `WIZARD`, `SEARCH`) — narrower than the full `category`
  taxonomy value, which stays human-readable (e.g. "Data Display").
- `SEQUENCE` is a zero-padded, per-category-code counter (`001`, `002`, ...), assigned
  in order of registration. It is never reused, even if an entry is later deprecated.
- IDs are permanent once assigned, exactly as in
  [`docs/template-specification.md`](../../docs/template-specification.md) Field 1.

> **Note on an earlier example:** `docs/template-specification.md` (Field 1) illustrates
> a Template ID with a lowercase kebab-case example (`data-table-bulk-actions`). This
> registry adopts `FYNXT-TPL-<CATEGORY-CODE>-<SEQUENCE>` as the concrete, authoritative
> ID format going forward, per this task's explicit examples. The underlying rule from
> the specification — globally unique, immutable, never reused — is unchanged; only the
> surface format is now fixed. Flagging this here rather than silently editing the
> specification, per this system's own conflict-handling rule.

### Status values

Only the six statuses defined in `docs/template-specification.md` are valid in the
`status` field: `DRAFT`, `EXPERIMENTAL`, `VALIDATED`, `PRODUCTION-READY`, `STANDARD`,
`DEPRECATED`. There is no `PLACEHOLDER` status — a placeholder entry uses
`"status": "DRAFT"` together with `"placeholder": true`, so the registry never
introduces a status value the approved specification doesn't define. See
[Template Statuses](../../docs/template-specification.md#template-statuses) for what
each status means and who may promote a template into it.

### Category taxonomy

`category` values follow the taxonomy described in
[`docs/template-specification.md`](../../docs/template-specification.md) Field 3 (Data
Display, Forms & Input, Navigation, Search & Filter, Notifications & Feedback,
Authentication & Access, Dashboards & Analytics, Workflow & Approval, Settings &
Configuration). This list is governed, not invented per entry — a new category requires
a governance decision, recorded in [`governance/`](../../governance/), before it's used
here.

## How a new template gets registered

1. **Search first.** Before proposing a new template, search this registry
   (`template-registry.json`) and the Template Records it points to. Also check
   [`ux/patterns/`](../../ux/patterns/) and [`ux/decisions/`](../../ux/decisions/) for
   prior art. This is the `SEARCH` step of the
   [Required Agent Workflow](../../CLAUDE.md#required-agent-workflow) — it is not
   optional, and it happens before any new template.md is written.
2. **Confirm the gap.** If nothing in the registry satisfies the requirement, even with
   configuration or extension, the gap must be stated explicitly (what was searched,
   why nothing fits) before proceeding — per the Template-First Principle in
   [`CLAUDE.md`](../../CLAUDE.md).
3. **Author the DRAFT.** Create `experience-library/templates/<new-id>/template.md`
   following every field in
   [`docs/template-specification.md`](../../docs/template-specification.md#the-template-record).
   Assign the next unused `<SEQUENCE>` for the relevant `CATEGORY-CODE` (introduce a new
   `CATEGORY-CODE` only if no existing one fits).
4. **Add the registry entry.** Add a matching entry to `template-registry.json` with
   `"status": "DRAFT"`, `"version": "0.0.0"` or `"0.1.0"` once meaningfully drafted, and
   `"placeholder"` **omitted or `false`** — a real DRAFT is not a placeholder, even
   though it's early-stage. `location.exists` must be `true` and `location.path` must
   point at the real `template.md`.
5. **Keep both in sync.** Every field in the registry entry must match the current
   Template Record. If they ever diverge, the Template Record
   (`template.md`) is authoritative — the registry is a derived index, not a second
   source of truth. Update `lastUpdated` on every change.
6. **Promotions update both.** Every status or version change follows the promotion
   rules and approval authorities in
   [Template Statuses](../../docs/template-specification.md#template-statuses) and is
   reflected in this registry the same day — an approved promotion that isn't reflected
   here defeats the registry's purpose.
7. **Never delete an entry.** When a template is deprecated, set `"status":
   "DEPRECATED"` and keep the entry (for discoverability of what existed and why it was
   replaced) rather than removing it. Once the template itself is archived to
   [`history/archive/`](../../history/archive/), update `location` to point there.

## Rules for Claude specifically

- Treat every `"placeholder": true` entry as **non-existent** for reuse purposes. It
  answers "has this shape been considered before," not "can I configure this today."
- Never set `location.exists` to `true`, remove `"placeholder": true`, or advance a
  `status` value on behalf of a human approval that hasn't actually happened — per
  [`CLAUDE.md`](../../CLAUDE.md) Section 5 (Agent Limitations), Claude does not
  self-promote a template's status.
- If a task seems to need something close to `FYNXT-TPL-LIST-001`,
  `FYNXT-TPL-DETAIL-001`, or `FYNXT-TPL-FORM-001`, that is a signal to propose
  *authoring* that template (Section 16 of `CLAUDE.md` — New-Pattern Handling), not to
  assume it already exists because a placeholder ID was reserved for it.
