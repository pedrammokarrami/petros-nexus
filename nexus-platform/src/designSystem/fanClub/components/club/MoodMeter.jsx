import React from "react";

const labels = [
  { at: 0.0, name: "Melancholic", emoji: "🌙", color: "#3a86ff" },
  { at: 0.25, name: "Mellow", emoji: "🌌", color: "#8338ec" },
  { at: 0.5, name: "Engaged", emoji: "✨", color: "#b5179e" },
  { at: 0.75, name: "Hype", emoji: "🔥", color: "#f72585" },
  { at: 1.0, name: "Euphoric", emoji: "💥", color: "#ff8500" },
];

function pickLabel(v) {
  return labels.reduce((best, l) =>
    Math.abs(v - l.at) < Math.abs(v - best.at) ? l : best
  );
}

export function MoodMeter({
  value = 0.5,
  sampleCount = 47,
  windowLabel = "last 10 minutes",
  compact = false,
}) {
  const v = Math.max(0, Math.min(1, value));
  const lbl = pickLabel(v);
  const angle = -90 + v * 180; // -90 (left) → 90 (right)

  // arc geometry
  const R = 64;
  const cx = 80;
  const cy = 80;
  const arc = (a) => {
    const r = (a * Math.PI) / 180;
    return [cx + R * Math.cos(r), cy + R * Math.sin(r)];
  };
  const [sx, sy] = arc(180);
  const [ex, ey] = arc(0);

  return (
    <div
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        padding: "16px 20px",
        background: "rgba(18, 18, 31, 0.55)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        Club Vibe
      </div>

      <div style={{ position: "relative", width: 160, height: 96 }}>
        <svg width="160" height="96" viewBox="0 0 160 96">
          <defs>
            <linearGradient id="moodGrad" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0%" stopColor="#3a86ff" />
              <stop offset="35%" stopColor="#8338ec" />
              <stop offset="60%" stopColor="#b5179e" />
              <stop offset="85%" stopColor="#f72585" />
              <stop offset="100%" stopColor="#ff8500" />
            </linearGradient>
            <filter id="moodGlow">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* glow track */}
          <path
            d={`M ${sx} ${sy} A ${R} ${R} 0 0 1 ${ex} ${ey}`}
            stroke="url(#moodGrad)"
            strokeWidth="10"
            fill="none"
            opacity="0.4"
            filter="url(#moodGlow)"
          />
          {/* main track */}
          <path
            d={`M ${sx} ${sy} A ${R} ${R} 0 0 1 ${ex} ${ey}`}
            stroke="url(#moodGrad)"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          {/* needle */}
          <g transform={`translate(${cx} ${cy}) rotate(${angle})`} style={{ transition: "transform var(--dur-ambient) var(--ease-velvet)" }}>
            <line
              x1="0"
              y1="0"
              x2="0"
              y2={-(R - 4)}
              stroke={lbl.color}
              strokeWidth="2.5"
              strokeLinecap="round"
              filter="url(#moodGlow)"
            />
            <circle cx="0" cy="0" r="6" fill="var(--void-900)" stroke={lbl.color} strokeWidth="2" />
          </g>
        </svg>

        {!compact && (
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: -2,
              display: "flex",
              justifyContent: "space-between",
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}
          >
            <span>🌙</span>
            <span>💥</span>
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          color: "var(--text-hi)",
          transition: "color var(--dur-ambient) var(--ease-velvet)",
        }}
      >
        <span style={{ textShadow: `0 0 12px ${lbl.color}` }}>{lbl.name}</span>
        <span style={{ fontSize: 18 }}>{lbl.emoji}</span>
      </div>

      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
          textAlign: "center",
        }}
      >
        Based on {sampleCount} messages
        <br />
        in the {windowLabel}
      </div>
    </div>
  );
}
