import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { google } from "googleapis";

export const runtime = "nodejs";

const {
  RAZORPAY_WEBHOOK_SECRET,
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_DOC_ID,
  PRODUCT_AMOUNT_PAISE,
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
  console.log("payment.captured", JSON.stringify(payment));

  if (PRODUCT_AMOUNT_PAISE && String(payment?.amount) !== PRODUCT_AMOUNT_PAISE) {
    return NextResponse.json({ ignored: "different product/amount" });
  }

  const email: string | undefined = (payment?.email || payment?.notes?.email)?.trim().toLowerCase();
  if (!email) {
    console.error("No buyer email on payment", payment?.id);
    return NextResponse.json({ error: "no email" });
  }

  try {
    await getDrive().permissions.create({
      fileId: GOOGLE_DOC_ID!,
      sendNotificationEmail: true,
      emailMessage: "Thanks for your purchase! Open this doc while signed in to this Google account. Access is personal to you.",
      requestBody: { type: "user", role: "reader", emailAddress: email },
      fields: "id",
    });
    console.log("Shared doc with", email, "payment", payment.id);
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error("Drive share failed", { email, paymentId: payment?.id, error: err?.message });
    return NextResponse.json({ error: "share failed" }, { status: 500 });
  }
}
