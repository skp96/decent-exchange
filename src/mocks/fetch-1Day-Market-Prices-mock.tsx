import { CoinMarketPrices } from "../components/interfaces";

export const fetch1DayMarketPricesMock = (
  coinId: string | null
): Promise<CoinMarketPrices> => {
  const data: CoinMarketPrices = {
    id: "testCoin1",
    prices: [10, 12, 23],
    dates: [
      "4/21/2022, 9:30:00 AM",
      "4/21/2022, 10:30:00 AM",
      "4/21/2022, 10:30:00 AM",
    ],
  };
  return Promise.resolve(data);
};
