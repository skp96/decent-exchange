import TextField from "@mui/material/TextField";

import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { Coin } from "../interfaces";
import React, { useState } from "react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedCoinsState } from "../../recoil/atoms";
import { coinListState, colorChoiceState } from "../../recoil/atoms";

export const SearchBar: React.FC<{ coins: Coin[] }> = ({ coins }) => {
  const [coinsList, setCoinsListState] = useRecoilState(coinListState);
  const [selectedCoins, setSelectedCoins] = useRecoilState(selectedCoinsState);
  const [isError, setIsError] = useState(false);
  const [colorChoices, setColorChoices] = useRecoilState(colorChoiceState);

  useEffect(() => {
    if (coins) {
      setCoinsListState(coins);
    }
  }, [coins]);

  useEffect(() => {
    if (isError) {
      setIsError(false);
    }
  }, [coinsList]);

  const updateSelectedCoins = (
    event: React.BaseSyntheticEvent,
    value: Coin | null
  ) => {
    const maxCoins = 9;
    if (selectedCoins.length + 1 > maxCoins && (value as Coin)) {
      setIsError(true);
    } else if ((value as Coin) && value !== null) {
      let coin: Coin = {
        id: null,
        symbol: null,
        name: null,
        colorChoice: null,
      };
      coin = { ...value, colorChoice: colorChoices[0] };
      setColorChoices([...colorChoices.slice(1, colorChoices.length)]);
      setSelectedCoins((selectedCoins) => [...selectedCoins, coin as Coin]);
      removeCoinFromList(coin as Coin);
    }
  };

  const removeCoinFromList = (coin: Coin) => {
    const coinIndex = coinsList.findIndex(
      (coinsListItem) => coinsListItem.name === coin.name
    );

    setCoinsListState((coinList) => [
      ...coinList.slice(0, coinIndex),
      ...coinList.slice(coinIndex + 1),
    ]);
  };

  return (
    <Autocomplete
      id="coin-search"
      data-testid="autocomplete-search"
      options={coinsList}
      getOptionLabel={(option) => (option.name ? option.name : "")}
      value={null}
      onChange={updateSelectedCoins}
      disabled={isError}
      renderInput={(params) => (
        <TextField
          {...params}
          error={isError}
          helperText={
            isError
              ? "You can only select 9 coins. Please remove a coin to select another."
              : "Please select a coin from the drop down menu"
          }
          label={isError ? "Max Selected Coins Reached" : ""}
          placeholder="Search"
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      )}
    />
  );
};
