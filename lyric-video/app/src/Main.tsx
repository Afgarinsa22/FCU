import React from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { S01Menyesal } from "./scenes/S01Menyesal";
import { S04Melupakan } from "./scenes/S04Melupakan";
import { S09Breathe } from "./scenes/S09Breathe";
import { COLORS } from "./theme";
import { lineStart, sec } from "./timing";

/** Scenes placed at the start of their lyric line, lasting until the next line. */
export const SCENES = [
  { id: "S01-Menyesal", line: 0, until: lineStart(1), component: S01Menyesal },
  { id: "S04-Melupakan", line: 3, until: lineStart(4), component: S04Melupakan },
  { id: "S09-Breathe", line: 8, until: lineStart(9), component: S09Breathe },
];

export const sceneFrames = (s: (typeof SCENES)[number]) => sec(s.until - lineStart(s.line));

export const Main: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: COLORS.black }}>
    {SCENES.map((s) => (
      <Sequence key={s.id} name={s.id} from={sec(lineStart(s.line))} durationInFrames={sceneFrames(s)}>
        <s.component />
      </Sequence>
    ))}
    <Audio src={staticFile("song.mp3")} />
  </AbsoluteFill>
);
