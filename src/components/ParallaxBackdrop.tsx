"use client";

import { useEffect, useRef } from "react";

export function ParallaxBackdrop() {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const update = () => {
      const ratio =
        window.scrollY > window.innerHeight
          ? 1
          : window.scrollY / window.innerHeight;
      const horizontalShift = ratio * 120;
      node.style.setProperty("--parallax-shift", `${horizontalShift}px`);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={ref}
      className="parallax-backdrop pointer-events-none absolute inset-0 mix-blend-overlay opacity-70"
    >
      <div className="parallax-glow z-0" />
      <div className="parallax-grid z-10" />
    </div>
  );
}
