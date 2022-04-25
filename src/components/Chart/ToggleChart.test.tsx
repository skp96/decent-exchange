import { render, waitFor } from "@testing-library/react";
import { ToggleChart } from "./ToggleChart";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles";

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

  test("when a user clicks an option, the button is shown as selected", async () => {
    const { getByRole } = render(
      <ThemeProvider theme={theme}>
        <ToggleChart />
      </ThemeProvider>
    );

    const button = getByRole("button", { name: "YTD" });

    userEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveStyle("background-color: #21CE99");
    });
  });
});
