import { useState, useEffect } from "react";
import { Coin, CoinChartData } from "../interfaces";
import {
  usePreviousSelectedCoins,
  usePreviousSelectedCoin,
} from "../../hooks/previous-state-hooks";
import { CoinsChart } from "./CoinsChart";
import { Chart } from "../styles";
import { Box } from "@mui/system";
import { Grid } from "@mui/material";
import { ChartItem } from "../styles";
import { ToggleChart } from "./ToggleChart";
import { LIVE } from "../../api/time-periods";
import { selectedCoinState } from "../../recoil/atoms";
import { useRecoilValue } from "recoil";

export const ChartContainer: React.FC<{
  selectedCoins: Coin[];
  fetchChartData: (
    coinId: string | null,
    timePeriod: string | null
  ) => Promise<CoinChartData>;
}> = ({ selectedCoins, fetchChartData }) => {
  const prevSelectedCoins = usePreviousSelectedCoins(selectedCoins);
  const [coinsChartData, setCoinsChartData] = useState<CoinChartData[]>([]);

  useEffect(() => {
    const updateCoinsChartData = async () => {
      if (coinAdded()) {
        const coin = selectedCoins[selectedCoins.length - 1];
        const coinChartData: CoinChartData = await fetchChartData(
          coin.id,
          LIVE
        );
        setCoinsChartData([...coinsChartData, coinChartData]);
      } else if (coinRemoved()) {
        const coinToRemoveIndex = findCoinToRemoveByIndex();

        if (coinToRemoveIndex || coinToRemoveIndex === 0) {
          setCoinsChartData([
            ...coinsChartData.slice(0, coinToRemoveIndex),
            ...coinsChartData.slice(coinToRemoveIndex + 1),
          ]);
        }
      }
    };

    updateCoinsChartData().catch(console.error);
  }, [selectedCoins]);

  const selectedCoin = useRecoilValue(selectedCoinState);
  const prevSelectedCoin = usePreviousSelectedCoin(selectedCoin);

  useEffect(() => {
    const updateChartData = async () => {
      if (
        prevSelectedCoin.symbol !== selectedCoin.symbol ||
        prevSelectedCoin.timePeriod !== selectedCoin.timePeriod
      ) {
        const coinChartData: CoinChartData = await fetchChartData(
          selectedCoin.symbol,
          selectedCoin.timePeriod
        );

        if (typeof selectedCoin.id === "number" && selectedCoin.id >= 0) {
          setCoinsChartData([
            ...coinsChartData.slice(0, selectedCoin.id),
            coinChartData,
            ...coinsChartData.slice(selectedCoin.id + 1),
          ]);
        }
      }
    };

    updateChartData().catch(console.error);
  }, [selectedCoin]);

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
      {coinsChartData.length ? (
        <Grid container spacing={10} sx={{ marginTop: 0 }}>
          {coinsChartData.map((coinChartData, idx) => (
            <ChartItem
              item
              key={`${coinChartData.id}-${idx}`}
              sx={{ height: "50%", width: "33.3%", paddingLeft: 0 }}
            >
              <CoinsChart coinChartData={coinChartData} colorChoice={idx} />
              <ToggleChart
                id={idx}
                symbol={coinChartData.id ? coinChartData.id : ""}
                timePeriod={
                  coinChartData.timePeriod ? coinChartData.timePeriod : ""
                }
              />
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
