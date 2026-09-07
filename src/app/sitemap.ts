import type { MetadataRoute } from "next";
import { getSeo, listProducts } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [seo, products] = await Promise.all([getSeo(), listProducts({ activeOnly: true })]);
  const base = seo.siteUrl.replace(/\/$/, "");
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${base}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/rituals`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/shipping`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${base}/returns`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];
  const items = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));
  return [...staticPages, ...items];
}
