"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RecentlyViewed() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewed");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  if (!products.length) return null;

  return (
    <div className="mt-10">
      <h3 className="text-2xl font-bold mb-4">Recently viewed</h3>
      <div className="grid xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <Link
            href={`/products/${product.slug?.current || product.slug}`}
            key={product._id}
          >
            <div className="flex flex-col overflow-hidden rounded-lg border border-black1/2 bg-white w-full">
              <div className="relative w-full aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <h5 className="text-lg font-semibold text-slate-900 mb-2 hover:underline decoration-2 hover:text-shop_light_green">
                  {product.name}
                </h5>
                <span className="text-lg font-bold text-slate-900">
                  ${product.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
