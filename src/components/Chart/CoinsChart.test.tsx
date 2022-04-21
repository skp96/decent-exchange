import { render, waitFor } from '@testing-library/react';
import { CoinsChart } from "./CoinsChart";

jest.mock("react-chartjs-2", () => ({
    Line: () => <canvas role="img"></canvas>
}));

describe("CoinsChart", () => {
    test("displays a chart", () => {
        const coinMarketPrices = [
            {
                id: 'testCoin1',
                prices: [1, 2, 3, 4, 5],
                dates: ["1/1/2022, 2:00:00 AM",]
            },
            {
                id: 'testCoin2',
                prices: [1, 2, 3, 4, 5],
                dates: ["1/2/2022, 2:00:00 AM",]
            }
        ];
        const { getByRole } = render(
          <CoinsChart coinsMarketPrices={coinMarketPrices} />  
        )

        expect(getByRole("img")).toBeInTheDocument()
    });

    test("displays a message when no prices", async () => {
        const { getByText } = render(
          <CoinsChart coinsMarketPrices={[]} />  
        )

        expect(getByText("Selected a coin to get started!")).toBeInTheDocument()
    });
})
