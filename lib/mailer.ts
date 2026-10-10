import nodemailer from "nodemailer";
import { SELLER_NAME, type Product } from "@/products";

const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

function docUrl(docId: string) {
  return `https://docs.google.com/document/d/${docId}/edit`;
}

export async function sendAccessEmail(to: string, product: Product) {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) throw new Error("GMAIL_USER / GMAIL_APP_PASSWORD not set");

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
  const url = docUrl(product.docId);

  await transporter.sendMail({
    from: `"${SELLER_NAME}" <${GMAIL_USER}>`,
    to,
    subject: `Your ${product.name} is ready`,
    text: [
      `Hi,`,
      ``,
      `Thanks for purchasing ${product.name}! Your copy is ready:`,
      url,
      ``,
      `Open it while signed in to this Google account (${to}). Access is personal to you.`,
      ``,
      `Any trouble opening it? Just reply to this email.`,
      ``,
      `— ${SELLER_NAME}`,
    ].join("\n"),
    html: `
      <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#1f2937;line-height:1.5">
        <h2 style="margin:0 0 16px">Thanks for your purchase!</h2>
        <p>Your <strong>${product.name}</strong> is ready.</p>
        <p style="margin:24px 0">
          <a href="${url}" style="background:#1a73e8;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;display:inline-block;font-weight:bold">Open ${product.name}</a>
        </p>
        <p>Open it while signed in to this Google account (<strong>${to}</strong>). Access is personal to you.</p>
        <p style="color:#6b7280;font-size:14px">Any trouble opening it? Just reply to this email.</p>
        <p>— ${SELLER_NAME}</p>
      </div>`,
  });
}
