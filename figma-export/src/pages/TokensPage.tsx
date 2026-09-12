import { useState } from "react";

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "var(--cyan)", opacity: 0.7 }}>{num}</span>
      <div style={{ height: 1, width: 24, background: "rgba(0,217,255,0.2)" }} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase" }}>{title}</span>
    </div>
  );
}

function TokenRow({ name, value, swatch, dark }: { name: string; value: string; swatch?: string; dark: boolean }) {
  return (
    <div
      className="flex items-center gap-4 py-3"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      {swatch && (
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 6,
            background: swatch,
            border: "1px solid rgba(255,255,255,0.06)",
            flexShrink: 0,
          }}
        />
      )}
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: dark ? "#F4F8FC" : "#101923" }}>{name}</div>
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: dark ? "#8A98A8" : "#647381" }}>{value}</div>
    </div>
  );
}

function TypographyRow({ label, size, weight, tracking, mono = false, dark }: {
  label: string; size: string; weight: number; tracking?: string; mono?: boolean; dark: boolean;
}) {
  const textColor = dark ? "#F4F8FC" : "#101923";
  const mutedColor = dark ? "#526273" : "#8B98A5";
  return (
    <div className="py-4" style={{ borderBottom: `1px solid ${dark ? "#123043" : "#D6E2EA"}` }}>
      <div className="flex items-baseline gap-4 flex-wrap">
        <div
          style={{
            fontFamily: mono ? "var(--font-mono)" : "var(--font-display)",
            fontSize: size,
            fontWeight: weight,
            letterSpacing: tracking || "normal",
            color: textColor,
            lineHeight: 1.2,
          }}
        >
          {label}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: mutedColor, letterSpacing: "0.1em", marginLeft: "auto" }}>
          {size} / {weight}
        </div>
      </div>
    </div>
  );
}

const DARK_COLORS = [
  { name: "bg", label: "Background", hex: "#02060B" },
  { name: "bg-secondary", label: "Secondary Background", hex: "#050C14" },
  { name: "card", label: "Card", hex: "#07111C" },
  { name: "card-elevated", label: "Elevated Card", hex: "#0A1622" },
  { name: "border", label: "Border", hex: "#123043" },
  { name: "cyan", label: "Primary Cyan", hex: "#00D9FF" },
  { name: "green", label: "Electric Green", hex: "#00F5A0" },
  { name: "purple", label: "Purple", hex: "#7C3CFF" },
  { name: "amber", label: "Amber", hex: "#FFAA00" },
  { name: "danger", label: "Danger", hex: "#FF4D6D" },
  { name: "text-primary", label: "Primary Text", hex: "#F4F8FC" },
  { name: "text-secondary", label: "Secondary Text", hex: "#8A98A8" },
  { name: "text-muted", label: "Muted Text", hex: "#526273" },
];

const LIGHT_COLORS = [
  { name: "bg", label: "Background", hex: "#F5F8FB" },
  { name: "card", label: "Card", hex: "#FFFFFF" },
  { name: "secondary-surface", label: "Secondary Surface", hex: "#EEF4F8" },
  { name: "border", label: "Border", hex: "#D6E2EA" },
  { name: "text-primary", label: "Primary Text", hex: "#101923" },
  { name: "text-secondary", label: "Secondary Text", hex: "#647381" },
  { name: "text-muted", label: "Muted Text", hex: "#8B98A5" },
  { name: "cyan", label: "Cyan", hex: "#009FC2" },
  { name: "green", label: "Green", hex: "#00A875" },
  { name: "purple", label: "Purple", hex: "#6840D9" },
  { name: "amber", label: "Amber", hex: "#D88900" },
  { name: "danger", label: "Danger", hex: "#D9365E" },
];

const SPACING = [4, 8, 12, 16, 20, 24, 32, 40, 48, 64];
const RADII = [
  { name: "Small", value: 8 },
  { name: "Medium", value: 12 },
  { name: "Large", value: 16 },
  { name: "HUD", value: 20 },
];

export default function TokensPage() {
  const [isDark, setIsDark] = useState(true);

  const bg = isDark ? "#02060B" : "#F5F8FB";
  const card = isDark ? "#07111C" : "#FFFFFF";
  const border = isDark ? "#123043" : "#D6E2EA";
  const textPrimary = isDark ? "#F4F8FC" : "#101923";
  const textMuted = isDark ? "#526273" : "#8B98A5";
  const cyan = isDark ? "#00D9FF" : "#009FC2";
  const colors = isDark ? DARK_COLORS : LIGHT_COLORS;

  return (
    <div
      className="w-full min-h-full transition-colors duration-300"
      style={{ background: bg, padding: "48px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header with mode toggle */}
        <div className="flex items-start justify-between mb-16 flex-wrap gap-4">
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: cyan, opacity: 0.6, marginBottom: 8 }}>
              03 — DESIGN TOKENS
            </div>
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 40,
                fontWeight: 700,
                letterSpacing: "0.04em",
                color: textPrimary,
                marginBottom: 8,
              }}
            >
              Design Tokens
            </h1>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: isDark ? "#8A98A8" : "#647381" }}>
              The complete token system powering FreeSplit's visual identity.
            </p>
          </div>

          {/* Mode toggle */}
          <button
            onClick={() => setIsDark(!isDark)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: 8,
              border: `1px solid ${border}`,
              background: card,
              cursor: "pointer",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.1em",
              color: textPrimary,
              transition: "all 0.2s",
            }}
          >
            <span style={{ fontSize: 14 }}>{isDark ? "☀️" : "🌑"}</span>
            {isDark ? "LIGHT MODE" : "DARK MODE"}
          </button>
        </div>

        <div className="grid gap-8" style={{ gridTemplateColumns: "1fr 1fr" }}>

          {/* Color tokens */}
          <div
            style={{
              background: card,
              border: `1px solid ${border}`,
              borderRadius: 16,
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {isDark && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.2), transparent)" }} />
            )}
            <SectionLabel num="A" title="Colors" />
            <div>
              {colors.map((c) => (
                <TokenRow key={c.name} name={`--${c.name}`} value={c.hex} swatch={c.hex} dark={isDark} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* Typography */}
            <div
              style={{
                background: card,
                border: `1px solid ${border}`,
                borderRadius: 16,
                padding: 24,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isDark && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.2), transparent)" }} />
              )}
              <SectionLabel num="B" title="Typography" />
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: textMuted, marginBottom: 8 }}>SPACE GROTESK — Display</div>
                <TypographyRow label="Display" size="36px" weight={700} tracking="-0.01em" dark={isDark} />
                <TypographyRow label="Heading 1" size="28px" weight={700} dark={isDark} />
                <TypographyRow label="Heading 2" size="22px" weight={600} dark={isDark} />
                <TypographyRow label="Heading 3" size="18px" weight={600} dark={isDark} />
                <TypographyRow label="Title" size="16px" weight={500} dark={isDark} />
              </div>
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: textMuted, marginBottom: 8, marginTop: 12 }}>INTER — Body</div>
                <TypographyRow label="Body Large" size="16px" weight={400} dark={isDark} />
                <TypographyRow label="Body" size="14px" weight={400} dark={isDark} />
                <TypographyRow label="Body Small" size="12px" weight={400} dark={isDark} />
                <TypographyRow label="Caption" size="11px" weight={400} dark={isDark} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: textMuted, marginBottom: 8, marginTop: 12 }}>JETBRAINS MONO — Technical</div>
                <TypographyRow label="TECHNICAL LABEL" size="10px" weight={500} tracking="0.2em" mono dark={isDark} />
                <TypographyRow label="₹8,420" size="28px" weight={600} mono dark={isDark} />
                <TypographyRow label="₹2,350" size="20px" weight={500} mono dark={isDark} />
                <TypographyRow label="₹450" size="14px" weight={400} mono dark={isDark} />
              </div>
            </div>

            {/* Spacing */}
            <div
              style={{
                background: card,
                border: `1px solid ${border}`,
                borderRadius: 16,
                padding: 24,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isDark && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.2), transparent)" }} />
              )}
              <SectionLabel num="C" title="Spacing — 8pt Grid" />
              <div className="flex flex-col gap-2">
                {SPACING.map((s) => (
                  <div key={s} className="flex items-center gap-3">
                    <div
                      style={{
                        width: s,
                        height: 16,
                        background: `linear-gradient(90deg, ${cyan}, ${isDark ? "#7C3CFF" : "#6840D9"})`,
                        borderRadius: 2,
                        opacity: 0.7,
                        flexShrink: 0,
                      }}
                    />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: textMuted, letterSpacing: "0.08em" }}>{s}px</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Radii */}
            <div
              style={{
                background: card,
                border: `1px solid ${border}`,
                borderRadius: 16,
                padding: 24,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isDark && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.2), transparent)" }} />
              )}
              <SectionLabel num="D" title="Border Radius" />
              <div className="flex gap-4 flex-wrap">
                {RADII.map(({ name, value }) => (
                  <div key={name} className="flex flex-col items-center gap-2">
                    <div
                      style={{
                        width: 56,
                        height: 56,
                        border: `1.5px solid ${isDark ? "rgba(0,217,255,0.3)" : "#009FC2"}`,
                        borderRadius: value,
                        background: isDark ? "rgba(0,217,255,0.04)" : "rgba(0,159,194,0.06)",
                      }}
                    />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: textMuted, letterSpacing: "0.08em" }}>{name}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: cyan, opacity: 0.7 }}>{value}px</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Semantic color system */}
            <div
              style={{
                background: card,
                border: `1px solid ${border}`,
                borderRadius: 16,
                padding: 24,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {isDark && (
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.2), transparent)" }} />
              )}
              <SectionLabel num="E" title="Semantic Colors" />
              <div className="flex flex-col gap-3">
                {[
                  { color: isDark ? "#00D9FF" : "#009FC2", label: "CYAN", desc: "Primary action / Information" },
                  { color: isDark ? "#00F5A0" : "#00A875", label: "GREEN", desc: "Positive balance / Success" },
                  { color: isDark ? "#FFAA00" : "#D88900", label: "AMBER", desc: "Pending / Attention / Owes" },
                  { color: isDark ? "#7C3CFF" : "#6840D9", label: "PURPLE", desc: "AI / Analytics / Intelligence" },
                  { color: isDark ? "#FF4D6D" : "#D9365E", label: "DANGER", desc: "Error / Warning / Negative" },
                ].map(({ color, label, desc }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: color, boxShadow: `0 0 6px ${color}80`, flexShrink: 0 }} />
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.1em", color: color, width: 72, flexShrink: 0 }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: isDark ? "#8A98A8" : "#647381" }}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Elevation */}
        <div className="mt-8">
          <div
            style={{
              background: card,
              border: `1px solid ${border}`,
              borderRadius: 16,
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {isDark && (
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.2), transparent)" }} />
            )}
            <SectionLabel num="F" title="Elevation & Shadow" />
            <div className="flex gap-6 flex-wrap">
              {[
                { label: "Level 0", shadow: "none", bg: isDark ? "#02060B" : "#F5F8FB" },
                { label: "Level 1", shadow: isDark ? "0 0 0 1px #123043" : "0 1px 4px rgba(16,25,35,0.08)", bg: isDark ? "#07111C" : "#FFFFFF" },
                { label: "Level 2", shadow: isDark ? "0 0 0 1px rgba(0,217,255,0.15), 0 4px 20px rgba(0,217,255,0.05)" : "0 2px 12px rgba(16,25,35,0.12)", bg: isDark ? "#0A1622" : "#FFFFFF" },
                { label: "Active / Focus", shadow: isDark ? "0 0 0 1px rgba(0,217,255,0.5), 0 0 16px rgba(0,217,255,0.12)" : "0 0 0 2px rgba(0,159,194,0.3)", bg: isDark ? "#0A1622" : "#FFFFFF" },
              ].map(({ label, shadow, bg: cardBg }) => (
                <div key={label} className="flex flex-col items-center gap-3">
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                      background: cardBg,
                      boxShadow: shadow,
                    }}
                  />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.08em", color: textMuted }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Grid token */}
        <div className="mt-8">
          <div
            style={{
              background: card,
              border: `1px solid ${border}`,
              borderRadius: 16,
              padding: 24,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <SectionLabel num="G" title="Background Grid Token" />
            <div className="flex gap-4 flex-wrap">
              {[
                {
                  label: "HUD Grid — Dark",
                  bg: "#02060B",
                  gridColor: "rgba(0,217,255,0.04)",
                },
                {
                  label: "Subtle Grid — Dark",
                  bg: "#050C14",
                  gridColor: "rgba(0,217,255,0.02)",
                },
                {
                  label: "Subtle Grid — Light",
                  bg: "#F5F8FB",
                  gridColor: "rgba(0,159,194,0.06)",
                },
              ].map(({ label, bg: gridBg, gridColor }) => (
                <div key={label} className="flex flex-col gap-2">
                  <div
                    style={{
                      width: 160,
                      height: 100,
                      borderRadius: 8,
                      background: gridBg,
                      border: `1px solid ${border}`,
                      backgroundImage: `linear-gradient(${gridColor} 1px, transparent 1px), linear-gradient(90deg, ${gridColor} 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: textMuted, letterSpacing: "0.08em" }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
