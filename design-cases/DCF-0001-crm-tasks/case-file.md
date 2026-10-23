---
id: DCF-0001
title: CRM Tasks — workspace, Add/Edit Task and follow-ups
module: CRM / Interactions
status: CODE-IN-PROGRESS
revision: 1
owner: Aman Bansal (Product Designer)
requestedBy: Aman Bansal
created: 2026-10-12
updated: 2026-10-12
figma:
  fileKey: 0CwREH91xlsQOFpAUp852B
  pageNodeId: "0:1"
  approvedVersionId: "2409447955195877898"  # approved 2026-10-12 by Aman Bansal (Product Designer), with exception E3 (filters per AC3)
station:
  branch: fdi/DCF-0001-crm-tasks
  pr: null
---

# DCF-0001 — CRM Tasks — workspace, Add/Edit Task and follow-ups

> Design Case File. Produced by FDI (FYNXT Design Inspector) per
> `[agent/fdi/README.md](../../agent/fdi/README.md)`. Reviewers: edit only **§11 Review
> Feedback** and the frontmatter `status`, then record the change in **§13 Status History**.

## 1. Summary

A Tasks module for CRM users to create, assign and manage tasks and follow-ups so that
work is planned, tracked and recorded against the relevant record (I1, Description). It
covers a Tasks workspace with My Task / My Team's Task scope tabs, an Insights panel,
filters and expandable task cards; an Add/Edit Task popup; an Add Follow-up popup; and
per-task status, reminders, comments and attachments (I1 AC1–AC17). Automation,
notifications and cross-object activity history (AC18–AC19) depend on other services and
pages and are only partly in scope (see §5 P4, §10).

**No registered template fits.** The registry holds only placeholders, and the Table List
pilot (`FYNXT-TPL-LIST-002`) is unregistered and table-only. Rev 1 therefore proposes the
workspace as a **NEW-TEMPLATE candidate**, which is the third occurrence of the
`CAND-001` collection shell, and builds the popups as **ONE-OFF**s. Neither is promoted
without Product Designer approval.

## 2. Inputs


| #   | Input                                                                                                                                                                                            | Type                                    | Location                                                                                                                                   | Authority                                                                                         |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| I1  | Jira **M2-9 "Tasks"** (User Story, parent *Interactions* M2-1, project *FYNXT Coud – Milestone 2*), reporter **Pooja Bharghavi G**, Jira status **Idea**. PDF exported 2026-10-12 by Aman Bansal | Requirement / ticket from a named human | `[inputs/M2-9-tasks.pdf](inputs/M2-9-tasks.pdf)`, verbatim transcript `[inputs/M2-9-tasks.transcript.md](inputs/M2-9-tasks.transcript.md)` | Binding for what it explicitly states (README §2, rank 2). Its Jira status "Idea" is raised in Q1 |
| I2 | Screenshot of the live Tasks page, side nav **expanded** (brand3.crm-uat.fynxt.com/objects/tasks), supplied by Aman Bansal (Product Designer) 2026-10-12 as the reference for the menu | Production implementation (UAT) screenshot | [`inputs/I2-uat-tasks-sidenav-expanded.png`](inputs/I2-uat-tasks-sidenav-expanded.png) | Rank 5 (production implementation); visual intent for the menu as instructed |
| I3 | Same page, side nav **collapsed** (icon rail) | Production implementation (UAT) screenshot | [`inputs/I3-uat-tasks-sidenav-collapsed.png`](inputs/I3-uat-tasks-sidenav-collapsed.png) | As I2 |


No PRD, FRD, business-rule document, persona, wireframe or Figma frame was supplied for
this feature, and none exists in the repo. `product-knowledge/{prds,frds,business-rules,personas,glossary}/`
contain only READMEs. Three icons in I1 (AC3 add-filter, AC4 add-association, AC5
Associations) render as broken images in the PDF.

## 3. Requirement Understanding



### 3.1 Users and goals


| User                                      | Goal                                                                                                         | Source                                            |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------- |
| "CRM user"                                | Create, assign and manage tasks and follow-ups, and plan and track work captured against the relevant record | I1 Description                                    |
| Assignee                                  | Is notified of reminders, and of priority and status changes                                                 | I1 AC14, AC18                                     |
| Team viewer (implied by "My Team's Task") | See the team's tasks                                                                                         | I1 AC1. *Who counts as "team" is not stated (Q4)* |


No persona entry exists in `[product-knowledge/personas/](../../product-knowledge/personas/)` (Q3).

### 3.2 Functional requirements


| Req | Statement                                                                                                                                                                                                                                                              | Source                                                |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------- |
| R1  | Workspace shows tabs **My Task** and **My Team's Task** that switch list scope                                                                                                                                                                                         | I1 AC1                                                |
| R2  | Workspace shows a **+ Add Task** action and a workspace-level **kebab**                                                                                                                                                                                                | I1 AC1                                                |
| R3  | Workspace shows a dismissible informational/automation **banner**                                                                                                                                                                                                      | I1 AC1                                                |
| R4  | **Insights** panel shows Total, Pending, In-progress, Overdue and Completed Task metrics reflecting current data, each with a help **tooltip**                                                                                                                         | I1 AC2                                                |
| R5  | Insights panel can be **locked**, **configured** (settings) and **collapsed/expanded**                                                                                                                                                                                 | I1 AC2                                                |
| R6  | Filter bar has **Activity Type** and **Status** filters plus an **add-filter** control                                                                                                                                                                                 | I1 AC3                                                |
| R7  | **Search** returns matching records; active filters combine with **AND**                                                                                                                                                                                               | I1 AC3                                                |
| R8  | **Clear All** resets filters                                                                                                                                                                                                                                           | I1 AC3                                                |
| R9  | Each task is a **card** showing a summary when collapsed and full detail when expanded                                                                                                                                                                                 | I1 AC4                                                |
| R10 | Card detail: activity type + title ("Follow-up: …" / "Task: …"), priority, tags; description with **Show more**; Assigned to; Scheduled on; Associations with an add control; Status dropdown; Reminder; Add follow up; attachments; comments; Created by / Created on | I1 AC4                                                |
| R11 | **+ Add Task** opens a popup with Task Name, Assign To, Date & Time, Priority, Reminder, Tags, Description (rich text: image, link, bold, italic, divider, list, attachment), Associations, Clear fields, minimize, expand, close, Cancel, Save                        | I1 AC5                                                |
| R12 | Save succeeds and adds the task to the list only when Task Name, Assign To and Description are complete                                                                                                                                                                | I1 AC6                                                |
| R13 | Save is blocked with **inline validation** when a mandatory field is missing or the date/time is invalid                                                                                                                                                               | I1 AC6                                                |
| R14 | Assign To shows a **searchable user list**; **one or more** users can be selected and appear as removable chips                                                                                                                                                        | I1 AC7                                                |
| R15 | Date & Time is captured (format example "12 Mar 2026 - 10:00 AM"); Priority is applied; Tags are selectable/removable chips; Reminder is a lead time ("1 hour before / 30 mins before")                                                                                | I1 AC8                                                |
| R16 | Description keeps rich-text formatting and image/file attachments on save, and supports **@mentions** of users                                                                                                                                                         | I1 AC9                                                |
| R17 | Associations: an **Objects selector** (e.g. Deals) with search links the task to records (and users), shown as chips and persisted on save                                                                                                                             | I1 AC10                                               |
| R18 | **Edit Task** opens pre-filled with current values; Save updates the card                                                                                                                                                                                              | I1 AC11                                               |
| R19 | Card kebab: **Edit**, **Duplicate**, **Mark as completed**, **Delete** (after confirmation)                                                                                                                                                                            | I1 AC12                                               |
| R20 | Status dropdown updates status from the configured set (e.g. Upcoming, In-progress, Completed, Overdue); the change shows on the card and in Insights and filters                                                                                                      | I1 AC13                                               |
| R21 | Reminder lead time is **editable from the card**; the assignee is notified when it's reached                                                                                                                                                                           | I1 AC14                                               |
| R22 | **Add follow up** opens an Add Follow-up popup (Date, Time, Description); **Add** attaches it to the task and persists it                                                                                                                                              | I1 AC15                                               |
| R23 | Comments: Add comment box + **Comment** action; "**No comments yet**" empty state; list with author and timestamp; sort **Most recent / Oldest**; comment count/badge on the card                                                                                      | I1 AC16                                               |
| R24 | Attachments are saved and accessible from the task card                                                                                                                                                                                                                | I1 AC17                                               |
| R25 | Workflow rules automate tasks, notify assignees on priority/status change, and escalate overdue tasks                                                                                                                                                                  | I1 AC18 (system behaviour; UI surface undefined, Q20) |
| R26 | Associated tasks appear in a contact/deal/lead's **activity history**; a task created from a record detail page is **pre-associated** to that record                                                                                                                   | I1 AC19 (P4)                                          |




### 3.3 Business rules relied on


| Rule | Statement                                                  | Source                                      |
| ---- | ---------------------------------------------------------- | ------------------------------------------- |
| BR1  | Task Name, Assign To and Description are mandatory to save | I1 AC5, AC6                                 |
| BR2  | A task may be assigned to one or more users                | I1 AC7                                      |
| BR3  | Filters combine with AND logic                             | I1 AC3                                      |
| BR4  | Delete requires confirmation                               | I1 AC12                                     |
| BR5  | Status values come from a configured set                   | I1 AC13 (*the set itself is not given*, Q6) |
| BR6  | Tasks module must be enabled for the tenant                | I1 Pre-conditions                           |


Rules the design needs but **no source states** are in §10: the status set and how
Overdue is determined (Q6, Q7), metric definitions (Q8), what makes a date/time
"invalid" (Q11), multi-assignee semantics (Q12), duplicate and delete semantics (Q17,
Q18), attachment limits (Q15).

### 3.4 Permissions


| Role                                                                           | Can                                           | Source            |
| ------------------------------------------------------------------------------ | --------------------------------------------- | ----------------- |
| User with "permission to create and manage tasks for the active entity/tenant" | Use the Tasks module, create and manage tasks | I1 Pre-conditions |


Everything else is **uncited** and therefore open (Q4, Q5): who sees My Team's Task;
who can edit, duplicate, complete or delete a task (creator, assignee(s), manager); who
can change status or reminder; who can comment or attach; who can configure or lock
Insights. The design will show the controls listed in I1 and hide/disable them via a
permission check whose rules come from the answers.

## 4. Library Search


| Searched                                                                                                         | Query / scope                                                                                                                          | Result                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Template registry `[templates/registry/template-registry.json](../../templates/registry/template-registry.json)` | All entries; categories LIST, DETAIL, FORM; capabilities filtering, tabs, insights, form validation                                    | `FYNXT-TPL-LIST-001` (List), `FYNXT-TPL-DETAIL-001` (Detail), `FYNXT-TPL-FORM-001` (Form): **all** `placeholder: true`**, v0.0.0 → non-existent for REUSE** (README §4.1). No other entries                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `experience-library/templates/*`                                                                                 | All directories                                                                                                                        | `FYNXT-TPL-LIST-002/`: Table List **implementation pilot, not registered, no** `template.md` (its README). Its spec (`[docs/golden-template-list-specification.md](../../docs/golden-template-list-specification.md)` rev 2, DRAFT) scopes it to **table rendering only**: "should not be configured, extended, or silently interpreted to cover" other renderings. Its zone model (Header › View tabs › Insights › Narrowing/Search › Collection) and `ListConfig` slots (`viewTabs`, `insights`, `quickFilters`, `advancedFilters`) match the Tasks shell, but the collection is cards, not rows. **Not reusable** (unregistered + rendering mismatch) |
| `experience-library/patterns/`, `experience-library/catalog/`                                                    | All                                                                                                                                    | README only. No patterns, no catalog entries                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `[docs/template-discovery.md](../../docs/template-discovery.md)`                                                 | Candidates                                                                                                                             | `CAND-001` Record List shell ("Strong Candidate (shell)", 2 occurrences: Leads table, Deals Kanban) → **Tasks would be occurrence 3 of the shell with a third renderer (expandable card list)**. `CAND-002` Record Detail (relevant to AC19 activity history). `CAND-003` Create/Edit Form in a Modal shell (1 occurrence: Add Lead) → Add Task is a possible 2nd occurrence. All "Under Review", none approved                                                                                                                                                                                                                                          |
| Station `packages/templates` (`@fynxt/templates@0.0.0`)                                                          | `src/index.ts`                                                                                                                         | `TEMPLATE_IDS = []`. **No templates**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| Station `packages/ui` (`@fynxt/ui@0.1.0`)                                                                        | All exports                                                                                                                            | `Button`, `Badge`, `Card`, `TextField`, `TextArea`, `Select`, `Tabs`, `Alert`, `Spinner`. Nothing else                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| Station gallery `apps/studio/gallery/menu.json`                                                                  | Modules                                                                                                                                | `"modules": []`. No menu entries yet                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| `design-system/components/`                                                                                      | `[fds-101-components.md](../../design-system/components/fds-101-components.md)` (DRAFT)                                                | Specs for the 8 implemented components; inventory lists FDS-101 components not yet in code (used in §6)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| FDS-101 (Figma `3c44QQCA8h7GTZYH2EWn8H`)                                                                         | Inventory as recorded in `fds-101-components.md` (2026-10-12). **Not re-read live**: the Figma MCP needs authorization in this session | Present in Figma, absent in code: Icon Button `106:1149`, Modal `388:2275`, Tooltip `66:39`, Accordion `76:27`, Avatar `73:12`, Search Field `52:59`, Table Search Field `432:22033`, Filter chip `432:22480`, Multi Select `56:85`, Search Multi-Select `57:87`, Chip/Selection `93:212`, Date Field `121:160`, Day Cell `120:113`, File Upload Inline `127:155`, Toast `66:37`. **Not found in the inventory:** overflow/kebab Menu, rich-text editor, time picker, metric/stat tile, empty state                                                                                                                                                      |
| `ux/decisions/`, `ux/patterns/`                                                                                  | All                                                                                                                                    | README only. **No approved UX decisions or patterns**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `history/`, `history/archive/`, `agent/context/`                                                                 | All; grep "task", "interaction", "follow-up", "activity"                                                                               | No prior Tasks/Interactions work. `agent/context/fdi-design-agent.md` lists open items carried into §10 (component library location, Figma work file, template-home conflict DL-0001 point 1, token approval)                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `product-knowledge/*`                                                                                            | PRDs, FRDs, business rules, personas, glossary                                                                                         | README only. **Nothing for Tasks**                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `design-system/tokens/`                                                                                          | `tokens.json` v0.2.0 **DRAFT**                                                                                                         | 190 tokens; designer decisions D1–D12 open (incl. D11 no breakpoint tokens, D12 hover states broken in Dark)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |




## 5. Page Plan


| Page                                                                               | Class                                | Template (id@version)                                                  | Rationale                                                                                                                                                                                                                                                      | Menu location                                                 |
| ---------------------------------------------------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| P1 Tasks workspace                                                                 | **NEW-TEMPLATE** (candidate, DRAFT)  | — (proposed: card-list renderer under the `CAND-001` collection shell) | No registered template; LIST-002 is unregistered and table-only by spec. The header › tabs › insights › filter › collection shell now recurs a 3rd time (Leads, Deals, Tasks), so it plausibly recurs again. **Reviewer choice:** NEW-TEMPLATE vs ONE-OFF (Q2) | CRM › Interactions › Tasks *(proposed, Q22)*                  |
| P2 Add / Edit Task popup                                                           | **ONE-OFF** (flagged)                | —                                                                      | `FYNXT-TPL-FORM-001` is a placeholder; `CAND-003` is unapproved. Compose-style popup (minimize/expand) differs from Add Lead's multi-section modal. **Flag:** 2nd modal create/edit form after Add Lead, so it triggers `CAND-003` template discovery          | Opened from P1 (+ Add Task, card kebab › Edit); no menu entry |
| P3 Add Follow-up popup                                                             | **ONE-OFF**                          | —                                                                      | Small 3-field dialog; no template needed                                                                                                                                                                                                                       | Opened from a P1 card; no menu entry                          |
| P4 Record-detail integration (activity history entry, "create task" from a record) | **OUT OF SCOPE in rev 1** (proposed) | — (`FYNXT-TPL-DETAIL-001` placeholder; `CAND-002` unapproved)          | Contact/Deal/Lead detail pages don't exist in the library or Station. P1 card and P2 must support a **pre-associated** record so P4 can plug in later                                                                                                          | — (Q21)                                                       |


The delete confirmation (R19) is a dialog state of P1, not a page.

### 5.1 P1 — Tasks workspace

- **Template configuration (proposed candidate surface, mirrors** `ListConfig` **slots where they apply):**
  - `entity: "Task"`
  - `viewTabs`: `[{key:"mine",label:"My Task"},{key:"team",label:"My Team's Task"}]` (R1). Label text is verbatim from I1
  - `primaryAction`: "+ Add Task" → P2 (R2); `headerMenu`: workspace kebab, **items unknown** (Q9)
  - `banner`: dismissible, **copy unknown** (Q10)
  - `insights`: metrics `total`, `pending`, `inProgress`, `overdue`, `completed` with tooltip text (Q8), plus `lockable`, `configurable`, `collapsible` (R4, R5, Q13)
  - `search`: enabled (R7). `filters`: `activityType`, `status`, plus add-filter (R6; extra filter list Q14). Combine = AND (BR3). Clear All (R8)
  - `collection.renderer: "expandable-card"`; `card.summary` / `card.detail` field lists per R10. Default expansion (Q19); order / paging (Q16)
  - `cardActions` (kebab): Edit, Duplicate, Mark as completed, Delete (confirm) (R19), each gated by `permissionCheck` (Q5)
  - `dataAdapter`: required, contract unknown (Q24)
- **Regions:** Header (title "Tasks", + Add Task, kebab) › Banner › View tabs › Insights › Filter bar (search, Activity Type, Status, add-filter, Clear All) › Task card list.
*Note:* I1 lists the banner in AC1 without placing it. The order above (banner under the header) is a **proposal** and needs a designer decision. It is not in the LIST-002 zone model.
- **Task card:**
  - Collapsed summary: activity type + title, priority Badge, tags, scheduled on, assignee(s), status. *Summary field set is a proposal* (Q19).
  - Expanded detail: everything in R10. Inline controls: Status Select (R20), Reminder (R21), Associations add (R17), Add follow up → P3 (R22), Attachments (R24), Comments (R23).
- **Interactions:** no UX decisions exist (ux/decisions empty). Proposed and awaiting designer approval:
  - The expand/collapse disclosure is a button with `aria-expanded`.
  - "Show more" toggles the description clamp.
  - Status change is optimistic, with revert on error.
  - Delete opens a confirm dialog with focus on Cancel.
- **States:**
  - **default:** populated cards.
  - **loading:** Spinner in the collection region; Insights placeholders.
  - **empty (no tasks in scope):** title, description and a + Add Task CTA. *Copy unknown* (Q23).
  - **empty (no filter match):** offers Clear All. *Copy unknown.*
  - **error:** Alert error with Retry. *Copy unknown.*
  - **comments empty:** "No comments yet" (I1 AC16).
  - **partial error:** for example, a status update fails on a single card.
  - **read-only / no-permission:** controls hidden or disabled per Q5.
  - **module disabled for tenant:** BR6. *Content unknown.*
- **Responsive:** no breakpoint tokens exist (D11), and Studio uses 800/1100px marked OBSERVED. Proposed layout:
  - Desktop: Insights as a metric row.
  - Narrower: Insights wraps to 2 columns, the filter bar collapses into a Filters button, and the card detail stacks.
  - Needs designer confirmation and real breakpoints.
- **Accessibility:**
  - `main` landmark; tabs use the `tablist` pattern (existing `Tabs`).
  - The card list is a `ul`; each card is an `article` with a heading.
  - The kebab is a menu button: arrow keys move through items, Esc closes.
  - Metric tooltips are reachable by keyboard focus.
  - The banner dismiss button has an accessible name.
  - Filter result count is announced through a live region.
- **Data needed:**
  - Task: id, activityType, title, description (rich), priority, tags[], scheduledAt, reminderLeadTime, status, assignees[], associations[], followUps[], attachments[], comments[] / commentCount, createdBy, createdAt.
  - Insights counts.
  - Filter option lists.
  - API contract unknown → Q24.



#### 5.1.1 Re-sync from approved Figma (version `2409447955195877898`, 2026-10-12)

Designer edits read back from the P1 page bodies (`18:2374`, `18:2899`, `18:3252`, `18:3618`, `18:3984`). These supersede §5.1 where they differ:

- **E1 Header:** view tabs (My Task / My Team's Task) sit on the left of the header row. **Add Task**, a **lightbulb** icon button and the workspace **kebab** are on the right. The page title is shown by the App Shell header (D2/D4), not the body. The lightbulb's action is not defined in I1 (Q40).
- **E2 Insights:** compact metric tiles (label + value); the per-metric caption is removed. The help tooltip per metric (AC2) is still required (Q34).
- **E3 Filter bar:** the frames show **Status / Priority / Owner** chips and a Table Search Field. **Approved with exception (Aman Bansal, 2026-10-12): build per I1 AC3** = **Activity Type** + **Status** filters + add-filter + search + Clear all. Priority/Owner are not built (C11).
- **E4** Banner, task cards (D1 comment icon + badge), states and P2/P3 popups are unchanged.

### 5.2 P2 — Add / Edit Task popup (ONE-OFF)

- **Fields (I1 AC5, AC8):** Task Name (TextField); Assign To (Search Multi-Select + chips, R14); Date & Time (Date Field + time, R15); Priority (Select); Reminder (Select of lead times); Tags (chips, selectable/removable); Description (rich text with @mentions and attachments, R16); Associations (object selector + record search + chips, R17).
- **Chrome:** title "Add Task" / "Edit Task", minimize, expand, close; footer: Clear fields, Cancel, Save (R11).
- **Validation:** on Save, show inline errors on missing mandatory fields and invalid date/time (R13); focus moves to the first invalid field. Error copy unknown (Q23).
- **Edit mode:** pre-filled from the task; Save updates the card (R18).
- **Pre-association:** accepts an initial association so P4 can open it from a record (R26).
- **States:**
  - **idle**
  - **validating / inline error**
  - **saving:** Save button loading, fields disabled.
  - **save error:** Alert in the popup, values kept.
  - **minimized**
  - **expanded (full-size)**
  - Unsaved-changes behaviour on close, Cancel or Clear fields is unknown (Q25).
- **Accessibility:**
  - `role="dialog"`, `aria-modal`, labelled by the title. Focus is trapped and restored to the trigger.
  - Esc behaviour depends on Q25.
  - Required fields are marked with text, not only the `*`.
  - The chips' remove buttons are named "Remove John".
- **Responsive:** full-screen sheet on narrow widths (proposal).



### 5.3 P3 — Add Follow-up popup (ONE-OFF)

- **Fields:** Date, Time, Description. Mandatory status is unknown (Q12b). Actions: Cancel, **Add** (R22).
- **States:** idle · inline error · saving · error.
- **Accessibility:** same dialog rules as P2.



## 6. Component Plan


| Component                         | Class         | Library ref                                                                                                                   | Change                                                                                                                                        | Version impact | Used by                                                                |
| --------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------- |
| Button                            | EXISTING      | `@fynxt/ui/Button@0.1.0`                                                                                                      | —                                                                                                                                             | none           | P1, P2, P3                                                             |
| Tabs (primary)                    | EXISTING      | `@fynxt/ui/Tabs@0.1.0`                                                                                                        | — (D12 hover defect inherited)                                                                                                                | none           | P1                                                                     |
| Alert                             | EXISTING      | `@fynxt/ui/Alert@0.1.0`                                                                                                       | Dismiss rendered via the existing `action` slot with an Icon Button. *If the designer wants a built-in dismiss, it becomes a VARIANT (MINOR)* | none           | P1 banner, error states                                                |
| Card                              | EXISTING      | `@fynxt/ui/Card@0.1.0` (`as="article"`)                                                                                       | —                                                                                                                                             | none           | P1 task card, metric tile container                                    |
| Badge                             | EXISTING      | `@fynxt/ui/Badge@0.1.0`                                                                                                       | —                                                                                                                                             | none           | P1 priority, status, comment count                                     |
| TextField                         | EXISTING      | `@fynxt/ui/TextField@0.1.0`                                                                                                   | —                                                                                                                                             | none           | P2 Task Name                                                           |
| TextArea                          | EXISTING      | `@fynxt/ui/TextArea@0.1.0`                                                                                                    | —                                                                                                                                             | none           | P1 comment box, P3 Description (if plain text, Q12b)                   |
| Select                            | EXISTING      | `@fynxt/ui/Select@0.1.0`                                                                                                      | —                                                                                                                                             | none           | Status, Priority, Reminder, comment sort                               |
| Spinner                           | EXISTING      | `@fynxt/ui/Spinner@0.1.0`                                                                                                     | — (no Code Connect yet)                                                                                                                       | none           | Loading states                                                         |
| Icon Button                       | NEW-COMPONENT | FDS-101 `106:1149`                                                                                                            | Implement per FDS-101                                                                                                                         | new 0.1.0      | Kebabs, close/minimize/expand, collapse, lock, settings, help          |
| Modal                             | NEW-COMPONENT | FDS-101 `388:2275`                                                                                                            | Implement; minimize/expand not known to exist in FDS-101 (Q25)                                                                                | new 0.1.0      | P2, P3, delete confirm                                                 |
| Tooltip                           | NEW-COMPONENT | FDS-101 `66:39`                                                                                                               | Implement                                                                                                                                     | new 0.1.0      | Insights help                                                          |
| Accordion / Disclosure            | NEW-COMPONENT | FDS-101 `76:27`                                                                                                               | Implement                                                                                                                                     | new 0.1.0      | Card expand, Insights collapse                                         |
| Avatar                            | NEW-COMPONENT | FDS-101 `73:12`                                                                                                               | Implement                                                                                                                                     | new 0.1.0      | Assignee, comment author, created by                                   |
| Search Field                      | NEW-COMPONENT | FDS-101 `52:59` **or** Table Search Field `432:22033` (designer to pick one, Q26)                                             | Implement                                                                                                                                     | new 0.1.0      | P1 search                                                              |
| Filter chip                       | NEW-COMPONENT | FDS-101 `432:22480`                                                                                                           | Implement                                                                                                                                     | new 0.1.0      | P1 filter bar                                                          |
| Search Multi-Select               | NEW-COMPONENT | FDS-101 `57:87`                                                                                                               | Implement (with Chip)                                                                                                                         | new 0.1.0      | P2 Assign To, Associations record picker; filters if multi-value (Q14) |
| Chip / Selection                  | NEW-COMPONENT | FDS-101 `93:212` (+ overflow `255:2489`)                                                                                      | Implement                                                                                                                                     | new 0.1.0      | Tags, assignees, associations                                          |
| Date Field                        | NEW-COMPONENT | FDS-101 `121:160` + Day Cell `120:113`                                                                                        | Implement; **time input has no FDS-101 component** (Q27)                                                                                      | new 0.1.0      | P2 Date & Time, P3 Date/Time                                           |
| File Upload Inline                | NEW-COMPONENT | FDS-101 `127:155`                                                                                                             | Implement                                                                                                                                     | new 0.1.0      | Attachments (P1, P2)                                                   |
| Menu (overflow)                   | NEW-COMPONENT | **No FDS-101 source**                                                                                                         | Needs a Figma component first; LIST-002's `RowActionsPattern` is pilot code, not a library component                                          | new 0.1.0      | P1 card + workspace kebab                                              |
| Rich Text Editor (with @mentions) | NEW-COMPONENT | **No FDS-101 source**                                                                                                         | Needs Figma design + **dependency decision** (Q28)                                                                                            | new 0.1.0      | P2 Description                                                         |
| Metric Tile                       | NEW-COMPONENT | **No FDS-101 source** (a "metric card" was observed in the Leads Figma per `CAND-001`, but it isn't in the FDS-101 inventory) | Needs Figma component; Metrics pattern is unspecified (LIST-002 spec §28)                                                                     | new 0.1.0      | P1 Insights                                                            |
| Empty State                       | NEW-COMPONENT | **No FDS-101 source**                                                                                                         | Needs Figma component (or designer rules it template-owned, Q23)                                                                              | new 0.1.0      | P1 empty, comments empty                                               |


Not used: Toast. I1 asks for no success toast, so none is designed in (see Q23).

### 6.x NEW-COMPONENT specs (summary)

Every NEW-COMPONENT below needs **Figma (FDS-101) · Code Connect: required · tests**. Each
is built in `packages/ui` before any page (README §4.2).


| Component           | Gap                  | Props / variants / states                                                           | Tokens consumed                                                 | Accessibility                                    |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------- | --------------------------------------------------------------- | ------------------------------------------------ |
| Icon Button         | Not in `@fynxt/ui`   | variant Primary/Secondary/Ghost/Outline/Destructive × SM/MD/LG × 6 states (FDS-101) | `brand/*`, `border/focus`, `radius/default`, `opacity/disabled` | `aria-label` required                            |
| Modal               | Not in `@fynxt/ui`   | size, title, footer; optional minimize/expand (Q25)                                 | `surface/popover`, `shadow/lg`, `radius/*`                      | dialog role, focus trap and restore              |
| Tooltip             | Not in `@fynxt/ui`   | placement                                                                           | `surface/popover`, `text/foreground`, `shadow/md`               | shows on focus and hover; `aria-describedby`     |
| Accordion           | Not in `@fynxt/ui`   | single / multiple, controlled                                                       | `border/default`, spacing                                       | button + `aria-expanded` / `aria-controls`       |
| Avatar              | Not in `@fynxt/ui`   | image / initials, sizes                                                             | `radius/full`, `brand/*`                                        | alt text / name                                  |
| Search Field        | Not in `@fynxt/ui`   | clear button, debounce                                                              | Input tokens                                                    | `role="searchbox"`, label                        |
| Filter chip         | Not in `@fynxt/ui`   | active / inactive, with count                                                       | `surface/selected`, `border/*`                                  | button + popover, `aria-haspopup`                |
| Search Multi-Select | Not in `@fynxt/ui`   | async options, chips                                                                | Input + Chip tokens                                             | combobox pattern, `aria-multiselectable`         |
| Chip                | Not in `@fynxt/ui`   | removable, selectable                                                               | `surface/selected`, `radius/*`                                  | remove button named "Remove {label}"             |
| Date Field          | Not in `@fynxt/ui`   | date; time part TBD (Q27)                                                           | Input tokens                                                    | grid date picker, typed entry                    |
| File Upload Inline  | Not in `@fynxt/ui`   | list, progress, error                                                               | `border/*`, `status/*`                                          | file input labelled, progress announced          |
| Menu                | No FDS-101 component | items, destructive item, disabled                                                   | `surface/popover`, `shadow/md`                                  | menu button pattern                              |
| Rich Text Editor    | No FDS-101 component | toolbar: bold, italic, list, link, divider, image, attachment; @mention popover     | Input tokens                                                    | toolbar role, labelled controls, mention listbox |
| Metric Tile         | No FDS-101 component | label, value, help tooltip, loading                                                 | Card tokens, `typography/heading-*`                             | value + label read together                      |
| Empty State         | No FDS-101 component | title, description, action                                                          | `text/muted*`                                                   | heading level from host                          |




### 6.y Reconciled component plan for Stage 3 (after C7, C8, D1–D4; supersedes the §6 table for the build)

| Component (code, `@fynxt/ui`) | Class (code) | FDS-101 / work-file source | Used by |
|---|---|---|---|
| Button, Badge, Card, TextField, TextArea, Select, Tabs, Alert, Spinner | EXISTING (0.1.0) | FDS-101 | all |
| IconButton | NEW-COMPONENT | `106:1149` | P1, P2, shell |
| Tooltip | NEW-COMPONENT | `66:39` | P1 Insights help (AC2) |
| Avatar | NEW-COMPONENT | `73:12` | comments, shell |
| SearchField | NEW-COMPONENT | Table Search Field `432:22033` | P1 |
| FilterChip | NEW-COMPONENT | `432:22480` | P1 |
| Chip | NEW-COMPONENT | Chip / Selection `93:212` | tags, assignees |
| MultiSelect (searchable, chips) | NEW-COMPONENT | Search Multi-Select `57:87` / Multi Select `56:85` | P2 Assign To, Tags |
| DateTimeField | NEW-COMPONENT | Date Field `121:160` (+ time: native time input, Q27) | P2, P3 |
| Menu (+ MenuItem) | NEW-COMPONENT | Dropdown Menu `345:67`, Menu Item `344:15` | P1 kebabs, status |
| Modal / FormModal / ConfirmDialog | NEW-COMPONENT | Modal `388:2275`, Form Modal `358:352` | P1 delete, P2, P3 |
| EmptyState | NEW-COMPONENT | `343:83` | P1 states, comments |
| StatCard | NEW-COMPONENT | `359:54` | P1 Insights |
| EntityChip | NEW-COMPONENT | `361:2` | card, P2 associations |
| ActivityCard | NEW-COMPONENT | `361:134` (+ comment count, D1/Q32) | P1 |
| TopNav, SideNav, AppShell | NEW-COMPONENT (candidates, D4) | Top Nav `141:117` + work file `21:3687`, `22:3867` | P1 |
| Rich Text Editor | **DEFERRED** (Q28, decided 2026-10-12): Description uses TextArea | work file `9:573` | P2 |

## 7. Template Changes (EXTEND / NEW-TEMPLATE only)

**P1 → NEW-TEMPLATE candidate (proposal, not created).**

- **What it is:** a collection workspace shell with an **expandable card-list renderer**. It is recorded as the 3rd occurrence of the `CAND-001` outer shell (Leads = table, Deals = Kanban, Tasks = card list).
- **What it is not:** an extension of `FYNXT-TPL-LIST-002`. That template's spec forbids non-table rendering, and it is unregistered.
- **Proposed config surface:** §5.1. It shares slot names with `ListConfig` (`viewTabs`, `insights`, `search`, filter slots, `permissionCheck`, `dataAdapter`, `states`) so the two can later converge on one shell.
- **Two structural options for the designer (Q2):**
  - **(a)** A separate DRAFT candidate template (e.g. a future `FYNXT-TPL-LIST-003` / "Card List"). The ID is assigned only on approval, per `[template-naming-convention.md](../../docs/template-naming-convention.md)`.
  - **(b)** First extract the `CAND-001` shell as a shared template with pluggable renderers (table / board / card list). That would also change LIST-002's design and needs its own discovery.
  - Either way it stays **DRAFT** and is never auto-promoted (CLAUDE.md §16).
- **Breaking change / consumers:** none (new). `/fdi-impact` is not needed because no shared template is modified.
- **Template home:** unresolved (DL-0001 point 1, see C5).



### 7.1 As built (Stage 3, 2026-10-12)

- **Template:** `@fynxt/templates` 0.1.0 → DRAFT candidate `CAND-DCF-0001-activity-workspace` (`ActivityWorkspace`), option (a) of §7 by default because Q2 is still open. Config surface: `views`, `banner`, `insights.metrics`, `search`, `filters` (+ `additionalFilters`), `statuses`, `completedStatus`, `reminders`, `priorities` (label + Badge status), `labels`, `states` copy, `recordForm` / `followUpForm` schemas, `shell` (candidate App Shell), `formatDateTime`, **required** `permissionCheck` and `dataAdapter`. No FYNXT-TPL id until `/fdi-publish` registers the DRAFT.
- **C12 proposal applied:** P2 (Add/Edit Task) and P3 (Add Follow-up) are rendered by the template from form schemas, so the gallery page stays configuration-only. Needs designer/governance confirmation at code review.
- **Impact (`/fdi-impact`):** no VARIANT or breaking change to an existing component or template. All `@fynxt/ui` additions are new components (MINOR 0.1.0 → 0.2.0). No existing consumers affected (the gallery had no pages; `@fynxt/templates` had no templates).

## 8. Tokens

All values come from `design-system/tokens/tokens.json` **v0.2.0 DRAFT** through
`@fynxt/tokens` CSS variables:

- **Surfaces:** `surface/background`, `surface/card`, `surface/popover`, `surface/selected`, `surface/input`
- **Borders:** `border/default`, `border/light`, `border/strong`, `border/focus`
- **Text:** `text/foreground`, `text/muted`, `text/muted-foreground`, `text/label`, `text/on-primary`
- **Brand:** `brand/primary`
- **Status and feedback:** `status/`* (success, warning, error, info, destructive), `feedback/*-bg`
- **Shape and elevation:** `radius/`*, `shadow/sm|md|lg`
- **Spacing:** `spacing/`*
- **Typography:** `heading-`*, `body-*`, `label-*`
- **Motion:** `duration/`*, `easing/standard` (expand/collapse)

**OBSERVED, no token:**

- Breakpoints (D11)
- Priority and status colour mapping (which Badge status each priority/status uses is a designer decision, Q6/Q29)
- Hover/pressed colours in Dark mode (D12)

These are raised in §10, not hardcoded.

## 9. Conflicts


| #   | Source A says                                                                           | Source B says                                                                                         | Resolved by hierarchy?                                  | Status                  |
| --- | --------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ------------------------------------------------------- | ----------------------- |
| C1  | I1 AC2: metric "**Pending** Task"                                                       | I1 AC13: status set "e.g., **Upcoming**, In-progress, Completed, Overdue" (no "Pending")              | No (same source)                                        | **Open** → Q6           |
| C2  | I1 AC13: **Overdue** is a status the user can select in the Status dropdown             | I1 AC18: system "**escalates overdue** tasks automatically" (implies overdue is system-derived)       | No (same source)                                        | **Open** → Q7           |
| C3  | I1 AC4: activity-type title "**Follow-up:** …" suggests a follow-up is a *kind of task* | I1 AC15: a follow-up is *attached to* a task (child object with Date, Time, Description)              | No (same source)                                        | **Open** → Q12          |
| C4  | I1 AC10: associations link "records (**and users**)"                                    | I1 AC7: users are linked via **Assign To**; AC9: users are referenced via **@mentions**               | No (same source)                                        | **Open** → Q11          |
| C5  | DL-0001 point 1 / `fdi.config.json`: templates live in Station `packages/templates`     | CLAUDE.md §12 and `docs/template-specification.md`: templates live in `experience-library/templates/` | Pre-existing governance conflict; not resolvable by FDI | **Open** (carried, Q30) |
| C6  | I1 Jira status **"Idea"**, Resolution Unresolved                                        | README §2 treats a named human's ticket as binding                                                    | No: an "Idea" may not be an agreed requirement          | **Open** → Q1           |
| C7  | Approved §6: Menu, Metric Tile and Empty State are NEW-COMPONENT with "no FDS-101 source"; §4 FDS-101 search used only `fds-101-components.md` | FDS-101 page **12 · GUNA Components** (`398:2`, found at Stage 2) already has **Dropdown Menu** `345:67` + **Menu Item** `344:15`, **Stat Card** `359:54`, **Empty State** `343:83`, **Form Modal** `358:352` (minimize/maximize/close, 400/560/720), **Table Toolbar** `357:95`, **Entity Chip** `361:2`, **Priority Flag** `363:15`, **Activity Type Marker** `361:31` | Yes: reuse-first (README §4.2, CLAUDE.md §9) | **Decided 2026-10-12 by Aman Bansal (Product Designer), in chat at `/fdi-figma`:** reuse the FDS-101 GUNA components in Figma. Only **Rich Text Editor** is created new. §4/§6 to be corrected on next `/fdi-revise`; code-side (`@fynxt/ui`) classes unchanged until then |
| C8  | §5.1 / §6: task card composed from Card + Accordion + atoms | FDS-101 **Activity Card** `361:134` (Density Expanded/Compact) covers most of AC4, but its description says "Previous version". It has no Tags (one label only), Reminder, Attachments, comment count or Created on | No | **Decided 2026-10-12 by Aman Bansal (Product Designer):** use Activity Card instances. Missing AC4 fields are listed as design gaps (Q32), not added to the component. What "Previous version" means is open (Q33) |
| C9  | D4 (Aman Bansal, Product Designer): create new App Shell and Side Nav components | FDS-101 already has **App Shell** `407:456` (Nav Rail + optional panel), **Side Navigation** `360:106`, **Nav Rail** `360:13`. Its structure (separate rail + panel) differs from the live product's single collapsible side nav (I2/I3) | Designer decision (D4) | **Decided:** built as DCF-0001 candidates in the work file. Before promotion, governance must choose one: replace FDS-101 App Shell/Side Navigation, or make these its VARIANTs (CLAUDE.md §8, §16) |
| C10 | I1 (M2-9): metric "Pending Task", status "Upcoming"; card shows Status, Reminder, Add follow up, attachments, comments, Created on; parent epic "Interactions" | I2/I3 (live UAT, rank 5): metric "**Not Started**"; card has Status **dropdown**, **Reminder dropdown**, **Add Follow-up**, attachment + comment icons, **Created on**, Due date, priority **flag**, timeline markers; Tasks sits under **Tickets & Activities**; no automation banner; header has a lightbulb button | Partly: I1 (rank 2) outranks I2/I3 (rank 5) for behaviour | **Open.** Only the menu (D3) was taken from I2/I3, as instructed. The other differences are evidence for Q6, Q32, Q39 and are not designed in until the designer says so |
| C11 | Approved Figma frames (E3): filter chips Status / Priority / Owner | I1 AC3 (rank 2): Activity Type filter + Status filter + add-filter | Yes: I1 outranks a visual | **Resolved by Aman Bansal (Product Designer), 2026-10-12:** build per AC3. Frames to be updated by the designer; Priority/Owner need a PM decision before they appear |
| C12 | §5: P2/P3 are ONE-OFF pages | Station contract invariant 3: gallery pages are configuration only (no JSX layout) | No (contract vs case) | **Open, FDI proposal:** P2/P3 are rendered by the P1 candidate template from a form schema (task form, follow-up form) so the page stays config-only. Needs designer/governance confirmation at code review |
| C13 | Signed-off Figma (`2409447955195877898`): task card shows Status as a Badge, no Reminder row, no "Created on"; Insights tiles have no help icons | I1 AC13 (status dropdown on card), AC14 (reminder editable from card), AC4 (Created on), AC2 (help tooltips) | No (rank 2 vs approved design) | **Decided by Aman Bansal (Product Designer), 2026-10-13:** match the sign-off; the Status badge opens the status menu (AC13 kept, invisible). Reminder-on-card, Created on and metric help are **not built**: open for the PM to confirm, or for the designer to add to Figma |
| C14 | Existing `@fynxt/ui` Alert drew a 1px border on all sides; Tabs drew a tablist divider | FDS-101 Alert 65:45 = 3px left accent only; Primary Tab has no list divider (and the signed-off frame shows neither) | Yes: FDS-101 is the component source | **Fixed (PATCH)** in `d148446`. Impact: Alert in 7 Studio screens, Tabs in 2 (visual only) |
| C15 | DCF-0002 D7 (Aman Bansal, 2026-10-13): Settings item added to the candidate Side Nav **collapsed** rail | DCF-0001 frame `22:5789` (Default, nav collapsed) now shows a Settings gear; Station `SideNav` code has no Settings item | n/a | **Open:** visual-only change to a DCF-0001 candidate; align code + expanded nav when C6 / Q31 in DCF-0002 is decided. **Update (DCF-0002 D8, 2026-10-13):** Side Nav `21:3687` now has a `Mode` axis (Main / Settings), and both Main variants gained a bottom area (Settings item · divider · user tag). Every DCF-0001 frame using the App Shell candidate `22:3867` now shows that bottom area, expanded and collapsed. This differs from approved version 2409447955195877898 and from Station `SideNav` (no Settings item, no user tag). Needs a designer call: accept into DCF-0001 (code change) or keep DCF-0001 on the pre-D8 nav |




## 10. Open Questions / Missing Information


| #   | Question                                                                                                                                                                                                                         | Blocks                             | Owner                               | Answer                                                                                                                  |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- | ----------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Q1  | Is M2-9 (Jira status "Idea") approved as the requirement to design against, or should a PRD/FRD come first? (C6)                                                                                                                 | Approval of whole case             | Product Manager / Pooja Bharghavi G |                                                                                                                         |
| Q2  | P1: NEW-TEMPLATE candidate (option a or b in §7) or ONE-OFF?                                                                                                                                                                     | §5, §7                             | Product Designer                    |                                                                                                                         |
| Q3  | Persona for "CRM user": which roles use Tasks? (no persona file exists)                                                                                                                                                          | §3.1                               | Product Manager                     |                                                                                                                         |
| Q4  | What defines "My Team"? (reporting line, team entity, role) Who may see My Team's Task? Does "My Task" mean assigned to me, created by me, or both?                                                                              | P1 tabs, data                      | Product Manager / BA                |                                                                                                                         |
| Q5  | Permission model: who can edit, duplicate, complete, delete, change status/reminder, comment, attach, add associations, configure/lock Insights? (Only "create and manage tasks" is stated)                                      | P1 actions, P2                     | Product Manager / BA                |                                                                                                                         |
| Q6  | Exact status set and labels: is it "Pending" or "Upcoming"? Who configures the "configured set"? (C1) Which colour/Badge status does each use?                                                                                   | Insights, filters, Status dropdown | Product Manager + Product Designer  |                                                                                                                         |
| Q7  | Is Overdue user-selectable or derived (e.g. scheduled time passed and not completed)? What does escalation look like in the UI? (C2)                                                                                             | Status dropdown, Insights          | Product Manager / BA                |                                                                                                                         |
| Q8  | Metric definitions: does Total include Completed? Do metrics follow the active tab and filters? Time window? Tooltip copy for each metric                                                                                        | P1 Insights                        | Product Manager                     |                                                                                                                         |
| Q9  | Workspace kebab (AC1): which actions?                                                                                                                                                                                            | P1 header                          | Product Manager                     |                                                                                                                         |
| Q10 | Banner (AC1): copy, when it's shown, and whether dismissal persists (session / per user / permanent)                                                                                                                             | P1 banner                          | Product Manager                     |                                                                                                                         |
| Q11 | Associations: which objects are associable (Deals given; Contacts/Leads per AC19; others?)? Limit per task? What does a *user* association mean vs Assign To and @mention? (C4)                                                  | P2, P1 card                        | Product Manager / BA                |                                                                                                                         |
| Q12 | Follow-up model (C3): is a follow-up a task type or a child of a task? Does it have its own status, assignee or reminder? How is it shown on the card? Q12b: which follow-up fields are mandatory, and is Description rich text? | P1 card, P3                        | Product Manager / BA                |                                                                                                                         |
| Q13 | Insights "lock" and "settings": what do they do (pin position? choose metrics?), and are they persisted per user?                                                                                                                | P1 Insights                        | Product Manager + Product Designer  |                                                                                                                         |
| Q14 | Filters: are Activity Type and Status single- or multi-select? Which filters can "add-filter" add? Activity Type values (Task, Follow-up, others in the Interactions epic?)                                                      | P1 filter bar                      | Product Manager                     |                                                                                                                         |
| Q15 | Attachments: allowed types, size and count limits, preview/download behaviour; are images in Description subject to the same limits?                                                                                             | P1, P2                             | Product Manager / Dev               |                                                                                                                         |
| Q16 | List order (default sort) and paging (pagination / infinite scroll / none)? Not stated in I1                                                                                                                                     | P1                                 | Product Manager + Product Designer  |                                                                                                                         |
| Q17 | Duplicate: which fields are copied (comments, attachments, follow-ups, associations)? Title suffix? Opens in edit or saves directly?                                                                                             | P1 kebab                           | Product Manager                     |                                                                                                                         |
| Q18 | Delete: soft or hard? Confirmation copy. Is undo available?                                                                                                                                                                      | P1 kebab                           | Product Manager                     |                                                                                                                         |
| Q19 | Card summary: which fields show when collapsed? Default expanded or collapsed? Can multiple cards be expanded at once?                                                                                                           | P1 card                            | Product Designer                    |                                                                                                                         |
| Q20 | AC18 automation/notification: is there any UI in Tasks (e.g. "automated" badge, escalation indicator, link to notification settings)? Where are "notification settings" (AC14)?                                                  | P1                                 | Product Manager                     |                                                                                                                         |
| Q21 | AC19: is the record-detail integration (activity history, create-from-record) in this case or a separate one? Contact/Deal/Lead detail pages don't exist in the library                                                          | P4                                 | Product Manager + Product Designer  |                                                                                                                         |
| Q22 | Menu location: confirm "CRM › Interactions › Tasks"                                                                                                                                                                              | P1 menu                            | Product Manager                     |                                                                                                                         |
| Q23 | All state copy: list empty, no-filter-match, error, validation messages, module-disabled. Success feedback after save (toast or none)?                                                                                           | All states                         | Product Designer / Content          |                                                                                                                         |
| Q24 | API / data contracts for tasks, insights counts, users, associable records, comments, attachments                                                                                                                                | Stage 3                            | Developer / BA                      |                                                                                                                         |
| Q25 | Popup minimize/expand: what can the user do while it's minimized? Multiple open drafts? Confirm on Clear fields, Cancel or close with unsaved changes? Is a minimizable modal in FDS-101?                                        | P2, Modal                          | Product Designer                    |                                                                                                                         |
| Q26 | Search field: FDS-101 Search Field `52:59` or Table Search Field `432:22033`?                                                                                                                                                    | Component plan                     | Product Designer                    |                                                                                                                         |
| Q27 | Date & Time: is it mandatory? What makes it "invalid" (past date? format?)? Timezone shown? There is no FDS-101 time-picker component                                                                                            | P2, Date Field                     | Product Manager + Product Designer  |                                                                                                                         |
| Q28 | Rich-text editor: which library may be used (new dependency → developer approval, CLAUDE.md §20)? How are mentions stored and notified?                                                                                          | P2, Stage 3                        | Developer + Product Designer        |                                                                                                                         |
| Q29 | Priority values and their visual treatment (only "Medium" is given); Reminder options (only "1 hour before / 30 mins before" are given); Tags: fixed list or user-created?                                                       | P2, P1                             | Product Manager                     |                                                                                                                         |
| Q30 | Carried: template home (C5), existing component library location (`fdi.config.json`), Figma `workFileKey` is null (blocks `/fdi-figma`), token set v0.2.0 still DRAFT, D11 breakpoints, D12 Dark hover defect                    | Stage 2–3                          | Product Designer / Governance       | Partial (2026-10-12, Aman Bansal): `workFileKey` set to `0CwREH91xlsQOFpAUp852B` ("FDI - Test"). Other items still open |
| Q31 | Original icons for add-filter, add-association and Associations render as broken images in I1. Is there a wireframe or Figma frame for M2-9?                                                                                     | Visual intent                      | Pooja Bharghavi G                   |                                                                                                                         |
| Q32 | Activity Card lacks AC4 fields: multiple Tags, Reminder, Attachments, comment count/badge, Created on. Extend Activity Card (VARIANT) or compose them inside the card? | P1 card | Product Designer | |
| Q33 | FDS-101 Activity Card description says "Previous version". Is there a current version, or is it deprecated? | P1 card | Product Designer | |
| Q34 | FDS-101 Stat Card has no help-tooltip affordance (AC2) and Alert has no dismiss (AC1). Add as VARIANTs? | P1 Insights, banner | Product Designer | Partly answered 2026-10-12 (FDI, Stage 2): FDS-101 Alert already has its own close (×) → used as the banner dismiss. Stat Card help tooltip still open |
| Q35 | The FDS-101 team library publish is behind the file (checked 2026-10-12 from the work file). **Importable:** Button, Icon Button, Input, Textarea, Select, Primary Tab, Card, Badge, Alert, Tooltip, Avatar, Chip, Date Field, Search Multi-Select, File Upload Inline, icons, variables, effect styles. **Not published:** Modal, all 12 · GUNA Components (Form Modal, Activity Card, Stat Card, Empty State, Dropdown Menu, Menu Item, Table Toolbar, Entity Chip, Priority Flag, Section Card) and **all text styles**. Publish the FDS-101 library update? | **Blocks Stage 2** (C7/C8 reuse can't be instanced) | Product Designer (FDS-101 owner) | Answered 2026-10-12: library republished; all components and text styles now import (re-checked at `/fdi-figma`) |
| Q36 | Where do comments (AC16) appear: inline under the expanded card, a side panel, or a popover from the card's "Comments" link? Built as a standalone panel in Figma (`12:1298`) | P1 card | Product Designer | Answered 2026-10-12 by Aman Bansal (Product Designer): comment icon next to Follow Up (card footer, bottom right) opens comments; icon shows a count badge when comments exist (D1) |
| Q37 | FDS-101 component gaps found while building: Search Multi-Select has **no Required marker or Error state** (Assign To is mandatory, AC6); Menu Item has **no destructive variant** (Delete, AC12); Date Field box is **32px tall vs Input/Select 40px**; Button **Loading** state has no spinner (known); no **Spinner** component (icon/loader used, OBSERVED); published **Top Nav** draws icons as vectors, so it has **no notification badge** (overlay used); **Sidebar Nav Item** shows **no chevron** on expandable groups. Add as VARIANTs? | P1, P2, P3 | Product Designer | |
| Q38 | Form Modal has **no body slot**, so the P2/P3 shells are **detached** Form Modal instances (header, footer, buttons and icons stay linked). Add a body slot (e.g. Content Slot instance-swap) to Form Modal? Also: no **overlay/scrim** variable is published (delete-confirm scrim is OBSERVED) | P2, P3, delete confirm | Product Designer | |
| Q39 | Side navigation for the Tasks page: which module/group and sibling items? Figma shows Tasks under an "Interactions" group; the Reports/Admin groups are FDS-101 App Shell sample content. Relates to Q22 | P1 App Shell | Product Manager + Product Designer | Answered for design 2026-10-12 (D3, from live product I2): Tasks under **Tickets & Activities**. Differs from I1 parent "Interactions" (C10); menu-config label TBD (Q22) |
| Q40 | What does the header **lightbulb** button do (added in the approved frames; also in the live product I2)? | P1 header | Product Designer / PM | |




## 11. Review Feedback




| #   | Rev | Reviewer | Section | Feedback | Resolution (FDI) | Closed? |
| --- | --- | -------- | ------- | -------- | ---------------- | ------- |
| D1 | Design (Figma) | Aman Bansal (Product Designer) — in chat 2026-10-12 | §5.1 P1 card, Q36 | Comments open from the icon next to **Follow Up** at the bottom right of the task card. When the task has comments, that icon shows a **badge** (count) | Applied 2026-10-12: card footer comment control is icon-only, next to Follow Up; count badge (Badge Primary/Solid "2") on cards with comments. Badge is an overlay because Activity Card has no count slot; proper fix = Activity Card VARIANT (Q32). Comments panel `12:1298` is what the icon opens; container (popover/drawer) still TBD | No |
| D2 | Design (Figma) | Aman Bansal (Product Designer) — in chat 2026-10-12 | §5.1 P1 regions | P1 must sit inside the **App Shell** with **header** (top nav) and **side navigation** | Applied 2026-10-12: P1 Default, Loading, Empty, No results, Error now render inside FDS-101 **App Shell** (Layout=Rail + Panel: Nav Rail, Side Navigation, Top Nav). Page bodies are local components swapped into the shell's Content slot. Top Nav carries the page title, so the duplicate body title is hidden. Tasks is active in rail and side nav; side-nav grouping is a placeholder (Q39) | No |
| D3 | Design (Figma) | Aman Bansal (Product Designer) — in chat 2026-10-12 | §5.1 P1 App Shell | Make the menu (side navigation) as in I2/I3: collapsible side nav with expandable groups, Tasks active under Tickets & Activities; collapsed = icon rail | Applied 2026-10-12: side nav rebuilt to match I2/I3: Dashboard (Executive, Sales Dashboard), Sales (Lead, Deal, Contact, Company, Account, Lead Eligibility Criteria, Campaigns), **Tickets & Activities** (Service Ticket, Activity Meeting, **Tasks** active), Operations (Trading Account, Cash Transactions, Assessment Attempts), Reports; collapse toggle on the edge; collapsed = icon rail. Header per I2: title, settings, notifications (count badge), language, avatar. Tenant logo is a placeholder slot | No |
| D4 | Design (Figma) | Aman Bansal (Product Designer) — in chat 2026-10-12 | §6 | Create **App Shell** and **Side Nav** components ("we do not have it now") | Applied 2026-10-12 as **candidates** in `8:2`: **Side Nav** `21:3687` (Nav=Expanded `21:3447` / Collapsed `21:3648`) and **App Shell** `22:3867` (Nav=Expanded `22:3601` / Collapsed `22:3783`, Content INSTANCE_SWAP prop). Built from FDS-101 Sidebar Nav Item, Nav Rail Item, Top Nav, Icon Button, Badge, Content Slot. Overlaps FDS-101 App Shell / Side Navigation (C9) | No |
| D5 | Code (front end) | Aman Bansal (Product Designer) — in chat 2026-10-13 | §12 | "The output … is not as Figma sign-off" | Fidelity pass `d148446`: header (lightbulb, kebab), banner, Insights tools and compact tiles, grouped filter toolbar, card layout, badges and side-nav chevrons now match frame `22:3868`. Verified by FDI with headless Chrome screenshots at 1440px against the Figma screenshot. Remaining deliberate differences: filters per AC3 (C11), live demo counts instead of sample numbers, C13 | No |
| D6 | Code (front end) | Aman Bansal (Product Designer) — in chat 2026-10-13 | §5.1 | Controls with undefined behaviour (lightbulb Q40, kebab Q9, Insights lock/settings Q13) | Shown exactly as signed off but inactive: `aria-disabled` + tooltip naming the open question | No |
| D7 | Code (front end) | Aman Bansal (Product Designer) — in chat 2026-10-13 | §5.2, §5.3 | "Add forms and other popup forms are not coming in alignment" | Fixed in `22c8abd`. Cause: `@fynxt/ui` relied on the host app's global `box-sizing` reset, so inputs overflowed the modal outside Studio; the library now sets it. Also: Select chevron + muted placeholder (FDS-101), search icon on Assign To, Associations as "+ Add association" per frame `14:1518`, row rhythm per frame. Verified in real Chrome: Add Task, validation, Edit, Add Follow-up, delete confirm, card menu. Remaining: Date & Time uses the browser's native picker, not the frame's "DD MMM YYYY - hh:mm" field with leading calendar icon (Q27) | No |




## 12. Design & Build Record

- **Figma:** [https://www.figma.com/design/0CwREH91xlsQOFpAUp852B/FDI---Test?node-id=0-1](https://www.figma.com/design/0CwREH91xlsQOFpAUp852B/FDI---Test?node-id=0-1) · file `0CwREH91xlsQOFpAUp852B` ("FDI - Test") · page `0:1` "DCF-0001 — CRM Tasks — workspace, Add/Edit Task and follow-ups" · approved version **not yet recorded** (designer to save a named version; Plugin API can't)
  - New components (candidate) `8:2`: Rich Text Editor `9:573` (State=Default/Focus/Error); Side Nav `21:3687` (Nav=Expanded/Collapsed); App Shell `22:3867` (Nav=Expanded/Collapsed, Content slot)
  - P1 Tasks workspace `8:3` (in candidate App Shell, D3/D4): Default `22:3868`, Loading `22:4380`, Empty `22:4722`, No results `22:5077`, Error `22:5432`, Default with nav collapsed `22:5789`; page-body components `18:2374`, `18:2899`, `18:3252`, `18:3618`, `18:3984`; detail frames: Card actions + status menu `12:1139`, Delete confirmation `12:1264`, Comments panel `12:1298`
  - P2 Add / Edit Task `8:4`: Add · Default `14:1518`, Add · Validation error `15:1301`, Edit · Prefilled `15:1509`, Edit · Saving `15:1867`, Add · Minimized `15:2053`
  - P3 Add Follow-up `8:5`: Default `16:1788`, Validation error `16:1911`
  - P4: not built (out of scope in rev 1)
  - Build audit: 405 instances (FDS-101 + 3 candidate variants), 0 images, fonts Lexend/Sora only; 1 unbound fill (scrim, OBSERVED). OBSERVED: scrim, bold/italic glyphs in RTE toolbar (no FDS-101 icons), icon/loader as spinner, priority→Badge colour mapping (High=Error, Medium=Warning, Low=Neutral; Q29). Sample data and "TBD / Qn" copy are placeholders, not rules
  - Code Connect: Station has mappings for Button, Badge, Card, Field, Tabs, Alert only; all other components used here need mappings (task for Stage 3)
- **Station:** `../fynxt-design-code-station` branch `fdi/DCF-0001-crm-tasks` · commits `153086b` (feature), `6612ae3` (lockfile sync incl. pre-existing `apps/vscode` drift) on base `31f79bb` (scaffold, authorised by Aman Bansal) · **PR: not opened, no git remote configured** (`station.repoUrl` null)
  - `@fynxt/ui` 0.2.0: IconButton, Tooltip, Avatar, Chip, EntityChip, SearchField, FilterChip, Menu, MultiSelect, Modal/ConfirmDialog, EmptyState, StatCard, ActivityCard, SideNav (candidate), AppShell/TopNav (candidate). Each has token-only CSS, tests and a `.figma.tsx`
  - `@fynxt/templates` 0.1.0: `CAND-DCF-0001-activity-workspace`
  - Gallery: `apps/studio/gallery/pages/crm/tasks.page.tsx` + `tasks.config.tsx`, registry id `crm.tickets-activities.tasks`. The `menu.json` entry is written at `/fdi-publish` (README §8)
  - Checks: `typecheck` ✅ · `test` ✅ 105/105 (26 files) · `lint` (token-literal) ✅ · `build` ✅
  - Review preview (`44f18fc`): `npm run dev` in the Station, then http://127.0.0.1:5190/preview.html?page=crm.tickets-activities.tasks (dev-only page preview; checked by FDI in headless Chrome at 1440 and 768 px). Open design point: the expanded side nav takes ~265px at tablet width (auto-collapse is a designer decision)
  - Not built: Rich Text Editor + @mentions + description attachments (Q28); attachment upload (AC17 shows existing attachments only); workspace kebab (Q9); Insights lock/settings (Q13); lightbulb (Q40); AC18/AC19 (out of scope). Associations use one searchable list across object types instead of a separate Objects selector (AC10, simplification for review)
- **QA (CLAUDE.md §17):** not applicable until Stage 3.


| Check | Result | Verified by |
|---|---|---|
| PRD / FRD (I1 M2-9) | **Partial.** AC1–AC4, AC6–AC8, AC11–AC13, AC15–AC16 implemented and tested. Gaps: AC14 reminder on card, AC4 Created on, AC2 help tooltips (C13, per sign-off); AC5/AC9 rich text, @mentions, description attachments (Q28); AC10 objects selector simplified; AC17 upload not built; AC1 kebab items (Q9); AC2 lock/settings (Q13); AC18–AC19 out of scope | FDI (tests) |
| Template rules | **Verified.** Page is configuration only; the template holds no business rules (scope, metrics, permissions and data are injected); candidate, not registered | FDI (code review + tests) |
| Design system (tokens, components) | **Verified (automated):** token-literal check passed; OBSERVED literals annotated (Badge 3px, Avatar ring 2px, Menu gap 2px, Modal scrim, breakpoints 640/800px). **Visual fidelity checked by FDI** (headless Chrome 1440px vs Figma frame `22:3868`, after D5). **Needs human:** final designer sign-off on the running page | FDI / Product Designer |
| UX decisions | **Verified:** no approved `ux/decisions` exist; designer decisions D1–D4, E1–E4 and C11 applied | FDI |
| States | **Verified:** loading, error + retry, empty, no results + clear all, success, action error, dialog validation and save error, comments empty/loading | FDI (tests) |
| Permissions | **Failed for production / needs human:** the template requires `permissionCheck` and hides denied controls (tested), but the gallery demo allows everything because no permission model exists (Q5) | Product Manager / BA |
| Accessibility | **Partially verified (jsdom):** landmarks, h1, tabs, disclosure `aria-expanded`, menu-button keyboard, dialog focus trap + restore, alertdialog, combobox/listbox, named icon buttons, inline errors with `role=alert`. **Needs human:** colour contrast, screen-reader pass, visible focus. Note: the filter chip and a card's status control can both be named "Status: X" (in different regions) | FDI / QA |
| Responsive | **Needs human:** CSS wraps header, filters and form at 800px and turns dialogs into full-width sheets at 640px (OBSERVED, no breakpoint tokens D11); not checked on devices | QA / Product Designer |

## 13. Status History


| Date       | From → To         | Who | Note                                                                                                                                                                              |
| ---------- | ----------------- | --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-10-12 | — → DRAFT         | FDI | Created from I1 (Jira M2-9)                                                                                                                                                       |
| 2026-10-12 | DRAFT → IN-REVIEW | FDI | Rev 1 handed to reviewers. 4 pages classified (1 NEW-TEMPLATE candidate, 2 ONE-OFF, 1 out of scope), 24 components (9 EXISTING, 15 NEW-COMPONENT), 6 conflicts, 31 open questions |
| 2026-10-12 | IN-REVIEW → APPROVED | Aman Bansal (Product Designer) | Rev 1 approved. Decided by Aman in the case file ("Approved (Aman)"), role confirmed in chat; FDI transcribed it to the canonical status value |
| 2026-10-12 | APPROVED → DESIGN-IN-PROGRESS | FDI | `/fdi-figma`: gate passed; C7/C8 decided by Aman Bansal (Product Designer) in chat; Q35 library publish resolved |
| 2026-10-12 | DESIGN-IN-PROGRESS → DESIGN-REVIEW | FDI | Frames built in "FDI - Test" page `0:1` (see §12). Approved version ID still to be recorded by the designer. New open items Q36–Q38 |
| 2026-10-12 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | Feedback D1 (comment icon + count badge), D2 (App Shell with header and side nav). Decided in chat; FDI transcribed |
| 2026-10-12 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | D1, D2 applied in Figma (see §11, §12). New Q39. Approved version ID still to be recorded by the designer |
| 2026-10-12 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat: D3 (menu as I2/I3), D4 (new App Shell + Side Nav components). Saved review version `2409443088969850798`. FDI transcribed |
| 2026-10-12 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | D3, D4 applied (candidate Side Nav + App Shell; P1 re-hosted). New C9, C10; Q37/Q39 updated. Designer to save a new named version |
| 2026-10-12 | DESIGN-REVIEW → DESIGN-APPROVED | Aman Bansal (Product Designer) | Approved Figma version `2409447955195877898` in chat, with exception E3 (filters per AC3, C11). FDI re-synced edits E1–E4 into §5.1.1 and transcribed the decision |
| 2026-10-12 | DESIGN-APPROVED → CODE-IN-PROGRESS | FDI | `/fdi-build`: Station initial commit authorised by Aman Bansal; branch `fdi/DCF-0001-crm-tasks`. Rich Text Editor deferred (Q28) |
| 2026-10-12 | CODE-IN-PROGRESS (build complete) | FDI | Branch `fdi/DCF-0001-crm-tasks` @ `6612ae3`; typecheck, test, lint and build pass. Waiting for a Station git remote and the user's go-ahead to push and open the PR (then → CODE-REVIEW) |
| 2026-10-13 | CODE-IN-PROGRESS (fidelity pass) | FDI | D5/D6 applied in `d148446`; C13, C14 recorded. 106/106 tests, typecheck, lint pass. Awaiting designer check of the running page, then a Station remote for the PR |
| 2026-10-13 | CODE-IN-PROGRESS (popup alignment) | FDI | D7 fixed in `22c8abd`; 106/106 tests, typecheck, lint pass |




## 14. Revision Log


| Rev | Date       | Summary of changes | Feedback items addressed |
| --- | ---------- | ------------------ | ------------------------ |
| 1   | 2026-10-12 | Initial            | —                        |


