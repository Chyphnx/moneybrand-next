"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { DualSigil } from "./DualSigil";
import { MagneticButton } from "./MagneticButton";
import { ParallaxBackdrop } from "./ParallaxBackdrop";
import { Reveal } from "./Reveal";

type Metric = {
  label: string;
  value: string;
  detail: string;
};

type HeroCinematicProps = {
  headline: string;
  subhead: string;
  badge: string;
  ctas: Array<{ label: string; href: string; variant?: "primary" | "ghost" }>;
  metrics: Metric[];
  heroImage: string;
  heroAlt: string;
  id?: string;
};

export function HeroCinematic({
  headline,
  subhead,
  badge,
  ctas,
  metrics,
  heroImage,
  heroAlt,
  id,
}: HeroCinematicProps) {
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      const target = glowRef.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      target.style.setProperty("--glow-x", `${x}px`);
      target.style.setProperty("--glow-y", `${y}px`);
    };

    window.addEventListener("pointermove", handler);
    return () => window.removeEventListener("pointermove", handler);
  }, []);

  return (
    <section
      id={id}
      className="relative isolate overflow-hidden border border-neutral-200 bg-white text-[#050505]"
    >
      <div className="pointer-events-none absolute inset-0 opacity-80">
        <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-amber-300/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/12 blur-[140px]" />
      </div>
      <div className="mx-auto grid max-w-6xl items-end gap-10 px-4 py-16 md:grid-cols-[1.05fr,0.95fr]">
        <Reveal className="relative z-10 space-y-6">
          <p className="inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-[10px] uppercase tracking-[0.26em] text-amber-100">
            <span className="h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_0_6px_rgba(245,197,106,0.18)]" />
            {badge}
          </p>
          <h1 className="font-display text-4xl leading-tight md:text-5xl">
            {headline}
          </h1>
          <p className="max-w-2xl text-sm text-neutral-200 md:text-base">
            {subhead}
          </p>
          <div className="flex flex-wrap gap-3">
            {ctas.map((cta) => (
              <MagneticButton key={cta.label} href={cta.href} variant={cta.variant}>
                {cta.label}
              </MagneticButton>
            ))}
          </div>
          <div className="mt-2">
            <DualSigil />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-neutral-200 bg-[#f7f7f8] p-4 shadow-[0_15px_60px_rgba(0,0,0,0.08)]"
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                  {metric.label}
                </p>
                <div className="mt-2 font-display text-lg text-[#050505]">
                  {metric.value}
                </div>
                <p className="mt-1 text-xs text-neutral-500">{metric.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.3em] text-neutral-500">
            <Image
              src="/img/logo-dual.png"
              alt="Money Brand dual sigil logo"
              width={72}
              height={72}
              className="rounded-full border border-neutral-200 bg-white p-2"
            />
            <span className="text-[10px] tracking-[0.4em] text-neutral-500">
              Money Brand × Apple-grade finish
            </span>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[
              {
                src: "/img/hoodie-metallic-gold.png",
                alt: "Gold Money Brand hoodie",
              },
              {
                src: "/img/hoodie-metallic-silver.png",
                alt: "Silver Money Brand hoodie",
              },
            ].map((frame) => (
              <figure
                key={frame.src}
                className="overflow-hidden rounded-3xl border border-neutral-200 bg-[#f4f4f5]"
              >
                <Image
                  src={frame.src}
                  alt={frame.alt}
                  width={400}
                  height={500}
                  className="aspect-[3/4] object-cover object-center"
                  priority
                />
              </figure>
            ))}
          </div>
        </Reveal>
        <Reveal className="relative z-10" delay={120}>
          <div
            ref={glowRef}
            className="hero-canvas relative h-[520px] overflow-hidden rounded-[32px] border border-neutral-200 bg-[#f4f4f5] shadow-[0_30px_80px_rgba(0,0,0,0.15)]"
          >
            <ParallaxBackdrop />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(245,197,106,0.14),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(255,255,255,0.08),transparent_32%)]" />
            <div className="absolute inset-0 hero-ambient" />
            <Image
              src={heroImage}
              alt={heroAlt}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="hero-glow pointer-events-none absolute inset-0" />
            <div className="absolute inset-x-4 bottom-4 rounded-3xl border border-neutral-200 bg-white/90 px-4 py-4 shadow-[0_20px_80px_rgba(0,0,0,0.15)]">
              <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.2em] text-neutral-600">
                <span>Collection 01 — On floor now</span>
                <span className="rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-700">
                  12 pieces
                </span>
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                Metallic seals, currency artwork, and disciplined silhouettes designed to
                merchandise together on luxury floors.
              </p>
            </div>
            <div className="absolute right-4 top-4 flex flex-col gap-3">
              <div className="rounded-2xl border border-neutral-200 bg-white/60 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-neutral-600">
                Retail placement ready
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white/60 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-neutral-600">
                Metallic, currency, precision
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
