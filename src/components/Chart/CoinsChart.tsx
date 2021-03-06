import { CoinChartData } from "../interfaces";
import { Line } from "react-chartjs-2";
import { colors } from "../styles";
import { labelFormatter } from "../../utils/label-formatter";
import { WEEK1 } from "../../api/time-periods";
import { useRecoilValue } from "recoil";
import { selectedCoinsState } from "../../recoil/atoms";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
  Tick,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const CoinsChart: React.FC<{
  coinChartData: CoinChartData;
}> = ({ coinChartData }) => {
  const selectedCoins = useRecoilValue(selectedCoinsState);

  const findColor = () => {
    const coin = coinChartData.id;
    for (let i = 0; i < selectedCoins.length; i++) {
      const selectedCoin = selectedCoins[i];

      if (coin === selectedCoin.id && selectedCoin.colorChoice !== null) {
        return colors[selectedCoin.colorChoice];
      }
    }
    return "";
  };

  const getDataset = () => {
    return {
      label: coinChartData.id as string,
      data: coinChartData.prices as number[],
      backgroundColor: findColor(),
    };
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        ticks: {
          callback: function (
            tickValue: number | string,
            index: number,
            ticks: Tick[]
          ) {
            if (typeof tickValue === "number") {
              const label = this.getLabelForValue(tickValue);
              const timePeriod = coinChartData.timePeriod as string;
              return labelFormatter(label, timePeriod);
            }
          },
          maxTicksLimit:
            coinChartData.timePeriod && coinChartData.timePeriod === WEEK1
              ? 7
              : 10,
        },
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: false,
        },
        ticks: {
          callback: function (
            tickValue: number | string,
            index: number,
            ticks: Tick[]
          ) {
            if (typeof tickValue === "number") {
              return `$${tickValue.toLocaleString("en-US")}`;
            }
          },
        },
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
      },
    },
    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context: any) {
            let label = context.dataset.label || "";

            if (label) {
              label += ": ";
            }
            const data = context.parsed.y;
            if (data !== null) {
              label += `$${data.toLocaleString("en-US")}`;
            }
            return label;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const labels = coinChartData.dates as string[];
  const data = {
    labels,
    datasets: [getDataset()],
  };
  return (
    <>
      <Line options={options} data={data} />
    </>
  );
};
