export interface Coin{
    id: string | null,
    symbol: string | null,
    name: string | null
}

export interface CoinMarketPrices{
    id: string | null,
    prices: number[] | null,
    dates: number[] | null
};
