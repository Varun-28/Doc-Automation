import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { THEME_SCRIPT } from "@/components/ThemeToggle";
import { siteGraph } from "@/lib/seo";
import { SITE } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const TITLE = "Website Performance & Core Web Vitals";
const DESCRIPTION =
  "Practical guides on website performance, Core Web Vitals (LCP, INP, CLS), React and Next.js by Shilpe Saxena, a Frontend Engineer in Bengaluru, from real production work.";

// Verification tags are only emitted when the env vars are set.
const googleVerification = process.env.GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.BING_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${TITLE} · ${SITE.name}`,
    template: `%s · ${SITE.name}`,
  },
  description: DESCRIPTION,
  keywords: [
    "website performance",
    "Core Web Vitals",
    "LCP",
    "INP",
    "CLS",
    "page speed",
    "React performance",
    "Next.js performance",
    "web performance optimization",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  category: "technology",
  openGraph: {
    type: "website",
    title: `${TITLE} · ${SITE.name}`,
    description: DESCRIPTION,
    siteName: SITE.name,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@ShilpeSaxena",
    title: `${TITLE} · ${SITE.name}`,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {}),
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fcf8ff" },
    { media: "(prefers-color-scheme: dark)", color: "#10002b" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-IN" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
        <JsonLd data={siteGraph()} />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <RevealObserver />
      </body>
    </html>
  );
}
