import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit, Tiro_Devanagari_Hindi } from "next/font/google";
import { Providers } from "@/components/providers";
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

export const metadata: Metadata = {
  title: {
    default: "ARPAN (अर्पण) — Pure Organic Temple Agarbatti & Sacred Aromas",
    template: "%s · ARPAN",
  },
  description:
    "100% Charcoal-Free Organic Agarbatti, Dhoop, and Pooja Kits from Nashik & Kannauj. Hand-rolled with natural wood powders, halmaddi resin, and pure essential oils. COD across India.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${deva.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
