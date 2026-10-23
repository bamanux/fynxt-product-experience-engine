# I1 transcript — Jira M2-9 "Tasks" (verbatim)

Text transcription of [`M2-9-tasks.pdf`](M2-9-tasks.pdf) (SHA-256
`22f589c9e756dea3ccdecfb7b528ee5df6face6d63d34613115a779e676aa977`), copied from
`~/Downloads/M2-9.pdf` on 2026-10-12. The PDF is the authoritative copy; this transcript
exists so the case file can cite AC numbers. Where the PDF shows a broken image
placeholder, the transcript marks it `[broken image]`.

---

Interactions (M2-1)
[M2-9] Tasks Created: 26/Jun/26 Updated: 26/Jun/26

| Field | Value |
|---|---|
| Status | Idea |
| Project | FYNXT Coud – Milestone 2 |
| Components | None |
| Affects versions | None |
| Fix versions | None |
| Parent | Interactions |
| Type | User Story |
| Priority | Medium |
| Reporter | Pooja Bharghavi G |
| Assignee | Unassigned |
| Resolution | Unresolved |
| Votes | 0 |
| Labels | None |
| Remaining Estimate | Not Specified |
| Time Spent | Not Specified |
| Original estimate | Not Specified |
| Rank | 0\|i00f0f:9 |
| Sprint | |

## Description

As a CRM user, I want to create, assign, and manage tasks and follow-ups, So that I can plan
and track work and have it captured against the relevant record.

### Dependencies

- User management for assigning tasks to users (Assign To)
- Workflow/automation engine for rule-based task automation and overdue escalation
- Notification service for reminders and assignee notifications

### Pre-conditions

- User has permission to create and manage tasks for the active entity/tenant
- Tasks module is enabled for the tenant
- Assignable users and associable objects exist in the system

## Acceptance Criteria

**AC1: Task workspace and tabs**
Given the user is on the Tasks module, When the workspace loads, Then the system:
Provides the tabs My Task and My Team's Task to switch the list scope
Shows a "+ Add Task" action and a kebab for workspace-level actions
Displays an informational/automation banner that can be dismissed

**AC2: Insights panel**
Given the Tasks workspace, When the Insights panel renders, Then the system:
Displays Total Task, Pending Task, In-progress Task, Overdue Task, and Completed Task
metrics reflecting current data
Provides help tooltips on each metric
Allows the panel to be locked, configured (settings), and collapsed/expanded

**AC3: Filters and search**
Given task records exist, When the user works with the filter bar, Then the system:
Provides an Activity Type filter and a Status filter, plus an add-filter [broken image] control
Returns matching records on search; combines active filters with AND logic
Resets filters when the user clicks Clear All

**AC4: Task list cards (expand / collapse)**
Given tasks exist in scope, When the list renders, Then each task card shows the summary, and
When expanded, reveals the full detail:
Activity type and title (e.g., "Follow-up: ..." or "Task: ...") with priority and tags
Description with a "Show more" expander
Assigned to and Scheduled on
Associations (e.g., Deal name 1, a user), with an add [broken image] control
Status dropdown, Reminder, Add follow up, attachments, and comments
Created by and Created on metadata

**AC5: Open Add Task popup**
Given the user clicks "+ Add Task", When the popup opens, Then the system displays the Add
Task controls:
Task Name (mandatory) and Assign To (mandatory)
Date & Time, Priority, Reminder, and Tags
Description (mandatory) with a rich-text editor (image, link, bold, italic, divider, list,
attachment)
Associations [broken image], Clear fields, minimize, expand, close, Cancel, and Save

**AC6: Create a task and validation**
Given the Add Task popup, When the user attempts to Save, Then the system:
Saves the task and adds it to the list when all mandatory fields (Task Name, Assign To,
Description) are completed
Blocks the save and shows inline validation when a mandatory field is missing or the date/time
is invalid

**AC7: Assign To**
Given the Assign To field, When the user opens it, Then the system:
Displays a searchable user list
Allows selecting one or more users, shown as removable chips (e.g., John x, Jane x)
Assigns the task to the selected user(s)

**AC8: Date & Time, Priority, Reminder, and Tags**
Given the Add/Edit Task popup, When the user sets the secondary fields, Then the system:
Captures Date & Time (e.g., 12 Mar 2026 - 10:00 AM)
Applies the selected Priority (e.g., Medium) and Tags (selectable/removable chips)
Sets a Reminder lead time (e.g., 1 hour before / 30 mins before)

**AC9: Description editor with mentions**
Given the Description editor, When the user composes the description, Then the system:
Retains rich-text formatting (bold, italic, list, link, divider) and image/file attachments on save
Supports @mentions of users (e.g., "Hi @Juliana Swift")

**AC10: Associations**
Given the Associations control, When the user adds an association, Then the system:
Provides an Objects selector (e.g., Deals) with search
Allows linking the task to records (and users), shown as association chips
Persists the associations on save

**AC11: Edit a task**
Given an existing task, When the user opens Edit Task, Then the system:
Opens the task pre-filled with its current values (Task Name, Assign To, Date & Time, Priority,
Reminder, Tags, Description, Associations)
Saves the changes on Save and reflects them on the task card

**AC12: Task actions (kebab menu)**
Given a task card, When the user opens its kebab menu, Then the system offers:
Edit - opens the Edit Task popup
Duplicate - creates a copy of the task
Mark as completed - sets the task status to completed
Delete - removes the task after confirmation

**AC13: Status management**
Given a task, When the user opens its Status dropdown, Then the system:
Allows updating the status (e.g., Upcoming, In-progress, Completed, Overdue per the
configured set)
Reflects the change on the card and in the Insights metrics and filters

**AC14: Reminders**
Given a task with a reminder, When the reminder lead time is reached, Then the system notifies
the assignee per notification settings; and the reminder lead time is editable from the card.

**AC15: Add Follow-up**
Given a task, When the user selects Add follow up, Then the system opens an Add Follow-up
popup capturing Date, Time, and Description; and on Add, attaches the follow-up to the task
and persists it.

**AC16: Comments**
Given a task, When the user works with comments, Then the system:
Provides an Add comment box with a Comment action
Shows a "No comments yet" empty state until the first comment is added
Lists comments with author and timestamp, and a sort control (Most recent / Oldest)
Updates the comment count/badge on the task card

**AC17: Attachments**
Given a task, When the user attaches a file, Then the system saves the attachment and makes it
accessible from the task card.

**AC18: Automation, notifications, and escalation**
Given workflow rules are configured, When applicable, Then the system:
Automates tasks based on workflow rules
Triggers notifications to assignees on priority and status changes
Escalates overdue tasks automatically

**AC19: Cross-object logging**
Given a task associated with a record, When the related contact/deal/lead is viewed, Then the
task appears in its activity history; and Given a record detail page, When the user creates a task
from it, Then the task is pre-associated to that record.

Generated at Mon Oct 12 10:19:44 UTC 2026 by Aman Bansal using Jira 1001.0.0-
SNAPSHOT#100294-rev:ea70632e0e06e672b6c58852a35aaed86a7d313e.
