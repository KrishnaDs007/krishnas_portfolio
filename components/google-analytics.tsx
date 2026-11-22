"use client";

import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useState, useSyncExternalStore } from "react";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const speedInsightsEnabled =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";
const consentKey = "analytics-consent";

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("storage", onChange);
  };
}

function getPreference() {
  const browserWindow = window as Window & { doNotTrack?: string };
  if (navigator.doNotTrack === "1" || browserWindow.doNotTrack === "1")
    return "blocked";

  try {
    return window.localStorage.getItem(consentKey) === "denied"
      ? "denied"
      : "allowed";
  } catch {
    return "blocked";
  }
}

const getServerPreference = () => "blocked";

export function GoogleAnalytics() {
  const preference = useSyncExternalStore(
    subscribe,
    getPreference,
    getServerPreference,
  );
  if (!measurementId || preference !== "allowed") {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(measurementId)});
        `}
      </Script>
    </>
  );
}

export function PortfolioSpeedInsights() {
  const preference = useSyncExternalStore(
    subscribe,
    getPreference,
    getServerPreference,
  );
  if (!speedInsightsEnabled || preference !== "allowed") return null;

  return (
    <SpeedInsights
      beforeSend={(event) => (getPreference() === "allowed" ? event : null)}
    />
  );
}

export function AnalyticsPreference() {
  const preference = useSyncExternalStore(
    subscribe,
    getPreference,
    getServerPreference,
  );
  const [saveFailed, setSaveFailed] = useState(false);
  if ((!measurementId && !speedInsightsEnabled) || preference === "blocked")
    return null;

  const togglePreference = () => {
    try {
      const denied = preference === "allowed";
      window.localStorage.setItem(consentKey, denied ? "denied" : "allowed");
      // Reload to apply the choice to any Analytics script already loaded.
      window.location.reload();
    } catch {
      setSaveFailed(true);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={togglePreference}
        className="mt-2 text-sm text-muted-foreground underline"
      >
        {preference === "allowed" ? "Disable analytics" : "Enable analytics"}
      </button>
      {saveFailed && (
        <p role="status">Could not save your analytics preference.</p>
      )}
    </>
  );
}
