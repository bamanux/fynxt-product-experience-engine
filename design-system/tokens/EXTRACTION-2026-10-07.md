# Token Extraction — FDS-101 → tokens.json (2026-10-07)

> **Superseded by [`EXTRACTION-2026-10-12.md`](EXTRACTION-2026-10-12.md) (v0.2.0).** Kept for history.

**Status: DRAFT, awaiting Product Designer review.** Nothing here is approved until a
designer signs off below. Source: FDS-101 (`3c44QQCA8h7GTZYH2EWn8H`), link shared by the
requester (node `10:129`).

## Method

Figma desktop MCP `get_variable_defs` was run on **every page** of the file. It
returns the resolved value of each variable that is *bound* to a node. Limits (unchanged
from the [earlier inventory](../../docs/fds-101-foundation-inventory.md)):

- Variables bound nowhere are invisible to this method. The full collection list needs
  the Figma plugin connector (`use_figma`), which is **not authorized** in this session.
- **Modes** (Light/Dark, Adaptive Form's 5 form factors) are not readable. Every value
  is from the default mode.
- **Alias chains** (e.g. whether `brand/primary` → `navy/500`) are not readable.
  Semantic tokens store resolved values.

## Result

80 tokens in [`tokens.json`](tokens.json) (DTCG format). Each token records its Figma
name, the pages it was seen on, and a status:

| Status | Count | Meaning |
|---|---|---|
| BOUND | 56 | Bound in at least one FDS-101 component page. Strongest evidence |
| UNVERIFIED | 13 | Seen **only** on `· Manage Views` (`194:2`), a product composition. These may come from another library |
| DOCUMENTED | 1 | `font-family/heading` = Sora, stated on the Brand page. No variable exists |
| COMPONENT-SCOPE | 10 | Adaptive Form template variables (`control/height` 44, `card/radius` 12, …) |

Generated outputs: `dist/tokens.css` (`--fx-*` custom properties) and `dist/tokens.ts`,
via `node design-system/tokens/build.mjs`.

**Excluded as foreign:** `Static/Body Small/*`, `M3/body/small-emphasized` (Roboto,
Material 3) and `Liquid Glass/Splay - Regular`, found inside Form Components. These
match earlier conflict C9.

## What changed in Figma since the last audit

- **`00 · Foundations — Tokens` (`10:128`) no longer contains the "Style Guide" frame.**
  Only two loose rectangles remain.
- **`01 · Primitives — Colour` (`0:1`) is empty.**

So the printed type scale, weights, spacing scale and primitive ramps (navy 50–900 and
the others) cited in earlier docs **can no longer be verified in the file**, and they
were **not** carried into `tokens.json`. Was this intentional (moved to variables only),
or accidental?

## Conflicts and gaps needing a designer decision

| ID | Issue | Evidence | Current handling |
|---|---|---|---|
| K1 | `radius/full` = **9999** vs **999** | Form `46:6`, Nav `131:2` vs Manage Views `194:2` | 9999 used. A single variable can't have two values in one mode, so Manage Views likely binds a different library |
| K2 | Style Guide and Colour pages emptied | see above | Printed values not carried over |
| K3 | Duplicate naming schemes | `spacing/10` & `spacing/4xl` (both 40); `font-size/xs` & `font-size/12` | Both kept, flagged. Pick one scheme |
| K4 | Two reds | `status/error #ef4444` vs `status/destructive #e5381d` | Both kept. Usage boundary undocumented |
| K5 | `text/label` = `text/muted-foreground` (#858585) | (earlier C3) | Both kept |
| K6 | CSS variable naming | Brand page lists CSS variable `--primary`; generated output uses `--fx-brand-primary` | Proposal: `--fx-` prefix mirroring the Figma path, to avoid collisions in host products. Needs approval |
| K7 | Missing weights | Only `font-weight/medium` bound. Components use 400/600 as literals | Not invented. Add variables in Figma, or approve literals |
| K8 | Missing line-heights | Only `line-height/16` (UNVERIFIED) exists anywhere | Gap |
| K9 | No `navy/500`, no spacing/1, /9, /12 variable observed | `brand/primary` is #002666 directly | Gap |
| K10 | Dark mode / form-factor modes unread | — | Needs plugin connector |

## Next steps

1. Designer reviews K1–K10 and the UNVERIFIED rows, and records decisions here.
2. Authorize the Figma plugin connector so FDI can enumerate full collections, modes
   and aliases. Re-extract to confirm, then bump to v0.2.0.
3. On approval: `status` → APPROVED, version 1.0.0, then migrate `FYNXT-TPL-LIST-002`
   off its local `TableList.tokens.css` (it currently deviates: `#6b7280` vs `#858585`,
   `#ccebff` vs `#eef1f7`, etc.).

## Approval

| Role | Name | Date | Decision |
|---|---|---|---|
| Product Designer | | | |
