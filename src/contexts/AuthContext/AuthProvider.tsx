import axios from "axios";
import { FC, ReactNode, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import {
  Account,
  LoginCredentials,
  SignUpCredentials,
} from "../../types/account";
import {
  write_access_token,
  read_access_token,
  clear_access_token,
  DefaultAccessTokenContextResult,
} from "../../utils/access_token";
import { ContextResult } from "../../types";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [access_token, set_access_token] =
    useState<ContextResult<string>>(read_access_token());

  const login_mutation = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      axios.post("http://localhost:9001/login", { email, password }),
    onSuccess: (response) => {
      const { headers } = response;
      const access_token = headers["access-token"];
      write_access_token(access_token);
      set_access_token({
        status: "done",
        loading: false,
        data: access_token,
        error: null,
      });
    },
    onError: () => {},
  });

  const sign_up_mutation = useMutation({
    mutationFn: (account: SignUpCredentials) =>
      axios.post("http://localhost:9001/signup", account),
    onSuccess: (response) => {
      const { headers } = response;
      const access_token = headers["access-token"];
      write_access_token(access_token);
      set_access_token({
        status: "done",
        loading: false,
        data: access_token,
        error: null,
      });
    },
    onError: () => {},
  });

  const { status, error, data, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () =>
      axios.post(
        "http://localhost:9001/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${read_access_token().data}`,
          },
        },
      ),

    retry: false,
  });

  const login_fn = () => {
    login_mutation.mutate({
      email: "cbolanosmx@gmail.com",
      password: "123456",
    });
  };

  const sign_up_fn = (account: SignUpCredentials) => {
    sign_up_mutation.mutate(account);
  };

  const log_out_fn = () => {
    clear_access_token();
    set_access_token(DefaultAccessTokenContextResult);
  };

  return (
    <AuthContext.Provider
      value={{
        me: {
          result: {
            error,
            loading: isLoading,
            data: data?.data?.result,
            status,
          },
        },
        login: {
          result: access_token,
          action: login_fn,
        },
        sign_up: {
          result: access_token,
          action: sign_up_fn,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
