import { SearchBar } from "../../components/Search/SearchBar";
import { useRecoilValue } from 'recoil';
import { getCoins } from '../../recoil/selectors';


export const HomeContainer = () => {
    const fetchedCoins = useRecoilValue(getCoins);

    return (
        <>
            <SearchBar coins={fetchedCoins} />
        </>
    );
};
