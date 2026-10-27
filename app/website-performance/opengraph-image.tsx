import { ImageResponse } from "next/og";
import { OG_SIZE, OgCard } from "@/components/OgCard";

export const alt = "Website performance: how to measure and improve Core Web Vitals";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Free guide" title="Website performance: measure and fix Core Web Vitals" footer="LCP · INP · CLS · Shilpe Saxena" />,
    { ...size },
  );
}
