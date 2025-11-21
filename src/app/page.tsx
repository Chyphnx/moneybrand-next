import Image from "next/image";
import { featuredProducts } from "@/lib/products";
import { ProductGrid } from "@/components/ProductGrid";

export default function HomePage() {
  const featured = featuredProducts();

  return (
    <>
      <section className="border-b border-neutral-900 bg-gradient-to-b from-black via-neutral-950 to-black">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 md:flex-row md:items-center">
          <div className="flex-1">
            <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-400">
              Money Brand Collection 01
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-wide md:text-5xl">
              NEW ARRIVALS
            </h1>
            <p className="mt-4 max-w-xl text-sm text-neutral-200 md:text-base">
              Metallic hoodies, currency crews, and precision-cut tees—priced
              strategically above Psycho Bunny and below Celine. Built for
              people who actually move capital.
            </p>
            <a
              href="/catalog"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-amber-300 px-8 py-2 text-sm font-semibold text-black hover:bg-amber-200"
            >
              Shop the collection
            </a>
          </div>
          <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-3xl bg-neutral-900 md:mt-0 md:w-[48%]">
            <Image
              src="/img/hero-moneybrand.png"
              alt="Money Brand metallic hoodies and currency print crewnecks"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </section>

      <ProductGrid products={featured} />

      <section
        id="contact"
        className="border-t border-neutral-900 bg-black py-12 text-xs text-neutral-300"
      >
        <div className="mx-auto max-w-6xl px-4 grid gap-8 md:grid-cols-[1.1fr,1fr]">
          <div>
            <h2 className="text-sm font-semibold tracking-[0.22em] uppercase">
              Wholesale / Retail Placement
            </h2>
            <p className="mt-3 max-w-md text-neutral-400">
              For Saks, Neiman-level buyers and boutiques that sit between street
              and luxury. Submit intent here and we&apos;ll respond with line
              sheets, margin structure, and delivery windows.
            </p>
          </div>
          <form
            className="flex flex-col gap-3"
            action="/api/contact"
            method="POST"
          >
            <input
              name="name"
              placeholder="Name"
              className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs outline-none focus:border-amber-300"
            />
            <input
              name="email"
              placeholder="Email"
              className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs outline-none focus:border-amber-300"
            />
            <textarea
              name="message"
              placeholder="Regions, quantities, target client, anything important..."
              rows={3}
              className="rounded border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs outline-none focus:border-amber-300"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-2 text-xs font-semibold text-black hover:bg-amber-200"
            >
              Request line sheet / placement
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
