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
  // metadataBase: new URL("https://krishnadevashish.com"), // Placeholder - update with your actual domain

  title: {
    default: "Krishna Devashish | Senior Frontend Engineer",
    template: "%s | Krishna Devashish",
  },

  description:
    "Senior Frontend Engineer with 8+ years of experience specializing in React, TypeScript, Next.js, and high-performance UI systems. Building scalable and accessible web applications.",

  keywords: [
    "Krishna Devashish",
    "Senior Frontend Engineer",
    "React Developer",
    "TypeScript Expert",
    "Next.js Developer",
    "JavaScript Developer",
    "UI/UX Architect",
    "Frontend Performance",
    "Software Engineer Portfolio",
    "Bengaluru Frontend Developer",
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
    title: "Krishna Devashish | Senior Frontend Engineer",
    description:
      "Explore the portfolio of Krishna Devashish, a Senior Frontend Engineer focused on building exceptional digital experiences with React and TypeScript.",
    url: "https://krishnadevashish.dev",
    siteName: "Krishna Devashish Portfolio",
    images: [
      {
        url: "/og-image.png", // Ensure you add this image to public/
        width: 1200,
        height: 630,
        alt: "Krishna Devashish Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Krishna Devashish | Senior Frontend Engineer",
    description:
      "Senior Frontend Engineer building scalable, high-performance web applications with React and Next.js.",
    images: ["/og-image.png"],
    creator: "@krishnadevashish",
  },

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg", // Using the SVG as primary icon
  },

  verification: {
    google: "your-google-site-verification-code",
  },

  other: {
    "theme-color": "#FF5722", // Matches the portfolio primary orange
    "color-scheme": "dark light",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
