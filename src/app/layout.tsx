import type { Metadata, Viewport } from "next";
import { ViewTransition } from "react";
import { Analytics } from "@vercel/analytics/next";
import { Manrope, Oswald } from "next/font/google";

import { CursorReticle } from "@/components/cursor-reticle";
import { ScrollProgress } from "@/components/scroll-progress";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/content/site";
import { listPosts } from "@/lib/blog";

import "./globals.css";

// Condensed grotesque: carries the comic display treatment in caps while still
// having lowercase, which Bebas Neue doesn't — the same variable also styles
// blog headings through .prose-ink.
const display = Oswald({
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
  },
  twitter: {
    card: "summary_large_image",
    title: "Amarnath Kattani — Integration Architect & Agentic AI",
    description: site.description,
    creator: "@AmarnathKattani",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#08090D",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = await listPosts();

  return (
    // `dark` is pinned, not toggled: the site has one theme. shadcn's
    // primitives still ship `dark:` rules, so the class has to be here.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`dark ${display.variable} ${body.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ScrollProgress />
        <ViewTransition>
          <SiteHeader posts={posts} />
          <main className="flex-1">{children}</main>
          <SiteFooter />
        </ViewTransition>
        {/* Outside the ViewTransition: the cursor tracks the pointer, and a
            route transition has no business animating it. */}
        <CursorReticle />
        <Analytics />
      </body>
    </html>
  );
}
