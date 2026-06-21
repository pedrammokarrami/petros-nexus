import React from "react";

const sizes = {
  sm: { bezel: 12, radius: 18, innerRadius: 14 },
  md: { bezel: 18, radius: 28, innerRadius: 22 },
  lg: { bezel: 24, radius: 36, innerRadius: 28 },
};

export function TVScreen({
  children,
  scanlines = true,
  flicker = true,
  aspect = "16 / 9",
  caption,
  size = "md",
}) {
  const s = sizes[size];

  return (
    <div style={{ display: "inline-block", width: "100%" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: aspect,
          padding: s.bezel,
          borderRadius: s.radius,
          background:
            "linear-gradient(180deg, #2a2538 0%, #14131e 50%, #0c0b14 100%)",
          boxShadow:
            "var(--shadow-xl), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6)",
          transform: "perspective(1200px) rotateX(1.5deg)",
        }}
      >
        {/* Glass */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            borderRadius: s.innerRadius,
            overflow: "hidden",
            background:
              "radial-gradient(120% 90% at 50% 20%, #2a3a55 0%, #08080f 75%)",
            boxShadow:
              "inset 0 0 100px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)",
            animation: flicker ? "av-flicker 7s steps(1, end) infinite" : undefined,
          }}
        >
          {/* Content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-hi)",
            }}
          >
            {children}
          </div>

          {/* Chromatic aberration glow */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(40% 30% at 30% 30%, rgba(0, 245, 212, 0.18), transparent 70%), radial-gradient(40% 30% at 70% 70%, rgba(247, 37, 133, 0.18), transparent 70%)",
              mixBlendMode: "screen",
            }}
          />

          {/* Scanlines */}
          {scanlines && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                background:
                  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 3px)",
                opacity: 0.9,
              }}
            />
          )}

          {/* Vignette */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              boxShadow: "inset 0 0 120px rgba(0,0,0,0.7)",
              borderRadius: s.innerRadius,
            }}
          />

          {/* Slow horizontal scan */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 80,
              top: -80,
              pointerEvents: "none",
              background:
                "linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)",
              animation: "av-scan 7s linear infinite",
            }}
          />
        </div>

        {/* Bottom bezel detail */}
        <div
          style={{
            position: "absolute",
            bottom: s.bezel / 2 - 4,
            left: "50%",
            transform: "translateX(-50%)",
            width: 60,
            height: 3,
            borderRadius: 999,
            background: "rgba(255,255,255,0.1)",
            boxShadow: "0 0 6px rgba(0,245,212,0.4)",
          }}
        />
      </div>
      {caption && (
        <div
          style={{
            marginTop: 12,
            display: "flex",
            justifyContent: "center",
            color: "var(--text-dim)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          {caption}
        </div>
      )}
    </div>
  );
}
