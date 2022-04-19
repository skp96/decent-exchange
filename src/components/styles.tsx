import { Box, Container } from '@mui/material';
import { styled } from '@mui/material/styles';

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
