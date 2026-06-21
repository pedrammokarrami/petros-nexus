/* ============================================================
   DJ AUDIO ENGINE
   HTMLAudioElement for playback (rate/pitch), AudioContext only
   for decoding waveform peaks. Exposes a tiny pub/sub on window.
   ============================================================ */
(function () {
  const audio = new Audio();
  audio.preservesPitch = false;      // tempo fader changes pitch too
  audio.mozPreservesPitch = false;
  audio.webkitPreservesPitch = false;

  const engine = {
    audio,
    loaded: false,
    playing: false,
    duration: 0,
    rate: 1,
    scratching: false,
    name: "",
    peaks: null,
    perDeg: 0.005,                   // seconds of audio per degree of platter (≈33rpm)
    _wasPlaying: false,
    _subs: new Set(),

    subscribe(cb) { this._subs.add(cb); return () => this._subs.delete(cb); },
    _emit() { this._subs.forEach((cb) => cb(this)); },

    async load(file) {
      try {
        if (audio.src) URL.revokeObjectURL(audio.src);
      } catch (e) {}
      const url = URL.createObjectURL(file);
      audio.src = url;
      this.name = file.name.replace(/\.[^.]+$/, "");
      this.loaded = false;
      this.playing = false;
      this.peaks = null;
      this.duration = 0;
      this._emit();

      // decode peaks for the waveform (separate from playback)
      try {
        const ab = await file.arrayBuffer();
        const Ctx = window.AudioContext || window.webkitAudioContext;
        const ctx = new Ctx();
        const buf = await ctx.decodeAudioData(ab.slice(0));
        this.duration = buf.duration;
        this.peaks = computePeaks(buf, 1100);
        ctx.close();
      } catch (e) {
        console.warn("waveform decode failed", e);
      }

      await new Promise((res) => {
        if (audio.readyState >= 1) return res();
        audio.addEventListener("loadedmetadata", res, { once: true });
      });
      if (audio.duration && isFinite(audio.duration)) this.duration = audio.duration;
      this.loaded = true;
      this._emit();
    },

    play() {
      if (!this.loaded) return;
      audio.playbackRate = this.rate;
      const p = audio.play();
      if (p && p.catch) p.catch(() => {});
      this.playing = true;
      this._emit();
    },
    pause() { audio.pause(); this.playing = false; this._emit(); },
    toggle() { this.playing ? this.pause() : this.play(); },

    setRate(r) {
      this.rate = r;
      if (!this.scratching) audio.playbackRate = r;
      this._emit();
    },

    seek(t) {
      if (!this.loaded) return;
      audio.currentTime = Math.max(0, Math.min(this.duration || 0, t));
      this._emit();
    },

    // --- scratch / nudge ---
    beginScratch() {
      if (!this.loaded) return;
      this.scratching = true;
      this._wasPlaying = this.playing;
      audio.playbackRate = 1;
      const p = audio.play();
      if (p && p.catch) p.catch(() => {});
    },
    scratchTo(t) {
      if (!this.loaded) return;
      audio.currentTime = Math.max(0, Math.min(this.duration || 0, t));
    },
    endScratch() {
      if (!this.scratching) return;
      this.scratching = false;
      audio.playbackRate = this.rate;
      if (!this._wasPlaying) audio.pause();
    },
  };

  audio.addEventListener("ended", () => { engine.playing = false; engine._emit(); });
  audio.addEventListener("timeupdate", () => engine._emit());

  function computePeaks(buf, n) {
    const ch = buf.getChannelData(0);
    const block = Math.max(1, Math.floor(ch.length / n));
    const peaks = new Float32Array(n);
    let gmax = 0.0001;
    for (let i = 0; i < n; i++) {
      let max = 0;
      const s = i * block;
      for (let j = 0; j < block; j += 8) {
        const v = Math.abs(ch[s + j] || 0);
        if (v > max) max = v;
      }
      peaks[i] = max;
      if (max > gmax) gmax = max;
    }
    for (let i = 0; i < n; i++) peaks[i] = Math.min(1, peaks[i] / gmax);
    return peaks;
  }

  window.djEngine = engine;
})();
