import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ListAction, ListConfig, ListRecord, SortState } from "./types";
import { DEFAULT_PAGE_SIZE, allowAllPermissionCheck } from "./types";
import { useListData } from "./useListData";
import { RowActionsPattern } from "../patterns/RowActionsPattern";
import { DefaultBulkActionBar } from "../patterns/DefaultBulkActionBar";
import { DefaultPagination } from "../patterns/DefaultPagination";
import { IconColumns3, IconFilter, IconSearch } from "./icons";
import "./TableList.tokens.css";
import "./TableList.css";

/**
 * FYNXT-TPL-LIST-002 — Table List
 *
 * Implements docs/golden-template-list-specification.md Revision 2.
 *
 * OWNS: collection rendering, the search entry point, configurable columns,
 * pagination support, configurable selection, configurable row/bulk actions,
 * configurable sorting, the baseline state model, an accessibility baseline, and
 * the data/permission extension-point contracts (src/template/types.ts).
 *
 * DOES NOT OWN: the internal behavior of Quick Filters, Advanced Filters, Manage
 * Columns, Saved Views (all rendered only as labeled extension-point slots — see
 * `renderOptionalSlot` below), Metrics/Insights presentation, or the full Row
 * Actions / Bulk Action Bar pattern (this file uses small default
 * implementations from src/patterns/, swappable via `renderRowActions` /
 * `renderBulkActionBar`). It never knows what a record "means" — see
 * src/template/types.ts's `ListRecord`.
 *
 * This component must never import, reference, or special-case any real FYNXT
 * entity name (Lead, Deal, Client, ...). If it ever needs to, that is a template
 * boundary violation — see docs/implementation-notes.md.
 */

export interface TableListProps {
  config: ListConfig;
  /** Escape hatch for a host product to supply a real Row Actions pattern instead
   * of the built-in default. */
  renderRowActions?: (args: {
    record: ListRecord;
    actions: ListAction[];
    disabled?: boolean;
  }) => ReactNode;
  /** Escape hatch for a host product to supply a real Bulk Action Bar pattern. */
  renderBulkActionBar?: (args: {
    selectedRecords: ListRecord[];
    actions: ListAction[];
    onActionResult?: (failedRecordIds: string[]) => void;
    disabled?: boolean;
  }) => ReactNode;
}

function renderOptionalSlot(
  slot: { enabled?: boolean; render?: () => ReactNode; placeholderLabel?: string } | undefined,
  fallbackLabel: string,
  testId: string,
  icon?: ReactNode,
) {
  if (!slot?.enabled) return null;
  if (slot.render) return <div data-testid={testId}>{slot.render()}</div>;
  return (
    <span
      className="tpl-list__pattern-slot"
      data-testid={testId}
      role="note"
      title={slot.placeholderLabel ?? `${fallbackLabel} — extension point, no implementation attached`}
    >
      {icon}
      {fallbackLabel}
    </span>
  );
}

export function TableList({
  config,
  renderRowActions,
  renderBulkActionBar,
}: TableListProps) {
  const {
    entity,
    columns,
    search,
    sorting,
    pagination,
    selection,
    rowActions = [],
    bulkActions = [],
    viewTabs,
    insights,
    quickFilters,
    advancedFilters,
    manageColumns,
    savedViews,
    states,
    disabled = false,
    readOnly = false,
    permissionCheck = allowAllPermissionCheck,
    dataAdapter,
  } = config;

  const searchEnabled = search?.enabled ?? true;
  const toolbarLeftHasContent = Boolean(quickFilters?.enabled);
  const toolbarRightHasContent =
    searchEnabled ||
    Boolean(advancedFilters?.enabled) ||
    Boolean(manageColumns?.enabled) ||
    Boolean(savedViews?.enabled);
  const toolbarHasContent = toolbarLeftHasContent || toolbarRightHasContent;
  const paginationEnabled = pagination?.enabled ?? true;
  const pageSize = pagination?.pageSize ?? DEFAULT_PAGE_SIZE;
  const selectionEnabled = (selection?.enabled ?? false) && !readOnly;
  // Frozen-column offset for the first data column (docs/visual-alignment-audit.md,
  // Frozen Column Rule): it sits immediately after the checkbox column when
  // selection is enabled, or at the left edge otherwise.
  const firstColumnLeftOffset = selectionEnabled ? "var(--tpl-control-column-width)" : "0px";
  const anySortableColumn = columns.some((c) => c.sortable);
  const sortingEnabled = (sorting?.enabled ?? anySortableColumn) && anySortableColumn;

  // Row actions and bulk actions are entirely suppressed in read-only mode,
  // regardless of configuration — Revision 2, Section 15 / implementation
  // task Test C ("no destructive actions ... no accidental mutation controls").
  const effectiveRowActions = readOnly
    ? []
    : rowActions.filter((a) => permissionCheck(a.key, null));
  const effectiveBulkActions = readOnly
    ? []
    : bulkActions.filter((a) => permissionCheck(a.key, null));

  const [page, setPage] = useState(1);
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [searchDraft, setSearchDraft] = useState("");
  const [sort, setSort] = useState<SortState | null>(sorting?.defaultSort ?? null);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkActionWarning, setBulkActionWarning] = useState<string | null>(null);

  const { state, retry } = useListData({
    adapter: dataAdapter,
    page,
    pageSize: paginationEnabled ? pageSize : Number.MAX_SAFE_INTEGER,
    searchQuery: submittedQuery,
    sort,
  });

  const records = state.status === "success" || state.status === "empty" ? state.page.records : [];
  const totalCount = state.status === "success" || state.status === "empty" ? state.page.totalCount : 0;

  const selectedRecords = useMemo(
    () => records.filter((r) => selectedIds.has(r.id)),
    [records, selectedIds],
  );

  function toggleSort(columnKey: string) {
    if (disabled || !sortingEnabled) return;
    setSort((current) => {
      if (!current || current.columnKey !== columnKey) return { columnKey, direction: "asc" };
      if (current.direction === "asc") return { columnKey, direction: "desc" };
      return null;
    });
  }

  function toggleSelectAll() {
    if (disabled) return;
    setSelectedIds((current) =>
      current.size === records.length && records.length > 0
        ? new Set()
        : new Set(records.map((r) => r.id)),
    );
  }

  function toggleSelectOne(id: string) {
    if (disabled) return;
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function submitSearch() {
    setPage(1);
    setSubmittedQuery(searchDraft);
  }

  const rowActionsRenderer =
    renderRowActions ??
    ((args: { record: ListRecord; actions: ListAction[]; disabled?: boolean }) => (
      <RowActionsPattern {...args} />
    ));

  const bulkActionBarRenderer =
    renderBulkActionBar ??
    ((args: {
      selectedRecords: ListRecord[];
      actions: ListAction[];
      onActionResult?: (failedRecordIds: string[]) => void;
      disabled?: boolean;
    }) => <DefaultBulkActionBar {...args} />);

  const rootClassName = [
    "tpl-list",
    disabled ? "tpl-list--disabled" : "",
    readOnly ? "tpl-list--read-only" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={rootClassName} aria-label={`${entity} list`} data-entity={entity}>
      <div className="tpl-list__header">
        <h2 className="tpl-list__title">{entity}</h2>
      </div>

      {viewTabs?.enabled && viewTabs.tabs && viewTabs.tabs.length > 0 ? (
        <div className="tpl-list__view-tabs" role="tablist" aria-label={`${entity} views`}>
          {viewTabs.tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              role="tab"
              aria-current={tab.key === viewTabs.activeTabKey ? "true" : undefined}
              aria-selected={tab.key === viewTabs.activeTabKey}
              className="tpl-list__view-tab"
              disabled={disabled}
              onClick={() => viewTabs.onTabChange?.(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      ) : null}

      {insights?.enabled ? (
        <div className="tpl-list__insights" data-testid="insights-slot" role="note">
          <span className="tpl-list__insights-label">Insights</span>
          <span className="tpl-list__insights-body">
            {insights.render ? insights.render() : "extension point, no implementation attached"}
          </span>
        </div>
      ) : null}

      {/* Collection surface: the real Leads reference (`DataTableWithFilters`) is ONE
          continuous bordered/shadowed card containing the toolbar, table (or state),
          and pagination together — not separate boxes. Toolbar composition follows
          the same reference: filter affordances on the left, search + column/view
          utilities on the right, one row. Either toolbar side — or the whole
          toolbar — disappears when it would otherwise be empty (Section 26). */}
      <div className="tpl-list__collection">
      {toolbarHasContent ? (
        <div className="tpl-list__narrowing">
          {toolbarLeftHasContent ? (
            <div className="tpl-list__narrowing-left">
              {renderOptionalSlot(quickFilters, "Quick Filters", "quickFilters-slot", <IconFilter />)}
            </div>
          ) : null}
          {toolbarRightHasContent ? (
            <div className="tpl-list__narrowing-right">
              {searchEnabled ? (
                <>
                  <label htmlFor={`${entity}-search`} className="tpl-list__visually-hidden-label">
                    Search {entity}
                  </label>
                  <span className="tpl-list__search-field">
                    <IconSearch className="tpl-list__search-icon" />
                    <input
                      id={`${entity}-search`}
                      type="search"
                      className="tpl-list__search"
                      placeholder={search?.placeholder ?? `Search ${entity.toLowerCase()}`}
                      value={searchDraft}
                      disabled={disabled}
                      onChange={(e) => setSearchDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") submitSearch();
                      }}
                    />
                  </span>
                  <button
                    type="button"
                    className="tpl-list__button tpl-list__button--secondary"
                    disabled={disabled}
                    onClick={submitSearch}
                  >
                    Search
                  </button>
                </>
              ) : null}
              {renderOptionalSlot(advancedFilters, "Advanced Filters", "advancedFilters-slot", <IconFilter />)}
              {renderOptionalSlot(manageColumns, "Manage Columns", "manageColumns-slot", <IconColumns3 />)}
              {renderOptionalSlot(savedViews, "Saved Views", "savedViews-slot")}
            </div>
          ) : null}
        </div>
      ) : null}

      {selectionEnabled && effectiveBulkActions.length > 0 && selectedRecords.length > 0
        ? bulkActionBarRenderer({
            selectedRecords,
            actions: effectiveBulkActions,
            disabled,
            onActionResult: (failedRecordIds) =>
              setBulkActionWarning(
                `${failedRecordIds.length} of ${selectedRecords.length} action(s) failed.`,
              ),
          })
        : null}

      {bulkActionWarning ? (
        <div role="alert" className="tpl-list__status tpl-list__status--error">
          {bulkActionWarning}
        </div>
      ) : null}

      {state.status === "loading" ? (
        <div role="status" aria-live="polite" className="tpl-list__status">
          {states?.loadingLabel ?? `Loading ${entity.toLowerCase()}…`}
        </div>
      ) : null}

      {state.status === "error" ? (
        <div role="alert" className="tpl-list__status tpl-list__status--error">
          <p>{states?.errorTitle ?? "Something went wrong."}</p>
          <p>{states?.errorDescription ?? state.error.message}</p>
          <button
            type="button"
            className="tpl-list__button tpl-list__button--primary"
            onClick={retry}
          >
            {states?.retryLabel ?? "Retry"}
          </button>
        </div>
      ) : null}

      {state.status === "empty" ? (
        <div className="tpl-list__status" role="status">
          <p>{states?.emptyTitle ?? `No ${entity.toLowerCase()} found`}</p>
          <p>{states?.emptyDescription ?? "There are no records to show yet."}</p>
        </div>
      ) : null}

      {state.status === "success" ? (
        <div className="tpl-list__table-scroll">
          <table className="tpl-list__table" aria-readonly={readOnly || undefined}>
            <thead>
              <tr>
                {selectionEnabled ? (
                  <th scope="col" className="tpl-list__cell--frozen-left" style={{ left: 0 }}>
                    <input
                      type="checkbox"
                      aria-label={`Select all ${entity.toLowerCase()}`}
                      disabled={disabled}
                      checked={records.length > 0 && selectedIds.size === records.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                ) : null}
                {columns.map((col, index) => (
                  <th
                    scope="col"
                    key={col.key}
                    className={index === 0 ? "tpl-list__cell--frozen-left" : undefined}
                    style={index === 0 ? { left: firstColumnLeftOffset } : undefined}
                    aria-sort={
                      sortingEnabled && sort?.columnKey === col.key
                        ? sort.direction === "asc"
                          ? "ascending"
                          : "descending"
                        : undefined
                    }
                  >
                    {sortingEnabled && col.sortable ? (
                      <button
                        type="button"
                        className="tpl-list__sort-button"
                        disabled={disabled}
                        onClick={() => toggleSort(col.key)}
                      >
                        {col.label}
                        {sort?.columnKey === col.key
                          ? sort.direction === "asc"
                            ? " ▲"
                            : " ▼"
                          : ""}
                      </button>
                    ) : (
                      col.label
                    )}
                  </th>
                ))}
                {effectiveRowActions.length > 0 ? (
                  <th scope="col" className="tpl-list__cell--frozen-right" style={{ right: 0 }}>
                    <span className="tpl-list__visually-hidden-label">Actions</span>
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody>
              {records.map((record) => {
                const isSelected = selectedIds.has(record.id);
                return (
                  <tr key={record.id} data-selected={isSelected || undefined}>
                    {selectionEnabled ? (
                      <td className="tpl-list__cell--frozen-left" style={{ left: 0 }}>
                        <input
                          type="checkbox"
                          aria-label={`Select row ${record.id}`}
                          disabled={disabled}
                          checked={isSelected}
                          onChange={() => toggleSelectOne(record.id)}
                        />
                      </td>
                    ) : null}
                    {columns.map((col, index) => (
                      <td
                        key={col.key}
                        className={index === 0 ? "tpl-list__cell--frozen-left" : undefined}
                        style={index === 0 ? { left: firstColumnLeftOffset } : undefined}
                      >
                        {col.render ? col.render(record) : String(record[col.key] ?? "")}
                      </td>
                    ))}
                    {effectiveRowActions.length > 0 ? (
                      <td className="tpl-list__cell--frozen-right" style={{ right: 0 }}>
                        {rowActionsRenderer({
                          record,
                          actions: effectiveRowActions.filter((a) => permissionCheck(a.key, record)),
                          disabled,
                        })}
                      </td>
                    ) : null}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : null}

      {paginationEnabled && (state.status === "success" || state.status === "empty") ? (
        <DefaultPagination
          page={page}
          pageSize={pageSize}
          totalCount={totalCount}
          disabled={disabled}
          onPageChange={setPage}
        />
      ) : null}
      </div>
    </section>
  );
}
