import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock, PolicyPage } from "@/components/PolicyPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: `How and when digital products from ${SITE.legalName} are delivered.`,
};

export default function ShippingPolicyPage() {
  return (
    <PolicyPage
      title="Shipping & Delivery Policy"
      intro="Everything we sell is digital. Nothing is shipped physically, and there are no shipping charges."
    >
      <h2>1. How products are delivered</h2>
      <p>
        After a successful payment, the product (a Google Doc) is shared with the <strong>email address you enter at
        checkout</strong>, with view-only access. You also receive an email from {SITE.name} with an <strong>Open</strong>{" "}
        button that takes you straight to it.
      </p>

      <h2>2. Delivery time</h2>
      <ul>
        <li>
          Delivery is automatic and usually takes <strong>under 5 minutes</strong> after the payment succeeds.
        </li>
        <li>
          In rare cases, such as a payment confirmation delay or an email problem, it can take up to{" "}
          <strong>24 hours</strong>.
        </li>
        <li>We deliver to buyers in India and worldwide. There are no shipping charges.</li>
      </ul>

      <h2>3. What you need</h2>
      <ul>
        <li>
          A <strong>Google account email</strong> (Gmail, or a work or school account that uses Google). Google Docs can
          only be opened by the account they are shared with.
        </li>
        <li>A browser or the Google Docs app. Sign in with the same Google account you entered at checkout.</li>
      </ul>

      <h2>4. Didn&apos;t receive access?</h2>
      <ol style={{ paddingLeft: 22, display: "grid", gap: 8, marginTop: 12 }}>
        <li className="muted">Check your spam and Promotions folders for the email from {SITE.name}.</li>
        <li className="muted">
          Open <a href="https://drive.google.com/drive/shared-with-me">Google Drive → Shared with me</a> while signed in
          to the email you used at checkout.
        </li>
        <li className="muted">
          Still nothing after 24 hours, or you entered the wrong email? Write to{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> with your Razorpay payment ID. We&apos;ll share the product
          with the correct Google account, usually within a few hours.
        </li>
      </ol>
      <p style={{ marginTop: 12 }}>
        If we can&apos;t deliver access, you get a full refund as described in the{" "}
        <Link href="/refund-policy">Refund & Cancellation Policy</Link>.
      </p>

      <h2>5. Updates</h2>
      <p>
        When a product is updated, the new edition appears in the same Google Doc at no extra cost, as long as the product
        is available.
      </p>

      <h2>6. Contact</h2>
      <ContactBlock />
    </PolicyPage>
  );
}
