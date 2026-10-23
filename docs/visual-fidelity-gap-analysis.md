# Visual Fidelity Gap Analysis — FYNXT-TPL-LIST-002 (Table List)

**Purpose:** a before/after gap analysis for the Step 9B visual/interaction alignment
pass, plus the FDS-101 Token Consumption Audit. Companion to
[`visual-alignment-audit.md`](visual-alignment-audit.md) (the original, screenshot-based
audit) — this document supersedes that one's numeric findings wherever the two
disagree, because this pass used live Figma Dev Mode MCP access (`get_metadata`,
`get_design_context`, `get_variable_defs`) instead of reading rendered screenshots.
`visual-alignment-audit.md` is left in place rather than rewritten, per the
versioning discipline in [`../CLAUDE.md`](../CLAUDE.md) §18 (a superseded audit moves
toward history, it isn't silently edited in place) — treat that file as the
"screenshot era" record and this one as current.

**What changed in access this pass:** the Figma Dev Mode MCP server (tools named
`mcp__d38632ef-6bdb-461b-8525-6d0ec392d5fe__*`) was available and connected to a live
Figma desktop session in this pass, where it was not in the prior pass. This gave
real, machine-read node text and component markup instead of a person reading pixels
off a screenshot. Concretely, this pass read:

- **FDS-101** (`fileKey=3c44QQCA8h7GTZYH2EWn8H`) — `get_metadata` on node `10:128`
  ("00 · Foundations — Tokens", frame "Style Guide") for the full Primitive Palette /
  Semantic Tokens / Typography / Spacing / Radius sections as literal text;
  `get_design_context` on node `15:74` ("Elevation → Shadows") for exact shadow CSS;
  `get_design_context` on nodes `61:3` and `61:66` ("02 · Actions → Button", Primary
  and Secondary, Size S, State Default) for the real Button component's markup.
- **The Leads reference** (Sales Module file, `fileKey=WvrYlnOxnKgkRbT7nQgsPV`,
  `nodeId=3580:48836`) — `get_metadata` for the full page tree: `GlobalTopNav`,
  `LeadsPage` header/tabs, the `Insights`/`KPICard` section, `DataTableWithFilters`
  (`TableFilterBar` + `FrozenColumnTable`), and the pagination row — with real
  positions and sizes for every frame, not just approximate visual proportions.

Both files remain scoped exactly as previously approved (Leads page in the Sales
Module file; FDS-101 for tokens only) — no other page or module was opened.

## Button Typography — RESOLVED (evidence-backed, single answer)

**Status: ALIGNED.** A follow-up correction round required resolving this from real
component evidence rather than leaving it as a documented guess. The Typography
section's descriptive text (node `14:11`) states Sora covers "Headings H1–H4, page
titles, section titles, **button text** and emphasis." The real Button component
markup disagrees. This was re-verified across **5 independent Button
variants/sizes**, not just the original 2:

| Variant | Size | Node | Font | Size |
|---|---|---|---|---|
| Primary | S | `61:3` (text `61:4`) | `Lexend:Medium` | 13px |
| Secondary | S | `61:66` | `Lexend:Medium` | 13px |
| Ghost | S | `62:2` | `Lexend:Medium` | 13px |
| Destructive | S | `62:65` | `Lexend:Medium` | 13px |
| Primary | M | `61:24` | `Lexend:Medium` | 14px (on-scale) |

All 5 are unanimous: **Lexend:Medium**, never Sora. `get_variable_defs` on the
leaf text node (`61:4`) confirms the font-family/size/weight are literal properties
on the layer, not bound to a named text-style variable — so there is no "official
token name" beyond the literal values, but the values themselves are conclusive and
consistent across every variant sampled, not a one-off override. Per
[`../CLAUDE.md`](../CLAUDE.md) §3: the actual component is stronger evidence than a
summary sentence, so the descriptive text is treated as stale/unsynced
documentation, not as authoritative. **This pilot's `.tpl-list__button` and every
other button-rendering class now consume Lexend + `--tpl-font-size-button` (13px,
matching the S-size evidence, since this pilot's controls render at the S-equivalent
32px height) with no remaining conflict or open question** — Sora
(`--tpl-font-family`) remains on `.tpl-list__title` only, which no component
evidence contradicts.

## Toolbar + Table Container — RESOLVED (fused, per real evidence)

**Status: ALIGNED.** Re-inspected the real Leads `DataTableWithFilters` (node
`3580:49044`) via `get_design_context` (not just `get_metadata`) to see its actual
rendered CSS, not just frame positions. Verbatim:

```
DataTableWithFilters: bg-white border border-[#e5e7eb] border-solid
  drop-shadow-[0px_4px_10px_rgba(0,0,0,0.08),0px_2px_4px_rgba(0,0,0,0.04)]
  rounded-[8px]  (contains TableFilterBar, FrozenColumnTable — the pagination
  row is itself nested inside FrozenColumnTable, confirmed via its earlier
  get_metadata read, node 3580:49576)
```

This is unambiguous: **one continuous card** — a single border, `radius/lg` (8px,
not the `radius/md` this pilot had used), and one drop-shadow — wraps the toolbar,
table, and pagination together. Internally, `TableFilterBar` has only a
`border-bottom` (`#f3f4f6`, `border/light`) as a divider, not its own box; the
pagination row has its own `border-top` using the *stronger* `#e5e7eb`
(`border/default`) — a deliberately different divider weight from the toolbar's,
which this pilot now matches exactly rather than using one uniform divider.

**Implementation:** added `.tpl-list__collection` (border + `--tpl-radius-lg` +
new `--tpl-shadow-card` token + `overflow: hidden`) wrapping the toolbar, any bulk
warning, the loading/error/empty/success state, and pagination in one JSX block.
`.tpl-list__narrowing` (toolbar), `.tpl-list__table-scroll`, and `.tpl-list__status`
no longer draw their own border/radius/background — verified via computed styles in
the browser (`.tpl-list__collection` → `border-radius: 8px`,
`box-shadow: rgba(0,0,0,0.08) 0px 4px 10px 0px, rgba(0,0,0,0.04) 0px 2px 4px 0px`;
`.tpl-list__narrowing` → `border-bottom: 1px solid rgb(243,244,246)`;
`.tpl-list__pagination` → `border-top: 1px solid rgb(229,231,235)` — all exact
matches to the real values above). Architecture, business logic, and every optional
pattern boundary are unchanged — this was purely which element draws which CSS
border/radius/shadow.

**One thing NOT evidenced and called out as such:** the real Leads reference only
shows the table in its `success` state — there is no real evidence for how loading/
error/empty should look *inside* this fused card specifically. Folding them into the
same card (rather than giving them back their own box) is this pilot's own
consistent extension of the confirmed card evidence, documented as such in the
token/CSS comments, not asserted as itself observed.

## Iconography — RESOLVED (a real, named FDS-101 icon set exists and is now used)

**Status: ALIGNED** for pagination, row-action overflow, search, and the filter/
columns-manager extension points. Re-inspected page "01 · Primitives — Icons" (node
`29:2`) via `get_metadata`, which turned out to be a real, named, reusable icon
component set (not ad-hoc artwork) — confirmed by grepping the returned XML for
relevant names:

`icon/chevron-left`, `icon/chevron-right`, `icon/more-vertical`, `icon/search`,
`icon/filter`, `icon/columns-3`, `icon/eye`, `icon/file-plus`, `icon/sliders-horizontal`,
`icon/table`, and more.

`get_design_context` on each relevant icon's node confirmed exact, real SVG path
data (downloaded and verified, e.g. chevron-left's path is `M15 18L9 12L15 6`,
stroke `#404040`, 24×24 viewBox) — this is a genuine FDS-101 primitive, not
something inferred from the Leads reference's own unnamed exported vector shapes
(which, by contrast, *are* just generic `Vector`/`Icon` SVG cutouts with no reusable
name — confirmed by inspecting the real pagination prev/next icons in the Leads
`get_design_context` output, which reference anonymous asset URLs, not a named
component).

**Implementation:** created `src/template/icons.tsx` with 6 inline SVG React
components (`IconChevronLeft`, `IconChevronRight`, `IconMoreVertical`, `IconSearch`,
`IconFilter`, `IconColumns3`), each copying its FDS-101 path data verbatim and using
`stroke="currentColor"` (replacing FDS-101's literal `#404040`) so each icon
inherits whatever text color its context already uses. Wired in:

- `DefaultPagination.tsx` — `‹`/`›` text glyphs → `IconChevronLeft`/`IconChevronRight`
- `RowActionsPattern.tsx` — `⋮` text glyph → `IconMoreVertical`
- `TableList.tsx` — search input gained a leading `IconSearch`; the Quick Filters
  and Advanced Filters extension-point pills gained `IconFilter`; the Manage
  Columns pill gained `IconColumns3`

**Not resolved / left as documented limitation:** `Saved Views` has no obviously
correct FDS-101 icon among the names found (a bookmark/star icon may exist
elsewhere in the primitive set but wasn't searched for specifically, to avoid
scope creep past what this correction round asked for) — it remains icon-less,
text-only, which was already true before this pass and is not a regression.

## A. Visual Gap Table

| Area | Prior Implementation | FYNXT Reference (real evidence) | Gap | Change Made | Source |
|---|---|---|---|---|---|
| Page / density | Row height 52px, header 40px — noticeably taller than the reference | Leads `FrozenColumnTable` body row and header row are both **44px** (node `3580:49143`, `3580:49103`) | Too spacious; "generic table" feel | `--tpl-row-height`/`--tpl-header-row-height` → 44px | OBSERVED (Leads) |
| Typography | Sora applied to all buttons | Real Button component uses Lexend:Medium, 13px, confirmed across 5 variants/sizes | Wrong face on every button | Buttons switched to Lexend + `--tpl-font-size-button` (13px); Sora kept only on the title | FDS-101 FORMAL COMPONENT — **RESOLVED, no open question** |
| Typography | Font weights: Medium=400, Semibold=700 (from a prior mis-read screenshot pass) | FDS-101 Font Weights section (node `14:43`) shows 5 named steps: Light 300 / Regular 400 / **Medium 500** / **Semibold 600** / Bold 700 | Two weight values were simply wrong | Corrected to 500/600; added `--tpl-font-weight-light` | FDS-101 FORMAL |
| Color | Popover shadow was an invented approximation | FDS-101 Elevation section defines `shadow-md` as `0px 2px 12px 2px rgba(33,33,33,0.12)` exactly | Approximate, not sourced | `--tpl-shadow-popover` now aliases the real `--tpl-shadow-md` | FDS-101 FORMAL |
| Toolbar | Two stacked full-width dashed boxes ("Quick Filters:... — pattern not yet implemented", "Advanced Filters — pattern not yet implemented") plus a separate search row above them | ONE bordered toolbar row (`TableFilterBar`, node `3580:49045`, height 56px): filter chips + "Clear All" on the LEFT, icon buttons + search (208px) on the RIGHT | Structurally wrong (2+ rows vs. 1) and visually dominant/unfinished-looking | Toolbar rebuilt as one row with `.tpl-list__narrowing-left`/`-right`; extension points render as small dashed pill chips, not paragraph-length placeholder text | OBSERVED (Leads) |
| Insights | A single large dashed box with a full sentence ("Insights: Total Leads / New This Month / ... — Metrics pattern not yet implemented") | A slim "Insights" heading row (icon + label, ~21px) above a KPICard grid | Oversized, reads as an unfinished dev note | Insights slot is now a slim single-line bar (label + summary text, thin bottom border, no dashed box); KPICards themselves remain out of scope per Section 12 | OBSERVED (Leads) — cards themselves not implemented, by design |
| Row actions | Direct/overflow buttons sized to `--tpl-control-height-sm` (32px), Sora font | Leads row-action icon (node `12533:31413`) is a small 24px square control | Row actions read oversized relative to a 44px row | Row-action direct button + overflow trigger now use new `--tpl-control-height-xs` (24px); font switched to Lexend | OBSERVED (Leads) |
| Frozen columns | Checkbox column 44px (already exact), action column 56px (assumed) | Leads checkbox column is exactly 44px (node `3580:49105`); the frozen action column is 61px (node `3580:49138`) | Action column width was a guess, off by 5px | `--tpl-action-column-width` → 61px; checkbox width unchanged (already correct) | OBSERVED (Leads) |
| Pagination | Left-aligned row: text-labeled "Previous"/"Next" buttons at 32px height | Right-aligned cluster: "X–Y of Z" + 24px icon prev/next + a 28px current-page pill (node `3580:49576`–`49594`) | Wrong alignment, oversized controls, verbose button labels | Nav right-aligned; Previous/Next now real FDS-101 `icon/chevron-left`/`icon/chevron-right` SVGs at 24px; current-page pill at 28px | OBSERVED (Leads) — **RESOLVED** |
| Iconography | Text glyphs (`‹`/`›`/`⋮`), no icon on search/filter/columns pills | FDS-101 has a real, named icon primitive set (`icon/chevron-left`, `icon/more-vertical`, `icon/search`, `icon/filter`, `icon/columns-3`, ...) confirmed via `get_metadata` + `get_design_context` | Pagination/overflow used placeholder glyphs; search/filter/columns had no icon at all | Real FDS-101 SVG paths copied into `src/template/icons.tsx`, wired into pagination, row-action overflow, search input, and the Quick Filters/Advanced Filters/Manage Columns pills | FDS-101 FORMAL PRIMITIVE — **RESOLVED** |
| Container | Table had its own bordered/rounded container; toolbar did not | `get_design_context` on `DataTableWithFilters` confirms ONE fused card (single border, `radius/lg` 8px, one drop-shadow) wrapping toolbar + table + pagination | Toolbar looked like unstyled HTML floating above a styled table | Fused into one `.tpl-list__collection` card; toolbar/table/status lost their own border/radius; toolbar keeps only a `border-light` bottom divider, pagination a `border-default` top divider — both matching the real evidence's two different divider weights exactly | OBSERVED (Leads) — **RESOLVED** |
| Dev harness | "Leads (example configuration)" / "Demo Records (contrast configuration)" rendered as plain unstyled `<h1>`s, competing visually with the real `.tpl-list__title` "Leads" heading right below them | N/A — this is pilot tooling, not part of the FYNXT surface | Harness chrome and product surface were visually undifferentiated | Harness labels now render in a small monospace, muted, dashed-boundary style with no FYNXT tokens — unambiguously "tooling," not "product" | N/A (Section 7 compliance, not a visual-fidelity gap) |
| Hardcoded values | `min-width: 220px` (search), `2px` (tag vertical padding), literal `1px`/`-1px` box-shadow offsets for frozen-column separators | Leads search input is 208px (node `3580:49096`) | Untokenized magic numbers, one factually wrong | Added `--tpl-search-min-width` (208px, OBSERVED) and `--tpl-tag-padding-y` (2px, still ASSUMED); frozen-column box-shadow offsets now reuse `--tpl-border-width` | Mixed (see audit below) |
| Row states / selected / hover | Unchanged this pass — already token-driven | No contradicting evidence found | None | No change | — |
| Responsive | Unchanged structurally; re-verified at 375px after the density/toolbar changes | Toolbar wraps, table scrolls horizontally, frozen checkbox+name and frozen actions stay reachable, pagination stays compact and right-aligned, no page-level horizontal overflow | None found | Verified, not modified | Browser QA, this pass |

## B. FDS-101 Token Consumption Audit

| Visual Property | FDS-101 Source | Current Usage | Status | Notes |
|---|---|---|---|---|
| Primary/accent color | `primary`/`accent` = `#002666` (navy/500), node `13:2` | `--tpl-color-action-primary-bg`, `--tpl-color-accent` | CONSUMED | Exact match; unchanged this pass |
| Primary hover | No FDS-101 hover token | `--tpl-color-action-primary-bg-hover: #001e52` | ASSUMED | Reuses navy/600, the next formally-defined step down |
| Text primary/secondary/muted | `foreground` `#404040`, `muted-foreground` `#6b7280`, `muted` `#9ca3af`, node `13:2` | `--tpl-color-text-primary`, `-secondary`, new `-muted` | CONSUMED | `muted` (`#9ca3af`) is newly consumed this pass; not yet applied anywhere in CSS — available for disabled/placeholder-weight text |
| Surfaces | `background` `#f9f9fb`, `card`/`popover`/`input`/`sidebar` all `#ffffff`, node `13:2` | `--tpl-color-bg-page`, `--tpl-color-bg-surface` | CONSUMED | The "sidebar token conflict" noted in a prior pass is resolved: `sidebar` is simply white, same as `card`, no actual conflict |
| Borders | `default` `#e5e7eb`, `light` `#f3f4f6`, `strong` `#d1d5db`, node `13:2` | `--tpl-color-border`, `-light`, `-strong` | CONSUMED | Exact match |
| Status (success/warning/error/info/destructive) | `#10b981`/`#f59e0b`/`#ef4444`/`#3b82f6`/`#e5381d`, node `13:2` | `--tpl-color-error`, `--tpl-color-destructive`, tag tones, `--tpl-color-focus` | CONSUMED | All five now verified exact via Dev Mode text reads, not screenshot estimates |
| Typography families | Sora (headings/titles/**button text** per description) / Lexend (body), node `14:2` | `--tpl-font-family` (Sora), `--tpl-font-family-body` (Lexend) | PARTIALLY CONSUMED | See the flagged conflict above — the description says Sora for buttons, the real Button component says Lexend; this pilot followed the component |
| Type scale | xxs 10 / xs 12 / sm 14 / base 16 / lg 20 / xl 24 / 2xl 32 / 3xl 48, node `14:17` | `--tpl-font-size-*` | CONSUMED | 3xl (48px) newly added, unused by this pilot |
| Font weights | Light 300 / Regular 400 / Medium 500 / Semibold 600 / Bold 700, node `14:43` | `--tpl-font-weight-*` | CONSUMED | Corrected this pass — Medium/Semibold were wrong before (400/700) |
| Button component | Lexend:Medium, 13px, height 32/40/48 (S/M/L), `radius/default` (4px), node `61:2` | `--tpl-font-size-button`, `--tpl-radius-default`, `--tpl-control-height-sm` (32px, S) | CONSUMED | Height for S matches exactly; M/L (40/48) not consumed — this pilot only needs the S-equivalent size |
| Spacing | 4/8/12/16/20/24…48px, base unit 4px, node `15:2` | `--tpl-space-1`..`-6` | CONSUMED | Only consumes up to spacing/6 (24px); 7–12 defined but unused |
| Border radius | sm 2 / default 4 / md 6 / lg 8 / xl 12 / full, node `15:43` | `--tpl-radius-*` | CONSUMED | Exact match, unchanged — and now also applied correctly to buttons (`radius/default`) that were previously on `radius/sm` |
| Elevation/shadows | shadow-sm/md/lg/xl/2xl with exact CSS, node `15:72` | `--tpl-shadow-sm`, `-md`, `-lg`, `--tpl-shadow-popover` (aliases `-md`) | CONSUMED | Exact values now, not an approximation; `-xl`/`-2xl` defined but unused |
| Focus ring | No dedicated FDS-101 focus token | `--tpl-color-focus: #3b82f6` (reuses `info`) | ASSUMED (value CONFIRMED) | The color value is now confirmed as the real `info/500`; the *choice* to use `info` for focus is still this pilot's own |
| Hover background, selected-row tint | No FDS-101 token for either | `--tpl-color-hover-bg`, `--tpl-color-selected-row-bg` | ASSUMED | Unchanged this pass — no new evidence found |
| Toolbar/chip/pagination sizing | Not in FDS-101 (a product-composition concern) | `--tpl-toolbar-height`, `--tpl-chip-height`, `--tpl-control-height-xs`, `--tpl-pagination-current-size`, `--tpl-search-min-width` | NOT AVAILABLE IN FDS-101 (OBSERVED from Leads instead) | New this pass — traced to the Leads reference, not FDS-101, since FDS-101 has no table/toolbar component |
| Tag/Chip vertical padding | FDS-101 defines a Chip primitive (node `124:162`) but its exact padding wasn't read as text this pass | `--tpl-tag-padding-y: 2px` | ASSUMED | Not yet cross-checked against the real Chip component's `get_design_context` output — flagged as a follow-up, not done this pass |
| Data Display page | Page exists (node `70:2`) but only defines Avatar and Card — no Table/List component | N/A | UNKNOWN / NOT AVAILABLE IN FDS-101 | Confirms the task's own framing: FDS-101 has no table composition to consume; the Leads reference is correctly the only source for table/toolbar/pagination composition |

## C. Genericity audit (Section 29)

Re-ran a full grep of `src/template/`, `src/patterns/`, and `src/index.ts` for
`Lead|Sales Person|Contact Number|Hot|Warm|Cold|Convert to Contact|Send Email|Call|
Archive|Export|Qualified|Contact Attempted` (case-insensitive). Every match is inside
a comment explaining *why* the template must stay generic (e.g. `Tag.tsx`'s own
docstring: *"it has no idea what a 'Hot Lead' or a 'Won Deal' is"*) or is a citation
of the Leads Figma evidence used to justify a token value (e.g. `--tpl-row-height`'s
comment citing "Leads FrozenColumnTable"). No entity-specific identifier, string
literal, CSS class name, or default value exists in template/pattern code. Clean —
same result as the prior pass, re-verified after this pass's edits.

## D. Hardcoded value audit (Section 28)

| Value | Location | Classification | Disposition |
|---|---|---|---|
| `min-width: 220px` (search) | `TableList.css` | Was ASSUMED, factually close but wrong | Fixed → `--tpl-search-min-width: 208px` (OBSERVED, Leads) |
| `1px 0 0` / `-1px 0 0` box-shadow (frozen column separator) | `TableList.css` | Untokenized, duplicated `--tpl-border-width`'s value | Fixed → now reads `var(--tpl-border-width)` |
| `padding: 2px ...` (tag) | `TableList.css` | Untokenized magic number | Fixed → `--tpl-tag-padding-y` token added (still ASSUMED value) |
| `min-width: 160px` (overflow menu) | `TableList.css` | No FDS-101/Leads evidence for a menu-width value | Left as a literal, now with an explicit IMPLEMENTATION-SPECIFIC comment |
| `width:1px;height:1px;margin:-1px` (visually-hidden label) | `TableList.css` | The standard sr-only CSS idiom | Left as-is — not a design value, a universal accessibility pattern |
| `outline: 2px` / `outline-offset: 2px` (focus ring) | `TableList.css` | No FDS-101 focus-ring-width token | Left as ASSUMED, common default |
| `@media (max-width: 640px)` | `TableList.css` | No FDS-101 breakpoint token exists | Left as ASSUMED per Section 34 ("do not invent a complete breakpoint system") |

## E. Remaining gaps (nothing here blocks the task's own required stopping point)

**Resolved this correction round** (previously listed here as open, now closed —
see the dedicated sections above for evidence): the button-typography conflict,
the toolbar/table container fusion, and the pagination/overflow/search/filter/
columns icon treatment.

Still open:

- **Tag/Chip padding** (`--tpl-tag-padding-y`) was not cross-checked against FDS-101's
  real Chip component via `get_design_context` — only Button was.
- **`Saved Views` has no icon wired in** — no FDS-101 icon name was confidently
  matched to it without expanding the icon-name search beyond what this round's
  scope covered (see the Iconography section above); it remains text-only, as it
  was before this pass.
- **The states-share-one-card treatment (loading/error/empty) is this pilot's own
  extension of the confirmed success-state card evidence**, not itself directly
  observed in the Leads reference (which only shows a populated table) — flagged
  as ASSUMED in the relevant CSS comment, not asserted as evidenced.
- **The bulk-action-bar's own rounded corners/margin** were left untouched inside
  the newly-fused collection card (a pre-existing style, not contradicted by new
  evidence, and out of this round's specific scope) — may look slightly inset
  against the card's own radius; a minor cosmetic item, not addressed.
- **KPICards, real Quick/Advanced Filters, Manage Columns, and Saved Views remain
  unimplemented by design** (Section 12/26) — their extension points now have both
  correct visual sizing and, where a real icon exists, the correct icon, but are
  still not functional.
