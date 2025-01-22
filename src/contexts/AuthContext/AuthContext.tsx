import { createContext } from "react";
import { ContextResult, Account, SignUpCredentials } from "~/types";

type AuthContextProps = {
  me: ContextResult<Account>;
  login: {
    result: null | string;
    action: () => void;
  };
  sign_up: {
    result: null | string;
    action: (account: SignUpCredentials) => void;
  };
  log_out: {
    action: () => void;
  };
};

export const AuthContext = createContext<AuthContextProps>({
  me: {
    loading: true,
    data: null,
    error: null,
    status: "idle",
  },
  login: {
    result: null,
    action: () => {
      console.log("f: noop");
    },
  },
  sign_up: {
    result: "",
    action: (account: SignUpCredentials) => {
      console.log("f: noop", account);
    },
  },
  log_out: {
    action: () => {
      console.log("f: noop");
    },
  },
});
