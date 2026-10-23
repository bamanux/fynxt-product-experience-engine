import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TableList } from "../src/index";
import { buildMinimalConfig } from "./fixtures";

// Test B — Selectable List: selection enabled, bulk actions enabled, and
// selection gates bulk-action visibility — the one relationship Revision 2 treats
// as genuinely fixed (Section 9).
describe("Test B — Selectable List", () => {
  it("shows no bulk-action bar until a row is selected, then shows it", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();

    render(
      <TableList
        config={buildMinimalConfig({
          selection: { enabled: true },
          bulkActions: [{ key: "archive", label: "Archive", onSelect }],
        })}
      />,
    );

    await waitFor(() => screen.getByRole("table"));

    // Gate closed: selection enabled, but nothing selected yet.
    expect(screen.queryByRole("region", { name: /bulk actions/i })).not.toBeInTheDocument();

    const rowCheckbox = screen.getByRole("checkbox", { name: /select row rec-1/i });
    await user.click(rowCheckbox);

    // Gate open: one row selected.
    const bulkBar = await screen.findByRole("region", { name: /bulk actions/i });
    expect(bulkBar).toHaveTextContent("1 selected");

    const archiveButton = screen.getByRole("button", { name: /^archive$/i });
    await user.click(archiveButton);
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect.mock.calls[0]?.[0]).toHaveLength(1);

    // Deselect: gate closes again.
    await user.click(rowCheckbox);
    expect(screen.queryByRole("region", { name: /bulk actions/i })).not.toBeInTheDocument();
  });

  it("select-all selects every currently-loaded row", async () => {
    const user = userEvent.setup();
    render(
      <TableList
        config={buildMinimalConfig({
          selection: { enabled: true },
          bulkActions: [{ key: "archive", label: "Archive", onSelect: vi.fn() }],
        })}
      />,
    );
    await waitFor(() => screen.getByRole("table"));

    const selectAll = screen.getByRole("checkbox", { name: /select all test records/i });
    await user.click(selectAll);

    const bulkBar = await screen.findByRole("region", { name: /bulk actions/i });
    // pageSize is 5 in buildMinimalConfig
    expect(bulkBar).toHaveTextContent("5 selected");
  });
});
