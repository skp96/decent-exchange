import { CoinChartData } from "../components/interfaces";
import { LIVE } from "../api/time-periods";

export const fetchChartDataMock = (
  coinId: string | null,
  timePeriod: string
): Promise<CoinChartData> => {
  let data: CoinChartData;

  switch (timePeriod) {
    case LIVE:
      data = {
        id: coinId,
        prices: [10, 12, 23],
        dates: [
          "4/21/2022, 9:30:00 AM",
          "4/21/2022, 10:30:00 AM",
          "4/21/2022, 10:30:00 AM",
        ],
      };
      return Promise.resolve(data);
    default:
      data = { id: null, prices: null, dates: null };
      return Promise.resolve(data);
  }
};
