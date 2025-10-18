import { Container } from "@/components/Container";
import ProductCard from "@/components/products/ProductCard/ProductCard";
import ProductItemCard from "@/components/products/ProductItemCard";
import ShopFiltration from "@/components/products/Filter/ShopFiltration";
import { getProducts } from "@/sanity/sanity-utils";
export default async function Shop() {
  const products = await getProducts();
  return (
    <>
      <Container className="p-10 bg-shop-light-pink flex flex-col lg:flex-row gap-6">
        <div>
          <ShopFiltration />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Shop</h2>
          <ProductCard grid={4} />
        </div>
      </Container>
    </>
  );
}
