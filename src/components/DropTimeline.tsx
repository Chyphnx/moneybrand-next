"use client";

import { useMemo, useState } from "react";
import { MagneticButton } from "./MagneticButton";
import { Reveal } from "./Reveal";

type DropItem = {
  title: string;
  status: string;
  detail: string;
  release: string;
  ctaLabel: string;
  ctaHref: string;
};

export function DropTimeline({ items }: { items: DropItem[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeItem = items[activeIndex];

  const gradientString = useMemo(() => {
    const colors = ["#f5c56a", "#f6f1e6", "#d5a24d"];
    return `conic-gradient(
      from ${activeIndex * 90}deg,
      ${colors[0]} 0deg,
      ${colors[1]} 120deg,
      ${colors[2]} 220deg,
      transparent 360deg
    )`;
  }, [activeIndex]);

  return (
    <section className="timeline-section relative overflow-hidden rounded-3xl border border-neutral-900/70 bg-neutral-950/60 px-4 py-8 shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
      <Reveal className="mb-6 grid gap-4 md:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-3">
          {items.map((item, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={item.title}
                type="button"
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                className={`timeline-chip ${
                  active
                    ? "border-amber-300/70 bg-amber-300/10 text-amber-100 shadow-[0_10px_40px_rgba(245,197,106,0.35)]"
                    : "border-neutral-800 bg-black/40 text-neutral-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.26em]">
                    {item.release}
                  </span>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-neutral-500">
                    {item.status}
                  </span>
                </div>
                <p className="mt-1 text-sm font-semibold">{item.title}</p>
              </button>
            );
          })}
        </div>
        <div className="timeline-detail relative rounded-3xl border border-white/10 bg-black/50 p-5 text-sm text-neutral-300">
          <div
            className="absolute inset-0 opacity-30 blur-[40px]"
            style={{ background: gradientString }}
          />
          <div className="relative space-y-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              Active drop
            </p>
            <h3 className="font-display text-2xl text-white">
              {activeItem.title}
            </h3>
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-400">
              {activeItem.status}
            </p>
            <p className="text-sm text-neutral-300">{activeItem.detail}</p>
            <MagneticButton href={activeItem.ctaHref} variant="primary">
              {activeItem.ctaLabel}
            </MagneticButton>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
