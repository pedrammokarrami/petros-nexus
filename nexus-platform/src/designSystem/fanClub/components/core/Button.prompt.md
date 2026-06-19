# Button

The club's primary call-to-action. Use `primary` once per surface (the loudest action). Use `ghost` for everything else. Reach for `glow` when the action is mood-coded — joining voice, reacting, voting on a track.

```jsx
<Button variant="primary" icon="▶">Join the club</Button>
<Button variant="ghost">Skip</Button>
<Button variant="glow" size="sm">React</Button>
```

Notable props: `variant`, `size`, `icon`, `block`, `disabled`. Buttons inherit `--accent` from the nearest club scope, so the same `glow` button reads cyan in a music room and coral in a cinema room.
