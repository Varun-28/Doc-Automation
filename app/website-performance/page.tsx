import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { CATALOG } from "@/lib/catalog";
import { GUIDE } from "@/lib/guide";
import { breadcrumbSchema, faqSchema, guideArticleSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: GUIDE.title,
  description: GUIDE.description,
  keywords: ["website performance", "Core Web Vitals", "LCP", "INP", "CLS", "how to improve website speed", "React performance", "Next.js performance"],
  alternates: { canonical: GUIDE.path },
  openGraph: {
    type: "article",
    url: GUIDE.path,
    title: GUIDE.title,
    description: GUIDE.description,
    publishedTime: GUIDE.published,
    modifiedTime: GUIDE.modified,
    authors: [SITE.name],
  },
};

export default function WebsitePerformanceGuide() {
  const product = CATALOG[0];

  return (
    <>
      <JsonLd data={guideArticleSchema()} />
      <JsonLd data={faqSchema(GUIDE.faqs)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Website performance", path: GUIDE.path },
        ])}
      />

      <PageHero eyebrow="Free guide" title={GUIDE.h1}>
        <p className="byline">
          <strong>{GUIDE.byline}</strong> · Last updated{" "}
          <time dateTime={GUIDE.modified}>{GUIDE.modifiedLabel}</time>
        </p>
        <p className="lead">{GUIDE.credentials}</p>
      </PageHero>

      <article className="section" style={{ paddingTop: 40 }}>
        <div className="container guide">
          <section aria-labelledby="what">
            <h2 className="h2" id="what">
              What is website performance?
            </h2>
            <p>{GUIDE.what}</p>
          </section>

          <section aria-labelledby="cwv">
            <h2 className="h2" id="cwv">
              What are Core Web Vitals?
            </h2>
            <p>{GUIDE.cwv}</p>
            <div className="table-wrap" role="region" aria-labelledby="cwv-caption" tabIndex={0}>
              <table className="data-table">
                <caption id="cwv-caption">Core Web Vitals and supporting metrics, with thresholds at the 75th percentile</caption>
                <thead>
                  <tr>
                    <th scope="col">Metric</th>
                    <th scope="col">What it measures</th>
                    <th scope="col">Good</th>
                    <th scope="col">Poor</th>
                  </tr>
                </thead>
                <tbody>
                  {GUIDE.metrics.map((m) => (
                    <tr key={m.name}>
                      <th scope="row">
                        {m.name}
                        {m.core ? "" : " (supporting)"}
                      </th>
                      <td>{m.measures}</td>
                      <td>{m.good}</td>
                      <td>{m.poor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="muted">
              Sources:{" "}
              <a href={GUIDE.sources.vitals} rel="noopener">
                web.dev: Web Vitals
              </a>{" "}
              and{" "}
              <a href={GUIDE.sources.thresholds} rel="noopener">
                web.dev: Defining the Core Web Vitals thresholds
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="why">
            <h2 className="h2" id="why">
              Why does website performance matter?
            </h2>
            <p>{GUIDE.why}</p>
            <p className="muted">
              Source:{" "}
              <a href={GUIDE.sources.pageExperience} rel="noopener">
                Google Search Central: page experience
              </a>
              .
            </p>
          </section>

          <section aria-labelledby="measure">
            <h2 className="h2" id="measure">
              How do I measure website performance?
            </h2>
            <p>{GUIDE.measure.intro}</p>
            <ol>
              {GUIDE.measure.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="improve">
            <h2 className="h2" id="improve">
              How do I improve website performance?
            </h2>
            <p>{GUIDE.improve.intro}</p>
            <div className="table-wrap" role="region" aria-labelledby="improve-caption" tabIndex={0}>
              <table className="data-table">
                <caption id="improve-caption">Symptom, likely cause and fix</caption>
                <thead>
                  <tr>
                    <th scope="col">Symptom</th>
                    <th scope="col">Likely cause</th>
                    <th scope="col">Fix</th>
                  </tr>
                </thead>
                <tbody>
                  {GUIDE.improve.rows.map((r) => (
                    <tr key={r.symptom}>
                      <th scope="row">{r.symptom}</th>
                      <td>{r.cause}</td>
                      <td>{r.fix}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="results">
            <h2 className="h2" id="results">
              Real results from production
            </h2>
            <p>
              These before-and-after numbers were measured on a large e-commerce site with about 1 million monthly
              visits and 10,000+ products, where I worked on performance for more than six months.
            </p>
            <div className="table-wrap" role="region" aria-labelledby="results-caption" tabIndex={0}>
              <table className="data-table">
                <caption id="results-caption">Before and after results from production</caption>
                <thead>
                  <tr>
                    <th scope="col">Metric</th>
                    <th scope="col">Before</th>
                    <th scope="col">After</th>
                    <th scope="col">Reduction</th>
                  </tr>
                </thead>
                <tbody>
                  {product.results.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      <td>{r.before}</td>
                      <td>{r.after}</td>
                      <td>{r.drop}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section aria-labelledby="react-next">
            <h2 className="h2" id="react-next">
              Website performance in React and Next.js
            </h2>
            <p>{GUIDE.reactNext.intro}</p>
            <ul>
              {GUIDE.reactNext.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </section>
        </div>
      </article>

      <section className="section section-alt" aria-labelledby="faq-title">
        <div className="container">
          <div className="section-head center">
            <p className="eyebrow">FAQ</p>
            <h2 className="h2" id="faq-title">
              Website performance questions, answered.
            </h2>
          </div>
          <div className="faq">
            {GUIDE.faqs.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="next-step">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Go deeper</p>
            <h2 className="h2" id="next-step">
              Want every fix, step by step?
            </h2>
            <p className="lead">
              This guide covers the basics. The full playbook walks through each fix with code and real numbers. Questions?{" "}
              <Link href="/contact">Get in touch</Link>.
            </p>
          </div>
          <ProductCard item={product} />
        </div>
      </section>
    </>
  );
}
