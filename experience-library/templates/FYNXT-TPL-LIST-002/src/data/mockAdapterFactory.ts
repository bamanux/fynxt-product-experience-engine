import type { ListDataAdapter, ListDataAdapterParams, ListRecord } from "../template/types";

/**
 * MOCK DATA ADAPTER — for the implementation pilot only.
 *
 * This is not a real FYNXT API integration. It exists so the template and its
 * example configurations (examples/leads, examples/demo-records) can be exercised
 * and tested without a backend. A real developer integration replaces this
 * entirely with a `ListDataAdapter` that calls a real endpoint — see Revision 2,
 * Section 13 (API Requirements: `Unknown`) and Section 25 (Developer Integration
 * Model).
 *
 * The factory is entity-agnostic: it knows nothing about Leads, Deals, or any
 * other FYNXT entity. It is handed a flat array of already-shaped `ListRecord`s by
 * the caller (an example configuration), and only implements generic
 * search/sort/paginate behavior over that array.
 */

export interface MockAdapterOptions {
  /** Simulated network latency in ms. */
  delayMs?: number;
  /** When true, every call rejects — used to exercise the `error` state in tests. */
  simulateError?: boolean;
  /** Columns to keyword-match against for `searchQuery` (matched as case-insensitive substrings). */
  searchableColumns?: string[];
}

function matchesSearch(
  record: ListRecord,
  query: string,
  searchableColumns: string[],
): boolean {
  if (!query) return true;
  const needle = query.trim().toLowerCase();
  if (needle === "") return true;
  return searchableColumns.some((key) => {
    const value = record[key];
    return typeof value === "string" && value.toLowerCase().includes(needle);
  });
}

function compareValues(a: unknown, b: unknown): number {
  if (typeof a === "number" && typeof b === "number") return a - b;
  return String(a ?? "").localeCompare(String(b ?? ""));
}

export function createMockListDataAdapter(
  allRecords: ListRecord[],
  options: MockAdapterOptions = {},
): ListDataAdapter {
  const { delayMs = 0, simulateError = false, searchableColumns = [] } = options;

  return async (params: ListDataAdapterParams) => {
    if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
    if (simulateError) throw new Error("MOCK ADAPTER: simulated failure");

    let filtered = allRecords.filter((record) =>
      matchesSearch(record, params.searchQuery, searchableColumns),
    );

    if (params.sort) {
      const { columnKey, direction } = params.sort;
      filtered = [...filtered].sort((a, b) => {
        const result = compareValues(a[columnKey], b[columnKey]);
        return direction === "asc" ? result : -result;
      });
    }

    const totalCount = filtered.length;
    const start = (params.page - 1) * params.pageSize;
    const records = filtered.slice(start, start + params.pageSize);

    return {
      records,
      totalCount,
      page: params.page,
      pageSize: params.pageSize,
    };
  };
}
