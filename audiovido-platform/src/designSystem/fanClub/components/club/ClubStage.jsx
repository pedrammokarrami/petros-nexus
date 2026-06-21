import React from "react";
import { TVScreen } from "./TVScreen.jsx";
import { MoodMeter } from "./MoodMeter.jsx";

export function ClubStage({
  clubName,
  kicker,
  mood = 0.55,
  memberCount = 47,
  live = false,
  children,
  caption,
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 220px",
        gap: 28,
        alignItems: "start",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {kicker && (
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "var(--accent)",
                padding: "3px 10px",
                borderRadius: 999,
                background: "color-mix(in oklab, var(--accent) 14%, transparent)",
                border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
                whiteSpace: "nowrap",
              }}
            >
              {kicker}
            </span>
          )}
          {live && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontFamily: "var(--font-mono)",
                fontSize: 10,
                letterSpacing: "0.24em",
                textTransform: "uppercase",
                color: "#ff8da0",
                padding: "3px 10px",
                borderRadius: 999,
                background: "color-mix(in oklab, var(--danger) 18%, transparent)",
                border: "1px solid color-mix(in oklab, var(--danger) 40%, transparent)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 999,
                  background: "currentColor",
                  boxShadow: "0 0 8px currentColor",
                  animation: "av-breathe 1.6s var(--ease-velvet) infinite",
                }}
              />
              LIVE
            </span>
          )}
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              marginLeft: "auto",
            }}
          >
            {memberCount} vibing
          </span>
        </div>

        <h1
          style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(40px, 5.5vw, 72px)",
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
            background: "linear-gradient(180deg, var(--smoke-100) 0%, var(--smoke-300) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            textShadow:
              "0 0 24px color-mix(in oklab, var(--accent) 40%, transparent), 0 0 56px color-mix(in oklab, var(--accent) 20%, transparent)",
          }}
        >
          {clubName}
        </h1>

        <TVScreen caption={caption}>{children}</TVScreen>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "stretch", gap: 16 }}>
        <MoodMeter value={mood} sampleCount={memberCount} />
      </div>
    </div>
  );
}
