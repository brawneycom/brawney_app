// heading styles

import { ButtonProperties } from "@bennie-ui/button";
import { SectionProperties } from "@bennie-ui/section/src/section.types";
import { TextProperties } from "@bennie-ui/text";

// text styles

// container styles

// button styles

type GlobalStyleProps = {
  wrappers: {
    main: SectionProperties;
  };
  texts: {
    headings: {
      title: TextProperties;
      sub_title: TextProperties;
    };
    caption: TextProperties;
  };
  buttons: {
    primary: ButtonProperties;
    secondary: ButtonProperties;
    warning: ButtonProperties;
    danger: ButtonProperties;
  };
};

export const GlobalStyles: GlobalStyleProps = {
  wrappers: {
    main: {
      className: "absolute inset-0",
      padding: { x: "3" },
      height: { value: "screen" },
      flex: { direction: "col", justifyContent: "center" },
      colors: { text: { color: "blue" } },
      dark: {
        colors: {
          text: { color: "white" },
        },
      },
    },
  },
  texts: {
    headings: {
      title: {},
      sub_title: {},
    },
    caption: {
      size: "sm",
      align: "center",
      margin: { top: "3" },
      colors: {
        text: {
          color: "gray",
          weight: "400",
        },
      },
    },
  },
  buttons: {
    primary: {
      rounding: { all: "md" },
      colors: {
        text: {
          color: "white",
        },
        background: {
          color: "blue",
        },
      },
      dark: {
        colors: {
          background: { color: "indigo" },
        },
      },
    },
    secondary: {
      rounding: { all: "md" },
      border: { width: { all: "1" } },
      colors: {
        text: { color: "blue" },
        background: { color: "white" },
        border: { color: "blue" },
      },
      dark: {
        colors: {
          text: { color: "white" },
          background: { color: "slate", weight: "400" },
          border: { color: "slate", weight: "400" },
        },
      },
    },
    warning: {
      rounding: { all: "md" },
      margin: { right: "1" },
      colors: {
        text: { color: "white" },
        background: { color: "red", weight: "400" },
      },
      dark: {
        colors: {
          background: { color: "red", weight: "400" },
        },
      },
    },
    danger: {},
  },
};
