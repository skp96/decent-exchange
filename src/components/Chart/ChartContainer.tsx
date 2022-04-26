import { useState, useEffect } from "react";
import { Coin, CoinMarketPrices } from "../interfaces";
import { usePrevious } from "../../hooks/use-previous";
import { CoinsChart } from "./CoinsChart";
import { Chart } from "../styles";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { ChartItem } from "../styles";

export const ChartContainer: React.FC<{
  selectedCoins: Coin[];
  fetchMarketPrices: (coinId: string | null) => Promise<CoinMarketPrices>;
}> = ({ selectedCoins, fetchMarketPrices }) => {
  const prevSelectedCoins = usePrevious(selectedCoins);
  const [coinMarketPrices1Day, setcoinMarketPrices1Day] = useState<
    CoinMarketPrices[]
  >([]);

  useEffect(() => {
    const updateCoinMarketPrices = async () => {
      if (coinAdded()) {
        const coin = selectedCoins[selectedCoins.length - 1];
        const coinMarketPrices: CoinMarketPrices = await fetchMarketPrices(
          coin.id
        );
        setcoinMarketPrices1Day([...coinMarketPrices1Day, coinMarketPrices]);
      } else if (coinRemoved()) {
        const coinToRemoveIndex = findCoinToRemoveByIndex();

        if (coinToRemoveIndex || coinToRemoveIndex === 0) {
          setcoinMarketPrices1Day([
            ...coinMarketPrices1Day.slice(0, coinToRemoveIndex),
            ...coinMarketPrices1Day.slice(coinToRemoveIndex + 1),
          ]);
        }
      }
    };

    updateCoinMarketPrices().catch(console.error);
  }, [selectedCoins, coinMarketPrices1Day]);

  const findCoinToRemoveByIndex = () => {
    const selectedCoinById = selectedCoins.map(
      (selectedCoin) => selectedCoin.id
    );
    for (let i = 0; i < prevSelectedCoins.length; i++) {
      const prevSelectedCoin: Coin = prevSelectedCoins[i];
      if (
        prevSelectedCoin.id &&
        !selectedCoinById.includes(prevSelectedCoin.id)
      ) {
        return i;
      }
    }
  };

  const coinAdded = () => {
    return selectedCoins.length > prevSelectedCoins.length;
  };

  const coinRemoved = () => {
    return selectedCoins.length < prevSelectedCoins.length;
  };

  return (
    <Chart maxWidth={false}>
      {coinMarketPrices1Day.length ? (
        <Grid container spacing={3}>
          {coinMarketPrices1Day.map((prices, idx) => (
            <ChartItem
              item
              key={idx}
              sx={{ height: "50%", width: "33.3%", paddingLeft: 0 }}
            >
              <CoinsChart coinsMarketPrices={prices} colorChoice={idx} />
            </ChartItem>
          ))}
        </Grid>
      ) : (
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"450px"}
          width={"100%"}
          data-testid={"chart-instructions"}
        >
          Select a coin to get started!
        </Box>
      )}
    </Chart>
  );
};
