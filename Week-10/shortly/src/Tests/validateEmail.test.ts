// import jest for testing
import { validateEmail } from "../Utils/Helper";

test("validateEmail", () => {
  expect(validateEmail("abc@gmail.com")).toBe("abc@gmail.com");
  expect(validateEmail("Abc Ddljsjdlvksdsbd")).toBe(null);
});
