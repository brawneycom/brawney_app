import { storage } from "./persistance";

export const storage_token_key = "access_token";
export const read_access_token = (): string | null =>
  storage.get(storage_token_key);

export const write_access_token = (token_value: string) => {
  storage.set(storage_token_key, token_value);
};

export const clear_access_token = () => {
  localStorage.removeItem(storage_token_key);
};
