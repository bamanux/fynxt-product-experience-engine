# Token Extraction v0.2.0 — full FDS-101 variables (2026-10-12)

**Status: DRAFT, awaiting Product Designer review.** Supersedes
[`EXTRACTION-2026-10-07.md`](EXTRACTION-2026-10-07.md) (v0.1.0, partial).

## Method

Plugin API via the Figma connector (`use_figma`, **read-only** script): every local
variable collection, mode, alias, scope, text style and effect style. The raw capture is
in [`source/fds-101.snapshot.json`](source/fds-101.snapshot.json), and
[`import-figma.mjs`](import-figma.mjs) converts it into `tokens.json`. Nothing in Figma
was modified.

## Result: 190 tokens

| Figma source | Modes | Tokens | Path in tokens.json |
|---|---|---|---|
| 01 Color Primitives | — | 50 (1 excluded) | `color.<ramp>.<step>` |
| 02 Color Tokens | **Light, Dark** | 38 | `brand.*`, `surface.*`, `text.*`, `border.*`, `status.*`, `chart.*`, `focus.*`, `feedback.*` |
| 03 Spacing | — | 22 | `spacing.*` |
| 04 Radius | — | 6 | `radius.*` |
| 05 Typography | — | 22 | `font-size.*`, `font-weight.*`, `font-family.*`, `line-height.*`, `letter-spacing.*` |
| 06 Form Factor | **Android, iOS, Tablet, Desktop, TV** | 10 | `font.*`, `control.*`, `field.*`, `card.*` |
| 07 Motion | — | 11 | `duration.*`, `easing.*` |
| 08 Effects | — | 6 | `border-width.*`, `ring.*`, `opacity.*` |
| 09 Icon Color | **9 tones** | 1 | `icon.color` |
| Effect styles | — | 6 | `shadow.*`, `elevation.*` |
| Text styles | — | 19 | `typography.*` → `.fx-typo-*` classes |

**Using it in code:** `dist/tokens.css` puts defaults on `:root`. Switch modes with attributes on
`<html>`, for example `data-theme="dark"`, `data-form-factor="tablet"`, and `data-icon-tone="brand"` on
any element. Aliases are emitted as `var()` chains, so changing a primitive changes
every semantic token built on it.

## v0.1.0 conflicts: now resolved

| ID | Resolution (evidence: snapshot) |
|---|---|
| K1 radius/full 9999 vs 999 | Local variable is **9999**. The 999 on Manage Views, and `text/secondary`, `text/link`, `surface/brand-subtle`, `font-size/12`, `line-height/16`, come from a **different library** and are not part of FDS-101. Dropped |
| K2 empty Tokens/Colour pages | The variables are intact. Only the printed documentation frames were removed |
| K7 missing weights | All five exist (`font-weight/light…bold`) |
| K8 line-heights | `line-height/tight/normal/relaxed/loose` exist, plus per-text-style line heights |
| K9 navy/500, spacing/1/9/12 | All exist. `brand/primary` → `navy/500` (Light), `blue/500` (Dark) |
| K10 modes | Read: Light/Dark, 5 form factors, 9 icon tones |

## Still open: designer decisions

| ID | Issue | Current handling |
|---|---|---|
| D1 | `text/muted-foreground` and `text/label` are raw `#858585` in Light (not aliased to a primitive, and not in any ramp). Dark aliases to `slate/300` | Imported as-is. Add a primitive, or alias to `neutral/500` (#6b7280)? |
| D2 | `text/muted` Light is raw `#b3b3b3` (not in any ramp) | As D1 |
| D3 | Two spacing scales: numeric (`spacing/1…12`) and t-shirt (`xs…5xl`) with equal values | Both imported. Pick one as canonical for new work |
| D4 | `status/error` (`red/500`) vs `status/destructive` (`red/600`) | Both imported. When to use which? |
| D5 | `text/tab-bg`: named `text` but used as a background, scopes ALL, Dark = literal `#ffffff` (on a dark surface) | Imported. Likely needs renaming to `surface/tab` and fixing the Dark value |
| D6 | Unnamed primitive `Color` = `#00000014`, ALL_SCOPES | **Excluded** |
| D7 | Default form factor for web | `:root` = **Desktop** (proposal). Figma's first mode is Android |
| D8 | Text styles bind font family and size to variables in Figma, but the CSS classes use resolved sizes (only the family is aliased) | Acceptable for now. Revisit if sizes need to switch by form factor |
| D9 | CSS naming `--fx-*` vs Brand page `--primary` | Proposal: `--fx-` prefix |
| D10 | Primitive scopes are ALL_FILLS+STROKE (designers can bind primitives directly) | Recommend restricting primitives so only semantic tokens are bindable |
| D11 | No breakpoint tokens (form factors are modes, not widths) | Studio uses 800/1100px marked OBSERVED. Define breakpoint tokens or map form-factor modes to widths |
| D12 | Hover/pressed states in Button/Tabs bind primitives with no Dark value, making them unreadable in Dark mode (verified) | Proposed `state/hover`, `state/pressed` semantic tokens. See fds-101-components.md |

## Approval

| Role | Name | Date | Decision |
|---|---|---|---|
| Product Designer | | | |
