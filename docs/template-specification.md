# FYNXT Experience Template Specification

This document is the formal specification for what a **FYNXT Experience Template** is,
what it must contain, how it moves through its lifecycle, and how it is versioned. It
governs everything stored under [`experience-library/templates/`](../experience-library/templates/)
and is binding on both humans and Claude, per [`CLAUDE.md`](../CLAUDE.md) (Sections 6, 8,
9, 16, and 18).

## What a template is

A FYNXT template is **not** a screenshot, a Figma component, or a static code snippet.
A template is a **reusable product experience capability** — a fully specified unit
that captures everything needed to understand, configure, implement, review, and
maintain that experience across FYNXT products:

- Product purpose
- UX structure
- Behaviour
- Components
- States
- Permissions
- Responsive behaviour
- Accessibility
- Configuration
- Data requirements
- API contract
- Frontend implementation
- Examples
- Documentation
- Version
- Status
- Governance

A design artifact that only shows how something looks, or a code component that only
shows how something is built, is not a template on its own — it becomes one only once
it is captured against every field in this specification. Partial specifications are
expected during early lifecycle stages (see [Template Statuses](#template-statuses)),
but the full field set is what a template converges toward before it can be trusted for
reuse.

---

## The Template Record

Every template is defined by a single **Template Record** containing the 30 fields
below. A template's record lives with it in
[`experience-library/templates/`](../experience-library/templates/) (see
[File Layout](#file-layout) at the end of this document) and is indexed in
[`experience-library/catalog/`](../experience-library/catalog/) so it can be found by
Claude and humans before anything new is proposed.

Fields marked **(required)** must be present for a template to reach `VALIDATED` status
or higher (see below). Fields marked **(optional)** may be empty but should be present
as an explicit placeholder rather than omitted, so a reader knows the field was
considered.

### 1. Template ID (required)

A globally unique, immutable, kebab-case identifier, e.g. `data-table-bulk-actions`.
Assigned once, at `DRAFT` creation, and never reused — even after a template is
deprecated and archived, its ID is retired, not recycled. The ID is what all other
records (catalog, versioning registry, configured experiences, developer handoff docs)
use to reference the template.

### 2. Template Name (required)

The human-readable display name, e.g. "Data Table with Bulk Actions."

### 3. Category (required)

The taxonomy group the template belongs to (e.g. Data Display, Forms & Input,
Navigation, Search & Filter, Notifications & Feedback, Authentication & Access,
Dashboards & Analytics, Workflow & Approval, Settings & Configuration). The category
list itself is governed — see [`governance/`](../governance/) — and is maintained in
[`experience-library/catalog/`](../experience-library/catalog/), not invented per
template.

### 4. Description (required)

A short (2–4 sentence), plain-language description of what the template is and what it
does, understandable without reading the rest of the record.

### 5. Purpose (required)

The product problem this template solves and why it exists — normally traceable to one
or more PRDs/FRDs in [`product-knowledge/`](../product-knowledge/) or an approved UX
decision in [`ux/decisions/`](../ux/decisions/). A template's purpose is a
generalization of a real, approved need — never a hypothetical one.

### 6. When to Use (required)

Explicit conditions under which this template is the right choice — the criteria a
designer or Claude checks before selecting it during the `SELECT` step of the
[Required Agent Workflow](../CLAUDE.md#required-agent-workflow).

### 7. When NOT to Use (required)

Explicit anti-patterns and exclusions — situations that look similar but are better
served by a different template or no template at all. Should name the alternative
template where one exists.

### 8. Supported Modules (required)

The FYNXT product modules this template is approved for (e.g. Payments, Lending, Cards,
Admin Console). A template's supported modules can expand over time (a non-breaking
change, see [Versioning](#versioning)), but expansion should be a deliberate governance
decision, not silent.

### 9. Supported Personas (optional)

Links to the [`product-knowledge/personas/`](../product-knowledge/personas/) this
template is designed for. Optional because not every template is persona-specific, but
should be filled in whenever the UX decision behind the template was persona-driven.

### 10. Structure (required)

The UX/information architecture of the template: layout regions, composition
hierarchy, named slots, and how sub-components compose. This is the skeleton a
configuration fills in — described independent of visual styling.

### 11. Components (required)

The [`design-system/components/`](../design-system/components/) (and any
template-internal sub-components) used, with the role each plays in the structure.
A template must not define a component that duplicates an existing design-system
component (per [`CLAUDE.md`](../CLAUDE.md) Section 9).

### 12. Behaviour (required)

The functional rules governing the template: default sorting/filtering/pagination
behavior, how it responds to data changes, and where product-specific business logic
plugs in. This field describes *where* business rules attach — it must never itself
contain an invented business rule (per [`CLAUDE.md`](../CLAUDE.md) Section 13).

### 13. Interactions (required)

User interaction patterns supported: click, hover, drag, keyboard shortcuts, gestures,
and how each maps to an approved entry in
[`ux/decisions/`](../ux/decisions/) or [`ux/patterns/`](../ux/patterns/).

### 14. States (required)

The complete set of states the template must support and what each looks/behaves like:
at minimum — `loading`, `empty`, `error`, `partial-error` (where applicable),
`success`, `disabled`, and `read-only`. A template record is incomplete if a state it
can enter is not documented here.

### 15. Permissions (required)

How role/permission gates affect the template's visibility and behavior (e.g. which
elements hide, disable, or change for a given permission). Permission logic referenced
here must come from an FRD or [`product-knowledge/business-rules/`](../product-knowledge/business-rules/)
entry — never invented (per [`CLAUDE.md`](../CLAUDE.md) Sections 5 and 13).

### 16. Accessibility (required)

The WCAG conformance target (FYNXT baseline: **WCAG 2.1 AA** unless a specific template
requires higher), keyboard navigation map, required ARIA roles/attributes, screen
reader behavior, and focus management rules.

### 17. Responsive Behaviour (required)

How the template adapts across the breakpoints defined in
[`design-system/tokens/`](../design-system/tokens/): layout changes, touch target
sizing, and any functionality that is intentionally reduced or hidden at a given
breakpoint.

### 18. Configuration Parameters (required)

The schema of "knobs" a designer or developer sets to configure this template for a
specific product experience: parameter name, type, required/optional, default value,
and a description of its effect. This is the template's public configuration contract
— see [Breaking vs. Non-Breaking Changes](#breaking-vs-non-breaking-changes) for how
changes to this field are versioned.

### 19. Required Data (required)

The conceptual data entities and fields the template needs to function, described at
the business level (e.g. "a list of transactions, each with amount, status, and
timestamp") independent of wire format.

### 20. Data Schema (required)

The concrete, typed schema for the data in Required Data (e.g. a TypeScript interface
or JSON Schema), precise enough for a developer to implement an adapter against it
without guessing.

### 21. API Contract (required if the template consumes/produces data over an API)

The expected request/response shape, including pagination, filtering, error, and
loading-state conventions. Product-specific endpoint URLs are not part of the template
record — the *contract shape* is, so any FYNXT product can implement an adapter to it.

### 22. Frontend Dependencies (required)

The framework/library versions and internal packages the template's implementation
requires, and the minimum compatible version of each — used to check compatibility
before a developer integrates the template (see
[`developer-handoff/`](../developer-handoff/)).

### 23. Design System Dependencies (required)

The specific [`design-system/`](../design-system/) tokens, components, and minimum
design-system version this template depends on. A design-system change that breaks
this dependency must be reconciled before either side's version is bumped (see
[Versioning](#versioning)).

### 24. Figma Reference (optional)

A link to a Figma frame or component representing this template, if one exists. This
field is a convenience pointer only — per [`CLAUDE.md`](../CLAUDE.md) Section 10, it is
never authoritative, and a template is not blocked from progressing status because this
field is empty.

### 25. Examples (required for `VALIDATED` and above)

Links to real, configured usages of this template (in
[`frontend/configured-experiences/`](../frontend/configured-experiences/) or a
documented sandbox instance), demonstrating it working end-to-end.

### 26. Version (required)

The template's current version, using [Semantic Versioning](#versioning) (see below).

### 27. Status (required)

The template's current lifecycle status — one of the six values defined in
[Template Statuses](#template-statuses).

### 28. Owner (required)

The accountable individual or team (normally a Product Designer or the Design System
team) who can answer questions about this template and who must be party to any status
promotion or breaking change, per [`governance/roles-and-responsibilities/`](../governance/roles-and-responsibilities/).

### 29. Change History (required)

A changelog of every version of this template, cross-referenced with
[`versioning/changelogs/`](../versioning/changelogs/), each entry stating the version,
date, author, whether it was breaking, and a summary of the change.

### 30. Known Limitations (required)

Explicit, documented gaps, unsupported edge cases, or scenarios where this template is
known to fall short. This field exists so limitations are surfaced deliberately rather
than discovered by a consumer in production. An empty Known Limitations field on a
`PRODUCTION-READY` or `STANDARD` template should be treated as suspicious, not as a
sign of perfection.

---

## Template Statuses

A template moves through exactly six statuses. Status changes are **promotions**
(forward) or **deprecations** (terminal) — a template is never silently reclassified.

| Status | Meaning | Who can promote into it |
|---|---|---|
| **DRAFT** | Initial authoring. The template record may be incomplete and may change entirely without notice. Not to be used in any real product. Anyone — including Claude, as a proposal — may create a `DRAFT`. | No promotion needed to create; anyone may author a draft. |
| **EXPERIMENTAL** | The record is complete enough to implement and try in one real (or sandboxed) product context, but is not yet proven and may still change in breaking ways at any point. This is the "candidate pattern" stage referenced in [`CLAUDE.md`](../CLAUDE.md) Section 16. | **Product Designer approval required.** Claude may propose promotion but must never self-promote. |
| **VALIDATED** | The template has been used successfully in at least one real product context (or reviewed and explicitly approved by the Design System owner), all 30 record fields are complete, and it has passed the QA checklist in [`CLAUDE.md`](../CLAUDE.md) Section 17. Still scoped — not yet the recommended default for its category. | **Product Designer + a Developer** who confirms successful integration. |
| **PRODUCTION-READY** | The template is fully documented, stable, and safe for any developer to consume directly from [`experience-library/templates/`](../experience-library/templates/) without designer involvement per instance. Its version follows a strict semver contract (see [Versioning](#versioning)). | **Design System Owner / Governance review**, confirming full spec completeness and QA sign-off. |
| **STANDARD** | The template is the canonical, recommended default for its category across FYNXT. Competing templates in the same space are expected to deprecate in its favor. | **Governance board** sign-off (cross-team), per [`governance/roles-and-responsibilities/`](../governance/roles-and-responsibilities/). |
| **DEPRECATED** | The template is no longer recommended for new work. It is kept, unmodified except for critical fixes, for existing consumers, with a documented migration path to its replacement (if any), and is scheduled for eventual archival to [`history/archive/`](../history/archive/). | **Template Owner + Governance approval**, from any prior status. A `DEPRECATED` template cannot be promoted back to an earlier status — reviving the idea starts a new `DRAFT` that references the archived template. |

Rules that apply across all statuses:

- **Claude never self-promotes a template's status.** Claude may recommend a promotion
  and prepare the evidence for it (usage examples, QA results, completed fields), but
  the promotion itself is a human, governance-recorded action.
- Promotions are recorded in [`versioning/registry/`](../versioning/registry/) and as an
  entry in the template's Change History (field 29).
- A template cannot skip a status forward (e.g. `DRAFT` straight to `PRODUCTION-READY`)
  — each stage's evidence (usage, review, QA) must actually exist, not just be asserted.

---

## Versioning

Templates use **Semantic Versioning** (`MAJOR.MINOR.PATCH`), with one adjustment for
pre-`VALIDATED` templates, described below.

- **MAJOR** — incremented for a **breaking change** (see below). Existing consumers must
  take explicit action to adopt it.
- **MINOR** — incremented for a **non-breaking, additive change**. Existing consumers
  are unaffected unless they opt in to the new capability.
- **PATCH** — incremented for a **non-breaking fix**: bug fixes, visual polish that
  stays within the design system, accessibility fixes that don't change the
  configuration/data contract, performance improvements, or documentation corrections.

### Pre-1.0 convention

- `DRAFT` and `EXPERIMENTAL` templates version as `0.x.y`. Per standard semver
  convention, any change — including a breaking one — may land as a `0.x` bump, but it
  **must still be explicitly flagged as breaking** in the Change History (field 29); the
  relaxed version-number convention does not relax the disclosure requirement.
- A template is expected to reach **`1.0.0`** at the point it becomes `VALIDATED`. From
  `1.0.0` onward, the strict MAJOR/MINOR/PATCH contract applies, and
  `PRODUCTION-READY`/`STANDARD` templates must honor it exactly so developers can trust
  automatic minor/patch upgrades.

### Coexisting versions

A `MAJOR` version bump on a `PRODUCTION-READY` or `STANDARD` template does not delete
the prior major version. The previous major version is kept available and enters
`DEPRECATED` on its own timeline (per [Template Statuses](#template-statuses)), with a
migration guide in [`developer-handoff/`](../developer-handoff/), so existing configured
experiences are not broken out from under them.

### Recording a version

Every version bump — regardless of size — requires:

1. A new entry in [`versioning/registry/`](../versioning/registry/) recording the
   version, date, and whether it was breaking.
2. A new entry in [`versioning/changelogs/`](../versioning/changelogs/) and the
   template's own Change History (field 29) describing what changed and why.
3. For a `MAJOR` bump: a migration guide in
   [`developer-handoff/`](../developer-handoff/) describing how existing consumers
   adapt.

---

## Breaking vs. Non-Breaking Changes

A change to a template is **breaking** if an existing, unmodified consumer (a
configured experience, or a developer's direct integration) would behave differently,
fail, or need to change something to keep working. A change is **non-breaking** if
every existing consumer keeps working, unmodified, exactly as before.

### Breaking (requires MAJOR)

- Renaming or removing a configuration parameter (field 18).
- Changing a configuration parameter's meaning, type, or default in a way that changes
  existing behavior.
- Changing the required data schema (field 20) in an incompatible way (e.g. a field
  changes type, a previously optional field becomes required).
- Changing the API contract (field 21) shape in an incompatible way.
- Removing a previously supported state (field 14), interaction (field 13), or
  supported module (field 8).
- Changing default visual or behavioral output in a way that alters how existing
  configured instances render or function, without an opt-in.
- Raising a minimum dependency version (fields 22/23) in a way that existing consumers
  cannot satisfy without their own changes.

### Non-Breaking (MINOR or PATCH)

- Adding a new, optional configuration parameter with a default that preserves current
  behavior.
- Adding a new supported state, interaction, module, or persona without altering
  existing ones.
- Adding an optional data field that consumers may ignore.
- Expanding accessibility or responsive support without changing existing behavior at
  already-supported breakpoints/conditions.
- Bug fixes, performance improvements, and documentation corrections that don't touch
  the configuration, data, or API contract (PATCH).

### When it's ambiguous

If it is unclear whether a change is breaking, treat it as breaking. Per
[`CLAUDE.md`](../CLAUDE.md) Section 3's conflict rule, Claude must not silently decide
this either way when genuinely ambiguous — it should state the ambiguity and the two
possible classifications, and ask the Template Owner to confirm before the version is
cut.

---

## File Layout

Each template's full record and implementation lives together under
[`experience-library/templates/`](../experience-library/templates/), one directory per
Template ID:

```
experience-library/templates/<template-id>/
├── template.md          # The Template Record — all 30 fields from this spec
├── src/                 # Frontend implementation (once built; not created at DRAFT)
├── examples/             # Configured usage examples (field 25)
└── docs/                 # Any template-specific documentation beyond template.md
```

`template.md` is expected to follow the 30-field structure of this specification, in
order, using the field names above as headings. [`experience-library/catalog/`](../experience-library/catalog/)
holds the searchable index (ID, name, category, status, version, owner) generated from
every `template.md`, so Claude can search the catalog first without reading every
template in full — per the Context Rule in [`CLAUDE.md`](../CLAUDE.md).

No template code, catalog entries, or example templates are created by this document —
this is the specification only, per the scope of this task.
