# TVScreen

The vintage CRT centerpiece — every Fan Club page has one. Children render inside the glass; pass a `<video>`, an `<img>`, or styled label content. Scanlines and the rare flicker happen automatically.

```jsx
<TVScreen caption="LIVE · RECORDED AT FUJI ROCK '24">
  <video src="…" autoPlay loop muted />
</TVScreen>
```

The bezel is in 3D perspective; don't nest in a wrapper that re-transforms it.
