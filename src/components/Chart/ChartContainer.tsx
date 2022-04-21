import { useState, useEffect } from 'react';
import { Coin, CoinMarketPrices } from '../interfaces';
import { usePrevious } from '../../hooks/use-previous';
import { fetch1DayMarketPrices } from '../../api/fetch-market-prices';
import { CoinsChart } from './CoinsChart';
import { Container } from '@mui/material';

export const ChartContainer: React.FC<{ selectedCoins: Coin[]; }> = ({ selectedCoins }) => {
    const prevSelectedCoins = usePrevious(selectedCoins);
    const [coinMarketPrices1Day, setcoinMarketPrices1Day] = useState<CoinMarketPrices[]>([])
    
    useEffect(() => {
        const updateCoinMarketPrices = async () => {
            if (coinAdded()) {
                const coin = selectedCoins[selectedCoins.length - 1];
                const coinMarketPrices = await fetch1DayMarketPrices(coin.id);
                setcoinMarketPrices1Day([
                    ...coinMarketPrices1Day,
                    coinMarketPrices
                ]);
            } else if (coinRemoved()) {
                const coinToRemoveIndex = findCoinToRemoveByIndex();

                if (coinToRemoveIndex || coinToRemoveIndex === 0) {
                    setcoinMarketPrices1Day([
                        ...coinMarketPrices1Day.slice(0, coinToRemoveIndex),
                        ...coinMarketPrices1Day.slice(coinToRemoveIndex + 1)
                    ]);
                };
            };
        };

        updateCoinMarketPrices()
            .catch(console.error);
    }, [selectedCoins, coinMarketPrices1Day]);

    const findCoinToRemoveByIndex = () => {
        const selectedCoinById = selectedCoins.map((selectedCoin) => selectedCoin.id);
        if (prevSelectedCoins) {
            for (let i = 0; i < prevSelectedCoins.length; i++) {
                const prevSelectedCoin: Coin = prevSelectedCoins[i];
                if (prevSelectedCoin.id && !selectedCoinById.includes(prevSelectedCoin.id)) {
                    return i;
                };
            };
        };
    }; 

    const coinAdded = () => {
        return prevSelectedCoins && selectedCoins.length > prevSelectedCoins.length;
    };

    const coinRemoved = () => {
        return prevSelectedCoins && selectedCoins.length < prevSelectedCoins.length
    }
    
    return (
        <Container>
            {coinMarketPrices1Day ? <CoinsChart coinsMarketPrices={coinMarketPrices1Day} /> : ""}
        </Container>
    );
}
