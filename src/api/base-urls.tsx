export const getCoinsUrl =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false";

export const getChartDataUrl = (
  id: string | null,
  timePeriod: string | null
) => {
  return `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${timePeriod}`;
};
