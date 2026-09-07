import { isAdmin, unauthorized } from "@/lib/auth";
import type { SiteSeo } from "@/lib/seo";
import { getSeo, saveSeo } from "@/lib/store";

export async function GET() {
  if (!(await isAdmin())) return unauthorized();
  const seo = await getSeo();
  return Response.json({ seo });
}

export async function PUT(req: Request) {
  if (!(await isAdmin())) return unauthorized();
  const body = (await req.json()) as Partial<SiteSeo>;
  const seo = await saveSeo({
    siteUrl: body.siteUrl?.replace(/\/$/, ""),
    title: body.title,
    description: body.description,
    keywords: body.keywords,
  });
  return Response.json({ seo });
}
