import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";

import { Typewriter } from "../fx/Type";
import { COLORS, FONTS } from "../theme";
import { lineEndFrame, wordFrame } from "../timing";

const L = 0; // "Kuharap kau menyesal"
const HERO = "MENYESAL";
const BANDS = 9;

/** Letters that drop in one by one, heavy (no bounce). */
const DroppingWord: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  return (
    <div style={{ display: "flex", fontFamily: FONTS.hero, fontSize: 222, lineHeight: 1, letterSpacing: 2, color: COLORS.red }}>
      {HERO.split("").map((ch, i) => {
        const s = start + i * 3;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              translate: interpolate(frame, [s, s + 7], ["0px -520px", "0px 0px"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.6, 0, 0.9, 0.6),
              }),
              scale: interpolate(frame, [s + 6, s + 8, s + 12], ["1 1", "1.08 0.86", "1 1"], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              opacity: frame < s ? 0 : 1,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

export const S01Menyesal: React.FC = () => {
  const frame = useCurrentFrame();
  const heroStart = wordFrame(L, 2);
  const end = lineEndFrame(L);
  const sceneEnd = end + 30;

  // Glitch intensity grows while the note is held.
  const glitch = interpolate(frame, [heroStart + 30, end], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.in(Easing.quad),
  });
  const k = Math.floor(frame / 3);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      <AbsoluteFill
        style={{
          scale: interpolate(frame, [0, sceneEnd], [1, 1.07]),
        }}
      >
        <Typewriter
          text={"kuharap\nkau"}
          from={0}
          to={wordFrame(L, 1) + 6}
          style={{ position: "absolute", left: 110, top: 560, fontSize: 64, lineHeight: 1.25, color: COLORS.white }}
        />

        {/* Hero word, rendered as horizontal bands so it can split apart. */}
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", top: 120 }}>
          {Array.from({ length: BANDS }, (_, b) => {
            const top = (b / BANDS) * 100;
            const bottom = 100 - ((b + 1) / BANDS) * 100;
            const dx = glitch * (random(`b${b}-${k}`) - 0.5) * 110;
            const fall = interpolate(frame, [end + 4 + b * 1.5, end + 22 + b * 1.5], [0, 1400], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.in(Easing.cubic),
            });
            return (
              <div
                key={b}
                style={{
                  position: "absolute",
                  clipPath: `inset(${top}% -20% ${bottom}% -20%)`,
                  translate: `${dx}px ${fall}px`,
                }}
              >
                <DroppingWord start={heroStart} />
              </div>
            );
          })}
          {/* faint white ghost offset, like a misregistered print */}
          <div
            style={{
              position: "absolute",
              opacity: glitch * 0.35,
              translate: `${(random(`g${k}`) - 0.5) * 40 * glitch}px ${-6 * glitch}px`,
              mixBlendMode: "screen",
              filter: "grayscale(1) brightness(3)",
              clipPath: `inset(${random(`gc${k}`) * 60}% -20% ${random(`gd${k}`) * 30}% -20%)`,
            }}
          >
            <DroppingWord start={heroStart} />
          </div>
        </AbsoluteFill>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
