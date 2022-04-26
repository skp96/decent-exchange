import { render, waitFor } from "@testing-library/react";
import { CoinsChart } from "./CoinsChart";
import { ChartContainer } from "./ChartContainer";
import { fetchChartDataMock } from "../../mocks/fetch-chart-data-mock";
import { CoinChartData } from "../interfaces";

jest.mock("react-chartjs-2", () => ({
  Line: () => <canvas role="img"></canvas>,
}));

describe("CoinsChart", () => {
  test("displays a chart", () => {
    const coinChartData: CoinChartData = {
      id: "testCoin1",
      prices: [1, 2, 3, 4, 5],
      dates: ["1/1/2022, 2:00:00 AM"],
    };
    const { getByRole } = render(
      <CoinsChart coinChartData={coinChartData} colorChoice={1} />
    );

    expect(getByRole("img")).toBeInTheDocument();
  });

  test("displays a message when no prices", async () => {
    const { getByText } = render(
      <ChartContainer selectedCoins={[]} fetchChartData={fetchChartDataMock} />
    );

    expect(getByText("Select a coin to get started!")).toBeInTheDocument();
  });

  test("displays a chart when coins have been selected", async () => {
    const selectedCoins = [
      {
        id: "testCoin1",
        name: "TestCoin1",
        symbol: "tc",
      },
    ];

    const { getAllByRole, getByText } = render(
      <ChartContainer
        selectedCoins={selectedCoins}
        fetchChartData={fetchChartDataMock}
      />
    );

    const getStartedMessage = getByText("Select a coin to get started!");

    await waitFor(() => {
      expect(getStartedMessage).not.toBeInTheDocument();
    });

    expect(getAllByRole("img").length).toEqual(1);
    expect(getAllByRole("img")[0]).toBeInTheDocument();
  });
});
