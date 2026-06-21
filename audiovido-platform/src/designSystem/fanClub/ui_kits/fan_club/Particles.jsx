/**
 * Particles — a slow ambient particle field driven by canvas.
 * Drift settings respond to `intensity` (0..1). Use higher values for
 * a "hype" room; lower for "chill".
 */
function Particles({ intensity = 0.5, count = 36 }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let rafId;
    let w = (c.width = c.offsetWidth * devicePixelRatio);
    let h = (c.height = c.offsetHeight * devicePixelRatio);

    const onResize = () => {
      w = c.width = c.offsetWidth * devicePixelRatio;
      h = c.height = c.offsetHeight * devicePixelRatio;
    };
    window.addEventListener("resize", onResize);

    // accent comes from CSS — read live so club scopes apply
    const accent = getComputedStyle(c).getPropertyValue("--accent").trim() || "#00f5d4";

    const ps = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.4 + 0.4) * devicePixelRatio,
      vx: (Math.random() - 0.5) * (0.15 + intensity * 0.4),
      vy: -(Math.random() * (0.3 + intensity * 0.5) + 0.1),
      a: Math.random() * 0.6 + 0.15,
      hue: Math.random(),
    }));

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `${accent}`);
        grad.addColorStop(1, "transparent");
        ctx.globalAlpha = p.a;
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = Math.min(1, p.a + 0.4);
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(step);
    };
    step();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [intensity, count]);

  return (
    <canvas
      ref={ref}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.8,
        mixBlendMode: "screen",
      }}
    />
  );
}

window.__Particles = Particles;
