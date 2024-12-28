import { ComponentProperties } from "@bennie-ui/types";

type CaptureStyleProps = {
  actions: {
    cancel: ComponentProperties;
    save: ComponentProperties;
  };
};

export const Styles: CaptureStyleProps = {
  actions: {
    cancel: {
      rounding: { all: "2xl" },
      padding: { y: "4" },
      margin: { bottom: "3" },
      colors: { text: { color: "white" }, background: { color: "blue" } },
      dark: {
        colors: {
          text: { color: "white" },
          background: { color: "gray", weight: "400" },
        },
      },
    },
    save: {
      rounding: { all: "2xl" },
      padding: { y: "4" },
      colors: { text: { color: "white" }, background: { color: "blue" } },
      dark: {
        colors: {
          text: { color: "white" },
          background: { color: "purple", weight: "700" },
        },
      },
    },
  },
};
