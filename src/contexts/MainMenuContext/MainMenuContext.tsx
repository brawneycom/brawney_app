import { createContext } from "react";
import { MainMenu, MenuItem } from "../../types";

type MainMenuContextProps = {
  menu: MainMenu | null;
  onItemChange: (item: MenuItem, parent_id: string) => void;
};

export const MainMenuContext = createContext<MainMenuContextProps>({
  menu: null,

  onItemChange: (item: MenuItem, parent_id: string) => {
    console.log("f: noop", item, parent_id);
  },
});
