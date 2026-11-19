import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Typewriter } from "../fx/Type";
import { COLORS, FONTS } from "../theme";
import { sec, wordFrame } from "../timing";
import { Bubbles, WaterFilter } from "./S09Breathe";

const L = 10; // "I just wanna say sorry"
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TORN = "polygon(0% 6%, 8% 0%, 19% 4%, 31% 1%, 44% 5%, 57% 0%, 70% 4%, 83% 1%, 100% 5%, 98% 30%, 100% 58%, 97% 82%, 100% 96%, 86% 100%, 72% 95%, 58% 100%, 43% 96%, 29% 100%, 15% 95%, 0% 99%, 2% 70%, 0% 40%, 3% 20%)";

/** Small, lonely: a torn scrap drifting in the dark with "sorry" in red. */
export const S11Sorry: React.FC = () => {
  const frame = useCurrentFrame();
  const fWanna = wordFrame(L, 2);
  const fSorry = wordFrame(L, 4);
  const sceneEnd = sec(66.02 - 62.06);

  return (
    <AbsoluteFill style={{ backgroundColor: "#040404" }}>
      <Bubbles count={8} />
      <WaterFilter id="water11" scale={10} />
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", filter: "url(#water11)" }}>
        <div
          style={{
            width: 560,
            padding: "50px 54px 60px",
            backgroundColor: COLORS.paper,
            clipPath: TORN,
            rotate: `${-6 + Math.sin(frame / 25) * 3}deg`,
            translate: `${Math.sin(frame / 31) * 20 + interpolate(frame, [sceneEnd - 24, sceneEnd], [0, 500], { ...clamp, easing: Easing.in(Easing.quad) })}px ${
              180 + Math.cos(frame / 27) * 16 + interpolate(frame, [sceneEnd - 24, sceneEnd], [0, 700], { ...clamp, easing: Easing.in(Easing.quad) })
            }px`,
            opacity: interpolate(frame, [0, 10], [0, 1], clamp),
          }}
        >
          <Typewriter text="i just" from={2} to={12} caret={false} style={{ fontSize: 44, color: COLORS.ink }} />
          <Typewriter text="wanna say" from={fWanna} to={fWanna + 12} caret={false} style={{ fontSize: 44, color: COLORS.ink }} />
          <div
            style={{
              fontFamily: FONTS.serif,
              fontStyle: "italic",
              fontSize: 150,
              lineHeight: 1.05,
              color: COLORS.red,
              clipPath: `inset(0% ${interpolate(frame, [fSorry, fSorry + 18], [100, 0], clamp)}% 0% 0%)`,
            }}
          >
            sorry
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
