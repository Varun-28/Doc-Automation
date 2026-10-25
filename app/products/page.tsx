import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { CATALOG } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Products",
  description: "Guides and digital products by Shilpe Saxena on web performance, React and Next.js.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero eyebrow="Products" title="Guides, docs and courses">
        <p className="lead">
          Practical, production-tested material for frontend developers. Pay once in INR through Razorpay and get access
          straight away on your Google account.
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
    </>
  );
}
