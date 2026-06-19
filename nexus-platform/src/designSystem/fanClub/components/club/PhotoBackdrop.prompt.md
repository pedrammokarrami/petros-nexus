# PhotoBackdrop

Full-bleed atmospheric room photo. Wraps an `<image-slot>` so the user drops in their concert venue / cinema lobby / jazz lounge photo. Adds grain, vignette, parallax, and an optional accent tint blended in soft-light.

```jsx
<PhotoBackdrop
  slotId="rock-bg"
  placeholder="Drop a photo of the rock club"
  tint="radial-gradient(60% 50% at 50% 60%, rgba(255,106,61,0.6), transparent 70%)"
/>
```

Requires `<script src="assets/image-slot.js"></script>` in the page. Persistence works only when the HTML lives at the project root — per-session drops always work.
