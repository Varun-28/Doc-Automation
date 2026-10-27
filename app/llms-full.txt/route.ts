import { CATALOG } from "@/lib/catalog";
import { GUIDE } from "@/lib/guide";
import { SITE } from "@/lib/site";

// Full markdown text of the free guide, built from the same data the page renders.
export const dynamic = "force-static";

export function GET() {
  const table = (head: string[], rows: string[][]) => [
    `| ${head.join(" | ")} |`,
    `| ${head.map(() => "---").join(" | ")} |`,
    ...rows.map((r) => `| ${r.join(" | ")} |`),
  ];
  const results = CATALOG[0].results;

  const lines = [
    `# ${GUIDE.h1}`,
    "",
    `${GUIDE.byline}. ${GUIDE.credentials} Last updated: ${GUIDE.modifiedLabel}. Source page: ${SITE.url}${GUIDE.path}`,
    "",
    "## What is website performance?",
    "",
    GUIDE.what,
    "",
    "## What are Core Web Vitals?",
    "",
    GUIDE.cwv,
    "",
    ...table(
      ["Metric", "What it measures", "Good (75th percentile)", "Poor"],
      GUIDE.metrics.map((m) => [m.name, m.measures, m.good, m.poor]),
    ),
    "",
    `Sources: ${GUIDE.sources.vitals} and ${GUIDE.sources.thresholds}`,
    "",
    "## Why does website performance matter?",
    "",
    GUIDE.why,
    "",
    `Source: ${GUIDE.sources.pageExperience}`,
    "",
    "## How do I measure website performance?",
    "",
    GUIDE.measure.intro,
    "",
    ...GUIDE.measure.steps.map((s, i) => `${i + 1}. ${s}`),
    "",
    "## How do I improve website performance?",
    "",
    GUIDE.improve.intro,
    "",
    ...table(
      ["Symptom", "Likely cause", "Fix"],
      GUIDE.improve.rows.map((r) => [r.symptom, r.cause, r.fix]),
    ),
    "",
    "## Real results from production",
    "",
    "Measured on a large e-commerce site (about 1 million monthly visits, 10,000+ products).",
    "",
    ...table(
      ["Metric", "Before", "After", "Reduction"],
      results.map((r) => [r.label, r.before, r.after, `${r.drop}%`]),
    ),
    "",
    "## Website performance in React and Next.js",
    "",
    GUIDE.reactNext.intro,
    "",
    ...GUIDE.reactNext.points.map((p) => `- ${p}`),
    "",
    "## FAQ",
    "",
    ...GUIDE.faqs.flatMap((f) => [`### ${f.q}`, "", f.a, ""]),
  ];
  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
