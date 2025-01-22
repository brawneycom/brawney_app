import { createContext } from "react";
import { MainMenu, MenuItem } from "~/types";

type MainMenuContextProps = {
  menu: MainMenu | null;
  category: MenuItem | null;
  sub_category: MenuItem | null;
  reset: () => void;
  onItemChange: (item: MenuItem, parent_id: string) => void;
};

export const MainMenuContext = createContext<MainMenuContextProps>({
  menu: null,
  category: null,
  sub_category: null,

  reset: () => {
    console.log("f: noop");
  },
  onItemChange: (item: MenuItem, parent_id: string) => {
    console.log("f: noop", item, parent_id);
  },
});
