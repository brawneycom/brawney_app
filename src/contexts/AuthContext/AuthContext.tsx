import { createContext } from "react";
import { ContextResult, Account, SignUpCredentials } from "../../types";

type AuthContextProps = {
  me: {
    result: ContextResult<Account>;
  };
  login: {
    result: ContextResult<string>;
    action: () => void;
  };
  sign_up: {
    result: ContextResult<string>;
    action: (account: SignUpCredentials) => void;
  };
};

export const AuthContext = createContext<AuthContextProps>({
  me: {
    result: {
      loading: false,
      status: "idle",
      error: null,
      data: null,
    },
  },
  login: {
    result: {
      loading: false,
      status: "idle",
      error: null,
      data: null,
    },
    action: () => {
      console.log("f: noop");
    },
  },
  sign_up: {
    result: {
      loading: false,
      status: "idle",
      error: null,
      data: null,
    },
    action: (account: SignUpCredentials) => {
      console.log("f: noop", account);
    },
  },
});
