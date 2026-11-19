import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { S01Menyesal } from "./scenes/S01Menyesal";
import { S02Menyesalinya } from "./scenes/S02Menyesalinya";
import { S03Alasan } from "./scenes/S03Alasan";
import { S04Melupakan } from "./scenes/S04Melupakan";
import { S05Hapuskan } from "./scenes/S05Hapuskan";
import { S06Nama } from "./scenes/S06Nama";
import { S07Pesan } from "./scenes/S07Pesan";
import { S08Peringatan } from "./scenes/S08Peringatan";
import { S09Breathe } from "./scenes/S09Breathe";
import { S10Underwater } from "./scenes/S10Underwater";
import { S11Sorry } from "./scenes/S11Sorry";
import { S12Hurry } from "./scenes/S12Hurry";
import { COLORS } from "./theme";
import { Shell } from "./fx/Camera";
import { TIMING, lineStart, sec } from "./timing";

/** Scenes placed at the start of their lyric line, lasting until the next line. */
const COMPONENTS: [string, React.FC][] = [
  ["Menyesal", S01Menyesal],
  ["Menyesalinya", S02Menyesalinya],
  ["Alasan", S03Alasan],
  ["Melupakan", S04Melupakan],
  ["Hapuskan", S05Hapuskan],
  ["Nama", S06Nama],
  ["Pesan", S07Pesan],
  ["Peringatan", S08Peringatan],
  ["Breathe", S09Breathe],
  ["Underwater", S10Underwater],
  ["Sorry", S11Sorry],
  ["Hurry", S12Hurry],
];

export const SCENES = COMPONENTS.map(([name, component], i) => ({
  id: `S${String(i + 1).padStart(2, "0")}-${name}`,
  line: i,
  until: i + 1 < TIMING.lines.length ? lineStart(i + 1) : TIMING.duration,
  component,
}));

export const sceneFrames = (s: (typeof SCENES)[number]) => sec(s.until - lineStart(s.line));

export const Main: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
    <Shell>
      {SCENES.map((s) => (
        <Sequence key={s.id} name={s.id} from={sec(lineStart(s.line))} durationInFrames={sceneFrames(s)}>
          <s.component />
        </Sequence>
      ))}
    </Shell>
    {/* Audio stays outside the motion-blur shell so it is not duplicated. */}
    <Audio src={staticFile("song.mp3")} />
  </AbsoluteFill>
);

/** A single scene wrapped in the camera shell, for previewing it on its own. */
export const ScenePreview: React.FC<{ index: number }> = ({ index }) => {
  const s = SCENES[index];
  return (
    <Shell offset={sec(lineStart(s.line))}>
      <s.component />
    </Shell>
  );
};
