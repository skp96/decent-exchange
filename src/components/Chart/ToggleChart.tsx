import { ButtonGrid, ToggleButton } from "../styles";
import { Grid } from "@mui/material";
import {
  LIVE,
  WEEK1,
  MONTH1,
  MONTH3,
  YTD,
  YEAR5,
} from "../../api/time-periods";
import React, { useEffect, useState } from "react";
import { SelectedCoin } from "../interfaces";
import { selectedCoinState } from "../../recoil/atoms";
import { useSetRecoilState } from "recoil";

export const ToggleChart: React.FC<{
  id: number;
  symbol: string;
  timePeriod: string;
}> = ({ id, symbol, timePeriod }) => {
  const [buttonVariant, setButtonVariant] = useState(LIVE);
  const setSelectedCoin = useSetRecoilState(selectedCoinState);

  useEffect(() => {
    setButtonVariant(timePeriod);
  }, [timePeriod]);

  const handleClick = (selectedTimePeriod: string) => {
    setButtonVariant(selectedTimePeriod);

    const selectedCoin: SelectedCoin = {
      symbol: symbol,
      timePeriod: selectedTimePeriod,
      id: id,
    };
    setSelectedCoin(selectedCoin);
  };
  return (
    <ButtonGrid container>
      <Grid item>
        <ToggleButton
          variant={buttonVariant === LIVE ? "contained" : "text"}
          size={"small"}
          onClick={() => handleClick(LIVE)}
        >
          Live
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton
          variant={buttonVariant === WEEK1 ? "contained" : "text"}
          size={"small"}
          onClick={() => handleClick(WEEK1)}
        >
          1W
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton
          variant={buttonVariant === MONTH1 ? "contained" : "text"}
          size={"small"}
          onClick={() => handleClick(MONTH1)}
        >
          1M
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton
          variant={buttonVariant === MONTH3 ? "contained" : "text"}
          size={"small"}
          onClick={() => handleClick(MONTH3)}
        >
          3M
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton
          variant={buttonVariant === YTD ? "contained" : "text"}
          size={"small"}
          onClick={() => handleClick(YTD)}
        >
          YTD
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton
          variant={buttonVariant === YEAR5 ? "contained" : "text"}
          size={"small"}
          onClick={() => handleClick(YEAR5)}
        >
          5Y
        </ToggleButton>
      </Grid>
    </ButtonGrid>
  );
};
