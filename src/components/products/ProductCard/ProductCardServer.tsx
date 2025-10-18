// components/products/ProductCard/ProductCardServer.tsx
import { Suspense } from "react";
import ProductCardClient from "./ProductCard";
import ProductItemSkeleton from "./ProductItemSkeleton";
import { getProducts, getAmountOfProducts } from "@/sanity/sanity-utils";

type ProductCardServerProps = {
  amount?: number;
  grid?: number;
};

export default async function ProductCardServer({ amount, grid }: ProductCardServerProps) {
  const products = amount ? await getAmountOfProducts(amount) : await getProducts();
  const limitedProducts = amount ? products.slice(0, amount) : products;

  return (
    <Suspense
      fallback={
        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${grid ?? 5} gap-6`}>
          {Array.from({ length: amount ?? 5 }).map((_, i) => (
            <ProductItemSkeleton key={i} />
          ))}
        </div>
      }
    >
      <ProductCardClient products={limitedProducts} grid={grid} />
    </Suspense>
  );
}