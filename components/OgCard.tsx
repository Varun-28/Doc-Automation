// Shared layout for generated social-share images (next/og ImageResponse).
// Colours mirror the brand tokens in app/globals.css. Inline styles only:
// ImageResponse supports a flexbox subset of CSS, not class names.
export const OG_SIZE = { width: 1200, height: 630 };

export function OgCard({ eyebrow, title, footer }: { eyebrow: string; title: string; footer: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "linear-gradient(135deg, #3c096c 0%, #10002b 60%)",
        color: "#f7eeff",
      }}
    >
      <div style={{ display: "flex", fontSize: 30, color: "#e0aaff", letterSpacing: 2, textTransform: "uppercase" }}>
        {eyebrow}
      </div>
      <div style={{ display: "flex", fontSize: 76, fontWeight: 800, lineHeight: 1.1, color: "#ffffff" }}>{title}</div>
      <div style={{ display: "flex", fontSize: 32, color: "#c77dff" }}>{footer}</div>
    </div>
  );
}
