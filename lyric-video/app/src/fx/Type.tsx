import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS, FONTS } from "../theme";

/**
 * Typewriter text: characters appear between `from` and `to` (frames),
 * with a blinking caret while typing.
 */
export const Typewriter: React.FC<{
  text: string;
  from: number;
  to: number;
  style?: React.CSSProperties;
  caret?: boolean;
}> = ({ text, from, to, style, caret = true }) => {
  const frame = useCurrentFrame();
  const n = Math.floor(
    interpolate(frame, [from, to], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const typing = frame >= from && frame < to + 12;
  const showCaret = caret && typing && Math.floor(frame / 6) % 2 === 0;
  return (
    <div
      style={{
        fontFamily: FONTS.type,
        color: COLORS.white,
        whiteSpace: "pre",
        ...style,
      }}
    >
      {text.slice(0, n)}
      <span style={{ opacity: showCaret ? 1 : 0 }}>▌</span>
    </div>
  );
};
