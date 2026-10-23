#!/usr/bin/env node
// Generates dist/tokens.css (CSS custom properties) and dist/tokens.ts from tokens.json.
// tokens.json is the single source of truth; never edit dist/ by hand.
//   - Aliases become var() references, so changing a primitive cascades everywhere.
//   - Each mode set (theme, form factor, icon tone) gets an attribute selector, e.g.
//     <html data-theme="dark" data-form-factor="tablet">.
//   - Typography composites become .fx-typo-* utility classes.
// Usage: node design-system/tokens/build.mjs [outDir]
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(process.argv[2] ?? join(here, "dist"));
const source = JSON.parse(readFileSync(join(here, "tokens.json"), "utf8"));
const meta = source.$extensions["com.fynxt.meta"];
const PREFIX = "fx";

function collect(node, path, out) {
  if (node && typeof node === "object" && "$value" in node) {
    out.push({ path, token: node });
    return out;
  }
  for (const [key, child] of Object.entries(node)) {
    if (!key.startsWith("$")) collect(child, [...path, key], out);
  }
  return out;
}

const cssVar = (path) => `--${PREFIX}-${path.join("-")}`;
const ref = (value) => {
  const m = typeof value === "string" && value.match(/^\{(.+)\}$/);
  return m ? `var(${cssVar(m[1].split("."))})` : null;
};

function toCss(type, value) {
  const alias = ref(value);
  if (alias) return alias;
  switch (type) {
    case "fontFamily":
      return value.map((f) => (f === "sans-serif" || f === "serif" ? f : `"${f}"`)).join(", ");
    case "shadow":
      return value.map((l) => `${l.offsetX} ${l.offsetY} ${l.blur} ${l.spread} ${l.color}`).join(", ");
    case "cubicBezier":
      return `cubic-bezier(${value.join(", ")})`;
    default:
      return String(value);
  }
}

const all = collect(source, [], []);
const typography = all.filter(({ token }) => token.$type === "typography");
const tokens = all.filter(({ token }) => token.$type !== "typography");
const header = `/* GENERATED from design-system/tokens/tokens.json (v${meta.version}, ${meta.status}) — do not edit. */`;

// Typography composites are also exposed as per-property variables so component CSS can
// consume a text style without a class, e.g. var(--fx-typography-button-md-font-size).
const typographyVars = typography.flatMap(({ path, token }) => {
  const v = token.$value;
  const base = cssVar(path);
  return [
    `  ${base}-font-family: ${ref(v.fontFamily) ?? toCss("fontFamily", v.fontFamily)};`,
    `  ${base}-font-weight: ${v.fontWeight};`,
    `  ${base}-font-size: ${v.fontSize};`,
    `  ${base}-line-height: ${v.lineHeight};`,
    `  ${base}-letter-spacing: ${v.letterSpacing};`,
  ];
});

const rootLines = tokens.map(({ path, token }) => `  ${cssVar(path)}: ${toCss(token.$type, token.$value)};`);
const blocks = [`:root {\n${[...rootLines, ...typographyVars].join("\n")}\n}`];

for (const [key, set] of Object.entries(meta.modeSets)) {
  const members = tokens.filter(({ token }) => token.$extensions?.["com.fynxt"]?.modeSet === key);
  const modes = Object.keys(members[0]?.token.$extensions["com.fynxt"].modes ?? {});
  for (const mode of modes) {
    if (mode === set.default) continue;
    const lines = members.map(({ path, token }) =>
      `  ${cssVar(path)}: ${toCss(token.$type, token.$extensions["com.fynxt"].modes[mode])};`);
    blocks.push(`[${set.attribute}="${mode.toLowerCase()}"] {\n${lines.join("\n")}\n}`);
  }
}

for (const { path, token } of typography) {
  const v = token.$value;
  const family = ref(v.fontFamily) ?? toCss("fontFamily", v.fontFamily);
  blocks.push(
    `.${PREFIX}-typo-${path.slice(1).join("-")} {\n  font-family: ${family};\n  font-weight: ${v.fontWeight};\n` +
    `  font-size: ${v.fontSize};\n  line-height: ${v.lineHeight};\n  letter-spacing: ${v.letterSpacing};\n}`
  );
}

const css = `${header}\n${blocks.join("\n\n")}\n`;

const tsEntries = tokens.map(({ path }) => `  ${JSON.stringify(path.join("."))}: "var(${cssVar(path)})",`);
const typoEntries = typography.map(({ path }) => `  ${JSON.stringify(path.slice(1).join("."))}: "${PREFIX}-typo-${path.slice(1).join("-")}",`);
const modeEntries = Object.entries(meta.modeSets).map(([key, set]) => {
  const sample = tokens.find(({ token }) => token.$extensions?.["com.fynxt"]?.modeSet === key);
  const modes = Object.keys(sample?.token.$extensions["com.fynxt"].modes ?? {}).map((m) => JSON.stringify(m.toLowerCase()));
  return `  ${JSON.stringify(key)}: { attribute: ${JSON.stringify(set.attribute)}, modes: [${modes.join(", ")}] as const },`;
});
const ts = `${header}
export const tokens = {
${tsEntries.join("\n")}
} as const;

export const typography = {
${typoEntries.join("\n")}
} as const;

export const modeSets = {
${modeEntries.join("\n")}
} as const;

export type TokenName = keyof typeof tokens;
export type TypographyName = keyof typeof typography;
`;

mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "tokens.css"), css);
writeFileSync(join(outDir, "tokens.ts"), ts);
console.log(`Generated ${tokens.length} tokens + ${typography.length} typography classes → ${outDir}`);
