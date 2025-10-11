import { getCategories } from "@/sanity/sanity-utils";
import CategoriesFilter from "./CategoriesFilter";

export default async function CategoriesEnvelope() {
  const categories = await getCategories();
  return <CategoriesFilter categories={categories} />;
}
