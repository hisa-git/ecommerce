// components/RecentlyViewed.tsx
"use client";

import { useEffect, useState } from "react";
import ProductItemCard from "./ProductItemCard";

export default function RecentlyViewed() {
  const [products, setProducts] = useState<any[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);

    const read = () => {
      try {
        const stored = localStorage.getItem("recentlyViewed");
        setProducts(stored ? JSON.parse(stored) : []);
      } catch (e) {
        console.error("Error reading recentlyViewed:", e);
        setProducts([]);
      }
    };

    read();

    const onStorage = (e: StorageEvent) => {
      if (e.key === "recentlyViewed") read();
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!hydrated || !products.length) return null;

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-4">Recently viewed</h3>
      <div className="grid xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductItemCard product={product} key={product._id} type="view" />
        ))}
      </div>
    </div>
  );
}
