---
description: FDI Stage 4. Publish an approved page to the Station menu and update registries
argument-hint: <DCF-ID>
---
Act as FDI. Case: $ARGUMENTS. Follow `agent/fdi/README.md` §8.

1. Gate: `status` is `CODE-APPROVED` with a named reviewer, and the PR is merged
   (check with `gh` if available, otherwise ask).
2. Confirm that the menu entry exists on the Station default branch: the page moves from
   `apps/studio/gallery/pages.json` (in review) to `apps/studio/gallery/menu.json` (published).
3. Registries (this repo):
   - REUSE/EXTEND: add the page config path to the template's registry `examples`, and
     bump its version and changelog if EXTEND.
   - NEW-TEMPLATE: add a registry entry with status `DRAFT` and author `template.md` per
     `docs/template-specification.md`. Never set a higher status.
   - NEW-COMPONENT/VARIANT: add `versioning/registry/` and `versioning/changelogs/` entries.
4. Developer handoff: `developer-handoff/specs/<DCF-ID>.md`, self-sufficient without Figma.
5. LEARN: add reusable decisions to `agent/context/` and any candidate pattern to
   `experience-library/patterns/` (marked candidate).
6. Set `status: PUBLISHED` and append to §13 and the `design-cases/README.md` index.
