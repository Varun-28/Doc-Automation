import Link from "next/link";
import { formatPrice, type CatalogEntry } from "@/lib/catalog";
import { BookCover } from "./Graphics";
import { ArrowRight } from "./icons";

export function ProductCard({ item }: { item: CatalogEntry }) {
  const href = `/products/${item.slug}`;
  return (
    <article className="card product-card">
      <div className="product-cover">
        <BookCover small />
      </div>
      <div>
        <span className="badge">{item.kicker}</span>
        <h3 style={{ marginTop: 12 }}>
          <Link href={href} style={{ textDecoration: "none" }}>
            {item.title}
          </Link>
        </h3>
        <p className="tagline">{item.tagline}</p>
        <p className="muted" style={{ marginTop: 8, fontSize: "0.9rem" }}>
          {item.format}
        </p>
        <div className="price-row">
          <span className="price">
            {formatPrice(item.priceRupees)}
            <small>one-time payment</small>
          </span>
          <Link href={href} className="btn btn-primary">
            View details <ArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}
