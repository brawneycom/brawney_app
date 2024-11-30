import { MainMenu, MenuItem } from "../../types";

const MainPanelUIMenu: MenuItem[] = [
  {
    id: "ui.charts",
    content: "ChartBarIcon",
    mode: "single",
    visible: true,
    items: [],
  },
  {
    id: "ui.data",
    content: "TableCellsIcon",
    mode: "single",
    visible: true,
    items: [],
  },
];

const MainPanelTimeSpanMenu: MenuItem[] = [
  {
    id: "timespan.w",
    mode: "single",
    content: "W",
    visible: true,
  },
  {
    id: "timespan.2w",
    mode: "single",
    content: "2W",
    visible: true,
  },
  {
    id: "timespan.m",
    mode: "single",
    content: "M",
    visible: true,
  },
  {
    id: "timespan.3m",
    mode: "single",
    content: "3M",
    visible: true,
  },
  {
    id: "timespan.6m",
    mode: "single",
    content: "6M",
    visible: true,
  },
  {
    id: "timespan.y",
    mode: "single",
    content: "Y",
    visible: true,
  },
];

const MainPanelCategoriesMenu: MenuItem[] = [
  {
    id: "categories.weight",
    mode: "multiple",
    content: "ScaleIcon",
    visible: true,
  },
  {
    id: "categories.percentiles",
    mode: "multiple",
    content: "FireIcon",
    visible: true,

    items: [
      {
        id: "percentiles.lean_fat",
        mode: "multiple",
        content: "Lean fat",
        size: "lg",
        weight: "bold",
        visible: false,
        color: { color: "orange" },
      },
      {
        id: "percentiles.body_fat",
        mode: "multiple",
        content: "Body fat",
        size: "lg",
        weight: "bold",
        visible: true,
        color: { color: "purple" },
      },
      {
        id: "percentiles.muscle",
        mode: "multiple",
        content: "Muscle fat",
        size: "lg",
        weight: "bold",
        visible: true,
        color: { color: "blue" },
      },
    ],
  },
  {
    id: "categories.measurements",
    mode: "multiple",
    content: "ReceiptPercentIcon",
    visible: true,

    items: [],
  },
  {
    id: "categories.vo2",
    mode: "multiple",
    content: "HeartIcon",
    visible: true,

    items: [],
  },
];

export const DefaultMenu = {
  ui: MainPanelUIMenu,
  timespan: MainPanelTimeSpanMenu,
  categories: MainPanelCategoriesMenu,
};

export const DefaultState = {
  ui: "ui.charts",
  timespan: "timespan.2w",
  categories: ["categories.weight"],
};
