# DL-0001 — Introduce FDI (FYNXT Design Inspector) and the Design Code Station

- **Status:** PROPOSED. Awaiting Product Designer and Governance approval.
- **Date:** 2026-10-07
- **Requested by:** aman.b@fynxt.com

## Decision proposed

Add a gated design agent, FDI, that takes PRD/FRD/wireframes/comments/requirements
and ideations through: **Design Case File** (human-reviewed, revised until approved) →
**Figma design** (designer-approved, manual edits allowed) → **code in a separate Design
Code Station repo** (UI code review) → **publish** to the Station gallery menu and
registries. Pages that an existing template covers are configured, not templated
again. Missing components are built first, in a single shared `@fynxt/ui` package.

Full specification: [`agent/fdi/README.md`](../../agent/fdi/README.md).

## Points needing explicit approval

1. **Template home (conflict with CLAUDE.md §3/§12 and `docs/template-specification.md`
   File Layout).** Those name `experience-library/templates/` in this repo as the home of
   template code. With a separate Station repo, the proposal is that this repo keeps the
   template *records* and the registry, and the code lives in Station
   `packages/templates`, with `registry.location` pointing there. Approve, or keep the
   code here and use the Station only for pages.
2. **New top-level `design-cases/` folder** and the case-file status machine (README §3).
3. **Single token source** `design-system/tokens/tokens.json`. Populating it depends on
   approving the DRAFT [visual foundation contract](../../docs/fynxt-visual-foundation-contract.md).
4. **Migration of `FYNXT-TPL-LIST-002`** to consume shared tokens and components (and
   possibly to move into the Station).
5. **Location of the existing component library** mentioned by the requester: wrap it,
   replace it or adopt it as `@fynxt/ui`.

## Consequences

- Global change propagation becomes structural (one source per layer) rather than a
  matter of discipline.
- Approval gates are an audit trail in the case file. Hard enforcement depends on Station
  branch protection and CI, which are not yet configured.
