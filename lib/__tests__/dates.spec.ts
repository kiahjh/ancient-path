import { describe, expect, it } from "vitest";
import { toRfc822Date } from "../dates";

describe(`toRfc822Date`, () => {
  it(`converts YYYY-MM-DD to RFC 822 format`, () => {
    expect(toRfc822Date(`2021-09-06`)).toBe(`Mon, 06 Sep 2021 12:00:00 GMT`);
    expect(toRfc822Date(`2024-01-01`)).toBe(`Mon, 01 Jan 2024 12:00:00 GMT`);
    expect(toRfc822Date(`2023-12-25`)).toBe(`Mon, 25 Dec 2023 12:00:00 GMT`);
  });

  it(`handles different days of the week`, () => {
    expect(toRfc822Date(`2024-01-07`)).toBe(`Sun, 07 Jan 2024 12:00:00 GMT`);
    expect(toRfc822Date(`2024-01-08`)).toBe(`Mon, 08 Jan 2024 12:00:00 GMT`);
    expect(toRfc822Date(`2024-01-09`)).toBe(`Tue, 09 Jan 2024 12:00:00 GMT`);
    expect(toRfc822Date(`2024-01-10`)).toBe(`Wed, 10 Jan 2024 12:00:00 GMT`);
    expect(toRfc822Date(`2024-01-11`)).toBe(`Thu, 11 Jan 2024 12:00:00 GMT`);
    expect(toRfc822Date(`2024-01-12`)).toBe(`Fri, 12 Jan 2024 12:00:00 GMT`);
    expect(toRfc822Date(`2024-01-13`)).toBe(`Sat, 13 Jan 2024 12:00:00 GMT`);
  });

  it(`zero-pads single digit days`, () => {
    expect(toRfc822Date(`2024-03-01`)).toBe(`Fri, 01 Mar 2024 12:00:00 GMT`);
    expect(toRfc822Date(`2024-03-09`)).toBe(`Sat, 09 Mar 2024 12:00:00 GMT`);
  });

  it(`handles all months`, () => {
    expect(toRfc822Date(`2024-01-15`)).toContain(`Jan`);
    expect(toRfc822Date(`2024-02-15`)).toContain(`Feb`);
    expect(toRfc822Date(`2024-03-15`)).toContain(`Mar`);
    expect(toRfc822Date(`2024-04-15`)).toContain(`Apr`);
    expect(toRfc822Date(`2024-05-15`)).toContain(`May`);
    expect(toRfc822Date(`2024-06-15`)).toContain(`Jun`);
    expect(toRfc822Date(`2024-07-15`)).toContain(`Jul`);
    expect(toRfc822Date(`2024-08-15`)).toContain(`Aug`);
    expect(toRfc822Date(`2024-09-15`)).toContain(`Sep`);
    expect(toRfc822Date(`2024-10-15`)).toContain(`Oct`);
    expect(toRfc822Date(`2024-11-15`)).toContain(`Nov`);
    expect(toRfc822Date(`2024-12-15`)).toContain(`Dec`);
  });

  it(`handles full ISO 8601 date strings`, () => {
    expect(toRfc822Date(`2021-09-06T14:30:00.000Z`)).toBe(
      `Mon, 06 Sep 2021 14:30:00 GMT`,
    );
    expect(toRfc822Date(`2024-01-01T00:00:00.000Z`)).toBe(
      `Mon, 01 Jan 2024 00:00:00 GMT`,
    );
    expect(toRfc822Date(`2023-12-25T18:45:30.000Z`)).toBe(
      `Mon, 25 Dec 2023 18:45:30 GMT`,
    );
  });
});
