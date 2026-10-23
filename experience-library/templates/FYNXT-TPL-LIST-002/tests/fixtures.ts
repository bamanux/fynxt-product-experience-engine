import type { ListConfig, ListRecord } from "../src/index";
import { createMockListDataAdapter } from "../src/index";

/**
 * Test-only fixtures. Deliberately generic — "Widget," "Test Records" — used to
 * test the TEMPLATE in isolation from both example configurations, so a template
 * bug can't hide behind Leads- or Demo-Records-shaped data.
 */

export const genericRecords: ListRecord[] = Array.from({ length: 7 }, (_, i) => ({
  id: `rec-${i + 1}`,
  title: `Widget ${i + 1}`,
  count: i + 1,
}));

export function buildMinimalConfig(overrides: Partial<ListConfig> = {}): ListConfig {
  return {
    entity: "Test Records",
    columns: [
      { key: "title", label: "Title", sortable: true },
      { key: "count", label: "Count", sortable: true },
    ],
    pagination: { enabled: true, pageSize: 5 },
    dataAdapter: createMockListDataAdapter(genericRecords, {
      searchableColumns: ["title"],
    }),
    ...overrides,
  };
}
