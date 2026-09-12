import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Line } from 'react-native-svg';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  color: string;
  pulse: number;
}

interface ParticleBackgroundProps {
  nodeCount?: number;
  colors?: string[];
  maxDistance?: number;
}

const DEFAULT_COLORS = ['#00D9FF', '#00F5A0', '#7C3CFF', '#FFAA00', '#FF4D6D'];

export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  nodeCount = 14,
  colors = DEFAULT_COLORS,
  maxDistance = 120,
}) => {
  const { width, height } = Dimensions.get('window');

  // Initialize particles once
  const particlesRef = useRef<Particle[]>(
    Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      pulse: Math.random() * Math.PI * 2,
    })),
  );

  const [, setTick] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let lastTime = Date.now();

    const animate = () => {
      const now = Date.now();
      // Run smoothly at ~30-40fps for optimal battery and performance
      if (now - lastTime > 30) {
        lastTime = now;
        const pts = particlesRef.current;
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          p.x += p.vx;
          p.y += p.vy;
          p.pulse += 0.03;

          // Bounce smoothly off edges
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        }
        setTick((t) => (t + 1) % 10000);
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [width, height]);

  const particles = particlesRef.current;

  // Calculate lines between nearby particles
  const lines: {
    key: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    opacity: number;
  }[] = [];

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const p1 = particles[i];
      const p2 = particles[j];
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < maxDistance) {
        const opacity = (1 - dist / maxDistance) * 0.22;
        lines.push({
          key: `${i}-${j}`,
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          opacity,
        });
      }
    }
  }

  return (
    <Svg
      width={width}
      height={height}
      style={StyleSheet.absoluteFill}
      pointerEvents="none"
    >
      {/* Background connecting lines */}
      {lines.map((l) => (
        <Line
          key={l.key}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#00D9FF"
          strokeOpacity={l.opacity}
          strokeWidth={0.7}
        />
      ))}

      {/* Floating glowing particles */}
      {particles.map((p, idx) => {
        const pulseFactor = Math.sin(p.pulse) * 0.35 + 0.65;
        return (
          <Circle
            key={idx}
            cx={p.x}
            cy={p.y}
            r={p.r * pulseFactor}
            fill={p.color}
            fillOpacity={pulseFactor * 0.9}
          />
        );
      })}
    </Svg>
  );
};
