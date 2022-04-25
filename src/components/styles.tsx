import { Box, Button, Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Theme {
    coinColors: {
      coin1: string;
      coin2: string;
      coin3: string;
      coin4: string;
      coin5: string;
      coin6: string;
      coin7: string;
      coin8: string;
      coin9: string;
      coin10: string;
    };
  }
  interface ThemeOptions {
    coinColors?: {
      coin1?: string;
      coin2?: string;
      coin3?: string;
      coin4?: string;
      coin5?: string;
      coin6?: string;
      coin7?: string;
      coin8?: string;
      coin9?: string;
      coin10?: string;
    };
  }
<<<<<<< HEAD
}

type Colors = { [key: number]: string };
=======

  interface PaletteColor {
    light: string;
    main: string;
    dark: string;
    contrastText: string;
  }
}

type Colors = { [key: number | string]: string };
>>>>>>> 3d15664 (moved instructions on how to get started out of CoinChart and into ChartContainer component and fixed tests, styling for ToggleChart)

export const colors: Colors = {
  0: "#e57373",
  1: "#5c6bc0",
  2: "#9575cd",
  3: "#4db6ac",
  4: "#8d6e63",
  5: "#ffeb3b",
  6: "#81c784",
  7: "#64b5f6",
  8: "#f06292",
  9: "#4fc3f7",
};

export const theme = createTheme({
  coinColors: {
    coin1: colors[0],
    coin2: colors[1],
    coin3: colors[2],
    coin4: colors[3],
    coin5: colors[4],
    coin6: colors[5],
    coin7: colors[6],
    coin8: colors[7],
    coin9: colors[8],
    coin10: colors[9],
  },
  palette: {
    primary: {
      main: "#21CE99",
    },
  },
});

export const Home = styled(Container)(({ theme }) => {
  return {
    display: "flex",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      marginLeft: "auto",
      marginRight: "auto",
    },
  };
});

export const Chart = styled(Container)(({ theme }) => {
  return {
    display: "flex",
    height: "100vh",
    marginTop: "20px",
    marginLeft: 0,
    marginRight: 0,
  };
});

export const ChartBox = styled(Box)(({ theme }) => {
  return {
    marginTop: 25,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  };
});

export const ChartItem = styled(Grid)(({ theme }) => {
  return {
    height: "50%",
    width: "33.3%",
    justifyContent: "center",
    paddingLeft: 0,
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  };
});

export const ButtonGrid = styled(Grid)(({ theme }) => {
  return {
    marginTop: 20,
    justifyContent: "space-between",
  };
});

export const ToggleButton = styled(Button)(({ theme }) => {
  return {
    minWidth: "50px",
  };
});

type ButtonProp = {
  colornumber: number;
};

export const CustomButton = styled(Button)<ButtonProp>(
  ({ theme, colornumber }) => {
    const selectTheme = (colornumber: number) => {
      switch (colornumber) {
        case 0:
          return theme.coinColors.coin1;
        case 1:
          return theme.coinColors.coin2;
        case 2:
          return theme.coinColors.coin3;
        case 3:
          return theme.coinColors.coin4;
        case 4:
          return theme.coinColors.coin5;
        case 5:
          return theme.coinColors.coin6;
        case 6:
          return theme.coinColors.coin7;
        case 7:
          return theme.coinColors.coin8;
        case 8:
          return theme.coinColors.coin9;
        case 9:
          return theme.coinColors.coin10;
      }
    };
    const buttonColor = selectTheme(colornumber);

    return {
      backgroundColor: buttonColor,
      color: "black",
      "&:hover": {
        backgroundColor: "lightgrey",
        color: buttonColor,
      },
    };
  }
);
