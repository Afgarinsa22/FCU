import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Paper } from "../fx/Texture";
import { Typewriter } from "../fx/Type";
import { COLORS, FONTS } from "../theme";
import { BEAT, lineEndFrame, sec, wordFrame } from "../timing";

const L = 5; // "Setiap nama yang kuucapkan"
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const ROWS = 14;

/** A list of names, every one crossed out in red. */
export const S06Nama: React.FC = () => {
  const frame = useCurrentFrame();
  const fNama = wordFrame(L, 1);
  const fYang = wordFrame(L, 2);
  const fKu = wordFrame(L, 3);
  const end = lineEndFrame(L);
  const sceneEnd = sec(34.7 - 28.82);
  const beatF = BEAT * 30;

  return (
    <AbsoluteFill>
      <Paper />
      {/* the list, panning up */}
      <AbsoluteFill style={{ translate: `0px ${interpolate(frame, [0, sceneEnd], [80, -520])}px` }}>
        {Array.from({ length: ROWS }, (_, r) => {
          const strike = fNama + r * beatF * 0.5;
          return (
            <div key={r} style={{ position: "absolute", left: 110, top: 760 + r * 112, width: 860 }}>
              <div style={{ fontFamily: FONTS.type, fontSize: 58, color: COLORS.ink, opacity: interpolate(frame, [r * 2, r * 2 + 4], [0, 1], clamp) }}>
                NAMA : ______________
              </div>
              <div
                style={{
                  position: "absolute",
                  left: -10,
                  top: 30,
                  width: 840,
                  height: 10,
                  backgroundColor: COLORS.red,
                  rotate: `${r % 2 ? 1.5 : -1.2}deg`,
                  transformOrigin: "0 50%",
                  scale: `${interpolate(frame, [strike, strike + 4], [0, 1], { ...clamp, easing: Easing.out(Easing.cubic) })} 1`,
                }}
              />
            </div>
          );
        })}
      </AbsoluteFill>

      <Typewriter text="setiap" from={0} to={10} style={{ position: "absolute", left: 110, top: 200, fontSize: 70, color: COLORS.ink }} />
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 270,
          fontFamily: FONTS.hero,
          fontSize: 380,
          lineHeight: 1,
          color: COLORS.red,
          opacity: interpolate(frame, [fNama, fNama + 2], [0, 1], clamp),
          scale: interpolate(frame, [fNama, fNama + 7], [1.5, 1], { ...clamp, easing: Easing.out(Easing.cubic) }),
          transformOrigin: "0% 50%",
        }}
      >
        NAMA
      </div>

      <div
        style={{
          position: "absolute",
          right: 80,
          bottom: 220,
          padding: "18px 26px",
          backgroundColor: COLORS.ink,
          opacity: interpolate(frame, [fYang - 2, fYang], [0, 1], clamp),
        }}
      >
        <Typewriter text="yang" from={fYang} to={fYang + 5} caret={false} style={{ fontSize: 64 }} />
        <Typewriter text="kuucapkan" from={fKu} to={Math.min(end, fKu + 16)} style={{ fontSize: 64 }} />
      </div>
    </AbsoluteFill>
  );
};
