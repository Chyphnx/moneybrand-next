import { products } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";

export const metadata = {
  title: "Catalog – Money Brand Clothing",
};

export default function CatalogPage() {
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
            finish and detail.
          </p>
        </div>
      </section>

      <ProductGrid products={products} />
    </div>
  );
}
