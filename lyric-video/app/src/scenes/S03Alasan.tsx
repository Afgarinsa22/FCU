import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Paper } from "../fx/Texture";
import { Typewriter } from "../fx/Type";
import { COLORS, FONTS } from "../theme";
import { lineEndFrame, wordFrame } from "../timing";

const L = 2; // "Berikan aku alasan"
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const HERO = "ALASAN";

/** Redacted document: the reason is censored and only slowly revealed. */
export const S03Alasan: React.FC = () => {
  const frame = useCurrentFrame();
  const fAku = wordFrame(L, 1);
  const fHero = wordFrame(L, 2);
  const end = lineEndFrame(L);
  const revealEnd = end - 8;

  return (
    <AbsoluteFill>
      <Paper />
      <Typewriter text="berikan" from={0} to={10} style={{ position: "absolute", left: 110, top: 360, fontSize: 92, color: COLORS.ink }} />
      <Typewriter text="aku" from={fAku} to={fAku + 6} style={{ position: "absolute", left: 110, top: 480, fontSize: 92, color: COLORS.ink }} />

      {/* small redacted "form" lines */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 110,
            top: 1260 + i * 70,
            height: 34,
            width: [760, 520, 680, 410, 600][i],
            backgroundColor: COLORS.ink,
            scale: `${interpolate(frame, [4 + i * 3, 10 + i * 3], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })} 1`,
            transformOrigin: "0 50%",
          }}
        />
      ))}

      {/* ALASAN under a sliding redaction bar */}
      <div style={{ position: "absolute", left: 100, top: 760, fontFamily: FONTS.hero, fontSize: 300, lineHeight: 1, color: COLORS.ink }}>
        <div style={{ display: "flex" }}>
          {HERO.split("").map((ch, i) => (
            <span key={i}>{ch}</span>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            inset: "-6% -4%",
            backgroundColor: COLORS.black,
            transformOrigin: "100% 50%",
            // steps: reveals one letter at a time
            scale: `${
              1 -
              Math.floor(
                interpolate(frame, [fHero, revealEnd], [0, HERO.length], clamp),
              ) /
                HERO.length
            } 1`,
            opacity: interpolate(frame, [0, 4], [0, 1], clamp),
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          right: 90,
          top: 560,
          fontFamily: FONTS.serif,
          fontSize: 340,
          lineHeight: 1,
          color: COLORS.red,
          rotate: "12deg",
          opacity: interpolate(frame, [revealEnd - 6, revealEnd - 4], [0, 1], clamp),
          scale: interpolate(frame, [revealEnd - 6, revealEnd], [1.8, 1], { ...clamp, easing: Easing.out(Easing.cubic) }),
        }}
      >
        ?
      </div>
    </AbsoluteFill>
  );
};
