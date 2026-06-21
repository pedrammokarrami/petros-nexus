import React from "react";

export function Bartender({
  name = "Bartender",
  slotId,
  placeholder = "Drop a bartender character",
  src,
  lines = [],
  speak = null,
  interval = 5000,
  side = "right",
  size = 120,
}) {
  const [i, setI] = React.useState(0);

  React.useEffect(() => {
    if (speak || !lines.length) return;
    const t = setInterval(() => setI((x) => (x + 1) % lines.length), interval);
    return () => clearInterval(t);
  }, [speak, lines.length, interval]);

  const line = speak || lines[i];

  return (
    <div
      style={{
        position: "fixed",
        top: 88,
        [side]: 32,
        zIndex: 8,
        display: "flex",
        flexDirection: side === "right" ? "row-reverse" : "row",
        alignItems: "flex-end",
        gap: 14,
        pointerEvents: "none",
      }}
    >
      {/* Portrait */}
      <div
        style={{
          position: "relative",
          width: size,
          height: size * 1.2,
          borderRadius: 14,
          background: "var(--void-700)",
          border: "1px solid var(--border-soft)",
          boxShadow: "var(--shadow-lg), 0 0 24px color-mix(in oklab, var(--accent) 35%, transparent)",
          overflow: "hidden",
          pointerEvents: "auto",
          filter: "saturate(1.1) contrast(1.05)",
        }}
      >
        <image-slot
          id={slotId}
          shape="rect"
          fit="cover"
          placeholder={placeholder}
          src={src}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
        {/* nameplate */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            padding: "6px 10px",
            background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.85))",
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-hi)",
            textAlign: "center",
          }}
        >
          {name}
        </div>
        {/* warm light from above */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(80% 50% at 50% 0%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 70%)",
            mixBlendMode: "screen",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Speech bubble */}
      {line && (
        <div
          key={line + i + (speak || "")}
          style={{
            maxWidth: 280,
            padding: "12px 16px",
            background: "rgba(245, 244, 255, 0.96)",
            color: "var(--void-900)",
            fontFamily: "var(--font-body)",
            fontSize: 15,
            lineHeight: 1.4,
            fontWeight: 500,
            borderRadius: 16,
            position: "relative",
            boxShadow: "0 14px 32px rgba(0,0,0,0.6), 0 0 18px color-mix(in oklab, var(--accent) 35%, transparent)",
            animation: "av-bub-pop 360ms var(--ease-spring)",
            pointerEvents: "auto",
          }}
        >
          {line}
          <span
            style={{
              position: "absolute",
              ...(side === "right"
                ? { right: -6, bottom: 18 }
                : { left: -6, bottom: 18 }),
              width: 14,
              height: 14,
              background: "rgba(245, 244, 255, 0.96)",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      )}

      <style>{`
        @keyframes av-bub-pop {
          from { opacity: 0; transform: translateY(6px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `}</style>
    </div>
  );
}
