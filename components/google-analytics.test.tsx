import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/script", () => ({
  __esModule: true,
  default: function ScriptStub({ src }: { src?: string }) {
    return src ? <output>{src}</output> : null;
  },
}));

const originalId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function loadAnalytics(id?: string) {
  if (id) process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = id;
  else delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  let analytics!: typeof import("./google-analytics");
  jest.isolateModules(() => {
    jest.doMock("react", () => React);
    analytics = jest.requireActual("./google-analytics");
  });
  jest.dontMock("react");
  return analytics;
}

afterEach(() => {
  jest.restoreAllMocks();
  window.localStorage.clear();
  Reflect.deleteProperty(navigator, "doNotTrack");
  Reflect.deleteProperty(window, "doNotTrack");
  if (originalId) process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalId;
  else delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
});

test("loads analytics when enabled and updates after storage changes", () => {
  const { GoogleAnalytics, AnalyticsPreference } = loadAnalytics("G-TEST");
  render(<><GoogleAnalytics /><AnalyticsPreference /></>);
  expect(screen.getByText(/googletagmanager/)).toBeInTheDocument();
  window.localStorage.setItem("analytics-consent", "denied");
  fireEvent(window, new StorageEvent("storage", { key: "analytics-consent" }));
  expect(screen.queryByText(/googletagmanager/)).not.toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Enable analytics" })).toBeInTheDocument();
});

test("persists the opt-out and reports storage write failures", () => {
  const { AnalyticsPreference } = loadAnalytics("G-TEST");
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  const { unmount } = render(<AnalyticsPreference />);
  fireEvent.click(screen.getByRole("button", { name: "Disable analytics" }));
  expect(window.localStorage.getItem("analytics-consent")).toBe("denied");
  consoleError.mockRestore();
  unmount();
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
  render(<AnalyticsPreference />);
  fireEvent.click(screen.getByRole("button", { name: "Enable analytics" }));
  expect(screen.getByRole("status")).toHaveTextContent(/could not save/i);
});

test.each(["navigator", "window", "storage", "configuration"])("omits tracking when blocked by %s", (condition) => {
  const { GoogleAnalytics, AnalyticsPreference } = loadAnalytics(condition === "configuration" ? undefined : "G-TEST");
  if (condition === "navigator" || condition === "window") {
    Object.defineProperty(condition === "navigator" ? navigator : window, "doNotTrack", { value: "1", configurable: true });
  }
  if (condition === "storage") {
    jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
  }
  const { container } = render(<><GoogleAnalytics /><AnalyticsPreference /></>);
  expect(container).toBeEmptyDOMElement();
});
