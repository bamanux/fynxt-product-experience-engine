---
id: DCF-0003
title: Filter-based (Object) Enrolment — Incentive Program wizard, Step 2 Enrollment Criteria
module: FYNXT Cloud (CRM) / Incentive Program
status: CODE-IN-PROGRESS
revision: 1
owner: Aman Bansal (Product Designer)
requestedBy: Aman Bansal
created: 2026-10-13
updated: 2026-10-22
figma:
  fileKey: 0CwREH91xlsQOFpAUp852B
  pageNodeId: "84:4374"
  approvedVersionId: "2413067555528508501"  # updated Figma supplied by Aman Bansal (Product Designer) 2026-10-22 with /fdi-build ("make it like figma"); D5 build was against 2410552998186577751
station:
  branch: fdi/DCF-0003-object-enrolment
  pr: "local review (Q44): main..fdi/DCF-0003-object-enrolment, stacked on fdi/DCF-0001-crm-tasks"
---

# DCF-0003 — Filter-based (Object) Enrolment — Incentive Program wizard, Step 2 Enrollment Criteria

> Design Case File. Produced by FDI (FYNXT Design Inspector) per
> [`agent/fdi/README.md`](../../agent/fdi/README.md). Reviewers: edit only **§11 Review
> Feedback** and the frontmatter `status`, then record the change in **§13 Status History**.

## 1. Summary

Today a broker admin can set enrolment for an incentive program only through fixed criteria: Country, Account Type, Account Status and Manual Enrollment (I1 *Why*, I1 *S1 today*). This case redesigns **Step 2 Enrollment Criteria** of the Incentive Program wizard so the admin can also build **rules on CRM objects and their fields** (Object, Field, Condition, Value). The admin combines the rules with **All / Any** and can put rules into **one level of groups**, each with its own All / Any (I1 U1–U6). Participants (clients or IBs) enrol only if their CRM record meets the rules. The backend checks the rules once at enrolment, and Participant Blocking still overrides them (I1 B1–B4).

The UI is a **grouped condition builder**. The same pattern already appears in the Leads list's Advanced Filter Builder and in DCF-0002's AND / OR logic. This is its **third occurrence**, so §6 proposes one shared **ConditionBuilder** candidate component instead of a third one-off.

## 2. Inputs

| # | Input | Type | Location | Authority |
|---|---|---|---|---|
| I1 | *Feature: Filter-based (Object) Enrolment* PRD, page status **Draft**, product owner not named | PRD | [`inputs/I1-object-enrolment-prd.pdf`](inputs/I1-object-enrolment-prd.pdf) (cited, SHA-256 `8624dcc9…`); source [`inputs/I1-object-enrolment-prd.docx`](inputs/I1-object-enrolment-prd.docx) | Binding (rank 2). Draft status and the unnamed owner are Q1 |
| I1a | *S1 today: Step 2 Enrollment Criteria* screenshot embedded in I1 p.2: tabs Country / Account Type / Account Status / Manual Enrollment; Include Countries and Exclude Countries checklists; Step 3 Participant Blocking below | Product screenshot (inside PRD) | I1 p.2 | Current-state evidence |
| I2 | Wireframe **Option B: One rule builder** (clickable Design Component export), named in I1 *Design* | Wireframe | [`inputs/I2-wireframe-option-b.dc.html`](inputs/I2-wireframe-option-b.dc.html) (SHA-256 `b709ec3a…`). Runtime files (`support.js`, `vendor/`) not copied: they are not part of the design | Visual intent only (rank 6) |
| I3 | Link to the same wireframe | Wireframe link | https://claude.ai/artifact/VeagGXH62nuLdyJXq15vLR (from I1 *Design*). **Not re-read.** FDI used the local export I2 and assumes the two match (Q27) | Visual intent only (rank 6) |
| I4 | `README.md` shipped beside I2 | Export note | Quoted below. Not copied | Non-authoritative |
| I5 | `/fdi-intake` request from Aman Bansal, 2026-10-13: "Act as FDI … Follow `agent/fdi/README.md` §2–§4", attaching I1 and I2 | Request | This conversation | Binding for process only. States no product rules |
| I6 | Reference: live **Add Data Filter** modal (Advanced Filter Builder): AND root dropdown with dotted tree and arrow branches, Column / Conditions / Value rows with red trash, nested Group with header (AND, + Add Row, + Group, delete), + Add Row / + Group at top, Clear All, object tabs. Supplied by Aman Bansal with `/fdi-figma`, 2026-10-13: "for logical builder we can use this kind of structure do not make it in popup just the innerstructure for reference" | Product screenshot (rank 5) | [`inputs/I6-ref-add-data-filter.png`](inputs/I6-ref-add-data-filter.png) | Visual reference for the builder's inner structure (D2). Not rules |

**I4, quoted verbatim (excerpt):**

> This is a design mockup created in a visual design tool, exported as a standalone page. Treat it as a REFERENCE MOCKUP, not production code: the markup and inline styles carry the design's precise values — colors, font sizes, spacing, radii, shadows, layout — which an implementation should replicate faithfully in its own components and styling system rather than copy wholesale.

I4's "replicate faithfully" is an instruction inside an input. FDI does not follow it over CLAUDE.md §9 (tokens). See C3.

## 3. Requirement Understanding

### 3.1 Users and goals

| Actor | Goal | Source |
|---|---|---|
| Broker admin | Set the enrolment rules on a program, so that only matching participants enrol | I1 *Who is involved*, US1 |
| CRM (FYNXT Cloud) | Supply objects, fields, values and participant records | I1 *Who is involved*, B1 |
| Participant (client or IB) | Enrols only if they match the rules (no UI in this case) | I1 *Who is involved*, B2 |

No persona files exist in `product-knowledge/personas/` (README only).

### 3.2 Functional requirements

| Req | Statement | Source |
|---|---|---|
| R1 | In Step 2 the admin can add rules on CRM objects and their fields | I1 U1, US1 |
| R2 | A rule is Object, Field, Condition and Value. The Field list shows only the chosen object's fields. Conditions and values depend on the field | I1 U2, *Data and interfaces* |
| R3 | The admin sets whether participants must match **All** or **Any** of the top-level rules and groups. Required, values All / Any | I1 U3, *Data and interfaces* (Top-level match) |
| R4 | The admin can group rules. Each group has its own All / Any, which applies only to the rules inside it. Required per group | I1 U4, *Data and interfaces* (Group match), *Open questions* row 1 |
| R5 | A group holds rules only, not other groups | I1 U5, *Open questions* row 2, *Out of scope* |
| R6 | The admin can add and delete rules and groups, and clear all rules | I1 U6 |
| R7 | Object, Field, Condition and Value are each required per rule | I1 *Data and interfaces* |
| R8 | Values come from the CRM where a list exists. Otherwise the input type depends on the field | I1 *Data and interfaces* (Value) |
| R9 | Country, Account Type, Account Status and Manual Enrollment can still be set | I1 *What must not change* |
| R10 | The admin saves the program, which saves the rules | I1 *User journey* step 3 |
| R11 | Screen S1 is designed in the states **Empty** and **Filled** | I1 *Screens* |

### 3.3 Business rules relied on

| Rule | Statement | Source |
|---|---|---|
| BR1 | Objects, fields and values come from the CRM | I1 B1 |
| BR2 | A participant enrols only if their CRM record meets the rules | I1 B2, US1 |
| BR3 | The top level combines rules and groups with its All / Any. A group's All / Any applies only inside that group | I1 U3, U4, *Open questions* row 1 |
| BR4 | Groups cannot contain groups | I1 U5, *Open questions* row 2 |
| BR5 | Rules are checked once at enrolment, like the other criteria. Re-checking after enrolment is out of scope | I1 B3, *Open questions* row 3, *What must not change*, *Out of scope* |
| BR6 | Participant Blocking overrides all eligibility criteria, these rules included | I1 B4, *What must not change*, E5 |

**Worked examples checked.** FDI evaluated I1 E1–E5 against BR3 using the I1 setup (top level All: R1, R2, Group 1 (Any): R3, R4). All five expected results are consistent: E1 enrolled via R4; E2 fails Group 1; E3 fails R1; E4 (top level Any) passes on R2; E5 is blocked by BR6. US2 scenarios 1 and 2 also agree. These are design-side checks, not the automated tests that I1's *Definition of done* asks for.

Rules the design needs that **no source states** (all in §10): how the object rules combine with the fixed criteria and Manual Enrollment (Q3); operators per field type (Q4); single or multiple values (Q5); evaluation of fields on multi-record objects such as Trading Account › Balance (Q6); which objects each participant type can use (Q7); empty or deleted CRM fields (Q8, Q9); whether Step 2 needs at least one criterion (Q10); editing rules on a live program (Q16, Q29).

### 3.4 Permissions

| Role | Can | Source |
|---|---|---|
| Broker admin | Sets the enrolment rules on a program | I1 *Who is involved* |

That is the only statement. I1 *Non-functional › Permissions* is **blank**. View and edit rights, other roles, and editing after a program is live are all unknown (Q16). FDI adds no permission checks to the design.

## 4. Library Search

All searches run 2026-10-13.

| Searched | Query / scope | Result |
|---|---|---|
| Template registry (`templates/registry/template-registry.json`) | All entries; categories FORM, CONFIG, wizard / stepper | `FYNXT-TPL-LIST-001`, `FYNXT-TPL-DETAIL-001`, `FYNXT-TPL-FORM-001`: **all `placeholder: true`, so they do not exist for REUSE.** No CONFIG, wizard or rule-builder template |
| `experience-library/templates/*` | All | `FYNXT-TPL-LIST-002` (Table List pilot, unregistered): a table only, not relevant |
| `experience-library/catalog/`, `experience-library/patterns/` | All | README only. No patterns recorded |
| Station `packages/templates` (`../fynxt-design-code-station`, branch `fdi/DCF-0001-crm-tasks`) | All | `CAND-DCF-0001-activity-workspace` only (task workspace). Not relevant |
| Station `packages/ui` | condition, rule, filter, group, select, number, date, radio, segmented | `@fynxt/ui` **0.2.0** on the **unmerged** DCF-0001 branch: Button (primary / secondary / ghost / destructive), IconButton (incl. destructive / outline), TextField, TextArea, Select, MultiSelect, Badge, Card, Chip, FilterChip, Menu, Modal / ConfirmDialog, EmptyState, Alert, Spinner, Tabs, Tooltip, AppShell / SideNav / TopNav. `main` has only 7 components (Alert, Badge, Button, Card, Field, Spinner, Tabs). **Not found:** condition builder, number field, date field, search select, radio, segmented / button group, breadcrumb |
| FDS-101 (Figma `3c44QQCA8h7GTZYH2EWn8H`) | Inventory from `design-system/components/fds-101-components.md` and the DCF-0002 FDS-101 searches (2026-10-13). **Not re-queried live:** no authorised Figma connection in this session | Present: Select `50:81`, Search Select `57:58`, Multi Select `56:85`, Search Multi-Select `57:87`, Number `119:916`, Date Field `121:160`, Radio `55:83`, Button Group `108:30`, Card `74:46`, Badge `64:39`, Breadcrumb `73:14`, Section Card `359:61`. **Not found** (per DCF-0002 §4): condition / rule-row builder, logic connector between groups, condition-group container |
| `ux/decisions/`, `ux/patterns/` | enrolment, eligibility, criteria, rule, condition, AND/OR, filter | README only. **No approved UX decisions or patterns** |
| `docs/template-discovery.md` | filter builder, condition, CONFIG builders | **§B.1 Advanced Filter Builder** (live Leads list): grouped AND/OR condition rows (`Select a column` / `Choose a condition` / `Enter value`), **nested groups**, `+Add Row` / `+Group`, `Save to view`. Candidate pattern, not registered. Also `CAND-005` Pipeline / Stage Configuration Builder (CONFIG), a different structure |
| `docs/golden-template-list-specification.md` | AND/OR, condition builder | Treats the AND/OR condition builder as a **separate reusable pattern** (Advanced Filters) that the list template does not own (§ Pattern boundary, §19 Validation) |
| `history/`, `agent/context/` | incentive, enrol, eligibility, criteria, rule | `history/archive/`: README only. `agent/context/fdi-design-agent.md`: no incentive or enrolment work. No prior incentive-program design anywhere in the repo |
| Other design cases | condition, AND / OR, eligibility | **DCF-0002** (Scoring Builder, rev 2): per-object AND / OR plus connectors between objects; logged "condition row builder", "logic connector" and "Object Group" as gaps; proposed Button Group `108:30` as the AND / OR switch; noted the live nav item **"Lead Eligibility Criteria"** (Sales) as a likely sibling rule builder. DCF-0002 also lists NumberField and Breadcrumb as NEW-COMPONENTs |
| `product-knowledge/` (business rules, PRDs, FRDs, glossary) | incentive, enrol | READMEs only. **No FRD** for this feature. No business-rule file |
| `design-system/tokens/tokens.json` (v0.2.0 DRAFT) | I2 colours and fonts | `#13296B` (I2 primary): **no token**. `brand/primary` = `navy/500` `#002666`. Fonts: `font-family/heading` Sora, `font-family/body` Lexend. I2 uses Poppins (C3) |

## 5. Page Plan

| Page | Class | Template (id@version) | Rationale | Menu location |
|---|---|---|---|---|
| P0 Incentive Programs list (added by D3) | **Composition** of FDS-101 and candidate list components, same as DCF-0002 P2, until a list template is registered | — (`FYNXT-TPL-LIST-001` is a placeholder; `LIST-002` is unregistered) | D3: "this creation opens from a table of incentive program". Built in the proper app shell (DCF-0001 Side Nav + Top Nav, DCF-0002 Table Toolbar / Pagination, FDS-101 Data Table Header / Cell). Columns, statuses and row actions are FDI proposals (Q37) | CRM › Operations › Incentive Programs. The item placement is a placeholder (Q20, Q41) |
| P1 Create / edit Incentive Program: full-screen 3-step wizard (D3; was "Step 2 only") | **ONE-OFF** (recommended; reviewer choice Q21) | — | No registered template exists (all registry entries are placeholders). The scope is one step of an existing wizard, not a recurring page structure. The reusable part is the **condition builder**, which belongs in the component library (§6), not in a page template. Steps 1 and 3 and the wizard footer are unchanged context. A ONE-OFF conflicts with Station invariant 3, "gallery pages are configuration only" (C6). The alternative is a NEW-TEMPLATE candidate "Wizard step / stepped form" (a create-account stepper was seen in DCF-0002 I6), but there is less evidence for it | Proposed **CRM › Incentive Programs › Create Incentive Program › Step 2 Enrollment Criteria**, from I2's breadcrumb "Incentive Program › Participants & eligibility". Not confirmed (Q20) |

### 5.0 D3 structure (2026-10-14), updated by D5 (2026-10-15): supersedes the in-page layout in §5.1 where they differ

**P0 Incentive Programs list** (app shell):
- **Page:** "Incentive Programs" with tabs Programs / Audit logs (Q17 proposal).
- **Section header:** "All incentive programs" and **Create program**, which opens P1 full screen.
- **Toolbar:** Filter, Status, Participant type, Clear all, and search by name or ID.
- **Table columns:** Program name (link, with ID) · Participant type · Enrollment criteria (e.g. "3 rules · 1 group", "8 manual only") · Enrolled · Status (Draft / Active / Inactive) · Last updated (date, by) · actions (view, ⋮).
- **Row ⋮ menu:** Edit program · Duplicate · Deactivate · View enrolled participants (Q37 proposal).
- **States:** L1 default · L2 empty (with Create program) · L3 loading · L4 error (Try again) · L5 created (success toast) · L6 row actions.

**P1 full screen** (DCF-0002 pattern: Builder Header on top, sticky footer, no app shell):
- **Header:** back to the list · breadcrumb "Incentive Programs › Create program" (edit: › program name) · program name and status badge (Draft / Active) · save state · Cancel · Save draft (edit: Save changes).
- **Body (D5):** a 280px left **stepper rail** (Stepper Step, Orientation=Vertical: number, title, description; Completed / Active / Upcoming; on `surface/card` with a `border/default` right edge) and a main column with the active step's card at a 1080px content width. Rail copy: 1 Participant type, "Program details and who can join" · 2 Enrollment criteria, "Rules participants must match" · 3 Participants, "Add and block participants" (Q45 proposal). The horizontal stepper (D1) is replaced on desktop. Mobile M1 keeps the compact "Step N of 3" label (Q33).
- **Footer:** Back (step 1 shows "Step 1 of 3") · "Step N of 3" · Next, or **Create program** on step 3 (edit: Save changes).
- **Cancel or back with unsaved changes:** a "Leave without saving?" dialog (X1).
- **Step 1 · Participant type:**
  - Program details: Program name\* and Description (optional, 500 characters) (Q36 proposal).
  - Participant type\* as two selectable cards, Client / IB, each saying which CRM objects its rules can use (Q7 proposal).
  - Changing the type when rules use objects the new type lacks opens a warning that lists the rules to be removed (S1c).
  - Validation: a missing name blocks Next (S1b).
- **Step 2 · Enrollment criteria:**
  - Layout (b) (Q2 proposal): the D2 condition builder for all rules, including Country, Account Type and Account Status as Account rules. Layout (a) is kept as an alternative frame (S2k).
  - Rules only (D5): Manual enrollment moved to Step 3.
  - "Who gets enrolled" explainer: rules OR manual (added in Step 3), minus blocked (Q3 proposal).
  - States: filled All / Any · empty · incomplete rule (R7, Q11) · loading · CRM error (save draft still works) · Clear all confirmation (Q13) · condition menu with number operators (Q4) · edit a live program, with a banner and a deleted-field rule (Q9, Q16, Q29). "Nothing to enrol" moved to Step 3 (S3e, Q10).
- **Step 3 · Participants** (D5; was "Participant blocking"):
  - **Manual enrollment** section (moved from Step 2 by D5): table of added participants and **Add participants**, which opens a search picker with multi-select; already-added participants are disabled (S3d).
  - A divider, then **Participant blocking**:
  - Blocked participants table: Participant, Type, Reason, Blocked (date, by), unblock.
  - **Add blocked participant** opens a search picker with an optional reason (Q38 proposal); the confirm action is destructive.
  - A warning when a blocked participant is also in Manual enrollment ("Blocking wins", B4).
  - A "Review before you create" summary.
  - Empty state: "No participants added" and "No blocked participants" (S3a).
  - Nothing to enrol on **Create program**: error alert "Add at least one rule or participant" (S3e, Q10 proposal, moved from Step 2 Next by D5).
- **Create program** returns to P0 with a success toast (L5).

### 5.1 P1 — Step 2 Enrollment Criteria

- **Page composition (no template):**
  1. Wizard header: breadcrumb and title "Create Incentive Program" (I2). Edit-mode title not given (Q29).
  2. Step 1 Participant type (Client / IB): **unchanged context**, rendered as today (I1a, I2).
  3. **Step 2 Enrollment Criteria \*** with the helper text "Define enrollment criteria for participants. All criteria are evaluated once at enrollment." (I1a, I2; BR5).
     - **Fixed criteria (R9):** Country (Include / Exclude), Account Type, Account Status. **Placement is open (C1, Q2).** I2 drops the I1a tabs and shows only the rule builder. FDI keeps the capability because I1 requires it, and puts forward two layouts for the designer: (a) keep the I1a tabs and add a tab or section "Object rules"; (b) move them into the builder as preset rules on Account, as I1 R1 and R2 already do (Account › Country, Account › Account Status). Option (b) changes how existing programs are stored and shown (Q2).
     - **Object rules: ConditionBuilder (§6.1)**, configured as below.
     - **Manual Enrollment:** a card with "+ Add participants" (I2). The existing add-participants flow is unchanged and out of scope. I2's helper copy "Also enrol named participants, whatever the rules above" states a rule that I1 does not (C2, Q3). The copy is held until Q3 is answered.
  4. Step 3 Participant Blocking: **unchanged context** (I1a, I2; BR6).
  5. Wizard footer: Back · Save as Draft · Next (I2; same as today).

- **ConditionBuilder configuration for P1** (props on the shared component, §6.1, not page code):

  ```ts
  // Stored value (shape only; field names are a proposal, API contract Q19)
  type EnrolmentRules = {
    match: "all" | "any";                    // R3, BR3 — default Q12
    items: Array<RuleItem | GroupItem>;      // top level: rules and groups
  };
  type RuleItem  = { kind: "rule"; id: string; object: string; field: string; condition: string; value: RuleValue };
  type GroupItem = { kind: "group"; id: string; match: "all" | "any"; rules: RuleItem[] }; // rules only (R5, BR4)
  type RuleValue = string | number | string[] | null;                                      // shape per field type (Q4, Q5)

  // ConditionBuilder props used by P1
  {
    schema: crmObjectSchema,          // objects → fields { id, label, type, hasValueList } from CRM (BR1, Q19)
    loadValues: crmFieldValues,       // value list per field, from CRM where a list exists (R8)
    operatorsByType: <from Q4>,       // NOT hardcoded; I2's operator lists are illustrative only
    groups: { enabled: true, maxDepth: 1 },   // R4, R5
    matchLabels: { top: "of the conditions below", group: "of the rules in this group" }, // I2 copy
    summary: true,                    // the "Reads as:" line (I2, visual intent)
    limits: <from Q15>,
    value, onChange,
  }
  ```

- **Builder structure after D2 (supersedes the I2 regions below; I6 inner structure):**
  - A description line "Create rules and groups. Participants enrol only if they match All or Any of them." and **Clear all**.
  - A root row: the **All / Any** dropdown on the left (top-level match, U3), with **+ Add rule** and **+ Add group** on the right.
  - A **dotted tree** that starts under the dropdown. Each top-level rule and group hangs off it with a dashed arrow.
  - **Rule:** arrow · Object · Field · Condition · Value · delete (red ghost icon). There are no join words: the tree and the dropdown carry the logic.
  - **Group:** a card with header "Group N", its own All / Any dropdown (U4), **+ Add rule** and delete; a divider; then its own inner dotted tree of rules. There is no "+ Group" inside a group (U5, C10).
  - The **Reads as** summary stays below the tree as a text readout (I2). The AND / OR divider chips are removed.
- **Regions inside the builder (I2, superseded by D2):** a header line "Participants must match [All ▾] of the conditions below" with helper text and **Clear all** on the right. Then the item list: top-level rules and groups, with an **AND / OR divider chip** between items that shows the top-level match. Then **+ Add rule** and **+ Add group**, and the **Reads as:** summary.
  - **Rule row:** Object · Field · Condition · Value (four equal columns, each with a small label above), then a Delete rule icon button.
  - **Group:** a tinted container with the title "Group N · Match [Any ▾] of the rules in this group" and **Delete group**. Inside: rule rows with join words (*Where*, then *and* / *or* by the group match), and **+ Add rule to group**.

- **Interactions (I2 behaviour; no UX decision exists, so every item is a proposal):**
  - Changing **Object** resets Field, Condition and Value. Changing **Field** resets Condition and Value (I2 `patchRule`). Not in I1, but needed by R2.
  - Value control by field type: list → Select (Search Select or Multi Select per Q5), number → Number field, date → Date field, text → TextField (operators Q4).
  - **+ Add rule** adds a rule at the top level, and **+ Add group** adds a group holding one rule. Defaults for new rules and groups are Q12. I2 prefills "Account › Country is United Kingdom" and new groups as **Any**.
  - **Delete rule**: in I2, deleting the last rule in a group also deletes the group (Q14).
  - **Delete group**: deletes the group and its rules. Confirmation is Q13.
  - **Clear all**: in I2 it resets the top level to All and leaves one blank rule. I1 U6 says only "clear all rules" (Q13).
  - Focus: a new rule moves focus to its Object select, and a new group moves focus to its first rule's Object. After a delete, focus goes to the next item, else the previous one, else **+ Add rule**.
  - The **Reads as:** summary updates live, e.g. "Account › Country is United Kingdom AND Account › Account Status is Active AND ( Account › Account Type is VIP OR Trading Account › Balance is greater than 1000 )".

- **States:**

  | State | Content | Source |
  |---|---|---|
  | **Empty** | No object rules. Builder shows the match header disabled or hidden, a short prompt ("Add a rule to enrol participants by CRM data") and **+ Add rule** / **+ Add group**. Summary: "No rules yet" (I2). Whether Step 2 can be saved empty is Q10 | I1 *Screens*; copy is a proposal |
  | **Filled** (default) | The I1 *Examples* setup: R1, R2 and Group 1 (Any) holding R3 and R4, top level All. This matches I2's initial state | I1 *Screens*, *Examples* |
  | **Filled — top level Any** | The same setup, top level Any (I1 E4) | I1 E4 |
  | **Loading** | Loading the CRM object / field schema: skeleton rows. Loading a value list: spinner inside the Value select | fdi.config required frames; content is a proposal |
  | **Error — CRM metadata** | Objects or fields fail to load: an inline Alert ("Couldn't load CRM fields. Try again.") with Retry. The fixed criteria stay usable | fdi.config; copy is a proposal (Q19) |
  | **Validation** | An incomplete rule (missing Field, Condition or Value; R7) is marked in error on Next / Save. Whether Save as Draft allows incomplete rules is Q11 | R7; Q11 |
  | **Edit — stale field** | A saved rule uses a CRM field that has since been renamed or deleted. The rule is shown with a warning | I1 *Edge cases* row 2; expected result blank (Q9) |
  | **Limit reached** | Add buttons disabled with a reason | Only if limits exist (Q15) |

- **Responsive** (design-system form factors, `tokens.json` v0.2.0):
  - Desktop / wide: as I2, with a four-column rule grid and the delete button at the end of the row.
  - Tablet: two columns per rule row (Object, Field / Condition, Value), delete button at the top right of the row.
  - Mobile: one column per rule row. AND / OR dividers and group containers stay. The match dropdowns wrap under their sentence.
  - No horizontal scroll at any width.

- **Accessibility:**
  - Each group is a `fieldset` whose `legend` is "Group N". Each rule is a `role="group"` named "Rule N".
  - Each control has a visible label (I2 shows labels above Object / Field / Condition / Value).
  - Delete buttons are named per item ("Delete rule 2", "Delete Group 1"). I2 names every one "Delete rule".
  - AND / OR dividers and join words are real text, not only graphics.
  - A polite live region announces add, delete and clear ("Rule added. 4 rules."). The summary is not live, to avoid noise.
  - All / Any controls are labelled with the full sentence, e.g. "Participants must match: All".
  - Everything is reachable by keyboard in reading order, with focus handling as above. Touch targets are at least 44px (I2 uses 40–44px).
  - Contrast to be checked against tokens at Figma stage.

- **Data needed:**

  | Data | Source | Status |
  |---|---|---|
  | CRM objects available to enrolment | CRM (BR1) | API unknown (Q19). Scope per participant type: Q7 |
  | Fields per object, with type and whether a value list exists | CRM (BR1) | API unknown (Q19) |
  | Value list per field | CRM (R8) | API unknown. Size and search: Q5, Q18 |
  | Operators per field type | Not in any source | Q4 |
  | Saved `EnrolmentRules` on the program | Program save (R10) | Contract unknown (Q19) |
  | Fixed criteria (Country, Account Type, Account Status), Manual Enrollment, Participant Blocking | Existing wizard | Unchanged. Combination with object rules: Q3 |

## 6. Component Plan

Library: Station `@fynxt/ui` 0.2.0 (unmerged DCF-0001 branch, Q24) and FDS-101.

| Component | Class | Library ref | Change | Version impact | Used by |
|---|---|---|---|---|---|
| Button (ghost: + Add rule, + Add group, + Add rule to group, Clear all; secondary: + Add participants, Delete group; primary: Next) | EXISTING | `@fynxt/ui` Button | — | none | P1 |
| IconButton (Delete rule, destructive / outline) | EXISTING | `@fynxt/ui` IconButton | — | none | ConditionBuilder |
| Select (Object, Field, Condition, list Value, All / Any) | EXISTING | `@fynxt/ui` Select / FDS-101 `50:81` | — | none | ConditionBuilder |
| MultiSelect (list Value, if multi-value is approved) | EXISTING (conditional on Q5) | `@fynxt/ui` MultiSelect / FDS-101 `56:85` | — | none | ConditionBuilder |
| TextField (text Value) | EXISTING (conditional on Q4) | `@fynxt/ui` TextField | — | none | ConditionBuilder |
| Badge (STEP N chips; AND / OR divider chip) | EXISTING | `@fynxt/ui` Badge (primary, soft) | — | none | P1, ConditionBuilder |
| Card (Manual Enrollment card; group container, flat) | EXISTING | `@fynxt/ui` Card | — | none | P1, ConditionBuilder |
| Tabs (fixed criteria, if layout (a) is chosen) | EXISTING (conditional on Q2) | `@fynxt/ui` Tabs | — | none | P1 |
| Alert, Spinner (CRM metadata error / loading) | EXISTING | `@fynxt/ui` | — | none | ConditionBuilder |
| ConfirmDialog (Clear all / Delete group, if required) | EXISTING (conditional on Q13) | `@fynxt/ui` Modal / ConfirmDialog | — | none | ConditionBuilder |
| EmptyState (builder empty state, compact) | EXISTING | `@fynxt/ui` EmptyState | — | none | ConditionBuilder |
| NumberField (number Value, e.g. Balance) | NEW-COMPONENT (FDS-101 source exists) | FDS-101 Number `119:916` | Implement once. **Shared with DCF-0002** (its NumberField row) | new | ConditionBuilder |
| DateField (date Value) | NEW-COMPONENT (FDS-101 source exists; conditional on Q4 date operators) | FDS-101 Date Field `121:160` | Implement | new | ConditionBuilder |
| SearchSelect (long CRM value lists, e.g. countries) | NEW-COMPONENT (FDS-101 source exists; conditional on Q5 / Q18) | FDS-101 Search Select `57:58` | Implement. Or a `searchable` VARIANT of Select. Designer picks | new or MINOR | ConditionBuilder |
| Breadcrumb (wizard header) | NEW-COMPONENT (FDS-101 source exists) | FDS-101 `73:14` | **Shared with DCF-0002** (its PageHeader + Breadcrumb row) | new | P1 context |
| Radio (Step 1 participant type) | NEW-COMPONENT (FDS-101 source exists); **context only** | FDS-101 Radio `55:83` | Shared with DCF-0002's conditional Radio row. Step 1 is unchanged, so it may be rendered static | new | P1 context |
| **ConditionBuilder** (with ConditionRow, ConditionGroup, MatchSelector, summary) | **NEW-COMPONENT — candidate pattern (CLAUDE.md §16)** | — (gap in `@fynxt/ui` and FDS-101) | See §6.1 | new 0.1.0 | P1. Possible later: Leads Advanced Filters, DCF-0002 logic, "Lead Eligibility Criteria" |

**Not adopted:** Button Group `108:30` as the All / Any control. I2 uses a dropdown with explanatory hints, and DCF-0002 proposed a Button Group for the same job. The two cases should use one control (Q23). The default here is EXISTING Select, following I2.

**D3 additions (2026-10-14).** Every addition is an EXISTING library instance or an existing candidate. There are no new components.
- **App shell (P0):** Side Nav and Top Nav (DCF-0001 candidates) and Table Toolbar / Table Pagination (DCF-0002 candidates), via a clone of DCF-0002's P2 list frame. Data Table Header and Data Table Cell (FDS-101, D12).
- **Full screen (P1):** **Builder Header** (DCF-0002 candidate `72:17730`) and **Stepper Step** (`43:6900`). The sticky footer is composed from tokens and Buttons; DCF-0002 has no footer, so it is a candidate for a "Builder Footer" variant (Q40).
- **FDS-101:** Input, Textarea, Radio, Checkbox, Search Field, Modal (Warning / Delete presets), Dropdown Menu + Menu Item, Toast, Alert, Fallback, Empty State, Badge, Button, Icon Button.
- **Participant picker modal:** composed from tokens and FDS-101 parts, because Form Modal's body slot can't be filled in an instance. Candidate "Participant Picker" for review (Q40).
- **OBSERVED:** the modal scrim is `neutral/900` at 48% layer opacity (no overlay token), and modal elevation uses `elevation/sm` (no XL style is published) (Q39).

**Stage 2 (Figma) notes, 2026-10-13:**
- **Stepper Step** (DCF-0002 candidate, work file `43:6900`): **EXISTING (candidate), reused per D1; VARIANT added per D5.** FDS-101 has no stepper (search "Stepper", "Step", "Wizard" 2026-10-15: only icons and Pagination), so D5 extends this candidate instead of creating a new component. New axis **Orientation = Horizontal | Vertical** (existing variants renamed `Orientation=Horizontal, State=…`, node IDs unchanged, so DCF-0002 instances are unaffected) and a new TEXT property **Description** (`Description#184:0`, Vertical only). Vertical variants: Active `184:55292`, Upcoming `184:55301`, Completed `184:55310`. Structure: Indicator (circle + vertical connector, `spacing/1`) beside Text (Label + Description, `Body/SM` `text/muted-foreground`), `spacing/3` gap, `spacing/6` bottom padding, 240 wide (fills the rail). Every fill, spacing and radius is bound; no new tokens. Still a candidate: needs the same approval in DCF-0002 before standardising. Impact: VARIANT on a shared candidate, consumers DCF-0002 (horizontal, unchanged) and DCF-0003; code `Stepper` in `@fynxt/ui` needs an `orientation` prop at `/fdi-build` (§7).
- In Figma, **NumberField, DateField, SearchSelect, Breadcrumb and Radio are FDS-101 library instances** (Number Input, Date Field, Search Select (entity), Breadcrumb, Radio). They are NEW-COMPONENT only in code (`@fynxt/ui`), not in Figma. SearchSelect is not used in the frames yet (Q5 / Q18 open).
- FDS-101 **Card** is a sample deal card with no content slot, so it can't contain a group. The group container is built inside the Condition Group candidate from the same tokens (`surface/background`, `border/default`, `radius/lg`).
- The **ConditionBuilder** candidate is built as parts in the work file, section `84:4375`:
  - **Condition Row** `84:4954`: 6 variants (Type List / Number / Date; State Default / Incomplete / Stale field; Layout Row / Stacked); text property Join; nested Selects exposed.
  - **Logic Divider** `84:4965` (AND / OR).
  - **Match Selector** `84:4966` (Prefix / Suffix text, nested Select).
  - **Rules Summary** `84:4989`.
  - **Condition Group** `86:5486` (Rules = 1 / 2 / 3; Title).
  - The full builder is composed from these parts in each P1 frame. All parts carry the "DCF-0003 candidate" description and need Product Designer approval (Q22).
- **D2 rebuild (2026-10-13), after I6:**
  - New **Logic Tree** `94:7364` (Part = Root / Branch): the root marker and dashed branch arrow.
  - **Condition Row** `84:4954` changed in place: join words and the Join property removed, branch slot added, delete changed to a ghost Icon Button with the icon bound to `status/error`.
  - New **Condition Group v2** `95:7994` (Rules = 1 / 2 / 3): header, divider and inner tree.
  - **Superseded and moved** to section `98:26221` (kept for history, 0 uses): Logic Divider `84:4965`, Match Selector `84:4966`, Condition Group v1 `86:5486`.
  - The top-level and group All / Any control is now a bare FDS-101 Select (label row hidden), as in I6.
- **Overlap with DCF-0002:** DCF-0002's **Logic Switch** `72:17580` (segmented AND / OR) and **Logic Connector** `72:17611` do jobs similar to Match Selector and Logic Divider. Settle them together under Q22 / Q23 before either goes to FDS-101.

### 6.1 NEW-COMPONENT (candidate) — ConditionBuilder

- **Gap:** neither `@fynxt/ui` nor FDS-101 has a condition-row builder, a condition group or a logic divider (§4; also logged by DCF-0002). There are now three uses of the same pattern: the Leads Advanced Filter Builder (`docs/template-discovery.md` §B.1), DCF-0002's per-object AND / OR, and this case. Building it inside P1 would add a third separate copy (CLAUDE.md §8). It is proposed as a **candidate** and is **not** standard until the Product Designer approves it (Q22).
- **Scope:** generic. It knows nothing about enrolment, incentive programs or CRM endpoints. The schema, value loader and operators come in through props.
- **Props:**
  - `schema: { objects: { id, label, fields: { id, label, type, hasValueList }[] }[] }`
  - `loadValues(objectId, fieldId) → Promise<Option[]>`
  - `operatorsByType: Record<FieldType, { id, label, valueShape: "single" | "multi" | "none" }[]>`
  - `value: { match, items }` and `onChange`
  - `groups: { enabled: boolean; maxDepth: 1 | n }`. P1 uses depth 1 (BR4). The Advanced Filter Builder needs nesting (C5).
  - `limits?: { rules?, groups?, rulesPerGroup? }`
  - `defaults?: { match, groupMatch, newRule }` (Q12)
  - `matchLabels`, `summary?: boolean`
  - `confirm?: { clearAll?, deleteGroup? }` (Q13)
  - `readOnly?`, `status: "ready" | "loading" | "error"`, `onRetry`
- **Sub-parts:**
  - ConditionRow: four slots (Object, Field, Condition, Value), a value control chosen by field type, and delete.
  - ConditionGroup: container, title, MatchSelector, rows, add, delete.
  - MatchSelector: All / Any with hint text.
  - LogicDivider: line plus an AND / OR Badge.
  - Summary: the "Reads as:" line.
- **States:** empty · filled · loading (schema / values) · error (schema) · invalid rule · stale field (Q9) · limit reached (Q15) · read-only.
- **Tokens consumed:** `brand/primary`, `surface/card`, `surface/selected`, `border/default`, `border/focus`, `text/foreground`, `text/muted-foreground`, status error tokens for destructive actions, `radius/*`, `spacing/*`, `font-family/body` (Lexend). I2's group tint and borders get mapped in §8.
- **Accessibility:** as §5.1 (fieldset / legend, per-item names, live region, focus management, keyboard only).
- **Figma:** build in the work file `0CwREH91xlsQOFpAUp852B` as a candidate (FDS-101 is read-only for FDI) · **Code Connect:** required · **Tests:** add / delete / clear, reset on object or field change, depth limit, summary text, focus moves, axe check.
- **Record:** after approval, add a candidate pattern record under `experience-library/patterns/` that links §B.1 and DCF-0002 (CLAUDE.md §16 step 3). Not written yet.

## 7. Template Changes (EXTEND / NEW-TEMPLATE only)

None. P1 is a ONE-OFF (recommended), and no registered template is changed. If reviewers pick NEW-TEMPLATE for the wizard step instead (Q21), a DRAFT candidate surface will be proposed in rev 2. The ConditionBuilder is a **component** candidate, not a template. No shared template, token or component is modified, so no `/fdi-impact` run is needed. `/fdi-impact` will be needed before the NumberField and Breadcrumb work shared with DCF-0002 lands.

### 7.0 D5 impact (2026-10-15): Stepper Step VARIANT

- **Figma:** additive. New `Orientation` axis defaults to Horizontal; the three existing variants keep their node IDs, so DCF-0002 and DCF-0003 instances made before D5 are unchanged. The new `Description` property only binds in Vertical variants.
- **Code (built 2026-10-15, `cd1eacd`):** `@fynxt/ui` `Stepper` gains optional `orientation` (default `horizontal`), per-step `description` (steps accept `string | { label, description }`) and `onStepClick`. Non-breaking (MINOR): existing `steps: string[]` callers render as before; DCF-0002 does not use `Stepper` in code. Consumers: DCF-0002 (horizontal) and the `CAND-DCF-0003-incentive-programs` editor (switches to vertical; Manual enrollment moves from Step 2 to Step 3).

### 7.0b Pixel-perfect pass impact (2026-10-16): shared `@fynxt/ui` changes

| Component | Change | Consumers | Breaking? |
|---|---|---|---|
| Button | Inline padding minus the 1px border (FDS-101 stroke sits inside the padding): buttons are 2px narrower, matching Figma | All cases | No (visual, closer to FDS-101) |
| DataTable | Cells Body/SM (Data Table Cell 66:4384); rows 44 including the border, content centred; optional `headerAction` (same API as DCF-0002's, so its rebase is trivial) | DCF-0003; DCF-0002 (later branch) | No |
| ConditionBuilder | 12 gap between branch slot and rule controls (Condition Row 84:4954); number values read "1,000" in "Reads as" | DCF-0003 | No |
| NumberField | Optional `grouping` (thousands separators while not focused; spinbutton semantics kept) | ConditionBuilder | No (opt-in) |
| TopNav | Optional `titleAction` after the title (FDS-101 Top Nav help icon) | DCF-0003 | No (opt-in) |

### 7.0c Figma update impact (2026-10-22, version `2413067555528508501`): shared `@fynxt/ui` changes

| Component | Change | Consumers | Impact |
|---|---|---|---|
| SideNav (DCF-0001 candidate) | Corrections to its own Figma component (`21:3447`): 4 px between a parent and its first child, child padding 24 (text at x 61), parent label Regular, current page Medium. New optional `highlightActiveParent` (default `true`) | DCF-0001 Tasks, DCF-0002 lists, DCF-0003 list, DCF-0005 pages (all app-shell pages) | Visual only, toward the component spec: child rows sit 4 px lower and 12 px further right on every page. Default keeps the open parent filled (DCF-0001 approved); only DCF-0003 passes `false`. Tasks page re-checked in Chrome |
| DataTable | Cells p0/16 and 44 tall including their bottom border (FDS-101 Data Table Cell); before p4/16 made two-line cells 45 | Every table (DCF-0002, -0003, -0005 lists) | Rows become exactly 44, as drawn. No behaviour change |

### 7.1 Stage 3 impact report (`/fdi-impact`, 2026-10-14)

| Changed | Kind | Consumers on `main` | Effect |
|---|---|---|---|
| `@fynxt/ui` Field module: new exports `NumberField`, `DateField`; `FieldShell` `kind` gains `"number"` and `"date"` | VARIANT (additive, MINOR) | `apps/studio`: IdentityDialog, CaseDetail, Cases (use TextField, TextArea, Select only) | None. Existing exports, props and CSS selectors are unchanged; new CSS is scoped to `.fx-field__group`, `.fx-field--number`, `.fx-field--date` |
| `@fynxt/ui` Radio module: new `Radio`, `RadioGroup` (incl. `appearance="card"`) | NEW-COMPONENT | DCF-0003 template | New |
| `@fynxt/ui` new: `ConditionBuilder` (+ `isRuleComplete`, `isRuleStale`, `summarize`, `allRules`), `Stepper`, `Breadcrumb`, `Checkbox`, `Toast`, `DataTable` | NEW-COMPONENT (ConditionBuilder, Stepper: candidates, Q22 / DCF-0002) | DCF-0003 template only | New. `styles.css` gains 6 imports. No existing selector changed |
| `@fynxt/templates`: new `CAND-DCF-0003-incentive-programs` (DRAFT); `CANDIDATE_IDS` lists it | NEW-TEMPLATE candidate (see C6 below) | gallery page `crm.operations.incentive-programs` | New. Its type names are prefixed (`ProgramListQuery` etc.) to avoid clashing with DCF-0001's exports |

No token changed. Package version bumps are deferred until DCF-0001 merges (Q44): DCF-0001 already takes `@fynxt/ui` 0.2.0.

## 8. Tokens

All visual values come from `design-system/tokens/tokens.json` (v0.2.0 DRAFT). I2's literal values are visual intent only (C3):

| I2 value | Use in I2 | Token |
|---|---|---|
| Poppins | All text | `font-family/body` Lexend, `font-family/heading` Sora |
| `#13296B` | Primary, links, match buttons | `brand/primary` (`navy/500` `#002666`) |
| `#1C2430`, `#59636F`, `#3D4652` | Text, muted text | `text/foreground`, `text/muted-foreground` |
| `#DDE2E8`, `#EEF0F3` | Borders, dividers | `border/default` |
| `#E8EDF8` | Step chip, AND / OR chip, selected option | `surface/selected` (Badge primary soft) |
| `#F5F7FB` (group background), `#C9D2E0` (group border) | Group container | Nearest surface / border token, mapped at `/fdi-figma`. **OBSERVED** if none fits (Q26) |
| `#C2332A`, `#F1D3D1` | Destructive text and border, required asterisk | Status error tokens (IconButton / Button destructive) |
| Radii 8 / 10 / 12, shadow `0 8px 24px` | Controls, menus, cards | `radius/*`, elevation tokens via the components |

**Figma build (Stage 2):** every fill and stroke in the DCF-0003 frames and candidates is bound to an FDS-101 variable, and text uses FDS-101 text styles (Lexend / Sora). The audit found 0 unbound paints outside the two canvas sections. Layout geometry with **no spacing token**, marked **OBSERVED** (Q34):

| Value | Where | Why |
|---|---|---|
| 22px top offset | Condition Row "Delete slot" | Lines the delete button up with the input box: FDS-101 Select label row 16 + gap 6 |
| 34px / 28px top offset | Branch slot in Condition Row / group item | Centres the branch arrow on the input box / group header |
| 12px + 4px tree indent; dash 2 3; 1px line | Logic Tree line in builder and group | Puts the line under the All / Any dropdown, as in I6 |
| 1360 / 1180 / 390 | Frame width, content width, mobile width | I2 preview width and content max-width; mobile reference width |

**Stage 3 OBSERVED (no token), marked in code as `OBSERVED: no token — DCF-0003`:** Date Field calendar icon 18px; Radio label gap 10px; Radio dot 10px; ConditionBuilder branch offset 34px; container breakpoints 760px / 480px (ConditionBuilder) and media breakpoint 760px (template), because tokens.json has no breakpoint tokens. Primitive bindings carried over from FDS-101: Radio ring fill `neutral-100`, stepper chevrons `neutral-400`, focus `blue-500` (as the existing Field). Raise with Q34 / Q39.

**Pixel pass OBSERVED (2026-10-16):** L1 Top Nav title is Sora SemiBold **18** with no token; code keeps Heading/LG (20). Lexend 14 and 12 "auto" line heights in FDS-101 Alert text render as the 20 / 16 tokens in code.

## 9. Conflicts

| # | Source A says | Source B says | Resolved by hierarchy? | Status |
|---|---|---|---|---|
| C1 | I1 *What must not change*: "Country, Account Type, Account Status and Manual Enrollment can still be set". I1a shows them as tabs, with Include and Exclude Countries | I2 drops the Country / Account Type / Account Status tabs. Only the rule builder and a Manual Enrollment card remain. The same criteria could be written as Account rules | **Partly.** I1 (rank 2) beats I2 (rank 6), so the capability stays. Whether it stays as tabs or as preset rules is not settled by either source | **Open** → Q2. §5.1 shows both layouts and does not pick one |
| C2 | I1 says nothing about how Manual Enrollment relates to the rules | I2 copy: "Also enrol named participants, whatever the rules above", which makes Manual Enrollment bypass the rules | **Yes.** A wireframe cannot introduce a business rule (README §2). The copy is not adopted | **Open** for the actual rule → Q3 |
| C3 | CLAUDE.md §9: tokens from `design-system/` (Lexend / Sora, `brand/primary` `#002666`) | I2 literal values (Poppins, `#13296B`, …) and I4: "replicate faithfully" | **Yes.** The design system governs; I2 is visual intent and I4 is non-authoritative | **Resolved:** tokens used (§8). Reviewer to confirm |
| C4 | I1 *Screens*: states to design are "Empty, filled" | `fdi.config.json` `requiredStateFrames`: default, loading, empty, error | Not a contradiction. The FDI list is a superset | **Resolved:** all states designed (§5.1) |
| C5 | I1 U5 / *Out of scope*: no groups inside groups | `docs/template-discovery.md` §B.1: the Advanced Filter Builder has nested groups | Different features. Handled by component config (`groups.maxDepth`) | **Resolved for this case.** The shared component must support both (§6.1) |
| C6 | `agent/fdi/README.md` §4.1: ONE-OFF = a page built from components without a template | Station contract invariant 3: gallery pages are configuration only (carried from DCF-0001 C12 and DCF-0002 C2) | No (two governance documents) | **Handled in Stage 3 as DCF-0001 did:** a DRAFT candidate template `CAND-DCF-0003-incentive-programs` keeps the gallery page config-only. Not registered and not promoted (CLAUDE.md §16). Q21 (ONE-OFF vs NEW-TEMPLATE) still needs the Product Designer |
| C8 | I1a: the wizard shows Step 1, Step 2 and Step 3 as sections on one scrolling page | D1 (Aman Bansal, Product Designer): "can use stepper as in DCF-0002", so one step per screen with a Stepper | Designer authority over UX layout (CLAUDE.md §11). Step contents and rules are unchanged, and nothing under *What must not change* is affected | **Applied** in Figma. The full list of wizard steps is Q31 |
| C9 | I1 U2: a rule is Object, Field, Condition and Value, with the Object chosen **per rule**. E.g. R4 (Trading Account) shares a group with R3 (Account) | I6: Objects chosen once as tabs (+ Add object, Deals / Leads / Contacts), and rows are Column / Conditions / Value | **Yes.** PRD (rank 2) over the reference screenshot (rank 5). D2 asked for the inner structure only | **Resolved:** Object stays a per-rule field. Object tabs not adopted |
| C10 | I1 U5 / *Out of scope*: groups hold rules only | I6: "+ Group" inside a group (nesting) | **Yes.** PRD over the reference | **Resolved:** no "+ Group" in a group |
| C11 | I1 *Data and interfaces*: top-level and group match values are **All, Any** | I6: the root and group dropdowns read **AND / OR** | **Yes** for the values (PRD). The visible label is copy | **Resolved:** All / Any kept. Relabelling is Q35 |
| C12 | Approved rev 1 scope: P1 = Step 2 only (§5) | D3 (Aman Bansal, Product Designer): all three steps, a list page, full screen | Designer authority over UX scope (CLAUDE.md §11). It adds no business rule | **Applied in Figma.** The case is still rev 1. Reviewers should confirm the wider scope at design review or ask for `/fdi-revise` (rev 2) |
| C14 | I1a (current product): Manual Enrollment is a tab of **Step 2** Enrollment Criteria; I1 R9 only says it "can still be set" | D5 (Aman Bansal, Product Designer): Manual enrollment moves to **Step 3** (now "Participants") | **Partly.** R9 is still met (it can be set, in Step 3). Placement is a UX decision (designer, CLAUDE.md §11), but it changes today's wizard and I1 §5.1 said the existing add-participants flow is unchanged | **Open** → PM to confirm the move is in scope (Q46). Applied in Figma per D5; layout (a) S2k now has 3 tabs |
| C15 | Approved frames (version `2410552998186577751`) disagree with each other: L1 shows UK VIP Rebate 2026 as "3 rules · 1 group", S2a gives it 4 rules and S3b 2 manual participants; S2a's card sits at x 304, the other P1 frames at 320; the L1 quick-filter chips use the Active style while no filter is set; L1's chip reads "Partipation type"; FDS-101 Alert is a fixed 60 tall | Code follows one source per case: data stays consistent ("4 rules · 1 group · 2 manual"), card centred at 320, chips styled Active as drawn, the typo corrected to "Participant type", alerts 60 (14 top / 10 bottom) | No (visual spec only) | **Open:** designer to confirm or correct the frames |
| C16 | Version `2413067555528508501` L1: the open parent (Operations) stays plain while its child is the current page | DCF-0001 Side Nav component sample: the open parent (Tickets & Activities) is filled with its child | No (visual) | **Open (Q51):** built per page with SideNav `highlightActiveParent`: DCF-0003 plain, DCF-0001 / others filled. Designer to pick one rule for the product |
| C13 | I1 has no program name, description, list columns, statuses, row actions or block reason | D3 asks for the flow "in detail" and P0 needs a name and status to show | **No.** These are product decisions (CLAUDE.md §13) | **Open:** shown as labelled FDI proposals (Q36–Q38, Q42). Not settled |
| C7 | Existing UI and I2 spell it "Enrollment" | I1 title and body spell it "Enrolment" | Copy, not a rule | **Open** → Q28 |

## 10. Open Questions / Missing Information

| # | Question | Blocks | Owner | Answer |
|---|---|---|---|---|
| Q1 | I1's page status is **Draft**, and the product owner, Jira epic and "Who asked" are blank. The *Open questions* answers are signed "Product". Who is the named owner, and are those answers approved? | Approval confidence | PM | |
| Q2 | Fixed criteria (C1): keep Country / Account Type / Account Status as today's tabs next to the new builder (a), or show them as preset Account rules in the builder (b)? With (b), how are existing programs' Include / Exclude Countries migrated and shown? | P1 layout | Product Designer + PM | |
| Q3 | How do the fixed criteria, the object rules and Manual Enrollment combine? Fixed AND rules? Does Manual Enrollment bypass the rules, as I2's copy implies (C2)? | P1 copy, BR | PM (rule owner) | |
| Q4 | Operators per field type. I1 says only "depends on the field type". I2's lists are illustrative: list is / is not; number is equal to / greater than / less than; date before / after / on. What about text and boolean fields, "is empty / is not empty", ranges, relative dates and time zone? | ConditionBuilder config | PM / BA | |
| Q5 | List values: one value per rule (I2), or several ("is any of"), matching today's multi-select Include / Exclude Countries? Does a long list (countries) need search? | Value control | PM + Product Designer | |
| Q6 | Fields on objects a participant can have many of (e.g. several Trading Accounts): is *Balance > 1,000* met by any account, all accounts, a total, or a primary account? Which currency? I1 E1/E2 assume one balance | BR, field labels | PM (rule owner) | |
| Q7 | Which CRM objects can be used for each participant type (Client vs IB, Step 1)? If the admin changes participant type after adding rules, what happens to rules on objects that no longer apply? | Object list | PM / BA | |
| Q8 | I1 edge case: the participant's CRM field used in a rule is empty. *Expected result* is blank. Does the rule fail, pass, or get skipped? | BR (backend). Possibly helper text | PM | |
| Q9 | I1 edge case: a CRM field used in a rule is renamed or deleted. *Expected result* is blank. Also: what does the admin see when editing such a program? FDI proposes a warning on the rule (§5.1 *Edit — stale field*) | BR, P1 state | PM + Product Designer | |
| Q10 | Step 2 is marked required (\*). Is at least one criterion needed (fixed, rule or manual)? Can a program be saved with zero object rules? | Empty state, validation | PM | |
| Q11 | Validation: are incomplete rules blocked on Next, on Save as Draft, or both? Error copy? | Validation state | PM + Product Designer | |
| Q12 | Defaults: top-level match (I1 example uses All), new group match (I2: Any), new rule blank or prefilled (I2 prefills Account › Country is United Kingdom)? | Interactions | Product Designer | |
| Q13 | Clear all: does it ask for confirmation? Does it reset the top level to All and leave one blank rule (I2), or leave zero rules? Does Delete group ask for confirmation? | Interactions | Product Designer | |
| Q14 | Does deleting the last rule in a group delete the group (I2)? Is a one-rule group allowed? | Interactions | Product Designer | |
| Q15 | Limits on rules, groups and rules per group? | ConditionBuilder config | PM | |
| Q16 | Permissions (I1 *Non-functional* blank): which roles can view and edit enrolment rules? Can they be edited after the program is live or has participants? | P1, read-only state | PM | |
| Q17 | Audit (I1 blank): are rule changes logged? Is anything shown in the UI? | Possibly P1 | PM | |
| Q18 | Speed (I1 blank): sizes of object, field and value lists. Is lazy loading or search needed? | Value control, loading state | PM / Engineering | |
| Q19 | CRM metadata API contract: endpoints for objects, fields (with types) and value lists; error responses; the saved-rules payload. The I1 *Integrations* "Owner agreed?" cell is blank | Data, error state, Stage 3 | Engineering / BA | |
| Q20 | Menu location and module name for the Station gallery. FDI proposes CRM › Incentive Programs › Create Incentive Program › Step 2 | Menu | PM + Product Designer | |
| Q21 | P1 class: ONE-OFF (recommended) or NEW-TEMPLATE "wizard step / stepped form" candidate? How should a ONE-OFF be built while gallery pages are configuration only (C6)? | §5, Stage 3 | Product Designer | |
| Q22 | Approve **ConditionBuilder** as a shared candidate component in `@fynxt/ui` (§6.1)? Should DCF-0002's logic and a future Advanced Filters / "Lead Eligibility Criteria" use it? | §6 | Product Designer | |
| Q23 | All / Any control: dropdown with hints (I2) or Button Group `108:30` (DCF-0002 proposal)? One answer for both cases | §6, consistency | Product Designer | |
| Q24 | Dependency: most EXISTING components ship in `@fynxt/ui` 0.2.0 on the **unmerged** DCF-0001 branch (`main` has 7). DCF-0003 code depends on that merge | Stage 3 | UI Code Reviewer | |
| Q25 | NumberField, Breadcrumb and Radio are also NEW-COMPONENTs in DCF-0002. Which case builds them first? | Stage 3 order | Product Designer + UI Code Reviewer | |
| Q26 | I2's group tint `#F5F7FB` and border `#C9D2E0` may have no matching token. Map to an existing token or add one? | §8 | Product Designer | |
| Q27 | Is the claude.ai wireframe (I3) the same version as the local export (I2)? FDI read only I2 | Inputs | Aman Bansal | |
| Q28 | Spelling: "Enrolment" (I1) or "Enrollment" (existing UI, I2) in the UI copy? | Copy | PM | |
| Q29 | Edit mode: title, and loading saved rules into the builder. Do changes affect only future enrolments (implied by BR5 and *Out of scope*, but not stated)? | P1 edit state | PM | |
| Q31 | D1 stepper: the frames show three steps (Participant type · Enrollment Criteria · Participant Blocking), taken from I1a / I2. Does the real wizard have more steps (e.g. program details or rewards)? Labels, order and whether earlier steps can be revisited? | Stepper | PM + Product Designer | |
| Q32 | FDS-101 defects found in Stage 2: (a) Select's `label` boolean is not wired to its LabelRow; (b) Select, Number Input and Date Field have a fixed 80px height that reserves helper space. (c) Select's `Required` toggle renders no asterisk, so the I6 required markers can't be shown without faking them. FDI worked around (a) and (b) with instance overrides (hide LabelRow, hug height) and left (c) unfixed. Fix in FDS-101? Same family as DCF-0002 Q27 | FDS-101 | Product Designer (FDS-101 owner) | |
| Q33 | Mobile: Condition Group has no `Layout=Stacked` variant, so M1 composes the group from tokens and stacked rows. Condition Row has a stacked variant for List only, so M1 shows the Balance value with a list control. Add stacked Number / Date rows and a stacked Group variant? | Candidate components | Product Designer | |
| Q34 | OBSERVED geometry with no token (§8): 22px label offset, 52px join column, 62px indent. Add tokens, or accept as component-internal values? | §8 | Product Designer | |
| Q35 | I6 labels the match dropdowns **AND / OR**; the PRD's values are **All / Any** (C11). Keep All / Any, or show AND / OR (e.g. "All (AND)")? Without the old sentence ("Participants must match … of the conditions below"), the dropdown needs an accessible name. Code will use "Participants must match" / "Rules in Group N must match" | Copy, a11y | Product Designer + PM | |
| Q30 | Carried from `fdi.config.json`: where is the existing component library recorded? FDI searched only Station `packages/ui` and FDS-101 | §4 | Product Designer | |

| Q36 | Step 1 fields: Program name (required) and Description (optional, 500 characters) are FDI proposals. I1 defines no program fields. Are dates, reward or other program details part of this wizard or elsewhere? | Step 1 | PM | |
| Q37 | P0: list columns, program statuses (Draft / Active / Inactive) and lifecycle, row actions (Edit, Duplicate, Deactivate, View enrolled participants), delete rules | P0 | PM | |
| Q38 | Step 3: is a block reason captured (optional, admin-only)? Who can unblock? Is unblocking audited? | Step 3 | PM / Compliance | |
| Q39 | Tokens: no overlay / scrim token (FDI used `neutral/900` at 48%, OBSERVED) and no XL elevation style published (FDI used `elevation/sm`) | FDS-101 | Product Designer | |
| Q40 | Candidates from D3: sticky **Builder Footer** (pairs with the DCF-0002 Builder Header) and **Participant Picker** modal (search + multi-select + optional reason). Promote, or keep as compositions? | §6 | Product Designer | |
| Q41 | Side Nav: the DCF-0001 candidate has no Incentive Programs item. P0 overrides the "Assessment Attempts" slot on this page only. Where does the item go (Q20)? | P0 shell | PM + Product Designer | |
| Q42 | On **Create program**: is the program Active immediately, or Draft until activated? Copy for the success toast and the Step 3 review summary | P0, Step 3 | PM | |
| Q43 | D4 branches DCF-0003 from `main`, but IconButton, Modal / ConfirmDialog, EmptyState, Menu, MultiSelect, AppShell / SideNav / TopNav exist only on the unmerged DCF-0001 branch. Options: (a) merge DCF-0001 to `main` first, then branch; (b) branch from `main` and build only DCF-0003's own components now, adding P0 / P1 pages after DCF-0001 merges; (c) branch from `main` and rebuild the shared components (duplicates DCF-0001 and will conflict) | Stage 3 | Product Designer + UI Code Reviewer || Aman Bansal (Product Designer), 2026-10-14: **option (a)**, then on confirmation **"Stack, don't merge"**: DCF-0003 is rebased onto `fdi/DCF-0001-crm-tasks`; `main` is untouched, and DCF-0001 must be reviewed and merged first |
| Q44 | Station release: (a) `@fynxt/ui` version. This branch adds features (MINOR), but `main` is 0.1.0 and the unmerged DCF-0001 branch already claims 0.2.0, so the number depends on merge order. (b) The Station has **no git remote**, so FDI can't push or open the PR that moves the case to CODE-REVIEW | Stage 3 → CODE-REVIEW | UI Code Reviewer || Aman Bansal, 2026-10-14: **local**. No remote; the review is a local branch review (diff `main..fdi/DCF-0003-object-enrolment`) recorded in §12 instead of a PR URL |
| Q45 | D5 rail copy: step 3 renamed "Participants" (was "Participant blocking") and a description per step. FDI copy, not from I1. Approve or replace | P1 rail, Step 3 heading | Product Designer | |
| Q46 | D5 moves Manual enrollment from Step 2 (today, I1a) to Step 3. Is changing the existing wizard's step structure in scope for this PRD, and does the "nothing to enrol" check (Q10) now run on Create (S3e)? | P1 Steps 2–3, S3e, code | PM | |
| Q47 | Build interactions not drawn in Figma (FDI proposals, config or template defaults): (a) completed rail steps are buttons that go back (never forward); (b) every alert has the FDS-101 close button; error alerts return on the next failed attempt; (c) participant names link to a profile when the product passes `participantHref` (gallery uses a placeholder route); (d) under 760 wide the rail hides and a "Step N of 3 · label" line shows (M1, Q33) | P1 code | Product Designer | |
| Q48 | FDS-101 **Fallback** (S3a, L2, L4) has no code component. Code styles the compact EmptyState to match it inside DCF-0003. Promote a Fallback component (or an EmptyState variant) to `@fynxt/ui`? | Code reuse | Product Designer | |
| Q49 | L1 column menus (⋯) and pagination have no specified behaviour. Code proposes, as DCF-0002: sort ascending / descending / clear per column, client-side paging with 10 / 25 / 50 rows. Table Pagination now exists twice in templates (DCF-0002, DCF-0003): extract to `@fynxt/ui` once approved | P0 code | Product Designer | |
| Q50 | Drawn with no behaviour (rendered, announced as unavailable, tooltip explains): Top Nav help and notifications, Audit logs tab, page tips and ⋮, Add filter, column chooser | P0 code | Product Designer / PM | |
| Q51 | Side nav: should an open parent be filled when its child is the current page (DCF-0001 sample) or stay plain (DCF-0003 L1, version `2413067555528508501`)? One rule for every page? | Shared SideNav | Product Designer | |

I1 also leaves *What it costs today* and *Success criteria* blank. They do not block design and are not listed as questions.

### 10.1 FDI proposals (industry practice): NOT answers

Requested by D3: "the open Questions shall also be answered according to the best industry practice". Under CLAUDE.md §5 and §13, FDI may not decide business rules, permissions or product behaviour. Each row below is a **proposal** that the D3 frames use as a working assumption. The **Answer** column in §10 stays empty until the named owner confirms or replaces it.

| Q | FDI proposal (common practice in CRM / marketing-automation rule builders) | Shown in |
|---|---|---|
| Q2 | Layout (b): one rule builder for all criteria. Migrate existing Include / Exclude Countries to "Account › Country is any of / is none of". Keep (a) as fallback | S2a–S2j, S2l (b); S2k (a) |
| Q3 | Enrolled = (matches rules OR added manually) AND NOT blocked. Blocking always wins (B4) | S2 "Who gets enrolled", S3b warning |
| Q4 | Operators by type. Text: is, is not, contains, doesn't contain, starts with, is empty, is not empty. List: is any of, is none of, is empty, is not empty. Number / currency: =, ≠, >, ≥, <, ≤, is between, is empty. Date: is on, before, after, between, in the last / next N days, is empty. Boolean: is true / is false | S2j (number) |
| Q5 | Multi-value for list fields ("is any of"), with a searchable picker when a list has more than 10 values | (spec) |
| Q6 | "Any related record matches" (exists) for one-to-many objects; label the field "Trading Account (any) › Balance". Currency handling stays with PM | (spec) |
| Q7 | Object list depends on participant type. Changing the type removes incompatible rules after a warning | S1a, S1c |
| Q8 | An empty field fails the rule, except for "is empty" / "is not empty" | (spec) |
| Q9 | Rules store field IDs, so renames update automatically. A deleted field: the rule evaluates as not met (fail closed), the program shows a warning, and saving is blocked until it's fixed | S2l |
| Q10 | Draft can be empty. **Create** (Step 3) needs at least one rule or one manual participant; Step 2 Next no longer blocks, because participants are added in Step 3 (D5) | S2c, S3e (S2d superseded) |
| Q11 | Save draft keeps incomplete rules. Next and Create block, with inline errors and a summary alert | S2e |
| Q12 | Top level All. A new group defaults to Any (as I2). A new rule starts blank, not prefilled | S2a |
| Q13 | Clear all and Delete group (2+ rules) ask for confirmation. Deleting a single rule doesn't | S2h |
| Q14 | Deleting a group's last rule removes the group. One-rule groups are allowed | (spec) |
| Q15 | Up to 20 rules per program, 5 groups, 10 rules per group | (spec) |
| Q16 | Permission "Incentive Programs: Manage" to create and edit; "View" is read-only. Live programs stay editable, and changes apply to future enrolments only | S2l banner |
| Q17 | Every change is logged (who, when, before / after) in the Audit logs tab | P0 tabs |
| Q18 | Cache CRM metadata per session; load value lists lazily with search; target under 1s | S2f |
| Q20 / Q41 | Main nav: CRM › Operations › Incentive Programs (placeholder until the IA is confirmed) | P0 |
| Q21 | With D3, P1 is the second full-screen stepped builder (after DCF-0002). Propose template discovery for a "full-screen stepped editor"; keep ONE-OFF until then | — |
| Q22 / Q23 | One shared ConditionBuilder; dropdown All / Any, as in the live Add Data Filter (I6) | S2 |
| Q28 | UI copy uses "Enrollment" (US, as the existing UI); documents may use either | all |
| Q29 | Edit title: program name in the header; banner "This program is live"; changes affect future enrolments only | S2l |
| Q31 | Three steps (D3): Participant type · Enrollment criteria · Participant blocking | all P1 |
| Q35 | Keep All / Any (plain language). Accessible names: "Participants must match" / "Rules in Group N must match" | S2 |
| Q36–Q38, Q42 | As described in each question | S1, P0, S3 |

Not proposable by practice: Q1 (PRD ownership), Q19 (API contract), Q24–Q27, Q30, Q32–Q34, Q39–Q40 (tooling and design-system ownership).

## 11. Review Feedback

<!-- Reviewers: add one row per point. FDI fills "Resolution" on /fdi-revise. -->

| # | Rev | Reviewer | Section | Feedback | Resolution (FDI) | Closed? |
|---|---|---|---|---|---|---|
| D1 | 1 | Aman Bansal (Product Designer), in chat during `/fdi-figma` 2026-10-13 | §5.1, §6 | "and can use steper as in DCF-0002" | Applied in all 9 P1 frames. DCF-0002 candidate **Stepper Step** `43:6900` sits under the page header: 1 Participant type (Completed), 2 Enrollment Criteria (Active), 3 Participant Blocking (Upcoming). The card shows only the active step, the STEP chip is dropped from its heading, and the primary action is Next (Save in edit mode). Mobile uses a compact "Step 2 of 3" label because three horizontal steps don't fit in 390px. Steps 1 and 3 are unchanged and not drawn. C8, Q31 | No |
| D2 | 1 | Aman Bansal (Product Designer), with `/fdi-figma` 2026-10-13 | §5.1, §6 | "for logical builder we can use this kind of structure do not make it in popup just the innerstructure for reference" + I6 | Applied to all 9 frames and the candidates: All / Any root dropdown with dotted tree and arrow branches; + Add rule / + Add group at the top; group card with header (title, All / Any, + Add rule, delete), divider and inner tree; red ghost delete icons. Not taken from I6: popup chrome, Name / Users fields, object tabs (C9), nested groups (C10), AND / OR labels (C11, Q35), required asterisks (Q32c). New Logic Tree and Condition Group v2; D1-era parts superseded (§6) | No |
| D3 | 1 | Aman Bansal (Product Designer), with `/fdi-figma` 2026-10-14 | §5, §6, §10 | "need to create all three steps and this creation opens from a table of incentive program and also need to create it in details do not miss any points the open Questions shall also be answered according to the best industry practice and also need the create from to open on full screen and follow the DCF-0002 pattern for full screen (header and footer only ) and use the proper app shell" | Applied. **P0** list in the app shell (6 frames). **P1** full screen with Builder Header, Stepper and sticky footer: Step 1 (3 frames), Step 2 (12), Step 3 (3), leave guard (1); M1 mobile kept. The D2 in-page frames A1–A7 and B1 are superseded (section `88:5077`). Open questions: industry-practice **proposals** in §10.1, not answers (CLAUDE.md §13), and every frame that uses one is labelled. New C12–C13, Q36–Q42 | No |
| D4 | 1 | Aman Bansal (Product Designer), in chat at `/fdi-build` 2026-10-14 | §10.1, §12, Stage 3 | Build decisions: (1) version ID: "I'll paste the ID"; (2) §10.1 proposals: "Configurable placeholders"; (3) base branch: "Branch from main" | (1) Gate waits for `approvedVersionId`. (2) Stage 3 builds operators, limits, statuses and defaults as config marked PROPOSED (Qn), with no enrolment or evaluation logic in UI code. (3) `fdi/DCF-0003-object-enrolment` from `main`. Components that exist only on the unmerged DCF-0001 branch must not be copied (one source per layer); see Q43 | No |
| D5 | 1 | Aman Bansal (Product Designer), with `/fdi-figma` 2026-10-15 (reference screenshot of a vertical stepper in a left rail) | §5.0, §6 | "Use this stepper and move the Add participant to step three, also make it proper as per the design system do not invent new component yourself just make this stepper as a component" | Applied. Stepper Step candidate extended with **Orientation=Vertical** + **Description** (no new component; FDS-101 has none). All 19 desktop P1 frames: left stepper rail + main column. Manual enrollment removed from Step 2 (and M1) and added to Step 3 "Participants" above Participant blocking. S2i → **S3d** (same node), S2d superseded by new **S3e** (Create blocked). S2k layout (a) tabs 4 → 3. New C14, Q45, Q46 | No |
| F5 | 1 | aman.bfynxt.com (Product Designer, Product Manager, Project Manager, Business Analyst, QA / Tester, Stakeholder, UI Code Reviewer, Developer) | Built page · Incentive Programs | [Pin P1 at “All incentive programsPrograms that reward clients and IBs. Enrollment criteria”] alignment issues |  | No |

## 12. Design & Build Record

- **Figma:** [https://www.figma.com/design/0CwREH91xlsQOFpAUp852B/FDI---Test?node-id=84-4374](https://www.figma.com/design/0CwREH91xlsQOFpAUp852B/FDI---Test?node-id=84-4374) · page `84:4374` "DCF-0003 — Filter-based (Object) Enrolment" · approved version **`2410117832155798624`** (supplied by Aman Bansal, 2026-10-14)
  - **Candidate components** section `84:4375` (after D2): Logic Tree `94:7364`, Condition Row `84:4954` (6 variants), Condition Group v2 `95:7994` (Rules 1–3), Rules Summary `84:4989`. Superseded section `98:26221`: Logic Divider, Match Selector, Condition Group v1. Screenshot: [`figma/candidates.png`](figma/candidates.png)
  - **P1 section** `88:5077`, one frame per state. Layout (a) keeps today's fixed-criteria tabs; layout (b) is I2 (C1 / Q2 open):

    | Frame | Node | State | Screenshot |
    |---|---|---|---|
    | A1 | `88:5078` | Filled, top level All (I1 Examples setup) | [`figma/A1-filled-all.png`](figma/A1-filled-all.png) |
    | A2 | `88:5909` | Filled, top level Any (I1 E4): OR dividers | [`figma/A2-filled-any.png`](figma/A2-filled-any.png) |
    | A3 | `88:6521` | Empty: no object rules, Clear all disabled | [`figma/A3-empty.png`](figma/A3-empty.png) |
    | A4 | `90:5866` | Loading CRM objects and fields: Add disabled | [`figma/A4-loading.png`](figma/A4-loading.png) |
    | A5 | `90:6106` | Error: CRM metadata failed, Retry. Fixed criteria still usable | [`figma/A5-error.png`](figma/A5-error.png) |
    | A6 | `90:6308` | Validation: incomplete rule on Next (R7). Save as Draft behaviour Q11 | [`figma/A6-validation.png`](figma/A6-validation.png) |
    | A7 | `90:7127` | Edit: rule uses a deleted CRM field (expected backend result Q9) | [`figma/A7-edit-stale-field.png`](figma/A7-edit-stale-field.png) |
    | B1 | `90:7785` | Filled, layout (b): fixed criteria as Account rules + Manual Enrollment card (I2) | [`figma/B1-filled-layout-b.png`](figma/B1-filled-layout-b.png) |
    | M1 | `91:7071` | Mobile 390, layout (b): stacked rules, compact step label | [`figma/M1-mobile.png`](figma/M1-mobile.png) |

  - **Audit after D2:** 704 instances in the P1 and candidate sections, 0 uses of superseded parts, 0 images, fonts Lexend / Sora only, 0 unbound paints. (D1 audit: 682 instances, 0 images, fonts Lexend / Sora only, 0 unbound paints outside the canvas sections. Every library part is an FDS-101 instance: Select, Number Input, Date Field, Button, Icon Button, Badge, Alert, Breadcrumb, Radio, Line Tab Group, Empty State, icon/loader.)
  - **Sample data:** I1 *Examples* (R1–R4). Operators shown are illustrative (Q4). Manual Enrollment copy is neutral, and I2's "whatever the rules above" is not used (C2).
  - **Code Connect:** none yet for the candidates or for Number Input / Date Field / Breadcrumb / Radio (Stage 3 task).
- **D3 record (2026-10-14).** Page `84:4374`. Screenshots in [`figma/`](figma/) (D2 shots archived in `figma/superseded-D2/`).
  - **P0 list** section `113:8616`: L1 `113:8617` default · L2 `113:33448` empty · L3 `113:33798` loading · L4 `113:34469` error · L5 `113:34818` created toast · L6 `119:39358` row actions
  - **P1 full screen** section `116:9982`:

    | Step | Frames (node IDs) |
    |---|---|
    | Step 1 | S1a `116:9983` default · S1b `116:10139` name missing · S1c `116:10270` change-type warning |
    | Step 2 | S2a `116:10433` filled All · S2b `117:10607` Any · S2c `117:11491` empty · S2d `117:11666` nothing to enrol · S2e `117:11848` incomplete rule · S2f `117:12592` loading · S2g `117:12751` CRM error · S2h `118:11950` Clear all confirm · S2i `118:12868` add participants · S2j `118:13663` condition menu · S2k `118:14433` layout (a) · S2l `118:15096` edit live + deleted field |
    | Step 3 | S3a `119:14196` empty · S3b `119:14315` blocked + review · S3c `119:14618` add blocked |
    | Other | X1 `119:15007` leave with unsaved changes · M1 `91:7071` mobile Step 2 |

  - **Audit (P0 + P1):** 1,731 instances, 0 images, fonts Lexend / Sora only, 0 unbound paints. OBSERVED: scrim opacity (Q39).
  - **Superseded:** section `88:5077` (A1–A7, B1 in-page wizard).
- **D5 record (2026-10-15).** Page `84:4374`. Screenshots in [`figma/`](figma/) refreshed; replaced shots in [`figma/superseded-D5/`](figma/superseded-D5/).
  - **Component:** Stepper Step `43:6900` (DCF-0002 page `33:4040`) now 6 variants: Orientation Horizontal / Vertical × State Active / Upcoming / Completed; [`figma/D5-stepper-step-set.png`](figma/D5-stepper-step-set.png).
  - **P1 frames** (section `116:9982`, same node IDs unless noted): every desktop frame's Body is now `Stepper rail (Stepper Step · Vertical)` + `Main`.

    | Step | Frames |
    |---|---|
    | Step 1 | S1a `116:9983` · S1b `116:10139` · S1c `116:10270` |
    | Step 2 (rules only) | S2a `116:10433` · S2b `117:10607` · S2c `117:11491` · S2e `117:11848` · S2f `117:12592` · S2g `117:12751` · S2h `118:11950` · S2j `118:13663` · S2k `118:14433` · S2l `118:15096` |
    | Step 3 Participants | S3a `119:14196` empty · S3b `119:14315` manual + blocked + review · S3c `119:14618` add blocked · **S3d `118:12868`** add participants picker (was S2i) · **S3e `186:67001`** nothing to enrol on Create (new) |
    | Other | X1 `119:15007` · M1 `91:7071` (manual enrollment removed) |

  - **Superseded:** section `186:67091` holds S2d `117:11666`.
  - **Code (D5 build, 2026-10-15):** commit `cd1eacd` on `fdi/DCF-0003-object-enrolment` (built in worktree `../fynxt-dcs-dcf0003`, because the main checkout is on `fdi/DCF-0002-scoring-builder`). Against version `2410552998186577751`.
    - `Stepper`: vertical orientation, descriptions, completed-step buttons; 6 tests; Code Connect for both Orientation variants.
    - Editor: rail + main layout (rail sticky), Step 2 rules only, Step 3 Participants (manual → divider → blocking, EmptyState with action, overlap warning, review summary), S3e check on Create, dismissible alerts, linked names, stacked Step 1 fields, Figma column widths (Type 160 / Added 240 / Reason 300 / Blocked 200 / Remove 64), picker copy "Search clients by …".
    - Checks: typecheck exit 0 · tests **167 / 167** · token-literal lint passed.
    - Browser verification (headless Chrome, port 5193): [`figma/code-verification/D5/`](figma/code-verification/D5/) — S1a, S1 edit, S2a, S2c, S3a, S3b, S3c, S3d, S3e, rail back to Step 1, M1 (390). Found and fixed: Remove column overflow ("…" next to the icon) and Step 1 fields in two columns instead of stacked.
    - **Known differences from the frames:** (1) inputs keep the grey `surface/input` fill of the DCF-0001 Field (pre-existing, flagged in Stage 3); (2) number values unformatted ("1000"); (3) the overlap warning says "them" where the sample frame says "him" (neutral copy for any participant); (4) demo data shows email in the participant reference column; (5) mobile condition rows reuse the D3 stacked layout.
    - **Stack:** `studio/gallery-change-requests` and `fdi/DCF-0002-scoring-builder` were built on the old tip `f42bca7`; they need a rebase onto `cd1eacd` (not done: another branch's work).
- **Pixel-perfect pass (2026-10-16, `/fdi-build`, designer: "use only figma design"):** commits `3bbafd9` → `25a266f`, built in `~/fynxt-work/dcs-dcf0003` (outside OneDrive; OneDrive blocked file reads in the old worktree). **Not yet in the station repo:** the push was refused because the stale worktree `../fynxt-dcs-dcf0003` still has the branch checked out.
  - **Method:** Figma node boxes, type and colour tokens read with `use_figma` per frame, compared with DOM measurements in headless Chrome. Result: S1a, S2a, S3b, L1 within 1px for positions and sizes (except C15 items); type and colours match tokens.
  - **P0 list rebuilt to L1–L6:** page header with tabs (Incentive Programs / Audit logs) and actions; table card with toolbar (filter, Status and Participant type chips, Clear all, 280 search); columns 340 / 140 / 170 / 110 / 110 / 200 / 56 with ⋯ sort menus; view and ⋮ row actions; pagination; L2 / L4 Fallback; L3 headers + loader; L5 toast copy; L1 sample data (5 programs).
  - **P1 editor:** Builder Header 64 (24 chevron, divider, neutral status chip, one-line breadcrumb), white inputs, label-only participant type cards (56), 14px step label, Fallback empty state, alerts 60, table rows 44 with Body/SM cells, "1,000" numbers, dates "28 Sep 2026".
  - **Checks:** typecheck exit 0 · tests **173 / 173** · token-literal lint passed. Screenshots: [`figma/code-verification/pixel-pass/`](figma/code-verification/pixel-pass/).
  - **Remaining differences:** C15 (Figma inconsistencies); Top Nav title 20 vs 18 (OBSERVED, no token); tab label 3px right (FDS-101 Tabs reserve bold width); SideNav sub-item indent is the DCF-0001 component's.
- **Station:** branch `fdi/DCF-0003-object-enrolment`, **stacked on** `fdi/DCF-0001-crm-tasks` (Q43). Commits `c64529c` → `f42bca7` (7). Review: **local** (Q44): `git log fdi/DCF-0001-crm-tasks..fdi/DCF-0003-object-enrolment`.
  - **`@fynxt/ui`:**
    - NumberField, DateField (Field module).
    - Radio / RadioGroup (with `appearance="card"`).
    - **ConditionBuilder** (candidate). Config-driven: objects, operators, limits, new-group match, confirmations, validation flag. It never evaluates rules.
    - Stepper (DCF-0002 candidate), Breadcrumb, Checkbox, Toast, DataTable.
    - Each has tests and a Code Connect file. Node IDs read from FDS-101 / the work file, none guessed.
  - **`@fynxt/templates`:** `CAND-DCF-0003-incentive-programs` (DRAFT).
    - P0 list in the app shell: filters, search, table, row ⋮ menu, loading, error and empty states, success toast.
    - P1 full-screen editor: Builder header, Stepper, Steps 1–3, sticky footer.
    - Dialogs: participant-type change, Clear all, delete group, leave without saving.
    - Participant picker (manual and blocked, with optional reason).
    - Live-program banner; stale-rule and incomplete-rule validation.
    - Permissions via `config.can` (Q16). Data via `ProgramsAdapter` (Q19), with an in-memory demo adapter for the gallery.
  - **Page:** `apps/studio/gallery/pages/crm/incentive-programs.{config,page,page.test}.tsx`, registered as `crm.operations.incentive-programs`. The menu entry waits for `/fdi-publish`. **Every §10.1 proposal is set in the config and marked `PROPOSED (Qn)`** (D4).
  - **Checks (2026-10-14, after the last commit):** typecheck exit 0 · tests **159 / 159** (DCF-0003 adds 52) · token-literal lint passed.
  - **Browser verification:** headless Chrome against the running Studio preview, `/preview.html?page=crm.operations.incentive-programs`. Screenshots in [`figma/code-verification/`](figma/code-verification/): L1, S1 (create, name missing, edit live), S2 (edit live, filled), S3.
    - It caught a real bug that tests can't see: new CSS `@import`s placed after a rule were ignored, so the new components rendered unstyled. Fixed in `f42bca7`.
    - It also showed three visual gaps, fixed in the same commit: the group delete icon alignment, the search width, and the Step 1 section heading.
  - **Known differences from the approved frames:**
    1. Selects and inputs have the grey `surface/input` fill of the existing DCF-0001 Field; Figma shows white. That's a pre-existing Field style, out of scope; flagged for the UI Code Reviewer.
    2. Number values show unformatted ("1000", not "1,000") because the native number input doesn't format.
    3. DateField uses the browser's locale date format.
    4. The Figma L1 sample says "3 rules · 1 group" for UK VIP Rebate. The I1 Examples data it represents has 4 rules, and code shows "4 rules".
    5. Code adds **Incentive Programs as a 4th Operations nav item** instead of Figma's slot override (cleaner; placement still Q20 / Q41).
    6. Mobile (M1) is not separately verified in a browser; the layouts reflow via container and media queries.
- **Figma update build (2026-10-22, `/fdi-build`, version `2413067555528508501`):** commit `090ad5e` on `fdi/DCF-0003-object-enrolment` in `~/fynxt-work/dcs-dcf0003` (on top of the unpushed pixel pass `25a266f`). Diffed every P0 and P1 section against the build in real Chrome at 1440.
    - **Changed in Figma and now built (P0 list):** side nav rows 40 + 4 gap with children 4 px below their parent, children text at x 61, parents Regular, current page Medium, open parent plain (C16 / Q51); table rows 44 (header 171, rows 215 / 259 / 303 / 347 / 391), card at 113, toolbar 57, pagination at 435, page header 57. All measured equal to the frame.
    - **P1 (20 frames): no change found.** Step 1 and Step 2 match; the card at x 304 in tall Step 2 frames is the body frame being 1408 wide there (1440 elsewhere), already C15.
    - **Not changed, on purpose:** pagination Next stays disabled at "1–5 of 5" (the frame draws it active; nothing to go to); the filter label stays "Participant type" (frame typo "Partipation type", C15); tabs keep 5 px for their bold hover text so the row does not shift (frame 169 / 102, build 174 / 104); sample row 1 keeps "4 rules · 1 group · 2 manual" (C15).
    - Checks: typecheck ✓ · tests **174 / 174** ✓ (+1 SideNav test) · token-literal check ✓.
    - **Studio preview (2026-10-22):** FDI Studio runs from the DCF-0005 stack, which was based on DCF-0003 `cd1eacd` and still showed the old UI. Merged `25a266f` + `090ad5e` into a local branch `preview/dcf0003-figma-update` (`93c65f5`) of `~/fynxt-work/dcs-dcf0005`; conflicts resolved toward DCF-0005's newer shared components with the DCF-0003 additions ported (SideNav `highlightActiveParent` + spacing, DataTable cells p0/16 at 14 px, editor back button / neutral chip; TopNav `titleAction` folded into `titleAdornment`; `PendingControl` exported once). 325 / 325 tests, typecheck, lint green. Side effect on DCF-0005 pages: table text 12 → 14 px, the FDS-101 Data Table Cell value (DCF-0005 frames use 14 Regular in 268 of 400 cells). Fee Structures' table was already wider than its card (1270, scrolls) before the merge. Not pushed.
- **QA (CLAUDE.md §17), Stage 3 partial (components only):**

| Check | Result | Verified by |
|---|---|---|
| PRD / FRD | **Verified for the UI.** U1–U6: rules on objects and fields, field-dependent conditions and values, top-level and group All / Any, one level of groups, add / delete / clear (ConditionBuilder tests). B1: objects, fields and values come from the adapter. B2–B4 are backend; the UI only states them (explainer, "Blocking wins"). Examples E1–E5 are evaluation, so not UI-testable | FDI (automated) |
| Template rules | **Verified.** Gallery page is configuration only (invariant 3); the template imports only `@fynxt/ui`, tokens and lucide; no component duplicated (invariant 2) | FDI |
| Design system (tokens, components) | **Verified.** Token-literal check passes; OBSERVED values listed in §8; reused DCF-0001 components (IconButton, Modal / ConfirmDialog, Menu, MultiSelect, EmptyState, SearchField, AppShell / SideNav / TopNav), none copied | FDI (automated) |
| UX decisions | **Verified against D1–D3:** stepper, tree structure, full screen with header and footer, list in the app shell. `ux/decisions/` is empty | FDI + browser shots |
| States | **Verified in tests:** list (default, loading, error / retry, empty, filtered empty); editor (Step 1 validation, type-change warning, nothing to enrol, incomplete rule, CRM error / retry, deleted field, live banner, leave guard, draft save, create → toast); builder (empty, limits, confirmations); pickers. **In the browser:** L1, S1 (both), S2, S3. Not browser-checked: modal and loading frames | FDI |
| Permissions | **Mechanism verified:** every action is gated by `config.can` (create button hidden without permission, tested). **Rules not verified:** Q16 is a proposal; the gallery allows everything | FDI / **needs PM** |
| Accessibility | **Verified:** labels, accessible names (radio names fixed during build), descriptions, `aria-invalid` and error alerts, fieldset / legend, rule groups named "Rule N" / "Group N, rule N", polite live regions for add / delete / step changes, focus moves to new rules and to the step heading, single tab stop in radio groups, stepper `aria-current="step"`, alertdialogs for destructive confirmations. **Needs human:** screen-reader pass, contrast of focus rings | FDI + **human** |
| Responsive | **Partial.** Container queries (builder 4 → 2 → 1 columns) and a 760px media query (template) are implemented but only checked at 1440px | **human** |
| Visual match to Figma `2410117832155798624` | **Close match at 1440px** for L1, S1, S2, S3 (screenshots above), with the 6 known differences listed. Needs designer sign-off | **Product Designer** |
## 13. Status History

| Date | From → To | Who | Note |
|---|---|---|---|
| 2026-10-13 | — → DRAFT | FDI | Created from I1–I5 |
| 2026-10-13 | DRAFT → IN-REVIEW | FDI | Rev 1. Page: P1 ONE-OFF (recommended, Q21). Components: 11 EXISTING (4 conditional), 5 NEW-COMPONENT with FDS-101 sources (NumberField, DateField, SearchSelect, Breadcrumb, Radio; 3 shared with DCF-0002), 1 NEW-COMPONENT candidate pattern (ConditionBuilder). 7 conflicts (3 open), 30 open questions. I1 examples E1–E5 checked as consistent |
| 2026-10-13 | IN-REVIEW → APPROVED | Aman Bansal (Product Designer) | Rev 1 approved in chat ("approved"); FDI transcribed. Role taken from the case owner, not separately confirmed. Approval covers scope, the P1 ONE-OFF class (Q21 recommendation) and the §6 component plan, including the ConditionBuilder candidate (Q22). The other open questions and conflicts C1, C2 and C6 stay open; `/fdi-figma` designs C1 as two layouts unless Q2 is answered first |
| 2026-10-13 | APPROVED → DESIGN-IN-PROGRESS | FDI | `/fdi-figma`: gate passed (approver Aman Bansal, Product Designer, §13). Work file `0CwREH91xlsQOFpAUp852B` |
| 2026-10-13 | DESIGN-IN-PROGRESS → DESIGN-REVIEW | FDI | Page `84:4374`: 5 candidate component sets / components (ConditionBuilder parts), 9 P1 frames (A1–A7 layout (a), B1 layout (b), M1 mobile). D1 stepper applied (designer, in chat). C8 and Q31–Q34 added. Designer to save a named version and record its ID |
| 2026-10-13 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-figma`: D2, use I6's inner structure for the logic builder, not as a popup. FDI transcribed |
| 2026-10-13 | DESIGN-CHANGES-REQUESTED → DESIGN-IN-PROGRESS | FDI | `/fdi-figma` for D2 (not a re-sync: the frames were not edited by hand) |
| 2026-10-13 | DESIGN-IN-PROGRESS → DESIGN-REVIEW | FDI | D2 applied to all 9 frames (same node IDs) and the candidates: Logic Tree, Condition Row (tree branch), Condition Group v2; 3 D1-era parts superseded. C9–C11 resolved by hierarchy; Q32c, Q35 added. Screenshots refreshed in `figma/`. Designer to save a named version |
| 2026-10-14 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-figma`: D3, all three steps in detail, opened from an Incentive Programs table, full-screen create (DCF-0002 pattern: header and footer only), proper app shell for the list, open questions answered by industry practice. FDI transcribed. Scope change: adds P0 list page |
| 2026-10-14 | DESIGN-CHANGES-REQUESTED → DESIGN-IN-PROGRESS | FDI | `/fdi-figma` for D3 |
| 2026-10-14 | DESIGN-IN-PROGRESS → DESIGN-REVIEW | FDI | D3: P0 list (6 frames, app shell) + P1 full-screen 3-step wizard (19 frames + M1). Open questions answered as labelled **proposals** (§10.1), not answers. C12–C13, Q36–Q42. Scope grew beyond the approved rev 1 (C12): confirm at design review or request `/fdi-revise` |
| 2026-10-14 | DESIGN-REVIEW → DESIGN-APPROVED | Aman Bansal (Product Designer) | In chat with `/fdi-build`: "Design Approved". FDI transcribed. Taken to cover the D3 scope (C12). No Figma version ID given yet (`approvedVersionId` null). §10.1 proposals not confirmed by this approval |
| 2026-10-14 | DESIGN-APPROVED → CODE-IN-PROGRESS | FDI | `/fdi-build`: gate passed (approver Aman Bansal; version `2410117832155798624`). Branch `fdi/DCF-0003-object-enrolment` from `main` (D4). Q43 unanswered: FDI applies option (b), components with no DCF-0001 dependency only |
| 2026-10-14 | (CODE-IN-PROGRESS) | FDI | Commit `e86dc1f`: NumberField, DateField, Radio / RadioGroup; checks green. Stopped at Q43 (ConditionBuilder and pages need DCF-0001 components) and Q44 (no git remote, so no PR). Status stays CODE-IN-PROGRESS |
| 2026-10-14 | (CODE-IN-PROGRESS) | FDI | Q43 resolved by Aman Bansal: stack on DCF-0001 (no merge into main). Rebased; built ConditionBuilder, Stepper, Breadcrumb, Checkbox, Toast, DataTable, the CAND-DCF-0003 template and the gallery page; browser-verified and fixed a CSS import bug. 159 / 159 tests, typecheck and lint green |
| 2026-10-14 | CODE-IN-PROGRESS → CODE-REVIEW | FDI | Local review (Q44 "local"): branch `fdi/DCF-0003-object-enrolment` @ `f42bca7`, stacked on `fdi/DCF-0001-crm-tasks`. Needs the UI Code Reviewer. DCF-0001 must be approved and merged first |
| 2026-10-15 | CODE-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-figma`: D5, vertical left-rail stepper as a component; move Add participants (manual enrollment) to Step 3. FDI transcribed. Backward transition across the code gate: branch `fdi/DCF-0003-object-enrolment` @ `f42bca7` no longer matches the design and needs `/fdi-build` after design approval |
| 2026-10-15 | DESIGN-CHANGES-REQUESTED → DESIGN-IN-PROGRESS | FDI | `/fdi-figma` for D5. FDS-101 search "Stepper", "Step", "Wizard": no stepper component (only icons, Pagination). Extending the DCF-0002 candidate Stepper Step `43:6900` rather than creating a new component |
| 2026-10-15 | DESIGN-IN-PROGRESS → DESIGN-REVIEW | FDI | D5 applied: Stepper Step VARIANT (Orientation=Vertical, Description), left-rail layout in 19 desktop frames, Manual enrollment moved to Step 3 (S3d, new S3e, S2d superseded). C14, Q45, Q46 added. Designer to save a named version; code needs `/fdi-build` after approval |
| 2026-10-15 | DESIGN-REVIEW → DESIGN-APPROVED | Aman Bansal (Product Designer) | In chat with `/fdi-build`: "approved … make it exactly like the figma with all possible interctions". FDI transcribed. Covers D5 frames. Q45 / Q46 (copy, step move scope) not answered by this approval. `approvedVersionId` still the D3 version; D5 version requested |
| 2026-10-15 | DESIGN-APPROVED → CODE-IN-PROGRESS | FDI | `/fdi-build` (D5): gate passed (approver Aman Bansal; version `2410552998186577751`). Builds on `fdi/DCF-0003-object-enrolment` in a separate git worktree, because the main station checkout is on `fdi/DCF-0002-scoring-builder` (stacked above). Later branches need a rebase onto the new commits |
| 2026-10-15 | CODE-IN-PROGRESS → CODE-REVIEW | FDI | D5 build `cd1eacd`, local review per Q44 (no remote): `git log f42bca7..fdi/DCF-0003-object-enrolment`. 167 / 167 tests, typecheck, lint green; browser-verified. Q47 added (unspecified interactions as proposals). Needs the UI Code Reviewer |
| 2026-10-16 | CODE-REVIEW → CODE-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-build`: "make it pixel perfect as in figma design as current build version is not like that". FDI transcribed. Link given had version `2410527021694858974` (recorded as DCF-0002 v5, older than D5 `2410552998186577751`); asked which version applies, designer will paste a new version ID. Build waits for it |
| 2026-10-16 | CODE-CHANGES-REQUESTED → CODE-IN-PROGRESS | FDI | Designer pasted version `2410552998186577751` (the D5 version already recorded). Gate passed. Pixel-perfect pass: measure Figma node boxes and type vs rendered DOM per frame |
| 2026-10-16 | (CODE-IN-PROGRESS) | Aman Bansal (Product Designer) | In chat with `/fdi-build`: "Approved and now use only figma design" + P0 section `113:8616` and P1 section `116:9982`. FDI transcribed: option 1 (continue the pixel-perfect build, no case-file reopen); the Figma frames of version `2410552998186577751` are the only visual spec. `/fdi-revise` was not run (gate: status was not CHANGES-REQUESTED). Build moved to a clone outside OneDrive (`~/fynxt-work/dcs-dcf0003`) after OneDrive blocked reads in the worktree |
| 2026-10-16 | CODE-IN-PROGRESS → CODE-REVIEW | FDI | Pixel-perfect pass `25a266f` (local review, Q44). 173 / 173 tests, typecheck, lint green; measured against Figma. C15, Q48–Q50, §7.0b impact. Commits are in `~/fynxt-work/dcs-dcf0003` until the stale OneDrive worktree is removed and the branch is pushed to the station repo |
| 2026-10-21 | CODE-REVIEW → CODE-APPROVED | aman.bfynxt.com (Product Designer, Product Manager, Project Manager, Business Analyst, QA / Tester, Stakeholder, UI Code Reviewer, Developer) | — |
| 2026-10-22 | CODE-APPROVED → CODE-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-build`: "make it like figma do check the previous build and updated" + Figma version `2413067555528508501` (P0 section `113:8616`). FDI transcribed; the new version is the approved one |
| 2026-10-22 | CODE-CHANGES-REQUESTED → CODE-IN-PROGRESS | FDI | `/fdi-build`: gate passed (approver Aman Bansal; version `2413067555528508501`). Diffing the build (`25a266f`, `~/fynxt-work/dcs-dcf0003`) against the updated frames |
| 2026-10-22 | CODE-IN-PROGRESS (no change) | FDI | Figma update built: commit `090ad5e`, 174 / 174 tests, measured equal to L1. Waiting for the user before pushing to the Station repo |

## 14. Revision Log

| Rev | Date | Summary of changes | Feedback items addressed |
|---|---|---|---|
| 1 | 2026-10-13 | Initial | — |
