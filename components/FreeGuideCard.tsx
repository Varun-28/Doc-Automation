import type { FreeGuide } from "@/lib/free-guides";
import { Doc, ArrowRight } from "./icons";

export function FreeGuideCard({ guide }: { guide: FreeGuide }) {
  return (
    <article className="card" style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <span className="badge">
        <Doc width={14} height={14} /> {guide.kicker}
      </span>
      <h3 style={{ marginTop: 12, overflowWrap: "anywhere" }}>{guide.title}</h3>
      <p style={{ marginTop: 10, color: "var(--text-muted)" }}>{guide.description}</p>
      <div style={{ marginTop: "auto", paddingTop: 16 }}>
        <a href={guide.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          Read the document <ArrowRight />
          <span className="sr-only"> – {guide.title} (free, opens in a new tab)</span>
        </a>
      </div>
    </article>
  );
}
