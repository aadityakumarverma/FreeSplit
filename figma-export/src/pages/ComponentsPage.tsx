import { useState } from "react";
import type React from "react";

// --- Shared primitives ---

function SectionLabel({ num, title }: { num: string; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.15em", color: "#00D9FF", opacity: 0.7 }}>{num}</span>
      <div style={{ height: 1, width: 24, background: "rgba(0,217,255,0.2)" }} />
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: "var(--text-muted)", textTransform: "uppercase" }}>{title}</span>
    </div>
  );
}

function Card({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
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
        ...style,
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.15), transparent)" }} />
      {children}
    </div>
  );
}

// --- BUTTONS ---

function Btn({
  variant = "primary",
  size = "default",
  disabled = false,
  loading = false,
  icon = false,
  children,
}: {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
  loading?: boolean;
  icon?: boolean;
  children: React.ReactNode;
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: disabled ? "rgba(0,217,255,0.08)" : "linear-gradient(135deg, rgba(0,217,255,0.15), rgba(0,217,255,0.08))",
      border: "1px solid rgba(0,217,255,0.4)",
      color: disabled ? "rgba(0,217,255,0.3)" : "#00D9FF",
      boxShadow: disabled ? "none" : "0 0 12px rgba(0,217,255,0.1)",
    },
    secondary: {
      background: "rgba(124,60,255,0.08)",
      border: "1px solid rgba(124,60,255,0.3)",
      color: disabled ? "rgba(124,60,255,0.3)" : "#7C3CFF",
    },
    ghost: {
      background: "transparent",
      border: "1px solid var(--border-color)",
      color: disabled ? "var(--text-muted)" : "var(--text-secondary)",
    },
    danger: {
      background: "rgba(255,77,109,0.08)",
      border: "1px solid rgba(255,77,109,0.3)",
      color: disabled ? "rgba(255,77,109,0.3)" : "#FF4D6D",
    },
  };

  const paddingMap: Record<string, string> = {
    sm: "6px 14px",
    default: "10px 20px",
    lg: "14px 28px",
  };
  const fontSizeMap: Record<string, number> = { sm: 11, default: 12, lg: 13 };

  return (
    <button
      disabled={disabled}
      style={{
        ...styles[variant],
        padding: icon ? "10px" : paddingMap[size],
        borderRadius: 8,
        fontFamily: "var(--font-mono)",
        fontSize: fontSizeMap[size],
        letterSpacing: "0.12em",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        transition: "all 0.15s",
        opacity: disabled ? 0.5 : 1,
        whiteSpace: "nowrap",
      }}
    >
      {loading && (
        <div
          style={{
            width: 12,
            height: 12,
            border: "1.5px solid currentColor",
            borderTopColor: "transparent",
            borderRadius: "50%",
            animation: "spin-slow 0.6s linear infinite",
          }}
        />
      )}
      {children}
    </button>
  );
}

function FAB() {
  return (
    <button
      style={{
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "linear-gradient(135deg, #00D9FF, #7C3CFF)",
        border: "none",
        color: "#02060B",
        fontSize: 24,
        fontWeight: 700,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 20px rgba(0,217,255,0.3), 0 4px 16px rgba(0,0,0,0.4)",
      }}
    >
      +
    </button>
  );
}

// --- INPUTS ---

function Input({
  type = "text",
  label,
  placeholder,
  value,
  state = "default",
  prefix,
}: {
  type?: string;
  label: string;
  placeholder?: string;
  value?: string;
  state?: "default" | "focused" | "filled" | "error" | "disabled";
  prefix?: string;
}) {
  const borderMap: Record<string, string> = {
    default: "var(--border-color)",
    focused: "rgba(0,217,255,0.5)",
    filled: "rgba(0,245,160,0.3)",
    error: "rgba(255,77,109,0.5)",
    disabled: "rgba(18,48,67,0.4)",
  };
  const shadowMap: Record<string, string> = {
    focused: "0 0 8px rgba(0,217,255,0.1)",
    error: "0 0 8px rgba(255,77,109,0.1)",
    default: "none",
    filled: "none",
    disabled: "none",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>
        {label}
      </span>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "var(--card-elevated)",
          border: `1px solid ${borderMap[state]}`,
          borderRadius: 8,
          padding: prefix ? "10px 12px" : "10px 12px",
          boxShadow: shadowMap[state] || "none",
          opacity: state === "disabled" ? 0.5 : 1,
        }}
      >
        {prefix && (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "#00D9FF", fontWeight: 600, flexShrink: 0 }}>
            {prefix}
          </span>
        )}
        <span
          style={{
            fontFamily: prefix ? "var(--font-mono)" : "var(--font-body)",
            fontSize: prefix ? 16 : 14,
            color: value ? "var(--text-primary)" : "var(--text-muted)",
            fontWeight: prefix ? 500 : 400,
          }}
        >
          {value || placeholder || ""}
        </span>
        {state === "error" && (
          <span style={{ color: "#FF4D6D", marginLeft: "auto", fontSize: 14 }}>!</span>
        )}
        {state === "focused" && (
          <div
            className="animate-blink"
            style={{ width: 2, height: 16, background: "#00D9FF", marginLeft: 2, flexShrink: 0 }}
          />
        )}
      </div>
      {state === "error" && (
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#FF4D6D", letterSpacing: "0.08em" }}>AMOUNT IS REQUIRED</span>
      )}
    </div>
  );
}

// --- STATUS BADGES ---

function StatusBadge({ status }: { status: "online" | "synced" | "pending" | "error" | "success" }) {
  const map = {
    online: { color: "#00F5A0", label: "ONLINE", dot: "●" },
    synced: { color: "#00D9FF", label: "SYNCED", dot: "●" },
    pending: { color: "#FFAA00", label: "PENDING", dot: "◌" },
    error: { color: "#FF4D6D", label: "ERROR", dot: "●" },
    success: { color: "#00F5A0", label: "SUCCESS", dot: "●" },
  };
  const { color, label, dot } = map[status];

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        padding: "4px 10px",
        borderRadius: 4,
        border: `1px solid ${color}30`,
        background: `${color}0A`,
      }}
    >
      <span style={{ color, fontSize: 8 }}>{dot}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", color }}>{label}</span>
    </div>
  );
}

// --- HUD CARD ---

function HudModule({ num, title, status }: { num: string; title: string; status: "online" | "synced" | "pending" }) {
  return (
    <div
      style={{
        padding: "14px 16px",
        border: "1px solid var(--border-color)",
        borderRadius: 12,
        background: "var(--card-elevated)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 2,
          background: status === "online" ? "#00F5A0" : status === "synced" ? "#00D9FF" : "#FFAA00",
          borderRadius: "2px 0 0 2px",
          boxShadow: `0 0 8px ${status === "online" ? "#00F5A040" : status === "synced" ? "#00D9FF40" : "#FFAA0040"}`,
        }}
      />
      <div style={{ paddingLeft: 12 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 4 }}>{num}</div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: "var(--text-primary)", letterSpacing: "0.05em", marginBottom: 6 }}>{title}</div>
        <StatusBadge status={status} />
      </div>
    </div>
  );
}

// --- FINANCIAL CARDS ---

function BalanceCard({ amount, label, variant }: { amount: string; label: string; variant: "positive" | "negative" | "neutral" }) {
  const color = variant === "positive" ? "#00F5A0" : variant === "negative" ? "#FF4D6D" : "#00D9FF";
  return (
    <div
      style={{
        background: "var(--card-elevated)",
        border: `1px solid ${color}20`,
        borderRadius: 12,
        padding: "16px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", inset: 0, background: `radial-gradient(circle at 80% 20%, ${color}06, transparent 60%)` }} />
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase" }}>{label}</div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700, color, letterSpacing: "0.02em" }}>{amount}</div>
    </div>
  );
}

function TransactionRow({ name, amount, direction, date, avatar }: { name: string; amount: string; direction: "owe" | "owed"; date: string; avatar: string }) {
  const color = direction === "owed" ? "#00F5A0" : "#FFAA00";
  const prefix = direction === "owed" ? "+" : "-";
  return (
    <div className="flex items-center gap-3 py-3" style={{ borderBottom: "1px solid var(--border-color)" }}>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "linear-gradient(135deg, rgba(0,217,255,0.15), rgba(124,60,255,0.15))",
          border: "1px solid rgba(0,217,255,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-display)",
          fontSize: 13,
          fontWeight: 600,
          color: "#00D9FF",
          flexShrink: 0,
        }}
      >
        {avatar}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "var(--text-primary)" }}>{name}</div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.08em", marginTop: 2 }}>{date}</div>
      </div>
      <div
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 14,
          fontWeight: 600,
          color,
        }}
      >
        {prefix}{amount}
      </div>
    </div>
  );
}

function GroupCard({ name, members, total, active }: { name: string; members: number; total: string; active?: boolean }) {
  return (
    <div
      style={{
        background: "var(--card-elevated)",
        border: `1px solid ${active ? "rgba(0,217,255,0.3)" : "var(--border-color)"}`,
        borderRadius: 12,
        padding: 16,
        position: "relative",
        overflow: "hidden",
        boxShadow: active ? "0 0 12px rgba(0,217,255,0.08)" : "none",
      }}
    >
      {active && (
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.4), transparent)" }} />
      )}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", color: "var(--text-primary)", marginBottom: 4 }}>{name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>0{members} MEMBERS</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, color: "#00D9FF" }}>{total}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "var(--text-muted)", letterSpacing: "0.1em", marginTop: 2 }}>TOTAL</div>
        </div>
      </div>
      <div className="flex gap-1 mt-3">
        {Array.from({ length: Math.min(members, 5) }, (_, i) => (
          <div
            key={i}
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${["rgba(0,217,255,0.2)", "rgba(124,60,255,0.2)", "rgba(0,245,160,0.2)", "rgba(255,170,0,0.2)", "rgba(255,77,109,0.2)"][i]}, transparent)`,
              border: "1px solid rgba(0,217,255,0.15)",
              marginLeft: i > 0 ? -8 : 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-display)",
              fontSize: 9,
              fontWeight: 600,
              color: ["#00D9FF", "#7C3CFF", "#00F5A0", "#FFAA00", "#FF4D6D"][i],
            }}
          >
            {["A", "P", "R", "S", "M"][i]}
          </div>
        ))}
      </div>
    </div>
  );
}

// --- BOTTOM NAVIGATION ---

function BottomNav() {
  const [active, setActive] = useState("groups");
  const tabs = [
    { id: "home", label: "HOME", icon: "⌂" },
    { id: "groups", label: "GROUPS", icon: "⬡" },
    { id: "add", label: "ADD", icon: "+", fab: true },
    { id: "activity", label: "ACTIVITY", icon: "⌁" },
    { id: "profile", label: "PROFILE", icon: "○" },
  ];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: "8px 4px 20px",
        background: "var(--card)",
        borderTop: "1px solid var(--border-color)",
        borderRadius: "0 0 24px 24px",
      }}
    >
      {tabs.map((tab) => {
        if (tab.fab) {
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              style={{
                width: 48,
                height: 48,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #00D9FF, #7C3CFF)",
                border: "none",
                color: "#02060B",
                fontSize: 22,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 16px rgba(0,217,255,0.3)",
                marginTop: -12,
              }}
            >
              {tab.icon}
            </button>
          );
        }
        const isActive = active === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 3,
              padding: "6px 8px",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              color: isActive ? "#00D9FF" : "var(--text-muted)",
              transition: "color 0.15s",
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1 }}>{tab.icon}</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 7, letterSpacing: "0.12em" }}>{tab.label}</span>
            {isActive && (
              <div style={{ width: 16, height: 2, borderRadius: 1, background: "#00D9FF", boxShadow: "0 0 6px #00D9FF" }} />
            )}
          </button>
        );
      })}
    </div>
  );
}

// --- TOP APP BAR ---

function TopAppBar({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 20px",
        borderBottom: "1px solid var(--border-color)",
        background: "var(--card)",
      }}
    >
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 700, color: "var(--text-primary)", letterSpacing: "0.03em" }}>{title}</div>
        {subtitle && <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#00D9FF", letterSpacing: "0.12em", opacity: 0.7, marginTop: 2 }}>{subtitle}</div>}
      </div>
      <div className="flex items-center gap-2">
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "rgba(0,217,255,0.08)",
            border: "1px solid rgba(0,217,255,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 14 }}>🔔</span>
        </div>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(0,217,255,0.15), rgba(124,60,255,0.15))",
            border: "1px solid rgba(0,217,255,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display)",
            fontSize: 13,
            fontWeight: 700,
            color: "#00D9FF",
          }}
        >
          A
        </div>
      </div>
    </div>
  );
}

// --- OVERLAYS ---

function Toast({ type = "success", message }: { type?: "success" | "error" | "info" | "pending"; message: string }) {
  const map = {
    success: { color: "#00F5A0", icon: "✓", bg: "rgba(0,245,160,0.08)" },
    error: { color: "#FF4D6D", icon: "✕", bg: "rgba(255,77,109,0.08)" },
    info: { color: "#00D9FF", icon: "i", bg: "rgba(0,217,255,0.08)" },
    pending: { color: "#FFAA00", icon: "◌", bg: "rgba(255,170,0,0.08)" },
  };
  const { color, icon, bg } = map[type];
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        borderRadius: 10,
        background: bg,
        border: `1px solid ${color}30`,
        boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 8px ${color}10`,
      }}
    >
      <div
        style={{
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: `${color}20`,
          border: `1px solid ${color}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-primary)" }}>{message}</span>
    </div>
  );
}

export default function ComponentsPage() {
  const [activeTab, setActiveTab] = useState("buttons");

  const tabs = [
    { id: "buttons", label: "BUTTONS" },
    { id: "inputs", label: "INPUTS" },
    { id: "nav", label: "NAVIGATION" },
    { id: "status", label: "STATUS" },
    { id: "financial", label: "FINANCIAL" },
    { id: "hud", label: "HUD" },
    { id: "overlays", label: "OVERLAYS" },
  ];

  return (
    <div
      className="w-full min-h-full hud-grid-subtle"
      style={{ background: "var(--bg)", padding: "48px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div className="mb-10">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: "var(--cyan)", opacity: 0.6, marginBottom: 8 }}>
            04 — COMPONENTS
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, letterSpacing: "0.04em", color: "var(--text-primary)", marginBottom: 8 }}>
            Component Library
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "var(--text-secondary)" }}>
            Foundational UI components for FreeSplit — dark mode primary.
          </p>
        </div>

        {/* Tab bar */}
        <div className="flex gap-1 flex-wrap mb-8" style={{ borderBottom: "1px solid var(--border-color)", paddingBottom: 0 }}>
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: "8px 16px",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === t.id ? "2px solid #00D9FF" : "2px solid transparent",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                letterSpacing: "0.15em",
                color: activeTab === t.id ? "#00D9FF" : "var(--text-muted)",
                marginBottom: -1,
                transition: "all 0.15s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Buttons */}
        {activeTab === "buttons" && (
          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card>
              <SectionLabel num="A" title="Button Variants" />
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 flex-wrap">
                  <Btn variant="primary">+ ADD EXPENSE</Btn>
                  <Btn variant="secondary">VIEW DETAILS</Btn>
                  <Btn variant="ghost">CANCEL</Btn>
                  <Btn variant="danger">DELETE</Btn>
                </div>
                <div style={{ height: 1, background: "var(--border-color)" }} />
                <div className="flex items-center gap-3 flex-wrap">
                  <Btn variant="primary" size="sm">SMALL</Btn>
                  <Btn variant="primary">DEFAULT</Btn>
                  <Btn variant="primary" size="lg">LARGE</Btn>
                </div>
              </div>
            </Card>
            <Card>
              <SectionLabel num="B" title="Button States" />
              <div className="flex flex-col gap-4">
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 8 }}>DEFAULT / LOADING / DISABLED</div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <Btn variant="primary">SETTLE UP</Btn>
                    <Btn variant="primary" loading>PROCESSING</Btn>
                    <Btn variant="primary" disabled>DISABLED</Btn>
                  </div>
                </div>
                <div style={{ height: 1, background: "var(--border-color)" }} />
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 8 }}>FAB / ICON BUTTON</div>
                  <div className="flex items-center gap-4">
                    <FAB />
                    <Btn variant="secondary" icon>
                      <span style={{ fontSize: 16 }}>↗</span>
                    </Btn>
                    <Btn variant="ghost" icon>
                      <span style={{ fontSize: 16 }}>⋯</span>
                    </Btn>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Inputs */}
        {activeTab === "inputs" && (
          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card>
              <SectionLabel num="A" title="Input States" />
              <div className="flex flex-col gap-4">
                <Input label="Default" placeholder="Enter expense name" state="default" />
                <Input label="Focused" placeholder="Hotel Booking..." state="focused" value="Hotel Boo" />
                <Input label="Filled" value="Hotel Booking, Goa" state="filled" />
                <Input label="Error" value="" state="error" placeholder="Required" />
                <Input label="Disabled" value="Read only" state="disabled" />
              </div>
            </Card>
            <Card>
              <SectionLabel num="B" title="Specialized Inputs" />
              <div className="flex flex-col gap-4">
                <Input label="Amount Input" prefix="₹" value="8,420" state="focused" />
                <Input label="Search" placeholder="Search expenses..." state="default" />
                <Input label="Email" placeholder="aarav@example.com" state="default" />
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "var(--text-muted)", textTransform: "uppercase" }}>Date Selector</span>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      background: "var(--card-elevated)",
                      border: "1px solid var(--border-color)",
                      borderRadius: 8,
                      padding: "10px 12px",
                    }}
                  >
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--text-primary)" }}>15 Aug 2026</span>
                    <span style={{ marginLeft: "auto", fontSize: 14 }}>📅</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Navigation */}
        {activeTab === "nav" && (
          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card>
              <SectionLabel num="A" title="Top App Bar" />
              <div style={{ border: "1px solid var(--border-color)", borderRadius: 16, overflow: "hidden" }}>
                <TopAppBar title="FreeSplit" subtitle="FINANCIAL INTELLIGENCE" />
                <div style={{ padding: 20, background: "var(--bg-secondary)" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>CONTENT AREA</div>
                </div>
              </div>
            </Card>
            <Card>
              <SectionLabel num="B" title="Bottom Navigation" />
              <div style={{ border: "1px solid var(--border-color)", borderRadius: 16, overflow: "hidden" }}>
                <div style={{ height: 80, background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>CONTENT</span>
                </div>
                <BottomNav />
              </div>
            </Card>
            <Card>
              <SectionLabel num="C" title="Tab Bar / Segmented" />
              <div className="flex flex-col gap-4">
                {/* Tab bar */}
                <div className="flex gap-0" style={{ border: "1px solid var(--border-color)", borderRadius: 8, overflow: "hidden" }}>
                  {["ALL", "EXPENSES", "SETTLEMENTS"].map((t, i) => (
                    <button
                      key={t}
                      style={{
                        flex: 1,
                        padding: "8px 4px",
                        background: i === 0 ? "rgba(0,217,255,0.1)" : "transparent",
                        border: "none",
                        borderRight: i < 2 ? "1px solid var(--border-color)" : "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-mono)",
                        fontSize: 8,
                        letterSpacing: "0.1em",
                        color: i === 0 ? "#00D9FF" : "var(--text-muted)",
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Status */}
        {activeTab === "status" && (
          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card>
              <SectionLabel num="A" title="Status Badges" />
              <div className="flex flex-col gap-3">
                <StatusBadge status="online" />
                <StatusBadge status="synced" />
                <StatusBadge status="pending" />
                <StatusBadge status="error" />
                <StatusBadge status="success" />
              </div>
            </Card>
            <Card>
              <SectionLabel num="B" title="Inline Indicators" />
              <div className="flex flex-col gap-3">
                {[
                  { color: "#00F5A0", label: "● ONLINE", sub: "Connected to FreeSplit" },
                  { color: "#00D9FF", label: "● SYNCED", sub: "Last sync: 2 min ago" },
                  { color: "#FFAA00", label: "◌ PENDING", sub: "Awaiting confirmation" },
                  { color: "#FF4D6D", label: "● ERROR", sub: "Sync failed" },
                ].map(({ color, label, sub }) => (
                  <div key={label} className="flex items-center gap-3">
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color, letterSpacing: "0.08em", width: 100 }}>{label}</span>
                    <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "var(--text-muted)" }}>{sub}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Financial */}
        {activeTab === "financial" && (
          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <div className="flex flex-col gap-4">
              <Card>
                <SectionLabel num="A" title="Balance Cards" />
                <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr 1fr" }}>
                  <BalanceCard amount="₹8,420" label="You Are Owed" variant="positive" />
                  <BalanceCard amount="₹2,350" label="You Owe" variant="negative" />
                  <BalanceCard amount="₹10,770" label="Total Spend" variant="neutral" />
                </div>
              </Card>
              <Card>
                <SectionLabel num="B" title="KPI Cards" />
                <div className="grid gap-3" style={{ gridTemplateColumns: "1fr 1fr" }}>
                  {[
                    { label: "GROUPS", value: "04", icon: "⬡", color: "#7C3CFF" },
                    { label: "MEMBERS", value: "12", icon: "○", color: "#00D9FF" },
                    { label: "EXPENSES", value: "38", icon: "⌁", color: "#FFAA00" },
                    { label: "SETTLED", value: "24", icon: "✓", color: "#00F5A0" },
                  ].map(({ label, value, icon, color }) => (
                    <div
                      key={label}
                      style={{
                        padding: "14px 16px",
                        background: "var(--card-elevated)",
                        border: "1px solid var(--border-color)",
                        borderRadius: 12,
                      }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>{label}</span>
                        <span style={{ color, fontSize: 12 }}>{icon}</span>
                      </div>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: 24, fontWeight: 700, color }}>{value}</div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            <div className="flex flex-col gap-4">
              <Card>
                <SectionLabel num="C" title="Transaction Rows" />
                <TransactionRow name="Priya Sharma" amount="₹1,200" direction="owed" date="15 AUG 2026" avatar="P" />
                <TransactionRow name="Aarav Mehta" amount="₹850" direction="owe" date="14 AUG 2026" avatar="A" />
                <TransactionRow name="Rohit Kumar" amount="₹2,100" direction="owed" date="12 AUG 2026" avatar="R" />
                <TransactionRow name="Sneha Patel" amount="₹450" direction="owe" date="10 AUG 2026" avatar="S" />
              </Card>
              <Card>
                <SectionLabel num="D" title="Group Cards" />
                <div className="flex flex-col gap-3">
                  <GroupCard name="GOA TRIP 2026" members={6} total="₹42,850" active />
                  <GroupCard name="OFFICE LUNCH" members={4} total="₹8,200" />
                  <GroupCard name="FLAT EXPENSES" members={3} total="₹15,400" />
                </div>
              </Card>
            </div>
          </div>
        )}

        {/* HUD */}
        {activeTab === "hud" && (
          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card>
              <SectionLabel num="A" title="HUD Modules" />
              <div className="flex flex-col gap-3">
                <HudModule num="01" title="GROUP STATUS" status="online" />
                <HudModule num="02" title="BALANCE ENGINE" status="synced" />
                <HudModule num="03" title="SETTLEMENT ENGINE" status="pending" />
                <HudModule num="04" title="SYNC QUEUE" status="online" />
              </div>
            </Card>
            <Card>
              <SectionLabel num="B" title="Data Nodes & Progress" />
              <div className="flex flex-col gap-6">
                {/* Progress indicators */}
                <div className="flex flex-col gap-3">
                  {[
                    { label: "SETTLEMENT PROGRESS", value: 68, color: "#00D9FF" },
                    { label: "BALANCE CLEARANCE", value: 45, color: "#00F5A0" },
                    { label: "GROUP ACTIVITY", value: 82, color: "#7C3CFF" },
                  ].map(({ label, value, color }) => (
                    <div key={label}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>{label}</span>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color, letterSpacing: "0.08em" }}>{value}%</span>
                      </div>
                      <div style={{ height: 3, background: "var(--border-color)", borderRadius: 2, overflow: "hidden" }}>
                        <div
                          style={{
                            height: "100%",
                            width: `${value}%`,
                            background: `linear-gradient(90deg, ${color}, ${color}80)`,
                            borderRadius: 2,
                            boxShadow: `0 0 6px ${color}60`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Connector line demo */}
                <div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 12 }}>CONNECTOR NODES</div>
                  <div className="flex items-center gap-3">
                    {["A", "B", "C", "D"].map((node, i) => (
                      <div key={node} className="flex items-center gap-3">
                        <div
                          style={{
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "var(--card-elevated)",
                            border: `1.5px solid ${["#00D9FF", "#7C3CFF", "#00F5A0", "#FFAA00"][i]}`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--font-mono)",
                            fontSize: 10,
                            color: ["#00D9FF", "#7C3CFF", "#00F5A0", "#FFAA00"][i],
                            boxShadow: `0 0 8px ${["#00D9FF", "#7C3CFF", "#00F5A0", "#FFAA00"][i]}30`,
                          }}
                        >
                          {node}
                        </div>
                        {i < 3 && (
                          <div style={{ width: 20, height: 1, background: "rgba(0,217,255,0.2)", flexShrink: 0 }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Overlays */}
        {activeTab === "overlays" && (
          <div className="grid gap-6" style={{ gridTemplateColumns: "1fr 1fr" }}>
            <Card>
              <SectionLabel num="A" title="Toast Notifications" />
              <div className="flex flex-col gap-3">
                <Toast type="success" message="Expense added successfully" />
                <Toast type="error" message="Settlement failed — try again" />
                <Toast type="info" message="Balance recalculated" />
                <Toast type="pending" message="Sync in progress..." />
              </div>
            </Card>
            <Card>
              <SectionLabel num="B" title="Bottom Sheet Preview" />
              <div
                style={{
                  border: "1px solid var(--border-color)",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div style={{ height: 80, background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-muted)", letterSpacing: "0.1em" }}>BACKDROP</span>
                </div>
                <div
                  style={{
                    background: "var(--card)",
                    borderTop: "1px solid rgba(0,217,255,0.2)",
                    padding: 20,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 3,
                      background: "var(--border-color)",
                      borderRadius: 2,
                      margin: "0 auto 16px",
                    }}
                  />
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, color: "var(--text-primary)", marginBottom: 4 }}>Settle with Priya</div>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: 16 }}>₹1,200 OUTSTANDING</div>
                  <div className="flex gap-2">
                    <Btn variant="primary">CONFIRM SETTLEMENT</Btn>
                    <Btn variant="ghost">CANCEL</Btn>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <SectionLabel num="C" title="Modal Dialog" />
              <div
                style={{
                  background: "var(--card-elevated)",
                  border: "1px solid rgba(0,217,255,0.2)",
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: "0 0 30px rgba(0,0,0,0.5), 0 0 16px rgba(0,217,255,0.06)",
                }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.4), transparent)", borderRadius: "16px 16px 0 0" }} />
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.15em", color: "#00D9FF", opacity: 0.7, marginBottom: 8 }}>CONFIRM ACTION</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 700, color: "var(--text-primary)", marginBottom: 8 }}>Delete this expense?</div>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "var(--text-secondary)", marginBottom: 16, lineHeight: 1.5 }}>
                  Hotel Booking — ₹8,420 will be removed and group balances will recalculate.
                </div>
                <div className="flex gap-2">
                  <Btn variant="danger">DELETE</Btn>
                  <Btn variant="ghost">KEEP</Btn>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
