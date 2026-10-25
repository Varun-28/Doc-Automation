import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { google } from "googleapis";
import { findProductByAmount, type Product } from "@/products";
import { sendAccessEmail } from "@/lib/mailer";

export const runtime = "nodejs";

const {
  RAZORPAY_WEBHOOK_SECRET,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
} = process.env;

function verifySignature(rawBody: string, signature: string | null): boolean {
  if (!signature || !RAZORPAY_WEBHOOK_SECRET) return false;
  const expected = crypto.createHmac("sha256", RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function getDrive() {
  const auth = new google.auth.JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/drive"],
  });
  return google.drive({ version: "v3", auth });
}

type Drive = ReturnType<typeof getDrive>;

async function hasAccess(drive: Drive, fileId: string, email: string): Promise<boolean> {
  let pageToken: string | undefined;
  do {
    const res = await drive.permissions.list({
      fileId,
      fields: "nextPageToken, permissions(emailAddress)",
      pageSize: 100,
      pageToken,
    });
    if (res.data.permissions?.some((p) => p.emailAddress?.toLowerCase() === email)) return true;
    pageToken = res.data.nextPageToken ?? undefined;
  } while (pageToken);
  return false;
}

async function share(drive: Drive, product: Product, email: string, notify: boolean) {
  await drive.permissions.create({
    fileId: product.docId,
    sendNotificationEmail: notify,
    ...(notify && {
      emailMessage: `Thanks for purchasing ${product.name}! Open this doc while signed in to this Google account. Access is personal to you.`,
    }),
    requestBody: { type: "user", role: "reader", emailAddress: email },
    fields: "id",
  });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  if (!verifySignature(rawBody, req.headers.get("x-razorpay-signature"))) {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }
  const event = JSON.parse(rawBody);
  if (event.event !== "payment.captured") return NextResponse.json({ ignored: event.event });

  const payment = event.payload?.payment?.entity;
  console.log("payment.captured", payment?.id, payment?.amount, payment?.method);

  const product = findProductByAmount(payment?.amount);
  if (!product) {
    console.error("No product for amount", payment?.amount, "payment", payment?.id);
    return NextResponse.json({ ignored: "no product for this amount" });
  }

  const email: string | undefined = (payment?.email || payment?.notes?.email)?.trim().toLowerCase();
  if (!email) {
    console.error("No buyer email on payment", payment?.id);
    return NextResponse.json({ error: "no email" });
  }

  try {
    const drive = getDrive();
    // Skip buyers who already have access: re-sharing makes Google re-send its
    // invite email, e.g. on Razorpay webhook retries.
    if (await hasAccess(drive, product.docId, email)) {
      console.log("Already has access", email, "product", product.name, "payment", payment.id);
      return NextResponse.json({ ok: true, alreadyShared: true });
    }

    // Share silently and send our own branded email. Google's own invite email
    // is the fallback: Drive requires it for non-Google addresses, and we use
    // it if our email fails so the buyer always hears about their purchase.
    let notifiedByGoogle = false;
    try {
      await share(drive, product, email, false);
    } catch (err: any) {
      console.warn("Silent share failed, retrying with Google notification", { email, error: err?.message });
      await share(drive, product, email, true);
      notifiedByGoogle = true;
    }
    console.log("Shared doc with", email, "product", product.name, "payment", payment.id);

    if (!notifiedByGoogle) {
      try {
        await sendAccessEmail(email, product);
        console.log("Emailed", email, "product", product.name);
      } catch (err: any) {
        console.error("Purchase email failed, falling back to Google notification", { email, error: err?.message });
        await share(drive, product, email, true);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Drive share failed", { email, product: product.name, paymentId: payment?.id, error: err?.message });
    return NextResponse.json({ error: "share failed" }, { status: 500 });
  }
}
