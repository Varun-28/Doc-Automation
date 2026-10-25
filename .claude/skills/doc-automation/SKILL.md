---
name: doc-automation
description: Everything about the Doc-Automation app — a Next.js webhook on Vercel that shares paid Google Docs with Razorpay buyers. Use when adding a product, changing a price, redeploying, testing the webhook, debugging a buyer who didn't get access, rotating secrets, or moving Razorpay from Test to Live mode.
---

# Doc-Automation

Sells view access to Google Docs. A buyer pays on a Razorpay Payment Page, and Razorpay sends a `payment.captured` webhook to this app. The app finds the product by the amount paid, uses a Google service account to share that product's Doc with the buyer's email as a **reader** (silently), then sends its own branded email from **"Shilpe Saxena" <sketchandtech@gmail.com>** through Gmail SMTP.

```
Buyer → Razorpay Payment Page (fixed, unique price) → webhook payment.captured
      → Vercel: POST /api/razorpay-webhook
          1. verify HMAC-SHA256 signature (x-razorpay-signature)
          2. ignore events other than payment.captured (order.paid also arrives and is ignored)
          3. product = PRODUCTS entry whose amountPaise == payment.amount (none → ignored)
          4. email = payment.email || payment.notes.email (trimmed, lowercased)
          5. buyer already has access → stop (no email; covers webhook retries)
          6. Drive permissions.create(reader, sendNotificationEmail: false)
             (if that fails, e.g. non-Google address → share with Google's notification instead)
          7. send branded email via Gmail (lib/mailer.ts)
             (if that fails → re-share with Google's notification as fallback)
```

**Never commit or print secrets.** The webhook secret and the private key live only in `.env.local` (gitignored) and in Vercel env vars.

## Key facts

| Thing | Value |
|---|---|
| GitHub repo | `Varun-28/Doc-Automation`, branch `main`. The remote uses the SSH alias `git@github-personal:...` |
| Vercel project | `varun28s-projects/doc-automation`, account `varun-28`, connected to GitHub (push to `main` = production deploy) |
| Production URL | `https://doc-automation-nine.vercel.app` |
| Webhook URL (paste into Razorpay) | `https://doc-automation-nine.vercel.app/api/razorpay-webhook` |
| Health check | `GET` on the webhook URL returns `{"status":"ok"}` |
| Google service account | `doc-seller@doc-sales-511007.iam.gserviceaccount.com` (GCP project `doc-sales-511007`) |
| Service account key file | `~/Downloads/doc-sales-511007-b21ea6e2229f.json` (outside the repo; keep it safe) |
| Razorpay merchant | Merchant ID `TlKZQkNsqbFOhJ`, account name "SHILPE SAXENA", login `sketchandtech@gmail.com` |
| Products | In `products.ts` (see below) |
| Webhook secret | In `.env.local` as `RAZORPAY_WEBHOOK_SECRET` and in Razorpay → Account & Settings → Webhooks |
| Git identity for this repo | `Varun-28 <28varun28pp@gmail.com>` (set in the repo's `.git/config`) |

### Current products

| Product | Price | Google Doc ID | Razorpay Payment Page |
|---|---|---|---|
| Website Performance Doc | ₹299 (`29900`) | `1VVZLUNgZxbM3STNlFD6luPpei2iN2n2QJOMsNugQ3dk` | Test: `pl_TlROtbwCoCde4s`, `https://rzp.io/rzp/4dQSsiD` |

## Files

- `products.ts`: **the single place to configure products** (`name`, `amountPaise`, `docId`) and `SELLER_NAME` (the email sender name). It throws an error if two products share a price.
- `lib/mailer.ts`: the purchase email (nodemailer + Gmail App Password). Subject "Your <product> is ready" with an Open button. Edit the wording here.
- `app/api/razorpay-webhook/route.ts`: the webhook. `GET` is the health check and `POST` is the webhook. It declares `export const runtime = "nodejs"`.
- `scripts/test-webhook.mjs`: sends a signed fake `payment.captured`. It reads `RAZORPAY_WEBHOOK_SECRET` from `.env.local`. The amount comes from `--amount=<paise>`; the default is 29900.
- `next.config.ts`: `cacheComponents: false`. This is required, because Next 16.4 enables Cache Components by default, and Cache Components rejects the `runtime` segment config with a build error.
- `.env.example`: the secret keys. `.env.local` holds the real values; the Vercel CLI also adds a `VERCEL_OIDC_TOKEN` there.
- `.gitignore`: ignores `.env*` except `.env.example`, and ignores `service-account*.json`, `*-key.json`, `*credentials*.json` and `.vercel`.
- `AGENTS.md`: `next dev` regenerates it. It warns that Next 16 differs from training data, so check `node_modules/next/dist/docs/` before changing Next APIs.

## Environment variables

These are set in `.env.local` and in Vercel **production**:

| Var | Notes |
|---|---|
| `RAZORPAY_WEBHOOK_SECRET` | Must match the secret set on the Razorpay webhook exactly |
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the key JSON |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the key JSON. `.env.local` stores it with literal `\n` inside quotes; Vercel stores it with real newlines. The code handles both |
| `GMAIL_USER` | `sketchandtech@gmail.com`, the account the purchase email is sent from |
| `GMAIL_APP_PASSWORD` | A 16-character Google App Password named "Doc Automation" (myaccount.google.com/apppasswords; it needs 2-Step Verification). Revoke it there to stop email. If it's missing or wrong, buyers get Google's plain invite email instead |

A change to a Vercel env var only takes effect after a **new deployment**. Doc IDs and prices are not env vars; they live in `products.ts`.

## Why products are matched by price

The real Razorpay `payment.captured` payload from a Payment Page has **no page ID**. `description` and `receipt` are null, and `notes` only holds the form fields (`email`, `phone`). `order.paid` doesn't have one either. The only reliable way to tell products apart is the amount, so **every product must have a unique price** (even ₹1 apart is enough), and each page must use a fixed amount with no quantity.

## Common tasks

### Add a new product
1. Create the Google Doc and share it with `doc-seller@doc-sales-511007.iam.gserviceaccount.com` as an **Editor**, with "Notify people" unticked.
2. Create a Razorpay Payment Page:
   - one Price field with a **fixed, unique** amount and no quantity
   - the email field **required**, labelled "Gmail / Google account email"
   - the description, terms and success message copied from an existing page
3. Add an entry to `PRODUCTS` in `products.ts` with `name`, `amountPaise` (₹ × 100) and `docId`.
4. Run `npm run build`, then commit and push to `main`. Vercel auto-deploys.
5. Test it: `npm run test:webhook -- me@gmail.com https://doc-automation-nine.vercel.app/api/razorpay-webhook --amount=<paise>` should return `{"ok":true}`.

No Razorpay webhook change is needed. Webhooks are per account and mode, and they fire for every page.

### Change a product's price
Change the fixed amount on its Razorpay page **and** `amountPaise` in `products.ts`, then push. Until both match, payments are ignored with `{"ignored":"no product for this amount"}`.

### Test locally
```sh
npm run dev
npm run test:webhook -- someone@gmail.com                         # expect 200 {"ok":true}
npm run test:webhook -- someone@gmail.com --amount=12345          # expect {"ignored":"no product for this amount"}
npm run test:webhook -- someone@gmail.com --bad-signature         # expect 401
```

### Test production
```sh
U=https://doc-automation-nine.vercel.app/api/razorpay-webhook
curl -s $U                                                        # {"status":"ok"}
npm run test:webhook -- someone@gmail.com $U --amount=29900
vercel logs --environment production --since 10m --expand | grep -E "Shared doc|share failed|No product|No buyer"
```
Logs can lag by 10–20 seconds. The test really shares the Doc and emails that address, so use your own addresses. Addresses that already have access are skipped.

### Real test payment through Razorpay (Test Mode)
Open the page and pay with the domestic test card **`4100 2800 0000 1007`**, any future expiry, any CVV and OTP `1234` (4–10 digits succeeds). Netbanking or Wallet with the "Success" button also works.
- `4111 1111 1111 1111` is an international card and is rejected.
- UPI only shows a QR code, which real UPI apps can't pay.
- Razorpay rejects obvious dummy phone numbers like `9876543210`.

### Deploy
Pushing to `main` deploys automatically, because the GitHub repo is connected in Vercel. A manual deploy is `vercel --prod --yes`. The Vercel CLI is installed globally (it was installed with `sudo`, because `/usr/local` is owned by root).

### Rotate the webhook secret
```sh
openssl rand -hex 32
```
Put the new secret in `.env.local`, in Vercel (`vercel env add RAZORPAY_WEBHOOK_SECRET production --force`) and in the Razorpay webhook settings. Then redeploy. Webhooks fail with 401 between the Vercel update and the Razorpay update.

### Rotate the Google key
In the GCP console, open IAM → Service accounts → doc-seller → Keys and create a new JSON key. Update `GOOGLE_PRIVATE_KEY` in `.env.local` and Vercel, redeploy, then delete the old key. Never print the key in the terminal; pipe it into `vercel env add`.

### Razorpay Test → Live
Test and Live mode have **separate data**:
1. Activate the account (KYC).
2. Switch the toggle to Live.
3. **Generate Live API keys**. Hosted checkout fails without keys (see Troubleshooting).
4. Recreate each Payment Page in Live mode. This gives a new link.
5. Add the webhook again in Live mode with the same URL, the same secret and `payment.captured`.

The prices in `products.ts` must match the Live pages. Make one small real payment to check.

## Troubleshooting

| Symptom | Cause and fix |
|---|---|
| Checkout error `BAD_REQUEST_ERROR` "The id provided does not exist" at `payment_initiation`, with no payment created | **No API key exists for that mode.** Hosted Pages and Links need a key to exist, even though this app never uses it. In Account & Settings → API keys, click **Generate Test Key** (or the Live key for Live mode). That fixed it. Don't put the keys in Vercel; the app doesn't use them. |
| `Drive share failed … File not found: <docId>` | The service account can't see the Doc. In the Doc, click Share and add `doc-seller@doc-sales-511007.iam.gserviceaccount.com` as an **Editor**. It must be Editor, because a Viewer can't share. Also check the `docId` in `products.ts`. |
| 401 `invalid signature` on real Razorpay webhooks | The secret differs between Razorpay and Vercel, or the Vercel env var changed without a redeploy. |
| 200 `{"ignored":"no product for this amount"}` | The page price doesn't match any `amountPaise` in `products.ts`, or the buyer bought quantity > 1. |
| `{"error":"no email"}` | The page didn't collect an email. Make the field required. |
| Buyer says there was no email | Check the logs for "Shared doc with <email>". Look for a typo in the email or a non-Google address. If the address already had access, Google may not send another email; share it manually or send the Doc link. |
| Razorpay support says the webhook isn't linked to the payment page or needs API keys | Not true. Webhooks are per account and mode, and they're signed with the webhook secret; the app needs no API keys. |
| Vercel deployment status **Blocked** (`troubleshoot-project-collaboration#team-configuration`) | The commit author doesn't match the Vercel account. This happened once because the repo's git config had curly quotes (`“28varun28pp@gmail.com”`). Fix `git config user.name/user.email` in the repo, then make a new commit and push. |
| Build error: `Route segment config "runtime" is not compatible with nextConfig.cacheComponents` | Keep `cacheComponents: false` in `next.config.ts`. |
| `vercel git connect` can't parse the URL | The CLI reads the `github-personal` SSH alias and ignores the URL argument. Connect the repo in the Vercel dashboard (Settings → Git) instead. This is already done. |
| `npm i -g` gives EACCES | npm's global folder `/usr/local` is owned by root. Use `sudo`, or use `npx vercel@latest`. |
| Testing re-sends emails to old test addresses | It no longer does: the webhook skips anyone who already has access (`{"alreadyShared":true}`). Note that Drive's `permissions.create` **does** re-send Google's invite if called again for an existing reader. To test the email again, remove that address from the Doc's Share dialog first. |
| Buyer got Google's plain "doc-seller@… shared a document" email instead of the branded one | Check the logs for "Purchase email failed" (Gmail App Password revoked or changed?) or "Silent share failed" (a non-Google address). |

## Known loose ends

- `npm run lint` reports `no-explicit-any` on `catch (err: any)` in the route. This is intentional, and it doesn't affect the build.
- Sharing is idempotent, so Razorpay webhook retries don't cause harm. Refunds are **not** handled: revoke access manually in the Doc's Share dialog if needed.
