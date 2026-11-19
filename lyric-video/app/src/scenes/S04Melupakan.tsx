import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { Paper } from "../fx/Texture";
import { Typewriter } from "../fx/Type";
import { COLORS, FONTS } from "../theme";
import { lineEndFrame, sec, wordFrame } from "../timing";

const L = 3; // "Satu alasan tuk melupakan"
const HERO = "MELUPAKAN";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const S04Melupakan: React.FC = () => {
  const frame = useCurrentFrame();
  const fAlasan = wordFrame(L, 1);
  const fTuk = wordFrame(L, 2);
  const fHero = wordFrame(L, 3);
  const end = lineEndFrame(L);
  const sceneEnd = sec(23.2 - 15.38);
  const eraseFrom = fHero + 30;
  const eraseStep = (end - 6 - eraseFrom) / HERO.length;

  return (
    <AbsoluteFill>
      <Paper />
      <AbsoluteFill style={{ translate: interpolate(frame, [0, sceneEnd], ["0px 30px", "0px -40px"]) }}>
        {/* Giant red "1" */}
        <div
          style={{
            position: "absolute",
            left: -40,
            top: 60,
            fontFamily: FONTS.serif,
            fontSize: 1500,
            lineHeight: 1,
            color: COLORS.red,
            opacity: interpolate(frame, [0, 3], [0, 0.95], clamp),
            scale: interpolate(frame, [0, 9], [1.35, 1], { ...clamp, easing: Easing.bezier(0.2, 0.9, 0.1, 1) }),
            rotate: interpolate(frame, [0, 9], ["-5deg", "0deg"], clamp),
            mixBlendMode: "multiply",
          }}
        >
          1
        </div>

        <Typewriter
          text="(satu)"
          from={0}
          to={8}
          style={{ position: "absolute", left: 120, top: 170, fontSize: 48, color: COLORS.ink }}
        />
        <Typewriter
          text="alasan"
          from={fAlasan}
          to={fAlasan + 14}
          style={{ position: "absolute", left: 560, top: 400, fontSize: 84, color: COLORS.ink }}
        />
        {/* red pen underline under "alasan" */}
        <svg style={{ position: "absolute", left: 550, top: 500 }} width={360} height={40}>
          <path
            d="M4,22 C90,10 200,30 350,14"
            stroke={COLORS.red}
            strokeWidth={6}
            fill="none"
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [fAlasan + 16, fAlasan + 26], [1, 0], clamp)}
          />
        </svg>
        <Typewriter
          text="tuk"
          from={fTuk}
          to={fTuk + 6}
          style={{ position: "absolute", left: 560, top: 560, fontSize: 64, color: COLORS.ink }}
        />

        {/* MELUPAKAN, vertical, being erased letter by letter */}
        <div
          style={{
            position: "absolute",
            left: 700,
            top: 1780,
            rotate: "-90deg",
            transformOrigin: "0 0",
            display: "flex",
            fontFamily: FONTS.hero,
            fontSize: 236,
            lineHeight: 1,
            letterSpacing: 4,
          }}
        >
          {HERO.split("").map((ch, i) => {
            const inF = fHero + i * 2;
            const eF = eraseFrom + i * eraseStep;
            const ink = interpolate(frame, [eF, eF + 8], [1, 0], clamp);
            return (
              <span
                key={i}
                style={{
                  position: "relative",
                  display: "inline-block",
                  color: `rgba(20,18,16,${ink})`,
                  WebkitTextStroke: `2px rgba(20,18,16,${0.28 * (1 - ink)})`,
                  opacity: interpolate(frame, [inF, inF + 3], [0, 1], clamp),
                  filter: `blur(${interpolate(frame, [eF, eF + 4, eF + 10], [0, 3, 0.6], clamp)}px)`,
                  translate: `${interpolate(frame, [eF, eF + 10], [0, 6], clamp)}px 0px`,
                }}
              >
                {ch}
                {/* eraser smudge left behind */}
                <span
                  style={{
                    position: "absolute",
                    inset: "20% -10%",
                    background: "rgba(20,18,16,0.10)",
                    filter: "blur(14px)",
                    opacity: 1 - ink,
                  }}
                />
              </span>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* ink creeping in from the edges before the cut to black */}
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 50% 50%, rgba(11,11,11,0) ${interpolate(
            frame,
            [sceneEnd - 24, sceneEnd],
            [95, 0],
            clamp,
          )}%, ${COLORS.black} ${interpolate(frame, [sceneEnd - 24, sceneEnd], [165, 20], clamp)}%)`,
        }}
      />
    </AbsoluteFill>
  );
};
