# Bartender

The venue's NPC. Image-slot for a character portrait, with a cycling speech-bubble queue. Pin to top-left or top-right.

```jsx
<Bartender
  name="Doc"
  slotId="rock-bartender"
  placeholder="Drop the bartender"
  lines={[
    "what'll it be?",
    "47 in tonight. packed house.",
    "fresh tape just dropped 🎧",
  ]}
/>
// Force a one-shot line (overrides cycle):
<Bartender slotId="x" speak="Reni just ordered a whiskey 🥃" />
```

Requires `<script src="assets/image-slot.js"></script>`.
