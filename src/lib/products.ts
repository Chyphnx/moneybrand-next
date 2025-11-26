import productsData from "../../data/products.json";

export type Product = {
  sku: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  color: string;
  image: string;
  ogImage?: string;
  status: "available" | "sold_out" | "preorder" | string;
  description: string;
};

const products: Product[] = (productsData as Product[]).map((p) => ({
  ...p,
  image: p.image.startsWith("/") ? p.image : `/${p.image}`,
  ogImage:
    p.ogImage && p.ogImage.length > 0
      ? p.ogImage.startsWith("/")
        ? p.ogImage
        : `/${p.ogImage}`
      : p.image,
}));

export function allProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function featuredProducts(limit = 4): Product[] {
  return products.slice(0, limit);
}

export function relatedProducts(slug: string, limit = 4): Product[] {
  const current = getProductBySlug(slug);
  const primaryPool = current
    ? products.filter(
        (p) => p.slug !== slug && p.category === current.category
      )
    : products.filter((p) => p.slug !== slug);

  const pool =
    primaryPool.length >= limit
      ? primaryPool
      : products.filter((p) => p.slug !== slug);

  return pool.slice(0, limit);
}
