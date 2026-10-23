---
id: DCF-0002
title: Scoring Builder — weighted scoring models for CRM objects
module: CRM / Admin settings
status: DESIGN-REVIEW
revision: 1
owner: Aman Bansal (Product Designer)
requestedBy: Aman Bansal
created: 2026-10-13
updated: 2026-10-13
figma:
  fileKey: 0CwREH91xlsQOFpAUp852B
  pageNodeId: "33:4040"
  approvedVersionId: null  # designer saves a named version (Plugin API cannot)
station:
  branch: null
  pr: null
---

# DCF-0002 — Scoring Builder — weighted scoring models for CRM objects

> Design Case File. Produced by FDI (FYNXT Design Inspector) per
> `[agent/fdi/README.md](../../agent/fdi/README.md)`. Reviewers: edit only **§11 Review
> Feedback** and the frontmatter `status`, then record the change in **§13 Status History**.

## 1. Summary

An admin screen where a user builds a **scoring model** for a CRM object (I1). The admin:
1. picks an object (e.g. Contact or Deal);
2. sets which records the model applies to;
3. chooses attributes of that object and gives each a weight, with the weights totalling 100;
4. for each attribute, defines values, groups them as Low, Medium or High, and gives each value a score;
5. defines outcome bands that turn the total score into a label (e.g. Low/Medium/High Risk, or Cold/Warm/Hot Deal).

A record's score is the sum over attributes of `matched value score × attribute weight`, as the formulas in I3 show. I2 and I3 work two models end to end: Client risk (Contact) and Deal score (Deal).

**No template fits.** The registry has only placeholders. Rev 1 proposes the builder as a **NEW-TEMPLATE candidate**, a "weighted scoring model" configuration page that is generic across objects. Where scores are displayed and how models are managed (list, activate) are open questions.

## 2. Inputs

| # | Input | Type | Location | Authority |
|---|---|---|---|---|
| I1 | Request text from Aman Bansal (Product Designer), pasted with `/fdi-intake` 2026-10-13 | Requirement from a named human | `[inputs/I1-request.md](inputs/I1-request.md)` (verbatim) | Binding for what it explicitly states (README §2). See Q1 on ownership |
| I2 | "Scoring Builder.pdf" (2 cases, 6 pages), supplied with I1 | Requirement worked examples (print of I3) | `[inputs/I2-scoring-builder.pdf](inputs/I2-scoring-builder.pdf)` | Structure and formula: as I1. **Sample values** (countries, scores, bands) are illustrative, not product rules |
| I3 | "Scoring Builder.xlsx", source of I2, with cell formulas | Requirement worked examples | `[inputs/I3-scoring-builder.xlsx](inputs/I3-scoring-builder.xlsx)`, transcript `[inputs/I3-transcript.md](inputs/I3-transcript.md)` | As I2. Cited for the formula (`=G13*D13`, `=SUM(…)`) |
| I4 | Reference: live Settings › Assessment list page (Settings rail + panel, tabs, banner, "All Assessments" table card with filter toolbar, toggles, pagination), supplied by Aman Bansal 2026-10-13 | Product screenshot (rank 5) | [`inputs/I4-ref-settings-assessments-list.png`](inputs/I4-ref-settings-assessments-list.png) | Visual reference for P2, as instructed |
| I5 | Reference: "Add Assessment" modal (sections, unit-suffix inputs, toggle row, distribution table with totals row) | Product screenshot (rank 5) | [`inputs/I5-ref-add-assessment-modal.png`](inputs/I5-ref-add-assessment-modal.png) | Visual reference for P1, to merge with I6 |
| I6 | Reference: "Create account" modal with a 3-step stepper (Cancel / Proceed) | Product screenshot (rank 5) | [`inputs/I6-ref-create-account-stepper.png`](inputs/I6-ref-create-account-stepper.png) | Visual reference for P1 ("one thing at a time") |
| I7 | Reference: accounts data table (checkbox column, uppercase headers with column menus, icon + text cells, tag chips with +N overflow, kebab actions, filter toolbar, pagination), supplied by Aman Bansal 2026-10-13 with D12 | Product screenshot (rank 5) | [`inputs/I7-data-table-reference.png`](inputs/I7-data-table-reference.png) (SHA-256 `096c8e29…dfce`) | Visual reference for the Data Table Header / Cell look (D12) |

No PRD/FRD, Jira ticket, wireframe or Figma frame exists for this feature. `product-knowledge/*` contains only READMEs.

## 3. Requirement Understanding

### 3.1 Users and goals

| User | Goal | Source |
|---|---|---|
| Admin user | Build the scoring logic for an object: attributes, weights, values with categories and scores, outcome criteria | I1 |
| (Consumers of the score: risk/compliance, sales) | See a risk score for clients and a deal score for deals | I2/I3 case titles. *Where and how the score is shown is not specified (Q12)* |

No persona file exists (Q14).

### 3.2 Functional requirements

| Req | Statement | Source |
|---|---|---|
| R1 | Admin selects an **object** to score (examples: Contact, Deal) | I1; I3 C10, C39 |
| R2 | Admin defines **pre-requisites** (which records the model applies to), e.g. User Type = Contact, Contact Category = Retail & Professional, Profile = Trader; "all active Deals" | I3 B2–C5, B33–C34 |
| R3 | Admin selects **attributes** of the selected object | I1; I3 C13–C22, C42–C51 |
| R4 | Each attribute gets a **weight** ("Score Weightage"); the weights of all attributes **sum to 100** | I1 ("the score should be 100 as sum of all atributes"); I3 D13:D22 = 0.4+0.2+0.2+0.2, D42:D51 = 4×0.25 |
| R5 | An attribute is a **field** (label + options) whose input type may be dropdown, text field, radio button "or any other form field" | I1 |
| R6 | For each attribute the admin defines **values** and assigns each a **category: Low, Medium or High** | I1; I3 E/F columns |
| R7 | There can be **multiple** Low, Medium and High values per attribute | I1 |
| R8 | A value row may hold several data items (e.g. "India, China") or a range (e.g. "0 to 10K", "4th stage and above") | I3 F13, F22, F44 |
| R9 | Each value gets a **score** | I1; I3 G column ("Risk Score") |
| R10 | Attribute contribution = **value score × attribute weight** (I1: "percentage of the value score out of attribute score") | I1; I3 `=G13*D13` etc. |
| R11 | Model total = **sum of attribute contributions** | I1 ("all attribute final score"); I3 `=SUM(H13:H24)` |
| R12 | Total maps to an **outcome band** ("criteria"): e.g. 0–30 / 31–70 / 71–100 → Low / Medium / High Risk, or Cold / Warm / Hot Deal | I1 ("has the criteria"); I3 C27:E29, C57:E59 |
| R13 | Band labels differ per model (Risk vs Deal wording) | I3 E27:E29 vs E57:E59 |

### 3.3 Business rules relied on

| Rule | Statement | Source |
|---|---|---|
| BR1 | Attribute weights must sum to 100% | I1; I3 |
| BR2 | Contribution = value score × weight; total = Σ contributions | I1; I3 formulas |
| BR3 | Values are categorised Low / Medium / High; multiples per category allowed | I1 |
| BR4 | A model has applicability pre-requisites | I3 |

Rules the design needs but **no source states** are in §10, including:
- the value-score range (Q7)
- range boundaries and band edges (C3, Q10)
- what happens when a record has no matching value (Q8)
- whether category must follow score order (Q7)
- band count and coverage (Q10)
- weight precision (Q11)

### 3.4 Permissions

| Role | Can | Source |
|---|---|---|
| "admin user" | Build scoring logic | I1 |

Everything else is uncited and open (Q15): which roles can view, create, edit, activate or delete models, and whether changes are audited.

## 4. Library Search

| Searched | Query / scope | Result |
|---|---|---|
| Template registry | All entries; categories CONFIG, FORM, LIST | `LIST-001`, `DETAIL-001`, `FORM-001`: **all `placeholder: true` → non-existent for REUSE**. No CONFIG template |
| `experience-library/templates/*` | All | `FYNXT-TPL-LIST-002`: Table List pilot, **unregistered**, table-only. Not a builder |
| `docs/template-discovery.md` | CONFIG / builder candidates | **`CAND-005` Pipeline / Stage Configuration Builder** (1 occurrence, Deals pipeline; "leaning Not Reusable"). Same family (admin configuration of named items with numeric attributes, add/delete rows, Cancel / Save & Apply) but different structure. This case is the **2nd CONFIG-builder occurrence**, which may justify CONFIG-pattern discovery (Q2) |
| Station `@fynxt/templates` | `src/` | Only the DCF-0001 candidate `ActivityWorkspace` (collection workspace). **Not applicable** |
| Station `@fynxt/ui` | Exports on branch `fdi/DCF-0001-crm-tasks` (**not merged, DCF-0001 at CODE-IN-PROGRESS**) | Button, IconButton, TextField, TextArea, Select (with chevron), MultiSelect, Chip, EntityChip, Badge, Card, Alert, Tooltip, Modal/ConfirmDialog, Menu, EmptyState, Tabs, StatCard, AppShell/TopNav/SideNav (candidates). Missing: NumberField, Accordion, DataTable, Breadcrumb, PageHeader, Form Section, Toggle, Radio |
| FDS-101 (Figma `3c44QQCA8h7GTZYH2EWn8H`) | Inventory + **12 · GUNA Components** (checked 2026-10-13) | Present: Number `119:916`, Radio `55:83`, Toggle `53:49`, Accordion `76:27`, Breadcrumb `73:14`, Data Table Cell/Header/Column (`421:`*, `429:5365`; duplicate sets `314:*`/`316:*`, see fds-101-components.md), **Settings Page Header** `370:149` (breadcrumb, title, help, Cancel / Save Changes), **Setting Row** `370:284`, **Form Section** `347:168`, Section Card `359:61`, **Report Builder** parts (Report Field Item `367:81`, Builder Panel `367:82`, Report Column `368:72`: draggable field rows with aggregate badge). **Not found:** weight-allocation meter, condition/rule-row builder, range (from–to) input |
| `ux/decisions/`, `ux/patterns/` | All | README only. No decisions |
| `history/`, `agent/context/` | "scor", "eligib", "criteria", "rule" | No prior scoring work. Live product nav (DCF-0001 I2) has **"Lead Eligibility Criteria"** under Sales: a likely sibling rule-builder (Q2) |
| `product-knowledge/*` | All | Nothing for scoring |

## 5. Page Plan

| Page | Class | Template (id@version) | Rationale | Menu location |
|---|---|---|---|---|
| P1 Scoring Builder (create / edit a scoring model) | **NEW-TEMPLATE** (candidate, DRAFT) | — (proposed "Weighted Scoring Model" builder) | No registered template fits. The page is object-agnostic, and Contact risk and Deal score are two configurations of it. CONFIG builders recur (`CAND-005`, live "Lead Eligibility Criteria"). A ONE-OFF would conflict with Station invariant 3 (C2). **Reviewer choice:** NEW-TEMPLATE vs ONE-OFF (Q2) | Admin › Settings › Scoring *(proposed, Q16)* |
| P2 Scoring models list (create, open, activate, delete) | **OUT OF SCOPE in rev 1** (proposed) | — | Not in I1. Needed in practice (two models already in I2/I3), but scope, lifecycle and states are undefined (Q3). If confirmed, it's a table list: candidate for `FYNXT-TPL-LIST-002` once registered | — (Q3, Q16) |
| P3 Score display on Contact / Deal records | **OUT OF SCOPE** | — | Consumer of the model. Not specified (Q12) | — |

### 5.1 P1 — Scoring Builder

- **Template configuration (proposed candidate surface):**
  - `objects`: scoreable objects + their fields and field types (from a metadata adapter, Q4)
  - `applicability`: condition rows `field · operator · value(s)` (operators Q5)
  - `attributes[]`: `{ field, weight }` with `weightTotal = 100` (BR1)
  - `attribute.values[]`: `{ category: Low|Medium|High, match, score }`; `match` depends on field type: options (dropdown/radio), range (number), text (Q6)
  - `bands[]`: `{ from, to, label }` (Q10)
  - `categories`: Low / Medium / High (I1; configurability Q17)
  - `permissionCheck`, `dataAdapter` (required, as in DCF-0001)
- **Regions (proposal, layout needs designer decision Q23):**
  1. **Page header** (FDS-101 Settings Page Header): breadcrumb, model name (Q18), Cancel / Save.
  2. **Object & applicability:** Object select (R1); "Applies to" condition rows with an add-condition control (R2).
  3. **Attributes & weights:** one block per attribute (Accordion or card), showing attribute name, field type, weight %. Remove action; Add attribute. A **running total** "Total weight: 80 / 100" with success/error state (BR1).
  4. **Values inside each attribute:** rows of Category · Value(s) · Score, plus a computed contribution `score × weight` (R10). Add value row; more than one row per category is allowed (R7).
  5. **Outcome bands:** rows of From · To · Label (R12, R13).
  6. **Preview (proposal, Q13):** enter sample values per attribute to see the score and band. This mirrors I2/I3 Client1/Client2 and Deal1/Deal2.
- **Interactions:**
  - Selecting an object loads its fields.
  - Changing the object clears attributes, after a confirmation.
  - The weight total updates live.
  - Value-input controls adapt to the attribute's field type (R5).
  - Save is blocked until rules pass (BR1; others pending Q7–Q11).
- **States:**
  - **new:** empty, object not chosen
  - **editing:** existing model
  - **loading:** edit
  - **validation:**
    - weights ≠ 100
    - attribute with no values
    - value without score
    - band gap or overlap (Q10)
    - range overlap (C3)
  - **saving**, **save error**, **saved**
  - **not found**
  - **read-only / no permission** (Q15)
  - **unsaved-changes prompt** on leave (Q21)
- **Responsive:** designed for desktop admin use. Below 800px, the attribute and value tables become stacked cards (proposal).
- **Accessibility:**
  - Sections are headed regions.
  - The weight total is announced through a live region.
  - Each value table has a caption.
  - Inline errors are linked to their fields.
  - Rows can be added and removed by keyboard; focus moves to the new row.
- **Data needed:**
  - objects and their fields (type, options)
  - model CRUD
  - optionally, evaluation of a sample record for Preview

  API unknown (Q4, Q24).

## 6. Component Plan

Code status refers to `@fynxt/ui` 0.2.0 on the unmerged DCF-0001 branch (Q22).

| Component | Class | Library ref | Change | Version impact | Used by |
|---|---|---|---|---|---|
| Button, IconButton, TextField, TextArea, Select, MultiSelect, Chip, Badge, Card, Alert, Tooltip, Modal / ConfirmDialog, Menu, EmptyState | EXISTING | `@fynxt/ui` 0.2.0 | — | none | P1 |
| AppShell / SideNav / TopNav | EXISTING (DCF-0001 candidates) | `@fynxt/ui` 0.2.0 | — | none | P1 shell |
| NumberField (with % suffix, min/max, step) | NEW-COMPONENT | FDS-101 Number `119:916` | Implement | new | Weights, scores, range bounds, band bounds |
| Accordion | NEW-COMPONENT | FDS-101 `76:27` | Implement | new | Attribute blocks (if chosen, Q23) |
| PageHeader (Settings Page Header) + Breadcrumb | NEW-COMPONENT | FDS-101 `370:149`, `73:14` | Implement | new | P1 header |
| Form Section | NEW-COMPONENT | FDS-101 `347:168` | Implement | new | P1 sections |
| DataTable (editable cells) | NEW-COMPONENT | FDS-101 Data Table Cell / Header / Column (duplicate sets to resolve) | Implement with cell slots | new | Values, bands |
| Toggle | NEW-COMPONENT | FDS-101 `53:49` | Implement | new | Model active / inactive (if in scope, Q3) |
| Radio / RadioGroup | NEW-COMPONENT (conditional) | FDS-101 `55:83` | Only if category selection is a segmented / radio control (Q23) | new | Values |
| Weight allocation meter | **gap: no FDS-101 component** | — | Proposal: Badge + text ("80 / 100") = EXISTING; a meter needs a new component + Figma first | — | Attributes |
| Condition row builder | **gap: no FDS-101 component** | — | Composite of Select + MultiSelect inside the template (no new component) | — | Applicability |
| Range input (from–to) | composite | NumberField × 2 | Template-level composition | — | Values, bands |
| Side Nav (Mode = Main / Settings; bottom Settings item + user tag) | VARIANT of DCF-0001 candidate | work file `21:3687` | D8 | candidate (affects DCF-0001, C15 there) | Shell |
| Stepper Step | NEW-COMPONENT (candidate) | work file `43:6900` | 3-step use since D10 | new | P1 |
| Table Header Cell · Table Cell (**SUPERSEDED by D12**) · Table Toolbar · Table Pagination | NEW-COMPONENT (candidate) | work file `51:10181`, `51:10204`, `51:10205`, `51:10250` | D9, per I4 | new (to port to FDS-101, Q37) | P2 |
| Attribute List Item (State Default/Selected × Status Complete/Incomplete) | NEW-COMPONENT (candidate) | work file `54:11894` | D10 master list | new | P1 Step 2 |
| Data Table Header · Data Table Cell | EXISTING (FDS-101 `522:11885`, `522:11918`, ported by designer after D12; local `58:12796` / `60:13217` superseded) | FDS-101 | — | none | P2 via Data Table Column |
| Data Table Column | NEW-COMPONENT (candidate; built from FDS-101 `522:*`) | work file `61:15527` | D12, per I7; column-first build | new (to port to FDS-101 replacing `316:3435` / `314:2978` / `429:5365`, Q38) | Tables (specimen `62:15167`; P2 pending Q38c) |
| Settings Nav | **SUPERSEDED** by Side Nav Mode=Settings (D8) | work file `44:7057` | — | — | — |
| Report Builder field rows (`367:81` etc.) | **considered, not selected** | FDS-101 GUNA | Drag-to-add field list; fits "pick attributes" but has no weight / value editing. Designer may prefer it (Q23) | — | — |

## 7. Template Changes (EXTEND / NEW-TEMPLATE only)

P1 is a **NEW-TEMPLATE candidate** (DRAFT, not created): a "weighted scoring model" builder with the configuration surface in §5.1. It is not an extension of anything registered. Relationship to `CAND-005` (pipeline builder): both are CONFIG builders. The designer may prefer to run CONFIG-pattern discovery first (Q2). No shared template is modified, so no `/fdi-impact` is needed.

## 8. Tokens

Same token set as DCF-0001 (`tokens.json` v0.2.0 DRAFT): surfaces, borders, text, brand, status/feedback, spacing, radius, typography. Category colours (Low / Medium / High → Badge success / warning / error?) are a design decision (Q17), OBSERVED until decided. There are still no breakpoint tokens (D11).

## 9. Conflicts

| # | Source A says | Source B says | Resolved by hierarchy? | Status |
|---|---|---|---|---|
| C1 | I1: an attribute acts as "dropdown, a text field or radiobutton, or any other form field" | I3: values are option lists ("India, China"), numeric ranges ("0 to 10K", "20K and above") and counts ("4th stage and above"). How a record value **matches** a value row per field type (exact option, range, text equals / contains, date?) is not defined | No | **Open** → Q6 |
| C2 | README §4.1: ONE-OFF = page built from components without a template | Station contract invariant 3: gallery pages are configuration only (carried from DCF-0001 C12) | No (two governance docs) | **Open**: affects the P1 class (Q2) |
| C3 | I3 Deal Stage: "0 to 2 stages" / "2 to 4 stages"; Income / Deal Value: "0 to 10K" / "10 to 20K" (shared endpoints) | Each record value must land in exactly one row. Bands "0 to 30 / 31 to 70" leave **30 < x < 31** unassigned, while the formula yields fractions (e.g. 32.5, 22.5) | No | **Open** → Q9, Q10 |
| C4 | I3 calls the value score "Risk Score" in both cases | Case 2 is a deal score, not a risk score | n/a (copy) | **Open**: label wording (Q17) |
| C5 | D6: new candidate **Settings Nav** (16 items, Brand Setup › Score Builder) | FDS-101 **Settings Sidebar** `370:2` exists but has fixed items and no properties, so it cannot show the live menu (I4) | Designer decision (D6) | **Decided:** candidate built from FDS-101 Sidebar Nav Items; reconcile with Settings Sidebar before promotion |
| C6 | I4: live Settings rail shows a Settings gear | DCF-0001 I2 (live, expanded nav) shows no Settings item | No (two live screenshots, different modes) | **Open:** gear added to the collapsed rail only (D7); whether the expanded Side Nav needs Settings is Q31 |

## 10. Open Questions / Missing Information

| # | Question | Blocks | Owner | Answer |
|---|---|---|---|---|
| Q1 | Who owns the scoring rules (PM)? Is I1 + I2/I3 the agreed spec, or is a PRD/FRD/Jira ticket coming? | Approval | Product Manager | |
| Q2 | P1 class: NEW-TEMPLATE candidate ("weighted scoring model") or ONE-OFF (see C2)? Run CONFIG-builder discovery with `CAND-005` and "Lead Eligibility Criteria" first? | §5, §7 | Product Designer | |
| Q3 | Is a **models list** in scope (create, open, duplicate, delete)? Can an object have several active models? Draft / active status, versioning? | P2, Toggle | PM + Product Designer | Partly answered by D3/D5: list page in scope (table, status toggle, actions, pagination). Lifecycle rules still open |
| Q4 | Which objects are scoreable (Contact, Deal, others)? Where do object fields, field types and options come from (metadata API)? | P1 | PM / Developer | |
| Q5 | Applicability (pre-requisites): which fields, which operators (=, in, not in, is active…), and AND / OR? Is "all active Deals" a condition or the default? | P1 | PM / BA | |
| Q6 | Value matching per field type (C1): option lists, numeric ranges (inclusive / exclusive, open-ended "and above"), text (exact / contains?), dates, multi-select fields | P1 | PM / BA | |
| Q7 | Value score range: 0–100? Integers or decimals? Must Low < Medium < High in score, or is the category only a label? | P1 validation | PM | |
| Q8 | If a record's value matches no row, or the field is empty: does that attribute contribute 0, or is the weight redistributed? | Formula | PM | |
| Q9 | Can the same option or range appear in two value rows? Should overlaps be blocked (C3)? | Validation | PM | |
| Q10 | Outcome bands: always three? Labels per model (yes per I3)? Inclusive edges, decimals between bands (C3), must they cover 0–100 with no gaps? | P1 | PM | |
| Q11 | Weight precision (whole % or decimals)? Block Save until the total is exactly 100? | P1 | PM | |
| Q12 | Where is the resulting score shown (record field, list column, badge)? When is it recalculated (model save, record change, schedule)? Is it in scope for this case? | P3 | PM | |
| Q13 | Is a **preview / test** panel wanted (enter sample values → score + band, as the I2/I3 worked examples do)? | P1 | Product Designer | Answered by D2: preview in step 4 |
| Q14 | Persona: which admin role(s)? | §3.1 | PM | |
| Q15 | Permissions: who can view, create, edit, activate or delete models? Is there an audit trail? | P1 | PM / BA | |
| Q16 | Menu location (proposed Admin › Settings › Scoring; the live nav has "Lead Eligibility Criteria" under Sales) | Menu | PM + Product Designer | Answered by D5 (Aman Bansal, Product Designer): Settings › Brand Setup › Score Builder |
| Q17 | Category set fixed (Low / Medium / High) or configurable? Category colours? Value-score label ("Risk Score" vs "Score", C4) | P1 | Product Designer | |
| Q18 | Model fields: name, description, effective date? | P1 | PM | |
| Q19 | Editing a live model: recalculate existing scores? Keep history? | P1 | PM | |
| Q20 | All state copy: empty, validation, save error, not found | P1 | Product Designer / Content | |
| Q21 | Unsaved changes on leave or Cancel: confirm? | P1 | Product Designer | |
| Q22 | Dependency: the components P1 reuses ship in `@fynxt/ui` 0.2.0 on the **unmerged** DCF-0001 branch, including the candidate App Shell. DCF-0002 code depends on that merge | Stage 3 | UI Code Reviewer | |
| Q23 | Layout: attribute blocks as accordion cards, master-detail (attribute list + value table), or Report-Builder-style field picker? Category as select or segmented control? | Figma | Product Designer | Answered by D4: stepper modal, one attribute at a time |
| Q24 | API: model CRUD, evaluation endpoint for preview, object metadata | Stage 3 | Developer | |
| Q25 | Limits: maximum attributes per model, values per attribute | P1 | PM | |
| Q26 | FDS-101 **Table Search Field** is not in the published library (import fails), so the P2 search uses the Input component with a leading search icon. Publish it? | P2 | Product Designer (FDS-101 owner) | |
| Q27 | FDS-101 Select / Input / Multi Select reserve label and helper space even when hidden (instances are 80px tall); inside tables FDI resized them to the 40px box. Add a "no label" / table variant? | P1 rows | Product Designer | |
| Q28 | The candidate Side Nav (DCF-0001) has **no Settings / Admin item**, so nothing is highlighted on the Scoring page. Where does Scoring sit in the menu (see Q16)? | Shell | PM + Product Designer | Resolved by D5/D7: page lives in the Settings module; rail shows Settings active |
| Q29 | Brand Setup's other child items are not known (only the new "Score Builder" is shown under it) | Settings Nav | PM | |
| Q30 | The builder modal is 1080px wide since D10 (master–detail; was 900, I5/I6 are ~900); FDS-101 Form Modal sizes are 400 / 560 / 720. Add an XL size (OBSERVED until then)? | P1 | Product Designer | |
| Q31 | Should the expanded Side Nav also have a Settings item (C6)? | Shell | Product Designer | |
| Q32 | Row actions in the list: which (Edit, Duplicate, Delete, View audit)? The FDS Data Table Action cell shows view + kebab | P2 | PM | |
| Q33 | Steps: can users jump between completed steps by clicking the stepper? Is Proceed blocked until the step validates (shown for weights ≠ 100%)? | P1 | Product Designer | |
| Q34 | Attribute order: drag handle shown on each Attribute List Item. Does order matter (display only, or evaluation order)? Keyboard alternative for reorder (move up / down)? | P1 Step 2 | Product Designer + PM | |
| Q35 | FDS-101 Input Addon has no Filled state (value renders in placeholder grey); the Attribute List Item overrides the value text to `text/foreground` (OBSERVED). Add a Filled state? | Attribute List Item | Product Designer (FDS-101 owner) | |
| Q36 | FDI proposals in D10, not rules: (a) **Distribute evenly** — how to round when 100 doesn't divide (e.g. 3 × 33.33 or 34/33/33)? (b) a new attribute gets Low / Medium / High rows pre-added — keep? | P1 Step 2 | Product Designer + PM | |
| Q37 | D9 table look: port Table Header Cell / Cell / Toolbar / Pagination candidates into FDS-101, and add a compact (no label, 40px) variant of Select / Input / Number Input for in-table editing (see Q27)? | §6 | Product Designer (FDS-101 owner) | |
| Q38 | D12 candidates: (a) FDS-101 has duplicate Data Table Header / Cell sets (`421:*` and `314:2978` / `316:3435`); FDI rebuilt from `314:2978` / `316:3435` (used by Data Table Column) — which is canonical? (b) Defaults changed for the I7 look: Header Sorting and Drag icon **off**, Menu added to the Default state; Values cell overflow chip moved after the text; Column Values cells have subtext off. Keep? (c) Rebuild the P2 Score Builder table from Data Table Column instances now, or after FDS-101 adopts it? | §6, P2 | Product Designer (FDS-101 owner) | |
| Q39 | FDS-101 Data Table Cell has no **Toggle** type (P2 Status, from I4) and no **editable/input** type (P1 values and bands tables). Add `Data Cell=Toggle` and an input slot, or should P2 show a Status badge? | §6, P1, P2 | Product Designer (FDS-101 owner) | |
| Q40 | FDS-101 follow-ups found in D15: (a) Data Table Column `429:5365` is still built from the old Header/Cell (`316:3435` / `314:2978`), not `522:*`. The work-file Column `61:15527` is the updated version to port. (b) Empty State's Action button hugs to 20px high; FDI fixed it in the P2 Empty frame only | FDS-101 | Product Designer (FDS-101 owner) | |

## 11. Review Feedback

<!-- Reviewers: add one row per point. FDI fills "Resolution" on /fdi-revise. -->

| # | Rev | Reviewer | Section | Feedback | Resolution (FDI) | Closed? |
|---|---|---|---|---|---|---|
| D1 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 at `/fdi-figma` | §5, Q23 | Layout: "a table page for all the scoring and scoring builder as a modal popup form" | Superseded by D4/D5 (rev-1 frames kept in a SUPERSEDED section on the page) | No |
| D2 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | Q13 | Include the **preview / test panel** | Applied in Figma inside the builder modal | No |
| D3 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | Q3 | Include the **scoring models list** (P2) | Applied in Figma. Lifecycle details (activate, duplicate, versioning) still open in Q3 | No |
| D4 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5.1 P1 | "The builder form should be like one thing at a time … merge both" references I5 (Add Assessment) and I6 (Create account stepper) | Applied 2026-10-13: P1 is now a **4-step modal** (Stepper from I6 + table/section style from I5): 1 Details & scope · 2 Attributes (weight table, % addon inputs, totals row) · 3 Values & scores (**one attribute at a time** via a tab switcher) · 4 Bands & preview. Footer Cancel / Back / Proceed → Save score model. Header: Clear fields + window actions (I6) | No |
| D5 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5 P2, Q16 | List page per I4; lives in the **Settings module › Brand Setup › Score Builder** (new menu item) | Applied: P2 rebuilt per I4 in the **Settings module**: app rail (Settings active), top bar "Settings", **Settings Nav** with **Brand Setup › Score Builder** (new item, active), page header + kebab, tabs Score Builder / Audit logs, banner, "All score models" + Create, table card (toolbar: Filter, Status, Object, Created By, Clear all, search; uppercase headers; status Toggle; row actions; pagination). Answers Q16 / Q28 | No |
| D6 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6 | "Use the components wisely; feel free to introduce new components if required" | Applied: new candidates **Stepper Step** `43:6900` and **Settings Nav** `44:7057`; FDS-101 **Input Addon** (% suffix), **Secondary Tab**, **Toggle**, **Pagination**, **Table Toolbar** reused | No |
| D7 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6 | "Also edit any component if you feel it necessary" | Applied to work-file candidates only (FDS-101 is read-only for FDI): DCF-0001 candidate **Side Nav** (Collapsed) gained a **Settings** rail item, per I4. Impact: DCF-0001 frame "P1 · Default (App Shell · nav collapsed)" `22:5789` now shows the gear too (visual only); Expanded variant unchanged | No |
| D8 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5 P2, shell | Settings menu at the **bottom of the main side nav**, just above the **user tag** (avatar, name, ID / profile) with a **divider** between them. Opening it makes the **Settings menu take the full side-nav area**, with a **Back** button; Back returns to the main menu **without changing the page**, and **Settings stays selected** | Applied: candidate **Side Nav** `21:3687` gained a `Mode` axis (Main / Settings × Expanded / Collapsed). Bottom area = Settings item · divider · user tag (avatar, name, "ID · role"). Settings mode fills the nav: Back + "Settings" header, search, settings tree (Brand Setup › Score Builder active); the bottom Settings item stays Active. P2 frames: Settings menu open `52:10222`, after Back (main menu, page unchanged, Settings selected) `52:10659`. Replaces the separate Settings Nav panel (`44:7057`, superseded). Impact on DCF-0001 recorded there (C15) | No |
| D9 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6 | Improve the **table** component (and other components) to match the look and feel of the screenshot (I4); designer will then update FDS-101 | Applied as work-file candidates in `43:6878` (FDS-101 untouched): **Table Header Cell** `51:10181`, **Table Cell** `51:10204` (Text / Text + Subtext / Toggle / Actions), **Table Toolbar** `51:10205`, **Table Pagination** `51:10250`; P2 table rebuilt from them. Editable tables in P1 use bordered card, tinted uppercase header row and compact 40px controls (Q27, Q37) | No |
| D10 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5 P1 | "Improve the scoring flow: it is too long and there is scope to improve the user experience" | Applied (FDI proposal, for designer review): **4 steps → 3** — 1 Details & scope · 2 Attributes & scoring · 3 Bands & preview. Old steps 2 (weights) and 3 (values, one tab per attribute) merged into one **master–detail** step: left = attribute list (new candidate **Attribute List Item** `54:11894`: drag handle, name, type · value count, completion status, weight % inline); right = selected attribute's values table with live contribution. Running total badge "80 / 100% · 20% left", Proceed disabled until complete (Q33). Assists proposed, not rules: **Distribute evenly**, Low / Medium / High rows pre-added for a new attribute (Q36). Modal widened to 1080 (Q30) | No |
| D11 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6 | Designer will port the improved components into FDS-101 after review | Noted, no FDI action: FDS-101 is read-only for FDI. Candidates to port are listed in §6 and §12 | No |
| D12 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6 | "Improve the Data table header and data table cell without losing its properties … look and feel as in screenshot (I7) … the table to be in column fashion, not row-wise, in the component so it is easy to build and adjust" | Applied as work-file candidates (FDS-101 read-only for FDI), section `58:12661`: **Data Table Header** `58:12796` (6 States; Drag icon, Menu, Sorting, text, lock, expand, manage columns), **Data Table Cell** `60:13217` (16 State × Data Cell; Avatar, Type Icon, tailing Icon, overflow, Link, text, edit, Primary/Secondary Action, subtext, INFO ICON), **Data Table Column** `61:15527` (Type × Collapsed × Locked + Rows 6–10), all with FDS-101's variant axes and property names. Look per I7: 44px rows and header (`spacing/11`), uppercase Table/Header labels, Body/SM values, 16px side padding, column dividers, horizontal-ellipsis column menu. Specimen `62:15167` rebuilds I7 from 10 column instances. Earlier candidates `51:10181` / `51:10204` superseded. Property IDs differ from FDS-101 (new components); defaults changed and P2 not yet rebuilt — see Q38 | No |
| D13 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 at `/fdi-figma` | §5 P2, shell | "Why is Settings shown again when the user is already in the Settings menu" | Applied: in Side Nav `Mode=Settings` (Expanded and Collapsed) the bottom Settings item is hidden; the divider and user tag stay. "Settings stays selected" (D8) now applies only to `Mode=Main` after Back (`52:10659`) | No |
| D14 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5 P2, shell | "The side nav with the Settings menu enabled is also an expandable and collapsible menu" | Applied: `Nav=Collapsed, Mode=Settings` rebuilt as a Settings rail (Back, divider, one Nav Rail Item per settings section using the same icons as the expanded list, Brand Setup active); it previously showed the main rail. The expanded Settings mode keeps its Collapse toggle. New P2 frame "Settings menu collapsed" `67:21976`. P2 frames now stack the nav above the content so the toggle is not covered | No |
| D15 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6, P2 | "The tables are not updated with the FDS-101 components" | Applied: the designer had ported D12 into FDS-101 (Data Table Header `522:11885`, Data Table Cell `522:11918`). Data Table Column candidate `61:15527` now uses those (264 instances swapped); local D12 Header/Cell sets marked superseded. All five P2 tables rebuilt column-first from Column instances (ID, Name + subtext, Object, Applies to (flexible width), # Attributes, Outcome bands, Status, Actions). Status keeps the I4 toggle in a cell-styled frame: FDS-101 has no toggle cell (Q39). P1 editable tables unchanged: Data Table Cell has no input slot (Q39) | No |
| D16 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 at `/fdi-revise` | §3, §5.1 | "need to have two or more Object selection and inside the object attributes will have AND/OR Logic one between all the atribute and between object can have And and OR logics and can be different between two objects" | | No |
| D17 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 at `/fdi-revise` | §5 P1 | "also the Design should feel useful and if required lets make it as full screen score builder with out app shell" | | No |

## 12. Design & Build Record

- **Figma:** [https://www.figma.com/design/0CwREH91xlsQOFpAUp852B/FDI---Test?node-id=33-4040](https://www.figma.com/design/0CwREH91xlsQOFpAUp852B/FDI---Test?node-id=33-4040) · page `33:4040` "DCF-0002 — Scoring Builder" · approved version **not yet recorded**
  - **Current (after D8–D10):**
    - P2 Score Builder list `52:10221` (D8 Settings in main side nav): Default — Settings menu open `52:10222`, After Back — main menu, Settings selected `52:10659`, Empty `52:11081`, Loading `52:11518`, Error `52:11938`
    - P1 Score Builder 3-step modal `55:11793` (1080 wide, Q30): Step 1 Details & scope `55:11794`, Step 2 Attributes & scoring (complete, Country selected) `55:11985`, Step 2 in progress (new Income attribute, 80% assigned, Proceed disabled) `55:12664`, Step 3 Bands & preview `55:11873`
    - P2 after D13–D15: tables in all P2 frames rebuilt column-first (FDS-101 header/cells); new frame Settings menu collapsed `67:21976`; Side Nav `21:3687` Settings mode without the duplicate Settings item, collapsed Settings rail rebuilt
    - D12 Data Table candidates `58:12661`: Header `58:12796`, Cell `60:13217`, Column `61:15527`, specimen table from I7 `62:15167` (Table Header Cell `51:10181` and Table Cell `51:10204` superseded)
    - Candidates `43:6878`: Stepper Step `43:6900`, Table Header Cell `51:10181`, Table Cell `51:10204`, Table Toolbar `51:10205`, Table Pagination `51:10250`, Attribute List Item `54:11894`; Side Nav `21:3687` (DCF-0001 page) with Mode axis
  - **Superseded (kept on the page):** P1 4-step modal `46:7609` (D4), P2 with separate Settings panel `45:7014` (D5), P2 in App Shell `33:4041` and P1 single-page modal `33:4042` (rev 1); Settings Nav `44:7057`
  - Audit after D15 (current sections): 1,691 instances, 0 images, fonts Lexend/Sora only, no unbound fills, no superseded components left in P2. Earlier audit: 759 instances, 0 images, fonts Lexend/Sora only, no unbound fills outside components. (D4–D7 audit: 744; rev 1: 609.) Sample data from I3 (Client Risk Score; preview = Client2 → 50, Medium Risk)
  - Code Connect: Number Input, Data Table Header/Cell, Form Modal body composition not yet mapped (Stage 3 task)
- **Station:** — (not started)
- **QA (CLAUDE.md §17):** not applicable until Stage 3.

| Check | Result | Verified by |
|---|---|---|
| PRD / FRD | | |
| Template rules | | |
| Design system (tokens, components) | | |
| UX decisions | | |
| States | | |
| Permissions | | |
| Accessibility | | |
| Responsive | | |

## 13. Status History

| Date | From → To | Who | Note |
|---|---|---|---|
| 2026-10-13 | — → DRAFT | FDI | Created from I1 (request), I2 (PDF), I3 (workbook) |
| 2026-10-13 | DRAFT → IN-REVIEW | FDI | Rev 1. Pages: P1 NEW-TEMPLATE candidate, P2/P3 out of scope. Components: 15 EXISTING (incl. DCF-0001 candidates), 6–7 NEW-COMPONENT (FDS-101 sources exist), 2 gaps. 4 conflicts, 25 open questions. Formula verified against I3 (all four worked examples reproduce) |
| 2026-10-13 | IN-REVIEW → APPROVED | Aman Bansal (Product Designer) | Rev 1 approved. Set in file as "Approved ", role confirmed in chat; FDI transcribed to the canonical value. Design decisions D1–D3 given at approval (§11) |
| 2026-10-13 | APPROVED → DESIGN-IN-PROGRESS | FDI | `/fdi-figma`: gate passed; D1–D3 decided at approval |
| 2026-10-13 | DESIGN-IN-PROGRESS → DESIGN-REVIEW | FDI | P2 list (4 states) and P1 builder modal (Edit with Preview, Create, Validation) built in page `33:4040`. New Q26–Q28. Designer to save a named version |
| 2026-10-13 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-figma`: D4 stepper builder (merge I5+I6), D5 Settings › Brand Setup › Score Builder list per I4, D6 component freedom. FDI transcribed |
| 2026-10-13 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | D4–D7 applied: Settings list (4 states), 4-step builder (7 frames), new candidates Stepper Step + Settings Nav, Side Nav rail Settings item. C5, C6, Q29–Q33 added. Designer to save a named version |
| 2026-10-13 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-figma`: D8 Settings in main side nav, D9 table/component look per I4, D10 shorter scoring flow, D11 FDS-101 update later. FDI transcribed |
| 2026-10-13 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | D8–D10 applied: Side Nav Mode=Settings with bottom Settings + user tag (P2, 5 frames); table candidates per I4; builder shortened to 3 steps with master–detail Step 2 (4 frames) and new Attribute List Item. D11 noted. Q30 updated, Q34–Q37 added. Designer to save a named version |
| 2026-10-13 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat: D12 improve Data Table Header / Cell per I7, keep properties, column-first component. FDI transcribed |
| 2026-10-13 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | D12 applied: Data Table Header / Cell / Column candidates with FDS-101 API, I7 specimen; Q38 added. Designer to save a named version |
| 2026-10-13 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-figma`: D13 no duplicate Settings in Settings mode, D14 Settings menu collapsible, D15 tables from FDS-101 components. FDI transcribed |
| 2026-10-13 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | D13–D15 applied: Side Nav Settings mode fixed (expanded + collapsed rail), new P2 frame `67:21976`, P2 tables rebuilt from FDS-101 Data Table Header/Cell via Column candidate. Q39–Q40 added. Designer to save a named version |
| 2026-10-13 | DESIGN-REVIEW → CHANGES-REQUESTED | Aman Bansal (Product Designer) | With `/fdi-revise`: D16 multi-object scoring with AND/OR logic, D17 useful / full-screen builder. Asked to reopen requirements rather than treat this as a design change (chat answer: "Reopen requirements"). FDI transcribed |

## 14. Revision Log

| Rev | Date | Summary of changes | Feedback items addressed |
|---|---|---|---|
| 1 | 2026-10-13 | Initial | — |
