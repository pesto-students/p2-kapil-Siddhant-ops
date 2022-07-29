import { validateURL } from "../Utils/Helper";

test("validateURL", () => {
  expect(validateURL("http://google.com/")).toBe("http://google.com/");
  expect(validateURL("https://$1759716/lectures/39656714")).toBe(null);
});
