import type { ListRecord } from "../../src/index";

/**
 * SYNTHETIC TEST DATA — not a real FYNXT product or module, and not a hypothetical
 * business entity with invented rules. This exists purely to give the template a
 * second, structurally different data shape to render, per the implementation
 * task's Section 13 ("a contrast configuration ... do not use hypothetical
 * business rules"). Deliberately has no `tag` or `owner` field on most records, to
 * prove those `ListRecord` fields are optional, not assumed.
 */
export const demoRecordsMockData: ListRecord[] = [
  { id: "demo-01", title: "Widget A", category: "Hardware", quantity: 12, updatedAt: "2026-01-04" },
  { id: "demo-02", title: "Widget B", category: "Hardware", quantity: 3, updatedAt: "2026-02-11" },
  { id: "demo-03", title: "Service Pack C", category: "Service", quantity: 1, updatedAt: "2026-02-20" },
  { id: "demo-04", title: "Widget D", category: "Hardware", quantity: 27, updatedAt: "2026-03-01" },
  { id: "demo-05", title: "Service Pack E", category: "Service", quantity: 5, updatedAt: "2026-03-15" },
  { id: "demo-06", title: "Widget F", category: "Hardware", quantity: 9, updatedAt: "2026-04-02" },
  { id: "demo-07", title: "Consumable G", category: "Consumable", quantity: 150, updatedAt: "2026-04-19" },
  { id: "demo-08", title: "Consumable H", category: "Consumable", quantity: 42, updatedAt: "2026-05-06" },
  { id: "demo-09", title: "Service Pack I", category: "Service", quantity: 2, updatedAt: "2026-05-22" },
  { id: "demo-10", title: "Widget J", category: "Hardware", quantity: 18, updatedAt: "2026-06-01" },
  { id: "demo-11", title: "Consumable K", category: "Consumable", quantity: 60, updatedAt: "2026-06-14" },
  { id: "demo-12", title: "Widget L", category: "Hardware", quantity: 7, updatedAt: "2026-06-30" },
];
