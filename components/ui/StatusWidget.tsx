"use client";

export default function StatusWidget() {
  return (
    <div
      style={{
        position: "absolute",
        top: "28px",
        right: "28px",
        zIndex: 40,
        width: "290px",
        pointerEvents: "auto",
        userSelect: "none",
      }}
    >
      {/* Glassmorphism Status Card */}
      <div
        style={{
          background: "rgba(10, 12, 18, 0.65)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255, 255, 255, 0.09)",
          borderRadius: "18px",
          padding: "16px 18px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.65)",
        }}
      >
        {/* Top subtle bar */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "12px" }}>
          <div
            style={{
              width: "32px",
              height: "3px",
              borderRadius: "999px",
              background: "rgba(255, 255, 255, 0.15)",
            }}
          />
        </div>

        {/* Header: OPEN TO WORK */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
          <span
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background: "#22c55e",
              boxShadow: "0 0 10px #22c55e",
              display: "block",
              animation: "pulse 1.6s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontSize: "11px",
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#34d399",
              textTransform: "uppercase",
              textShadow: "0 0 8px rgba(52, 211, 153, 0.4)",
            }}
          >
            OPEN TO WORK
          </span>
        </div>

        {/* Divider line */}
        <div style={{ height: "1px", background: "rgba(255, 255, 255, 0.08)", marginBottom: "14px" }} />

        {/* Status List Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {/* Row 1: BUILDING */}
          <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", alignItems: "baseline", gap: "8px" }}>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.35)",
                letterSpacing: "0.12em",
              }}
            >
              BUILDING
            </span>
            <span
              style={{
                fontSize: "12.5px",
                color: "rgba(255, 255, 255, 0.88)",
                fontWeight: 500,
                lineHeight: "1.4",
              }}
            >
              Full-Stack Apps & AI Systems
            </span>
          </div>

          {/* Row 2: READING */}
          <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", alignItems: "baseline", gap: "8px" }}>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.35)",
                letterSpacing: "0.12em",
              }}
            >
              READING
            </span>
            <span
              style={{
                fontSize: "12.5px",
                color: "rgba(255, 255, 255, 0.88)",
                fontWeight: 500,
                lineHeight: "1.4",
              }}
            >
              Rich Dad Poor Dad
            </span>
          </div>

          {/* Row 3: WRITING */}
          <div style={{ display: "grid", gridTemplateColumns: "72px 1fr", alignItems: "baseline", gap: "8px" }}>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "rgba(255, 255, 255, 0.35)",
                letterSpacing: "0.12em",
              }}
            >
              WRITING
            </span>
            <span
              style={{
                fontSize: "12.5px",
                color: "rgba(255, 255, 255, 0.88)",
                fontWeight: 500,
                lineHeight: "1.4",
              }}
            >
              Clean Code & Architecture
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
