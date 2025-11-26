import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050509] text-[#F5F3EE]">
      {/* HERO */}
      <section className="border-b border-[#262632] bg-gradient-to-b from-black to-[#050509]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 grid gap-10 
lg:grid-cols-2 items-center">
          <div className="space-y-6">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#9C9CA5]">
              Drop 001 · Made in the USA
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
              MoneyBrand® Signature Hoodie.
            </h1>
            <p className="text-sm text-[#9C9CA5] leading-relaxed max-w-xl">
              American–made street-lux. Metallic gold foil logo, contrast
              stitching, hidden GhostPocket stash pocket, and tracker-ready
              sleeve. Built to feel like wealth, not merch.
            </p>

            <div className="flex items-baseline gap-3">
              <span className="text-2xl font-semibold">$198</span>
              <span className="text-sm text-[#9C9CA5] line-through">$320 MSRP</span>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={
                  process.env.NEXT_PUBLIC_SIGNATURE_URL ||
                  "https://YOUR-STORE-NAME.myshopify.com/products/signature-ghostpocket-hoodie"
                }
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full 
bg-[#D4AF37] text-black text-[10px] uppercase tracking-[0.25em] hover:bg-[#F3D68B] 
transition-colors"
              >
                Buy Signature Hoodie
              </Link>

              <Link
                href="#drop"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-full border 
border-[#262632] text-[10px] uppercase tracking-[0.25em] text-[#9C9CA5] hover:border-[#D4AF37] 
hover:text-[#D4AF37] transition-colors"
              >
                View Drop 001
              </Link>
            </div>

            <p className="text-[11px] text-[#9C9CA5] max-w-sm">
              Every <span className="text-[#D4AF37]">$100</span> spent sends{" "}
              <span className="text-[#D4AF37]">$20</span> to feed people, support kids,
              and help the unhoused through the holidays. One tee donated per order.
            </p>
          </div>

          <div className="relative">
            <div className="absolute inset-0 blur-3xl bg-[#D4AF37]/10 rounded-full" />
            <div className="relative rounded-3xl overflow-hidden bg-[#15151B] border 
border-[#262632] shadow-[0_24px_60px_rgba(0,0,0,0.75)]">
              <div className="w-full h-[420px] flex items-center justify-center text-[#9C9CA5] 
text-xs text-center px-6">
                Replace this block with your hero mockup image
                (e.g. /img/hero-moneybrand.png) via &lt;Image /&gt;.
              </div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between 
text-[10px] uppercase tracking-[0.25em]">
                <span className="bg-black/70 rounded-full px-3 py-1">
                  GhostPocket · Hidden Stash
                </span>
                <span className="bg-black/70 rounded-full px-3 py-1">
                  Tracker-Ready Sleeve
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DROP 001 */}
      <section
        id="drop"
        className="border-b border-[#262632] bg-[#050509] py-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Drop 001 · MoneyBrand Uniform
          </h2>
          <p className="text-sm text-[#9C9CA5] max-w-xl">
            Tight, high-signal capsule: Signature hoodie, Currency Crew,
            Wordmark tees, and classic caps. All-black and gold, all American-made.
            No filler SKUs.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-4 text-sm">
            <div className="rounded-2xl border border-[#262632] bg-[#15151B]/60 p-4 flex flex-col 
gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9C9CA5]">
                MB-001
              </span>
              <span className="font-medium">Signature GhostPocket Hoodie</span>
              <span className="text-xs text-[#9C9CA5]">Black · Gold Foil</span>
              <span className="text-sm mt-2">$198</span>
            </div>

            <div className="rounded-2xl border border-[#262632] bg-[#15151B]/60 p-4 flex flex-col 
gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9C9CA5]">
                MB-002
              </span>
              <span className="font-medium">Currency Crew Sweatshirt</span>
              <span className="text-xs text-[#9C9CA5]">
                Black · Raised Wordmark
              </span>
              <span className="text-sm mt-2">$148</span>
            </div>

            <div className="rounded-2xl border border-[#262632] bg-[#15151B]/60 p-4 flex flex-col 
gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9C9CA5]">
                MB-003
              </span>
              <span className="font-medium">Wordmark Tee · Dual Foil</span>
              <span className="text-xs text-[#9C9CA5]">
                Black or White · Gold / Silver
              </span>
              <span className="text-sm mt-2">$78</span>
            </div>

            <div className="rounded-2xl border border-[#262632] bg-[#15151B]/60 p-4 flex flex-col 
gap-2">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#9C9CA5]">
                MB-004
              </span>
              <span className="font-medium">Classic Cap · Raised Logo</span>
              <span className="text-xs text-[#9C9CA5]">
                Black · Gold or Silver Hit
              </span>
              <span className="text-sm mt-2">$68</span>
            </div>
          </div>
        </div>
      </section>

      {/* HOLIDAY LEDGER */}
      <section
        id="ledger"
        className="border-b border-[#262632] bg-black py-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-xl sm:text-2xl font-semibold">
            Holiday Ledger · Giveback Built-In
          </h2>
          <p className="text-sm text-[#9C9CA5] max-w-2xl">
            From Thanksgiving through New Year’s, MoneyBrand runs on a simple
            ledger rule: for every $100 in product, $20 is allocated to food,
            kids, and unhoused support — plus one tee donated per order.
          </p>

          <div className="grid gap-4 md:grid-cols-3 text-sm">
            <div className="rounded-2xl border border-[#262632] bg-[#15151B]/70 p-4 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C9CA5]">
                1 · Food Security
              </p>
              <p className="text-sm">
                Local meals, pantry support, and direct grocery hits in Tampa
                and surrounding areas.
              </p>
            </div>

            <div className="rounded-2xl border border-[#262632] bg-[#15151B]/70 p-4 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C9CA5]">
                2 · Kids & Gifts
              </p>
              <p className="text-sm">
                Toys, essentials, and winter basics for kids who don’t get a
                “holiday reset” by default.
              </p>
            </div>

            <div className="rounded-2xl border border-[#262632] bg-[#15151B]/70 p-4 space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C9CA5]">
                3 · Unhoused Support
              </p>
              <p className="text-sm">
                Hoodies, tees, and targeted micro-grants for people on the
                street — no marketing spin, just impact.
              </p>
            </div>
          </div>

          <p className="text-[11px] text-[#9C9CA5]">
            Full ledger summaries will be published after the holiday run, with
            transparent breakdowns of units sold, dollars allocated, and
            organizations supported.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#262632] bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row gap-3 
items-center justify-between text-[11px] text-[#9C9CA5]">
          <span>© {new Date().getFullYear()} MoneyBrand. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link href="#drop">Drop 001</Link>
            <Link href="#ledger">Holiday Ledger</Link>
            <Link href="mailto:support@moneybrandclothing.com">
              Support
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

