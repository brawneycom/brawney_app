import { createContext } from "react";
import { RequestStatus, Account, SignUpCredentials } from "~/types";

type AuthContextProps = {
  me: Account | null;
  loading: boolean;
  error: Error | null;
  status: RequestStatus;
  access_token: null | string;
  login: () => void;
  sign_up: (account: SignUpCredentials) => void;
  log_out: () => void;
  fetch: (access_token: string) => void;
  renew: () => void;
};

export const AuthContext = createContext<AuthContextProps>({
  me: null,
  loading: false,
  error: null,
  status: "idle",
  access_token: null,
  login: () => {
    console.log("f: noop");
  },
  sign_up: (account: SignUpCredentials) => {
    console.log("f: noop", account);
  },
  log_out: () => {
    console.log("f: noop");
  },
  fetch: (access_token: string) => {
    console.log("f: noop", access_token);
  },
  renew: () => {
    console.log("f: noop");
  },
});
