import type { CatalogEntry } from "@/lib/catalog";
import { GUIDE } from "@/lib/guide";
import { SITE } from "@/lib/site";

// JSON-LD builders. Everything derives from SITE / CATALOG / GUIDE so the
// structured data cannot drift from what the pages say.

export const PERSON_ID = `${SITE.url}/#person`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export const abs = (path: string) => `${SITE.url}${path}`;

const personRef = { "@id": PERSON_ID };

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.name,
    jobTitle: SITE.role,
    url: SITE.url,
    image: abs("/opengraph-image"),
    email: SITE.email,
    address: { "@type": "PostalAddress", addressLocality: "Bengaluru", addressCountry: "IN" },
    knowsAbout: [
      "Website performance",
      "Core Web Vitals",
      "Largest Contentful Paint (LCP)",
      "Interaction to Next Paint (INP)",
      "Cumulative Layout Shift (CLS)",
      "React",
      "Next.js",
      "TypeScript",
      "Frontend engineering",
      "SEO",
    ],
    sameAs: SITE.socials.map((s) => s.href),
  };
}

export function siteGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      personSchema(),
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        name: SITE.name,
        url: SITE.url,
        publisher: personRef,
        inLanguage: "en-IN",
      },
    ],
  };
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function guideArticleSchema() {
  const url = abs(GUIDE.path);
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: GUIDE.h1,
    description: GUIDE.description,
    author: personRef,
    publisher: personRef,
    datePublished: GUIDE.published,
    dateModified: GUIDE.modified,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    image: abs(`${GUIDE.path}/opengraph-image`),
    about: ["Website performance", "Core Web Vitals", "Largest Contentful Paint", "Interaction to Next Paint", "Cumulative Layout Shift"].map(
      (name) => ({ "@type": "Thing", name }),
    ),
    inLanguage: "en-IN",
  };
}

export function productSchema(item: CatalogEntry) {
  const url = abs(`/products/${item.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: item.title,
    description: item.description,
    image: `${url}/opengraph-image`,
    brand: personRef,
    url,
    offers: {
      "@type": "Offer",
      price: item.priceRupees,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url,
      seller: personRef,
    },
  };
}
