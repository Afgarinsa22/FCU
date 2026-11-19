import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Typewriter } from "../fx/Type";
import { COLORS, FONTS } from "../theme";
import { sec, wordFrame } from "../timing";
import { Bubbles, LightRays, WaterFilter } from "./S09Breathe";

const L = 9; // "I'm in underwater so dive in with me"
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const LINE_Y = 820;

/** A waterline splits the frame; UNDERWATER sits on it, then the camera dives below. */
export const S10Underwater: React.FC = () => {
  const frame = useCurrentFrame();
  const fHero = wordFrame(L, 2);
  const fSo = wordFrame(L, 3);
  const words = [4, 5, 6, 7].map((w) => wordFrame(L, w));
  const sceneEnd = sec(62.06 - 57.0);
  const dive = interpolate(frame, [fSo, words[3] + 6], [0, -980], { ...clamp, easing: Easing.inOut(Easing.cubic) });

  return (
    <AbsoluteFill style={{ backgroundColor: "#030303" }}>
      <WaterFilter id="water10" scale={18} />
      <WaterFilter id="water10b" scale={46} />
      <AbsoluteFill style={{ translate: `0px ${dive}px` }}>
        {/* above the surface */}
        <div style={{ position: "absolute", left: -300, right: -300, top: -800, height: LINE_Y + 800, background: "linear-gradient(180deg, #050505, #17171a)" }} />
        <div style={{ position: "absolute", left: -300, right: -300, top: LINE_Y, height: 3, backgroundColor: COLORS.white, opacity: 0.5, filter: "url(#water10)" }} />

        <Typewriter text="i'm in" from={0} to={fHero - 2} style={{ position: "absolute", left: 110, top: 380, fontSize: 64 }} />

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: LINE_Y - 172,
            textAlign: "center",
            fontFamily: FONTS.hero,
            fontSize: 172,
            lineHeight: 1,
            color: COLORS.white,
            opacity: interpolate(frame, [fHero, fHero + 3], [0, 1], clamp),
            letterSpacing: interpolate(frame, [fHero, fHero + 10], [30, 0], { ...clamp, easing: Easing.out(Easing.cubic) }),
          }}
        >
          UNDERWATER
        </div>
        {/* its reflection, rippling below the line */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: LINE_Y + 6,
            textAlign: "center",
            fontFamily: FONTS.hero,
            fontSize: 172,
            lineHeight: 1,
            color: COLORS.white,
            scale: "1 -1",
            opacity: interpolate(frame, [fHero, fHero + 6], [0, 0.3], clamp),
            filter: "url(#water10b) blur(2px)",
          }}
        >
          UNDERWATER
        </div>

        {/* below the surface */}
        <div style={{ position: "absolute", left: -300, right: -300, top: LINE_Y + 260, height: 2200 }}>
          <LightRays />
          <Bubbles count={30} />
        </div>
        <div style={{ position: "absolute", left: 120, top: 1700, filter: "url(#water10)" }}>
          <Typewriter text="so" from={fSo} to={fSo + 3} caret={false} style={{ fontSize: 64, opacity: 0.8 }} />
          <div style={{ display: "flex", gap: 28, fontFamily: FONTS.serif, fontStyle: "italic", fontSize: 130, color: COLORS.white, marginTop: 10 }}>
            {["dive", "in", "with", "me"].map((w, i) => (
              <span key={w} style={{ opacity: interpolate(frame, [words[i], words[i] + 4], [0, 1], clamp), color: w === "me" ? COLORS.red : COLORS.white }}>
                {w}
              </span>
            ))}
          </div>
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ backgroundColor: "#000", opacity: interpolate(frame, [sceneEnd - 10, sceneEnd], [0, 0.7], clamp) }} />
    </AbsoluteFill>
  );
};
