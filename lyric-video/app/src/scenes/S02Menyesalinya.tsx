import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Typewriter } from "../fx/Type";
import { COLORS, FONTS } from "../theme";
import { lineEndFrame, sec, wordFrame } from "../timing";

const L = 1; // "Kuharap kau menyesalinya"
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ROWS = 16;
const ROW_H = 150;

/** Rows of "MENYESAL" scrolling down forever: a thought that won't stop looping. */
export const S02Menyesalinya: React.FC = () => {
  const frame = useCurrentFrame();
  const fHero = wordFrame(L, 2);
  const end = lineEndFrame(L);
  const sceneEnd = sec(11.6 - 5.92);

  const on = interpolate(frame, [fHero - 2, fHero + 2], [0.12, 1], clamp);
  // scroll accelerates as the held note goes on
  const scroll = frame * 5 + Math.max(0, frame - end + 40) ** 2 * 0.35;
  const redRow = 7;
  const fInya = fHero + 26;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, overflow: "hidden" }}>
      <AbsoluteFill style={{ rotate: "-8deg", scale: 1.25 }}>
        {Array.from({ length: ROWS }, (_, r) => {
          const y = ((r * ROW_H + scroll) % (ROWS * ROW_H)) - 2 * ROW_H;
          const isRed = r === redRow;
          const flick = random(`fl${r}-${Math.floor(frame / 3)}`) > 0.85 ? 0.4 : 1;
          return (
            <div
              key={r}
              style={{
                position: "absolute",
                top: y,
                left: r % 2 ? -260 : -40,
                whiteSpace: "nowrap",
                fontFamily: FONTS.hero,
                fontSize: 160,
                lineHeight: `${ROW_H}px`,
                letterSpacing: 4,
                color: isRed && frame >= fHero ? COLORS.red : "transparent",
                WebkitTextStroke: isRed && frame >= fHero ? "0px" : `2px rgba(242,239,233,${0.55 * flick})`,
                opacity: on,
              }}
            >
              MENYESAL MENYESAL MENYESAL
            </div>
          );
        })}
      </AbsoluteFill>

      <Typewriter
        text="kuharap kau"
        from={0}
        to={wordFrame(L, 1) + 8}
        style={{
          position: "absolute",
          left: 110,
          top: 300,
          fontSize: 62,
          backgroundColor: COLORS.black,
          padding: "6px 14px",
        }}
      />

      {/* "-inya" slams over the loop in serif italic */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: 260 }}>
        <div
          style={{
            fontFamily: FONTS.serif,
            fontStyle: "italic",
            fontSize: 240,
            color: COLORS.white,
            textShadow: "0 0 40px rgba(0,0,0,0.9)",
            opacity: interpolate(frame, [fInya, fInya + 2], [0, 1], clamp),
            scale: interpolate(frame, [fInya, fInya + 6], [1.6, 1], { ...clamp, easing: Easing.out(Easing.cubic) }),
            translate: `0px ${interpolate(frame, [fInya + 6, sceneEnd], [0, 60], clamp)}px`,
          }}
        >
          -inya
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
