import { atom } from "recoil";
import { Coin, SelectedCoin, CoinChartData } from "../components/interfaces";

export const coinListState = atom<Coin[]>({
  key: "CoinList",
  default: [],
});

export const selectedCoinsState = atom<Coin[]>({
  key: "SelectedCoins",
  default: [],
});

export const selectedCoinState = atom<SelectedCoin>({
  key: "SelectedCoin",
  default: { symbol: null, timePeriod: null, id: null },
});
