import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { TableList } from "../src/index";
import { buildMinimalConfig } from "./fixtures";

// Test H — Responsive. Honest limitation: jsdom does not perform real layout or
// evaluate CSS media queries, so this cannot verify actual narrow-viewport
// rendering — only that the structural responsive strategy documented in
// src/template/TableList.css (horizontal scroll container, not page-level
// reflow) is present in the DOM. Full responsive verification requires a real
// browser check — see docs/implementation-notes.md, "What was actually
// validated."
describe("Test H — Responsive (structural check only)", () => {
  it("wraps the table in its own horizontally-scrollable container", async () => {
    const { container } = render(<TableList config={buildMinimalConfig()} />);
    await waitFor(() => screen.getByRole("table"));

    const scrollContainer = container.querySelector(".tpl-list__table-scroll");
    expect(scrollContainer).not.toBeNull();
    expect(scrollContainer?.contains(screen.getByRole("table"))).toBe(true);
  });
});
