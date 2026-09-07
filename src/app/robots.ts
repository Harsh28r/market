import type { MetadataRoute } from "next";
import { getSeo } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const seo = await getSeo();
  const base = seo.siteUrl.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/cart", "/checkout", "/login", "/signup", "/account"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
