import { getContactMessageError } from "./contact-message";

test.each([[9, false], [10, true], [500, true], [501, false]])(
  "validates a message of %i characters",
  (length, valid) => {
    expect(getContactMessageError("a".repeat(length)) === null).toBe(valid);
  },
);

test("padding does not make a short message valid", () => {
  expect(getContactMessageError("     short     ")).toMatch(/at least 10/);
});
