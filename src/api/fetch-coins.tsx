import axios from 'axios';
import { getCoinsUrl } from './base-urls';

export const fetchCoins = async () => {
    const response = await axios.get(getCoinsUrl);
    const coins = response.data;
    return coins;
};
