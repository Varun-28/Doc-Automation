import type { ReactNode } from "react";
import { Blobs } from "./Graphics";

export function PageHero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section className="page-hero">
      <Blobs grid />
      <div className="container hero-enter" style={{ position: "relative", zIndex: 1 }}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="h1" style={{ fontSize: "clamp(2.1rem, 5vw, 3.4rem)" }}>
          {title}
        </h1>
        {children}
      </div>
    </section>
  );
}
