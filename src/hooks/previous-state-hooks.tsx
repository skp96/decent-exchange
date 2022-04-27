import { useRef, useEffect } from "react";
import { Coin, SelectedCoin } from "../components/interfaces";

export const usePreviousSelectedCoins = (value: Coin[]) => {
  const ref = useRef<Coin[]>([]);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export const usePreviousSelectedCoin = (value: SelectedCoin) => {
  const ref = useRef<SelectedCoin>({
    symbol: null,
    timePeriod: null,
    id: null,
  });
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
