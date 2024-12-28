import { ComponentProperties } from "@bennie-ui/types";

type MainPanelStylesProps = {
  wrapper: ComponentProperties;
  content: ComponentProperties;
  navigation: ComponentProperties;
  ui: ComponentProperties;
  timespan: ComponentProperties;
  categories: ComponentProperties;
  actions: ComponentProperties;
};

export const Styles: MainPanelStylesProps = {
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
  navigation: {
    colors: { text: { color: "white" } },
    padding: { all: "4" },
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
  content: {
    id: "content",
    height: { value: "max" },
    flex: {
      direction: "col",
      justifyContent: "center",
      alignItems: "center",
      grow: "1",
    },
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
  actions: {
    margin: { top: "4" },
  },
};
