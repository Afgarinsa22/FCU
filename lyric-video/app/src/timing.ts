import data from "./timing.json";
import { FPS } from "./theme";

export type Word = { text: string; start: number; end: number };
export type Line = { line: string; start: number; end: number; words: Word[] };

export const TIMING = data as {
  bpm: number;
  beatOffset: number;
  duration: number;
  lines: Line[];
  beats: number[];
};

export const BEAT = 60 / TIMING.bpm;
export const DURATION_FRAMES = Math.round(TIMING.duration * FPS);

export const sec = (s: number) => Math.round(s * FPS);

/** Start of line `i` (0-based) in seconds. */
export const lineStart = (i: number) => TIMING.lines[i].start;

/** Word start relative to its line start, in frames. */
export const wordFrame = (line: number, word: number) =>
  sec(TIMING.lines[line].words[word].start - TIMING.lines[line].start);

/** Line end relative to its line start, in frames. */
export const lineEndFrame = (line: number) =>
  sec(TIMING.lines[line].end - TIMING.lines[line].start);
