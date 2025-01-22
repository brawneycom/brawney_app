import { createContext, useContext } from "react";
import { Serie } from "~/types";

export type SearchContextProps = {
  series: Serie[];
  is_empty: boolean;
  loading: boolean;
};

export const SearchContext = createContext<SearchContextProps>({
  series: [],
  is_empty: true,
  loading: false,
});

export const useSearch = () => useContext(SearchContext);
