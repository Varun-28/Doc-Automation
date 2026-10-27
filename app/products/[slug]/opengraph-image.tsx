import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { OG_SIZE, OgCard } from "@/components/OgCard";
import { CATALOG, formatPrice, getCatalogItem } from "@/lib/catalog";

export function generateStaticParams() {
  return CATALOG.map((item) => ({ slug: item.slug }));
}

export const alt = "Product by Shilpe Saxena";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = getCatalogItem(slug);
  if (!item) notFound();
  return new ImageResponse(
    <OgCard eyebrow={item.kicker} title={item.title} footer={`${formatPrice(item.priceRupees)} · Shilpe Saxena`} />,
    { ...size },
  );
}
