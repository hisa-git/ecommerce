import { Button } from "@/components/ui/button";
import { getAmountOfProducts } from "@/sanity/sanity-utils";
import Image from "next/image";
import capitalize from "../../../utils/capitalize";
import Link from "next/link";

export default async function ProductCard(props) {
  const products = await getAmountOfProducts(props.amount);

  return (
    <div className="grid xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {products.map((product: any) => {
        const hasDiscount = Number(product.discount) > 0;
        const finalPrice = hasDiscount
          ? (product.price * (1 - product.discount / 100)).toFixed(2)
          : product.price;

        return (
          <Link href={`/products/${product.slug.current}`} key={product._id}>
            <div className="flex flex-col overflow-hidden rounded-lg border border-black1/2 bg-white w-full">
              <div className="relative w-full aspect-square bg-white flex items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name || "product image"}
                  fill
                  className="object-contain p-2"
                />
                {product.status && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {capitalize(product.status)}
                  </div>
                )}
                {hasDiscount && (
                  <div className="absolute top-3 right-3 bg-shop_light_green text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between p-4 flex-grow">
                <div className="flex-grow">
                  <h5 className="text-lg font-semibold text-slate-900 mb-2 hover:underline decoration-2 hover:text-shop_light_green">
                    {product.name}
                  </h5>
                  <p
                    className="text-sm text-slate-600 mb-3 overflow-hidden text-ellipsis"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {product.description}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {hasDiscount && (
                      <span className="text-sm text-slate-500 line-through">
                        ${product.price}
                      </span>
                    )}
                    <span className="text-xl font-bold text-slate-900">
                      ${finalPrice}
                    </span>
                  </div>

                  <Button
                    variant="default"
                    className="border-shop_dark_green bg-shop_dark_green hover:text-black hover:bg-white hover:border"
                  >
                    Add to cart
                  </Button>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
