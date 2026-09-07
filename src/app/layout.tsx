import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Tiro_Devanagari_Hindi } from "next/font/google";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { orgJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { getSeo } from "@/lib/store";
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

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeo();
  let base: URL;
  try {
    base = new URL(seo.siteUrl);
  } catch {
    base = new URL(SITE_URL);
  }
  return {
    metadataBase: base,
    title: {
      default: seo.title,
      template: "%s · ARPAN",
    },
    description: seo.description,
    keywords: seo.keywords.split(",").map((k) => k.trim()).filter(Boolean),
    authors: [{ name: "ARPAN" }],
    creator: "ARPAN",
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: seo.siteUrl,
      siteName: "ARPAN",
      title: seo.title,
      description: seo.description,
      images: [{ url: "/vedasakti_hero.jpg", width: 1200, height: 675, alt: "ARPAN temple agarbatti" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
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
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const seo = await getSeo();
  return (
    <html
      lang="en-IN"
      className={`${display.variable} ${sans.variable} ${deva.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <JsonLd data={orgJsonLd(seo)} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
