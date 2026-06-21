import React from "react";

export function LightingFx({
  spotlights = 2,
  godRays = true,
  floorWash = true,
  mood = 0.55,
}) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    >
      {/* Spotlights */}
      {Array.from({ length: spotlights }).map((_, i) => {
        const left = spotlights === 1 ? 50 : 30 + (i / (spotlights - 1)) * 40;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${left}%`,
              top: "-10%",
              width: "60%",
              height: "120%",
              transform: "translateX(-50%)",
              background: `radial-gradient(closest-side, color-mix(in oklab, var(--accent) ${30 + mood * 40}%, transparent) 0%, transparent 70%)`,
              filter: "blur(30px)",
              animation: `av-spot-sweep ${14 + i * 3}s var(--ease-velvet) ${i * 1.4}s infinite alternate`,
              opacity: 0.55,
            }}
          />
        );
      })}

      {/* God rays — diagonal beams of light coming from top corner */}
      {godRays && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `
              repeating-linear-gradient(
                70deg,
                transparent 0px,
                transparent 60px,
                rgba(255, 255, 255, 0.025) 60px,
                rgba(255, 255, 255, 0.025) 110px
              )
            `,
            maskImage: "radial-gradient(60% 70% at 25% 0%, black, transparent 75%)",
            WebkitMaskImage: "radial-gradient(60% 70% at 25% 0%, black, transparent 75%)",
            opacity: 0.7,
          }}
        />
      )}

      {/* Floor wash */}
      {floorWash && (
        <div
          style={{
            position: "absolute",
            left: "10%",
            right: "10%",
            bottom: "-20%",
            height: "60%",
            background: `radial-gradient(80% 100% at 50% 100%, color-mix(in oklab, var(--accent) ${40 + mood * 30}%, transparent) 0%, transparent 70%)`,
            filter: "blur(40px)",
            transition: "background var(--dur-ambient) var(--ease-velvet)",
          }}
        />
      )}

      <style>{`
        @keyframes av-spot-sweep {
          0%   { transform: translateX(-60%) rotate(-3deg); }
          100% { transform: translateX(-40%) rotate(3deg); }
        }
      `}</style>
    </div>
  );
}
