import { createContext } from "react";
import { V1SuccessResponse, Account } from "../../types";
import { UseQueryResult } from "@tanstack/react-query";
import { AxiosResponse } from "axios";

type AuthContextProps = {
  access_token: string | null;
  me: UseQueryResult<
    AxiosResponse<V1SuccessResponse<Account>, any> | undefined,
    Error
  >;
  login: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  access_token: null,
  // @ts-ignore
  me: undefined,
  login: () => {
    console.log("noop");
  },
});
