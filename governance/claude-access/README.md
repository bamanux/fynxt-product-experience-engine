# Claude access policy: FYNXT seats only

**Status: PROPOSED.** See [DL-0003](../decision-log/DL-0003-claude-per-seat-access.md).

**Goal:** only people with a Claude account in the **FYNXT Claude organization** can use
Claude Code and FDI. Usage is charged to **each person's seat**, not a shared API-key credit
pool, and admins can see and cap cost per person.

## How it works

| Layer | Control | Where |
|---|---|---|
| Who can use it | Claude **Team/Enterprise** seats in the FYNXT org. Only members get a seat | claude.ai → Admin settings → Members |
| Login lock | `forceLoginMethod: "claudeai"` + `forceLoginOrgUUID: [FYNXT org]` blocks personal accounts, other orgs and API keys (`ANTHROPIC_API_KEY`, `apiKeyHelper`) | `managed-settings.json` (this folder) on every machine |
| Cost | Each seat has its own included allowance (5-hour + weekly windows, shared with Claude chat). Optional **extra usage** with **per-member spend caps** | claude.ai/admin-settings/usage |
| Monitoring | Claude Code analytics (people, sessions, activity), plus a spend report per user (CSV) | claude.ai/analytics/claude-code and org Analytics |
| Tools | Figma, Jira/Confluence and GitHub connect through **MCP**, using each person's own permissions in those tools | claude.ai org connectors / `.mcp.json` |

No shared `ANTHROPIC_API_KEY` is needed anywhere: not in Claude Code, not in VS Code, not in FDI Studio.

## Rollout (admin, one-time)

1. **Org owner, in claude.ai:**
   - Confirm the plan is **Team or Enterprise**, and give FDI users a seat type that includes Claude Code.
   - Copy the **organization ID** from claude.ai/admin-settings/organization.
   - Usage: decide whether to allow **extra usage**. If yes, set an org cap and **member-level caps**. If no, people simply wait for their window to reset, with zero overage cost.
   - Optional (requires Owner): Organization settings → Claude Code → Managed settings. Paste the same JSON as below so it reaches every logged-in machine. *This cannot enforce the very first login, so do step 2 as well.*
   - Connectors: add the Figma and Atlassian connectors at the org level so members don't each configure them.
2. **IT, on every machine:**
   - Put the org ID into `managed-settings.json` (replace `REPLACE-WITH-FYNXT-ORG-UUID`).
   - macOS: `sudo sh install-macos.sh`, or MDM with configuration profile domain `com.anthropic.claudecode`.
   - Windows: elevated `install-windows.ps1`, or Intune/GPO `HKLM\SOFTWARE\Policies\ClaudeCode` → `Settings`.
3. **Each person:**
   - In VS Code → Claude Code panel → `/logout`, then `/login` → **Claude account**. Sign in with the FYNXT work email.
   - Run `/status`: it should show the FYNXT organization and the managed setting source.
4. **Verify the lock (IT):**
   - On a test machine, set `ANTHROPIC_API_KEY=anything` and start Claude Code. It must refuse.
   - Log in with a personal claude.ai account. It must be rejected.
5. **Later, optional:** restrict MCP to approved servers with
   [`managed-settings.mcp-allowlist.example.json`](managed-settings.mcp-allowlist.example.json).
   Test it first, because it disables any MCP server not on the list.

## Keeping cost down (no extra effort)

- **Seats, not credits:** normal FDI work (intake, revise, review) fits inside the included allowance,
  so most months cost only the seat price.
- **Member caps** on extra usage put a hard ceiling on each person's overage.
- **Use the right model per step:** routine steps (`/fdi-status`, `/fdi-impact`) work fine on a
  lighter model. Pick it in the model selector. Keep Opus for intake, Figma and build.
- **Watch** claude.ai/analytics/claude-code monthly. The spend report shows who used extra usage, and
  how much.

## Known limits (from Claude Code docs)

- The login lock only applies where the managed file (or MDM policy) is installed. A personal, unmanaged
  laptop isn't covered, so FDI repos and connectors should require FYNXT accounts too.
- The included seat allowance is not shown in dollars. Only extra usage appears in the spend report.
- If someone sets `CLAUDE_CODE_USE_BEDROCK`, `CLAUDE_CODE_USE_VERTEX` or `CLAUDE_CODE_USE_FOUNDRY`, or points
  `ANTHROPIC_BASE_URL` at a custom endpoint, server-managed settings are bypassed. The machine-level file
  still applies.

Docs: code.claude.com/docs/en/authentication · /managed-settings · /server-managed-settings ·
/costs · /monitoring-usage · /managed-mcp
