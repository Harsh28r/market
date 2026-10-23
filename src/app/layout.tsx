import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Outfit, Tiro_Devanagari_Hindi } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { defaultSiteSeo, orgJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const deva = Tiro_Devanagari_Hindi({
  variable: "--font-deva",
  subsets: ["latin", "devanagari"],
  weight: "400",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultSiteSeo.title,
    template: "%s · ARPAN",
  },
  description: defaultSiteSeo.description,
  keywords: defaultSiteSeo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
  authors: [{ name: "ARPAN" }],
  creator: "ARPAN",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: defaultSiteSeo.siteUrl,
    siteName: "ARPAN",
    title: defaultSiteSeo.title,
    description: defaultSiteSeo.description,
    images: [{ url: "/vedasakti_hero.jpg", width: 1200, height: 675, alt: "ARPAN temple agarbatti" }],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultSiteSeo.title,
    description: defaultSiteSeo.description,
    images: ["/vedasakti_hero.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-icon",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  verification: {
    google: "kv_sr6TRObFH9ugtZo4b3w1z1cQvW-E5rz9ninjToIo",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${sans.variable} ${deva.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <JsonLd data={orgJsonLd(defaultSiteSeo)} />
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  );
}
