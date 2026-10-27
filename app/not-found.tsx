import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="section">
      <div className="container" style={{ textAlign: "center", maxWidth: 560 }}>
        <p className="eyebrow">404</p>
        <h1 className="h2">This page doesn&apos;t exist.</h1>
        <p className="lead">The link may be old or mistyped.</p>
        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/products" className="btn btn-ghost">
            See products
          </Link>
        </div>
      </div>
    </section>
  );
}
