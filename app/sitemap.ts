import type { MetadataRoute } from "next";
import { CATALOG } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/products", "/contact", "/terms", "/privacy", "/refund-policy", "/shipping-policy"];
  return [
    ...pages.map((p) => ({ url: `${SITE.url}${p}` })),
    ...CATALOG.map((item) => ({ url: `${SITE.url}/products/${item.slug}` })),
  ];
}
