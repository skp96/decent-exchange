import { CoinChartData } from "../components/interfaces";
import { LIVE, WEEK1 } from "../api/time-periods";

export const fetchChartDataMock = (
  coinId: string | null,
  timePeriod: string | null
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
        timePeriod: "1",
      };
      return Promise.resolve(data);
    case WEEK1:
      data = {
        id: coinId,
        prices: [1, 2, 3, 4, 5, 6, 7],
        dates: [
          "4/21/2022, 13:15",
          "4/22/2022 13:21",
          "4/23/2022 13:30",
          "4/23/2022 13:31",
          "4/25/2022 13:45",
          "4/26/2022 13:47",
          "4/27/2022 13:52",
        ],
        timePeriod: "7",
      };
    default:
      data = { id: null, prices: null, dates: null, timePeriod: null };
      return Promise.resolve(data);
  }
};
