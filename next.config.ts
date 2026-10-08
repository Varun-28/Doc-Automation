import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Disabled so the webhook route can declare `export const runtime = "nodejs"`.
  cacheComponents: false,
};

export default nextConfig;
