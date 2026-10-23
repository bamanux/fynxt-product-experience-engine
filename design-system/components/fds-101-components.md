# FDS-101 Component Specs (code contracts)

**Status: DRAFT, awaiting Product Designer review.** Read from FDS-101
(`3c44QQCA8h7GTZYH2EWn8H`) via the Figma Plugin API on 2026-10-12, read-only. Values are
the **variables bound in Figma**. A raw literal is marked *literal*. These specs are the
contract that `@fynxt/ui` in the Design Code Station implements. A change here means a
component version bump (see [`agent/fdi/README.md`](../../agent/fdi/README.md) §5).

## Inventory

| Page | Component (node) | Variants | In `@fynxt/ui` |
|---|---|---|---|
| 02 Actions | Button `62:745` | Variant Primary/Secondary/Ghost/Destructive × Size S/M/L × State Default/Hover/Focus/Pressed/Disabled/Loading (72) | ✅ `Button` |
| | Icon Button `106:1149` | Primary/Secondary/Ghost/Outline/Destructive × SM/MD/LG × 6 states (90) | — |
| | Button Group `108:30` | Horizontal/Vertical × Connected/Separated | — |
| | Floating Action Button `109:924` | Icon Only/Extended × S/M/L × 5 states | — |
| 03 Form Components | Input `46:621` | 14 states | ✅ `TextField` |
| | Textarea `51:73` | 6 states | ✅ `TextArea` |
| | Select `50:81` | 6 states | ✅ `Select` (box styling shared with Input; see note) |
| | Multi Select `56:85`, Search Field `52:59`, Checkbox `54:104`, Radio `55:83`, Toggle `53:49`, Search Select `57:58`, Search Multi-Select `57:87`, Phone `113:163`, Country `219:758`, Currency `219:631`, Password `115:1010`, Number `119:916`, Date Field `121:160`, Day Cell `120:113`, Chip/Selection `93:212`, Chip overflow `255:2489`, Flag `110:126`, File Upload `126:189`, File Upload Inline `127:155`, Table Search Field `432:22033` | | — |
| 06 Data Display | Card `74:46` | Flat/Elevated | ✅ `Card` |
| | Primary Tab `75:18`, Secondary Tab `318:5979` | Default/Active/Hover/Disabled | ✅ `Tabs` (primary + secondary) |
| | Avatar `73:12`, Breadcrumb `73:14`, Accordion `76:27`, Pagination `76:29` / `436:10886`, Data Table Cell `421:12952` / `314:2978`, Data Table Header `421:13170` / `316:3435`, Data Table Column `429:5365`, Table Toolbar `432:21835`, Bulk Action Bar `432:22226`, Filter chip `432:22480`, Container `210:763` | | — |
| 07 Feedback & Overlays | Badge `64:39` | Status Neutral/Primary/Success/Warning/Error/Info × Soft/Solid | ✅ `Badge` |
| | Alert `65:45` | Info/Success/Warning/Error | ✅ `Alert` |
| | Toast `66:37`, Tooltip `66:39`, Modal `388:2275` | | — |

Duplicates to resolve (designer): two **Data Table Cell** and two **Data Table Header**
component sets (`421:*` vs `314:*`/`316:*`), and two **Pagination** components.

## Button `62:745`

| Size | Height | Padding-x | Label (Lexend Medium) | Radius |
|---|---|---|---|---|
| S | 32 | 12 | 13 | `radius/default` |
| M | 40 | 16 | 14 | `radius/default` |
| L | 48 | 20 | 14 | `radius/default` |

Gap 8 between icon (16) and label.

| Variant | Default | Hover | Pressed | Focus | Disabled |
|---|---|---|---|---|---|
| Primary | bg `brand/primary`, text `text/on-primary` | bg `navy/600` | bg `navy/700` | + 2px `border/focus` | opacity 0.5 (`opacity/disabled`) |
| Secondary | bg `surface/card`, 1px `border/default`, text `text/foreground` | bg `neutral/50`, border `border/strong` | bg `neutral/100` | 2px `border/focus` | 0.5 |
| Ghost | transparent, text `text/foreground` | bg `neutral/50` | bg `neutral/100` | 2px `border/focus` | 0.5 |
| Destructive | bg `status/destructive`, text `text/on-primary` | *no change in Figma* | *no change* | 2px `border/focus` | 0.5 |

Loading: same as Default visually in Figma (spinner content not specified). Open: the
Destructive hover/pressed states have no visual change.

> **Dark-mode defect (D12, needs designer decision).** Hover/pressed states bind *primitives*
> (`navy/600`, `navy/700`, `neutral/50`, `neutral/100`) that have no Dark value. Verified in
> FDI Studio 2026-10-12: Ghost/Secondary hover renders `#f9f9fb` behind Dark-mode text
> `#f1f5f9`, which is unreadable. Same pattern in Tabs (`neutral/100` hover, `neutral/200` active). Proposed
> fix: add semantic `state/hover` and `state/pressed` colour tokens with Light/Dark values and
> rebind. `@fynxt/ui` follows Figma until that decision is made.

## TextField / TextArea / Select (Input `46:621`, Textarea `51:73`, Select `50:81`)

Vertical stack, gap 4 (Input) / 6 (Textarea, Select).

- **Label row:** Lexend Medium 12, `text/label`; required `*` in `status/destructive`.
- **Box:** height 40 (Textarea 96), padding-x 12 (Textarea padding 10/12), radius `radius/default`,
  bg `surface/input`, 1px `border/default`. Text Lexend Regular 14: placeholder `text/muted`,
  value `text/foreground`.
- **Helper:** Lexend Regular 12, `text/muted`.

| State | Box border | Box bg | Helper colour |
|---|---|---|---|
| Hover | `border/strong` | — | — |
| Focus / Typing | `blue/500` (literal binding to primitive) | — | — |
| Error / Error focus | `status/destructive` | — | `status/destructive` |
| Success | `status/success` | — | `status/success` |
| Info | — | — | `status/info` |
| Disabled | — | `surface/background` | — |
| Read-only | — | `surface/background` | — |

Note: only Select's label row was read. Its box is assumed to match Input. **Verify.**

## Tabs (Primary `75:18`, Secondary `318:5979`)

Height 40, padding 10/16, gap 4, label Lexend Medium 14.

| State | Primary | Secondary |
|---|---|---|
| Default | transparent, text `text/muted-foreground` | bg `surface/card`, radius 4, text `text/muted-foreground` |
| Active | bg `neutral/200`, **2px bottom** `brand/primary`, text `brand/primary` | bg `neutral/200`, text `brand/primary` |
| Hover | bg `neutral/100`, text `brand/primary` **Bold** | bg `surface/background`, text `brand/primary` Bold |
| Disabled | opacity 0.5 | opacity 0.5 |

Open: Hover switches the weight to Bold (layout shift), and Hover height is 38 vs 40.

## Card `74:46`

Padding 16, gap 12, radius 12 (`radius/xl`), bg `surface/card`.
Flat: 1px `border/default`. Elevated: 1px `border/light` + `shadow/sm`. Title Sora SemiBold 16
`text/foreground`; meta Lexend Regular 12 `text/muted-foreground`.

## Badge `64:39`

Padding 3/8, radius 4, label Lexend Medium 12.

| Status | Soft (bg / text) | Solid (bg / text) |
|---|---|---|
| Neutral | `surface/background` / `text/muted-foreground` | `text/muted-foreground` / `text/on-primary` |
| Primary | `surface/selected` / `brand/primary` | `brand/primary` / `text/on-primary` |
| Success | `feedback/success-bg` / `status/success` | `status/success` / `text/on-primary` |
| Warning | `feedback/warning-bg` / `status/warning` | `status/warning` / `text/on-primary` |
| Error | `feedback/error-bg` / `status/error` | `status/error` / `text/on-primary` |
| Info | `feedback/info-bg` / `status/info` | `status/info` / `text/on-primary` |

## Alert `65:45`

Padding 14/16, gap 12, radius 4, icon 20 (stroke 2, status colour). Info: bg `feedback/info-bg`,
border `status/info`. Success, Warning and Error follow the same pattern with their
`feedback/*-bg` and `status/*` pair (only Info was read in detail; **verify the others**).
