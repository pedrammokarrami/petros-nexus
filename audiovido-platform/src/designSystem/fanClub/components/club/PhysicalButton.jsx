import React from "react";

export function PhysicalButton({ variant, label, icon, active = false, onClick }) {
  const [hover, setHover] = React.useState(false);

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick,
  };

  if (variant === "drink") {
    // Cocktail glass — triangular bowl with liquid line and stem
    return (
      <button
        {...handlers}
        style={{
          position: "relative",
          width: 88,
          height: 110,
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transition: "var(--t-hover)",
          transform: hover ? "translateY(-4px) scale(1.04)" : "translateY(0)",
        }}
      >
        <svg width="88" height="110" viewBox="0 0 88 110">
          <defs>
            <linearGradient id="liquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.55" />
            </linearGradient>
            <filter id="glassBlur"><feGaussianBlur stdDeviation="0.6" /></filter>
          </defs>
          {/* glass bowl outline */}
          <path
            d="M 10 8 L 78 8 L 50 62 L 38 62 Z"
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="1.2"
            filter="url(#glassBlur)"
          />
          {/* liquid */}
          <path
            d="M 18 16 L 70 16 L 49 56 L 39 56 Z"
            fill="url(#liquid)"
            style={{ filter: `drop-shadow(0 0 ${hover ? 14 : 8}px var(--accent))` }}
          />
          {/* highlight */}
          <path d="M 16 12 L 22 12 L 30 32" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
          {/* stem */}
          <rect x="42" y="62" width="4" height="32" fill="rgba(255,255,255,0.35)" />
          {/* base */}
          <ellipse cx="44" cy="98" rx="20" ry="3" fill="rgba(255,255,255,0.35)" />
          {/* shadow on floor */}
          <ellipse cx="44" cy="104" rx="26" ry="3" fill="rgba(0,0,0,0.5)" filter="url(#glassBlur)" />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 38,
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-hi)",
            textShadow: "0 0 6px var(--accent)",
            pointerEvents: "none",
          }}
        >
          {label}
        </div>
      </button>
    );
  }

  if (variant === "jukebox") {
    // Chrome knob
    return (
      <button
        {...handlers}
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          padding: 0,
          background: "radial-gradient(circle at 30% 30%, #444 0%, #1a1a1a 45%, #0a0a0a 100%)",
          boxShadow: `
            inset 0 4px 6px rgba(255,255,255,0.2),
            inset 0 -4px 6px rgba(0,0,0,0.8),
            0 6px 20px rgba(0,0,0,0.7),
            0 0 ${hover ? 28 : 14}px color-mix(in oklab, var(--accent) ${hover ? 70 : 35}%, transparent)
          `,
          position: "relative",
          transition: "var(--t-hover)",
          transform: hover ? "rotate(15deg)" : "rotate(0deg)",
        }}
      >
        {/* indicator */}
        <span
          style={{
            position: "absolute",
            top: 8,
            left: "50%",
            transform: "translateX(-50%)",
            width: 4,
            height: 18,
            borderRadius: 2,
            background: "var(--accent)",
            boxShadow: "0 0 8px var(--accent)",
          }}
        />
        {/* chrome ring */}
        <span
          style={{
            position: "absolute",
            inset: 4,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        />
        {/* center label */}
        <span
          style={{
            position: "absolute",
            inset: 24,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 9,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--accent)",
            textShadow: "0 0 6px var(--accent)",
          }}
        >
          {icon || label.slice(0, 4)}
        </span>
      </button>
    );
  }

  if (variant === "arcade") {
    // Pushbutton — concave glowing dome
    const pressed = active;
    return (
      <button
        {...handlers}
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          padding: 0,
          background: "radial-gradient(circle at 40% 35%, color-mix(in oklab, var(--accent) 90%, white) 0%, var(--accent) 50%, color-mix(in oklab, var(--accent) 60%, black) 100%)",
          boxShadow: `
            inset 0 6px 10px rgba(255,255,255,0.45),
            inset 0 -8px 12px rgba(0,0,0,0.45),
            0 ${pressed ? 2 : 10}px ${pressed ? 4 : 20}px rgba(0,0,0,0.7),
            0 0 ${hover ? 36 : 20}px var(--accent),
            0 0 ${hover ? 80 : 48}px color-mix(in oklab, var(--accent) 45%, transparent)
          `,
          position: "relative",
          transition: "var(--t-hover)",
          transform: pressed ? "translateY(4px)" : hover ? "translateY(-2px)" : "translateY(0)",
        }}
      >
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--void-900)",
            fontWeight: 800,
            textShadow: "0 1px 0 rgba(255,255,255,0.3)",
          }}
        >
          {icon ? <span style={{ fontSize: 24 }}>{icon}</span> : label.slice(0, 5)}
        </span>
      </button>
    );
  }

  // neon — glowing pill
  return (
    <button
      {...handlers}
      style={{
        padding: "12px 22px",
        border: "1.5px solid var(--accent)",
        borderRadius: 999,
        background: "rgba(8, 8, 15, 0.55)",
        backdropFilter: "blur(10px)",
        color: "var(--accent)",
        fontFamily: "var(--font-display)",
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "var(--t-hover)",
        textShadow: "0 0 8px var(--accent)",
        boxShadow: `
          inset 0 0 12px color-mix(in oklab, var(--accent) 25%, transparent),
          0 0 ${hover ? 28 : 16}px var(--accent),
          0 0 ${hover ? 56 : 32}px color-mix(in oklab, var(--accent) 50%, transparent)
        `,
        transform: hover ? "translateY(-2px)" : "none",
      }}
    >
      {icon} {label}
    </button>
  );
}
