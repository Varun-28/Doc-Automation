import type { Metadata } from "next";
import { ContactBlock, PolicyPage } from "@/components/PolicyPage";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.legalName} collects, uses and protects your personal information.`,
};

export default function PrivacyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="We collect only what we need to deliver your purchase and support you. This page explains what that is and how we handle it."
    >
      <h2>1. Who we are</h2>
      <p>
        This website is operated by <strong>{SITE.legalName}</strong>, {SITE.address.city}, {SITE.address.state}, India.
        This policy follows the Information Technology Act, 2000 and the Digital Personal Data Protection Act, 2023.
      </p>

      <h2>2. What we collect</h2>
      <ul>
        <li>
          <strong>At checkout (through Razorpay):</strong> your email address, phone number, the amount paid and the
          payment ID. Card, UPI and bank details are handled by Razorpay and are never shared with us.
        </li>
        <li>
          <strong>When you contact us:</strong> your name, email address and anything you choose to include in your
          message.
        </li>
        <li>
          <strong>When you browse:</strong> this website doesn&apos;t use analytics, advertising or tracking cookies. It
          stores only your light/dark theme choice in your browser&apos;s local storage. Our hosting provider (Vercel)
          may keep standard server logs, such as IP address and browser type, for security.
        </li>
      </ul>

      <h2>3. How we use it</h2>
      <ul>
        <li>To deliver your purchase: we share the Google Doc with the email you entered at checkout.</li>
        <li>To send you an email confirming your purchase, with a link to open the product.</li>
        <li>To answer support requests and process refunds.</li>
        <li>To meet legal, tax and accounting obligations.</li>
      </ul>
      <p>We do not sell, rent or trade your personal information, and we do not send marketing emails without your consent.</p>

      <h2>4. Who we share it with</h2>
      <ul>
        <li>
          <strong>Razorpay</strong>, to process payments.
        </li>
        <li>
          <strong>Google</strong> (Google Drive and Gmail), to share the document with you and send your purchase email.
        </li>
        <li>
          <strong>Vercel</strong>, which hosts this website.
        </li>
        <li>Government authorities, only when the law requires it.</li>
      </ul>

      <h2>5. How long we keep it</h2>
      <p>
        We keep purchase records (email, payment ID, amount and date) for as long as you have access to the product and
        as long as tax and accounting laws require, typically up to 8 years. Support emails are deleted when they are no
        longer needed.
      </p>

      <h2>6. Security</h2>
      <p>
        The website is served over HTTPS. Payments are handled by Razorpay, which is PCI-DSS compliant. Access to purchase
        data is limited to the seller.
      </p>

      <h2>7. Your rights</h2>
      <p>
        You can ask us to access, correct or delete your personal information, or withdraw consent, by emailing{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Deleting your data also removes your access to products you
        bought. We will reply within 30 days.
      </p>

      <h2>8. Children</h2>
      <p>Our products are meant for adults. We do not knowingly collect data from children under 18.</p>

      <h2>9. Changes</h2>
      <p>We may update this policy. The date at the top of the page shows when it last changed.</p>

      <h2>10. Contact and grievance officer</h2>
      <p>For privacy questions or complaints, contact:</p>
      <ContactBlock />
    </PolicyPage>
  );
}
