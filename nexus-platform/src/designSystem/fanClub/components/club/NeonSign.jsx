import React from "react";

export function NeonSign({
  children,
  style = "tube",
  color,
  size = 56,
  flicker = false,
  framed = false,
  rotate = 0,
}) {
  const c = color || "var(--accent)";

  const tubeStyle = {
    color: "#fff",
    WebkitTextStroke: `1.5px ${c}`,
    textShadow: `
      0 0 4px #fff,
      0 0 10px ${c},
      0 0 24px ${c},
      0 0 48px ${c}
    `,
  };
  const solidStyle = {
    color: c,
    textShadow: `
      0 0 6px ${c},
      0 0 18px ${c},
      0 0 36px ${c},
      0 0 80px color-mix(in oklab, ${c} 50%, transparent)
    `,
  };

  return (
    <div
      style={{
        display: "inline-block",
        transform: `rotate(${rotate}deg)`,
        ...(framed
          ? {
              padding: "12px 20px",
              border: `1px solid color-mix(in oklab, ${c} 35%, transparent)`,
              borderRadius: 8,
              background: "rgba(8, 8, 15, 0.35)",
              boxShadow: `inset 0 0 24px color-mix(in oklab, ${c} 18%, transparent), 0 0 32px color-mix(in oklab, ${c} 25%, transparent)`,
            }
          : null),
      }}
    >
      <span
        style={{
          display: "inline-block",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: size,
          lineHeight: 1,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          animation: flicker ? "av-neon-flicker 8s steps(1, end) infinite" : undefined,
          ...(style === "tube" ? tubeStyle : solidStyle),
        }}
      >
        {children}
      </span>

      <style>{`
        @keyframes av-neon-flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          20%, 24%, 55% {
            opacity: 0.4;
            filter: brightness(0.6);
          }
          85%, 86% {
            opacity: 0.7;
            filter: brightness(0.8);
          }
        }
      `}</style>
    </div>
  );
}
