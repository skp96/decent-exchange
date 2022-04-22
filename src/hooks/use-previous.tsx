import { useRef, useEffect } from "react";
import { Coin } from "../components/interfaces";

export const usePrevious = (value: Coin[]) => {
  const ref = useRef<Coin[]>([]);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};
