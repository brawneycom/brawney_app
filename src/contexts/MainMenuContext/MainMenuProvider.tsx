import { FC, ReactNode, useEffect, useState } from "react";
import { MainMenuContext } from "./MainMenuContext";
import { MainMenu, MenuItem } from "../../types";
import { useAuth } from "../AuthContext";

type MainProviderProps = {
  children: ReactNode;
};
export const MainMenuProvider: FC<MainProviderProps> = ({ children }) => {
  const { me } = useAuth();
  const [menu, setMenu] = useState<MainMenu | null>(null);

  const getMenuOptions = (parent_id: string): MenuItem | undefined => {
    if (menu) {
      const ids = parent_id.split(".");
      if (ids.length === 1) {
        const child = menu[ids[0] as keyof MainMenu] as MenuItem | undefined;
        return child;
      }

      if (ids.length === 2) {
        // @ts-ignore
        const child = menu[ids[0]] as MenuItem | undefined;
        const sub_menu = child?.children.find(
          (it: MenuItem) => it.name === ids[1],
        );
        return sub_menu;
      }

      if (ids.length === 3) {
        // @ts-ignore
        const child = menu[ids[0]] as MenuItem;
        const sub_menu = child.children.find(
          (it: MenuItem) => it.name === ids[1],
        );
        // @ts-ignore
        const grand_child = sub_menu.children.find(
          (it: MenuItem) => it.name === ids[2],
        );
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

  useEffect(() => {
    if (me?.data?.data?.result) {
      const account = me.data.data.result;
      setMenu(account.settings.menu_items);
    }
  }, [me]);

  return (
    <MainMenuContext.Provider value={{ menu, onItemChange }}>
      {children}
    </MainMenuContext.Provider>
  );
};
