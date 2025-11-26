"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type Slide = {
  title: string;
  subtitle: string;
  detail: string;
  tag: string;
  image: string;
  href: string;
  accent?: "gold" | "silver" | "emerald";
};

const accentPalette: Record<NonNullable<Slide["accent"]>, string> = {
  gold: "#f5c56a",
  silver: "#cdd5e2",
  emerald: "#84f5b2",
};

export function ShowcaseCarousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(
      () => setIndex((prev) => (prev + 1) % slides.length),
      5200
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  const current = slides[index];
  const accent =
    (current.accent ? accentPalette[current.accent] : undefined) ||
    accentPalette.gold;

  return (
    <div className="grid items-center gap-8 md:grid-cols-[1fr,1.05fr]">
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.26em] text-neutral-500">
          {current.tag}
        </p>
        <h3 className="font-display text-3xl text-white">{current.title}</h3>
        <p className="text-sm text-neutral-300">{current.subtitle}</p>
        <p className="text-xs text-neutral-500">{current.detail}</p>

        <div className="flex flex-wrap items-center gap-2">
          {slides.map((slide, idx) => {
            const active = idx === index;
            return (
              <button
                key={`${slide.title}-${idx}`}
                type="button"
                onClick={() => setIndex(idx)}
                className={`h-9 min-w-[120px] rounded-full border text-[11px] uppercase tracking-[0.16em] transition ${
                  active
                    ? "border-amber-300/80 bg-amber-300 text-black shadow-[0_8px_30px_rgba(245,197,106,0.35)]"
                    : "border-neutral-800 bg-black/60 text-neutral-300 hover:border-amber-200/40 hover:text-amber-100"
                }`}
              >
                {slide.tag}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-neutral-500">
          <span className="inline-flex h-2 w-16 overflow-hidden rounded-full bg-neutral-800">
            <span
              className="block h-full rounded-full bg-amber-300 transition-[width] duration-500"
              style={{
                width: `${((index + 1) / slides.length) * 100}%`,
              }}
            />
          </span>
          <span>
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(slides.length).padStart(2, "0")}
          </span>
          <span className="text-neutral-600">Autoplay</span>
        </div>
      </div>

      <div className="relative h-[440px] overflow-hidden rounded-[32px] border border-neutral-900/70 bg-neutral-950/60 shadow-[0_24px_120px_rgba(0,0,0,0.5)]">
        <div
          className="absolute inset-0 animate-gradient-sweep opacity-70"
          style={{
            background: `conic-gradient(from 120deg, transparent 0deg, ${accent}22 140deg, transparent 280deg)`,
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(245,197,106,0.09),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(255,255,255,0.06),transparent_36%)]" />
        <Image
          src={current.image}
          alt={current.title}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/70 px-4 py-3 backdrop-blur">
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">
              {current.tag}
            </p>
            <p className="text-sm text-white">{current.title}</p>
          </div>
          <Link
            href={current.href}
            className="inline-flex items-center rounded-full border border-amber-300/60 bg-amber-300 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-black transition hover:bg-amber-200"
          >
            View
          </Link>
        </div>
        <div className="pointer-events-none absolute right-4 top-4 flex flex-col gap-2">
          <span className="rounded-full border border-amber-300/50 bg-amber-300/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-amber-50 backdrop-blur">
            Metallic & Currency
          </span>
          <span className="rounded-full border border-white/15 bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-neutral-200 backdrop-blur">
            {current.subtitle.slice(0, 32)}…
          </span>
        </div>
      </div>
    </div>
  );
}
