import { Button } from "@/components/ui/button";
import Image from "next/image";
import {Container} from "@/components/Container";
import ProductCard from "@/components/products/ProductCard/ProductCard";

export default function Shop() {
  return (
    <>
      <Container className="p-10 bg-shop-light-pink">
        <h2 className="text-xl font-semibold">Shop</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
          dolorem, magnam reprehenderit delectus quod nihil aliquid sit suscipit
          hic consectetur officia nobis modi optio doloribus ratione dolores!
          Modi omnis et tempore dolorum alias placeat quos, quaerat repudiandae
          autem, minus labore pariatur saepe, deleniti repellendus molestiae
          assumenda. Atque accusantium assumenda nisi?
        </p>
        <ProductCard amount={5} />
      </Container>
    </>
  );
}
