import axios from "axios";
import { FC, ReactNode, useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AuthContext } from "./AuthContext";
import { Credentials } from "../../types/account";
import { storage } from "../../utils/persistance";

type AuthProviderProps = {
  children: ReactNode;
};

const requiresAuth = (pathname: string) => {
  const no_required = ["/login"];
  return !no_required.includes(pathname);
};

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const storage_token_key = "access_token";
  const [access_token, set_access_token] = useState<string | null>(
    storage.get(storage_token_key),
  );
  const login_mutation = useMutation({
    mutationFn: ({ email, password }: Credentials) =>
      axios.post("http://localhost:9001/login", { email, password }),
    onSuccess: (response) => {
      const { headers } = response;
      const access_token = headers["access-token"];
      storage.set(storage_token_key, access_token);
      set_access_token(headers["access-token"]);
    },
    onError: () => {},
  });

  const me = useQuery({
    queryKey: ["me"],
    queryFn: () =>
      axios.post(
        "http://localhost:9001/me",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      ),

    retry: false,
    enabled: access_token !== null,
  });

  const login = () => {
    login_mutation.mutate({
      email: "cbolanosmx@gmail.com",
      password: "123456",
    });
  };

  return (
    <AuthContext.Provider value={{ access_token, login, me }}>
      {children}
    </AuthContext.Provider>
  );
};
