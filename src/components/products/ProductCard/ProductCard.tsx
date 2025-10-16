import { getAmountOfProducts } from "@/sanity/sanity-utils";
import ProductItemCard from "../ProductItemCard";

export default async function ProductCard(props) {
  const products = await getAmountOfProducts(props.amount);

  return (
    <div className="grid xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {products.map((product: any) => {
        return <ProductItemCard product={product} key={product._id} />;
      })}
    </div>
  );
}
