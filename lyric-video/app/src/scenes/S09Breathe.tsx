import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";

import { Typewriter } from "../fx/Type";
import { COLORS, FONTS, HEIGHT, WIDTH } from "../theme";
import { sec, wordFrame } from "../timing";

const L = 8; // "Here come closer i can't breathe"
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** Wavy underwater distortion filter, flowing over time. */
export const WaterFilter: React.FC<{ id: string; scale?: number }> = ({ id, scale = 22 }) => {
  const frame = useCurrentFrame();
  const fx = 0.004 + Math.sin(frame / 40) * 0.0012;
  const fy = 0.018 + Math.cos(frame / 33) * 0.004;
  return (
    <svg width={0} height={0} style={{ position: "absolute" }}>
      <filter id={id} x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence type="fractalNoise" baseFrequency={`${fx} ${fy}`} numOctaves="2" seed={4} />
        <feDisplacementMap in="SourceGraphic" scale={scale} xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
};

export const Bubbles: React.FC<{ count?: number }> = ({ count = 28 }) => {
  const frame = useCurrentFrame();
  return (
    <svg width={WIDTH} height={HEIGHT} style={{ position: "absolute" }}>
      {Array.from({ length: count }, (_, i) => {
        const speed = 2 + random(`bs${i}`) * 5;
        const r = 3 + random(`br${i}`) * 12;
        const x0 = random(`bx${i}`) * WIDTH;
        const y = (((random(`by${i}`) * HEIGHT - frame * speed) % (HEIGHT + 100)) + HEIGHT + 100) % (HEIGHT + 100);
        const x = x0 + Math.sin(frame / (12 + i) + i) * 14;
        return <circle key={i} cx={x} cy={y} r={r} fill="none" stroke="#fff" strokeWidth={1.5} opacity={0.12 + random(`bo${i}`) * 0.25} />;
      })}
    </svg>
  );
};

const LightRays: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ mixBlendMode: "screen" }}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            top: -300,
            left: 160 + i * 230,
            width: 70 + i * 30,
            height: 2400,
            background: "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0))",
            filter: "blur(18px)",
            transformOrigin: "50% 0%",
            rotate: `${12 + Math.sin(frame / 50 + i) * 4}deg`,
            opacity: 0.6 + Math.sin(frame / 23 + i * 2) * 0.4,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};

export const S09Breathe: React.FC = () => {
  const frame = useCurrentFrame();
  const fCome = wordFrame(L, 1);
  const fCloser = wordFrame(L, 2);
  const fI = wordFrame(L, 3);
  const fBreathe = wordFrame(L, 5);
  const sceneEnd = sec(57.0 - 51.54);

  return (
    <AbsoluteFill style={{ background: "linear-gradient(180deg, #121214 0%, #070707 60%, #020202 100%)" }}>
      <LightRays />
      <Bubbles />
      <WaterFilter id="water9" />

      <AbsoluteFill style={{ filter: "url(#water9)" }}>
        <Typewriter
          text="here come"
          from={0}
          to={fCome + 8}
          caret={false}
          style={{ position: "absolute", left: 120, top: 470, fontSize: 60, color: COLORS.white, opacity: 0.85 }}
        />

        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: -120 }}>
          <div
            style={{
              fontFamily: FONTS.hero,
              fontSize: 300,
              lineHeight: 1,
              color: COLORS.white,
              opacity: interpolate(frame, [fCloser, fCloser + 6, sceneEnd - 20, sceneEnd], [0, 1, 0.5, 0], clamp),
              scale: interpolate(frame, [fCloser, sceneEnd], [0.55, 1.35], {
                ...clamp,
                easing: Easing.bezier(0.3, 0, 0.2, 1),
              }),
              filter: `blur(${interpolate(frame, [fBreathe, sceneEnd], [0, 10], clamp)}px)`,
            }}
          >
            CLOSER
          </div>
        </AbsoluteFill>

        <div
          style={{
            position: "absolute",
            left: 140,
            top: 1150,
            fontFamily: FONTS.serif,
            fontStyle: "italic",
            fontSize: 96,
            color: COLORS.white,
            opacity: interpolate(frame, [fI, fI + 8], [0, 0.9], clamp),
          }}
        >
          i <span style={{ opacity: interpolate(frame, [fBreathe - 12, fBreathe - 4], [0, 1], clamp) }}>can&apos;t</span>
        </div>

        {/* BREATHE: letters float up like air escaping */}
        <div style={{ position: "absolute", left: 120, top: 1310, display: "flex", fontFamily: FONTS.hero, fontSize: 210, lineHeight: 1 }}>
          {"BREATHE".split("").map((ch, i) => {
            const s = fBreathe + i * 2;
            const t = Math.max(0, frame - s - 18);
            const rise = t * t * (0.18 + random(`rs${i}`) * 0.25);
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  color: COLORS.red,
                  marginRight: interpolate(frame, [s + 10, sceneEnd], [0, 26], clamp),
                  opacity: interpolate(frame, [s, s + 3, s + 40, s + 80], [0, 1, 0.8, 0], clamp),
                  translate: `${Math.sin((frame + i * 9) / 9) * 8 * Math.min(1, t / 20)}px ${-rise}px`,
                  rotate: `${(random(`rr${i}`) - 0.5) * Math.min(t, 40) * 0.6}deg`,
                }}
              >
                {ch}
              </span>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
