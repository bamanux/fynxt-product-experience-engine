# Commands

Slash-command style agent commands specific to this system, for actions a designer or
developer would trigger explicitly rather than Claude choosing autonomously.

The runnable files live in [`.claude/commands/`](../../.claude/commands/) so Claude Code
discovers them. They are indexed here.

## FDI (FYNXT Design Inspector) — see [`agent/fdi/README.md`](../fdi/README.md)

| Command | Stage | Gate required |
|---|---|---|
| `/fdi-intake <title> -- <inputs>` | 1. Create Design Case File | — |
| `/fdi-revise <DCF-ID>` | 1. Rewrite from review feedback | `CHANGES-REQUESTED` |
| `/fdi-status [DCF-ID]` | Any. Read-only status | — |
| `/fdi-figma <DCF-ID>` | 2. Build or re-sync Figma design | `APPROVED` / `DESIGN-CHANGES-REQUESTED` |
| `/fdi-build <DCF-ID>` | 3. Code in Design Code Station | `DESIGN-APPROVED` / `CODE-CHANGES-REQUESTED` |
| `/fdi-publish <DCF-ID>` | 4. Menu + registries + handoff | `CODE-APPROVED` |
| `/fdi-impact <target>` | Impact analysis for shared changes | — |
| `/fdi-sync tokens\|code-connect` | Global token / mapping sync | — |
| `/fdi-station-init [path]` | Scaffold or audit the Station repo | — |
