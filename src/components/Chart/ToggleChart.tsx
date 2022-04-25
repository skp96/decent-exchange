import { ButtonGrid, ToggleButton } from "../styles";
import { Button, Grid } from "@mui/material";

export const ToggleChart = () => {
  return (
    <ButtonGrid container>
      <Grid item>
        <ToggleButton variant={"contained"} size={"small"}>
          Live
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton variant={"text"} size={"small"}>
          1W
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton variant={"text"} size={"small"}>
          1M
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton variant={"text"} size={"small"}>
          3M
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton variant={"text"} size={"small"}>
          YTD
        </ToggleButton>
      </Grid>
      <Grid item>
        <ToggleButton variant={"text"} size={"small"}>
          5Y
        </ToggleButton>
      </Grid>
    </ButtonGrid>
  );
};
