import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor, within } from "@testing-library/react";
import { TableList } from "../src/index";
import { buildMinimalConfig } from "./fixtures";

/**
 * Required frozen-column tests (Step 9B, Section 16), against the Frozen Column
 * Rule in docs/visual-alignment-audit.md. `buildMinimalConfig` has two data
 * columns (title, count); the first ("title") is the one expected to freeze.
 */

function headerRow() {
  const table = screen.getByRole("table");
  const row = within(table).getAllByRole("row")[0];
  if (!row) throw new Error("Expected a header row");
  return within(row);
}

describe("Frozen Column Rule", () => {
  it("Selection ON + Actions ON -> checkbox, first column, and actions are frozen", async () => {
    render(
      <TableList
        config={buildMinimalConfig({
          selection: { enabled: true },
          rowActions: [{ key: "open", label: "Open", onSelect: vi.fn() }],
        })}
      />,
    );
    await waitFor(() => screen.getByRole("table"));
    const header = headerRow();

    const checkboxCell = screen.getByRole("checkbox", { name: /select all/i }).closest("th");
    const titleCell = header.getByRole("columnheader", { name: /title/i });
    const countCell = header.getByRole("columnheader", { name: /count/i });
    const actionsHeaderCells = within(screen.getByRole("table")).getAllByRole("columnheader");
    const actionsCell = actionsHeaderCells[actionsHeaderCells.length - 1];

    expect(checkboxCell).toHaveClass("tpl-list__cell--frozen-left");
    expect(titleCell).toHaveClass("tpl-list__cell--frozen-left");
    expect(countCell).not.toHaveClass("tpl-list__cell--frozen-left");
    expect(actionsCell).toHaveClass("tpl-list__cell--frozen-right");

    // First data column sits after the checkbox column, not at the left edge.
    expect(titleCell).toHaveStyle({ left: "var(--tpl-control-column-width)" });
    expect(checkboxCell).toHaveStyle({ left: "0px" });
  });

  it("Selection OFF + Actions ON -> first column and actions are frozen, no checkbox", async () => {
    render(
      <TableList
        config={buildMinimalConfig({
          rowActions: [{ key: "open", label: "Open", onSelect: vi.fn() }],
        })}
      />,
    );
    await waitFor(() => screen.getByRole("table"));
    const header = headerRow();

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    const titleCell = header.getByRole("columnheader", { name: /title/i });
    expect(titleCell).toHaveClass("tpl-list__cell--frozen-left");
    expect(titleCell).toHaveStyle({ left: "0px" });

    const actionsHeaderCells = within(screen.getByRole("table")).getAllByRole("columnheader");
    expect(actionsHeaderCells[actionsHeaderCells.length - 1]).toHaveClass(
      "tpl-list__cell--frozen-right",
    );
  });

  it("Selection ON + Actions OFF -> checkbox and first column are frozen, no action column", async () => {
    const { container } = render(
      <TableList config={buildMinimalConfig({ selection: { enabled: true } })} />,
    );
    await waitFor(() => screen.getByRole("table"));
    const header = headerRow();

    const checkboxCell = screen.getByRole("checkbox", { name: /select all/i }).closest("th");
    const titleCell = header.getByRole("columnheader", { name: /title/i });
    expect(checkboxCell).toHaveClass("tpl-list__cell--frozen-left");
    expect(titleCell).toHaveClass("tpl-list__cell--frozen-left");
    expect(titleCell).toHaveStyle({ left: "var(--tpl-control-column-width)" });

    // No action column at all -> nothing frozen on the right.
    expect(container.querySelector(".tpl-list__cell--frozen-right")).toBeNull();
  });

  it("Selection OFF + Actions OFF -> only the first column is frozen", async () => {
    render(<TableList config={buildMinimalConfig()} />);
    await waitFor(() => screen.getByRole("table"));
    const header = headerRow();

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    const titleCell = header.getByRole("columnheader", { name: /title/i });
    const countCell = header.getByRole("columnheader", { name: /count/i });
    expect(titleCell).toHaveClass("tpl-list__cell--frozen-left");
    expect(titleCell).toHaveStyle({ left: "0px" });
    expect(countCell).not.toHaveClass("tpl-list__cell--frozen-left");
    expect(countCell).not.toHaveClass("tpl-list__cell--frozen-right");
  });

  it("the table sits inside its own horizontally-scrollable container (other columns remain scrollable)", async () => {
    const { container } = render(
      <TableList config={buildMinimalConfig({ selection: { enabled: true } })} />,
    );
    await waitFor(() => screen.getByRole("table"));
    const scrollContainer = container.querySelector(".tpl-list__table-scroll");
    expect(scrollContainer).not.toBeNull();
    expect(scrollContainer?.contains(screen.getByRole("table"))).toBe(true);

    // "count" is the non-first data column — it must NOT be frozen, i.e. it is
    // part of the scrollable region.
    const countCell = headerRow().getByRole("columnheader", { name: /count/i });
    expect(countCell).not.toHaveClass("tpl-list__cell--frozen-left");
    expect(countCell).not.toHaveClass("tpl-list__cell--frozen-right");
  });
});
