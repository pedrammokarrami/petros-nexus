// SmokeField — canvas-based smoke / haze particles that drift upward
// with a perlin-ish wind sway. Reads --accent live so club scopes apply.

function SmokeField({ intensity = 0.5, count = 28 }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let rafId;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let w, h;
    const resize = () => {
      w = c.width = c.offsetWidth * dpr;
      h = c.height = c.offsetHeight * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const accent = (getComputedStyle(c.parentElement || c).getPropertyValue("--accent") || "#00f5d4").trim();

    const ps = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (40 + Math.random() * 80) * dpr,
      vy: -(0.15 + Math.random() * 0.4) * dpr * (0.6 + intensity * 0.8),
      phase: Math.random() * Math.PI * 2,
      sway: 0.3 + Math.random() * 0.5,
      a: 0.04 + Math.random() * 0.1,
    }));

    let t = 0;
    const step = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "screen";
      for (const p of ps) {
        p.y += p.vy;
        p.x += Math.sin(t + p.phase) * p.sway;
        if (p.y < -p.r) { p.y = h + p.r; p.x = Math.random() * w; }
        if (p.x < -p.r) p.x = w + p.r;
        if (p.x > w + p.r) p.x = -p.r;

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r);
        g.addColorStop(0, accent + "");
        g.addColorStop(0.4, accent + "");
        g.addColorStop(1, "transparent");
        ctx.globalAlpha = p.a;
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      // dust specks
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      for (let i = 0; i < 8; i++) {
        const px = (i * 71 + t * 30) % (w + 60) - 30;
        const py = (h * 0.4 + Math.sin(t * 0.5 + i) * 80) % h;
        ctx.globalAlpha = 0.15;
        ctx.fillRect(px, py, 1.5 * dpr, 1.5 * dpr);
      }
      ctx.globalAlpha = 1;
      rafId = requestAnimationFrame(step);
    };
    step();
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, [intensity, count]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
        opacity: 0.7,
      }}
    />
  );
}

window.__SmokeField = SmokeField;
