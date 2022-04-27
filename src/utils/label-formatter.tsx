import { LIVE, WEEK1, MONTH1, MONTH3, YTD, YEAR5 } from "../api/time-periods";

export const labelFormatter = (label: string, timePeriod: string) => {
  let getLabel;
  switch (timePeriod) {
    case LIVE:
      getLabel = () => getMinute(label);
      break;
    case WEEK1:
      getLabel = () => getDay(label);
      break;
    case MONTH1:
      getLabel = () => getDate(label);
      break;
    case MONTH3:
      getLabel = () => getDate(label);
      break;
    case YTD:
      getLabel = () => getDate(label);
      break;
    case YEAR5:
      getLabel = () => getDate(label);
      break;
    default:
      getLabel = () => getMinute(label);
      break;
  }

  return getLabel();
};

const getMinute = (label: string): string => {
  const [date, time] = label.split(", ");
  return time;
};

const getDay = (label: string): string => {
  type Days = { [key: number]: string };

  const days: Days = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wendesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };
  const [date, time] = label.split(", ");
  const day = new Date(date).getDay();

  return days[day];
};

const getDate = (label: string): string => {
  const [date, time] = label.split(", ");
  return date;
};
