import { NextResponse } from "next/server";
import {
  getProductsByCategory,
  getAmountOfProducts,
} from "@/sanity/sanity-utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const limit = parseInt(searchParams.get("limit") || "1000");

  let products = [];
  console.log("Incoming request URL:", req.url);

  if (category) {
    products = await getProductsByCategory(category, limit);
  } else {
    products = await getAmountOfProducts(limit);
  }
  console.log("Category:", category);
  console.log("Limit:", limit);
  console.log("Products fetched:", products);

  return NextResponse.json(products);
}
