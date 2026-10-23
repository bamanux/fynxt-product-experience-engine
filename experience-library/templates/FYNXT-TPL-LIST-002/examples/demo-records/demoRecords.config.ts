import type { ListAction, ListColumn, ListConfig } from "../../src/index";
import { createMockListDataAdapter } from "../../src/index";
import { demoRecordsMockData } from "./demoRecords.mockData";

/**
 * CONTRAST CONFIGURATION — synthetic "Demo Records," per the implementation task's
 * Section 13. Not a real FYNXT product/module. Exists only to prove the template
 * renders correctly with: different columns, no selection, no bulk actions, no
 * insights, no view tabs, a different row-action set, and a different data shape —
 * without any Leads-specific assumption leaking in. No hypothetical business rules
 * are attached to this entity.
 */

const demoRecordsColumns: ListColumn[] = [
  { key: "title", label: "Title", sortable: true },
  { key: "category", label: "Category" },
  { key: "quantity", label: "Quantity", sortable: true },
  { key: "updatedAt", label: "Updated" },
];

const demoRecordsRowActions: ListAction[] = [
  { key: "open", label: "Open", onSelect: () => {} },
  { key: "duplicate", label: "Duplicate", onSelect: () => {} },
];

export function createDemoRecordsListConfig(): ListConfig {
  return {
    entity: "Demo Records",
    columns: demoRecordsColumns,
    search: { placeholder: "Search demo records" },
    sorting: { enabled: true },
    pagination: { enabled: true, pageSize: 10 },
    // Deliberately omitted/false: selection, bulkActions, insights, viewTabs,
    // quickFilters, advancedFilters, manageColumns, savedViews — every optional
    // capability stays at its conservative default (Revision 2, Section 5).
    rowActions: demoRecordsRowActions,
    dataAdapter: createMockListDataAdapter(demoRecordsMockData, {
      searchableColumns: ["title", "category"],
    }),
  };
}
