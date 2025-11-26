import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  allProducts,
  getProductBySlug,
  relatedProducts,
} from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";

export function generateStaticParams() {
  return allProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found – Money Brand",
    };
  }

  return {
    title: `${product.name} – Money Brand`,
    description: product.description,
    alternates: {
      canonical: `/product/${product.slug}`,
    },
    openGraph: {
      type: "website",
      title: `${product.name} – Money Brand`,
      description: product.description,
      url: `/product/${product.slug}`,
      images: [
        {
          url: product.ogImage ?? product.image,
          width: 1200,
          height: 1500,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} – Money Brand`,
      description: product.description,
      images: [product.ogImage ?? product.image],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = relatedProducts(product.slug, 4);
  const productImageAlt = `${product.name} — ${product.category} in ${product.color}`;
  const productStructuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [product.image],
    description: product.description,
    sku: product.sku,
    brand: {
      "@type": "Brand",
      name: "Money Brand",
    },
    offers: [
      {
        "@type": "Offer",
        priceCurrency: "USD",
        price: product.price,
        availability:
          product.status === "sold_out"
            ? "https://schema.org/OutOfStock"
            : product.status === "preorder"
              ? "https://schema.org/PreOrder"
              : "https://schema.org/InStock",
        url: `/product/${product.slug}`,
      },
    ],
  };
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Catalog",
        item: "/catalog",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: `/product/${product.slug}`,
      },
    ],
  };

  return (
    <main className="bg-black text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbStructuredData),
        }}
      />
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-[1.1fr,0.9fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-neutral-900 bg-neutral-950">
          {product.status !== "available" && (
            <span className="absolute left-4 top-4 z-10 inline-flex items-center rounded-full bg-black/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-300 ring-1 ring-amber-300/40">
              {product.status === "sold_out"
                ? "Sold out"
                : product.status === "preorder"
                  ? "Preorder"
                  : product.status}
            </span>
          )}
          <Image
            src={product.image}
            alt={productImageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="flex flex-col gap-4">
          <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-500">
            Money Brand / {product.category}
          </p>
          <h1 className="text-3xl font-semibold tracking-wide md:text-4xl">
            {product.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-300">
            <span className="rounded-full bg-neutral-900 px-4 py-2 font-semibold text-amber-300 ring-1 ring-amber-300/30">
              ${product.price.toLocaleString()}
            </span>
            <span className="text-neutral-400">Color: {product.color}</span>
            <span className="text-neutral-500">SKU: {product.sku}</span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-300">
            {product.description}
          </p>

          <div className="grid grid-cols-1 gap-3 text-[12px] text-neutral-400 sm:grid-cols-2">
            <div className="rounded-xl border border-neutral-900 bg-neutral-950 p-3">
              <div className="text-neutral-500">Positioning</div>
              <div className="text-sm text-neutral-200">
                Above Psycho Bunny, below Celine. Built to present luxury to
                buyers that still care about price-per-wear.
              </div>
            </div>
            <div className="rounded-xl border border-neutral-900 bg-neutral-950 p-3">
              <div className="text-neutral-500">Delivery</div>
              <div className="text-sm text-neutral-200">
                Ships worldwide. Wholesale and placement programs available for
                Saks / Neiman peers and boutique partners.
              </div>
            </div>
          </div>

          <div className="mt-2 grid gap-3 text-sm">
            <div className="rounded-xl border border-amber-300/30 bg-amber-300/5 p-4 text-amber-100">
              Precision-cut silhouettes, metallic hits, and currency artwork are
              locked and ready. Submit intent for buy sheets, margins, and
              delivery windows.
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#contact"
                className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-2 text-xs font-semibold text-black hover:bg-amber-200"
              >
                Request line sheet
              </Link>
              <Link
                href="/catalog"
                className="inline-flex items-center justify-center rounded-full border border-neutral-800 px-5 py-2 text-xs font-semibold text-neutral-200 hover:border-amber-300/60"
              >
                Back to catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProductGrid
        products={related}
        eyebrow="Curated set"
        title="Pieces that sit with this product"
        description="Keep the cart tight: stick to 3–4 pieces that tell the story of currency, metallics, and movement."
      />
    </main>
  );
}
