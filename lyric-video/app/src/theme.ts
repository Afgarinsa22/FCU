import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

export const COLORS = {
  black: "#0B0B0B",
  red: "#B0101B",
  paper: "#DDD7CC",
  ink: "#141210",
  grey: "#6B6B6B",
  white: "#F2EFE9",
};

export const FONTS = {
  hero: "Anton",
  serif: "DM Serif Display",
  type: "Special Elite",
};

export const fontsLoaded = Promise.all([
  loadFont({ family: FONTS.hero, url: staticFile("fonts/anton-latin-400-normal.woff2") }),
  loadFont({
    family: FONTS.serif,
    url: staticFile("fonts/dm-serif-display-latin-400-normal.woff2"),
  }),
  loadFont({
    family: FONTS.serif,
    url: staticFile("fonts/dm-serif-display-latin-400-italic.woff2"),
    style: "italic",
  }),
  loadFont({
    family: FONTS.type,
    url: staticFile("fonts/special-elite-latin-400-normal.woff2"),
  }),
]);

export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;
