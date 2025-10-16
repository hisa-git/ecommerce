// app/products/[slug]/ProductPageClient.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Container } from "@/components/Container";
import capitalize from "../../../../utils/capitalize";

export default function ProductPageClient({ product }: any) {
  useEffect(() => {
    if (!product || !product._id) return;

    const stored = localStorage.getItem("recentlyViewed") || "[]";
    const viewed: any[] = JSON.parse(stored);
    const normalizedSlug =
      product.slug && typeof product.slug === "object" && product.slug.current
        ? product.slug.current
        : String(product._id);

    const normalized = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price ?? 0,
      discount: product.discount ?? 0,
      status: product.status ?? null,
      description: product.description ?? "",
      slug: normalizedSlug,
    };

    const updated = [
      normalized,
      ...viewed.filter((p) => p._id !== normalized._id),
    ].slice(0, 5);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  }, [product]);

  const hasDiscount = Number(product.discount) > 0;
  const finalPrice = hasDiscount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : Number(product.price ?? 0).toFixed(2);

  return (
    <Container className="p-10 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <Image
          src={product.image}
          alt={product.name || "product image"}
          width={400}
          height={400}
          className="object-contain p-2"
        />
        <p className="mt-4 text-lg">{product.description}</p>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {product.status && (
            <span className="text-sm bg-shop_light_green text-white px-2 py-1 rounded-full">
              {capitalize(product.status)}
            </span>
          )}
        </div>
        <p className="mt-2 font-semibold text-xl">{finalPrice} $</p>
        {hasDiscount && (
          <span className="text-sm text-slate-500 line-through">
            ${product.price}
          </span>
        )}
        {hasDiscount && <div>-{product.discount}%</div>}
      </div>
    </Container>
  );
}
