import { useState } from "react";
import CoverPage from "./pages/CoverPage";
import BrandPage from "./pages/BrandPage";
import TokensPage from "./pages/TokensPage";
import ComponentsPage from "./pages/ComponentsPage";
import OnboardingPage from "./pages/OnboardingPage";

const PAGES = [
  { id: "cover", num: "01", label: "Cover", component: CoverPage },
  { id: "brand", num: "02", label: "Brand", component: BrandPage },
  { id: "tokens", num: "03", label: "Design Tokens", component: TokensPage },
  { id: "components", num: "04", label: "Components", component: ComponentsPage },
  { id: "onboarding", num: "05", label: "Onboarding", component: OnboardingPage },
];

export default function App() {
  const [activePage, setActivePage] = useState("cover");
  const [navOpen, setNavOpen] = useState(false);

  const current = PAGES.find((p) => p.id === activePage) ?? PAGES[0];
  const CurrentComponent = current.component;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    >
      {/* Top navigation bar */}
      <header
        style={{
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          borderBottom: "1px solid var(--border-color)",
          background: "rgba(2,6,11,0.95)",
          backdropFilter: "blur(16px)",
          flexShrink: 0,
          zIndex: 50,
          position: "relative",
        }}
      >
        {/* Logo left */}
        <div className="flex items-center gap-2">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
            <circle cx="14" cy="24" r="5" fill="#02060B" stroke="#00D9FF" strokeWidth="1.5" />
            <circle cx="14" cy="24" r="2.5" fill="#00D9FF" />
            <circle cx="34" cy="24" r="5" fill="#02060B" stroke="#00F5A0" strokeWidth="1.5" />
            <circle cx="34" cy="24" r="2.5" fill="#00F5A0" />
            <circle cx="24" cy="10" r="3.5" fill="#02060B" stroke="#7C3CFF" strokeWidth="1.5" />
            <circle cx="24" cy="10" r="1.5" fill="#7C3CFF" />
            <line x1="19" y1="24" x2="29" y2="24" stroke="#00D9FF" strokeWidth="1" strokeOpacity="0.5" />
            <line x1="14" y1="19" x2="24" y2="13" stroke="#7C3CFF" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="34" y1="19" x2="24" y2="13" stroke="#7C3CFF" strokeWidth="0.8" strokeOpacity="0.4" />
          </svg>
          <div>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.08em",
                color: "var(--text-primary)",
              }}
            >
              FREE<span style={{ color: "#00D9FF" }}>SPLIT</span>
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 8,
                letterSpacing: "0.15em",
                color: "var(--text-muted)",
                marginLeft: 8,
                display: "inline",
              }}
            >
              SECTION I
            </span>
          </div>
        </div>

        {/* Center nav — desktop */}
        <nav
          className="hidden"
          style={{
            display: "flex",
            gap: 2,
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {PAGES.map((page) => {
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => setActivePage(page.id)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 6,
                  background: isActive ? "rgba(0,217,255,0.1)" : "transparent",
                  border: `1px solid ${isActive ? "rgba(0,217,255,0.3)" : "transparent"}`,
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  color: isActive ? "#00D9FF" : "var(--text-muted)",
                  transition: "all 0.15s",
                  whiteSpace: "nowrap",
                }}
              >
                {page.num} {page.label.toUpperCase()}
              </button>
            );
          })}
        </nav>

        {/* Right: system status */}
        <div className="flex items-center gap-3">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.1em",
              color: "#00F5A0",
              opacity: 0.8,
            }}
          >
            <div
              className="animate-pulse-glow"
              style={{ width: 5, height: 5, borderRadius: "50%", background: "#00F5A0", boxShadow: "0 0 6px #00F5A0" }}
            />
            ONLINE
          </div>
          {/* Hamburger for small screens */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            style={{
              padding: "4px 6px",
              background: "transparent",
              border: "1px solid var(--border-color)",
              borderRadius: 6,
              cursor: "pointer",
              color: "var(--text-secondary)",
              fontFamily: "var(--font-mono)",
              fontSize: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ☰
          </button>
        </div>
      </header>

      {/* Full nav dropdown */}
      {navOpen && (
        <div
          style={{
            position: "fixed",
            top: 52,
            left: 0,
            right: 0,
            zIndex: 100,
            background: "rgba(2,6,11,0.98)",
            border: "1px solid var(--border-color)",
            borderTop: "none",
            backdropFilter: "blur(20px)",
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {PAGES.map((page) => {
            const isActive = activePage === page.id;
            return (
              <button
                key={page.id}
                onClick={() => {
                  setActivePage(page.id);
                  setNavOpen(false);
                }}
                style={{
                  padding: "12px 16px",
                  borderRadius: 8,
                  background: isActive ? "rgba(0,217,255,0.08)" : "transparent",
                  border: `1px solid ${isActive ? "rgba(0,217,255,0.2)" : "transparent"}`,
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: isActive ? "#00D9FF" : "var(--text-secondary)",
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "all 0.1s",
                }}
              >
                <span style={{ color: "var(--text-muted)", fontSize: 9 }}>{page.num}</span>
                {page.label.toUpperCase()}
                {isActive && (
                  <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#00D9FF", boxShadow: "0 0 6px #00D9FF" }} />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Inline page tabs (always visible under header) */}
      <div
        style={{
          display: "flex",
          gap: 0,
          borderBottom: "1px solid var(--border-color)",
          background: "rgba(5,12,20,0.9)",
          backdropFilter: "blur(8px)",
          flexShrink: 0,
          overflowX: "auto",
          padding: "0 16px",
        }}
      >
        {PAGES.map((page) => {
          const isActive = activePage === page.id;
          return (
            <button
              key={page.id}
              onClick={() => setActivePage(page.id)}
              style={{
                padding: "10px 14px",
                background: "transparent",
                border: "none",
                borderBottom: isActive ? "2px solid #00D9FF" : "2px solid transparent",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.1em",
                color: isActive ? "#00D9FF" : "var(--text-muted)",
                whiteSpace: "nowrap",
                transition: "all 0.15s",
                marginBottom: -1,
              }}
            >
              {page.num} — {page.label.toUpperCase()}
            </button>
          );
        })}
      </div>

      {/* Page content */}
      <main style={{ flex: 1, overflow: "auto" }}>
        <CurrentComponent />
      </main>
    </div>
  );
}
