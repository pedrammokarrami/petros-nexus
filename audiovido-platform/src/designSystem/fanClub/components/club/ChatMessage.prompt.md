# ChatMessage

Single message on the club floor. Three personas: `member` (default), `spotlight` (top active member, accent halo), `dj` (AI host — larger bubble, accent gradient, "DJ" badge). Messages fade-up on mount.

```jsx
<ChatMessage author="Reni" time="2m">that bass drop, oh my god</ChatMessage>
<ChatMessage author="DJ Echo" persona="dj">welcome back to the floor 🎧</ChatMessage>
<ChatMessage author="Mara" persona="spotlight" reactions={[{emoji:"🔥",count:7}]}>
  i could live in this song
</ChatMessage>
```
