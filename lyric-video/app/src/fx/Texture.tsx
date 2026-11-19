import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { COLORS, HEIGHT, WIDTH } from "../theme";

/** Animated film grain. Seed changes every 2 frames for an on-twos flicker. */
export const Grain: React.FC<{ opacity?: number }> = ({ opacity = 0.18 }) => {
  const frame = useCurrentFrame();
  const seed = Math.floor(frame / 2) % 97;
  return (
    <AbsoluteFill style={{ opacity, mixBlendMode: "overlay", pointerEvents: "none" }}>
      <svg width={WIDTH} height={HEIGHT}>
        <filter id={`grain-${seed}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed={seed} />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#grain-${seed})`} />
      </svg>
    </AbsoluteFill>
  );
};

/** Dust specks and hair scratches, like old film. */
export const Dust: React.FC<{ color?: string; amount?: number }> = ({
  color = "#ffffff",
  amount = 1,
}) => {
  const frame = useCurrentFrame();
  const k = Math.floor(frame / 2);
  const specks = Array.from({ length: Math.round(14 * amount) }, (_, i) => ({
    x: random(`dx${k}-${i}`) * WIDTH,
    y: random(`dy${k}-${i}`) * HEIGHT,
    r: 1 + random(`dr${k}-${i}`) * 3.5,
    o: 0.15 + random(`do${k}-${i}`) * 0.5,
  }));
  const hairs = Array.from({ length: Math.round(3 * amount) }, (_, i) => {
    const x = random(`hx${k}-${i}`) * WIDTH;
    const y = random(`hy${k}-${i}`) * HEIGHT;
    const c1 = random(`hc${k}-${i}`) * 120 - 60;
    return { d: `M${x},${y} q${c1},${40 + c1} ${c1 * 0.4},${90}`, o: 0.12 + random(`ho${k}-${i}`) * 0.25 };
  });
  const scratchX = random(`sx${Math.floor(frame / 6)}`) * WIDTH;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg width={WIDTH} height={HEIGHT}>
        {specks.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={color} opacity={s.o} />
        ))}
        {hairs.map((h, i) => (
          <path key={i} d={h.d} stroke={color} strokeWidth={1.4} fill="none" opacity={h.o} />
        ))}
        <rect x={scratchX} y={0} width={1.5} height={HEIGHT} fill={color} opacity={0.06} />
      </svg>
    </AbsoluteFill>
  );
};

/** Crumpled paper. Oversized so camera moves never show its edge. */
const PAD = 400;
export const Paper: React.FC = () => (
  <div style={{ position: "absolute", inset: -PAD, backgroundColor: COLORS.paper }}>
    <svg width={WIDTH + PAD * 2} height={HEIGHT + PAD * 2}>
      <filter id="paper-fiber">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed={7} result="n" />
        <feDiffuseLighting in="n" lightingColor="#fff" surfaceScale="2.2" result="l">
          <feDistantLight azimuth="235" elevation="50" />
        </feDiffuseLighting>
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <filter id="paper-grain">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="2" seed={3} />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#paper-fiber)" opacity={0.5} style={{ mixBlendMode: "multiply" }} />
      <rect width="100%" height="100%" filter="url(#paper-grain)" opacity={0.2} style={{ mixBlendMode: "multiply" }} />
    </svg>
  </div>
);

export const Vignette: React.FC<{ strength?: number }> = ({ strength = 0.75 }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      background: `radial-gradient(ellipse at 50% 45%, rgba(0,0,0,0) 45%, rgba(0,0,0,${strength}) 100%)`,
    }}
  />
);
