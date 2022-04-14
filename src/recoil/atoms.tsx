import { atom } from "recoil";
import { Coin } from "../components/interfaces";

export const coinListState = atom<Coin[]>({
    key: "CoinList",
    default: []
});
