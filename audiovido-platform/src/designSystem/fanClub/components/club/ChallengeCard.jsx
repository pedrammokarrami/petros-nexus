import React from "react";

export function ChallengeCard({
  title,
  description,
  progress,
  progressLabel,
  tag,
  onJoin,
}) {
  const pct = Math.max(0, Math.min(1, progress));
  return (
    <div
      style={{
        position: "relative",
        padding: 16,
        background: "rgba(18, 18, 31, 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid color-mix(in oklab, var(--accent) 22%, var(--border-soft))",
        borderRadius: 14,
        boxShadow: "var(--shadow-sm), 0 0 24px color-mix(in oklab, var(--accent) 18%, transparent)",
        overflow: "hidden",
      }}
    >
      {/* corner glow */}
      <div
        style={{
          position: "absolute",
          inset: -40,
          background:
            "radial-gradient(40% 60% at 100% 0%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        {tag && (
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--accent)",
              padding: "3px 8px",
              borderRadius: 999,
              background: "color-mix(in oklab, var(--accent) 14%, transparent)",
              border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
            }}
          >
            {tag}
          </span>
        )}
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          ⚡ Challenge
        </span>
      </div>

      <div
        style={{
          position: "relative",
          fontFamily: "var(--font-display)",
          fontSize: 18,
          fontWeight: 700,
          color: "var(--text-hi)",
          marginBottom: 4,
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      {description && (
        <div
          style={{
            position: "relative",
            fontFamily: "var(--font-body)",
            fontSize: 13,
            color: "var(--text-dim)",
            marginBottom: 14,
            lineHeight: 1.5,
          }}
        >
          {description}
        </div>
      )}

      <div
        style={{
          position: "relative",
          height: 6,
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct * 100}%`,
            background: "linear-gradient(90deg, color-mix(in oklab, var(--accent) 60%, white) 0%, var(--accent) 100%)",
            boxShadow: "0 0 12px var(--accent)",
            transition: "width var(--dur-slower) var(--ease-velvet)",
            borderRadius: 999,
          }}
        />
      </div>

      <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            color: "var(--text-dim)",
            letterSpacing: "0.1em",
          }}
        >
          {progressLabel || `${Math.round(pct * 100)}%`}
        </span>
        {onJoin && (
          <button
            onClick={onJoin}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 700,
              color: "var(--accent)",
              background: "transparent",
              border: "none",
              cursor: "pointer",
            }}
          >
            Join →
          </button>
        )}
      </div>
    </div>
  );
}
