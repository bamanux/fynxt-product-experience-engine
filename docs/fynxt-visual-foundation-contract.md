# FYNXT Visual Foundation Contract

**Status: DRAFT for Product Designer review.** Derived from the evidence audit in
[`fds-101-foundation-inventory.md`](fds-101-foundation-inventory.md) and
[`fds-101-component-audit.md`](fds-101-component-audit.md). It governs how
`FYNXT-TPL-LIST-002` (and any later template) consumes FDS-101. It does not modify
FDS-101, the template, or the registry.

Source-of-truth order used (task §7): 1 working FYNXT component → 2 FYNXT variable/token →
3 current FYNXT product implementation → 4 FDS-101 descriptive text → 5 historical/broken
component.

## FYNXT visual foundation source

**FDS-101** — `https://www.figma.com/design/3c44QQCA8h7GTZYH2EWn8H/FDS-101`
(fileKey `3c44QQCA8h7GTZYH2EWn8H`). Table/toolbar/pagination *composition* comes from the
Leads product evidence (Sales Module file), because FDS-101 has no complete table
component.

## Authoritative tokens

Use the **variable value**, not the Tokens-page print, where they disagree (conflicts
C1, C2, C4).

| Group | Tokens |
|---|---|
| Brand | `brand/primary` `#002666` · `brand/primary-foreground` `#FFFFFF` · `brand/secondary-foreground` `#002666` |
| Text | `text/foreground` `#404040` · `text/muted-foreground` `#858585` · `text/muted` `#B3B3B3` · `text/label` `#858585` (alias of muted-foreground, C3) · `text/on-primary` `#FFFFFF` |
| Surface | `surface/card` `#FFFFFF` · `surface/input` `#F3F4F6` · `surface/selected` `#EEF1F7` · `neutral/50` `#F9F9FB` (row hover, header fill) |
| Border | `border/default` `#E5E7EB` · `border/light` `#F3F4F6` · `border/strong` `#D1D5DB` |
| Status | `status/success` `#10B981` · `status/info` `#3B82F6` · `status/destructive` `#E5381D` · (Tokens-page only, no bound component seen: warning `#F59E0B`, error `#EF4444`) |
| Feedback | `feedback/info-bg` `#E9F1FC` · `feedback/error-bg` `#FCEDE9` |
| Spacing | 4-px scale `spacing/1…12` (4…48) |
| Radius | `radius/default` 4 · `radius/md` 6 · sm 2 · lg 8 · xl 12 · full |
| Type size | `font-size/xs` 12 · `font-size/sm` 14 (bound); scale xxs 10 … 3xl 48 (Tokens page) |
| Shadow | `shadow/sm`; Tokens-page `shadow-md` (popover) `0 2px 12px 2px rgba(33,33,33,.12)`, `shadow-lg`, `shadow-xl`, `shadow-2xl` |

Not tokens (do not present them as tokens): row/header/toolbar heights, control sizes
outside Button S/M/L, tag/chip paddings, 11 px and 13 px font sizes, border widths 1.5/2,
the Leads card shadow `0 4px 10px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)` — each is a
literal in a working component or in Leads and must be labelled OBSERVED / IMPLEMENTATION-
SPECIFIC, never "FDS-101 token".

## Authoritative typography

- **Lexend** — body, labels, inputs, **table content, buttons, tabs, pagination, chips,
  tags** (working-component evidence).
- **Sora** — headings, page/section/card titles (Card title `Sora SemiBold 16`; doc text).
- Weights: Light 300, Regular 400, **Medium 500**, **Semibold 600**, Bold 700.
- Sizes in use by working components: 10 (avatar S) · 11 (tag) · 12 (header, chip, data
  cell) · 13 (button S, table row, pagination, avatar M) · 14 (tab, input, checkbox,
  button M) · 16 (card title). 11 and 13 are **off the documented scale** (C6).
- Line height: none defined; working components use the font default (`normal`).
  Do not invent a line-height token.
- Table header: Lexend Medium 12, `neutral/400`, letter-spacing 0.5 px, uppercase
  presentation (Table Header Cell) **or** Lexend SemiBold 12 `text/label` sentence case
  (Table Column Header) — **NEEDS DESIGNER DECISION** (C14).

## Authoritative components

Classified **B** (usable as an implementation reference):

| Component | Use for | Caveat |
|---|---|---|
| Button (Primary/Secondary/Ghost/Destructive; S 32, M 40, L 48) | button typography, radius 4, padding S 12 / M 16, colours | Default state only was read |
| Input | field dimensions (40), fill, border, states | — |
| Search Field | search anatomy (icon + text + clear), 40 px | pilot's current pill shape is unsupported (C16) |
| Checkbox | box sizes 16/20/24, border 1.5, fill, focus ring | tick is an image, not `icon/check` |
| Tab | tab typography/underline/states | density differs from Leads (C17) |
| Chip (core only) | chip anatomy, radius 6 | ignore nested Avatar; Leads chip differs (C18) |
| Table Row | row states: hover `neutral/50`, selected `surface/selected`, error `feedback/error-bg`, editing `blue/500`; Stage tag | 52 px conflicts with Leads 44 (C8) |
| Table-row tag (Stage) | tag anatomy: radius 4, `px 8 py 3`, 11 px, soft bg + coloured text | single tone only |
| Pagination | numbered-cell anatomy, active = `brand/primary` fill | conditional: no states, anonymous icons, differs from Leads (C15) |
| Card | radius 12, border, `shadow/sm`, Sora title | — |
| Avatar (page `73:2`) | initials avatar | — |

## Authoritative icons

**Lucide**, via FDS-101 `icon/<name>` components (core page `29:2`, 95 icons; sizes
16/20/24/32; 24 px stroke 2, 16 px stroke 1.33333). Use the **named instances**. Needed
for tables: `search`, `filter`, `columns-3`, `more-vertical`, `more-horizontal`,
`chevron-left`, `chevron-right`, `chevron-up`, `chevron-down`, `x`, `x-circle`, `check`,
`minus`, `eye`, `eye-off`, `pencil`, `trash-2`, `file-plus`, `table`, `sliders-horizontal`.
Colour: FDS-101 bakes `#404040` into the SVG; consume with `currentColor`.
**Missing:** no sort-arrow icon exists (both header components have empty sort layers) —
**do not invent one**; record as a gap.

## Broken / unsafe components (not implementation sources)

- **Badge** (`64:39`) — Soft variants render no background; Solid render black label text.
- **Icon Button** (`106:1149`) — flattened images, not inspectable (dimensions only).
- **Table Column Header** (`100:142`) — older duplicate; empty `SortIcon` layer.
- **Avatar nested in Chip** (`245:2051`) — Roboto + foreign `static/*`, `liquid-glass/*`
  variables.
- **Data Display page `70:2`** (older Avatar/Card set) — superseded by `73:2`.
- Duplicate Sidebar Nav Item sets (`131:3…` vs `135:30…`).

## Unknowns

Table Header Cell and Table Data Cell (grid system) — **D**; Menu/Dropdown menu (absent);
Alert, Toast, Tooltip, Modal, Accordion, Breadcrumb, Radio, Toggle, Textarea, Select,
Sidebar/Top Nav, Adaptive Form (not inspected); Button/Chip/Input Hover, Focus, Pressed,
Disabled, Loading colours (not read); Dark-mode and form-factor variable modes; whether a
dedicated focus-ring token exists; line-height policy; border-width and density tokens;
the intended tone set for tags (only info is demonstrated).

## Conflicts

Full table with evidence in `fds-101-component-audit.md`. Summary:

| ID | Topic | Resolution |
|---|---|---|
| C1/C2 | `muted-foreground` and `muted` print values vs variables | RESOLVED BY VARIABLE |
| C3 | `text/label` duplicates `muted-foreground` | UNRESOLVED |
| C4 | `input` surface white vs `#F3F4F6` | RESOLVED BY WORKING COMPONENT |
| C5 | Button font Sora (doc) vs Lexend (component) | RESOLVED BY WORKING COMPONENT |
| C6 | Off-scale 11/13 px | RESOLVED BY WORKING COMPONENT |
| C7 | Tag radius 4 vs chip 6 | UNRESOLVED |
| C8 | Row/header density 52 / 40 / 44 | NEEDS DESIGNER DECISION |
| C9 | Stale Roboto/liquid-glass variables | RESOLVED BY WORKING COMPONENT |
| C10 | Navy ramp differs between pages | UNRESOLVED (navy/500 agrees) |
| C11 | Card shadow blur 2 vs 1 | UNRESOLVED |
| C12 | Named icons vs anonymous images | RESOLVED BY WORKING COMPONENT |
| C13 | Duplicate Data Display pages | RESOLVED BY WORKING COMPONENT |
| C14 | Two table-header components | NEEDS DESIGNER DECISION |
| C15 | Pagination FDS vs Leads | NEEDS DESIGNER DECISION |
| C16 | Search FDS vs Leads | NEEDS DESIGNER DECISION |
| C17 | Tabs FDS vs Leads | NEEDS DESIGNER DECISION |
| C18 | Filter chip FDS vs Leads | NEEDS DESIGNER DECISION |
| C19 | Badge vs table-row tag | RESOLVED BY WORKING COMPONENT |
| C20 | Selected-row colour (pilot `#ccebff` vs `#EEF1F7`) | RESOLVED BY VARIABLE |

**Pilot deviations already visible (for Step 9C planning, nothing changed here):**
`--tpl-color-selected-row-bg` `#ccebff` (ASSUMED) vs FDS `#EEF1F7`; `--tpl-color-text-secondary`
`#6B7280` vs variable `#858585`; search pill radius and white fill vs radius 4 / `#F3F4F6`;
tags use a pill radius (`--tpl-radius-pill`) vs FDS tag radius 4; tag tints `#fdf1df`/`#e3f6e8`/
`#fbe7e6` are invented (FDS has only `feedback/info-bg` and `feedback/error-bg`).

## Consumption rule

`FYNXT-TPL-LIST-002` **must consume the authoritative FDS-101 foundation and must NOT
create a parallel design system.** Concretely:

1. Every colour, font family/size/weight, spacing, radius, shadow and icon must resolve to
   an FDS-101 variable/component named above, or be explicitly labelled OBSERVED (Leads),
   IMPLEMENTATION-SPECIFIC, or ASSUMED. Never label a literal "FDS-101".
2. A thin template-level mapping may only *reference* FDS-101 names (e.g.
   `--tpl-surface-input: <FDS surface/input>`); it must not become an independent
   token set. Where FDS-101 has no token, document the gap instead of minting one.
3. Components in the **Broken / unsafe** list and anything **C/D** are never copied.
4. Where FDS-101 and Leads disagree on composition (conflicts C8, C14–C18) the
   template waits for a Product Designer decision rather than silently choosing.
5. Icons are the Lucide `icon/*` set; no other icon source and no invented sort glyph.

## Pipeline (task §10)

FDS-101 Foundation → this Visual Foundation Contract → Leads product-composition evidence
→ Table List visual reconstruction (Step 9C, **not started**).
