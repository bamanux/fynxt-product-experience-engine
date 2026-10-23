# DL-0003 — Claude access via FYNXT org seats only (no shared API key)

- **Status:** PROPOSED. Needs the Claude org owner and IT.
- **Date:** 2026-10-21
- **Requested by:** aman.b@fynxt.com: "only users with a Claude account under FYNXT can log in, using their own account
  credits, not a common credit pool, so we can monitor cost and reduce cost to the company."
- **Supersedes:** the `ANTHROPIC_API_KEY` server-side run path in DL-0002 (FDI Studio).

## Decision proposed

1. Claude Code (VS Code, desktop, CLI) is locked to the FYNXT Claude organization with managed settings
   `forceLoginMethod: "claudeai"` and `forceLoginOrgUUID`. API-key and personal-account logins are blocked.
2. All FDI work runs in each person's own Claude Code session, on their seat. **FDI Studio stops calling
   Claude itself.** Its "Run FDI" buttons become "Run in Claude Code" (copy the `/fdi-*` command). Studio
   stays as the shared dashboard for cases, reviews, Library and Gallery.
3. Cost control: seat allowances first, optional extra usage with member-level caps, monthly review of
   claude.ai Claude Code analytics and the spend report.
4. Tools (Figma, Jira/Confluence, GitHub) connect via MCP with each person's own tool permissions, added as
   org connectors by an admin.

## Open items

- FYNXT Claude org ID (claude.ai/admin-settings/organization) and plan type (Team or Enterprise).
- Whether extra usage is allowed, and the cap per member.
- Who deploys managed settings (IT via MDM/Intune, or the install scripts in `governance/claude-access/`).

## Hosting decision (2026-10-22)

- **Hosting:** Azure (Container Apps) with Microsoft 365 / Entra ID sign-in, FYNXT tenant and `@fynxt.com` only.
- **Git host:** GitHub (private repos for the engine and the Station).
- **Implemented on Station branch `studio/hosting`** (in `~/fynxt-work/studio-hosting`, not yet committed):
  `FDI_RUN_MODE=claude-code` (Studio shows `/fdi-*` commands instead of calling Claude), engine Git sync
  (each Studio change is a commit authored by the signed-in person), `/api/health`, Dockerfile, and
  `deploy/azure/README.md` for IT.
