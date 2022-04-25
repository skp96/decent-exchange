import { render } from "@testing-library/react";
import { ToggleChart } from "./ToggleChart";

describe("ToggleChart Component", () => {
  test("displays different toggle options", () => {
    const { getAllByRole } = render(<ToggleChart />);

    const buttons = getAllByRole("button");

    expect(buttons.length).toEqual(6);
  });
});
