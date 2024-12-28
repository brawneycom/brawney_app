import axios from "axios";
import { FC, ReactNode, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { SearchContext } from "./SearchContext";
import { useMainMenu } from "../MainMenuContext";

import { SearchPayload } from "./SearchContext.types";
import { BuildSearchPayload } from "./SearchContext.utils";
import { read_access_token } from "../../utils/access_token";

export type SearchProviderProps = {
  children: ReactNode;
};

export const SearchProvider: FC<SearchProviderProps> = ({ children }) => {
  const { menu } = useMainMenu();

  const searchMutation = useMutation({
    mutationFn: (payload: SearchPayload) => {
      return axios.post("http://localhost:9001/me/data", payload, {
        headers: {
          Authorization: `Bearer ${read_access_token().data}`,
        },
      });
    },
    onSuccess: ({}) => {
      //console.log("f: success", data.result);
    },
    onError: (error) => {
      //console.log("f: error", error);
    },
  });

  useEffect(() => {
    if (menu) {
      searchMutation.mutate(BuildSearchPayload(menu));
    }
  }, [menu]);

  //console.log("f: data", { query });
  return <SearchContext.Provider value={{}}>{children}</SearchContext.Provider>;
};
