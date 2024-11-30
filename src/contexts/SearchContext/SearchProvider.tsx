import { FC, ReactNode, useEffect } from "react";
import { SearchContext } from "./SearchContext";
import { useMainMenu } from "../MainMenuContext";
import { MainMenu, MenuItem } from "../../types";

type Category = {
  id: string;
  name: string;
};

type SearchPaylod = {
  ui: Category;
  timespan: Category;
  categories: {
    main_category: Category | null;
    sub_category: Category | null;
    child: Category | null;
  };
};

const MapCategory = (item: MenuItem): Category => {
  return {
    id: item.id,
    name: item.name,
  };
};

export type SearchProviderProps = {
  children: ReactNode;
};

const GetUICategory = (item: MenuItem): Category => {
  let active_item = item.children.find((it) => it.selected);
  return MapCategory(active_item || item.children[0]);
};

const GetTimeSpanCategory = (item: MenuItem): Category => {
  let active_item = item.children.find((it) => it.selected);
  return MapCategory(active_item || item.children[0]);
};

const BuildPayload = (menu: MainMenu) => {
  const payload = {
    ui: GetUICategory(menu.ui),
    timespan: GetTimeSpanCategory(menu.timespan),
  };

  return payload;
};

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const { menu } = useMainMenu();
  const search = (menu: MainMenu | null) => {
    if (menu) {
      console.log("f: search.padyload", BuildPayload(menu));
    }
  };

  useEffect(() => {
    search(menu);
  }, [menu]);

  return (
    <SearchContext.Provider value={{ search }}>
      {children}
    </SearchContext.Provider>
  );
};
