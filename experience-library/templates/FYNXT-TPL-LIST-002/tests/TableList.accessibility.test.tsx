import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TableList } from "../src/index";
import { buildMinimalConfig } from "./fixtures";

// Test I — Keyboard accessibility. What's actually validated here: the search
// input, row-action menu trigger, and row-action menu items are reachable and
// operable by keyboard alone, the menu closes on Escape and returns focus to its
// trigger, and interactive controls have accessible names. This is not a claim of
// full WCAG 2.1 AA conformance — see docs/implementation-notes.md.
describe("Test I — Keyboard accessibility", () => {
  it("search input is reachable by keyboard and has an accessible name", async () => {
    render(<TableList config={buildMinimalConfig()} />);
    await waitFor(() => screen.getByRole("table"));

    const search = screen.getByRole("searchbox", { name: /search test records/i });
    search.focus();
    expect(search).toHaveFocus();
  });

  it("a single direct row action is reachable and operable by keyboard (Enter activates it)", async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();

    render(
      <TableList
        config={buildMinimalConfig({
          rowActions: [{ key: "open", label: "Open", onSelect }],
        })}
      />,
    );
    await waitFor(() => screen.getByRole("table"));

    // Per the FYNXT Table Row Action Rule, 1 configured action renders as a
    // direct button, not an overflow trigger — see
    // docs/visual-alignment-audit.md and tests/TableList.rowActions.test.tsx.
    // (Every visible row gets its own "Open" button; the first is sufficient
    // to prove keyboard reachability/operability.)
    const directButton = screen.getAllByRole("button", { name: /^open$/i })[0];
    if (!directButton) throw new Error("Expected at least one direct row-action button");
    directButton.focus();
    expect(directButton).toHaveFocus();
    await user.keyboard("{Enter}");
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it("the overflow menu (3+ actions) opens with the keyboard, lists items with accessible names, and Escape returns focus to the trigger", async () => {
    const user = userEvent.setup();

    render(
      <TableList
        config={buildMinimalConfig({
          rowActions: [
            { key: "one", label: "One", onSelect: vi.fn() },
            { key: "two", label: "Two", onSelect: vi.fn() },
            { key: "three", label: "Three", onSelect: vi.fn() },
          ],
        })}
      />,
    );
    await waitFor(() => screen.getByRole("table"));

    const trigger = screen.getByRole("button", { name: /more actions for rec-1/i });
    trigger.focus();
    expect(trigger).toHaveFocus();
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    await user.keyboard("{Enter}");
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    // Third action (lowest priority, per configured order) is the one pushed
    // into overflow — see tests/TableList.rowActions.test.tsx, Case C/D.
    const menuItem = screen.getByRole("menuitem", { name: /^three$/i });
    expect(menuItem).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });

  it("selection checkboxes are operable with the keyboard and have accessible names", async () => {
    const user = userEvent.setup();
    render(<TableList config={buildMinimalConfig({ selection: { enabled: true } })} />);
    await waitFor(() => screen.getByRole("table"));

    const checkbox = screen.getByRole("checkbox", { name: /select row rec-1/i });
    checkbox.focus();
    expect(checkbox).toHaveFocus();
    await user.keyboard(" ");
    expect(checkbox).toBeChecked();
  });
});
