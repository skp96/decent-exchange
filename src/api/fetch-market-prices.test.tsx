import { fetch1DayMarketPrices } from "./fetch-market-prices";
import axios from "axios";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
describe("Fetch Market Data API", () => {
  test("able to extract data from fetched data", async () => {
    const fakeData = {
      data: {
        prices: [
          [1650546050436, 10],
          [1650549843863, 12],
          [1650550065000, 23],
        ],
      },
    };

    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(fakeData));

    const result = await fetch1DayMarketPrices("testCoin");

    const expectedValue = {
      id: "testCoin",
      prices: [10, 12, 23],
      dates: [
        "4/21/2022, 9:00:00 AM",
        "4/21/2022, 10:05:00 AM",
        "4/21/2022, 10:05:00 AM",
      ],
    };

    expect(result.id).toEqual(expectedValue.id);
    expect(result.prices).toEqual(expectedValue.prices);
    expect(result.dates).toEqual(expectedValue.dates);
  });
});

export {};
