import { useEffect, useRef } from "react";

function NetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    const nodes = Array.from({ length: 22 }, () => ({
      x: Math.random() * w(),
      y: Math.random() * h(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 2 + 1,
      pulse: Math.random() * Math.PI * 2,
      color: ["#00D9FF", "#00F5A0", "#7C3CFF"][Math.floor(Math.random() * 3)],
    }));

    let frame = 0;
    let raf: number;

    const draw = () => {
      ctx.clearRect(0, 0, w(), h());

      // Radial glow center
      const cx = w() / 2;
      const cy = h() / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(w(), h()) * 0.55);
      grad.addColorStop(0, "rgba(0,217,255,0.04)");
      grad.addColorStop(0.5, "rgba(124,60,255,0.025)");
      grad.addColorStop(1, "transparent");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w(), h());

      // Update nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;
        if (n.x < 0 || n.x > w()) n.vx *= -1;
        if (n.y < 0 || n.y > h()) n.vy *= -1;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.18;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0,217,255,${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        const pulse = Math.sin(n.pulse) * 0.4 + 0.6;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.globalAlpha = pulse * 0.8;
        ctx.fill();
        ctx.globalAlpha = 1;
      });

      frame++;
      raf = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.9 }}
    />
  );
}

function FreeSplitLogo({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none">
      {/* Outer ring */}
      <circle cx="24" cy="24" r="22" stroke="#00D9FF" strokeWidth="1" strokeOpacity="0.3" />
      {/* Left node */}
      <circle cx="14" cy="24" r="5" fill="#02060B" stroke="#00D9FF" strokeWidth="1.5" />
      <circle cx="14" cy="24" r="2.5" fill="#00D9FF" />
      {/* Right node */}
      <circle cx="34" cy="24" r="5" fill="#02060B" stroke="#00F5A0" strokeWidth="1.5" />
      <circle cx="34" cy="24" r="2.5" fill="#00F5A0" />
      {/* Top node */}
      <circle cx="24" cy="10" r="3.5" fill="#02060B" stroke="#7C3CFF" strokeWidth="1.5" />
      <circle cx="24" cy="10" r="1.5" fill="#7C3CFF" />
      {/* Connector lines */}
      <line x1="19" y1="24" x2="29" y2="24" stroke="#00D9FF" strokeWidth="1" strokeOpacity="0.6" />
      <line x1="14" y1="19" x2="24" y2="13" stroke="#7C3CFF" strokeWidth="0.8" strokeOpacity="0.5" />
      <line x1="34" y1="19" x2="24" y2="13" stroke="#7C3CFF" strokeWidth="0.8" strokeOpacity="0.5" />
      {/* Center diamond */}
      <polygon points="24,20 28,24 24,28 20,24" fill="none" stroke="#00D9FF" strokeWidth="0.8" strokeOpacity="0.4" />
      <circle cx="24" cy="24" r="1.5" fill="#00D9FF" fillOpacity="0.7" />
    </svg>
  );
}

export default function CoverPage() {
  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-hidden hud-grid"
      style={{ background: "#02060B", minHeight: "100vh" }}
    >
      <NetworkCanvas />

      {/* Scan line effect */}
      <div
        className="absolute inset-x-0 h-px pointer-events-none"
        style={{
          background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.15), transparent)",
          animation: "scan-line 6s linear infinite",
          top: 0,
        }}
      />

      {/* Corner brackets */}
      {[
        { top: 24, left: 24 },
        { top: 24, right: 24 },
        { bottom: 24, left: 24 },
        { bottom: 24, right: 24 },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-6 h-6 pointer-events-none"
          style={{
            ...pos,
            borderTop: i < 2 ? "1px solid rgba(0,217,255,0.35)" : undefined,
            borderBottom: i >= 2 ? "1px solid rgba(0,217,255,0.35)" : undefined,
            borderLeft: i % 2 === 0 ? "1px solid rgba(0,217,255,0.35)" : undefined,
            borderRight: i % 2 === 1 ? "1px solid rgba(0,217,255,0.35)" : undefined,
          }}
        />
      ))}

      {/* System label top-left */}
      <div className="absolute top-8 left-8 text-left pointer-events-none">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
          }}
        >
          SYS.INIT / DESIGN.OS
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "rgba(0,217,255,0.5)",
            letterSpacing: "0.1em",
          }}
        >
          ● ONLINE
        </div>
      </div>

      {/* Version label top-right */}
      <div className="absolute top-8 right-8 text-right pointer-events-none">
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-muted)",
            letterSpacing: "0.15em",
          }}
        >
          BUILD 2026.09
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 10,
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          REV 01.0
        </div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8 animate-float">
        {/* Logo mark */}
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(0,217,255,0.08) 0%, transparent 70%)",
              transform: "scale(2.5)",
            }}
          />
          <FreeSplitLogo size={72} />
        </div>

        {/* Wordmark */}
        <div className="flex flex-col items-center gap-3">
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(40px, 8vw, 72px)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              color: "var(--text-primary)",
              lineHeight: 1,
              textShadow: "0 0 40px rgba(0,217,255,0.15)",
            }}
          >
            FREE
            <span style={{ color: "var(--cyan)" }}>SPLIT</span>
          </h1>

          <div
            style={{
              height: 1,
              width: 240,
              background: "linear-gradient(90deg, transparent, rgba(0,217,255,0.4), transparent)",
            }}
          />

          <p
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(13px, 2vw, 16px)",
              fontWeight: 300,
              letterSpacing: "0.25em",
              color: "var(--text-secondary)",
              textTransform: "uppercase",
            }}
          >
            Split smarter. Settle simpler.
          </p>
        </div>

        {/* Technical label */}
        <div
          style={{
            border: "1px solid rgba(0,217,255,0.15)",
            borderRadius: 4,
            padding: "8px 20px",
            background: "rgba(0,217,255,0.03)",
          }}
          className="flex flex-col items-center gap-1"
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: "var(--cyan)",
              opacity: 0.7,
            }}
          >
            FINANCIAL INTELLIGENCE SYSTEM
          </span>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 9,
              letterSpacing: "0.15em",
              color: "var(--text-muted)",
            }}
          >
            VERSION 01.0
          </span>
        </div>

        {/* Dot indicators */}
        <div className="flex gap-3">
          {["#00D9FF", "#7C3CFF", "#00F5A0"].map((color, i) => (
            <div
              key={i}
              className="animate-pulse-glow"
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: color,
                animationDelay: `${i * 0.4}s`,
                boxShadow: `0 0 8px ${color}`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom status bar */}
      <div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-8 pointer-events-none"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 9,
          letterSpacing: "0.15em",
          color: "var(--text-muted)",
        }}
      >
        <span>01 — COVER</span>
        <span style={{ color: "rgba(0,217,255,0.3)" }}>|</span>
        <span>SECTION I</span>
        <span style={{ color: "rgba(0,217,255,0.3)" }}>|</span>
        <span>FREESPLIT FOUNDATION</span>
      </div>
    </div>
  );
}
