"use client";

import { useEffect, useState } from "react";

type Section = {
  id: string;
  label: string;
};

export function ScrollSignal({ sections }: { sections: Section[] }) {
  const [activeId, setActiveId] = useState<string>(
    sections[0]?.id ?? "hero"
  );

  useEffect(() => {
    const handle = () => {
      const offset = window.scrollY + window.innerHeight * 0.35;
      let current = sections[0]?.id ?? "";
      let bestTop = -Infinity;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (!el) continue;
        const top = el.offsetTop;
        if (top <= offset && top > bestTop) {
          bestTop = top;
          current = section.id;
        }
      }
      setActiveId(current);
    };

    handle();
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, [sections]);

  return (
    <div className="scroll-signal hidden lg:flex">
      <div className="scroll-signal-track">
        {sections.map((section) => {
          const active = section.id === activeId;
          return (
            <button
              key={section.id}
              type="button"
              className={`scroll-signal-item ${
                active ? "is-active" : "text-neutral-500"
              }`}
              onClick={() => {
                const el = document.getElementById(section.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              <span>{section.label}</span>
              <span className="scroll-signal-dot" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
