import { Box, Button, Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { teal, brown, deepPurple, indigo, red, yellow, blue, green, pink, lightBlue } from '@mui/material/colors';

declare module '@mui/material/styles' {
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
}

export const theme = createTheme({
    coinColors: {
        coin1: red[300],
        coin2: indigo[400],
        coin3: deepPurple[300],
        coin4: teal[300],
        coin5: brown[400],
        coin6: yellow[500],
        coin7: green[300],
        coin8: blue[300],
        coin9: pink[300],
        coin10: lightBlue[300]
    }
})

export const Home = styled(Container)(({ theme }) => {
    return {
        display: 'flex',
        [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            marginLeft: 'auto',
            marginRight: 'auto'
        },
    };
});

export const ChartBox = styled(Box)(({ theme }) => {
    return {
        marginTop: 25,
        justifyContent: 'center',
        width: '50%',
        [theme.breakpoints.down('md')]: {
            width: '100%',
        },
    };
});

type ButtonProp = {
    colornumber: number;
};

export const CustomButton = styled(Button)<ButtonProp>(({ theme, colornumber }) => {
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
        };
    };
    const buttonColor = selectTheme(colornumber)

    return {
        backgroundColor: buttonColor,
        color: 'black',
        '&:hover': {
            backgroundColor: 'lightgrey',
            color: buttonColor,
        }
    };
});


