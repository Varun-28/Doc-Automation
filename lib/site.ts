// Everything the public site says about the seller. Razorpay's website
// verification checks these against the KYC details, so keep them in sync
// with the Razorpay account (legal name, contact email, phone and address).

export const SITE = {
  // Switching to the custom domain only needs this one line: canonical URLs,
  // the sitemap, robots.txt, JSON-LD and llms.txt all build from SITE.url.
  url: "https://shilpe-codes.vercel.app",
  name: "Shilpe Saxena",
  // Must match the name on the Razorpay account / KYC.
  legalName: "Shilpe Saxena",
  role: "Frontend Engineer",
  tagline: "Frontend Engineer · Web Performance · React & Next.js",
  email: "sketchandtech@gmail.com",
  phone: "+91 92172 44071",
  // Where she lives and works, for the bio. The address below is the
  // registered one (shown on the policy pages and footer) and must match the Razorpay KYC.
  basedIn: "Bengaluru, Karnataka",
  address: {
    line1: "35D/9A, Preetam Nagar",
    line2: "Dhoomanganj, Sulem Sarai",
    city: "Prayagraj",
    state: "Uttar Pradesh",
    pincode: "211001",
    country: "India",
  },
  supportHours: "Monday to Saturday, 10:00 AM – 7:00 PM IST",
  responseTime: "within 24 hours",
  policiesUpdated: "25 October 2026",
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/shilpe-saxena-heartly-winner" },
    { label: "Instagram", href: "https://www.instagram.com/shilpe.codes" },
    { label: "Topmate", href: "https://topmate.io/shilpe_saxena" },
    { label: "Portfolio", href: "https://shilpe-portfolio.netlify.app" },
    { label: "GitHub", href: "https://github.com/shilpe26" },
    { label: "Peerlist", href: "https://peerlist.io/shilpesaxena" },
    { label: "X / Twitter", href: "https://twitter.com/ShilpeSaxena" },
    { label: "Medium", href: "https://medium.com/@shilpecsaxena9098" },
  ],
} as const;
