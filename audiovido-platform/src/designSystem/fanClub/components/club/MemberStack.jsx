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

function Dot({ status }) {
  if (!status) return null;
  const color =
    status === "live" ? "var(--coral-400)" :
    status === "online" ? "var(--success)" :
    "var(--smoke-500)";
  return (
    <span
      style={{
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 10,
        height: 10,
        borderRadius: 999,
        background: color,
        border: "2px solid var(--void-700)",
        boxShadow: status === "live" ? "0 0 6px var(--coral-400)" : undefined,
      }}
    />
  );
}

export function MemberStack({ members, limit = 7, heading = "On the floor" }) {
  const shown = members.slice(0, limit);
  const extra = Math.max(0, members.length - limit);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        {heading} <span style={{ color: "var(--text-hi)", fontWeight: 700 }}>· {members.length}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {shown.map((m, i) => {
          const hue = hueFromName(m.name);
          const bg = `linear-gradient(135deg, hsl(${hue}, 70%, 35%), hsl(${(hue + 60) % 360}, 70%, 25%))`;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ position: "relative", display: "inline-flex" }}>
                <span
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: m.avatarSrc ? `url(${m.avatarSrc}) center/cover, ${bg}` : bg,
                    color: "rgba(255,255,255,0.92)",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 700,
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: m.active
                      ? "0 0 0 2px var(--accent), 0 0 12px var(--accent)"
                      : "none",
                    animation: m.active ? "av-breathe 2.4s var(--ease-velvet) infinite" : undefined,
                  }}
                >
                  {!m.avatarSrc && initials(m.name)}
                </span>
                <Dot status={m.status} />
              </span>
              <div style={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1 }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text-hi)",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {m.name}
                </span>
                {m.active && (
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: "var(--accent)",
                    }}
                  >
                    on the mic
                  </span>
                )}
              </div>
            </div>
          );
        })}
        {extra > 0 && (
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              marginLeft: 44,
            }}
          >
            + {extra} more in the room
          </div>
        )}
      </div>
    </div>
  );
}
