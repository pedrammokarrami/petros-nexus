// DrinkMenu — modal that opens when the user clicks the Order glass.
// Listing styled like a chalkboard menu pinned over the bar.

function DrinkMenu({ open, drinks, onClose, onOrder }) {
  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(8, 8, 15, 0.55)",
        backdropFilter: "blur(8px)",
        animation: "av-fade-up 240ms var(--ease-out)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 420,
          maxWidth: "90vw",
          padding: 28,
          background: "linear-gradient(180deg, #1a1410 0%, #0c0a08 100%)",
          border: "2px solid #3a2a18",
          borderRadius: 12,
          boxShadow: "0 40px 100px rgba(0,0,0,0.7), inset 0 0 0 8px #221813, inset 0 0 40px rgba(0,0,0,0.6)",
          position: "relative",
        }}
      >
        {/* chalk title */}
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 800,
            color: "#f5e6c0",
            textAlign: "center",
            letterSpacing: "0.04em",
            textShadow: "0 0 12px rgba(245,230,192,0.4)",
            marginBottom: 6,
          }}
        >
          The Menu
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "var(--accent)",
            textAlign: "center",
            marginBottom: 22,
            textShadow: "0 0 6px var(--accent)",
          }}
        >
          ▸ pick your poison ◂
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {drinks.map((d) => (
            <button
              key={d.id}
              onClick={() => onOrder(d)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "12px 14px",
                background: "transparent",
                border: "none",
                borderBottom: "1px dashed rgba(245, 230, 192, 0.18)",
                color: "#f5e6c0",
                fontFamily: "var(--font-body)",
                fontSize: 17,
                cursor: "pointer",
                textAlign: "left",
                transition: "var(--t-hover)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(245,230,192,0.06)"; e.currentTarget.style.paddingLeft = "20px"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.paddingLeft = "14px"; }}
            >
              <span style={{ fontSize: 22 }}>{d.emoji}</span>
              <span style={{ flex: 1 }}>{d.name}</span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                }}
              >
                order →
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            width: 28,
            height: 28,
            borderRadius: "50%",
            border: "1px solid rgba(245,230,192,0.3)",
            background: "transparent",
            color: "#f5e6c0",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: 14,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

window.__DrinkMenu = DrinkMenu;
