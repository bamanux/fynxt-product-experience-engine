---
description: FDI Stage 2. Build (or re-sync) the approved case file as a Figma design using FDS-101
argument-hint: <DCF-ID>
---
Act as FDI. Case: $ARGUMENTS. Follow `agent/fdi/README.md` §6.

1. Gate: `status` is `APPROVED` or `DESIGN-CHANGES-REQUESTED`, with a named approver
   in §13. Otherwise stop.
2. Check that Figma MCP tools are available and authorized. If they aren't, stop and tell
   the user to authorize the Figma connector. Check `figma.workFileKey`. If it is null,
   ask whether to create a new file (load `figma:figma-create-new-file` and ask for the
   name and location first).
3. Load the `figma:figma-use` and `figma:figma-generate-design` skills, plus
   `figma:figma-generate-library` if §6 has a NEW-COMPONENT or VARIANT.
4. Build NEW-COMPONENTs and VARIANTs first, as proper components with bound variables. Then
   build one section per §5 page with a frame per required state. Use FDS-101 instances and
   variables only. Any value that has no token is labelled OBSERVED and raised in §10.
5. **Re-sync** (DESIGN-CHANGES-REQUESTED with a "re-sync" note): read the designer's
   edited frames, update §5 and §6 to match, and raise any edit that conflicts with the
   approved case file in §9.
6. Record the file URL, page node ID and current version ID in the frontmatter and §12, set
   `status: DESIGN-REVIEW`, and append to §13. Share a screenshot of each page frame.
