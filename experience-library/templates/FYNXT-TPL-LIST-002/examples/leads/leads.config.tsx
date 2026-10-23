import type { ListAction, ListColumn, ListConfig } from "../../src/index";
import { createMockListDataAdapter, Tag } from "../../src/index";
import { leadsMockRecords } from "./leads.mockData";

/**
 * Leads' own status → semantic-tone mapping. This is exactly the kind of
 * business-meaning translation that must never live in the template
 * (src/template/Tag.tsx only knows five generic tones) — it's isolated here,
 * next to the rest of Leads' configuration. Statuses/tones are sourced from
 * `docs/template-discovery.md`'s `CAND-001` evidence; `Unqualified` is mapped
 * to `neutral` rather than a confident color, since the audit flagged its
 * observed color as visually ambiguous with `Qualified` — not something this
 * pilot should resolve by assumption.
 */
const LEAD_STATUS_TONE: Record<string, "info" | "warning" | "neutral" | "success"> = {
  "New Lead": "info",
  Contacted: "info",
  "Contact Attempted": "warning",
  Qualified: "success",
  Unqualified: "neutral",
  Inactive: "neutral",
};

/**
 * EXAMPLE / PILOT CONFIGURATION — Leads.
 *
 * This is a configured *instance* of FYNXT-TPL-LIST-002, not a definition of the
 * template. Every Leads-specific value below (columns, actions, filters, tabs,
 * metrics) lives here, in this file, isolated from `src/template/` — none of it is
 * imported by, or known to, the template itself. This is the concrete proof of
 * "Template → Configuration → Entity-specific instance," per the implementation
 * task's architectural rule.
 *
 * Every value here is sourced from `docs/template-discovery.md`'s `CAND-001`
 * evidence (and, for row actions, the row-action-menu vocabulary documented there).
 * No business rule (what "Qualified" means, who may Delete/Export/Convert, what the
 * temperature tag is driven by) is invented — those remain `Unknown` per the
 * discovery worksheet, and this config does not pretend otherwise: action handlers
 * below are pilot stubs, not real business logic.
 */

const leadsColumns: ListColumn[] = [
  { key: "name", label: "Name", sortable: true },
  { key: "contactNumber", label: "Contact Number" },
  { key: "email", label: "Email" },
  { key: "type", label: "Type" },
  {
    key: "status",
    label: "Status",
    render: (record) => {
      const status = String(record.status ?? "");
      return <Tag label={status} tone={LEAD_STATUS_TONE[status] ?? "neutral"} />;
    },
  },
  { key: "executedOn", label: "Executed On", sortable: true },
];

const leadsRowActions: ListAction[] = [
  // `isView: true` is what tells the Row Action pattern this is the record's View
  // action, per docs/visual-alignment-audit.md's FYNXT Table Row Action Rule —
  // never inferred from the key/label text.
  { key: "viewDetails", label: "View Details", isView: true, onSelect: () => {} },
  { key: "editLead", label: "Edit Lead", onSelect: () => {} },
  { key: "sendEmail", label: "Send Email", onSelect: () => {} },
  { key: "call", label: "Call", onSelect: () => {} },
  { key: "convertToContact", label: "Convert to Contact", onSelect: () => {} },
  { key: "delete", label: "Delete", destructive: true, onSelect: () => {} },
];

const leadsBulkActions: ListAction[] = [
  { key: "archive", label: "Archive", onSelect: () => {} },
  { key: "exportData", label: "Export Data", onSelect: () => {} },
];

export function createLeadsListConfig(): ListConfig {
  return {
    entity: "Leads",
    columns: leadsColumns,
    search: { placeholder: "Search leads" },
    sorting: { enabled: true },
    pagination: { enabled: true, pageSize: 5 },
    selection: { enabled: true },
    rowActions: leadsRowActions,
    bulkActions: leadsBulkActions,
    viewTabs: {
      enabled: true,
      tabs: [
        { key: "allLeads", label: "All leads" },
        { key: "myLeads", label: "My leads" },
        { key: "recentActivity", label: "Recent Activity" },
      ],
      activeTabKey: "allLeads",
      // Pilot limitation: tab selection is tracked but does not re-scope the query
      // in this pilot — see docs/implementation-notes.md, Known Limitations.
      onTabChange: () => {},
    },
    insights: {
      enabled: true,
      render: () => "Total Leads · New This Month · Qualified · Conversion Rate",
    },
    quickFilters: {
      enabled: true,
      placeholderLabel:
        "Quick Filters (Source, Status, Type, Owner, Label, Created On) — pattern not yet implemented",
    },
    advancedFilters: {
      enabled: true,
      placeholderLabel: "Advanced Filters — pattern not yet implemented",
    },
    manageColumns: {
      enabled: true,
      placeholderLabel: "Manage Columns — pattern not yet implemented",
    },
    dataAdapter: createMockListDataAdapter(leadsMockRecords, {
      searchableColumns: ["name", "email", "contactNumber"],
    }),
  };
}
