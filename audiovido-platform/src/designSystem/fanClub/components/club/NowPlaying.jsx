import React from "react";

function Waveform({ bars = 28 }) {
  // Deterministic pseudo-random heights so SSR + first paint match
  const heights = React.useMemo(() => {
    const out = [];
    let seed = 7;
    for (let i = 0; i < bars; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      out.push(0.25 + (seed / 233280) * 0.75);
    }
    return out;
  }, [bars]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2, height: 28, flex: 1 }}>
      {heights.map((h, i) => (
        <span
          key={i}
          style={{
            flex: 1,
            height: `${h * 100}%`,
            background: "var(--accent)",
            borderRadius: 1,
            opacity: 0.85,
            boxShadow: "0 0 4px var(--accent)",
            animation: `av-equalize ${1 + (i % 5) * 0.2}s var(--ease-in-out) ${i * 0.04}s infinite alternate`,
            transformOrigin: "center",
          }}
        />
      ))}
    </div>
  );
}

export function NowPlaying({
  track,
  artist,
  progress = 0.3,
  votable = true,
  voted = false,
  onVote,
}) {
  const [hover, setHover] = React.useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 10,
        padding: 14,
        width: 320,
        background: "rgba(18, 18, 31, 0.7)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        border: "1px solid var(--border-soft)",
        borderRadius: 14,
        boxShadow: "var(--shadow-md), 0 0 16px color-mix(in oklab, var(--accent) 18%, transparent)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 999,
            background: "radial-gradient(circle, #0c0b14 28%, var(--accent) 28% 30%, #0c0b14 30%)",
            border: "2px solid var(--void-400)",
            boxShadow: "0 0 12px var(--accent)",
            animation: "av-breathe 3s linear infinite",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <div style={{ position: "absolute", inset: 6, borderRadius: 999, border: "1px solid rgba(255,255,255,0.05)" }} />
          <div style={{ position: "absolute", inset: 12, borderRadius: 999, border: "1px solid rgba(255,255,255,0.05)" }} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
            }}
          >
            ♪ Now Playing
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 14,
              fontWeight: 600,
              color: "var(--text-hi)",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {track}
          </div>
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 12,
              color: "var(--text-dim)",
            }}
          >
            {artist}
          </div>
        </div>
        {votable && (
          <button
            onClick={onVote}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 999,
              border: "1px solid var(--border-soft)",
              background: voted ? "color-mix(in oklab, var(--accent) 20%, transparent)" : "transparent",
              color: voted ? "var(--accent)" : "var(--text-dim)",
              fontSize: 16,
              cursor: "pointer",
              transition: "var(--t-hover)",
              boxShadow: voted ? "0 0 12px color-mix(in oklab, var(--accent) 40%, transparent)" : "none",
              transform: hover ? "scale(1.08)" : "scale(1)",
            }}
            aria-label="Vote on this track"
          >
            ♥
          </button>
        )}
      </div>
      <Waveform />
      <div
        style={{
          height: 2,
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            bottom: 0,
            width: `${progress * 100}%`,
            background: "var(--accent)",
            boxShadow: "0 0 8px var(--accent)",
            transition: "width var(--dur-slower) var(--ease-velvet)",
          }}
        />
      </div>
    </div>
  );
}
