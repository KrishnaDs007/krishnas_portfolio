import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("next/script", () => ({
  __esModule: true,
  default: function ScriptStub({ src }: { src?: string }) {
    return src ? <output>{src}</output> : null;
  },
}));

const mockSpeedInsights = jest
  .fn<React.ReactElement, [{ beforeSend: (event: unknown) => unknown }]>()
  .mockReturnValue(<output>Speed Insights</output>);
jest.mock("@vercel/speed-insights/next", () => ({
  SpeedInsights: (props: { beforeSend: (event: unknown) => unknown }) =>
    mockSpeedInsights(props),
}));

const originalId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const originalVercelEnv = process.env.NEXT_PUBLIC_VERCEL_ENV;

function loadAnalytics(id?: string, environment?: string) {
  if (id) process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = id;
  else delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (environment) process.env.NEXT_PUBLIC_VERCEL_ENV = environment;
  else delete process.env.NEXT_PUBLIC_VERCEL_ENV;
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
  mockSpeedInsights.mockClear();
  window.localStorage.clear();
  Reflect.deleteProperty(navigator, "doNotTrack");
  Reflect.deleteProperty(window, "doNotTrack");
  if (originalId) process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID = originalId;
  else delete process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  if (originalVercelEnv) process.env.NEXT_PUBLIC_VERCEL_ENV = originalVercelEnv;
  else delete process.env.NEXT_PUBLIC_VERCEL_ENV;
});

test("loads analytics when enabled and updates after storage changes", () => {
  const { GoogleAnalytics, AnalyticsPreference } = loadAnalytics("G-TEST");
  render(
    <>
      <GoogleAnalytics />
      <AnalyticsPreference />
    </>,
  );
  expect(screen.getByText(/googletagmanager/)).toBeInTheDocument();
  window.localStorage.setItem("analytics-consent", "denied");
  fireEvent(window, new StorageEvent("storage", { key: "analytics-consent" }));
  expect(screen.queryByText(/googletagmanager/)).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Enable analytics" }),
  ).toBeInTheDocument();
});

test("persists the opt-out and reports storage write failures", () => {
  const { AnalyticsPreference } = loadAnalytics("G-TEST");
  const consoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});
  const { unmount } = render(<AnalyticsPreference />);
  fireEvent.click(screen.getByRole("button", { name: "Disable analytics" }));
  expect(window.localStorage.getItem("analytics-consent")).toBe("denied");
  consoleError.mockRestore();
  unmount();
  jest.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  render(<AnalyticsPreference />);
  fireEvent.click(screen.getByRole("button", { name: "Enable analytics" }));
  expect(screen.getByRole("status")).toHaveTextContent(/could not save/i);
});

test.each(["navigator", "window", "storage", "configuration"])(
  "omits tracking when blocked by %s",
  (condition) => {
    const { GoogleAnalytics, AnalyticsPreference } = loadAnalytics(
      condition === "configuration" ? undefined : "G-TEST",
    );
    if (condition === "navigator" || condition === "window") {
      Object.defineProperty(
        condition === "navigator" ? navigator : window,
        "doNotTrack",
        { value: "1", configurable: true },
      );
    }
    if (condition === "storage") {
      jest.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
        throw new Error("blocked");
      });
    }
    const { container } = render(
      <>
        <GoogleAnalytics />
        <AnalyticsPreference />
      </>,
    );
    expect(container).toBeEmptyDOMElement();
  },
);

test("honors the footer preference in production even without GA4 configured", () => {
  const { PortfolioSpeedInsights, AnalyticsPreference } = loadAnalytics(
    undefined,
    "production",
  );
  render(
    <>
      <PortfolioSpeedInsights />
      <AnalyticsPreference />
    </>,
  );
  expect(screen.getByText("Speed Insights")).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Disable analytics" }),
  ).toBeInTheDocument();
  const { beforeSend } = mockSpeedInsights.mock.calls[0][0];
  const event = { url: "https://example.com/" };
  expect(beforeSend(event)).toBe(event);

  window.localStorage.setItem("analytics-consent", "denied");
  expect(beforeSend(event)).toBeNull();
  fireEvent(window, new StorageEvent("storage", { key: "analytics-consent" }));
  expect(screen.queryByText("Speed Insights")).not.toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Enable analytics" }),
  ).toBeInTheDocument();
});

test.each([undefined, "preview"])(
  "skips Speed Insights outside production (%s)",
  (environment) => {
    const { PortfolioSpeedInsights } = loadAnalytics("G-TEST", environment);
    const { container } = render(<PortfolioSpeedInsights />);
    expect(container).toBeEmptyDOMElement();
  },
);
