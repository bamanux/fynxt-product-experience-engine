/**
 * DefaultPagination — a minimal default implementation of the Pagination pattern.
 * Revision 2 classifies Pagination as "reusable infrastructure/pattern" the template
 * composes by default (Sections 8–9) — this module is that default, kept separate
 * from TableList.tsx so it can be swapped for a real registered Pagination pattern
 * later without touching the template itself.
 */
import { IconChevronLeft, IconChevronRight } from "../template/icons";

export interface DefaultPaginationProps {
  page: number;
  pageSize: number;
  totalCount: number;
  disabled?: boolean;
  onPageChange: (page: number) => void;
}

export function DefaultPagination({
  page,
  pageSize,
  totalCount,
  disabled,
  onPageChange,
}: DefaultPaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1;
  const to = Math.min(page * pageSize, totalCount);

  return (
    <nav className="tpl-list__pagination" aria-label="Pagination">
      <span className="tpl-list__pagination-summary">
        {totalCount === 0 ? "0 results" : `${from}–${to} of ${totalCount}`}
      </span>
      <button
        type="button"
        disabled={disabled || page <= 1}
        aria-label="Previous page"
        onClick={() => onPageChange(page - 1)}
      >
        <IconChevronLeft />
      </button>
      <span className="tpl-list__pagination-current" aria-current="page">
        {page}
      </span>
      <span className="tpl-list__pagination-of">of {totalPages}</span>
      <button
        type="button"
        disabled={disabled || page >= totalPages}
        aria-label="Next page"
        onClick={() => onPageChange(page + 1)}
      >
        <IconChevronRight />
      </button>
    </nav>
  );
}
