import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

const siteUrl = "https://moneybrandclothing.com";
const defaultTitle = "Money Brand Clothing";
const defaultDescription =
  "Currency-coded luxury house positioned between Psycho Bunny and Celine. Metallic hoodies, currency crews, precision-cut tees.";


export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Money Brand Clothing",
  },
  description: defaultDescription,
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "en": siteUrl,
    },
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: defaultTitle,
    description: defaultDescription,
    siteName: "Money Brand Clothing",
    locale: "en_US",
    images: [
      {
        url: "/img/hero-moneybrand.png",
        width: 1200,
        height: 630,
        alt: "Money Brand metallic hoodies and currency print crewnecks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/img/hero-moneybrand.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const brandJsonLd = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: "Money Brand Clothing",
    url: siteUrl,
    logo: `${siteUrl}/favicon.ico`,
    slogan: "Luxury streetwear between Psycho Bunny and Celine",
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Money Brand Clothing",
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/catalog?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <html lang="en">
      <body
        className="font-body bg-[#050505] text-[#f6f1e6] antialiased"
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([brandJsonLd, webSiteJsonLd]),
          }}
        />
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 z-30 border-b border-neutral-900/60 bg-black/70 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                <span className="rounded-full border border-amber-300/40 bg-amber-300/10 px-3 py-1 text-amber-200">
                  Collection 01 — Currency-coded luxury house
                </span>
                <span className="hidden gap-3 md:inline-flex">
                  <span className="text-neutral-500">Ships worldwide</span>
                  <span className="text-neutral-500">Retail placement ready</span>
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Link
                  href="/"
                  className="flex items-baseline gap-2 font-display text-lg tracking-[0.18em]"
                >
                  <span className="text-white">Money Brand</span>
                  <span className="text-[12px] uppercase text-amber-200">
                    Currency | Fabric | Discipline
                  </span>
                </Link>
                <nav className="flex items-center gap-5 text-[11px] uppercase tracking-[0.16em] text-neutral-300">
                  <Link href="/" className="transition hover:text-amber-200">
                    Home
                  </Link>
                  <Link href="/catalog" className="transition hover:text-amber-200">
                    Catalog
                  </Link>
                  <Link href="/#lookbook" className="transition hover:text-amber-200">
                    Lookbook
                  </Link>
                  <Link href="/#contact" className="transition hover:text-amber-200">
                    Contact
                  </Link>
                  <Link
                    href="/#contact"
                    className="inline-flex items-center rounded-full border border-amber-300/60 bg-amber-300 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-black transition hover:border-amber-200 hover:bg-amber-200"
                  >
                    Line sheet
                  </Link>
                </nav>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-neutral-900 bg-black/80 py-8 text-xs text-neutral-400">
            <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <span className="font-display text-sm text-white">Money Brand</span>
                <div className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">
                  Currency-coded luxury between Psycho Bunny and Celine
                </div>
              </div>
              <div className="flex flex-wrap gap-3 text-neutral-500">
                <span>© {new Date().getFullYear()}</span>
                <span>Worldwide shipping</span>
                <span>Retail placement ready</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
