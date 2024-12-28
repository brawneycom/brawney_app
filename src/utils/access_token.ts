import { ContextResult } from "../types";
import { storage } from "./persistance";

export const storage_token_key = "access_token";
export const DefaultAccessTokenContextResult: ContextResult<string> = {
  loading: false,
  status: "idle",
  data: null,
  error: null,
};

export const read_access_token = (): ContextResult<string> => {
  const token = storage.get(storage_token_key);
  if (token) {
    return {
      loading: false,
      status: "idle",
      data: token,
      error: null,
    };
  } else {
    return DefaultAccessTokenContextResult;
  }
};

export const write_access_token = (token_value: string) => {
  storage.set(storage_token_key, token_value);
};

export const clear_access_token = () => {
  localStorage.removeItem(storage_token_key);
};
