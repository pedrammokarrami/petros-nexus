import React from "react";

const sizes = {
  sm: { h: 36, fs: 14, padX: 12, gap: 8 },
  md: { h: 44, fs: 15, padX: 14, gap: 10 },
  lg: { h: 56, fs: 17, padX: 18, gap: 12 },
};

export function Input({
  value,
  onChange,
  placeholder,
  icon,
  suffix,
  size = "md",
  glow = true,
  onSubmit,
  disabled = false,
}) {
  const s = sizes[size];
  const [focused, setFocused] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: s.gap,
        height: s.h,
        padding: `0 ${s.padX}px`,
        background: "rgba(255,255,255,0.04)",
        border: `1px solid ${focused ? "color-mix(in oklab, var(--accent) 60%, transparent)" : "var(--border-soft)"}`,
        borderRadius: "var(--radius-pill)",
        transition: "var(--t-hover)",
        boxShadow: focused && glow ? "var(--glow-sm)" : "none",
        opacity: disabled ? 0.4 : 1,
        pointerEvents: disabled ? "none" : "auto",
      }}
    >
      {icon && (
        <span style={{ color: focused ? "var(--accent)" : "var(--text-muted)", display: "inline-flex", fontSize: s.fs + 2, transition: "color var(--dur-fast)" }}>
          {icon}
        </span>
      )}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) onSubmit(value);
        }}
        style={{
          flex: 1,
          background: "transparent",
          border: "none",
          outline: "none",
          color: "var(--text-hi)",
          fontFamily: "var(--font-body)",
          fontSize: s.fs,
          minWidth: 0,
        }}
      />
      {suffix}
    </div>
  );
}
