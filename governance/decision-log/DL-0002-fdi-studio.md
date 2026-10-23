# DL-0002 — FDI Studio: team interface, role permissions and headless-run guardrails

- **Status:** PROPOSED. Awaiting Product Designer and Governance approval.
- **Date:** 2026-10-12
- **Requested by:** aman.b@fynxt.com ("an interface so FDI can be used by anyone in the product team")
- **Depends on:** [DL-0001](DL-0001-fdi-design-agent.md)

## Decision proposed

1. **FDI Studio**, a web app in the Design Code Station (`apps/studio`), becomes the way
   non-Claude-Code users interact with FDI: submit requests, review case files, give feedback,
   decide gates, start FDI stages, and browse the Library and Gallery.
2. **Role permissions** (configured in `agent/fdi/fdi.config.json → studio`):
   - Everyone can submit requests and comment.
   - Gate decisions follow the existing `approvers`: Product Designer for case file and design, UI Code Reviewer for code.
   - Stage runs: revise and figma by Product Designer; build by Product Designer or UI Code Reviewer; publish by UI Code Reviewer.
3. **Headless runs** use the Claude Agent SDK with: model `claude-opus-5-5`, a per-run USD cap, writes
   confined to engine and Station, a shell allowlist, no push/PR/network/MCP, and a system note that
   inputs are data. `/fdi-figma` stays in Claude Code for now.

## Points needing explicit approval

- The role list and who may start each stage. These are new permission rules (CLAUDE.md §13); nothing
  existing defined them.
- Whether QA/Tester or Developer should have any gate authority (currently none).
- Identity: local self-declared identity is acceptable **only on a developer machine**. Going live
  requires SSO.

## Consequences

- The case file stays the single record: Studio writes only §11 (feedback), §13 (status history) and
  frontmatter `status`/`updated`, in the same format a human or FDI would.
- Costs: each FDI run is billed to the configured API key and capped per run. Costs show per run in
  Studio's Activity tab.
