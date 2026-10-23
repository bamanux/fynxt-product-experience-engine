# FDS-101 Foundation Inventory

**Audit only.** FDS-101 was read, not modified. No product code, registry, or Figma
file was changed. Companion documents:
[`fds-101-component-audit.md`](fds-101-component-audit.md) and
[`fynxt-visual-foundation-contract.md`](fynxt-visual-foundation-contract.md).

Status vocabulary (task §2): **A** AUTHORITATIVE FOUNDATION · **B** APPROVED/WORKING ·
**C** BROKEN/INCOMPLETE/UNCERTAIN · **D** UNKNOWN. In this file, "Status" is the
foundation-level classification of the value itself.

## 1. File

URL: `https://www.figma.com/design/3c44QQCA8h7GTZYH2EWn8H/FDS-101`
(fileKey `3c44QQCA8h7GTZYH2EWn8H`; entry node `10:129`)

**Pages discovered (13, listed by the Figma desktop MCP — page names were not assumed):**

| Node | Page | Inspected | Notes |
|---|---|---|---|
| `10:129` | 00 · Foundations — Brand | structure + text | Brand colour (#002666), Sora/Lexend rules, principles |
| `10:128` | 00 · Foundations — Tokens | structure + text | "Style Guide": primitives, semantic tokens, type scale, weights, spacing, radius, elevation |
| `0:1` | 01 · Primitives — Colour | structure | 6 generated 9-step ramps (see §4) |
| `29:2` | 01 · Primitives — Icons | names | 95 Lucide icons, 16/20/24/32 px sizes |
| `41:2` | 01 · Primitives — Icons (Full set) | names | "Lucide — Full Set (importing in tranches)" — partial import |
| `61:2` | 02 · Actions | structure + 5 components + variables | Button, Icon Button, Button Group, FAB |
| `46:6` | 03 · Form Components | structure + 4 components + variables | Input, Textarea, Select, Multi-Select, Search, Checkbox, Radio, Toggle, Chips, pickers, upload |
| `70:2` | 06 · Data Display (#1) | structure | Avatar (XS–L) and Card only — **older duplicate page** |
| `73:2` | 06 · Data Display (#2) | structure + 7 components | Avatar, Breadcrumb, Card, Tab, Accordion, **Pagination, Table Row, Table Column Header, Table Header Cell, Table Data Cell** |
| `64:2` | 07 · Feedback & Overlays | structure + Badge | Badge, Alert, Toast, Tooltip, Modal |
| `131:2` | 05 · Navigation | structure only | Sidebar Nav Item, Top Nav |
| `22:2` | 11 · Templates — Adaptive Form | structure only | Variable-mode (Light/Dark, 5 form factors) template |
| `194:2` | · Manage Views | structure only | A composed "Manage views" modal (product composition, not a component) |

**Correction to earlier project notes.** Earlier passes saw only one "06 · Data Display"
page (`70:2`, Avatar/Card) and concluded FDS-101 has no table component. That was wrong:
a second page of the same name (`73:2`) contains table, tab and pagination components.
`docs/visual-fidelity-gap-analysis.md` ("Data Display page … only defines Avatar and
Card") is superseded on this point.

**How it was inspected / limitations.** Figma desktop MCP (`get_metadata`,
`get_design_context`, `get_variable_defs`, `get_screenshot`). `get_variable_defs` returns
the *resolved* variable values bound to a node, which is the strongest evidence available
here. `get_design_context` timed out intermittently (parallel calls always failed;
single sequential calls mostly worked). Variable *modes* (Dark, form-factor) were not
inspected; every value below is the default (Light) mode. Variable collection names and
the full variable list were not enumerable directly — only variables bound to inspected
nodes are known.

## 2. Variables

Values read via `get_variable_defs` on working components unless stated.
"Tokens page" = the printed Style Guide on page `10:128`.

| Category | Variable | Value / Reference | Status | Evidence |
|---|---|---|---|---|
| brand | `brand/primary` | `#002666` (navy/500) | A | Button `61:3`, Tab `75:12`, Pagination `76:29`, Table Row `77:14`; Tokens page `primary` |
| brand | `brand/primary-foreground` | `#ffffff` | A | Chip `93:92` |
| brand | `brand/secondary-foreground` | `#002666` | A | Chip `93:92` (text colour); Tokens page `secondary-foreground` |
| text | `text/foreground` | `#404040` (neutral/700) | A | Button S/Secondary `61:66`, Input, Table Row; Tokens page `foreground` |
| text | `text/muted-foreground` | **`#858585`** | A (conflict) | Tab `75:10`, Pagination `76:29`, Card `74:24`; **Tokens page prints `#6B7280`** — see conflict C1 |
| text | `text/muted` | **`#b3b3b3`** | A (conflict) | Input `46:7`, Search `52:41`; **Tokens page prints `#9CA3AF`** — conflict C2 |
| text | `text/label` | `#858585` | A | Input `46:7`, Table Column Header `100:130`; **not on Tokens page** — conflict C3 |
| text | `text/on-primary` | `#ffffff` | A | Button, Pagination, Chip |
| surface | `surface/card` | `#ffffff` | A | Table Row `77:14`, Card; Tokens page `card` |
| surface | `surface/input` | **`#f3f4f6`** | A (conflict) | Input, Search, Checkbox, Data Cell; **Tokens page prints `input` = `#FFFFFF`** — conflict C4 |
| surface | `surface/selected` | `#eef1f7` | A | Table Row selected `77:38`; **not on Tokens page** |
| neutral | `neutral/0` · `/50` · `/400` | `#ffffff` · `#f9f9fb` · `#9ca3af` | A | Table Row hover `77:26` (50); Table Header Cell `151:117` (50, 400); Tokens page |
| border | `border/default` | `#e5e7eb` | A | Table Row, Pagination, Input, Card flat |
| border | `border/light` | `#f3f4f6` | A | Card elevated `74:24`, Chip `93:52` |
| border | `border/strong` | `#d1d5db` | A | Icon Button `105:43`, Checkbox focus ring |
| status | `status/success` | `#10b981` | A | Table Row, Badge `64:15` |
| status | `status/info` | `#3b82f6` | A | Table Row tag text, Chip filter |
| status | `status/destructive` | `#e5381d` | A | Destructive Button `62:65`, Input error |
| status | `status/warning`, `status/error` | `#f59e0b`, `#ef4444` | A (Tokens page only) | Printed on Tokens page `13:2`; **not seen bound in any inspected component** (Badge Warning/Error use their own fills — see component audit) |
| feedback | `feedback/info-bg` | `#e9f1fc` | A | Table Row "Stage" tag `77:22`; **not on Tokens page** |
| feedback | `feedback/error-bg` | `#fcede9` | A | Table Row error `100:114`; **not on Tokens page** |
| accent | `blue/500` | `#0099ff` | A | Table Row editing outline `100:102` (primitive used directly, not a semantic token) |
| typography | `font-size/xs` | `12` | A | Data Cell `155:116`, Input `46:7` |
| typography | `font-size/sm` | `14` | A | Checkbox label, Search placeholder |
| spacing | `spacing/2` · `/3` · `/6` · `/7` · `/10` | `8` · `12` · `24` · `28` · `40` | A | Input `46:7`, Search `52:41`, Checkbox focus ring |
| radius | `radius/default` | `4` | A | Button, Search, Input, Checkbox |
| radius | `radius/md` | `6` | A | Checkbox focus ring (variable); Chip uses literal 6 |
| shadow | `shadow/sm` | `DROP_SHADOW #0000000D, offset (0,1), blur 2, spread 0` | A | Card elevated `74:24` |
| dimensions | Button heights | S 32 · M 40 · L 48 | A | Actions page frame names + `61:3`/`61:24` |
| dimensions | Icon Button | SM 28 · MD 36 · LG 44 | B | Actions page frame names (components flattened — see audit) |
| dimensions | Checkbox box | S 16 · M 20 · L 24 | A | Form page `54:*` |
| dimensions | Table Row / Header Cell / Data Cell | 52 / 40 / 40 | B | `77:14`, `151:108`, `155:116` (disagree with each other and with Leads 44 — conflict C8) |
| state | Row hover | `neutral/50` | A | `77:26` |
| state | Row selected | `surface/selected` `#eef1f7` | A | `77:38` |
| state | Row error | `feedback/error-bg` `#fcede9` + `status/destructive` icon | A | `100:114` |
| state | Row editing | `blue/500` outline | A | `100:102` |
| state | Focus ring | 2 px `border/strong`, radius `radius/md`, offset ~4 px | A | Checkbox `83:45`/`83:51` |

Variables that look like leftovers from an unrelated library, found bound inside the
Avatar-in-Chip nested component `245:2051`: `static/body-small/font` (Roboto),
`static/body-small/line-height`, `static/body-small/tracking`,
`liquid-glass/splay---regular`. These are **stale/foreign** and are not foundation
tokens (see conflict C9).

## 3. Typography

| Role | Family | Size | Weight | Line Height | Status | Evidence |
|---|---|---|---|---|---|---|
| Doc: headings, page/section titles | Sora ("Primary") | scale below | — | not specified | A (doc) | Brand `17:46–17:48`, Tokens `14:7–14:11` |
| Doc: body, labels, inputs, **table content** | Lexend ("Secondary") | scale below | — | not specified | A (doc) | Brand `17:50–17:52`, Tokens `14:12–14:16` |
| Button label | **Lexend** Medium | 13 (S) / 14 (M) | 500 | `normal` | B | `61:3`, `61:66`, `62:2`, `62:65`, `61:24`; contradicts doc text ("button text" = Sora) — conflict C5 |
| Card title | **Sora** SemiBold | 16 | 600 | `normal` | B | Card `74:8` — the one inspected component that uses Sora |
| Table cell text | Lexend Regular | 12 (Data Cell, `font-size/xs`) / 13 (Table Row) | 400 | `normal` | B | `155:117`, `77:20` |
| Table row primary text | Lexend Medium | 13 | 500 | `normal` | B | `77:19`, `77:21` |
| Table column header (Header Cell) | Lexend Medium, `neutral/400`, letter-spacing 0.5px | 12 | 500 | `normal` | B/C | `151:111` (uppercase default label "SERVER") |
| Table column header (Column Header) | Lexend SemiBold, `text/label` | 12 | 600 | `normal` | C (older duplicate) | `100:131` |
| Tab label | Lexend Medium | 14 | 500 | `normal` | B | `75:11`/`75:13` |
| Pagination numbers | Lexend Medium | 13 | 500 | `normal` | B | `76:34` |
| Chip label | Lexend Medium | 12 | 500 | `normal` | B | `93:58`, `248:2286` |
| Tag/Badge label | Lexend Medium | 11 | 500 | `normal` | B (size) / C (Badge render) | `77:22`, `64:17` |
| Input / Search text | Lexend Regular | 14 (`font-size/sm`) | 400 | `normal` | B | `52:45`, Input `46:7` |
| Checkbox label | Lexend Regular | 14 (`font-size/sm`) | 400 | `normal` | B | `54:43` |
| Avatar initials | Lexend SemiBold | 10 (S) / 13 (M) | 600 | `normal` | B | `73:4`, `73:7` |

**Type scale (Tokens page `14:17`):** 3xl 48 · 2xl 32 · xl 24 · lg 20 · base 16 · sm 14 ·
xs 12 · xxs 10. **Weights (Tokens page `14:43`):** Light 300 · Regular 400 · Medium 500 ·
Semibold 600 · Bold 700. **Line height:** no line-height is printed anywhere; every
inspected text node uses `leading-[normal]` (font default). No line-height token exists.
**Off-scale sizes in working components:** 11 (tags/badges) and 13 (buttons S, table
rows, pagination, avatar M) are not in the documented scale — conflict C6.
Only `font-size/xs` (12) and `font-size/sm` (14) were seen as bound variables; 11 and 13
are literal values.

## 4. Colors

### Brand colors
Navy ramp (page `10:128`, `0:1`): 50 `#CCD4E0` · 100 `#99A8C2` · 200 `#667DA3` · 300 `#335185` ·
400 `#003D99` · **500 `#002666`** · 600 `#001E52` · 700 `#00173D` · 800 `#000F29` · 900
`#000814`. Blue ramp: 50 `#CCEBFF` … 500 `#0099FF` … 900 `#001F33`. Brand doc: "Dark Navy
Blue #002666, RGB 0 38 102, CSS variable `--primary`" (Brand `17:28–17:40`).
**Note:** the Colour primitives page (`0:1`) lists its navy ramp as
`ccd4e0, 99a8c2, 667da3, 335185, 002666, 001e52, 00173d, 000f29, 000814` (9 steps, no
`#003D99`), while the Tokens page lists navy/400 `#003D99` between 300 and 500 — the two
ramps differ (conflict C10).

### Semantic colors
`primary`/`accent` `#002666` · `primary-foreground`/`accent-foreground` `#FFFFFF` ·
`secondary-foreground` `#002666` · status: `success #10B981`, `warning #F59E0B`,
`error #EF4444`, `info #3B82F6`, `destructive #E5381D` (Tokens page `13:101`).

### Surface colors
Tokens page: `background #F9F9FB`, `card/popover/sidebar/input #FFFFFF`. Variables in
components: `surface/card #FFFFFF`, `surface/input #F3F4F6`, `surface/selected #EEF1F7`,
neutral/50 `#F9F9FB` (row hover, header-cell fill).

### Text colors
Tokens page: `foreground #404040`, `muted-foreground #6B7280`, `muted #9CA3AF`,
`on-primary #FFFFFF`. Variables in components: `text/foreground #404040`,
`text/muted-foreground #858585`, `text/muted #B3B3B3`, `text/label #858585`,
`text/on-primary #FFFFFF`.

### Border colors
`border/default #E5E7EB` (neutral/200) · `border/light #F3F4F6` (neutral/100) ·
`border/strong #D1D5DB` (neutral/300). Table Header/Data Cell use `border-b border-r`
(cell grid); Table Row uses `border-b` only.

### State colors
Hover `neutral/50 #F9F9FB` · selected `surface/selected #EEF1F7` · error row
`feedback/error-bg #FCEDE9` · editing outline `blue/500 #0099FF` · info tag bg
`feedback/info-bg #E9F1FC` · focus ring `border/strong #D1D5DB` 2 px. Disabled colours were
not inspected (Button Disabled/Loading variants exist but were not read).

Other primitives: neutral ramp 0–900 (`#FFFFFF`, `#F9F9FB`, `#F3F4F6`, `#E5E7EB`,
`#D1D5DB`, `#9CA3AF`, `#6B7280`, `#404040`, `#1F2123` — note no neutral/600 or /800),
`amber/500 #FAAF40`, `warning/500 #F59E0B`, `green/500 #10B981`, `green/600 #13B197`,
`teal/500 #4AB7AA`, `red/500 #EF4444`, `red/600 #E5381D`, `info/500 #3B82F6`, chart 1–5
(`#528FFF #4AB7AA #F58C42 #FB71A0 #9988FD`).

## 5. Spacing

Tokens page `15:4`, base unit 4 px: spacing/1 4 · /2 8 · /3 12 · /4 16 · /5 20 · /6 24 ·
/7 28 · /8 32 · /9 36 · /10 40 · /11 44 · /12 48. Aliases printed: xs 4, sm 8, md 12,
lg 16, xl 20, 2xl 24, 3xl 32, 4xl 40, 5xl 48. Bound in components: `spacing/2`, `/3`,
`/6`, `/7`, `/10`. **Component paddings are mostly literals** (Table Row `px 16`,
Header Cell `px 12 py 10`, Tab `px 16 py 10`, Chip `px 8 py 4`, Badge `px 8 py 3`,
Pagination cell 32 px square, gap 4) — not bound to spacing variables. 3 px
(Badge/Tag vertical padding) and 10 px (Tab/Header Cell vertical) are not on the spacing
scale. No density/row-height spacing token exists.

## 6. Radius

Scale (Tokens page `15:45`): sm 2 · default 4 · md 6 · lg 8 · xl 12 · full.

| Use | Radius | Evidence |
|---|---|---|
| Button (all variants/sizes) | `radius/default` 4 | `61:3`, `62:65` (bound variable) |
| Input / Search / Checkbox | 4 (`radius/default`) | `46:7`, `52:41`, `54:65` (bound) |
| Tag / Badge (table "Stage" tag, Badge) | 4 (literal) | `77:22`, `64:15` |
| Chip (Selection / Filter) | **6** (literal, not `radius/md` binding) | `93:92` |
| Pagination cell | 4 (literal) | `76:30` |
| Card (flat & elevated) | **12** (literal, = `radius/xl`) | `74:24` |
| Checkbox focus ring | `radius/md` 6 (bound) | `83:45` |
| Avatar | full (12 in 24 px, 16 in 32 px) | `73:3` |
| Table Row / Header / Data cells | 0 (flat, bordered) | `77:14`, `151:108` |
| Leads search input (other file, prior pass) | not read | — |

Observation: the **same semantic purpose "small status label" has two radii** — tag/badge
4 vs. chip 6 (conflict C7).

## 7. Borders

Width: no width variable. Literals seen: 1 px (`border`, `border-b`, `border-r`, cards,
inputs, pagination cells), **1.5 px** (Checkbox box, Table Header Cell checkbox), 2 px
(Tab active underline, focus ring). Colours: `border/default` (structural: cards, cells,
inputs, pagination, row dividers), `border/light` (elevated card border, chip fill),
`border/strong` (focus ring, icon-button outline).

## 8. Shadows

Variable effect style: `shadow/sm` = `0 1px 2px 0 #0000000D` (Card elevated `74:24`).
Tokens page Elevation (`15:74`, read in an earlier pass via the remote Dev Mode MCP):
`elevation-sm 0 1px 2px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.1)` · `shadow-sm 0 1px 2px
rgba(0,0,0,.05)` · `shadow-md 0 2px 12px 2px rgba(33,33,33,.12)` · `shadow-lg 0 4px 6px -2px
rgba(0,0,0,.05), 0 10px 15px -3px rgba(0,0,0,.1)` · `shadow-xl 0 20px 60px rgba(0,0,0,.3)`
· `shadow-2xl 0 25px 50px -12px rgba(0,0,0,.25)`. **Observation:** Card "Elevated" uses
`0 1px 1px rgba(0,0,0,.05)` in the generated CSS while the bound effect style reports
blur 2 — the two disagree (conflict C11). The Leads `DataTableWithFilters` card shadow
(`0 4px 10px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)`, prior pass) matches **no**
FDS-101 shadow token.

## 9. Icons

**System: Lucide**, imported into Figma as `icon/<lucide-name>` components, sizes
16 / 20 / 24 / 32 (`Size=16` etc. variants), `stroke` `#404040` baked in (not a variable),
stroke width 2 (24 px) / 1.33333 (16 px). Core page `29:2` has **95** icons; the "Full set"
page `41:2` is a labelled work in progress ("importing in tranches", ~60 icons: a–b
alphabetical, finance, charts). Icons appear in components as **named `icon/…`
instances** (Search Field `255:2572`, Data Cell actions `156:144`, Chip `248:2149`) —
except where components embed anonymous exported images (Pagination arrows, Table Header
Cell "More", Icon Button) — see conflict C12.

| Icon | FDS-101 name | Source | Usage | Status |
|---|---|---|---|---|
| search | `icon/search` | `29:2` (node `40:770` for 16 px) | Search Field, Manage Views | A |
| filter | `icon/filter` | `29:2` (`40:783`) | filters | A |
| columns | `icon/columns-3` | `29:2` (`37:73`) | column manager | A |
| more/overflow (vertical) | `icon/more-vertical` | `29:2` (`37:170`) | Table Data Cell Actions `156:144` | A |
| more/overflow (horizontal) | `icon/more-horizontal` | `29:2` | — | A (unused in inspected components) |
| chevron-left / right | `icon/chevron-left` `icon/chevron-right` | `29:2` (`37:190`, `37:181`) | **Pagination uses anonymous images, not these instances** | A (icon) / C (Pagination wiring) |
| chevron-up / down | `icon/chevron-up` `icon/chevron-down` | `29:2` | Manage Views `194:48` | A |
| close | `icon/x`, `icon/x-circle` | `29:2` | Search clear, Chip remove, Manage Views | A |
| check (checkbox-related) | `icon/check`, `icon/minus` | `29:2` | Checkbox checked mark is an anonymous image `54:67`, not `icon/check` | A (icon) / C (checkbox wiring) |
| eye / eye-off | `icon/eye`, `icon/eye-off` | `29:2` | Leads row action (prior pass) | A |
| sort | **none** | — | Table Header Cell `Sort` layer and Column Header `SortIcon` layer are **empty frames** | C — no sort icon is defined |
| file-plus | `icon/file-plus` | `29:2` | Leads column-header utility icon (prior pass) | A |
| table | `icon/table` | `29:2` | — | A |

Chip icons use `icon/info` and `icon/x` instances (16 px).
