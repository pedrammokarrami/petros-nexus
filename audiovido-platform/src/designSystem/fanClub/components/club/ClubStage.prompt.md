# ClubStage

The full "stage" header for a Fan Club page — kicker + club name + CRT + mood meter, in one grid. Drop content into the screen via `children`.

```jsx
<ClubStage clubName="The Velvet Reel" kicker="Cinema Club" live mood={0.68}>
  <video src="/film-clip.mp4" autoPlay loop muted />
</ClubStage>
```
