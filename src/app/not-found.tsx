import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="max-w-md space-y-4 text-center">
        <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-500">
          Money Brand
        </p>
        <h1 className="text-3xl font-semibold tracking-wide">
          Page not found
        </h1>
        <p className="text-sm text-neutral-400">
          The product or page you wanted isn&apos;t live yet. Browse the
          catalog or submit intent for line sheets and placements.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/catalog"
            className="inline-flex items-center justify-center rounded-full bg-amber-300 px-5 py-2 text-xs font-semibold text-black hover:bg-amber-200"
          >
            View catalog
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-neutral-800 px-5 py-2 text-xs font-semibold text-neutral-200 hover:border-amber-300/60"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}
