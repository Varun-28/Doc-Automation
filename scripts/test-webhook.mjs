// Usage: npm run test:webhook -- <email> [url] [--amount=<paise>] [--bad-signature]
// --amount defaults to 77700 (₹777); use a product's amountPaise from products.ts.
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

function loadEnvLocal() {
  const file = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return {};
  const env = {};
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m) continue;
    let value = m[2];
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    env[m[1]] = value;
  }
  return env;
}

const args = process.argv.slice(2);
const badSignature = args.includes("--bad-signature");
const [email, url = "http://localhost:3000/api/razorpay-webhook"] = args.filter((a) => !a.startsWith("--"));

if (!email) {
  console.error("Usage: npm run test:webhook -- <email> [url] [--amount=<paise>] [--bad-signature]");
  process.exit(1);
}

const env = { ...loadEnvLocal(), ...process.env };
const secret = env.RAZORPAY_WEBHOOK_SECRET;
if (!secret) {
  console.error("RAZORPAY_WEBHOOK_SECRET is not set in .env.local or the environment");
  process.exit(1);
}
const amountArg = args.find((a) => a.startsWith("--amount="));
const amount = Number(amountArg ? amountArg.split("=")[1] : 77700);

const paymentId = `pay_test_${Date.now()}`;
const payload = {
  entity: "event",
  account_id: "acc_test",
  event: "payment.captured",
  contains: ["payment"],
  payload: {
    payment: {
      entity: {
        id: paymentId,
        entity: "payment",
        amount,
        currency: "INR",
        status: "captured",
        method: "upi",
        captured: true,
        email,
        contact: "+919999999999",
        notes: { email },
        created_at: Math.floor(Date.now() / 1000),
      },
    },
  },
  created_at: Math.floor(Date.now() / 1000),
};

const body = JSON.stringify(payload);
const signature = badSignature
  ? "0".repeat(64)
  : crypto.createHmac("sha256", secret).update(body).digest("hex");

console.log(`POST ${url} (payment ${paymentId}, amount ${amount}, email ${email}${badSignature ? ", BAD signature" : ""})`);
const res = await fetch(url, {
  method: "POST",
  headers: { "content-type": "application/json", "x-razorpay-signature": signature },
  body,
});
console.log(res.status, await res.text());
