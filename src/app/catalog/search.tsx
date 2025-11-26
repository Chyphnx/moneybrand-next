"use client";

import { useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";

type Props = {
  products: Product[];
};

export default function CatalogClient({ products }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [drawerItems, setDrawerItems] = useState<Product[]>([]);
  const [lastViewed, setLastViewed] = useState<Product | null>(null);

  const query = searchParams.get("q")?.trim() ?? "";
  const qLower = query.toLowerCase();

  const filtered = useMemo(() => {
    if (!qLower) return products;
    return products.filter((p) => {
      const haystack = `${p.name} ${p.category} ${p.color} ${p.description}`.toLowerCase();
      return haystack.includes(qLower);
    });
  }, [products, qLower]);

  const onSubmit = (formData: FormData) => {
    const nextQ = String(formData.get("q") ?? "").trim();
    const params = new URLSearchParams(searchParams.toString());
    if (nextQ) {
      params.set("q", nextQ);
    } else {
      params.delete("q");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleQuickView = (product: Product) => {
    setLastViewed(product);
    setDrawerItems((prev) => {
      const without = prev.filter((p) => p.slug !== product.slug);
      return [product, ...without].slice(0, 4);
    });
  };

  return (
    <>
      <form
        action={onSubmit}
        className="mt-6 flex flex-col gap-3 rounded-2xl border border-neutral-900 bg-neutral-950 p-4 md:flex-row md:items-center"
      >
        <div className="flex-1">
          <label
            htmlFor="q"
            className="text-[11px] uppercase tracking-[0.22em] text-neutral-500"
          >
            Search catalog
          </label>
          <input
            id="q"
            name="q"
            defaultValue={query}
            placeholder="Metallic hoodie, currency, belt, cap, tee..."
            className="mt-2 w-full rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm outline-none focus:border-amber-300"
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-2 text-xs font-semibold text-black hover:bg-amber-200"
        >
          Apply
        </button>
      </form>

      <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
        <span>
          Showing <strong className="text-neutral-200">{filtered.length}</strong>{" "}
          {filtered.length === 1 ? "piece" : "pieces"}
          {query ? ` for “${query}”` : ""}
        </span>
        {query && (
          <button
            type="button"
            className="text-amber-300 hover:text-amber-200"
            onClick={() => router.push(pathname)}
          >
            Clear
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-red-500/40 bg-red-500/5 p-4 text-sm text-red-200">
          No products found. Try searching “hoodie”, “tee”, “belt”, or “cap”.
        </div>
      ) : (
        <ProductGrid
          products={filtered}
          eyebrow="Filtered catalog"
          title="Every SKU in Collection 01"
          description="Use the search box to tighten the rack for your region and client mix."
          enableQuickView
          onQuickView={handleQuickView}
        />
      )}

      <MiniDrawer items={drawerItems} lastViewed={lastViewed} />
    </>
  );
}

function MiniDrawer({
  items,
  lastViewed,
}: {
  items: Product[];
  lastViewed: Product | null;
}) {
  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-4 z-40 max-w-sm rounded-2xl border border-neutral-800 bg-black/75 p-3 text-xs text-neutral-200 shadow-[0_20px_80px_rgba(0,0,0,0.55)] backdrop-blur md:right-8">
      <div className="flex items-center justify-between gap-2">
        <div className="text-[11px] uppercase tracking-[0.22em] text-neutral-500">
          Quick pull
        </div>
        {lastViewed && (
          <span className="rounded-full border border-amber-300/40 bg-amber-300/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-amber-100">
            {lastViewed.category}
          </span>
        )}
      </div>
      <div className="mt-2 space-y-2">
        {items.map((item) => (
          <Link
            key={item.sku}
            href={`/product/${item.slug}`}
            className="flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-950/60 px-3 py-2 transition hover:border-amber-200/60"
          >
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.18em] text-neutral-500">
                {item.category}
              </span>
              <span className="text-sm text-white">{item.name}</span>
              <span className="text-[11px] text-amber-200">
                ${item.price.toLocaleString()}
              </span>
            </div>
            <span className="text-[11px] uppercase tracking-[0.16em] text-neutral-400">
              View
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-neutral-500">
        <span>Persistent drawer</span>
        <Link
          href="/#contact"
          className="text-amber-200 hover:text-amber-100"
        >
          Line sheet
        </Link>
      </div>
    </div>
  );
}
