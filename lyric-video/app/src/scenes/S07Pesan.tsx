import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Typewriter } from "../fx/Type";
import { COLORS, FONTS } from "../theme";
import { sec, wordFrame } from "../timing";

const L = 6; // "Sampaikan sebuah pesan"
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** A small card in the dark, hit by a red PESAN stamp. */
export const S07Pesan: React.FC = () => {
  const frame = useCurrentFrame();
  const fSebuah = wordFrame(L, 1);
  const fPesan = wordFrame(L, 2);
  const sceneEnd = sec(38.14 - 34.7);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black, justifyContent: "center", alignItems: "center" }}>
      <div
        style={{
          position: "relative",
          width: 820,
          height: 560,
          backgroundColor: COLORS.paper,
          boxShadow: "0 30px 80px rgba(0,0,0,0.8)",
          rotate: `${interpolate(frame, [0, 12], [-14, -4], { ...clamp, easing: Easing.out(Easing.cubic) })}deg`,
          translate: `0px ${interpolate(frame, [0, 12], [1400, 0], { ...clamp, easing: Easing.out(Easing.cubic) })}px`,
          padding: 60,
        }}
      >
        <Typewriter text="sampaikan" from={4} to={16} style={{ fontSize: 76, color: COLORS.ink }} />
        <Typewriter text="sebuah" from={fSebuah} to={fSebuah + 8} style={{ fontSize: 76, color: COLORS.ink, marginTop: 10 }} />
        <div style={{ marginTop: 40, height: 3, backgroundColor: COLORS.ink, opacity: 0.4 }} />
        <div style={{ marginTop: 50, height: 3, backgroundColor: COLORS.ink, opacity: 0.4 }} />

        {/* the stamp */}
        <div
          style={{
            position: "absolute",
            right: 30,
            bottom: 50,
            padding: "0px 34px",
            border: `12px solid ${COLORS.red}`,
            borderRadius: 18,
            fontFamily: FONTS.hero,
            fontSize: 210,
            lineHeight: 1.1,
            color: COLORS.red,
            mixBlendMode: "multiply",
            rotate: "-11deg",
            opacity: interpolate(frame, [fPesan, fPesan + 1], [0, 0.92], clamp),
            scale: interpolate(frame, [fPesan, fPesan + 4, sceneEnd - 10, sceneEnd], [3, 1, 1, 6], {
              ...clamp,
              easing: Easing.in(Easing.cubic),
            }),
          }}
        >
          PESAN
        </div>
      </div>
    </AbsoluteFill>
  );
};
