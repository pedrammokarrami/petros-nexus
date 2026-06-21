---
name: audiovido-fan-club-design
description: Use this skill to generate well-branded interfaces and assets for Audiovido Fan Club pages — themed, immersive, mood-responsive music/cinema rooms with a CRT stage, animated mood meter, glowing chat floor, and reactive ambient backgrounds. Use this for production work, prototypes, mockups, slides, or any artifact that needs the Audiovido aesthetic.
user-invocable: true
---

# Audiovido Fan Club design

Read `readme.md` first — it has the long-form guide (content tone, visual foundations, motion, iconography, file index). Then explore:

- `styles.css` — single CSS entry point (link this once).
- `tokens/` — the foundation: colors, typography, spacing, effects, motion.
- `components/core/` + `components/club/` — reusable React UI primitives.
- `ui_kits/fan_club/` — the panel-layout Fan Club page (Night Shift / The Velvet Reel).
- `ui_kits/fan_club_v2/` — **the canonical hyper-immersive spatial venue** (The Loud Room / The Velvet Reel). Photo backdrop, lighting, smoke, spatial members, NPC bartender, floating 3D chat, physical-object buttons.
- `cards/` — foundation specimen cards.

If creating visual artifacts (slides, mocks, throwaway prototypes), copy the relevant assets out and render static HTML. If working on production code, copy the tokens + components in and read the rules to act as an expert designer for this brand.

If the user invokes this skill without other guidance, ask them what they want to build — a Fan Club room, a marketing page, a slide deck, a component — ask a few questions about which club personality (music / cinema / rock / jazz) and which mood, then act as an expert designer producing HTML or production code as needed.

## Non-negotiable rules

0. **Use v2 as the canonical layout.** Full-bleed photo backdrop · overhead lighting · smoke · members in spatial positions · NPC bartender · floating 3D-tilted chat · physical-object buttons. The "panel" v1 layout exists for product surfaces that need denser data.
1. **Dark void base.** `#08080f` or deeper. Never light backgrounds.
2. **Accent through scope, not hardcoded.** Wrap with `.club-music`, `.club-cinema`, `.club-rock`, or `.club-jazz`. Use `var(--accent)` for any branded color.
3. **Three textures, always.** Mood gradient backdrop · noise overlay · ambient particles. Skip any of these and the room feels sterile.
4. **Display = Unbounded · Body = Space Grotesk · Mono = Space Mono.** Mono labels are UPPERCASE with `0.18em` tracking.
5. **Messages are oversized at 18px.** The room is intimate, not dense.
6. **Hover lifts 1px + brightens.** Press releases. Focus pulls the accent in.
7. **Easing is velvet (`cubic-bezier(0.25, 0.46, 0.45, 0.94)`) at 2.4s for mood shifts.** Hover at 160ms.
8. **Copy: lowercase + intimate in chat, marquee uppercase for labels.** No corporate-app tone, no instructional "you", no emoji decoration strings.
9. **No SaaS tropes.** No purple-blue gradients, no rounded card + left-border accent, no flat solid buttons without glow.
