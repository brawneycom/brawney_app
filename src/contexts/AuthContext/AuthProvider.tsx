import axios, { AxiosResponse } from "axios";
import { FC, ReactNode, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  write_access_token,
  read_access_token,
  clear_access_token,
} from "~/utils/access_token";
import { API_URL } from "~/constants";
import { AuthContext } from "./AuthContext";
import { V1SuccessResponse } from "~/types";
import { Credentials } from "~/constants/credentials";
import { Account, LoginCredentials, SignUpCredentials } from "~/types/account";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [access_token, set_access_token] = useState<string | null>(
    read_access_token(),
  );

  const login_mutation = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      axios.post(`${API_URL}/login`, { email, password }),
    onSuccess: (response) => {
      const { headers } = response;
      const access_token = headers["access-token"];
      if (access_token) {
        write_access_token(access_token);
        set_access_token(access_token);
      } else {
        console.error("something went wrong");
      }
    },
    onError: () => {},
  });

  const sign_up_mutation = useMutation({
    mutationFn: (account: SignUpCredentials) =>
      axios.post(`${API_URL}/signup`, account),
    onSuccess: (response) => {
      const { headers } = response;
      const access_token = headers["access-token"];
      write_access_token(access_token);
      set_access_token(access_token);
    },
    onError: () => {},
  });

  const { status, error, data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: (): Promise<AxiosResponse<V1SuccessResponse<Account>>> =>
      axios.get(`${API_URL}/account/me`, {
        headers: {
          Authorization: `Bearer ${read_access_token()}`,
        },
      }),

    enabled: read_access_token() != null,
    select: (data) => data.data,
    retry: false,
  });

  const login_fn = () => {
    login_mutation.mutate(Credentials.Me);
  };

  const sign_up_fn = (account: SignUpCredentials) => {
    sign_up_mutation.mutate(account);
  };

  const log_out_fn = () => {
    clear_access_token();
    set_access_token(null);
  };

  return (
    <AuthContext.Provider
      value={{
        me: {
          data: data?.result,
          error,
          loading: isLoading,
          status,
        },
        login: {
          result: access_token,
          action: login_fn,
        },
        sign_up: {
          result: access_token,
          action: sign_up_fn,
        },
        log_out: {
          action: log_out_fn,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
