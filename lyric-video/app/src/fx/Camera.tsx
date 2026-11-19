import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { CameraMotionBlur } from "@remotion/motion-blur";
import { FPS, HEIGHT, WIDTH } from "../theme";
import { TIMING } from "../timing";
import { Dust, Grain, Vignette } from "./Texture";

/** The Indonesian half is aggressive; the underwater half drifts. */
const UNDERWATER_FROM = 49.2;

const word = (l: number, w: number) => TIMING.lines[l].words[w].start;

/** Hero-word hits: [time, strength, rotation direction]. */
const HITS: [number, number, number][] = [
  [word(0, 2), 1, 1],
  [word(1, 2), 0.8, -1],
  [word(2, 2), 0.9, 1],
  [word(3, 0), 1, -1],
  [word(3, 3), 0.7, 1],
  [word(4, 0), 0.6, -1],
  [word(4, 2), 1, 1],
  [word(5, 1), 0.8, -1],
  [word(6, 2), 1.1, 1],
  [word(7, 1), 1.2, -1],
  [word(7, 4), 0.9, 1],
  // underwater: softer
  [word(8, 2), 0.35, 1],
  [word(8, 5), 0.4, -1],
  [word(9, 2), 0.5, 1],
  [word(10, 4), 0.3, -1],
  [word(11, 4), 0.6, 1],
];

/** Scene cuts that get a whip pan: [time, direction]. */
const WHIPS: [number, number][] = [1, 2, 3, 4, 5, 6, 7].map((l, i) => [
  TIMING.lines[l].start,
  i % 2 === 0 ? 1 : -1,
]);

/** Smooth pseudo-noise from summed sines (deterministic, sub-frame safe). */
const wobble = (t: number, seed: number) =>
  Math.sin(t * 1.7 + seed) * 0.5 + Math.sin(t * 3.1 + seed * 2.3) * 0.3 + Math.sin(t * 7.3 + seed * 5.1) * 0.2;

const decay = (d: number, k: number) => (d < 0 ? 0 : Math.exp(-d * k));

export const cameraAt = (t: number) => {
  const under = t >= UNDERWATER_FROM;
  // handheld base
  const hand = under ? 26 : 10;
  const hs = under ? 0.35 : 1.4;
  let x = wobble(t * hs, 1) * hand;
  let y = wobble(t * hs, 7) * hand;
  let rot = wobble(t * hs, 3) * (under ? 2.2 : 0.8);
  let scale = 1.06;
  let rgb = 0;

  if (!under) {
    // beat pump
    const lastBeat = TIMING.beats.filter((b) => b <= t).pop() ?? -10;
    scale += 0.04 * decay(t - lastBeat, 9);
  }
  for (const [h, s, dir] of HITS) {
    const d = t - h;
    if (d < 0 || d > 1.2) continue;
    scale += 0.2 * s * decay(d, under ? 3 : 7);
    rot += dir * 4 * s * decay(d, 6);
    const shake = 46 * s * decay(d, 9);
    x += wobble(t * 40, h) * shake;
    y += wobble(t * 40, h + 9) * shake;
    rgb = Math.max(rgb, 14 * s * decay(d, 8));
  }
  for (const [c, dir] of WHIPS) {
    const d = t - c;
    if (d > -0.12 && d < 0) {
      const p = (d + 0.12) / 0.12;
      y += dir * -1500 * p * p * p;
      rot += dir * 8 * p * p;
      rgb = Math.max(rgb, 20 * p);
    } else if (d >= 0 && d < 0.16) {
      const p = 1 - d / 0.16;
      y += dir * 1500 * p * p * p;
      rot -= dir * 8 * p * p;
      rgb = Math.max(rgb, 20 * p);
    }
  }
  return { x, y, rot, scale, rgb };
};

/** Rough print edges + RGB split, applied to the whole camera image. */
const RoughFilter: React.FC<{ id: string; rgb: number; frame: number }> = ({ id, rgb, frame }) => (
  <svg width={0} height={0} style={{ position: "absolute" }}>
    <filter id={id} x="-5%" y="-5%" width="110%" height="110%" colorInterpolationFilters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed={Math.floor(frame / 3) % 50} result="n" />
      <feDisplacementMap in="SourceGraphic" in2="n" scale="5" xChannelSelector="R" yChannelSelector="G" result="rough" />
      <feColorMatrix in="rough" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="r" />
      <feOffset in="r" dx={rgb} dy={0} result="ro" />
      <feColorMatrix in="rough" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 1 0" result="gb" />
      <feOffset in="gb" dx={-rgb} dy={0} result="gbo" />
      <feBlend in="ro" in2="gbo" mode="screen" />
    </filter>
  </svg>
);

const CameraRig: React.FC<{ offset: number; children: React.ReactNode }> = ({ offset, children }) => {
  const frame = useCurrentFrame();
  const t = (frame + offset) / FPS;
  const c = cameraAt(t);
  return (
    <AbsoluteFill style={{ overflow: "hidden", backgroundColor: "#000" }}>
      <AbsoluteFill
        style={{
          translate: `${c.x}px ${c.y}px`,
          rotate: `${c.rot}deg`,
          scale: c.scale,
          transformOrigin: `${WIDTH / 2}px ${HEIGHT / 2}px`,
        }}
      >
        {children}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Exposure flicker + crushed blacks, like a damaged print. */
const Flicker: React.FC<{ offset: number }> = ({ offset }) => {
  const frame = useCurrentFrame();
  const f = frame + offset;
  const dark = 0.1 + random(`fl${f}`) * 0.14 + (random(`fb${Math.floor(f / 9)}`) > 0.93 ? 0.25 : 0);
  return <AbsoluteFill style={{ backgroundColor: `rgba(0,0,0,${dark})`, pointerEvents: "none" }} />;
};

/**
 * Wraps content with the aggressive camera, real motion blur, rough edges,
 * RGB split and the dirty-film overlays. `offset` = global frame of local frame 0.
 */
export const Shell: React.FC<{ offset?: number; children: React.ReactNode; blurSamples?: number }> = ({
  offset = 0,
  children,
  blurSamples = 6,
}) => {
  const frame = useCurrentFrame();
  const c = cameraAt((frame + offset) / FPS);
  const fid = `rough-${frame}`;
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <RoughFilter id={fid} rgb={c.rgb} frame={frame + offset} />
      <AbsoluteFill style={{ filter: `url(#${fid}) contrast(1.18) saturate(0.85)` }}>
        <CameraMotionBlur shutterAngle={250} samples={blurSamples}>
          <CameraRig offset={offset}>{children}</CameraRig>
        </CameraMotionBlur>
      </AbsoluteFill>
      <Flicker offset={offset} />
      <AbsoluteFill style={{ mixBlendMode: "difference" }}>
        <Dust amount={1.6} />
      </AbsoluteFill>
      <Grain opacity={0.34} />
      <Vignette strength={0.92} />
    </AbsoluteFill>
  );
};
