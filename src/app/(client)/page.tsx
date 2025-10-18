import { Container } from "@/components/Container";
import Banner from "@/components/Banner";
import ProductCard from "@/components/products/ProductCard/ProductCard";
import CategoriesEnvelopeClient from "@/components/products/Filter/CategoriesEnvelopeClient";
import RecentlyViewed from "@/components/products/RecentlyViewed";
import { getProducts, getCategories } from "@/sanity/sanity-utils";

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <Container className="p-10 px-4">
      <Banner />
      <CategoriesEnvelopeClient
        categories={categories}
        initialProducts={products}
      />
      <RecentlyViewed />
    </Container>
  );
}
