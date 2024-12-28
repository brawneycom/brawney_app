import { AxiosResponse } from "axios";
export * from "./menus";
export * from "./account";

export type V1SuccessResponse<T> = {
  success: boolean;
  error: string;
  messages: string[];
  result: T;
};

export type ContextResult<T> = {
  loading: boolean;
  status: string;
  error: Error | undefined | null;
  data: T | null;
};
