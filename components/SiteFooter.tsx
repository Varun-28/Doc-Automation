import Link from "next/link";
import { CATALOG } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { Lock } from "./icons";

export const POLICIES = [
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "Refund & Cancellation" },
  { href: "/shipping-policy", label: "Shipping & Delivery" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand">
              <span className="brand-mark" aria-hidden="true">
                SS
              </span>
              {SITE.name}
            </Link>
            <p className="muted" style={{ marginTop: 14, maxWidth: 340 }}>
              Practical guides on web performance, React and Next.js, written from real production work.
            </p>
            <p className="muted" style={{ marginTop: 14 }}>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <br />
              <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>{SITE.phone}</a>
              <br />
              {SITE.address.city}, {SITE.address.state}, {SITE.address.country}
            </p>
          </div>
          <div>
            <p className="footer-title">Explore</p>
            <ul className="footer-links">
              <li>
                <Link href="/#about">About</Link>
              </li>
              <li>
                <Link href="/products">All products</Link>
              </li>
              <li>
                <Link href="/website-performance">Free website performance guide</Link>
              </li>
              {CATALOG.map((item) => (
                <li key={item.slug}>
                  <Link href={`/products/${item.slug}`}>{item.title.replace(/^The /, "")}</Link>
                </li>
              ))}
              <li>
                <Link href="/contact">Contact us</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="footer-title">Policies</p>
            <ul className="footer-links">
              {POLICIES.map((p) => (
                <li key={p.href}>
                  <Link href={p.href}>{p.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-title">Follow</p>
            <ul className="footer-links">
              {SITE.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {SITE.legalName}. All rights reserved.
          </span>
          <span className="payments-note">
            <Lock /> Payments are processed securely by Razorpay. Prices in INR (₹).
          </span>
        </div>
      </div>
    </footer>
  );
}
