const { formatDate } = require("./../libs/date");

describe("format date", () => {
  it("is ok: date, time", () => {
    const date = "2021-05-06T04:36:33.137Z";
    expect(formatDate(date)).toBe("5/5/2021, 11:36:33 PM");
  });
  it("is undefined", () => {
    let date;
    expect(formatDate(date)).toBeUndefined();
  });
  it("is invalid date", () => {
    const date = "hola";
    expect(formatDate(date)).toBe("Invalid Date");
  });
});
