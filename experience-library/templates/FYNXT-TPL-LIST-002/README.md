# FYNXT-TPL-LIST-002 — Table List (Implementation Pilot)

**Status: implementation pilot, not a registered template.** This directory contains
working code proving that `FYNXT-TPL-LIST-002` (Table List) can be built as a
reusable, configurable template rather than a hardcoded Leads screen. It is **not**:

- a registered template (`templates/registry/template-registry.json` has not been
  touched — `FYNXT-TPL-LIST-001` remains the only `LIST`-category entry, still a
  placeholder),
- a Template Record (`template.md`, per
  [`docs/template-specification.md`](../../../docs/template-specification.md)'s File
  Layout, has not been authored),
- promoted past `DRAFT` in any sense.

The authoritative design source is
[`docs/golden-template-list-specification.md`](../../../docs/golden-template-list-specification.md)
Revision 2. See [`docs/implementation-notes.md`](docs/implementation-notes.md) in this
directory for what was actually built, what it proves, and what remains open —
required reading before this goes any further.

## Layout

```
FYNXT-TPL-LIST-002/
├── src/
│   ├── template/     # The template itself: TableList.tsx, its config/data types,
│   │                 # the state-management hook, styling
│   ├── patterns/      # Small default implementations of extension points this
│   │                 # template composes but does not own (Row Actions, Bulk
│   │                 # Action Bar, Pagination) — swappable, not the real patterns
│   └── data/          # A generic mock data-adapter factory (pilot-only — see
│                       # docs/implementation-notes.md)
├── examples/
│   ├── leads/          # EXAMPLE / PILOT configuration — all Leads-specific content
│   │                   # lives here, isolated from src/template/
│   └── demo-records/   # CONTRAST configuration — a synthetic entity, proving no
│                       # Leads-specific assumption leaked into the template
├── tests/              # Automated tests (see docs/implementation-notes.md for
│                       # what each covers and what actually ran)
├── demo/                # A manual preview harness (Vite dev server) — not
│                       # production code
└── docs/
    └── implementation-notes.md   # Step 15 deliverable
```

This mirrors [`docs/template-specification.md`](../../../docs/template-specification.md)'s
File Layout (`template.md` / `src/` / `examples/` / `docs/`), adapted to this pilot:
no `template.md` yet (see above), and `tests/` added because none of the governance
docs defined a testing convention to follow.

## Running it

This is the first frontend code in the repository, so its tooling is self-contained
here rather than imposed on the rest of the repo — see
[`docs/implementation-notes.md`](docs/implementation-notes.md), "Frontend technology
used," for why.

```bash
npm install
npm run typecheck   # tsc --noEmit
npm test            # vitest run
npm run dev         # manual preview at http://localhost:5183
```

All three were actually run during implementation; results are recorded in
[`docs/implementation-notes.md`](docs/implementation-notes.md).
