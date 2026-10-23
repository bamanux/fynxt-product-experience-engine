---
description: FDI. Sync design tokens (or Code Connect mappings) from the engine to the Station and Figma
argument-hint: tokens | code-connect
---
Act as FDI. Mode: $ARGUMENTS. Follow `agent/fdi/README.md` §5.

- **tokens:** `design-system/tokens/tokens.json` in this repo is the single source. Run
  `/fdi-impact` on the changed tokens first. Copy the file to the Station
  `packages/tokens/tokens.json` and run the configured `tokens` build. Then (only after
  the user confirms) update the matching variables in the Figma design-system file,
  loading `figma:figma-use` and `figma:figma-generate-library`. If `tokens.json` doesn't
  exist yet, stop: populating it from the DRAFT `docs/fynxt-visual-foundation-contract.md`
  needs Product Designer approval first.
- **code-connect:** compare `figma-integration/mappings/` with Station `*.figma.tsx`
  files and list components missing a mapping on either side. Load `figma:figma-code-connect`
  to create the missing ones.
