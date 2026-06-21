import React from "react";

function initials(name) {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}

function hueFromName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}

const statusColors = {
  online: "var(--success)",
  offline: "var(--smoke-500)",
  live: "var(--coral-400)",
};

export function Avatar({ name, src, size = 40, active = false, status = null }) {
  const hue = hueFromName(name || "anon");
  const bg = `linear-gradient(135deg, hsl(${hue}, 70%, 35%), hsl(${(hue + 60) % 360}, 70%, 25%))`;

  return (
    <span
      style={{
        position: "relative",
        display: "inline-flex",
        width: size,
        height: size,
      }}
    >
      <span
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          background: src ? `url(${src}) center/cover, ${bg}` : bg,
          color: "rgba(255,255,255,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: size * 0.32,
          fontWeight: 700,
          letterSpacing: "0.05em",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: active
            ? "0 0 0 2px var(--accent), 0 0 18px var(--accent)"
            : "var(--shadow-xs)",
          animation: active ? "av-breathe 2.4s var(--ease-velvet) infinite" : undefined,
        }}
      >
        {!src && initials(name)}
      </span>
      {status && (
        <span
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: Math.max(8, size * 0.22),
            height: Math.max(8, size * 0.22),
            borderRadius: "50%",
            background: statusColors[status],
            border: "2px solid var(--bg-page)",
            boxShadow: status === "live" ? "0 0 8px var(--coral-400)" : undefined,
          }}
        />
      )}
    </span>
  );
}
