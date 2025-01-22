import { ComponentProperties } from "@bennie-ui/types";
import { GlobalStyles } from "~/styles";

const HeadingProps: ComponentProperties = {
  flex: {
    direction: "col",
    justifyContent: "center",
    alignItems: "center",
  },
};

const WizzardProps: ComponentProperties = {
  flex: {
    direction: "col",
    justifyContent: "between",
  },
  padding: { x: "4", y: "4" },
  border: { width: { all: "2" } },
  rounding: { all: "md" },
  height: { value: "3/5" },
  colors: { border: { color: "blue" } },
  dark: {
    colors: {
      border: {
        color: "gray",
        weight: "500",
      },
    },
  },
};

export const Styles = {
  wrapper: {
    main: GlobalStyles.wrappers.main,
    heading: HeadingProps,
    wizard: WizzardProps,
  },
  texts: {
    caption: GlobalStyles.texts.caption,
  },
  buttons: {
    previous: GlobalStyles.buttons.secondary,
    next: GlobalStyles.buttons.secondary,
    reset: GlobalStyles.buttons.warning,
    save: GlobalStyles.buttons.primary,
  },
};
