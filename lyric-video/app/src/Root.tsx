import React from "react";
import { Composition, Folder } from "remotion";
import { Main, SCENES, sceneFrames } from "./Main";
import { FPS, HEIGHT, WIDTH } from "./theme";
import { DURATION_FRAMES } from "./timing";

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Scenes">
      {SCENES.map((s) => (
        <Composition
          key={s.id}
          id={s.id}
          component={s.component}
          width={WIDTH}
          height={HEIGHT}
          fps={FPS}
          durationInFrames={sceneFrames(s)}
        />
      ))}
    </Folder>
    <Composition
      id="LyricVideo"
      component={Main}
      width={WIDTH}
      height={HEIGHT}
      fps={FPS}
      durationInFrames={DURATION_FRAMES}
    />
  </>
);
