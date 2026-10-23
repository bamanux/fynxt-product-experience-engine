import { useCallback, useEffect, useRef, useState } from "react";
import type { ListDataAdapter, ListPage, SortState } from "./types";

/**
 * FYNXT-TPL-LIST-002 — Table List
 *
 * Owns: the baseline state model (Revision 2, Section 14) for the data-fetching
 * lifecycle — `loading`, `success`, `empty`, `error`. Does not own: the data adapter
 * itself (developer-supplied), or what the records mean (product/business concern).
 */

export type ListDataState =
  | { status: "loading" }
  | { status: "success"; page: ListPage }
  | { status: "empty"; page: ListPage }
  | { status: "error"; error: Error };

export interface UseListDataArgs {
  adapter: ListDataAdapter;
  page: number;
  pageSize: number;
  searchQuery: string;
  sort: SortState | null;
}

export interface UseListDataResult {
  state: ListDataState;
  retry: () => void;
}

/** `success` with zero records is reclassified as `empty` here — the template's
 * consumer (TableList.tsx) never has to make that judgment call itself. */
function classify(page: ListPage): ListDataState {
  return page.records.length === 0
    ? { status: "empty", page }
    : { status: "success", page };
}

export function useListData({
  adapter,
  page,
  pageSize,
  searchQuery,
  sort,
}: UseListDataArgs): UseListDataResult {
  const [state, setState] = useState<ListDataState>({ status: "loading" });
  const requestIdRef = useRef(0);

  const fetchData = useCallback(() => {
    const requestId = ++requestIdRef.current;
    setState({ status: "loading" });

    adapter({ page, pageSize, searchQuery, sort })
      .then((result) => {
        if (requestIdRef.current !== requestId) return; // a newer request has since started
        setState(classify(result));
      })
      .catch((err: unknown) => {
        if (requestIdRef.current !== requestId) return;
        setState({
          status: "error",
          error: err instanceof Error ? err : new Error(String(err)),
        });
      });
  }, [adapter, page, pageSize, searchQuery, sort]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { state, retry: fetchData };
}
