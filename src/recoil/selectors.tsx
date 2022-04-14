import { selector } from 'recoil';
import { fetchCoins } from "../api/fetch-coins";

export const getCoins = selector({
    key: "FetchCoinsAPI",
    get: async () => {
        const response = await fetchCoins();
        return response;
    }
});
