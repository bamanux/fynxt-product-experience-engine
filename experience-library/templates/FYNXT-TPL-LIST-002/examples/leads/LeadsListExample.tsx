import { TableList } from "../../src/index";
import { createLeadsListConfig } from "./leads.config";

/**
 * EXAMPLE / PILOT CONFIGURATION — not the definition of the template.
 * Composes FYNXT-TPL-LIST-002 with the Leads configuration. This wrapper contains
 * no Leads-specific logic itself — all of it lives in `leads.config.tsx`.
 */
export function LeadsListExample() {
  return <TableList config={createLeadsListConfig()} />;
}
