import { getCategories } from "@/sanity/sanity-utils";
import CategoriesFilter from "./CategoriesTicker";

export default async function CategoriesEnvelope() {
  const categories = await getCategories();
  return (
    <CategoriesFilter
      categories={categories}
      onCategorySelect={(id) => setSelectedCategory(id)}
    />
  );
}
