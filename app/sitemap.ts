import type { MetadataRoute } from "next";
import { CATALOG } from "@/lib/catalog";
import { GUIDE } from "@/lib/guide";
import { SITE } from "@/lib/site";

// /thank-you is deliberately left out (it is noindex).
export default function sitemap(): MetadataRoute.Sitemap {
  const policyDate = new Date(SITE.policiesUpdated);
  const guideDate = new Date(GUIDE.modified);
  const policy = (path: string) => ({
    url: `${SITE.url}${path}`,
    lastModified: policyDate,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  });

  return [
    { url: SITE.url, lastModified: guideDate, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE.url}${GUIDE.path}`, lastModified: guideDate, changeFrequency: "monthly", priority: 0.9 },
    ...CATALOG.map((item) => ({
      url: `${SITE.url}/products/${item.slug}`,
      lastModified: guideDate,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: `${SITE.url}/products`, lastModified: guideDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/contact`, lastModified: policyDate, changeFrequency: "yearly", priority: 0.5 },
    policy("/terms"),
    policy("/privacy"),
    policy("/refund-policy"),
    policy("/shipping-policy"),
  ];
}
