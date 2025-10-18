import { createClient } from "next-sanity";

/*export async function getProducts() {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2023-10-10", // use a specific date for the API version
    useCdn: false, // `false` if you want to ensure fresh data
    token: process.env.SANITY_VIEWER_TOKEN, // Add your token here
  });
  client.fetch('*[_type == "product"]').then((products) => {
    return products;
  }
}



  import { createClient } from '@sanity/client';
*/
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "your_project_id",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2023-10-10", // use a specific date for the API version
  useCdn: false, // `false` if you want to ensure fresh data
  token: process.env.SANITY_VIEWER_TOKEN, // Add your token here
});

export async function getProducts() {
  return await client.fetch(`
    *[_type == "product"]{
      _id,
      slug,
      name,
      price,
      status,
      description,
      discount,
      "image": images[0].asset->url,
      "categories": categories[]->{slug}
    }
  `);
}

export async function getAmountOfProducts(amount: number) {
  return await client.fetch(
    `*[_type == "product"][0...$amount]{
      _id,
      slug,
      name,
      price,
      status,
      description,
      discount,
      "image": images[0].asset->url
    }`,
    { amount }
  );
}

export async function getCategories() {
  return await client.fetch(`
  *[_type == "category" && defined(title)]{
    _id,
    title,
    description,
    slug,
    featured,
    image
  }
  `);
}

export async function getProductBySlug(slug: string) {
  return client.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
      _id,
      name,
      description,
      status,
      discount,
      price,
      "image": images[0].asset->url,
      slug
    }`,
    { slug }
  );
}

export async function getProductsByCategory(categorySlug: string, limit = 5) {
  return client.fetch(
    `*[_type == "product" && $categorySlug in categories[]->slug.current][0...$limit]{
      _id,
      name,
      description,
      status,
      discount,
      price,
      "image": images[0].asset->url,
      "categories": categories[]->{slug}
    }`,
    { categorySlug, limit }
  );
}
