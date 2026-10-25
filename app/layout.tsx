import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { RevealObserver } from "@/components/RevealObserver";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { THEME_SCRIPT } from "@/components/ThemeToggle";
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · Frontend Engineer & Web Performance`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Shilpe Saxena is a Frontend Engineer based in Bengaluru who writes practical guides on web performance, React and Next.js, including The Website Performance Playbook.",
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
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
