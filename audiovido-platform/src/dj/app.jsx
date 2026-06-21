import { useState, useEffect, useRef } from "react";
const { Knob, LedButton, RoundButton, Pad, TempoFader, JogWheel } = window;

function fmtTime(s) {
  if (!s || !isFinite(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return m + ":" + String(sec).padStart(2, "0");
}

/* ===== DECK DISPLAY — loader + live waveform + progress + time ===== */
function DeckDisplay() {
  const eng = window.djEngine;
  const canvasRef = useRef(null);
  const fileRef = useRef(null);
  const [st, setSt] = useState({ loaded: false, name: "", duration: 0, playing: false });
  const timeRef = useRef(null);

  useEffect(() => eng.subscribe((e) =>
    setSt({ loaded: e.loaded, name: e.name, duration: e.duration, playing: e.playing })
  ), []);

  // draw loop
  useEffect(() => {
    let raf;
    const draw = () => {
      const c = canvasRef.current;
      if (c) {
        const dpr = window.devicePixelRatio || 1;
        const w = c.clientWidth, h = c.clientHeight;
        if (c.width !== w * dpr) { c.width = w * dpr; c.height = h * dpr; }
        const ctx = c.getContext("2d");
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, w, h);
        const peaks = eng.peaks;
        const cur = eng.audio.currentTime || 0;
        const dur = eng.duration || 0;
        const prog = dur ? cur / dur : 0;
        const mid = h / 2;
        if (peaks) {
          const n = peaks.length;
          const bw = w / n;
          for (let i = 0; i < n; i++) {
            const x = i * bw;
            const ph = Math.max(1.5, peaks[i] * h * 0.9);
            ctx.fillStyle = (i / n) <= prog ? "#39b6ff" : "rgba(120,140,160,0.4)";
            ctx.fillRect(x, mid - ph / 2, Math.max(0.6, bw - 0.4), ph);
          }
          // playhead
          ctx.fillStyle = "#fff";
          ctx.fillRect(prog * w - 1, 0, 2, h);
          ctx.fillStyle = "rgba(255,255,255,0.6)";
          ctx.fillRect(prog * w - 1, 0, 2, 5);
        } else {
          ctx.fillStyle = "rgba(120,140,160,0.18)";
          for (let x = 0; x < w; x += 6) {
            const ph = (Math.sin(x * 0.05) * 0.5 + 0.5) * h * 0.5 + 4;
            ctx.fillRect(x, mid - ph / 2, 2, ph);
          }
        }
        if (timeRef.current) timeRef.current.textContent = fmtTime(cur) + " / " + fmtTime(dur);
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onFile = (file) => { if (file) eng.load(file).then(() => {}); };
  const seekFromCanvas = (e) => {
    if (!eng.loaded) return;
    const r = canvasRef.current.getBoundingClientRect();
    eng.seek(((e.clientX - r.left) / r.width) * (eng.duration || 0));
  };

  return (
    <div className="deckbar">
      <button className="load-btn" onClick={() => fileRef.current.click()}>
        <span className="load-glyph">⏏</span> LOAD TRACK
      </button>
      <input ref={fileRef} type="file" accept="audio/*" id="audioFile" style={{ display: "none" }}
        onChange={(e) => onFile(e.target.files[0])} />
      <div className="deck-meta">
        <div className={"deck-track" + (st.loaded ? " on" : "")}>
          {st.loaded ? st.name : "Drop an audio file here, or click LOAD TRACK"}
        </div>
        <canvas ref={canvasRef} className="wave" onClick={seekFromCanvas} />
      </div>
      <div className="deck-time" ref={timeRef}>0:00 / 0:00</div>
    </div>
  );
}

function Label({ children, style, className }) {
  return <div className={"lbl " + (className || "")} style={style}>{children}</div>;
}

function DeckSelector() {
  const [deck, setDeck] = useState(2);
  return (
    <div className="deck-sel">
      <button className={"deck-num" + (deck === 2 ? " act" : "")} onClick={() => setDeck(2)}>2</button>
      <div className="deck-mid">DECK</div>
      <button className={"deck-num" + (deck === 4 ? " act" : "")} onClick={() => setDeck(4)}>4</button>
    </div>
  );
}

function DJController() {
  const [playing, setPlaying] = useState(false);
  const eng = window.djEngine;
  useEffect(() => eng.subscribe((e) => setPlaying(e.playing)), []);

  return (
    <>
    <DeckDisplay />
    <div className="panel">
      {/* ===== TOP FX KNOBS ===== */}
      <div className="abs" style={{ left: 318, top: 22 }}><Knob label="1" size={56} start={0.45} /></div>
      <div className="abs" style={{ left: 470, top: 22 }}><Knob label="2" size={56} start={0.6} /></div>
      <div className="abs" style={{ left: 622, top: 22 }}><Knob label="3" size={56} start={0.4} /></div>
      <div className="abs" style={{ left: 792, top: 14 }}>
        <Label className="tiny-top" style={{ width: 90, textAlign: "center", marginBottom: 2 }}>RELEASE FX</Label>
        <Knob size={56} start={0.5} indicatorColor="#39b6ff" />
      </div>

      {/* ===== TOP-RIGHT BROWSE JOG ===== */}
      <div className="abs" style={{ left: 1018, top: 24 }}>
        <div className="browse-jog">
          <div className="browse-jog-cap" />
        </div>
        <Label className="tiny" style={{ width: 132, textAlign: "center", marginTop: 6 }}>◉ PUSH&nbsp;&nbsp;TAG TRACK</Label>
      </div>

      {/* ===== FX2 pill ===== */}
      <div className="abs" style={{ left: 150, top: 138 }}>
        <div className="fx2-pill">FX2 <span className="chev">›</span></div>
      </div>

      {/* ===== ON BUTTONS (FX SELECT) ===== */}
      <div className="abs" style={{ left: 300, top: 130 }}><LedButton label="ON" sub="FX SELECT" w={108} h={40} color="#39b6ff" defaultOn ledStyle="onbar" /></div>
      <div className="abs" style={{ left: 452, top: 130 }}><LedButton label="ON" sub="FX SELECT" w={108} h={40} color="#39b6ff" defaultOn ledStyle="onbar" /></div>
      <div className="abs" style={{ left: 604, top: 130 }}><LedButton label="ON" sub="FX SELECT" w={108} h={40} color="#39b6ff" defaultOn ledStyle="onbar" /></div>

      <div className="abs" style={{ left: 760, top: 118 }}>
        <Label className="tiny-top" style={{ width: 130, textAlign: "center" }}>BEAT</Label>
        <div className="row" style={{ gap: 8, marginTop: 4 }}>
          <LedButton label="◂" sub="AUTO" w={56} h={40} color="#39b6ff" defaultOn ledStyle="onbar" />
          <LedButton label="▸" sub="TAP" w={56} h={40} color="#39b6ff" ledStyle="onbar" />
        </div>
      </div>

      {/* ===== SLIP REVERSE / SLIP ===== */}
      <div className="abs" style={{ left: 60, top: 200 }}>
        <Label className="tiny-top" style={{ width: 92, textAlign: "center" }}>SLIP REVERSE</Label>
        <LedButton sub="REVERSE" w={92} h={42} color="#ff4b3e" />
      </div>
      <div className="abs" style={{ left: 168, top: 200 }}>
        <Label className="tiny-top" style={{ width: 90, textAlign: "center" }}>SLIP</Label>
        <LedButton sub="VINYL" w={90} h={42} color="#ff4b3e" />
      </div>

      {/* ===== NEEDLE SEARCH ===== */}
      <div className="abs" style={{ left: 286, top: 210 }}>
        <div className="needle">
          <span className="needle-tri left">▲</span>
          <div className="needle-ticks">{Array.from({ length: 46 }).map((_, i) => <span key={i} style={{ height: i % 5 === 0 ? 16 : 9 }} />)}</div>
          <span className="needle-tri right">▲</span>
        </div>
        <Label className="tiny" style={{ marginTop: 6 }}>NEEDLE SEARCH</Label>
      </div>

      {/* ===== BACK / LOAD ===== */}
      <div className="abs" style={{ left: 968, top: 200 }}>
        <LedButton label="BACK" sub="AREA" w={92} h={42} color="#39b6ff" ledStyle="text" />
      </div>
      <div className="abs" style={{ left: 1072, top: 200 }} onClick={() => document.getElementById('audioFile') && document.getElementById('audioFile').click()}>
        <LedButton label="LOAD" sub="RELATED TRACKS" w={104} h={42} color="#39b6ff" ledStyle="text" defaultOn />
      </div>

      {/* ===== GRID (left) ===== */}
      <div className="abs" style={{ left: 60, top: 326 }}>
        <div className="grid-box">
          <div className="grid-title">GRID</div>
          <Label className="tiny-top" style={{ textAlign: "center", marginTop: 4 }}>ADJUST</Label>
          <LedButton sub="1/2X" w={82} h={34} color="#ff4b3e" />
          <div style={{ height: 14 }} />
          <Label className="tiny-top" style={{ textAlign: "center" }}>SLIDE</Label>
          <LedButton sub="2X" w={82} h={34} color="#ff4b3e" />
        </div>
      </div>

      {/* ===== JOG FEELING / VINYL SPEED ===== */}
      <div className="abs" style={{ left: 968, top: 320 }}>
        <Label className="tiny-top" style={{ width: 90, textAlign: "center" }}>JOG FEELING<br />ADJUST</Label>
        <Knob size={54} start={0.4} sub="LIGHT          HEAVY" />
      </div>
      <div className="abs" style={{ left: 1080, top: 320 }}>
        <Label className="tiny-top" style={{ width: 96, textAlign: "center" }}>VINYL SPEED ADJ<br />TOUCH / BRAKE</Label>
        <Knob size={54} start={0.55} />
      </div>

      {/* ===== MASTER TEMPO ===== */}
      <div className="abs" style={{ left: 1078, top: 470 }}>
        <Label className="tiny-top" style={{ width: 96, textAlign: "center" }}>MASTER<br />TEMPO</Label>
        <LedButton sub="TEMPO RANGE" w={96} h={40} color="#ff4b3e" />
      </div>

      {/* ===== DECK SELECTOR (left) ===== */}
      <div className="abs" style={{ left: 64, top: 600 }}><DeckSelector /></div>

      {/* ===== SHIFT ===== */}
      <div className="abs" style={{ left: 60, top: 880 }}>
        <LedButton label="SHIFT" w={92} h={44} color="#cfd4da" ledStyle="text" />
      </div>

      {/* ===== BIG JOG WHEEL ===== */}
      <div className="abs" style={{ left: 312, top: 300 }}>
        <JogWheel size={620} />
      </div>

      {/* ===== TEMPO FADER (right) ===== */}
      <div className="abs" style={{ left: 1092, top: 580 }}>
        <TempoFader />
      </div>

      {/* ===== SYNC / QUANTIZE ===== */}
      <div className="abs" style={{ left: 96, top: 980 }}>
        <RoundButton size={74} label="SYNC" sub="MASTER" labelColor="#e8edf2" toggle />
      </div>
      <div className="abs" style={{ left: 210, top: 992 }}>
        <Label className="tiny-top" style={{ width: 70, textAlign: "center" }}>QUANTIZE</Label>
        <div className="quantize-led" />
        <Label className="tiny" style={{ width: 110, textAlign: "center", marginTop: 18 }}>◂ REV</Label>
      </div>

      {/* ===== SEQUENCER ===== */}
      <div className="abs" style={{ left: 928, top: 968 }}>
        <Label className="tiny-top" style={{ width: 150, textAlign: "center", letterSpacing: 2 }}>SEQUENCER</Label>
        <div className="row" style={{ gap: 8, marginTop: 4 }}>
          <div style={{ textAlign: "center" }}>
            <Label className="tiny-red">OVERDUB</Label>
            <LedButton label="●" w={66} h={38} color="#ff4b3e" ledStyle="text" textColor="#ff4b3e" />
            <Label className="tiny" style={{ marginTop: 4 }}>SAVE</Label>
          </div>
          <div style={{ textAlign: "center" }}>
            <Label className="tiny" style={{ color: "#c8ccd0" }}>START</Label>
            <LedButton label="▸" w={66} h={38} color="#39b6ff" ledStyle="text" />
            <Label className="tiny" style={{ marginTop: 4 }}>SLOT</Label>
          </div>
        </div>
      </div>

      {/* ===== CUE / PLAY ===== */}
      <div className="abs" style={{ left: 96, top: 1120 }}>
        <RoundButton size={92} label="CUE" glyph="◂◂" sub="" labelColor="#e0a23a" />
      </div>
      <div className="abs" style={{ left: 96, top: 1300 }}>
        <Label className="tiny-top" style={{ width: 92, textAlign: "center" }}>PLAY/PAUSE</Label>
        <div onClick={() => eng.toggle()}>
          <RoundButton size={92} glyph={playing ? "❚❚" : "▶❚❚"} labelColor={playing ? "#39ff8b" : "#39b6ff"} />
        </div>
      </div>

      {/* ===== PAD MODE LABELS ===== */}
      <div className="abs" style={{ left: 300, top: 1150, width: 640 }}>
        <div className="row" style={{ justifyContent: "center", gap: 10, color: "#7e858d", fontSize: 12, letterSpacing: 2 }}>
          <span>—— PAD MODE ——</span>
        </div>
      </div>
      <div className="abs" style={{ left: 300, top: 1178 }}>
        <div className="row" style={{ gap: 10 }}>
          <div className="padmode" style={{ "--c": "#e8edf2" }}><span>HOT CUE</span><em>BEAT JUMP</em></div>
          <div className="padmode" style={{ "--c": "#39b6ff" }}><span>PAD FX 1</span><em>PAD FX 2</em></div>
          <div className="padmode" style={{ "--c": "#39ff8b" }}><span>SLICER</span><em>SLICER LOOP</em></div>
          <div className="padmode" style={{ "--c": "#b06bff" }}><span>SAMPLER</span><em>VELOCITY SAMPLER</em></div>
        </div>
      </div>

      {/* ===== CAPTURE ===== */}
      <div className="abs" style={{ left: 920, top: 1180 }}>
        <Label className="tiny-top" style={{ width: 70, textAlign: "center" }}>CAPTURE</Label>
        <div className="capture-knob" />
        <Label className="tiny" style={{ width: 70, textAlign: "center", marginTop: 4 }}>SLICER<br />CAPTURE</Label>
      </div>

      {/* ===== 8 PADS ===== */}
      <div className="abs" style={{ left: 300, top: 1238 }}>
        <div className="pad-grid">
          <Pad color="#2e74ff" /><Pad color="#22d36a" /><Pad color="#b06bff" /><Pad color="#34c6ff" />
          <Pad color="#34c6ff" /><Pad color="#9a3bff" /><Pad color="#1fd6a8" /><Pad color="#2e74ff" />
        </div>
      </div>

      {/* ===== LOOP SECTION ===== */}
      <div className="abs" style={{ left: 1006, top: 1150 }}>
        <Label className="tiny-top" style={{ width: 174, textAlign: "right", letterSpacing: 2 }}>LOOP</Label>
        <div className="loop-box">
          <LedButton label="AUTO BEAT LOOP" w={172} h={34} color="#ff7a3e" ledStyle="text" defaultOn />
          <Label className="tiny" style={{ textAlign: "center", margin: "6px 0" }}>ACTIVE LOOP</Label>
          <Label className="tiny-top" style={{ textAlign: "center" }}>◂ BEAT ▸</Label>
          <div className="row" style={{ gap: 8, marginTop: 4 }}>
            <LedButton label="1/2X" w={82} h={34} color="#ff7a3e" ledStyle="text" />
            <LedButton label="2X" w={82} h={34} color="#ff7a3e" ledStyle="text" />
          </div>
          <Label className="tiny-top" style={{ textAlign: "center", marginTop: 6 }}>◂ LOOP MOVE ▸</Label>
          <div className="row" style={{ gap: 8, marginTop: 2 }}>
            <LedButton label="IN" sub="RE-TRIGGER" w={82} h={34} color="#39b6ff" ledStyle="text" />
            <LedButton label="OUT" sub="RELOOP/EXIT" w={82} h={34} color="#39b6ff" ledStyle="text" />
          </div>
        </div>
      </div>

      {/* ===== PARAMETER ===== */}
      <div className="abs" style={{ left: 1006, top: 1430 }}>
        <Label className="tiny-top" style={{ width: 174, textAlign: "right" }}>PARAMETER1</Label>
        <div className="row" style={{ gap: 8, marginTop: 4, justifyContent: "flex-end" }}>
          <LedButton label="◂" w={82} h={32} color="#ff4b3e" ledStyle="text" />
          <LedButton label="▸" w={82} h={32} color="#ff4b3e" ledStyle="text" />
        </div>
        <Label className="tiny" style={{ width: 174, textAlign: "right", marginTop: 4 }}>◂ PARAMETER2 ▸</Label>
      </div>
    </div>
    </>
  );
}

export default DJController;
