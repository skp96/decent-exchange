import { labelFormatter } from "./label-formatter";

describe("labelFormatter", () => {
  test("returns minutes given a timeperiod of 1", () => {
    const label = "4/22/2022, 13:45";

    const result = labelFormatter(label, "1");

    expect(result).toEqual("13:45");
  });

  test("returns day given a timeperiod of 7", () => {
    const label = "4/25/2022, 14:45";

    const result = labelFormatter(label, "7");

    expect(result).toEqual("Monday");
  });

  test("returns the date given a timePeriod of 30", () => {
    const label = "3/2/2022, 00:45";

    const result = labelFormatter(label, "30");

    expect(result).toEqual("3/2/2022");
  });

  test("returns the date given a timePeriod of 90", () => {
    const label = "2/15/2020, 19:12";

    const result = labelFormatter(label, "90");

    expect(result).toEqual("2/15/2020");
  });

  test("returns the date given a timePeriod of 365", () => {
    const label = "9/23/2015, 11:05";

    const result = labelFormatter(label, "365");

    expect(result).toEqual("9/23/2015");
  });

  test("returns the date given a timePeriod of 1825", () => {
    const label = "5/2/1804, 02:11";

    const result = labelFormatter(label, "1825");

    expect(result).toEqual("5/2/1804");
  });

  test("returns the minutes given any other timperiod", () => {
    const label = "12/13/2022, 07:16";

    const result = labelFormatter(label, "32");

    expect(result).toEqual("07:16");
  });
});

export {};
