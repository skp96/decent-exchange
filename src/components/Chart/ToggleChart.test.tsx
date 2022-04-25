import { render } from "@testing-library/react";
import { ToggleChart } from "./ToggleChart";

describe("ToggleChart Component", () => {
  test("displays different toggle options", () => {
    const { getAllByRole, getByRole } = render(<ToggleChart />);

    const buttons = getAllByRole("button");

    expect(buttons.length).toEqual(6);
    expect(getByRole("button", { name: "Live" })).toBeInTheDocument();
    expect(getByRole("button", { name: "1W" })).toBeInTheDocument();
    expect(getByRole("button", { name: "1M" })).toBeInTheDocument();
    expect(getByRole("button", { name: "3M" })).toBeInTheDocument();
    expect(getByRole("button", { name: "YTD" })).toBeInTheDocument();
    expect(getByRole("button", { name: "5Y" })).toBeInTheDocument();
  });
});
