import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krishnasportfolio-rho.vercel.app"),

  title: {
    default: "Krishna Devashish | Senior React & Micro Frontend Engineer",
    template: "%s | Krishna Devashish",
  },

  description:
    "Senior Frontend Engineer (7+ years) specializing in React, Micro Frontends, Design Systems, and LLM-powered dashboards. Ex-EnterpriseBot. Built scalable architectures that improved Lighthouse scores to 90+, reduced release cycles by 30%, and integrated Azure/OpenAI/Gemini.",

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

  alternates: {
    canonical: "/",
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
    title: "Krishna Devashish | Senior React & Micro Frontend Engineer",
    description:
      "Senior Frontend Engineer specializing in React, Micro Frontends, Design Systems & LLM-powered dashboards. Ex-EnterpriseBot | Bangalore",
    url: "https://krishnasportfolio-rho.vercel.app",
    siteName: "Krishna Devashish Portfolio",
    images: [
      {
        url: "/og-image.png",
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
    title: "Krishna Devashish | Senior React & Micro Frontend Engineer",
    description:
      "Senior Frontend Engineer (7+ years) • React • Micro Frontends • LLM Dashboards • Lighthouse 90+ • Bangalore",
    images: ["/og-image.png"],
    creator: "@itskd_17",
  },

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
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
              name: "Krishna Devashish",
              jobTitle: "Senior React & Micro Frontend Engineer",
              url: "https://krishnasportfolio-rho.vercel.app",
              image: "https://krishnasportfolio-rho.vercel.app/og-image.png",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
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
