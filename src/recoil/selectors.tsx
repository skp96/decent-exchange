import { selector } from 'recoil';
import { fetchCoins } from "../api/fetch-coins";

export const getCoins = selector({
    key: "FetchCoinsAPI",
    get: async () => {
        const response = await fetchCoins();
        const coins = [];

        for (let i = 0; i < response.length; i++) {
            const coin = response[i];

            coins.push({
                id: coin.id,
                name: coin.name,
                symbol: coin.symbol
            });
        };
        return coins;
    },
});
