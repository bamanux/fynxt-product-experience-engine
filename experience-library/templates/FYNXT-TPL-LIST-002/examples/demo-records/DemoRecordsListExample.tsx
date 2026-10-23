import { TableList } from "../../src/index";
import { createDemoRecordsListConfig } from "./demoRecords.config";

/**
 * CONTRAST EXAMPLE — synthetic entity, not a real FYNXT product. See
 * demoRecords.config.ts for why this exists.
 */
export function DemoRecordsListExample() {
  return <TableList config={createDemoRecordsListConfig()} />;
}
