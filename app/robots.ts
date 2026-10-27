import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

// Search and AI crawlers are welcome on public pages. Each bot gets its own
// rule that repeats the disallows, because a bot with a named rule ignores "*".
const BLOCKED = ["/api/", "/thank-you"];

const BOTS = [
  "Googlebot",
  "Bingbot",
  "Google-Extended",
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Applebot",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "DuckAssistBot",
  "cohere-ai",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: BLOCKED },
      ...BOTS.map((userAgent) => ({ userAgent, allow: "/", disallow: BLOCKED })),
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
