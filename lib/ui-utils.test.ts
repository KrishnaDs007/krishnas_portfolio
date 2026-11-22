import { getSkillIcon, getToolIcon } from "./icon-mapping";
import { scrollToSection } from "./scroll-utils";
import { cn } from "./utils";

afterEach(() => jest.restoreAllMocks());

test("merges conflicting utility classes and handles unknown icon keys", () => {
  expect(cn("px-2", false, "px-4")).toBe("px-4");
  expect(getSkillIcon("unknown")).toBe(getSkillIcon("default"));
  expect(getToolIcon("unknown")).toBe(getToolIcon("default"));
});

test("scrolls instantly with reduced motion and ignores absent targets", () => {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    value: jest.fn(() => ({ matches: true })),
  });
  const scroll = jest.spyOn(window, "scrollTo").mockImplementation(() => {});
  scrollToSection("absent");
  expect(scroll).not.toHaveBeenCalled();
  const section = document.createElement("section");
  section.id = "test-section";
  document.body.append(section);
  scrollToSection(section.id);
  expect(scroll).toHaveBeenCalledWith({ top: -10, behavior: "instant" });
  section.remove();
});
