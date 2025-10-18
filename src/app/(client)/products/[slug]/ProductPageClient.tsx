"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Container } from "@/components/Container";
import { Button } from "@/components/ui/button";
import capitalize from "../../../../utils/capitalize";
import { CreditCard, Wallet, Bitcoin } from "lucide-react";

export default function ProductPageClient({ product }: any) {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    if (!product || !product._id) return;

    const stored = localStorage.getItem("recentlyViewed") || "[]";
    const viewed: any[] = JSON.parse(stored);
    const normalizedSlug =
      product.slug && typeof product.slug === "object" && product.slug.current
        ? product.slug.current
        : String(product._id);

    const normalized = {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price ?? 0,
      discount: product.discount ?? 0,
      status: product.status ?? null,
      description: product.description ?? "",
      slug: normalizedSlug,
    };

    const updated = [
      normalized,
      ...viewed.filter((p) => p._id !== normalized._id),
    ].slice(0, 5);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  }, [product]);

  const hasDiscount = Number(product.discount) > 0;
  const finalPrice = hasDiscount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : Number(product.price ?? 0).toFixed(2);

  const handleBuy = () => {
    alert(
      `You ordered succesfully!\n Item: ${product.name}\n Amount: ${quantity}\n Method: ${paymentMethod}\n Total: ${(Number(finalPrice) * quantity).toFixed(2)} $`
    );
  };

  return (
    <Container className="p-6 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      <div>
        <Image
          src={product.image}
          alt={product.name || "product image"}
          width={600}
          height={600}
          className="object-contain p-4 bg-white rounded-lg border"
        />
        <p className="mt-6 text-lg text-slate-700">{product.description}</p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          {product.status && (
            <span className="text-sm bg-shop_light_green text-white px-2 py-1 rounded-full">
              {capitalize(product.status)}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-semibold text-slate-900">
              ${finalPrice}
            </span>
            {hasDiscount && (
              <span className="text-slate-500 line-through text-lg">
                ${product.price}
              </span>
            )}
          </div>
          {hasDiscount && (
            <div className="text-shop_light_green font-medium">
              -{product.discount}% discount
            </div>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">Amount:</span>
          <div className="flex items-center border rounded-lg overflow-hidden">
            <Button
              variant="ghost"
              className="px-3 text-lg"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              -
            </Button>
            <span className="px-4 text-lg font-medium">{quantity}</span>
            <Button
              variant="ghost"
              className="px-3 text-lg"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <span className="text-sm font-semibold">Paying methods:</span>
          <div className="flex gap-3">
            <Button
              variant={paymentMethod === "card" ? "default" : "outline"}
              onClick={() => setPaymentMethod("card")}
              className="flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Card
            </Button>
            <Button
              variant={paymentMethod === "wallet" ? "default" : "outline"}
              onClick={() => setPaymentMethod("wallet")}
              className="flex items-center gap-2"
            >
              <Wallet className="w-4 h-4" />
              Wallet
            </Button>
            <Button
              variant={paymentMethod === "crypto" ? "default" : "outline"}
              onClick={() => setPaymentMethod("crypto")}
              className="flex items-center gap-2"
            >
              <Bitcoin className="w-4 h-4" />
              Crypto
            </Button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl font-semibold">
            Total: ${(Number(finalPrice) * quantity).toFixed(2)} $
          </div>
          <Button
            className="bg-shop_dark_green hover:bg-white hover:text-black hover:border border-shop_dark_green transition-all"
            onClick={handleBuy}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </Container>
  );
}
