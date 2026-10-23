import { describe, expect, it } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { LeadsListExample } from "../examples/leads/LeadsListExample";
import { DemoRecordsListExample } from "../examples/demo-records/DemoRecordsListExample";

// Test D — Different Entity: the synthetic Demo Records configuration renders with
// its own columns and data, with no Leads-specific vocabulary anywhere — proving
// the template generalizes rather than being the Leads screen with an extra
// config layer on top.
describe("Test D — Different Entity (Demo Records vs. Leads)", () => {
  it("renders Demo Records' own columns and data, not Leads'", async () => {
    render(<DemoRecordsListExample />);
    await waitFor(() => screen.getByRole("table"));

    expect(screen.getByRole("columnheader", { name: /title/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /category/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /quantity/i })).toBeInTheDocument();
    expect(screen.getByText("Widget A")).toBeInTheDocument();

    // No Leads-specific vocabulary anywhere in this render.
    expect(screen.queryByText(/lead/i)).not.toBeInTheDocument();
    expect(screen.queryByRole("checkbox")).not.toBeInTheDocument(); // selection off
    expect(screen.queryByTestId("insights-slot")).not.toBeInTheDocument(); // insights off
    expect(screen.queryByRole("tablist")).not.toBeInTheDocument(); // view tabs off
  });

  it("renders Leads' own columns and data, distinct from Demo Records", async () => {
    render(<LeadsListExample />);
    await waitFor(() => screen.getByRole("table"));

    expect(screen.getByRole("columnheader", { name: /^name/i })).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: /status/i })).toBeInTheDocument();
    expect(screen.getByText("Ankur Dei")).toBeInTheDocument();

    // Leads-only capabilities are present here, proving they're configuration,
    // not template defaults (Test A already proved the template defaults them off).
    expect(screen.getByRole("tablist", { name: /leads views/i })).toBeInTheDocument();
    expect(screen.getByTestId("insights-slot")).toBeInTheDocument();
    expect(screen.getAllByRole("checkbox").length).toBeGreaterThan(0);

    // No Demo Records vocabulary here.
    expect(screen.queryByText("Widget A")).not.toBeInTheDocument();
  });
});
