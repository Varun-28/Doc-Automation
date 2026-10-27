import type { Metadata } from "next";
import { ContactBlock, PolicyPage } from "@/components/PolicyPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy",
  description: `When ${SITE.legalName} offers refunds and cancellations for digital products, and how to request one.`,
  alternates: { canonical: "/refund-policy" },
};

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund & Cancellation Policy"
      intro="Our products are digital and delivered within minutes, so this policy explains when a refund applies and how quickly it's processed."
    >
      <h2>1. Digital products</h2>
      <p>
        Every product on this website is a digital product (for example, a guide shared as a Google Doc). Access is
        delivered to your Google account within minutes of payment, and the content can be read as soon as it&apos;s
        delivered. Because of this, <strong>purchases are generally final once access has been delivered</strong>.
      </p>

      <h2>2. When you get a full refund</h2>
      <p>We refund the full amount you paid if:</p>
      <ul>
        <li>
          <strong>You were charged more than once</strong> for the same product (a duplicate payment).
        </li>
        <li>
          <strong>We could not deliver access</strong>: you paid, but access wasn&apos;t delivered within 48 hours and we
          couldn&apos;t fix it after you contacted us.
        </li>
        <li>
          <strong>The product is materially different</strong> from its description on the product page, and you report
          it within 7 days of purchase.
        </li>
        <li>Money was deducted from your account but the payment failed. These are usually reversed automatically by your bank or Razorpay within 5–7 working days.</li>
      </ul>

      <h2>3. When refunds aren&apos;t given</h2>
      <ul>
        <li>You changed your mind after access was delivered.</li>
        <li>
          You entered the wrong email address. Instead, write to us and we&apos;ll share the product with the correct
          Google account at no cost.
        </li>
        <li>Access was removed because the Terms & Conditions were broken (for example, sharing or reselling the product).</li>
      </ul>

      <h2>4. Cancellations</h2>
      <p>
        Because delivery is automatic and happens within minutes, an order can&apos;t be cancelled after the payment is
        successful. If you paid by mistake and haven&apos;t opened the product yet, email us within 24 hours and we will
        cancel the order and refund it in full.
      </p>

      <h2>5. How to request a refund</h2>
      <p>
        Email <a href={`mailto:${SITE.email}`}>{SITE.email}</a> within <strong>7 days</strong> of your purchase with:
      </p>
      <ul>
        <li>the Razorpay payment ID (from your payment confirmation) or the date and amount paid;</li>
        <li>the email address you entered at checkout;</li>
        <li>the reason for the request.</li>
      </ul>
      <p>We reply within 24 hours on working days and decide on every request within 3 working days.</p>

      <h2>6. Refund timeline</h2>
      <p>
        Approved refunds are issued through Razorpay to the <strong>original payment method</strong> within 2 working days
        of approval. Your bank or card issuer usually credits it within <strong>5–7 working days</strong> after that.
        Access to the product is removed once a refund is issued.
      </p>

      <h2>7. Contact</h2>
      <ContactBlock />
    </PolicyPage>
  );
}
