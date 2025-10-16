// app/products/[slug]/page.tsx
import { getProductBySlug } from "@/sanity/sanity-utils";
import ProductPageClient from "./ProductPageClient";

interface ProductPageProps {
  params: { slug?: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  try {
    const slug = params?.slug;

    if (!slug || typeof slug !== "string") {
      console.error("Invalid slug param:", params);
      return <div>404 — Invalid slug</div>;
    }

    const product = await getProductBySlug(slug);

    if (!product) {
      console.warn(`Product not found for slug: ${slug}`);
      return <div>404 — Product not found</div>;
    }

    return <ProductPageClient product={product} />;
  } catch (err) {
    console.error("Error loading product page:", err);
    return <div>Something went wrong while loading the product.</div>;
  }
}
