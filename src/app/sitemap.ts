import type { MetadataRoute } from "next";
import { allProducts } from "@/lib/products";

const siteUrl = "https://moneybrandclothing.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const products = allProducts().map((p) => ({
    url: `${siteUrl}/product/${p.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.8,
    lastModified: new Date(),
  }));

  return [
    {
      url: `${siteUrl}/`,
      changeFrequency: "weekly" as const,
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${siteUrl}/catalog`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      lastModified: new Date(),
    },
    ...products,
  ];
}
