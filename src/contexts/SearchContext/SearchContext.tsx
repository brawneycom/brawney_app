import { createContext } from "react";
import { MainMenu } from "../../types";

type SearchContextProps = {
  search: (menu: MainMenu) => void;
};

export const SearchContext = createContext<SearchContextProps>({
  search: (menu: MainMenu) => {
    console.log("f: noop", menu);
  },
});
