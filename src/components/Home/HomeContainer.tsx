import { SearchBar } from "../../components/Search/SearchBar";
import { useRecoilValue } from 'recoil';
import { getCoins } from '../../recoil/selectors';
import { Home, ChartBox } from "../styles";
import { SelectedCoins } from "../SelectedCoins/SelectedCoins";

export const HomeContainer = () => {
    const fetchedCoins = useRecoilValue(getCoins);

    return (
        <Home maxWidth={false}>
            <ChartBox>
                <SearchBar coins={fetchedCoins} />
                <SelectedCoins />
            </ChartBox>
        </Home>
    );
};
