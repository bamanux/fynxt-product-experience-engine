import { StrictMode, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { createRoot } from "react-dom/client";
import { TableList, createMockListDataAdapter } from "../src/index";
import { createLeadsListConfig } from "../examples/leads/leads.config";
import { leadsMockRecords } from "../examples/leads/leads.mockData";
import { DemoRecordsListExample } from "../examples/demo-records/DemoRecordsListExample";

/**
 * Manual visual-QA harness — NOT production code. Adds state toggles so every
 * baseline state (not just `success`) can be inspected visually, per Step 9B's
 * Visual QA requirement.
 *
 * Deliberately styled as tooling, not product: monospace labels, a dashed
 * boundary, and none of the FYNXT tokens the `.tpl-list` surface below it uses —
 * so it never reads as part of the FYNXT experience itself (Section 7). Inline
 * styles only, on purpose: this file is intentionally outside the design-token
 * system it is testing.
 */
const harnessLabelStyle: CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "#8a8f98",
};

const harnessPanelStyle: CSSProperties = {
  border: "1px dashed #c7cad1",
  borderRadius: 4,
  padding: "8px 12px",
  marginBottom: 16,
  display: "flex",
  alignItems: "center",
  gap: 16,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 12,
  color: "#5a6270",
  background: "#fafafb",
};

function LeadsQaPanel() {
  const [mode, setMode] = useState<"success" | "empty" | "error" | "loading">("success");
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);

  const config = useMemo(() => {
    const base = createLeadsListConfig();
    const adapter =
      mode === "error"
        ? createMockListDataAdapter(leadsMockRecords, { simulateError: true })
        : mode === "empty"
          ? createMockListDataAdapter([], {})
          : mode === "loading"
            ? createMockListDataAdapter(leadsMockRecords, { delayMs: 999999 })
            : base.dataAdapter;
    return { ...base, dataAdapter: adapter, disabled, readOnly };
  }, [mode, disabled, readOnly]);

  return (
    <section>
      <div style={harnessLabelStyle}>Example: Leads config — dev harness, not product chrome</div>
      <div style={harnessPanelStyle}>
        <label>
          state:{" "}
          <select value={mode} onChange={(e) => setMode(e.target.value as typeof mode)}>
            <option value="success">success</option>
            <option value="empty">empty</option>
            <option value="error">error</option>
            <option value="loading">loading</option>
          </select>
        </label>
        <label>
          <input type="checkbox" checked={disabled} onChange={(e) => setDisabled(e.target.checked)} />{" "}
          disabled
        </label>
        <label>
          <input type="checkbox" checked={readOnly} onChange={(e) => setReadOnly(e.target.checked)} />{" "}
          readOnly
        </label>
      </div>
      <TableList config={config} />
    </section>
  );
}

function Preview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 40, padding: 24 }}>
      <div style={harnessLabelStyle}>
        FYNXT-TPL-LIST-002 pilot preview — dev harness only, not a production surface
      </div>
      <LeadsQaPanel />
      <section>
        <div style={harnessLabelStyle}>Example: Demo Records config (contrast, most capabilities off)</div>
        <div style={{ marginBottom: 16 }} />
        <DemoRecordsListExample />
      </section>
    </div>
  );
}

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");
createRoot(root).render(
  <StrictMode>
    <Preview />
  </StrictMode>,
);
