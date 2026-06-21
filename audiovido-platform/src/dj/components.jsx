import { useState, useRef, useEffect, useCallback } from "react";

/* ============================================================
   KNOB — rotary control, vertical-drag to turn (DJ convention)
   ============================================================ */
function Knob({ size = 58, label, sub, subColor, ticks = true, start = 0.5, indicatorColor = "#e8edf2" }) {
  const [val, setVal] = useState(start); // 0..1
  const dragging = useRef(false);
  const last = useRef(0);

  const onDown = (e) => {
    e.preventDefault();
    dragging.current = true;
    last.current = e.clientY;
    e.target.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const dy = last.current - e.clientY;
    last.current = e.clientY;
    setVal((v) => Math.max(0, Math.min(1, v + dy / 160)));
  };
  const onUp = (e) => {
    dragging.current = false;
    e.target.releasePointerCapture?.(e.pointerId);
  };

  const angle = -135 + val * 270; // -135..135

  const tickEls = [];
  if (ticks) {
    for (let i = 0; i <= 10; i++) {
      const a = -135 + (i / 10) * 270;
      tickEls.push(
        <div key={i} className="knob-tick" style={{ transform: `rotate(${a}deg)` }}>
          <span style={{ background: i / 10 <= val ? "#39b6ff" : "rgba(255,255,255,0.22)" }} />
        </div>
      );
    }
  }

  return (
    <div className="knob-wrap">
      <div className="knob-area" style={{ width: size + 22, height: size + 22 }}>
        {ticks && <div className="knob-ticks">{tickEls}</div>}
        <div
          className="knob"
          style={{ width: size, height: size, cursor: "ns-resize", touchAction: "none" }}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
        >
          <div className="knob-face" style={{ transform: `rotate(${angle}deg)` }}>
            <div className="knob-pointer" style={{ background: indicatorColor }} />
          </div>
        </div>
      </div>
      {label && <div className="knob-label">{label}</div>}
      {sub && <div className="knob-sub" style={{ color: subColor || "#7e858d" }}>{sub}</div>}
    </div>
  );
}

/* ============================================================
   LED BUTTON — rectangular soft button with a light bar
   ============================================================ */
function LedButton({ label, sub, color = "#39b6ff", w = 92, h = 40, defaultOn = false, ledStyle = "bar", textColor }) {
  const [on, setOn] = useState(defaultOn);
  const [press, setPress] = useState(false);
  return (
    <div className="ledbtn-wrap" style={{ width: w }}>
      <button
        className={"ledbtn" + (on ? " on" : "") + (press ? " press" : "")}
        style={{
          width: w, height: h,
          "--led": color,
          boxShadow: on ? `0 0 14px -1px ${color}, inset 0 0 0 1.5px ${color}` : undefined,
        }}
        onPointerDown={() => setPress(true)}
        onPointerUp={() => setPress(false)}
        onPointerLeave={() => setPress(false)}
        onClick={() => setOn((o) => !o)}
      >
        {ledStyle === "bar" ? (
          <span className="led-bar" style={{ background: on ? color : "#3a1414", boxShadow: on ? `0 0 8px ${color}` : "none" }} />
        ) : (
          <span className="ledbtn-text" style={{ color: textColor || (on ? "#fff" : "#aab0b6") }}>{label}</span>
        )}
        {ledStyle === "bar" && label && <span className="ledbtn-toptext" style={{ color: textColor }}>{label}</span>}
      </button>
      {sub && <div className="ledbtn-sub">{sub}</div>}
    </div>
  );
}

/* ============================================================
   ROUND BUTTON — SYNC / CUE / PLAY metal buttons
   ============================================================ */
function RoundButton({ size = 70, label, glyph, sub, toggle = false, big = false, color = "#cfd4da", labelColor }) {
  const [on, setOn] = useState(false);
  const [press, setPress] = useState(false);
  return (
    <div className="round-wrap">
      <button
        className={"roundbtn" + (press ? " press" : "") + (on ? " on" : "")}
        style={{ width: size, height: size }}
        onPointerDown={() => setPress(true)}
        onPointerUp={() => setPress(false)}
        onPointerLeave={() => setPress(false)}
        onClick={() => toggle && setOn((o) => !o)}
      >
        <span className="roundbtn-inner">
          {glyph && <span className="roundbtn-glyph" style={{ color: labelColor || color }}>{glyph}</span>}
          {label && <span className="roundbtn-label" style={{ color: labelColor || color }}>{label}</span>}
        </span>
      </button>
      {sub && <div className="round-sub">{sub}</div>}
    </div>
  );
}

/* ============================================================
   PAD — performance pad, lights up + presses in 3D
   ============================================================ */
function Pad({ color }) {
  const [press, setPress] = useState(false);
  return (
    <button
      className={"pad" + (press ? " press" : "")}
      style={{ "--pc": color }}
      onPointerDown={() => setPress(true)}
      onPointerUp={() => setPress(false)}
      onPointerLeave={() => setPress(false)}
    >
      <span className="pad-glow" />
      <span className="pad-sheen" />
    </button>
  );
}

/* ============================================================
   TEMPO FADER — vertical pitch fader, drives real playback rate
   ============================================================ */
function TempoFader() {
  const [val, setVal] = useState(0.5); // 0 top .. 1 bottom
  const trackRef = useRef(null);
  const dragging = useRef(false);

  // map fader position to playback rate: top (+) faster, bottom (–) slower
  const applyRate = (v) => {
    const rate = 1 + (0.5 - v) * 0.6; // ±30%
    if (window.djEngine) window.djEngine.setRate(rate);
  };
  const pct = Math.round((1 + (0.5 - val) * 0.6 - 1) * 100);

  const setFromEvent = (e) => {
    const r = trackRef.current.getBoundingClientRect();
    let v = Math.max(0, Math.min(1, (e.clientY - r.top) / r.height));
    setVal(v);
    applyRate(v);
  };
  const onDown = (e) => { e.preventDefault(); dragging.current = true; e.target.setPointerCapture?.(e.pointerId); setFromEvent(e); };
  const onMove = (e) => { if (dragging.current) setFromEvent(e); };
  const onUp = (e) => { dragging.current = false; e.target.releasePointerCapture?.(e.pointerId); };

  return (
    <div className="fader-col">
      <div className="fader-label">TEMPO</div>
      <div className="fader-pct">{pct > 0 ? "+" : ""}{pct}%</div>
      <div className="fader-body">
        <div className="fader-ticks left">{Array.from({ length: 15 }).map((_, i) => <span key={i} />)}</div>
        <div ref={trackRef} className="fader-track" onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} style={{ touchAction: "none" }}>
          <div className="fader-slot" />
          <div className="fader-cap" style={{ top: `calc(${val * 100}% )` }}>
            <span className="fader-cap-line" />
          </div>
        </div>
        <div className="fader-ticks right">
          <span className="fader-mark top">+</span>
          <span className="fader-mark mid">0</span>
          <span className="fader-mark bot">–</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   JOG WHEEL — spins in sync with real playback; drag = scratch
   (falls back to free-spin + inertia when no track is loaded)
   ============================================================ */
function JogWheel({ size = 600 }) {
  const platterRef = useRef(null);
  const rot = useRef(0);
  const vel = useRef(0);        // deg per ms (used only for free-spin fallback)
  const dragging = useRef(false);
  const lastAngle = useRef(0);
  const lastTime = useRef(0);
  const baseRot = useRef(0);
  const baseTime = useRef(0);
  const [touched, setTouched] = useState(false);
  const [hasTrack, setHasTrack] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const eng = window.djEngine;
    if (!eng) return;
    setHasTrack(eng.loaded); setPlaying(eng.playing);
    return eng.subscribe((e) => { setHasTrack(e.loaded); setPlaying(e.playing); });
  }, []);

  const angleOf = (e) => {
    const r = platterRef.current.getBoundingClientRect();
    return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI;
  };

  const onDown = (e) => {
    e.preventDefault();
    const eng = window.djEngine;
    dragging.current = true;
    setTouched(true);
    lastAngle.current = angleOf(e);
    lastTime.current = performance.now();
    vel.current = 0;
    if (eng && eng.loaded) {
      eng.beginScratch();
      baseRot.current = rot.current;
      baseTime.current = eng.audio.currentTime;
    }
    e.target.setPointerCapture?.(e.pointerId);
  };
  const onMove = (e) => {
    if (!dragging.current) return;
    const eng = window.djEngine;
    const a = angleOf(e);
    let d = a - lastAngle.current;
    if (d > 180) d -= 360;
    if (d < -180) d += 360;
    const now = performance.now();
    const dt = Math.max(1, now - lastTime.current);
    rot.current += d;
    vel.current = Math.max(-2.2, Math.min(2.2, d / dt));
    lastAngle.current = a;
    lastTime.current = now;
    if (eng && eng.scratching) {
      eng.scratchTo(baseTime.current + (rot.current - baseRot.current) * eng.perDeg);
    }
  };
  const onUp = (e) => {
    const eng = window.djEngine;
    dragging.current = false;
    setTouched(false);
    if (eng && eng.scratching) eng.endScratch();
    e.target.releasePointerCapture?.(e.pointerId);
  };

  useEffect(() => {
    let raf, prev = performance.now();
    const friction = 0.0019;
    const frame = (t) => {
      const dt = Math.min(64, t - prev); prev = t;
      const eng = window.djEngine;
      if (eng && eng.loaded) {
        // rotation locked to actual audio position (advances at playbackRate)
        if (!dragging.current) rot.current = eng.audio.currentTime / eng.perDeg;
        // while dragging, rot.current is set in onMove and audio follows it
      } else {
        // no track: keep the fun free-spin + inertia
        if (!dragging.current) {
          rot.current += vel.current * dt;
          vel.current *= Math.exp(-friction * dt);
          if (Math.abs(vel.current) < 0.0004) vel.current = 0;
        }
      }
      if (platterRef.current) platterRef.current.style.transform = `rotate(${rot.current}deg)`;
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const spinning = hasTrack ? playing : false;

  return (
    <div className="jog" style={{ width: size, height: size }}>
      <div className="jog-outer-shadow" />
      <div className="jog-grip" />
      <div className={"jog-ring" + (touched ? " touched" : "") + (spinning ? " playing" : "")} />
      <div className="jog-platter-housing">
        <div
          className="jog-platter"
          ref={platterRef}
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          style={{ touchAction: "none", cursor: dragging.current ? "grabbing" : "grab" }}
        >
          <div className="jog-spin-tex" />
          <div className="jog-cross" />
        </div>
      </div>
      <div className="jog-center">
        <div className="jog-center-ridges" />
        <div className="jog-center-dot">
          <span className="vinyl-badge">Vinyl</span>
        </div>
      </div>
      <div className="jog-label search-left">◂ SEARCH +</div>
      <div className="jog-label rev">– REV</div>
      <div className="jog-label fwd">+ FWD</div>
    </div>
  );
}

Object.assign(window, { Knob, LedButton, RoundButton, Pad, TempoFader, JogWheel });
