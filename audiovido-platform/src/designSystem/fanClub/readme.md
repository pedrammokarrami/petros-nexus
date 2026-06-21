# Audiovido · Fan Club Design System

This system designs **Fan Club Pages** — themed, immersive, mood-responsive rooms where music or cinema fans gather. It is not a generic social-app kit. Every component assumes a dark, cinematic, nightclub aesthetic with reactive lighting.

> If you came here to build something Audiovido-shaped, your job is to make people feel they have stepped into a venue, not opened an app.

---

## Sources

This design system was authored from the **"Fan Club Page — Immersive Music/Cinema Experience" creative brief** (no codebase or Figma was attached). The brief specifies a TV-screen "stage", a chat "floor", side "walls" of members, a mood meter, a now-playing widget, and a particle field — all driven by club mood. See `SKILL.md` for the abridged contract a downstream agent should follow.

If you (the human) have an actual codebase or Figma file you want this system to track, paste the link and I'll reconcile.

---

## CONTENT FUNDAMENTALS

How copy reads in an Audiovido Fan Club:

- **Lowercase, conversational, intimate** in chat. The room talks like the room *is*: "that drum break is unreal." "i could live in this song." Not: "This track has excellent percussion."
- **Marquee uppercase for labels.** `OPEN MIC`, `LIVE`, `47 VIBING`, `TRENDING · #NIGHTSHIFT`. Mono font, wide letter-spacing, never sentence case. These read like venue signage, not UI chrome.
- **No "you" / "we" instructional tone.** The room narrates *to itself*, not at the visitor. Empty states whisper ("the floor is quiet — say hi"), not direct ("Send your first message!").
- **DJ / host persona uses titles.** "DJ Echo", "The Usher", "Lumen". They greet, set tone, and step back. They never explain features.
- **Numbers are honest.** "17 of 50 shared." "Based on 47 messages in the last 10 minutes." Not "Many fans love this."
- **Emoji are punctuation, not decoration.** One 🎧 at the end of a DJ greeting. One 🔥 reaction tally. Never strings of emoji, never as bullet markers, never in UI labels.
- **Italics are for tagline-style quotes only.** *"Bring your favorite scene. Bring strong opinions."*
- **Vibe over information.** When in doubt, cut a label. Let the visuals carry it.

---

## VISUAL FOUNDATIONS

### Colors
- **Base is void-black.** Page sits on `--void-800` (`#08080f`); the deepest recess is `--void-900` (`#050509`). Everything is *built up* from black with translucent, glowing surfaces.
- **Two accent personalities.** `--cyan-400` for music rooms (`#00f5d4`); `--coral-400` for cinema (`#f72585`). Both ship with a paired `--*-glow` halo. The current accent is exposed as `--accent` so components inherit the room's mood without code branching.
- **Mood is a gradient, not a color.** `--mood-gradient` blends three radial spots (`--mood-a/b/c`) into a 2.4s-easing backdrop that responds to chat tone. Subdued blues for melancholic; warm corals/ambers for euphoric.
- **Club scopes rebind everything.** `.club-music`, `.club-cinema`, `.club-rock`, `.club-jazz` are CSS scopes — drop one on a wrapper and the room retunes. Mood states (`.mood-chill`, `.mood-hype`, …) do the same for temperature.

### Type
- **Display: Unbounded.** Marquee headers, club names, hero labels. 800-weight; tight tracking (-0.02em); always paired with a glow text-shadow that picks up the room's accent.
- **Body: Space Grotesk.** Messages, UI labels. Messages run **18px**, slightly oversize — the room speaks at conversational volume, not in small print.
- **Mono: Space Mono.** Ambient labels, stats, timestamps. Always UPPERCASE with `0.18em` letter-spacing. Reads as marquee signage.

> **Font substitution note.** Unbounded, Space Grotesk, and Space Mono are loaded from Google Fonts (no proprietary fonts were supplied with the brief). If a brand swap is needed, replace the `@import url(…)` in `tokens/typography.css` and update the `--font-*` variables.

### Spacing & radii
- **4-based scale.** `--space-1` (4) … `--space-12` (128). Cards breathe at 16-24px internal padding; sections at 40-64px gutters.
- **Radii are soft, not pillowy.** Cards land at `--radius-md` (10) or `--radius-lg` (16). The CRT gets its own `--radius-tv` (28) outer / `--radius-tv-inner` (22) inner. Pills are real pills (`999px`) — used for buttons, badges, the bottom-floor action bar.

### Backgrounds
- The **mood gradient** is the page backdrop. Always. Solid `var(--void-800)` is the canvas it sits on.
- Layered on top: a **noise texture** (`--noise`, mix-blend overlay, ~18% opacity) for film grain, then **floating particles** (canvas), then occasional **decor** (vinyl record, film reel) drifting slowly in the corners.
- The CRT adds its own treatments: **scanlines**, **chromatic-aberration spots**, **vignette**, and a slow vertical **scan-line sweep**.

### Animation
- **Easing is velvety.** `--ease-velvet` (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`) for mood + ambient. `--ease-spring` for buttons. Nothing snaps.
- **Three timescales.** `--dur-fast` (160ms) for hover/press. `--dur-ambient` (2.4s) for mood/room shifts. `--dur-breathe` (6s) for continuous pulses (glow, particle drift, equalizer).
- **Keyframes available:** `av-fade-up` (messages), `av-pulse-glow` (active member), `av-flicker` (CRT static), `av-scan` (vertical sweep), `av-drift` (decor wander), `av-breathe` (ambient pulse), `av-equalize` (waveform), `av-marquee` (gradient scroll).
- **Reduced motion:** all durations collapse to 0ms automatically.

### Hover, press, focus
- **Hover** lifts subtly: `translateY(-1px)` + `filter: brightness(1.1)` + a brighter shadow.
- **Press** releases the lift — `translateY(0)` over `--dur-fast`.
- **Focus** pulls the accent in: border swap to `--accent`, glow halo at `--glow-sm`. The accent always traces the room's scope.

### Borders, shadows, transparency
- **Borders are translucent.** `--border-faint` (6% white), `--border-soft` (12%), `--border-strong` (22%). Solid white borders never appear.
- **Shadows = depth + glow.** Depth is `--shadow-sm…xl`; glow is `--glow-sm/md/lg` *and is accent-driven*. Pair them: `box-shadow: var(--shadow-md), var(--glow-md);`.
- **Backdrop blur is the workhorse for overlays.** `Card variant="glass"` and side panels both run blur(16px) saturate(160%) — keeps the mood gradient visible behind them.
- **Imagery vibe.** Imagery should be warm, slightly grainy, slightly underexposed — concert footage at the back of a venue, late-night cinema light. Avoid clean studio shots.

### Cards
- Three flavors. `solid` for opaque sidebars. `glass` for overlays on top of the mood gradient (always preferred unless contrast demands solid). `stage` for the recess the CRT sits in. All carry `--inset-edge` (1px white inner top-edge) for the lit-from-above feel.

---

## ICONOGRAPHY

The brief did not specify an icon library. Current choices and the substitution flag:

- **Inline glyphs & unicode for marquee accents:** `▶ ▸ ◂ ♪ ♥ ↗ ⇄ ⚡ ✎ ⚙ ↵` — these read at any size and pick up `currentColor` (and therefore the accent glow).
- **Emoji used sparingly** for mood faces (🌙 melancholic → 💥 euphoric), reaction tallies, and the DJ greet. Never as nav icons.
- **No icon font is bundled.** For a richer set, the closest CDN substitute is **Lucide** (matches the brand's clean, minimal stroke weight). Drop in as a CDN import if you need it:
  ```html
  <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>
  ```
  ⚠️ **Flag:** Lucide is the *recommended substitute*; if the real Audiovido product uses a different icon system, copy the SVG sprite into `assets/` and update this section.

---

## Index

- `styles.css` — single entry point. Consumers link this.
- `tokens/`
  - `colors.css` — void, smoke, music/cinema/rock/jazz accents, mood family, semantic aliases, `.club-*` and `.mood-*` scopes.
  - `typography.css` — Unbounded/Space Grotesk/Space Mono via Google Fonts; weight, size, letter-spacing scales; semantic roles.
  - `spacing.css` — 4-based scale, semantic gutters, radii, z-index layers.
  - `effects.css` — shadows, accent glows, inset light, blur, noise SVG, scanlines, spotlight gradient.
  - `motion.css` — durations, easing, composed transitions, keyframes, reduced-motion override.
- `components/core/` — Button, IconButton, Badge, Avatar, Card, Input.
- `components/club/` — TVScreen, MoodMeter, ChatMessage, MemberStack, NowPlaying, ChallengeCard, ClubStage **plus the v2 spatial-venue set**: PhotoBackdrop (drop-in room photo + grain + vignette + parallax), LightingFx (sweeping spotlights + god rays + floor wash), NeonSign (tube/solid, optional flicker), SpatialAvatar (positioned member with activity glow + speech bubble), FloatingMessage (3D-tilted chat bubble), Bartender (NPC with cycling speech), PhysicalButton (drink / jukebox / arcade / neon variants).
- `ui_kits/fan_club/` — first Fan Club Page (interactive: switch between Night Shift music club and The Velvet Reel cinema club; chat sends; reactions land; mood meter responds).
- `ui_kits/fan_club_v2/` — **the spatial venue rebuild**. Full-bleed photo backdrop (drop-in `image-slot`), overhead lighting + smoke + spotlights, members placed at room coordinates (bar stools, cinema seats), NPC bartender with cycling speech bubbles, floating 3D-tilted chat in the center, physical-object action buttons (cocktail glass, jukebox knob, arcade pushbutton, neon pill). Two rooms: **The Loud Room** (rock) and **The Velvet Reel** (cinema).
- `assets/image-slot.js` — drag-and-drop image placeholder runtime (loaded by v2 kit).
- `cards/` — foundation specimen cards (colors, type, spacing, brand, motion). These render in the Design System tab.
- `SKILL.md` — abridged contract for downstream agents / Claude Code.

Components compile into `_ds_bundle.js` (auto-generated); read them via `window.AudiovidoFanClubDesignSystem_013bf7.<ComponentName>`.

---

## Two design directions

This system ships **two takes on the Fan Club Page**, both built from the same tokens and atoms:

1. **`ui_kits/fan_club/`** — the **panel layout**. Stage at top, mood gradient backdrop, sticky member sidebar, chat feed, side panels for stats and challenges. Reads more like a product surface.
2. **`ui_kits/fan_club_v2/`** — the **spatial venue**. Full-bleed photographic backdrop, members placed at room coordinates, NPC bartender, floating chat in 3D, physical-object buttons. Reads as *being there*. **This is the canonical hyper-immersive direction.**

Both share the same accent system, mood gradient, motion, and copy fundamentals — but v2 leans on `image-slot` placeholders that the user fills with real photography for backdrop and bartender character.

## Working with this system

When designing a new room or screen:
1. **Pick a club scope** (`.club-music`, `.club-cinema`, `.club-rock`, `.club-jazz`) on the outermost wrapper. The room retunes.
2. **Reach for the components first** — `ClubStage` for the top, `MemberStack` for the wall, `ChatMessage` for the floor, `ChallengeCard` / `NowPlaying` for the side, `FloorActions` from the kit for the bottom bar.
3. **Layer the mood gradient + noise + particles** on the wrapper. Don't skip them — they're 80% of the feel.
4. **Inherit the accent.** Anything that needs a brand color should use `var(--accent)`, not `var(--cyan-400)` directly. The room picks the color.
5. **Keep messages oversized.** 18px. The room is intimate, not dense.
6. **No corporate-app tropes.** No flat solid buttons. No bluish-purple SaaS gradients. No "card with colored left border." No bullet-list density.
