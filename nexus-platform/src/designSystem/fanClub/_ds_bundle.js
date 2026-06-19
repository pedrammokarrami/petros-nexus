/* @ds-bundle: {"format":3,"namespace":"AudiovidoFanClubDesignSystem_013bf7","components":[{"name":"Bartender","sourcePath":"components/club/Bartender.jsx"},{"name":"ChallengeCard","sourcePath":"components/club/ChallengeCard.jsx"},{"name":"ChatMessage","sourcePath":"components/club/ChatMessage.jsx"},{"name":"ClubStage","sourcePath":"components/club/ClubStage.jsx"},{"name":"FloatingMessage","sourcePath":"components/club/FloatingMessage.jsx"},{"name":"LightingFx","sourcePath":"components/club/LightingFx.jsx"},{"name":"MemberStack","sourcePath":"components/club/MemberStack.jsx"},{"name":"MoodMeter","sourcePath":"components/club/MoodMeter.jsx"},{"name":"NeonSign","sourcePath":"components/club/NeonSign.jsx"},{"name":"NowPlaying","sourcePath":"components/club/NowPlaying.jsx"},{"name":"PhotoBackdrop","sourcePath":"components/club/PhotoBackdrop.jsx"},{"name":"PhysicalButton","sourcePath":"components/club/PhysicalButton.jsx"},{"name":"SpatialAvatar","sourcePath":"components/club/SpatialAvatar.jsx"},{"name":"TVScreen","sourcePath":"components/club/TVScreen.jsx"},{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Input","sourcePath":"components/core/Input.jsx"}],"sourceHashes":{"assets/image-slot.js":"9309434cb09c","components/club/Bartender.jsx":"f826a04a77a7","components/club/ChallengeCard.jsx":"74f9da61346e","components/club/ChatMessage.jsx":"f13b7ea79b77","components/club/ClubStage.jsx":"18e28b6c8f30","components/club/FloatingMessage.jsx":"80f38ca0b1eb","components/club/LightingFx.jsx":"003f749a25d2","components/club/MemberStack.jsx":"a5793c8b63c4","components/club/MoodMeter.jsx":"c29c676e3ccc","components/club/NeonSign.jsx":"6eb3c08cffb1","components/club/NowPlaying.jsx":"0dfb545abd89","components/club/PhotoBackdrop.jsx":"2da20cf3418f","components/club/PhysicalButton.jsx":"43e26f430ddf","components/club/SpatialAvatar.jsx":"6c6c692c592e","components/club/TVScreen.jsx":"2b079762fef6","components/core/Avatar.jsx":"3b78faa06d1d","components/core/Badge.jsx":"f5455e89caab","components/core/Button.jsx":"ce1df1f60480","components/core/Card.jsx":"6289dc715475","components/core/IconButton.jsx":"d0fc08f6f8aa","components/core/Input.jsx":"e5b9f7eaf2df","ui_kits/fan_club/ClubStats.jsx":"b8b638566268","ui_kits/fan_club/Decor.jsx":"01ad52ec04d0","ui_kits/fan_club/FanClubPage.jsx":"181ef842a811","ui_kits/fan_club/FloorActions.jsx":"301bd3ef7fe1","ui_kits/fan_club/Particles.jsx":"bfb258d62084","ui_kits/fan_club/data.js":"239e1bd04798","ui_kits/fan_club_v2/DrinkMenu.jsx":"6ed6c079bafe","ui_kits/fan_club_v2/EmojiBurst.jsx":"50f7792b6266","ui_kits/fan_club_v2/FanClubRoom.jsx":"87299bb015a9","ui_kits/fan_club_v2/RoomProps.jsx":"2f97eb0df6dd","ui_kits/fan_club_v2/SmokeField.jsx":"a881f87a67c5","ui_kits/fan_club_v2/data.js":"643e6867ee99"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AudiovidoFanClubDesignSystem_013bf7 = window.AudiovidoFanClubDesignSystem_013bf7 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// assets/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever you want the user to
 * supply an image. You control the slot's shape and size; the user fills it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The host bridge only allows sidecar writes at the project root, so the
 * HTML that uses this component is assumed to live at the project root too
 * (same constraint as design_canvas.jsx).
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          object-fit: cover | contain | fill.       (default 'cover')
 *                With cover (the default) double-clicking the filled slot
 *                enters a reframe mode: the whole image spills past the mask
 *                (translucent outside, opaque inside), drag to reposition,
 *                corner-drag to scale. The crop persists alongside the image
 *                in the sidecar. contain/fill stay static.
 *   position     object-position for fit=contain|fill.     (default '50% 50%')
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. A user drop overrides
 *                it; clearing the drop reveals src again.
 *
 * Size and layout come from ordinary CSS on the element — width/height
 * inline or from a parent grid — so it composes with any layout.
 *
 * Usage:
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet = ':host{display:inline-block;position:relative;vertical-align:top;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;color:rgba(0,0,0,.55);width:240px;height:160px}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(0,0,0,.04)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  '.spill{position:absolute;transform:translate(-50%,-50%);display:none;z-index:1;' + '  cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .spill{display:block}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px;text-decoration-color:rgba(0,0,0,.25)}' + '.empty:hover .sub u{color:rgba(0,0,0,.75);text-decoration-color:currentColor}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed rgba(0,0,0,.25);' + '  transition:border-color .12s}' + ':host([data-over]) .ring{border-color:#c96442}' + ':host([data-filled]) .ring{display:none}' +
  // Controls sit BELOW the mask (top:100%), absolutely positioned so the
  // author-declared slot height is unaffected. The gap is padding, not a
  // top offset, so the hover target stays contiguous with the frame.
  '.ctl{position:absolute;top:100%;left:50%;transform:translateX(-50%);padding-top:8px;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'position', 'placeholder', 'src', 'id'];
    }
    constructor() {
      super();
      const root = this.attachShadow({
        mode: 'open'
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="ring" part="ring"></div>' + '</div>' + '<div class="spill">' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' + '<div class="ctl"><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="clear" title="Remove image">Remove</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (act === 'replace') {
          this._exitReframe(true);
          this._input.click();
        }
        if (act === 'clear') {
          this._exitReframe(false);
          this._gen++;
          this._local = null;
          if (this.id) setSlot(this.id, null);else this._render();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      this._img.addEventListener('load', () => this._applyView());
      // Gated on editable + fit=cover so share links and contain/fill slots
      // stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const base = Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (commit) this._commitView();
    }
    attributeChangedCallback() {
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is only meaningful for fit=cover — contain/fill
    // keep the old object-fit path and double-click is a no-op.
    _reframes() {
      return this.hasAttribute('data-filled') && (this.getAttribute('fit') || 'cover') === 'cover';
    }

    // Cover-baseline geometry, shared by clamp/apply/resize. Null until the
    // img has loaded (naturalWidth is 0 before that) or when the slot has no
    // layout box — ResizeObserver fires with a 0×0 rect under display:none,
    // and clamping against a degenerate 1×1 frame would silently pull the
    // stored pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      return {
        iw,
        ih,
        fw,
        fh,
        base: Math.max(fw / iw, fh / ih)
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      const fit = this.getAttribute('fit') || 'cover';
      if (fit !== 'cover' || !g) {
        // Non-cover, or dimensions not known yet (before img load).
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = fit;
        this._img.style.objectPosition = this.getAttribute('position') || '50% 50%';
        return;
      }
      // Cover baseline: img fills the frame on its tighter axis at s=1, so
      // pan works immediately on the overflowing axis without zooming first.
      // Width/height and left/top are all frame-% — depends only on the
      // frame aspect ratio, so a responsive resize keeps the same crop. The
      // spill layer mirrors the same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      this._spill.style.width = w;
      this._spill.style.height = h;
      this._spill.style.left = l;
      this._spill.style.top = t;
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      if (url) {
        if (this._img.getAttribute('src') !== url) {
          this._img.src = url;
          this._ghost.src = url;
        }
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        this._empty.style.display = 'flex';
        this.removeAttribute('data-filled');
      }
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "assets/image-slot.js", error: String((e && e.message) || e) }); }

// components/club/Bartender.jsx
try { (() => {
function Bartender({
  name = "Bartender",
  slotId,
  placeholder = "Drop a bartender character",
  src,
  lines = [],
  speak = null,
  interval = 5000,
  side = "right",
  size = 120
}) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    if (speak || !lines.length) return;
    const t = setInterval(() => setI(x => (x + 1) % lines.length), interval);
    return () => clearInterval(t);
  }, [speak, lines.length, interval]);
  const line = speak || lines[i];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      top: 88,
      [side]: 32,
      zIndex: 8,
      display: "flex",
      flexDirection: side === "right" ? "row-reverse" : "row",
      alignItems: "flex-end",
      gap: 14,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: size,
      height: size * 1.2,
      borderRadius: 14,
      background: "var(--void-700)",
      border: "1px solid var(--border-soft)",
      boxShadow: "var(--shadow-lg), 0 0 24px color-mix(in oklab, var(--accent) 35%, transparent)",
      overflow: "hidden",
      pointerEvents: "auto",
      filter: "saturate(1.1) contrast(1.05)"
    }
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: slotId,
    shape: "rect",
    fit: "cover",
    placeholder: placeholder,
    src: src,
    style: {
      width: "100%",
      height: "100%",
      display: "block"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      padding: "6px 10px",
      background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.85))",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--text-hi)",
      textAlign: "center"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: "radial-gradient(80% 50% at 50% 0%, color-mix(in oklab, var(--accent) 30%, transparent), transparent 70%)",
      mixBlendMode: "screen",
      pointerEvents: "none"
    }
  })), line && /*#__PURE__*/React.createElement("div", {
    key: line + i + (speak || ""),
    style: {
      maxWidth: 280,
      padding: "12px 16px",
      background: "rgba(245, 244, 255, 0.96)",
      color: "var(--void-900)",
      fontFamily: "var(--font-body)",
      fontSize: 15,
      lineHeight: 1.4,
      fontWeight: 500,
      borderRadius: 16,
      position: "relative",
      boxShadow: "0 14px 32px rgba(0,0,0,0.6), 0 0 18px color-mix(in oklab, var(--accent) 35%, transparent)",
      animation: "av-bub-pop 360ms var(--ease-spring)",
      pointerEvents: "auto"
    }
  }, line, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      ...(side === "right" ? {
        right: -6,
        bottom: 18
      } : {
        left: -6,
        bottom: 18
      }),
      width: 14,
      height: 14,
      background: "rgba(245, 244, 255, 0.96)",
      transform: "rotate(45deg)"
    }
  })), /*#__PURE__*/React.createElement("style", null, `
        @keyframes av-bub-pop {
          from { opacity: 0; transform: translateY(6px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
      `));
}
Object.assign(__ds_scope, { Bartender });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/Bartender.jsx", error: String((e && e.message) || e) }); }

// components/club/ChallengeCard.jsx
try { (() => {
function ChallengeCard({
  title,
  description,
  progress,
  progressLabel,
  tag,
  onJoin
}) {
  const pct = Math.max(0, Math.min(1, progress));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: 16,
      background: "rgba(18, 18, 31, 0.7)",
      backdropFilter: "blur(12px)",
      border: "1px solid color-mix(in oklab, var(--accent) 22%, var(--border-soft))",
      borderRadius: 14,
      boxShadow: "var(--shadow-sm), 0 0 24px color-mix(in oklab, var(--accent) 18%, transparent)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: -40,
      background: "radial-gradient(40% 60% at 100% 0%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 60%)",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8
    }
  }, tag && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--accent)",
      padding: "3px 8px",
      borderRadius: 999,
      background: "color-mix(in oklab, var(--accent) 14%, transparent)",
      border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)"
    }
  }, tag), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "\u26A1 Challenge")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      fontFamily: "var(--font-display)",
      fontSize: 18,
      fontWeight: 700,
      color: "var(--text-hi)",
      marginBottom: 4,
      lineHeight: 1.2
    }
  }, title), description && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      color: "var(--text-dim)",
      marginBottom: 14,
      lineHeight: 1.5
    }
  }, description), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 6,
      borderRadius: 999,
      background: "rgba(255,255,255,0.06)",
      overflow: "hidden",
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: "100%",
      width: `${pct * 100}%`,
      background: "linear-gradient(90deg, color-mix(in oklab, var(--accent) 60%, white) 0%, var(--accent) 100%)",
      boxShadow: "0 0 12px var(--accent)",
      transition: "width var(--dur-slower) var(--ease-velvet)",
      borderRadius: 999
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-dim)",
      letterSpacing: "0.1em"
    }
  }, progressLabel || `${Math.round(pct * 100)}%`), onJoin && /*#__PURE__*/React.createElement("button", {
    onClick: onJoin,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      fontWeight: 700,
      color: "var(--accent)",
      background: "transparent",
      border: "none",
      cursor: "pointer"
    }
  }, "Join \u2192")));
}
Object.assign(__ds_scope, { ChallengeCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/ChallengeCard.jsx", error: String((e && e.message) || e) }); }

// components/club/ChatMessage.jsx
try { (() => {
// Inline the Avatar logic to avoid bundler relative-import edge cases when this
// component runs in a card or kit. Same hashing scheme.
function initials(name) {
  const parts = (name || "??").trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}
function hueFromName(n) {
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360;
  return h;
}
function MiniAvatar({
  name,
  src,
  size = 36,
  active = false
}) {
  const hue = hueFromName(name || "anon");
  const bg = `linear-gradient(135deg, hsl(${hue}, 70%, 35%), hsl(${(hue + 60) % 360}, 70%, 25%))`;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      flexShrink: 0,
      width: size,
      height: size,
      borderRadius: "50%",
      background: src ? `url(${src}) center/cover, ${bg}` : bg,
      color: "rgba(255,255,255,0.92)",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      fontSize: size * 0.32,
      fontWeight: 700,
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: active ? "0 0 0 2px var(--accent), 0 0 18px var(--accent)" : "none",
      animation: active ? "av-breathe 2.4s var(--ease-velvet) infinite" : undefined
    }
  }, !src && initials(name));
}
function ChatMessage({
  author,
  avatarSrc,
  children,
  time,
  persona = "member",
  reactions = [],
  align = "left"
}) {
  const isDJ = persona === "dj";
  const isSpot = persona === "spotlight";
  const bubbleBg = isDJ ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 22%, var(--void-700)) 0%, var(--void-700) 100%)" : isSpot ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 12%, var(--void-600)) 0%, var(--void-600) 100%)" : "var(--bg-surface)";
  const bubbleBorder = isDJ ? "1px solid color-mix(in oklab, var(--accent) 50%, transparent)" : isSpot ? "1px solid color-mix(in oklab, var(--accent) 30%, transparent)" : "1px solid var(--border-faint)";
  const bubbleShadow = isDJ ? "var(--shadow-md), 0 0 24px color-mix(in oklab, var(--accent) 30%, transparent)" : isSpot ? "var(--shadow-sm), 0 0 16px color-mix(in oklab, var(--accent) 25%, transparent)" : "var(--shadow-sm)";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexDirection: align === "right" ? "row-reverse" : "row",
      animation: `av-fade-up var(--dur-slow) var(--ease-out)`,
      animationFillMode: "both"
    }
  }, /*#__PURE__*/React.createElement(MiniAvatar, {
    name: author,
    src: avatarSrc,
    size: isDJ ? 44 : 36,
    active: isSpot || isDJ
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6,
      maxWidth: "78%",
      alignItems: align === "right" ? "flex-end" : "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.14em",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: isDJ ? "var(--accent)" : "var(--text-hi)",
      fontWeight: 700
    }
  }, author), isDJ && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 8px",
      borderRadius: 999,
      fontSize: 9,
      background: "color-mix(in oklab, var(--accent) 22%, transparent)",
      color: "var(--accent)",
      border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
      boxShadow: "0 0 8px color-mix(in oklab, var(--accent) 40%, transparent)"
    }
  }, "DJ \xB7 HOST"), isSpot && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 8px",
      borderRadius: 999,
      fontSize: 9,
      background: "color-mix(in oklab, var(--accent) 14%, transparent)",
      color: "var(--accent)",
      border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)"
    }
  }, "SPOTLIGHT"), time && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)"
    }
  }, time)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      padding: isDJ ? "14px 18px" : "12px 16px",
      background: bubbleBg,
      border: bubbleBorder,
      boxShadow: bubbleShadow,
      borderRadius: 16,
      fontFamily: "var(--font-body)",
      fontSize: isDJ ? 19 : 18,
      lineHeight: 1.5,
      color: "var(--text-hi)"
    }
  }, children), reactions.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 6,
      marginTop: 2
    }
  }, reactions.map((r, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "2px 8px",
      borderRadius: 999,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid var(--border-soft)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-dim)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12
    }
  }, r.emoji), r.count)))));
}
Object.assign(__ds_scope, { ChatMessage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/ChatMessage.jsx", error: String((e && e.message) || e) }); }

// components/club/FloatingMessage.jsx
try { (() => {
function initials(name) {
  const parts = (name || "??").trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}
function hueFromName(n) {
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360;
  return h;
}
function FloatingMessage({
  author,
  children,
  persona = "member",
  avatarSrc,
  intensity = 0.5
}) {
  const isDJ = persona === "dj";
  const isSpot = persona === "spotlight";
  const hue = hueFromName(author || "?");
  const accentBubble = isDJ ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 28%, var(--void-700)), var(--void-700))" : isSpot ? "linear-gradient(180deg, color-mix(in oklab, var(--accent) 18%, rgba(8,8,15,0.85)), rgba(8,8,15,0.85))" : "rgba(8, 8, 15, 0.72)";
  const tiltY = (Math.random() - 0.5) * 4 * intensity;
  const tiltX = (Math.random() - 0.5) * 2 * intensity;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "flex-start",
      perspective: 800,
      animation: "av-msg-float-in 720ms var(--ease-out) both"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flexShrink: 0,
      width: isDJ ? 44 : 36,
      height: isDJ ? 44 : 36,
      borderRadius: "50%",
      background: avatarSrc ? `url(${avatarSrc}) center/cover` : `linear-gradient(135deg, hsl(${hue},70%,35%), hsl(${(hue + 60) % 360},70%,25%))`,
      color: "rgba(255,255,255,0.92)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 700,
      border: "1.5px solid rgba(255,255,255,0.16)",
      boxShadow: isDJ || isSpot ? "0 0 0 2px var(--accent), 0 0 18px var(--accent), 0 6px 18px rgba(0,0,0,0.6)" : "0 6px 18px rgba(0,0,0,0.6)",
      animation: isDJ || isSpot ? "av-breathe 2s var(--ease-velvet) infinite" : undefined
    }
  }, !avatarSrc && initials(author)), /*#__PURE__*/React.createElement("div", {
    style: {
      transform: `rotateY(${tiltY}deg) rotateX(${tiltX}deg)`,
      transformOrigin: "0% 50%",
      padding: isDJ ? "14px 20px" : "12px 18px",
      background: accentBubble,
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)",
      border: isDJ ? "1px solid color-mix(in oklab, var(--accent) 55%, transparent)" : isSpot ? "1px solid color-mix(in oklab, var(--accent) 35%, transparent)" : "1px solid rgba(255,255,255,0.1)",
      borderRadius: 18,
      boxShadow: isDJ ? "0 20px 50px rgba(0,0,0,0.7), 0 0 28px color-mix(in oklab, var(--accent) 50%, transparent)" : isSpot ? "0 14px 32px rgba(0,0,0,0.6), 0 0 18px color-mix(in oklab, var(--accent) 35%, transparent)" : "0 12px 28px rgba(0,0,0,0.55)",
      color: "var(--text-hi)",
      fontFamily: "var(--font-body)",
      fontSize: isDJ ? 20 : 18,
      lineHeight: 1.5,
      maxWidth: 460
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 4,
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: isDJ ? "var(--accent)" : "var(--text-dim)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, author), isDJ && /*#__PURE__*/React.createElement("span", {
    style: {
      padding: "2px 6px",
      borderRadius: 999,
      background: "color-mix(in oklab, var(--accent) 22%, transparent)",
      border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
      fontSize: 9
    }
  }, "HOST")), children), /*#__PURE__*/React.createElement("style", null, `
        @keyframes av-msg-float-in {
          from { opacity: 0; transform: translateY(18px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `));
}
Object.assign(__ds_scope, { FloatingMessage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/FloatingMessage.jsx", error: String((e && e.message) || e) }); }

// components/club/LightingFx.jsx
try { (() => {
function LightingFx({
  spotlights = 2,
  godRays = true,
  floorWash = true,
  mood = 0.55
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 1,
      pointerEvents: "none",
      mixBlendMode: "screen"
    }
  }, Array.from({
    length: spotlights
  }).map((_, i) => {
    const left = spotlights === 1 ? 50 : 30 + i / (spotlights - 1) * 40;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: "absolute",
        left: `${left}%`,
        top: "-10%",
        width: "60%",
        height: "120%",
        transform: "translateX(-50%)",
        background: `radial-gradient(closest-side, color-mix(in oklab, var(--accent) ${30 + mood * 40}%, transparent) 0%, transparent 70%)`,
        filter: "blur(30px)",
        animation: `av-spot-sweep ${14 + i * 3}s var(--ease-velvet) ${i * 1.4}s infinite alternate`,
        opacity: 0.55
      }
    });
  }), godRays && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `
              repeating-linear-gradient(
                70deg,
                transparent 0px,
                transparent 60px,
                rgba(255, 255, 255, 0.025) 60px,
                rgba(255, 255, 255, 0.025) 110px
              )
            `,
      maskImage: "radial-gradient(60% 70% at 25% 0%, black, transparent 75%)",
      WebkitMaskImage: "radial-gradient(60% 70% at 25% 0%, black, transparent 75%)",
      opacity: 0.7
    }
  }), floorWash && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "10%",
      right: "10%",
      bottom: "-20%",
      height: "60%",
      background: `radial-gradient(80% 100% at 50% 100%, color-mix(in oklab, var(--accent) ${40 + mood * 30}%, transparent) 0%, transparent 70%)`,
      filter: "blur(40px)",
      transition: "background var(--dur-ambient) var(--ease-velvet)"
    }
  }), /*#__PURE__*/React.createElement("style", null, `
        @keyframes av-spot-sweep {
          0%   { transform: translateX(-60%) rotate(-3deg); }
          100% { transform: translateX(-40%) rotate(3deg); }
        }
      `));
}
Object.assign(__ds_scope, { LightingFx });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/LightingFx.jsx", error: String((e && e.message) || e) }); }

// components/club/MemberStack.jsx
try { (() => {
function initials(name) {
  const parts = (name || "??").trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}
function hueFromName(n) {
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360;
  return h;
}
function Dot({
  status
}) {
  if (!status) return null;
  const color = status === "live" ? "var(--coral-400)" : status === "online" ? "var(--success)" : "var(--smoke-500)";
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 10,
      height: 10,
      borderRadius: 999,
      background: color,
      border: "2px solid var(--void-700)",
      boxShadow: status === "live" ? "0 0 6px var(--coral-400)" : undefined
    }
  });
}
function MemberStack({
  members,
  limit = 7,
  heading = "On the floor"
}) {
  const shown = members.slice(0, limit);
  const extra = Math.max(0, members.length - limit);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, heading, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-hi)",
      fontWeight: 700
    }
  }, "\xB7 ", members.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, shown.map((m, i) => {
    const hue = hueFromName(m.name);
    const bg = `linear-gradient(135deg, hsl(${hue}, 70%, 35%), hsl(${(hue + 60) % 360}, 70%, 25%))`;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: 10
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        display: "inline-flex"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 34,
        height: 34,
        borderRadius: "50%",
        background: m.avatarSrc ? `url(${m.avatarSrc}) center/cover, ${bg}` : bg,
        color: "rgba(255,255,255,0.92)",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 700,
        border: "1px solid rgba(255,255,255,0.08)",
        boxShadow: m.active ? "0 0 0 2px var(--accent), 0 0 12px var(--accent)" : "none",
        animation: m.active ? "av-breathe 2.4s var(--ease-velvet) infinite" : undefined
      }
    }, !m.avatarSrc && initials(m.name)), /*#__PURE__*/React.createElement(Dot, {
      status: m.status
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-body)",
        fontSize: 13,
        fontWeight: 600,
        color: "var(--text-hi)",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, m.name), m.active && /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        color: "var(--accent)"
      }
    }, "on the mic")));
  }), extra > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      color: "var(--text-muted)",
      letterSpacing: "0.1em",
      marginLeft: 44
    }
  }, "+ ", extra, " more in the room")));
}
Object.assign(__ds_scope, { MemberStack });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/MemberStack.jsx", error: String((e && e.message) || e) }); }

// components/club/MoodMeter.jsx
try { (() => {
const labels = [{
  at: 0.0,
  name: "Melancholic",
  emoji: "🌙",
  color: "#3a86ff"
}, {
  at: 0.25,
  name: "Mellow",
  emoji: "🌌",
  color: "#8338ec"
}, {
  at: 0.5,
  name: "Engaged",
  emoji: "✨",
  color: "#b5179e"
}, {
  at: 0.75,
  name: "Hype",
  emoji: "🔥",
  color: "#f72585"
}, {
  at: 1.0,
  name: "Euphoric",
  emoji: "💥",
  color: "#ff8500"
}];
function pickLabel(v) {
  return labels.reduce((best, l) => Math.abs(v - l.at) < Math.abs(v - best.at) ? l : best);
}
function MoodMeter({
  value = 0.5,
  sampleCount = 47,
  windowLabel = "last 10 minutes",
  compact = false
}) {
  const v = Math.max(0, Math.min(1, value));
  const lbl = pickLabel(v);
  const angle = -90 + v * 180; // -90 (left) → 90 (right)

  // arc geometry
  const R = 64;
  const cx = 80;
  const cy = 80;
  const arc = a => {
    const r = a * Math.PI / 180;
    return [cx + R * Math.cos(r), cy + R * Math.sin(r)];
  };
  const [sx, sy] = arc(180);
  const [ex, ey] = arc(0);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 8,
      padding: "16px 20px",
      background: "rgba(18, 18, 31, 0.55)",
      backdropFilter: "blur(16px)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "Club Vibe"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 160,
      height: 96
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "160",
    height: "96",
    viewBox: "0 0 160 96"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "moodGrad",
    x1: "0",
    x2: "1",
    y1: "0",
    y2: "0"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#3a86ff"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "35%",
    stopColor: "#8338ec"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "60%",
    stopColor: "#b5179e"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "85%",
    stopColor: "#f72585"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#ff8500"
  })), /*#__PURE__*/React.createElement("filter", {
    id: "moodGlow"
  }, /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "4"
  }))), /*#__PURE__*/React.createElement("path", {
    d: `M ${sx} ${sy} A ${R} ${R} 0 0 1 ${ex} ${ey}`,
    stroke: "url(#moodGrad)",
    strokeWidth: "10",
    fill: "none",
    opacity: "0.4",
    filter: "url(#moodGlow)"
  }), /*#__PURE__*/React.createElement("path", {
    d: `M ${sx} ${sy} A ${R} ${R} 0 0 1 ${ex} ${ey}`,
    stroke: "url(#moodGrad)",
    strokeWidth: "6",
    fill: "none",
    strokeLinecap: "round"
  }), /*#__PURE__*/React.createElement("g", {
    transform: `translate(${cx} ${cy}) rotate(${angle})`,
    style: {
      transition: "transform var(--dur-ambient) var(--ease-velvet)"
    }
  }, /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "0",
    x2: "0",
    y2: -(R - 4),
    stroke: lbl.color,
    strokeWidth: "2.5",
    strokeLinecap: "round",
    filter: "url(#moodGlow)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "0",
    cy: "0",
    r: "6",
    fill: "var(--void-900)",
    stroke: lbl.color,
    strokeWidth: "2"
  }))), !compact && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -2,
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDF19"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCA5"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-display)",
      fontSize: 18,
      fontWeight: 700,
      color: "var(--text-hi)",
      transition: "color var(--dur-ambient) var(--ease-velvet)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textShadow: `0 0 12px ${lbl.color}`
    }
  }, lbl.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 18
    }
  }, lbl.emoji)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      textAlign: "center"
    }
  }, "Based on ", sampleCount, " messages", /*#__PURE__*/React.createElement("br", null), "in the ", windowLabel));
}
Object.assign(__ds_scope, { MoodMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/MoodMeter.jsx", error: String((e && e.message) || e) }); }

// components/club/NeonSign.jsx
try { (() => {
function NeonSign({
  children,
  style = "tube",
  color,
  size = 56,
  flicker = false,
  framed = false,
  rotate = 0
}) {
  const c = color || "var(--accent)";
  const tubeStyle = {
    color: "#fff",
    WebkitTextStroke: `1.5px ${c}`,
    textShadow: `
      0 0 4px #fff,
      0 0 10px ${c},
      0 0 24px ${c},
      0 0 48px ${c}
    `
  };
  const solidStyle = {
    color: c,
    textShadow: `
      0 0 6px ${c},
      0 0 18px ${c},
      0 0 36px ${c},
      0 0 80px color-mix(in oklab, ${c} 50%, transparent)
    `
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      transform: `rotate(${rotate}deg)`,
      ...(framed ? {
        padding: "12px 20px",
        border: `1px solid color-mix(in oklab, ${c} 35%, transparent)`,
        borderRadius: 8,
        background: "rgba(8, 8, 15, 0.35)",
        boxShadow: `inset 0 0 24px color-mix(in oklab, ${c} 18%, transparent), 0 0 32px color-mix(in oklab, ${c} 25%, transparent)`
      } : null)
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-block",
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: size,
      lineHeight: 1,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      animation: flicker ? "av-neon-flicker 8s steps(1, end) infinite" : undefined,
      ...(style === "tube" ? tubeStyle : solidStyle)
    }
  }, children), /*#__PURE__*/React.createElement("style", null, `
        @keyframes av-neon-flicker {
          0%, 18%, 22%, 25%, 53%, 57%, 100% {
            opacity: 1;
            filter: brightness(1);
          }
          20%, 24%, 55% {
            opacity: 0.4;
            filter: brightness(0.6);
          }
          85%, 86% {
            opacity: 0.7;
            filter: brightness(0.8);
          }
        }
      `));
}
Object.assign(__ds_scope, { NeonSign });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/NeonSign.jsx", error: String((e && e.message) || e) }); }

// components/club/NowPlaying.jsx
try { (() => {
function Waveform({
  bars = 28
}) {
  // Deterministic pseudo-random heights so SSR + first paint match
  const heights = React.useMemo(() => {
    const out = [];
    let seed = 7;
    for (let i = 0; i < bars; i++) {
      seed = (seed * 9301 + 49297) % 233280;
      out.push(0.25 + seed / 233280 * 0.75);
    }
    return out;
  }, [bars]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 2,
      height: 28,
      flex: 1
    }
  }, heights.map((h, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      flex: 1,
      height: `${h * 100}%`,
      background: "var(--accent)",
      borderRadius: 1,
      opacity: 0.85,
      boxShadow: "0 0 4px var(--accent)",
      animation: `av-equalize ${1 + i % 5 * 0.2}s var(--ease-in-out) ${i * 0.04}s infinite alternate`,
      transformOrigin: "center"
    }
  })));
}
function NowPlaying({
  track,
  artist,
  progress = 0.3,
  votable = true,
  voted = false,
  onVote
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      padding: 14,
      width: 320,
      background: "rgba(18, 18, 31, 0.7)",
      backdropFilter: "blur(16px) saturate(160%)",
      WebkitBackdropFilter: "blur(16px) saturate(160%)",
      border: "1px solid var(--border-soft)",
      borderRadius: 14,
      boxShadow: "var(--shadow-md), 0 0 16px color-mix(in oklab, var(--accent) 18%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 40,
      borderRadius: 999,
      background: "radial-gradient(circle, #0c0b14 28%, var(--accent) 28% 30%, #0c0b14 30%)",
      border: "2px solid var(--void-400)",
      boxShadow: "0 0 12px var(--accent)",
      animation: "av-breathe 3s linear infinite",
      flexShrink: 0,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 6,
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.05)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 12,
      borderRadius: 999,
      border: "1px solid rgba(255,255,255,0.05)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--accent)"
    }
  }, "\u266A Now Playing"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 14,
      fontWeight: 600,
      color: "var(--text-hi)",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis"
    }
  }, track), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 12,
      color: "var(--text-dim)"
    }
  }, artist)), votable && /*#__PURE__*/React.createElement("button", {
    onClick: onVote,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      width: 36,
      height: 36,
      borderRadius: 999,
      border: "1px solid var(--border-soft)",
      background: voted ? "color-mix(in oklab, var(--accent) 20%, transparent)" : "transparent",
      color: voted ? "var(--accent)" : "var(--text-dim)",
      fontSize: 16,
      cursor: "pointer",
      transition: "var(--t-hover)",
      boxShadow: voted ? "0 0 12px color-mix(in oklab, var(--accent) 40%, transparent)" : "none",
      transform: hover ? "scale(1.08)" : "scale(1)"
    },
    "aria-label": "Vote on this track"
  }, "\u2665")), /*#__PURE__*/React.createElement(Waveform, null), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 2,
      borderRadius: 999,
      background: "rgba(255,255,255,0.08)",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      bottom: 0,
      width: `${progress * 100}%`,
      background: "var(--accent)",
      boxShadow: "0 0 8px var(--accent)",
      transition: "width var(--dur-slower) var(--ease-velvet)"
    }
  })));
}
Object.assign(__ds_scope, { NowPlaying });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/NowPlaying.jsx", error: String((e && e.message) || e) }); }

// components/club/PhotoBackdrop.jsx
try { (() => {
function PhotoBackdrop({
  slotId,
  placeholder = "Drop a photo of the room",
  src,
  parallax = 0.15,
  grain = 0.22,
  tint,
  vignette = 0.7
}) {
  const [scrollY, setScrollY] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 0,
      overflow: "hidden",
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: `-${parallax * 100}px ${-parallax * 100}px`,
      transform: `translateY(${scrollY * parallax}px) scale(1.08)`,
      willChange: "transform",
      transition: "transform 80ms linear"
    }
    // image-slot uses click/drag, so re-enable pointer events on the slot wrapper
    ,
    ref: el => el && (el.style.pointerEvents = "auto")
  }, /*#__PURE__*/React.createElement("image-slot", {
    id: slotId,
    shape: "rect",
    fit: "cover",
    placeholder: placeholder,
    src: src,
    style: {
      width: "100%",
      height: "100%",
      display: "block",
      background: "var(--void-900)"
    }
  })), tint && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: tint,
      mixBlendMode: "soft-light",
      opacity: 0.7,
      transition: "background var(--dur-ambient) var(--ease-velvet)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      backgroundImage: "var(--noise)",
      opacity: grain,
      mixBlendMode: "overlay"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `radial-gradient(140% 100% at 50% 40%, transparent 40%, rgba(0,0,0,${vignette}) 100%)`
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "30%",
      background: "linear-gradient(180deg, transparent 0%, rgba(8,8,15,0.55) 60%, rgba(8,8,15,0.85) 100%)"
    }
  }));
}
Object.assign(__ds_scope, { PhotoBackdrop });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/PhotoBackdrop.jsx", error: String((e && e.message) || e) }); }

// components/club/PhysicalButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PhysicalButton({
  variant,
  label,
  icon,
  active = false,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick
  };
  if (variant === "drink") {
    // Cocktail glass — triangular bowl with liquid line and stem
    return /*#__PURE__*/React.createElement("button", _extends({}, handlers, {
      style: {
        position: "relative",
        width: 88,
        height: 110,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
        transition: "var(--t-hover)",
        transform: hover ? "translateY(-4px) scale(1.04)" : "translateY(0)"
      }
    }), /*#__PURE__*/React.createElement("svg", {
      width: "88",
      height: "110",
      viewBox: "0 0 88 110"
    }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
      id: "liquid",
      x1: "0",
      y1: "0",
      x2: "0",
      y2: "1"
    }, /*#__PURE__*/React.createElement("stop", {
      offset: "0%",
      stopColor: "var(--accent)",
      stopOpacity: "0.95"
    }), /*#__PURE__*/React.createElement("stop", {
      offset: "100%",
      stopColor: "var(--accent)",
      stopOpacity: "0.55"
    })), /*#__PURE__*/React.createElement("filter", {
      id: "glassBlur"
    }, /*#__PURE__*/React.createElement("feGaussianBlur", {
      stdDeviation: "0.6"
    }))), /*#__PURE__*/React.createElement("path", {
      d: "M 10 8 L 78 8 L 50 62 L 38 62 Z",
      fill: "rgba(255,255,255,0.06)",
      stroke: "rgba(255,255,255,0.4)",
      strokeWidth: "1.2",
      filter: "url(#glassBlur)"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M 18 16 L 70 16 L 49 56 L 39 56 Z",
      fill: "url(#liquid)",
      style: {
        filter: `drop-shadow(0 0 ${hover ? 14 : 8}px var(--accent))`
      }
    }), /*#__PURE__*/React.createElement("path", {
      d: "M 16 12 L 22 12 L 30 32",
      stroke: "rgba(255,255,255,0.4)",
      strokeWidth: "1.2",
      fill: "none"
    }), /*#__PURE__*/React.createElement("rect", {
      x: "42",
      y: "62",
      width: "4",
      height: "32",
      fill: "rgba(255,255,255,0.35)"
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: "44",
      cy: "98",
      rx: "20",
      ry: "3",
      fill: "rgba(255,255,255,0.35)"
    }), /*#__PURE__*/React.createElement("ellipse", {
      cx: "44",
      cy: "104",
      rx: "26",
      ry: "3",
      fill: "rgba(0,0,0,0.5)",
      filter: "url(#glassBlur)"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
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
        pointerEvents: "none"
      }
    }, label));
  }
  if (variant === "jukebox") {
    // Chrome knob
    return /*#__PURE__*/React.createElement("button", _extends({}, handlers, {
      style: {
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
        transform: hover ? "rotate(15deg)" : "rotate(0deg)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        top: 8,
        left: "50%",
        transform: "translateX(-50%)",
        width: 4,
        height: 18,
        borderRadius: 2,
        background: "var(--accent)",
        boxShadow: "0 0 8px var(--accent)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        inset: 4,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.15)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
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
        textShadow: "0 0 6px var(--accent)"
      }
    }, icon || label.slice(0, 4)));
  }
  if (variant === "arcade") {
    // Pushbutton — concave glowing dome
    const pressed = active;
    return /*#__PURE__*/React.createElement("button", _extends({}, handlers, {
      style: {
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
        transform: pressed ? "translateY(4px)" : hover ? "translateY(-2px)" : "translateY(0)"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
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
        textShadow: "0 1px 0 rgba(255,255,255,0.3)"
      }
    }, icon ? /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 24
      }
    }, icon) : label.slice(0, 5)));
  }

  // neon — glowing pill
  return /*#__PURE__*/React.createElement("button", _extends({}, handlers, {
    style: {
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
      transform: hover ? "translateY(-2px)" : "none"
    }
  }), icon, " ", label);
}
Object.assign(__ds_scope, { PhysicalButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/PhysicalButton.jsx", error: String((e && e.message) || e) }); }

// components/club/SpatialAvatar.jsx
try { (() => {
function initials(name) {
  const parts = (name || "??").trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}
function hueFromName(n) {
  let h = 0;
  for (let i = 0; i < n.length; i++) h = (h * 31 + n.charCodeAt(i)) % 360;
  return h;
}
function SpatialAvatar({
  name,
  src,
  top = "60%",
  left = "30%",
  size = 48,
  activity = 0.3,
  speech,
  bubbleDir = "top",
  onClick
}) {
  const hue = hueFromName(name || "anon");
  const bg = `linear-gradient(135deg, hsl(${hue}, 70%, 35%), hsl(${(hue + 60) % 360}, 70%, 25%))`;
  const glow = Math.max(0, Math.min(1, activity));
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top,
      left,
      transform: "translate(-50%, -50%)",
      zIndex: 4,
      cursor: onClick ? "pointer" : "default"
    },
    onClick: onClick
  }, speech && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      ...(bubbleDir === "top" ? {
        bottom: size + 14,
        left: "50%",
        transform: "translateX(-50%)"
      } : {
        left: size + 14,
        top: "50%",
        transform: "translateY(-50%)"
      }),
      background: "rgba(245, 244, 255, 0.96)",
      color: "var(--void-900)",
      fontFamily: "var(--font-body)",
      fontSize: 13,
      fontWeight: 500,
      padding: "8px 12px",
      borderRadius: 14,
      whiteSpace: "nowrap",
      maxWidth: 280,
      boxShadow: "0 8px 24px rgba(0,0,0,0.5), 0 0 16px color-mix(in oklab, var(--accent) 40%, transparent)",
      animation: "av-bubble-in 220ms var(--ease-spring)"
    }
  }, speech, /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      ...(bubbleDir === "top" ? {
        bottom: -6,
        left: "50%",
        transform: "translateX(-50%) rotate(45deg)"
      } : {
        left: -6,
        top: "50%",
        transform: "translateY(-50%) rotate(45deg)"
      }),
      width: 12,
      height: 12,
      background: "rgba(245, 244, 255, 0.96)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: src ? `url(${src}) center/cover, ${bg}` : bg,
      color: "rgba(255,255,255,0.92)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      fontSize: size * 0.34,
      fontWeight: 700,
      border: "1.5px solid rgba(255,255,255,0.18)",
      boxShadow: `
            0 0 0 ${1 + glow * 3}px color-mix(in oklab, var(--accent) ${20 + glow * 60}%, transparent),
            0 0 ${10 + glow * 30}px color-mix(in oklab, var(--accent) ${20 + glow * 60}%, transparent),
            0 6px 16px rgba(0,0,0,0.6)
          `,
      animation: glow > 0.5 ? "av-breathe 2s var(--ease-velvet) infinite" : undefined,
      transition: "box-shadow var(--dur-ambient) var(--ease-velvet)"
    }
  }, !src && initials(name)), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 6,
      textAlign: "center",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: "var(--text-hi)",
      textShadow: "0 2px 8px rgba(0,0,0,0.8)",
      whiteSpace: "nowrap"
    }
  }, name), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      top: size + 4,
      width: size * 0.9,
      height: size * 0.15,
      transform: "translateX(-50%)",
      borderRadius: "50%",
      background: "radial-gradient(closest-side, rgba(0,0,0,0.55), transparent 70%)",
      filter: "blur(4px)",
      zIndex: -1
    }
  }), /*#__PURE__*/React.createElement("style", null, `
        @keyframes av-bubble-in {
          from { opacity: 0; transform: translateX(-50%) translateY(4px) scale(0.96); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); }
        }
      `));
}
Object.assign(__ds_scope, { SpatialAvatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/SpatialAvatar.jsx", error: String((e && e.message) || e) }); }

// components/club/TVScreen.jsx
try { (() => {
const sizes = {
  sm: {
    bezel: 12,
    radius: 18,
    innerRadius: 14
  },
  md: {
    bezel: 18,
    radius: 28,
    innerRadius: 22
  },
  lg: {
    bezel: 24,
    radius: 36,
    innerRadius: 28
  }
};
function TVScreen({
  children,
  scanlines = true,
  flicker = true,
  aspect = "16 / 9",
  caption,
  size = "md"
}) {
  const s = sizes[size];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "inline-block",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      aspectRatio: aspect,
      padding: s.bezel,
      borderRadius: s.radius,
      background: "linear-gradient(180deg, #2a2538 0%, #14131e 50%, #0c0b14 100%)",
      boxShadow: "var(--shadow-xl), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -1px 0 rgba(0,0,0,0.6)",
      transform: "perspective(1200px) rotateX(1.5deg)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      borderRadius: s.innerRadius,
      overflow: "hidden",
      background: "radial-gradient(120% 90% at 50% 20%, #2a3a55 0%, #08080f 75%)",
      boxShadow: "inset 0 0 100px rgba(0,0,0,0.8), inset 0 0 0 1px rgba(255,255,255,0.08)",
      animation: flicker ? "av-flicker 7s steps(1, end) infinite" : undefined
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "var(--text-hi)"
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "radial-gradient(40% 30% at 30% 30%, rgba(0, 245, 212, 0.18), transparent 70%), radial-gradient(40% 30% at 70% 70%, rgba(247, 37, 133, 0.18), transparent 70%)",
      mixBlendMode: "screen"
    }
  }), scanlines && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      background: "repeating-linear-gradient(to bottom, rgba(255,255,255,0.05) 0 1px, transparent 1px 3px)",
      opacity: 0.9
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none",
      boxShadow: "inset 0 0 120px rgba(0,0,0,0.7)",
      borderRadius: s.innerRadius
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      height: 80,
      top: -80,
      pointerEvents: "none",
      background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.08), transparent)",
      animation: "av-scan 7s linear infinite"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: s.bezel / 2 - 4,
      left: "50%",
      transform: "translateX(-50%)",
      width: 60,
      height: 3,
      borderRadius: 999,
      background: "rgba(255,255,255,0.1)",
      boxShadow: "0 0 6px rgba(0,245,212,0.4)"
    }
  })), caption && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 12,
      display: "flex",
      justifyContent: "center",
      color: "var(--text-dim)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.2em",
      textTransform: "uppercase"
    }
  }, caption));
}
Object.assign(__ds_scope, { TVScreen });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/TVScreen.jsx", error: String((e && e.message) || e) }); }

// components/club/ClubStage.jsx
try { (() => {
function ClubStage({
  clubName,
  kicker,
  mood = 0.55,
  memberCount = 47,
  live = false,
  children,
  caption
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 220px",
      gap: 28,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, kicker && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "var(--accent)",
      padding: "3px 10px",
      borderRadius: 999,
      background: "color-mix(in oklab, var(--accent) 14%, transparent)",
      border: "1px solid color-mix(in oklab, var(--accent) 30%, transparent)",
      whiteSpace: "nowrap"
    }
  }, kicker), live && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.24em",
      textTransform: "uppercase",
      color: "#ff8da0",
      padding: "3px 10px",
      borderRadius: 999,
      background: "color-mix(in oklab, var(--danger) 18%, transparent)",
      border: "1px solid color-mix(in oklab, var(--danger) 40%, transparent)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: "currentColor",
      boxShadow: "0 0 8px currentColor",
      animation: "av-breathe 1.6s var(--ease-velvet) infinite"
    }
  }), "LIVE"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--text-muted)",
      marginLeft: "auto"
    }
  }, memberCount, " vibing")), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(40px, 5.5vw, 72px)",
      lineHeight: 1.0,
      letterSpacing: "-0.02em",
      background: "linear-gradient(180deg, var(--smoke-100) 0%, var(--smoke-300) 100%)",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent",
      textShadow: "0 0 24px color-mix(in oklab, var(--accent) 40%, transparent), 0 0 56px color-mix(in oklab, var(--accent) 20%, transparent)"
    }
  }, clubName), /*#__PURE__*/React.createElement(__ds_scope.TVScreen, {
    caption: caption
  }, children)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "stretch",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.MoodMeter, {
    value: mood,
    sampleCount: memberCount
  })));
}
Object.assign(__ds_scope, { ClubStage });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/club/ClubStage.jsx", error: String((e && e.message) || e) }); }

// components/core/Avatar.jsx
try { (() => {
function initials(name) {
  if (!name) return "??";
  const parts = name.trim().split(/\s+/);
  return (parts[0][0] + (parts[1]?.[0] || "")).toUpperCase();
}
function hueFromName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360;
  return h;
}
const statusColors = {
  online: "var(--success)",
  offline: "var(--smoke-500)",
  live: "var(--coral-400)"
};
function Avatar({
  name,
  src,
  size = 40,
  active = false,
  status = null
}) {
  const hue = hueFromName(name || "anon");
  const bg = `linear-gradient(135deg, hsl(${hue}, 70%, 35%), hsl(${(hue + 60) % 360}, 70%, 25%))`;
  return /*#__PURE__*/React.createElement("span", {
    style: {
      position: "relative",
      display: "inline-flex",
      width: size,
      height: size
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      background: src ? `url(${src}) center/cover, ${bg}` : bg,
      color: "rgba(255,255,255,0.92)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "var(--font-mono)",
      fontSize: size * 0.32,
      fontWeight: 700,
      letterSpacing: "0.05em",
      border: "1px solid rgba(255,255,255,0.08)",
      boxShadow: active ? "0 0 0 2px var(--accent), 0 0 18px var(--accent)" : "var(--shadow-xs)",
      animation: active ? "av-breathe 2.4s var(--ease-velvet) infinite" : undefined
    }
  }, !src && initials(name)), status && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: Math.max(8, size * 0.22),
      height: Math.max(8, size * 0.22),
      borderRadius: "50%",
      background: statusColors[status],
      border: "2px solid var(--bg-page)",
      boxShadow: status === "live" ? "0 0 8px var(--coral-400)" : undefined
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
const variantMap = {
  default: {
    background: "rgba(255,255,255,0.06)",
    color: "var(--text-hi)",
    border: "1px solid var(--border-soft)"
  },
  live: {
    background: "color-mix(in oklab, var(--danger) 18%, transparent)",
    color: "#ff8da0",
    border: "1px solid color-mix(in oklab, var(--danger) 40%, transparent)",
    boxShadow: "0 0 12px rgba(255, 77, 109, 0.4)"
  },
  accent: {
    background: "color-mix(in oklab, var(--accent) 18%, transparent)",
    color: "var(--accent)",
    border: "1px solid color-mix(in oklab, var(--accent) 40%, transparent)",
    boxShadow: "var(--glow-sm)"
  },
  outline: {
    background: "transparent",
    color: "var(--text-dim)",
    border: "1px solid var(--border-strong)"
  }
};
function Badge({
  variant = "default",
  pulse = false,
  children
}) {
  const v = variantMap[variant];
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      height: 22,
      padding: "0 10px",
      borderRadius: 999,
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      flexShrink: 0,
      ...v
    }
  }, pulse && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: 999,
      background: "currentColor",
      boxShadow: "0 0 8px currentColor",
      animation: "av-breathe 1.6s var(--ease-velvet) infinite"
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
const sizeMap = {
  sm: {
    padY: 8,
    padX: 14,
    fs: 12,
    gap: 6,
    h: 32
  },
  md: {
    padY: 10,
    padX: 18,
    fs: 13,
    gap: 8,
    h: 40
  },
  lg: {
    padY: 14,
    padX: 24,
    fs: 14,
    gap: 10,
    h: 48
  }
};
const baseStyle = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "var(--font-mono)",
  fontWeight: 700,
  letterSpacing: "0.16em",
  textTransform: "uppercase",
  borderRadius: "var(--radius-pill)",
  border: "1px solid transparent",
  cursor: "pointer",
  userSelect: "none",
  transition: "var(--t-hover)",
  whiteSpace: "nowrap"
};
const variantStyle = {
  primary: {
    background: "var(--accent)",
    color: "var(--void-900)",
    boxShadow: "var(--glow-md)"
  },
  ghost: {
    background: "rgba(255,255,255,0.04)",
    color: "var(--text-hi)",
    borderColor: "var(--border-strong)",
    backdropFilter: "blur(8px)"
  },
  glow: {
    background: "color-mix(in oklab, var(--accent) 12%, transparent)",
    color: "var(--accent)",
    borderColor: "color-mix(in oklab, var(--accent) 35%, transparent)"
  }
};
function Button({
  variant = "ghost",
  size = "md",
  icon,
  disabled = false,
  block = false,
  onClick,
  children,
  className = ""
}) {
  const s = sizeMap[size];
  const v = variantStyle[variant];
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const hoverFx = !disabled && hover ? variant === "primary" ? {
    filter: "brightness(1.12)",
    transform: press ? "translateY(0)" : "translateY(-1px)"
  } : variant === "glow" ? {
    background: "color-mix(in oklab, var(--accent) 22%, transparent)",
    boxShadow: "var(--glow-sm)",
    transform: press ? "translateY(0)" : "translateY(-1px)"
  } : {
    background: "rgba(255,255,255,0.08)",
    borderColor: "var(--accent)",
    color: "var(--text-hi)",
    transform: press ? "translateY(0)" : "translateY(-1px)"
  } : {};
  return /*#__PURE__*/React.createElement("button", {
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false),
    className: className,
    style: {
      ...baseStyle,
      ...v,
      padding: `${s.padY}px ${s.padX}px`,
      fontSize: s.fs,
      gap: s.gap,
      height: s.h,
      width: block ? "100%" : undefined,
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? "none" : "auto",
      ...hoverFx
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      fontSize: s.fs + 4
    }
  }, icon), children);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
const variants = {
  solid: {
    background: "var(--bg-surface)",
    border: "1px solid var(--border-faint)",
    boxShadow: "var(--shadow-sm)"
  },
  glass: {
    background: "rgba(18, 18, 31, 0.55)",
    backdropFilter: "blur(16px) saturate(160%)",
    WebkitBackdropFilter: "blur(16px) saturate(160%)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "var(--shadow-md)"
  },
  stage: {
    background: "radial-gradient(120% 80% at 50% 0%, var(--void-700), var(--void-900) 70%)",
    border: "1px solid var(--border-faint)",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04), var(--shadow-lg)"
  }
};
const padScale = {
  0: 0,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 32
};
function Card({
  variant = "solid",
  pad = 4,
  glow = false,
  onClick,
  children,
  className = ""
}) {
  const [hover, setHover] = React.useState(false);
  const v = variants[variant];
  return /*#__PURE__*/React.createElement("div", {
    role: onClick ? "button" : undefined,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    className: className,
    style: {
      borderRadius: "var(--radius-lg)",
      padding: padScale[pad],
      cursor: onClick ? "pointer" : "default",
      transition: "var(--t-hover)",
      ...v,
      boxShadow: glow ? `${v.boxShadow}, 0 0 32px color-mix(in oklab, var(--accent) 30%, transparent)` : v.boxShadow,
      ...(onClick && hover ? {
        transform: "translateY(-2px)",
        boxShadow: `${v.boxShadow}, 0 0 24px color-mix(in oklab, var(--accent) 40%, transparent)`
      } : null)
    }
  }, children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
const sizes = {
  sm: {
    d: 32,
    fs: 14
  },
  md: {
    d: 40,
    fs: 16
  },
  lg: {
    d: 48,
    fs: 20
  }
};
const variants = {
  primary: {
    background: "var(--accent)",
    color: "var(--void-900)",
    boxShadow: "var(--glow-md)"
  },
  ghost: {
    background: "rgba(255,255,255,0.04)",
    color: "var(--text-hi)",
    border: "1px solid var(--border-strong)",
    backdropFilter: "blur(8px)"
  },
  glow: {
    background: "color-mix(in oklab, var(--accent) 14%, transparent)",
    color: "var(--accent)",
    border: "1px solid color-mix(in oklab, var(--accent) 35%, transparent)"
  }
};
function IconButton({
  variant = "ghost",
  size = "md",
  children,
  label,
  disabled = false,
  badge = false,
  onClick
}) {
  const s = sizes[size];
  const v = variants[variant];
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", {
    "aria-label": label,
    title: label,
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: s.d,
      height: s.d,
      fontSize: s.fs,
      borderRadius: "50%",
      cursor: "pointer",
      transition: "var(--t-hover)",
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? "none" : "auto",
      ...v,
      ...(hover && !disabled ? {
        transform: "translateY(-1px)",
        boxShadow: variant === "primary" ? "var(--glow-lg)" : "var(--glow-sm)",
        filter: "brightness(1.1)"
      } : null)
    }
  }, children, badge && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 4,
      right: 4,
      width: 8,
      height: 8,
      borderRadius: 999,
      background: "var(--coral-400)",
      boxShadow: "0 0 8px var(--coral-400)"
    }
  }));
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Input.jsx
try { (() => {
const sizes = {
  sm: {
    h: 36,
    fs: 14,
    padX: 12,
    gap: 8
  },
  md: {
    h: 44,
    fs: 15,
    padX: 14,
    gap: 10
  },
  lg: {
    h: 56,
    fs: 17,
    padX: 18,
    gap: 12
  }
};
function Input({
  value,
  onChange,
  placeholder,
  icon,
  suffix,
  size = "md",
  glow = true,
  onSubmit,
  disabled = false
}) {
  const s = sizes[size];
  const [focused, setFocused] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: s.gap,
      height: s.h,
      padding: `0 ${s.padX}px`,
      background: "rgba(255,255,255,0.04)",
      border: `1px solid ${focused ? "color-mix(in oklab, var(--accent) 60%, transparent)" : "var(--border-soft)"}`,
      borderRadius: "var(--radius-pill)",
      transition: "var(--t-hover)",
      boxShadow: focused && glow ? "var(--glow-sm)" : "none",
      opacity: disabled ? 0.4 : 1,
      pointerEvents: disabled ? "none" : "auto"
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      color: focused ? "var(--accent)" : "var(--text-muted)",
      display: "inline-flex",
      fontSize: s.fs + 2,
      transition: "color var(--dur-fast)"
    }
  }, icon), /*#__PURE__*/React.createElement("input", {
    value: value,
    onChange: e => onChange(e.target.value),
    placeholder: placeholder,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onKeyDown: e => {
      if (e.key === "Enter" && onSubmit) onSubmit(value);
    },
    style: {
      flex: 1,
      background: "transparent",
      border: "none",
      outline: "none",
      color: "var(--text-hi)",
      fontFamily: "var(--font-body)",
      fontSize: s.fs,
      minWidth: 0
    }
  }), suffix);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Input.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club/ClubStats.jsx
try { (() => {
/**
 * ClubStats — small right-side panel with stats + trending topic.
 */
function ClubStats({
  memberCount,
  moodLabel,
  trendingTopic,
  energyDelta = 12
}) {
  const {
    Badge
  } = window.AudiovidoFanClubDesignSystem_013bf7;
  const lines = [{
    lbl: "VIBING NOW",
    val: memberCount,
    suffix: "members"
  }, {
    lbl: "MOOD",
    val: moodLabel,
    suffix: null
  }, {
    lbl: "TRENDING",
    val: trendingTopic,
    suffix: null
  }, {
    lbl: "ENERGY",
    val: `+${energyDelta}%`,
    suffix: "vs last hour"
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: 16,
      background: "rgba(18, 18, 31, 0.55)",
      backdropFilter: "blur(16px)",
      border: "1px solid var(--border-faint)",
      borderRadius: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "The Pulse"), /*#__PURE__*/React.createElement(Badge, {
    variant: "accent"
  }, "LIVE")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 12
    }
  }, lines.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.lbl,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, l.lbl), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6,
      fontFamily: "var(--font-display)",
      fontSize: 22,
      fontWeight: 700,
      color: "var(--text-hi)",
      letterSpacing: "-0.01em"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      textShadow: "0 0 12px color-mix(in oklab, var(--accent) 50%, transparent)"
    }
  }, l.val), l.suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      fontWeight: 400,
      color: "var(--text-muted)",
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    }
  }, l.suffix))))));
}
window.__ClubStats = ClubStats;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club/ClubStats.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club/Decor.jsx
try { (() => {
/**
 * Decor — ambient corner decorations: floating vinyl record, film reel.
 * Pure CSS — no images.
 */
function VinylDecor({
  side = "left",
  top = "12%"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      [side]: "-60px",
      top,
      width: 200,
      height: 200,
      pointerEvents: "none",
      opacity: 0.4,
      animation: "av-drift 14s var(--ease-velvet) infinite"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      background: "radial-gradient(circle, var(--void-900) 0%, var(--void-800) 12%, transparent 13%), repeating-radial-gradient(circle, var(--void-700) 0 2px, var(--void-800) 2px 4px)",
      boxShadow: "0 0 40px rgba(0,0,0,0.6), 0 0 80px color-mix(in oklab, var(--accent) 30%, transparent)",
      animation: "spin 20s linear infinite"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "40%",
      borderRadius: "50%",
      background: "radial-gradient(circle, var(--accent), transparent 60%)",
      boxShadow: "0 0 24px var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("style", null, `@keyframes spin { to { transform: rotate(360deg); } }`));
}
function ReelDecor({
  side = "right",
  top = "10%"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      [side]: "-80px",
      top,
      width: 220,
      height: 220,
      pointerEvents: "none",
      opacity: 0.35,
      animation: "av-drift 18s var(--ease-velvet) infinite reverse"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 200 200",
    style: {
      animation: "spin 30s linear infinite"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "98",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    style: {
      color: "var(--accent)"
    }
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "78",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1",
    opacity: "0.4",
    style: {
      color: "var(--accent)"
    }
  }), [0, 60, 120, 180, 240, 300].map(d => {
    const r = d * Math.PI / 180;
    const x = 100 + 60 * Math.cos(r);
    const y = 100 + 60 * Math.sin(r);
    return /*#__PURE__*/React.createElement("circle", {
      key: d,
      cx: x,
      cy: y,
      r: "14",
      fill: "var(--void-900)",
      stroke: "var(--accent)",
      strokeWidth: "1.5"
    });
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "6",
    fill: "var(--accent)"
  })), /*#__PURE__*/React.createElement("style", null, `@keyframes spin { to { transform: rotate(360deg); } }`));
}
window.__Decor = {
  VinylDecor,
  ReelDecor
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club/Decor.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club/FanClubPage.jsx
try { (() => {
/**
 * FanClubPage — the full Fan Club view. Composes the design system's
 * ClubStage + MemberStack + ChallengeCard + NowPlaying + ChatMessage
 * with kit-local Particles, Decor, ClubStats, and FloorActions.
 */
const moodLabelOf = v => v < 0.2 ? "Melancholic" : v < 0.4 ? "Mellow" : v < 0.6 ? "Engaged" : v < 0.85 ? "Hype" : "Euphoric";
function FanClubPage({
  club,
  onSwitchClub,
  otherClubLabel,
  otherClubScope
}) {
  const NS = window.AudiovidoFanClubDesignSystem_013bf7;
  const {
    ClubStage,
    ChatMessage,
    MemberStack,
    ChallengeCard,
    NowPlaying,
    Input,
    IconButton,
    Badge
  } = NS;
  const [messages, setMessages] = React.useState(club.seedMessages);
  const [composer, setComposer] = React.useState("");
  const [mood, setMood] = React.useState(club.mood);
  const [memberCount, setMemberCount] = React.useState(47);
  const [voted, setVoted] = React.useState(false);
  const [micOn, setMicOn] = React.useState(false);

  // Reset state when switching clubs
  React.useEffect(() => {
    setMessages(club.seedMessages);
    setMood(club.mood);
  }, [club.slug]);
  const send = () => {
    const t = composer.trim();
    if (!t) return;
    setMessages(m => [...m, {
      id: Date.now(),
      author: "you",
      persona: "member",
      time: "now",
      text: t
    }]);
    setComposer("");
    // Sending a positive vibe nudges mood up slightly
    const hot = /[!?]|love|fire|amazing|insane|🔥|💯|wow/i.test(t);
    if (hot) setMood(v => Math.min(1, v + 0.04));
  };
  const react = emoji => {
    setMessages(m => {
      if (!m.length) return m;
      const next = [...m];
      const last = {
        ...next[next.length - 1]
      };
      const r = [...(last.reactions || [])];
      const ix = r.findIndex(x => x.emoji === emoji);
      if (ix >= 0) r[ix] = {
        ...r[ix],
        count: r[ix].count + 1
      };else r.push({
        emoji,
        count: 1
      });
      last.reactions = r;
      next[next.length - 1] = last;
      return next;
    });
    setMood(v => Math.min(1, v + 0.02));
  };

  // Kit-local components live on window after their JSX files transpile
  const Particles = window.__Particles;
  const Decor = window.__Decor;
  const FloorActions = window.__FloorActions;
  const ClubStats = window.__ClubStats;
  const intensity = mood;
  const isCinema = club.scope === "club-cinema";
  return /*#__PURE__*/React.createElement("div", {
    className: club.scope,
    style: {
      position: "relative",
      minHeight: "100vh",
      overflow: "hidden",
      color: "var(--text-body)",
      background: `
          radial-gradient(80% 60% at 20% 20%, color-mix(in oklab, var(--mood-a) 70%, transparent), transparent 60%),
          radial-gradient(70% 60% at 80% 30%, color-mix(in oklab, var(--mood-b) 60%, transparent), transparent 60%),
          radial-gradient(90% 70% at 50% 100%, color-mix(in oklab, var(--mood-c) 70%, transparent), transparent 65%),
          var(--void-800)
        `,
      transition: "background var(--dur-ambient) var(--ease-velvet)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      opacity: 0.18,
      pointerEvents: "none",
      backgroundImage: "var(--noise)",
      mixBlendMode: "overlay"
    }
  }), Particles && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(Particles, {
    intensity: intensity,
    count: 48
  })), Decor && !isCinema && /*#__PURE__*/React.createElement(Decor.VinylDecor, {
    side: "left",
    top: "22%"
  }), Decor && !isCinema && /*#__PURE__*/React.createElement(Decor.VinylDecor, {
    side: "right",
    top: "58%"
  }), Decor && isCinema && /*#__PURE__*/React.createElement(Decor.ReelDecor, {
    side: "left",
    top: "20%"
  }), Decor && isCinema && /*#__PURE__*/React.createElement(Decor.ReelDecor, {
    side: "right",
    top: "60%"
  }), /*#__PURE__*/React.createElement("header", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "20px 32px",
      zIndex: 2
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 18,
      fontWeight: 800,
      letterSpacing: "-0.01em",
      color: "var(--text-hi)"
    }
  }, "audiovido"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.2em"
    }
  }, "/"), /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "FAN CLUBS")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onSwitchClub,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--text-dim)",
      background: "rgba(255,255,255,0.04)",
      border: "1px solid var(--border-soft)",
      padding: "8px 14px",
      borderRadius: 999,
      cursor: "pointer",
      transition: "var(--t-hover)"
    }
  }, "\u21C4 Switch to ", otherClubLabel), /*#__PURE__*/React.createElement(IconButton, {
    label: "Notifications",
    variant: "ghost",
    badge: true
  }, "\uD83D\uDD14"), /*#__PURE__*/React.createElement(IconButton, {
    label: "Settings",
    variant: "ghost"
  }, "\u2699"))), /*#__PURE__*/React.createElement("main", {
    style: {
      position: "relative",
      zIndex: 2,
      display: "grid",
      gridTemplateColumns: "200px 1fr 280px",
      gap: 24,
      padding: "0 32px 120px",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "sticky",
      top: 20,
      padding: 16,
      background: "rgba(18, 18, 31, 0.45)",
      backdropFilter: "blur(14px)",
      border: "1px solid var(--border-faint)",
      borderRadius: 16
    }
  }, /*#__PURE__*/React.createElement(MemberStack, {
    members: club.members,
    limit: 9,
    heading: "On the floor"
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement(ClubStage, {
    clubName: club.name,
    kicker: club.kicker,
    mood: mood,
    memberCount: memberCount,
    live: true,
    caption: club.caption
  }, /*#__PURE__*/React.createElement(ScreenContent, {
    club: club
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 15,
      color: "var(--text-dim)",
      fontStyle: "italic",
      marginTop: -8,
      marginLeft: 4
    }
  }, "\u201C", club.tagline, "\u201D"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      padding: 22,
      background: "rgba(8, 8, 15, 0.6)",
      backdropFilter: "blur(14px)",
      border: "1px solid var(--border-faint)",
      borderRadius: 18,
      boxShadow: "var(--shadow-md)",
      minHeight: 360
    }
  }, messages.map(m => /*#__PURE__*/React.createElement(ChatMessage, {
    key: m.id,
    author: m.author,
    persona: m.persona,
    time: m.time,
    reactions: m.reactions
  }, m.text))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Input, {
    value: composer,
    onChange: setComposer,
    onSubmit: send,
    placeholder: "Say something to the room\u2026",
    icon: "\u270E",
    size: "lg"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: send,
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      fontWeight: 700,
      color: "var(--void-900)",
      background: "var(--accent)",
      border: "none",
      padding: "0 22px",
      height: 56,
      borderRadius: 999,
      cursor: "pointer",
      boxShadow: "var(--glow-md)",
      transition: "var(--t-hover)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.filter = "brightness(1.1)";
      e.currentTarget.style.transform = "translateY(-1px)";
    },
    onMouseLeave: e => {
      e.currentTarget.style.filter = "brightness(1)";
      e.currentTarget.style.transform = "translateY(0)";
    }
  }, "Send \u21B5"))), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "sticky",
      top: 20,
      display: "flex",
      flexDirection: "column",
      gap: 16
    }
  }, ClubStats && /*#__PURE__*/React.createElement(ClubStats, {
    memberCount: memberCount,
    moodLabel: moodLabelOf(mood),
    trendingTopic: club.trendingTopic,
    energyDelta: Math.round((mood - 0.5) * 40)
  }), /*#__PURE__*/React.createElement(ChallengeCard, {
    title: club.challenge.title,
    description: club.challenge.description,
    progress: club.challenge.progress,
    progressLabel: club.challenge.progressLabel,
    tag: club.challenge.tag,
    onJoin: () => {}
  }), /*#__PURE__*/React.createElement(NowPlaying, {
    track: club.nowPlaying.track,
    artist: club.nowPlaying.artist,
    progress: club.nowPlaying.progress,
    voted: voted,
    onVote: () => setVoted(v => !v)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      bottom: 24,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
      maxWidth: "calc(100% - 48px)"
    }
  }, FloorActions && /*#__PURE__*/React.createElement(FloorActions, {
    micOn: micOn,
    onMic: () => setMicOn(v => !v),
    onReact: react,
    onShare: () => {},
    onChallenge: () => {}
  })));
}
window.__FanClubPage = FanClubPage;
function ScreenContent({
  club
}) {
  // Decorative screen content — animated marquee text + small ticker.
  const isMusic = club.scope === "club-music";
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 14,
      padding: 32,
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.3em",
      color: "var(--accent)",
      textShadow: "0 0 10px var(--accent)",
      animation: "av-flicker 5s steps(1, end) infinite"
    }
  }, isMusic ? "▶ NOW PLAYING" : "▶ NOW SHOWING"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(28px, 4vw, 56px)",
      lineHeight: 1.0,
      letterSpacing: "0.02em",
      color: "var(--smoke-100)",
      textShadow: "0 0 16px color-mix(in oklab, var(--accent) 70%, transparent), 0 0 36px color-mix(in oklab, var(--accent) 40%, transparent)"
    }
  }, club.marqueeContent), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.2em",
      color: "var(--text-dim)",
      textTransform: "uppercase"
    }
  }, isMusic ? "Tape 1 · Side A · Track 04 of 09" : "Reel 3 · Scene 7 of 14"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-end",
      gap: 3,
      marginTop: 8,
      height: 24
    }
  }, Array.from({
    length: 24
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 3,
      height: `${30 + Math.abs(Math.sin(i * 0.7)) * 70}%`,
      background: "var(--accent)",
      boxShadow: "0 0 4px var(--accent)",
      animation: `av-equalize ${0.8 + i % 4 * 0.2}s var(--ease-in-out) ${i * 0.05}s infinite alternate`,
      transformOrigin: "bottom",
      opacity: 0.85,
      borderRadius: 1
    }
  }))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club/FanClubPage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club/FloorActions.jsx
try { (() => {
/**
 * FloorActions — bottom action bar. Voice, react, challenge, share, members.
 * Uses IconButton + Button from the design system.
 */
function FloorActions({
  onReact,
  onMic,
  onShare,
  onChallenge,
  micOn
}) {
  const {
    Button,
    IconButton,
    Badge
  } = window.AudiovidoFanClubDesignSystem_013bf7;
  const [reactOpen, setReactOpen] = React.useState(false);
  const emojis = ["🔥", "😍", "🤯", "💯", "🥲", "🎧", "👁", "✨"];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 18px",
      background: "rgba(8, 8, 15, 0.7)",
      backdropFilter: "blur(20px) saturate(180%)",
      WebkitBackdropFilter: "blur(20px) saturate(180%)",
      border: "1px solid var(--border-soft)",
      borderRadius: 999,
      boxShadow: "var(--shadow-lg), 0 0 32px color-mix(in oklab, var(--accent) 22%, transparent)"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "Voice",
    variant: micOn ? "primary" : "ghost",
    size: "lg",
    onClick: onMic
  }, "\uD83C\uDFA4"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    label: "React",
    variant: "glow",
    size: "lg",
    onClick: () => setReactOpen(v => !v)
  }, "\uD83D\uDE0D"), reactOpen && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 60,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: 4,
      padding: 8,
      background: "rgba(18, 18, 31, 0.85)",
      backdropFilter: "blur(16px)",
      border: "1px solid var(--border-soft)",
      borderRadius: 999,
      boxShadow: "var(--shadow-lg), 0 0 24px color-mix(in oklab, var(--accent) 40%, transparent)",
      animation: "av-fade-up var(--dur-base) var(--ease-spring)"
    }
  }, emojis.map(e => /*#__PURE__*/React.createElement("button", {
    key: e,
    onClick: () => {
      onReact?.(e);
      setReactOpen(false);
    },
    style: {
      width: 36,
      height: 36,
      borderRadius: 999,
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: 18,
      transition: "transform var(--dur-fast) var(--ease-spring), background var(--dur-fast)"
    },
    onMouseEnter: e2 => {
      e2.currentTarget.style.transform = "scale(1.3)";
      e2.currentTarget.style.background = "rgba(255,255,255,0.06)";
    },
    onMouseLeave: e2 => {
      e2.currentTarget.style.transform = "scale(1)";
      e2.currentTarget.style.background = "transparent";
    }
  }, e)))), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 1,
      height: 28,
      background: "var(--border-soft)"
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "glow",
    icon: "\u26A1",
    onClick: onChallenge
  }, "Start a challenge"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    icon: "\u2197",
    onClick: onShare
  }, "Share"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }), /*#__PURE__*/React.createElement(Badge, {
    variant: "live",
    pulse: true
  }, "OPEN MIC"));
}
window.__FloorActions = FloorActions;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club/FloorActions.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club/Particles.jsx
try { (() => {
/**
 * Particles — a slow ambient particle field driven by canvas.
 * Drift settings respond to `intensity` (0..1). Use higher values for
 * a "hype" room; lower for "chill".
 */
function Particles({
  intensity = 0.5,
  count = 36
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let rafId;
    let w = c.width = c.offsetWidth * devicePixelRatio;
    let h = c.height = c.offsetHeight * devicePixelRatio;
    const onResize = () => {
      w = c.width = c.offsetWidth * devicePixelRatio;
      h = c.height = c.offsetHeight * devicePixelRatio;
    };
    window.addEventListener("resize", onResize);

    // accent comes from CSS — read live so club scopes apply
    const accent = getComputedStyle(c).getPropertyValue("--accent").trim() || "#00f5d4";
    const ps = Array.from({
      length: count
    }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (Math.random() * 1.4 + 0.4) * devicePixelRatio,
      vx: (Math.random() - 0.5) * (0.15 + intensity * 0.4),
      vy: -(Math.random() * (0.3 + intensity * 0.5) + 0.1),
      a: Math.random() * 0.6 + 0.15,
      hue: Math.random()
    }));
    const step = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
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
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      opacity: 0.8,
      mixBlendMode: "screen"
    }
  });
}
window.__Particles = Particles;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club/Particles.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club/data.js
try { (() => {
// Sample club content. Two themes ship: Night Shift (music) and The Velvet Reel (cinema).

const NIGHT_SHIFT = {
  slug: "night-shift",
  scope: "club-music",
  name: "Night Shift",
  kicker: "Music Club · After Hours",
  tagline: "Where the late shift trades headphones.",
  marqueeContent: "♪ NIGHT SHIFT ♪",
  caption: "LIVE FROM A CROWDED BAR · 9:42 PM · TOKYO",
  nowPlaying: {
    track: "Nocturne 12 · Submerge Mix",
    artist: "Submerge",
    progress: 0.42
  },
  challenge: {
    title: "Drop a song for the rain",
    description: "Share one track that fits a gray afternoon. Voted winner plays Sunday.",
    progress: 0.34,
    progressLabel: "17 of 50 shared",
    tag: "Daily"
  },
  mood: 0.72,
  trendingTopic: "#NIGHTSHIFT",
  seedMessages: [{
    id: 1,
    author: "DJ Echo",
    persona: "dj",
    time: "now",
    text: "welcome back to the floor — fresh tape just dropped 🎧"
  }, {
    id: 2,
    author: "Reni Q",
    persona: "spotlight",
    time: "2m",
    text: "that drum break is unreal. who's the producer",
    reactions: [{
      emoji: "🔥",
      count: 7
    }, {
      emoji: "🤯",
      count: 3
    }]
  }, {
    id: 3,
    author: "Mara",
    persona: "member",
    time: "1m",
    text: "i could live in this song"
  }, {
    id: 4,
    author: "Iggy",
    persona: "member",
    time: "<1m",
    text: "okay this is the album of the year and we're 19 minutes in",
    reactions: [{
      emoji: "💯",
      count: 4
    }]
  }, {
    id: 5,
    author: "Submerge",
    persona: "member",
    time: "<1m",
    text: "ty mara — that means a lot. tape 2 incoming friday"
  }],
  members: [{
    name: "Reni Q",
    active: true,
    status: "live"
  }, {
    name: "Mara",
    status: "online"
  }, {
    name: "Iggy",
    status: "online"
  }, {
    name: "DJ Echo",
    active: true,
    status: "live"
  }, {
    name: "Submerge",
    status: "online"
  }, {
    name: "K Honey",
    status: "online"
  }, {
    name: "Vinyl Joon",
    status: "offline"
  }, {
    name: "Atlas",
    status: "online"
  }, {
    name: "Polestar",
    status: "online"
  }, {
    name: "Birdfoot",
    status: "online"
  }, {
    name: "Cassette",
    status: "offline"
  }]
};
const VELVET_REEL = {
  slug: "velvet-reel",
  scope: "club-cinema",
  name: "The Velvet Reel",
  kicker: "Cinema Club · Late Show",
  tagline: "Bring your favorite scene. Bring strong opinions.",
  marqueeContent: "▸ THE VELVET REEL ◂",
  caption: "REEL 3 / SCENE 7 · MULHOLLAND DR. · 1:48 AM",
  nowPlaying: {
    track: "Score · The Long Take",
    artist: "Ennio Marc.",
    progress: 0.65
  },
  challenge: {
    title: "Frame of the week",
    description: "Drop a single still that haunts you. Vote opens Sunday at midnight.",
    progress: 0.58,
    progressLabel: "29 of 50 shared",
    tag: "Weekly"
  },
  mood: 0.38,
  trendingTopic: "#LATESHOW",
  seedMessages: [{
    id: 1,
    author: "The Usher",
    persona: "dj",
    time: "now",
    text: "house lights down. tonight's reel: a slow build, no spoilers."
  }, {
    id: 2,
    author: "Cassette",
    persona: "spotlight",
    time: "3m",
    text: "the way the camera holds on her face for those extra two seconds. brutal.",
    reactions: [{
      emoji: "🎬",
      count: 9
    }, {
      emoji: "👁",
      count: 4
    }]
  }, {
    id: 3,
    author: "Lumen",
    persona: "member",
    time: "2m",
    text: "best long take of the decade and i won't be arguing"
  }, {
    id: 4,
    author: "Bea",
    persona: "member",
    time: "1m",
    text: "okay but the score doing 80% of the work here",
    reactions: [{
      emoji: "💯",
      count: 6
    }]
  }, {
    id: 5,
    author: "Reel",
    persona: "member",
    time: "<1m",
    text: "this scene is why i fell in love with movies as a kid"
  }],
  members: [{
    name: "Cassette",
    active: true,
    status: "live"
  }, {
    name: "Lumen",
    status: "online"
  }, {
    name: "Bea",
    status: "online"
  }, {
    name: "The Usher",
    active: true,
    status: "live"
  }, {
    name: "Reel",
    status: "online"
  }, {
    name: "Mara",
    status: "online"
  }, {
    name: "Frame",
    status: "offline"
  }, {
    name: "Cinemax",
    status: "online"
  }, {
    name: "Atlas",
    status: "online"
  }, {
    name: "Klieg",
    status: "offline"
  }]
};
const CLUBS = {
  "night-shift": NIGHT_SHIFT,
  "velvet-reel": VELVET_REEL
};
window.__CLUBS = CLUBS;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club/data.js", error: String((e && e.message) || e) }); }

// ui_kits/fan_club_v2/DrinkMenu.jsx
try { (() => {
// DrinkMenu — modal that opens when the user clicks the Order glass.
// Listing styled like a chalkboard menu pinned over the bar.

function DrinkMenu({
  open,
  drinks,
  onClose,
  onOrder
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 60,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(8, 8, 15, 0.55)",
      backdropFilter: "blur(8px)",
      animation: "av-fade-up 240ms var(--ease-out)"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: 420,
      maxWidth: "90vw",
      padding: 28,
      background: "linear-gradient(180deg, #1a1410 0%, #0c0a08 100%)",
      border: "2px solid #3a2a18",
      borderRadius: 12,
      boxShadow: "0 40px 100px rgba(0,0,0,0.7), inset 0 0 0 8px #221813, inset 0 0 40px rgba(0,0,0,0.6)",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      fontWeight: 800,
      color: "#f5e6c0",
      textAlign: "center",
      letterSpacing: "0.04em",
      textShadow: "0 0 12px rgba(245,230,192,0.4)",
      marginBottom: 6
    }
  }, "The Menu"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "var(--accent)",
      textAlign: "center",
      marginBottom: 22,
      textShadow: "0 0 6px var(--accent)"
    }
  }, "\u25B8 pick your poison \u25C2"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, drinks.map(d => /*#__PURE__*/React.createElement("button", {
    key: d.id,
    onClick: () => onOrder(d),
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      padding: "12px 14px",
      background: "transparent",
      border: "none",
      borderBottom: "1px dashed rgba(245, 230, 192, 0.18)",
      color: "#f5e6c0",
      fontFamily: "var(--font-body)",
      fontSize: 17,
      cursor: "pointer",
      textAlign: "left",
      transition: "var(--t-hover)"
    },
    onMouseEnter: e => {
      e.currentTarget.style.background = "rgba(245,230,192,0.06)";
      e.currentTarget.style.paddingLeft = "20px";
    },
    onMouseLeave: e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.paddingLeft = "14px";
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 22
    }
  }, d.emoji), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1
    }
  }, d.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: "var(--accent)"
    }
  }, "order \u2192")))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: "absolute",
      top: 12,
      right: 12,
      width: 28,
      height: 28,
      borderRadius: "50%",
      border: "1px solid rgba(245,230,192,0.3)",
      background: "transparent",
      color: "#f5e6c0",
      cursor: "pointer",
      fontFamily: "var(--font-mono)",
      fontSize: 14
    }
  }, "\u2715")));
}
window.__DrinkMenu = DrinkMenu;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club_v2/DrinkMenu.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club_v2/EmojiBurst.jsx
try { (() => {
// EmojiBurst — particle burst when a reaction lands. Renders absolute, fixed by parent.
// Pass an array of {emoji, x, y} bursts; each lives ~1.4s then fades.

function EmojiBurst({
  bursts
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      pointerEvents: "none",
      zIndex: 50
    }
  }, bursts.map(b => /*#__PURE__*/React.createElement(Burst, {
    key: b.id,
    burst: b
  })));
}
function Burst({
  burst
}) {
  const particles = React.useMemo(() => {
    return Array.from({
      length: 14
    }, (_, i) => ({
      i,
      dx: (Math.random() - 0.5) * 220,
      dy: -120 - Math.random() * 180,
      rot: (Math.random() - 0.5) * 720,
      delay: Math.random() * 80
    }));
  }, [burst.id]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: burst.x,
      top: burst.y,
      transform: "translate(-50%, -50%)"
    }
  }, particles.map(p => /*#__PURE__*/React.createElement("span", {
    key: p.i,
    style: {
      position: "absolute",
      left: 0,
      top: 0,
      fontSize: 22,
      opacity: 0,
      transform: `translate(0, 0) rotate(0deg)`,
      animation: `burst-${burst.id} 1400ms ${p.delay}ms var(--ease-out) forwards`,
      filter: "drop-shadow(0 0 6px var(--accent))"
    }
  }, burst.emoji, /*#__PURE__*/React.createElement("style", null, `
            @keyframes burst-${burst.id} {
              0%   { opacity: 0; transform: translate(0,0) rotate(0); }
              15%  { opacity: 1; }
              100% { opacity: 0; transform: translate(${p.dx}px, ${p.dy}px) rotate(${p.rot}deg); }
            }
          `))));
}
window.__EmojiBurst = EmojiBurst;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club_v2/EmojiBurst.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club_v2/FanClubRoom.jsx
try { (() => {
// FanClubRoom — the v2 composition. Two rooms (rock, cinema) share this
// component; club data drives the bartender, members, neon signs, drinks.

const moodLabel = v => v < 0.25 ? "Mellow" : v < 0.5 ? "Warming" : v < 0.75 ? "Engaged" : v < 0.9 ? "Hype" : "Euphoric";
function FanClubRoom({
  club,
  onSwitchRoom,
  otherRoomName
}) {
  const NS = window.AudiovidoFanClubDesignSystem_013bf7;
  const {
    PhotoBackdrop,
    LightingFx,
    NeonSign,
    SpatialAvatar,
    FloatingMessage,
    Bartender,
    PhysicalButton,
    MoodMeter,
    TVScreen,
    Badge
  } = NS;
  const SmokeField = window.__SmokeField;
  const EmojiBurst = window.__EmojiBurst;
  const DrinkMenu = window.__DrinkMenu;
  const Props = window.__RoomProps || {};
  const [messages, setMessages] = React.useState(club.initialChat);
  const [composer, setComposer] = React.useState("");
  const [mood, setMood] = React.useState(0.55);
  const [showMenu, setShowMenu] = React.useState(false);
  const [bursts, setBursts] = React.useState([]);
  const [bartenderSpeak, setBartenderSpeak] = React.useState("welcome in. take a seat.");
  const [activeMember, setActiveMember] = React.useState(null);

  // Reset on club switch
  React.useEffect(() => {
    setMessages(club.initialChat);
    setMood(0.55);
    setBartenderSpeak(`welcome to ${club.name.toLowerCase()}. take a seat.`);
    const t = setTimeout(() => setBartenderSpeak(null), 4500);
    return () => clearTimeout(t);
  }, [club.slug]);

  // Auto-fade limited recent messages — only keep last 4
  const visibleMessages = messages.slice(-4);
  const send = () => {
    const t = composer.trim();
    if (!t) return;
    setMessages(m => [...m, {
      id: Date.now(),
      author: "you",
      persona: "member",
      text: t,
      intensity: 0.7
    }]);
    setComposer("");
    const hot = /[!?]|🔥|💯|love|wow|amazing|insane/i.test(t);
    if (hot) setMood(v => Math.min(1, v + 0.06));
  };
  const reactAt = (emoji, x, y) => {
    const id = Date.now() + Math.random();
    setBursts(b => [...b, {
      id,
      emoji,
      x,
      y
    }]);
    setTimeout(() => setBursts(b => b.filter(p => p.id !== id)), 1400);
    setMood(v => Math.min(1, v + 0.025));
  };
  const orderDrink = d => {
    setShowMenu(false);
    setBartenderSpeak(`one ${d.name.toLowerCase()} coming up.`);
    setTimeout(() => setBartenderSpeak(`you just ordered a ${d.name.toLowerCase()} ${d.emoji}`), 1800);
    setTimeout(() => setBartenderSpeak(null), 5500);
    // Round-of-applause emoji burst
    reactAt(d.emoji, window.innerWidth / 2, window.innerHeight - 180);
  };
  const tint = `radial-gradient(70% 60% at 50% 100%, color-mix(in oklab, var(--accent) ${30 + mood * 40}%, transparent), transparent 70%)`;
  return /*#__PURE__*/React.createElement("div", {
    className: club.scope,
    style: {
      position: "relative",
      minHeight: "100vh",
      color: "var(--text-body)",
      overflow: "hidden"
    }
  }, PhotoBackdrop && /*#__PURE__*/React.createElement(PhotoBackdrop, {
    slotId: club.bg.slotId,
    placeholder: club.bg.placeholder,
    tint: tint,
    parallax: 0.12,
    grain: 0.24,
    vignette: 0.78
  }), LightingFx && /*#__PURE__*/React.createElement(LightingFx, {
    mood: mood,
    spotlights: 2,
    godRays: true
  }), SmokeField && /*#__PURE__*/React.createElement(SmokeField, {
    intensity: mood,
    count: 20
  }), club.slug === "rock" && /*#__PURE__*/React.createElement(React.Fragment, null, Props.VinylShelf && /*#__PURE__*/React.createElement(Props.VinylShelf, {
    top: "42%",
    left: "86%",
    rotate: -2
  }), Props.SpeakerStack && /*#__PURE__*/React.createElement(Props.SpeakerStack, {
    side: "left",
    bottom: "14%"
  }), Props.SpeakerStack && /*#__PURE__*/React.createElement(Props.SpeakerStack, {
    side: "right",
    bottom: "14%"
  }), Props.BarCounter && /*#__PURE__*/React.createElement(Props.BarCounter, null)), club.slug === "cinema" && /*#__PURE__*/React.createElement(React.Fragment, null, Props.Curtain && /*#__PURE__*/React.createElement(Props.Curtain, {
    side: "left"
  }), Props.Curtain && /*#__PURE__*/React.createElement(Props.Curtain, {
    side: "right"
  }), Props.Projector && /*#__PURE__*/React.createElement(Props.Projector, {
    side: "left",
    top: "30%"
  }), Props.FilmReelDecor && /*#__PURE__*/React.createElement(Props.FilmReelDecor, {
    top: "42%",
    left: "88%",
    size: 140
  }), Props.PopcornMachine && /*#__PURE__*/React.createElement(Props.PopcornMachine, null)), NeonSign && club.neonSigns.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      position: "fixed",
      top: s.top,
      left: s.left,
      right: s.right,
      zIndex: 4,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement(NeonSign, {
    color: s.color,
    flicker: s.flicker,
    rotate: s.rotate,
    size: 36
  }, s.text))), /*#__PURE__*/React.createElement("header", {
    style: {
      position: "relative",
      zIndex: 5,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "18px 28px",
      gap: 18
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 18,
      fontWeight: 800,
      color: "var(--text-hi)",
      letterSpacing: "-0.01em"
    }
  }, "audiovido"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--text-muted)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.2em"
    }
  }, "/"), Badge && /*#__PURE__*/React.createElement(Badge, {
    variant: "outline"
  }, "FAN CLUBS"), Badge && /*#__PURE__*/React.createElement(Badge, {
    variant: "live",
    pulse: true
  }, "LIVE")), /*#__PURE__*/React.createElement("button", {
    onClick: onSwitchRoom,
    style: {
      padding: "10px 16px",
      background: "rgba(8,8,15,0.55)",
      backdropFilter: "blur(10px)",
      border: "1px solid var(--border-soft)",
      borderRadius: 999,
      color: "var(--text-hi)",
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      cursor: "pointer",
      boxShadow: "0 0 18px color-mix(in oklab, var(--accent) 30%, transparent)"
    }
  }, "\u21C4 ", otherRoomName)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 5,
      display: "grid",
      gridTemplateColumns: "1fr 320px",
      gap: 32,
      padding: "8px 56px 0",
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: "var(--accent)",
      textShadow: "0 0 8px var(--accent)"
    }
  }, club.kicker), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: "clamp(48px, 6vw, 88px)",
      lineHeight: 0.95,
      letterSpacing: "-0.02em",
      fontStyle: "italic",
      color: "var(--text-hi)",
      textShadow: "0 0 24px color-mix(in oklab, var(--accent) 50%, transparent), 0 0 56px color-mix(in oklab, var(--accent) 30%, transparent), 4px 4px 0 rgba(0,0,0,0.6)"
    }
  }, club.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-body)",
      fontSize: 16,
      fontStyle: "italic",
      color: "var(--text-dim)",
      maxWidth: 520
    }
  }, "\"", club.tagline, "\""), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      maxWidth: 620
    }
  }, TVScreen && /*#__PURE__*/React.createElement(TVScreen, {
    caption: club.caption
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.3em",
      color: "var(--accent)",
      textShadow: "0 0 6px var(--accent)",
      marginBottom: 12,
      animation: "av-flicker 5s steps(1, end) infinite"
    }
  }, club.slug === "rock" ? "▶ NOW PLAYING" : "▶ NOW SHOWING"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 800,
      fontSize: 40,
      lineHeight: 1,
      color: "var(--smoke-100)",
      textShadow: "0 0 18px var(--accent), 0 0 36px color-mix(in oklab, var(--accent) 50%, transparent)",
      letterSpacing: "0.04em"
    }
  }, club.marquee), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-end",
      gap: 3,
      marginTop: 14,
      height: 24
    }
  }, Array.from({
    length: 22
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      width: 3,
      height: `${30 + Math.abs(Math.sin(i * 0.6)) * 70}%`,
      background: "var(--accent)",
      boxShadow: "0 0 4px var(--accent)",
      animation: `av-equalize ${0.8 + i % 4 * 0.2}s var(--ease-in-out) ${i * 0.05}s infinite alternate`,
      transformOrigin: "bottom",
      opacity: 0.85,
      borderRadius: 1
    }
  }))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      alignItems: "stretch"
    }
  }, MoodMeter && /*#__PURE__*/React.createElement(MoodMeter, {
    value: mood,
    sampleCount: 47
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 16,
      background: "rgba(8,8,15,0.55)",
      backdropFilter: "blur(14px)",
      border: "1px solid var(--border-soft)",
      borderRadius: 14,
      display: "flex",
      flexDirection: "column",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 9,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: "var(--text-muted)"
    }
  }, "In the room"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontSize: 28,
      fontWeight: 700,
      color: "var(--text-hi)",
      textShadow: "0 0 12px color-mix(in oklab, var(--accent) 50%, transparent)"
    }
  }, club.members.length + 41, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--text-muted)",
      fontFamily: "var(--font-mono)",
      letterSpacing: "0.1em",
      textTransform: "uppercase"
    }
  }, "vibing")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 11,
      letterSpacing: "0.16em",
      color: "var(--accent)",
      textTransform: "uppercase"
    }
  }, "Mood \xB7 ", moodLabel(mood))))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 5,
      margin: "32px auto 0",
      padding: "0 64px",
      maxWidth: 980,
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, visibleMessages.map(m => FloatingMessage ? /*#__PURE__*/React.createElement(FloatingMessage, {
    key: m.id,
    author: m.author,
    persona: m.persona,
    intensity: m.intensity
  }, m.text) : null)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 4,
      pointerEvents: "none"
    }
  }, SpatialAvatar && club.members.map((m, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      pointerEvents: "auto"
    }
  }, /*#__PURE__*/React.createElement(SpatialAvatar, {
    name: m.name,
    top: m.top,
    left: m.left,
    size: 44,
    activity: m.activity,
    speech: activeMember === m.name ? m.msg || "…" : undefined,
    onClick: () => {
      setActiveMember(cur => cur === m.name ? null : m.name);
      if (m.msg) {
        setTimeout(() => setActiveMember(null), 3000);
      }
    }
  })))), Bartender && /*#__PURE__*/React.createElement(Bartender, {
    name: club.bartender.name,
    slotId: club.bartender.slotId,
    placeholder: club.bartender.placeholder,
    lines: club.bartender.lines,
    speak: bartenderSpeak,
    side: "right",
    size: 110
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      left: "50%",
      bottom: 24,
      transform: "translateX(-50%)",
      zIndex: 9,
      display: "flex",
      alignItems: "flex-end",
      gap: 24,
      padding: "18px 28px",
      background: "rgba(8, 8, 15, 0.72)",
      backdropFilter: "blur(24px) saturate(180%)",
      border: "1px solid var(--border-soft)",
      borderRadius: 26,
      boxShadow: "var(--shadow-xl), 0 0 36px color-mix(in oklab, var(--accent) 30%, transparent)"
    }
  }, PhysicalButton && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PhysicalButton, {
    variant: "drink",
    label: "Order",
    onClick: () => setShowMenu(true)
  }), /*#__PURE__*/React.createElement(PhysicalButton, {
    variant: "neon",
    label: "React",
    icon: "\uD83D\uDE0D",
    onClick: () => reactAt("🔥", window.innerWidth / 2, window.innerHeight - 160)
  }), /*#__PURE__*/React.createElement(PhysicalButton, {
    variant: "arcade",
    label: "Challenge",
    icon: "\u26A1",
    onClick: () => setBartenderSpeak("nice — challenge dropped on the wall.")
  }), /*#__PURE__*/React.createElement(PhysicalButton, {
    variant: "jukebox",
    label: "Vote",
    icon: "VOTE",
    onClick: () => setBartenderSpeak("vote logged. next track in a sec.")
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginLeft: 6,
      height: 96,
      alignSelf: "center"
    }
  }, /*#__PURE__*/React.createElement("input", {
    value: composer,
    onChange: e => setComposer(e.target.value),
    onKeyDown: e => {
      if (e.key === "Enter") send();
    },
    placeholder: "say something to the room\u2026",
    style: {
      width: 260,
      height: 44,
      padding: "0 16px",
      background: "rgba(255,255,255,0.05)",
      border: "1px solid var(--border-soft)",
      borderRadius: 999,
      color: "var(--text-hi)",
      fontFamily: "var(--font-body)",
      fontSize: 15,
      outline: "none"
    }
  }), /*#__PURE__*/React.createElement("button", {
    onClick: send,
    style: {
      height: 44,
      padding: "0 18px",
      background: "var(--accent)",
      color: "var(--void-900)",
      border: "none",
      borderRadius: 999,
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      cursor: "pointer",
      boxShadow: "0 0 24px var(--accent)"
    }
  }, "Send \u21B5"))), DrinkMenu && /*#__PURE__*/React.createElement(DrinkMenu, {
    open: showMenu,
    drinks: club.drinks,
    onClose: () => setShowMenu(false),
    onOrder: orderDrink
  }), EmojiBurst && /*#__PURE__*/React.createElement(EmojiBurst, {
    bursts: bursts
  }));
}
window.__FanClubRoom = FanClubRoom;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club_v2/FanClubRoom.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club_v2/RoomProps.jsx
try { (() => {
// RoomProps — kit-local stylized venue objects (CSS/SVG, no images).
// Rock: vinyl shelf, speaker stack, bar counter, guitar case
// Cinema: film reel, projector, popcorn machine, red curtains

function VinylShelf({
  top = "55%",
  left = "82%",
  rotate = 0
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top,
      left,
      transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
      zIndex: 3,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 240,
      height: 10,
      background: "linear-gradient(180deg, #5a3520 0%, #2a1810 100%)",
      boxShadow: "0 6px 14px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.12)",
      borderRadius: 2
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 10,
      left: 18,
      display: "flex",
      gap: 6
    }
  }, [0, 1, 2, 3].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 50,
      height: 50,
      borderRadius: "50%",
      background: "repeating-radial-gradient(circle, #0a0a0a 0 2px, #1a1a1a 2px 4px)",
      border: "1.5px solid #000",
      boxShadow: "0 4px 8px rgba(0,0,0,0.5)",
      position: "relative",
      animation: `spin-vinyl ${8 + i * 2}s linear infinite`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "38%",
      borderRadius: "50%",
      background: i % 2 === 0 ? "var(--accent)" : "#fff",
      boxShadow: "0 0 8px var(--accent)"
    }
  })))), /*#__PURE__*/React.createElement("style", null, `@keyframes spin-vinyl { to { transform: rotate(360deg); } }`));
}
function SpeakerStack({
  side = "left",
  bottom = "8%"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      [side]: "2%",
      bottom,
      zIndex: 3,
      pointerEvents: "none"
    }
  }, [0, 1].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 70,
      height: 90,
      marginBottom: i === 0 ? 2 : 0,
      background: "linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)",
      border: "1px solid #2a2a2a",
      borderRadius: 6,
      boxShadow: "0 8px 24px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
      position: "relative",
      padding: 8,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-around"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      borderRadius: "50%",
      background: "radial-gradient(circle, #2a2a2a 30%, #000 80%)",
      border: "2px solid #1a1a1a",
      boxShadow: "inset 0 0 8px #000, 0 0 16px color-mix(in oklab, var(--accent) 40%, transparent)",
      animation: "av-breathe 1.6s var(--ease-velvet) infinite"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 28,
      height: 18,
      background: "#0a0a0a",
      borderRadius: 2,
      border: "1px solid #1a1a1a"
    }
  }))));
}
function BarCounter() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: "12%",
      zIndex: 3,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "70%",
      background: "linear-gradient(180deg, #3a2515 0%, #1a0f08 100%)",
      boxShadow: "inset 0 2px 0 rgba(255,255,255,0.1), 0 -8px 24px rgba(0,0,0,0.5)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "30%",
      bottom: "30%",
      display: "flex",
      gap: 8,
      alignItems: "flex-end"
    }
  }, ["#5a3520", "#2a4530", "#3a2545", "#5a4520"].map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 12,
      height: 36 + i % 2 * 6,
      background: `linear-gradient(180deg, ${c}, #0a0a0a)`,
      borderRadius: "2px 2px 1px 1px",
      position: "relative",
      boxShadow: "0 0 8px rgba(0,0,0,0.6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -4,
      left: 3,
      width: 6,
      height: 6,
      background: "#1a1a1a",
      borderRadius: 1
    }
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "20%",
      bottom: "30%",
      display: "flex",
      gap: 6
    }
  }, [0, 1, 2].map(i => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      width: 14,
      height: 18,
      background: "linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.05))",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: "1px 1px 4px 4px",
      boxShadow: "0 0 6px color-mix(in oklab, var(--accent) 50%, transparent)"
    }
  }))));
}
function FilmReelDecor({
  top = "55%",
  left = "85%",
  size = 160
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top,
      left,
      transform: "translate(-50%, -50%)",
      zIndex: 3,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    viewBox: "0 0 200 200",
    style: {
      animation: "spin-vinyl 14s linear infinite",
      filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.7))"
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "96",
    fill: "#0c0a08",
    stroke: "var(--accent)",
    strokeWidth: "2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "78",
    fill: "none",
    stroke: "rgba(255,255,255,0.15)",
    strokeWidth: "1"
  }), [0, 60, 120, 180, 240, 300].map(d => {
    const r = d * Math.PI / 180;
    const x = 100 + 60 * Math.cos(r);
    const y = 100 + 60 * Math.sin(r);
    return /*#__PURE__*/React.createElement("circle", {
      key: d,
      cx: x,
      cy: y,
      r: "18",
      fill: "var(--void-900)",
      stroke: "var(--accent)",
      strokeWidth: "2"
    });
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "100",
    r: "8",
    fill: "var(--accent)"
  })));
}
function Projector({
  side = "left",
  top = "30%"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top,
      [side]: "4%",
      zIndex: 3,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 140,
      height: 90,
      background: "linear-gradient(180deg, #2a1f18 0%, #110a06 100%)",
      borderRadius: 8,
      border: "1px solid #3a2a18",
      boxShadow: "0 14px 32px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -28,
      left: 14,
      width: 50,
      height: 50,
      borderRadius: "50%",
      background: "repeating-radial-gradient(circle, #1a0f08 0 2px, #2a1810 2px 4px)",
      border: "1.5px solid #0a0a0a",
      animation: "spin-vinyl 6s linear infinite"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: -28,
      right: 14,
      width: 50,
      height: 50,
      borderRadius: "50%",
      background: "repeating-radial-gradient(circle, #1a0f08 0 2px, #2a1810 2px 4px)",
      border: "1.5px solid #0a0a0a",
      animation: "spin-vinyl 6s linear infinite reverse"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      [side === "left" ? "right" : "left"]: -16,
      top: "50%",
      transform: "translateY(-50%)",
      width: 28,
      height: 36,
      borderRadius: 4,
      background: "radial-gradient(circle, color-mix(in oklab, var(--accent) 60%, white) 30%, #1a0a0a 80%)",
      boxShadow: `0 0 28px var(--accent), 0 0 80px color-mix(in oklab, var(--accent) 50%, transparent)`,
      animation: "av-flicker 7s steps(1, end) infinite"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      [side === "left" ? "left" : "right"]: side === "left" ? 152 : "auto",
      [side === "left" ? "right" : "left"]: side === "left" ? "auto" : 152,
      top: "50%",
      transform: "translateY(-50%)",
      width: "60vw",
      height: 240,
      background: `linear-gradient(${side === "left" ? "to right" : "to left"}, color-mix(in oklab, var(--accent) 30%, transparent), transparent 80%)`,
      clipPath: side === "left" ? "polygon(0 30%, 0 70%, 100% 100%, 100% 0)" : "polygon(100% 30%, 100% 70%, 0 100%, 0 0)",
      opacity: 0.35,
      filter: "blur(8px)",
      mixBlendMode: "screen",
      pointerEvents: "none"
    }
  }));
}
function Curtain({
  side = "left"
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
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
      boxShadow: side === "left" ? "inset -20px 0 40px rgba(0,0,0,0.7), 20px 0 40px rgba(0,0,0,0.6)" : "inset 20px 0 40px rgba(0,0,0,0.7), -20px 0 40px rgba(0,0,0,0.6)",
      animation: "curtain-sway 8s var(--ease-velvet) infinite alternate",
      transformOrigin: side === "left" ? "left top" : "right top"
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes curtain-sway {
        0%   { transform: scaleX(1) skewX(0deg); }
        100% { transform: scaleX(1.02) skewX(0.4deg); }
      }`));
}
function PopcornMachine() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "5%",
      bottom: "8%",
      zIndex: 3,
      pointerEvents: "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: 110,
      height: 140,
      background: "linear-gradient(180deg, #5a1a1a 0%, #2a0808 100%)",
      border: "2px solid #3a0a0a",
      borderRadius: "8px 8px 4px 4px",
      boxShadow: "0 18px 36px rgba(0,0,0,0.7), inset 0 2px 0 rgba(255,255,255,0.1)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: "12px 8px 40px 8px",
      background: "linear-gradient(180deg, rgba(255,200,80,0.35), rgba(255,160,40,0.15))",
      borderRadius: 4,
      border: "1px solid rgba(255,200,80,0.4)",
      boxShadow: "inset 0 0 12px rgba(255,200,80,0.4), 0 0 24px rgba(255,200,80,0.6)",
      overflow: "hidden"
    }
  }, Array.from({
    length: 14
  }).map((_, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      position: "absolute",
      left: `${(i * 13 + 7) % 90}%`,
      top: `${(i * 23 + 15) % 70 + 10}%`,
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "#fffde0",
      boxShadow: "0 0 6px rgba(255,220,100,0.7)",
      animation: `pop-${i} 4s ${i * 0.2}s var(--ease-velvet) infinite`
    }
  }, /*#__PURE__*/React.createElement("style", null, `@keyframes pop-${i} { 0%,90%,100% { transform: translateY(0); } 50% { transform: translateY(-${4 + i % 3 * 2}px); } }`)))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 32,
      background: "linear-gradient(180deg, #3a0a0a, #1a0404)",
      borderRadius: "0 0 4px 4px"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: -30,
      right: -30,
      bottom: -10,
      height: 30,
      borderRadius: "50%",
      background: "radial-gradient(closest-side, rgba(255,180,80,0.5), transparent 70%)",
      filter: "blur(8px)"
    }
  }));
}
window.__RoomProps = {
  VinylShelf,
  SpeakerStack,
  BarCounter,
  FilmReelDecor,
  Projector,
  Curtain,
  PopcornMachine
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club_v2/RoomProps.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club_v2/SmokeField.jsx
try { (() => {
// SmokeField — canvas-based smoke / haze particles that drift upward
// with a perlin-ish wind sway. Reads --accent live so club scopes apply.

function SmokeField({
  intensity = 0.5,
  count = 28
}) {
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
    const ps = Array.from({
      length: count
    }, (_, i) => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: (40 + Math.random() * 80) * dpr,
      vy: -(0.15 + Math.random() * 0.4) * dpr * (0.6 + intensity * 0.8),
      phase: Math.random() * Math.PI * 2,
      sway: 0.3 + Math.random() * 0.5,
      a: 0.04 + Math.random() * 0.1
    }));
    let t = 0;
    const step = () => {
      t += 0.01;
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = "screen";
      for (const p of ps) {
        p.y += p.vy;
        p.x += Math.sin(t + p.phase) * p.sway;
        if (p.y < -p.r) {
          p.y = h + p.r;
          p.x = Math.random() * w;
        }
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
  return /*#__PURE__*/React.createElement("canvas", {
    ref: ref,
    style: {
      position: "fixed",
      inset: 0,
      width: "100%",
      height: "100%",
      pointerEvents: "none",
      zIndex: 2,
      opacity: 0.7
    }
  });
}
window.__SmokeField = SmokeField;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club_v2/SmokeField.jsx", error: String((e && e.message) || e) }); }

// ui_kits/fan_club_v2/data.js
try { (() => {
// Kit v2 — Hyper-immersive Fan Club rooms.
// Bartender lines + members positioned spatially (top/left coords of the venue).

const ROCK_CLUB = {
  slug: "rock",
  scope: "club-rock",
  name: "The Loud Room",
  kicker: "Rock · Late shift",
  tagline: "Bass in your chest. Strangers shouting along.",
  bg: {
    slotId: "bg-rock",
    placeholder: "Drop a photo of a rock club"
  },
  bartender: {
    name: "Doc",
    slotId: "char-rock-bartender",
    placeholder: "Drop the bartender (rock)",
    lines: ["what'll it be, friend?", "47 in tonight. packed house.", "the new pressing's already half gone.", "tape just dropped. side A's a riot.", "drinks are colder than the sound mix."]
  },
  marquee: "TAPE ONE · SIDE A",
  caption: "LIVE FROM A CROWDED BAR · 9:42 PM",
  drinks: [{
    id: "whiskey",
    name: "Whiskey, neat",
    emoji: "🥃"
  }, {
    id: "beer",
    name: "Cold beer",
    emoji: "🍺"
  }, {
    id: "shot",
    name: "Tequila shot",
    emoji: "🍷"
  }, {
    id: "water",
    name: "Water (taking it easy)",
    emoji: "💧"
  }],
  neonSigns: [{
    text: "LIVE MUSIC",
    top: "10%",
    left: "8%",
    rotate: -6,
    color: "#ff6a3d",
    flicker: true
  }, {
    text: "OPEN MIC",
    top: "15%",
    right: "10%",
    rotate: 4,
    color: "#ff00ff",
    flicker: false
  }],
  members: [
  // Each member sits "at" a coordinate of the venue
  {
    name: "Reni Q",
    top: "78%",
    left: "12%",
    activity: 0.85,
    msg: "that drum break is unreal"
  }, {
    name: "Mara",
    top: "82%",
    left: "26%",
    activity: 0.3
  }, {
    name: "Iggy",
    top: "76%",
    left: "40%",
    activity: 0.5,
    msg: "okay tape 1 side a IS the year"
  }, {
    name: "K Honey",
    top: "84%",
    left: "55%",
    activity: 0.2
  }, {
    name: "Vinyl Joon",
    top: "78%",
    left: "68%",
    activity: 0.4
  }, {
    name: "Atlas",
    top: "82%",
    left: "82%",
    activity: 0.55,
    msg: "submerge you legend"
  }, {
    name: "Polestar",
    top: "70%",
    left: "92%",
    activity: 0.2
  }],
  initialChat: [{
    id: 1,
    author: "DJ Echo",
    persona: "dj",
    text: "welcome back to the floor — fresh tape just dropped 🎧"
  }, {
    id: 2,
    author: "Reni Q",
    persona: "spotlight",
    text: "that drum break is unreal. who's the producer",
    intensity: 0.9
  }, {
    id: 3,
    author: "Iggy",
    persona: "member",
    text: "okay tape 1 side a IS the year",
    intensity: 0.6
  }]
};
const CINEMA_CLUB = {
  slug: "cinema",
  scope: "club-cinema",
  name: "The Velvet Reel",
  kicker: "Cinema · Late show",
  tagline: "Bring your favorite scene. Bring strong opinions.",
  bg: {
    slotId: "bg-cinema",
    placeholder: "Drop a photo of a cinema interior"
  },
  bartender: {
    name: "Mona",
    slotId: "char-cinema-bartender",
    placeholder: "Drop the cinema attendant",
    lines: ["house lights are coming down.", "fresh popcorn — three minutes.", "no spoilers. tonight's a slow build.", "balcony's still got two seats.", "the projector hates the cold."]
  },
  marquee: "REEL 3 · SCENE 7",
  caption: "MULHOLLAND DR. · 1:48 AM",
  drinks: [{
    id: "wine",
    name: "Red wine",
    emoji: "🍷"
  }, {
    id: "espresso",
    name: "Double espresso",
    emoji: "☕"
  }, {
    id: "popcorn",
    name: "Buttered popcorn",
    emoji: "🍿"
  }, {
    id: "soda",
    name: "Cherry soda",
    emoji: "🥤"
  }],
  neonSigns: [{
    text: "NOW SHOWING",
    top: "12%",
    left: "10%",
    rotate: -4,
    color: "#f72585",
    flicker: true
  }, {
    text: "BALCONY",
    top: "18%",
    right: "8%",
    rotate: 5,
    color: "#00f5d4",
    flicker: false
  }],
  members: [{
    name: "Cassette",
    top: "76%",
    left: "16%",
    activity: 0.9,
    msg: "that long take. brutal."
  }, {
    name: "Lumen",
    top: "78%",
    left: "30%",
    activity: 0.3
  }, {
    name: "Bea",
    top: "82%",
    left: "44%",
    activity: 0.5,
    msg: "the score is doing 80% of the work"
  }, {
    name: "Reel",
    top: "76%",
    left: "58%",
    activity: 0.25
  }, {
    name: "Mara",
    top: "80%",
    left: "72%",
    activity: 0.35,
    msg: "why i fell in love with movies"
  }, {
    name: "Cinemax",
    top: "74%",
    left: "85%",
    activity: 0.2
  }],
  initialChat: [{
    id: 1,
    author: "The Usher",
    persona: "dj",
    text: "house lights down. tonight's reel: a slow build, no spoilers."
  }, {
    id: 2,
    author: "Cassette",
    persona: "spotlight",
    text: "the way the camera holds on her face for those extra two seconds. brutal.",
    intensity: 0.85
  }, {
    id: 3,
    author: "Bea",
    persona: "member",
    text: "the score is doing 80% of the work here",
    intensity: 0.5
  }]
};
window.__CLUBS_V2 = {
  rock: ROCK_CLUB,
  cinema: CINEMA_CLUB
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/fan_club_v2/data.js", error: String((e && e.message) || e) }); }

__ds_ns.Bartender = __ds_scope.Bartender;

__ds_ns.ChallengeCard = __ds_scope.ChallengeCard;

__ds_ns.ChatMessage = __ds_scope.ChatMessage;

__ds_ns.ClubStage = __ds_scope.ClubStage;

__ds_ns.FloatingMessage = __ds_scope.FloatingMessage;

__ds_ns.LightingFx = __ds_scope.LightingFx;

__ds_ns.MemberStack = __ds_scope.MemberStack;

__ds_ns.MoodMeter = __ds_scope.MoodMeter;

__ds_ns.NeonSign = __ds_scope.NeonSign;

__ds_ns.NowPlaying = __ds_scope.NowPlaying;

__ds_ns.PhotoBackdrop = __ds_scope.PhotoBackdrop;

__ds_ns.PhysicalButton = __ds_scope.PhysicalButton;

__ds_ns.SpatialAvatar = __ds_scope.SpatialAvatar;

__ds_ns.TVScreen = __ds_scope.TVScreen;

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

})();
