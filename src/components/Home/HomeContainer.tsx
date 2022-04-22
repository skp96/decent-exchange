import { SearchBar } from "../../components/Search/SearchBar";
import { useRecoilValue } from "recoil";
import { getCoins } from "../../recoil/selectors";
import { Home, ChartBox } from "../styles";
import { SelectedCoins } from "../SelectedCoins/SelectedCoins";
import { ChartContainer } from "../Chart/ChartContainer";
import { selectedCoinsState } from "../../recoil/atoms";
import { fetch1DayMarketPrices } from "../../api/fetch-market-prices";

export const HomeContainer = () => {
  const fetchedCoins = useRecoilValue(getCoins);
  const selectedCoins = useRecoilValue(selectedCoinsState);
  return (
    <Home maxWidth={false}>
      <ChartBox>
        <SearchBar coins={fetchedCoins} />
        <SelectedCoins />
        <ChartContainer
          selectedCoins={selectedCoins}
          fetchMarketPrices={fetch1DayMarketPrices}
        />
      </ChartBox>
    </Home>
  );
};
