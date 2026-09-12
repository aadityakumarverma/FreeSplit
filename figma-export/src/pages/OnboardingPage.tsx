import { useState, useEffect, useRef } from "react";

// Animated network canvas for onboarding screens
function MiniNetworkCanvas({ colors = ["#00D9FF", "#00F5A0", "#7C3CFF"], nodeCount = 12 }: {
  colors?: string[];
  nodeCount?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 2.5 + 1,
      pulse: Math.random() * Math.PI * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.6);
      grad.addColorStop(0, "rgba(0,217,255,0.05)");
      grad.addColorStop(0.5, "rgba(124,60,255,0.03)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.025;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,217,255,${(1 - dist / 130) * 0.15})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      nodes.forEach((n) => {
        const p = Math.sin(n.pulse) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * p, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = p * 0.85;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [colors, nodeCount]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// Mobile phone frame
function PhoneFrame({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <div
      style={{
        width: 320,
        height: 680,
        borderRadius: 44,
        background: "#02060B",
        border: `2px solid ${active ? "rgba(0,217,255,0.4)" : "rgba(18,48,67,0.8)"}`,
        boxShadow: active
          ? "0 0 40px rgba(0,217,255,0.12), 0 20px 60px rgba(0,0,0,0.6)"
          : "0 20px 60px rgba(0,0,0,0.5)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s",
        flexShrink: 0,
      }}
    >
      {/* Status bar */}
      <div
        style={{
          height: 44,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 20px",
          background: "rgba(2,6,11,0.8)",
          borderBottom: "1px solid rgba(18,48,67,0.5)",
          flexShrink: 0,
        }}
      >
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#8A98A8", letterSpacing: "0.08em" }}>9:41</span>
        <div
          style={{
            width: 80,
            height: 20,
            borderRadius: 10,
            background: "rgba(7,17,28,0.9)",
            border: "1px solid rgba(18,48,67,0.6)",
          }}
        />
        <div className="flex items-center gap-1">
          <div style={{ width: 14, height: 8, borderRadius: 2, border: "1px solid #526273", position: "relative" }}>
            <div style={{ position: "absolute", left: 1, top: 1, bottom: 1, width: "70%", background: "#00F5A0", borderRadius: 1 }} />
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#526273" }}>●●●●</span>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        {children}
      </div>

      {/* Home indicator */}
      <div
        style={{
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <div style={{ width: 100, height: 4, borderRadius: 2, background: "rgba(18,48,67,0.8)" }} />
      </div>
    </div>
  );
}

function TechLabel({ children, color = "#00D9FF" }: { children: React.ReactNode; color?: string }) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 5,
        fontFamily: "var(--font-mono)",
        fontSize: 9,
        letterSpacing: "0.15em",
        color,
        opacity: 0.8,
      }}
    >
      <span style={{ fontSize: 7 }}>●</span>
      {children}
    </div>
  );
}

// Onboarding screen 1 - network visual
function Screen1() {
  return (
    <div
      className="hud-grid"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#02060B",
        position: "relative",
      }}
    >
      <MiniNetworkCanvas nodeCount={14} />

      {/* Visual area */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
        {/* Central large network visualization */}
        <div style={{ position: "relative", width: 200, height: 180 }}>
          {/* Central node */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "rgba(0,217,255,0.1)",
              border: "2px solid #00D9FF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(0,217,255,0.3)",
              zIndex: 2,
            }}
          >
            <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#00D9FF", boxShadow: "0 0 10px #00D9FF" }} />
          </div>

          {/* Outer ring */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 160,
              height: 160,
              borderRadius: "50%",
              border: "1px solid rgba(0,217,255,0.08)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 100,
              height: 100,
              borderRadius: "50%",
              border: "1px solid rgba(0,217,255,0.06)",
            }}
          />

          {/* Satellite nodes */}
          {[
            { angle: -60, color: "#00F5A0", label: "Aarav", x: 88, y: 8 },
            { angle: 20, color: "#7C3CFF", label: "Priya", x: 164, y: 72 },
            { angle: 140, color: "#00D9FF", label: "You", x: 64, y: 148 },
            { angle: 200, color: "#FFAA00", label: "Rohit", x: 8, y: 60 },
            { angle: 280, color: "#FF4D6D", label: "Sneha", x: 148, y: 148 },
          ].map(({ color, label, x, y }) => (
            <div
              key={label}
              style={{
                position: "absolute",
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: "50%",
                  background: `${color}15`,
                  border: `1.5px solid ${color}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 10px ${color}30`,
                }}
              >
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color, fontWeight: 600 }}>
                  {label[0]}
                </span>
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 7,
                  color: "#526273",
                  letterSpacing: "0.08em",
                  textAlign: "center",
                  marginTop: 3,
                }}
              >
                {label}
              </div>
            </div>
          ))}

          {/* SVG connector lines */}
          <svg
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
            viewBox="0 0 200 180"
          >
            {[
              [100, 90, 88, 8],
              [100, 90, 164, 72],
              [100, 90, 64, 148],
              [100, 90, 8, 60],
              [100, 90, 148, 148],
            ].map(([x1, y1, x2, y2], i) => (
              <line
                key={i}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke="rgba(0,217,255,0.2)"
                strokeWidth="0.8"
                strokeDasharray="3 3"
              />
            ))}
          </svg>
        </div>

        {/* Technical label overlay */}
        <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, display: "flex", justifyContent: "center" }}>
          <TechLabel color="#00D9FF">FINANCIAL NETWORK INITIALIZING...</TechLabel>
        </div>
      </div>

      {/* Bottom content */}
      <div style={{ padding: "0 24px 16px", flexShrink: 0 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 26,
            fontWeight: 700,
            color: "#F4F8FC",
            marginBottom: 8,
            letterSpacing: "0.01em",
            lineHeight: 1.15,
          }}
        >
          Split smarter.
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#8A98A8", lineHeight: 1.6, marginBottom: 20 }}>
          One command center for every shared expense.
        </p>

        {/* Progress dots */}
        <div className="flex gap-2 mb-4">
          <div style={{ width: 20, height: 3, borderRadius: 2, background: "#00D9FF", boxShadow: "0 0 6px #00D9FF" }} />
          <div style={{ width: 6, height: 3, borderRadius: 2, background: "rgba(18,48,67,1)" }} />
          <div style={{ width: 6, height: 3, borderRadius: 2, background: "rgba(18,48,67,1)" }} />
        </div>

        <button
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 10,
            background: "linear-gradient(135deg, rgba(0,217,255,0.15), rgba(0,217,255,0.08))",
            border: "1px solid rgba(0,217,255,0.4)",
            color: "#00D9FF",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            cursor: "pointer",
            boxShadow: "0 0 16px rgba(0,217,255,0.1)",
            marginBottom: 10,
          }}
        >
          GET STARTED
        </button>
        <div style={{ textAlign: "center", fontFamily: "var(--font-body)", fontSize: 11, color: "#526273" }}>
          Already have an account?{" "}
          <span style={{ color: "#00D9FF" }}>Sign in</span>
        </div>
      </div>
    </div>
  );
}

// Onboarding screen 2 - balance network
function Screen2() {
  const flows = [
    { from: "Aarav", to: "Priya", amount: "₹1,200", fromColor: "#00D9FF", toColor: "#7C3CFF" },
    { from: "You", to: "Aarav", amount: "₹850", fromColor: "#00F5A0", toColor: "#00D9FF" },
    { from: "Rohit", to: "You", amount: "₹1,000", fromColor: "#FFAA00", toColor: "#00F5A0" },
  ];

  return (
    <div
      className="hud-grid"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#02060B",
        position: "relative",
      }}
    >
      <MiniNetworkCanvas nodeCount={10} colors={["#7C3CFF", "#00D9FF"]} />

      {/* Visual area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 20px", position: "relative" }}>
        <div style={{ position: "absolute", top: 12, right: 16 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid rgba(0,245,160,0.2)",
              background: "rgba(0,245,160,0.06)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00F5A0", boxShadow: "0 0 6px #00F5A0" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.12em", color: "#00F5A0" }}>BALANCE ENGINE</span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 7, color: "#526273", letterSpacing: "0.1em", textAlign: "right", marginTop: 2 }}>● ACTIVE</div>
        </div>

        <div className="flex flex-col gap-3 mt-8">
          {flows.map(({ from, to, amount, fromColor, toColor }) => (
            <div
              key={`${from}-${to}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "12px 14px",
                background: "rgba(7,17,28,0.9)",
                border: "1px solid rgba(18,48,67,0.8)",
                borderRadius: 10,
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: `${fromColor}15`,
                  border: `1.5px solid ${fromColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  fontWeight: 600,
                  color: fromColor,
                  flexShrink: 0,
                }}
              >
                {from[0]}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#F4F8FC", fontWeight: 500 }}>
                  {from} <span style={{ color: "#526273" }}>→</span> {to}
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, fontWeight: 700, color: "#00D9FF" }}>
                {amount}
              </div>
              <div
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  background: `${toColor}15`,
                  border: `1.5px solid ${toColor}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  fontWeight: 600,
                  color: toColor,
                  flexShrink: 0,
                }}
              >
                {to[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom content */}
      <div style={{ padding: "0 24px 16px", flexShrink: 0 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            fontWeight: 700,
            color: "#F4F8FC",
            marginBottom: 8,
            letterSpacing: "0.01em",
            lineHeight: 1.2,
          }}
        >
          Know who owes whom.
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8A98A8", lineHeight: 1.5, marginBottom: 20 }}>
          FreeSplit keeps every shared payment clear, transparent and easy to understand.
        </p>

        <div className="flex gap-2 mb-4">
          <div style={{ width: 6, height: 3, borderRadius: 2, background: "rgba(18,48,67,1)" }} />
          <div style={{ width: 20, height: 3, borderRadius: 2, background: "#00D9FF", boxShadow: "0 0 6px #00D9FF" }} />
          <div style={{ width: 6, height: 3, borderRadius: 2, background: "rgba(18,48,67,1)" }} />
        </div>

        <button
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 10,
            background: "linear-gradient(135deg, rgba(0,217,255,0.15), rgba(0,217,255,0.08))",
            border: "1px solid rgba(0,217,255,0.4)",
            color: "#00D9FF",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.15em",
            cursor: "pointer",
          }}
        >
          NEXT
        </button>
      </div>
    </div>
  );
}

// Onboarding screen 3 - settlement engine
function Screen3() {
  return (
    <div
      className="hud-grid"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: "#02060B",
        position: "relative",
      }}
    >
      <MiniNetworkCanvas nodeCount={8} colors={["#7C3CFF", "#00F5A0"]} />

      {/* Visual area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "16px 20px", position: "relative", gap: 4 }}>

        {/* BEFORE */}
        <div
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "rgba(255,77,109,0.06)",
            border: "1px solid rgba(255,77,109,0.2)",
            borderRadius: 10,
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", color: "#FF4D6D", marginBottom: 6 }}>BEFORE</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: "#F4F8FC" }}>4 TRANSACTIONS</div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 4 }, (_, i) => (
              <div key={i} style={{ height: 3, flex: 1, background: "rgba(255,77,109,0.4)", borderRadius: 2 }} />
            ))}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex flex-col items-center gap-1" style={{ padding: "8px 0" }}>
          <div style={{ width: 1, height: 16, background: "rgba(0,217,255,0.3)" }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 16px",
              border: "1px solid rgba(0,217,255,0.25)",
              borderRadius: 8,
              background: "rgba(0,217,255,0.04)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7C3CFF", boxShadow: "0 0 6px #7C3CFF" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.12em", color: "#7C3CFF" }}>SETTLEMENT ENGINE</span>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#7C3CFF", boxShadow: "0 0 6px #7C3CFF" }} />
          </div>
          <div style={{ width: 1, height: 16, background: "rgba(0,217,255,0.3)" }} />
          <div style={{ color: "rgba(0,217,255,0.4)", fontSize: 14 }}>↓</div>
          <div style={{ width: 1, height: 8, background: "rgba(0,217,255,0.3)" }} />
        </div>

        {/* AFTER */}
        <div
          style={{
            width: "100%",
            padding: "12px 16px",
            background: "rgba(0,245,160,0.06)",
            border: "1px solid rgba(0,245,160,0.25)",
            borderRadius: 10,
            boxShadow: "0 0 12px rgba(0,245,160,0.05)",
          }}
        >
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", color: "#00F5A0", marginBottom: 6 }}>AFTER</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 20, fontWeight: 700, color: "#F4F8FC" }}>2 TRANSACTIONS</div>
          <div className="flex gap-1 mt-2">
            {Array.from({ length: 2 }, (_, i) => (
              <div key={i} style={{ height: 3, flex: 1, background: "rgba(0,245,160,0.5)", borderRadius: 2, boxShadow: "0 0 4px rgba(0,245,160,0.3)" }} />
            ))}
            {Array.from({ length: 2 }, (_, i) => (
              <div key={`g-${i}`} style={{ height: 3, flex: 1, background: "rgba(18,48,67,0.5)", borderRadius: 2 }} />
            ))}
          </div>
        </div>

        {/* Status label */}
        <div style={{ marginTop: 4 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid rgba(0,245,160,0.2)",
              background: "rgba(0,245,160,0.06)",
            }}
          >
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00F5A0", boxShadow: "0 0 6px #00F5A0" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.12em", color: "#00F5A0" }}>SETTLEMENT ENGINE ● OPTIMIZED</span>
          </div>
        </div>
      </div>

      {/* Bottom content */}
      <div style={{ padding: "0 24px 16px", flexShrink: 0 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 24,
            fontWeight: 700,
            color: "#F4F8FC",
            marginBottom: 8,
            letterSpacing: "0.01em",
            lineHeight: 1.2,
          }}
        >
          Settle with less effort.
        </h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8A98A8", lineHeight: 1.5, marginBottom: 20 }}>
          FreeSplit optimizes group balances so fewer payments are needed.
        </p>

        <div className="flex gap-2 mb-4">
          <div style={{ width: 6, height: 3, borderRadius: 2, background: "rgba(18,48,67,1)" }} />
          <div style={{ width: 6, height: 3, borderRadius: 2, background: "rgba(18,48,67,1)" }} />
          <div style={{ width: 20, height: 3, borderRadius: 2, background: "#00D9FF", boxShadow: "0 0 6px #00D9FF" }} />
        </div>

        <button
          style={{
            width: "100%",
            padding: "13px",
            borderRadius: 10,
            background: "linear-gradient(135deg, #00D9FF, #7C3CFF)",
            border: "none",
            color: "#02060B",
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.15em",
            cursor: "pointer",
            boxShadow: "0 0 20px rgba(0,217,255,0.25)",
            marginBottom: 10,
          }}
        >
          CREATE MY ACCOUNT
        </button>
        <div style={{ textAlign: "center", fontFamily: "var(--font-mono)", fontSize: 9, color: "#526273", letterSpacing: "0.1em" }}>
          I ALREADY HAVE AN ACCOUNT
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  const [activeScreen, setActiveScreen] = useState(0);
  const screens = [
    { label: "Screen 01", sublabel: "Split Smarter", component: <Screen1 /> },
    { label: "Screen 02", sublabel: "Know Who Owes", component: <Screen2 /> },
    { label: "Screen 03", sublabel: "Settle Simpler", component: <Screen3 /> },
  ];

  return (
    <div
      className="w-full min-h-full hud-grid-subtle"
      style={{ background: "#02060B", padding: "48px 0" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>

        {/* Header */}
        <div className="mb-12">
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.2em", color: "#00D9FF", opacity: 0.6, marginBottom: 8 }}>
            05 — ONBOARDING
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 700, letterSpacing: "0.04em", color: "#F4F8FC", marginBottom: 8 }}>
            Onboarding Flow
          </h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#8A98A8" }}>
            3-screen mobile onboarding experience — 390×844 primary frame.
          </p>
        </div>

        {/* Screen selector tabs */}
        <div className="flex gap-2 mb-10 flex-wrap">
          {screens.map((s, i) => (
            <button
              key={i}
              onClick={() => setActiveScreen(i)}
              style={{
                padding: "10px 20px",
                borderRadius: 8,
                background: activeScreen === i ? "rgba(0,217,255,0.1)" : "transparent",
                border: `1px solid ${activeScreen === i ? "rgba(0,217,255,0.4)" : "rgba(18,48,67,0.8)"}`,
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", color: activeScreen === i ? "#00D9FF" : "#526273" }}>{s.label}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 600, color: activeScreen === i ? "#F4F8FC" : "#8A98A8", marginTop: 2 }}>{s.sublabel}</div>
            </button>
          ))}
        </div>

        {/* Phone frames - show all 3 with active highlighted */}
        <div className="flex gap-8 justify-center flex-wrap">
          {screens.map((screen, i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <PhoneFrame active={activeScreen === i}>
                {screen.component}
              </PhoneFrame>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  letterSpacing: "0.12em",
                  color: activeScreen === i ? "#00D9FF" : "#526273",
                  textAlign: "center",
                }}
              >
                {screen.label} — {screen.sublabel}
              </div>
            </div>
          ))}
        </div>

        {/* Design specs */}
        <div
          className="mt-12 grid gap-4"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}
        >
          {[
            { label: "PRIMARY FRAME", value: "390 × 844" },
            { label: "TOUCH TARGET", value: "44 × 44 min" },
            { label: "PLATFORMS", value: "iOS + Android" },
            { label: "SAFE AREAS", value: "Status + Gesture" },
            { label: "SCREENS", value: "3 Onboarding" },
            { label: "VISUAL MODE", value: "Dark Primary" },
          ].map(({ label, value }) => (
            <div
              key={label}
              style={{
                padding: "14px 16px",
                background: "#07111C",
                border: "1px solid #123043",
                borderRadius: 10,
              }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 8, letterSpacing: "0.15em", color: "#526273", marginBottom: 4 }}>{label}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 14, fontWeight: 600, color: "#00D9FF" }}>{value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
