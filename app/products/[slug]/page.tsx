import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blobs, BookCover, ImpactBars } from "@/components/Graphics";
import { ArrowRight, Bolt, Check, Doc, Lock, Mail, Refresh } from "@/components/icons";
import { CATALOG, formatPrice, getCatalogItem } from "@/lib/catalog";
import { SITE } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATALOG.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) return {};
  return { title: item.title, description: item.tagline };
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) notFound();

  const price = formatPrice(item.priceRupees);
  const lastIndex = item.contents.length - 1;

  return (
    <>
      {/* ---------- Hero + buy box ---------- */}
      <section className="hero">
        <Blobs grid />
        <div className="container detail-hero-grid">
          <div className="hero-enter">
            <nav aria-label="Breadcrumb" className="muted" style={{ fontSize: "0.9rem", marginBottom: 18 }}>
              <Link href="/products">Products</Link> / <span>{item.title.replace(/^The /, "")}</span>
            </nav>
            <span className="badge">{item.kicker}</span>
            <h1 className="h1" style={{ fontSize: "clamp(2.2rem, 5vw, 3.6rem)", marginTop: 14 }}>
              {item.title.replace(/Playbook$/, "")}
              <span className="gradient-text">Playbook</span>
            </h1>
            <p className="lead">{item.tagline}</p>
            <p className="muted" style={{ marginTop: 14 }}>
              {item.description}
            </p>

            <div className="card buy-box" id="buy">
              <div className="price">
                {price}
                <small>one-time payment · INR</small>
              </div>
              <a href={item.paymentUrl} className="btn btn-primary btn-lg" rel="noopener">
                Buy now for {price} <ArrowRight />
              </a>
              <ul className="plain buy-meta">
                <li>
                  <Bolt /> Delivered to your Google account within minutes
                </li>
                <li>
                  <Refresh /> Free future editions in the same doc
                </li>
                <li>
                  <Lock /> Secure checkout by Razorpay: UPI, cards, netbanking, wallets
                </li>
              </ul>
              <p className="fine-print">
                By buying, you agree to the <Link href="/terms">Terms & Conditions</Link>,{" "}
                <Link href="/refund-policy">Refund & Cancellation Policy</Link> and{" "}
                <Link href="/shipping-policy">Shipping & Delivery Policy</Link>.
              </p>
            </div>
          </div>
          <div className="book-stage">
            <BookCover />
          </div>
        </div>
      </section>

      {/* ---------- Who it's for / what you get ---------- */}
      <section className="section section-alt">
        <div className="container grid-2">
          <div className="card" data-reveal>
            <p className="eyebrow">Who it&apos;s for</p>
            <ul className="plain check-list">
              {item.audience.map((a) => (
                <li key={a}>
                  <Check /> <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card" data-reveal style={{ "--delay": "0.1s" } as CSSProperties}>
            <p className="eyebrow">What you get</p>
            <ul className="plain check-list">
              {item.includes.map((a) => (
                <li key={a}>
                  <Check /> <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Contents ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <p className="eyebrow">What&apos;s inside</p>
            <h2 className="h2">22 sections, plus ready-to-use helpers.</h2>
            <p className="lead">Each topic follows the same shape: the problem, why it happens, the fix, and code you can adapt.</p>
          </div>
          <ol className="plain toc">
            {item.contents.map((c, i) => (
              <li
                key={c}
                className={i === lastIndex ? "appendix" : undefined}
                data-reveal
                style={{ "--delay": `${(i % 6) * 0.04}s` } as CSSProperties}
              >
                {c}
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Results ---------- */}
      <section className="section section-alt">
        <div className="container grid-2" style={{ alignItems: "center" }}>
          <div data-reveal>
            <p className="eyebrow">Real numbers</p>
            <h2 className="h2">Fixes measured in production.</h2>
            <p className="lead">
              Every fix in the playbook shipped to a real e-commerce site and was measured before and after. Here are six
              of them.
            </p>
          </div>
          <div className="card" data-reveal>
            <ImpactBars results={item.results} />
          </div>
        </div>
      </section>

      {/* ---------- Delivery ---------- */}
      <section className="section">
        <div className="container">
          <div className="section-head center" data-reveal>
            <p className="eyebrow">How delivery works</p>
            <h2 className="h2">Pay, then open it in minutes.</h2>
          </div>
          <div className="steps">
            <div className="card step" data-reveal>
              <h3 className="h3">Pay securely</h3>
              <p>
                Click <strong>Buy now</strong> and pay {price} on Razorpay. Enter your <strong>Gmail or Google account email</strong>.
              </p>
            </div>
            <div className="card step" data-reveal style={{ "--delay": "0.1s" } as CSSProperties}>
              <h3 className="h3">Access is shared</h3>
              <p>The Google Doc is shared with that email as view-only, usually within 5 minutes.</p>
            </div>
            <div className="card step" data-reveal style={{ "--delay": "0.2s" } as CSSProperties}>
              <h3 className="h3">Open and read</h3>
              <p>
                You get an email with an <strong>Open</strong> button. Future editions appear in the same doc for free.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-head center" data-reveal>
            <p className="eyebrow">FAQ</p>
            <h2 className="h2">Questions, answered.</h2>
          </div>
          <div className="faq">
            {item.faqs.map((f) => (
              <details key={f.q} data-reveal>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="section">
        <div className="container">
          <div className="cta-band" data-reveal>
            <div className="cta-orbit" aria-hidden="true" />
            <h2 className="h2">Skip six months of trial and error.</h2>
            <p className="lead">
              {item.title} · {price}, one-time. Questions first? Email{" "}
              <a href={`mailto:${SITE.email}`} style={{ color: "#fff" }}>
                {SITE.email}
              </a>
              .
            </p>
            <div className="btn-row">
              <a href={item.paymentUrl} className="btn btn-primary btn-lg" rel="noopener">
                Buy now for {price} <ArrowRight />
              </a>
              <Link href="/contact" className="btn btn-ghost btn-lg">
                <Mail /> Contact
              </Link>
            </div>
            <p style={{ marginTop: 18, fontSize: "0.85rem", color: "rgb(255 255 255 / 0.7)", display: "flex", gap: 8, alignItems: "center" }}>
              <Doc style={{ width: 16, height: 16 }} /> {item.format}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
