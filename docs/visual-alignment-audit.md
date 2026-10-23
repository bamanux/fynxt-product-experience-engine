# Visual Alignment Audit — FYNXT-TPL-LIST-002 (Table List)

**Purpose:** ground the pilot's visual treatment in what the FYNXT Cloud UI Figma
evidence for the Leads Table List actually shows, before changing any implementation
code. This is a visual companion to
[`docs/template-discovery.md`](template-discovery.md)'s `CAND-001` entry — it does not
re-audit structure/behavior (already covered there), only appearance.

**Source, scope, and how this was gathered:** originally, the same Figma file and
frame already approved for the CRM audit — "Sales Module"
(`https://www.figma.com/design/WvrYlnOxnKgkRbT7nQgsPV/Sales-Module`), page "Leads",
frame `FYNXT Cloud UI Design (CRM)` (1440×1024) — viewed as an anonymous (view-only)
Figma guest. **Update:** the Product Designer subsequently provided a second,
dedicated Figma file — **"FDS-101"**
(`https://www.figma.com/design/3c44QQCA8h7GTZYH2EWn8H/FDS-101`) — explicitly as the
source for tokens and variables. See
[Formal FYNXT Design System Tokens (FDS-101)](#formal-fynxt-design-system-tokens-fds-101)
below, which **supersedes the color/typography/spacing/radius values originally
recorded in this document** wherever the two differ. The original Sales Module
sections (Typography/Color/Layout/Components/Shape below) are left as first written
for their structural/layout observations, which FDS-101 doesn't cover — only their
specific color and type-scale numbers are superseded, and each superseded row says so.

Both files were viewed as an anonymous (view-only) Figma guest — the same access
level throughout this project. Figma's own Dev Mode MCP integration was attempted for
FDS-101 (which would have given exact, programmatically-extracted variable values) but
requires the Figma desktop app running locally with Dev Mode MCP enabled, which this
environment does not have; every value below, including from FDS-101, was read
directly off the rendered page (FDS-101's "Style Guide" frame prints token names and
values as literal text specifically for this purpose, which is materially more
reliable than estimating a color from a rendered swatch — but it is still a person/
model reading on-screen text, not a machine-verified export). **No other module or
page was opened in either file**, per the explicit instruction not to expand scope.

## Formal FYNXT Design System Tokens (FDS-101)

**Source:** `https://www.figma.com/design/3c44QQCA8h7GTZYH2EWn8H/FDS-101`, page
"00 · Foundations — Tokens", the "Style Guide" frame's "Semantic Tokens", "Typography",
"Spacing", "Border Radius", and "Elevation" sections. Every value in this section is
printed as literal text next to its swatch in that frame (a token name, a hex/px
value, and — for colors — the underlying primitive it references, e.g.
`primary · #002666 · navy/500`) — this is the closest thing to **FORMALLY DEFINED**
FYNXT design-system data available to this project, provided directly by the Product
Designer for this purpose. It is still hand-transcribed from a rendered page, not a
machine export (see above), so transcription error remains possible; nothing below
should be treated as byte-exact until verified against a real token export/Dev Mode
connection.

### Semantic color tokens

| Token | Hex | Primitive reference |
|---|---|---|
| `primary` | `#002666` | `navy/500` |
| `primary-foreground` | `#FFFFFF` | `neutral/0` |
| `secondary-foreground` | `#002666` | `navy/500` |
| `accent` | `#002666` | `navy/500` |
| `accent-foreground` | `#FFFFFF` | `neutral/0` (read at reduced zoom; not re-verified at 100%) |
| `background` | `#F9F9FB` | `neutral/50` |
| `card` | `#FFFFFF` | `neutral/0` |
| `popover` | `#FFFFFF` | `neutral/0` |
| `sidebar` | `#FFFFFF` | `neutral/0` |
| `input` | `#FFFFFF` | `neutral/0` |
| `foreground` | `#404040` | `neutral/700` |
| `muted-foreground` | `#6B7280` | `neutral/500` |
| `muted` | `#9CA3AF` | `neutral/400` |
| `on-primary` | `#FFFFFF` | `neutral/0` |
| `border` (default) | `#E5E7EB` | `neutral/200` |
| `border` (light) | `#F3F4F6` | `neutral/100` |
| `border` (strong) | `#D1D5DB` | `neutral/300` |
| `success` | `#10B981` | `green/500` |
| `warning` | `#F59E0B` | `warning/500` |
| `error` | `#EF4444` | `red/500` |
| `destructive` | `#E5381D` | `red/600` |
| `info` | `#3B82F6` | `info/500` |

**Noted discrepancy, flagged rather than silently resolved:** FDS-101's `sidebar`
token is `#FFFFFF` (white/light). The Sales Module product screen audited earlier
shows a visibly **dark navy** left sidebar. This implementation doesn't render a
sidebar at all, so the conflict doesn't currently need resolving — but it's a real
mismatch between the formal token file and the actual shipped product surface,
recorded here rather than silently picked one way. `error` (`#EF4444`, red/500) and
`destructive` (`#E5381D`, red/600) are also two distinct, deliberately different reds
in FDS-101 — this pilot now follows that distinction (error/status text uses `error`;
destructive action buttons/menu items use `destructive`) rather than collapsing both
into one "danger" color as the original draft of this token layer did.

### Relevant primitive ramps (for reference)

| Ramp | Values |
|---|---|
| `navy` | 50 `#CCD4E0` · 100 `#99A8C2` · 200 `#667DA3` · 300 `#335185` · 400 `#003D99` · 500 `#002666` · 600 `#001E52` · 700 `#00173D` · 900 `#000814` |
| `blue` | 50 `#CCEBFF` · 100 `#99D6FF` · 200 `#66C2FF` · 300 `#33ADFF` · 500 `#0099FF` · 600 `#007ACC` · 700 `#005C99` · 800 `#003D66` |
| `neutral` | 0 `#FFFFFF` · 50 `#F9F9FB` · 100 `#F3F4F6` · 200 `#E5E7EB` · 300 `#D1D5DB` · 400 `#9CA3AF` · 500 `#6B7280` · 700 `#404040` |

### Typography

| Token | Value |
|---|---|
| Primary font ("Sora") | Headings H1–H4, page titles, section titles, button text and emphasis |
| Secondary font ("Lexend") | Body copy, labels, inputs, helper text and descriptions |
| Type scale | `3xl` 48px · `2xl` 32px · `xl` 24px · `lg` 20px · `base` 16px · `sm` 14px · `xs` 12px · `xxs` 10px |
| Font weights | Light 300 · Regular 400 · Bold 700 — **no Medium/Semibold weight is formally defined**; this pilot's earlier `medium`(500)/`semibold`(600) tokens are remapped to the nearest formal weight (400/700 respectively) rather than kept as invented in-between values |

### Spacing

`Spacing Scale · base unit 4px`: `spacing/1` 4px · `spacing/2` 8px · `spacing/3` 12px ·
`spacing/4` 16px · `spacing/5` 20px · `spacing/6` 24px · `spacing/7` 28px · `spacing/8`
32px · `spacing/9` 36px (scale continues beyond what was captured).

### Border Radius

`radius/sm` 2px · `radius/default` 4px · `radius/md` 6px · `radius/lg` 8px ·
`radius/xl` 12px · `radius/full` (pill/circle).

### Elevation / Shadows

Named shadow tokens (`shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`, and an
`elevation-sm`) are formally defined in FDS-101 — confirming shadows **do** exist as
part of the real design system, which the original Sales Module product-screen
observation (no visible shadows) had not shown. Their exact blur/spread/opacity/color
values are **UNKNOWN** — FDS-101's Style Guide frame shows the rendered swatches but
does not print numeric shadow parameters as text the way it does for color/type/
spacing/radius, and Dev Mode access (which would read them exactly) isn't available in
this environment.

## How to read the classification columns

| Label | Meaning |
|---|---|
| **OBSERVED** | Directly seen in the Figma frame this session, described as accurately as an anonymous, non-Dev-Mode viewer can — approximate, not measured. |
| **FORMALLY DEFINED** | Backed by an actual FYNXT design-system source (a token file, a style guide). **This repository has none** — see below — so this label is not used anywhere in this document. It appears in the table headers only so its absence is visible, not implied. |
| **ASSUMED** | Not visible in the audited frame at all; filled in by this pilot's own judgment because *something* was needed to implement. |
| **UNKNOWN** | Not observed and not assumed — left open. |

**No FYNXT design-system implementation exists in this repository.**
[`design-system/tokens/`](../design-system/tokens/) and
[`design-system/guidelines/`](../design-system/guidelines/) contain only scaffolding
`README.md` files (confirmed by inspection before writing this document). Every value
below is therefore, at best, **OBSERVED** — never **FORMALLY DEFINED**. Nothing in this
document should be cited elsewhere as an official FYNXT token.

---

## Typography

| Characteristic | Value | Classification |
|---|---|---|
| Font family | A clean sans-serif grotesque (visually consistent with common system/UI sans faces — e.g. Inter/Roboto/Helvetica-Neue-like; the exact family cannot be read without Dev Mode access) | OBSERVED (family family *name* unconfirmed) |
| Column header text | Small (≈11–12px), uppercase, letter-spaced, muted gray, medium weight | OBSERVED |
| Body/table cell text | ≈13–14px, regular weight, near-black | OBSERVED |
| Emphasized cell text (e.g. the owner/"Sales Person" name) | Same size as body text, semibold/medium weight, slightly darker | OBSERVED |
| Insight-card numbers | Large (≈28–32px), bold, near-black | OBSERVED |
| Insight-card labels | Small (≈12–13px), regular weight, muted gray | OBSERVED |
| Filter chip / tab labels | ≈13–14px, medium weight | OBSERVED |
| Line height | Comfortable, roughly 1.4–1.6× the text size by visual spacing (not measurable) | OBSERVED, approximate |
| Exact font sizes in px, exact font-weight numbers, exact line-height values | — | UNKNOWN (no Dev Mode / inspect access) |

## Color

| Characteristic | Value | Classification |
|---|---|---|
| Page/table surface background | White | OBSERVED |
| Left navigation sidebar | Dark navy/near-black | OBSERVED |
| Primary text | Near-black / very dark gray | OBSERVED |
| Secondary/muted text (labels, captions, header row) | Medium gray | OBSERVED |
| Borders / row dividers | Light gray, thin (1px-appearing) | OBSERVED |
| Primary action (e.g. the header's filled "+ New Lead"-type button) | Dark navy/blue fill, white text | OBSERVED |
| Secondary action (e.g. "Import") | White/near-white fill, thin gray border, dark text | OBSERVED |
| Active/applied filter chip (e.g. "Person (1)") | Filled dark navy, white text — visually distinct from an *unapplied* chip | OBSERVED |
| Unapplied filter chip (e.g. "Lead Status") | White fill, blue text, thin border | OBSERVED |
| Links / active-tab indicator | Blue | OBSERVED |
| Selected/active insight card | Navy blue border (~2px), otherwise same white card | OBSERVED |
| Status/tag colors | Distinct light-tint pill backgrounds with matching darker text: blue (`New Lead`, `Contacted`), amber/orange (`Contact Attempted`), gray (`Inactive`), green (`Qualified`). **`Unqualified` rendered visually similar to `Qualified`'s green in this frame** — this reads as a possible source-file inconsistency, not a confirmed second meaning for green; flagged, not resolved. | OBSERVED, with one noted ambiguity |
| Hover state | Not observable — Figma is a static frame; no hover/interaction state was visible | UNKNOWN |
| Exact hex values for any of the above | — | UNKNOWN (no Dev Mode / inspect access; every color above is a naked-eye approximation) |

## Layout

| Characteristic | Value | Classification |
|---|---|---|
| Page padding | Generous, comfortable margins around the content area (not measurable) | OBSERVED, approximate |
| Section spacing (header → insights → filters → table) | Clear, consistent vertical gaps with a thin divider under the insight-card row | OBSERVED |
| Table row height | Comfortably spaced, taller than a compact/dense table — visually closer to a "comfortable" than a "compact" density preset | OBSERVED, approximate |
| Header row height | Slightly shorter than a data row, enough for the uppercase label alone | OBSERVED, approximate |
| Control spacing (between filter chips, between buttons) | Small, consistent horizontal gaps (~8–12px by eye) | OBSERVED, approximate |
| Content width | The frame is 1440px wide; content appears to use most of that width, not a narrow centered column | OBSERVED |
| Exact padding/spacing px values | — | UNKNOWN |

## Components

| Component | Observed treatment | Classification |
|---|---|---|
| Search | Rounded/pill input with a leading search icon and gray placeholder text | OBSERVED |
| View tabs | Text tabs, active tab in dark text with a blue underline; inactive tabs muted gray, no underline | OBSERVED |
| Buttons (primary) | Filled dark navy, white text/icon, rounded corners | OBSERVED |
| Buttons (secondary) | White/outline, gray border, dark text/icon | OBSERVED |
| Filter chips | Pill/rounded-rectangle, with a trailing dropdown chevron; applied vs. unapplied visually distinct (see Color) | OBSERVED |
| Badges/status tags | Small pill shape, colored tint background + matching text, no border | OBSERVED |
| Table headers | Uppercase, muted, no visible sort-indicator icon in the static frame | OBSERVED |
| Table rows | White background, bottom border only (no vertical column borders), icon-prefixed contact/email cells | OBSERVED |
| Pagination | Not closely re-inspected in this pass (previously noted in `docs/template-discovery.md`'s `CAND-001` entry as a numbered `1–7 of 7`-style control with a highlighted current page) | OBSERVED (carried from the original CAND-001 audit pass, not re-verified pixel-by-pixel in this session) |
| Action controls (row-level) | An overflow `⋮` affordance was the only row-action treatment previously documented for Leads (`docs/template-discovery.md`) — the *specific* visual (icon size, button shape) was not re-inspected closely in this pass | OBSERVED (carried from CAND-001), UNKNOWN in finer detail |
| Checkboxes | Small square, rounded corners, thin outline when unchecked | OBSERVED |
| Inputs generally | Rounded rectangle, thin gray border, comfortable internal padding | OBSERVED |

## Shape

| Characteristic | Value | Classification |
|---|---|---|
| Border radius (cards, buttons, chips) | Small-to-medium rounding, consistent across cards/buttons (~6–8px by eye); badges/pills fully rounded | OBSERVED, approximate |
| Borders | Thin (1px-appearing), light gray, used for structure instead of shadows in most places | OBSERVED |
| Shadows | No strong drop shadows observed on cards or the page shell — the design reads as flat/border-based, not elevation-based | OBSERVED |
| Dividers | Thin horizontal rules used between the insight-card row and the filter row, and between table rows | OBSERVED |
| Exact radius px values | — | UNKNOWN |

---

## What this means for implementation

Every "PILOT IMPLEMENTATION TOKEN" defined next
(`src/template/tokens.ts` /
`TableList.tokens.css`) traces back to a row in this document. Where a value below is
genuinely `UNKNOWN` or `ASSUMED` rather than `OBSERVED`, the pilot token layer says so
explicitly, so nothing invented here is later mistaken for a confirmed FYNXT value.
