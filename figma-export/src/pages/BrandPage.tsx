import type React from "react";

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          letterSpacing: "0.15em",
          color: "var(--cyan)",
          opacity: 0.7,
        }}
      >
        {num}
      </span>
      <div style={{ height: 1, width: 24, background: "rgba(0,217,255,0.2)" }} />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.2em",
          color: "var(--text-muted)",
          textTransform: "uppercase",
        }}
      >
        {title}
      </span>
    </div>
  );
}

function HudCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={className}
      style={{
        background: "var(--card)",
        border: "1px solid var(--border-color)",
        borderRadius: 16,
        padding: 24,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 1,
          background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.2), transparent)",
        }}
      />
      {children}
    </div>
  );
}

// Primary logo (large)
function LogoPrimary({ dark = true }: { dark?: boolean }) {
  const nodeFill = dark ? "#02060B" : "#F5F8FB";
  const textColor = dark ? "#F4F8FC" : "#101923";
  return (
    <div className="flex items-center gap-3">
      <svg width="40" height="40" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="22" stroke="#00D9FF" strokeWidth="1" strokeOpacity="0.25" />
        <circle cx="14" cy="24" r="5" fill={nodeFill} stroke="#00D9FF" strokeWidth="1.5" />
        <circle cx="14" cy="24" r="2.5" fill="#00D9FF" />
        <circle cx="34" cy="24" r="5" fill={nodeFill} stroke="#00F5A0" strokeWidth="1.5" />
        <circle cx="34" cy="24" r="2.5" fill="#00F5A0" />
        <circle cx="24" cy="10" r="3.5" fill={nodeFill} stroke="#7C3CFF" strokeWidth="1.5" />
        <circle cx="24" cy="10" r="1.5" fill="#7C3CFF" />
        <line x1="19" y1="24" x2="29" y2="24" stroke="#00D9FF" strokeWidth="1" strokeOpacity="0.5" />
        <line x1="14" y1="19" x2="24" y2="13" stroke="#7C3CFF" strokeWidth="0.8" strokeOpacity="0.4" />
        <line x1="34" y1="19" x2="24" y2="13" stroke="#7C3CFF" strokeWidth="0.8" strokeOpacity="0.4" />
        <circle cx="24" cy="24" r="1.5" fill="#00D9FF" fillOpacity="0.6" />
      </svg>
      <div>
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: 22,
            letterSpacing: "0.08em",
            color: textColor,
            lineHeight: 1,
          }}
        >
          FREE<span style={{ color: "#00D9FF" }}>SPLIT</span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 8,
            letterSpacing: "0.2em",
            color: dark ? "#526273" : "#8B98A5",
            marginTop: 2,
          }}
        >
          FINANCIAL INTELLIGENCE
        </div>
      </div>
    </div>
  );
}

// App icon
function AppIcon({ size = 64 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.22,
        background: "linear-gradient(135deg, #050C14 0%, #07111C 100%)",
        border: "1px solid rgba(0,217,255,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 20px rgba(0,217,255,0.1)",
      }}
    >
      <svg width={size * 0.56} height={size * 0.56} viewBox="0 0 48 48" fill="none">
        <circle cx="14" cy="24" r="6" fill="#02060B" stroke="#00D9FF" strokeWidth="2" />
        <circle cx="14" cy="24" r="3" fill="#00D9FF" />
        <circle cx="34" cy="24" r="6" fill="#02060B" stroke="#00F5A0" strokeWidth="2" />
        <circle cx="34" cy="24" r="3" fill="#00F5A0" />
        <circle cx="24" cy="10" r="4.5" fill="#02060B" stroke="#7C3CFF" strokeWidth="2" />
        <circle cx="24" cy="10" r="2" fill="#7C3CFF" />
        <line x1="20" y1="24" x2="28" y2="24" stroke="#00D9FF" strokeWidth="1.5" strokeOpacity="0.6" />
        <line x1="15" y1="18.5" x2="24" y2="14" stroke="#7C3CFF" strokeWidth="1.2" strokeOpacity="0.5" />
        <line x1="33" y1="18.5" x2="24" y2="14" stroke="#7C3CFF" strokeWidth="1.2" strokeOpacity="0.5" />
      </svg>
    </div>
  );
}

// Monogram
function Monogram({ size = 48 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "rgba(0,217,255,0.07)",
        border: "1px solid rgba(0,217,255,0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 12px rgba(0,217,255,0.1)",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontWeight: 700,
          fontSize: size * 0.38,
          color: "#00D9FF",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        FS
      </span>
    </div>
  );
}

const BRAND_COLORS = [
  { name: "CYAN", hex: "#00D9FF", label: "Primary Action / Information", role: "primary" },
  { name: "ELECTRIC GREEN", hex: "#00F5A0", label: "Positive Balance / Success", role: "success" },
  { name: "PURPLE", hex: "#7C3CFF", label: "AI / Analytics / Intelligence", role: "intelligence" },
  { name: "AMBER", hex: "#FFAA00", label: "Pending / Attention / Owes", role: "warning" },
  { name: "DANGER", hex: "#FF4D6D", label: "Error / Negative / Warning", role: "danger" },
];

const NEUTRALS = [
  { name: "BG", hex: "#02060B" },
  { name: "CARD", hex: "#07111C" },
  { name: "BORDER", hex: "#123043" },
  { name: "MUTED", hex: "#526273" },
  { name: "SECONDARY", hex: "#8A98A8" },
  { name: "PRIMARY", hex: "#F4F8FC" },
];

const PERSONALITY = ["INTELLIGENT", "PRECISE", "FUTURISTIC", "TRUSTWORTHY", "MINIMAL", "PREMIUM", "FRIENDLY"];

export default function BrandPage() {
  return (
    <div
      className="w-full min-h-full hud-grid-subtle"
      style={{ background: "var(--bg)", padding: "48px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Page header */}
        <div className="mb-16">
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "var(--cyan)",
              opacity: 0.6,
              marginBottom: 8,
            }}
          >
            02 — BRAND
          </div>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 40,
              fontWeight: 700,
              letterSpacing: "0.04em",
              color: "var(--text-primary)",
              marginBottom: 8,
            }}
          >
            Brand Foundation
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-secondary)", maxWidth: 520 }}>
            FreeSplit turns shared expenses into a clear financial network—so everyone knows what they paid, what they owe, and what needs to be settled.
          </p>
        </div>

        {/* Logo section */}
        <div className="mb-12">
          <SectionLabel num="A" title="Logo Variants" />
          <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>

            {/* Primary logo dark */}
            <HudCard>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  color: "var(--text-muted)",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                Primary — Dark
              </div>
              <LogoPrimary dark />
            </HudCard>

            {/* Primary logo light */}
            <HudCard>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  color: "var(--text-muted)",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                Primary — Light
              </div>
              <div
                style={{
                  background: "#F5F8FB",
                  borderRadius: 12,
                  padding: "16px 20px",
                  display: "inline-flex",
                }}
              >
                <LogoPrimary dark={false} />
              </div>
            </HudCard>

            {/* Icon-only + monogram */}
            <HudCard>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  color: "var(--text-muted)",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                Icon Variants
              </div>
              <div className="flex items-center gap-6 flex-wrap">
                <div className="flex flex-col items-center gap-2">
                  <AppIcon size={64} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.1em" }}>APP ICON</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <AppIcon size={48} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.1em" }}>SMALL</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Monogram size={48} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.1em" }}>MONOGRAM</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Monogram size={32} />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.1em" }}>MICRO</span>
                </div>
              </div>
            </HudCard>

            {/* Horizontal lockup */}
            <HudCard>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.15em",
                  color: "var(--text-muted)",
                  marginBottom: 20,
                  textTransform: "uppercase",
                }}
              >
                Horizontal Lockup
              </div>
              <div className="flex flex-col gap-4">
                <LogoPrimary dark />
                <div style={{ height: 1, background: "var(--border-color)" }} />
                <div className="flex items-center gap-2">
                  <Monogram size={28} />
                  <span
                    style={{
                      fontFamily: "var(--font-display)",
                      fontWeight: 600,
                      fontSize: 16,
                      letterSpacing: "0.08em",
                      color: "var(--text-primary)",
                    }}
                  >
                    FREE<span style={{ color: "#00D9FF" }}>SPLIT</span>
                  </span>
                </div>
              </div>
            </HudCard>
          </div>
        </div>

        {/* Do / Don't */}
        <div className="mb-12">
          <SectionLabel num="B" title="Logo Usage" />
          <div className="grid gap-4" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <HudCard>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#00F5A0", boxShadow: "0 0 6px #00F5A0" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "#00F5A0" }}>DO</span>
              </div>
              <ul className="flex flex-col gap-2">
                {["Use on dark or very light backgrounds only", "Maintain minimum clear space equal to logo height", "Use provided color versions only", "Scale proportionally from center"].map((item) => (
                  <li key={item} className="flex items-start gap-2" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)" }}>
                    <span style={{ color: "#00F5A0", marginTop: 1 }}>✓</span> {item}
                  </li>
                ))}
              </ul>
            </HudCard>
            <HudCard>
              <div className="flex items-center gap-2 mb-4">
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF4D6D", boxShadow: "0 0 6px #FF4D6D" }} />
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "#FF4D6D" }}>DON'T</span>
              </div>
              <ul className="flex flex-col gap-2">
                {["Recolor or modify the logo nodes", "Apply drop shadows or heavy effects", "Place on busy or mid-tone backgrounds", "Stretch, rotate, or distort the mark"].map((item) => (
                  <li key={item} className="flex items-start gap-2" style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)" }}>
                    <span style={{ color: "#FF4D6D", marginTop: 1 }}>✕</span> {item}
                  </li>
                ))}
              </ul>
            </HudCard>
          </div>
        </div>

        {/* Brand colors */}
        <div className="mb-12">
          <SectionLabel num="C" title="Brand Colors" />
          <div className="grid gap-3" style={{ gridTemplateColumns: "repeat(5, 1fr)" }}>
            {BRAND_COLORS.map((c) => (
              <div key={c.name}>
                <div
                  style={{
                    height: 80,
                    borderRadius: 12,
                    background: c.hex,
                    marginBottom: 10,
                    boxShadow: `0 4px 20px ${c.hex}30`,
                  }}
                />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: "var(--text-primary)", fontWeight: 600 }}>{c.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--cyan)", opacity: 0.7, marginTop: 2 }}>{c.hex}</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "var(--text-muted)", marginTop: 4, lineHeight: 1.4 }}>{c.label}</div>
              </div>
            ))}
          </div>

          {/* Neutrals */}
          <div className="grid gap-2 mt-6" style={{ gridTemplateColumns: "repeat(6, 1fr)" }}>
            {NEUTRALS.map((c) => (
              <div key={c.name} className="flex flex-col gap-1">
                <div
                  style={{
                    height: 40,
                    borderRadius: 8,
                    background: c.hex,
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em", color: "var(--text-muted)" }}>{c.name}</div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-muted)", opacity: 0.6 }}>{c.hex}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Brand personality */}
        <div className="mb-12">
          <SectionLabel num="D" title="Brand Personality" />
          <div className="flex flex-wrap gap-2">
            {PERSONALITY.map((trait, i) => (
              <div
                key={trait}
                style={{
                  padding: "8px 16px",
                  border: "1px solid rgba(0,217,255,0.2)",
                  borderRadius: 6,
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  letterSpacing: "0.15em",
                  color: i % 3 === 0 ? "#00D9FF" : i % 3 === 1 ? "#7C3CFF" : "#00F5A0",
                  background: "rgba(0,217,255,0.03)",
                }}
              >
                {trait}
              </div>
            ))}
          </div>
        </div>

        {/* Tagline */}
        <div>
          <SectionLabel num="E" title="Tagline & Brand Voice" />
          <HudCard>
            <div className="flex flex-col gap-6">
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--text-muted)", marginBottom: 8 }}>PRIMARY TAGLINE</div>
                <p
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(20px, 3vw, 32px)",
                    fontWeight: 600,
                    color: "var(--text-primary)",
                    letterSpacing: "0.02em",
                    lineHeight: 1.2,
                  }}
                >
                  "Split smarter.{" "}
                  <span style={{ color: "var(--cyan)" }}>Settle simpler.</span>"
                </p>
              </div>
              <div style={{ height: 1, background: "var(--border-color)" }} />
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--text-muted)", marginBottom: 8 }}>BRAND STATEMENT</div>
                <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.6, maxWidth: 560 }}>
                  FreeSplit turns shared expenses into a clear financial network—so everyone knows what they paid, what they owe, and what needs to be settled.
                </p>
              </div>
            </div>
          </HudCard>
        </div>
      </div>
    </div>
  );
}
