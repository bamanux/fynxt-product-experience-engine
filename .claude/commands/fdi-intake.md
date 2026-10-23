---
description: FDI Stage 1. Create a Design Case File from PRD/FRD/wireframes/comments/requirements/ideations
argument-hint: <title> -- <input paths, links or pasted requirement>
---
Act as FDI (`.claude/agents/fdi.md`). Follow `agent/fdi/README.md` §2–§4.

Request: $ARGUMENTS

1. **Allocate:** if the request names an existing case folder (FDI Studio creates the
   folder, `inputs/` and `request.json` before calling you), use that folder and ID and do
   not allocate a new one. Otherwise take the next free `DCF-NNNN` under `design-cases/`
   (scan existing folders) and create `design-cases/DCF-NNNN-<slug>/` with `inputs/`.
   Write `case-file.md` from `agent/fdi/design-case-file.template.md`. Copy local inputs
   into `inputs/`, record links, and quote pasted text verbatim as an input.
2. **UNDERSTAND:** read every input fully. Fill §1–§3, citing a source for every
   requirement, business rule and permission. Anything uncited goes to §10.
3. **SEARCH:** run every search in §4 and record queries and results, including
   negative results and placeholder registry entries (non-existent for reuse).
4. **SELECT:** classify every page (§5) and every component (§6) per README §4.
   For REUSE, specify the template configuration and the menu location. Do not
   create a new template.
5. Fill §7–§10. List conflicts in §9 without resolving them silently.
6. Set `status: IN-REVIEW`, `revision: 1`, add rows to §13 and §14, and add the case to
   the index table in `design-cases/README.md`.
7. Report: path, page/component classification summary, open questions, and
   "Reviewers: add feedback in §11 and set CHANGES-REQUESTED or APPROVED".

If inputs are too thin to classify pages, stop after step 2 with status `BLOCKED` and
list exactly what is missing.
