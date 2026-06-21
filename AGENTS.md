# AudioVido Platform - Agent Instructions

## Project Overview
React + Vite single-page app with DJ console, media library, and AI-driven auto-mix. Runs on mobile portrait; DJ Mode rotates to landscape via CSS transform.

## Key Commands
```bash
cd audiovido-platform
npm run dev      # dev server on port 3000
npm run build    # production build
npm run preview  # preview build
```

## Architecture
- **Entry**: `src/main.jsx` → `App.jsx` (React Router + global players)
- **State**: Zustand stores (`usePlayerStore`, `useDJStore`)
- **Audio**: Two engines — `DJEngine` (auto-mix) and `ManualDJEngine` (manual console). Both use Web Audio API with shared patterns.
- **Rotation**: DJ view wraps content in `width: 100vh; height: 100vw; transform: rotate(90deg) translateY(-100vw)` — touch coords for faders/knobs MUST account for this rotation (see `ManualConsole.jsx:167-172`).
- **Zero-text UI**: All labels are icons only (lucide-react). No text in DJ console.

## Critical Files
| File | Purpose |
|------|---------|
| `src/dj/ManualDJEngine.js` | Core manual DJ audio engine (2 decks, EQ, FX, crossfader) |
| `src/dj/DJEngine.js` | Auto-mix engine (playlist playback with crossfade) |
| `src/components/dj/ManualConsole.jsx` | Full landscape console UI (790+ lines) |
| `src/components/dj/DJView.jsx` | DJ modal wrapper, rotation, AI popup |
| `src/components/dj/AutoDJ.jsx` | AI mood → playlist → auto-mix flow |
| `src/dj/useDJStore.js` | DJ state (decks, panels, crossfader, AI popup) |
| `src/store/usePlayerStore.js` | Global player state (mode, queue, playback) |

## DJ Console Specifics
- **Two decks side-by-side** (Deck A left/red, Deck B right/blue)
- **Panels per deck**: EQ, FX, LOOP, CUES — slide up via Framer Motion
- **Crossfader**: Center, equal-power (cos/sin), vertical fader
- **AI Button**: Purple sparkle icon in center mixer → opens AutoDJ popup
- **Tonearm**: SVG line + circle on each platter, lifts/lowers with play state
- **Waveforms**: Real decoded audio data (Canvas), teal/pink tint per deck

## Touch Coordinate Math (Rotated Container)
```js
// In Fader3D/Knob3D — `rotated` prop true for landscape console
if (rotated) {
  d = vertical ? (x - startX) : (y - startY)  // inverted axes
} else {
  d = vertical ? (startY - y) : (x - startX)
}
```

## Testing/Viewports
Verify at portrait sizes (become landscape canvas after rotation):
- 375×667, 390×844, 414×896, 430×932
- Check: full fill, no gaps, platters circular, tonearms visible, faders drag correctly

## Do Not Rebuild
Reuse existing: crossfader logic, EQ/filter wiring, FX engine (DelayNode/ConvolverNode), BPM detection, hot-cue concept, track library drawer, chat audio avatar, auto-mix engine.

## Removed (Per Spec)
- Beginner/Intermediate/Professional tier selector
- Manual/Auto-DJ tab switcher
- Dead code/unused imports from those features