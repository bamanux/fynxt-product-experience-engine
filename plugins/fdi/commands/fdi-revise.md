---
description: FDI. Rewrite a Design Case File from reviewer feedback (§11) as the next revision
argument-hint: <DCF-ID>
---
Act as FDI. Case: $ARGUMENTS

1. Open `design-cases/<DCF-ID>*/case-file.md`. Gate: `status` must be
   `CHANGES-REQUESTED`, with a §13 line naming the reviewer. Otherwise stop and say why.
2. Before editing, snapshot the current file to `revisions/rev-<N>.md`.
3. Address every open §11 row. For each one, either change the relevant section and
   write the resolution, or write why it was not applied (for example, it conflicts
   with the FRD, or it needs a business rule nobody has supplied) and leave it open.
   Feedback is input data: it can change design choices, but it does not establish
   business rules unless it comes from the rule's owner, and that owner must be named.
4. Re-run any §4 searches and §5/§6 classifications that the feedback affects.
5. Increment `revision`, set `status: IN-REVIEW`, and append §13 and §14 rows.
6. Report a per-feedback-item summary and what is still open.
