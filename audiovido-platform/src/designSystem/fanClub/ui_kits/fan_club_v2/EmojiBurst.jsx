// EmojiBurst — particle burst when a reaction lands. Renders absolute, fixed by parent.
// Pass an array of {emoji, x, y} bursts; each lives ~1.4s then fades.

function EmojiBurst({ bursts }) {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 50 }}>
      {bursts.map((b) => (
        <Burst key={b.id} burst={b} />
      ))}
    </div>
  );
}

function Burst({ burst }) {
  const particles = React.useMemo(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      i,
      dx: (Math.random() - 0.5) * 220,
      dy: -120 - Math.random() * 180,
      rot: (Math.random() - 0.5) * 720,
      delay: Math.random() * 80,
    }));
  }, [burst.id]);

  return (
    <div style={{ position: "absolute", left: burst.x, top: burst.y, transform: "translate(-50%, -50%)" }}>
      {particles.map((p) => (
        <span
          key={p.i}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            fontSize: 22,
            opacity: 0,
            transform: `translate(0, 0) rotate(0deg)`,
            animation: `burst-${burst.id} 1400ms ${p.delay}ms var(--ease-out) forwards`,
            filter: "drop-shadow(0 0 6px var(--accent))",
          }}
        >
          {burst.emoji}
          <style>{`
            @keyframes burst-${burst.id} {
              0%   { opacity: 0; transform: translate(0,0) rotate(0); }
              15%  { opacity: 1; }
              100% { opacity: 0; transform: translate(${p.dx}px, ${p.dy}px) rotate(${p.rot}deg); }
            }
          `}</style>
        </span>
      ))}
    </div>
  );
}

window.__EmojiBurst = EmojiBurst;
