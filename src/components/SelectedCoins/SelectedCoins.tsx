import { Grid } from "@mui/material";
import { useRecoilState } from "recoil";
import { selectedCoinsState } from "../../recoil/atoms";
import { coinListState } from "../../recoil/atoms";
import { CustomButton } from "../styles";
import { Box } from "@mui/system";

export const SelectedCoins = () => {
  const [coinsList, setCoinsListState] = useRecoilState(coinListState);
  const [selectedCoins, setSelectedCoins] = useRecoilState(selectedCoinsState);

  const removeSelectedCoin = (idx: number) => {
    const selectedCoin = selectedCoins[idx];

    setSelectedCoins((selectedCoins) => [
      ...selectedCoins.slice(0, idx),
      ...selectedCoins.slice(idx + 1),
    ]);

    setCoinsListState((coinList) => [...coinList, selectedCoin]);
  };

  return (
    <Box>
      <h2 className="selected-coins-title">Currently Selected Crypto Coins</h2>
      {selectedCoins.length ? (
        <p className="selected-coin-instructions">
          Select a coin to remove it.
        </p>
      ) : (
        ""
      )}
      <Grid
        data-testid="coin-grid"
        container
        spacing={1}
        sx={{ justifyContent: "center" }}
      >
        {selectedCoins.map((coin, idx) => (
          <Grid item key={idx}>
            <CustomButton
              size={"small"}
              colornumber={coin.colorChoice as number}
              onClick={() => removeSelectedCoin(idx)}
            >
              {coin.name}
            </CustomButton>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
