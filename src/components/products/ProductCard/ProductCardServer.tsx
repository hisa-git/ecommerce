// components/products/ProductCard/ProductCardServer.tsx
import ProductCardClient from "./ProductCardClient";
import { getProducts } from "@/sanity/sanity-utils";

export default async function ProductCardServer({
  amount,
}: {
  amount?: number;
}) {
  const products = await getProducts();
  const limited = amount ? products.slice(0, amount) : products;

  return <ProductCardClient products={limited} />;
}
