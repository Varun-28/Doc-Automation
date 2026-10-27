import { CATALOG, formatPrice } from "@/lib/catalog";
import { GUIDE } from "@/lib/guide";
import { SITE } from "@/lib/site";

// llms.txt (llmstxt.org): a short, markdown map of the site for AI assistants.
export const dynamic = "force-static";

export function GET() {
  const lines = [
    `# ${SITE.name}`,
    "",
    `> ${SITE.name} is a ${SITE.role} based in ${SITE.basedIn} who writes practical guides on website performance, Core Web Vitals (LCP, INP, CLS), React and Next.js.`,
    "",
    `This site has a free guide to website performance and one paid digital product. The advice comes from real production work, not synthetic demos. ${GUIDE.credentials}`,
    "",
    "## Guides",
    "",
    `- [${GUIDE.h1}](${SITE.url}${GUIDE.path}): ${GUIDE.description} Includes thresholds, a measurement workflow, a symptom-to-fix table, real before/after results and an FAQ. Full text: ${SITE.url}/llms-full.txt`,
    "",
    "## Products",
    "",
    ...CATALOG.map(
      (p) =>
        `- [${p.title}](${SITE.url}/products/${p.slug}): ${formatPrice(p.priceRupees)} one-time (INR). Format: ${p.format}. ${p.tagline} Delivery: after paying through Razorpay with a Google account email, the Google Doc is shared view-only with that email, usually within minutes.`,
    ),
    "",
    "## About",
    "",
    `- ${SITE.name}, ${SITE.role}, ${SITE.basedIn}. ${GUIDE.credentials}`,
    `- [About page](${SITE.url}/#about)`,
    "",
    "## Contact",
    "",
    `- Email: ${SITE.email}`,
    ...SITE.socials.map((s) => `- ${s.label}: ${s.href}`),
    "",
    "## Policies",
    "",
    `- [Terms & Conditions](${SITE.url}/terms)`,
    `- [Privacy Policy](${SITE.url}/privacy)`,
    `- [Refund & Cancellation Policy](${SITE.url}/refund-policy)`,
    `- [Shipping & Delivery Policy](${SITE.url}/shipping-policy)`,
    "",
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
