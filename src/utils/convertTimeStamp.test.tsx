import { convertTimeStamp } from "./convertTimeStamp";

test("convert unix timestamp to human-readable date", () => {
  const unixTimeStamp = 1650550065000;

  const result = convertTimeStamp(unixTimeStamp);

  const expectation = "4/21/2022, 10:05:00 AM";

  expect(result).toEqual(expectation);
});

export {};
