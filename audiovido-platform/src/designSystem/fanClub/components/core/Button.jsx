import React from "react";

const sizeMap = {
  sm: { padY: 8,  padX: 14, fs: 12, gap: 6,  h: 32 },
  md: { padY: 10, padX: 18, fs: 13, gap: 8,  h: 40 },
  lg: { padY: 14, padX: 24, fs: 14, gap: 10, h: 48 },
};

const baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-mono)",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  borderRadius: "var(--radius-pill)",
  border: "1px solid transparent",
  cursor: "pointer",
  userSelect: "none",
  transition: "var(--t-hover)",
  whiteSpace: "nowrap",
};

const variantStyle = {
  primary: {
    background: "var(--accent)",
    color: "var(--void-900)",
    boxShadow: "var(--glow-md)",
  },
  ghost: {
    background: "rgba(255,255,255,0.04)",
    color: "var(--text-hi)",
    borderColor: "var(--border-strong)",
    backdropFilter: "blur(8px)",
  },
  glow: {
    background: "color-mix(in oklab, var(--accent) 12%, transparent)",
    color: "var(--accent)",
    borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)",
  },
};

export function Button({
  variant = "ghost",
  size = "md",
  icon,
  disabled = false,
  block = false,
  onClick,
  children,
  className = "",
}) {
  const s = sizeMap[size];
  const v = variantStyle[variant];

  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);

  const hoverFx =
    !disabled && hover
      ? variant === "primary"
        ? { filter: "brightness(1.12)", transform: press ? "translateY(0)" : "translateY(-1px)" }
        : variant === "glow"
        ? {
            background: "color-mix(in oklab, var(--accent) 22%, transparent)",
            boxShadow: "var(--glow-sm)",
            transform: press ? "translateY(0)" : "translateY(-1px)",
          }
        : {
            background: "rgba(255,255,255,0.08)",
            borderColor: "var(--accent)",
            color: "var(--text-hi)",
            transform: press ? "translateY(0)" : "translateY(-1px)",
          }
      : {};

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setPress(false); }}
      onMouseDown={() => setPress(true)}
      onMouseUp={() => setPress(false)}
      className={className}
      style={{
        ...baseStyle,
        ...v,
        padding: `${s.padY}px ${s.padX}px`,
        fontSize: s.fs,
        gap: s.gap,
        height: s.h,
        width: block ? "100%" : undefined,
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
        ...hoverFx,
      }}
    >
      {icon && <span style={{ display: "inline-flex", fontSize: s.fs + 4 }}>{icon}</span>}
      {children}
    </button>
  );
}
