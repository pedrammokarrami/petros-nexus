/**
 * Decor — ambient corner decorations: floating vinyl record, film reel.
 * Pure CSS — no images.
 */
function VinylDecor({ side = "left", top = "12%" }) {
  return (
    <div
      style={{
        position: "absolute",
        [side]: "-60px",
        top,
        width: 200,
        height: 200,
        pointerEvents: "none",
        opacity: 0.4,
        animation: "av-drift 14s var(--ease-velvet) infinite",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, var(--void-900) 0%, var(--void-800) 12%, transparent 13%), repeating-radial-gradient(circle, var(--void-700) 0 2px, var(--void-800) 2px 4px)",
          boxShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 80px color-mix(in oklab, var(--accent) 30%, transparent)",
          animation: "spin 20s linear infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: "40%",
          borderRadius: "50%",
          background: "radial-gradient(circle, var(--accent), transparent 60%)",
          boxShadow: "0 0 24px var(--accent)",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function ReelDecor({ side = "right", top = "10%" }) {
  return (
    <div
      style={{
        position: "absolute",
        [side]: "-80px",
        top,
        width: 220,
        height: 220,
        pointerEvents: "none",
        opacity: 0.35,
        animation: "av-drift 18s var(--ease-velvet) infinite reverse",
      }}
    >
      <svg width="100%" height="100%" viewBox="0 0 200 200" style={{ animation: "spin 30s linear infinite" }}>
        <circle cx="100" cy="100" r="98" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: "var(--accent)" }} />
        <circle cx="100" cy="100" r="78" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" style={{ color: "var(--accent)" }} />
        {[0, 60, 120, 180, 240, 300].map((d) => {
          const r = (d * Math.PI) / 180;
          const x = 100 + 60 * Math.cos(r);
          const y = 100 + 60 * Math.sin(r);
          return <circle key={d} cx={x} cy={y} r="14" fill="var(--void-900)" stroke="var(--accent)" strokeWidth="1.5" />;
        })}
        <circle cx="100" cy="100" r="6" fill="var(--accent)" />
      </svg>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

window.__Decor = { VinylDecor, ReelDecor };
