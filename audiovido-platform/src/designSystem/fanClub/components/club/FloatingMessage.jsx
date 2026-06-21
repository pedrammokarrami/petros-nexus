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

export function FloatingMessage({ author, children, persona = "member", avatarSrc, intensity = 0.5 }) {
  const isDJ = persona === "dj";
  const isSpot = persona === "spotlight";
  const hue = hueFromName(author || "?");

  const accentBubble = isDJ
    ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 28%, var(--void-700)), var(--void-700))"
    : isSpot
    ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 18%, rgba(8,8,15,0.85)), rgba(8,8,15,0.85))"
    : "rgba(8, 8, 15, 0.72)";

  const tiltY = (Math.random() - 0.5) * 4 * intensity;
  const tiltX = (Math.random() - 0.5) * 2 * intensity;

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        alignItems: "flex-start",
        perspective: 800,
        animation: "av-msg-float-in 720ms var(--ease-out) both",
      }}
    >
      {/* Avatar */}
      <div
        style={{
          flexShrink: 0,
          width: isDJ ? 44 : 36,
          height: isDJ ? 44 : 36,
          borderRadius: "50%",
          background: avatarSrc
            ? `url(${avatarSrc}) center/cover`
            : `linear-gradient(135deg, hsl(${hue},70%,35%), hsl(${(hue+60)%360},70%,25%))`,
          color: "rgba(255,255,255,0.92)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 12,
          fontWeight: 700,
          border: "1.5px solid rgba(255,255,255,0.16)",
          boxShadow:
            (isDJ || isSpot)
              ? "0 0 0 2px var(--accent), 0 0 18px var(--accent), 0 6px 18px rgba(0,0,0,0.6)"
              : "0 6px 18px rgba(0,0,0,0.6)",
          animation: (isDJ || isSpot) ? "av-breathe 2s var(--ease-velvet) infinite" : undefined,
        }}
      >
        {!avatarSrc && initials(author)}
      </div>

      {/* Bubble */}
      <div
        style={{
          transform: `rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
          transformOrigin: "0% 50%",
          padding: isDJ ? "14px 20px" : "12px 18px",
          background: accentBubble,
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          border: isDJ
            ? "1px solid color-mix(in oklab, var(--accent) 55%, transparent)"
            : isSpot
            ? "1px solid color-mix(in oklab, var(--accent) 35%, transparent)"
            : "1px solid rgba(255,255,255,0.1)",
          borderRadius: 18,
          boxShadow: isDJ
            ? "0 20px 50px rgba(0,0,0,0.7), 0 0 28px color-mix(in oklab, var(--accent) 50%, transparent)"
            : isSpot
            ? "0 14px 32px rgba(0,0,0,0.6), 0 0 18px color-mix(in oklab, var(--accent) 35%, transparent)"
            : "0 12px 28px rgba(0,0,0,0.55)",
          color: "var(--text-hi)",
          fontFamily: "var(--font-body)",
          fontSize: isDJ ? 20 : 18,
          lineHeight: 1.5,
          maxWidth: 460,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 4,
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: isDJ ? "var(--accent)" : "var(--text-dim)",
          }}
        >
          <span style={{ fontWeight: 700 }}>{author}</span>
          {isDJ && (
            <span
              style={{
                padding: "2px 6px",
                borderRadius: 999,
                background: "color-mix(in oklab, var(--accent) 22%, transparent)",
                border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
                fontSize: 9,
              }}
            >
              HOST
            </span>
          )}
        </div>
        {children}
      </div>

      <style>{`
        @keyframes av-msg-float-in {
          from { opacity: 0; transform: translateY(18px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
