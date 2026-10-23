# Implementation Notes — FYNXT-TPL-LIST-002 (Table List) Pilot

This documents what was actually built during the implementation pilot (Step 9),
against [`docs/golden-template-list-specification.md`](../../../../docs/golden-template-list-specification.md)
Revision 2. Per that task's Section 15/16: this does not promote the template, does
not silently change the specification, and reports any conflict discovered rather
than resolving it unilaterally — see "Architecture findings" below.

**Revision note (Step 9B):** the sections below describe the state of the pilot as of
Step 9. Step 9B ("FYNXT Visual & Table Pattern Alignment") changed several things they
describe — most notably, `src/patterns/DefaultRowActionsMenu.tsx` was replaced by
`src/patterns/RowActionsPattern.tsx`, test count grew from 14 to 26, and a visual token
layer was added. Rather than rewrite this history, the Step 9 sections are left as
written and a dedicated **Step 9B** section is appended below with everything that
changed. Where a Step 9 section below is superseded, it says so inline.

## Repository inspection (Step 1)

Before writing anything, the repository was inspected for an existing frontend
baseline. Result: **none exists.** `frontend/` contains only scaffolding
`README.md` files; there is no `package.json`, `tsconfig.json`, build config, or any
other frontend tooling anywhere in the repository. Node (`v24.14.0`) and npm
(`11.9.0`) are available on the machine.

**Baseline established for this pilot** (smallest appropriate, per the task's
instruction to establish one when none exists):

| Concern | Choice | Why |
|---|---|---|
| Language | TypeScript, `strict: true` | Required by [`CLAUDE.md`](../../../../CLAUDE.md) Section 20 ("Typed... no silent `any`") and [`docs/template-specification.md`](../../../../docs/template-specification.md) Field 20. |
| UI library | React 18 | The most standard choice for a component-based, accessibility-sensitive template with no existing precedent to follow; not a business decision this pilot is authorized to make permanently — see "What requires Developer Approval" in Revision 2. |
| Build/test tooling | Vite + Vitest + Testing Library | Smallest modern toolchain that supports both a dev preview and a real jsdom test run without extra configuration. |
| State management | None (React state only) | Nothing in the configuration surface needs more; adding one would violate [`CLAUDE.md`](../../../../CLAUDE.md) Section 20 ("do not introduce a new framework/state-management library... when an established one already covers the need" — here, none is needed at all). |
| Styling | Plain CSS, isolated in one file, explicitly marked placeholder | No FYNXT design-system tokens exist (`design-system/tokens/` is scaffolding) — see `src/template/TableList.css`'s header comment. |
| Package manager | npm | Only one available; no existing lockfile precedent to follow. |
| Scope of tooling | Self-contained inside `experience-library/templates/FYNXT-TPL-LIST-002/` (its own `package.json`) | This is the *first* frontend code in the repo. Imposing a root-level monorepo convention was judged out of scope for a pilot — that is itself a decision for whoever owns the real frontend architecture, flagged in Open Questions below, not decided here. |

This is a **Developer Integration Requirement per Revision 2, Section 24** presented
as a working starting point, not a final decision — a real implementation owner may
choose differently.

## What the template owns

(`src/template/`, per Revision 2's Classification Summary)

- Collection rendering (the table itself: `src/template/TableList.tsx`).
- The search entry point (always present unless explicitly disabled).
- Configurable columns (`ListConfig.columns`).
- Pagination support (composed via `src/patterns/DefaultPagination.tsx`, swappable).
- Configurable selection (`ListConfig.selection`) and the fixed
  selection-gates-bulk-actions relationship.
- Configurable row actions and bulk-action integration, drawn from whatever the host
  configures — never invented (`src/template/types.ts`'s `ListAction`).
- Configurable sorting (click-to-sort on columns marked `sortable`).
- The baseline state model — `loading`, `success`, `empty`, `error` fully implemented;
  `partial-error` implemented specifically for bulk-action execution;
  `disabled`/`read-only` implemented as first-class configuration
  (`ListConfig.disabled` / `ListConfig.readOnly`) — see "States" below.
- An accessibility baseline (see "Accessibility checks actually performed").
- Extension-point contracts: `dataAdapter` (required), `permissionCheck` (optional,
  defaults to allow-all with an explicit pilot-only warning in code comments).

## What configuration owns

Everything in `ListConfig` (`src/template/types.ts`): `entity`, `columns`, `search`,
`sorting`, `pagination`, `selection`, `rowActions`, `bulkActions`, `viewTabs`,
`insights`, `quickFilters`/`advancedFilters`/`manageColumns`/`savedViews` (each an
enable/disable + render slot), `states` (copy), `disabled`, `readOnly`,
`permissionCheck`, `dataAdapter`. Every optional capability defaults to **off**
except `search` and `pagination` — verified directly by Test A (see "Test coverage").

## What patterns own

Per Revision 2's Pattern Boundary Architecture, the template does not implement:

- **Quick Filters, Advanced Filters, Manage Columns, Saved Views** — rendered only as
  labeled extension-point placeholders (`renderOptionalSlot` in `TableList.tsx`) when
  enabled and no `render` function is supplied. No internal behavior exists for any
  of these in this pilot, by design — implementing them was explicitly out of scope
  (implementation task, Section 9).
- **Metrics/Insights** — same treatment; the template renders whatever `insights.render()`
  returns, or a placeholder.
- **Row Actions, Bulk Action Bar, Pagination** — these *do* have small default
  implementations (`src/patterns/RowActionsPattern.tsx` — superseding the Step 9
  `DefaultRowActionsMenu.tsx`, see Step 9B below — `DefaultBulkActionBar.tsx`,
  `DefaultPagination.tsx`) so the template is usable out of the box, but each is a
  separate module, swappable via `TableList`'s `renderRowActions` /
  `renderBulkActionBar` props (Pagination is swappable by editing `TableList.tsx`'s
  single call site — a real Pagination pattern would need its own prop, noted in Open
  Questions). None of these defaults claim to be "the" Row Actions / Bulk Action Bar /
  Pagination pattern — see each file's header comment.

## What developers must provide

- A real `dataAdapter` (the shipped one, `src/data/mockAdapterFactory.ts`, is
  explicitly marked MOCK and must not reach production).
- A real `permissionCheck` — the default allows everything, which is a pilot
  convenience, never a policy.
- Real implementations of Quick Filters, Advanced Filters, Manage Columns, Saved
  Views, and Metrics, once those patterns are specified and registered.
- Real FYNXT design-system tokens in place of `TableList.css`'s placeholder values.
- Confirmation of the frontend technology baseline (this pilot chose one; a real
  implementation owner may not agree — see Open Questions).
- Real responsive breakpoints (see "Responsive checks actually performed").

## States

Per the implementation task's required format:

| State | Status | Notes |
|---|---|---|
| `loading` | **IMPLEMENTED** | `role="status"` + `aria-live="polite"`; verified by Test E. |
| `success` | **IMPLEMENTED** | The table renders; verified by Tests A–D. |
| `empty` | **IMPLEMENTED** | Zero-record responses are reclassified as `empty` by `useListData.ts`; verified by Test F. Visual treatment is a placeholder pending real product copy (Revision 2, Section 21's caveat: the Deals Kanban empty-state visual is not reused here — this is the template's own, distinct, table-oriented treatment). |
| `error` | **IMPLEMENTED** | `role="alert"` + a working Retry action that re-invokes the adapter; verified by Test G. |
| `partial-error` | **PARTIALLY IMPLEMENTED** | Modeled only for bulk-action execution (`ListAction.onSelect` may return `{ failedRecordIds }}`, surfaced as an alert). Not modeled for row-level actions or for partial data-load failures, since nothing in Revision 2 established either as a real scenario — extending this was judged to be inventing behavior, not implementing specified behavior. |
| `disabled` | **IMPLEMENTED** | `ListConfig.disabled` disables search, sorting, pagination controls, and all actions while still showing data. This distinction from `readOnly` is an **implementation decision**, not something Revision 2 defined — flagged in Open Questions. |
| `read-only` | **IMPLEMENTED** | `ListConfig.readOnly` suppresses selection, row actions, and bulk actions entirely and sets `aria-readonly="true"` on the table, regardless of what's configured; verified by Test C. |

## Test coverage — what actually ran

All tests were executed with `npx vitest run`. **Result: 7 test files, 14 tests, all
passing.** Raw output:

```
✓ tests/TableList.responsive.test.tsx  (1 test)
✓ tests/TableList.readonly.test.tsx  (1 test)
✓ tests/TableList.states.test.tsx  (3 tests)
✓ tests/TableList.accessibility.test.tsx  (3 tests)
✓ tests/TableList.selectable.test.tsx  (2 tests)
✓ tests/TableList.minimal.test.tsx  (2 tests)
✓ tests/TableList.differentEntity.test.tsx  (2 tests)

Test Files  7 passed (7)
     Tests  14 passed (14)
```

`npx tsc --noEmit` also ran clean (no type errors) before the test run.

| Required test | File | What it actually checks |
|---|---|---|
| A — Minimal List | `TableList.minimal.test.tsx` | Search/columns/pagination present; selection, bulk actions, insights, view tabs, and every optional pattern slot **absent** — proves conservative defaults. |
| B — Selectable List | `TableList.selectable.test.tsx` | Bulk-action bar hidden until a row is selected, appears with the correct count, invokes the configured (not hardcoded) action, and hides again on deselect; select-all works. |
| C — Read-only List | `TableList.readonly.test.tsx` | With `readOnly: true` and selection/row/bulk actions all configured, none render, and `aria-readonly="true"` is set. |
| D — Different Entity | `TableList.differentEntity.test.tsx` | The real Demo Records example renders its own columns/data with zero Leads vocabulary, zero optional capabilities; the real Leads example renders its own columns/data with its optional capabilities on — proving both are configuration, not template defaults. |
| E — Loading | `TableList.states.test.tsx` | An accessible loading status appears before an intentionally-pending adapter resolves. |
| F — Empty | `TableList.states.test.tsx` | A zero-record adapter response renders the empty-state message, not a table. |
| G — Error | `TableList.states.test.tsx` | A throwing adapter renders an alert; clicking Retry calls the adapter again (verified via call-count assertion, not just "no crash"). |
| H — Responsive | `TableList.responsive.test.tsx` | **Structural check only** — confirms the table sits inside its own horizontally-scrollable container. jsdom cannot evaluate real layout or media queries; see "Responsive checks actually performed" for what was separately verified in a real browser. |
| I — Keyboard accessibility | `TableList.accessibility.test.tsx` | Search input is focusable with an accessible name; the row-action menu opens via `Enter`, exposes `menuitem`s with accessible names, and `Escape` closes it and returns focus to the trigger; selection checkboxes are operable with `Space` and have accessible names. |

## Accessibility checks actually performed

**Not a WCAG 2.1 AA conformance claim.** What was actually validated:

- Semantic table structure (`<table>`, `<thead>`, column headers via `<th scope="col">`).
- Accessible names on every interactive control tested: search input (associated
  `<label>`), select-all and per-row checkboxes (`aria-label`), row-action trigger
  (`aria-label`), pagination Previous/Next (`aria-label`).
- `aria-expanded`/`aria-haspopup` on the row-action menu trigger; `role="menu"` /
  `role="menuitem"` on its contents.
- `aria-sort` on sortable column headers reflecting current sort state.
- `aria-readonly` on the table when `readOnly` is set.
- `role="status"`/`aria-live="polite"` for loading; `role="alert"` for errors and the
  partial-error bulk-action warning.
- Keyboard operability of the row-action menu (open with Enter, close with Escape,
  focus returns to trigger) and of selection checkboxes (Space toggles) — via
  `@testing-library/user-event`'s real keyboard event simulation, not just
  `fireEvent`.
- A visible `:focus-visible` outline rule exists in `TableList.css` and was
  **visually confirmed in a real Chromium-based preview** (`npm run dev`), not only
  asserted structurally — the manual preview harness in `demo/` was actually run for
  this check, alongside a screenshot review of both example configurations.

**Not validated:** screen-reader software was not run against this implementation
(no screen reader available in this environment); color contrast was not measured
against any token (none exist to measure against); focus order across the *entire*
page (as opposed to within specific interactive sequences) was not exhaustively
walked.

## Responsive checks actually performed

The documented strategy (Revision 2, Section 16: `Unknown`, no confirmed breakpoints)
is: the table scrolls horizontally within its own container rather than causing the
page to reflow, isolating the one responsive decision made so it can be replaced by
real FYNXT tokens later (`TableList.css`'s header comment).

**What was actually checked, in a real browser (not just jsdom):** the manual preview
(`npm run dev`) was loaded at a 375×812 viewport (the Browser tool's `mobile` preset).
Both example configurations rendered without page-level horizontal overflow; each
table's own horizontal scrollbar was visible and the visible columns/pagination
controls remained usable. This is a **single-breakpoint smoke check**, not a
comprehensive responsive audit across the range of real devices/breakpoints FYNXT
will eventually need — those breakpoints don't exist yet to test against.

## Known limitations

- The mock data adapter (`src/data/mockAdapterFactory.ts`) is in-memory only —
  explicitly not a real API integration.
- Quick Filters, Advanced Filters, Manage Columns, Saved Views, and Metrics have no
  real behavior — only visible, labeled extension points.
- `partial-error` is modeled for bulk actions only (see "States" above).
- View tabs in the Leads example track active-tab state but do not actually re-scope
  the query — no owner/"my records" concept exists anywhere in this repository to
  wire it to (`leads.config.ts`'s comment).
- The default `permissionCheck` allows everything — a pilot convenience the code
  itself flags as not-a-policy.
- Column resize/reorder, multi-column sort, and saved-view persistence are not
  implemented (none were confirmed capabilities in Revision 2).
- Screen-reader software was not run (see "Accessibility checks actually performed").
- `npm install` reported 4 dev-dependency vulnerabilities (2 moderate, 1 high, 1
  critical) via `npm audit` — all in test/build tooling, not runtime code. Not
  remediated in this pilot (that's a real dependency-management decision, not a
  pilot-scope one); flagged here rather than silently run through `npm audit fix
  --force`, which could change pinned tooling versions unpredictably.

## Assumptions made explicit

- React 18 + TypeScript + Vite/Vitest as the frontend baseline (see "Repository
  inspection" table) — presented as a starting point, not a binding decision.
- `DEFAULT_PAGE_SIZE = 20` (`src/template/types.ts`) — an implementation default,
  not a confirmed FYNXT business default (Revision 2 left `pageSize`'s default
  explicitly `Unknown`).
- The `disabled` vs. `readOnly` distinction (temporary non-interactivity vs.
  permanent no-mutation) is this pilot's own interpretation — Revision 2 didn't
  define the difference, only that both states must be supportable.
- Bulk-action results use a `{ failedRecordIds: string[] }` convention to signal
  partial failure — invented here as the smallest workable shape, since no such
  convention existed anywhere in the source material.

## Architecture findings

No stop condition was triggered. Specifically:

- A usable frontend environment **did not** pre-exist, but the task's own
  instructions anticipated this and authorized establishing the smallest one — done,
  documented above, not silently assumed.
- No conflict was found between the repository's governance documents and Revision 2.
- Every configuration in Revision 2's schema was implementable without hardcoding
  entity behavior — proven by the Demo Records contrast configuration passing every
  test the Leads configuration passes, with zero shared vocabulary.
- The state model (7 baseline states) was representable cleanly; the only genuine
  ambiguity was `disabled` vs. `readOnly`, resolved by explicit, documented
  assumption rather than silently picking one meaning.
- The template/pattern boundary (Table List owns vs. composes) was practical to
  implement — the extension-point-placeholder approach (`renderOptionalSlot`) made
  the boundary visible in the running UI, not just in documentation.
- No business rule, permission policy, or FYNXT design-system token had to be
  invented to make the pilot function — every place one would be needed is an
  explicit extension point with a documented pilot-only default.
- One minor, pre-existing spec ambiguity was found and is recorded (not silently
  resolved by editing Revision 2): whether `Pagination`, being both an "invariant
  infrastructure" element and a "separate pattern" per the Pattern Boundary
  Architecture diagram, should get its own `renderPagination` swap-in prop the way
  Row Actions and Bulk Actions do. This pilot did not add one, since Revision 2 does
  not require it — noted as an open question below rather than assumed.

## Open questions surfaced by implementation

- Should `TableList` expose a `renderPagination` prop symmetrical with
  `renderRowActions`/`renderBulkActionBar`, given Pagination is classified as a
  separate pattern in Revision 2's Pattern Boundary Architecture? Not added in this
  pilot; flagged for the real pattern-registration decision.
- Is a self-contained `package.json` per template the right long-term convention, or
  should the repository adopt a root-level frontend workspace once more templates
  exist? Not decided here.
- Should the mock adapter factory (`src/data/mockAdapterFactory.ts`) graduate into a
  shared testing utility once a second template exists, or stay pilot-only and get
  deleted before real registration?
- The `disabled`/`readOnly` distinction this pilot invented should be reviewed by a
  Product Designer against Revision 2's intent before being treated as settled.

None of these block review of this pilot; they are the natural next round of
questions this kind of exercise is supposed to surface.

---

# Step 9B — FYNXT Visual & Table Pattern Alignment

Everything below is new work on top of Step 9, against
[`docs/visual-alignment-audit.md`](../../../../docs/visual-alignment-audit.md) (new in
this step) and the Step 9B task instructions. Nothing above this line was rewritten;
where it's superseded, it says so.

## What changed

1. **A visual audit was written first**
   ([`docs/visual-alignment-audit.md`](../../../../docs/visual-alignment-audit.md)),
   re-inspecting the same, already-approved Leads Figma frame (no scope expansion) for
   typography/color/layout/component/shape characteristics, classified `OBSERVED` /
   `ASSUMED` / `UNKNOWN` — never `FORMALLY DEFINED`, since no FYNXT design-system
   source exists in this repository.
2. **A pilot token layer** (`src/template/TableList.tokens.css`, explicitly marked
   `PILOT IMPLEMENTATION TOKENS — NOT YET FORMAL FYNXT DESIGN SYSTEM TOKENS`) was added,
   with every value tracing back to a row in the audit.
3. **`TableList.css` was rewritten** to consume those tokens instead of hardcoded
   placeholder values, and to add hover/selected/disabled row styling and frozen-column
   support.
4. **A generic `Tag` component** (`src/template/Tag.tsx`) was added — status/tag
   badges were audited and token-defined but nothing had actually been rendering them.
   `Tag` only knows five semantic tones (`info`/`warning`/`neutral`/`success`/`danger`);
   mapping a real entity's own vocabulary (e.g. Leads' status strings) onto those tones
   lives in that entity's own example config
   (`examples/leads/leads.config.tsx`, renamed from `.ts` because it now contains
   JSX), never in the template.
5. **The FYNXT Table Row Action Rule was implemented for real**
   (`src/patterns/RowActionsPattern.tsx`, replacing `DefaultRowActionsMenu.tsx`) — see
   "Table Action Rule" below.
6. **Frozen columns were implemented** in `TableList.tsx` (checkbox + first data
   column on the left, action column on the right, via CSS `position: sticky`) — see
   "Frozen Columns" below.
7. **12 new tests** were added (`TableList.rowActions.test.tsx`,
   `TableList.frozenColumns.test.tsx`, plus two rewritten cases in
   `TableList.accessibility.test.tsx`) — 26 tests across 9 files now pass (was 14
   across 7).
8. **The manual preview harness** (`demo/main.tsx`) gained state toggles (success/
   empty/error/loading, disabled, readOnly) so non-success states could be visually
   inspected, not just tested in jsdom.

## Table Action Rule

Implemented in `src/patterns/RowActionsPattern.tsx` as a single ordering function
(`orderActions`) plus a fixed "first 2 slots direct, rest overflow" cut:

- **0 actions:** `TableList.tsx` renders no action column at all (unchanged from
  Step 9 — this was always correct, since it only renders the column when
  `effectiveRowActions.length > 0`).
- **1 action:** rendered as a single direct button.
- **2 actions:** both rendered as direct buttons, no overflow.
- **3+ actions:** the top 2 (by priority) render as direct buttons; the rest go into
  an overflow (`⋮`) menu.
- **View priority:** an action explicitly marked `isView: true` (never inferred from
  its `key`/`label`) is always placed first, ahead of any other ordering — it then
  "spends" one of the two direct-visibility slots, which is exactly the specified
  behavior (`[View]` alone; `[View][Other]` for one more; `[View][Next][⋮]` for two or
  more).
- **Priority/order:** an optional `ListAction.priority` (lower = higher) determines
  order among non-View actions; when omitted, the action's position in the configured
  array is its priority — a documented default, not an arbitrary inference, per the
  explicit instruction not to determine priority "arbitrarily from array position."
- **Ordering is entirely mechanical** — `RowActionsPattern` has no idea what "Delete"
  or "Archive" means; it only reads `isView`/`priority`/array order. This is the
  concrete implementation of the Row Action Pattern Boundary (Revision 2 / the Step
  9B instructions): `TableList.tsx` still does zero action-count math — it just
  passes the (already permission-filtered) action array straight through.

All six required test cases (A–F) pass — see `TableList.rowActions.test.tsx` and "Test
coverage" below. The real Leads example (`examples/leads/leads.config.tsx`) now
explicitly marks `viewDetails` as `isView: true`; visually confirmed in the browser
preview to render `[View Details][Edit Lead][⋮]` with `Send Email`/`Call`/`Convert to
Contact`/`Delete` in the overflow menu — Case C's shape, for a real reason (an
explicit `isView` flag) rather than by coincidence of array order.

## Frozen Columns

Implemented with CSS `position: sticky` (`TableList.tsx` + `.tpl-list__cell--frozen-left`
/ `.tpl-list__cell--frozen-right` in `TableList.css`) rather than splitting the markup
into separate synchronized tables:

- **Checkbox column** (when `selection.enabled`): `left: 0`.
- **First data column** (`columns[0]`, always): `left: 0` if no checkbox column, or
  `left: var(--tpl-control-column-width)` if there is one — computed once
  (`firstColumnLeftOffset`) and applied via inline `style`, not duplicated CSS rules.
- **Action column** (when any row action is configured): `right: 0`.
- All other columns remain in the normal scrollable flow inside
  `.tpl-list__table-scroll` (`overflow-x: auto`).
- Frozen cells repaint their own background per row (including on hover/selected) so
  scrolled content never shows through underneath them, with a 1px shadow marking the
  frozen/scrollable boundary (the one shadow used anywhere in this implementation —
  functional, not decorative; the audit found no shadows in the source evidence).

Because `position: sticky` doesn't change DOM order, **keyboard/tab order is
unaffected** — no special-casing was needed to keep it logical.

All four required combinations (Section 16) are covered by
`TableList.frozenColumns.test.tsx` and were additionally confirmed by scrolling the
real Leads table horizontally in the browser preview in both directions: the checkbox
and Name column stayed in place; Contact Number/Email scrolled away and Type/Status/
Executed On scrolled into view; the action column (`View Details`/`Edit Lead`/`⋮`)
stayed pinned to the right edge throughout.

## Test coverage — updated

`npx vitest run`: **9 test files, 26 tests, all passing.**

```
✓ tests/TableList.minimal.test.tsx  (2 tests)
✓ tests/TableList.states.test.tsx  (3 tests)
✓ tests/TableList.selectable.test.tsx  (2 tests)
✓ tests/TableList.frozenColumns.test.tsx  (5 tests)
✓ tests/TableList.differentEntity.test.tsx  (2 tests)
✓ tests/TableList.accessibility.test.tsx  (4 tests)
✓ tests/TableList.rowActions.test.tsx  (6 tests)
✓ tests/TableList.readonly.test.tsx  (1 test)
✓ tests/TableList.responsive.test.tsx  (1 test)

Test Files  9 passed (9)
     Tests  26 passed (26)
```

`npx tsc --noEmit` ran clean both immediately after the refactor and again as a final
check before this report.

`TableList.accessibility.test.tsx`'s original single-action keyboard test had to be
rewritten: under the new Row Action Rule, 1 configured action renders as a *direct*
button, not an overflow trigger, so the old assertion (`getByRole("button", {name:
/actions for rec-1/i})`) no longer matched anything. It's now two tests — direct-button
keyboard operability, and (using a 3-action config) overflow-menu keyboard operability
— rather than one test of a case that no longer exists.

## Visual QA actually performed

Per Section 14, in the running browser preview (`npm run dev`, not just jsdom):

1. Leads example, `success` state — colored status tags (`Tag` component) render
   correctly against the token mapping (`New Lead`/`Contacted` = info/blue,
   `Contact Attempted` = warning/amber, `Qualified` = success/green), view tabs with
   an underlined active tab, pill-shaped search input, pipe-separated extension-point
   placeholders for Insights/Quick Filters/Advanced Filters/Manage Columns.
2. Demo Records example — different columns, no checkboxes, no insights, no view
   tabs, both of its 2 row actions rendered directly (no overflow) — visually distinct
   from Leads, confirming configuration rather than template defaults.
3. Horizontal table scroll tested in both directions on the Leads table — frozen
   columns confirmed visually (not just structurally) in a real browser, per "Frozen
   Columns" above.
4. Selection: clicking a row checkbox shows a tinted selected-row background
   (including on the frozen Name cell) and reveals the bulk-action bar ("N selected" +
   Archive/Export Data); select-all was also exercised.
5. Row-action overflow menu (Case C shape) opened correctly for a Leads row.
6. `error` state: red-bordered alert with "Something went wrong." / the mock
   adapter's message.
7. `empty` state: "No leads found / There are no records to show yet.", with
   pagination correctly showing "0 results" and disabled Previous/Next.
8. `disabled` state: search input, Search button, and pagination controls visibly
   dimmed and inert.
9. `readOnly` state: checkbox column and action column both absent entirely, even
   though the config being previewed has `selection.enabled` and `rowActions` set —
   confirmed visually, not just by the (already-passing) automated test.
10. Pagination visual treatment: current-page indicator rendered as a filled navy
    badge, matching the audit's observed pagination style.
11. Mobile viewport (375×812, the Browser tool's `mobile` preset): no page-level
    horizontal overflow; the Leads table's frozen Name/Actions columns stayed visible
    with the scrollable columns hidden until scrolled, exactly as on desktop, just
    narrower.

**Not done:** pixel-perfect comparison against the Figma frame (explicitly out of
scope — "do not claim pixel-perfect matching"), cross-browser checks (only the
Browser tool's Chromium-based pane was used), and hover-state screenshotting (hover
was implemented and is exercised by CSS `:hover` rules but wasn't separately
screenshotted, since jsdom/automation can't reliably simulate a persistent mouse-hover
frame the way a human moving a real cursor can).

## Known limitations — additions

- The Status column's tone mapping in `leads.config.tsx` (`New Lead`/`Contacted` →
  info, `Contact Attempted` → warning, `Qualified` → success, `Unqualified`/`Inactive`
  → neutral) is this pilot's own judgment call for `Unqualified`, made because the
  audit flagged its observed color as visually ambiguous with `Qualified`'s green in
  the source frame — deliberately mapped to a *different*, more neutral tone rather
  than guessing which shade of green was "correct."
- `Tag`'s `danger` tone (`--tpl-tag-danger-bg`/`text`) has no real caller anywhere in
  this pilot — no red/danger status was observed in the audited frame, so the token
  exists (for completeness of the five-tone system) but is unexercised and unverified
  against any real evidence.
- Only one shadow value exists anywhere in the implementation
  (`--tpl-shadow-popover`, used solely by the row-action overflow menu) — explicitly
  because the audit found no shadows in the source evidence; everything else uses
  borders, matching what was actually observed.
- Hover state (`--tpl-color-hover-bg`) is `ASSUMED`, not `OBSERVED` — a static Figma
  frame cannot show a hover state — and its exact shade is this pilot's own choice
  within the neutral-gray family already established by the other tokens.
- The frozen-column checkbox/action widths (`--tpl-control-column-width`,
  `--tpl-action-column-width`) are `ASSUMED` — not measurable from the audited frame
  — chosen only to comfortably fit their contents.

## Architecture findings — Step 9B

No stop condition was triggered in this step either. One thing worth naming
explicitly: implementing the FYNXT Table Row Action Rule required a genuine (small)
extension to the `ListAction` contract (`isView`, `priority`). This is a configuration
*schema* addition, not new template *behavior* — the algorithm that consumes those
fields lives entirely in `RowActionsPattern.tsx` (a pattern, per the Row Action
Pattern Boundary), and `TableList.tsx` itself gained zero row-action logic. This was
judged consistent with "the smallest clean contract" instruction rather than a
silent architecture change, but it's called out here explicitly rather than left
implicit, since it does widen `ListConfig`'s surface area slightly beyond what Step 9
shipped.

## Open questions — additions

- Should `Tag`'s tone vocabulary be exactly these five buckets
  (`info`/`warning`/`neutral`/`success`/`danger`), or does a real FYNXT design system
  define a different set once one exists?
- Is the `Unqualified` → `neutral` mapping in `leads.config.tsx` correct, or does the
  ambiguity flagged in the visual audit need a Product Designer's actual answer from
  the source Figma file (e.g. via Dev Mode access this session didn't have)?
- Should `--tpl-control-column-width`/`--tpl-action-column-width` become configurable
  per instance, or is a single pilot-wide default acceptable until real content
  density requirements are known?

## Step 9B(ii) — FDS-101 token correction

The Product Designer flagged that the pilot still didn't reflect FYNXT's actual
tokens/variables and provided the FDS-101 design-system Figma file
(`https://www.figma.com/design/3c44QQCA8h7GTZYH2EWn8H/FDS-101`, page
"00 · Foundations — Tokens") as the source for tokens specifically — superseding the
earlier Sales-Module-screen-derived approximations for color, typography, radius, and
spacing. `docs/visual-alignment-audit.md` gained a "Formal FYNXT Design System Tokens
(FDS-101)" section transcribing what that page actually defines, and
`TableList.tokens.css` was rewritten against it. What changed:

- **Primary/accent color** corrected to `#002666` (navy/500) — the earlier
  Sales-Module-derived value was close but not exact (self-caught transcription error
  at 50% Figma zoom, re-verified at 100%; documented in the audit as the reason
  nothing here is treated as byte-exact without a real token export).
- **Typography** split into two families per FDS-101's own distinction: Sora for
  headings/titles/button text, Lexend for body copy/labels/inputs — previously a
  single family was used everywhere. Font weights were remapped from invented
  Medium/Semibold (500/600) to FDS-101's actual three-weight scale (Light 300 /
  Regular 400 / Bold 700); `--tpl-font-weight-medium`/`--tpl-font-weight-semibold`
  keep their names for back-compat but now resolve to 400/700.
- **Danger token split**: FDS-101 defines `error` (red/500, `#ef4444`) and
  `destructive` (red/600, `#e5381d`) as two distinct tokens, not one. The pilot's
  single `--tpl-color-danger` was replaced with `--tpl-color-error` (status/alert
  text — `.tpl-list__status--error`) and `--tpl-color-destructive` (destructive
  action buttons/menu items — every `[data-destructive="true"]` selector).
- **Border radius** corrected to FDS-101's actual scale (`sm:2px / default:4px /
  md:6px / lg:8px / xl:12px / pill:9999px`).

`TableList.css` was then updated to consume the corrected/renamed tokens: the base
`.tpl-list` font-family changed from `--tpl-font-family` to `--tpl-font-family-body`
(Lexend), with `--tpl-font-family` (Sora) applied explicitly to `.tpl-list__title`
and every button-rendering class (`.tpl-list__button`, bulk-bar buttons, row-action
direct/overflow buttons, pagination buttons) — matching FDS-101's documented
heading/button-text vs. body-copy split. Every `var(--tpl-color-danger)` reference
was replaced with `--tpl-color-error` or `--tpl-color-destructive` per its actual
semantic use. No component markup, layout, or logic changed — this was a pure
token-consumption fix, consistent with the tokens file being isolated specifically so
this kind of correction stays a CSS-only change.

Verification performed: `npx tsc --noEmit` (clean), `npx vitest run` (26/26 passing,
unchanged from before this fix — expected, since no test asserts computed CSS
values), and a fresh browser visual pass against the running preview confirming the
navy pagination badge, the Sora/Lexend visual split between the "Leads" title and the
tab/body text, and the tag color tints all render as specified. Destructive-action
styling (`Delete` menu item) was verified by code + the existing automated
row-actions test coverage; a live-DOM screenshot of the open overflow menu itself
was not obtained (coordinate-based clicks on the popover were unreliable in this
pass) and remains open for a Product Designer's own manual check.

Values still marked `ASSUMED` in the tokens file are unchanged by this pass —
FDS-101's Tokens page did not define hover states, focus color, selected-row tint,
shadow parameters, or control-height/table-density values, so the pilot's own
prior choices for those remain in place, now clearly distinguished in the file's
comments from the values that do trace to FDS-101.

## Step 9B — FYNXT Visual & Table Pattern Alignment, re-run with Figma Dev Mode access

A second Step 9B pass was run after the Figma Dev Mode MCP server became available
in this session (tools named `mcp__d38632ef-...__*`), connected to a live Figma
desktop session — unlike every prior pass, which relied on a person (or model)
reading rendered screenshots. This gave real node text/component markup instead of
estimated pixel values. Full detail, including the exact node IDs read and every
corrected value, is in
[`../../../../docs/visual-fidelity-gap-analysis.md`](../../../../docs/visual-fidelity-gap-analysis.md)
(repo-root `docs/`, alongside the original `visual-alignment-audit.md`); this section
summarizes what changed in this template's own files.

**Token corrections** (`TableList.tokens.css`): font weights were wrong in the prior
pass (a screenshot mis-read collapsed FDS-101's real 5-step Medium/Semibold 500/600
scale into 400/700 — now corrected); the popover shadow is now FDS-101's exact
`shadow-md` CSS instead of an invented approximation; row/header height corrected
from assumed 52px/40px to the real Leads evidence's 44px/44px; the frozen action
column corrected from an assumed 56px to the real 61px; new tokens added for
toolbar/chip/pagination/search sizing, all traced to real Leads measurements
(`--tpl-toolbar-height`, `--tpl-chip-height`, `--tpl-control-height-xs`,
`--tpl-pagination-current-size`, `--tpl-search-min-width`); a `--tpl-color-text-muted`
token was added (FDS-101's `muted` token, not previously consumed).

**A genuine FDS-101 self-conflict was found and flagged, not silently resolved**:
FDS-101's Typography section says Sora covers "button text," but the real Button
component (`get_design_context` on nodes `61:3`/`61:66`) is implemented in
`Lexend:Medium` at `13px`. This pilot followed the actual component over the
descriptive text (higher-fidelity evidence) and switched every button class
(`.tpl-list__button`, bulk-bar/row-action/pagination buttons) from Sora to Lexend
with the new `--tpl-font-size-button` (13px) token. Sora remains on
`.tpl-list__title` only, where nothing contradicts it. This is called out explicitly
in the gap analysis as an open question for the Product Designer — this pilot did
not decide FDS-101 is wrong, only that it disagrees with itself.

**Toolbar and Insights rebuilt to match the real Leads composition** (`TableList.tsx`,
`TableList.css`): the toolbar was previously two stacked full-width dashed boxes plus
a separate search row — genuinely different from the real Leads `TableFilterBar`,
which is one 56px-tall bordered row with filter chips on the left and search/utility
icons on the right. `TableList.tsx` now renders `.tpl-list__narrowing-left` /
`-right` wrapper groups (`quickFilters` on the left; search, `advancedFilters`,
`manageColumns`, `savedViews` on the right), each conditionally rendered so an empty
side — or the whole toolbar — never renders an empty container (Section 26). The
extension-point placeholders (`renderOptionalSlot`) changed from full-sentence
italic text in a dashed box to small dashed pill chips showing just the capability
name, with the longer "— pattern not yet implemented" text moved to a `title`
tooltip instead of dominating the visible surface. Insights shrank from a large
dashed box with a full sentence to a slim single-line bar (label + summary,
Section 12's "lightweight FYNXT-aligned representation," not the full Metrics
pattern).

**Row actions and pagination resized** (`TableList.css`, `DefaultPagination.tsx`):
row-action direct/overflow buttons shrank from `--tpl-control-height-sm` (32px) to
the new `--tpl-control-height-xs` (24px), matching the real Leads row-action icon
size relative to a 44px row. Pagination was rebuilt from a left-aligned row of
text-labeled "Previous"/"Next" buttons to a right-aligned cluster of compact icon
buttons (`‹`/`›`) and a 28px current-page pill, matching the real Leads pager
exactly in structure (though the pilot's own choice of `‹`/`›` glyphs over a real
FYNXT icon remains a Section 18 limitation, unchanged).

**Developer harness separated from the product surface** (`demo/main.tsx`): the
harness previously used plain, unstyled `<h1>` elements ("Leads (example
configuration)", "Demo Records (contrast configuration)") that visually competed
with the real `.tpl-list__title` "Leads" heading directly beneath them. The harness
now renders in a small monospace, muted, dashed-boundary style using none of the
FYNXT tokens — unambiguously tooling, not product (Section 7).

**Hardcoded-value cleanup** (Section 28): `.tpl-list__search`'s `min-width: 220px`
was both untokenized and factually wrong — corrected to `--tpl-search-min-width:
208px` (the real Leads search input width). The frozen-column separator's
`box-shadow: 1px 0 0 ...` / `-1px 0 0 ...` now reuses `var(--tpl-border-width)`
instead of a duplicated literal. The tag's `padding: 2px ...` became
`--tpl-tag-padding-y`. The remaining literals (`min-width: 160px` on the overflow
menu, the sr-only label's `1px` pattern, the `2px` focus outline, the `640px`
breakpoint) have no FDS-101 or Leads-reference source and are left as documented
ASSUMED/IMPLEMENTATION-SPECIFIC values — full accounting in the gap analysis's
hardcoded-value audit table.

**Genericity re-verified** (Section 29): re-ran the full grep across
`src/template/`, `src/patterns/`, and `src/index.ts` after every edit above. Every
match for Lead/Sales Person/Hot/Warm/Cold/etc. is inside a comment explaining why
the template stays generic or citing Leads Figma evidence for a token value — no
entity-specific identifier, literal, or default leaked into template/pattern code.

**Verification**: `npx tsc --noEmit` clean; `npx vitest run` 26/26 passing
(unchanged — no test asserts computed CSS values or exact pixel sizes, so this was a
visual-only change set); a fresh desktop (1440×900) and mobile (375×812) browser
pass confirmed the corrected density, toolbar composition, insights bar, pagination,
and dev-harness separation render as specified, plus computed-style spot checks
(`getComputedStyle`) confirming `44px` row height, `Lexend` button font, `Sora`
title font, `rgb(0, 38, 102)` (`#002666`) page badge, and `56px` toolbar height are
actually applied, not just present in source. Success/empty/error states were
re-checked visually; loading was not re-screenshotted this pass (unchanged
structurally from the prior pass, which did verify it). The open overflow menu's
popover was not captured live in the browser this pass either (same coordinate-click
reliability issue as the prior pass) — its correctness rests on the existing
automated row-actions test suite (6 cases, all passing), not a fresh screenshot.

**Architecture**: no architectural change. Every edit this pass was CSS/token/markup
inside the already-approved template/pattern/example boundary — no new capability
was implemented, no template-owned behavior was added, and the `ListConfig`
contract's shape didn't change (only two example-content strings in
`leads.config.tsx` were shortened for the new slimmer toolbar/insights treatment).

## Step 9B — final visual correction round (button typography, container, icons)

A follow-up round required resolving three specific things left open by the
previous pass, using real Figma Dev Mode evidence rather than assumption. Full
evidence is in
[`../../../../docs/visual-fidelity-gap-analysis.md`](../../../../docs/visual-fidelity-gap-analysis.md);
this section summarizes the resulting code changes.

**1. Button typography — resolved, not guessed.** Re-checked the real FDS-101
Button component across 5 variants/sizes (Primary/Secondary/Ghost/Destructive at
Size S, Primary at Size M) via `get_design_context`. All 5 are unanimous:
`Lexend:Medium`, never Sora — confirming the prior pass's choice was correct, now
with much stronger evidence (5 samples instead of 2) and no remaining open
question. No code change was needed here beyond documentation, since the prior
pass had already switched buttons to Lexend.

**2. Toolbar + table container — fused, per real evidence.** `get_design_context`
on the real Leads `DataTableWithFilters` (not just `get_metadata`, which only gives
positions) showed it is one continuous card: a single border, `radius/lg` (8px —
this pilot had been using `radius/md`, 6px), and one drop-shadow, with the toolbar
separated from the table by only a thin internal `border-bottom` (not its own box).
Implemented as a new `.tpl-list__collection` wrapper (`TableList.tsx`,
`TableList.css`) around the toolbar, any bulk-action warning, the
loading/error/empty/success state, and pagination — all of which lost their own
independent border/radius/background. A new `--tpl-shadow-card` token holds the
real drop-shadow value. The toolbar-to-content divider uses `border-light`
(`#f3f4f6`) and the table-to-pagination divider uses the stronger `border-default`
(`#e5e7eb`) — matching the real evidence's two genuinely different divider weights
exactly, rather than collapsing them to one.

**3. Iconography — a real, named FDS-101 icon set exists and is now used.**
`get_metadata` on FDS-101's "01 · Primitives — Icons" page revealed real, reusable,
named icon components (`icon/chevron-left`, `icon/more-vertical`, `icon/search`,
`icon/filter`, `icon/columns-3`, and others) — not the anonymous, unnamed vector
shapes the Leads reference itself uses for its own icons. `get_design_context` on
each relevant icon node gave exact SVG path data, downloaded and copied verbatim
into a new `src/template/icons.tsx` (6 components, `stroke="currentColor"` in place
of FDS-101's literal `#404040` so each icon inherits its button's text color).
Wired in: `DefaultPagination.tsx`'s `‹`/`›` → `IconChevronLeft`/`IconChevronRight`;
`RowActionsPattern.tsx`'s `⋮` → `IconMoreVertical`; `TableList.tsx`'s search input
gained a leading `IconSearch`, and the Quick Filters/Advanced Filters/Manage
Columns extension-point pills gained `IconFilter`/`IconFilter`/`IconColumns3`.
`Saved Views` remains icon-less (no confidently-matched FDS-101 icon name found
without expanding the search past this round's scope) — unchanged from before,
not a regression.

**Incidental fix found while re-touching pagination:** the real Leads pagination
text ("Rows per page:", "1-7 of 7") is Lexend:Regular 12px in `#9ca3af` — exactly
FDS-101's `muted` token (`--tpl-color-text-muted`), which had been added in the
prior pass but never actually consumed anywhere. The new `.tpl-list__search-icon`
now uses it; `.tpl-list__pagination`'s own text color was left on
`--tpl-color-text-secondary` (unchanged) since correcting that specific color
wasn't part of this round's three asks and risked scope creep — flagged here for
a future pass rather than silently fixed.

**Verification**: `npx tsc --noEmit` clean; `npx vitest run` 26/26 passing
(unchanged — no test asserts font-family, border, or shadow values); a fresh
1440×900 and 375×812 browser pass confirmed the fused card, both divider weights,
and every icon rendering correctly; `getComputedStyle` spot checks confirmed exact
matches for `.tpl-list__collection`'s `border-radius: 8px` and real box-shadow
value, `.tpl-list__narrowing`'s `border-bottom: 1px solid rgb(243, 244, 246)`, and
`.tpl-list__pagination`'s `border-top: 1px solid rgb(229, 231, 235)` — both divider
colors verified as the two distinct real values, not one uniform guess. Error state
was re-checked visually inside the fused card (text-color-only distinction now,
since the state box lost its own border). Genericity was re-verified by grep across
`src/template/`, `src/patterns/`, and the new `icons.tsx` — clean.

**Architecture**: no change. All three corrections were CSS/token/markup and one
new presentational file (`icons.tsx`, a pattern-layer concern, not template-owned
business logic) — no capability was implemented, no `ListConfig` field changed, and
every optional-capability/empty-container guard from prior passes is untouched.
