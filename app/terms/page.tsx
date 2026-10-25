import type { Metadata } from "next";
import Link from "next/link";
import { ContactBlock, PolicyPage } from "@/components/PolicyPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and conditions for buying and using digital products from ${SITE.legalName}.`,
};

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      intro="These terms apply to anyone who visits this website or buys a digital product from it. Please read them before you buy."
    >
      <h2>1. About us</h2>
      <p>
        This website ({SITE.url.replace("https://", "")}) is owned and operated by <strong>{SITE.legalName}</strong>, an
        individual with a registered address in {SITE.address.city}, {SITE.address.state}, India (&ldquo;we&rdquo;, &ldquo;us&rdquo;,
        &ldquo;our&rdquo;). By using this website or buying a product, you (&ldquo;you&rdquo;, &ldquo;the
        buyer&rdquo;) agree to these terms.
      </p>

      <h2>2. Products</h2>
      <p>
        We sell digital educational products, such as guides delivered as Google Docs. Each product page describes what
        the product contains, its format and its price. No physical goods are sold or shipped.
      </p>

      <h2>3. Prices and payment</h2>
      <ul>
        <li>All prices are listed in Indian Rupees (₹, INR) and are the final amount you pay. There are no hidden charges.</li>
        <li>
          Payments are processed by <strong>Razorpay</strong> using UPI, cards, netbanking or wallets. We never see or
          store your card or bank details.
        </li>
        <li>An order is confirmed only when Razorpay reports the payment as successful.</li>
        <li>We may change prices for future purchases. A price change never affects a purchase you have already made.</li>
      </ul>

      <h2>4. Delivery</h2>
      <p>
        Products are delivered digitally by sharing view access to a Google Doc with the email address you enter at
        checkout. See the <Link href="/shipping-policy">Shipping & Delivery Policy</Link> for timelines and what to do
        if access doesn&apos;t arrive. You are responsible for entering a correct Google account email.
      </p>

      <h2>5. Licence and acceptable use</h2>
      <p>
        When you buy a product, you get a personal, non-exclusive, non-transferable licence to read and use it for your
        own learning and work. You may adapt the code snippets in your own projects, including commercial ones. You may
        not:
      </p>
      <ul>
        <li>share, resell, sublicense or publicly post the product or its access link;</li>
        <li>copy, download and redistribute the content, in full or in substantial part;</li>
        <li>share your access with people outside your purchase, for example a team or a group chat.</li>
      </ul>
      <p>We may remove access, without a refund, if these terms are broken.</p>

      <h2>6. Refunds and cancellations</h2>
      <p>
        Refunds and cancellations are covered by our <Link href="/refund-policy">Refund & Cancellation Policy</Link>,
        which forms part of these terms.
      </p>

      <h2>7. Intellectual property</h2>
      <p>
        All content on this website and in our products, including text, code examples, graphics and design, belongs to{" "}
        {SITE.legalName} unless stated otherwise, and is protected by Indian copyright law. Third-party names and
        trademarks mentioned belong to their owners.
      </p>

      <h2>8. Disclaimer</h2>
      <p>
        Our products share techniques and results from real projects for educational purposes. Results depend on your
        own codebase, infrastructure and traffic, so we do not guarantee any specific performance score, ranking or
        business outcome. Test changes before you deploy them to production.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the extent allowed by law, our total liability for any claim related to a product is limited to the amount you
        paid for that product. We are not liable for indirect or consequential losses, such as lost revenue or data.
      </p>

      <h2>10. Third-party services</h2>
      <p>
        We rely on Razorpay for payments and Google for document access and email. Your use of those services is also
        subject to their own terms and privacy policies.
      </p>

      <h2>11. Governing law</h2>
      <p>
        These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the
        courts in {SITE.address.city}, {SITE.address.state}.
      </p>

      <h2>12. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. The date at the top of this page shows when they last changed. The
        terms in force on the date of your purchase apply to that purchase.
      </p>

      <h2>13. Contact</h2>
      <ContactBlock />
    </PolicyPage>
  );
}
