import { PRODUCTS } from "@/products";

// What the public site shows for each product. The price comes from
// products.ts (the webhook's source of truth), matched by `productName`,
// so the site can never show a different price from what unlocks access.
// Server-only: products.ts holds the Google Doc IDs, so don't import this
// from a Client Component.

export type CatalogItem = {
  slug: string;
  productName: string;
  title: string;
  kicker: string;
  tagline: string;
  description: string;
  format: string;
  // The Razorpay Payment Page link (Live mode).
  paymentUrl: string;
  audience: string[];
  includes: string[];
  contents: string[];
  results: { label: string; before: string; after: string; drop: number }[];
  faqs: { q: string; a: string }[];
};

const ITEMS: CatalogItem[] = [
  {
    slug: "website-performance-playbook",
    productName: "Website Performance Doc",
    title: "The Website Performance Playbook",
    kicker: "Digital guide · Google Doc",
    tagline:
      "Proven fixes for LCP, INP, CLS, FCP, TTFB, page weight and iOS Safari, for React & Next.js developers.",
    description:
      "Six months of real performance work on a large production e-commerce site (about 1 million monthly visits, 10,000+ products), turned into a step-by-step guide. Start from your symptom, find the cause, and apply a fix that has already shipped to production and been measured.",
    format: "53-page Google Doc · view access · free future editions",
    paymentUrl: "https://rzp.io/rzp/bG102Jex",
    audience: [
      "Frontend developers handed a “fix our Core Web Vitals” ticket",
      "React and Next.js engineers working on large, content-heavy sites",
      "Freelancers and agencies who run performance audits for clients",
      "Anyone tired of Lighthouse scores that jump around for no reason",
    ],
    includes: [
      "A symptom → cause → fix table to find the right section fast",
      "Copy-paste snippets in HTML, CSS, JavaScript, React and Next.js 16",
      "Real before/after numbers from production for every major fix",
      "A pre-release checklist you can paste into your PR template",
      "A tools and commands cheat sheet, plus ready-made helper functions",
      "Every future edition of the playbook, free",
    ],
    contents: [
      "The metrics and their targets",
      "Symptom → likely cause → where to look",
      "Measure correctly first (or you'll chase ghosts)",
      "LCP – Largest Contentful Paint",
      "Fonts & render-blocking resources",
      "CLS – Cumulative Layout Shift",
      "INP & TBT – Responsiveness and main-thread work",
      "Rendering cost – CSS, style recalculation, layout, paint",
      "Images & video",
      "Page weight & Speed Index – HTML, SVG, DOM",
      "JavaScript bundles",
      "Third-party scripts – tag managers, analytics, widgets",
      "Network, caching & prefetching",
      "TTFB – Server, API & caching",
      "Mobile & Android",
      "iOS Safari – memory, crashes and quirks",
      "Desktop & Windows specifics",
      "Mistakes to avoid",
      "Typical impact – real numbers from the field",
      "Pre-release performance checklist",
      "Tools & commands cheat sheet",
      "Lessons learned",
      "Appendix A – Helper functions",
    ],
    results: [
      { label: "High-priority image preloads", before: "32", after: "4", drop: 88 },
      { label: "Tap INP", before: "320 ms", after: "144 ms", drop: 55 },
      { label: "LCP image size", before: "222 KB", after: "~55 KB", drop: 75 },
      { label: "Mobile TBT (tag manager deferred)", before: "700 ms", after: "~400 ms", drop: 43 },
      { label: "Homepage HTML (gzipped)", before: "115 KB", after: "82 KB", drop: 29 },
      { label: "Animated media size", before: "9 MB", after: "500 KB", drop: 94 },
    ],
    faqs: [
      {
        q: "How do I get the playbook after paying?",
        a: "Enter your Gmail or Google account email at checkout. Within a few minutes the Google Doc is shared with that email as view-only, and you get an email with an Open button. Open it while signed in to the same Google account.",
      },
      {
        q: "Is it a PDF?",
        a: "It's a Google Doc, so you always see the latest edition. Future updates are free and show up in the same document.",
      },
      {
        q: "Which stack is it written for?",
        a: "React and Next.js (with notes for Next.js 16). The principles behind each fix apply to any modern frontend, but the code snippets assume React.",
      },
      {
        q: "I used the wrong email or didn't get access. What now?",
        a: "Email us with your payment ID and the correct Google account email, and we'll share the doc manually, usually within a few hours. See the Shipping & Delivery Policy for details.",
      },
      {
        q: "Can I get a refund?",
        a: "Because the playbook is a digital product delivered instantly, purchases are generally final. Duplicate payments, and payments where access couldn't be delivered, are refunded in full. See the Refund & Cancellation Policy.",
      },
    ],
  },
];

export type CatalogEntry = CatalogItem & { priceRupees: number };

function withPrice(item: CatalogItem): CatalogEntry {
  const product = PRODUCTS.find((p) => p.name === item.productName);
  if (!product) throw new Error(`No product in products.ts named "${item.productName}"`);
  return { ...item, priceRupees: product.amountPaise / 100 };
}

export const CATALOG: CatalogEntry[] = ITEMS.map(withPrice);

export function getCatalogItem(slug: string) {
  return CATALOG.find((i) => i.slug === slug);
}

export function formatPrice(rupees: number) {
  return `₹${rupees.toLocaleString("en-IN")}`;
}
