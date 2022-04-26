export interface Coin {
  id: string | null;
  symbol: string | null;
  name: string | null;
}

export interface CoinChartData {
  id: string | null;
  prices: number[] | null;
  dates: string[] | null;
}
