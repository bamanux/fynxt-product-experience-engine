# Context: FDI design agent (condensed)

- FDI = FYNXT Design Inspector. Manual: `agent/fdi/README.md`. Status: PROPOSED (DL-0001).
- Flow: inputs → Design Case File (review loop via §11 + `/fdi-revise`) → Figma (FDS-101
  instances and variables) → Station repo code (tokens → components → template → page
  config) → publish to the gallery menu.
- A similar page = REUSE: new Figma design + page config + menu entry, **no new template**.
- Station is a **separate repo** (path/URL still unset in `agent/fdi/fdi.config.json`).
- Case-file review is markdown-in-repo. Humans own all approval statuses.
- Tokens: `design-system/tokens/tokens.json` **v0.2.0 DRAFT** (190 tokens, full Plugin-API import with
  aliases + Light/Dark, 5 form factors, 9 icon tones; 2026-10-12). Re-import: capture snapshot via
  `use_figma`, then `import-figma.mjs` → `build.mjs`. Open designer decisions D1–D12 in
  `EXTRACTION-2026-10-12.md` (D12: hover states bind primitives → broken in Dark).
- Station scaffolded locally at `../fynxt-design-code-station` (npm workspaces: @fynxt/tokens, @fynxt/ui 0.1.0
  with 8 FDS-101 components, @fynxt/templates empty, apps/studio = FDI Studio). Component specs:
  `design-system/components/fds-101-components.md`.
- FDI Studio = team web UI (DL-0002, PROPOSED). Headless runs via Agent SDK; `/fdi-figma` stays in Claude Code.
- Open: existing component library location, Figma work file, template-home conflict
  (DL-0001 point 1), designer approval of tokens.
- FDS-101 search must include page **12 · GUNA Components** (`398:2`): Dropdown Menu/Menu Item, Stat Card,
  Empty State, Form Modal (min/max/close, no body slot), Table Toolbar, Activity Card, Entity Chip, Priority Flag.
  `fds-101-components.md` inventory omits it (found in DCF-0001, 2026-10-12). Check the team-library publish too:
  unpublished components can't be instanced into the work file. Plugin API can't save Figma versions.
- DCF-0001 (2026-10-12): candidate **App Shell** + **Side Nav** (collapsible, live-product IA: Tickets & Activities › Tasks)
  live in the work file `0CwREH91xlsQOFpAUp852B` page `0:1`, section `8:2`. They overlap FDS-101 App Shell/Side Navigation (C9) —
  reuse them for new CRM pages rather than building a third shell. Published FDS-101 Top Nav has no notification badge.
- DCF-0001 Stage 3 (2026-10-12): Station branch `fdi/DCF-0001-crm-tasks`. `@fynxt/ui` 0.2.0 now has IconButton, Tooltip,
  Avatar, Chip, EntityChip, SearchField, FilterChip, Menu, MultiSelect, Modal/ConfirmDialog, EmptyState, StatCard,
  ActivityCard, SideNav, AppShell/TopNav — reuse them. Candidate template `ActivityWorkspace` renders dialogs from form
  schemas so gallery pages stay config-only. Station has no git remote yet (no PRs possible).

## DCF-0002 D8–D10 notes (2026-10-13)

- **Settings navigation (D8, designer-requested):** Settings is a bottom item in the main Side Nav, above a divider and the user tag. Opening it swaps the whole nav into `Mode=Settings` (Back + header + search + tree). Back only swaps the menu, never the page, and Settings stays selected. Candidate Side Nav `21:3687`; the separate Settings Nav panel (`44:7057`) is superseded.
- **Long builder flows (D10, FDI proposal pending review):** merge the "weights" and "values" steps into one master–detail step (list with inline weight + completion status, detail table on the right). Show remaining weight in a badge and disable Proceed until the step is valid.
- **FDS-101 gaps found:** Input Addon has no Filled state (value is grey), so override the text fill to `text/foreground`. Select / Input / Number Input have no compact in-table variant (DCF-0002 Q27, Q35, Q37).
- **Improving a read-only FDS-101 component and keeping its API (D12):** instance each library variant, detach it, `createComponentFromNode`, `combineAsVariants`, then re-add the same boolean properties and re-attach the references by layer path. Read the path map from the library first. Property IDs will differ; names and axes match. Then set paint fallback colours to the resolved token values, or the screenshot renderer shows the bound fills as black.
- **Tables are column-first** (designer, D12): Data Table Column (Type × Collapsed × Locked + Rows 6–10) is the building block. All cells and headers are fixed at 44px (`spacing/11`) so rows align across columns.
- **Settings nav, refined (D13/D14):** in `Mode=Settings`, don't repeat the Settings item at the bottom; show only divider + user tag. Settings mode collapses too: rail with Back, then one rail icon per settings section, current section active. Frames set `itemReverseZIndex` so the nav's edge toggle sits above the content.
- **Instance text hidden by a boolean property isn't in the instance tree** until the property is turned on: call `setProperties` first, then find the text.
- **Full-screen builder, candidate "focus mode" (DCF-0002 rev 2, Q45 approved by Aman Bansal):**
  - Layout: no app shell. A Builder Header, then three panes: logic outline (368), editor (fill), live summary (360).
  - AND/OR uses the Logic Switch built on FDS-101 Button Group `108:30`.
  - Never show a score total where the combining rule is undefined: show per-attribute contributions plus an info alert.
  - Clones of FILL-height frames into HUG cards collapse; set the clone to HUG.
- **Prototyping via the Plugin API (D19):**
  - Use `node.setReactionsAsync([{trigger:{type:"ON_CLICK"}, actions:[{type:"NODE", destinationId, navigation:"NAVIGATE", transition:{type:"DISSOLVE", …}}]}])`.
  - Targets inside instances can't carry reactions, so overlay transparent absolute "Hotspot" frames. In frames with `itemReverseZIndex`, insert hotspots at index 0 to keep them on top.
  - Register the flow with `page.flowStartingPoints`.
  - Instance sublayers hidden by an override drop out of the tree and can't be re-shown; create a fresh instance instead.
  - Cloning a variant inside a set loses its property references; re-link them.
- **Phase-1 rule from D18 (tech capacity):** builder summaries show only what is computed client-side (logic readout, weights). Anything needing an evaluation API (preview) waits for a later phase.

## DCF-0003 Stage 2 notes (2026-10-13)

- **Condition builder candidates** (work file page `84:4374`, section `84:4375`), in the **tree structure** the designer chose (DCF-0003 D2, after the live Add Data Filter / Advanced Filter Builder): All / Any root dropdown, dotted tree, arrow branches, + Add rule / + Add group at the top, group card with header, divider and inner tree. Parts: Logic Tree `94:7364`, Condition Row `84:4954`, Condition Group v2 `95:7994`, Rules Summary `84:4989`. Logic Divider, Match Selector and Group v1 are superseded (`98:26221`). Reuse these for any AND / OR rule UI (Advanced Filters, Lead Eligibility Criteria) instead of building another set. They overlap DCF-0002's Logic Switch `72:17580` / Logic Connector `72:17611` (DCF-0003 Q22 / Q23).
- **FDS-101 gotchas:** Select's `label` boolean is not wired to `LabelRow` (hide the layer instead); Select / Number Input / Date Field are fixed at 80px (set the instance to hug). Number Input and Date Field have no text properties, so edit the `Label` / `Value` text layers. FDS-101 **Card** is a sample deal card with no slot, so build containers from `surface/*`, `border/default` and `radius/lg`.
- **Wizards use the DCF-0002 Stepper Step `43:6900`** (designer D1 in DCF-0003): one step per screen under the page header.
- `resize()` on an auto-layout frame fixes both axes. Set `primaryAxisSizingMode` / `counterAxisSizingMode = 'AUTO'` afterwards or the frame (and its instances) stops hugging.
- FDS-101 Select's `Required` toggle renders no asterisk (DCF-0003 Q32c). Ghost Icon Button icons are token-bound: rebind the vector strokes to `status/error` for a red delete.

## DCF-0003 D3 notes (2026-10-14)

- **List page in the app shell:** clone DCF-0002's main-menu list frame (`52:10659`) and swap texts and columns. Columns = vertical frames of FDS-101 Data Table Header + Cell instances. Collect Side Nav item labels **before** calling `setProperties` on any item: changing an item's State invalidates sibling sublayer IDs.
- **These cloned frames have `itemReverseZIndex = true`:** absolute overlays (menus, toasts) must be inserted at index 0, or they render under the content.
- **Full-screen editor pattern** (D3, after DCF-0002): Builder Header `72:17730` + Stepper Step `43:6900` + sticky footer (Back · Step N of 3 · Next / Create). Pin frames shorter than 1004px to the viewport and set Body `layoutGrow = 1`.
- **Scrims:** paint opacity on a variable-bound fill is ignored, so use layer opacity. FDS-101 has no overlay token and no XL elevation (DCF-0003 Q39).
- **"Answer open questions by industry practice"** requests: write proposals in a separate §10.1 table and leave the Answer column empty (CLAUDE.md §13).

## DCF-0003 Stage 3 notes (2026-10-14)

- **`packages/ui/src/styles.css`:** add new component `@import`s **above** the box-sizing rule. Browsers ignore an `@import` after a rule, so the component renders unstyled, and jsdom tests can't catch it.
- **Browser check without new dependencies:** Node 24's built-in WebSocket can drive headless Chrome over CDP (navigate, click by button text, `Page.captureScreenshot`) against `/preview.html?page=<id>` on the Studio dev server (127.0.0.1:5190, often already running). DCF-0003 kept the script in the session scratchpad.
- **Stacked branches:** a case that needs unmerged components from another case is rebased onto that case's branch (designer decision, DCF-0003 Q43). Merging the other branch into `main` would be its code approval, which only the UI Code Reviewer can give.
- **Proposals in code:** product decisions that are only proposals go in the page config with `// PROPOSED (Qn)` comments. Templates take them as config, never as constants.
- **Reusable from DCF-0003:** `@fynxt/ui` ConditionBuilder, Stepper, Breadcrumb, Checkbox, Toast, DataTable, NumberField / DateField, Radio / RadioGroup (card appearance); template `CAND-DCF-0003-incentive-programs` (list + full-screen editor).

## DCF-0003 D5 (2026-10-15): vertical stepper, step move

- FDS-101 has **no stepper**. The only stepper is the DCF-0002 candidate **Stepper Step** (`43:6900`, work file `0CwREH91xlsQOFpAUp852B`). It now has `Orientation = Horizontal | Vertical` and a `Description` text prop (Vertical only). Reuse it for any wizard rail; don't create another stepper.
- Figma gotcha: moving a variant's child nodes into new wrapper frames (`appendChild`) **drops their `componentPropertyReferences`**. Re-set them after restructuring (`{characters: "Label#…"}`, `{visible: "Show connector#…"}`).
- An Upcoming circle on `surface/background` disappears on a `surface/background` rail. Put the rail on `surface/card`.
- A designer change made after CODE-REVIEW goes back to DESIGN-CHANGES-REQUESTED. Note in §12 that the branch is stale until `/fdi-build` runs again.
- Moving a section between wizard steps also moves its validation (Q10: the "nothing to enrol" check moved from Step 2 Next to Create). Raise it as a question, not a silent change.
- Build note (D5): when the station checkout is on another case's branch, build in a `git worktree` instead of switching branches. Note in §12 that later stacked branches need a rebase.
- DataTable: a 64 action column with the default 16 side padding overflows a 32 icon button (shows "…"). Remove the side padding in the template CSS, not in DataTable.
- Pixel-perfect method (DCF-0003, 2026-10-16): measure Figma text / box geometry with `use_figma` (absoluteBoundingBox relative to the frame + font + bound variable) and the DOM with a CDP script (Range rects + computed style); compare numbers, not screenshots. Found real causes fast: outer borders (+1), button stroke outside padding (+2), cell padding growing 44 rows, App Shell body padding.
- Never build in a git worktree inside OneDrive: syncing node_modules blocked file reads (git "Operation canceled", files read as empty) and filled the disk. Clone to `~/fynxt-work/` instead.
