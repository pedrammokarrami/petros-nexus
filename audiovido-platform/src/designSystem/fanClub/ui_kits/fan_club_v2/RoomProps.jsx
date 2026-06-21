// RoomProps — kit-local stylized venue objects (CSS/SVG, no images).
// Rock: vinyl shelf, speaker stack, bar counter, guitar case
// Cinema: film reel, projector, popcorn machine, red curtains

function VinylShelf({ top = "55%", left = "82%", rotate = 0 }) {
  return (
    <div style={{ position: "absolute", top, left, transform: `translate(-50%, -50%) rotate(${rotate}deg)`, zIndex: 3, pointerEvents: "none" }}>
      {/* wooden shelf */}
      <div style={{
        width: 240, height: 10,
        background: "linear-gradient(180deg, #5a3520 0%, #2a1810 100%)",
        boxShadow: "0 6px 14px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
        borderRadius: 2,
      }} />
      {/* records leaning */}
      <div style={{ position: "absolute", bottom: 10, left: 18, display: "flex", gap: 6 }}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} style={{
            width: 50, height: 50,
            borderRadius: "50%",
            background: "repeating-radial-gradient(circle, #0a0a0a 0 2px, #1a1a1a 2px 4px)",
            border: "1.5px solid #000",
            boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
            position: "relative",
            animation: `spin-vinyl ${8 + i * 2}s linear infinite`,
          }}>
            <div style={{
              position: "absolute", inset: "38%",
              borderRadius: "50%",
              background: i % 2 === 0 ? "var(--accent)" : "#fff",
              boxShadow: "0 0 8px var(--accent)",
            }} />
          </div>
        ))}
      </div>
      <style>{`@keyframes spin-vinyl { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function SpeakerStack({ side = "left", bottom = "8%" }) {
  return (
    <div style={{ position: "absolute", [side]: "2%", bottom, zIndex: 3, pointerEvents: "none" }}>
      {[0, 1].map((i) => (
        <div key={i} style={{
          width: 70, height: 90,
          marginBottom: i === 0 ? 2 : 0,
          background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
          border: "1px solid #2a2a2a",
          borderRadius: 6,
          boxShadow: "0 8px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
          position: "relative",
          padding: 8,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-around",
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "radial-gradient(circle, #2a2a2a 30%, #000 80%)",
            border: "2px solid #1a1a1a",
            boxShadow: "inset 0 0 8px #000, 0 0 16px color-mix(in oklab, var(--accent) 40%, transparent)",
            animation: "av-breathe 1.6s var(--ease-velvet) infinite",
          }} />
          <div style={{ width: 28, height: 18, background: "#0a0a0a", borderRadius: 2, border: "1px solid #1a1a1a" }} />
        </div>
      ))}
    </div>
  );
}

function BarCounter() {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "12%", zIndex: 3, pointerEvents: "none" }}>
      <div style={{
        position: "absolute", left: 0, right: 0, top: 0, height: "70%",
        background: "linear-gradient(180deg, #3a2515 0%, #1a0f08 100%)",
        boxShadow: "inset 0 2px 0 rgba(255,255,255,0.1), 0 -8px 24px rgba(0,0,0,0.5)",
      }} />
      {/* bottles */}
      <div style={{ position: "absolute", left: "30%", bottom: "30%", display: "flex", gap: 8, alignItems: "flex-end" }}>
        {["#5a3520", "#2a4530", "#3a2545", "#5a4520"].map((c, i) => (
          <div key={i} style={{
            width: 12, height: 36 + (i % 2) * 6,
            background: `linear-gradient(180deg, ${c}, #0a0a0a)`,
            borderRadius: "2px 2px 1px 1px",
            position: "relative",
            boxShadow: "0 0 8px rgba(0,0,0,0.6)",
          }}>
            <div style={{ position: "absolute", top: -4, left: 3, width: 6, height: 6, background: "#1a1a1a", borderRadius: 1 }} />
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", right: "20%", bottom: "30%", display: "flex", gap: 6 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{
            width: 14, height: 18,
            background: "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
            border: "1px solid rgba(255,255,255,0.2)",
            borderRadius: "1px 1px 4px 4px",
            boxShadow: "0 0 6px color-mix(in oklab, var(--accent) 50%, transparent)",
          }} />
        ))}
      </div>
    </div>
  );
}

function FilmReelDecor({ top = "55%", left = "85%", size = 160 }) {
  return (
    <div style={{ position: "absolute", top, left, transform: "translate(-50%, -50%)", zIndex: 3, pointerEvents: "none" }}>
      <svg width={size} height={size} viewBox="0 0 200 200" style={{ animation: "spin-vinyl 14s linear infinite", filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.7))" }}>
        <circle cx="100" cy="100" r="96" fill="#0c0a08" stroke="var(--accent)" strokeWidth="2" />
        <circle cx="100" cy="100" r="78" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        {[0, 60, 120, 180, 240, 300].map((d) => {
          const r = (d * Math.PI) / 180;
          const x = 100 + 60 * Math.cos(r);
          const y = 100 + 60 * Math.sin(r);
          return <circle key={d} cx={x} cy={y} r="18" fill="var(--void-900)" stroke="var(--accent)" strokeWidth="2" />;
        })}
        <circle cx="100" cy="100" r="8" fill="var(--accent)" />
      </svg>
    </div>
  );
}

function Projector({ side = "left", top = "30%" }) {
  return (
    <div style={{ position: "absolute", top, [side]: "4%", zIndex: 3, pointerEvents: "none" }}>
      <div style={{
        position: "relative",
        width: 140, height: 90,
        background: "linear-gradient(180deg, #2a1f18 0%, #110a06 100%)",
        borderRadius: 8,
        border: "1px solid #3a2a18",
        boxShadow: "0 14px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}>
        {/* two reels on top */}
        <div style={{ position: "absolute", top: -28, left: 14, width: 50, height: 50, borderRadius: "50%",
          background: "repeating-radial-gradient(circle, #1a0f08 0 2px, #2a1810 2px 4px)",
          border: "1.5px solid #0a0a0a",
          animation: "spin-vinyl 6s linear infinite",
        }} />
        <div style={{ position: "absolute", top: -28, right: 14, width: 50, height: 50, borderRadius: "50%",
          background: "repeating-radial-gradient(circle, #1a0f08 0 2px, #2a1810 2px 4px)",
          border: "1.5px solid #0a0a0a",
          animation: "spin-vinyl 6s linear infinite reverse",
        }} />
        {/* lens */}
        <div style={{
          position: "absolute", [side === "left" ? "right" : "left"]: -16, top: "50%", transform: "translateY(-50%)",
          width: 28, height: 36, borderRadius: 4,
          background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 60%, white) 30%, #1a0a0a 80%)",
          boxShadow: `0 0 28px var(--accent), 0 0 80px color-mix(in oklab, var(--accent) 50%, transparent)`,
          animation: "av-flicker 7s steps(1, end) infinite",
        }} />
      </div>
      {/* light beam */}
      <div style={{
        position: "absolute",
        [side === "left" ? "left" : "right"]: side === "left" ? 152 : "auto",
        [side === "left" ? "right" : "left"]: side === "left" ? "auto" : 152,
        top: "50%",
        transform: "translateY(-50%)",
        width: "60vw",
        height: 240,
        background: `linear-gradient(${side === "left" ? "to right" : "to left"}, color-mix(in oklab, var(--accent) 30%, transparent), transparent 80%)`,
        clipPath: side === "left"
          ? "polygon(0 30%, 0 70%, 100% 100%, 100% 0)"
          : "polygon(100% 30%, 100% 70%, 0 100%, 0 0)",
        opacity: 0.35,
        filter: "blur(8px)",
        mixBlendMode: "screen",
        pointerEvents: "none",
      }} />
    </div>
  );
}

function Curtain({ side = "left" }) {
  return (
    <div style={{
      position: "fixed",
      [side]: 0,
      top: 0,
      bottom: 0,
      width: "10vw",
      zIndex: 3,
      pointerEvents: "none",
      background: `repeating-linear-gradient(
        90deg,
        #5a0a18 0 12px,
        #2a0510 12px 24px,
        #4a0815 24px 36px
      )`,
      boxShadow: side === "left"
        ? "inset -20px 0 40px rgba(0,0,0,0.7), 20px 0 40px rgba(0,0,0,0.6)"
        : "inset 20px 0 40px rgba(0,0,0,0.7), -20px 0 40px rgba(0,0,0,0.6)",
      animation: "curtain-sway 8s var(--ease-velvet) infinite alternate",
      transformOrigin: side === "left" ? "left top" : "right top",
    }}>
      <style>{`@keyframes curtain-sway {
        0%   { transform: scaleX(1) skewX(0deg); }
        100% { transform: scaleX(1.02) skewX(0.4deg); }
      }`}</style>
    </div>
  );
}

function PopcornMachine() {
  return (
    <div style={{ position: "absolute", left: "5%", bottom: "8%", zIndex: 3, pointerEvents: "none" }}>
      <div style={{
        position: "relative",
        width: 110, height: 140,
        background: "linear-gradient(180deg, #5a1a1a 0%, #2a0808 100%)",
        border: "2px solid #3a0a0a",
        borderRadius: "8px 8px 4px 4px",
        boxShadow: "0 18px 36px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.1)",
      }}>
        {/* glass cabinet */}
        <div style={{
          position: "absolute", inset: "12px 8px 40px 8px",
          background: "linear-gradient(180deg, rgba(255,200,80,0.35), rgba(255,160,40,0.15))",
          borderRadius: 4,
          border: "1px solid rgba(255,200,80,0.4)",
          boxShadow: "inset 0 0 12px rgba(255,200,80,0.4), 0 0 24px rgba(255,200,80,0.6)",
          overflow: "hidden",
        }}>
          {/* popcorn dots */}
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} style={{
              position: "absolute",
              left: `${(i * 13 + 7) % 90}%`,
              top: `${(i * 23 + 15) % 70 + 10}%`,
              width: 8, height: 8,
              borderRadius: "50%",
              background: "#fffde0",
              boxShadow: "0 0 6px rgba(255,220,100,0.7)",
              animation: `pop-${i} 4s ${i * 0.2}s var(--ease-velvet) infinite`,
            }}>
              <style>{`@keyframes pop-${i} { 0%,90%,100% { transform: translateY(0); } 50% { transform: translateY(-${4 + (i % 3) * 2}px); } }`}</style>
            </span>
          ))}
        </div>
        {/* base */}
        <div style={{
          position: "absolute", left: 0, right: 0, bottom: 0, height: 32,
          background: "linear-gradient(180deg, #3a0a0a, #1a0404)",
          borderRadius: "0 0 4px 4px",
        }} />
      </div>
      {/* warm glow on floor */}
      <div style={{
        position: "absolute", left: -30, right: -30, bottom: -10,
        height: 30, borderRadius: "50%",
        background: "radial-gradient(closest-side, rgba(255,180,80,0.5), transparent 70%)",
        filter: "blur(8px)",
      }} />
    </div>
  );
}

window.__RoomProps = {
  VinylShelf, SpeakerStack, BarCounter,
  FilmReelDecor, Projector, Curtain, PopcornMachine,
};
