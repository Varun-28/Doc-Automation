// One entry per product. Razorpay webhooks don't say which Payment Page a
// payment came from, so products are matched by amount: every product must
// have a unique price, equal to its Payment Page's fixed amount (in paise).
//
// To add a product:
//   1. Share the Google Doc with the service account as Editor.
//   2. Create a Razorpay Payment Page with a fixed, unique price and required email.
//   3. Add an entry below and push to main.

export type Product = {
  name: string;
  amountPaise: number;
  docId: string;
};

export const PRODUCTS: Product[] = [
  {
    name: "Website Performance Doc",
    amountPaise: 77700, // ₹777
    docId: "1VVZLUNgZxbM3STNlFD6luPpei2iN2n2QJOMsNugQ3dk",
  },
];

const seen = new Set<number>();
for (const p of PRODUCTS) {
  if (seen.has(p.amountPaise)) throw new Error(`Duplicate product price ${p.amountPaise} paise: prices must be unique`);
  seen.add(p.amountPaise);
}

export function findProductByAmount(amountPaise: unknown): Product | undefined {
  return PRODUCTS.find((p) => p.amountPaise === Number(amountPaise));
}
