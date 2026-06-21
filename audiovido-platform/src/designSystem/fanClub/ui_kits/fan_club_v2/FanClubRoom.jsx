// FanClubRoom — the v2 composition. Two rooms (rock, cinema) share this
// component; club data drives the bartender, members, neon signs, drinks.

const moodLabel = (v) =>
  v < 0.25 ? "Mellow"    :
  v < 0.5  ? "Warming"   :
  v < 0.75 ? "Engaged"   :
  v < 0.9  ? "Hype"      : "Euphoric";

function FanClubRoom({ club, onSwitchRoom, otherRoomName }) {
  const NS = window.AudiovidoFanClubDesignSystem_013bf7;
  const {
    PhotoBackdrop, LightingFx, NeonSign, SpatialAvatar, FloatingMessage,
    Bartender, PhysicalButton, MoodMeter, TVScreen, Badge,
  } = NS;

  const SmokeField = window.__SmokeField;
  const EmojiBurst = window.__EmojiBurst;
  const DrinkMenu = window.__DrinkMenu;
  const Props = window.__RoomProps || {};

  const [messages, setMessages] = React.useState(club.initialChat);
  const [composer, setComposer] = React.useState("");
  const [mood, setMood] = React.useState(0.55);
  const [showMenu, setShowMenu] = React.useState(false);
  const [bursts, setBursts] = React.useState([]);
  const [bartenderSpeak, setBartenderSpeak] = React.useState("welcome in. take a seat.");
  const [activeMember, setActiveMember] = React.useState(null);

  // Reset on club switch
  React.useEffect(() => {
    setMessages(club.initialChat);
    setMood(0.55);
    setBartenderSpeak(`welcome to ${club.name.toLowerCase()}. take a seat.`);
    const t = setTimeout(() => setBartenderSpeak(null), 4500);
    return () => clearTimeout(t);
  }, [club.slug]);

  // Auto-fade limited recent messages — only keep last 4
  const visibleMessages = messages.slice(-4);

  const send = () => {
    const t = composer.trim();
    if (!t) return;
    setMessages((m) => [...m, { id: Date.now(), author: "you", persona: "member", text: t, intensity: 0.7 }]);
    setComposer("");
    const hot = /[!?]|🔥|💯|love|wow|amazing|insane/i.test(t);
    if (hot) setMood((v) => Math.min(1, v + 0.06));
  };

  const reactAt = (emoji, x, y) => {
    const id = Date.now() + Math.random();
    setBursts((b) => [...b, { id, emoji, x, y }]);
    setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 1400);
    setMood((v) => Math.min(1, v + 0.025));
  };

  const orderDrink = (d) => {
    setShowMenu(false);
    setBartenderSpeak(`one ${d.name.toLowerCase()} coming up.`);
    setTimeout(() => setBartenderSpeak(`you just ordered a ${d.name.toLowerCase()} ${d.emoji}`), 1800);
    setTimeout(() => setBartenderSpeak(null), 5500);
    // Round-of-applause emoji burst
    reactAt(d.emoji, window.innerWidth / 2, window.innerHeight - 180);
  };

  const tint = `radial-gradient(70% 60% at 50% 100%, color-mix(in oklab, var(--accent) ${30 + mood * 40}%, transparent), transparent 70%)`;

  return (
    <div
      className={club.scope}
      style={{
        position: "relative",
        minHeight: "100vh",
        color: "var(--text-body)",
        overflow: "hidden",
      }}
    >
      {/* 1. Backdrop */}
      {PhotoBackdrop && (
        <PhotoBackdrop
          slotId={club.bg.slotId}
          placeholder={club.bg.placeholder}
          tint={tint}
          parallax={0.12}
          grain={0.24}
          vignette={0.78}
        />
      )}

      {/* 2. Lighting */}
      {LightingFx && <LightingFx mood={mood} spotlights={2} godRays />}

      {/* 3. Smoke */}
      {SmokeField && <SmokeField intensity={mood} count={20} />}

      {/* Room props */}
      {club.slug === "rock" && (
        <>
          {Props.VinylShelf && <Props.VinylShelf top="42%" left="86%" rotate={-2} />}
          {Props.SpeakerStack && <Props.SpeakerStack side="left" bottom="14%" />}
          {Props.SpeakerStack && <Props.SpeakerStack side="right" bottom="14%" />}
          {Props.BarCounter && <Props.BarCounter />}
        </>
      )}
      {club.slug === "cinema" && (
        <>
          {Props.Curtain && <Props.Curtain side="left" />}
          {Props.Curtain && <Props.Curtain side="right" />}
          {Props.Projector && <Props.Projector side="left" top="30%" />}
          {Props.FilmReelDecor && <Props.FilmReelDecor top="42%" left="88%" size={140} />}
          {Props.PopcornMachine && <Props.PopcornMachine />}
        </>
      )}

      {/* Neon signs */}
      {NeonSign && club.neonSigns.map((s, i) => (
        <div key={i} style={{ position: "fixed", top: s.top, left: s.left, right: s.right, zIndex: 4, pointerEvents: "none" }}>
          <NeonSign color={s.color} flicker={s.flicker} rotate={s.rotate} size={36}>
            {s.text}
          </NeonSign>
        </div>
      ))}

      {/* Top bar */}
      <header
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 28px",
          gap: 18,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 18,
              fontWeight: 800,
              color: "var(--text-hi)",
              letterSpacing: "-0.01em",
            }}
          >
            audiovido
          </div>
          <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em" }}>/</span>
          {Badge && <Badge variant="outline">FAN CLUBS</Badge>}
          {Badge && <Badge variant="live" pulse>LIVE</Badge>}
        </div>
        <button
          onClick={onSwitchRoom}
          style={{
            padding: "10px 16px",
            background: "rgba(8,8,15,0.55)",
            backdropFilter: "blur(10px)",
            border: "1px solid var(--border-soft)",
            borderRadius: 999,
            color: "var(--text-hi)",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            cursor: "pointer",
            boxShadow: "0 0 18px color-mix(in oklab, var(--accent) 30%, transparent)",
          }}
        >
          ⇄ {otherRoomName}
        </button>
      </header>

      {/* Stage — CRT + mood meter */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: 32,
          padding: "8px 56px 0",
          alignItems: "start",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent)",
            textShadow: "0 0 8px var(--accent)",
          }}>
            {club.kicker}
          </div>
          <h1 style={{
            margin: 0,
            fontFamily: "var(--font-display)",
            fontWeight: 800,
            fontSize: "clamp(48px, 6vw, 88px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            fontStyle: "italic",
            color: "var(--text-hi)",
            textShadow: "0 0 24px color-mix(in oklab, var(--accent) 50%, transparent), 0 0 56px color-mix(in oklab, var(--accent) 30%, transparent), 4px 4px 0 rgba(0,0,0,0.6)",
          }}>
            {club.name}
          </h1>
          <div style={{
            fontFamily: "var(--font-body)",
            fontSize: 16,
            fontStyle: "italic",
            color: "var(--text-dim)",
            maxWidth: 520,
          }}>
            "{club.tagline}"
          </div>
          <div style={{ marginTop: 8, maxWidth: 620 }}>
            {TVScreen && (
              <TVScreen caption={club.caption}>
                <div style={{ textAlign: "center", padding: 28 }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.3em",
                    color: "var(--accent)",
                    textShadow: "0 0 6px var(--accent)",
                    marginBottom: 12,
                    animation: "av-flicker 5s steps(1, end) infinite",
                  }}>
                    {club.slug === "rock" ? "▶ NOW PLAYING" : "▶ NOW SHOWING"}
                  </div>
                  <div style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: 40,
                    lineHeight: 1,
                    color: "var(--smoke-100)",
                    textShadow: "0 0 18px var(--accent), 0 0 36px color-mix(in oklab, var(--accent) 50%, transparent)",
                    letterSpacing: "0.04em",
                  }}>
                    {club.marquee}
                  </div>
                  <div style={{
                    display: "flex", justifyContent: "center", alignItems: "flex-end",
                    gap: 3, marginTop: 14, height: 24,
                  }}>
                    {Array.from({ length: 22 }).map((_, i) => (
                      <span key={i} style={{
                        width: 3,
                        height: `${30 + Math.abs(Math.sin(i * 0.6)) * 70}%`,
                        background: "var(--accent)",
                        boxShadow: "0 0 4px var(--accent)",
                        animation: `av-equalize ${0.8 + (i % 4) * 0.2}s var(--ease-in-out) ${i * 0.05}s infinite alternate`,
                        transformOrigin: "bottom",
                        opacity: 0.85,
                        borderRadius: 1,
                      }} />
                    ))}
                  </div>
                </div>
              </TVScreen>
            )}
          </div>
        </div>

        {/* Right rail: mood meter */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "stretch" }}>
          {MoodMeter && <MoodMeter value={mood} sampleCount={47} />}
          <div style={{
            padding: 16,
            background: "rgba(8,8,15,0.55)",
            backdropFilter: "blur(14px)",
            border: "1px solid var(--border-soft)",
            borderRadius: 14,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
            }}>
              In the room
            </div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 700,
              color: "var(--text-hi)",
              textShadow: "0 0 12px color-mix(in oklab, var(--accent) 50%, transparent)",
            }}>
              {club.members.length + 41} <span style={{ fontSize: 14, color: "var(--text-muted)", fontFamily: "var(--font-mono)", letterSpacing: "0.1em", textTransform: "uppercase" }}>vibing</span>
            </div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.16em",
              color: "var(--accent)",
              textTransform: "uppercase",
            }}>
              Mood · {moodLabel(mood)}
            </div>
          </div>
        </div>
      </div>

      {/* Floating chat (center, between stage and members) */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          margin: "32px auto 0",
          padding: "0 64px",
          maxWidth: 980,
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {visibleMessages.map((m) => (
          FloatingMessage ? (
            <FloatingMessage key={m.id} author={m.author} persona={m.persona} intensity={m.intensity}>
              {m.text}
            </FloatingMessage>
          ) : null
        ))}
      </div>

      {/* Spatial members along the floor */}
      <div style={{ position: "fixed", inset: 0, zIndex: 4, pointerEvents: "none" }}>
        {SpatialAvatar && club.members.map((m, i) => (
          <div key={i} style={{ pointerEvents: "auto" }}>
            <SpatialAvatar
              name={m.name}
              top={m.top}
              left={m.left}
              size={44}
              activity={m.activity}
              speech={activeMember === m.name ? m.msg || "…" : undefined}
              onClick={() => {
                setActiveMember((cur) => (cur === m.name ? null : m.name));
                if (m.msg) {
                  setTimeout(() => setActiveMember(null), 3000);
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* Bartender */}
      {Bartender && (
        <Bartender
          name={club.bartender.name}
          slotId={club.bartender.slotId}
          placeholder={club.bartender.placeholder}
          lines={club.bartender.lines}
          speak={bartenderSpeak}
          side="right"
          size={110}
        />
      )}

      {/* Bottom interaction bar */}
      <div
        style={{
          position: "fixed",
          left: "50%",
          bottom: 24,
          transform: "translateX(-50%)",
          zIndex: 9,
          display: "flex",
          alignItems: "flex-end",
          gap: 24,
          padding: "18px 28px",
          background: "rgba(8, 8, 15, 0.72)",
          backdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid var(--border-soft)",
          borderRadius: 26,
          boxShadow: "var(--shadow-xl), 0 0 36px color-mix(in oklab, var(--accent) 30%, transparent)",
        }}
      >
        {PhysicalButton && (
          <>
            <PhysicalButton variant="drink" label="Order" onClick={() => setShowMenu(true)} />
            <PhysicalButton variant="neon" label="React" icon="😍"
              onClick={() => reactAt("🔥", window.innerWidth / 2, window.innerHeight - 160)} />
            <PhysicalButton variant="arcade" label="Challenge" icon="⚡"
              onClick={() => setBartenderSpeak("nice — challenge dropped on the wall.")} />
            <PhysicalButton variant="jukebox" label="Vote" icon="VOTE"
              onClick={() => setBartenderSpeak("vote logged. next track in a sec.")} />
          </>
        )}

        {/* Composer */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 6, height: 96, alignSelf: "center" }}>
          <input
            value={composer}
            onChange={(e) => setComposer(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter") send(); }}
            placeholder="say something to the room…"
            style={{
              width: 260,
              height: 44,
              padding: "0 16px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid var(--border-soft)",
              borderRadius: 999,
              color: "var(--text-hi)",
              fontFamily: "var(--font-body)",
              fontSize: 15,
              outline: "none",
            }}
          />
          <button
            onClick={send}
            style={{
              height: 44,
              padding: "0 18px",
              background: "var(--accent)",
              color: "var(--void-900)",
              border: "none",
              borderRadius: 999,
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              cursor: "pointer",
              boxShadow: "0 0 24px var(--accent)",
            }}
          >
            Send ↵
          </button>
        </div>
      </div>

      {/* Drink menu modal */}
      {DrinkMenu && <DrinkMenu open={showMenu} drinks={club.drinks} onClose={() => setShowMenu(false)} onOrder={orderDrink} />}

      {/* Emoji bursts */}
      {EmojiBurst && <EmojiBurst bursts={bursts} />}
    </div>
  );
}

window.__FanClubRoom = FanClubRoom;
