import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { Coin } from '../interfaces';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectedCoinsState } from '../../recoil/atoms';
import { coinListState } from "../../recoil/atoms";

export const SearchBar: React.FC<{ coins: Coin[]; }> = ({ coins }) => {
    const [coinsList, setCoinsListState] = useRecoilState(coinListState);
    const [selectedCoins, setSelectedCoins] = useRecoilState(selectedCoinsState)
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (coins) {
            setCoinsListState(coins);
        };
    }, [coins]);

    const updateSelectedCoins = (event: React.BaseSyntheticEvent, value: Coin | string | null) => {
        const maxCoins = 10;
        
        if (selectedCoins.length + 1 > maxCoins && value as Coin) {
            setIsError(true);
        } else if (value as Coin) {
            setSelectedCoins((selectedCoins) => [
                ...selectedCoins,
                value as Coin
            ]);
            removeCoinFromList(value as Coin)
        };
    };

    const removeCoinFromList = (coin: Coin) => {
        const coinIndex = coinsList.findIndex((coinsListItem) => coinsListItem.name === coin.name);

        setCoinsListState((coinList) => [
            ...coinList.slice(0, coinIndex),
            ...coinList.slice(coinIndex + 1)
        ]);
    };

    return (
        <Stack spacing={2} sx={{ width: 300 }} >
            <Autocomplete
                freeSolo={true}
                id="coin-search"
                data-testid="autocomplete-search"
                options={coinsList}
                getOptionLabel={(option) => option.name as string}
                onChange={updateSelectedCoins}
                disabled={isError}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        error={isError}
                        helperText={isError ? "You can only select 10 coins. Please remove a coin to select another." : ""}
                        label={isError ? "Error" : ""}
                        placeholder="Search"
                        InputProps={{
                            ...params.InputProps,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                        variant="outlined"
                    />
                )}
            />
        </Stack>
    );
};
