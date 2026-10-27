// Content of the free guide at /website-performance. The page, its FAQ
// structured data and llms-full.txt all read from here so they never drift.

export const GUIDE = {
  path: "/website-performance",
  title: "Website Performance: Core Web Vitals Guide",
  h1: "Website performance: what it is, how to measure it, and how to fix it",
  description:
    "A plain-English guide to website performance: what Core Web Vitals (LCP, INP, CLS) mean, how to measure them, and how to fix them in React and Next.js.",
  published: "2026-10-27",
  modified: "2026-10-27",
  modifiedLabel: "27 October 2026",
  byline: "By Shilpe Saxena, Frontend Engineer",
  credentials:
    "4+ years building production frontends, including 6+ months of performance work on an e-commerce site with about 1 million monthly visits and 10,000+ products.",
  sources: {
    vitals: "https://web.dev/articles/vitals",
    thresholds: "https://web.dev/articles/defining-core-web-vitals-thresholds",
    pageExperience: "https://developers.google.com/search/docs/appearance/page-experience",
  },
  what: "Website performance is how quickly a page loads, becomes visible, and responds to a visitor's taps and clicks. It covers loading speed, interactivity and visual stability. Fast sites feel instant, keep visitors longer and are easier for search engines to crawl and rank.",
  cwv: "Core Web Vitals are three metrics Google uses to describe real-user experience: Largest Contentful Paint (LCP) for loading, Interaction to Next Paint (INP) for responsiveness, and Cumulative Layout Shift (CLS) for visual stability. A page is rated good when at least 75% of visits meet the good threshold for each.",
  metrics: [
    { name: "Largest Contentful Paint (LCP)", measures: "Loading: when the main content appears", good: "≤ 2.5 s", poor: "> 4 s", core: true },
    { name: "Interaction to Next Paint (INP)", measures: "Responsiveness: delay after taps and clicks", good: "≤ 200 ms", poor: "> 500 ms", core: true },
    { name: "Cumulative Layout Shift (CLS)", measures: "Visual stability: unexpected movement", good: "≤ 0.1", poor: "> 0.25", core: true },
    { name: "First Contentful Paint (FCP)", measures: "Loading: first text or image appears", good: "≤ 1.8 s", poor: "> 3 s", core: false },
    { name: "Time to First Byte (TTFB)", measures: "Server: wait for the first byte of the page", good: "≤ 0.8 s", poor: "> 1.8 s", core: false },
  ],
  why: "Core Web Vitals are part of the page experience signals Google Search uses, but they are one signal among many, and great content still matters most. Beyond search, slow pages make visitors wait, and layout jumps and laggy taps are frustrating, especially on mid-range phones and slow networks.",
  measure: {
    intro:
      "Measure with real-user (field) data first, then use lab tools to find the cause. Field data shows what visitors actually experience; lab data lets you reproduce and debug it. Judge each metric at the 75th percentile.",
    steps: [
      "Check field data: open PageSpeed Insights for your URL, or the Core Web Vitals report in Google Search Console. Both use the Chrome UX Report (real Chrome users over 28 days).",
      "Run a lab test: use Lighthouse (in Chrome DevTools or PageSpeed Insights) to find what is slow and get suggestions.",
      "Profile the page: record in the Chrome DevTools Performance panel to see long tasks, layout shifts and what delays the largest element.",
      "Test on a real mid-range Android phone, not just a fast laptop. Throttled desktop tests are a rough stand-in.",
      "Compare the 75th percentile, not the average, and re-measure after every change so you know what actually helped.",
    ],
  },
  improve: {
    intro:
      "Start from the symptom, find the likely cause, then apply the matching fix. Change one thing at a time and re-measure.",
    rows: [
      { symptom: "Slow LCP", cause: "Unoptimised or late-loading hero image", fix: "Preload one hero image, use modern formats (AVIF/WebP), serve the right sizes and set fetchpriority=\"high\"." },
      { symptom: "Poor INP", cause: "Long tasks, heavy JavaScript, third-party tags", fix: "Defer the tag manager to first interaction, break up long tasks, and reduce hydration work." },
      { symptom: "High CLS", cause: "Images, ads or fonts without reserved space", fix: "Set width/height or aspect-ratio, and use font-display with size-adjust for fallback fonts." },
      { symptom: "Slow TTFB", cause: "Uncached server or API responses", fix: "Put a CDN in front and cache pages and API responses." },
      { symptom: "Heavy pages", cause: "Large HTML, JavaScript or media", fix: "Trim the DOM, split bundles, and convert animated GIFs to video." },
    ],
  },
  reactNext: {
    intro:
      "In React and Next.js, most wins come from shipping less JavaScript and handling images and fonts the framework's way. Each of these maps to one of the metrics above.",
    points: [
      "next/image with priority on the single LCP image, and an accurate sizes attribute so phones download small files.",
      "next/font to self-host fonts, avoid layout shift and remove a render-blocking request.",
      "Server Components by default, so less JavaScript is sent to the browser; add \"use client\" only where you need interactivity.",
      "Dynamic import (next/dynamic) for heavy components that are not needed on first paint.",
      "Caching: cache data fetches and use static rendering or a CDN to keep TTFB low.",
    ],
  },
  faqs: [
    {
      q: "What is a good website performance score?",
      a: "For Lighthouse, 90 or above is rated good, 50 to 89 needs improvement and below 50 is poor. But the score is a lab estimate. What matters most is whether real visitors pass Core Web Vitals at the 75th percentile: LCP of 2.5 s or less, INP of 200 ms or less and CLS of 0.1 or less.",
    },
    {
      q: "What is a good LCP time?",
      a: "A good Largest Contentful Paint is 2.5 seconds or less, measured at the 75th percentile of visits. Between 2.5 and 4 seconds needs improvement, and over 4 seconds is poor. The largest element is usually a hero image or a big block of text.",
    },
    {
      q: "What is the difference between INP and FID?",
      a: "First Input Delay (FID) measured only the delay before the browser began handling a visitor's first interaction. Interaction to Next Paint (INP) measures the full responsiveness of all interactions during a visit, until the screen updates. INP replaced FID as a Core Web Vital in March 2024.",
    },
    {
      q: "Does website performance affect SEO?",
      a: "Yes, modestly. Core Web Vitals are part of Google's page experience signals, but relevant, helpful content remains the stronger ranking factor. Good performance also improves things search can't see directly, like lower bounce and a smoother experience on mobile.",
    },
    {
      q: "Why is my Lighthouse score different every time?",
      a: "Lighthouse runs in a lab, and results vary with your device's load, network conditions, browser extensions, third-party scripts and server response times. Run it several times in an incognito window and compare the median, and rely on field data (PageSpeed Insights or Search Console) for the real picture.",
    },
    {
      q: "How long does it take to fix Core Web Vitals?",
      a: "It depends on the cause. A single fix such as preloading the hero image or reserving image space can be done in a day. But field data comes from a rolling 28-day window, so Search Console and PageSpeed Insights take about a month to fully reflect a change.",
    },
  ],
} as const;
