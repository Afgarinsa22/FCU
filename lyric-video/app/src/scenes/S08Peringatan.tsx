import React from "react";
import { AbsoluteFill, Easing, interpolate, random, useCurrentFrame } from "remotion";
import { Typewriter } from "../fx/Type";
import { COLORS, FONTS } from "../theme";
import { TIMING, lineEndFrame, sec, wordFrame } from "../timing";
import { Bubbles } from "./S09Breathe";

const L = 7; // "Sebuah peringatan tuk melupakan yeah"
const START = TIMING.lines[L].start;
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const TAPE_TEXT = "PERINGATAN  ✕  ".repeat(8);

const TAPES = [
  { angle: -18, y: 520, dir: 1 },
  { angle: 14, y: 1180, dir: -1 },
  { angle: -36, y: 900, dir: 1 },
  { angle: 30, y: 1500, dir: -1 },
  { angle: 4, y: 300, dir: -1 },
];

const Tape: React.FC<{ angle: number; y: number; dir: number; from: number; shake: number }> = ({
  angle,
  y,
  dir,
  from,
  shake,
}) => {
  const frame = useCurrentFrame();
  const enter = interpolate(frame, [from, from + 6], [dir * 2600, 0], { ...clamp, easing: Easing.out(Easing.cubic) });
  const crawl = (frame * 9 * dir) % 900;
  return (
    <div
      style={{
        position: "absolute",
        left: -900,
        top: y,
        width: 2900,
        height: 150,
        rotate: `${angle + Math.sin(frame / 20 + y) * 1.5}deg`,
        translate: `${enter + (random(`ts${y}-${frame}`) - 0.5) * shake}px ${(random(`ty${y}-${frame}`) - 0.5) * shake}px`,
        backgroundColor: COLORS.red,
        borderTop: `10px solid ${COLORS.black}`,
        borderBottom: `10px solid ${COLORS.black}`,
        overflow: "hidden",
        opacity: frame >= from ? 1 : 0,
      }}
    >
      <div
        style={{
          whiteSpace: "nowrap",
          fontFamily: FONTS.hero,
          fontSize: 104,
          lineHeight: "130px",
          color: COLORS.black,
          translate: `${crawl - 900}px 0px`,
        }}
      >
        {TAPE_TEXT}
      </div>
    </div>
  );
};

/** Climax: warning tapes everywhere, red flashes on the held "yeah", collapse to a red dot that sinks. */
export const S08Peringatan: React.FC = () => {
  const frame = useCurrentFrame();
  const t = frame / 30 + START;
  const fHero = wordFrame(L, 1);
  const fTuk = wordFrame(L, 2);
  const fMel = wordFrame(L, 3);
  const end = lineEndFrame(L);
  const sceneEnd = sec(51.54 - START);
  const holdFrom = sec(45.0 - START);
  const collapse = interpolate(frame, [end - 6, end + 8], [0, 1], { ...clamp, easing: Easing.in(Easing.cubic) });
  const shake = interpolate(frame, [holdFrom, end], [0, 60], clamp);

  const lastBeat = TIMING.beats.filter((b) => b <= t).pop() ?? -10;
  const flash = frame >= holdFrom && frame < end ? Math.exp(-(t - lastBeat) * 10) * 0.85 : 0;

  // red dot sinks into the water
  const sinkT = interpolate(frame, [end + 8, sceneEnd], [0, 1], clamp);
  const water = interpolate(frame, [end + 8, end + 30], [0, 1], clamp);

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
      {/* the water we sink into */}
      <AbsoluteFill style={{ opacity: water, background: "linear-gradient(180deg, #121214 0%, #070707 60%, #020202 100%)" }}>
        <Bubbles count={20} />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          scale: interpolate(frame, [fHero, end - 6], [1.35, 0.92], clamp) * (1 - collapse),
          rotate: `${interpolate(frame, [fHero, end], [0, -14])}deg`,
          opacity: 1 - collapse,
        }}
      >
        {TAPES.map((tp, i) => (
          <Tape key={i} {...tp} from={fHero + i * 8} shake={shake} />
        ))}
        <Typewriter
          text="sebuah"
          from={0}
          to={10}
          style={{ position: "absolute", left: 110, top: 160, fontSize: 64, backgroundColor: COLORS.black, padding: "4px 12px" }}
        />
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
          <div
            style={{
              backgroundColor: COLORS.black,
              padding: "24px 40px",
              opacity: interpolate(frame, [fTuk - 2, fTuk], [0, 1], clamp),
              border: `4px solid ${COLORS.white}`,
            }}
          >
            <Typewriter text="tuk" from={fTuk} to={fTuk + 5} caret={false} style={{ fontSize: 70 }} />
            <div
              style={{
                fontFamily: FONTS.hero,
                fontSize: 170,
                lineHeight: 1,
                color: COLORS.white,
                opacity: interpolate(frame, [fMel, fMel + 2], [0, 1], clamp),
              }}
            >
              MELUPAKAN
            </div>
          </div>
        </AbsoluteFill>
      </AbsoluteFill>

      {/* beat flashes during the held "yeah" */}
      <AbsoluteFill style={{ backgroundColor: COLORS.red, opacity: flash, mixBlendMode: "screen" }} />

      {/* the red dot */}
      <div
        style={{
          position: "absolute",
          left: 540 - 26,
          top: 960 - 26,
          width: 52,
          height: 52,
          borderRadius: "50%",
          backgroundColor: COLORS.red,
          opacity: interpolate(frame, [end, end + 4, sceneEnd - 12, sceneEnd], [0, 1, 1, 0], clamp),
          translate: `${Math.sin(frame / 9) * 18 * sinkT}px ${sinkT * sinkT * 900}px`,
          scale: interpolate(frame, [end, end + 6], [3, 1], clamp) * (1 - sinkT * 0.6),
          filter: `blur(${sinkT * 6}px)`,
        }}
      />
    </AbsoluteFill>
  );
};
