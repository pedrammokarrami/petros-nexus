import React from "react";

export function PhotoBackdrop({
  slotId,
  placeholder = "Drop a photo of the room",
  src,
  parallax = 0.15,
  grain = 0.22,
  tint,
  vignette = 0.7,
}) {
  const [scrollY, setScrollY] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Photo (image-slot allows drop). The slot lives inside a parallax wrapper. */}
      <div
        style={{
          position: "absolute",
          inset: `-${parallax * 100}px ${-parallax * 100}px`,
          transform: `translateY(${scrollY * parallax}px) scale(1.08)`,
          willChange: "transform",
          transition: "transform 80ms linear",
        }}
        // image-slot uses click/drag, so re-enable pointer events on the slot wrapper
        ref={(el) => el && (el.style.pointerEvents = "auto")}
      >
        <image-slot
          id={slotId}
          shape="rect"
          fit="cover"
          placeholder={placeholder}
          src={src}
          style={{ width: "100%", height: "100%", display: "block", background: "var(--void-900)" }}
        />
      </div>

      {/* Tint */}
      {tint && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: tint,
            mixBlendMode: "soft-light",
            opacity: 0.7,
            transition: "background var(--dur-ambient) var(--ease-velvet)",
          }}
        />
      )}

      {/* Grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "var(--noise)",
          opacity: grain,
          mixBlendMode: "overlay",
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(140% 100% at 50% 40%, transparent 40%, rgba(0,0,0,${vignette}) 100%)`,
        }}
      />

      {/* Bottom haze — makes the floor feel real */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "30%",
          background: "linear-gradient(180deg, transparent 0%, rgba(8,8,15,0.55) 60%, rgba(8,8,15,0.85) 100%)",
        }}
      />
    </div>
  );
}
