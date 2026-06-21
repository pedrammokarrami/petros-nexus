import React from "react";

const variants = {
  solid: {
    background: "var(--bg-surface)",
    border: "1px solid var(--border-faint)",
    boxShadow: "var(--shadow-sm)",
  },
  glass: {
    background: "rgba(18, 18, 31, 0.55)",
    backdropFilter: "blur(16px) saturate(160%)",
    WebkitBackdropFilter: "blur(16px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "var(--shadow-md)",
  },
  stage: {
    background:
      "radial-gradient(120% 80% at 50% 0%, var(--void-700), var(--void-900) 70%)",
    border: "1px solid var(--border-faint)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), var(--shadow-lg)",
  },
};

const padScale = { 0: 0, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 7: 32 };

export function Card({ variant = "solid", pad = 4, glow = false, onClick, children, className = "" }) {
  const [hover, setHover] = React.useState(false);
  const v = variants[variant];

  return (
    <div
      role={onClick ? "button" : undefined}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        borderRadius: "var(--radius-lg)",
        padding: padScale[pad],
        cursor: onClick ? "pointer" : "default",
        transition: "var(--t-hover)",
        ...v,
        boxShadow: glow
          ? `${v.boxShadow}, 0 0 32px color-mix(in oklab, var(--accent) 30%, transparent)`
          : v.boxShadow,
        ...(onClick && hover
          ? {
              transform: "translateY(-2px)",
              boxShadow: `${v.boxShadow}, 0 0 24px color-mix(in oklab, var(--accent) 40%, transparent)`,
            }
          : null),
      }}
    >
      {children}
    </div>
  );
}
