import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";
import { lineEndFrame, sec, wordFrame } from "../timing";

const L = 11; // "Are you in a hurry"
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const SMALL = [
  { text: "are", x: 140, y: 520 },
  { text: "you", x: 660, y: 760 },
  { text: "in", x: 220, y: 1180 },
  { text: "a", x: 760, y: 1360 },
];

/** Words flash and vanish; HURRY streaks away; only a faint red dot is left, then black. */
export const S12Hurry: React.FC = () => {
  const frame = useCurrentFrame();
  const fHurry = wordFrame(L, 4);
  const end = lineEndFrame(L);
  const sceneEnd = sec(71.1 - 66.02);
  const leave = end - 14;

  return (
    <AbsoluteFill style={{ backgroundColor: "#030303" }}>
      {SMALL.map((w, i) => {
        const s = wordFrame(L, i);
        return (
          <div
            key={w.text}
            style={{
              position: "absolute",
              left: w.x,
              top: w.y,
              fontFamily: FONTS.type,
              fontSize: 76,
              color: COLORS.white,
              opacity: interpolate(frame, [s, s + 1, s + 8, s + 12], [0, 1, 1, 0], clamp),
              filter: `blur(${interpolate(frame, [s + 6, s + 12], [0, 12], clamp)}px)`,
            }}
          >
            {w.text}
          </div>
        );
      })}

      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
        <div
          style={{
            fontFamily: FONTS.hero,
            fontSize: 300,
            lineHeight: 1,
            color: COLORS.white,
            opacity: interpolate(frame, [fHurry, fHurry + 1], [0, 1], clamp),
            translate: `${
              interpolate(frame, [fHurry, fHurry + 5], [900, 0], { ...clamp, easing: Easing.out(Easing.cubic) }) +
              interpolate(frame, [leave, leave + 8], [0, -1800], { ...clamp, easing: Easing.in(Easing.cubic) })
            }px 0px`,
            scale: `${interpolate(frame, [leave, leave + 8], [1, 1.8], clamp)} 1`,
          }}
        >
          HURRY
        </div>
      </AbsoluteFill>

      {/* what is left: a faint red dot, beating slowly, then gone */}
      <div
        style={{
          position: "absolute",
          left: 540 - 18,
          top: 960 - 18,
          width: 36,
          height: 36,
          borderRadius: "50%",
          backgroundColor: COLORS.red,
          opacity: interpolate(frame, [leave + 8, leave + 20, sceneEnd - 30, sceneEnd - 12], [0, 0.8, 0.5, 0], clamp),
          scale: 1 + Math.max(0, Math.sin(frame / 7)) * 0.25,
          filter: "blur(1px)",
        }}
      />
    </AbsoluteFill>
  );
};
