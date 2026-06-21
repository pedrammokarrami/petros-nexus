import React from "react";

const sizes = {
  sm: { d: 32, fs: 14 },
  md: { d: 40, fs: 16 },
  lg: { d: 48, fs: 20 },
};

const variants = {
  primary: {
    background: "var(--accent)",
    color: "var(--void-900)",
    boxShadow: "var(--glow-md)",
  },
  ghost: {
    background: "rgba(255,255,255,0.04)",
    color: "var(--text-hi)",
    border: "1px solid var(--border-strong)",
    backdropFilter: "blur(8px)",
  },
  glow: {
    background: "color-mix(in oklab, var(--accent) 14%, transparent)",
    color: "var(--accent)",
    border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)",
  },
};

export function IconButton({
  variant = "ghost",
  size = "md",
  children,
  label,
  disabled = false,
  badge = false,
  onClick,
}) {
  const s = sizes[size];
  const v = variants[variant];
  const [hover, setHover] = React.useState(false);

  return (
    <button
      aria-label={label}
      title={label}
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: s.d,
        height: s.d,
        fontSize: s.fs,
        borderRadius: "50%",
        cursor: "pointer",
        transition: "var(--t-hover)",
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
        ...v,
        ...(hover && !disabled
          ? {
              transform: "translateY(-1px)",
              boxShadow: variant === "primary" ? "var(--glow-lg)" : "var(--glow-sm)",
              filter: "brightness(1.1)",
            }
          : null),
      }}
    >
      {children}
      {badge && (
        <span
          style={{
            position: "absolute",
            top: 4,
            right: 4,
            width: 8,
            height: 8,
            borderRadius: 999,
            background: "var(--coral-400)",
            boxShadow: "0 0 8px var(--coral-400)",
          }}
        />
      )}
    </button>
  );
}
