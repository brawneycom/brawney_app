import { ComponentProperties } from "@bennie-ui/types";

type AuthorizedContentStyleProps = {
  wrapper: ComponentProperties;
};

type AuthorizedStyleProps = {
  wrapper: ComponentProperties;
  content: AuthorizedContentStyleProps;
};

export const Styles: AuthorizedStyleProps = {
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
  },
};
