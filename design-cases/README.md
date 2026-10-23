# Design Cases

**Audience: designers, reviewers, and FDI.** One folder per Design Case File produced by
FDI (FYNXT Design Inspector). See [`agent/fdi/README.md`](../agent/fdi/README.md).

```
design-cases/DCF-NNNN-<slug>/
├── case-file.md      # the living case file (current revision)
├── inputs/           # PRD/FRD extracts, wireframes, comments, ideations it was built from
└── revisions/        # rev-N.md snapshots taken before each /fdi-revise
```

**How to review:** in **FDI Studio** (Station repo, `npm run dev`) open the case, add feedback and use
the gate buttons. Studio writes the same rows described here. Or, in the file directly: add your points as rows in §11 *Review Feedback*. Then set the
frontmatter `status` to `CHANGES-REQUESTED` or `APPROVED` and add a §13 *Status History*
row with your name. Run `/fdi-revise <DCF-ID>` to have FDI produce the next revision.

## Index

| ID | Title | Module | Status | Rev | Owner |
|---|---|---|---|---|---|
| [DCF-0001](DCF-0001-crm-tasks/case-file.md) | CRM Tasks — workspace, Add/Edit Task and follow-ups | CRM / Interactions | CODE-REVIEW | 1 | Aman Bansal |
| [DCF-0002](DCF-0002-scoring-builder/case-file.md) | Scoring Builder — weighted scoring models for CRM objects | CRM / Settings › Brand Setup | DESIGN-REVIEW | 8 | Aman Bansal |
| [DCF-0003](DCF-0003-object-enrolment/case-file.md) | Filter-based (Object) Enrolment — Incentive Programs list + full-screen create wizard | FYNXT Cloud (CRM) / Incentive Program | CODE-REVIEW | 1 | Aman Bansal |
| [DCF-0005](DCF-0005-incentive-program-modules/case-file.md) | Incentive Program modules — Formula Builder, Custom Events & CRM Attributes, PAMM Rebates | FYNXT Cloud (CRM) / Incentive Program | CODE-REVIEW | 1 | Aman Bansal |
