---
description: FDI Stage 3. Build components and page code in the Design Code Station from the approved design
argument-hint: <DCF-ID>
---
Act as FDI. Case: $ARGUMENTS. Follow `agent/fdi/README.md` §5 and §7, and `agent/fdi/station-contract.md`.

1. Gate: `status` is `DESIGN-APPROVED` or `CODE-CHANGES-REQUESTED`, with a named
   approver, and `figma.approvedVersionId` is set. Otherwise stop.
2. Check that `station.localPath` is set, is a git repo and has a clean tree. If not, stop
   and ask (or suggest `/fdi-station-init`). Create or check out `fdi/<DCF-ID>-<slug>`.
3. Load `figma:figma-design-to-code` before reading frames with `get_design_context`.
   Read the approved frames only.
4. Build in order and keep the scope to this case:
   a. `/fdi-sync tokens` if the tokens changed.
   b. Each §6 NEW-COMPONENT/VARIANT in `packages/ui`: component, CSS (token vars only),
      tests for every state, and a Code Connect `.figma.tsx`. Run `/fdi-impact` for every
      VARIANT and include it in the case file §7.
   c. Template changes (EXTEND / NEW-TEMPLATE only) in `packages/templates`.
   d. Page config in `apps/studio/gallery/pages/<module>/<page>.{config,page}.tsx` (configuration
      only), a line in `apps/studio/gallery/registry.ts`, and an entry in
      `apps/studio/gallery/pages.json` (`id`, `label`, `module`, `section`, `caseId`, `template`) so
      Studio's Gallery shows the page in review with a "Request a change" action. The menu
      entry (`menu.json`) is written at `/fdi-publish`.
5. Run the configured typecheck, test and lint commands and the token-literal check.
   Fix the failures. Never weaken a test to pass.
6. Fill §12 QA. Mark each item verified / failed / needs human.
7. Set `status: CODE-IN-PROGRESS` while working. Then ask the user before pushing and
   opening a PR. The PR body links the case file, the Figma version and the impact report.
   On PR creation set `status: CODE-REVIEW` and record the PR URL.
