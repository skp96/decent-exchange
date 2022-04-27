import { render, waitFor } from "@testing-library/react";
import { CoinsChart } from "./CoinsChart";
import { ChartContainer } from "./ChartContainer";
import { fetchChartDataMock } from "../../mocks/fetch-chart-data-mock";
import { CoinChartData } from "../interfaces";
import { RecoilRoot } from "recoil";

jest.mock("react-chartjs-2", () => ({
  Line: () => <canvas role="img"></canvas>,
}));

describe("CoinsChart", () => {
  test("displays a chart", () => {
    const coinChartData: CoinChartData = {
      id: "testCoin1",
      prices: [1, 2, 3, 4, 5],
      dates: ["1/1/2022, 2:00:00 AM"],
      timePeriod: "1",
    };
    const { getByRole } = render(
      <RecoilRoot>
        <CoinsChart coinChartData={coinChartData} colorChoice={1} />
      </RecoilRoot>
    );

    expect(getByRole("img")).toBeInTheDocument();
  });

  test("displays a message when no prices", async () => {
    const { getByText } = render(
      <RecoilRoot>
        <ChartContainer
          selectedCoins={[]}
          fetchChartData={fetchChartDataMock}
        />
      </RecoilRoot>
    );

    expect(getByText("Search a coin to get started!")).toBeInTheDocument();
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
      <RecoilRoot>
        <ChartContainer
          selectedCoins={selectedCoins}
          fetchChartData={fetchChartDataMock}
        />
      </RecoilRoot>
    );

    const getStartedMessage = getByText("Search a coin to get started!");

    await waitFor(() => {
      expect(getStartedMessage).not.toBeInTheDocument();
    });

    expect(getAllByRole("img").length).toEqual(1);
    expect(getAllByRole("img")[0]).toBeInTheDocument();
  });
});
