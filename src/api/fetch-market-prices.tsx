import axios from 'axios';
import { get1DayChartDataUrl } from './base-urls';
import { CoinMarketPrices } from '../components/interfaces';

export const fetch1DayMarketPrices = async (coinId: string | null) => {
    const apiUrl = get1DayChartDataUrl(coinId);
    const response = await axios.get(apiUrl);
    const marketData = response.data;
    const extractedMarketData = extractData(coinId, marketData)
    return extractedMarketData;
};

const extractData = (coinId: string | null, marketData: any) => {
    const coinMarketData: CoinMarketPrices = {
        id: null,
        prices: null,
        dates: null
    };

    const prices = [];
    const dates = [];

    const fetchedPrices = marketData.prices;

    for (let i = 0; i < fetchedPrices.length; i++) {
        const date = fetchedPrices[i][0];
        const price = fetchedPrices[i][1];

        prices.push(price);
        dates.push(date);
    };

    coinMarketData.id = coinId;
    coinMarketData.prices = prices;
    coinMarketData.dates = dates;

    return coinMarketData;
}
