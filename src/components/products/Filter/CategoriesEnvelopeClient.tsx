"use client";
import { useState, useEffect } from "react";
import CategoriesTicker from "./CategoriesTicker";
import ProductItemCard from "../ProductItemCard";
import CategoryType from "./CategoryType";
import ProductItemSkeleton from "../ProductCard/ProductItemSkeleton";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount?: number;
  status?: string;
  image: string;
  category: string;
  slug: { current: string } | string;
};

type Props = {
  categories: CategoryType[];
};

export default function CategoriesEnvelopeClient({ categories }: Props) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchProducts = async (categoryId: string | null) => {
    setLoading(true);
    try {
      const query = categoryId
        ? `/api/products?category=${categoryId}&limit=5`
        : `/api/products?limit=5`;
      const res = await fetch(query);
      if (!res.ok) throw new Error("Failed to fetch products");

      const data: Product[] = await res.json();
      console.log("Fetched products:", data);
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(selectedCategoryId);
  }, [selectedCategoryId]);

  return (
    <div className="flex flex-col gap-8">
      <CategoriesTicker
        categories={categories}
        onCategorySelect={setSelectedCategoryId}
      />

      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <ProductItemSkeleton key={i} />)
          : products.map((product) => (
              <ProductItemCard key={product._id} product={product} />
            ))}
      </div>
    </div>
  );
}
