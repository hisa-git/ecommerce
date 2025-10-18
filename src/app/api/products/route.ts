import { NextResponse } from "next/server";
import {
  getProductsByCategory,
  getAmountOfProducts,
} from "@/sanity/sanity-utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "5");

  let products = [];

  if (category) {
    products = await getProductsByCategory(category, limit);
  } else {
    products = await getAmountOfProducts(limit);
  }

  return NextResponse.json(products);
}
