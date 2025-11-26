"use client";

export function DualSigil() {
  return (
    <div className="dual-sigil" aria-hidden="true">
      <div className="dual-sigil-half dual-sigil-half-left">
        <span className="dual-sigil-eye" />
        <span className="dual-sigil-lines dual-sigil-lines-left" />
      </div>
      <div className="dual-sigil-half dual-sigil-half-right">
        <span className="dual-sigil-eye" />
        <span className="dual-sigil-lines dual-sigil-lines-right" />
      </div>
      <div className="dual-sigil-border" />
    </div>
  );
}
