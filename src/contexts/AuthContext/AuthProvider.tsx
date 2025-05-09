import axios, { AxiosResponse } from "axios";
import { FC, ReactNode, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import storage from "~/utils/storage";
import { API_URL } from "~/constants";
import { AuthContext } from "./AuthContext";
import { V1SuccessResponse } from "~/types";
import { Credentials } from "~/constants/credentials";
import { Account, LoginCredentials, SignUpCredentials } from "~/types/account";
import { AuthState } from "./Auth.types";

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    me: null,
    access_token: storage.access_token.read(),
    error: null,
    loading: true,
    status: "idle",
  });

  const login_mutation = useMutation({
    mutationFn: ({ email, password }: LoginCredentials) =>
      axios.post(`${API_URL}/v1/auth/login`, { email, password }),
    onSuccess: (response) => {
      SetSession(response);
    },
    onError: () => {},
  });

  const sign_up_mutation = useMutation({
    mutationFn: (account: SignUpCredentials) => {
      return axios.post(`${API_URL}/v1/auth/signup`, account);
    },
    onSuccess: (response) => {
      SetSession(response);
    },
    onError: () => {},
  });

  const renew_token_mutation = useMutation({
    mutationFn: () => {
      return axios.get(`${API_URL}/v1/auth/renew`, {
        headers: {
          Authorization: `Bearer ${storage.access_token.read()}`,
        },
      });
    },
    onSuccess: (response) => {
      SetSession(response);
    },
    onError: (err) => {
      let error_message = "something went wrong";
      // @ts-ignore
      if (err.status === 401) {
        error_message = "token expired";
      }

      setState({
        ...state,
        loading: false,
        status: "error",
        error: Error(error_message),
        access_token: null,
      });
    },
  });

  const { data, error, status, refetch } = useQuery({
    queryKey: ["me"],
    queryFn: (): Promise<AxiosResponse<V1SuccessResponse<Account>>> => {
      return axios.get(`${API_URL}/v1/account/me`, {
        headers: {
          Authorization: `Bearer ${storage.access_token.read()}`,
        },
      });
    },
    retry: false,
    enabled: storage.access_token.read() != null,
  });

  const SetSession = (response: AxiosResponse) => {
    const { headers, data } = response;
    const { success, result } = data;
    const access_token = headers["access-token"];

    if (success) {
      if (success && access_token) {
        storage.access_token.write(access_token);
        refetch();
      }
      if (success && result) {
        storage.profile.write(result);
      }
    } else {
      setState({
        ...state,
        loading: false,
        status: "error",
        error: Error("something went wrong"),
        access_token: null,
      });
    }
  };

  const login_fn = () => {
    setState({ ...state, loading: true, status: "pending" });
    login_mutation.mutate(Credentials.Me);
  };

  const sign_up_fn = (account: SignUpCredentials) => {
    setState({ ...state, loading: true, status: "pending" });
    sign_up_mutation.mutate(account);
  };

  const renew_fn = () => {
    setState({ ...state, loading: true, status: "pending" });
    renew_token_mutation.mutate();
  };

  const fetch_fn = () => {
    refetch();
  };

  const log_out_fn = () => {
    setState({ ...state, loading: true });
  };

  useEffect(() => {
    if (state.access_token !== null) {
      refetch();
    }
  }, [state.access_token]);

  useEffect(() => {
    if (data?.data.success && data?.data.result) {
      setState({
        ...state,
        loading: false,
        error: null,
        me: data.data.result,
      });
    }
  }, [data]);

  useEffect(() => {
    // @ts-ignore
    if (status === "error" && error && error.status === 401) {
      renew_token_mutation.mutate();
    }
  }, [status, error]);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login: login_fn,
        sign_up: sign_up_fn,
        renew: renew_fn,
        fetch: fetch_fn,
        log_out: log_out_fn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
