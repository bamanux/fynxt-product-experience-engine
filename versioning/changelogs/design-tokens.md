# Changelog — design tokens

## 0.1.0 — 2026-10-07 — DRAFT
- Initial `tokens.json` extracted from FDS-101 variables (80 tokens: 56 bound, 13 unverified,
  1 documented, 10 component-scope). Generated `--fx-*` CSS and TS outputs.
- Open conflicts K1–K10: see `design-system/tokens/EXTRACTION-2026-10-07.md`.

## 0.2.0 — 2026-10-12 — DRAFT — BREAKING (pre-1.0)
- Full import via the Figma Plugin API: 190 tokens, aliases preserved, modes for theme
  (Light/Dark), form factor (5) and icon tone (9). 19 typography classes and 6 shadows.
- Added `source/fds-101.snapshot.json` and `import-figma.mjs` (repeatable import).
- **Breaking:** `component.adaptive-form.*` → `font.*`, `control.*`, `field.*`, `card.*`.
  Removed 13 tokens that came from another library (`text.secondary`, `text.link`,
  `surface.brand-subtle`, …). No consumers existed.
- Resolved K1–K10. Open designer decisions D1–D10 in `EXTRACTION-2026-10-12.md`.
