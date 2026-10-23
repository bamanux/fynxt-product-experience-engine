---
id: DCF-0002
title: Scoring Builder — weighted scoring models for CRM objects
module: CRM / Admin settings
status: CODE-IN-PROGRESS
revision: 8
owner: Aman Bansal (Product Designer)
requestedBy: Aman Bansal
created: 2026-10-13
updated: 2026-10-21
figma:
  fileKey: 0CwREH91xlsQOFpAUp852B
  pageNodeId: "33:4040"
  approvedVersionId: "2412747704466134651"  # Version 3 (rev 8), approved by Aman Bansal 2026-10-21. Version 1 = 2412391106275681573 (see versions)
versions:  # D36: product versions of the Scoring Builder design
  - version: 1
    revision: 6
    snapshot: revisions/rev-6.md
    figmaVersionId: "2412391106275681573"
    station: "fdi/DCF-0002-scoring-builder @ 6b9fd15"
    state: frozen 2026-10-21 (saved, not changed by later revisions)
  - version: 2
    revision: 7
    source: inputs/I12-one-map.md
    snapshot: revisions/rev-7.md
    state: DESIGN-REVIEW paused 2026-10-21 (Data Filter look, D39; no saved version yet). Kept as is; rev 8 adds Version 3
    figmaSectionId: "416:111151"  # first build 408:23777 SUPERSEDED by D39
    figmaVersionId: null  # the Plugin API can't save a named version; designer saves and shares it
  - version: 3
    revision: 8
    source: "chat 2026-10-21 (D40): Version 1 look + Data Filter concept (I13), one object per model, shared band settings panel"
    state: CODE-IN-PROGRESS 2026-10-21 (built, commit 62c57a9; not pushed)
    figmaSectionId: "425:32433"
    figmaVersionId: "2412747704466134651"
station:
  branch: fdi/DCF-0002-scoring-builder  # stacked on studio/gallery-change-requests (→ DCF-0003 → DCF-0001)
  pr: null
---

# DCF-0002 — Scoring Builder — weighted scoring models for CRM objects

> Design Case File. Produced by FDI (FYNXT Design Inspector) per
> `[agent/fdi/README.md](../../agent/fdi/README.md)`. Reviewers: edit only **§11 Review
> Feedback** and the frontmatter `status`, then record the change in **§13 Status History**.

## 1. Summary

An admin workspace where a user builds a **scoring model** (I1, extended by I8). The admin:
1. names the model and sets which records it applies to;
2. adds **one or more objects**, e.g. Contact and Deal (I8);
3. for each object, picks attributes, chooses **one AND / OR operator** that joins all of that object's attributes, and gives each attribute a weight, with the weights totalling 100 (I8, I1);
4. joins the objects with **AND / OR connectors**, which can differ between each pair of objects (I8);
5. for each attribute, defines values, groups them as Low, Medium or High, and gives each value a score (I1);
6. defines outcome bands that turn the total score into a label, e.g. Low / Medium / High Risk or Cold / Warm / Hot Deal (I1, I3).

A single-object model scores as the I3 formulas show: the sum over attributes of `matched value score × attribute weight`. I2 and I3 work two single-object models end to end: Client risk (Contact) and Deal score (Deal). **No source says how AND / OR changes that score** (C9, Q41). Rev 2 therefore shows the logic as structure and does not design a calculation for it.

Rev 2 also proposes a **full-screen builder without the app shell**, as I8 allows "if required". FDI recommends it, but it changes the modal decided in D1 / D4 / D10, so the designer decides (C7, Q45). The models list stays in Settings › Brand Setup › Score Builder (D5).

Rev 3 adds **override rules** (I9). An override is a condition on an attribute or an object, and it can look at related objects: "if the related Account or Deal is not approved, the result becomes High Risk". When the condition matches, the rule either **forces an outcome band** or **sets a score**; the admin chooses per rule. Rev 3 also moves "Applies to" back to the **Details page, at model level** (D22), makes **Distribute evenly** visible on each object (D23), and adds guidance, live feedback, smoother interactions and visible shortcuts (D24).

Rev 4 uses **I10**, a real onboarding risk policy (LMAX "Customer Risk Assessment Scoring – Individual Clients", v2.2), as the reference for the logic the builder must be able to express. It needs:
- **points scoring** (a value's points are added directly; maximum 100);
- a **two-field (matrix) attribute** (Industry × role);
- **non-score outcomes** on a value (Restricted country → Reject; "Other" source of funds → Case by case);
- a **default rule** ("unemployed / retired / student → Low");
- decimal scores (7.5) and **threshold bands** (≤ 55 Low, > 55 to ≤ 65 Medium, > 65 High);
- richer **overrides**: force a band, raise to *at least* a band, Reject, refer to compliance; conditions on an attribute's rating, on unscored fields (PEP, sanctions, adverse media, nationality) and on numeric thresholds joined with OR (HNWI).

I10's values are sample configuration, not FYNXT rules. Two of its worked examples contain errors (C14, C15).

Rev 5 (D27–D31) makes the **v3 step-by-step flow the base design** and folds rev 4's capabilities into it, so the v4 points flow becomes a reference. It also:
- gives outcome bands a free-text **label and description**, with the description shown as a tooltip wherever the band appears;
- makes the summary panel **hideable**: open on launch, collapsing to a floating button;
- makes the left panel **more intuitive**;
- asks for **every interaction** of create, edit / delete / list actions, and errors and edge cases as clickable screens.

**Rev 7 = Version 2 (D36, I12).** Version 1 is rev 6 as built: case file `revisions/rev-6.md`, Figma version `2412391106275681573`, Station commit `6b9fd15`. It is **saved and frozen**; Version 2 does not change it. Version 2 keeps every capability of Version 1 (several objects with AND / OR, weights, values by category, points and Reject, two-field attributes, threshold bands with label and description, override rules incl. raise and category conditions) and changes how the builder is laid out, following Aman Bansal's "one map" (I12):
- **one page** instead of the left outline + editor: Scoring name and Description → **Score settings** (bands with Low / High edges) → **Objects** (Contact, Lead…) with their conditions → **one attribute table** (Column · Weightage % · Category · Value · Score) → **Override** section with an on / off toggle;
- **weightage is required** on every column (score × weight, Q81); both layouts stay as options (Q86);
- **Restricted** has no range and means Reject (Q88 reading);
- override rules read as one line: *Country* · *High* · Score *Regardless* / *Lower* · Override *High*.
Q81–Q88 are answered (D37, D38); Q84 and Q88 are FDI readings to confirm at review.

**Rev 8 = Version 3 (D40).** Aman Bansal asked for the Data Filter concept (I13) **in Version 1's UI style** (left outline, centre editor, summary panel), with these product decisions (chat answers, 2026-10-21):
- **one object per model** (R40). The model is created for one object, e.g. Contact, with no AND / OR between objects; a Lead score is another model;
- **band categories are shared settings** (R41): Low / Medium / High (and Restricted = Reject) with names, descriptions and score ranges are set once, in a **Settings side panel** opened from the **⋮ menu above the list table**, and every model uses them. The builder has no outcome-bands step in Version 3;
- **Version 3 is new** (D40). Version 1 (frozen) and Version 2 (rev 7, in design review) are not changed.
The side panel follows the "Question Bank Settings" screenshot (I15, Q95 answered).

**No template fits.** The registry has only placeholders. The builder remains a **NEW-TEMPLATE candidate**, a "weighted scoring model" configuration page that is generic across objects (Q2).

## 2. Inputs

| # | Input | Type | Location | Authority |
|---|---|---|---|---|
| I1 | Request text from Aman Bansal (Product Designer), pasted with `/fdi-intake` 2026-10-13 | Requirement from a named human | `[inputs/I1-request.md](inputs/I1-request.md)` (verbatim) | Binding for what it explicitly states (README §2). See Q1 on ownership |
| I2 | "Scoring Builder.pdf" (2 cases, 6 pages), supplied with I1 | Requirement worked examples (print of I3) | `[inputs/I2-scoring-builder.pdf](inputs/I2-scoring-builder.pdf)` | Structure and formula: as I1. **Sample values** (countries, scores, bands) are illustrative, not product rules |
| I3 | "Scoring Builder.xlsx", source of I2, with cell formulas | Requirement worked examples | `[inputs/I3-scoring-builder.xlsx](inputs/I3-scoring-builder.xlsx)`, transcript `[inputs/I3-transcript.md](inputs/I3-transcript.md)` | As I2. Cited for the formula (`=G13*D13`, `=SUM(…)`) |
| I4 | Reference: live Settings › Assessment list page (Settings rail + panel, tabs, banner, "All Assessments" table card with filter toolbar, toggles, pagination), supplied by Aman Bansal 2026-10-13 | Product screenshot (rank 5) | `[inputs/I4-ref-settings-assessments-list.png](inputs/I4-ref-settings-assessments-list.png)` | Visual reference for P2, as instructed |
| I5 | Reference: "Add Assessment" modal (sections, unit-suffix inputs, toggle row, distribution table with totals row) | Product screenshot (rank 5) | `[inputs/I5-ref-add-assessment-modal.png](inputs/I5-ref-add-assessment-modal.png)` | Visual reference for P1, to merge with I6 |
| I6 | Reference: "Create account" modal with a 3-step stepper (Cancel / Proceed) | Product screenshot (rank 5) | `[inputs/I6-ref-create-account-stepper.png](inputs/I6-ref-create-account-stepper.png)` | Visual reference for P1 ("one thing at a time") |
| I7 | Reference: accounts data table (checkbox column, uppercase headers with column menus, icon + text cells, tag chips with +N overflow, kebab actions, filter toolbar, pagination), supplied by Aman Bansal 2026-10-13 with D12 | Product screenshot (rank 5) | `[inputs/I7-data-table-reference.png](inputs/I7-data-table-reference.png)` (SHA-256 `096c8e29…dfce`) | Visual reference for the Data Table Header / Cell look (D12) |
| I8 | Revision request from Aman Bansal (Product Designer) with `/fdi-revise`, 2026-10-13: several objects, AND / OR logic, full-screen builder | Requirement from a named human | `[inputs/I8-revise-request.md](inputs/I8-revise-request.md)` (verbatim) | Binding for what it explicitly states, as I1. Recorded as D16 / D17. Rule ownership: Q1 |
| I9 | Review comment and override request from Aman Bansal (Product Designer), chat 2026-10-14, with chat answers | Requirement from a named human | `[inputs/I9-override-request.md](inputs/I9-override-request.md)` (verbatim) | As I8. Recorded as D22–D25. Rule ownership: Q1 |
| I10 | "Customer Risk Assessment Scoring – Individual Clients (Onboarding v2.2)", LMAX Global, author Enayet Nayeem (revision table v1 Oct 2018 → v2.2 Apr 2026); supplied by Aman Bansal with `/fdi-revise` 2026-10-15 as a "requirement example for logics" | Requirement worked example (client policy) | `[inputs/I10-customer-risk-assessment-individual.pdf](inputs/I10-customer-risk-assessment-individual.pdf)` (SHA-256 `8e459129…8c75006`), transcript + arithmetic check `[inputs/I10-transcript.md](inputs/I10-transcript.md)` | **Capabilities** it needs are requirements (D26). **Values** (countries, industries, points, thresholds) are the client's sample configuration, like I2/I3. Third-party document: use as test data needs confirmation (Q62) |
| I11 | Raise (escalation) rules: request text and chat answers from Aman Bansal (Product Designer), with `/fdi-revise` 2026-10-20 | Requirement + business rule from the named rule owner | [inputs/I11-raise-rules-request.md](inputs/I11-raise-rules-request.md) | Business rule (owner: Aman Bansal, confirmed in chat) |
| I12 | "Scoring Builder.pdf" one-page map (score settings, objects + conditions, attribute table with weightage, override toggle, worked example for two people), with `/fdi-revise` 2026-10-21: "make it a version … save the current version and make the new one with this, most of the things remain same" | Requirement from a named human (layout + example) | [inputs/I12-one-map.md](inputs/I12-one-map.md) (verbatim text; original PDF to be dropped in, see file) | Binding for layout and what it shows (D36). Values (countries, scores) are sample configuration (BR7). Rule readings Q81–Q88 |
| I13 | Screenshot of the Data Filters "Add Data Filter" builder (Settings › User Management › Data Filters): Name / Users fields, Objects with **+ Add object** popover (search, + / − per object), objects as line tabs with ×, "No object selected" empty state, condition tree with AND ▾, Column* / Conditions* / Value* rows, **+ Add Row** / **+ Group**, nested Group 2, Clear All; Unsaved Changes and Delete dialogs. With `/fdi-figma` 2026-10-21: "looking like this but need to be in full sereen" | Visual reference from a named human (Aman Bansal) | [inputs/I13-data-filter-reference.png](inputs/I13-data-filter-reference.png) | **Visual only** (look and interaction pattern for Version 2), not rules. Matches the Advanced Filter Builder precedent (§4, `docs/template-discovery.md` §B.1) |
| I14 | Chat request 2026-10-21 (Aman Bansal): "can we add this concept in version one ui style and do it for one object at a time and need to have a seperate settings side pannel on the main list page under the three dot menu above the table similar to the attached SS where i will configure the output band categories and can define low, medium and high..." + AskUserQuestion answers: one object per model; panel sets names and ranges, shared by all models; new Version 3 | Requirement from a named human | This row (verbatim). Screenshot referenced but not received (Q95) | Binding for Version 3 (D40) |
| I15 | Screenshot "Question Bank Settings" side panel (Aman Bansal, chat 2026-10-21, answer to Q95): title + one-line subtitle + close; collapsible bordered sections ("Difficulty Level", "Category"), each with a table (header row in caps, editable inputs per row, red remove icon, "+ Category" link button under the table); footer Cancel / Save | Visual reference from a named human | [inputs/I15-settings-side-panel-reference.png](inputs/I15-settings-side-panel-reference.png) | **Visual only** (panel look for R41). Its fields (difficulty, total score, question categories) are another product's and are not taken |

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
| R1 | Admin selects **one or more objects** to score (examples: Contact, Deal); two or more are allowed | I1; I3 C10, C39; **I8** |
| R2 | Admin defines **pre-requisites** (which records the model applies to) **once per model, on the Details page** (D22), e.g. User Type = Contact, Contact Category = Retail & Professional, Profile = Trader; "all active Deals" | I3 B2–C5, B33–C34 |
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
| R14 | Within an object, **all attributes are joined by one operator**, AND or OR, chosen per object | I8 ("inside the object attributes will have AND/OR Logic one between all the atribute") |
| R15 | Objects are joined by AND or OR; the operator is chosen **for each pair of adjacent objects** and can differ (e.g. A AND B OR C) | I8 ("between object can have And and OR logics and can be different between two objects") |
| R16 | The builder should "feel useful"; a full-screen builder without the app shell is acceptable "if required" | I8. Design direction, not a business rule (C7, Q45) |
| R17 | Admin can add **override rules** at **attribute level** or **object level** | I9 ("it should be in the attribute or object level conditions") |
| R18 | An override's conditions can refer to **another object** in the model, e.g. a Contact model checks whether the related Account or Deal is approved | I9 example |
| R19 | When an override matches, its outcome is chosen per rule: **force an outcome band** (e.g. High Risk) **or set a score** | I9; chat answer 2026-10-14 |
| R20 | The builder should give guidance, live feedback, smoother interactions and visible shortcuts | D24 (design direction, not a business rule) |
| R21 | **Points scoring:** a value's score can be entered as points that are added directly (Country 20 / 30 / 40, Delivery 5 / 7.5 / 10; maximum total 100), as an alternative to I3's "score × weight" | I10 p1–3. Relationship to R10 / BR2: C13, Q57 |
| R22 | **Matrix attribute:** an attribute's category and score can depend on **two fields** (Industry × employment role: Self employed / Director-Partner / Other) | I10 p1–2 (C17) |
| R23 | **Non-score value outcomes:** a value can lead to **Reject** (Country "Restricted") or **Refer / case by case** (Source of funds "Other") instead of points | I10 p1–2 |
| R24 | **Default rule:** when a field has a given value, the attribute takes a set category, e.g. "when unemployed / retired / student, Industry score is Low by default" | I10 p5 example 8 |
| R25 | Scores may be **decimals** (7.5) | I10 p2–3 |
| R26 | **Threshold bands** with explicit edges: "55 or less" Low, "over 55 but ≤ 65" Medium, "over 65" High | I10 p3 |
| R27 | Override **outcomes**: force a band ("regardless of risk score"), raise to **at least** a band ("override to medium if the score is lower"), **Reject**, **Refer to compliance**; and Reject + escalate together | I10 p3 (extends R19) |
| R28 | Override **conditions** can test: an attribute's **rating** ("Country of residence rated as high risk"); fields that are **not scored** (PEP incl. family / close associate, sanctions list, adverse-media hit, nationality in a restricted list, third-party source of funds); **numeric thresholds with currency** joined with **OR** (HNWI: annual income > 3 mln USD **or** savings > 3 mln USD) | I10 p3 (extends R17 / R18) |
| R29 | Outcome bands have a **free-text label** and an optional **free-text description**, both customisable per model; the description appears as a **tooltip** wherever the band label is shown | D28 |
| R30 | The summary panel is **shown on launch** and the user can **hide / show** it; when hidden it becomes a **floating icon button** | D31 (design direction) |
| R31 | **Attribute raise rule:** per attribute, the admin can turn on a rule with a **threshold**: when the attribute's score reaches it and is **higher than the object's score**, the object takes the attribute's score | I11 ("if the attribute score is high then the object overall score then take attribute as the score as the object score (it is a override)"); chat answer "Admin sets a threshold" |
| R32 | **Object raise rule:** per object, the admin can turn on a rule with a **threshold**: when the object's result reaches it and is **higher than the overall result**, the overall takes the object's result (e.g. overall Low, Deal High → overall High) | I11 ("overall scrore is low and one of the object scrore is high then need to have the high overall score (override)"); chat answer "Admin sets a threshold" |
| R33 | The raise rules must be **user friendly, interactive and less complicated** to set up | I11 (design direction, not a business rule) |
| R34 | **Version 2 layout:** one page in this order: Scoring name + Description · Score settings · Objects with conditions (AND, + Add rule, + Add group) · attribute table · Override section | I12 (D36) |
| R35 | **Score settings:** each band has edges read as "up to and including": Low up to 55, Medium above 55 up to 65, High above 65 (Q82); I12's 56 / 66 are display values of those edges. **Restricted** has no range: it is the Reject outcome under the label "Restricted", reached by a Restricted value or an override (Q88 reading) | I12; Q88 |
| R36 | **Weightage is required** on every column (no NA); contribution = score × weight (R10), as the I12 worked example shows (10 × 50% = 5, 15 × 25% = 3.75). I12's "NA" entries are placeholders | I12; Q81 answered by Aman Bansal 2026-10-21 |
| R37 | **Override toggle for the entire score:** one switch per model; off = no override rule changes the score | I12; Q87 answered by Aman Bansal 2026-10-21 |
| R38 | **Override line:** [Column] [Category] · Score [**Regardless** \| **Lower**] · Override [Band]. *Regardless* = force the band whatever the score (R27 "regardless of risk score"); *Lower* = set the band only when the computed band is lower (R27 "override to medium if the score is lower", raise only) | I12; same capability as R27 / D33 / D35 |
| R39 | A **two-field column** is named "Industry+Occupation" and its values ("Casinos-Owner") combine both fields | I12; same as R22 |
| R40 | **Version 3: one object per model.** A score model scores exactly one object, chosen at create (Details). No Add object, no AND / OR between objects (R15 does not apply in Version 3). Applies to and columns belong to that object | I14; D40 (Aman Bansal, 2026-10-21) |
| R41 | **Version 3: shared band categories.** Low / Medium / High, and Restricted (= Reject, no range, R35 / Q88), each with name, description and score range ("above / up to" edges, Q82), are tenant settings shared by every Version 3 model. They are edited in a **Settings side panel** opened from the ⋮ menu above the P2 table. The builder shows the bands read-only and links to the panel | I14; D40 |
| R42 | **Version 3 layout:** Version 1's builder (left outline · editor · summary, D18 / D31) with the Data Filter concept: Applies to as the condition tree (AND / OR ▾, Column / Condition / Value rows, + Add Row / + Group, nested groups, Clear All; I13), columns with required weightage (R36) and category / value / score rows, overrides with the toggle and one-line rules (R37, R38) | I14; D40; I12; I13 |

### 3.3 Business rules relied on

| Rule | Statement | Source |
|---|---|---|
| BR1 | Attribute weights must sum to 100% | I1; I3 |
| BR2 | Contribution = value score × weight; total = Σ contributions | I1; I3 formulas |
| BR3 | Values are categorised Low / Medium / High; multiples per category allowed | I1 |
| BR4 | A model has applicability pre-requisites | I3 |
| BR5 | Attributes of an object are combined with one AND / OR operator; objects are combined with AND / OR connectors | I8. **Structure only:** the effect on the score is not stated (C9, Q41) |
| BR6 | A matching override replaces the computed result: either the band is forced, or the score is set and then mapped to a band | I9 + chat answer. Precedence, direction and audit are open (Q52–Q56) |
| BR7 | **Capability, not values:** the builder must be able to configure everything I10 uses (R21–R28). Which values a tenant configures is tenant data | D26 (Aman Bansal) |
| BR8 | **Raise only (attribute → object):** an attribute raise rule replaces the object's score with the attribute's score only when (a) the attribute's score is at least the admin's threshold **and** (b) it is higher than the object's computed score. It never lowers a score | I11 + chat answers 2026-10-20, **confirmed by Aman Bansal (rule owner)**. Open details: Q75, Q76, Q77 |
| BR9 | **Raise only (object → overall):** an object raise rule replaces the overall result with the object's result only when the object reaches the admin's threshold **and** it is higher than the overall. It never lowers the overall | I11 + chat answers 2026-10-20, **confirmed by Aman Bansal (rule owner)**. Open details: Q76, Q78–Q80 |
| BR10 | **Version 3:** one object per score model; band categories and ranges are tenant-wide, not per model (R40, R41). Open: who may edit them and what happens to saved scores when ranges change (Q91, Q92) | I14; Aman Bansal (Product Designer) 2026-10-21 |

Rules the design needs but **no source states** are in §10, including:
- the value-score range (Q7)
- range boundaries and band edges (C3, Q10)
- what happens when a record has no matching value (Q8)
- whether category must follow score order (Q7)
- band count and coverage (Q10)
- weight precision (Q11)
- how AND / OR changes the score (C9, Q41)
- which record is scored when a model has several objects, and whether weights total 100 per model or per object (Q42)
- precedence when connectors differ, and the default connector (Q43)
- which override wins when several match, whether overrides may lower a result as well as raise it, and how an override is shown and audited (Q52–Q56)
- whether points scoring replaces or sits beside weighted scoring (Q57); how matrix attributes, Reject / Refer outcomes and default rules behave (Q58–Q61)

### 3.4 Permissions

| Role | Can | Source |
|---|---|---|
| "admin user" | Build scoring logic | I1 |

Version 3's band settings panel needs its own permission (Q91).

Everything else is uncited and open (Q15): which roles can view, create, edit, activate or delete models, and whether changes are audited.

## 4. Library Search

| Searched | Query / scope | Result |
|---|---|---|
| Template registry | All entries; categories CONFIG, FORM, LIST | `LIST-001`, `DETAIL-001`, `FORM-001`: **all `placeholder: true` → non-existent for REUSE**. No CONFIG template |
| `experience-library/templates/*` | All | `FYNXT-TPL-LIST-002`: Table List pilot, **unregistered**, table-only. Not a builder |
| `docs/template-discovery.md` | CONFIG / builder candidates | **`CAND-005` Pipeline / Stage Configuration Builder** (1 occurrence, Deals pipeline; "leaning Not Reusable"). Same family (admin configuration of named items with numeric attributes, add/delete rows, Cancel / Save & Apply) but different structure. This case is the **2nd CONFIG-builder occurrence**, which may justify CONFIG-pattern discovery (Q2) |
| Station `@fynxt/templates` | `src/` | Only the DCF-0001 candidate `ActivityWorkspace` (collection workspace). **Not applicable** |
| Station `@fynxt/ui` | Exports on branch `fdi/DCF-0001-crm-tasks` (**not merged, DCF-0001 at CODE-IN-PROGRESS**) | Button, IconButton, TextField, TextArea, Select (with chevron), MultiSelect, Chip, EntityChip, Badge, Card, Alert, Tooltip, Modal/ConfirmDialog, Menu, EmptyState, Tabs, StatCard, AppShell/TopNav/SideNav (candidates). Missing: NumberField, Accordion, DataTable, Breadcrumb, PageHeader, Form Section, Toggle, Radio |
| FDS-101 (Figma `3c44QQCA8h7GTZYH2EWn8H`) | Inventory + **12 · GUNA Components** (checked 2026-10-13) | Present: Number `119:916`, Radio `55:83`, Toggle `53:49`, Accordion `76:27`, Breadcrumb `73:14`, Data Table Cell/Header/Column (`421:`*, `429:5365`; duplicate sets `314:`*/`316:*`, see fds-101-components.md), **Settings Page Header** `370:149` (breadcrumb, title, help, Cancel / Save Changes), **Setting Row** `370:284`, **Form Section** `347:168`, Section Card `359:61`, **Report Builder** parts (Report Field Item `367:81`, Builder Panel `367:82`, Report Column `368:72`: draggable field rows with aggregate badge). **Not found:** weight-allocation meter, condition/rule-row builder, range (from–to) input |
| `ux/decisions/`, `ux/patterns/` | All | README only. No decisions |
| `history/`, `agent/context/` | "scor", "eligib", "criteria", "rule" | No prior scoring work. Live product nav (DCF-0001 I2) has **"Lead Eligibility Criteria"** under Sales: a likely sibling rule-builder (Q2) |
| `product-knowledge/*` | All | Nothing for scoring |
| **Rev 2 re-search** (D16 / D17), 2026-10-13: `docs/`, `experience-library/`, `ux/`, `history/`, `governance/` | AND/OR, condition group, rule builder, query builder, segmented, full screen, focus mode, app shell | **Precedent:** `docs/template-discovery.md` §B.1 **Advanced Filter Builder** (live Leads list): grouped AND/OR condition rows, nested groups, "+Add Row" / "+Group". Candidate pattern, not registered; `docs/golden-template-list-specification.md` treats it as a separate pattern the list template does not own. **No** full-screen / focus-mode layout precedent and **no** UX decision on hiding the app shell. `experience-library/patterns` and `catalog`: README only |
| **Rev 4 re-search** (D26), 2026-10-15: repo + FDS-101 | matrix, grid, pivot, threshold, reject, case by case, escalate, sanction, PEP | **Nothing** in `experience-library/`, `ux/`, `docs/`, `history/`. FDS-101 has no matrix / grid editor, threshold or range component (only Ticket Status Select, Deal Stage Select). Matrix editor and threshold-band row are gaps (§6) |
| **Rev 6 re-search** (D32 / I11), 2026-10-20: `experience-library/`, `ux/decisions/`, `ux/patterns/`, `agent/context/`, `history/`, Station `@fynxt/ui` + `@fynxt/templates` | escalat, raise, threshold, worst-of, highest wins, max | **Nothing reusable.** Closest precedents are this case's own override rules (R17–R19, R27 "at least band") and the v5 Toggle / Number Input / band Select already in the builder. Raise rules are composed from those (§6), no new component |
| **Rev 3 re-search** (D25), 2026-10-14: `docs/`, `experience-library/`, `ux/`, FDS-101 | override, exception, rule, if-then, condition | No override or exception pattern anywhere. Closest precedents: the **Advanced Filter Builder** condition rows (`docs/template-discovery.md` §B.1) and this case's own Applies-to rows. FDS-101 has no rule or if-then component; Select, Multi Select, Number Input and Badge compose a rule row |
| **Rev 2 re-search**: FDS-101 | segmented, button group, logic, condition, connector, operator, editor, page header, builder, card, accordion | **Button Group** `108:30` (Horizontal / Vertical × Connected / Separated): usable as the AND / OR switch. **Section Card** `359:61`, **Accordion** `76:27`, **Card** `74:46`: object groups. **Settings Page Header** `370:149` and **Builder Panel** `367:82` (GUNA): closest header / panel. **Not found:** a logic connector between groups, a condition-group container, a full-screen editor header or layout |

## 5. Page Plan

| Page | Class | Template (id@version) | Rationale | Menu location |
|---|---|---|---|---|
| P1 Scoring Builder (create / edit a scoring model) | **NEW-TEMPLATE** (candidate, DRAFT) | — (proposed "Weighted Scoring Model" builder) | No registered template fits. The page is object-agnostic, and Contact risk and Deal score are two configurations of it. CONFIG builders recur (`CAND-005`, live "Lead Eligibility Criteria"). Rev 2's grouped AND / OR logic also echoes the **Advanced Filter Builder** pattern (§4), which strengthens the case for CONFIG-builder discovery. A ONE-OFF would conflict with Station invariant 3 (C2). **Reviewer choice:** NEW-TEMPLATE vs ONE-OFF (Q2) | Opened from P2 (Create / Edit). Rev 2 proposes full screen without the app shell (C7, Q45) |
| P2 Scoring models list (create, open, activate, delete) | **IN SCOPE** (D3, D5); composition of FDS-101 / candidate components until a list template is registered | — (`FYNXT-TPL-LIST-002` is an unregistered pilot) | Table list per I4: toolbar, column-first table (D12–D15), status toggle, row actions, pagination. Lifecycle rules still open (Q3) | Settings › Brand Setup › Score Builder (D5), inside the app shell with the Side Nav Settings mode (D8, D13, D14) |
| P3 Score display on Contact / Deal records | **OUT OF SCOPE** | — | Consumer of the model. Not specified (Q12) | — |

### 5.1 P1 — Scoring Builder (rev 2)

- **Template configuration (proposed candidate surface):**
  - `model`: name, description (Q18), status (Q3)
  - `applicability[]`: model-level condition rows on the Details page (D22, answers Q46)
  - `objects[]` (one or more, I8; limits Q44): `{ object, attributeLogic: AND | OR, attributes[], overrides[] }`
  - `objectConnectors[]`: one `AND | OR` between each adjacent pair of objects (I8); precedence and default Q43
  - `attributes[]`: `{ field, weight, overrides[] }`; weights total 100 (BR1), across the model or per object (Q42)
  - `scoringMode`: `weighted` (I3) | `points` (I10) (Q57)
  - `attribute.kind`: `single` | `matrix { rowField, columnField }` (R22); `attribute.defaults[]`: `{ when: field · operator · value, category }` (R24)
  - `value.outcome`: `score` | `reject` | `refer` (R23); scores allow decimals (R25)
  - `bands[]`: `{ upTo, inclusive, label (free text), description (free text, optional) }`, e.g. ≤ 55 "Low Risk" · "Standard due diligence" (R26, R29)
  - **Rev 6 (D33): raise is an override, no separate model.** `overrides[].conditions` operands gain an attribute's **category** (`Contact › Country category`, values = the model's categories, operators `is` / `is any of`) and an object's **band** (`Deal band`, operator `reaches` = that band or higher); no score numbers are typed (D35). Operators are config (Q5). `overrides[].outcome.type` gains **`raise`** ("Raise to that score", raise only, BR8 / BR9): an attribute rule raises its object, an object rule raises the overall. Object → overall by band uses the existing `atLeastBand` (R27)
  - `overrides[]` (R17–R19, R27–R28): outcome `forceBand` | `atLeastBand` | `reject` | `refer` (| `setScore`), conditions in groups joined with AND / OR, operands = field value, attribute rating, numeric threshold (+ currency)
  - `overrides[]` (R17–R19, original): `{ conditions[]: { object, field, operator, value }, outcome: { type: band | score, value }, order }`. Conditions may name a related object (Q42); precedence Q52
  - `attribute.values[]`: `{ category: Low | Medium | High, match, score }`; `match` depends on field type (Q6)
  - `bands[]`: `{ from, to, label }` (Q10)
  - `categories`: Low / Medium / High (I1; configurability Q17)
  - `evaluate`: how the logic affects the score is **undefined (C9, Q41)**. The template must not hard-code a reading
  - `permissionCheck`, `dataAdapter` (required, as in DCF-0001)
- **Layout (FDI proposal for D17, designer decision Q45):** a full-screen workspace without the app shell (no side nav or top nav), opened from P2 Create / Edit. Three panes under a header:
  1. **Builder header** (full width): Back to Score Builder, editable model name + status badge, save state ("All changes saved" / "Unsaved changes", Q21), Cancel, Save. Closest FDS-101 part: Settings Page Header `370:149` (gap, §6).
  2. **Left: logic outline** (360px; refined by D20: steps 1 Model / 2 Objects & logic / 3 Result, collapsible object groups, compact attribute rows, weight edited in the editor). The model as a tree:
     - each object is a group: object name, an AND / OR switch ("Match **all** / **any** attributes", R14), and its attributes as Attribute List Items (weight, completion, D10);
     - between groups, an AND / OR connector switch (R15);
     - "+ Add attribute" per group, "+ Add object" at the end, then "Outcome bands".
     This is where the logic is read and edited.
  3. **Centre: editor** for the item selected in the outline:
     - an object: object select, "Applies to" conditions (Q46), attribute logic;
     - an attribute: its values table, Category · Value(s) · Score · Contribution (D10);
     - outcome bands: From · To · Label (R12).
  4. **Right: summary (minimal since D18, 280px; on demand since D31: hide / show, floating button when hidden):** logic in plain words and weights per object only. Preview and readiness list are deferred (Q48). Original rev-2 proposal, kept for later phases (~320px, sticky):
     - a plain-language readout of the logic, e.g. "Contact (Country AND Occupation AND Industry AND Income) OR Deal (Deal Stage OR Deal Value)";
     - weight total and "x% left";
     - a validation list whose items jump to the problem;
     - preview with sample values (D2). For one object the preview shows the I3 total and band. For several objects it shows matched values and per-attribute contributions, but **no total until Q41 is answered**.
  The D10 stepper is replaced by the outline sections (Details → Objects & attributes → Outcome bands) plus the readiness list, so "one thing at a time" (D4) still holds. If the designer keeps the modal (D1), the same outline fits the left side of D10's Step 2.
- **Rev 3 changes (D22–D25, FDI proposals for designer review):**
  - **Details page:** model name, description, then **Applies to** (model-level condition rows, D22) and a short collapsible "How scoring works" note (guidance).
  - **Overrides:** an "Override rules" card in both the attribute editor and the object editor. Each rule reads as a sentence: *If* [object] [field] [operator] [value] → *then* [Force band ▾ High Risk | Set score ▾ 100]. "+ Add override". Rows and groups with overrides show a small override marker in the outline, and the summary panel lists the number of overrides. Step 3 (Result) gets an **Overrides** list next to Outcome bands, showing every rule in evaluation order (order: Q52).
  - **Distribute evenly (D23):** a visible link next to each object's weight badge in the outline and next to the weight field, not only in the "⋯" menu. Rounding is Q36.
  - **Guidance (D24):** helper text under each section, an example under empty states (e.g. "Low · India, China · 10"), and a one-time "How scoring works" panel on Details.
  - **Live feedback (D24), client-side only so D18 still holds:** contribution per value row, running weight total with "x% left", logic readout, and inline validation as you type. A sample preview still needs an evaluation API and Q41, so it stays deferred (C11).
  - **Smoother interactions (D24):** add several attributes at once (checkbox menu), edit a weight inline by clicking it in the outline, drag to reorder (Q34), keyboard navigation in the outline, and Enter adds the next value row.
  - **Visible shortcuts (D24):** Distribute evenly, Duplicate attribute, "Add Low / Medium / High rows" preset (Q36), and Add override, all shown as visible actions instead of only in menus.
- **Rev 4 changes (D26 / I10, FDI proposals for designer review):**
  - **Details:** "Scoring method" choice: *Weighted* (score × weight, I3) or *Points* (points add up, I10); in Points mode the weight column shows each attribute's maximum points and the total cap (100).
  - **Attribute editor:**
    - an attribute can be **Single field** or **Matrix (two fields)**. A matrix shows a grid, Industry rows × Role columns, with a category + points chip per cell and bulk-fill per row ("set row to Low 10");
    - the value row's outcome column offers **Points / Reject / Refer to compliance**;
    - a **Defaults** card: "When Employment status is Unemployed, Retired or Student → Low".
  - **Outcome bands:** threshold rows read "Up to and including 55 → Low", "Above 55, up to 65 → Medium", "Above 65 → High", with live checks for gaps and overlaps.
  - **Override Rule Row:**
    - outcome choices: Force band / At least band / Reject / Refer to compliance (and Set score);
    - conditions can be grouped (AND / OR) and can test an attribute's rating ("Country rating is High"), any field, or a number with currency ("Annual income > 3,000,000 USD").
    The Result › Overrides list shows I10's nine rules as the worked sample.
  - **Test cases (later phase, needs an evaluation API, D18 / Q24):** I10's nine examples become the model's acceptance tests ("expected: MEDIUM").
- **Rev 5 changes (D27–D31, FDI proposals for designer review):**
  - **Base (D27):** the v3 flow (multi-object, Weighted by default) is the design of record. Rev 4 capabilities appear inside it:
    - Scoring method switch on Details;
    - Points / Reject / Refer outcome on value rows;
    - Single / Two-field toggle in the attribute editor;
    - Default rules;
    - threshold bands;
    - the five override outcomes.

    The v4 "Individual Client Risk" flow stays on the page as a worked reference, not a separate design.
  - **Outcome bands (D28):** each band row has an edge + threshold, a **label** (free-text input, e.g. "Low Risk"), a **description** (free-text area, optional, e.g. "Standard due diligence; review yearly") and a ⓘ that previews the tooltip. The description shows as an FDS-101 **Tooltip** on the band badge in the list's Outcome bands column, in override outcome menus, in the summary panel and on the scored record (P3, Q12).
  - **Summary panel on demand (D31):** open on launch (280px) with a "Hide summary" icon button in its header. When hidden, the editor widens and a **floating icon button** sits at the right edge with a small badge showing the issue count. Clicking it re-opens the panel. The choice is not remembered: visible on every launch (Q64). The floating button sits on the right side of the page with the issue count (Q65). Band descriptions: max 250 words (Q63).
  - **Left panel, more intuitive (D30):**
    - steps show progress (✓ done / number of issues) and are clickable;
    - each object explains its switch in words next to AND / OR ("All attributes must match" / "Any attribute can match"), with a tooltip;
    - the connector pill explains itself ("Both objects must match" / "Either can match");
    - each row has hover actions (Duplicate, Remove, drag handle);
    - incomplete items show an inline reason ("No values yet") and jump to it;
    - "Collapse all / Expand all" for many objects;
    - search attributes when there are more than 8;
    - empty groups show "Add the first attribute" with an example.
  - **Every interaction (D29), as clickable screens:**
    - **Create:**
      - Details: name, description, scoring method, Applies to add / edit / remove;
      - objects: add, join AND / OR, connector, collapse / expand, remove with confirm, Distribute evenly;
      - attributes: add several, single / two-field, values add / edit / remove, value dropdown, category, score or points, Reject / Refer outcome, weight inline edit, duplicate, remove with confirm, reorder, default rule;
      - overrides: attribute / object, conditions with AND / OR, outcome types, edit, delete, reorder;
      - bands: label, description, tooltip, threshold, add / remove;
      - save: saving and success.
    - **Edit / delete / list:**
      - open from a row;
      - row menu: Edit, Duplicate, Delete (Q32);
      - duplicate creates "<Name>_copy(n)" (Q67; status still open);
      - delete with confirm, then toast and the row is removed (Q66);
      - Active toggle with confirm (Q3);
      - Status / Object filter chips, search, no results, pagination.
    - **Errors and edge cases:**
      - validation: empty name, weights ≠ 100, attribute without values, connector or join not set, band gap / overlap, override missing outcome;
      - save failure with Retry;
      - discard changes;
      - list loading and empty; builder loading;
      - model not found;
      - deleting an object or attribute that overrides refer to (warning).
- **Rev 6 changes (D32 / I11, reworked by D33): raise is part of override rules**
  - **Why (D33, Aman Bansal):** raise is a product capability, not a one-off feature, so it lives in the same override rule builder as Force band, Set score, Reject and Refer. The separate raise cards, the ⬆ marker and the "Raise rules" group from the first rev 6 build were removed.
  - **If (conditions):** the Field menu of an override's If row has two groups: **Fields** (as before) and **Categories & bands**: the attribute's **category** (Country category: *is* / *is any of* Low / Medium / High) and the object's **band** (Contact band / Deal band: *reaches* + band). Admins pick from lists and never type a score (D35); the category test matches I10's "rated as high risk" (R28).
  - **Then (outcomes):** the outcome list gains **Raise to that score** (no value field: it uses the matched score, only if higher, BR8 / BR9). Object → overall by band uses the existing **At least band**.
  - **Examples:**
    - attribute → object (BR8): "If Contact · Country category · is · High → Raise to that score" (Contact takes the matched value's score, e.g. Pakistan 90, when higher);
    - object → overall by band (BR9): "If Deal · Deal band · reaches · High Risk → At least band · High Risk";
    - object → overall by score: "If Deal · Deal band · reaches · High Risk → Raise to that score" (the overall takes Deal's score when higher).
  - **Live hint** under the rule (client-side, from entered values):
    - "Contact takes Country's score when it is higher · High = Pakistan, Japan (90)";
    - warning "No Country value is in High yet, so this rule never triggers";
    - "The overall result is at least High Risk whenever Deal reaches High Risk";
    - error "The band … was deleted. Choose a band".
  - **Result › Overrides:** one ordered list. Raise rules are checked first, then the others in list order (Q78); helper text says so.
  - **Outline and summary:** the existing ⚡ override marker covers raise rules. Summary: "4 override rules can replace or raise the result".
  - Weighted mode only until Q77; Q79 still open.
- **Why full screen (FDI rationale, not a decision):** with several objects, two levels of logic, values tables and a preview, the 1080px modal (Q30) can show only one of these at a time. Full screen keeps the logic, the editor and the result in view together, which is what makes the builder "useful" (I8). Hiding the app shell is new for FYNXT: no template or UX decision covers it (§4). If approved it is recorded as a **candidate layout pattern** ("focus mode"), not a standard.
- **Interactions:**
  - Add object → choose object → its fields load. The default connector for a new object is not specified (Q43); the switch shows no default until it is.
  - Switching AND / OR on an object (R14) or a connector (R15) updates the readout live.
  - Removing an object asks for confirmation when it has attributes. Changing an object's type clears its attributes after confirmation (rev 1).
  - Adding the same object twice: Q44.
  - The weight total updates live; its scope follows Q42.
  - Selecting an outline item opens it in the editor; arrow keys move through the outline.
  - Save is blocked until the rules pass (BR1; Q7–Q11, Q41–Q43).
- **States:**
  - **new:** no object yet
  - **one object:** behaves as I3
  - **several objects:** mixed connectors
  - **editing / loading:** an existing model
  - **validation:**
    - weights ≠ 100 (scope Q42)
    - object with no attributes
    - attribute with no values
    - value without score
    - connector not set (if there is no default, Q43)
    - band gap or overlap (Q10)
    - range overlap (C3)
  - **preview without total** (multi-object, until Q41)
  - **saving**, **save error**, **saved**, **not found**
  - **read-only / no permission** (Q15)
  - **unsaved-changes prompt** on Back / Cancel (Q21)
- **Responsive:** desktop admin use. Below ~1280px the right summary collapses into a drawer; below 800px the outline becomes a select (proposal; there are no breakpoint tokens, §8).
- **Accessibility:**
  - The outline is a tree (`role="tree"`).
  - Each AND / OR switch is a radio group with a label such as "Join Contact attributes with".
  - The readout and weight total are in live regions.
  - Rev-1 items still apply: headed regions, table captions, linked inline errors, keyboard add / remove with focus on the new row.
- **Data needed:**
  - objects, their fields (type, options) and **relationships between objects** (Q42)
  - model CRUD
  - optionally, evaluation of a sample record for Preview

  API unknown (Q4, Q24).

### 5.2 P1 — Version 2: one-page builder (rev 7, D36, I12) — FDI proposal for designer review

Version 1 (§5.1, rev 6) stays as built. Version 2 keeps P1's full-screen builder header (Back, model name, save state, Cancel / Save) and the on-demand summary panel (D31), and replaces the left outline + centre editor with **one scrolling page of cards**, in I12's order:
1. **Details card:** Scoring name · Description on one row (I12 shows them side by side).
2. **Score settings card:** an editable table Band · From · To, one row per band (Low 0–55, Medium 56–65, High 66 → "and above"). The **Restricted** row has no range and stands for the Reject outcome (R35, Q88); the label and description of each band (D28) open from the row. Edges read "above 55 up to 65" so decimal totals never fall in a gap (Q82); live checks for gaps and overlaps stay (rev 4).
3. **Objects card:** one tab per object (Contact · Lead · + Add object), with the AND / OR connector between objects shown between tabs (R15). Under the tabs, the model's **Applies to** conditions (model level, D22 / Q83) as the existing condition builder: AND / OR · + Add rule · + Add group (I12's chips "First Name · Last Name · Email Id" read as the conditions' fields).
4. **Attribute table** for the selected object, grouped by column: **Column** (spans its rows) · **Weightage %** (required, R36; totals 100 per BR1) · **Category** · **Value** (multi-value; two-field values for a matrix column, R39) · **Score** (points, decimals, or Reject / Refer). Actions: + Add value row under each column, + Add column, Distribute evenly, running weight total with "x% left". The AND / OR between a column and the next (R14) stays as a header switch "Match all / any columns".
5. **Override card** with a **toggle** in its header that turns overrides on or off for the entire score (R37). Rules as one line each (R38): Column ▾ · Category ▾ · Score **Regardless / Lower** ▾ · Override **Band** ▾, + Add override, drag to order. The rev 6 advanced options (object band conditions, Raise to that score, Reject / Refer outcomes) open from the line's "More" menu so nothing is lost.
6. **Worked example (I12 right side):** proposed as an optional "Try with sample records" panel listing per-column contributions and the total for one or more sample people (Aman 11.25, Gaja 12.5 with I12's numbers). **Not in Version 2** (Q85); the example stays an explanation of score × weight.
- **States and interactions:** the rev 5 inventory (create, edit / delete / list, errors and edge cases) carries over card by card; new ones: Restricted band without range, weights not totalling 100, override toggle off (score without overrides), two objects with different conditions.
- **Look (D39, I13):** Version 2 follows the Data Filters builder (Advanced Filter Builder precedent) at full screen: a flat page with sections split by dividers, no cards. Objects use **+ Add object** (popover with search) and line tabs with ×. With no object there is a "No object selected" empty state. Applies to is a condition tree: AND ▾, Column* / Condition* / Value* rows, + Add Row / + Group, nested groups, Clear All. Removing an object asks for confirmation; Cancel with changes asks to discard.
- **P2 list:** both layouts stay (Q86); the list shows which layout a model uses, and Create asks for the layout only if both are enabled for the tenant (FDI proposal).

### 5.3 Version 3: Version 1 builder with the Data Filter concept, one object, shared bands (rev 8, D40) — FDI proposal for designer review

1. **P2 list:** the toolbar's **⋮ menu** above the table (next to Create score model) gets **"Band settings"**. It opens a **right side panel** in the I15 look: title "Band settings", one-line subtitle, close ×; a collapsible bordered section **"Band categories"** with a table (caps header row, inputs in every row, red remove icon, **+ Band** link button under the table); footer Cancel / Save. The table is **Band name · Above · Up to · Description (Optional)**, one row per category: Low (0 up to 55), Medium (above 55 up to 65), High (above 65), Restricted (no range, outcome Reject). Live checks for gaps / overlaps (rev 4). Footer Cancel / Save. A note says the bands are used by every score model. Values shown are I12's samples; the real defaults are tenant data (Q93). The list's Object column stays.
2. **Create:** Details asks for **Scoring name, Description and Object** (one object, R40). Whether the object can change after the first save is Q90.
3. **Builder (Version 1 layout):**
   - **Outline (left):** Step 1 · Model: *Details & object*. Step 2 · Logic: *Applies to* (rule count), the object's **columns** with weight (Country 40%, Industry+Occupation 20%…), + Add column, Distribute evenly, "Columns must AND / OR" (R14). Step 3 · Result: *Overrides* (on / off). *Bands* appears as a read-only line "Shared · Low / Medium / High" that opens the band settings panel; there is no per-model bands editor.
   - **Editor (centre):** *Applies to* is the Data Filter tree (I13). A column shows the Version 1 attribute editor: weight (required) and Category · Value(s) · Score rows (points, decimals, Reject / Refer), + Add value. *Overrides* shows the toggle and the one-line rules [Column] [Category] Score [Regardless / Lower] Override [Band] (R37, R38), bands taken from the shared settings.
   - **Summary (right, D31):** object, column logic, weights total, overrides on / off, shared bands.
4. **States:** list with ⋮ menu open; band settings panel (default, editing, gap / overlap error, save failed); new model (object not chosen); Applies to empty and filled with a nested group; column editor; weights ≠ 100; overrides off; unsaved changes; plus the Version 1 list states.
5. **Removed in Version 3:** Add object, object connectors, the outcome-bands step and C26 / Q89 (with one object, the model's rules are the object's rules).

## 6. Component Plan

Code status refers to `@fynxt/ui` 0.2.0 on the unmerged DCF-0001 branch (Q22).

| Component | Class | Library ref | Change | Version impact | Used by |
|---|---|---|---|---|---|
| Button, IconButton, TextField, TextArea, Select, MultiSelect, Chip, Badge, Card, Alert, Tooltip, Modal / ConfirmDialog, Menu, EmptyState | EXISTING | `@fynxt/ui` 0.2.0 | — | none | P1 |
| AppShell / SideNav / TopNav | EXISTING (DCF-0001 candidates) | `@fynxt/ui` 0.2.0 | — | none | P2 shell. P1 too, unless full screen is approved (Q45) |
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
| Stepper Step | NEW-COMPONENT (candidate) | work file `43:6900` | 3-step use since D10. Rev 2: replaced by the logic outline if Q45 is approved | new | P1 |
| Table Header Cell · Table Cell (**SUPERSEDED by D12**) · Table Toolbar · Table Pagination | NEW-COMPONENT (candidate) | work file `51:10181`, `51:10204`, `51:10205`, `51:10250` | D9, per I4 | new (to port to FDS-101, Q37) | P2 |
| Attribute List Item (State Default/Selected × Status Complete/Incomplete) | NEW-COMPONENT (candidate) | work file `54:11894` | D10 master list | new | P1 Step 2 |
| Data Table Header · Data Table Cell | EXISTING (FDS-101 `522:11885`, `522:11918`, ported by designer after D12; local `58:12796` / `60:13217` superseded) | FDS-101 | — | none | P2 via Data Table Column |
| Data Table Column | NEW-COMPONENT (candidate; built from FDS-101 `522:*`) | work file `61:15527` | D12, per I7; column-first build | new (to port to FDS-101 replacing `316:3435` / `314:2978` / `429:5365`, Q38) | Tables (specimen `62:15167`; P2 pending Q38c) |
| Settings Nav | **SUPERSEDED** by Side Nav Mode=Settings (D8) | work file `44:7057` | — | — | — |
| Button Group (Connected, 2 options) as the AND / OR switch | EXISTING | FDS-101 `108:30` | Configure labels AND / OR | none | Object attribute logic (R14), object connectors (R15) |
| Logic Switch (AND / OR / Unset) | NEW-COMPONENT (candidate) | work file `72:17580`, built on FDS-101 Button Group `108:30` | Rev 2 | new | Object attribute logic, connectors |
| Outline Attribute Row (State Default / Hover / Selected × Status Complete / Incomplete; Name, Weight) | NEW-COMPONENT (candidate) | work file `80:18985` | D20; replaces Attribute List Item `54:11894` in the outline | new | Logic outline |
| Logic Connector (AND / OR between object groups) | NEW-COMPONENT (candidate) | work file `72:17611` | Rev 2 | new | Logic outline |
| Object Group (outline block) | Header = NEW-COMPONENT candidate **Object Group Header** `72:17662` (D20: + Expanded axis, chevron, weight-total badge); group card composed in frames | Section Card `359:61` or Accordion `76:27` + Attribute List Item `54:11894` + Button Group `108:30` | Proposal: NEW-COMPONENT candidate if the outline is approved | new | Logic outline |
| Builder header (full screen) | NEW-COMPONENT candidate **Builder Header** `72:17730` (was a gap) | Settings Page Header `370:149` is closest (breadcrumb, title, Cancel / Save) but is designed for inside the app shell | Proposal: VARIANT of Settings Page Header or NEW-COMPONENT, after Q45 | TBD | P1 |
| Logic readout / summary panel | composite | Text, Badge, Alert | Template-level composition | — | P1 summary |
| Override Rule Row (If … then Force band / Set score) | NEW-COMPONENT candidate **`120:28502`** (Outcome = Force band / Set score); **rev 4 VARIANTS built**: Outcome = Force band / Set score / At least band / Reject / Refer to compliance. Multi-condition (AND / OR) rules are composed in frames (P10) | Built from FDS-101 Select, Number Input, IconButton | Rev 3 → rev 4 | new | Attribute and object editors, Result › Overrides |
| Override marker (outline) | VARIANT: boolean **Override** (FDS-101 icon/zap) added to Outline Attribute Row `80:18985` and Object Group Header `72:17662` | FDS-101 icon/zap | Rev 3 | candidate | Outline rows and group headers |
| Matrix score editor (rows × columns, category + points per cell, row bulk-fill) | **gap**: NEW-COMPONENT candidate | Compose from FDS-101 Data Table Header / Cell (`522:`*), Select, Number Input | Rev 4, Figma first | new | Matrix attributes (R22) |
| Threshold band row ("Up to and including [55] → [Low]") | **gap**: composite | Select (edge: up to and including / above) + Number Input + Input | Rev 4 | — | Outcome bands (R26) |
| Value outcome select (Points / Reject / Refer) | EXISTING | FDS-101 Select | Configure | none | Value rows (R23) |
| Scoring method switch (Weighted / Points) | EXISTING | FDS-101 Button Group `108:30` (as Logic Switch) | Configure | none | Details (R21) |
| Tooltip (band description, AND / OR and connector explanations) | EXISTING | FDS-101 Tooltip `66:39` (`Text`) | Configure | none | Bands, outline, list, summary (R29, D30) |
| Band row with label + description | composite | FDS-101 Select (edge) + Number Input + Input (label) + Textarea (description) + IconButton | Rev 5 | — | Outcome bands (R26, R29) |
| Floating summary button | composite | FDS-101 IconButton + Badge (issue count), elevation style `91ffc50b…`; position fixed to the right edge (**OBSERVED** offset) | Rev 5 | — | Builder when the summary is hidden (R30) |
| Override Rule Row · **Outcome = Raise to that score** | VARIANT candidate (rev 6, D33) on `120:28502` (variant `356:21696`): Outcome type "Raise to that score", no outcome value, Operator 136px | Built from the Set score variant (FDS-101 Select, Icon Button); score values use FDS-101 Number Input as a nested swap | Figma done; code at build | candidate | Attribute and object override rules (R31, R32) |
| Override condition **Categories & bands** group (attribute category, object band; D35 replaced the score tests) | composite (rev 6, D33 / D35) | FDS-101 Dropdown Menu pattern (Menu title + Menu Item), as frame 17 | Field menu content, no new component | — | Override If row |
| Checkbox menu (add several attributes) | composite | FDS-101 Checkbox `77a5ea5a…` + Menu Item `344:15` styling | Rev 3 | — | Add attribute |
| Report Builder field rows (`367:81` etc.) | **considered, not selected** | FDS-101 GUNA | Drag-to-add field list; fits "pick attributes" but has no weight / value editing. Designer may prefer it (Q23) | — | — |

### 6.v2 Version 2 components (rev 7)

| Need | Class | Ref | Note |
|---|---|---|---|
| Score settings table, attribute table | EXISTING + **VARIANT** | `@fynxt/ui` DataTable (editable cells already used by DCF-0005 D8) | Attribute table needs **row grouping** (Column spanning its value rows): a DataTable `groupBy` / rowspan VARIANT, or group header rows. FDS-101 Data Table has no grouped rows (gap) |
| Object tabs with connectors | EXISTING | Tabs (secondary) + SegmentedControl (AND / OR) | Composition |
| Conditions | EXISTING | ConditionBuilder | Unchanged |
| Override card toggle | EXISTING | FDS-101 Setting Row / Toggle (`@fynxt/ui` SettingRow from DCF-0005) | — |
| Override line | EXISTING candidate | Override Rule Row (rev 6) | New compact "line" layout variant: Column · Category · Regardless / Lower · Band |
| Weightage cell | EXISTING | NumberField with % suffix | Required (Q81) |
| Sample-record preview | NEW (deferred) | — | Only if Q85 brings it into Version 2 |

### 6.v3 Version 3 components (rev 8)

| Need | Class | Ref | Note |
|---|---|---|---|
| Builder shell, outline, summary | EXISTING candidates | Builder Header, Sidebar Nav Item, Outline Attribute Row, summary panel (Version 1) | Reused |
| ⋮ menu above the table | EXISTING | FDS-101 Icon Button + Menu | "Band settings" item |
| Band settings side panel | EXISTING (to confirm) | FDS-101 sheet / drawer if one exists; else composition | Checked at `/fdi-figma`; a missing drawer is raised, not invented |
| Band table | EXISTING | Version 2 Score settings table (Input, Number Input, Badge) | Moved from the builder to the panel |
| Applies-to tree | EXISTING composition | Version 2 rev 7.1 tree (`416:111151`): Select, Multi Select, Button, Icon Button, dashed rails | Same candidate as the Advanced Filter Builder pattern (§4) |
| Object select on Details | EXISTING | FDS-101 Select | Required |

## 7. Template Changes (EXTEND / NEW-TEMPLATE only)

**Rev 8 (D40):** Version 3 is proposed as a third additive layout option of the same candidate (`layout: "outline" | "one-page" | "outline-single-object"` or an `objectMode: "single"` flag with shared bands), MINOR. Shared bands need a tenant-level settings adapter (new surface, Q91–Q92). To confirm at build.

**Rev 7 (D36):** Version 1 is `CAND-DCF-0002-score-builder@0.1.0` on `fdi/DCF-0002-scoring-builder` (`6b9fd15`) and is kept as is. **Decided (Q86, Aman Bansal 2026-10-21): both stay.** Version 2 is an **additive layout option** of the same candidate (`layout: "outline" | "one-page"`, MINOR); Version 1 configs keep working, as DCF-0005 extended DCF-0003.

P1 is a **NEW-TEMPLATE candidate** (DRAFT, not created): a "weighted scoring model" builder with the configuration surface in §5.1. It is not an extension of anything registered. Relationship to `CAND-005` (pipeline builder): both are CONFIG builders. The designer may prefer to run CONFIG-pattern discovery first (Q2). No shared template is modified, so no `/fdi-impact` is needed.

Rev 2 adds `objects[]`, `attributeLogic` and `objectConnectors[]` to the candidate surface (§5.1) and leaves `evaluate` undefined until Q41. If the full-screen layout is approved (Q45), the template also owns its own header in place of the app shell. That is a candidate layout pattern, not a change to the App Shell candidate.

### 7.2 Rev 8 impact report (`/fdi-impact`, 2026-10-21): ConditionBuilder VARIANT and template MINOR

| Artifact | Change | Consumers (all Station branches) | Impact |
|---|---|---|---|
| `@fynxt/ui` ConditionBuilder (DCF-0003 candidate) | **VARIANT, additive props:** `fixedObject` (hide the Object select; new rules use that object), `copy` (AND / OR, "Add Row", "Group", "Clear All", "Column", group label), `clearAllPlacement`, `requiredLabels`, `valueMaxChips`. Defaults unchanged | `CAND-DCF-0003-incentive-programs/ProgramEditor.tsx` (DCF-0003, DCF-0005 branches); DCF-0002 `SingleObject.tsx` (new) | **None for existing consumers:** no prop given = DCF-0003 behaviour; DCF-0003 tests pass unchanged (20 ConditionBuilder tests incl. 2 new). Not breaking, MINOR |
| `CAND-DCF-0002-score-builder` 0.1.0 → **0.2.0** | Additive `singleObject` config (Version 3), `ValueRow.outcome`, `ScoreModelInput.overridesEnabled`, `ScoreAction "editBands"`, `SharedBand` / `SharedBandsAdapter` types, `AttributePicker noun` | Gallery `settings.brand-setup.score-builder` (Version 1) and new `…-v3` | Version 1 config unchanged; its 16 tests pass. MINOR |

### 7.1 Stage 3 impact report (`/fdi-impact`, 2026-10-15)

Branch `fdi/DCF-0002-scoring-builder`, stacked on `studio/gallery-change-requests` (which contains DCF-0001 and DCF-0003). It is the only branch with `apps/studio/gallery/pages.json`.

| Changed | Kind | Consumers | Effect |
|---|---|---|---|
| `@fynxt/ui` SideNav: optional `settings`, `user`, `mode` / `onModeChange`; `data-mode` attribute | VARIANT of DCF-0001 candidate (additive, MINOR) | DCF-0001 ActivityWorkspace (tasks page), DCF-0003 IncentivePrograms (incentive-programs page), DCF-0002 | None for existing pages: without the new props it renders as before (DCF-0001 / DCF-0003 tests unchanged and passing). New CSS scoped to new class names |
| `@fynxt/ui` MultiSelect: optional `hideLabel` | VARIANT (additive, MINOR) | DCF-0001 FormDialog, ConditionBuilder, DCF-0002 | None: default shows the label as before |
| `@fynxt/ui` ConditionBuilder: optional `emptyDescription` | VARIANT of DCF-0003 candidate (additive, MINOR) | DCF-0003 ProgramEditor, DCF-0002 | None: default is the DCF-0003 text |
| `@fynxt/ui` new: `SegmentedControl` (FDS-101 Button Group 108:30 / Logic Switch 72:17580), `OutlineRow` (candidate 80:18985), `Toggle` (FDS-101 53:49) | NEW-COMPONENT | DCF-0002 template only | New. `styles.css` gains 3 imports |
| `@fynxt/templates` new `CAND-DCF-0002-score-builder` (DRAFT); `CANDIDATE_IDS` lists it; status type named `ScoreStatusConfig` to avoid clashing with DCF-0003 | NEW-TEMPLATE candidate | gallery page `settings.brand-setup.score-builder` | New |

**Design-parity pass (2026-10-15, commit `c55c068`), after the designer noted the build was "not 100% same as design":**

| Changed | Kind | Consumers | Effect |
|---|---|---|---|
| `@fynxt/ui` Field: input / select / textarea / number box fill `surface/input` → `surface/card` | FIX (align to FDS-101 bindings: Input, Select, Textarea, Number Input InputBox = `surface/card`) | **DCF-0001** FormDialog (Add / Edit Task), **DCF-0003** ProgramEditor, DCF-0002 | **Visible:** fields turn white with the same border. Checked in Chrome on the DCF-0001 Add Task form. Revert is one line if the designer prefers grey |
| `@fynxt/ui` MultiSelect: box `surface/input` → `surface/background`, chips use Chip / Selection fill (`border/light`, no stroke) | FIX (FDS-101 Multi Select) | DCF-0001 FormDialog, DCF-0002 | **Visible:** slightly lighter box, borderless chips |
| `@fynxt/ui` MultiSelect `maxChips`, DataTable column `headerAction`, Menu `heading` + item `trailing`, TopNav `titleAdornment` | VARIANT (additive) | DCF-0002 only | None for existing pages (all optional). Tests added |
| `@fynxt/ui` DataTable cell padding-block 8 → 4 | FIX (two-line Values cell fits the 44px row) | DCF-0002, DCF-0003 (if used) | Single-line rows unchanged (44px minimum) |
| `@fynxt/ui` SideNav Settings mode: Regular item text (Medium when active), chevron back, unruled child indent | VARIANT styling (scoped to `data-mode="settings"`) | DCF-0002 only | None for DCF-0001 / DCF-0003 (main mode untouched) |

**Rev 6 build (2026-10-20, commit `6b9fd15`):**

| Changed | Kind | Consumers | Effect |
|---|---|---|---|
| `@fynxt/ui` Select: optional `group` on options renders `<optgroup>` | VARIANT (additive) | DCF-0001 FormDialog, DCF-0003 ProgramEditor, ConditionBuilder, DCF-0002 | None for existing pages: no option sets `group`. Test added |
| `@fynxt/templates` CAND-DCF-0002: outcome `raise`, config `categoryOperators` / `bandOperators` (required), condition schema with category / band fields, rule hints | NEW-TEMPLATE candidate change (config shape grows) | Gallery page `settings.brand-setup.score-builder` only | Config updated in the same commit |

Recommended version bump at `/fdi-publish`: `@fynxt/ui` 0.2.0 → 0.3.0 and `@fynxt/templates` 0.1.0 → 0.2.0 (MINOR, no breaking change). Earlier cases left the bump and changelog to publish, and this case does the same.

**Built as template composition, not `@fynxt/ui` components:** Object Group Header (72:17662), Logic Connector (72:17611), Builder Header (72:17730), Override Rule Row (120:28502). They are specific to the builder and have one consumer, so they live in the template, as DCF-0003's editor header does. Promote them to `@fynxt/ui` if a second consumer appears.

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
| C7 | D1: builder "as a modal popup form", kept by D4 (stepper modal) and D10 (3-step modal, 1080px) | I8 / D17: "if required lets make it as full screen score builder with out app shell" | Same designer, later and conditional instruction | **Open:** FDI recommends full screen (§5.1). Designer decides (Q45) |
| C8 | I1 "selecting an object"; I3 "Selected Object is Contact / Deal" (one object per model) | I8 / D16: "two or more Object selection" | Same requester, later instruction. I8 extends I1 rather than contradicting it (a one-object model stays valid) | **Applied** as R1. Rule ownership is still Q1 |
| C9 | BR2 (I1, I3): total = Σ (value score × weight), purely additive | I8 / D16: AND / OR between attributes and between objects | No. No source says how a logical operator changes an additive score | **Open** → Q41. Rev 2 designs the logic structure only, no calculation |
| C10 | D2: include the preview / test panel | D18: summary panel "very minimal" because the backend cannot deliver everything at once | Same designer, later instruction | **Applied as deferral:** preview and readiness list removed from phase 1, kept in §5.1 for later. Confirm in Q48 |
| C11 | D18: summary "very minimal" because the backend cannot deliver everything at once | D24: "live feedback" | Same designer. Not a contradiction if the feedback is computed in the browser | **Proposed:** client-side feedback only (contributions, totals, readout, validation); the sample preview stays deferred until an evaluation API exists (Q24) and Q41 is answered. Confirm in Q51 |
| C12 | BR2 (I1, I3): the total is the sum of contributions and is mapped to a band | D25 / I9: an override can force a band or set a score regardless of the sum | Not a contradiction: the override is a later step on top of BR2 | **Applied** as BR6. The rule comes from the Product Designer; PM ownership confirmation is still Q1 |
| C13 | I1 + I3: contribution = value score × attribute weight; weights total 100 | I10: points are added directly (Country max 40, Industry 20, SOF 20, Product 10, Delivery 10; max total 100) | No. The two are equivalent when a value's score = points ÷ max points × 100 (e.g. Country Medium 30 → 75 at weight 40), but admins think in points | **Open** → Q57 (support both modes, or points only?) |
| C14 | I10 p2: "Non face to face – through IB" = Medium **7.5** | I10 p4 example 4: "through IB" scored **10 (Medium)**, total 65 | No (inside one source) | **Open**: source error; total should be 62.5, still MEDIUM. Fix before using as a test case (Q62) |
| C15 | I10 p5 example 8 parts: 20 + 10 + 15 + 5 + 10 | Printed total **65** | No | **Open**: parts sum to **60**, result still MEDIUM. Fix before using as a test case (Q62) |
| C16 | I10 p2 Product Risk lists only Low (5) values | I10 p3 overview lists Product Medium 7.5 / High 10 | No | **Open**: sample gap; not a builder issue |
| C17 | R5 / §5.1: one attribute = one field with values | I10: Industry score depends on industry **and** role | Not a contradiction; R22 extends the model | **Applied** as R22 (matrix attribute) |
| C18 | D18: summary panel "very minimal" (client-side only) | D31: panel shown on launch, hide / show, floating button | Not a contradiction: D31 changes visibility, not content | **Applied:** content stays as D18; only visibility becomes user-controlled |
| C19 | v5 frames 03–05: "Applies to" shows a required asterisk (*) | Same frames: empty-state copy "No conditions yet, so every record of the selected objects is scored" (conditions optional) | Unresolved: not a business rule FDI can settle | **Built as drawn:** asterisk shown, conditions **not** enforced (empty = all records). Designer to confirm (Q73) |
| C20 | BR8: the object takes the attribute's **score** | R21 points mode: an attribute's points are only its share of the total (e.g. Country max 40 of 100), so "attribute score as the object score" would compare unlike numbers | No: both from approved sources | **Open (Q77).** Design shows raise rules in weighted mode only until answered |
| C21 | Rev 6 first build: Object Group Header shows both ⚡ and ⬆ markers | v5 header layout | — | **Withdrawn (D33):** the ⬆ marker and the Raise property were removed; header Meta restored to its v5 behaviour |
| C22 | Approved V6-05 copy: "Test a field, Deal's score or Deal's band" | D35: conditions test categories and bands, not scores | No | **Built as approved**; designer to drop "Deal's score" from the copy if D35 applies |
| C23 | I12 attribute table: Country scores 20 / 30 / 40 | I12 worked example: country 10 / 15 / 20 (and Industry, Fund the same) | Not a rule conflict: both are sample values (BR7). Noted so nobody copies the example's numbers as configuration | Recorded |
| C24 | I12 Score settings: Medium 56–65, High 66 (integer edges) | R25 decimals (7.5, 2.5, 3.75) and I10 "over 55 but ≤ 65": a total of 55.5 falls between Low (≤ 55) and Medium (≥ 56) | **Resolved** by Q82 (Aman Bansal 2026-10-21): above 55 up to 65 is Medium |
| C25 | I12: conditions (AND, + Add rule, + Add group) appear under the objects | D22 (Aman Bansal, 2026-10-14): Applies to is **model level, on the Details page** | **Resolved** by Q83 (Aman Bansal 2026-10-21): model-level Applies to, shown under Objects |
| C26 | I13: the condition tree sits under the object tabs, so it reads as **per-object** filters (each tab has its own groups) | Q83 (Aman Bansal 2026-10-21): Applies to is **model level** | **Open for Version 2** (Q89); does not arise in Version 3 (one object, R40). Built as model level per Q83, labelled "Applies to · whole model", placed under the tabs as I12 / I13 show. Not resolved silently |
| C27 | R41 (Version 3): bands are shared by every model | R29 / D28 and Version 1 / 2: each model has its own outcome bands with label and description | **Resolved** by Q94 (Aman Bansal 2026-10-21): Version 3 only, per D40; Version 1 and 2 keep per-model bands unless Q94 says otherwise |

## 10. Open Questions / Missing Information

| # | Question | Blocks | Owner | Answer |
|---|---|---|---|---|
| Q1 | Who owns the scoring rules (PM)? Is I1 + I2/I3 the agreed spec, or is a PRD/FRD/Jira ticket coming? | Approval | Product Manager | |
| Q2 | P1 class: NEW-TEMPLATE candidate ("weighted scoring model") or ONE-OFF (see C2)? Run CONFIG-builder discovery with `CAND-005` and "Lead Eligibility Criteria" first? | §5, §7 | Product Designer | |
| Q3 | Is a **models list** in scope (create, open, duplicate, delete)? Can an object have several active models? Draft / active status, versioning? | P2, Toggle | PM + Product Designer | Partly answered by D3/D5: list page in scope (table, status toggle, actions, pagination). Lifecycle rules still open |
| Q4 | Which objects are scoreable (Contact, Deal, others)? Where do object fields, field types and options come from (metadata API)? | P1 | PM / Developer | |
| Q5 | Applicability (pre-requisites): which fields, which operators (=, in, not in, is active…), and AND / OR? Is "all active Deals" a condition or the default? | P1 | PM / BA | |
| Q6 | Value matching per field type (C1): option lists, numeric ranges (inclusive / exclusive, open-ended "and above"), text (exact / contains?), dates, multi-select fields | P1 | PM / BA | |
| Q7 | Value score range: 0–100? Integers or decimals? Must Low < Medium < High in score, or is the category only a label? | P1 validation | PM | Partly answered by I10 (sample): decimals are used (7.5); points per category are not 0–100 but up to the attribute's maximum (R21). Category follows points order in I10 (Low < Medium < High) |
| Q8 | If a record's value matches no row, or the field is empty: does that attribute contribute 0, or is the weight redistributed? | Formula | PM | I10 shows a default rule for some values (R24); behaviour for any other missing value is still open |
| Q9 | Can the same option or range appear in two value rows? Should overlaps be blocked (C3)? | Validation | PM | |
| Q10 | Outcome bands: always three? Labels per model (yes per I3)? Inclusive edges, decimals between bands (C3), must they cover 0–100 with no gaps? | P1 | PM | Partly answered by I10: thresholds with explicit edges, "55 or less" / "over 55 but ≤ 65" / "over 65" (R26). Band count 3 in I10; whether always three is still open |
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
| Q23 | Layout: attribute blocks as accordion cards, master-detail (attribute list + value table), or Report-Builder-style field picker? Category as select or segmented control? | Figma | Product Designer | Answered by D4: stepper modal, one attribute at a time; then D10 master–detail. Rev 2 proposes a logic outline in a full-screen layout (Q45) |
| Q24 | API: model CRUD, evaluation endpoint for preview, object metadata | Stage 3 | Developer | |
| Q25 | Limits: maximum attributes per model, values per attribute | P1 | PM | |
| Q26 | FDS-101 **Table Search Field** is not in the published library (import fails), so the P2 search uses the Input component with a leading search icon. Publish it? | P2 | Product Designer (FDS-101 owner) | |
| Q27 | FDS-101 Select / Input / Multi Select reserve label and helper space even when hidden (instances are 80px tall); inside tables FDI resized them to the 40px box. Add a "no label" / table variant? | P1 rows | Product Designer | |
| Q28 | The candidate Side Nav (DCF-0001) has **no Settings / Admin item**, so nothing is highlighted on the Scoring page. Where does Scoring sit in the menu (see Q16)? | Shell | PM + Product Designer | Resolved by D5/D7: page lives in the Settings module; rail shows Settings active |
| Q29 | Brand Setup's other child items are not known (only the new "Score Builder" is shown under it) | Settings Nav | PM | |
| Q30 | The builder modal is 1080px wide since D10 (master–detail; was 900, I5/I6 are ~900); FDS-101 Form Modal sizes are 400 / 560 / 720. Add an XL size (OBSERVED until then)? | P1 | Product Designer | Rev 2: moot if the full-screen builder is approved (Q45) |
| Q31 | Should the expanded Side Nav also have a Settings item (C6)? | Shell | Product Designer | |
| Q32 | Row actions in the list: which (Edit, Duplicate, Delete, View audit)? Rev 5 prototype will show Edit, Duplicate, Delete as a proposal (D29). The FDS Data Table Action cell shows view + kebab | P2 | PM | |
| Q33 | Steps: can users jump between completed steps by clicking the stepper? Is Proceed blocked until the step validates (shown for weights ≠ 100%)? | P1 | Product Designer | |
| Q34 | Attribute order: drag handle shown on each Attribute List Item. Does order matter (display only, or evaluation order)? Keyboard alternative for reorder (move up / down)? | P1 Step 2 | Product Designer + PM | |
| Q35 | FDS-101 Input Addon has no Filled state (value renders in placeholder grey); the Attribute List Item overrides the value text to `text/foreground` (OBSERVED). Add a Filled state? | Attribute List Item | Product Designer (FDS-101 owner) | |
| Q36 | FDI proposals in D10, not rules: (a) **Distribute evenly** — how to round when 100 doesn't divide (e.g. 3 × 33.33 or 34/33/33)? (b) a new attribute gets Low / Medium / High rows pre-added — keep? | P1 Step 2 | Product Designer + PM | |
| Q37 | D9 table look: port Table Header Cell / Cell / Toolbar / Pagination candidates into FDS-101, and add a compact (no label, 40px) variant of Select / Input / Number Input for in-table editing (see Q27)? | §6 | Product Designer (FDS-101 owner) | |
| Q38 | D12 candidates: (a) FDS-101 has duplicate Data Table Header / Cell sets (`421:*` and `314:2978` / `316:3435`); FDI rebuilt from `314:2978` / `316:3435` (used by Data Table Column) — which is canonical? (b) Defaults changed for the I7 look: Header Sorting and Drag icon **off**, Menu added to the Default state; Values cell overflow chip moved after the text; Column Values cells have subtext off. Keep? (c) Rebuild the P2 Score Builder table from Data Table Column instances now, or after FDS-101 adopts it? | §6, P2 | Product Designer (FDS-101 owner) | |
| Q39 | FDS-101 Data Table Cell has no **Toggle** type (P2 Status, from I4) and no **editable/input** type (P1 values and bands tables). Add `Data Cell=Toggle` and an input slot, or should P2 show a Status badge? | §6, P1, P2 | Product Designer (FDS-101 owner) | |
| Q40 | FDS-101 follow-ups found in D15: (a) Data Table Column `429:5365` is still built from the old Header/Cell (`316:3435` / `314:2978`), not `522:*`. The work-file Column `61:15527` is the updated version to port. (b) Empty State's Action button hugs to 20px high; FDI fixed it in the P2 Empty frame only | FDS-101 | Product Designer (FDS-101 owner) | |
| Q41 | **How does AND / OR change the score?** No source defines it (C9). Possible readings, for the rule owner to choose or replace (FDI does not pick): (a) **gate**: with AND an object contributes only if every attribute matches a value row, otherwise 0; with OR it contributes if any attribute matches; (b) **qualify**: the logic only decides whether a record is scored, and the score stays the I3 sum; (c) **combine**: AND sums the contributions, OR takes the highest. Please add a worked example like I3 (two records, expected totals) | Formula, preview, P1 | PM (rule owner, Q1) | I10 does not combine attributes with AND / OR (pure sum); AND / OR appears only inside override conditions (HNWI income OR savings). See Q58 |
| Q42 | Multi-object scoring: which record receives the score (e.g. the Contact), and how do the other objects relate to it (a Contact's Deals: if there are several, which one, or an aggregate)? Do weights total 100 across the whole model or 100 within each object? | Formula, P1 | PM / BA | |
| Q43 | Precedence when connectors differ (A AND B OR C): left to right, AND before OR, or explicit grouping (brackets, or nested groups as in the Advanced Filter Builder)? Is there a default connector for a newly added object? | P1 | PM / BA | |
| Q44 | Limits: how many objects per model? Can the same object appear twice (e.g. two Deal groups with different conditions)? | P1 | PM | |
| Q45 | Approve the **full-screen builder without the app shell** (C7, §5.1)? If yes: it opens from P2 Create / Edit and Back / Cancel return to the list (unsaved prompt Q21); the stepper is replaced by the outline + readiness list; it is recorded as a candidate "focus mode" layout pattern | Figma | Product Designer | **Approved** by Aman Bansal (Product Designer) with rev 2, 2026-10-13: build the full-screen builder without the app shell |
| Q46 | "Applies to" conditions: per object (I3 sets pre-requisites per case, i.e. per object) or once per model? | P1 | PM / BA | **Answered** by D22 (Aman Bansal, 2026-10-14): once per model, on the Details page |
| Q47 | Within an object, is one operator for all attributes final (I8), or are nested groups (some attributes AND, some OR) expected later? Rev 2 designs one operator per object | P1 | Product Designer + PM | |
| Q48 | Phase 1 scope after D18: preview (D2) and the readiness checklist are deferred; issues show as a count in the header plus inline marks in the outline. Confirm, and should clicking the issue count jump to the first problem? | P1 | Product Designer + Tech lead | |
| Q49 | Prototype assumptions to confirm or correct: (a) object list Contact / Deal / Account / Lead and Contact fields Country, Occupation, Industry, Income, Contact Category, Profile (Q4); (b) a new object's AND / OR and a new connector start **unset** (Q43); (c) Applies to per object (Q46); (d) weights 100% per object (Q42); (e) Save is disabled while issues remain (bands count as an issue until set). Prototype shortcuts: choosing a field fills the whole object's attributes; typing is skipped | Prototype | Product Designer + PM | |
| Q50 | D21 prototype proposals and OBSERVED values: (a) discard-changes dialog on Back / Cancel (Q21); (b) object actions menu: Collapse, Distribute weights evenly (Q36), Remove object with confirm; (c) issue count in the header opens an issues list that jumps to the problem (Q48); (d) a new attribute gets empty Low / Medium / High rows (Q36); (e) dialog backdrop = `text/foreground` at 40% opacity (**OBSERVED**, no overlay token); (f) FDS-101 Modal buttons render 20px high, so the two dialogs are detached copies with 40px buttons (add to Q40) | Prototype | Product Designer | |
| Q51 | Live feedback (D24) under the D18 backend limit: is client-side feedback enough for phase 1 (contributions, weight totals, logic readout, inline validation), with the sample preview deferred? | P1 | Product Designer + Tech lead | |
| Q52 | Overrides: when several match, which wins: first in order, the most severe band, or the highest score? Can the admin reorder rules? | Formula | PM (rule owner) | I10 does not state precedence. Rules imply severity Reject > Refer > High > Medium; FDI proposes "most severe outcome wins", to confirm |
| Q53 | Can an override only raise the result (towards High Risk), or also lower it? | Formula | PM | I10 shows only raising outcomes (High, Medium-at-least, Reject, Refer); no lowering rule. Confirm overrides can only raise |
| Q54 | Object-level override conditions on **another** object (e.g. "Account approved"): how is the related record found (Q42), and what if there is none or there are several (any / all)? | Formula, data | PM / BA / Developer | |
| Q55 | Attribute-level override: is the condition limited to that attribute's own field (e.g. Country is a sanctioned country → High Risk), or can it use any field? | P1 | PM | I10: attribute-level rules test the attribute's **rating** ("Country of residence rated as high risk"), not only its raw value (R28) |
| Q56 | Is an applied override visible on the scored record (e.g. "High Risk · overridden: Deal not approved") and recorded in the audit log? | P3, audit | PM | I10 "escalate to compliance" (adverse media, sanctions) implies a referral / audit trail; display still open |
| Q57 | Scoring method: support both **Weighted** (I3: score × weight) and **Points** (I10: points add up), chosen per model? Or points only? (C13) | Formula, P1 | Product Designer + PM | |
| Q58 | Given I10, is the AND / OR between attributes and objects (I8) mainly about **override and applicability conditions**, while the score stays a sum? This would answer Q41 | Formula | PM (rule owner) | |
| Q59 | Matrix attributes: always exactly two fields? Which field types can be the second axis? Can a cell be Reject / Refer? | P1 | PM / Product Designer | |
| Q60 | Reject / Refer outcomes: what happens to the record (status, workflow, notification)? Does Reject stop all other scoring? Who gets the compliance referral? | Formula, P3 | PM / Compliance | |
| Q61 | Default rules (R24): do they apply before value matching, only when no value matches, or always win? | Formula | PM | |
| Q62 | I10 is a third-party client document (LMAX Global, author named): may FYNXT keep it and use its examples as test data? Should the two arithmetic errors (C14, C15) be corrected with the client first? | Inputs, QA | PM / Account owner | |
| Q63 | Band description: required or optional, maximum length? Shown anywhere besides the tooltip (e.g. on the scored record)? | P1, P3 | Product Designer + PM | **Answered** by Aman Bansal (Product Designer), chat 2026-10-15: maximum **250 words**. Required / optional not stated (treated as optional) |
| Q64 | Summary panel: is the hidden / shown choice remembered per user (across sessions) or reset on each launch? | P1 | Product Designer | **Answered** by Aman Bansal, 2026-10-15: **No**, not remembered; the panel is visible on every launch |
| Q65 | Floating summary button: position (right edge vs bottom-right) and content (issue-count badge?) | P1 | Product Designer | **Answered** by Aman Bansal, 2026-10-15: issue count **yes**; position **right side of the page** |
| Q66 | Deleting a model that is **active** or has produced scores: allowed? Soft delete / archive? What happens to existing scores (see Q19)? | P2 | PM | Aman Bansal, 2026-10-15: "Maybe". **Still open** for the PM: under which conditions deletion is allowed |
| Q67 | Duplicate: copy name ("Copy of …"), status (Draft / Inactive), overrides and bands included? | P2 | Product Designer + PM | **Answered** by Aman Bansal, 2026-10-15: name pattern "Name_copy(0count)", read by FDI as `<Name>_copy(<n>)` with n counting copies, e.g. "Client Risk Score_copy(1)" (to confirm). Status and contents of the copy still open |
| Q68 | List page "Audit logs" tab (frame 01): what does it show (who changed which model, when)? | P2 | Product Designer + PM | Code: tab shown with a placeholder |
| Q69 | List page actions next to Create (lightbulb, ⋯), labelled "Page actions (TBD)" in frame 01: behaviour? | P2 | Product Designer | Code: shown disabled with the reason |
| Q70 | Table toolbar "filter +" button and the column chooser icon (frame 01): which extra filters / columns? | P2 | Product Designer | Code: shown disabled with the reason. Column ⋯ menus sort (asc / desc) |
| Q71 | Settings menu parents show an expand chevron in frame 01 (User Management, Customizations, …), but their sub-items are unknown (see Q29) | Shell | PM | Code: chevrons only where sub-items are configured (Brand Setup) |
| Q72 | List "Outcome bands" cell: frame 01 shows shortened labels ("Low / Medium / High Risk"); code joins the full band labels ("Low Risk / Medium Risk / …"). Keep full labels? | P2 | Product Designer | |
| Q73 | Is "Applies to" required (asterisk) or optional (empty = all records)? See C19 | P1 | PM + Product Designer | |
| Q74 | Help icon next to the "Settings" title in the top bar: what does it open? | Shell | Product Designer | Code: shown disabled with the reason |
| Q75 | Raise (attribute): is the **attribute score** its value score before weight (Country = 90), compared with the object's weighted score (Contact = 42)? FDI assumes yes | Formula, R31 | Aman Bansal (rule owner) | **Answered** by Aman Bansal, 2026-10-20: FDI proposal accepted ("Approve, use FDI proposals") |
| Q76 | Raise: when **several** raise rules trigger (two attributes of one object, or two objects), does the **highest** score win? FDI proposes yes | Formula | Aman Bansal | **Answered** by Aman Bansal, 2026-10-20: FDI proposal accepted ("Approve, use FDI proposals") |
| Q77 | Raise in **points mode** (C20): not available, compare points as a % of the attribute's max, or another rule? | Formula, R21 | Aman Bansal | Still open at approval (2026-10-20). Design: raise rules shown in Weighted mode only (Q77) |
| Q78 | Order with the override rules (Q52): raise rules first (they change scores), then override rules (force / set / at least band / reject / refer) on the result? FDI proposes this order | Formula | Aman Bansal + PM | **Answered** by Aman Bansal, 2026-10-20: FDI proposal accepted ("Approve, use FDI proposals") |
| Q79 | With **OR** between attributes or objects (Q41), or when the related record is missing (Q42, Q54): does a raise rule still apply? | Formula | Aman Bansal + PM | Still open at approval (2026-10-20). Design: raise rules shown in Weighted mode only; no frame assumes an OR / missing-record behaviour |
| Q80 | Object raise by band: is the object's score read against the **model's** outcome bands (one band set per model)? FDI proposes yes | Formula, P1 | Aman Bansal | **Answered** by Aman Bansal, 2026-10-20: FDI proposal accepted ("Approve, use FDI proposals") |
| Q81 | Weightage "NA" (I12): does NA mean the column's scores count as **points** (added as they are), and a % mean **score × weight** (I12 example)? Can one model mix NA and % columns, and if so what total do the bands read (C13, Q57)? | Formula, P1 v2 | Rule owner (Aman Bansal) + PM | **Answered** 2026-10-21 (Aman Bansal): "no we are not having NA anytime Weightage is required". Every column has a weight; contribution = score × weight (R10). I12's "NA" is not a feature. Q57 is answered for Version 2: weighted only |
| Q82 | Band edges with decimal totals: is Medium "above 55 up to 65" (I10) or "56 to 65" (I12)? Where does 55.5 go (C24)? | Bands | Rule owner | **Answered** 2026-10-21 (Aman Bansal, "yes" to FDI default): Medium = above 55 up to and including 65; High = above 65. A total of 55.5 is Medium. Bands use "above / up to" edges, no gaps (C24 resolved) |
| Q83 | Conditions under the objects in I12: are they the model's Applies to (D22, model level) shown under Objects, or **per-object** conditions now (C25)? | P1 v2 | Product Designer | **Answered** 2026-10-21 (Aman Bansal, "yes" to FDI default): the conditions are the model's Applies to (D22, model level), shown under Objects in Version 2 (C25 resolved) |
| Q84 | I12 example "Low+Low" for Fund: two source-of-fund fields both Low, i.e. a two-field column like Industry+Occupation? What category does Low + Medium give? | Matrix columns | Rule owner | **Answered** 2026-10-21 (Aman Bansal, "no" to the two-field reading). FDI reading, confirm at review: "Low+Low" is the example's notation that **both** people (Aman and Gaja) are Low for Fund (2.5 each). Source of Fund is a single-field column; no new capability |
| Q85 | Is the worked example (score per sample person, Aman / Gaja) a **feature** of Version 2 (a "Try with sample records" panel), or only an explanation in the map? D18 deferred previews | P1 v2 | Product Designer + Tech | **Answered** 2026-10-21 (Aman Bansal, "yes" to FDI default): no sample-record panel in Version 2; the worked example is an explanation only (D18 deferral stands) |
| Q86 | Version 2 **replaces** Version 1, or both stay as layout options of the template (FDI recommendation: option, additive)? | Template versioning | Product Designer | **Answered** 2026-10-21 (Aman Bansal): "Both stay as options". Version 2 is an additive layout option of the same candidate; Version 1 keeps working (§7) |
| Q87 | Override toggle off: rules are kept but not applied, or hidden and cleared? Is the toggle per model or per object? | Overrides | Product Designer | **Answered** 2026-10-21 (Aman Bansal): "Entire score". One toggle for the whole model's score: off = no override rule is applied to the score |
| Q88 | "Restricted": a fourth **band** (I12 Score settings, Override → Restricted) or the **Reject** outcome (I12 Country Restricted → Reject)? If a band, what is shown to users for a Restricted result? | Bands, outcomes | Rule owner | **Answered (FDI reading, confirm at review)** 2026-10-21 (Aman Bansal): "similar". Read as: Restricted is the same as the Reject outcome; there is no separate fourth numeric band. A Restricted value or override gives Reject, shown with the label "Restricted" |
| Q89 | I13 puts the condition groups under the object tabs. Does Version 2 keep one **model-level** Applies to (Q83, built that way), or does each object tab now get **its own** condition groups (as in Data Filters)? | P1 v2 | Product Designer | |
| Q90 | Version 3: can a model's object be changed after the first save, or is it fixed (changing it would drop every column)? | P1 v3 | Product Designer || **Answered (FDI default, accepted with approval)** 2026-10-21 (Aman Bansal): the object is fixed after the first save |
| Q91 | Who can open and edit Band settings? Same role as building models, or admin only? Is the change audited? | P2 v3, permissions | PM / Security || **Answered (FDI default, accepted with approval)** 2026-10-21 (Aman Bansal): same role that builds models; audit still open under Q15 |
| Q92 | When shared band ranges change, do saved scores keep their band until recalculated, or are all models re-banded at once? Is there a warning listing affected models? | Bands | Rule owner + Tech || **Answered (FDI default, accepted with approval)** 2026-10-21 (Aman Bansal): saved scores keep their band until recalculated; saving the panel warns and lists the affected models |
| Q93 | Default band values for a new tenant: I12's Low 0–55 / Medium above 55–65 / High above 65, or empty until set? Can admins add or remove categories (e.g. Very High), or only rename / re-range the four? | Bands | Rule owner || **Answered (FDI default, accepted with approval)** 2026-10-21 (Aman Bansal): defaults Low 0 up to 55, Medium above 55 up to 65, High above 65, Restricted = Reject; admins rename, re-range and describe the four, no new categories |
| Q94 | Do Version 1 / Version 2 models also move to shared bands (C27), or keep their own per-model bands? | Versions | Product Designer || **Answered (FDI default, accepted with approval)** 2026-10-21 (Aman Bansal): Version 1 and Version 2 keep per-model bands (C27 resolved: shared bands are Version 3 only) |
| Q95 | The screenshot for the side panel ("similar to the attached SS") did not arrive. Please re-attach it so the panel matches it | P2 v3 | Aman Bansal | **Answered** 2026-10-21: screenshot sent (I15, "Question Bank Settings" panel). §5.3 item 1 updated to its look |
| Q96 | V3-06 draws **+ Group inside Group 2** (a group within a group). The shared ConditionBuilder (DCF-0003) supports one level of groups, as the live Data Filter it was built from (DCF-0003 D2). Build nested groups (changes the shared condition data model, affects DCF-0003 / DCF-0005), or keep one level? Built: one level, no + Group in a group | P1 v3 / ConditionBuilder | Product Designer + Tech | |


## 11. Review Feedback

<!-- Reviewers: add one row per point. FDI fills "Resolution" on /fdi-revise. -->

| # | Rev | Reviewer | Section | Feedback | Resolution (FDI) | Closed? |
|---|---|---|---|---|---|---|
| D1 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 at `/fdi-figma` | §5, Q23 | Layout: "a table page for all the scoring and scoring builder as a modal popup form" | Superseded by D4/D5 (rev-1 frames kept in a SUPERSEDED section on the page) · Rev 2: may be superseded by D17 (C7, Q45) | No |
| D2 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | Q13 | Include the **preview / test panel** | Applied in Figma inside the builder modal · Rev 2: carried into §5 / §6 | No |
| D3 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | Q3 | Include the **scoring models list** (P2) | Applied in Figma. Lifecycle details (activate, duplicate, versioning) still open in Q3 · Rev 2: carried into §5 / §6 | No |
| D4 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5.1 P1 | "The builder form should be like one thing at a time … merge both" references I5 (Add Assessment) and I6 (Create account stepper) | Applied 2026-10-13: P1 is now a **4-step modal** (Stepper from I6 + table/section style from I5): 1 Details & scope · 2 Attributes (weight table, % addon inputs, totals row) · 3 Values & scores (**one attribute at a time** via a tab switcher) · 4 Bands & preview. Footer Cancel / Back / Proceed → Save score model. Header: Clear fields + window actions (I6) · Rev 2: may be superseded by D17 (C7, Q45) | No |
| D5 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5 P2, Q16 | List page per I4; lives in the **Settings module › Brand Setup › Score Builder** (new menu item) | Applied: P2 rebuilt per I4 in the **Settings module**: app rail (Settings active), top bar "Settings", **Settings Nav** with **Brand Setup › Score Builder** (new item, active), page header + kebab, tabs Score Builder / Audit logs, banner, "All score models" + Create, table card (toolbar: Filter, Status, Object, Created By, Clear all, search; uppercase headers; status Toggle; row actions; pagination). Answers Q16 / Q28 · Rev 2: carried into §5 / §6 | No |
| D6 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6 | "Use the components wisely; feel free to introduce new components if required" | Applied: new candidates **Stepper Step** `43:6900` and **Settings Nav** `44:7057`; FDS-101 **Input Addon** (% suffix), **Secondary Tab**, **Toggle**, **Pagination**, **Table Toolbar** reused · Rev 2: carried into §5 / §6 | No |
| D7 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6 | "Also edit any component if you feel it necessary" | Applied to work-file candidates only (FDS-101 is read-only for FDI): DCF-0001 candidate **Side Nav** (Collapsed) gained a **Settings** rail item, per I4. Impact: DCF-0001 frame "P1 · Default (App Shell · nav collapsed)" `22:5789` now shows the gear too (visual only); Expanded variant unchanged · Rev 2: carried into §5 / §6 | No |
| D8 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5 P2, shell | Settings menu at the **bottom of the main side nav**, just above the **user tag** (avatar, name, ID / profile) with a **divider** between them. Opening it makes the **Settings menu take the full side-nav area**, with a **Back** button; Back returns to the main menu **without changing the page**, and **Settings stays selected** | Applied: candidate **Side Nav** `21:3687` gained a `Mode` axis (Main / Settings × Expanded / Collapsed). Bottom area = Settings item · divider · user tag (avatar, name, "ID · role"). Settings mode fills the nav: Back + "Settings" header, search, settings tree (Brand Setup › Score Builder active); the bottom Settings item stays Active. P2 frames: Settings menu open `52:10222`, after Back (main menu, page unchanged, Settings selected) `52:10659`. Replaces the separate Settings Nav panel (`44:7057`, superseded). Impact on DCF-0001 recorded there (C15) · Rev 2: carried into §5 / §6 | No |
| D9 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6 | Improve the **table** component (and other components) to match the look and feel of the screenshot (I4); designer will then update FDS-101 | Applied as work-file candidates in `43:6878` (FDS-101 untouched): **Table Header Cell** `51:10181`, **Table Cell** `51:10204` (Text / Text + Subtext / Toggle / Actions), **Table Toolbar** `51:10205`, **Table Pagination** `51:10250`; P2 table rebuilt from them. Editable tables in P1 use bordered card, tinted uppercase header row and compact 40px controls (Q27, Q37) · Rev 2: carried into §5 / §6 | No |
| D10 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5 P1 | "Improve the scoring flow: it is too long and there is scope to improve the user experience" | Applied (FDI proposal, for designer review): **4 steps → 3** — 1 Details & scope · 2 Attributes & scoring · 3 Bands & preview. Old steps 2 (weights) and 3 (values, one tab per attribute) merged into one **master–detail** step: left = attribute list (new candidate **Attribute List Item** `54:11894`: drag handle, name, type · value count, completion status, weight % inline); right = selected attribute's values table with live contribution. Running total badge "80 / 100% · 20% left", Proceed disabled until complete (Q33). Assists proposed, not rules: **Distribute evenly**, Low / Medium / High rows pre-added for a new attribute (Q36). Modal widened to 1080 (Q30) · Rev 2: may be superseded by D17 (C7, Q45) | No |
| D11 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6 | Designer will port the improved components into FDS-101 after review | Noted, no FDI action: FDS-101 is read-only for FDI. Candidates to port are listed in §6 and §12 · Rev 2: carried into §5 / §6 | No |
| D12 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6 | "Improve the Data table header and data table cell without losing its properties … look and feel as in screenshot (I7) … the table to be in column fashion, not row-wise, in the component so it is easy to build and adjust" | Applied as work-file candidates (FDS-101 read-only for FDI), section `58:12661`: **Data Table Header** `58:12796` (6 States; Drag icon, Menu, Sorting, text, lock, expand, manage columns), **Data Table Cell** `60:13217` (16 State × Data Cell; Avatar, Type Icon, tailing Icon, overflow, Link, text, edit, Primary/Secondary Action, subtext, INFO ICON), **Data Table Column** `61:15527` (Type × Collapsed × Locked + Rows 6–10), all with FDS-101's variant axes and property names. Look per I7: 44px rows and header (`spacing/11`), uppercase Table/Header labels, Body/SM values, 16px side padding, column dividers, horizontal-ellipsis column menu. Specimen `62:15167` rebuilds I7 from 10 column instances. Earlier candidates `51:10181` / `51:10204` superseded. Property IDs differ from FDS-101 (new components); defaults changed and P2 not yet rebuilt — see Q38 · Rev 2: carried into §5 / §6 | No |
| D13 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 at `/fdi-figma` | §5 P2, shell | "Why is Settings shown again when the user is already in the Settings menu" | Applied: in Side Nav `Mode=Settings` (Expanded and Collapsed) the bottom Settings item is hidden; the divider and user tag stay. "Settings stays selected" (D8) now applies only to `Mode=Main` after Back (`52:10659`) · Rev 2: carried into §5 / §6 | No |
| D14 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5 P2, shell | "The side nav with the Settings menu enabled is also an expandable and collapsible menu" | Applied: `Nav=Collapsed, Mode=Settings` rebuilt as a Settings rail (Back, divider, one Nav Rail Item per settings section using the same icons as the expanded list, Brand Setup active); it previously showed the main rail. The expanded Settings mode keeps its Collapse toggle. New P2 frame "Settings menu collapsed" `67:21976`. P2 frames now stack the nav above the content so the toggle is not covered · Rev 2: carried into §5 / §6 | No |
| D15 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 | §6, P2 | "The tables are not updated with the FDS-101 components" | Applied: the designer had ported D12 into FDS-101 (Data Table Header `522:11885`, Data Table Cell `522:11918`). Data Table Column candidate `61:15527` now uses those (264 instances swapped); local D12 Header/Cell sets marked superseded. All five P2 tables rebuilt column-first from Column instances (ID, Name + subtext, Object, Applies to (flexible width), # Attributes, Outcome bands, Status, Actions). Status keeps the I4 toggle in a cell-styled frame: FDS-101 has no toggle cell (Q39). P1 editable tables unchanged: Data Table Cell has no input slot (Q39) · Rev 2: carried into §5 / §6 | No |
| D16 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 at `/fdi-revise` | §3, §5.1 | "need to have two or more Object selection and inside the object attributes will have AND/OR Logic one between all the atribute and between object can have And and OR logics and can be different between two objects" | Rev 2: R1 (one or more objects), R14 (one AND / OR per object), R15 (AND / OR per pair of objects), BR5 (structure only); §5.1 surface `objects[]`, `attributeLogic`, `objectConnectors[]`, logic outline and readout; §6 Button Group `108:30` as the switch, logic connector and Object Group as gaps; C8 applied. **Not applied:** how AND / OR changes the score. No rule exists, so no calculation is designed (C9, Q41). Precedence, weight scope, object relations and limits are open (Q42–Q44, Q46, Q47) | No |
| D17 | 1 | Aman Bansal (Product Designer), in chat 2026-10-13 at `/fdi-revise` | §5 P1 | "also the Design should feel useful and if required lets make it as full screen score builder with out app shell" | Rev 2: §5.1 proposes a full-screen, three-pane builder without the app shell (logic outline · editor · live summary with readout, validation and preview), with rationale and states. **Not decided by FDI:** it reverses the modal from D1 / D4 / D10 (C7) and has no precedent or UX decision (§4), so it awaits designer approval (Q45). Frames are built only after rev 2 is approved | No |
| D18 | 2 | Aman Bansal (Product Designer), in chat 2026-10-13 at `/fdi-figma` | §5.1 summary panel | "need to change the right side summary pannel to be veryminimal as tech/backend team is not able to bring all this at once" | Applied: the summary panel (280px) now holds only what the browser can compute from the form, with no backend call: the **logic in plain words** and **weights per object**. Removed for phase 1: preview with sample values (needs an evaluation API, Q24) and the readiness checklist. The issue count moves into the header save state ("2 issues") and incomplete items show inline in the outline. This defers D2 (C10, Q48) | No |
| D19 | 2 | Aman Bansal (Product Designer), in chat 2026-10-13 | Figma | "need to create a full flow and in interactive prototyping so users can click and take feel of real app once done i will version those final design and move to the next setp" | Applied: 14-frame clickable flow in section "Prototype flow (D19)", starting point **"DCF-0002 · Score Builder (full flow)"** on page `33:4040`: list → Create → name → add Contact → add attributes → add Deal → set connector AND → outcome bands → Save → list with new row + toast; also edit from a list row, and Back / Cancel to the list. 48 click targets wired. Prototype shortcuts and assumptions in §12 (Q49) | No |
| D20 | 2 | Aman Bansal (Product Designer), in chat 2026-10-13 | §5.1 left panel | "also need to think on best ux for left side pannel in the score builder" | Applied (FDI proposal for designer review): the outline follows the task as **three steps** (1 Model · 2 Objects & logic · 3 Result). Each object is a **collapsible group**: chevron, icon, name, attribute count, weight-total badge, actions, and one AND / OR switch. Attributes are **compact 40px rows** (new candidate **Outline Attribute Row** `80:18985`: drag handle on hover, completion icon, name, weight) instead of nested cards with inputs. **Weight is edited in the attribute editor**, not the outline. The AND / OR connector sits between groups, "Add attribute" inside each group, "Add object" after the groups. Rationale: scannable, shows the logic structure at a glance, keeps editing in one place, scales to several objects | No |
| D21 | 2 | Aman Bansal (Product Designer), in chat 2026-10-14 at `/fdi-figma` | Figma prototype | "i want full step by step and each important intraction on a screen, so we can have a full flow" | Applied: **30 screens + 2 overlay dialogs**, one per interaction, in section `104:22173` "Prototype flow v2 (D21)". Flow starting point **"DCF-0002 · Score Builder (step by step)"**. 111 interactions: real overlays for the discard and remove dialogs (Cancel closes back to the same screen), auto-advance from Saving to the list after 1.2 s, and Back / Cancel open the discard dialog. The D19 flow is superseded. Remaining shortcuts: the 2nd–4th attribute of each object are added with one click after the first is shown step by step; typing is represented by before / after screens. Proposals needing a decision: Q50 | No |
| D22 | 2 | Aman Bansal (Product Designer), in chat 2026-10-14 | §5.1, Q46 | "where is the applies to filters on the details page" → chat answer: Applies to is **model level, on the Details page** | Rev 3: R2 and §5.1 updated; `applicability[]` moved from `objects[]` to model level; Details page gets Applies to (§5.1). Answers Q46 | No |
| D23 | 2 | Aman Bansal (Product Designer), in chat 2026-10-14 | §5.1 | "where is the distribute evenly option in objects" | Rev 3: it existed only in the object "⋯" menu (D21 screen 24). §5.1 makes it a visible link next to the weight badge and the weight field. Rounding still Q36 | No |
| D24 | 2 | Aman Bansal (Product Designer), in chat 2026-10-14 | §5.1 | "where are the user experience" → chat answer: guidance, live feedback, smoother interactions, visible shortcuts | Rev 3: §5.1 lists each item (R20). Live feedback is client-side only, to respect D18 (C11, Q51) | No |
| D25 | 2 | Aman Bansal (Product Designer), in chat 2026-10-14 | §3, §5.1 | "we need an overriding option as well but it should be in the attribute or object level conditions (for example:- is a contact is a low risk but the account or deal is not approved then it override and will become high risk)" → chat answer: the admin chooses per rule whether an override **forces a band** or **sets a score** | Rev 3: R17–R19, BR6, C12; `overrides[]` on attributes and objects (§5.1); Override Rule Row and override marker as §6 gaps. **Not decided by FDI:** precedence, direction, related-record lookup, attribute-level scope, display and audit (Q52–Q56) | No |
| D26 | 3 | Aman Bansal (Product Designer), with `/fdi-revise` 2026-10-15 | §3, §5.1 | "the attached is the additional reuirement example for logics" + I10 (LMAX Customer Risk Assessment Scoring – Individual Clients, v2.2) | Rev 4: I10 stored with a transcript and arithmetic check; capabilities added as R21–R28 + BR7 (values stay sample data); §5.1 config + layout proposals (scoring method, matrix attribute, Reject / Refer outcomes, defaults, threshold bands, richer overrides); §6 Override Rule Row VARIANT, matrix editor and threshold row gaps; C13–C17; Q7 / Q8 / Q10 / Q41 / Q52 / Q53 / Q55 / Q56 partly answered; Q57–Q62 new. **Not decided by FDI:** points vs weighted (Q57), Reject / Refer workflow (Q60), precedence (Q52), use of the client document (Q62) | No |
| D27 | 4 | Aman Bansal (Product Designer), with `/fdi-revise` 2026-10-15 | §5.1, Figma | "we need to move to version 3 back" → chat answer: **use the v3 flow as the base**, keep rev 4 requirements, fold remaining changes into it; v4 points screens become a reference | Rev 5: §1 and §5.1 make the v3 flow the base; rev 4 capabilities (R21–R28) are placed inside it; v4 kept as reference. No requirement removed | No |
| D28 | 4 | Aman Bansal (Product Designer), 2026-10-15 | §5.1 bands | "need to have the description and free text on the outcome bonds so that it can be customised and will have a tooltip of the same" | Rev 5: R29; `bands[]` gains label + description; band row composite and FDS-101 Tooltip in §6; tooltip placements listed (§5.1). Q63 for required / length | No |
| D29 | 4 | Aman Bansal (Product Designer), 2026-10-15 | Figma | "improve the flow as i need all the flow in the design file every interaction" → chat answer: Create model; Edit / delete / list actions; Errors and edge cases | Rev 5: §5.1 interaction inventory for Create, Edit / delete / list, and Errors / edge cases. Row actions, duplicate and delete behaviour are proposals pending Q32, Q66, Q67 | No |
| D30 | 4 | Aman Bansal (Product Designer), 2026-10-15 | §5.1 left panel | "the left side panel in the add/edit score builder need to be little intutive" | Rev 5 (FDI proposals): step progress, worded AND / OR and connector with tooltips, hover row actions, inline reasons, collapse / expand all, attribute search, guided empty groups (§5.1) | No |
| D31 | 4 | Aman Bansal (Product Designer), 2026-10-15 | §5.1 summary panel | "need the right side pannel as on demand on launch it is visible but user have a control to hide and show and on hiding it become a floating icon button" | Rev 5: R30; summary on launch with Hide button; floating icon button with issue badge when hidden; C18 (content unchanged from D18). Q64, Q65 open | No |
| D32 | 5 | Aman Bansal (Product Designer), with `/fdi-revise` 2026-10-20 (I11) | §3, §5.1 | "if the attribute score is high then the object overall score then take attribute as the score as the object score (it is a override) … overall scrore is low and one of the object scrore is high then need to have the high overall score (override) … make it user friendly and intractiove and less complicate". Chat: admin sets a threshold at both levels; rule owner Aman (confirmed) | Rev 6: R31–R33, BR8–BR9 (confirmed), §5.1 **Raise rules** proposal (toggle + one threshold on the attribute and object editors, live helper, outline ⬆ marker, summary line, Raise rules group in Result › Overrides), §6 composite + marker variant, C20, Q75–Q80. Approved 2026-10-20 (Aman Bansal); built in Figma section `351:19832` (V6-01..08), awaiting design review | No |
| D33 | 6 | Aman Bansal (Product Designer), in chat 2026-10-20 at design review | §5.1, §6, Figma `351:19832` | "i do not want it seperate from Override, need raise to be at override level only as it is for the product not only for one requirement". Chat: fix in Figma only (no new revision); design = **score conditions + Raise outcome** | Applied 2026-10-20: §5.1 / §6 rewritten (score conditions + **Raise to that score** outcome; object → overall by band uses At least band); Figma section `351:19832` rebuilt (V6-01..08); separate raise UI, ⬆ marker and C21 withdrawn | No |
| D34 | 6 | Aman Bansal (Product Designer), in chat 2026-10-20 | Outcomes | "need the defination of all the outcome options as it is required for product owner to make stakeholder understand the meaning" | Applied 2026-10-20: stakeholder doc **"Score Builder — Override outcomes explained"** (https://claude.ai/code/artifact/e156a764-cc2a-412c-aa1f-142dd5223653): six outcomes with meaning, example and status; condition types; rule order; open questions (Q52, Q53, Q56, Q60, Q77, Q79). Built only from confirmed sources; Reject / Refer behaviour marked open | No |
| D35 | 6 | Aman Bansal (Product Designer), in chat 2026-10-20 | §5.1 conditions | "each score is accotiated to a category then lets have a category instead of score" | Applied 2026-10-20: attribute conditions test the **category** (Country category is High), objects the **band** (Deal band reaches High Risk); no score numbers typed. Figma V6-01..04, 06, 07 updated; §5.1 / §6 / §12 rewritten | No |
| D36 | 6 | Aman Bansal (Product Designer), with `/fdi-revise` 2026-10-21 (I12) | Whole case, versioning | "i am attaching the one map can we make it a version and lets save the current version and make the new one with this most of the things remains same" | Rev 7: Version 1 (rev 6, Figma `2412391106275681573`, Station `6b9fd15`) saved as `revisions/rev-6.md` and frozen in frontmatter `versions`. Version 2 = this revision: I12 stored; R34–R39; §5.2 one-page layout proposal; §6.v2 components (DataTable row grouping gap); §7 versioning recommendation; C23–C25; Q81–Q88. Business-rule readings left as questions (Q81, Q82, Q84, Q88), not applied | No (Q81–Q88 open) |
| D37 | 7 | Aman Bansal (Product Designer), in chat 2026-10-21 | §10 Q81–Q88 | "Q81:- no we are not having NA anytime Weightage is required · Q86:- Both stay as options · Q87:- Entire sroce · Q88:- similar" (Q82–Q85 left blank) | Applied to rev 7 in place (answers, no new revision): R35–R37, §5.2, §6.v2, §7 updated; Q81, Q86, Q87 answered; Q88 recorded as FDI reading "Restricted = Reject" to confirm at review; Q82–Q85 still open | No (Q82–Q85) |
| D38 | 7 | Aman Bansal (Product Designer), in chat 2026-10-21 | §10 Q82–Q85 | "Q82:- yes · Q83:- yes · Q84:- no · Q85:- yes" | Applied to rev 7 in place: Q82 band edges "above 55 up to 65" (C24 resolved); Q83 Applies to model level under Objects (C25 resolved); Q84 two-field reading rejected, FDI reading "both people Low" to confirm; Q85 no sample-record panel. All Version 2 questions answered | Yes |
| D39 | 7 | Aman Bansal (Product Designer), in chat with `/fdi-figma` 2026-10-21 (I13) | Version 2 Figma (`408:23777`) | "looking like this but need to be in full sereen" + Data Filters screenshot | Version 2 rebuilt in the I13 look at full screen, new section (see §12 rev 7.1): flat page (no cards), Name / Description fields, Objects with + Add object popover and line tabs with ×, "No object selected" empty state, Applies-to as the condition tree (AND ▾, Column / Condition / Value rows, + Add Row / + Group, nested group, Clear All), Unsaved changes and Remove object dialogs. Kept from approved decisions: builder header (Back, name, Cancel / Save), summary panel (D31), model-level Applies to (Q83), AND / OR between objects (R15). First section `408:23777` marked SUPERSEDED. Open: C26 / Q89 | No (Q89) |
| D40 | 7 | Aman Bansal (Product Designer), in chat 2026-10-21 (I14) | Whole case: new Version 3 | "can we add this concept in version one ui style and do it for one object at a time and need to have a seperate settings side pannel on the main list page under the three dot menu above the table … where i will configure the output band categories and can define low, medium and high" + answers: one object per model; names and ranges shared; new Version 3 | Rev 8: snapshot `revisions/rev-7.md`; Version 3 in frontmatter; §1, I14, R40–R42, BR10, §5.3, §6.v3, §7 note, C27, Q90–Q95. Version 1 and 2 unchanged | No (Q90–Q95) |

## 12. Design & Build Record

- **Figma:** [https://www.figma.com/design/0CwREH91xlsQOFpAUp852B/FDI---Test?node-id=33-4040](https://www.figma.com/design/0CwREH91xlsQOFpAUp852B/FDI---Test?node-id=33-4040) · page `33:4040` "DCF-0002 — Scoring Builder" · approved version **`2410527021694858974`** ([link](https://www.figma.com/design/0CwREH91xlsQOFpAUp852B/FDI---Test?version-id=2410527021694858974&node-id=33-4040))
  - **Current (after D8–D10):**
    - P2 Score Builder list `52:10221` (D8 Settings in main side nav): Default — Settings menu open `52:10222`, After Back — main menu, Settings selected `52:10659`, Empty `52:11081`, Loading `52:11518`, Error `52:11938`
    - P1 Score Builder 3-step modal `55:11793` (1080 wide, Q30): Step 1 Details & scope `55:11794`, Step 2 Attributes & scoring (complete, Country selected) `55:11985`, Step 2 in progress (new Income attribute, 80% assigned, Proceed disabled) `55:12664`, Step 3 Bands & preview `55:11873`
    - P2 after D13–D15: tables in all P2 frames rebuilt column-first (FDS-101 header/cells); new frame Settings menu collapsed `67:21976`; Side Nav `21:3687` Settings mode without the duplicate Settings item, collapsed Settings rail rebuilt
    - D12 Data Table candidates `58:12661`: Header `58:12796`, Cell `60:13217`, Column `61:15527`, specimen table from I7 `62:15167` (Table Header Cell `51:10181` and Table Cell `51:10204` superseded)
    - Candidates `43:6878`: Stepper Step `43:6900`, Table Header Cell `51:10181`, Table Cell `51:10204`, Table Toolbar `51:10205`, Table Pagination `51:10250`, Attribute List Item `54:11894`; Side Nav `21:3687` (DCF-0001 page) with Mode axis
  - **Superseded (kept on the page):** P1 4-step modal `46:7609` (D4), P2 with separate Settings panel `45:7014` (D5), P2 in App Shell `33:4041` and P1 single-page modal `33:4042` (rev 1); Settings Nav `44:7057`
  - Audit after D15 (current sections): 1,691 instances, 0 images, fonts Lexend/Sora only, no unbound fills, no superseded components left in P2. Earlier audit: 759 instances, 0 images, fonts Lexend/Sora only, no unbound fills outside components. (D4–D7 audit: 744; rev 1: 609.) Sample data from I3 (Client Risk Score; preview = Client2 → 50, Medium Risk)
  - Code Connect: Number Input, Data Table Header/Cell, Form Modal body composition not yet mapped (Stage 3 task)
- **Rev 2 (2026-10-13, Q45 approved):** section `74:17604` "P1 Full-screen Score Builder" (1440 × 1004, no app shell):
    - Attribute selected (Contact › Country), 2 objects, Contact AND Deal `74:17605`
    - Object selected (Deal): object, attribute logic OR, Applies to `75:17921`
    - Single object (Contact, as I3): preview total 50 / 100 Medium Risk `75:18508`. The same under every reading of Q41, because all attributes match with AND
    - Validation, 3 objects: connector Deal → Account not set, Account without attributes, Save disabled `75:18990`
    - Outcome bands `75:19337`
    - New score model (empty) `75:19726`
    - Multi-object previews show per-attribute contributions only, no total (Q41). Weights are shown per object and flagged Q42
    - Rev-2 candidates `72:17555`: **Logic Switch** `72:17580` (from FDS-101 Button Group `108:30`; AND / OR / Unset), **Logic Connector** `72:17611`, **Object Group Header** `72:17662` (Default / Selected; name, meta, icon props), **Builder Header** `72:17730` (Saved / Unsaved; model name, breadcrumb props)
    - D10 3-step modal `55:11793` renamed SUPERSEDED
    - Audit: 389 + 29 instances, 0 images, fonts Lexend/Sora only, no unbound fills
- **D18–D20 (2026-10-13): clickable prototype**, section "DCF-0002 · Prototype flow (D19)" on page `33:4040`, flow starting point **"DCF-0002 · Score Builder (full flow)"** (open the page in Present mode):
    - 01 list `85:22277` → 02 new model `83:19030` → 03 add-object menu `83:19219` → 04 Contact added `83:19396` → 05 add-attribute menu `83:19567` → 06 Contact complete `83:19756` → 07 add second object `83:20128` → 08 Deal added, connector not set `85:19845` → 09 Deal complete `85:20077` → 10 Contact AND Deal `85:20464` → 11 outcome bands `85:20847` → Save → 13 list after save + toast `85:22313`
    - 12 edit Contact › Country `85:21189` (from 10 / 11 or the new list row); 14 edit existing Client Risk Score `85:21613` (from the 2001 row); Back / Cancel → 01 from every builder frame
    - Wiring: 48 click targets (buttons, menu items, connector, group headers, transparent hotspots over header buttons and table rows, which are nested instances)
    - New candidate: Outline Attribute Row `80:18985`; Object Group Header `72:17662` gained Expanded axis + weight badge
    - Superseded: rev-2 v1 full-screen section `74:17604` (before D18 / D20)
- **D21 (2026-10-14): step-by-step prototype v2**, section `104:22173`, flow start **"DCF-0002 · Score Builder (step by step)"**:
    - 01 list `104:22174` · 02 new model, name empty `104:22736` · 03 name entered `104:22885` · 04 add-object menu `104:23012` · 05 Contact added, join not set `104:23135` · 06 join AND `104:23265` · 07 add-attribute menu `104:23409`
    - 08 Country added, values empty `105:23186` · 09 values dropdown open `105:23626` · 10 values + scores set, weight empty `105:23999` · 11 weight 40%, "60% left" `105:24354` · 12 next-attribute menu `105:24688` · 13 Contact complete `105:25020` · 14 Contact Applies to `105:25349` · 15 add-condition menu `105:25880`
    - 16 add second object `106:24945` · 17 Deal added `106:25289` · 18 connector AND `106:25463` · 19 Deal join OR `106:25650` · 20 Deal attribute menu `106:25835` · 21 Deal Value ranges in progress `106:26035` · 22 Deal complete, 1 issue `106:26611` · 23 issues popover `106:26865` · 24 object actions menu `106:27124`
    - 25 bands empty `107:28897` · 26 bands set `107:29252` · 27 saving (auto 1.2 s) `107:29560` · 28 list after save + toast `107:29876` · 29 edit existing `107:30510` · 30 edit Contact › Country `107:30839`
    - Overlays: Discard changes `107:31213`, Remove Deal `107:31239`
    - Audit: 1,798 instances, 0 images, fonts Lexend/Sora only, no unbound fills
- **Rev 3 build (2026-10-14): step-by-step prototype v3**, section `121:28453`, flow start **"DCF-0002 · Score Builder v3 (step by step)"**. 36 screens + 2 overlays, 139 interactions; the v2 flow is superseded:
    - Details & Applies to: 01 list `121:28454` · 02 Details with "How scoring works" + empty Applies to `121:29008` · 03 name entered `121:29129` · 04 add-condition menu `121:29247` · 05 conditions set `121:29365`
    - Contact: 06 add-object menu `121:29483` · 07 Contact added `121:29616` · 08 join AND `121:29757` · 09 add several attributes (checkbox menu) `121:29898` · 10 4 attributes, Country values empty `121:30060` · 11 values dropdown `121:30364` · 12 values + scores set `121:30720` · 13 Distribute evenly, 25% each `121:31047` · 14 weight edit, 115% "15% over" `121:31374` · 15 Contact complete `121:31700`
    - Overrides: 16 attribute override, outcome menu `121:32053` · 17 band menu `121:32406` · 18 attribute override set (Country marker) `121:32759` · 19 Contact object overrides empty `121:33112` · 20 object rule, object menu (Contact / Deal / Account related) `121:33430` · 21 object override set "If Deal Approval status is not Approved → Force band High Risk" `121:33745`
    - Deal: 22 add-object menu `121:34060` · 23 Deal added `121:34428` · 24 connector AND `121:34614` · 25 Deal join OR `121:34800` · 26 add several Deal attributes `121:34986` · 27 Deal complete, 1 issue `121:35193` · 28 issues popover `121:35491` · 29 object actions `121:35793`
    - Result & save: 30 bands empty `121:36101` · 31 bands set `121:36345` · 32 Result › Overrides list (2 rules, order) `121:36665` · 33 saving (auto) `121:36985` · 34 list after save `121:37304` · 35 edit existing `121:37931` · 36 edit Contact › Country `121:38284`
    - Overlays: Discard changes `126:36109`, Remove Deal `126:36129`
    - Sample values are illustrative: override rules ("Country is any of Pakistan", "Deal Approval status is not Approved"), the field "Approval status" and the related "Account" object are placeholders (Q54, Q55)
    - Audit: 2,321 instances, 0 images, fonts Lexend/Sora only, no unbound fills
- **Rev 4 build (2026-10-15): prototype v4, "Individual Client Risk" points model from I10**, section `155:36282`, flow start **"DCF-0002 · Individual Client Risk (points model, I10)"**. 12 screens + discard overlay, 94 interactions. The v3 multi-object flow stays current (start "DCF-0002 · Score Builder v3 (step by step)"); the other auto-created flow starts were removed:
    - P01 list `158:40492` → P02 Details: Scoring method **Points**, Applies to "Client type is Individual" `155:38944`
    - P03 Country, points 20 / 30 / 40, **Restricted → Reject** `155:36283` · P04 value outcome menu (Points / Reject / Refer) `155:37177`
    - P05 Industry **two-field matrix** (Industry × Employment role, Set row, 24 more) `157:37309` · P06 + **default rule** "Employment status is any of Unemployed, Retired, Student → Low · 10" `157:38240`
    - P07 Source of funds, **Other → Refer to compliance** `155:38073`
    - P08 **threshold bands** (up to and including 55 Low · above 55 to 65 Medium · above 65 High; coverage check) `158:37868`
    - P09 Result › Overrides: I10's **9 rules** with outcome badges; proposed "most severe wins" note (Q52) `158:38554` · P10 HNWI rule, **income OR savings > 3,000,000 USD → Force High** `158:39121` · P11 "Country rating is Medium → **At least** Medium" `158:39860`
    - P12 list after save + toast `158:41048`; Overlay · Discard changes `158:41676`
    - Outline in points mode: attributes show max points (40 / 20 / 20 / 10 / 10 = 100 pts), AND / OR row hidden on the object (Q58)
    - Country lists in P03 are placeholders ("Select options" for High / Restricted): country ratings are tenant data (I10 gives none)
    - Audit: 1,046 instances, 0 images, fonts Lexend/Sora only, no unbound fills
- **Rev 5 build (2026-10-15): prototype v5**, section `167:39825` (v3 base, v3 section renamed SUPERSEDED). **60 screens + 6 overlays, 201 interactions.** Flow starts: **"DCF-0002 · Score Builder v5 (every interaction)"** (list `167:39826`) and **"DCF-0002 · v5 · Empty list (first use)"** (`172:55362`); the v4 points flow stays as the reference ("DCF-0002 · Individual Client Risk (points model, I10)"):
    - **Applied to every builder screen:**
      - summary header with **Hide summary**;
      - AND / OR in words ("All must match" / "Any can match") and connector hints ("Both objects must match");
      - **Collapse all**;
      - incomplete rows read "No values";
      - **Scoring method** (Weighted | Points) on Details;
      - override outcome menu with all 5 outcomes.
    - **Create (01–36, as v3):** plus 37 band tooltip `169:50326`; 30 / 31 bands with **label + description (250-word counter) + ⓘ tooltip** `167:48150` / `167:48408`; 38 summary hidden + **floating button with issue count on the right** `168:48509`; 39 row hover actions `168:48758`; 40 remove-attribute dialog `168:50401` → 41 removed, "20% left", Undo `168:49160`; 42 override removed, Undo `168:49952`; 43 attribute duplicated `168:49549`.
    - **Edit / delete / list:**
      - row click → 57 loading → 35 edit;
      - 44 row menu (Edit, Duplicate, Delete) `170:49223` → 45 **Client Risk Score_copy(1)** as Draft `170:49792`;
      - 46 delete dialog `170:50429` → 47 deleted `170:50461`;
      - status toggle → 48 turn-off dialog `170:51096` → 49 off `170:51133`;
      - 50 Object filter menu `170:51698` → 51 filtered `170:52268`;
      - 52 search no results `170:52823`.
    - **Errors and edge cases:**
      - 53 name required `172:52813`;
      - 54 bands overlap `172:53011`;
      - 55 override without outcome `172:53394`;
      - 56 save failed + Retry `172:53872` (from 36's Save);
      - 57 builder loading `172:54223`;
      - 58 model not found `172:54590` (standalone state);
      - 59 list loading (after Discard) `172:54959`;
      - 60 list empty `172:55362`;
      - the Remove Deal dialog warns that an override rule uses Deal;
      - weights ≠ 100 (14), attribute without values (10) and connector / join not set (23) are in the core flow.
    - **Not yet in v5** (in the v4 reference only): two-field matrix attribute, default rules, Reject / Refer value outcomes, Points-mode value table. Also not built: step progress counts in the left panel and attribute search over 8 items
    - Proposals pending decisions: row actions (Q32), duplicate status (Q67), delete rules (Q66)
    - Audit: 4,265 instances, 0 images, fonts Lexend/Sora only, no unbound fills
- **Rev 6 build (2026-10-20), reworked for D33: raise as an override.** Section **`351:19832`** "DCF-0002 · v6 · Raise as an override (rev 6 · D33)" on page `33:4040`. The first rev 6 build (separate raise cards, ⬆ marker, Raise rules group) was deleted. Flow starts: **"DCF-0002 · v6 · Raise via override (attribute score)"** (V6-01) and **"DCF-0002 · v6 · Raise via override (object band / score)"** (V6-05). **8 frames, 12 interactions:**
    - V6-01 `357:23924` Country · new override, Field menu with **Fields** + **Categories & bands** (Country category, Contact band) → V6-02
    - V6-02 `357:24547` Contact · Country category · is · High, Then menu with **Raise to that score** → V6-03
    - V6-03 `357:25154` rule set → Raise to that score; success hint "Contact takes Country's score when it is higher · High = Pakistan, Japan (90)" → V6-04, V6-07
    - V6-04 `357:25700` no High value rows, warning "No Country value is in High yet, so this rule never triggers" → V6-03
    - V6-05 `358:21307` Deal · Deal band · reaches · High Risk → At least band · High Risk; info hint → V6-06 (field), V6-07
    - V6-06 `358:21810` Deal · Deal band · reaches · High Risk → Raise to that score; hint "When Deal reaches High Risk, the overall takes Deal's score if it is higher" → V6-05, V6-07 (D35: no score threshold)
    - V6-07 `358:22589` Result › Overrides: one list of 4 rules, raise rules first; Edit → V6-03 / V6-05
    - V6-08 `358:22202` error: band in the condition deleted, Value select in error → V6-05
  - **Components (work-file candidates; FDS-101 untouched):** new variant **Outcome = Raise to that score** on Override Rule Row `120:28502` (`356:21696`). The Raise property and ⬆ marker added earlier the same day to `80:18985` / `72:17662` were **removed**, and header Meta restored.
  - **Reused FDS-101:** Select, Number Input (nested swap), Badge (Success / Warning / Info / Error, Soft), Menu title + Menu Item (frame 17 pattern), Sidebar Nav Item. No new token gaps.
  - **Version:** the Plugin API can't save a named version; `figma.approvedVersionId` stays the v5 one until the designer saves and shares a rev 6 version.
- **Handoff docs (2026-10-20, requested by Aman Bansal):** [PRD — Score Builder](https://claude.ai/code/artifact/2b0cde75-f5a8-4de9-9fa7-ebed196a4907) and [Dev sign-off — Score Builder](https://claude.ai/code/artifact/05253aac-0836-4d3a-b35a-6bf1887f1cf9) (private claude.ai docs), with six annotated screens from Figma section `363:22029` "DCF-0002 · Dev sign-off · annotated screens" (copies of v5 frames 01, 05, 15, 31 and rev 6 V6-03, V6-07 with numbered pointers; not product UI). Repo copy and index: `developer-handoff/specs/DCF-0002-scoring-builder/`. Both docs use only case-file sources; open questions listed, not decided. Note: v5 frame 05 no longer shows the Scoring method card (FR-9 still lists it, from the approved v5 flow); designer to confirm
- **Rev 6 Station build (2026-10-20):** commit `6b9fd15` on `fdi/DCF-0002-scoring-builder` (local; no remote). Approved version `2412391106275681573`.
    - Conditions on an attribute's **category** (`category:<field>`, operators from `categoryOperators`) and an object's **band** (`band`, `bandOperators`); Field select grouped "Fields" / "Categories & bands"; new outcome **Raise to that score** (`raise`), hidden in Points mode (Q77); live hints (category values with score, never-triggers warning, deleted band error); deleted bands block Save; new rules start with the object only; Overrides list shows raise rules first (Q78); approved helper copy.
    - Measured in real Chrome at 1440 against V6-03: rule box 710 × 114, rows at (13, 13), If columns 40 / 120 / 216 / 136 / 140, Then 40 / 150 / 160 (Raise 40 / 200), remove 24 — all exact. V6-07 list order and copy match.
    - Checks: typecheck ✓ · tests **223 / 223** ✓ (+6 rev 6 tests) · token-literal check ✓.
    - Known differences, not changed: the deleted-band error names no band (the model doesn't keep deleted labels; V6-08 names "Very High Risk"); an "is any of" value renders as Multi Select with a chip (V6-03 draws a plain Select); Operator / Value are disabled until a field is chosen (V6-01 draws them enabled); C22 copy.
- **Station (2026-10-15):** branch `fdi/DCF-0002-scoring-builder`, local commits `1fc33a6` (ui), `341be65` (template), `6d88fe0` (gallery page). **No git remote**, so nothing has been pushed.
    - `packages/ui`: SegmentedControl, OutlineRow, Toggle (new); SideNav Settings mode, MultiSelect `hideLabel`, ConditionBuilder `emptyDescription` (additive)
    - `packages/templates/src/CAND-DCF-0002-score-builder`: `ScoreBuilder` (root), `ScoreModelList` (P2), `ScoreEditor` (P1 full screen), `EditorPanes`, `model.ts` (form-completeness checks, Distribute evenly, band order, readout), `memoryAdapter` (gallery / tests only), `types.ts` (adapter contract)
    - Gallery: `apps/studio/gallery/pages/settings/score-builder.{config,page,page.test}.tsx`, `registry.ts` line, `pages.json` entry (`settings.brand-setup.score-builder`, module Settings, section Brand Setup). Preview: `/preview.html?page=settings.brand-setup.score-builder`
    - Checks: typecheck ✓ · tests **208 / 208** ✓ (171 before + 37 new) · token-literal check ✓ (2 breakpoints marked OBSERVED)
    - Real Chrome (CDP): list in the Settings nav, open model, attribute editor (list and range tables fit, contributions 2.5 / 5.0 / 17.5 match I3), bands with descriptions, summary hide / floating button, override rule added
    - **Not built** (approved v5 main flow doesn't include them; v4 reference only): two-field matrix attribute, default rules, Reject / Refer as *value* outcomes, Points value table (Points switch exists; it relabels weight as max points and contribution as points). Drag reorder of attributes not built (Q34); overrides reorder with Move up / down
    - **Stubbed by design:** no scoring, AND / OR, connector or override evaluation (Q41, Q42, Q52, Q60); adapter contract only (Q24)
- **Design-parity pass (2026-10-15):** commit `c55c068` on the same branch. Compared the build with frames 01, 03–06, 09, 12, 18, 27–28, 31–32, 35–36 and 38 in real Chrome at 1440 and fixed every difference found (list page header / tabs / toolbar / table / pagination, top bar, editor header and issue line, outline, Applies to rows, override rows, weight addon, value chips, band edge select, overrides list, attribute checklist, opening on the first attribute). Checks: typecheck ✓ · tests **215 / 215** ✓ · token-literal check ✓. Still different on purpose: filter chips use the FDS default style until a filter is applied (frame 01 draws them in the Active style); search box is the FDS-101 40px search (frame 01: 48px); Select options can't show an ellipsis (native control). Open: Q68–Q74, C19
- **Rev 7 build — Version 2 (2026-10-21, `/fdi-figma`, D36):** section **`408:23777`** "DCF-0002 · Version 2 · One-page builder (rev 7 · D36)" on page `33:4040`, at x 17300. Version 1 sections (`167:39825`, `351:19832`, `363:22029`) are not touched. Flow start **"DCF-0002 · Version 2 · One-page builder (rev 7)"** (list `413:75874`).
    - V2-00 Score Builder list `413:75874` (v5 list clone; its old links removed). **Create score model** opens V2-06
    - V2-06 Create · choose layout (overlay) `415:27762`: One page (Version 2, selected) / Step outline (Version 1); Continue → V2-01; Cancel / close. Shown only when both layouts are on for the tenant (FDI proposal, §5.2)
    - V2-01 New score model, empty `413:27158`: empty Details, "No bands yet", no objects, Applies to toolbar only, overrides off; Save disabled. Add object → V2-02
    - V2-02 Contact Risk Score, filled (I12) `408:23778`:
      - Details: Scoring name + Description on one row.
      - Score settings: Band · Above · Up to · Reads as. Low 0 up to 55, Medium above 55 up to 65, High above 65; Restricted has no range and shows **Reject** (R35, Q82, Q88). Each band row has a ⋮ for its label and description (D28).
      - Objects: Contact tab + Add object; **Applies to · Whole model** (Q83) with the condition rows and **AND · Add rule · Add group** (I12).
      - Contact columns grouped by column: Column · Weightage (%) (required) · Category · Value · Score. Country 40 (Low 20 / Medium 30 / High 40 / Restricted → Reject), Industry+Occupation 20 (two fields), Source of Fund 20, Product 20 (two Low rows), all I12 values. Header: Weights 100%, "Columns must AND / OR", Distribute evenly; footer: Add column, "Total weightage 100% · 0% left".
      - Override: **toggle for the entire score** (R37) and three one-line rules [Column] [Category] Score [Regardless / Lower] Override [Band] (R38), as in I12. Each line has ⋮ More (band conditions, raise, Reject / Refer) and drag handle.
      - Links: toggle → V2-04, Add object → V2-05, Country weightage → V2-03, Save → list.
    - V2-03 Weights don't total 100% `412:24754`: Country 60, field in error "Weights total 120%", badge "Weights 120%", footer "20% over", summary 120%, Save disabled "1 issue · weights 120%". Country weightage → V2-02
    - V2-04 Overrides off `412:26109`: toggle off, rules dimmed and kept, info alert "Overrides are off … the 3 rules are kept" (Q87). Toggle → V2-02
    - V2-05 Lead added `412:27431`: tabs Contact **AND** Lead (connector between tabs, R15), Lead selected with "No columns for Lead yet" + Add column, Weights 0%, summary "Contact AND Lead", Save disabled "1 issue · Lead has no columns". Contact tab → V2-02
    - Back and Cancel hotspots on every builder frame → list. **23 interactions.**
    - **Reused:** Builder Header and summary panel (work-file candidates, as Version 1); the Applies-to box cloned from v5. **FDS-101 instances:** Input, Number Input, Select, Input / Multi Select + Chip, Input Addon (%), Secondary Tab, Toggle, Alert, Badge, Button, Icon Button and icons. No new component, no FDS-101 change.
    - **Grouped table:** drawn as a composition: a column cell spans its value rows, plus a weight cell. FDS-101 Data Table has no row grouping; this is the §6.v2 gap. It is not a new component yet; it is raised for the designer to decide (variant or composition).
    - **Sample data:** I12 values. "Family Incode" in I12 is drawn as "Family Income" (typo read, confirm). Applies-to rows are the v5 sample (User Type / Contact Category / Profile), not from I12: I12 shows only the field chips.
    - **Library quirk (not changed):** FDS-101 Select and Number Input now show their label row even with `label` off. FDI hid the LabelRow layer in table cells, as Version 1 frames look. FDS-101 owner to check.
    - Audit: 1,263 instances, 0 images, fonts Lexend / Sora only, no unbound fills or strokes outside instances.
    - **Version:** the Plugin API can't save a named version. `versions[1].figmaVersionId` stays null until the designer saves and shares one; `figma.approvedVersionId` is still Version 1's.
- **Rev 7.1 build — Version 2 in the Data Filter look, full screen (2026-10-21, `/fdi-figma`, D39 / I13):** section **`416:111151`** "DCF-0002 · Version 2 · Data Filter look, full screen (rev 7 · D39)" on page `33:4040`, below the first Version 2 section (now named "SUPERSEDED (D39) · …", kept). Flow start **"DCF-0002 · Version 2 · Data Filter look (D39)"** (list `420:116588`). **35 interactions.**
    - R-00 list `420:116588`: Create opens R-10. R-10 choose layout (overlay) `420:116624`: Continue → R-01
    - R-01 new model, **No object selected** `418:30325`: FDS-101 Empty State; "No bands yet"; overrides off. + Add object → R-02
    - R-02 **Add Objects** popover `419:29171`: title + close, search "Search for an object", Contact / Lead / Deal / Account with +. Object list is sample tenant data. Contact → R-03
    - R-03 Contact added `418:28814`: Contact line tab with ×. Condition tree with one empty row (Select a column / Choose a condition / Enter value). "No columns for Contact yet" with Add column → R-04
    - R-04 filled `416:111152`: everything in V2-02, plus the Data Filter objects area. Root **AND ▾** with + Add Row / + Group; rule "User Type is Contact"; **Group 2 (OR ▾)** with its own + Add Row / + Group / remove, holding "Contact Category is any of Retail +1" and "Profile is Trader" (v5 sample rules). Dashed tree lines with connectors; red remove icons; red required asterisks; Clear All.
    - R-05 weights 120% `420:29280` · R-06 overrides off `420:30726` · R-07 Lead added `420:32139` (Contact × · AND / OR · Lead ×, Lead columns empty). The Lead tab opens R-09.
    - R-08 Unsaved changes `420:33620` (Back / Cancel on R-03 to R-07; v5 copy "Discard unsaved changes?", Keep editing / Discard) · R-09 Remove Lead `420:33631` (Remove → R-04)
    - **Kept from approved decisions, not from I13:** builder header with Back, model name, Cancel / Save at the top (the I13 modal has a footer with Cancel / Apply); summary panel (D31); model-level Applies to (Q83); AND / OR between objects (R15); dialog copy from v5. I13's "Users (Optional)" field and "save as a draft" copy are Data Filters features and are not taken (references are visual only).
    - **FDS-101 instances:** Primary Tab (line tab, trailing icon swapped to icon/x), Empty State, Input (with icon/search), Select, Input / Multi Select, Button, Icon Button (trash recoloured with `status/error`), Alert, Toggle, Badge, icons. Tree lines and connectors are frames with `border/default` dashed strokes. No new component, no FDS-101 change. **The condition tree is a composition:** a candidate for an "Advanced Filter Builder" component, for the designer to decide (§6).
    - Audit: 1,645 instances, 0 images, fonts Lexend / Sora only, no unbound fills or strokes outside instances.
    - **Open:** C26 / Q89 (I13 puts the groups under the object tabs; built as model level per Q83). Version: no saved Figma version yet.
- **Rev 8 build — Version 3 (2026-10-21, `/fdi-figma`, D40):** section **`425:32433`** "DCF-0002 · Version 3 · Outline + Data Filter rules, one object, shared bands (rev 8 · D40)" on page `33:4040`, below the Version 2 sections. Version 1 and 2 sections untouched. Flow start **"DCF-0002 · Version 3 · one object, shared bands (rev 8)"** (list `429:34031`). **53 interactions.**
    - **List and band settings (R41, I15 look):**
      - V3-00 list `429:34031`: the ⋮ next to Create score model opens V3-01; Create → V3-05. Deal Score's bands read Low / Medium / High (shared).
      - V3-01 ⋮ menu open `430:35734`: one item **Band settings** → V3-02.
      - V3-02 **Band settings side panel** `430:35733` (640 wide, right; backdrop 40 % of text/foreground, OBSERVED as in v5): title, subtitle, close; collapsible bordered section "Band categories"; table BAND NAME · ABOVE · UP TO · DESCRIPTION (Optional) for Low 0 / 55, Medium 55 / 65, High 65 / and above, Restricted = Reject / No range; usage note "Used by 2 score models. Saved scores keep their band until they're recalculated" (Q92); Cancel / Save. No add or remove (Q93).
      - V3-03 overlap error `430:35735`: High above 60, field in error, message "High overlaps Medium…", Save disabled.
      - V3-04 save confirmation `430:36510`: "Save band changes?" listing Client Risk Score and Deal Score (Q92), Cancel / Save changes.
    - **Builder (Version 1 layout, R40 / R42):** outline Step 1 *Details & object*; Step 2 · Logic "1 object · fixed" with *Applies to · 2 rules* and the Contact group (Country 40 %, Industry+Occupation 20 %, Source of Fund 20 %, Product 20 %, Add column, Distribute evenly, All must match AND / OR); Step 3 *Bands · shared* and *Overrides*. No Add object.
      - V3-05 new model `426:33446`: Details with Scoring name, Description and **Object** (required, "One object per model. It can't be changed after the first save", Q90).
      - V3-06 **Applies to** `426:32731`: the Data Filter tree (I13) in the editor card: AND ▾, Clear All, + Add Row / + Group, "User Type is Contact", **Group 2 (OR)** with "Contact Category is any of Retail +1" and "Profile is Trader".
      - V3-07 Column · Country `425:32434`: weight 40 (required), Low Australia +2 → 20 (8.0), Medium Argentina +2 → 30 (12.0), High Egypt +2 → 40 (16.0), Restricted Afghanistan +2 → Reject.
      - V3-08 weights 120 % `428:33100` · V3-09 Overrides on, three one-line rules `428:33556` · V3-10 Overrides off `428:34226`.
      - V3-11 **Bands · shared** read-only `428:34579`: table and **Open Band settings** → V3-02.
    - **FDS-101 instances:** Sidebar Nav Item, Input, Number Input, Select, Multi Select, Button, Icon Button, Menu Item, Badge, Toggle, Alert, icons; candidates Builder Header, Object Group Header, Outline Attribute Row, Logic Switch. FDS-101 has no side-panel (sheet) component: the panel is a composition (header, section, table, footer), raised as a candidate with the Advanced Filter Builder tree (§6.v3). No new component, no FDS-101 change.
    - Audit: 1,211 instances, 0 images, fonts Lexend / Sora only, no unbound fills or strokes outside instances (backdrop opacity OBSERVED, as v5).
    - Version: no saved Figma version yet.
- **Rev 8 Station build — Version 3 (2026-10-21, `/fdi-build`):** commit `62c57a9` on `fdi/DCF-0002-scoring-builder`, built in `~/fynxt-work/dcs-dcf0002` (clone of the Station repo; OneDrive hazard). Approved Figma version `2412747704466134651`, section `425:32433`.
    - **Template** `CAND-DCF-0002-score-builder` 0.2.0: config `singleObject` turns on Version 3 (Version 1 unchanged). New `SingleObject.tsx`: Details & object (Object select, locked after first save, Q90), Applies to (ConditionBuilder rule tree for the model's object), Bands · shared (read-only + Open Band settings), one-line overrides with the whole-score toggle (stored as rev 6 override rules: category condition + forceBand / atLeastBand, so the data shape is unchanged), Band settings side panel (load / error / retry, collapsible section, overlap and gap checks, confirm naming the affected models, save error). ScoreEditor / ScoreModelList / EditorPanes switch on `singleObject` (outline "Details & object", "Step 2 · Logic", "1 object · fixed", Applies to, Bands · shared, Overrides · n rules / off; "column" wording; Restricted rows score Reject; no Add object, no per-column override cards). List: ⋮ page menu → Band settings (permission `can("editBands")`), Outcome bands column shows the shared bands.
    - **ConditionBuilder VARIANT** (see §7.2). Code Connect unchanged (no new component).
    - **Gallery:** `apps/studio/gallery/pages/settings/score-builder-v3.{config,page,page.test}.tsx`, registry line, `pages.json` entry `settings.brand-setup.score-builder-v3` ("Score Builder (Version 3)", Settings › Brand Setup, DCF-0002). Sample data = I12.
    - **Checks:** typecheck ✓ · tests **246 / 246** ✓ (+11 Version 3 template tests, +2 ConditionBuilder, +1 gallery page) · token-literal check ✓ (3 OBSERVED: backdrop, two 13 px texts).
    - **Real Chrome at 1440 vs frames:** Band settings panel 640 × 1004, header 100, rows 57, columns 140 / 96 / 96 / fill, footer 73 (V3-02) ✓; column table 160 / 320 / 100 / 80 / 48 (V3-07) ✓; override line Column 104 · Category 120 · Condition 132 · Band 120, gap 6 (V3-09) ✓; Applies-to tree, shared bands table (V3-06, V3-11) ✓.
    - **Known differences, not changed (for designer):** (1) no **+ Group** inside a group (Q96); (2) a Restricted row's Reject spans Score and Contrib. (the frame's 76 px select clips "Reject"); (3) outline "Applies to · n rules" counts every rule (3), the frame says "2 rules" for 1 rule + a group; (4) Open Band settings opens the panel over the builder (the prototype jumps to the list), so unsaved model edits stay; (5) the ⋮ on each override line is shown but not available (§5.2 "More" options are not in the Version 3 frames); (6) toast "Band settings saved" after saving (no frame; FDI proposal); (7) builder header is 67 px, the frames 64 (Version 1 shell, unchanged); (8) sample model named "Contact Risk Score" (I12, V3-07), the V3-00 list frame still reads "Client Risk Score"; (9) selects in override lines use 36 px end padding (FDS-101 Select spec) where `@fynxt/ui` Select uses 40, local to this template.
- **QA (CLAUDE.md §17):** not applicable until Stage 3.

**Version 3 QA (rev 8, 2026-10-21):**

| Check | Result | Verified by |
|---|---|---|
| PRD / FRD | **Verified** against R34–R42 for Version 3: one object (R40), shared bands with above / up to edges and Restricted = Reject (R35, R41), weightage required (R36), whole-score override switch (R37), one-line overrides Regardless / Lower (R38), two-field column as a list column (R39). Q90–Q94 defaults applied | FDI |
| Template rules | **Verified**: page is configuration only; no scoring, no band evaluation (Q41, Q52); shared bands via adapter (integration requirement) | FDI |
| Design system | **Verified**: token-literal check passes; FDS-101 components only; 3 OBSERVED values recorded; ConditionBuilder VARIANT additive | FDI |
| UX decisions | **Verified** against D40 and the approved Version 3 frames (V3-00 … V3-11), with the 9 known differences above | FDI · **needs designer** sign-off |
| States | **Verified** in tests: panel loading / load error + retry / overlap / gap / confirm / save error; builder new model (no object), object locked, overrides off, incomplete override line issue, shared bands loading / error | FDI |
| Permissions | **Needs human**: `can("editBands")` gates Band settings (Q91 default: same role as building models); gallery allows all | PM |
| Accessibility | **Verified** in code + tests: panel is a modal dialog (labelled, focus in / back, Esc, Tab trap), collapsible section with aria-expanded, overlap error is an alert linked to the field, toggle is role="switch", override lines are labelled list items with keyboard reorder. **Needs human**: screen-reader pass, contrast | Designer / QA |
| Responsive | **Partly verified**: 1440 in Chrome; panel is min(640 px, 100vw). **Needs human** device check | Designer / QA |

**Version 1 QA (rev 5–6):**

| Check | Result | Verified by |
|---|---|---|
| PRD / FRD | **Verified** against I1, I3, I8, I9, I10 requirements in scope of v5 (R1–R20, R26, R29, R30). R21–R25, R27–R28 only partly: see "Not built" above | FDI |
| Template rules | **Verified**: page is configuration only; template has no business rules (evaluation stubbed, PROPOSED values cite Qs in the config) | FDI |
| Design system (tokens, components) | **Verified**: token-literal check passes; FDS-101 components reused (Button, IconButton, Badge, Alert, Toast, Select, NumberField, TextField, TextArea, MultiSelect, Checkbox, Menu, Modal, ConfirmDialog, DataTable, Tooltip, Breadcrumb, Spinner, EmptyState). 2 OBSERVED breakpoints | FDI |
| UX decisions | **Verified** against D8–D31 as approved in v5 (Settings nav, column-first table, full screen, minimal summary on demand, outline, bands tooltip, list actions, errors) | FDI · **needs designer** visual sign-off in preview |
| States | **Verified** in tests: list loading / empty / filtered empty / error, builder loading / not found / validation issues / save error + retry / discard / remove confirms / undo | FDI |
| Permissions | **Needs human**: `can()` is wired for create / edit / duplicate / delete / toggle, but the rules are unknown (Q15); gallery allows all | PM |
| Accessibility | **Verified** in code + tests: landmarks (Main nav, Model outline, Editor, Summary), radiogroup AND / OR with arrow keys, role="switch", labelled table cells, live save state, tooltips on focus. **Needs human**: contrast and screen-reader pass | Designer / QA |
| Responsive | **Partly verified**: 1440 layout checked in Chrome; ≤1280 and ≤800 rules are OBSERVED (no breakpoint tokens). **Needs human** device check | Designer / QA |

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
| 2026-10-13 | CHANGES-REQUESTED → IN-REVIEW | FDI | Rev 2: D16 multi-object AND / OR structure (R1, R14, R15, BR5), D17 full-screen builder proposal; §5 / §6 brought up to date with D1–D15; C7–C9, Q41–Q47; §4 re-searched. Snapshot `revisions/rev-1.md`. Needs re-approval before `/fdi-figma` |
| 2026-10-13 | IN-REVIEW → APPROVED | Aman Bansal (Product Designer) | Rev 2 approved in chat (answer: "Approve, full screen"), including Q45 = full-screen builder without the app shell. FDI transcribed |
| 2026-10-13 | APPROVED → DESIGN-IN-PROGRESS | FDI | `/fdi-figma`: gate passed |
| 2026-10-13 | DESIGN-IN-PROGRESS → DESIGN-REVIEW | FDI | Rev 2 built: full-screen builder without the app shell (6 frames, section `74:17604`), candidates Logic Switch, Logic Connector, Object Group Header, Builder Header. D10 modal superseded. No score calculation designed for AND / OR (Q41). Designer to save a named version |
| 2026-10-13 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-figma`: D18 minimal summary panel (backend capacity), D19 full clickable prototype flow, D20 best UX for the left panel. FDI transcribed |
| 2026-10-13 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | D18 minimal summary, D19 14-frame clickable prototype (flow start "DCF-0002 · Score Builder (full flow)"), D20 left-panel redesign (steps, collapsible groups, compact rows). C10, Q48–Q49 added. Designer to review in Present mode and save a named version |
| 2026-10-14 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-figma`: D21 full step-by-step prototype, one screen per important interaction. FDI transcribed |
| 2026-10-14 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | D21 applied: step-by-step prototype v2 (30 screens + 2 overlays, 111 interactions, flow start "DCF-0002 · Score Builder (step by step)"); D19 flow superseded. Q50 added. Designer to review in Present mode and save a named version |
| 2026-10-14 | DESIGN-REVIEW → CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat: D22 Applies to at model level on Details, D23 Distribute evenly visibility, D24 UX (guidance, live feedback, smoother interactions, visible shortcuts), D25 override rules (new requirement). Chose "Reopen as rev 3". FDI transcribed |
| 2026-10-14 | CHANGES-REQUESTED → IN-REVIEW | FDI | Rev 3: override rules (R17–R19, BR6), Applies to at model level on Details (D22, answers Q46), Distribute evenly visible (D23), UX additions (D24, R20); C11–C12; Q51–Q56; §4 re-searched. Snapshot `revisions/rev-2.md`. Needs re-approval before `/fdi-figma` |
| 2026-10-14 | IN-REVIEW → APPROVED | Aman Bansal (Product Designer) | Rev 3 approved in chat ("approved now move to /fdi-figma DCF-0002"). FDI transcribed |
| 2026-10-14 | APPROVED → DESIGN-IN-PROGRESS | FDI | `/fdi-figma`: gate passed |
| 2026-10-14 | DESIGN-IN-PROGRESS → DESIGN-REVIEW | FDI | Rev 3 built: prototype v3 (36 screens + 2 overlays, 139 interactions, flow start "DCF-0002 · Score Builder v3 (step by step)"); Override Rule Row candidate, override markers; v2 flow superseded. Designer to review in Present mode and save a named version |
| 2026-10-15 | DESIGN-REVIEW → CHANGES-REQUESTED | Aman Bansal (Product Designer) | `/fdi-revise` with new requirement input I10 (D26); same route as rev 3 (reopen requirements). FDI transcribed |
| 2026-10-15 | CHANGES-REQUESTED → IN-REVIEW | FDI | Rev 4: I10 logic requirements (R21–R28, BR7), C13–C17, Q57–Q62, eight earlier questions partly answered; §4 re-searched. Snapshot `revisions/rev-3.md`. Needs re-approval before `/fdi-figma` |
| 2026-10-15 | IN-REVIEW → APPROVED | Aman Bansal (Product Designer) | Rev 4 approved in chat ("Addproved /fdi-figma DCF-0002"). FDI transcribed |
| 2026-10-15 | APPROVED → DESIGN-IN-PROGRESS | FDI | `/fdi-figma`: gate passed |
| 2026-10-15 | DESIGN-IN-PROGRESS → DESIGN-REVIEW | FDI | Rev 4 built: prototype v4 (I10 points model, 12 screens + overlay, 94 interactions), Override Rule Row outcome variants; v3 flow kept. Designer to review in Present mode and save a named version |
| 2026-10-15 | DESIGN-REVIEW → CHANGES-REQUESTED | Aman Bansal (Product Designer) | `/fdi-revise` with D27–D31; chat answers: v3 flow as base, flow scope = create, edit / delete / list, errors and edge cases. FDI transcribed |
| 2026-10-15 | CHANGES-REQUESTED → IN-REVIEW | FDI | Rev 5: v3 flow as base (D27), band label + description + tooltip (D28, R29), full interaction inventory (D29), left panel proposals (D30), summary on demand (D31, R30); C18; Q63–Q67. Snapshot `revisions/rev-4.md`. Needs re-approval before `/fdi-figma` |
| 2026-10-15 | IN-REVIEW → APPROVED | Aman Bansal (Product Designer) | Rev 5 approved in chat ("Approved /fdi-figma DCF-0002"), after answering Q63–Q67. FDI transcribed |
| 2026-10-15 | APPROVED → DESIGN-IN-PROGRESS | FDI | `/fdi-figma`: gate passed |
| 2026-10-15 | DESIGN-IN-PROGRESS → DESIGN-REVIEW | FDI | Rev 5 built: prototype v5 (60 screens + 6 overlays, 201 interactions) on the v3 base with bands label / description / tooltip, summary on demand, left-panel improvements, list actions and errors. Designer to review in Present mode and save a named version |
| 2026-10-15 | DESIGN-REVIEW → DESIGN-APPROVED | Aman Bansal (Product Designer) | v5 prototype (section `167:39825`) approved in chat (answer: "Approve, record version later"). `figma.approvedVersionId` still null: `/fdi-build` blocked until the designer saves a named version and shares its link. FDI transcribed |
| 2026-10-15 | DESIGN-APPROVED (version recorded) | Aman Bansal (Product Designer) | Named version `2410527021694858974` shared in chat; recorded as `figma.approvedVersionId`. `/fdi-build` gate can pass |
| 2026-10-15 | DESIGN-APPROVED → CODE-IN-PROGRESS | FDI | `/fdi-build`: gate passed (version 2410527021694858974). Built on `fdi/DCF-0002-scoring-builder` (3 local commits); typecheck, 208 tests and token check pass; impact report in §7.1. Not pushed: Station has no git remote |
| 2026-10-15 | CODE-IN-PROGRESS (no change) | FDI | Designer: "not 100% same as design". Design-parity pass committed (`c55c068`); shared Field / MultiSelect fills aligned to FDS-101 (visible on DCF-0001 / DCF-0003 forms, see §7.1). Q68–Q74 and C19 added |
| 2026-10-20 | CODE-IN-PROGRESS → CHANGES-REQUESTED | Aman Bansal (Product Designer) | Reopened in chat for raise rules (I11): answer "Reopen as rev 6". FDI transcribed. The build on `fdi/DCF-0002-scoring-builder` stays as is until the new design is approved |
| 2026-10-20 | CHANGES-REQUESTED → IN-REVIEW | FDI | `/fdi-revise`: rev 6 (D32). Snapshot `revisions/rev-5.md` |
| 2026-10-20 | IN-REVIEW → APPROVED | Aman Bansal (Product Designer) | Rev 6 approved in chat ("Approve, use FDI proposals"): Q75, Q76, Q78, Q80 as FDI proposed; Q77, Q79 open. FDI transcribed |
| 2026-10-20 | APPROVED → DESIGN-REVIEW | FDI | `/fdi-figma`: rev 6 Raise rules built, section `351:19832` (8 frames, 13 interactions, 2 flow starts); Raise marker on 2 work-file candidates; C21. Designer to review in Present mode and save a named version |
| 2026-10-20 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | D33: raise must be part of override rules, not a separate feature. Chat answers: "Fix in Figma only"; "Score conditions + Raise outcome". FDI transcribed |
| 2026-10-20 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | `/fdi-figma` re-work for D33: raise folded into override rules (Scores in the If menu, Raise to that score outcome); section `351:19832` rebuilt (8 frames, 12 interactions, 2 flow starts); Override Rule Row gains Raise variant; Raise property / ⬆ marker removed; C21 withdrawn |
| 2026-10-20 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | D34 (outcome definitions for stakeholders) and D35 (category instead of score in conditions), in chat. FDI transcribed |
| 2026-10-20 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | D34 doc published (private claude.ai doc, link in §11); D35 applied in Figma section `351:19832` (category / band conditions) |
| 2026-10-20 | DESIGN-REVIEW → DESIGN-APPROVED | Aman Bansal (Product Designer) | `/fdi-build` request: "mark latest figma design as approved", version `2412391106275681573` (rev 6, sections `351:19832` and v5 `167:39825`). FDI transcribed |
| 2026-10-20 | DESIGN-APPROVED → CODE-IN-PROGRESS | FDI | `/fdi-build` rev 6: gate passed (version 2412391106275681573). Station tree had 11 mode-only changes (OneDrive 644 → 755), restored; building on `fdi/DCF-0002-scoring-builder` |
| 2026-10-20 | CODE-IN-PROGRESS (no change) | FDI | Rev 6 built: commit `6b9fd15` (raise outcome, category / band conditions, hints; Select optgroups). 223 / 223 tests, token check pass; V6-03 measured exact in Chrome. C22 raised. Not pushed: Station has no git remote |
| 2026-10-21 | CODE-IN-PROGRESS → CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-revise` (D36): save the current version and make Version 2 from the one-page map (I12). FDI transcribed; role taken from the case owner, as before |
| 2026-10-21 | CHANGES-REQUESTED → IN-REVIEW | FDI | `/fdi-revise`: rev 7 = Version 2 (D36). Snapshot `revisions/rev-6.md` = Version 1 (frozen). Q81–Q88 open |
| 2026-10-21 | IN-REVIEW (no change) | Aman Bansal (Product Designer) | Sent the side-panel screenshot (I15), Q95 answered; §5.3 panel look updated in place. Q90–Q94 open |
| 2026-10-21 | IN-REVIEW → APPROVED | Aman Bansal (Product Designer) | Rev 8 (Version 3) approved in chat: "Approved /fdi-figma DCF-0002", after FDI offered defaults for Q90–Q94; the defaults are recorded as accepted. FDI transcribed |
| 2026-10-21 | APPROVED → DESIGN-REVIEW | FDI | `/fdi-figma`: Version 3 built, section `425:32433` (V3-00 to V3-11, 53 interactions, flow "DCF-0002 · Version 3 · one object, shared bands (rev 8)"). Version 1 and 2 untouched |
| 2026-10-21 | DESIGN-REVIEW → DESIGN-APPROVED | Aman Bansal (Product Designer) | In chat: "Approved DCF-0002 · Version 3 · Outline + Data Filter rules, one object, shared bands (rev 8 · D40)" with Figma version `2412747704466134651` (section `425:32433`). FDI transcribed |
| 2026-10-21 | DESIGN-APPROVED → CODE-IN-PROGRESS | FDI | `/fdi-build` Version 3 started |
| 2026-10-21 | CODE-IN-PROGRESS (no change) | FDI | Version 3 built and checked (commit `62c57a9`, 246 tests). Waiting for the user before pushing to the Station repo |
| 2026-10-21 | IN-REVIEW (no change) | Aman Bansal (Product Designer) | Chat answers D37: Q81, Q86, Q87 answered, Q88 "similar" (FDI reading Restricted = Reject). FDI updated rev 7 in place |
| 2026-10-21 | IN-REVIEW (no change) | Aman Bansal (Product Designer) | Chat answers D38: Q82 yes, Q83 yes, Q84 no (FDI reading: both people Low), Q85 yes. All Version 2 questions answered; rev 7 ready for approval |
| 2026-10-21 | IN-REVIEW → APPROVED | Aman Bansal (Product Designer) | Rev 7 (Version 2) approved in chat: "Approved /fdi-figma DCF-0002". FDI transcribed; Q84 and Q88 FDI readings accepted with the approval |
| 2026-10-21 | APPROVED → DESIGN-REVIEW | FDI | `/fdi-figma`: Version 2 built in Figma, section `408:23777` (V2-00 to V2-06, 23 interactions, flow start "DCF-0002 · Version 2 · One-page builder (rev 7)"). Version 1 untouched. Awaiting designer review and a saved Figma version |
| 2026-10-21 | DESIGN-REVIEW → DESIGN-CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat with `/fdi-figma` (D39, I13): "looking like this but need to be in full sereen". FDI transcribed; role from the case owner, as before |
| 2026-10-21 | DESIGN-CHANGES-REQUESTED → DESIGN-REVIEW | FDI | `/fdi-figma` (D39): Version 2 rebuilt in the Data Filter look at full screen, section `416:111151` (R-00 to R-10, 35 interactions). First Version 2 section `408:23777` superseded. Open: Q89 |
| 2026-10-21 | DESIGN-REVIEW → CHANGES-REQUESTED | Aman Bansal (Product Designer) | In chat (D40): Version 3 = Version 1 style + Data Filter concept, one object per model, shared band settings panel. FDI transcribed; role from the case owner, as before |
| 2026-10-21 | CHANGES-REQUESTED → IN-REVIEW | FDI | `/fdi-revise` flow: rev 8 = Version 3 (D40). Snapshot `revisions/rev-7.md`. Q90–Q95 open |

## 14. Revision Log

| Rev | Date | Summary of changes | Feedback items addressed |
|---|---|---|---|
| 1 | 2026-10-13 | Initial | — |
| 2 | 2026-10-13 | Multi-object scoring with AND / OR structure (R1, R14–R16, BR5); full-screen three-pane builder proposed (§5.1); P2 now in scope in §5; §6 adds Button Group, logic connector, Object Group, builder header; §4 re-search (Advanced Filter Builder precedent, FDS-101 Button Group); C7–C9; Q41–Q47; Q23 / Q30 updated | D16, D17 (D1–D15 carried into §5 / §6) |
| 3 | 2026-10-14 | Override rules at attribute / object level, forcing a band or setting a score (R17–R19, BR6); Applies to back to Details at model level; Distribute evenly visible; guidance, client-side live feedback, smoother interactions, visible shortcuts (R20, §5.1); §6 Override Rule Row, override marker, checkbox menu; C11–C12; Q46 answered; Q51–Q56 | D22, D23, D24, D25 |
| 4 | 2026-10-15 | I10 (LMAX risk policy) as logic reference: points scoring, matrix attributes, Reject / Refer value outcomes, default rules, decimals, threshold bands, extended override outcomes and conditions (R21–R28, BR7); §5.1 / §6 proposals; C13–C17; Q57–Q62; Q7, Q8, Q10, Q41, Q52, Q53, Q55, Q56 partly answered | D26 |
| 5 | 2026-10-15 | v3 flow as base with rev 4 capabilities folded in; band label + description + tooltip (R29); summary panel on demand with floating button (R30); left-panel usability proposals; full interaction inventory for create / edit-delete-list / errors; §6 Tooltip, band row, floating button; C18; Q63–Q67 | D27, D28, D29, D30, D31 |
| 6 | 2026-10-20 | Raise rules: attribute → object and object → overall, each with an admin threshold, raise only (R31–R33, BR8–BR9 confirmed by Aman Bansal); §5.1 toggle-and-threshold UI proposal; §6 raise card composite + outline marker variant; C20; Q75–Q80 | D32 |
| 7 | 2026-10-21 | **Version 2** from the one-page map (I12): Version 1 (rev 6) saved and frozen; one-page builder proposal (§5.2): Score settings with no-range bands, objects + conditions, grouped attribute table with Weightage % / NA, override toggle and one-line rules; §6.v2; §7 versioning; R34–R39; C23–C25; Q81–Q88 | D36 |
| 8 | 2026-10-21 | **Version 3** (D40): Version 1 builder style with the Data Filter rules tree (I13), one object per model (R40), shared band categories in a Settings side panel from the list's ⋮ menu (R41), layout (R42), BR10; §5.3, §6.v3, §7 note; C27; Q90–Q95. Version 1 and 2 unchanged | D40 |
