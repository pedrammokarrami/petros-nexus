import React from "react";

const variantMap = {
  default: {
    background: "rgba(255,255,255,0.06)",
    color: "var(--text-hi)",
    border: "1px solid var(--border-soft)",
  },
  live: {
    background: "color-mix(in oklab, var(--danger) 18%, transparent)",
    color: "#ff8da0",
    border: "1px solid color-mix(in oklab, var(--danger) 40%, transparent)",
    boxShadow: "0 0 12px rgba(255, 77, 109, 0.4)",
  },
  accent: {
    background: "color-mix(in oklab, var(--accent) 18%, transparent)",
    color: "var(--accent)",
    border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
    boxShadow: "var(--glow-sm)",
  },
  outline: {
    background: "transparent",
    color: "var(--text-dim)",
    border: "1px solid var(--border-strong)",
  },
};

export function Badge({ variant = "default", pulse = false, children }) {
  const v = variantMap[variant];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        height: 22,
        padding: "0 10px",
        borderRadius: 999,
        fontFamily: "var(--font-mono)",
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        flexShrink: 0,
        ...v,
      }}
    >
      {pulse && (
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: "currentColor",
            boxShadow: "0 0 8px currentColor",
            animation: "av-breathe 1.6s var(--ease-velvet) infinite",
          }}
        />
      )}
      {children}
    </span>
  );
}
