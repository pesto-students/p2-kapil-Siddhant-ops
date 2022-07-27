const mathOps = require("./index");

describe("Math operations testing", () => {
  test("Should Pass Addition test a = 20, b = 13 returns 33", () => {
    let res = mathOps.sum(20, 13);
    expect(res).toBe(33);
  });

  test("Should Pass Subtraction test a = 20, b = 13 returns 7", () => {
    let res = mathOps.diff(20, 13);
    expect(res).toBe(7);
  });
  test("Should Pass Addition test a = 20, b = 13 returns 260", () => {
    let res = mathOps.product(20, 13);
    expect(res).toBe(260);
  });
});
