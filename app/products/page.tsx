import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { FreeGuideCard } from "@/components/FreeGuideCard";
import { CATALOG } from "@/lib/catalog";
import { FREE_GUIDES } from "@/lib/free-guides";

export const metadata: Metadata = {
  title: "Products",
  description: "Guides and digital products by Shilpe Saxena on web performance, React and Next.js.",
  alternates: { canonical: "/products" },
};

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title="Guides, docs and courses">
        <p className="lead">
          Practical, production-tested material for frontend developers. Paid products are a one-time payment in INR
          through Razorpay, with instant access on your Google account. There are free guides to read too.
        </p>
      </PageHero>
      <section className="section">
        <div className="container" style={{ display: "grid", gap: 24 }}>
          {CATALOG.map((item) => (
            <div key={item.slug} data-reveal>
              <ProductCard item={item} />
            </div>
          ))}
        </div>
      </section>
      {FREE_GUIDES.length > 0 && (
        <section className="section section-alt" aria-labelledby="free-guides-heading">
          <div className="container">
            <div className="section-head" data-reveal>
              <h2 id="free-guides-heading">Free guides</h2>
              <p className="lead">Open to everyone. No payment or sign-in needed, just click and read.</p>
            </div>
            <ul className="grid-2" style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {FREE_GUIDES.map((guide) => (
                <li key={guide.id} data-reveal style={{ minWidth: 0 }}>
                  <FreeGuideCard guide={guide} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
