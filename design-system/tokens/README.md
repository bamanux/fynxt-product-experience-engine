# Tokens

Design tokens (color, spacing, typography, elevation, motion, etc.) as versioned
data/code, consumed by both Figma (via [figma-integration](../../figma-integration/))
and frontend implementations.

| File | Role |
|---|---|
| [`tokens.json`](tokens.json) | **Single source of truth** (DTCG format, aliases + modes, Figma provenance per token). Currently **DRAFT v0.2.0** (190 tokens) |
| [`source/fds-101.snapshot.json`](source/fds-101.snapshot.json) | Raw capture of FDS-101 variables/styles (Plugin API) |
| [`import-figma.mjs`](import-figma.mjs) | Snapshot → `tokens.json`: `node design-system/tokens/import-figma.mjs` |
| [`build.mjs`](build.mjs) | Zero-dependency generator: `node design-system/tokens/build.mjs` |
| `dist/tokens.css` | Generated `--fx-*` CSS custom properties, mode selectors (`data-theme`, `data-form-factor`, `data-icon-tone`) and `.fx-typo-*` classes |
| `dist/tokens.ts` | Generated typed map of token name → `var(--fx-…)` |
| [`EXTRACTION-2026-10-12.md`](EXTRACTION-2026-10-12.md) | v0.2.0 extraction report + open designer decisions D1–D10 (v0.1.0 report kept for history) |

Change a value here, regenerate, and every consumer updates. Sync to the Station and to
Figma with `/fdi-sync tokens` (see [`agent/fdi/README.md`](../../agent/fdi/README.md) §5).
