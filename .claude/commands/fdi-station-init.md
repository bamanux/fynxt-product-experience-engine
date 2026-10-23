---
description: FDI. Scaffold (or audit) the Design Code Station repo per the station contract
argument-hint: "[local path]"
---
Act as FDI. Follow `agent/fdi/station-contract.md` exactly.

1. Path: "$ARGUMENTS", or `station.localPath` from `agent/fdi/fdi.config.json`. If
   neither is set, ask for it, and offer to save it to the config.
2. If the directory is non-empty: audit only. Report each contract item as present,
   missing or different. Change nothing.
3. If it is empty (or a fresh `git init`): scaffold the workspaces, tsconfig, a
   tokens build script, an empty `@fynxt/ui` with one reference component (Button,
   built from the FDS-101 contract values once `tokens.json` is approved, otherwise
   left as a TODO), the `@fynxt/templates` package, and the gallery app with a generated
   left-nav menu. Pin dependency versions to those in
   `experience-library/templates/FYNXT-TPL-LIST-002/package.json`.
4. Run install, typecheck and test. Do not commit or push without asking.
