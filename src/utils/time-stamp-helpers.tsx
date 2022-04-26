export const convertTimeStamp = (unixTimeStamp: number): string => {
  const date = new Date(unixTimeStamp);
  const formattedDate = date.toLocaleDateString("en-US");
  const hours = date.getHours();
  const minutes = date.getMinutes();

  let formattedMinutes: string | number;

  if (minutes < 10) {
    formattedMinutes = `0${minutes}`;
  } else {
    formattedMinutes = minutes;
  }

  const formattedTime = `${hours}:${formattedMinutes}`;

  return `${formattedDate}, ${formattedTime}`;
};
