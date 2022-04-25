import { CoinMarketPrices } from "../interfaces";
import { Line } from "react-chartjs-2";
import { colors } from "../styles";
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
import { Box } from "@mui/system";

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
  coinsMarketPrices: CoinMarketPrices[];
}> = ({ coinsMarketPrices }) => {
  const getLabels = () => {
    if (coinsMarketPrices) {
      const coin = coinsMarketPrices[0];
      if (coin && coin.dates) {
        return coin.dates;
      }
    }
    return undefined;
  };

  const getDataset = () => {
    return coinsMarketPrices.map((coin, idx) => ({
      label: coin.id as string,
      data: coin.prices as number[],
      backgroundColor: colors[idx] as string,
    }));
  };

  const options: ChartOptions<"line"> = {
    scales: {
      x: {
        ticks: {
          display: false,
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
              return `$${tickValue.toFixed(3)}`;
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
              console.log(data);
              label += `$${data.toFixed(3)}`;
            }
            return label;
          },
        },
      },
    },
    maintainAspectRatio: false,
  };

  const labels: string[] | undefined = getLabels();
  const data = {
    labels,
    datasets: getDataset(),
  };

  return (
    <>
      {coinsMarketPrices.length ? (
        <Line options={options} data={data} />
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
    </>
  );
};
