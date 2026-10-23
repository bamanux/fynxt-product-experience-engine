# FDI plugin (Claude Code)

Packages FDI (FYNXT Design Inspector) so anyone in the FYNXT Claude organization can install it
from the org plugin library. It works in VS Code, the desktop app and the CLI, on their own seat.

- `agents/fdi.md` and `commands/fdi-*.md` are **generated** from the engine's `.claude/` by
  `./sync-from-engine.sh`. Edit the engine copies, then re-sync. Never edit here.
- `commands/fdi-setup.md` is plugin-only: it gets the FYNXT repos from GitHub into `~/fynxt` and checks the machine.
- The commands operate on the engine repo (`CLAUDE.md`, `agent/fdi/`, `design-cases/`), so users still
  open that repo. The plugin gives them FDI. The repo gives them FYNXT's shared knowledge.

Release: sync → bump `version` in `.claude-plugin/plugin.json` → publish to the org (admin review).

## For colleagues

1. In Claude Code, install **FDI** from the FYNXT plugin library (`/plugin`, or the plugin list in the Claude app),
   or straight from GitHub (the engine repo's root `.claude-plugin/marketplace.json`):
   `claude plugin marketplace add bamanux/fynxt-product-experience-engine`, then
   `claude plugin install fdi@fynxt`.
2. Run **`/fdi-setup`**. It signs you in to GitHub if needed, downloads the FYNXT repos, and checks Figma and login.
3. Open `~/fynxt/fynxt-product-experience-engine`, then `/fdi-intake <title> -- <requirement>`.
