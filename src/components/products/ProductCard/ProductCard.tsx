import { getAmountOfProducts, getProducts } from "@/sanity/sanity-utils";
import ProductItemCard from "../ProductItemCard";

type ProductCardProps = {
  grid?: number;
  amount?: number;
};

export default async function ProductCard(props: ProductCardProps) {
  let products = [];

  if (props.amount) {
    products = await getAmountOfProducts(props.amount);
  } else {
    products = await getProducts();
  }

  const gridCols = props.grid ? props.grid : 5;

  return (
    <div
    className={`grid xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-${gridCols} gap-6`}
    >
      {products.map((product: any) => (
        <ProductItemCard product={product} key={product.slug} />
      ))}
    </div>
  );
}
