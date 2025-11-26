"use client";

import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  title?: string;
  eyebrow?: string;
  description?: string;
  enableQuickView?: boolean;
  onQuickView?: (product: Product) => void;
};

export function ProductGrid({
  products,
  title,
  eyebrow,
  description,
  enableQuickView = false,
  onQuickView,
}: ProductGridProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      {(title || eyebrow || description) && (
        <div className="mb-6 max-w-3xl space-y-2">
          {eyebrow && (
            <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-500">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-2xl font-semibold tracking-wide text-white">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-sm text-neutral-400">{description}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard
            key={p.sku}
            product={p}
            enableQuickView={enableQuickView}
            onQuickView={onQuickView}
          />
        ))}
      </div>
    </section>
  );
}
