"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One IntersectionObserver for the whole page: adds .is-visible to every
// [data-reveal] element as it scrolls into view, then stops watching it.
// Content is only hidden once <html class="reveal-ready"> is set here, so
// if JavaScript fails or is slow, everything stays visible.
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible)"));
    if (typeof IntersectionObserver === "undefined") {
      root.classList.remove("reveal-ready");
      return;
    }

    // Show what's already on screen at once (all reads, then all writes)
    const onScreen = nodes.map((n) => n.getBoundingClientRect().top < innerHeight);
    nodes.forEach((n, i) => {
      if (onScreen[i]) n.classList.add("is-visible");
    });
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    nodes.forEach((n, i) => {
      if (!onScreen[i]) io.observe(n);
    });
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
