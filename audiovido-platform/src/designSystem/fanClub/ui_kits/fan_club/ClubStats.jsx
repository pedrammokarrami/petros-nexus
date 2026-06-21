/**
 * ClubStats — small right-side panel with stats + trending topic.
 */
function ClubStats({ memberCount, moodLabel, trendingTopic, energyDelta = 12 }) {
  const { Badge } = window.AudiovidoFanClubDesignSystem_013bf7;
  const lines = [
    { lbl: "VIBING NOW",    val: memberCount, suffix: "members" },
    { lbl: "MOOD",          val: moodLabel,   suffix: null },
    { lbl: "TRENDING",      val: trendingTopic, suffix: null },
    { lbl: "ENERGY",        val: `+${energyDelta}%`, suffix: "vs last hour" },
  ];
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 14,
        padding: 16,
        background: "rgba(18, 18, 31, 0.55)",
        backdropFilter: "blur(16px)",
        border: "1px solid var(--border-faint)",
        borderRadius: 14,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          The Pulse
        </div>
        <Badge variant="accent">LIVE</Badge>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {lines.map((l) => (
          <div key={l.lbl} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
              }}
            >
              {l.lbl}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 6,
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 700,
                color: "var(--text-hi)",
                letterSpacing: "-0.01em",
              }}
            >
              <span style={{ textShadow: "0 0 12px color-mix(in oklab, var(--accent) 50%, transparent)" }}>
                {l.val}
              </span>
              {l.suffix && (
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 400,
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  {l.suffix}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

window.__ClubStats = ClubStats;
