import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Blobs } from "@/components/Graphics";
import { Check, Clock, Doc, Mail } from "@/components/icons";
import { SITE } from "@/lib/site";

// Razorpay's Payment Page sends buyers here after a successful payment
// ("Redirect URL" in the page's success settings).
export const metadata: Metadata = {
  title: "Payment successful",
  robots: { index: false, follow: false },
};

const STEPS = [
  {
    icon: Mail,
    title: "Check your inbox",
    body: (
      <>
        Within about 5 minutes you&apos;ll get an email from <strong>{SITE.name}</strong> ({SITE.email}) with an{" "}
        <strong>Open</strong> button, sent to the email you entered at checkout.
      </>
    ),
  },
  {
    icon: Clock,
    title: "Not there? Check Spam and Promotions",
    body: (
      <>
        If it&apos;s in Spam, open it and click <strong>Report not spam</strong> so the link works and future updates
        reach your inbox.
      </>
    ),
  },
  {
    icon: Doc,
    title: "Or open it from Google Drive",
    body: (
      <>
        Signed in to the same Google account, go to{" "}
        <a href="https://drive.google.com/drive/shared-with-me" target="_blank" rel="noopener noreferrer">
          Drive → Shared with me
        </a>
        . The doc is there too.
      </>
    ),
  },
];

export default function ThankYouPage() {
  return (
    <section className="hero">
      <Blobs grid />
      <div className="container" style={{ maxWidth: 760 }}>
        <div className="hero-enter" style={{ textAlign: "center" }}>
          <span className="success-badge" aria-hidden="true">
            <Check />
          </span>
          <h1 className="h1" style={{ fontSize: "clamp(2.1rem, 5vw, 3.2rem)", marginTop: 20 }}>
            Payment successful. <span className="gradient-text">Thank you!</span>
          </h1>
          <p className="lead">Your playbook is on its way. Here&apos;s how to find it.</p>
        </div>

        <ol className="plain" style={{ display: "grid", gap: 14, marginTop: 36 }}>
          {STEPS.map((s, i) => (
            <li
              key={s.title}
              className="card focus-item"
              data-reveal
              style={{ "--delay": `${i * 0.08}s` } as CSSProperties}
            >
              <span className="focus-icon">
                <s.icon />
              </span>
              <div>
                <h2 className="h3">{s.title}</h2>
                <p>{s.body}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="callout" data-reveal>
          <p>
            <strong>Nothing after 24 hours, or used the wrong email?</strong> Write to{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your Razorpay payment ID (it&apos;s in the receipt
            Razorpay emailed you), and we&apos;ll share the doc with the right Google account.
          </p>
        </div>

        <div className="btn-row" style={{ justifyContent: "center" }}>
          <Link href="/products" className="btn btn-ghost">
            Browse more products
          </Link>
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
