export type MenuVisualizationMode = "visualization" | "capture";
export type MenuItemSelectMode = "single" | "multiple";

export type MainMenu = {
  ui: MenuItem;
  timespan: MenuItem;
  categories: MenuItem;
};

export type MainMenuState = {
  ui: string;
  timespan: string;
  categories: string[];
};

export type MenuItem = {
  id: string;
  name: string;
  mode: "single" | "multiple";
  content: string;
  content_type: number;
  is_active: boolean;
  selected: boolean;
  select_mode: string;
  children: MenuItem[];
};
