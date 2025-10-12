// app/products/[slug]/page.tsx
import { getProductBySlug } from "@/sanity/sanity-utils";
import ProductPageClient from "./ProductPageClient";

type Props = { params: { slug: string } };

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) return <div>404</div>;
  return <ProductPageClient product={product} />;
}
