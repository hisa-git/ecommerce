"use client";
import { useEffect, useState } from "react";
import ProductItemCard from "";

export default function RecentlyViewed() {
  const [products, setProducts] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  if (!mounted || !products.length) return null;

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-4">Recently viewed</h3>
      <div className="grid xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductItemCard product={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
