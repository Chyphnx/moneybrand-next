"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Product } from "@/lib/products";

type Props = {
  product: Product;
  enableQuickView?: boolean;
  onQuickView?: (product: Product) => void;
};

export function ProductCard({ product, enableQuickView, onQuickView }: Props) {
  const altText = `${product.name} — ${product.category} in ${product.color}`;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleQuickView = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(true);
    onQuickView?.(product);
  };

  const close = () => setOpen(false);

  return (
    <>
      <Link
        href={`/product/${product.slug}`}
        className="group card-veil block rounded-2xl border border-neutral-900 bg-neutral-950/40 p-3 transition-colors hover:border-amber-300/70"
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900">
          {product.status !== "available" && (
            <span className="absolute left-3 top-3 z-10 inline-flex items-center rounded-full bg-black/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-300 ring-1 ring-amber-300/40">
              {product.status === "sold_out"
                ? "Sold out"
                : product.status === "preorder"
                  ? "Preorder"
                  : product.status}
            </span>
          )}
          {enableQuickView && (
            <button
              type="button"
              onClick={handleQuickView}
              className="absolute right-3 top-3 z-10 rounded-full border border-white/20 bg-black/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white opacity-0 backdrop-blur transition hover:border-amber-200 hover:text-amber-100 group-hover:opacity-100"
            >
              Quick view
            </button>
          )}
          <Image
            src={product.image}
            alt={altText}
            fill
            sizes="(min-width: 1024px) 25vw, 50vw"
            className="object-cover object-center transition-transform group-hover:scale-[1.03]"
          />
        </div>
        <div className="mt-3 flex flex-col gap-1">
          <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
            {product.category}
          </div>
          <div className="text-sm font-medium">{product.name}</div>
          <div className="flex items-center justify-between text-[11px] text-neutral-400">
            <span>{product.color}</span>
            <span className="font-semibold text-amber-300">
              ${product.price.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>

      {open && (
        <div
          role="dialog"
          aria-label={`${product.name} quick view`}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur"
          onClick={close}
        >
          <div
            className="relative grid max-w-3xl grid-cols-1 gap-6 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950/90 p-4 shadow-[0_32px_120px_rgba(0,0,0,0.55)] md:grid-cols-[1.05fr,0.95fr]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              className="absolute right-3 top-3 rounded-full border border-neutral-800 bg-black/70 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-neutral-300 hover:border-amber-200 hover:text-amber-100"
            >
              Close
            </button>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-neutral-900">
              <Image
                src={product.image}
                alt={altText}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover object-center"
              />
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                {product.category}
              </p>
              <h3 className="font-display text-2xl text-white">{product.name}</h3>
              <div className="flex flex-wrap items-center gap-2 text-sm text-neutral-300">
                <span className="rounded-full bg-neutral-900 px-4 py-2 font-semibold text-amber-300 ring-1 ring-amber-300/30">
                  ${product.price.toLocaleString()}
                </span>
                <span className="text-neutral-400">Color: {product.color}</span>
                <span className="text-neutral-500">SKU: {product.sku}</span>
              </div>
              <p className="text-sm leading-relaxed text-neutral-300">
                {product.description}
              </p>
              <div className="grid grid-cols-1 gap-2 text-[12px] text-neutral-400 sm:grid-cols-2">
                <div className="rounded-xl border border-neutral-900 bg-neutral-950 p-3">
                  <div className="text-neutral-500">Positioning</div>
                  <div className="text-sm text-neutral-200">
                    Above Psycho Bunny, below Celine with metallic and currency language.
                  </div>
                </div>
                <div className="rounded-xl border border-neutral-900 bg-neutral-950 p-3">
                  <div className="text-neutral-500">Delivery</div>
                  <div className="text-sm text-neutral-200">
                    Worldwide shipping. Wholesale and placement programs ready.
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/product/${product.slug}`}
                  className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-amber-200"
                >
                  View product
                </Link>
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-full border border-neutral-800 px-5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-200 transition hover:border-amber-200 hover:text-amber-100"
                >
                  Line sheet
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
