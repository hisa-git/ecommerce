"use client";

import { useState, useEffect } from "react";
import ShopFiltration from "@/components/products/Filter/ShopFiltration";
import ProductItemSkeleton from "@/components/products/ProductCard/ProductItemSkeleton";
import ProductCardClient from "@/components/products/ProductCard/ProductCardClient";
import { getProducts } from "@/sanity/sanity-utils";

export default function ShopClient() {
  const [products, setProducts] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((data) => {
        console.log("[ShopClient] All products loaded:", data);
        setProducts(data);
        setFiltered(data);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilterChange = (filters: Record<string, any>) => {
    console.log("[ShopClient] Received filters:", filters);
    let result = [...products];

    if (filters.category.length > 0) {
      result = result.filter((p) =>
        p.categories?.some((c: any) =>
          filters.category.includes(c.slug?.current)
        )
      );
      console.log(
        "[ShopClient] After category filter:",
        result.map((r) => r.name)
      );
    }

    const [min, max] = filters.priceRange;
    result = result.filter((p) => p.price >= min && p.price <= max);
    console.log(
      "[ShopClient] After price filter:",
      result.map((r) => r.name)
    );

    if (filters.status.length > 0) {
      result = result.filter((p) => filters.status.includes(p.status));
      console.log(
        "[ShopClient] After status filter:",
        result.map((r) => r.name)
      );
    }

    console.log("[ShopClient] Final filtered result:", result);
    setFiltered(result);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="lg:w-64">
        <ShopFiltration onFilterChange={handleFilterChange} />
      </div>

      <div className="flex-1">
        <h2 className="text-xl font-semibold mb-4">Shop</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <ProductItemSkeleton key={i} />
            ))
          ) : filtered.length > 0 ? (
            filtered.map((product) => (
              <ProductCardClient
                key={product._id || product.slug}
                products={[product]}
                grid={1}
              />
            ))
          ) : (
            <p className="text-slate-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
