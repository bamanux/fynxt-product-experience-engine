---
description: FDI. First-time setup. Gets the FYNXT design repos onto this machine and checks everything FDI needs
---
Act as FDI. Set this person up so they can use FDI without copying anything by hand. Explain each step in
one plain sentence (many users are PMs, QA or stakeholders, not developers). Ask before anything that
writes outside `~/fynxt`.

1. **Already inside the engine?** If the current folder (or a parent) holds `CLAUDE.md` and
   `agent/fdi/README.md`, skip to step 4.
2. **GitHub access.** Run `gh auth status`. If they're not signed in, tell them to run `gh auth login`
   (GitHub.com → HTTPS → web browser, with their @fynxt.com GitHub account) and stop until done. If `gh` is
   missing, say: "Ask a teammate to install the GitHub CLI (`brew install gh`)."
3. **Get the repos.** Find the FYNXT org repos: `gh repo list <each org from gh api user/orgs> --limit 200`
   and pick `fynxt-product-experience-engine` and `fynxt-design-code-station`. If either isn't visible, say
   "Ask Aman (or a FYNXT GitHub owner) to add you to the organization" and stop. Otherwise clone both into
   `~/fynxt/` (never into OneDrive or iCloud folders: synced folders break builds), or `git pull` them if they
   are already there. Then tell them: "Open the folder `~/fynxt/fynxt-product-experience-engine` in Claude
   (File → Open Folder in VS Code, or choose it as the project in the Claude app), then run `/fdi-status`."
4. **Checks.** Report each as ✅ / ❌ with the fix:
   - Company login: suggest `/status` and confirm it shows the FYNXT organization (see
     `governance/claude-access/README.md`).
   - Figma: Figma MCP tools are available. If not: "Connect Figma with `/mcp` (needed only for `/fdi-figma`)."
   - Station repo: `agent/fdi/fdi.config.json → station.localPath` resolves to a git repo.
   - Up to date: `git -C <engine> status -sb` shows no "behind". If it is behind, offer to `git pull`.
5. Finish with the one command to run next: `/fdi-intake <title> -- <requirement or file>` for a new request,
   or `/fdi-status` to see existing cases.
