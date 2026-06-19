/**
 * FanClubPage — the full Fan Club view. Composes the design system's
 * ClubStage + MemberStack + ChallengeCard + NowPlaying + ChatMessage
 * with kit-local Particles, Decor, ClubStats, and FloorActions.
 */
const moodLabelOf = (v) =>
  v < 0.2 ? "Melancholic" :
  v < 0.4 ? "Mellow" :
  v < 0.6 ? "Engaged" :
  v < 0.85 ? "Hype" : "Euphoric";

function FanClubPage({ club, onSwitchClub, otherClubLabel, otherClubScope }) {
  const NS = window.AudiovidoFanClubDesignSystem_013bf7;
  const {
    ClubStage, ChatMessage, MemberStack, ChallengeCard, NowPlaying,
    Input, IconButton, Badge,
  } = NS;
  const [messages, setMessages] = React.useState(club.seedMessages);
  const [composer, setComposer] = React.useState("");
  const [mood, setMood] = React.useState(club.mood);
  const [memberCount, setMemberCount] = React.useState(47);
  const [voted, setVoted] = React.useState(false);
  const [micOn, setMicOn] = React.useState(false);

  // Reset state when switching clubs
  React.useEffect(() => {
    setMessages(club.seedMessages);
    setMood(club.mood);
  }, [club.slug]);

  const send = () => {
    const t = composer.trim();
    if (!t) return;
    setMessages((m) => [
      ...m,
      { id: Date.now(), author: "you", persona: "member", time: "now", text: t },
    ]);
    setComposer("");
    // Sending a positive vibe nudges mood up slightly
    const hot = /[!?]|love|fire|amazing|insane|🔥|💯|wow/i.test(t);
    if (hot) setMood((v) => Math.min(1, v + 0.04));
  };

  const react = (emoji) => {
    setMessages((m) => {
      if (!m.length) return m;
      const next = [...m];
      const last = { ...next[next.length - 1] };
      const r = [...(last.reactions || [])];
      const ix = r.findIndex((x) => x.emoji === emoji);
      if (ix >= 0) r[ix] = { ...r[ix], count: r[ix].count + 1 };
      else r.push({ emoji, count: 1 });
      last.reactions = r;
      next[next.length - 1] = last;
      return next;
    });
    setMood((v) => Math.min(1, v + 0.02));
  };

  // Kit-local components live on window after their JSX files transpile
  const Particles = window.__Particles;
  const Decor = window.__Decor;
  const FloorActions = window.__FloorActions;
  const ClubStats = window.__ClubStats;

  const intensity = mood;
  const isCinema = club.scope === "club-cinema";

  return (
    <div
      className={club.scope}
      style={{
        position: "relative",
        minHeight: "100vh",
        overflow: "hidden",
        color: "var(--text-body)",
        background: `
          radial-gradient(80% 60% at 20% 20%, color-mix(in oklab, var(--mood-a) 70%, transparent), transparent 60%),
          radial-gradient(70% 60% at 80% 30%, color-mix(in oklab, var(--mood-b) 60%, transparent), transparent 60%),
          radial-gradient(90% 70% at 50% 100%, color-mix(in oklab, var(--mood-c) 70%, transparent), transparent 65%),
          var(--void-800)
        `,
        transition: "background var(--dur-ambient) var(--ease-velvet)",
      }}
    >
      {/* Noise */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          pointerEvents: "none",
          backgroundImage: "var(--noise)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Particles */}
      {Particles && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <Particles intensity={intensity} count={48} />
        </div>
      )}

      {/* Decor */}
      {Decor && !isCinema && <Decor.VinylDecor side="left" top="22%" />}
      {Decor && !isCinema && <Decor.VinylDecor side="right" top="58%" />}
      {Decor && isCinema && <Decor.ReelDecor side="left" top="20%" />}
      {Decor && isCinema && <Decor.ReelDecor side="right" top="60%" />}

      {/* Page chrome */}
      <header
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 32px",
          zIndex: 2,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 800,
              letterSpacing: "-0.01em",
              color: "var(--text-hi)",
            }}
          >
            audiovido
          </div>
          <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em" }}>/</span>
          <Badge variant="outline">FAN CLUBS</Badge>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button
            onClick={onSwitchClub}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid var(--border-soft)",
              padding: "8px 14px",
              borderRadius: 999,
              cursor: "pointer",
              transition: "var(--t-hover)",
            }}
          >
            ⇄ Switch to {otherClubLabel}
          </button>
          <IconButton label="Notifications" variant="ghost" badge>🔔</IconButton>
          <IconButton label="Settings" variant="ghost">⚙</IconButton>
        </div>
      </header>

      {/* Main grid: left members · stage+floor · right stats */}
      <main
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "200px 1fr 280px",
          gap: 24,
          padding: "0 32px 120px",
          alignItems: "start",
        }}
      >
        {/* Left wall — members */}
        <aside
          style={{
            position: "sticky",
            top: 20,
            padding: 16,
            background: "rgba(18, 18, 31, 0.45)",
            backdropFilter: "blur(14px)",
            border: "1px solid var(--border-faint)",
            borderRadius: 16,
          }}
        >
          <MemberStack members={club.members} limit={9} heading="On the floor" />
        </aside>

        {/* Center — stage + chat */}
        <section style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <ClubStage
            clubName={club.name}
            kicker={club.kicker}
            mood={mood}
            memberCount={memberCount}
            live
            caption={club.caption}
          >
            <ScreenContent club={club} />
          </ClubStage>

          {/* Tagline */}
          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 15,
              color: "var(--text-dim)",
              fontStyle: "italic",
              marginTop: -8,
              marginLeft: 4,
            }}
          >
            “{club.tagline}”
          </div>

          {/* Chat */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 14,
              padding: 22,
              background: "rgba(8, 8, 15, 0.6)",
              backdropFilter: "blur(14px)",
              border: "1px solid var(--border-faint)",
              borderRadius: 18,
              boxShadow: "var(--shadow-md)",
              minHeight: 360,
            }}
          >
            {messages.map((m) => (
              <ChatMessage
                key={m.id}
                author={m.author}
                persona={m.persona}
                time={m.time}
                reactions={m.reactions}
              >
                {m.text}
              </ChatMessage>
            ))}
          </div>

          {/* Composer */}
          <div style={{ display: "flex", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <Input
                value={composer}
                onChange={setComposer}
                onSubmit={send}
                placeholder="Say something to the room…"
                icon="✎"
                size="lg"
              />
            </div>
            <button
              onClick={send}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 12,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--void-900)",
                background: "var(--accent)",
                border: "none",
                padding: "0 22px",
                height: 56,
                borderRadius: 999,
                cursor: "pointer",
                boxShadow: "var(--glow-md)",
                transition: "var(--t-hover)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(1.1)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.filter = "brightness(1)";   e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Send ↵
            </button>
          </div>
        </section>

        {/* Right wall — stats + challenge + now playing */}
        <aside
          style={{
            position: "sticky",
            top: 20,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {ClubStats && (
            <ClubStats
              memberCount={memberCount}
              moodLabel={moodLabelOf(mood)}
              trendingTopic={club.trendingTopic}
              energyDelta={Math.round((mood - 0.5) * 40)}
            />
          )}
          <ChallengeCard
            title={club.challenge.title}
            description={club.challenge.description}
            progress={club.challenge.progress}
            progressLabel={club.challenge.progressLabel}
            tag={club.challenge.tag}
            onJoin={() => {}}
          />
          <NowPlaying
            track={club.nowPlaying.track}
            artist={club.nowPlaying.artist}
            progress={club.nowPlaying.progress}
            voted={voted}
            onVote={() => setVoted((v) => !v)}
          />
        </aside>
      </main>

      {/* Floor actions — fixed bottom */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          maxWidth: "calc(100% - 48px)",
        }}
      >
        {FloorActions && (
          <FloorActions
            micOn={micOn}
            onMic={() => setMicOn((v) => !v)}
            onReact={react}
            onShare={() => {}}
            onChallenge={() => {}}
          />
        )}
      </div>
    </div>
  );
}

window.__FanClubPage = FanClubPage;

function ScreenContent({ club }) {
  // Decorative screen content — animated marquee text + small ticker.
  const isMusic = club.scope === "club-music";
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        padding: 32,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.3em",
          color: "var(--accent)",
          textShadow: "0 0 10px var(--accent)",
          animation: "av-flicker 5s steps(1, end) infinite",
        }}
      >
        {isMusic ? "▶ NOW PLAYING" : "▶ NOW SHOWING"}
      </div>
      <div
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(28px, 4vw, 56px)",
          lineHeight: 1.0,
          letterSpacing: "0.02em",
          color: "var(--smoke-100)",
          textShadow:
            "0 0 16px color-mix(in oklab, var(--accent) 70%, transparent), 0 0 36px color-mix(in oklab, var(--accent) 40%, transparent)",
        }}
      >
        {club.marqueeContent}
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "var(--text-dim)",
          textTransform: "uppercase",
        }}
      >
        {isMusic ? "Tape 1 · Side A · Track 04 of 09" : "Reel 3 · Scene 7 of 14"}
      </div>
      {/* equalizer bars at bottom */}
      <div style={{ display: "flex", alignItems: "flex-end", gap: 3, marginTop: 8, height: 24 }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            style={{
              width: 3,
              height: `${30 + Math.abs(Math.sin(i * 0.7)) * 70}%`,
              background: "var(--accent)",
              boxShadow: "0 0 4px var(--accent)",
              animation: `av-equalize ${0.8 + (i % 4) * 0.2}s var(--ease-in-out) ${i * 0.05}s infinite alternate`,
              transformOrigin: "bottom",
              opacity: 0.85,
              borderRadius: 1,
            }}
          />
        ))}
      </div>
    </div>
  );
}
