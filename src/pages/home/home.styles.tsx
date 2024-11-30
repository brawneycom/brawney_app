import { ComponentProperties } from "@bennie-ui/types";

type HomeContentStyleProps = {
  wrapper: ComponentProperties;
  ui: ComponentProperties;
  timespan: ComponentProperties;
  categories: ComponentProperties;
};

type HomeStyleProps = {
  wrapper: ComponentProperties;
  capture: ComponentProperties;
  content: HomeContentStyleProps;
};

export const Styles: HomeStyleProps = {
  wrapper: {
    padding: { y: "4", x: "8" },
    height: { value: "screen" },
    flex: { direction: "col", justifyContent: "between" },
    colors: { text: { color: "blue" } },
    dark: {
      colors: {
        text: { color: "white" },
      },
    },
  },
  content: {
    wrapper: {
      flex: { direction: "col" },
      width: { value: "full" },
      height: { value: "full" },
      rounding: { all: "md" },
      colors: {
        text: { color: "gray" },
        background: { color: "gray", weight: "700" },
      },
    },
    ui: {
      grid: { flow: "col" },
      flex: { direction: "row", justifyContent: "stretch" },
    },
    timespan: {
      border: { width: { y: "2" } },
      colors: { border: { color: "gray" } },
      grid: { flow: "col" },
      flex: { direction: "row", justifyContent: "stretch" },
    },
    categories: {
      border: { width: { t: "2" } },
      colors: { border: { color: "gray" } },
      grid: { flow: "col" },
      flex: {
        direction: "row",
        justifyContent: "stretch",
      },
    },
  },
  capture: {
    rounding: { all: "2xl" },
    padding: { y: "4" },
    colors: { text: { color: "white" }, background: { color: "blue" } },
    dark: {
      colors: {
        text: { color: "white" },
        background: { color: "gray", weight: "700" },
      },
    },
  },
};
