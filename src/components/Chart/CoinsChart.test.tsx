import { render, waitFor } from "@testing-library/react";
import { CoinsChart } from "./CoinsChart";
import { ChartContainer } from "./ChartContainer";
import { fetch1DayMarketPricesMock } from "../../mocks/fetch-1Day-Market-Prices-mock";
import { CoinMarketPrices } from "../interfaces";

jest.mock("react-chartjs-2", () => ({
  Line: () => <canvas role="img"></canvas>,
}));

describe("CoinsChart", () => {
  test("displays a chart", () => {
    const coinMarketPrices: CoinMarketPrices = {
      id: "testCoin1",
      prices: [1, 2, 3, 4, 5],
      dates: ["1/1/2022, 2:00:00 AM"],
    };
    const { getByRole } = render(
      <CoinsChart coinsMarketPrices={coinMarketPrices} colorChoice={1} />
    );

    expect(getByRole("img")).toBeInTheDocument();
  });

  test("displays a message when no prices", async () => {
    const { getByText } = render(
      <ChartContainer
        selectedCoins={[]}
        fetchMarketPrices={fetch1DayMarketPricesMock}
      />
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
      <ChartContainer
        selectedCoins={selectedCoins}
        fetchMarketPrices={fetch1DayMarketPricesMock}
      />
    );

    const getStartedMessage = getByText("Search a coin to get started!");

    await waitFor(() => {
      expect(getStartedMessage).not.toBeInTheDocument();
    });

    expect(getAllByRole("img").length).toEqual(1);
    expect(getAllByRole("img")[0]).toBeInTheDocument();
  });
});
