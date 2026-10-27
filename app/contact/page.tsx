import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { Clock, Mail, Phone } from "@/components/icons";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact ${SITE.legalName} about purchases, access to a guide, refunds or anything else.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact us" title="Get in touch">
        <p className="lead">
          Questions about a product, trouble opening your doc, or a refund request? Write to us and we&apos;ll reply{" "}
          {SITE.responseTime}.
        </p>
      </PageHero>
      <section className="section">
        <div className="container">
          <div className="contact-grid">
            <div className="card contact-card" data-reveal>
              <span className="focus-icon">
                <Mail />
              </span>
              <div>
                <h2 className="h3">Email</h2>
                <p className="muted" style={{ margin: "4px 0 8px" }}>
                  Best for orders, access and refunds. Include your Razorpay payment ID if you have one.
                </p>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </div>
            </div>
            <div className="card contact-card" data-reveal style={{ "--delay": "0.08s" } as CSSProperties}>
              <span className="focus-icon">
                <Phone />
              </span>
              <div>
                <h2 className="h3">Phone</h2>
                <p className="muted" style={{ margin: "4px 0 8px" }}>
                  Call or WhatsApp during support hours.
                </p>
                <a href={`tel:${SITE.phone.replace(/[^+\d]/g, "")}`}>{SITE.phone}</a>
              </div>
            </div>
            <div className="card contact-card" data-reveal style={{ "--delay": "0.16s" } as CSSProperties}>
              <span className="focus-icon">
                <Clock />
              </span>
              <div>
                <h2 className="h3">Support hours</h2>
                <p className="muted" style={{ marginTop: 4 }}>
                  {SITE.supportHours}
                  <br />
                  Emails sent outside these hours are answered the next working day.
                </p>
              </div>
            </div>
          </div>

          <div className="card" style={{ marginTop: 24 }} data-reveal>
            <h2 className="h3">Before you write</h2>
            <ul className="prose" style={{ margin: "12px 0 0", maxWidth: "none" }}>
              <li>
                <strong>Didn&apos;t get access?</strong> Check spam for the email from {SITE.name}, and open the doc while
                signed in to the Google account you entered at checkout. See the{" "}
                <Link href="/shipping-policy">Shipping & Delivery Policy</Link>.
              </li>
              <li>
                <strong>Refunds and cancellations:</strong> see the{" "}
                <Link href="/refund-policy">Refund & Cancellation Policy</Link>.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
