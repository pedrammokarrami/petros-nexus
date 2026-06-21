import React from "react";

function initials(name) {
  const parts = (name || "??").trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}
function hueFromName(n) {
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360;
  return h;
}

export function SpatialAvatar({
  name,
  src,
  top = "60%",
  left = "30%",
  size = 48,
  activity = 0.3,
  speech,
  bubbleDir = "top",
  onClick,
}) {
  const hue = hueFromName(name || "anon");
  const bg = `linear-gradient(135deg, hsl(${hue}, 70%, 35%), hsl(${(hue + 60) % 360}, 70%, 25%))`;
  const glow = Math.max(0, Math.min(1, activity));

  return (
    <div
      style={{
        position: "absolute",
        top,
        left,
        transform: "translate(-50%, -50%)",
        zIndex: 4,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={onClick}
    >
      {/* Speech bubble */}
      {speech && (
        <div
          style={{
            position: "absolute",
            ...(bubbleDir === "top"
              ? { bottom: size + 14, left: "50%", transform: "translateX(-50%)" }
              : { left: size + 14, top: "50%", transform: "translateY(-50%)" }),
            background: "rgba(245, 244, 255, 0.96)",
            color: "var(--void-900)",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            fontWeight: 500,
            padding: "8px 12px",
            borderRadius: 14,
            whiteSpace: "nowrap",
            maxWidth: 280,
            boxShadow: "0 8px 24px rgba(0,0,0,0.5), 0 0 16px color-mix(in oklab, var(--accent) 40%, transparent)",
            animation: "av-bubble-in 220ms var(--ease-spring)",
          }}
        >
          {speech}
          {/* tail */}
          <span
            style={{
              position: "absolute",
              ...(bubbleDir === "top"
                ? { bottom: -6, left: "50%", transform: "translateX(-50%) rotate(45deg)" }
                : { left: -6, top: "50%", transform: "translateY(-50%) rotate(45deg)" }),
              width: 12,
              height: 12,
              background: "rgba(245, 244, 255, 0.96)",
            }}
          />
        </div>
      )}

      {/* Avatar */}
      <div
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
          fontSize: size * 0.34,
          fontWeight: 700,
          border: "1.5px solid rgba(255,255,255,0.18)",
          boxShadow: `
            0 0 0 ${1 + glow * 3}px color-mix(in oklab, var(--accent) ${20 + glow * 60}%, transparent),
            0 0 ${10 + glow * 30}px color-mix(in oklab, var(--accent) ${20 + glow * 60}%, transparent),
            0 6px 16px rgba(0,0,0,0.6)
          `,
          animation: glow > 0.5 ? "av-breathe 2s var(--ease-velvet) infinite" : undefined,
          transition: "box-shadow var(--dur-ambient) var(--ease-velvet)",
        }}
      >
        {!src && initials(name)}
      </div>

      {/* Name label */}
      <div
        style={{
          marginTop: 6,
          textAlign: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--text-hi)",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          whiteSpace: "nowrap",
        }}
      >
        {name}
      </div>

      {/* Floor shadow — gives the avatar groundedness */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: size + 4,
          width: size * 0.9,
          height: size * 0.15,
          transform: "translateX(-50%)",
          borderRadius: "50%",
          background: "radial-gradient(closest-side, rgba(0,0,0,0.55), transparent 70%)",
          filter: "blur(4px)",
          zIndex: -1,
        }}
      />

      <style>{`
        @keyframes av-bubble-in {
          from { opacity: 0; transform: translateX(-50%) translateY(4px) scale(0.96); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
