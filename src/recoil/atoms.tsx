import { atom } from "recoil";
import { Coin } from "../components/interfaces";

export const coinListState = atom<Coin[]>({
    key: "CoinList",
    default: []
});

export const selectedCoinsState = atom<Coin[]>({
    key: "SelectedCoins",
    default: []
});
