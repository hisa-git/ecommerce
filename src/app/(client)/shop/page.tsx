import { Container } from "@/components/Container";
import ShopClient from "./ShopClient";

export default function Shop() {
  return (
    <Container className="p-10 bg-shop-light-pink">
      <ShopClient />
    </Container>
  );
}
