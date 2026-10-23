#!/usr/bin/env node
// Converts a Figma variables snapshot (source/fds-101.snapshot.json) into tokens.json (DTCG).
// Aliases are preserved as DTCG references ("{color.navy.500}"); extra modes are kept in
// $extensions["com.fynxt"].modes. Re-run after every new snapshot, then run build.mjs.
// Usage: node design-system/tokens/import-figma.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const snap = JSON.parse(readFileSync(join(here, "source", "fds-101.snapshot.json"), "utf8"));
const previous = JSON.parse(readFileSync(join(here, "tokens.json"), "utf8"));

// Figma collection → how its modes are exposed in CSS. `default` is the mode emitted on :root.
const MODE_SETS = {
  "02 Color Tokens": { key: "theme", attribute: "data-theme", default: "Light" },
  "06 Form Factor": {
    key: "form-factor", attribute: "data-form-factor", default: "Desktop",
    note: "PROPOSAL: web default is Desktop; Figma's first mode is Android. Needs designer confirmation.",
  },
  "09 Icon Color": { key: "icon-tone", attribute: "data-icon-tone", default: "Default" },
};

// Variables deliberately not imported, with the reason recorded in tokens.json meta.
const EXCLUDED = { "01 Color Primitives::Color": "Unnamed primitive (#00000014, ALL_SCOPES) — looks accidental" };

const slug = (s) => s.trim().toLowerCase().replace(/\s+/g, "-");
const pathFor = (collection, name) =>
  collection === "01 Color Primitives" ? ["color", ...name.split("/").map(slug)] : name.split("/").map(slug);

function typeFor(collection, name, kind) {
  if (kind === "C") return "color";
  const group = name.split("/")[0];
  if (kind === "S") return group === "easing" ? "cubicBezier" : "fontFamily";
  if (group === "font-weight") return "fontWeight";
  if (group === "opacity") return "number";
  if (group === "duration") return "duration";
  return "dimension";
}

function literal(type, raw) {
  switch (type) {
    case "dimension": return `${raw}px`;
    case "duration": return `${raw}ms`;
    case "cubicBezier": return raw.replace(/cubic-bezier\(|\)/g, "").split(",").map(Number);
    case "fontFamily": return [raw, "sans-serif"];
    default: return raw;
  }
}

// Index every variable so aliases can be resolved. Aliases point to another collection's
// variable of the same name (e.g. semantic "chart/1" → primitive "chart/1").
const index = [];
for (const c of snap.collections)
  for (const [name] of c.vars) index.push({ collection: c.collection, name, path: pathFor(c.collection, name) });

function resolveAlias(fromCollection, target) {
  const hit = index.find((v) => v.name === target && v.collection !== fromCollection)
    ?? index.find((v) => v.name === target);
  if (!hit) throw new Error(`Unresolved alias ${target} in ${fromCollection}`);
  return `{${hit.path.join(".")}}`;
}

const value = (collection, type, raw) =>
  typeof raw === "string" && raw.startsWith("→") ? resolveAlias(collection, raw.slice(1)) : literal(type, raw);

function setPath(root, path, leaf) {
  let node = root;
  for (const key of path.slice(0, -1)) node = node[key] ??= {};
  node[path.at(-1)] = leaf;
}

const tokens = {};
const excluded = [];
for (const c of snap.collections) {
  const modeSet = MODE_SETS[c.collection];
  const defaultIdx = modeSet ? c.modes.indexOf(modeSet.default) : 0;
  for (const [name, kind, ...values] of c.vars) {
    const reason = EXCLUDED[`${c.collection}::${name}`];
    if (reason) { excluded.push({ figmaName: name, collection: c.collection, reason }); continue; }
    const type = typeFor(c.collection, name, kind);
    const ext = { figmaName: name, collection: c.collection };
    if (c.modes.length > 1) {
      ext.modeSet = modeSet.key;
      ext.modes = Object.fromEntries(c.modes.map((m, i) => [m, value(c.collection, type, values[i])]));
    }
    setPath(tokens, pathFor(c.collection, name), {
      $type: type, $value: value(c.collection, type, values[defaultIdx]), $extensions: { "com.fynxt": ext },
    });
  }
}

const WEIGHTS = { Light: 300, Regular: 400, Medium: 500, SemiBold: 600, Bold: 700 };
const FAMILIES = { Sora: "{font-family.heading}", Lexend: "{font-family.body}" };
for (const [name, family, style, size, lineHeight, spacing] of snap.textStyles) {
  setPath(tokens, ["typography", ...name.split("/").map(slug)], {
    $type: "typography",
    $value: {
      fontFamily: FAMILIES[family] ?? [family, "sans-serif"],
      fontWeight: WEIGHTS[style],
      fontSize: `${size}px`,
      lineHeight: lineHeight === "AUTO" ? "normal" : `${lineHeight}px`,
      letterSpacing: spacing.unit === "PERCENT" ? `${spacing.value / 100}em` : `${spacing.value}px`,
    },
    $extensions: { "com.fynxt": { figmaName: name, collection: "Text styles" } },
  });
}
for (const [name, layers] of snap.effectStyles) {
  setPath(tokens, name.split("/").map(slug), {
    $type: "shadow",
    $value: layers.map(([color, x, y, blur, spread]) => ({
      color, offsetX: `${x}px`, offsetY: `${y}px`, blur: `${blur}px`, spread: `${spread}px`,
    })),
    $extensions: { "com.fynxt": { figmaName: name, collection: "Effect styles" } },
  });
}

const prevMeta = previous.$extensions["com.fynxt.meta"];
const out = {
  $description: previous.$description,
  $extensions: {
    "com.fynxt.meta": {
      status: "DRAFT",
      version: "0.2.0",
      source: { ...prevMeta.source, snapshot: "source/fds-101.snapshot.json" },
      extractedAt: snap.source.capturedAt,
      method: snap.source.method,
      modeSets: Object.fromEntries(Object.entries(MODE_SETS).map(([collection, m]) => [m.key, { collection, ...m }])),
      excluded,
      approval: "Pending Product Designer review — see EXTRACTION-2026-10-12.md",
    },
  },
  ...tokens,
};
writeFileSync(join(here, "tokens.json"), JSON.stringify(out, null, 2) + "\n");
const count = (o) => ("$value" in o ? 1 : Object.entries(o).reduce((n, [k, v]) => n + (k.startsWith("$") ? 0 : count(v)), 0));
console.log(`tokens.json v0.2.0: ${count(out)} tokens (${excluded.length} excluded)`);
