import { ImageResponse } from "next/og";
import { OG_SIZE, OgCard } from "@/components/OgCard";

export const alt = "Website Performance & Core Web Vitals by Shilpe Saxena";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Guides for developers" title="Website Performance & Core Web Vitals" footer="Shilpe Saxena · Frontend Engineer" />,
    { ...size },
  );
}
