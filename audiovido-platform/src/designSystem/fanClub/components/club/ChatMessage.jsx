import React from "react";

// Inline the Avatar logic to avoid bundler relative-import edge cases when this
// component runs in a card or kit. Same hashing scheme.
function initials(name) {
  const parts = (name || "??").trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}
function hueFromName(n) {
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360;
  return h;
}

function MiniAvatar({ name, src, size = 36, active = false }) {
  const hue = hueFromName(name || "anon");
  const bg = `linear-gradient(135deg, hsl(${hue}, 70%, 35%), hsl(${(hue + 60) % 360}, 70%, 25%))`;
  return (
    <span
      style={{
        flexShrink: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        background: src ? `url(${src}) center/cover, ${bg}` : bg,
        color: "rgba(255,255,255,0.92)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: size * 0.32,
        fontWeight: 700,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: active ? "0 0 0 2px var(--accent), 0 0 18px var(--accent)" : "none",
        animation: active ? "av-breathe 2.4s var(--ease-velvet) infinite" : undefined,
      }}
    >
      {!src && initials(name)}
    </span>
  );
}

export function ChatMessage({
  author,
  avatarSrc,
  children,
  time,
  persona = "member",
  reactions = [],
  align = "left",
}) {
  const isDJ = persona === "dj";
  const isSpot = persona === "spotlight";

  const bubbleBg = isDJ
    ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 22%, var(--void-700)) 0%, var(--void-700) 100%)"
    : isSpot
    ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 12%, var(--void-600)) 0%, var(--void-600) 100%)"
    : "var(--bg-surface)";

  const bubbleBorder = isDJ
    ? "1px solid color-mix(in oklab, var(--accent) 50%, transparent)"
    : isSpot
    ? "1px solid color-mix(in oklab, var(--accent) 30%, transparent)"
    : "1px solid var(--border-faint)";

  const bubbleShadow = isDJ
    ? "var(--shadow-md), 0 0 24px color-mix(in oklab, var(--accent) 30%, transparent)"
    : isSpot
    ? "var(--shadow-sm), 0 0 16px color-mix(in oklab, var(--accent) 25%, transparent)"
    : "var(--shadow-sm)";

  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        flexDirection: align === "right" ? "row-reverse" : "row",
        animation: `av-fade-up var(--dur-slow) var(--ease-out)`,
        animationFillMode: "both",
      }}
    >
      <MiniAvatar
        name={author}
        src={avatarSrc}
        size={isDJ ? 44 : 36}
        active={isSpot || isDJ}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: "78%", alignItems: align === "right" ? "flex-end" : "flex-start" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: isDJ ? "var(--accent)" : "var(--text-hi)", fontWeight: 700 }}>
            {author}
          </span>
          {isDJ && (
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 999,
                fontSize: 9,
                background: "color-mix(in oklab, var(--accent) 22%, transparent)",
                color: "var(--accent)",
                border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
                boxShadow: "0 0 8px color-mix(in oklab, var(--accent) 40%, transparent)",
              }}
            >
              DJ · HOST
            </span>
          )}
          {isSpot && (
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 999,
                fontSize: 9,
                background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                color: "var(--accent)",
                border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
              }}
            >
              SPOTLIGHT
            </span>
          )}
          {time && <span style={{ color: "var(--text-muted)" }}>{time}</span>}
        </div>

        <div
          style={{
            position: "relative",
            padding: isDJ ? "14px 18px" : "12px 16px",
            background: bubbleBg,
            border: bubbleBorder,
            boxShadow: bubbleShadow,
            borderRadius: 16,
            fontFamily: "var(--font-body)",
            fontSize: isDJ ? 19 : 18,
            lineHeight: 1.5,
            color: "var(--text-hi)",
          }}
        >
          {children}
        </div>

        {reactions.length > 0 && (
          <div style={{ display: "flex", gap: 6, marginTop: 2 }}>
            {reactions.map((r, i) => (
              <span
                key={i}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  padding: "2px 8px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid var(--border-soft)",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  color: "var(--text-dim)",
                }}
              >
                <span style={{ fontSize: 12 }}>{r.emoji}</span>
                {r.count}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
