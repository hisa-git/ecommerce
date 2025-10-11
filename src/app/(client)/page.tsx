import { Container } from "@/components/Container";
import Banner from "@/components/Banner";
import ProductCard from "@/components/products/ProductCard/ProductCard";
import CategoriesEnvelope from "@/components/products/Filter/CategoriesEnvelope";

export default function Home() {
  return (
    <>
      <Container className="p-10 px-4">
        <Banner></Banner>
        <CategoriesEnvelope />
        <ProductCard amount={5} />
        {/*CHECKED ITEMS*/}
      </Container>
    </>
  );
}
