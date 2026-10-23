import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { TableList } from "../src/index";
import { buildMinimalConfig } from "./fixtures";

// Test A — Minimal List: search, columns, pagination present; no selection,
// no bulk actions, no insights, no view tabs. Proves the template stays
// structurally valid with every optional capability at its conservative default.
describe("Test A — Minimal List", () => {
  it("renders search, columns, and pagination with no optional capabilities", async () => {
    render(<TableList config={buildMinimalConfig()} />);

    await waitFor(() => screen.getByRole("table"));

    // Search: present (default enabled)
    expect(screen.getByRole("searchbox")).toBeInTheDocument();

    // Columns: rendered as configured
    expect(screen.getByRole("columnheader", { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /count/i })).toBeInTheDocument();

    // Pagination: present (default enabled)
    expect(screen.getByRole("navigation", { name: /pagination/i })).toBeInTheDocument();

    // Selection: absent — no checkboxes anywhere
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();

    // Bulk actions: absent
    expect(screen.queryByRole("region", { name: /bulk actions/i })).not.toBeInTheDocument();

    // Insights: absent — no insights slot rendered at all
    expect(screen.queryByTestId("insights-slot")).not.toBeInTheDocument();

    // View tabs: absent — no tablist rendered
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument();

    // Optional filter patterns: absent
    expect(screen.queryByTestId("quickFilters-slot")).not.toBeInTheDocument();
    expect(screen.queryByTestId("advancedFilters-slot")).not.toBeInTheDocument();
    expect(screen.queryByTestId("manageColumns-slot")).not.toBeInTheDocument();
    expect(screen.queryByTestId("savedViews-slot")).not.toBeInTheDocument();
  });

  it("renders no row-action column when rowActions is empty/unconfigured", async () => {
    render(<TableList config={buildMinimalConfig()} />);
    await waitFor(() => screen.getByRole("table"));
    expect(screen.queryByRole("button", { name: /^actions for/i })).not.toBeInTheDocument();
  });
});
