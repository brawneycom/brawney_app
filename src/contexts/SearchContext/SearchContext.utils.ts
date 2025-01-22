import { MainMenu, MenuItem } from "~/types";
import { Category, SearchPayload } from "./SearchContext.types";

const MapCategory = (item: MenuItem, value: string): Category => {
  return {
    name: item.name,
    value,
  };
};

const GetUICategory = (item: MenuItem): Category => {
  const default_item = item.children[0];
  const selected_item = item.children.find((it) => it.selected);
  const active_item = selected_item || default_item;

  return MapCategory(active_item, active_item.name);
};

const GetTimeSpanCategory = (item: MenuItem): Category => {
  const default_item = item.children[0];
  const selected_item = item.children.find((it) => it.selected);
  const active_item = selected_item || default_item;
  return MapCategory(active_item, active_item.name);
};

const GetCategoryData = (
  item: MenuItem,
  categories: Category[],
): Category[] => {
  if (item.children && item.children.length > 0) {
    const new_categories: Category[] = [];
    const active = item.children.filter((it) => it.selected);

    for (const child of active) {
      const active_child = GetCategoryData(child, categories);
      new_categories.push(...active_child);
    }

    return [...categories, ...new_categories];
  }
  return [MapCategory(item, "")];
};

export const BuildSearchPayload = (menu: MainMenu) => {
  const categories = GetCategoryData(
    menu.categories.children.find((it) => it.selected) ||
      menu.categories.children[0],
    [],
  );

  const payload = {
    ui: GetUICategory(menu.ui),
    timespan: GetTimeSpanCategory(menu.timespan),
    categories: Array.isArray(categories) ? [...categories] : [categories],
  };

  return payload;
};

export const BuildSearchQuery = (payload: SearchPayload | null): string => {
  return payload
    ? `${payload.ui.name}.${payload.timespan.name}.${payload.categories.map((it) => it.name).join("-")}`
    : "";
};
