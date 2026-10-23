import type { ReactNode } from "react";

/**
 * FYNXT-TPL-LIST-002 — Table List
 *
 * Typed configuration contract, built from docs/golden-template-list-specification.md
 * Revision 2 (Sections 11 and 12). This file is the template's public boundary: it
 * defines what a host product configures and what the template guarantees in return.
 *
 * Nothing in this file may name a real FYNXT entity, business rule, or permission
 * value. If a type here ever needs a Lead/Deal/Client-specific literal to compile,
 * that is a sign the template boundary has been violated — see
 * docs/implementation-notes.md, "Architecture findings."
 */

// ---------------------------------------------------------------------------
// Data contract (Revision 2, Section 12) — deliberately minimal. The template
// consumes this shape; it never needs to know what the records "mean."
// ---------------------------------------------------------------------------

/** A single generic record. Column values are looked up by key; `tag` and `owner`
 * are the only two semi-structured fields the template understands, and both are
 * fully generic — their vocabulary/meaning is a BUSINESS-RULE DEPENDENCY supplied
 * by the host product, never defined here. */
export interface ListRecord {
  id: string;
  tag?: { label: string; tone?: string };
  owner?: { name: string };
  [columnKey: string]: unknown;
}

export interface ListPage {
  records: ListRecord[];
  totalCount: number;
  page: number;
  pageSize: number;
}

export type SortDirection = "asc" | "desc";

export interface SortState {
  columnKey: string;
  direction: SortDirection;
}

/** Parameters passed to the data adapter extension point on every fetch. */
export interface ListDataAdapterParams {
  page: number;
  pageSize: number;
  searchQuery: string;
  sort: SortState | null;
}

/**
 * DEVELOPER INTEGRATION REQUIREMENT (Revision 2, Section 13/25).
 * The template defines this contract; a real implementation (a real API call) is
 * always supplied by the host product. The template ships a mock adapter factory
 * for the pilot only — see src/data/mockAdapterFactory.ts.
 */
export type ListDataAdapter = (
  params: ListDataAdapterParams,
) => Promise<ListPage>;

// ---------------------------------------------------------------------------
// Permission extension point (Revision 2, Section 15) — the template calls this
// before rendering any gated action. It never decides who can do what.
// ---------------------------------------------------------------------------

export type ListPermissionCheck = (
  actionKey: string,
  record: ListRecord | null,
) => boolean;

/** Default permission check used only when the host product supplies none — always
 * allows. This is a pilot convenience, not a policy. A real integration MUST supply
 * its own `permissionCheck`; see docs/implementation-notes.md. */
export const allowAllPermissionCheck: ListPermissionCheck = () => true;

// ---------------------------------------------------------------------------
// Actions. The template renders whatever is configured here; it never invents an
// action. `key`/`label` are PRODUCT-SPECIFIC CONTENT; which keys are valid for a
// given entity/role is a BUSINESS-RULE DEPENDENCY (an "approved action registry"),
// which does not exist yet anywhere in this repository — see Revision 2, Section 29.
// ---------------------------------------------------------------------------

export interface ListAction {
  key: string;
  label: string;
  /** Marks the action as mutating/destructive. The template uses this only to
   * decide whether to render it in `readOnly` mode — it never infers "destructive"
   * from the label or key. */
  destructive?: boolean;
  disabled?: boolean | ((records: ListRecord[]) => boolean);
  /**
   * Explicitly marks this as the record's "View" action — the FYNXT Row Action
   * pattern (src/patterns/RowActionsPattern.tsx) always keeps a View action
   * directly visible, never inside the overflow menu. This is never inferred from
   * `key`/`label` text (e.g. a key of `"view"`) — the host configuration states it
   * explicitly, so the template/pattern never has to guess at business meaning.
   * At most one action in a given `rowActions` list should set this.
   */
  isView?: boolean;
  /**
   * Explicit display priority for row actions, lower = shown first / more likely
   * to stay directly visible. Optional — when omitted, the action's position in
   * the configured `rowActions` array is its priority (a documented default, not
   * an arbitrary inference). See docs/visual-alignment-audit.md's Row Action rule
   * and src/patterns/RowActionsPattern.tsx.
   */
  priority?: number;
  /** May return a partial-failure result for bulk execution; see the `partial-error`
   * state model in docs/implementation-notes.md. */
  onSelect: (
    records: ListRecord[],
  ) => void | { failedRecordIds: string[] } | Promise<void | { failedRecordIds: string[] }>;
}

// ---------------------------------------------------------------------------
// Column configuration (Revision 2, Section 11).
// ---------------------------------------------------------------------------

export interface ListColumn {
  key: string;
  /** PRODUCT-SPECIFIC CONTENT. */
  label: string;
  sortable?: boolean;
  /** Optional custom cell renderer. Falls back to `String(record[key] ?? "")`. */
  render?: (record: ListRecord) => ReactNode;
}

// ---------------------------------------------------------------------------
// Optional zone / optional-pattern configuration. Every one of these defaults to
// disabled, per Revision 2, Section 11 and Section 5 of the implementation task.
// ---------------------------------------------------------------------------

export interface SearchConfig {
  enabled?: boolean; // default true — the one narrowing capability considered FIXED
  placeholder?: string; // PRODUCT-SPECIFIC CONTENT
}

export interface SortingConfig {
  enabled?: boolean; // default true when any column is sortable; false disables the whole capability
  defaultSort?: SortState | null;
}

export interface PaginationConfig {
  enabled?: boolean; // default true
  pageSize?: number; // implementation default below; not a confirmed FYNXT business default
}

export interface SelectionConfig {
  enabled?: boolean; // default FALSE — see Revision 2, Section 9
}

export interface ViewTabsConfig {
  enabled?: boolean; // default false
  tabs?: { key: string; label: string }[]; // PRODUCT-SPECIFIC CONTENT
  activeTabKey?: string;
  onTabChange?: (tabKey: string) => void;
}

export interface InsightsConfig {
  enabled?: boolean; // default false
  /** The template does not know what a "metric" looks like — this is a slot for the
   * (not-yet-specified) Metrics pattern. */
  render?: () => ReactNode;
}

/** A generic slot for a pattern this template composes but does not implement:
 * Quick Filters, Advanced Filters, Manage Columns, Saved Views. See
 * docs/implementation-notes.md, "What patterns own." */
export interface OptionalPatternSlot {
  enabled?: boolean; // default false
  render?: () => ReactNode;
  /** Shown only when `enabled` is true and no `render` is supplied — makes the
   * extension point visible/testable without fabricating pattern behavior. */
  placeholderLabel?: string;
}

export interface StateContent {
  loadingLabel?: string;
  emptyTitle?: string;
  emptyDescription?: string;
  errorTitle?: string;
  errorDescription?: string;
  retryLabel?: string;
}

// ---------------------------------------------------------------------------
// The full configuration contract.
// ---------------------------------------------------------------------------

export interface ListConfig {
  /** PRODUCT-SPECIFIC CONTENT. Used only for display (e.g. default empty-state
   * copy) and test/debug identification — the template must never branch its own
   * behavior on this value. */
  entity: string;

  columns: ListColumn[];

  search?: SearchConfig;
  sorting?: SortingConfig;
  pagination?: PaginationConfig;
  selection?: SelectionConfig;

  /** Empty by default — see Revision 2, Section 5 of the implementation task. */
  rowActions?: ListAction[];
  /** Empty by default; only rendered when `selection.enabled` is true. */
  bulkActions?: ListAction[];

  viewTabs?: ViewTabsConfig;
  insights?: InsightsConfig;

  quickFilters?: OptionalPatternSlot;
  advancedFilters?: OptionalPatternSlot;
  manageColumns?: OptionalPatternSlot;
  savedViews?: OptionalPatternSlot;

  states?: StateContent;

  /** Temporarily non-interactive (e.g. a host-app-level save in progress elsewhere).
   * Distinct from `readOnly` — see docs/implementation-notes.md for why the
   * specification didn't define this distinction and this is an implementation
   * decision. */
  disabled?: boolean;

  /** Permanently no mutating capability for this view. When true, the template
   * renders NO row actions and NO bulk actions, regardless of configuration —
   * satisfies "no destructive actions / no accidental mutation controls." */
  readOnly?: boolean;

  permissionCheck?: ListPermissionCheck;

  /** DEVELOPER INTEGRATION REQUIREMENT — required, no default. */
  dataAdapter: ListDataAdapter;
}

export const DEFAULT_PAGE_SIZE = 20;
