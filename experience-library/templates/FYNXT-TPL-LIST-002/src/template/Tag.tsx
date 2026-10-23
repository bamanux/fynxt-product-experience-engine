/**
 * Tag — a small, purely presentational badge for rendering `ListRecord.tag`.
 *
 * Generic on purpose: `tone` selects one of five semantic buckets
 * (info/warning/neutral/success/danger) via the pilot tokens
 * (TableList.tokens.css) — it has no idea what a "Hot Lead" or a "Won Deal" is.
 * Mapping a real entity's own tone vocabulary (e.g. Leads' `hot`/`warm`/`cold`)
 * onto one of these five buckets is the *host configuration's* job (see
 * examples/leads/leads.config.ts) — never this component's, and never
 * TableList's. An unrecognized tone falls back to `neutral` rather than
 * guessing.
 */

export type TagTone = "info" | "warning" | "neutral" | "success" | "danger";

const KNOWN_TONES: readonly TagTone[] = ["info", "warning", "neutral", "success", "danger"];

export interface TagProps {
  label: string;
  tone?: string;
}

export function Tag({ label, tone }: TagProps) {
  const resolvedTone: TagTone = KNOWN_TONES.includes(tone as TagTone) ? (tone as TagTone) : "neutral";
  return <span className={`tpl-tag tpl-tag--${resolvedTone}`}>{label}</span>;
}
