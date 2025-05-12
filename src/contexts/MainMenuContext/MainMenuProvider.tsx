import { FC, ReactNode, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { MainMenuContext } from "./MainMenuContext";
import { MainMenu, MenuItem, MenuVisualizationMode } from "~/types";
import { useAuth } from "../AuthContext";

type MainProviderProps = {
  children: ReactNode;
};

type SearchParams = {
  view: string;
  section: string;
  timespan: string;
  categories?: string[] | null;
  sub_categories?: string[] | null;
};

export const MainMenuProvider: FC<MainProviderProps> = ({ children }) => {
  const { me } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [menu, setMenu] = useState<MainMenu | null>(null);
  const [category, setCategory] = useState<MenuItem | null>(null);
  const [sub_category, setSubcategory] = useState<MenuItem | null>(null);

  const getMenuOptions = (parent_id: string): MenuItem | undefined => {
    if (menu) {
      const ids = parent_id.split(".");
      if (ids.length === 1) {
        const child = menu[ids[0] as keyof MainMenu] as MenuItem | undefined;
        return child;
      }

      if (ids.length === 2) {
        const child = menu[ids[0] as keyof MainMenu] as MenuItem | undefined;
        const sub_menu = child?.children.find(
          (it: MenuItem) => it.name === ids[1],
        );
        return sub_menu;
      }

      if (ids.length === 3) {
        const child = menu[ids[0] as keyof MainMenu] as MenuItem;
        const sub_menu = child.children.find(
          (it: MenuItem) => it.name === ids[1],
        );

        const grand_child =
          sub_menu?.children.find((it: MenuItem) => it.name === ids[2]) ||
          undefined;
        return grand_child;
      }
    }
    return;
  };

  const onItemChange = (item: MenuItem, parent_id: string) => {
    if (menu) {
      const sub_menu = getMenuOptions(parent_id);
      if (sub_menu) {
        if (sub_menu && sub_menu.children && sub_menu.children.length > 0) {
          const new_children = sub_menu.children.map((it: MenuItem) => {
            if (it.id === item.id) {
              return { ...it, selected: !it.selected };
            }

            return item.select_mode === "single"
              ? { ...it, selected: false }
              : it;
          });

          sub_menu.children = new_children;
          setMenu({ ...menu, [parent_id as keyof MainMenu]: sub_menu });
        }
      }
    }
  };

  const reset = () => {
    if (menu) {
      const [weight, percentiles, measurements, vo2] = menu.categories.children;
      const [fat, muscle] = percentiles.children;
      const [upper, lower] = measurements.children;
      const [chest, arms, stomach] = upper.children;
      const [waist, thights] = lower.children;

      weight.selected = true;
      percentiles.selected = false;
      fat.selected = true;
      muscle.selected = false;

      measurements.selected = false;
      upper.selected = true;
      chest.selected = false;
      arms.selected = true;
      stomach.selected = false;

      lower.selected = false;
      waist.selected = true;
      thights.selected = false;

      vo2.selected = false;

      setCategory(null);
      setSubcategory(null);
    }
  };

  const initializeMenuFromSearchParams = (
    searchParams: URLSearchParams,
    menu_items: MenuItem[],
  ): MainMenu => {
    const section =
      (searchParams.has("section") && searchParams.get("section")) || "weight";
    const timespan =
      (searchParams.has("timespan") && searchParams.get("timespan")) || "m";

    const categories =
      searchParams.has("categories") &&
      searchParams.getAll("categories").join(",");

    const section_override = {
      ...menu_items[1],
      children: menu_items[1].children.map((it) => {
        return {
          ...it,
          selected: it.name === section,
          children: it.children.map((ot) => {
            return {
              ...ot,
              selected: categories
                ? categories.toString().includes(ot.name)
                : ot.selected,
            };
          }),
        };
      }),
    };

    const timespan_override = {
      ...menu_items[2],
      children: menu_items[2].children.map((it) => {
        return { ...it, selected: it.name === timespan };
      }),
    };

    const menu: MainMenu = {
      ui: menu_items[0],
      categories: section_override,
      timespan: timespan_override,
    };

    return menu;
  };

  const updateSearchParams = (menu: MainMenu) => {
    const timespan = menu.timespan.children.find((it) => it.selected);
    const section = menu.categories.children.find((it) => it.selected);
    let categories: MenuItem[] = [];
    // let sub_categories: MenuItem[];

    let searchParams: SearchParams = {
      view: "ui",
      section: section?.name || "weight",
      timespan: timespan?.name || "w",
    };

    if (section) {
      categories = section?.children.filter((it) => it.selected);
      const categories_key = categories.map((it) => it.name);
      searchParams.categories = categories_key;
    }

    if (categories) {
      const selected_sub_category = categories?.find((it) => it.selected);
      if (selected_sub_category) {
      }
      //const categories_key = sub_categories.map((it) => it.name);
      //searchParams.categories = categories_key;
    }
    // @ts-ignore
    setSearchParams({ ...searchParams });
  };

  useEffect(() => {
    if (me) {
      const account = me;
      const menu = initializeMenuFromSearchParams(
        searchParams,
        account.settings.menu_items,
      );
      setMenu(menu);
    }
  }, [me]);

  useEffect(() => {
    if (menu) {
      let category = null;
      let sub_category = null;
      const [weight, percentiles, measurements, vo2] = menu.categories.children;

      if (weight.selected) {
        setCategory(null);
        setSubcategory(null);
      }

      if (vo2.selected) {
        setCategory(null);
        setSubcategory(null);
      }

      if (percentiles.selected) {
        category = percentiles;
        sub_category = percentiles;

        category.children.forEach((it) => {
          if (it.selected) {
            sub_category = it;
          }
        });

        setCategory(category);
        setSubcategory(sub_category);
      }

      if (measurements.selected) {
        category = measurements;
        sub_category = measurements;

        category.children.forEach((it) => {
          if (it.selected) {
            sub_category = it;
          }
        });

        setCategory(category);
        setSubcategory(sub_category);
      }

      updateSearchParams(menu);
    }
  }, [menu]);

  return (
    <MainMenuContext.Provider
      value={{ menu, category, sub_category, reset, onItemChange }}
    >
      {children}
    </MainMenuContext.Provider>
  );
};
