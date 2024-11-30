import { ComponentProperties } from "@bennie-ui/types";

type MenuItemSectionProps = {
  wrapper: ComponentProperties;
  ui: ComponentProperties;
  timespan: ComponentProperties;
  categories: ComponentProperties;
};

export const MenuItemStyles: MenuItemSectionProps = {
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
};
