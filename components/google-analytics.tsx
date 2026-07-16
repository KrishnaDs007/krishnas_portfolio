"use client";

import Script from "next/script";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

function canLoadAnalytics() {
  if (typeof window === "undefined") {
    return false;
  }

  const browserWindow = window as Window & { doNotTrack?: string };
  const doNotTrack =
    navigator.doNotTrack === "1" ||
    browserWindow.doNotTrack === "1";
  const analyticsDenied =
    window.localStorage.getItem("analytics-consent") === "denied";

  return !doNotTrack && !analyticsDenied;
}

export function GoogleAnalytics() {
  if (!measurementId || !canLoadAnalytics()) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}');
        `}
      </Script>
    </>
  );
}
