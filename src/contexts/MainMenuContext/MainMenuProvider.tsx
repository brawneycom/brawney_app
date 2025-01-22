import { FC, ReactNode, useEffect, useState } from "react";
import { MainMenuContext } from "./MainMenuContext";
import { MainMenu, MenuItem, MenuVisualizationMode } from "~/types";
import { useAuth } from "../AuthContext";

type MainProviderProps = {
  children: ReactNode;
  mode: MenuVisualizationMode;
};
export const MainMenuProvider: FC<MainProviderProps> = ({ children, mode }) => {
  const { me } = useAuth();
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

            return item.select_mode === "single" || mode === "capture"
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

  useEffect(() => {
    if (me?.data) {
      const account = me.data;
      setMenu({
        ui: account.settings.menu_items[0],
        categories: account.settings.menu_items[1],
        timespan: account.settings.menu_items[2],
      });
    }
  }, [me]);

  useEffect(() => {
    if (menu) {
      let category = null;
      let sub_category = null;
      const [weight, percentiles, measurements, vo2] = menu.categories.children;

      if (weight.selected || vo2.selected) {
        setCategory(null);
        setSubcategory(null);
      }

      if (percentiles.selected) {
        setCategory(percentiles);
        setSubcategory(null);
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
