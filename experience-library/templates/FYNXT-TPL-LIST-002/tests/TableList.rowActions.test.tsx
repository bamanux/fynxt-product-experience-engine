import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TableList } from "../src/index";
import type { ListAction } from "../src/index";
import { buildMinimalConfig } from "./fixtures";

/**
 * Required Row-Action test cases (Step 9B, Section 15), against the FYNXT Table
 * Row Action Rule in docs/visual-alignment-audit.md and implemented by
 * src/patterns/RowActionsPattern.tsx. Every case here uses generic action
 * labels (View/Edit/Delete/Archive as structural examples only) — none of
 * these are an approved FYNXT action vocabulary; see fixtures.ts / the Leads
 * example for where a real vocabulary would come from.
 */

function firstRowActionCell() {
  const table = screen.getByRole("table");
  const firstDataRow = within(table).getAllByRole("row")[1]; // [0] is the header row
  if (!firstDataRow) throw new Error("Expected at least one data row");
  return within(firstDataRow);
}

describe("FYNXT Table Row Action Rule", () => {
  it("Case A — View only -> [View], no overflow", async () => {
    const actions: ListAction[] = [{ key: "view", label: "View", isView: true, onSelect: vi.fn() }];
    render(<TableList config={buildMinimalConfig({ rowActions: actions })} />);
    await waitFor(() => screen.getByRole("table"));

    const row = firstRowActionCell();
    expect(row.getByRole("button", { name: /^view$/i })).toBeInTheDocument();
    expect(row.queryByRole("button", { name: /more actions/i })).not.toBeInTheDocument();
  });

  it("Case B — View, Edit -> [View] [Edit], no overflow", async () => {
    const actions: ListAction[] = [
      { key: "view", label: "View", isView: true, onSelect: vi.fn() },
      { key: "edit", label: "Edit", onSelect: vi.fn() },
    ];
    render(<TableList config={buildMinimalConfig({ rowActions: actions })} />);
    await waitFor(() => screen.getByRole("table"));

    const row = firstRowActionCell();
    expect(row.getByRole("button", { name: /^view$/i })).toBeInTheDocument();
    expect(row.getByRole("button", { name: /^edit$/i })).toBeInTheDocument();
    expect(row.queryByRole("button", { name: /more actions/i })).not.toBeInTheDocument();
  });

  it("Case C — View, Edit, Delete -> [View] [Edit] [⋮], overflow contains Delete", async () => {
    const user = userEvent.setup();
    const onDelete = vi.fn();
    const actions: ListAction[] = [
      { key: "view", label: "View", isView: true, onSelect: vi.fn() },
      { key: "edit", label: "Edit", onSelect: vi.fn() },
      { key: "delete", label: "Delete", destructive: true, onSelect: onDelete },
    ];
    render(<TableList config={buildMinimalConfig({ rowActions: actions })} />);
    await waitFor(() => screen.getByRole("table"));

    const row = firstRowActionCell();
    expect(row.getByRole("button", { name: /^view$/i })).toBeInTheDocument();
    expect(row.getByRole("button", { name: /^edit$/i })).toBeInTheDocument();
    expect(row.queryByRole("button", { name: /^delete$/i })).not.toBeInTheDocument();

    const overflowTrigger = row.getByRole("button", { name: /more actions/i });
    await user.click(overflowTrigger);
    const deleteItem = screen.getByRole("menuitem", { name: /^delete$/i });
    expect(deleteItem).toBeInTheDocument();
    await user.click(deleteItem);
    expect(onDelete).toHaveBeenCalledTimes(1);
  });

  it("Case D — Edit, Delete, Archive (no View) -> [Edit] [Delete] [⋮], overflow contains Archive", async () => {
    const user = userEvent.setup();
    const actions: ListAction[] = [
      { key: "edit", label: "Edit", onSelect: vi.fn() },
      { key: "delete", label: "Delete", destructive: true, onSelect: vi.fn() },
      { key: "archive", label: "Archive", onSelect: vi.fn() },
    ];
    render(<TableList config={buildMinimalConfig({ rowActions: actions })} />);
    await waitFor(() => screen.getByRole("table"));

    const row = firstRowActionCell();
    expect(row.getByRole("button", { name: /^edit$/i })).toBeInTheDocument();
    expect(row.getByRole("button", { name: /^delete$/i })).toBeInTheDocument();
    expect(row.queryByRole("button", { name: /^archive$/i })).not.toBeInTheDocument();

    const overflowTrigger = row.getByRole("button", { name: /more actions/i });
    await user.click(overflowTrigger);
    expect(screen.getByRole("menuitem", { name: /^archive$/i })).toBeInTheDocument();
  });

  it("Case E — Edit only -> [Edit], no overflow", async () => {
    const actions: ListAction[] = [{ key: "edit", label: "Edit", onSelect: vi.fn() }];
    render(<TableList config={buildMinimalConfig({ rowActions: actions })} />);
    await waitFor(() => screen.getByRole("table"));

    const row = firstRowActionCell();
    expect(row.getByRole("button", { name: /^edit$/i })).toBeInTheDocument();
    expect(row.queryByRole("button", { name: /more actions/i })).not.toBeInTheDocument();
  });

  it("Case F — no row actions -> no action column at all", async () => {
    render(<TableList config={buildMinimalConfig({ rowActions: [] })} />);
    await waitFor(() => screen.getByRole("table"));

    expect(screen.queryByText("Actions")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /more actions/i })).not.toBeInTheDocument();
    const table = screen.getByRole("table");
    const headerRow = within(table).getAllByRole("row")[0];
    if (!headerRow) throw new Error("Expected a header row");
    // Column count = just the configured columns (2 in buildMinimalConfig), no
    // selection column (default off) and no action column.
    expect(within(headerRow).getAllByRole("columnheader")).toHaveLength(2);
  });
});
