import { fetch1DayMarketPrices } from './fetch-market-prices';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Fetch Market Data API", () => {
    test("able to extract data from fetched data", async () => {

        const fakeData = {
            data: {
                prices: [
                    ["1/11/2000", 10],
                    ["1/12/2000", 12],
                    ["1/23/2000", 23]
                ]
            }
        };

        mockedAxios.get.mockImplementationOnce(() => Promise.resolve(fakeData));

        const result = await fetch1DayMarketPrices('testCoin');

        const expectedValue = {
            id: "testCoin",
            prices: [10, 12, 23],
            dates: ["1/11/2000", "1/12/2000", "1/23/2000"]
        };

        expect(result.id).toEqual(expectedValue.id);
        expect(result.prices).toEqual(expectedValue.prices);
        expect(result.dates).toEqual(expectedValue.dates);
    });
});

export {}
