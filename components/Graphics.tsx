import type { CSSProperties } from "react";
import type { CatalogEntry } from "@/lib/catalog";

export function BookCover({ small = false }: { small?: boolean }) {
  return (
    <div className={small ? "book book-sm" : "book"} role="img" aria-label="Cover of The Website Performance Playbook">
      <div className="book-spine" />
      <div className="book-cover">
        <span className="book-kicker">THE</span>
        <span className="book-title">
          Website Performance <span>Playbook</span>
        </span>
        <span className="book-rule" />
        <span className="book-sub">Proven fixes for LCP, INP, CLS, FCP, TTFB, page weight and iOS Safari.</span>
        <span className="book-metrics">
          <span>LCP</span>
          <span>INP</span>
          <span>CLS</span>
          <span>TTFB</span>
        </span>
        <span className="book-author">By Shilpe Saxena</span>
      </div>
    </div>
  );
}

function Ring({ score, label, tone }: { score: number; label: string; tone: "before" | "after" }) {
  return (
    <div className={`ring ring-${tone}`} style={{ "--score": score } as CSSProperties}>
      <svg viewBox="0 0 120 120" aria-hidden="true">
        <circle className="ring-track" cx="60" cy="60" r="52" />
        <circle className="ring-value" cx="60" cy="60" r="52" />
      </svg>
      <span className="ring-label">
        <span>
          {score}
          <small>{label}</small>
        </span>
      </span>
    </div>
  );
}

export function ScoreRings() {
  return (
    // Numbers from the playbook, Section 12.1 (deferring the tag manager)
    <div className="rings" data-reveal role="img" aria-label="Mobile Lighthouse performance score: 58 before, 72 after">
      <Ring score={58} label="Before" tone="before" />
      <Ring score={72} label="After" tone="after" />
    </div>
  );
}

export function ImpactBars({ results }: { results: CatalogEntry["results"] }) {
  return (
    <div className="bars">
      {results.map((r, i) => (
        <div className="bar-row" key={r.label} data-reveal style={{ "--delay": `${i * 0.06}s` } as CSSProperties}>
          <div className="bar-head">
            <span>{r.label}</span>
            <span className="drop">−{r.drop}%</span>
          </div>
          <div className="bar-track" aria-hidden="true">
            <div className="bar-fill" style={{ "--after": (100 - r.drop) / 100 } as CSSProperties} />
          </div>
          <div className="bar-meta">
            <span>Before: {r.before}</span>
            <span>After: {r.after}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Blobs({ grid = false }: { grid?: boolean }) {
  return (
    <div className="blobs" aria-hidden="true">
      {grid && <div className="grid-bg" />}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
    </div>
  );
}
