import type { Metadata } from "next";
import "./globals.css";
import { GoogleAnalytics } from "@/components/google-analytics";
import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: siteConfig.title,
    template: "%s | Krishna Devashish",
  },

  description: siteConfig.description,

  keywords: [
    "Krishna Devashish",
    "Senior React Engineer",
    "Micro Frontend Architect",
    "LLM Dashboard",
    "Design Systems",
    "Performance Optimization",
    "TypeScript Expert",
    "Next.js Developer",
    "Web Accessibility",
    "Enterprise Frontend",
    "Bengaluru React Developer",
    "React Component Library",
    "Webpack Micro Frontend",
    "Azure OpenAI Gemini Integration",
  ],

  authors: [{ name: "Krishna Devashish" }],
  creator: "Krishna Devashish",
  publisher: "Krishna Devashish",
  category: "technology",
  applicationName: "Krishna Devashish Portfolio",
  generator: "Next.js",
  referrer: "origin-when-cross-origin",

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: siteConfig.title,
    description:
      "Senior Frontend Engineer specializing in React, TypeScript, Micro Frontends, design systems, performance, and LLM-powered dashboards.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/og-image.jpeg",
        width: 1200,
        height: 630,
        alt: "Krishna Devashish - Senior React & Micro Frontend Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/og-image.jpeg"],
    creator: "@itskd_17",
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  // maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  colorScheme: "dark light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "@id": `${siteConfig.url}/#person`,
              name: "Krishna Devashish",
              jobTitle: "Senior Frontend Engineer",
              url: siteConfig.url,
              image: `${siteConfig.url}/og-image.jpeg`,
              description:
                "Senior Frontend Engineer specializing in React, TypeScript, Micro Frontends, design systems, performance, and LLM-powered dashboards.",
              sameAs: [
                "https://www.linkedin.com/in/mrkd007",
                "https://x.com/itskd_17",
              ],
              knowsAbout: [
                "React",
                "Micro Frontends",
                "LLM Integration",
                "TypeScript",
                "Web Performance",
              ],
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <GoogleAnalytics />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:outline-2 focus:outline-primary"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
