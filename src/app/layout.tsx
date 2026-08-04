import type { Metadata, Viewport } from "next";
import { Manrope, Syne } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/content/site";

import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Amarnath Kattani — Integration Architect & Agentic AI",
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Amarnath Kattani",
    "integration architect",
    "agentic AI",
    "MuleSoft",
    "Model Context Protocol",
    "Salesforce",
    "Bengaluru",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: "Amarnath Kattani — Integration Architect & Agentic AI",
    description: site.description,
    images: [{ url: "/images/hero.jpg", width: 980, height: 980, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Amarnath Kattani — Integration Architect & Agentic AI",
    description: site.description,
    creator: "@AmarnathKattani",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider>
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
