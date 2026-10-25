import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { Blobs, ImpactBars, ScoreRings } from "@/components/Graphics";
import { ProductCard } from "@/components/ProductCard";
import { ArrowRight, Code, Gauge, Phone, Users } from "@/components/icons";
import { CATALOG } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import portrait from "@/assets/shilpe.jpg";

const STATS = [
  { value: "3.5+ yrs", label: "Building production frontends" },
  { value: "1M+", label: "Monthly visits on the site I optimised" },
  { value: "7K+", label: "Developers following on LinkedIn" },
  { value: "4.9★", label: "Rating from 1:1 mentoring sessions" },
];

const FOCUS = [
  {
    icon: Gauge,
    title: "Web performance",
    body: "Core Web Vitals on a large e-commerce site: LCP, INP, CLS, TTFB, page weight and the iOS Safari crashes nobody could reproduce.",
  },
  {
    icon: Code,
    title: "React, Next.js & TypeScript",
    body: "App Router, server rendering, caching and bundle splitting, on a codebase with 10,000+ products.",
  },
  {
    icon: Phone,
    title: "E-commerce, SEO & analytics",
    body: "B2B and B2C storefronts on Shopify and headless stacks, SEO and structured data, GTM & GA4 tracking, and A/B testing with AB Tasty and Insider.",
  },
  {
    icon: Users,
    title: "Leading & mentoring",
    body: "Led a team of 5 developers on a large e-commerce project, and mentor frontend developers one-on-one on Topmate.",
  },
];

const SKILLS = [
  "React",
  "Next.js",
  "TypeScript",
  "Remix",
  "Shopify Hydrogen",
  "React Native",
  "Core Web Vitals",
  "SEO",
  "GTM & GA4",
  "Tailwind CSS",
];

const TIMELINE = [
  {
    when: "Jul 2024 – Present",
    role: "Frontend Developer",
    org: "Compose Tech Services",
    body: "B2B and B2C e-commerce on React and Next.js with a focus on performance, SEO and cross-device quality. Leads a team of 5 developers.",
  },
  {
    when: "Jun 2023 – Jun 2024",
    role: "Software Engineer",
    org: "Overdose",
    body: "Next.js storefronts, cart and checkout, commercetools integration, and Lighthouse performance and accessibility fixes.",
  },
  {
    when: "Nov 2022 – May 2023",
    role: "ReactJS Developer",
    org: "Texala India Pvt. Ltd.",
    body: "Dashboards, Google Maps and reCAPTCHA features, Redux state, and migrating legacy code to React Hooks.",
  },
  {
    when: "2018 – 2022",
    role: "B.Tech, Computer Science",
    org: "Dr. A.P.J. Abdul Kalam Technical University",
    body: "Plus the neoG Camp frontend programme (Levels Zero and One) in 2021–22.",
  },
];

export default function Home() {
  const featured = CATALOG[0];

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="hero">
        <Blobs grid />
        <div className="container hero-grid">
          <div className="hero-enter">
            <span className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              New: The Website Performance Playbook
            </span>
            <h1 className="h1">
              Hi, I&apos;m Shilpe.
              <br />
              I make websites <span className="gradient-text">fast</span>.
            </h1>
            <p className="lead">
              I&apos;m a {SITE.role} based in Bengaluru with 3.5+ years of experience in React and Next.js. I spent
              more than six months fixing performance on a large production e-commerce site, and now I turn that work
              into practical guides you can use straight away.
            </p>
            <div className="btn-row">
              <Link href="/products" className="btn btn-primary btn-lg">
                Browse my products <ArrowRight />
              </Link>
              <Link href="/#about" className="btn btn-ghost btn-lg">
                About me
              </Link>
            </div>
            <div className="chips hero-tags">
              {["React", "Next.js", "TypeScript", "Core Web Vitals"].map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="portrait">
            <div className="portrait-frame">
              <Image
                src={portrait}
                alt="Shilpe Saxena working on her laptop by a window"
                placeholder="blur"
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 900px) 420px, 90vw"
              />
            </div>
            <div className="float-chip chip-a" aria-hidden="true">
              <span className="dot" />
              <span>
                <small>LCP</small>2.1 s
              </span>
            </div>
            <div className="float-chip chip-b" aria-hidden="true">
              <span className="dot" />
              <span>
                <small>INP</small>144 ms
              </span>
            </div>
            <div className="float-chip chip-c" aria-hidden="true">
              <span className="dot" />
              <span>
                <small>CLS</small>0.00
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Stats ---------- */}
      <section className="container" aria-label="Highlights">
        <div className="stats">
          {STATS.map((s, i) => (
            <div key={s.label} className="card stat" data-reveal style={{ "--delay": `${i * 0.08}s` } as CSSProperties}>
              <div className="stat-value gradient-text">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className="section" id="about">
        <div className="container about-grid">
          <div data-reveal>
            <p className="eyebrow">About me</p>
            <h2 className="h2">Frontend engineer, performance nerd, mentor.</h2>
            <div className="about-copy" style={{ marginTop: 20 }}>
              <p>
                I&apos;m <strong>{SITE.name}</strong>, a {SITE.role} based in {SITE.basedIn}.
                I&apos;ve spent the last 3.5+ years building fast, scalable web apps with{" "}
                <strong>React, Next.js, TypeScript, Remix and Shopify Hydrogen</strong>, for startups and product
                companies in India and Australia.
              </p>
              <p>
                For more than six months I worked on performance for a large e-commerce site: about{" "}
                <strong>1 million monthly visits</strong> and <strong>10,000+ products</strong>, across desktop,
                Android and iPhone. Every fix had to ship to production and be measured. I wrote down what worked,
                what didn&apos;t, and the real numbers behind it.
              </p>
              <p>
                That notebook became <strong>The Website Performance Playbook</strong>. I also mentor frontend
                developers one-on-one, and share what I learn with 7,000+ developers on LinkedIn.
              </p>
            </div>
            <div className="chips" style={{ marginTop: 24 }}>
              {SKILLS.map((s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="focus-list">
            {FOCUS.map((f, i) => (
              <div key={f.title} className="card focus-item" data-reveal style={{ "--delay": `${i * 0.08}s` } as CSSProperties}>
                <span className="focus-icon">
                  <f.icon />
                </span>
                <div>
                  <h3 className="h3">{f.title}</h3>
                  <p>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Experience ---------- */}
      <section className="section section-alt" aria-labelledby="experience-title">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Experience</p>
            <h2 className="h2" id="experience-title">
              Where I&apos;ve worked.
            </h2>
          </div>
          <ol className="timeline">
            {TIMELINE.map((t, i) => (
              <li key={t.org} className="timeline-item" data-reveal style={{ "--delay": `${i * 0.08}s` } as CSSProperties}>
                <span className="timeline-when">{t.when}</span>
                <div className="card timeline-card">
                  <h3 className="h3">{t.role}</h3>
                  <p className="timeline-org">{t.org}</p>
                  <p className="muted">{t.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Results ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Real results</p>
            <h2 className="h2">Fixes that shipped, with the numbers to prove it.</h2>
            <p className="lead">
              A few before-and-after results from the production work behind the playbook. No synthetic demos.
            </p>
          </div>
          <div className="grid-2">
            <div className="card" data-reveal>
              <div className="score-card">
                <ScoreRings />
                <div>
                  <h3 className="h3">Mobile Lighthouse score</h3>
                  <p className="muted" style={{ marginTop: 8 }}>
                    Deferring the tag manager to the first interaction took the mobile score from about 58 to 72 and
                    cut Total Blocking Time roughly in half.
                  </p>
                </div>
              </div>
            </div>
            <div className="card" data-reveal style={{ "--delay": "0.1s" } as CSSProperties}>
              <ImpactBars results={featured.results.slice(0, 4)} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Featured product ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">Featured</p>
            <h2 className="h2">Start with the playbook.</h2>
            <p className="lead">Everything I learned about making real websites fast, in one guide.</p>
          </div>
          <div data-reveal>
            <ProductCard item={featured} />
          </div>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="section">
        <div className="container">
          <div className="cta-band" data-reveal>
            <div className="cta-orbit" aria-hidden="true" />
            <h2 className="h2">Have a question before you buy?</h2>
            <p className="lead">
              Write to me at {SITE.email}. I usually reply {SITE.responseTime}.
            </p>
            <div className="btn-row">
              <Link href="/contact" className="btn btn-primary btn-lg">
                Contact me <ArrowRight />
              </Link>
              <a href={SITE.socials[0].href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-lg">
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
