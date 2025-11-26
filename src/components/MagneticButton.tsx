"use client";

import Link from "next/link";
import { useRef } from "react";

type MagneticButtonProps = {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  variant?: "primary" | "ghost";
};

const cls = (...parts: Array<string | undefined | false>) =>
  parts.filter(Boolean).join(" ");

export function MagneticButton({
  children,
  href,
  className,
  onClick,
  variant = "primary",
}: MagneticButtonProps) {
  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const handleMove = (event: React.MouseEvent) => {
    const node = (href ? anchorRef.current : buttonRef.current) as
      | HTMLAnchorElement
      | HTMLButtonElement
      | null;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;
    node.style.setProperty("--mx", `${offsetX * 0.08}px`);
    node.style.setProperty("--my", `${offsetY * 0.14}px`);
  };

  const handleLeave = () => {
    const node = (href ? anchorRef.current : buttonRef.current) as
      | HTMLAnchorElement
      | HTMLButtonElement
      | null;
    if (!node) return;
    node.style.setProperty("--mx", "0px");
    node.style.setProperty("--my", "0px");
  };

  const baseClasses =
    variant === "primary"
      ? "bg-amber-300 text-black border border-amber-300/60 hover:bg-amber-200"
      : "border border-neutral-800 text-neutral-100 hover:border-amber-200 hover:text-amber-100";

  const sharedProps = {
    className: cls(
      "magnetic inline-flex items-center justify-center rounded-full px-6 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] transition-transform duration-200",
      baseClasses,
      className
    ),
    onMouseMove: handleMove,
    onMouseLeave: handleLeave,
    onClick,
  };

  if (href) {
    return (
      <Link href={href} ref={anchorRef} {...sharedProps}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" ref={buttonRef} {...sharedProps}>
      {children}
    </button>
  );
}
