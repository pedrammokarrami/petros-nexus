/**
 * FloorActions — bottom action bar. Voice, react, challenge, share, members.
 * Uses IconButton + Button from the design system.
 */
function FloorActions({ onReact, onMic, onShare, onChallenge, micOn }) {
  const { Button, IconButton, Badge } = window.AudiovidoFanClubDesignSystem_013bf7;
  const [reactOpen, setReactOpen] = React.useState(false);
  const emojis = ["🔥", "😍", "🤯", "💯", "🥲", "🎧", "👁", "✨"];

  return (
    <div
      style={{
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
        boxShadow: "var(--shadow-lg), 0 0 32px color-mix(in oklab, var(--accent) 22%, transparent)",
      }}
    >
      <IconButton label="Voice" variant={micOn ? "primary" : "ghost"} size="lg" onClick={onMic}>
        🎤
      </IconButton>

      <div style={{ position: "relative" }}>
        <IconButton label="React" variant="glow" size="lg" onClick={() => setReactOpen((v) => !v)}>
          😍
        </IconButton>
        {reactOpen && (
          <div
            style={{
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
              animation: "av-fade-up var(--dur-base) var(--ease-spring)",
            }}
          >
            {emojis.map((e) => (
              <button
                key={e}
                onClick={() => { onReact?.(e); setReactOpen(false); }}
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 999,
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  fontSize: 18,
                  transition: "transform var(--dur-fast) var(--ease-spring), background var(--dur-fast)",
                }}
                onMouseEnter={(e2) => { e2.currentTarget.style.transform = "scale(1.3)"; e2.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
                onMouseLeave={(e2) => { e2.currentTarget.style.transform = "scale(1)"; e2.currentTarget.style.background = "transparent"; }}
              >
                {e}
              </button>
            ))}
          </div>
        )}
      </div>

      <div style={{ width: 1, height: 28, background: "var(--border-soft)" }} />

      <Button variant="glow" icon="⚡" onClick={onChallenge}>Start a challenge</Button>
      <Button variant="ghost" icon="↗" onClick={onShare}>Share</Button>

      <div style={{ flex: 1 }} />

      <Badge variant="live" pulse>OPEN MIC</Badge>
    </div>
  );
}

window.__FloorActions = FloorActions;
