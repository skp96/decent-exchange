export const convertTimeStamp = (unixTimeStamp: number): string => {
  const date = new Date(unixTimeStamp);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const hour = date.getHours();
  const minutes = Math.round(date.getMinutes() / 5) * 5;

  const dateWithRoundedMinutes = new Date(year, month, day, hour, minutes);

  return dateWithRoundedMinutes.toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
};
