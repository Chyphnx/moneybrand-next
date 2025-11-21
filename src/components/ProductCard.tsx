import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl border border-neutral-900 bg-neutral-950/40 p-3 hover:border-amber-300/70 transition-colors"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-neutral-900">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, 50vw"
          className="object-cover object-center group-hover:scale-[1.03] transition-transform"
        />
      </div>
      <div className="mt-3 flex flex-col gap-1">
        <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-400">
          {product.category}
        </div>
        <div className="text-sm font-medium">{product.name}</div>
        <div className="flex items-center justify-between text-[11px] text-neutral-400">
          <span>{product.color}</span>
          <span className="text-amber-300 font-semibold">
            ${product.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
