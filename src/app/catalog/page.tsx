import type { Metadata } from "next";
import { allProducts } from "@/lib/products";
import { Suspense } from "react";
import CatalogClient from "./search";

export const metadata: Metadata = {
  title: "Catalog – Money Brand Clothing",
  description:
    "Full Money Brand catalog. Metallic hoodies, currency crews, precision-cut tees, belts, and caps positioned between Psycho Bunny and Celine.",
  alternates: {
    canonical: "/catalog",
  },
  openGraph: {
    type: "website",
    url: "/catalog",
    title: "Catalog – Money Brand Clothing",
    description:
      "Shop the full Money Brand drop with metallic hoodies, currency crews, tees, belts, and caps.",
  },
};

export default function CatalogPage() {
  const items = allProducts();

  return (
    <div className="bg-black text-white">
      <section className="border-b border-neutral-900 bg-black py-10">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">
            Collection 01
          </p>
          <h1 className="mt-3 text-2xl font-semibold tracking-wide">
            Full Catalog
          </h1>
          <p className="mt-2 max-w-xl text-xs text-neutral-400">
            Every piece in this drop is priced to sit above Psycho Bunny and
            below Celine while feeling closer to the luxury side in weight,
            finish and detail. Search or filter to build a tight buy sheet.
          </p>
          <Suspense fallback={null}>
            <CatalogClient products={items} />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
