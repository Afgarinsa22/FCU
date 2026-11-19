import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Typewriter } from "../fx/Type";
import { COLORS, FONTS } from "../theme";
import { lineEndFrame, sec, wordFrame } from "../timing";

const L = 4; // "Tuhan tolong hapuskan"
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const HERO = "HAPUSKAN";

/** A prayer from the dark: "tolong" echoes, then HAPUSKAN is struck out and falls apart. */
export const S05Hapuskan: React.FC = () => {
  const frame = useCurrentFrame();
  const fTolong = wordFrame(L, 1);
  const fHero = wordFrame(L, 2);
  const end = lineEndFrame(L);
  const sceneEnd = sec(28.82 - 23.2);
  const strikes = [fHero + 4, fHero + 10, fHero + 16];
  const fallFrom = fHero + 20;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* thin light from above */}
      <div
        style={{
          position: "absolute",
          left: 340,
          top: -200,
          width: 400,
          height: 1300,
          background: "linear-gradient(180deg, rgba(242,239,233,0.22), rgba(242,239,233,0))",
          filter: "blur(30px)",
          opacity: 0.6 + random(`lf${Math.floor(frame / 2)}`) * 0.4,
        }}
      />
      <AbsoluteFill style={{ alignItems: "center" }}>
        <div
          style={{
            marginTop: 330,
            fontFamily: FONTS.serif,
            fontStyle: "italic",
            fontSize: 170,
            color: COLORS.white,
            opacity: interpolate(frame, [0, 10], [0, 1], clamp),
            letterSpacing: interpolate(frame, [0, sceneEnd], [2, 22]),
          }}
        >
          Tuhan
        </div>
      </AbsoluteFill>

      {/* "tolong" echoing, pleading */}
      {[0, 1, 2, 3, 4].map((i) => {
        const s = fTolong + i * 12;
        return (
          <Typewriter
            key={i}
            text="tolong"
            from={s}
            to={s + 8}
            caret={false}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              textAlign: "center",
              top: 620 + i * 86,
              fontSize: 76,
              opacity: frame >= fHero ? interpolate(frame, [fHero, fHero + 6], [1 - i * 0.18, 0.08], clamp) : 1 - i * 0.18,
            }}
          />
        );
      })}

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: 200 }}>
        <div style={{ position: "relative", display: "flex", fontFamily: FONTS.hero, fontSize: 228, lineHeight: 1, color: COLORS.white }}>
          {HERO.split("").map((ch, i) => {
            const fall = Math.max(0, frame - fallFrom - random(`fd${i}`) * 10);
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  opacity: interpolate(frame, [fHero + i, fHero + i + 2], [0, 1], clamp),
                  translate: `0px ${fall * fall * 2.2}px`,
                  rotate: `${(random(`fr${i}`) - 0.5) * fall * 3}deg`,
                }}
              >
                {ch}
              </span>
            );
          })}
          {strikes.map((s, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: -30,
                right: -30,
                top: `${32 + i * 16}%`,
                height: 18,
                backgroundColor: COLORS.red,
                rotate: `${[-4, 3, -2][i]}deg`,
                transformOrigin: "0 50%",
                scale: `${interpolate(frame, [s, s + 4], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })} 1`,
                opacity: interpolate(frame, [Math.max(end, fallFrom + 6), sceneEnd], [1, 0], clamp),
              }}
            />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
