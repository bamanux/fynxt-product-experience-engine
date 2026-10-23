// FYNXT-TPL-LIST-002 — Table List — public exports.
// A configured experience or example imports from here, never from internal paths.

export { TableList } from "./template/TableList";
export type { TableListProps } from "./template/TableList";

export type {
  ListRecord,
  ListPage,
  ListColumn,
  ListConfig,
  ListAction,
  ListDataAdapter,
  ListDataAdapterParams,
  ListPermissionCheck,
  SortState,
  SortDirection,
  SearchConfig,
  SortingConfig,
  PaginationConfig,
  SelectionConfig,
  ViewTabsConfig,
  InsightsConfig,
  OptionalPatternSlot,
  StateContent,
} from "./template/types";
export { DEFAULT_PAGE_SIZE, allowAllPermissionCheck } from "./template/types";

export { createMockListDataAdapter } from "./data/mockAdapterFactory";
export type { MockAdapterOptions } from "./data/mockAdapterFactory";

export { RowActionsPattern } from "./patterns/RowActionsPattern";
export { Tag } from "./template/Tag";
export type { TagProps, TagTone } from "./template/Tag";
export { DefaultBulkActionBar } from "./patterns/DefaultBulkActionBar";
export { DefaultPagination } from "./patterns/DefaultPagination";
