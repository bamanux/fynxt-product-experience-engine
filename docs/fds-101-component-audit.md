# FDS-101 Component Audit

**Audit only.** Nothing in FDS-101, the product, the registry, or Figma was modified or
"standardized". Classification letters follow the task: **B** APPROVED/WORKING ·
**C** BROKEN/INCOMPLETE/UNCERTAIN (not an implementation source) · **D** UNKNOWN.
Foundation values live in [`fds-101-foundation-inventory.md`](fds-101-foundation-inventory.md).
"Variables connected?" means `get_variable_defs` returned bound variables for that node
(literal values in generated code are noted as not bound).

How a component was judged: it was read with `get_design_context` (markup + styles),
`get_variable_defs` (bound variables), and `get_metadata` (variants). Only the
screenshot-verified or code-verified facts are stated; Default states were read for most
components, and other states only where named.

## Component table

| Component | Working? | Variables connected? | Variants | Current/Approved? | Confidence | Notes |
|---|---|---|---|---|---|---|
| **Button** (`61:2`, 5 variants read) | Yes — Lexend Medium 13 px (S) / 14 px (M) | Partly: `brand/primary`, `text/on-primary`, `radius/default`, `status/destructive`, `text/foreground`; **font family/size/weight and padding are literals** | Primary / Secondary / Ghost / Destructive × S 32 / M 40 / L 48 × Default, Hover, Focus, Pressed, Disabled, Loading (only Default read) | **B** | High (Default); Medium (other states unread) | Padding S `px 12`, M `px 16`. Typography contradicts doc text — conflict C5. |
| **Icon Button** (`106:1149`) | Sizes yes; internals **no** | Only `radius/default`, `border/strong`, `neutral/50`, `text/foreground` | Primary / Secondary / Ghost / Outline / Destructive × SM 28 / MD 36 / LG 44 × 6 states | **C** | High that it is incomplete | The two variants read (`105:2`, `105:43`) are each a single flattened exported image (`<img>` only); the rest were assumed alike but not individually read — padding, icon size, colours not inspectable. Dimensions only usable. |
| **Input** (`46:7`, 14 states) | Yes | Extensively: `font-size/xs`, `font-size/sm`, `spacing/2,3,10`, `radius/default`, `surface/input`, `border/default`, `text/label`, `text/muted`, `status/destructive`, `neutral/400` | Default, Error, Info, Hover, Focus, Filled, Disabled, Success, Typing, Focus filled, Hover filled, Error focus, Read-only, Loading | **B** | High | Height 40 (`spacing/10`), radius 4, fill `#f3f4f6`. Best-connected component in the file. |
| **Search Field** (`52:41`) | Yes | `surface/input`, `border/default`, `text/muted` `#b3b3b3`, `font-size/sm`, `spacing/3`, `spacing/10`, `radius/default`; icons are named `icon/search` + `icon/x` instances | Default, Focus, Filled, Hover, Error, Disabled | **B** | High | 280 × 40, radius 4 (**not a pill**), leading search icon 16 px, clear icon. Differs from Leads (conflict C16). |
| **Checkbox** (`54:104`) | Yes | `radius/default`, `surface/input`, `border/default`, `brand/primary`, `font-size/sm`, `spacing/6,7`, `border/strong`, `radius/md` | S 16 / M 20 / L 24 × Unchecked, Checked, Indeterminate, Disabled, Disabled-checked + Focused ring | **B** | High | Border 1.5 px, checked fill `brand/primary`. The tick is an anonymous image (`54:67`), not `icon/check` (conflict C12). Header-cell checkbox is a bare 16 px box with no checked state. |
| **Tab** (`75:18`) + `Tabs / example` | Yes | `brand/primary`, `text/muted-foreground` | Default, Active, Hover, Disabled | **B** | High | Lexend Medium 14, `px 16 py 10`, active = 2 px `brand/primary` bottom border and `brand/primary` text; inactive text `#858585`. Height 38. Differs from Leads (conflict C17). |
| **Chip** (`124:166`: Selection, Filter, Input, Status × 4 states; Overflow counter) | Core yes; nested Avatar **no** | `border/light`, `status/info`, `brand/primary(-foreground)`, `brand/secondary-foreground`, `text/on-primary`; `radius 6`, paddings are literals | Selection / Filter / Input / Status × Default, Hover, Focus, Disabled | **B** (core) with **C** nested Avatar | Medium | Selection = `border/light` fill + navy text; **Filter default = solid `status/info` blue with white text**. Radius 6 (differs from tag 4, conflict C7). Contains the stale Avatar 12/16 (Roboto, foreign variables — conflict C9). Leads' filter chips look different (conflict C18). |
| **Tag in Table Row** ("Stage", `77:22`) | Yes | `feedback/info-bg`, `status/info` | One tone only (info) | **B** | Medium | `px 8 py 3`, radius 4, Lexend Medium 11, light bg + coloured text. Only tone shown; no warning/success/neutral tone variants. Used instead of Badge. |
| **Badge** (`64:39`: 6 statuses × Soft/Solid) | **No** | Only `status/success`, `text/muted-foreground` | Neutral, Primary, Success, Warning, Error, Info × Soft, Solid | **C** | High | Screenshot shows every *Soft* badge rendering **without a background** (invisible) and *Solid* badges rendering **black label text** on the solid colour (not white). Code shows background and text bound to the same variable. Do not use. |
| **Pagination** (`76:29`) | Renders; limited | `border/default`, `brand/primary`, `text/foreground`, `text/on-primary`; sizes literal | **No variants** — one static example (prev, 1, 2 (active), 3, 4, 5, next) | **B**, conditional | Medium | 32 px square cells, radius 4, gap 4, Lexend Medium 13. No disabled state, no "X–Y of Z" summary, no rows-per-page, no ellipsis. Prev/next are anonymous images, not `icon/chevron-*` instances. Differs from Leads (24/28 px cells, summary text) — conflict C15. |
| **Menu / Dropdown menu** | **Not defined** | — | — | **D** | High (absent) | No menu / popover-menu / context-menu component on any page. `Select` is a form field (`50:81`), not an action menu. Only `shadow-md` (popover elevation) exists as a token. |
| **Table Row** (`77:50`) | Yes | `surface/card`, `border/default`, `text/foreground`, `brand/primary`, `feedback/info-bg`, `status/*`, plus per-state `neutral/50`, `surface/selected`, `feedback/error-bg`, `blue/500` | Default, Hover, Selected, Expanded, Disabled, Editing, Error (7) | **B** | Medium | **52 px**, `px 16`, `gap 16`, border-bottom only, Lexend Regular/Medium 13, avatar + name, tag, no checkbox, no actions column. Table/example `102:97` shows it composed with Column Headers (sentence-case headers, no uppercase). Disagrees with Leads (44 px) — conflict C8. |
| **Table Column Header** (`100:142`) | Partly | Only `text/label` | Default, Hover, Sorted ascending, Sorted descending | **C** (older/duplicate) | Medium | Lexend **SemiBold** 12, `px 16 py 12`; `SortIcon` layer is an **empty frame** — sorted states carry no glyph. Competes with Table Header Cell (conflict C14). |
| **Table Header Cell** (`151:135`) | Partly | `neutral/50`, `border/default`, `surface/input`, `neutral/400` | Sort None / Ascending / Descending; optional checkbox + "More" | **D** | Medium | 40 px, `px 12 py 10`, **uppercase-style label** (`SERVER`) Lexend Medium 12 `neutral/400`, letter-spacing 0.5 px, `border-b border-r`. The `Sort` layer is an **empty frame**; "More" uses an anonymous image. Closest to Leads' uppercase headers but unresolved vs Column Header. |
| **Table Data Cell** (`156:939`: Text / Number / Status / Entity / Checkbox / Actions × Default, Hover, Selected, Editing) | Partly | `surface/input` (gray cell fill), `border/default`, `text/foreground`, `font-size/xs` | 24 variants | **D** | Medium | Spreadsheet/grid style: 40 px, gray `#f3f4f6` cell fill, `border-b border-r`, 12 px text. **Actions cell = a single `icon/more-vertical`, right-aligned — there are no direct View/Edit buttons.** Reads as a different table system from Table Row (conflict C8/C14). Only Text and Actions types were read. |
| **Table (assembled)** | **Not defined** as a complete component | — | `Table / example` (`102:97`) is a Table Row + Column Header demo only | **D** | High | No frozen/sticky columns, no selection column, no pagination or toolbar attached, no horizontal-scroll behaviour. |
| **Toolbar / filter bar / saved views** | **Not defined** | — | — | **D** | High (absent) | Only Chip and Search Field exist. A "Manage views" modal (`194:3`) is a composed example using `icon/search`, `icon/x-circle`, `icon/chevron-down`, and Button instances, not a reusable component. |
| **Row actions** | **Not defined** as a pattern | — | — | **D** | High | Only the Data Cell "Actions" cell (single more-vertical). The View-first/overflow rule is not in FDS-101. |
| **Status indicators** — Alert (`65:45`), Toast (`66:37`), Tooltip (`66:39`), Modal (`67:2`) | Not read | — | Info / Success / Warning / Error | **D** | — | Present with variants; **not inspected** in this audit. Badge (above) is C. Avatar "Online" dot is an exported image. |
| **Card** (`74:46`) | Yes | `surface/card`, `border/default`, `border/light`, `text/*`, `shadow/sm`, `status/success` | Flat, Elevated | **B** | High | Radius 12 (literal), padding 16, Sora SemiBold 16 title — the one inspected component that uses Sora. Elevated shadow disagrees with the bound effect (conflict C11). An older, unrelated Card (`70:17`, 320 × 160) lives on the first Data Display page. |
| **Avatar** (`73:12`; older `70:15`) | Yes (page 73) | `brand/primary`, `neutral/0` | S 24 / M 32 / L 40 (page 73); XS–L (page 70, different sizes) | **B** (73:2) / **C** (nested chip avatar, older page-70 set) | Medium | Duplicate component sets across two same-named pages (conflict C13). The 12 px variant nested in Chip is stale (Roboto, foreign variables — C9). |
| **Sidebar Nav Item / Top Nav** (`131:2`) | Not read | — | Parent / Child / Nested Child × Default, Hover, Active, Disabled; Top Nav Desktop 1380 × 48 / Tablet / Mobile | **D** | — | Two copies of the Sidebar Nav Item set (240 px loose symbols and 232 px inside a frame) — duplicate. Not inspected beyond structure. |
| **Breadcrumb, Accordion** | Not read | — | — | **D** | — | Present on `73:2`; not inspected. |
| **Adaptive Form template** (`22:2`) | Not read | Uses variable **modes** (Light/Dark, Android/iOS/Tablet/Desktop/TV) | — | **D** | — | Out of scope; shows variable modes exist, so the values in this audit are one mode (default). |

## Table / Data Display — explicit finding (task §8)

| Capability | In FDS-101? |
|---|---|
| Complete working table / data-grid component | **Not defined as a complete FDS-101 component.** |
| Table row | Yes — `Table Row` (52 px, 7 states) — **B** |
| Table header | Two competing definitions — `Table Column Header` (**C**) and `Table Header Cell` (**D**); neither has a working sort glyph |
| Table cell | Yes — `Table Data Cell` (grid-style, gray fill, 40 px) — **D** |
| Pagination | Yes — one static example — **B** (conditional) |
| Filters | Chip only; no filter bar. **Not defined as a complete FDS-101 component.** |
| Toolbar | **Not defined as a complete FDS-101 component.** |
| Status / tag | Table-row Stage tag **B**; Badge **C** |
| Row actions | Single `more-vertical` cell only; **Not defined as a complete FDS-101 component.** |
| Selection column / bulk bar | Checkbox exists; no table selection column or bulk bar |
| Frozen columns | **Not defined** |

Therefore the Leads product evidence (Sales Module file, prior pass: 44 px rows/header,
56 px toolbar, `DataTableWithFilters` card, 24/28 px pager) remains the **composition
reference**; FDS-101 supplies tokens, icons and the working atoms (Button, Input, Search,
Checkbox, Tab, Chip core, Table Row tag).

## Conflicts

| ID | Conflict | Evidence A | Evidence B | Resolution |
|---|---|---|---|---|
| C1 | `muted-foreground` colour | Tokens page `13:71`: `#6B7280` (neutral/500) | Variable `text/muted-foreground` = `#858585` bound in Tab, Pagination, Card | **RESOLVED BY VARIABLE** (#858585). Designer should confirm the Tokens page is stale. |
| C2 | `muted` colour | Tokens page `13:76`: `#9CA3AF` (neutral/400) | Variable `text/muted` = `#b3b3b3` bound in Input, Search | **RESOLVED BY VARIABLE** (#b3b3b3); note `neutral/400` `#9CA3AF` is still used directly by Table Header Cell. |
| C3 | Two names, one value | `text/label` `#858585` (Input, Column Header) | `text/muted-foreground` `#858585` | **UNRESOLVED** — same value, duplicate semantics; `text/label` is on no printed token page. |
| C4 | `input` surface | Tokens page `13:58`: `input` = `#FFFFFF` | Variable `surface/input` = `#f3f4f6` bound in Input, Search, Checkbox, Data Cell | **RESOLVED BY WORKING COMPONENT** (gray fill). |
| C5 | Button typography | Brand `17:48` and Tokens `14:11`: Sora covers "button text" | Working Button (5 variants): Lexend Medium 13/14 | **RESOLVED BY WORKING COMPONENT** (Lexend). Doc text is stale. |
| C6 | Type scale vs components | Scale has 10/12/14/16/20… | Components use literal **13** (Button S, table, pagination) and **11** (tags) | **RESOLVED BY WORKING COMPONENT** (use 13/11 where a working component does); the scale is incomplete. |
| C7 | Radius for small labels | Tag/Badge radius 4 | Chip radius 6 (literal, not `radius/md` binding) | **UNRESOLVED** — may be intentional (static tag vs interactive chip) but is not stated. |
| C8 | Table density | Table Row 52 px | Table Header/Data Cell 40 px; Leads 44 px | **NEEDS DESIGNER DECISION** |
| C9 | Foreign/stale variables | Chip's nested Avatar binds `static/body-small/*` (Roboto) and `liquid-glass/*` | Working Avatar (page 73) binds `brand/primary`, Lexend | **RESOLVED BY WORKING COMPONENT** (ignore the nested one). |
| C10 | Navy ramp | Tokens page: navy/400 `#003D99`, navy/500 `#002666` | Colour page `0:1`: no `#003D99`; `#002666` is the 5th swatch | **UNRESOLVED** — only navy/400 differs; navy/500 `#002666` agrees everywhere. |
| C11 | Card shadow | Bound effect `shadow/sm` blur 2 | Generated CSS `0 1px 1px rgba(0,0,0,.05)` | **UNRESOLVED** (tiny). |
| C12 | Icon wiring | Search Field, Data Cell, Chip use named `icon/*` instances | Pagination arrows, checkbox tick, header "More", Icon Button use anonymous exported images | **RESOLVED BY WORKING COMPONENT** — named `icon/*` instances are the intended mechanism; anonymous images are treated as flattening. |
| C13 | Duplicate pages/components | Data Display `70:2` (Avatar XS–L, Card 320×160) | Data Display `73:2` (Avatar S–L, Card Flat/Elevated, plus table parts) | **RESOLVED BY WORKING COMPONENT** — `73:2` is the superset; `70:2` is historical. |
| C14 | Two header definitions | Column Header (SemiBold 12, `text/label`, 100:130) | Header Cell (Medium 12 `neutral/400`, tracking 0.5, 40 px, 151:108) | **NEEDS DESIGNER DECISION** |
| C15 | Pagination | FDS-101: 32 px numbered cells, no summary | Leads: 24 px prev/next, 28 px current pill, "1-7 of 7" + rows-per-page | **NEEDS DESIGNER DECISION** |
| C16 | Search | FDS-101: 280 × 40, radius 4, `#f3f4f6` fill, `#b3b3b3` placeholder | Leads: 208 × 30; pilot currently uses a pill with white fill | **NEEDS DESIGNER DECISION** (pilot's pill radius has no FDS-101 support). |
| C17 | Tabs | FDS-101: 38 px high, `px 16 py 10`, Lexend Medium 14, 2 px underline | Leads: 31.5 px high, text inset 10/6 | **NEEDS DESIGNER DECISION** |
| C18 | Filter chips | FDS-101 Filter chip: solid `status/info` blue, white text, radius 6 | Leads: 30 px chip, 1 px navy border, radius 4 | **NEEDS DESIGNER DECISION** |
| C19 | Status tag component | Badge (broken render) | Table-row Stage tag (works) | **RESOLVED BY WORKING COMPONENT** (tag). |
| C20 | Selected-row colour | Pilot used `#ccebff` (blue/50, ASSUMED) | FDS-101 `surface/selected` `#eef1f7` | **RESOLVED BY VARIABLE** (`#eef1f7`); pilot currently deviates. |

## Limitations

- `get_design_context` timed out on parallel requests and some sequential ones; every
  component marked read was read successfully at least once, but Hover/Focus/Pressed/
  Disabled variants were generally not read individually.
- Variable modes (Dark, form factors) were not inspected.
- Alert, Toast, Tooltip, Modal, Accordion, Breadcrumb, Sidebar/Top Nav, Radio, Toggle,
  Textarea, Select and the entity pickers were not inspected beyond metadata, and are
  therefore **D** rather than guessed.
- The Leads file was not re-opened in this task; Leads facts are from the prior pass.
- Component "approved/current" status is an inference from rendering + variable binding;
  FDS-101 itself carries no status labels. A designer must confirm.
