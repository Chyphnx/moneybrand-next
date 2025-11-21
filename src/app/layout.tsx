import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Money Brand Clothing",
  description: "Street-luxury positioned between Psycho Bunny and Celine.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <div className="flex min-h-screen flex-col">
          <header className="border-b border-neutral-900 bg-black/80 backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
              <div className="text-sm font-semibold tracking-[0.28em] uppercase">
                MONEY BRAND
              </div>
              <nav className="flex gap-6 text-xs text-neutral-300">
                <a href="/" className="hover:text-amber-300">
                  Home
                </a>
                <a href="/catalog" className="hover:text-amber-300">
                  Catalog
                </a>
                <a href="#contact" className="hover:text-amber-300">
                  Contact
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-neutral-900 bg-black py-6 text-xs text-neutral-400">
            <div className="mx-auto flex max-w-6xl justify-between px-4">
              <span>© {new Date().getFullYear()} Money Brand.</span>
              <span>Positioned between Psycho Bunny and Celine.</span>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
