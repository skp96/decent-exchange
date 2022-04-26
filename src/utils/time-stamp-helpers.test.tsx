import { convertTimeStamp } from "./time-stamp-helpers";

test("convert unix timestamp to human-readable date", () => {
  const unixTimeStamp = 1650550065000;

  const result = convertTimeStamp(unixTimeStamp);

  const expectation = "4/21/2022, 10:07";

  expect(result).toEqual(expectation);
});

export {};
