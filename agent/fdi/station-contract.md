# Design Code Station — Repository Contract

**Status: PROPOSED. Scaffolded locally 2026-10-12** at `../fynxt-design-code-station`
(no git remote yet). This is the structure FDI expects in the separate Design Code
Station repo (`fdi.config.json` → `station`). `/fdi-station-init` scaffolds it into an
**empty** repo. On a non-empty repo it only reports what differs from this contract.

The technology matches the only existing FYNXT frontend code (`FYNXT-TPL-LIST-002`):
**React 18 + TypeScript + Vite + Vitest + Testing Library**, organised as **npm
workspaces**. No additional framework, state library or styling approach is
introduced (CLAUDE.md §20). Styling is plain CSS that consumes token CSS variables.

```
fynxt-design-code-station/
├── package.json                  # npm workspaces: packages/*, apps/*
├── tsconfig.base.json
├── packages/
│   ├── tokens/                   # @fynxt/tokens — GENERATED, never hand-edited
│   │   ├── tokens.json           # copy of engine design-system/tokens/tokens.json (synced)
│   │   ├── scripts/build.ts      # tokens.json → dist/tokens.css (CSS vars) + dist/tokens.ts
│   │   └── dist/
│   ├── ui/                       # @fynxt/ui — THE component library (single source)
│   │   └── src/<Component>/
│   │       ├── <Component>.tsx
│   │       ├── <Component>.css   # var(--fx-*) only; literals need /* OBSERVED */ note
│   │       ├── <Component>.test.tsx
│   │       ├── <Component>.figma.tsx   # Code Connect mapping
│   │       └── index.ts
│   └── templates/                # @fynxt/templates — page templates (config-driven)
│       └── src/<TEMPLATE-ID>/    # e.g. FYNXT-TPL-LIST-002; imports only @fynxt/ui + tokens
├── scripts/                      # sync-tokens.mjs (runs the engine's build.mjs), check-token-literals.mjs
└── apps/
    └── studio/                   # FDI Studio: team interface to FDI + the page gallery
        ├── server/               # API: cases, reviews, role gates, FDI runs (Agent SDK)
        ├── src/                  # UI built only from @fynxt/ui + tokens
        └── gallery/
            ├── menu.json         # Module › Section › Page (FDI writes this on publish)
            ├── pages.json        # pages registered for review: id, label, module, section, caseId, template (FDI writes this on build)
            ├── registry.ts       # page id → lazy page module
            └── pages/<module>/<page>.page.tsx   # a page = template from @fynxt/templates + config
```

## Invariants FDI checks on every build

1. `packages/ui` and `packages/templates` import tokens only through CSS variables or
   `@fynxt/tokens`. There are no raw hex, px font-size or spacing literals unless they
   are marked `/* OBSERVED: no token — DCF-XXXX */`.
2. `packages/templates` never contains a component that duplicates one in `packages/ui`.
3. `apps/studio/gallery/pages/**` contains **configuration only**: no JSX layout, no CSS.
   A page that needs layout the template can't express is an EXTEND or NEW-TEMPLATE
   decision for the case file, not a page-level workaround.
4. Every `packages/ui` component has a test and a Code Connect file.
5. Each package carries a semver version. A breaking change to a published
   component or template is a MAJOR bump with a migration note
   (CLAUDE.md §18).

## Why this gives global propagation

Token change → one regenerated `tokens.css` → every component, template and page.
Component change → one package version → every template and page that imports it.
Template fix → every page config that references that template. There are no copies,
so nothing drifts.

## Open items (need a human)

- Station repo **URL** (local path is set: `../fynxt-design-code-station`).
- Location of the component library the team already has. If it is a React package,
  `packages/ui` should **wrap or replace it by decision**, not duplicate it.
- Whether `FYNXT-TPL-LIST-002` moves from `experience-library/templates/` into
  `packages/templates/` (with the registry pointing there), or stays here. Not moved
  without approval.
- CI and branch protection for the Station, which provide the real enforcement of
  the code-review gate.
