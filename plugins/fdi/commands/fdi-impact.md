---
description: FDI. List every template and page affected by changing a token, component, or template
argument-hint: <token-name | @fynxt/ui Component | TEMPLATE-ID>
---
Act as FDI. Target: $ARGUMENTS. Read-only.

Search the Station (`station.localPath`) and this repo's `experience-library/templates/`:
- token → CSS `var(--…)` uses and `@fynxt/tokens` imports
- component → imports from `@fynxt/ui` (and any local look-alike copies, which are flagged
  as drift)
- template → page configs that reference it, and their versions

Output a table: consumer · file · usage · breaking-risk (per
`docs/template-specification.md` Breaking vs Non-Breaking), plus the recommended version
bump. If a case ID is given in context, write the result into its §7.
