import { describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TableList } from "../src/index";
import { buildMinimalConfig } from "./fixtures";
import type { ListDataAdapter } from "../src/index";

// Tests E, F, G — Loading, Empty, Error. Only `success` was directly demonstrated
// in Tests A–D; these three exercise the rest of the baseline state contract the
// template is responsible for supporting (docs/template-specification.md Field 14).

describe("Test E — Loading", () => {
  it("shows an accessible loading status before the adapter resolves", async () => {
    let resolvePromise!: (value: { records: never[]; totalCount: number; page: number; pageSize: number }) => void;
    const pendingAdapter: ListDataAdapter = () =>
      new Promise((resolve) => {
        resolvePromise = resolve;
      });

    render(<TableList config={buildMinimalConfig({ dataAdapter: pendingAdapter })} />);

    expect(screen.getByRole("status")).toHaveTextContent(/loading test records/i);
    expect(screen.queryByRole("table")).not.toBeInTheDocument();

    resolvePromise({ records: [], totalCount: 0, page: 1, pageSize: 5 });
    await waitFor(() => expect(screen.queryByRole("status")).not.toHaveTextContent(/loading/i));
  });
});

describe("Test F — Empty", () => {
  it("shows an empty-state message when the adapter returns zero records", async () => {
    const emptyAdapter: ListDataAdapter = async () => ({
      records: [],
      totalCount: 0,
      page: 1,
      pageSize: 5,
    });

    render(<TableList config={buildMinimalConfig({ dataAdapter: emptyAdapter })} />);

    await waitFor(() => screen.getByText(/no test records found/i));
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});

describe("Test G — Error", () => {
  it("shows an alert with a retry action, and retry re-invokes the adapter", async () => {
    const adapter = vi.fn(async () => {
      throw new Error("mock failure");
    });
    const user = userEvent.setup();

    render(<TableList config={buildMinimalConfig({ dataAdapter: adapter })} />);

    await waitFor(() => screen.getByRole("alert"));
    expect(screen.getByRole("alert")).toHaveTextContent(/something went wrong/i);
    expect(adapter).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: /retry/i }));
    await waitFor(() => expect(adapter).toHaveBeenCalledTimes(2));
  });
});
