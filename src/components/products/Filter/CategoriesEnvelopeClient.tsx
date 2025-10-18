"use client";
import { useState, useEffect } from "react";
import CategoriesTicker from "./CategoriesTicker";
import ProductItemCard from "../ProductItemCard";
import ProductItemSkeleton from "../ProductCard/ProductItemSkeleton";
import type CategoryType from "./CategoryType";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  status?: string;
  image: string;
  slug: { current: string } | string;
  categories?: { slug?: { current: string } }[];
};

type Props = {
  categories: CategoryType[];
  initialProducts: Product[];
  limit?: number;
};

export default function CategoriesEnvelopeClient({
  categories,
  initialProducts,
  limit = 5,
}: Props) {
  const [selectedCategorySlug, setSelectedCategorySlug] = useState<
    string | null
  >(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const query = selectedCategorySlug
          ? `/api/products?category=${selectedCategorySlug}&limit=${limit}`
          : `/api/products?limit=${limit}`;
        const res = await fetch(query);
        const data: Product[] = await res.json();

        const mappedProducts = data.map((p: any) => ({
          ...p,
          slug: p.slug ?? { current: p._id },
        }));

        setProducts(mappedProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategorySlug, limit]);

  return (
    <div className="flex flex-col gap-8">
      <CategoriesTicker
        categories={categories}
        onCategorySelect={setSelectedCategorySlug}
      />

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {loading
          ? Array.from({ length: limit }).map((_, i) => (
              <ProductItemSkeleton key={i} />
            ))
          : products.map((product) => (
              <ProductItemCard key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
}
