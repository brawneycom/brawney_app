import { createContext, useContext } from "react";

export type SearchContextProps = {};

export const SearchContext = createContext<SearchContextProps>({});

export const useSearch = () => useContext(SearchContext);
