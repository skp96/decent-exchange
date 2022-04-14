import { useEffect } from 'react';
import { coinListState } from "../../recoil/atoms";
import { SearchBar } from "../../components/Search/SearchBar";
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { getCoins } from '../../recoil/selectors';


export const HomeContainer = () => {
    const coins = useRecoilValue(getCoins);
    const setCoinListState = useSetRecoilState(coinListState);

    useEffect(() => {
        if (coins) {
            setCoinListState(coins);
        };
    }, [coins]);
    
    return (
        <>
            <SearchBar coins={ coins }/>
        </>
    );
};
