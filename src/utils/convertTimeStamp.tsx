export const convertTimeStamp = (unixTimeStamp: number): string => {
    const minutes = 30;
    const ms = 1000 * 60 * minutes;

    const roundedTime = new Date(Math.ceil(unixTimeStamp / ms) * ms);

    return roundedTime.toLocaleString("en-US");
};
