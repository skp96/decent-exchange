export const convertTimeStamp = (unixTimeStamp: number): string => {
  const date = new Date(unixTimeStamp);
  const formattedTimeStamp = date.toLocaleDateString("en-US", {
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/New_York",
  });

  return formattedTimeStamp;
};
