import { ComponentProperties } from "@bennie-ui/types";

type HomeStyleProps = {
  actions: {
    capture: ComponentProperties;
  };
};

export const Styles: HomeStyleProps = {
  actions: {
    capture: {
      rounding: { all: "2xl" },
      padding: { y: "4" },
      margin: { top: "2" },
      colors: { text: { color: "white" }, background: { color: "blue" } },
      dark: {
        colors: {
          text: { color: "white" },
          background: { color: "gray", weight: "700" },
        },
      },
    },
  },
};
