import { validateName } from "../Utils/Helper";

test("validateName", () => {
  expect(validateName("Siddhant Dalvi")).toBe("Siddhant Dalvi");
  expect(validateName("Siddhant Dalvi 3728")).toBe(null);
});
