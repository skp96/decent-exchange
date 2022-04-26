import axios from "axios";
import { getChartDataUrl } from "./base-urls";
import { CoinMarketPrices } from "../components/interfaces";
import { convertTimeStamp } from "../utils/time-stamp-helpers";

export const fetchChartData = async (
  coinId: string | null,
  timePeriod: string
) => {
  const apiUrl = getChartDataUrl(coinId, timePeriod);
  const response = await axios.get(apiUrl);
  const marketData = response.data;
  const extractedMarketData = extractData(coinId, marketData);
  return extractedMarketData;
};

const extractData = (coinId: string | null, marketData: any) => {
  const coinMarketData: CoinMarketPrices = {
    id: null,
    prices: null,
    dates: null,
  };

  const prices = [];
  const dates = [];

  const fetchedPrices = marketData.prices;

  for (let i = 0; i < fetchedPrices.length; i++) {
    const date = fetchedPrices[i][0];
    const price = fetchedPrices[i][1];

    prices.push(price);

    const convertedTimeStamp = convertTimeStamp(date);
    dates.push(convertedTimeStamp);
  }

  coinMarketData.id = coinId;
  coinMarketData.prices = prices;
  coinMarketData.dates = dates;

  return coinMarketData;
};
