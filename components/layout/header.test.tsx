import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useTheme } from "next-themes";
import { Header } from "./header";

jest.mock("next-themes");

beforeEach(() => {
  class ResizeObserverStub {
    observe() {}
    disconnect() {}
  }
  Object.defineProperty(window, "ResizeObserver", { configurable: true, value: ResizeObserverStub });
});

afterEach(() => {
  Reflect.deleteProperty(window, "ResizeObserver");
  document.documentElement.classList.remove("dark");
  jest.restoreAllMocks();
});

test.each([["dark", "light"], ["light", "dark"]])(
  "switches from system %s to %s on the first click",
  async (resolvedTheme, expected) => {
    const setTheme = jest.fn();
    jest.mocked(useTheme).mockReturnValue({ theme: "system", resolvedTheme, setTheme, themes: [] });
    render(<Header activeSection="home" />);
    await userEvent.setup().click(screen.getByRole("button", { name: "Toggle theme" }));
    expect(setTheme).toHaveBeenCalledWith(expected);
  },
);

test.each([true, false])("uses the document theme before theme resolution (dark=%s)", async (dark) => {
  document.documentElement.classList.toggle("dark", dark);
  const frame = jest.spyOn(window, "requestAnimationFrame").mockReturnValue(1);
  const setTheme = jest.fn();
  jest.mocked(useTheme).mockReturnValue({ setTheme, themes: [] });
  render(<Header activeSection="missing" />);
  act(() => frame.mock.calls[0][0](0));
  expect(screen.getByRole("link", { name: "Home" })).not.toHaveAttribute("aria-current");
  await userEvent.setup().click(screen.getByRole("button", { name: "Toggle theme" }));
  expect(setTheme).toHaveBeenCalledWith(dark ? "light" : "dark");
});
