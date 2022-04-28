import { render, waitFor } from "@testing-library/react";
import { ToggleChart } from "./ToggleChart";
import userEvent from "@testing-library/user-event";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../styles";
import { RecoilRoot } from "recoil";
import { ChartContainer } from "./ChartContainer";
import { fetchChartDataMock } from "../../mocks/fetch-chart-data-mock";

const defaultProps = {
  id: 1,
  symbol: "testCoin",
  timePeriod: "1",
};

jest.mock("react-chartjs-2", () => ({
  Line: () => <canvas role="img"></canvas>,
}));

describe("ToggleChart Component", () => {
  test("displays different toggle options", () => {
    const { getAllByRole, getByRole } = render(
      <RecoilRoot>
        <ToggleChart {...defaultProps} />
      </RecoilRoot>
    );

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
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <ToggleChart {...defaultProps} />
        </ThemeProvider>
      </RecoilRoot>
    );

    const button = getByRole("button", { name: "YTD" });

    userEvent.click(button);

    await waitFor(() => {
      expect(button).toHaveStyle("background-color: #21CE99");
    });
  });

  test("when a user selects a time period, a chart is rendered", async () => {
    const selectedCoins = [
      {
        id: "testCoin1",
        name: "TestCoin1",
        symbol: "tc",
        colorChoice: 0,
      },
    ];

    const { getAllByRole, getByRole } = render(
      <RecoilRoot>
        <ChartContainer
          selectedCoins={selectedCoins}
          fetchChartData={fetchChartDataMock}
        />
      </RecoilRoot>
    );

    await waitFor(() => {
      const button = getByRole("button", { name: "1W" });

      userEvent.click(button);
    });

    await waitFor(() => {
      expect(getAllByRole("img").length).toEqual(1);
      expect(getAllByRole("img")[0]).toBeInTheDocument();
    });
  });
});
