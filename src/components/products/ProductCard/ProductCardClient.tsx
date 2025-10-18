"use client";

import ProductItemCard from "../ProductItemCard";

type ProductCardClientProps = {
  products: any[];
  grid?: number;
};

export default function ProductCardClient({
  products = [],
  grid = 4,
}: ProductCardClientProps) {
  return (
    <div
     // className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${grid} gap-6`}
    >
      {products.map((product) => (
        <ProductItemCard key={product._id || product.slug} product={product} />
      ))}
    </div>
  );
}
