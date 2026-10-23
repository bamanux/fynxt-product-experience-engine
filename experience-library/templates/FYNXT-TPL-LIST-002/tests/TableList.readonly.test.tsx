import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { TableList } from "../src/index";
import { buildMinimalConfig } from "./fixtures";

// Test C — Read-only List: no destructive actions, read-only state supported, no
// accidental mutation controls — even when rowActions/bulkActions/selection ARE
// configured, `readOnly: true` must suppress all of them.
describe("Test C — Read-only List", () => {
  it("renders no row actions, no bulk actions, and no selection when readOnly is true", async () => {
    render(
      <TableList
        config={buildMinimalConfig({
          readOnly: true,
          selection: { enabled: true },
          rowActions: [{ key: "delete", label: "Delete", destructive: true, onSelect: vi.fn() }],
          bulkActions: [{ key: "archive", label: "Archive", onSelect: vi.fn() }],
        })}
      />,
    );

    await waitFor(() => screen.getByRole("table"));

    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /^actions for/i })).not.toBeInTheDocument();
    expect(screen.queryByRole("region", { name: /bulk actions/i })).not.toBeInTheDocument();

    // The table itself communicates its read-only nature to assistive tech.
    expect(screen.getByRole("table")).toHaveAttribute("aria-readonly", "true");
  });
});
